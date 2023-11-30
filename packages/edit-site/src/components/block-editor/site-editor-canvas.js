/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useRef } from '@wordpress/element';
import {
	BlockList,
	BlockTools,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useViewportMatch, useResizeObserver } from '@wordpress/compose';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import BackButton from './back-button';
import ResizableEditor from './resizable-editor';
import EditorCanvas from './editor-canvas';
import EditorCanvasContainer from '../editor-canvas-container';
import useSiteEditorSettings from './use-site-editor-settings';
import { store as editSiteStore } from '../../store';
import {
	FOCUSABLE_ENTITIES,
	NAVIGATION_POST_TYPE,
} from '../../utils/constants';
import { unlock } from '../../lock-unlock';
import PageContentFocusNotifications from '../page-content-focus-notifications';

const LAYOUT = {
	type: 'default',
	// At the root level of the site editor, no alignments should be allowed.
	alignments: [],
};

function useIsNavigationOverlay() {
	const [ area ] = useEntityProp( 'postType', 'wp_template_part', 'area' );
	return area === 'navigation-overlay';
}

export default function SiteEditorCanvas() {
	const { clearSelectedBlock } = useDispatch( blockEditorStore );

	const { templateType, isFocusMode, isViewMode } = useSelect( ( select ) => {
		const { getEditedPostType, getCanvasMode } = unlock(
			select( editSiteStore )
		);

		const _templateType = getEditedPostType();

		return {
			templateType: _templateType,
			isFocusMode: FOCUSABLE_ENTITIES.includes( _templateType ),
			isViewMode: getCanvasMode() === 'view',
		};
	}, [] );

	const isNavigationOverlayTemplate = useIsNavigationOverlay();

	const [ resizeObserver, sizes ] = useResizeObserver();

	const settings = useSiteEditorSettings();

	const { hasBlocks } = useSelect( ( select ) => {
		const { getBlockCount } = select( blockEditorStore );

		const blocks = getBlockCount();

		return {
			hasBlocks: !! blocks,
		};
	}, [] );

	const isMobileViewport = useViewportMatch( 'small', '<' );
	const enableResizing =
		isFocusMode &&
		! isViewMode &&
		// Disable resizing in mobile viewport.
		! isMobileViewport;

	const contentRef = useRef();
	const isTemplateTypeNavigation = templateType === NAVIGATION_POST_TYPE;

	const isNavigationFocusMode = isTemplateTypeNavigation && isFocusMode;

	// Hide the appender when:
	// - In navigation focus mode (should only allow the root Nav block).
	// - In view mode (i.e. not editing).
	// - In navigation overlay template (should only allow the root Overlay Block).
	const showBlockAppender =
		( isNavigationFocusMode && hasBlocks ) ||
		isViewMode ||
		isNavigationOverlayTemplate
			? false
			: undefined;

	const forceFullHeight =
		isNavigationFocusMode || isNavigationOverlayTemplate;

	return (
		<>
			<EditorCanvasContainer.Slot>
				{ ( [ editorCanvasView ] ) =>
					editorCanvasView ? (
						<div className="edit-site-visual-editor is-focus-mode">
							{ editorCanvasView }
						</div>
					) : (
						<BlockTools
							className={ classnames( 'edit-site-visual-editor', {
								'is-focus-mode':
									isFocusMode || !! editorCanvasView,
								'is-view-mode': isViewMode,
							} ) }
							__unstableContentRef={ contentRef }
							onClick={ ( event ) => {
								// Clear selected block when clicking on the gray background.
								if ( event.target === event.currentTarget ) {
									clearSelectedBlock();
								}
							} }
						>
							<BackButton />
							<ResizableEditor
								enableResizing={ enableResizing }
								height={
									sizes.height && ! forceFullHeight
										? sizes.height
										: '100%'
								}
							>
								<EditorCanvas
									enableResizing={ enableResizing }
									settings={ settings }
									contentRef={ contentRef }
								>
									{ resizeObserver }
									<BlockList
										className={ classnames(
											'edit-site-block-editor__block-list wp-site-blocks',
											{
												'is-navigation-block':
													isTemplateTypeNavigation,
											}
										) }
										dropZoneElement={
											// Pass in the html element of the iframe to ensure that
											// the drop zone extends to the very edges of the iframe,
											// even if the template is shorter than the viewport.
											contentRef.current?.parentNode
										}
										layout={ LAYOUT }
										renderAppender={ showBlockAppender }
									/>
								</EditorCanvas>
							</ResizableEditor>
						</BlockTools>
					)
				}
			</EditorCanvasContainer.Slot>
			<PageContentFocusNotifications contentRef={ contentRef } />
		</>
	);
}

/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import {
	BlockSettingsMenuControls,
	BlockTitle,
	useBlockProps,
	Warning,
	store as blockEditorStore,
	__experimentalBlockPatternsList as BlockPatternsList,
	__experimentalRecursionProvider as RecursionProvider,
	__experimentalUseHasRecursion as useHasRecursion,
	InspectorControls,
} from '@wordpress/block-editor';
import { parse } from '@wordpress/blocks';
import { PanelBody, Spinner, Modal, MenuItem } from '@wordpress/components';
import { useAsyncList } from '@wordpress/compose';
import { __, sprintf } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';
import { useState, createInterpolateElement } from '@wordpress/element';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import TemplatePartPlaceholder from './placeholder';
import TemplatePartSelectionModal from './selection-modal';
import { TemplatePartAdvancedControls } from './advanced-controls';
import TemplatePartInnerBlocks from './inner-blocks';
import { createTemplatePartId } from './utils/create-template-part-id';
import {
	useAlternativeBlockPatterns,
	useAlternativeTemplateParts,
	useTemplatePartArea,
} from './utils/hooks';

function TemplatesList( { availableTemplates, onSelect } ) {
	const shownTemplates = useAsyncList( availableTemplates );

	if ( ! availableTemplates || availableTemplates?.length < 2 ) {
		return null;
	}

	return (
		<BlockPatternsList
			label={ __( 'Templates' ) }
			blockPatterns={ availableTemplates }
			shownPatterns={ shownTemplates }
			onClickPattern={ onSelect }
		/>
	);
}

export default function TemplatePartEdit( {
	attributes,
	setAttributes,
	clientId,
} ) {
	const { createSuccessNotice } = useDispatch( noticesStore );
	const { slug, theme, tagName, layout = {} } = attributes;
	const templatePartId = createTemplatePartId( theme, slug );
	const hasAlreadyRendered = useHasRecursion( templatePartId );
	const [ isTemplatePartSelectionOpen, setIsTemplatePartSelectionOpen ] =
		useState( false );

	// Set the postId block attribute if it did not exist,
	// but wait until the inner blocks have loaded to allow
	// new edits to trigger this.
	const { isResolved, innerBlocks, isMissing, area } = useSelect(
		( select ) => {
			const { getEditedEntityRecord, hasFinishedResolution } =
				select( coreStore );
			const { getBlocks } = select( blockEditorStore );

			const getEntityArgs = [
				'postType',
				'wp_template_part',
				templatePartId,
			];
			const entityRecord = templatePartId
				? getEditedEntityRecord( ...getEntityArgs )
				: null;
			const _area = entityRecord?.area || attributes.area;
			const hasResolvedEntity = templatePartId
				? hasFinishedResolution(
						'getEditedEntityRecord',
						getEntityArgs
				  )
				: false;

			return {
				innerBlocks: getBlocks( clientId ),
				isResolved: hasResolvedEntity,
				isMissing:
					hasResolvedEntity &&
					( ! entityRecord ||
						Object.keys( entityRecord ).length === 0 ),
				area: _area,
			};
		},
		[ templatePartId, attributes.area, clientId ]
	);
	const { templateParts } = useAlternativeTemplateParts(
		area,
		templatePartId
	);
	const blockPatterns = useAlternativeBlockPatterns( area, clientId );
	const hasReplacements = !! templateParts.length || !! blockPatterns.length;
	const areaObject = useTemplatePartArea( area );
	const blockProps = useBlockProps();
	const isPlaceholder = ! slug;
	const isEntityAvailable = ! isPlaceholder && ! isMissing && isResolved;
	const TagName = tagName || areaObject.tagName;

	const canReplace =
		isEntityAvailable &&
		hasReplacements &&
		( area === 'header' || area === 'footer' );

	// We don't want to render a missing state if we have any inner blocks.
	// A new template part is automatically created if we have any inner blocks but no entity.
	if (
		innerBlocks.length === 0 &&
		( ( slug && ! theme ) || ( slug && isMissing ) )
	) {
		return (
			<TagName { ...blockProps }>
				<Warning>
					{ sprintf(
						/* translators: %s: Template part slug */
						__(
							'Template part has been deleted or is unavailable: %s'
						),
						slug
					) }
				</Warning>
			</TagName>
		);
	}

	if ( isEntityAvailable && hasAlreadyRendered ) {
		return (
			<TagName { ...blockProps }>
				<Warning>
					{ __( 'Block cannot be rendered inside itself.' ) }
				</Warning>
			</TagName>
		);
	}

	const partsAsPatterns = templateParts.map( ( templatePart ) => ( {
		name: createTemplatePartId( templatePart.theme, templatePart.slug ),
		title: templatePart.title.rendered,
		blocks: parse( templatePart.content.raw ),
		templatePart,
	} ) );

	// TODO - de dupe
	const onTemplatePartSelect = ( { templatePart } ) => {
		setAttributes( {
			slug: templatePart.slug,
			theme: templatePart.theme,
			area: templatePart.area,
		} );
		createSuccessNotice(
			sprintf(
				/* translators: %s: template part title. */
				__( 'Template Part "%s" inserted.' ),
				templatePart.title?.rendered || templatePart.slug
			),
			{
				type: 'snackbar',
			}
		);
	};

	return (
		<>
			<RecursionProvider uniqueId={ templatePartId }>
				<TemplatePartAdvancedControls
					tagName={ tagName }
					setAttributes={ setAttributes }
					isEntityAvailable={ isEntityAvailable }
					templatePartId={ templatePartId }
					defaultWrapper={ areaObject.tagName }
					hasInnerBlocks={ innerBlocks.length > 0 }
				/>
				{ isPlaceholder && (
					<TagName { ...blockProps }>
						<TemplatePartPlaceholder
							area={ attributes.area }
							templatePartId={ templatePartId }
							clientId={ clientId }
							setAttributes={ setAttributes }
							onOpenSelectionModal={ () =>
								setIsTemplatePartSelectionOpen( true )
							}
						/>
					</TagName>
				) }
				{ canReplace && (
					<BlockSettingsMenuControls>
						{ ( { selectedClientIds } ) => {
							// Only enable for single selection that matches the current block.
							// Ensures menu item doesn't render multiple times.
							if (
								! (
									selectedClientIds.length === 1 &&
									clientId === selectedClientIds[ 0 ]
								)
							) {
								return null;
							}

							return (
								<MenuItem
									onClick={ () => {
										setIsTemplatePartSelectionOpen( true );
									} }
									aria-expanded={
										isTemplatePartSelectionOpen
									}
									aria-haspopup="dialog"
								>
									{ createInterpolateElement(
										__( 'Replace <BlockTitle />' ),
										{
											BlockTitle: (
												<BlockTitle
													clientId={ clientId }
													maximumLength={ 25 }
												/>
											),
										}
									) }
								</MenuItem>
							);
						} }
					</BlockSettingsMenuControls>
				) }
				{ canReplace && partsAsPatterns.length && (
					<InspectorControls>
						<PanelBody title={ __( 'Replace' ) }>
							<TemplatesList
								availableTemplates={ partsAsPatterns }
								onSelect={ onTemplatePartSelect }
							/>
						</PanelBody>
					</InspectorControls>
				) }

				{ isEntityAvailable && (
					<TemplatePartInnerBlocks
						tagName={ TagName }
						blockProps={ blockProps }
						postId={ templatePartId }
						hasInnerBlocks={ innerBlocks.length > 0 }
						layout={ layout }
					/>
				) }
				{ ! isPlaceholder && ! isResolved && (
					<TagName { ...blockProps }>
						<Spinner />
					</TagName>
				) }
			</RecursionProvider>
			{ isTemplatePartSelectionOpen && (
				<Modal
					overlayClassName="block-editor-template-part__selection-modal"
					title={ sprintf(
						// Translators: %s as template part area title ("Header", "Footer", etc.).
						__( 'Choose a %s' ),
						areaObject.label.toLowerCase()
					) }
					onRequestClose={ () =>
						setIsTemplatePartSelectionOpen( false )
					}
					isFullScreen={ true }
				>
					<TemplatePartSelectionModal
						templatePartId={ templatePartId }
						clientId={ clientId }
						area={ area }
						setAttributes={ setAttributes }
						onClose={ () =>
							setIsTemplatePartSelectionOpen( false )
						}
					/>
				</Modal>
			) }
		</>
	);
}

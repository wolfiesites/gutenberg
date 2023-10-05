/**
 * WordPress dependencies
 */
import { __experimentalBlockPatternsList as BlockPatternsList } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useAsyncList } from '@wordpress/compose';
import { store as coreStore } from '@wordpress/core-data';
import { store as editorStore } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';
import { navigation, symbol } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../../store';
import TemplateActions from './template-actions';
import TemplateAreas from './template-areas';
import LastRevision from './last-revision';
import SidebarCard from '../sidebar-card';
import PatternCategories from './pattern-categories';
import { PATTERN_TYPES } from '../../../utils/constants';
import { useAvailablePatterns } from './hooks';

const CARD_ICONS = {
	wp_block: symbol,
	wp_navigation: navigation,
};

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

export default function TemplatePanel() {
	const { title, description, icon, record, postType } = useSelect(
		( select ) => {
			const { getEditedPostType, getEditedPostId } =
				select( editSiteStore );
			const { getEditedEntityRecord } = select( coreStore );
			const { __experimentalGetTemplateInfo: getTemplateInfo } =
				select( editorStore );

			const type = getEditedPostType();
			const postId = getEditedPostId();
			const _record = getEditedEntityRecord( 'postType', type, postId );
			const info = getTemplateInfo( _record );

			return {
				title: info.title,
				description: info.description,
				icon: info.icon,
				record: _record,
				postType: type,
			};
		},
		[]
	);

	const availablePatterns = useAvailablePatterns( record );

	if ( ! title && ! description ) {
		return null;
	}

	return (
		<PanelBody className="edit-site-template-panel">
			<SidebarCard
				className="edit-site-template-card"
				title={ decodeEntities( title ) }
				icon={ CARD_ICONS[ record?.type ] ?? icon }
				description={ decodeEntities( description ) }
				actions={ <TemplateActions template={ record } /> }
			>
				<TemplateAreas />
			</SidebarCard>
			<p>
				{ __(
					'Choose a predefined pattern to switch up the look of your footer.'
				) }
			</p>
			<TemplatesList
				availableTemplates={ availablePatterns }
				onSelect={ () => {} }
			/>
			<LastRevision />
			{ postType === PATTERN_TYPES.user && (
				<PatternCategories post={ record } />
			) }
		</PanelBody>
	);
}

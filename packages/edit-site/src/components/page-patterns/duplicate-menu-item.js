/**
 * WordPress dependencies
 */
import { MenuItem } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { privateApis as patternsPrivateApis } from '@wordpress/patterns';
import { privateApis as routerPrivateApis } from '@wordpress/router';

/**
 * Internal dependencies
 */
import { TEMPLATE_PART_POST_TYPE, PATTERN_TYPES } from '../../utils/constants';
import { unlock } from '../../lock-unlock';
import DuplicateTemplatePartModal from '../duplicate-template-part-modal';

const { DuplicatePatternModal } = unlock( patternsPrivateApis );
const { useHistory } = unlock( routerPrivateApis );

export default function DuplicateMenuItem( {
	categoryId,
	item,
	label = __( 'Duplicate' ),
	onClose,
} ) {
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const history = useHistory();

	const closeModal = () => setIsModalOpen( false );

	const isTemplatePart = item.type === TEMPLATE_PART_POST_TYPE;
	const isThemePattern = item.type === PATTERN_TYPES.theme;

	async function onTemplatePartSuccess( templatePart ) {
		history.push( {
			postType: TEMPLATE_PART_POST_TYPE,
			postId: templatePart?.id,
			categoryType: TEMPLATE_PART_POST_TYPE,
			categoryId,
		} );

		onClose();
	}

	function onPatternSuccess( { pattern } ) {
		history.push( {
			categoryType: PATTERN_TYPES.theme,
			categoryId,
			postType: PATTERN_TYPES.user,
			postId: pattern.id,
		} );

		onClose();
	}

	return (
		<>
			<MenuItem
				onClick={ () => setIsModalOpen( true ) }
				aria-expanded={ isModalOpen }
				aria-haspopup="dialog"
			>
				{ label }
			</MenuItem>
			{ isModalOpen && ! isTemplatePart && (
				<DuplicatePatternModal
					onClose={ closeModal }
					onSuccess={ onPatternSuccess }
					pattern={ isThemePattern ? item : item.patternBlock }
				/>
			) }
			{ isModalOpen && isTemplatePart && (
				<DuplicateTemplatePartModal
					onClose={ closeModal }
					onSuccess={ onTemplatePartSuccess }
					templatePart={ item.templatePart }
				/>
			) }
		</>
	);
}

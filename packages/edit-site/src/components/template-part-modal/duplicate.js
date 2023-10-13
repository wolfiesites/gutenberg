/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { store as interfaceStore } from '@wordpress/interface';
import { privateApis as routerPrivateApis } from '@wordpress/router';
import { getQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import useEditedEntityRecord from '../use-edited-entity-record';
import DuplicateTemplatePartModal from '../duplicate-template-part-modal';
import { TEMPLATE_PART_MODALS } from './';
import { unlock } from '../../lock-unlock';
import { TEMPLATE_PART_POST_TYPE } from '../../utils/constants';

const { useHistory } = unlock( routerPrivateApis );

export default function PatternDuplicateModal() {
	const { record } = useEditedEntityRecord();
	const { categoryType, categoryId } = getQueryArgs( window.location.href );
	const { closeModal } = useDispatch( interfaceStore );
	const history = useHistory();

	const isActive = useSelect( ( select ) =>
		select( interfaceStore ).isModalActive( TEMPLATE_PART_MODALS.duplicate )
	);

	if ( ! isActive ) {
		return null;
	}

	function onSuccess( newTemplatePart ) {
		history.push( {
			postType: TEMPLATE_PART_POST_TYPE,
			postId: newTemplatePart.id,
			categoryType,
			categoryId,
		} );

		closeModal();
	}

	return (
		<DuplicateTemplatePartModal
			onClose={ closeModal }
			onSuccess={ onSuccess }
			templatePart={ record }
		/>
	);
}

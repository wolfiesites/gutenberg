/**
 * WordPress dependencies
 */
import { MenuItem } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { privateApis as patternsPrivateApis } from '@wordpress/patterns';

/**
 * Internal dependencies
 */
import RenameTemplatePartModal from '../rename-template-part-modal';
import { unlock } from '../../lock-unlock';
import { TEMPLATE_PART_POST_TYPE } from '../../utils/constants';

const { RenamePatternModal } = unlock( patternsPrivateApis );

export default function RenameMenuItem( { item, onClose } ) {
	const [ isModalOpen, setIsModalOpen ] = useState( false );

	const isTemplatePart = item.type === TEMPLATE_PART_POST_TYPE;

	if ( isTemplatePart && ! item.isCustom ) {
		return null;
	}

	const closeModal = () => {
		setIsModalOpen( false );
		onClose();
	};

	return (
		<>
			<MenuItem onClick={ () => setIsModalOpen( true ) }>
				{ __( 'Rename' ) }
			</MenuItem>
			{ isModalOpen && ! isTemplatePart && (
				<RenamePatternModal
					onClose={ closeModal }
					pattern={ item.patternBlock }
					overlayClassName="edit-site-list__rename-modal"
				/>
			) }
			{ isModalOpen && isTemplatePart && (
				<RenameTemplatePartModal
					onClose={ closeModal }
					templatePart={ item.templatePart }
					overlayClassName="edit-site-list__rename-modal"
				/>
			) }
		</>
	);
}

/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import CreateTemplatePartModal from '../create-template-part-modal';

export default function DuplicateTemplatePartModal( {
	templatePart,
	onClose,
	onSuccess,
} ) {
	const { createSuccessNotice } = useDispatch( noticesStore );

	function handleOnSuccess( newTemplatePart ) {
		createSuccessNotice(
			sprintf(
				// translators: %s: The new template part's title e.g. 'Call to action (copy)'.
				__( '"%s" duplicated.' ),
				templatePart.title
			),
			{
				type: 'snackbar',
				id: 'template-parts-create',
			}
		);

		onSuccess?.( newTemplatePart );
	}

	return (
		<CreateTemplatePartModal
			content={ templatePart.content }
			closeModal={ onClose }
			confirmLabel={ __( 'Duplicate' ) }
			defaultArea={ templatePart.area }
			defaultTitle={ sprintf(
				/* translators: %s: Existing template part title */
				__( '%s (Copy)' ),
				typeof templatePart.title === 'string'
					? templatePart.title
					: templatePart.title.raw
			) }
			modalTitle={ __( 'Duplicate template part' ) }
			onCreate={ handleOnSuccess }
			onError={ onClose }
		/>
	);
}

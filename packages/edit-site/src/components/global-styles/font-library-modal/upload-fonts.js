/**
 * WordPress dependencies
 */
import { __experimentalSpacer as Spacer } from '@wordpress/components';

/**
 * Internal dependencies
 */
import LocalFonts from './local-fonts';

function UploadFonts( { onRequestClose } ) {
	return (
		<>
			<Spacer margin={ 8 } />
			<LocalFonts onRequestClose={ onRequestClose } />
		</>
	);
}

export default UploadFonts;

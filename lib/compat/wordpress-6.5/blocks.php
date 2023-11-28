<?php
/**
 * Block functions specific for the Gutenberg editor plugin.
 *
 * @package gutenberg
 */

/**
 * Registers a new block style for one or more block types.
 *
 * @since 6.5.0
 *
 * @param string|array $block_name       Block type name including namespace or array of namespaced block type names.
 * @param array        $style_properties Array containing the properties of the style name, label,
 *                                 style_handle (name of the stylesheet to be enqueued),
 *                                 inline_style (string containing the CSS to be added),
 *                                 style_data (theme.json-like object to generate CSS from).
 * @return bool True if all block styles were registered with success and false otherwise.
 */
function gutenberg_register_block_style( $block_name, $style_properties ) {
	if ( ! is_string( $block_name ) && ! is_array( $block_name ) ) {
		_doing_it_wrong(
			__METHOD__,
			__( 'Block name must be a string or array.', 'gutenberg' ),
			'5.3.0'
		);

		return false;
	}

	$block_names  = is_string( $block_name ) ? array( $block_name ) : $block_name;
	$style_data   = $style_properties['style_data'] ?? null;
	$style_handle = str_replace( '/', '-', implode( '-', $block_names ) );

	// Theme.json processing of block style variations, currently verifies the
	// the variation against those registered via block.json or
	// `register_block_style`. As a result, the block style needs to be
	// registered before a stylesheet is generated from any style data.
	// To do this, a stylesheet handle will still need to be generated
	// and the style object removed from the registered style properties.
	if ( $style_data ) {
		unset( $style_properties['style_data'] );
		$style_properties['style_handle'] = $style_handle;
	}

	$result = true;

	foreach ( $block_names as $name ) {
		if ( ! WP_Block_Styles_Registry::get_instance()->register( $name, $style_properties ) ) {
			$result = false;
		}
	}

	if ( ! empty( $style_data ) ) {
		// Process theme.json-like style object into stylesheet to enqueue.
		$block_styles = array();
		foreach ( $block_names as $name ) {
			$block_styles[ $name ] = array(
				'variations' => array(
					$style_properties['name'] => $style_data,
				),
			);
		}
		$config     = array(
			'version' => 2,
			'styles'  => array( 'blocks' => $block_styles ),
		);
		$theme_json = new WP_Theme_JSON_Gutenberg( $config, 'blocks' );
		$stylesheet = $theme_json->get_stylesheet(
			array( 'styles' ),
			array( 'custom' ),
			array( 'skip_root_layout_styles' => true )
		);

		// TODO: Work out the correct approach to registering the stylesheet.
		// What needs to be done here for when block styles are being loaded separately?
		// Does the registration of this stylesheet need to depend on the relevant blocks
		// or block style being used on a page?
		wp_register_style( $style_handle, false );
		wp_add_inline_style( $style_handle, $stylesheet );
	}

	return $result;
}

<?php
// display errors
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
/**
 * Init hooks.
 *
 * @package gutenberg
 */

/**
 * Gutenberg's Menu.
 *
 * Adds a new wp-admin menu page for the Gutenberg editor.
 *
 * @since 0.1.0
 */
function gutenberg_menu() {
	add_menu_page(
		'Gutenberg',
		'Gutenberg',
		'edit_posts',
		'gutenberg',
		'',
		'dashicons-edit'
	);

	add_submenu_page(
		'gutenberg',
		__( 'Demo', 'gutenberg' ),
		__( 'Demo', 'gutenberg' ),
		'edit_posts',
		'gutenberg'
	);

	if ( current_user_can( 'edit_posts' ) ) {
		add_submenu_page(
			'gutenberg',
			__( 'Support', 'gutenberg' ),
			__( 'Support', 'gutenberg' ),
			'edit_posts',
			__( 'https://wordpress.org/support/plugin/gutenberg/', 'gutenberg' )
		);
		add_submenu_page(
			'gutenberg',
			__( 'Documentation', 'gutenberg' ),
			__( 'Documentation', 'gutenberg' ),
			'edit_posts',
			'https://developer.wordpress.org/block-editor/'
		);
	}

	add_submenu_page(
		'gutenberg',
		__( 'Experiments Settings', 'gutenberg' ),
		__( 'Experiments', 'gutenberg' ),
		'edit_posts',
		'gutenberg-experiments',
		'the_gutenberg_experiments'
	);
}
add_action( 'admin_menu', 'gutenberg_menu', 9 );

if ( ! function_exists( 'gutenberg_render_blocks_from_request' ) ) {
	/**
	 * Render blocks from a REST API request.
	 *
	 * @param mixed $request The current request.
	 *
	 * @return string
	 */
	function gutenberg_render_blocks_from_request( $request ) {
		return do_blocks( $request->get_json_params() );
	}
}

if ( ! function_exists( 'register_gutenberg_render_blocks_endpoint' ) ) {
	/**
	 * Register custom REST endpoint for rendering blocks.
	 *
	 * @return void
	 */
	function register_gutenberg_render_blocks_endpoint() {
		register_rest_route(
			'wp/v2',
			'/render_blocks',
			array(
				'methods'             => 'POST',
				'callback'            => 'gutenberg_render_blocks_from_request',
				'permission_callback' => '__return_true',
			)
		);
	}
}

add_action( 'rest_api_init', 'register_gutenberg_render_blocks_endpoint' );

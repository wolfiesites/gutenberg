/**
 * WordPress dependencies
 */
import { useRef } from '@wordpress/element';
import { useRefEffect } from '@wordpress/compose';
import { ENTER } from '@wordpress/keycodes';
import { insert, remove } from '@wordpress/rich-text';
import { useRegistry } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { splitValue } from './split-value';

export function useEnter( props ) {
	const registry = useRegistry();
	const propsRef = useRef( props );
	propsRef.current = props;
	return useRefEffect( ( element ) => {
		function onKeyDown( event ) {
			if ( event.defaultPrevented ) {
				return;
			}

			if ( event.target !== element ) {
				return;
			}

			if ( event.keyCode !== ENTER ) {
				return;
			}

			const {
				removeEditorOnlyFormats,
				value,
				onReplace,
				onSplit,
				onChange,
				disableLineBreaks,
				onSplitAtEnd,
				onSplitAtDoubleLineEnd,
			} = propsRef.current;

			event.preventDefault();

			const _value = { ...value };
			_value.formats = removeEditorOnlyFormats( value );
			const canSplit = onReplace && onSplit;

			const { text, start, end } = _value;

			if ( canSplit ) {
				splitValue( {
					value: _value,
					onReplace,
					onSplit,
				} );
			} else if ( onSplitAtEnd && start === end && end === text.length ) {
				onSplitAtEnd();
			} else if (
				// For some blocks it's desirable to split at the end of the
				// block when there are two line breaks at the end of the
				// block, so triple Enter exits the block.
				onSplitAtDoubleLineEnd &&
				start === end &&
				end === text.length &&
				text.slice( -2 ) === '\n\n'
			) {
				registry.batch( () => {
					_value.start = _value.end - 2;
					onChange( remove( _value ) );
					onSplitAtDoubleLineEnd();
				} );
			} else if ( ! disableLineBreaks ) {
				onChange( insert( _value, '\n' ) );
			}
		}

		// Attach the listener to the document so parent elements have the
		// chance to prevent the default behavior.
		element.ownerDocument.addEventListener( 'keydown', onKeyDown );
		return () => {
			element.ownerDocument.removeEventListener( 'keydown', onKeyDown );
		};
	}, [] );
}

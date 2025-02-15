/**
 * External dependencies
 */
import { h, type ComponentChild, type JSX } from 'preact';
/**
 * Internal dependencies
 */
import { directivePrefix as p } from './constants';
import { warn } from './utils/warn';

const ignoreAttr = `data-${ p }-ignore`;
const islandAttr = `data-${ p }-interactive`;
const fullPrefix = `data-${ p }-`;
const namespaces: Array< string | null > = [];
const currentNamespace = () => namespaces[ namespaces.length - 1 ] ?? null;

// Regular expression for directive parsing.
const directiveParser = new RegExp(
	`^data-${ p }-` + // ${p} must be a prefix string, like 'wp'.
		// Match alphanumeric characters including hyphen-separated
		// segments. It excludes underscore intentionally to prevent confusion.
		// E.g., "custom-directive".
		'([a-z0-9]+(?:-[a-z0-9]+)*)' +
		// (Optional) Match '--' followed by any alphanumeric charachters. It
		// excludes underscore intentionally to prevent confusion, but it can
		// contain multiple hyphens. E.g., "--custom-prefix--with-more-info".
		'(?:--([a-z0-9_-]+))?$',
	'i' // Case insensitive.
);

// Regular expression for reference parsing. It can contain a namespace before
// the reference, separated by `::`, like `some-namespace::state.somePath`.
// Namespaces can contain any alphanumeric characters, hyphens, underscores or
// forward slashes. References don't have any restrictions.
const nsPathRegExp = /^(?<namespace>[\w_\/-]+)::(?<value>.+)$/;

export const hydratedIslands = new WeakSet();

/**
 * Recursive function that transforms a DOM tree into vDOM.
 *
 * @param root The root element or node to start traversing on.
 * @return The resulting vDOM tree.
 */
export function toVdom( root: Node ): Array< ComponentChild > {
	const treeWalker = document.createTreeWalker(
		root,
		205 // TEXT + CDATA_SECTION + COMMENT + PROCESSING_INSTRUCTION + ELEMENT
	);

	function walk(
		node: Node
	): [ ComponentChild ] | [ ComponentChild, Node | null ] {
		const { nodeType } = node;

		// TEXT_NODE (3)
		if ( nodeType === 3 ) {
			return [ ( node as Text ).data ];
		}

		// CDATA_SECTION_NODE (4)
		if ( nodeType === 4 ) {
			const next = treeWalker.nextSibling();
			( node as CDATASection ).replaceWith(
				new window.Text( ( node as CDATASection ).nodeValue ?? '' )
			);
			return [ node.nodeValue, next ];
		}

		// COMMENT_NODE (8) || PROCESSING_INSTRUCTION_NODE (7)
		if ( nodeType === 8 || nodeType === 7 ) {
			const next = treeWalker.nextSibling();
			( node as Comment | ProcessingInstruction ).remove();
			return [ null, next ];
		}

		const elementNode = node as HTMLElement;
		const { attributes } = elementNode;
		const localName = elementNode.localName as keyof JSX.IntrinsicElements;

		const props: Record< string, any > = {};
		const children: Array< ComponentChild > = [];
		const directives: Array<
			[ name: string, namespace: string | null, value: unknown ]
		> = [];
		let ignore = false;
		let island = false;

		for ( let i = 0; i < attributes.length; i++ ) {
			const attributeName = attributes[ i ].name;
			if (
				attributeName[ fullPrefix.length ] &&
				attributeName.slice( 0, fullPrefix.length ) === fullPrefix
			) {
				if ( attributeName === ignoreAttr ) {
					ignore = true;
				} else {
					const regexCaptureGroups = nsPathRegExp.exec(
						attributes[ i ].value
					)?.groups;
					const namespace = regexCaptureGroups?.namespace ?? null;
					let value: any =
						regexCaptureGroups?.value ?? attributes[ i ].value;
					try {
						value = value && JSON.parse( value );
					} catch ( e ) {}
					if ( attributeName === islandAttr ) {
						island = true;
						const islandNamespace =
							// eslint-disable-next-line no-nested-ternary
							typeof value === 'string'
								? value
								: typeof value?.namespace === 'string'
								? value.namespace
								: null;
						namespaces.push( islandNamespace );
					} else {
						directives.push( [ attributeName, namespace, value ] );
					}
				}
			} else if ( attributeName === 'ref' ) {
				continue;
			}
			props[ attributeName ] = attributes[ i ].value;
		}

		if ( ignore && ! island ) {
			return [
				h< any, any >( localName, {
					...props,
					innerHTML: elementNode.innerHTML,
					__directives: { ignore: true },
				} ),
			];
		}
		if ( island ) {
			hydratedIslands.add( elementNode );
		}

		if ( directives.length ) {
			props.__directives = directives.reduce(
				( obj, [ name, ns, value ] ) => {
					const directiveMatch = directiveParser.exec( name );
					if ( directiveMatch === null ) {
						warn( `Invalid directive: ${ name }.` );
						return obj;
					}
					const prefix = directiveMatch[ 1 ] || '';
					const suffix = directiveMatch[ 2 ] || 'default';

					obj[ prefix ] = obj[ prefix ] || [];
					obj[ prefix ].push( {
						namespace: ns ?? currentNamespace(),
						value,
						suffix,
					} );
					return obj;
				},
				{}
			);
		}

		// @ts-expect-error Fixed in upcoming preact release https://github.com/preactjs/preact/pull/4334
		if ( localName === 'template' ) {
			props.content = [
				...( elementNode as HTMLTemplateElement ).content.childNodes,
			].map( ( childNode ) => toVdom( childNode ) );
		} else {
			let child = treeWalker.firstChild();
			if ( child ) {
				while ( child ) {
					const [ vnode, nextChild ] = walk( child );
					if ( vnode ) {
						children.push( vnode );
					}
					child = nextChild || treeWalker.nextSibling();
				}
				treeWalker.parentNode();
			}
		}

		// Restore previous namespace.
		if ( island ) {
			namespaces.pop();
		}

		return [ h( localName, props, children ) ];
	}

	return walk( treeWalker.currentNode );
}

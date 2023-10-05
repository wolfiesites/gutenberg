/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';
import { parse } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../../store';
import { PATTERN_CORE_SOURCES, PATTERN_TYPES } from '../../../utils/constants';
import { useExistingTemplateParts } from '../../../utils/template-part-create';
import { unlock } from '../../../lock-unlock';

function injectThemeAttributeInBlockTemplateContent(
	block,
	currentThemeStylesheet
) {
	block.innerBlocks = block.innerBlocks.map( ( innerBlock ) => {
		return injectThemeAttributeInBlockTemplateContent(
			innerBlock,
			currentThemeStylesheet
		);
	} );

	if (
		block.name === 'core/template-part' &&
		block.attributes.theme === undefined
	) {
		block.attributes.theme = currentThemeStylesheet;
	}
	return block;
}

// TODO - describe what this does?
function filterPatterns( patterns, template ) {
	// Filter out duplicates.
	const filterOutDuplicatesByName = ( currentItem, index, items ) =>
		index === items.findIndex( ( item ) => currentItem.name === item.name );

	// Filter out core patterns.
	const filterOutCorePatterns = ( pattern ) =>
		! PATTERN_CORE_SOURCES.includes( pattern.source );

	// Filter only the patterns that are compatible with the current template.
	const filterCompatiblePatterns = ( pattern ) =>
		pattern.templateTypes?.includes( template.slug ) ||
		pattern.blockTypes?.includes( 'core/template-part/' + template.area ); // TODO - get this working for templates.

	return patterns.filter(
		filterOutCorePatterns &&
			filterOutDuplicatesByName &&
			filterCompatiblePatterns
	);
}

// TODO - describe what this does?
function preparePatterns( patterns, currentThemeStylesheet ) {
	return patterns.map( ( pattern ) => ( {
		...pattern,
		keywords: pattern.keywords || [],
		type: PATTERN_TYPES.theme,
		blocks: parse( pattern.content, {
			__unstableSkipMigrationLogs: true,
		} ).map( ( block ) =>
			injectThemeAttributeInBlockTemplateContent(
				block,
				currentThemeStylesheet
			)
		),
	} ) );
}

export function useAvailablePatterns( template ) {
	const { blockPatterns, restBlockPatterns, currentThemeStylesheet } =
		useSelect( ( select ) => {
			const { getSettings } = unlock( select( editSiteStore ) );
			const settings = getSettings();

			return {
				blockPatterns:
					settings.__experimentalAdditionalBlockPatterns ??
					settings.__experimentalBlockPatterns,
				restBlockPatterns: select( coreStore ).getBlockPatterns(),
				currentThemeStylesheet:
					select( coreStore ).getCurrentTheme().stylesheet,
			};
		}, [] );

	return useMemo( () => {
		const mergedPatterns = [
			...( blockPatterns || [] ),
			...( restBlockPatterns || [] ),
		];
		const filteredPatterns = filterPatterns( mergedPatterns, template );
		return preparePatterns( filteredPatterns, currentThemeStylesheet );
	}, [ blockPatterns, restBlockPatterns, template, currentThemeStylesheet ] );
}

function prepareTemplateParts( templateParts, template ) {
	// Filter only the patterns that are compatible with the current template.
	const filterCompatiblePatterns = ( templatePart ) =>
		templatePart.area?.includes( template.area );

	return templateParts
		.filter( filterCompatiblePatterns )
		.map( ( templatePart ) => ( {
			id: templatePart.id,
			area: templatePart.area,
			keywords: templateParts.keywords || [],
			type: PATTERN_TYPES.theme, //TODO?
			blocks: parse( templatePart.content.raw, {
				__unstableSkipMigrationLogs: true,
			} ),
		} ) );
}

export function useAvailableTemplateParts( template ) {
	const existingTemplateParts = useExistingTemplateParts();

	return useMemo( () => {
		return prepareTemplateParts( existingTemplateParts || [], template );
	}, [ existingTemplateParts, template ] );
}

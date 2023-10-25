/**
 * WordPress dependencies
 */
import { __dangerousOptInToUnstableAPIsOnlyForCoreModules } from '@wordpress/private-apis';

/**
 * Internal dependencies
 */
import {
	Composite as CompositeV2,
	CompositeGroup as CompositeGroupV2,
	CompositeItem as CompositeItemV2,
	CompositeRow as CompositeRowV2,
	useCompositeStore as useCompositeStoreV2,
} from './composite/v2';
import { default as CustomSelectControl } from './custom-select-control';
import { positionToPlacement as __experimentalPopoverLegacyPositionToPlacement } from './popover/utils';
import { default as ProgressBar } from './progress-bar';
import { createPrivateSlotFill } from './slot-fill';
import {
	DropdownMenu as DropdownMenuV2Ariakit,
	DropdownMenuGroup as DropdownMenuGroupV2Ariakit,
	DropdownMenuGroupLabel as DropdownMenuGroupLabelV2Ariakit,
	DropdownMenuItem as DropdownMenuItemV2Ariakit,
	DropdownMenuCheckboxItem as DropdownMenuCheckboxItemV2Ariakit,
	DropdownMenuRadioItem as DropdownMenuRadioItemV2Ariakit,
	DropdownMenuSeparator as DropdownMenuSeparatorV2Ariakit,
} from './dropdown-menu-v2-ariakit';
import { ComponentsContext } from './context/context-system-provider';
import Theme from './theme';
import Tabs from './tabs';

export const { lock, unlock } =
	__dangerousOptInToUnstableAPIsOnlyForCoreModules(
		'I know using unstable features means my theme or plugin will inevitably break in the next version of WordPress.',
		'@wordpress/components'
	);

export const privateApis = {};
lock( privateApis, {
	CompositeV2,
	CompositeGroupV2,
	CompositeItemV2,
	CompositeRowV2,
	useCompositeStoreV2,
	CustomSelectControl,
	__experimentalPopoverLegacyPositionToPlacement,
	createPrivateSlotFill,
	ComponentsContext,
	ProgressBar,
	Tabs,
	Theme,
	DropdownMenuV2Ariakit,
	DropdownMenuGroupV2Ariakit,
	DropdownMenuGroupLabelV2Ariakit,
	DropdownMenuItemV2Ariakit,
	DropdownMenuCheckboxItemV2Ariakit,
	DropdownMenuRadioItemV2Ariakit,
	DropdownMenuSeparatorV2Ariakit,
} );

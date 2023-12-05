"use strict";(self.webpackChunkgutenberg=self.webpackChunkgutenberg||[]).push([[3043],{"./packages/components/build-module/grid/component.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return grid_component}});var react=__webpack_require__("./node_modules/react/index.js"),context_connect=__webpack_require__("./packages/components/build-module/context/context-connect.js"),component=__webpack_require__("./packages/components/build-module/view/component.js"),emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),use_context_system=__webpack_require__("./packages/components/build-module/context/use-context-system.js");const ALIGNMENTS={bottom:{alignItems:"flex-end",justifyContent:"center"},bottomLeft:{alignItems:"flex-start",justifyContent:"flex-end"},bottomRight:{alignItems:"flex-end",justifyContent:"flex-end"},center:{alignItems:"center",justifyContent:"center"},spaced:{alignItems:"center",justifyContent:"space-between"},left:{alignItems:"center",justifyContent:"flex-start"},right:{alignItems:"center",justifyContent:"flex-end"},stretch:{alignItems:"stretch"},top:{alignItems:"flex-start",justifyContent:"center"},topLeft:{alignItems:"flex-start",justifyContent:"flex-start"},topRight:{alignItems:"flex-start",justifyContent:"flex-end"}};var use_responsive_value=__webpack_require__("./packages/components/build-module/utils/use-responsive-value.js"),config_values=__webpack_require__("./packages/components/build-module/utils/config-values.js"),use_cx=__webpack_require__("./packages/components/build-module/utils/hooks/use-cx.js");function useGrid(props){const{align:align,alignment:alignment,className:className,columnGap:columnGap,columns:columns=2,gap:gap=3,isInline:isInline=!1,justify:justify,rowGap:rowGap,rows:rows,templateColumns:templateColumns,templateRows:templateRows,...otherProps}=(0,use_context_system.y)(props,"Grid"),columnsAsArray=Array.isArray(columns)?columns:[columns],column=(0,use_responsive_value.V)(columnsAsArray),rowsAsArray=Array.isArray(rows)?rows:[rows],row=(0,use_responsive_value.V)(rowsAsArray),gridTemplateColumns=templateColumns||!!columns&&`repeat( ${column}, 1fr )`,gridTemplateRows=templateRows||!!rows&&`repeat( ${row}, 1fr )`,cx=(0,use_cx.I)();return{...otherProps,className:(0,react.useMemo)((()=>{const alignmentProps=function getAlignmentProps(alignment){return alignment?ALIGNMENTS[alignment]:{}}(alignment),gridClasses=(0,emotion_react_browser_esm.iv)({alignItems:align,display:isInline?"inline-grid":"grid",gap:`calc( ${config_values.Z.gridBase} * ${gap} )`,gridTemplateColumns:gridTemplateColumns||void 0,gridTemplateRows:gridTemplateRows||void 0,gridRowGap:rowGap,gridColumnGap:columnGap,justifyContent:justify,verticalAlign:isInline?"middle":void 0,...alignmentProps},"","","","");return cx(gridClasses,className)}),[align,alignment,className,columnGap,cx,gap,gridTemplateColumns,gridTemplateRows,isInline,justify,rowGap])}}function UnconnectedGrid(props,forwardedRef){const gridProps=useGrid(props);return(0,react.createElement)(component.Z,{...gridProps,ref:forwardedRef})}var grid_component=(0,context_connect.Iq)(UnconnectedGrid,"Grid");UnconnectedGrid.__docgenInfo={description:"",methods:[],displayName:"UnconnectedGrid"}},"./packages/components/build-module/tools-panel/context.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{K:function(){return useToolsPanelContext},h:function(){return ToolsPanelContext}});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const noop=()=>{},ToolsPanelContext=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)({menuItems:{default:{},optional:{}},hasMenuItems:!1,isResetting:!1,shouldRenderPlaceholderItems:!1,registerPanelItem:noop,deregisterPanelItem:noop,flagItemCustomization:noop,registerResetAllFilter:noop,deregisterResetAllFilter:noop,areAllOptionalControlsHidden:!0}),useToolsPanelContext=()=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(ToolsPanelContext)},"./packages/components/build-module/tools-panel/styles.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{DK:function(){return ToolsPanel},FN:function(){return ToolsPanelHeader},Ju:function(){return ResetLabel},VY:function(){return ToolsPanelItem},Y3:function(){return DefaultControlsItem},cg:function(){return ToolsPanelWithInnerWrapper},d5:function(){return ToolsPanelHeading},h_:function(){return DropdownMenu},rg:function(){return ToolsPanelItemPlaceholder},sq:function(){return ToolsPanelHiddenInnerWrapper}});var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"),_emotion_react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),_base_control_styles_base_control_styles__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/components/build-module/base-control/styles/base-control-styles.js"),_input_control_styles_input_control_styles__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./packages/components/build-module/input-control/styles/input-control-styles.js"),_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/components/build-module/utils/config-values.js"),_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/components/build-module/utils/colors-values.js"),_utils__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./packages/components/build-module/utils/rtl.js"),_utils_space__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/build-module/utils/space.js");const toolsPanelGrid={columns:columns=>(0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)("grid-template-columns:",`repeat( ${columns}, minmax(0, 1fr) )`,";","","",""),spacing:(0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)("column-gap:",(0,_utils_space__WEBPACK_IMPORTED_MODULE_2__.D)(2),";row-gap:",(0,_utils_space__WEBPACK_IMPORTED_MODULE_2__.D)(4),";","","",""),item:{fullWidth:{name:"18iuzk9",styles:"grid-column:1/-1"}}},ToolsPanel=columns=>(0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(toolsPanelGrid.columns(columns)," ",toolsPanelGrid.spacing," border-top:",_utils__WEBPACK_IMPORTED_MODULE_3__.Z.borderWidth," solid ",_utils__WEBPACK_IMPORTED_MODULE_4__.D.gray[300],";margin-top:-1px;padding:",(0,_utils_space__WEBPACK_IMPORTED_MODULE_2__.D)(4),";","","",""),ToolsPanelWithInnerWrapper=columns=>(0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(">div:not( :first-of-type ){display:grid;",toolsPanelGrid.columns(columns)," ",toolsPanelGrid.spacing," ",toolsPanelGrid.item.fullWidth,";}","","",""),ToolsPanelHiddenInnerWrapper={name:"huufmu",styles:">div:not( :first-of-type ){display:none;}"},ToolsPanelHeader=(0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(toolsPanelGrid.item.fullWidth," gap:",(0,_utils_space__WEBPACK_IMPORTED_MODULE_2__.D)(2),";.components-dropdown-menu{margin:",(0,_utils_space__WEBPACK_IMPORTED_MODULE_2__.D)(-1)," 0;line-height:0;}&&&& .components-dropdown-menu__toggle{padding:0;min-width:",(0,_utils_space__WEBPACK_IMPORTED_MODULE_2__.D)(6),";}","","",""),ToolsPanelHeading={name:"1pmxm02",styles:"font-size:inherit;font-weight:500;line-height:normal;&&{margin:0;}"},ToolsPanelItem=(0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(toolsPanelGrid.item.fullWidth,"&>div,&>fieldset{padding-bottom:0;margin-bottom:0;max-width:100%;}&& ",_base_control_styles_base_control_styles__WEBPACK_IMPORTED_MODULE_5__.im,"{margin-bottom:0;",_base_control_styles_base_control_styles__WEBPACK_IMPORTED_MODULE_5__.ob,":last-child{margin-bottom:0;}}",_base_control_styles_base_control_styles__WEBPACK_IMPORTED_MODULE_5__.vB,"{margin-bottom:0;}&& ",_input_control_styles_input_control_styles__WEBPACK_IMPORTED_MODULE_6__.ub,"{label{line-height:1.4em;}}","","",""),ToolsPanelItemPlaceholder={name:"eivff4",styles:"display:none"},DropdownMenu={name:"16gsvie",styles:"min-width:200px"},ResetLabel=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.Z)("span",{target:"ews648u0"})("color:",_utils__WEBPACK_IMPORTED_MODULE_4__.D.theme.accentDarker10,";font-size:11px;font-weight:500;line-height:1.4;",(0,_utils__WEBPACK_IMPORTED_MODULE_7__.b)({marginLeft:(0,_utils_space__WEBPACK_IMPORTED_MODULE_2__.D)(3)})," text-transform:uppercase;"),DefaultControlsItem=(0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)("color:",_utils__WEBPACK_IMPORTED_MODULE_4__.D.gray[900],";&&[aria-disabled='true']{color:",_utils__WEBPACK_IMPORTED_MODULE_4__.D.gray[700],";opacity:1;&:hover{color:",_utils__WEBPACK_IMPORTED_MODULE_4__.D.gray[700],";}",ResetLabel,"{opacity:0.3;}}","","","")},"./packages/components/build-module/tools-panel/tools-panel-item/component.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return tools_panel_item_component}});var react=__webpack_require__("./node_modules/react/index.js"),use_previous=__webpack_require__("./packages/compose/build-module/hooks/use-previous/index.js"),styles=__webpack_require__("./packages/components/build-module/tools-panel/styles.js"),context=__webpack_require__("./packages/components/build-module/tools-panel/context.js"),use_context_system=__webpack_require__("./packages/components/build-module/context/use-context-system.js"),use_cx=__webpack_require__("./packages/components/build-module/utils/hooks/use-cx.js");const noop=()=>{};var component=__webpack_require__("./packages/components/build-module/view/component.js");const UnconnectedToolsPanelItem=(props,forwardedRef)=>{const{children:children,isShown:isShown,shouldRenderPlaceholder:shouldRenderPlaceholder,...toolsPanelItemProps}=function useToolsPanelItem(props){const{className:className,hasValue:hasValue,isShownByDefault:isShownByDefault=!1,label:label,panelId:panelId,resetAllFilter:resetAllFilter=noop,onDeselect:onDeselect,onSelect:onSelect,...otherProps}=(0,use_context_system.y)(props,"ToolsPanelItem"),{panelId:currentPanelId,menuItems:menuItems,registerResetAllFilter:registerResetAllFilter,deregisterResetAllFilter:deregisterResetAllFilter,registerPanelItem:registerPanelItem,deregisterPanelItem:deregisterPanelItem,flagItemCustomization:flagItemCustomization,isResetting:isResetting,shouldRenderPlaceholderItems:shouldRenderPlaceholder,firstDisplayedItem:firstDisplayedItem,lastDisplayedItem:lastDisplayedItem,__experimentalFirstVisibleItemClass:__experimentalFirstVisibleItemClass,__experimentalLastVisibleItemClass:__experimentalLastVisibleItemClass}=(0,context.K)(),hasValueCallback=(0,react.useCallback)(hasValue,[panelId,hasValue]),resetAllFilterCallback=(0,react.useCallback)(resetAllFilter,[panelId,resetAllFilter]),previousPanelId=(0,use_previous.Z)(currentPanelId),hasMatchingPanel=currentPanelId===panelId||null===currentPanelId;(0,react.useLayoutEffect)((()=>(hasMatchingPanel&&null!==previousPanelId&&registerPanelItem({hasValue:hasValueCallback,isShownByDefault:isShownByDefault,label:label,panelId:panelId}),()=>{(null===previousPanelId&&currentPanelId||currentPanelId===panelId)&&deregisterPanelItem(label)})),[currentPanelId,hasMatchingPanel,isShownByDefault,label,hasValueCallback,panelId,previousPanelId,registerPanelItem,deregisterPanelItem]),(0,react.useEffect)((()=>(hasMatchingPanel&&registerResetAllFilter(resetAllFilterCallback),()=>{hasMatchingPanel&&deregisterResetAllFilter(resetAllFilterCallback)})),[registerResetAllFilter,deregisterResetAllFilter,resetAllFilterCallback,hasMatchingPanel]);const menuGroup=isShownByDefault?"default":"optional",isMenuItemChecked=menuItems?.[menuGroup]?.[label],wasMenuItemChecked=(0,use_previous.Z)(isMenuItemChecked),isRegistered=void 0!==menuItems?.[menuGroup]?.[label],isValueSet=hasValue(),wasValueSet=(0,use_previous.Z)(isValueSet),newValueSet=isValueSet&&!wasValueSet;(0,react.useEffect)((()=>{newValueSet&&(isShownByDefault||null===currentPanelId)&&flagItemCustomization(label,menuGroup)}),[currentPanelId,newValueSet,isShownByDefault,menuGroup,label,flagItemCustomization]),(0,react.useEffect)((()=>{isRegistered&&!isResetting&&hasMatchingPanel&&(!isMenuItemChecked||isValueSet||wasMenuItemChecked||onSelect?.(),!isMenuItemChecked&&wasMenuItemChecked&&onDeselect?.())}),[hasMatchingPanel,isMenuItemChecked,isRegistered,isResetting,isValueSet,wasMenuItemChecked,onSelect,onDeselect]);const isShown=isShownByDefault?void 0!==menuItems?.[menuGroup]?.[label]:isMenuItemChecked,cx=(0,use_cx.I)(),classes=(0,react.useMemo)((()=>{const shouldApplyPlaceholderStyles=shouldRenderPlaceholder&&!isShown,firstItemStyle=firstDisplayedItem===label&&__experimentalFirstVisibleItemClass,lastItemStyle=lastDisplayedItem===label&&__experimentalLastVisibleItemClass;return cx(styles.VY,shouldApplyPlaceholderStyles&&styles.rg,!shouldApplyPlaceholderStyles&&className,firstItemStyle,lastItemStyle)}),[isShown,shouldRenderPlaceholder,className,cx,firstDisplayedItem,lastDisplayedItem,__experimentalFirstVisibleItemClass,__experimentalLastVisibleItemClass,label]);return{...otherProps,isShown:isShown,shouldRenderPlaceholder:shouldRenderPlaceholder,className:classes}}(props);return isShown?(0,react.createElement)(component.Z,{...toolsPanelItemProps,ref:forwardedRef},children):shouldRenderPlaceholder?(0,react.createElement)(component.Z,{...toolsPanelItemProps,ref:forwardedRef}):null};var tools_panel_item_component=(0,__webpack_require__("./packages/components/build-module/context/context-connect.js").Iq)(UnconnectedToolsPanelItem,"ToolsPanelItem");UnconnectedToolsPanelItem.__docgenInfo={description:"",methods:[],displayName:"UnconnectedToolsPanelItem"}},"./packages/components/build-module/tools-panel/tools-panel/component.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return tools_panel_component}});var react=__webpack_require__("./node_modules/react/index.js"),build_module=__webpack_require__("./packages/a11y/build-module/index.js"),check=__webpack_require__("./packages/icons/build-module/library/check.js"),plus=__webpack_require__("./packages/icons/build-module/library/plus.js"),more_vertical=__webpack_require__("./packages/icons/build-module/library/more-vertical.js"),i18n_build_module=__webpack_require__("./packages/i18n/build-module/index.js"),dropdown_menu=__webpack_require__("./packages/components/build-module/dropdown-menu/index.js"),menu_group=__webpack_require__("./packages/components/build-module/menu-group/index.js"),menu_item=__webpack_require__("./packages/components/build-module/menu-item/index.js"),component=__webpack_require__("./packages/components/build-module/h-stack/component.js"),heading_component=__webpack_require__("./packages/components/build-module/heading/component.js"),styles=__webpack_require__("./packages/components/build-module/tools-panel/styles.js"),context=__webpack_require__("./packages/components/build-module/tools-panel/context.js"),use_context_system=__webpack_require__("./packages/components/build-module/context/use-context-system.js"),use_cx=__webpack_require__("./packages/components/build-module/utils/hooks/use-cx.js");var context_connect=__webpack_require__("./packages/components/build-module/context/context-connect.js");const DefaultControlsGroup=({itemClassName:itemClassName,items:items,toggleItem:toggleItem})=>{if(!items.length)return null;const resetSuffix=(0,react.createElement)(styles.Ju,{"aria-hidden":!0},(0,i18n_build_module.__)("Reset"));return(0,react.createElement)(menu_group.Z,{label:(0,i18n_build_module.__)("Defaults")},items.map((([label,hasValue])=>hasValue?(0,react.createElement)(menu_item.Z,{key:label,className:itemClassName,role:"menuitem",label:(0,i18n_build_module.gB)((0,i18n_build_module.__)("Reset %s"),label),onClick:()=>{toggleItem(label),(0,build_module.D)((0,i18n_build_module.gB)((0,i18n_build_module.__)("%s reset to default"),label),"assertive")},suffix:resetSuffix},label):(0,react.createElement)(menu_item.Z,{key:label,className:itemClassName,role:"menuitemcheckbox",isSelected:!0,"aria-disabled":!0},label))))},OptionalControlsGroup=({items:items,toggleItem:toggleItem})=>items.length?(0,react.createElement)(menu_group.Z,{label:(0,i18n_build_module.__)("Tools")},items.map((([label,isSelected])=>{const itemLabel=isSelected?(0,i18n_build_module.gB)((0,i18n_build_module.__)("Hide and reset %s"),label):(0,i18n_build_module.gB)((0,i18n_build_module.__)("Show %s"),label);return(0,react.createElement)(menu_item.Z,{key:label,icon:isSelected?check.Z:null,isSelected:isSelected,label:itemLabel,onClick:()=>{isSelected?(0,build_module.D)((0,i18n_build_module.gB)((0,i18n_build_module.__)("%s hidden and reset to default"),label),"assertive"):(0,build_module.D)((0,i18n_build_module.gB)((0,i18n_build_module.__)("%s is now visible"),label),"assertive"),toggleItem(label)},role:"menuitemcheckbox"},label)}))):null,ToolsPanelHeader=(props,forwardedRef)=>{const{areAllOptionalControlsHidden:areAllOptionalControlsHidden,defaultControlsItemClassName:defaultControlsItemClassName,dropdownMenuClassName:dropdownMenuClassName,hasMenuItems:hasMenuItems,headingClassName:headingClassName,headingLevel:headingLevel=2,label:labelText,menuItems:menuItems,resetAll:resetAll,toggleItem:toggleItem,...headerProps}=function useToolsPanelHeader(props){const{className:className,headingLevel:headingLevel=2,...otherProps}=(0,use_context_system.y)(props,"ToolsPanelHeader"),cx=(0,use_cx.I)(),classes=(0,react.useMemo)((()=>cx(styles.FN,className)),[className,cx]),dropdownMenuClassName=(0,react.useMemo)((()=>cx(styles.h_)),[cx]),headingClassName=(0,react.useMemo)((()=>cx(styles.d5)),[cx]),defaultControlsItemClassName=(0,react.useMemo)((()=>cx(styles.Y3)),[cx]),{menuItems:menuItems,hasMenuItems:hasMenuItems,areAllOptionalControlsHidden:areAllOptionalControlsHidden}=(0,context.K)();return{...otherProps,areAllOptionalControlsHidden:areAllOptionalControlsHidden,defaultControlsItemClassName:defaultControlsItemClassName,dropdownMenuClassName:dropdownMenuClassName,hasMenuItems:hasMenuItems,headingClassName:headingClassName,headingLevel:headingLevel,menuItems:menuItems,className:classes}}(props);if(!labelText)return null;const defaultItems=Object.entries(menuItems?.default||{}),optionalItems=Object.entries(menuItems?.optional||{}),dropDownMenuIcon=areAllOptionalControlsHidden?plus.Z:more_vertical.Z,dropDownMenuLabelText=(0,i18n_build_module.gB)((0,i18n_build_module._x)("%s options","Button label to reveal tool panel options"),labelText),dropdownMenuDescriptionText=areAllOptionalControlsHidden?(0,i18n_build_module.__)("All options are currently hidden"):void 0,canResetAll=[...defaultItems,...optionalItems].some((([,isSelected])=>isSelected));return(0,react.createElement)(component.Z,{...headerProps,ref:forwardedRef},(0,react.createElement)(heading_component.Z,{level:headingLevel,className:headingClassName},labelText),hasMenuItems&&(0,react.createElement)(dropdown_menu.Z,{icon:dropDownMenuIcon,label:dropDownMenuLabelText,menuProps:{className:dropdownMenuClassName},toggleProps:{isSmall:!0,describedBy:dropdownMenuDescriptionText}},(()=>(0,react.createElement)(react.Fragment,null,(0,react.createElement)(DefaultControlsGroup,{items:defaultItems,toggleItem:toggleItem,itemClassName:defaultControlsItemClassName}),(0,react.createElement)(OptionalControlsGroup,{items:optionalItems,toggleItem:toggleItem}),(0,react.createElement)(menu_group.Z,null,(0,react.createElement)(menu_item.Z,{"aria-disabled":!canResetAll,variant:"tertiary",onClick:()=>{canResetAll&&(resetAll(),(0,build_module.D)((0,i18n_build_module.__)("All options reset"),"assertive"))}},(0,i18n_build_module.__)("Reset all")))))))};var tools_panel_header_component=(0,context_connect.Iq)(ToolsPanelHeader,"ToolsPanelHeader");ToolsPanelHeader.__docgenInfo={description:"",methods:[],displayName:"ToolsPanelHeader"};const generateMenuItems=({panelItems:panelItems,shouldReset:shouldReset,currentMenuItems:currentMenuItems,menuItemOrder:menuItemOrder})=>{const newMenuItems={default:{},optional:{}},menuItems={default:{},optional:{}};return panelItems.forEach((({hasValue:hasValue,isShownByDefault:isShownByDefault,label:label})=>{const group=isShownByDefault?"default":"optional",existingItemValue=currentMenuItems?.[group]?.[label],value=existingItemValue||hasValue();newMenuItems[group][label]=!shouldReset&&value})),menuItemOrder.forEach((key=>{newMenuItems.default.hasOwnProperty(key)&&(menuItems.default[key]=newMenuItems.default[key]),newMenuItems.optional.hasOwnProperty(key)&&(menuItems.optional[key]=newMenuItems.optional[key])})),Object.keys(newMenuItems.default).forEach((key=>{menuItems.default.hasOwnProperty(key)||(menuItems.default[key]=newMenuItems.default[key])})),Object.keys(newMenuItems.optional).forEach((key=>{menuItems.optional.hasOwnProperty(key)||(menuItems.optional[key]=newMenuItems.optional[key])})),menuItems},isMenuItemTypeEmpty=obj=>obj&&0===Object.keys(obj).length;var grid_component=__webpack_require__("./packages/components/build-module/grid/component.js");const UnconnectedToolsPanel=(props,forwardedRef)=>{const{children:children,label:label,panelContext:panelContext,resetAllItems:resetAllItems,toggleItem:toggleItem,headingLevel:headingLevel,...toolsPanelProps}=function useToolsPanel(props){const{className:className,headingLevel:headingLevel=2,resetAll:resetAll,panelId:panelId,hasInnerWrapper:hasInnerWrapper=!1,shouldRenderPlaceholderItems:shouldRenderPlaceholderItems=!1,__experimentalFirstVisibleItemClass:__experimentalFirstVisibleItemClass,__experimentalLastVisibleItemClass:__experimentalLastVisibleItemClass,...otherProps}=(0,use_context_system.y)(props,"ToolsPanel"),isResetting=(0,react.useRef)(!1),wasResetting=isResetting.current;(0,react.useEffect)((()=>{wasResetting&&(isResetting.current=!1)}),[wasResetting]);const[panelItems,setPanelItems]=(0,react.useState)([]),[menuItemOrder,setMenuItemOrder]=(0,react.useState)([]),[resetAllFilters,setResetAllFilters]=(0,react.useState)([]),registerPanelItem=(0,react.useCallback)((item=>{setPanelItems((items=>{const newItems=[...items],existingIndex=newItems.findIndex((oldItem=>oldItem.label===item.label));return-1!==existingIndex&&newItems.splice(existingIndex,1),[...newItems,item]})),setMenuItemOrder((items=>items.includes(item.label)?items:[...items,item.label]))}),[setPanelItems,setMenuItemOrder]),deregisterPanelItem=(0,react.useCallback)((label=>{setPanelItems((items=>{const newItems=[...items],index=newItems.findIndex((item=>item.label===label));return-1!==index&&newItems.splice(index,1),newItems}))}),[setPanelItems]),registerResetAllFilter=(0,react.useCallback)((newFilter=>{setResetAllFilters((filters=>[...filters,newFilter]))}),[setResetAllFilters]),deregisterResetAllFilter=(0,react.useCallback)((filterToRemove=>{setResetAllFilters((filters=>filters.filter((filter=>filter!==filterToRemove))))}),[setResetAllFilters]),[menuItems,setMenuItems]=(0,react.useState)({default:{},optional:{}});(0,react.useEffect)((()=>{setMenuItems((prevState=>generateMenuItems({panelItems:panelItems,shouldReset:!1,currentMenuItems:prevState,menuItemOrder:menuItemOrder})))}),[panelItems,setMenuItems,menuItemOrder]);const flagItemCustomization=(0,react.useCallback)(((label,group="default")=>{setMenuItems((items=>({...items,[group]:{...items[group],[label]:!0}})))}),[setMenuItems]),[areAllOptionalControlsHidden,setAreAllOptionalControlsHidden]=(0,react.useState)(!1);(0,react.useEffect)((()=>{if(isMenuItemTypeEmpty(menuItems?.default)&&!isMenuItemTypeEmpty(menuItems?.optional)){const allControlsHidden=!Object.entries(menuItems.optional).some((([,isSelected])=>isSelected));setAreAllOptionalControlsHidden(allControlsHidden)}}),[menuItems,setAreAllOptionalControlsHidden]);const cx=(0,use_cx.I)(),classes=(0,react.useMemo)((()=>{const wrapperStyle=hasInnerWrapper&&styles.cg(2),emptyStyle=isMenuItemTypeEmpty(menuItems?.default)&&areAllOptionalControlsHidden&&styles.sq;return cx(styles.DK(2),wrapperStyle,emptyStyle,className)}),[areAllOptionalControlsHidden,className,cx,hasInnerWrapper,menuItems]),toggleItem=(0,react.useCallback)((label=>{const currentItem=panelItems.find((item=>item.label===label));if(!currentItem)return;const menuGroup=currentItem.isShownByDefault?"default":"optional",newMenuItems={...menuItems,[menuGroup]:{...menuItems[menuGroup],[label]:!menuItems[menuGroup][label]}};setMenuItems(newMenuItems)}),[menuItems,panelItems,setMenuItems]),resetAllItems=(0,react.useCallback)((()=>{"function"==typeof resetAll&&(isResetting.current=!0,resetAll(resetAllFilters));const resetMenuItems=generateMenuItems({panelItems:panelItems,menuItemOrder:menuItemOrder,shouldReset:!0});setMenuItems(resetMenuItems)}),[panelItems,resetAllFilters,resetAll,setMenuItems,menuItemOrder]),getFirstVisibleItemLabel=items=>{const optionalItems=menuItems.optional||{},firstItem=items.find((item=>item.isShownByDefault||!!optionalItems[item.label]));return firstItem?.label},firstDisplayedItem=getFirstVisibleItemLabel(panelItems),lastDisplayedItem=getFirstVisibleItemLabel([...panelItems].reverse());return{...otherProps,headingLevel:headingLevel,panelContext:(0,react.useMemo)((()=>({areAllOptionalControlsHidden:areAllOptionalControlsHidden,deregisterPanelItem:deregisterPanelItem,deregisterResetAllFilter:deregisterResetAllFilter,firstDisplayedItem:firstDisplayedItem,flagItemCustomization:flagItemCustomization,hasMenuItems:!!panelItems.length,isResetting:isResetting.current,lastDisplayedItem:lastDisplayedItem,menuItems:menuItems,panelId:panelId,registerPanelItem:registerPanelItem,registerResetAllFilter:registerResetAllFilter,shouldRenderPlaceholderItems:shouldRenderPlaceholderItems,__experimentalFirstVisibleItemClass:__experimentalFirstVisibleItemClass,__experimentalLastVisibleItemClass:__experimentalLastVisibleItemClass})),[areAllOptionalControlsHidden,deregisterPanelItem,deregisterResetAllFilter,firstDisplayedItem,flagItemCustomization,lastDisplayedItem,menuItems,panelId,panelItems,registerResetAllFilter,registerPanelItem,shouldRenderPlaceholderItems,__experimentalFirstVisibleItemClass,__experimentalLastVisibleItemClass]),resetAllItems:resetAllItems,toggleItem:toggleItem,className:classes}}(props);return(0,react.createElement)(grid_component.Z,{...toolsPanelProps,columns:2,ref:forwardedRef},(0,react.createElement)(context.h.Provider,{value:panelContext},(0,react.createElement)(tools_panel_header_component,{label:label,resetAll:resetAllItems,toggleItem:toggleItem,headingLevel:headingLevel}),children))};var tools_panel_component=(0,context_connect.Iq)(UnconnectedToolsPanel,"ToolsPanel");UnconnectedToolsPanel.__docgenInfo={description:"",methods:[],displayName:"UnconnectedToolsPanel"}}}]);
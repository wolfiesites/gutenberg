"use strict";(self.webpackChunkgutenberg=self.webpackChunkgutenberg||[]).push([[7435],{"./packages/components/src/input-control/input-suffix-wrapper.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{U:function(){return InputControlSuffixWrapper}});__webpack_require__("./node_modules/react/index.js");var _spacer__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/components/src/spacer/component.tsx"),_context__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/src/context/use-context-system.js"),_context__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/components/src/context/context-connect.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");function UnconnectedInputControlSuffixWrapper(props,forwardedRef){const derivedProps=(0,_context__WEBPACK_IMPORTED_MODULE_2__.y)(props,"InputControlSuffixWrapper");return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_spacer__WEBPACK_IMPORTED_MODULE_3__.Z,{marginBottom:0,...derivedProps,ref:forwardedRef})}UnconnectedInputControlSuffixWrapper.displayName="UnconnectedInputControlSuffixWrapper";const InputControlSuffixWrapper=(0,_context__WEBPACK_IMPORTED_MODULE_4__.Iq)(UnconnectedInputControlSuffixWrapper,"InputControlSuffixWrapper");__webpack_exports__.Z=InputControlSuffixWrapper;try{InputControlSuffixWrapper.displayName="InputControlSuffixWrapper",InputControlSuffixWrapper.__docgenInfo={description:"A convenience wrapper for the `suffix` when you want to apply\nstandard padding in accordance with the size variant.\n\n```jsx\nimport {\n  __experimentalInputControl as InputControl,\n  __experimentalInputControlSuffixWrapper as InputControlSuffixWrapper,\n} from '@wordpress/components';\n\n<InputControl\n  suffix={<InputControlSuffixWrapper>%</InputControlSuffixWrapper>}\n/>\n```",displayName:"InputControlSuffixWrapper",props:{children:{defaultValue:null,description:"The suffix to be inserted.",name:"children",required:!0,type:{name:"ReactNode"}},as:{defaultValue:null,description:"The HTML element or React component to render the component as.",name:"as",required:!1,type:{name:'"symbol" | "object" | ComponentClass<any, any> | FunctionComponent<any> | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | ... 515 more ... | ("view" & FunctionComponent<...>)'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/input-control/input-suffix-wrapper.tsx#InputControlSuffixWrapper"]={docgenInfo:InputControlSuffixWrapper.__docgenInfo,name:"InputControlSuffixWrapper",path:"packages/components/src/input-control/input-suffix-wrapper.tsx#InputControlSuffixWrapper"})}catch(__react_docgen_typescript_loader_error){}},"./packages/components/src/select-control/chevron-down.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__("./node_modules/react/index.js");var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/icons/build-module/icon/index.js"),_wordpress_icons__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/icons/build-module/library/chevron-down.js"),_styles_select_control_styles__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/src/select-control/styles/select-control-styles.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const SelectControlChevronDown=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_styles_select_control_styles__WEBPACK_IMPORTED_MODULE_2__.j,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_styles_select_control_styles__WEBPACK_IMPORTED_MODULE_2__.fE,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_3__.Z,{icon:_wordpress_icons__WEBPACK_IMPORTED_MODULE_4__.Z,size:_styles_select_control_styles__WEBPACK_IMPORTED_MODULE_2__.Vx})})});SelectControlChevronDown.displayName="SelectControlChevronDown",__webpack_exports__.Z=SelectControlChevronDown},"./packages/components/src/select-control/styles/select-control-styles.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Ph:function(){return Select},Vx:function(){return chevronIconSize},fE:function(){return DownArrowWrapper},j:function(){return InputControlSuffixWrapperWithClickThrough}});var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"),_emotion_react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/src/utils/colors-values.js"),_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/components/src/utils/rtl.js"),_utils_space__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/components/src/utils/space.ts"),_input_control_input_suffix_wrapper__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/components/src/input-control/input-suffix-wrapper.tsx");const chevronIconSize=18,Select=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.Z)("select",{target:"e1mv6sxx2"})("&&&{appearance:none;background:transparent;box-sizing:border-box;border:none;box-shadow:none!important;color:",_utils__WEBPACK_IMPORTED_MODULE_2__.D.gray[900],";display:block;font-family:inherit;margin:0;width:100%;max-width:none;cursor:pointer;white-space:nowrap;text-overflow:ellipsis;",(({disabled:disabled})=>disabled?(0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)({color:_utils__WEBPACK_IMPORTED_MODULE_2__.D.ui.textDisabled},"",""):""),";",(({selectSize:selectSize="default"})=>{const fontSize={default:"13px",small:"11px","__unstable-large":"13px"}[selectSize];return fontSize?(0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)("font-size:","16px",";@media ( min-width: 600px ){font-size:",fontSize,";}",""):""}),";",(({__next40pxDefaultSize:__next40pxDefaultSize,multiple:multiple,selectSize:selectSize="default"})=>{if(multiple)return;const sizes={default:{height:40,minHeight:40,paddingTop:0,paddingBottom:0},small:{height:24,minHeight:24,paddingTop:0,paddingBottom:0},"__unstable-large":{height:40,minHeight:40,paddingTop:0,paddingBottom:0}};__next40pxDefaultSize||(sizes.default={height:32,minHeight:32,paddingTop:0,paddingBottom:0});const style=sizes[selectSize]||sizes.default;return(0,_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(style,"","")}),";",(({__next40pxDefaultSize:__next40pxDefaultSize,multiple:multiple,selectSize:selectSize="default"})=>{const padding={default:16,small:8,"__unstable-large":16};__next40pxDefaultSize||(padding.default=8);const selectedPadding=padding[selectSize]||padding.default;return(0,_utils__WEBPACK_IMPORTED_MODULE_3__.b)({paddingLeft:selectedPadding,paddingRight:selectedPadding+chevronIconSize,...multiple?{paddingTop:selectedPadding,paddingBottom:selectedPadding}:{}})}),";",(({multiple:multiple})=>({overflow:multiple?"auto":"hidden"})),";}"),DownArrowWrapper=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.Z)("div",{target:"e1mv6sxx1"})("margin-inline-end:",(0,_utils_space__WEBPACK_IMPORTED_MODULE_4__.D)(-1),";line-height:0;"),InputControlSuffixWrapperWithClickThrough=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.Z)(_input_control_input_suffix_wrapper__WEBPACK_IMPORTED_MODULE_5__.Z,{target:"e1mv6sxx0"})("position:absolute;pointer-events:none;",(0,_utils__WEBPACK_IMPORTED_MODULE_3__.b)({right:0}),";")},"./packages/icons/build-module/icon/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");__webpack_exports__.Z=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((function Icon({icon:icon,size:size=24,...props},ref){return(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(icon,{width:size,height:size,...props,ref:ref})}))},"./packages/icons/build-module/library/chevron-down.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/primitives/build-module/svg/index.js");const chevronDown=(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Wj,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.y$,{d:"M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"}));__webpack_exports__.Z=chevronDown}}]);
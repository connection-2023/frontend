"use strict";(self.webpackChunkproject_connection=self.webpackChunkproject_connection||[]).push([[7259],{"./node_modules/@babel/runtime/helpers/esm/extends.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}__webpack_require__.d(__webpack_exports__,{Z:function(){return _extends}})},"./src/components/Button/ApplyButton.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Apply:function(){return Apply},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return ApplyButton_stories}});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),__jsx=react.createElement,ApplyButton=function ApplyButton(_ref){var label=_ref.label,onClick=_ref.onClick;return __jsx("button",{onClick:onClick,className:"group flex h-[45px] w-full items-center justify-center rounded-md bg-main-color text-xl font-bold text-white hover:bg-[#D34889] active:scale-105"},label)};ApplyButton.displayName="ApplyButton";var Button_ApplyButton=ApplyButton,ApplyButton_stories_jsx=react.createElement,ApplyButton_stories={title:"Components/Buttons/ApplyButton",component:Button_ApplyButton,parameters:{docs:{description:{component:"클래스 신청 버튼"}}},tags:["autodocs"],argTypes:{label:{description:"버튼 라벨",defaultValue:{summary:"신청하기"},control:"text"}}},Apply={args:{label:"신청하기"},render:function render(args){return ApplyButton_stories_jsx(Button_ApplyButton,(0,esm_extends.Z)({},args,{onClick:function onClick(){}}))}};Apply.parameters={...Apply.parameters,docs:{...Apply.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: '신청하기'\n  },\n  render: args => <ApplyButton {...args} onClick={() => {}} />\n}",...Apply.parameters?.docs?.source}}};const __namedExportsOrder=["Apply"]}}]);
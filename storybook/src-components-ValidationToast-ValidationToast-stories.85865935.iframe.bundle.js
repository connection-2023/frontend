"use strict";(self.webpackChunkproject_connection=self.webpackChunkproject_connection||[]).push([[935],{"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return _defineProperty}});var esm_typeof=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/typeof.js");function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==(0,esm_typeof.Z)(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==(0,esm_typeof.Z)(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===(0,esm_typeof.Z)(key)?key:String(key)}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}},"./node_modules/@babel/runtime/helpers/esm/typeof.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}__webpack_require__.d(__webpack_exports__,{Z:function(){return _typeof}})},"./src/components/ValidationToast/ValidationToast.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return ValidationToast_stories},"기본":function(){return 기본}});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),__jsx=react.createElement,ProgressBar=function ProgressBar(){return __jsx("div",{className:"absolute bottom-0 h-1 w-full bg-gray-300"},__jsx("div",{className:"h-full w-full shrink bg-sub-color1"}))};ProgressBar.displayName="ProgressBar";var ValidationToast_ProgressBar=ProgressBar,ValidationToast_jsx=react.createElement,ValidationToast=function ValidationToast(_ref){var invalidData=_ref.invalidData;return ValidationToast_jsx("div",{className:"fixed inset-0 flex items-center justify-center"},ValidationToast_jsx("div",{className:"relative flex h-36 w-full max-w-[31rem] flex-col justify-evenly rounded-md border border-solid border-black bg-white shadow-[0_1px_5px_0px_rgba(0,0,0,0.25)]"},ValidationToast_jsx("div",{className:"flex flex-col items-center gap-2"},ValidationToast_jsx("p",{className:"text-sm font-semibold text-main-color"},"모두 작성하면 다음페이지로 넘어갈 수 있어요."),ValidationToast_jsx(ReminderText,null,invalidData.join(", "))),ValidationToast_jsx(ReminderButton,{reminderButtonHandler:function reminderButtonHandler(){var element=document.getElementById(invalidData[0]);element&&element.scrollIntoView({behavior:"smooth"})}}),ValidationToast_jsx(ValidationToast_ProgressBar,null)))};ValidationToast.displayName="ValidationToast";var ReminderButton=function ReminderButton(_ref2){var reminderButtonHandler=_ref2.reminderButtonHandler;return ValidationToast_jsx("div",{className:"flex justify-center"},ValidationToast_jsx("button",{onClick:reminderButtonHandler,className:"h-9 w-36 rounded-md bg-main-color font-semibold text-white"},"작성하러 가기"))};ReminderButton.displayName="ReminderButton";var ReminderText=function ReminderText(_ref3){var children=_ref3.children;return ValidationToast_jsx("p",{className:"inline-flex w-full justify-center whitespace-nowrap px-1 text-lg"},ValidationToast_jsx("span",{className:"truncate font-semibold"},children),"을/를 설정해주세요!")};ReminderText.displayName="ReminderText";var _기본$parameters,_기본$parameters2,ValidationToast_ValidationToast=ValidationToast,ValidationToast_stories_jsx=react.createElement;function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var ValidationToast_stories={title:"Components/ValidationToast",component:ValidationToast_ValidationToast,tags:["autodocs"],argTypes:{invalidData:{description:"유효성 통과 못한 데이터 이름 배열"}},args:{invalidData:["사진","제목","장르","인원","진행방식","난이도","가격"]}},기본={render:function render(args){return ValidationToast_stories_jsx(ValidationToast_ValidationToast,args)}};기본.parameters=_objectSpread(_objectSpread({},기본.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_기본$parameters=기본.parameters)||void 0===_기본$parameters?void 0:_기본$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  render: args => <ValidationToast {...args} />\n}"},null===(_기본$parameters2=기본.parameters)||void 0===_기본$parameters2||null===(_기본$parameters2=_기본$parameters2.docs)||void 0===_기본$parameters2?void 0:_기본$parameters2.source)})})}}]);
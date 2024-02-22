"use strict";(self.webpackChunkproject_connection=self.webpackChunkproject_connection||[]).push([[8739],{"./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}__webpack_require__.d(__webpack_exports__,{Z:()=>_arrayLikeToArray})},"./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_toConsumableArray});var arrayLikeToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");var unsupportedIterableToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");function _toConsumableArray(arr){return function _arrayWithoutHoles(arr){if(Array.isArray(arr))return(0,arrayLikeToArray.Z)(arr)}(arr)||function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||(0,unsupportedIterableToArray.Z)(arr)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},"./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_unsupportedIterableToArray});var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");function _unsupportedIterableToArray(o,minLen){if(o){if("string"==typeof o)return(0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__.Z)(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?(0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__.Z)(o,minLen):void 0}}},"./src/components/ValidationMessage/ValidationMessage.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>ValidationMessage_stories,기본:()=>기본});var react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),toConsumableArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"),__jsx=react.createElement,ProgressBar=function ProgressBar(){return __jsx("div",{className:"absolute bottom-0 left-0 h-1 w-full bg-gray-300"},__jsx("div",{className:"h-full w-full shrink bg-sub-color1"}))};ProgressBar.displayName="ProgressBar";const ValidationMessage_ProgressBar=ProgressBar;var ValidationMessage_jsx=react.createElement,ReminderButton=function ReminderButton(_ref3){var reminderButtonHandler=_ref3.reminderButtonHandler;return ValidationMessage_jsx("div",{className:"flex justify-center"},ValidationMessage_jsx("button",{onClick:reminderButtonHandler,className:"h-9 w-36 rounded-md bg-main-color font-semibold text-white"},"작성하러 가기"))};ReminderButton.displayName="ReminderButton";var ReminderText=function ReminderText(_ref4){var children=_ref4.children;return ValidationMessage_jsx("p",{className:"inline-flex w-full justify-center whitespace-nowrap px-1 text-lg"},ValidationMessage_jsx("span",{className:"truncate font-semibold"},children),"을/를 설정해주세요!")};ReminderText.displayName="ReminderText";const ValidationMessage_ValidationMessage=function ValidationMessage(_ref){var timeID,invalidData=_ref.invalidData,closeModal=_ref.closeModal,_ref$title=_ref.title,title=void 0===_ref$title?"모두 작성하면 다음페이지로 넘어갈 수 있어요.":_ref$title,overlayRef=(0,react.useRef)(null);(0,react.useEffect)((function(){return timeID=setTimeout((function(){return closeModal()}),1e4),function(){clearTimeout(timeID)}}),[closeModal]);return!!invalidData&&ValidationMessage_jsx("div",{ref:overlayRef,className:"fixed bottom-0 left-0 right-0 top-0 z-modal mx-auto bg-black/60 backdrop-blur-sm",onClick:function onClick(e){overlayRef.current===e.target&&closeModal()}},ValidationMessage_jsx("div",{className:"absolute bottom-auto left-1/2 top-1/2 z-modal h-auto w-auto -translate-x-1/2 -translate-y-1/2 rounded-md bg-white pt-0 shadow-float"},ValidationMessage_jsx("div",{className:"relative flex h-36 w-full max-w-[31rem] flex-col justify-evenly overflow-hidden rounded-md border border-solid border-black bg-white px-6 shadow-float"},ValidationMessage_jsx("div",{className:"flex flex-col items-center gap-2"},ValidationMessage_jsx("p",{className:"text-sm font-semibold text-main-color"},title),ValidationMessage_jsx(ReminderText,null,(0,toConsumableArray.Z)(new Set(null==invalidData?void 0:invalidData.map((function(_ref2){return _ref2.message})))).join(", "))),ValidationMessage_jsx(ReminderButton,{reminderButtonHandler:function reminderButtonHandler(){if(null!==invalidData){var element=document.getElementById(invalidData[0].key);element&&element.scrollIntoView({behavior:"smooth"}),clearTimeout(timeID),closeModal()}}}),ValidationMessage_jsx(ValidationMessage_ProgressBar,null))))};var ValidationMessage_stories_jsx=react.createElement;const ValidationMessage_stories={title:"Components/ValidationMessage",component:ValidationMessage_ValidationMessage,tags:["autodocs"],argTypes:{invalidData:{description:"유효성 통과 못한 데이터 이름 배열"}},args:{invalidData:[{key:"photo",type:"image",message:"사진",ref:null},{key:"title",type:"text",message:"제목",ref:null},{key:"genre",type:"text",message:"장르",ref:null},{key:"peopleCount",type:"number",message:"인원수 ",ref:null}]}};var 기본={render:function render(args){return ValidationMessage_stories_jsx(ValidationMessage_ValidationMessage,args)}};기본.parameters={...기본.parameters,docs:{...기본.parameters?.docs,source:{originalSource:"{\n  render: args => <ValidationMessage {...args} />\n}",...기본.parameters?.docs?.source}}};const __namedExportsOrder=["기본"]}}]);
"use strict";(self.webpackChunkproject_connection=self.webpackChunkproject_connection||[]).push([[739],{"./src/components/ValidationMessage/ValidationMessage.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return ValidationMessage_stories},"기본":function(){return 기본}});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),toConsumableArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"),__jsx=react.createElement,ProgressBar=function ProgressBar(){return __jsx("div",{className:"absolute bottom-0 left-0 h-1 w-full bg-gray-300"},__jsx("div",{className:"h-full w-full shrink bg-sub-color1"}))};ProgressBar.displayName="ProgressBar";var ValidationMessage_ProgressBar=ProgressBar,motion=__webpack_require__("./node_modules/framer-motion/dist/es/render/dom/motion.mjs"),use_animation=__webpack_require__("./node_modules/framer-motion/dist/es/animation/hooks/use-animation.mjs"),hooks_usePreviousValue=function usePreviousValue(value){var previousValueRef=(0,react.useRef)();return(0,react.useEffect)((function(){previousValueRef.current=value}),[value]),previousValueRef.current},hooks_useBottomSheet=function useBottomSheet(handleClosed){var _useState=(0,react.useState)(!0),isOpen=_useState[0],setIsOpen=_useState[1],controls=(0,use_animation._)(),prevIsOpen=hooks_usePreviousValue(isOpen);return(0,react.useEffect)((function(){prevIsOpen&&!isOpen?controls.start("hidden"):!prevIsOpen&&isOpen&&controls.start("visible")}),[controls,isOpen,prevIsOpen]),{onDragEnd:function onDragEnd(event,info){info.point.y>20||info.point.y>=0&&info.point.y>45?(controls.start("hidden").then(handleClosed),setIsOpen(!1)):(controls.start("visible"),setIsOpen(!0))},controls:controls,setIsOpen:setIsOpen,isOpen:isOpen}},MobileModal_jsx=react.createElement,Modal_MobileModal=function MobileModal(_ref){var isOpened=_ref.isOpened,children=_ref.children,handleClosed=_ref.handleClosed,_useBottomSheet=hooks_useBottomSheet(handleClosed),onDragEnd=_useBottomSheet.onDragEnd,controls=_useBottomSheet.controls,overlayRef=(0,react.useRef)(null),handleKeyUp=function handleKeyUp(e){"Escape"===e.key&&handleClosed()};return(0,react.useEffect)((function(){return window.addEventListener("keyup",handleKeyUp),function(){return window.removeEventListener("keyup",handleKeyUp)}}),[]),isOpened?MobileModal_jsx("div",{ref:overlayRef,className:"fixed bottom-0 left-0 right-0 top-0 z-modal mx-auto bg-black/60 backdrop-blur-sm sm:hidden",onClick:function onClick(e){overlayRef.current===e.target&&handleClosed()}},MobileModal_jsx(motion.E.div,{drag:"y",onDragEnd:onDragEnd,initial:"hidden",animate:controls,transition:{type:"spring",damping:40,stiffness:400},variants:{visible:{y:0},hidden:{y:"100%"}},dragConstraints:{top:0},dragElastic:.2,className:"absolute bottom-0 z-modal h-4/5 w-screen rounded-t-lg bg-white pt-2.5"},MobileModal_jsx("div",{className:"mb-8 flex w-full justify-center"},MobileModal_jsx("button",{className:"h-1.5 w-16 rounded-lg bg-gray-700"})),children)):null},svg=__webpack_require__("./public/icons/svg.ts"),Modal_jsx=react.createElement,Modal_Modal=function Modal(_ref){var children=_ref.children,isOpened=_ref.isOpened,handleClosed=_ref.handleClosed,overlayRef=(0,react.useRef)(null),handleKeyUp=function handleKeyUp(e){"Escape"===e.key&&handleClosed()};return(0,react.useEffect)((function(){return window.addEventListener("keyup",handleKeyUp),function(){return window.removeEventListener("keyup",handleKeyUp)}}),[]),isOpened?Modal_jsx(react.Fragment,null,Modal_jsx("div",{ref:overlayRef,className:"fixed bottom-0 left-0 right-0 top-0 z-modal mx-auto bg-black/60 backdrop-blur-sm",onClick:function onClick(e){overlayRef.current===e.target&&handleClosed()}},Modal_jsx("div",{className:"absolute left-1/2 top-1/2 hidden h-auto w-auto -translate-x-1/2 -translate-y-1/2 rounded-md bg-white shadow-float sm:block"},Modal_jsx("button",{onClick:handleClosed,className:"absolute right-2 top-2"},Modal_jsx(svg.b2,{width:"24",height:"24",className:"stroke-gray-500 stroke-2"})),children)),Modal_jsx(Modal_MobileModal,{isOpened:isOpened,handleClosed:handleClosed},children)):null},ValidationMessage_jsx=react.createElement,ValidationMessage=function ValidationMessage(_ref){var timeID,invalidData=_ref.invalidData,closeModal=_ref.closeModal;(0,react.useEffect)((function(){return timeID=setTimeout((function(){return closeModal()}),1e4),function(){clearTimeout(timeID)}}),[closeModal]);return ValidationMessage_jsx(Modal_Modal,{isOpened:!!invalidData,handleClosed:closeModal},ValidationMessage_jsx("div",{className:"relative flex h-36 w-full max-w-[31rem] flex-col justify-evenly overflow-hidden rounded-md border border-solid border-black bg-white px-6 shadow-float"},ValidationMessage_jsx("div",{className:"flex flex-col items-center gap-2"},ValidationMessage_jsx("p",{className:"text-sm font-semibold text-main-color"},"모두 작성하면 다음페이지로 넘어갈 수 있어요."),ValidationMessage_jsx(ReminderText,null,(0,toConsumableArray.Z)(new Set(null==invalidData?void 0:invalidData.map((function(_ref2){return _ref2.message})))).join(", "))),ValidationMessage_jsx(ReminderButton,{reminderButtonHandler:function reminderButtonHandler(){if(null!==invalidData){var element=document.getElementById(invalidData[0].key);element&&element.scrollIntoView({behavior:"smooth"}),clearTimeout(timeID),closeModal()}}}),ValidationMessage_jsx(ValidationMessage_ProgressBar,null)))};ValidationMessage.displayName="ValidationMessage";var ReminderButton=function ReminderButton(_ref3){var reminderButtonHandler=_ref3.reminderButtonHandler;return ValidationMessage_jsx("div",{className:"flex justify-center"},ValidationMessage_jsx("button",{onClick:reminderButtonHandler,className:"h-9 w-36 rounded-md bg-main-color font-semibold text-white"},"작성하러 가기"))};ReminderButton.displayName="ReminderButton";var ReminderText=function ReminderText(_ref4){var children=_ref4.children;return ValidationMessage_jsx("p",{className:"inline-flex w-full justify-center whitespace-nowrap px-1 text-lg"},ValidationMessage_jsx("span",{className:"truncate font-semibold"},children),"을/를 설정해주세요!")};ReminderText.displayName="ReminderText";var _기본$parameters,_기본$parameters2,ValidationMessage_ValidationMessage=ValidationMessage,ValidationMessage_stories_jsx=react.createElement;function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var ValidationMessage_stories={title:"Components/ValidationMessage",component:ValidationMessage_ValidationMessage,tags:["autodocs"],argTypes:{invalidData:{description:"유효성 통과 못한 데이터 이름 배열"}},args:{invalidData:[{key:"photo",type:"image",message:"사진",ref:null},{key:"title",type:"text",message:"제목",ref:null},{key:"genre",type:"text",message:"장르",ref:null},{key:"peopleCount",type:"number",message:"인원수 ",ref:null}]}},기본={render:function render(args){return ValidationMessage_stories_jsx(ValidationMessage_ValidationMessage,args)}};기본.parameters=_objectSpread(_objectSpread({},기본.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_기본$parameters=기본.parameters)||void 0===_기본$parameters?void 0:_기본$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  render: args => <ValidationMessage {...args} />\n}"},null===(_기본$parameters2=기본.parameters)||void 0===_기본$parameters2||null===(_기본$parameters2=_기본$parameters2.docs)||void 0===_기본$parameters2?void 0:_기본$parameters2.source)})})}}]);
"use strict";(self.webpackChunkproject_connection=self.webpackChunkproject_connection||[]).push([[605],{"./src/components/Sharing/Sharing.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Class:function(){return Class},Instructor:function(){return Instructor},default:function(){return Sharing_stories}});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),navigation=__webpack_require__("./node_modules/next/navigation.js"),useClickAway=__webpack_require__("./node_modules/react-use/esm/useClickAway.js"),constants=__webpack_require__("./src/constants/constants.ts"),svg=__webpack_require__("./public/icons/svg.ts"),process=__webpack_require__("./node_modules/process/browser.js"),console=__webpack_require__("./node_modules/console-browserify/index.js"),__jsx=react.createElement,shareOptions=[{label:"카카오톡",button:__jsx("button",{className:"flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#FFEC3F]"},__jsx(svg.kz,null))},{label:"페이스북",button:__jsx(svg.EG,null)},{label:"X",button:__jsx(svg.cC,null)},{label:"링크복사",button:__jsx("button",{className:"flex h-[35px] w-[35px] items-center justify-center rounded-full bg-sub-color1 "},__jsx(svg.mM,{className:"fill-white"}))}],Sharing=function Sharing(_ref){var mode=_ref.mode,header=_ref.header,_useState=(0,react.useState)(!1),isOpened=_useState[0],setIsOpened=_useState[1],modalRef=(0,react.useRef)(null);(0,useClickAway.Z)(modalRef,(function(){isOpened&&setIsOpened(!1)}));return __jsx("div",{ref:modalRef,className:"relative"},__jsx(svg.YJ,{onClick:function handleOpenModal(){setIsOpened((function(prev){return!prev}))},className:"cursor-pointer ".concat(isOpened?"fill-sub-color3":"fill-sub-color2","  hover:fill-sub-color3")}),isOpened&&__jsx("div",{className:"absolute right-0 top-8 z-10 flex h-28 flex-col items-center rounded-[0.31rem] bg-white shadow-float"},__jsx("p",{className:"flex h-[35px] w-full items-center justify-center border-b border-solid border-sub-color4 text-sm font-semibold "},"공유하기"),__jsx("div",{className:"border-box flex items-center gap-[1.41rem] px-4 py-[0.69rem]"},shareOptions.map((function(option){return __jsx(ShareButton,{key:option.label,mode:mode,header:header,label:option.label,button:option.button})})))))};Sharing.displayName="Sharing";var _Class$parameters,_Class$parameters2,_Instructor$parameter,_Instructor$parameter2,Sharing_Sharing=Sharing,ShareButton=function ShareButton(_ref2){var label=_ref2.label,button=_ref2.button,header=_ref2.header,title="class"===_ref2.mode?"Connection - "+header:"Connection - 강사 프로필 "+header,pageUrl=constants.yK+(0,navigation.usePathname)();(0,react.useEffect)((function(){var script=document.createElement("script");return script.src="https://developers.kakao.com/sdk/js/kakao.js",script.async=!0,document.body.appendChild(script),function(){document.body.removeChild(script)}}),[]);return __jsx("div",{onClick:function handleClick(){switch(label){case"카카오톡":!function shareToKakaoTalk(url){if(void 0!==window.Kakao){var kakao=window.Kakao;kakao.isInitialized()||kakao.init(process.env.NEXT_PUBLIC_KAKAO_SHARE_KEY),kakao.Share.sendScrap({templateId:98927,requestUrl:url})}}(pageUrl);break;case"페이스북":!function shareToFacebook(title,url){var sharedLink=encodeURIComponent(url);window.open("http://www.facebook.com/sharer/sharer.php?u=".concat(sharedLink),"_blank","width=500,height=700")}(0,pageUrl);break;case"X":!function shareToTwitter(title,url){var sharedLink="text="+encodeURIComponent(title+" \n ")+encodeURIComponent(url);window.open("https://twitter.com/intent/tweet?".concat(sharedLink),"_blank","width=500,height=700")}(title,pageUrl);break;case"링크복사":navigator.clipboard.writeText(pageUrl).then((function(){console.log("클립보드 url 복사")})).catch((function(err){console.error("Could not copy text: ",err)}))}},className:"flex cursor-pointer flex-col items-center justify-center whitespace-nowrap"},button,__jsx("label",{className:"mt-[0.41rem] cursor-pointer text-xs font-semibold"},label))};ShareButton.displayName="ShareButton";var Sharing_stories_jsx=react.createElement;function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var Sharing_stories={title:"Components/Sharing",component:Sharing_Sharing,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{mode:{options:["class","instructor"],control:{type:"radio"}}}},Class={args:{mode:"class",header:"가비쌤과 함께하는 왁킹 클래스"},render:function render(args){return Sharing_stories_jsx(Sharing_Sharing,args,"Sharing")}},Instructor={args:{mode:"instructor",header:"리아킴"},render:function render(args){return Sharing_stories_jsx(Sharing_Sharing,args,"초기화")}};Class.parameters=_objectSpread(_objectSpread({},Class.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Class$parameters=Class.parameters)||void 0===_Class$parameters?void 0:_Class$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    mode: 'class',\n    header: '가비쌤과 함께하는 왁킹 클래스'\n  },\n  render: args => <Sharing {...args}>Sharing</Sharing>\n}"},null===(_Class$parameters2=Class.parameters)||void 0===_Class$parameters2||null===(_Class$parameters2=_Class$parameters2.docs)||void 0===_Class$parameters2?void 0:_Class$parameters2.source)})}),Instructor.parameters=_objectSpread(_objectSpread({},Instructor.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Instructor$parameter=Instructor.parameters)||void 0===_Instructor$parameter?void 0:_Instructor$parameter.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    mode: 'instructor',\n    header: '리아킴'\n  },\n  render: args => <Sharing {...args}>초기화</Sharing>\n}"},null===(_Instructor$parameter2=Instructor.parameters)||void 0===_Instructor$parameter2||null===(_Instructor$parameter2=_Instructor$parameter2.docs)||void 0===_Instructor$parameter2?void 0:_Instructor$parameter2.source)})})},"./src/constants/constants.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{$0:function(){return DAY_MODIFIERS},Ab:function(){return FILTER_WEEK},B9:function(){return PROGRESS_METHOD},Bl:function(){return DANCE_GENRE},JG:function(){return DAY_MODIFIERS_CLASSNAMES},ML:function(){return FILTER_TIME},Xb:function(){return DANCE_GENRE_ENGLISH},n:function(){return DEFAULT_ADDRESS},sS:function(){return SCHEDULE_MODIFIERS_CLASSNAMES},yK:function(){return DOMAIN}});var _home_runner_work_connection_frontend_connection_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),_public_icons_svg__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./public/icons/svg.ts");function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,_home_runner_work_connection_frontend_connection_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var DOMAIN="http://localhost:3000",DAY_MODIFIERS={saturday:function saturday(date){return 6===date.getDay()},sunday:function sunday(date){return 0===date.getDay()}},DAY_MODIFIERS_CLASSNAMES={saturday:"saturday",sunday:"sunday"},SCHEDULE_MODIFIERS_CLASSNAMES=_objectSpread(_objectSpread({},DAY_MODIFIERS_CLASSNAMES),{},{selectableDays:"selectableDays"}),DEFAULT_ADDRESS={X:37.5666103,Y:126.9783882},DANCE_GENRE=["K-pop","브레이킹","팝핑","락킹","왁킹","힙합","하우스","크럼프","보깅","코레오그래피","키즈댄스"],DANCE_GENRE_ENGLISH=["","(Breaking)","(Popping)","(Rocking)","(Waaking)","(Hiphop)","(House)","(Crump)","(voguing)","(choreography)","(kids dance)"],PROGRESS_METHOD=["개인(1:1)레슨","그룹레슨","원데이 레슨","다회차"],FILTER_WEEK=["월","화","수","목","금","토","일"],FILTER_TIME=["오전(6시-11시)","오후(12시-17시)","저녁(18시-23시)","새벽(00시-05시)"];_public_icons_svg__WEBPACK_IMPORTED_MODULE_1__.cD,_public_icons_svg__WEBPACK_IMPORTED_MODULE_1__.YO,_public_icons_svg__WEBPACK_IMPORTED_MODULE_1__.mM}}]);
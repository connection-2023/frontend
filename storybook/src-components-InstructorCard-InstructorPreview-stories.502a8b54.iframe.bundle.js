"use strict";(self.webpackChunkproject_connection=self.webpackChunkproject_connection||[]).push([[3193],{"./src/components/InstructorCard/InstructorPreview.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>InstructorPreview_stories});var react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),next_link=__webpack_require__("./node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),Carousel=__webpack_require__("./src/components/Carousel/Carousel.tsx"),__jsx=react.createElement,ImagesViewer=function ImagesViewer(_ref){var imgURL=_ref.imgURL,focus=_ref.focus;return __jsx("figure",{className:"h-full w-full"},__jsx(Carousel.Z,{imgURL,move:focus,arrow:imgURL.length>1&&focus,showCurrentElement:focus}))};ImagesViewer.displayName="ImagesViewer";const InstructorCard_ImagesViewer=ImagesViewer;var svg=__webpack_require__("./public/icons/svg.ts"),Like=__webpack_require__("./src/components/Like/Like.tsx"),Review=__webpack_require__("./src/components/Review/Review.tsx"),InstructorCard_jsx=react.createElement,InstructorCard=function InstructorCard(_ref){var id=_ref.id,name=_ref.name,address=_ref.address,genres=_ref.genres,imgURL=_ref.imgURL,average=_ref.average,teamAffiliation=_ref.teamAffiliation,href=_ref.href,largeImg=_ref.largeImg,isLiked=_ref.isLiked,likeEvent=_ref.likeEvent,_useState=(0,react.useState)(!1),focus=_useState[0],setFocus=_useState[1],genresWithSpace=genres.reduce((function(acc,genre){return acc+" ".concat(genre)}),""),genresWithSlash=genres.reduce((function(acc,genre,index){return acc+(index!==genres.length-1?"/".concat(genre):genre)}));return InstructorCard_jsx("div",{onMouseOver:function onFocus(){setFocus(!0)},onMouseLeave:function offFocus(){setFocus(!1)},className:"relative h-full w-full overflow-hidden rounded-md shadow-horizontal"},InstructorCard_jsx("figcaption",{className:"pointer-events-none absolute z-10 hidden h-10 w-full items-center justify-center xl:flex ".concat(focus?"bg-black":"bg-white")},InstructorCard_jsx("h1",{className:"text-lg font-bold ".concat(focus&&"text-zinc-50")},name)),InstructorCard_jsx("div",{className:"pointer-events-auto absolute right-1 top-1 z-10"},InstructorCard_jsx(Like.Z,{id,type:"instructor",isLiked,likeEvent})),InstructorCard_jsx(link_default(),{href},InstructorCard_jsx(InstructorCard_ImagesViewer,{imgURL,focus})),!focus&&InstructorCard_jsx(react.Fragment,null,InstructorCard_jsx("div",{className:"absolute bottom-24 flex w-full justify-center xl:bottom-[5rem]"},imgURL.map((function(img,index){return InstructorCard_jsx("span",{key:img+index,className:"mr-1.5 inline-block h-1.5 w-1.5 rounded-full ".concat(0===index?"bg-white":"bg-neutral-500")})}))),InstructorCard_jsx("figcaption",{className:"".concat(largeImg?"bg-white/[.9]":"bg-white sm:bg-white/[.8]"," pointer-events-none absolute bottom-0 z-10 flex h-[5.3125rem] w-full flex-col justify-center px-2 xl:h-[4.625rem] xl:items-center")},InstructorCard_jsx("div",{className:"hidden pb-2 pt-1 xl:block"},InstructorCard_jsx(Review.Z,{average})),InstructorCard_jsx("div",{className:"flex w-full items-center justify-between pb-1 xl:hidden"},InstructorCard_jsx("p",{className:"text-lg font-semibold"},name),InstructorCard_jsx("div",{className:"flex items-center gap-1"},InstructorCard_jsx(svg.dW,{width:16,height:15,className:"fill-sub-color1"}),InstructorCard_jsx("p",{className:"pb-0.5"},average))),InstructorCard_jsx("div",{className:"".concat(largeImg?"text-sm":"text-xs text-gray-500 sm:text-sm sm:text-black"," mb-0.5 flex gap-x-2 xl:grid xl:grid-cols-2")},InstructorCard_jsx("h2",{className:"whitespace-nowrap text-right"},address[0]+(address.length>1?" 외 ".concat(address.length-1," |"):"")),InstructorCard_jsx("h2",{className:"flex-grow truncate"},teamAffiliation)),InstructorCard_jsx("div",{className:"".concat(largeImg?"gap-2 text-sm":"text-xs text-gray-500 sm:gap-2 sm:text-sm sm:text-black"," xl:mx-auto xl:w-fit")},InstructorCard_jsx("p",{className:"".concat(!largeImg&&"hidden"," truncate sm:block")},genresWithSpace),InstructorCard_jsx("p",{className:"".concat(largeImg?"hidden":"block"," truncate sm:hidden")},genresWithSlash)))))};InstructorCard.displayName="InstructorCard";const InstructorCard_InstructorCard=InstructorCard;var InstructorPreview_stories_jsx=react.createElement;const InstructorPreview_stories={title:"Components/InstructorPreview",component:InstructorCard_InstructorCard,tags:["autodocs"],parameters:{docs:{description:{component:"강사에 대한 정보 미리보기 컴포넌트"}}},argTypes:{id:{description:"강사 ID",control:"number",table:{type:{summary:"number"}}},imgURL:{description:"표시할 이미지들의 URL들이 담긴 배열",control:"object",table:{type:{summary:"string[]"}}},name:{description:"강사 이름",control:"text",table:{type:{summary:"string"}}},address:{description:"강의 지역",control:"object",table:{type:{summary:"string[]"}}},teamAffiliation:{description:"강사 소속",control:"text",table:{type:{summary:"string"}}},genres:{description:"댄스 장르",control:"object",table:{type:{summary:"string[]"}}},average:{description:"강사 평점",control:"number",table:{type:{summary:"number"}}},href:{description:"해당 카드 이동경로",control:"text",table:{type:{summary:"string"}}},largeImg:{description:"큰 이미지로 보기",control:"boolean",table:{type:{summary:"boolean"}}},isLiked:{description:"좋아요 여부",control:"boolean",table:{type:{summary:"boolean"}}},likeEvent:{description:"좋아요 눌렀을 때 실행 함수",table:{type:{summary:"(id: string | number) => void"}}}},args:{id:0,imgURL:["https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg","https://img.freepik.com/free-photo/girl-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9249.jpg?size=626&ext=jpg","https://img.freepik.com/free-photo/dance-time-stylish-men-and-woman-dancing-hip-hop-in-bright-clothes-on-green-background-at-dance-hall-in-neon-light_155003-16406.jpg?size=626&ext=jpg","https://img.freepik.com/free-photo/two-beautiful-slender-girls-doing-dancing-and-gymnastics-in-the-dance-hall_1157-13817.jpg?size=626&ext=jpg","https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg"],name:"이바다",address:["서울 마포구"],teamAffiliation:"원밀리언즈",genres:["방송댄스","힙합","탱고"],average:3,href:"/",largeImg:!1,isLiked:!1,likeEvent:function likeEvent(){}}};var Default={render:function render(args){return InstructorPreview_stories_jsx("div",{className:"h-60 w-80"},InstructorPreview_stories_jsx(InstructorCard_InstructorCard,args))}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  render: args => <div className="h-60 w-80">\n      <InstructorCard {...args} />\n    </div>\n}',...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/store/userStore.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L:()=>useUserStore});var _home_runner_work_frontend_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"),_home_runner_work_frontend_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js");function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,_home_runner_work_frontend_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var useUserStore=(0,__webpack_require__("./node_modules/zustand/esm/index.mjs").Ue)((function(set){return{authUser:null,userType:null,requestLoading:!1,likeClassList:[],likeInstructorList:[],setUserType:function setUserType(type){return set((function(state){return _objectSpread(_objectSpread({},state),{},{userType:type})}))},setAuthUser:function setAuthUser(user){return set((function(state){return _objectSpread(_objectSpread({},state),{},{authUser:user})}))},setRequestLoading:function setRequestLoading(isLoading){return set((function(state){return _objectSpread(_objectSpread({},state),{},{requestLoading:isLoading})}))},reset:function reset(){return set({authUser:null,requestLoading:!1})},setLikeClassList:function setLikeClassList(list){return set({likeClassList:(0,_home_runner_work_frontend_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_2__.Z)(list)})},setLikeInstructorList:function setLikeInstructorList(list){return set({likeInstructorList:(0,_home_runner_work_frontend_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_2__.Z)(list)})},setAuthUserField:function setAuthUserField(field,value){return set((function(state){return state.authUser?_objectSpread(_objectSpread({},state),{},{authUser:_objectSpread(_objectSpread({},state.authUser),{},(0,_home_runner_work_frontend_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)({},field,value))}):state}))}}}))}}]);
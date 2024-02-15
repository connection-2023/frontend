"use strict";(self.webpackChunkproject_connection=self.webpackChunkproject_connection||[]).push([[481],{"./src/components/InstructorCard/InstructorCard.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return InstructorCard_stories},"기본":function(){return 기본}});var react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),next_link=__webpack_require__("./node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),Carousel=__webpack_require__("./src/components/Carousel/Carousel.tsx"),__jsx=react.createElement,ImagesViewer=function ImagesViewer(_ref){var imgURL=_ref.imgURL,focus=_ref.focus;return __jsx("figure",{className:"h-full w-full"},__jsx(Carousel.Z,{imgURL:imgURL,move:focus,arrow:imgURL.length>1&&focus,showCurrentElement:focus}))};ImagesViewer.displayName="ImagesViewer";var InstructorCard_ImagesViewer=ImagesViewer,svg=__webpack_require__("./public/icons/svg.ts"),Like=__webpack_require__("./src/components/Like/Like.tsx"),Review=__webpack_require__("./src/components/Review/Review.tsx"),InstructorCard_jsx=react.createElement,InstructorCard=function InstructorCard(_ref){var id=_ref.id,name=_ref.name,address=_ref.address,genres=_ref.genres,imgURL=_ref.imgURL,average=_ref.average,teamAffiliation=_ref.teamAffiliation,href=_ref.href,largeImg=_ref.largeImg,isLiked=_ref.isLiked,likeEvent=_ref.likeEvent,_useState=(0,react.useState)(!1),focus=_useState[0],setFocus=_useState[1],genresWithSpace=genres.reduce((function(acc,genre){return acc+" ".concat(genre)}),""),genresWithSlash=genres.reduce((function(acc,genre,index){return acc+(index!==genres.length-1?"/".concat(genre):genre)}));return InstructorCard_jsx("div",{onMouseOver:function onFocus(){setFocus(!0)},onMouseLeave:function offFocus(){setFocus(!1)},className:"relative h-full w-full overflow-hidden rounded-md shadow-horizontal"},InstructorCard_jsx("figcaption",{className:"pointer-events-none absolute z-10 hidden h-10 w-full items-center justify-center xl:flex ".concat(focus?"bg-black":"bg-white")},InstructorCard_jsx("h1",{className:"text-lg font-bold ".concat(focus&&"text-zinc-50")},name)),InstructorCard_jsx("div",{className:"pointer-events-auto absolute right-1 top-1 z-10"},InstructorCard_jsx(Like.Z,{id:id,type:"instructor",isLiked:isLiked,likeEvent:likeEvent})),InstructorCard_jsx(link_default(),{href:href},InstructorCard_jsx(InstructorCard_ImagesViewer,{imgURL:imgURL,focus:focus})),!focus&&InstructorCard_jsx(react.Fragment,null,InstructorCard_jsx("div",{className:"absolute bottom-24 flex w-full justify-center xl:bottom-[5rem]"},imgURL.map((function(img,index){return InstructorCard_jsx("span",{key:img+index,className:"mr-1.5 inline-block h-1.5 w-1.5 rounded-full ".concat(0===index?"bg-white":"bg-neutral-500")})}))),InstructorCard_jsx("figcaption",{className:"".concat(largeImg?"bg-white/[.9]":"bg-white sm:bg-white/[.8]"," pointer-events-none absolute bottom-0 z-10 flex h-[5.3125rem] w-full flex-col justify-center px-2 xl:h-[4.625rem] xl:items-center")},InstructorCard_jsx("div",{className:"hidden pb-2 pt-1 xl:block"},InstructorCard_jsx(Review.Z,{average:average})),InstructorCard_jsx("div",{className:"flex w-full items-center justify-between pb-1 xl:hidden"},InstructorCard_jsx("p",{className:"text-lg font-semibold"},name),InstructorCard_jsx("div",{className:"flex items-center gap-1"},InstructorCard_jsx(svg.dW,{width:16,height:15,className:"fill-sub-color1"}),InstructorCard_jsx("p",{className:"pb-0.5"},average))),InstructorCard_jsx("div",{className:"".concat(largeImg?"text-sm":"text-xs text-gray-500 sm:text-sm sm:text-black"," mb-0.5 flex gap-x-2 xl:grid xl:grid-cols-2")},InstructorCard_jsx("h2",{className:"whitespace-nowrap text-right"},address[0]+(address.length>1?" 외 ".concat(address.length-1," |"):"")),InstructorCard_jsx("h2",{className:"flex-grow truncate"},teamAffiliation)),InstructorCard_jsx("div",{className:"".concat(largeImg?"gap-2 text-sm":"text-xs text-gray-500 sm:gap-2 sm:text-sm sm:text-black"," xl:mx-auto xl:w-fit")},InstructorCard_jsx("p",{className:"".concat(!largeImg&&"hidden"," truncate sm:block")},genresWithSpace),InstructorCard_jsx("p",{className:"".concat(largeImg?"hidden":"block"," truncate sm:hidden")},genresWithSlash)))))};InstructorCard.displayName="InstructorCard";var InstructorCard_InstructorCard=InstructorCard,InstructorCard_stories_jsx=react.createElement,InstructorCard_stories={title:"Components/InstructorCard",component:InstructorCard_InstructorCard,tags:["autodocs"],argTypes:{imgURL:{description:"표시할 이미지들의 URL들이 담긴 배열"},name:{description:"강사 이름"},address:{description:"강의 지역"},teamAffiliation:{description:"강사 소속"},genres:{description:"댄스 장르"},average:{description:"강사 평점"},href:{description:"해당 카드 이동경로"}},args:{imgURL:["https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg","https://img.freepik.com/free-photo/girl-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9249.jpg?size=626&ext=jpg","https://img.freepik.com/free-photo/dance-time-stylish-men-and-woman-dancing-hip-hop-in-bright-clothes-on-green-background-at-dance-hall-in-neon-light_155003-16406.jpg?size=626&ext=jpg","https://img.freepik.com/free-photo/two-beautiful-slender-girls-doing-dancing-and-gymnastics-in-the-dance-hall_1157-13817.jpg?size=626&ext=jpg","https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg"],name:"이바다",address:["서울 마포구"],teamAffiliation:"원밀리언즈",genres:["방송댄스","힙합","탱고"],average:3,href:"/"}},기본={render:function render(args){return InstructorCard_stories_jsx(InstructorCard_InstructorCard,args)}}}}]);
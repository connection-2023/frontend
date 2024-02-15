"use strict";(self.webpackChunkproject_connection=self.webpackChunkproject_connection||[]).push([[383],{"./src/components/Review/Review.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},Double:function(){return Double},Int:function(){return Int}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_Review__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Review/Review.tsx"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement,meta={title:"Components/Review",component:_Review__WEBPACK_IMPORTED_MODULE_1__.Z,tags:["autodocs"],argTypes:{},args:{average:3,count:17}};__webpack_exports__.default=meta;var Default={render:function render(args){return __jsx(_Review__WEBPACK_IMPORTED_MODULE_1__.Z,args)}},Int={args:{average:2,count:17}},Double={args:{average:3.4,count:17}}},"./src/components/Review/Review.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),nanoid__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/nanoid/index.browser.js"),_public_icons_svg__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./public/icons/svg.ts"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement,Review=function Review(_ref){var average=_ref.average,count=_ref.count,_ref$size=_ref.size,size=void 0===_ref$size?"regular":_ref$size,starArray=calculateStarArray(average),key=(0,nanoid__WEBPACK_IMPORTED_MODULE_2__.x0)(),sizeStyles={small:"w-[11px] h-[10px]",regular:"w-[15px] h-[14px]"};return __jsx("div",{className:"flex items-center "},__jsx("div",{className:"flex gap-0.5"},starArray.map((function(star,i){return 1===star?__jsx(Star,{key:key+i,fill:"sub-color1",size:size}):star>0?__jsx("div",{key:key+i,className:"relative ".concat(sizeStyles[size]," overflow-hidden")},__jsx(Star,{fill:"gray-700",className:"absolute",size:size}),__jsx("div",{className:"absolute overflow-hidden",style:{width:"".concat(star*("small"===size?11:15),"px")}},__jsx(Star,{fill:"sub-color1",size:size}))):__jsx(Star,{key:key+i,fill:"gray-700",size:size})}))),void 0===count?null:__jsx("span",{className:"ml-2 text-sm text-inherit"},"리뷰 ",count))};Review.displayName="Review",__webpack_exports__.Z=Review;var Star=function Star(_ref2){var fill=_ref2.fill,_ref2$className=_ref2.className,className=void 0===_ref2$className?"":_ref2$className,_ref2$size=_ref2.size,size=void 0===_ref2$size?"regular":_ref2$size;return __jsx(_public_icons_svg__WEBPACK_IMPORTED_MODULE_1__.dW,{width:"small"===size?11:15,height:"small"===size?10:14,className:"fill-".concat(fill," ").concat(className)})};Star.displayName="Star";var calculateStarArray=function calculateStarArray(average){return Array.from({length:5},(function(_,i){return i<Math.floor(average)?1:i===Math.floor(average)?+(average%1).toFixed(2):0}))}},"./node_modules/nanoid/index.browser.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{x0:function(){return nanoid}});let nanoid=(size=21)=>crypto.getRandomValues(new Uint8Array(size)).reduce(((id,byte)=>id+=(byte&=63)<36?byte.toString(36):byte<62?(byte-26).toString(36).toUpperCase():byte>62?"-":"_"),"")}}]);
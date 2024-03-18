"use strict";(self.webpackChunkproject_connection=self.webpackChunkproject_connection||[]).push([[2487],{"./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}__webpack_require__.d(__webpack_exports__,{Z:()=>_arrayLikeToArray})},"./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_toConsumableArray});var arrayLikeToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");var unsupportedIterableToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");function _toConsumableArray(arr){return function _arrayWithoutHoles(arr){if(Array.isArray(arr))return(0,arrayLikeToArray.Z)(arr)}(arr)||function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||(0,unsupportedIterableToArray.Z)(arr)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},"./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_unsupportedIterableToArray});var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");function _unsupportedIterableToArray(o,minLen){if(o){if("string"==typeof o)return(0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__.Z)(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?(0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__.Z)(o,minLen):void 0}}},"./src/components/Review/ReviewStatistics.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_ReviewStatistics__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Review/ReviewStatistics.tsx"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Review/ReviewStatistics",component:_ReviewStatistics__WEBPACK_IMPORTED_MODULE_1__.Z,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"리뷰의 별점 정보를 담고 있는 객체의 배열로부터 평균 평점과 각 별점에 해당하는 리뷰의 개수를 표시하는 컴포넌트"}}},argTypes:{reviewList:{description:"리뷰의 별점 정보를 담고 있는 객체의 배열로부터 전체 평균 별점과 각 별점에 해당하는 개수 계산",control:{type:"object"},table:{type:{summary:"{ stars: number }[]"}}}},args:{reviewList:[{stars:1},{stars:3},{stars:3},{stars:4},{stars:5}]}};var Default={render:function render(args){return __jsx(_ReviewStatistics__WEBPACK_IMPORTED_MODULE_1__.Z,args)}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: args => <ReviewStatistics {...args} />\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/Review/Rating.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _home_runner_work_frontend_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_public_icons_svg__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./public/icons/svg.ts"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement,Rating=function Rating(props){var rate=props.rate,_props$readonly=props.readonly,readonly=void 0!==_props$readonly&&_props$readonly,_props$viewRate=props.viewRate,viewRate=void 0===_props$viewRate||_props$viewRate,_props$reviewCount=props.reviewCount,reviewCount=void 0!==_props$reviewCount&&_props$reviewCount,_props$bigStar=props.bigStar,bigStar=void 0!==_props$bigStar&&_props$bigStar,_props$viewSelectRate=props.viewSelectRate,viewSelectRate=void 0!==_props$viewSelectRate&&_props$viewSelectRate,handleRate="handleRate"in props?props.handleRate:void 0,_useState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(rate),selectedStar=_useState[0],setSelectedStar=_useState[1],_useState2=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),hoveredStar=_useState2[0],setHoveredStar=_useState2[1],handleClick=function handleClick(index){selectedStar===index?(setSelectedStar(0),handleRate&&handleRate(0)):(setSelectedStar(index),handleRate&&handleRate(index))};(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){setSelectedStar(rate)}),[rate]);var handleMouseEnter=function handleMouseEnter(index){setHoveredStar(index)},handleMouseLeave=function handleMouseLeave(){setHoveredStar(0)};return __jsx("div",{className:"flex items-center"},__jsx("div",{className:"flex items-center"},__jsx("div",{className:"flex gap-1"},(0,_home_runner_work_frontend_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_2__.Z)(Array(5)).map((function(_,index){return bigStar?__jsx(_public_icons_svg__WEBPACK_IMPORTED_MODULE_1__.VT,{key:index,width:29,height:27,onClick:readonly?void 0:function(){return handleClick(index+1)},onMouseEnter:readonly?void 0:function(){return handleMouseEnter(index+1)},onMouseLeave:readonly?void 0:handleMouseLeave,className:"".concat(Math.max(selectedStar,hoveredStar)>=index+1?"fill-sub-color1":"fill-gray-900 stroke-gray-300"," ").concat(!readonly&&"cursor-pointer")}):__jsx(_public_icons_svg__WEBPACK_IMPORTED_MODULE_1__.dW,{key:index,width:18,height:17,onClick:readonly?void 0:function(){return handleClick(index+1)},onMouseEnter:readonly?void 0:function(){return handleMouseEnter(index+1)},onMouseLeave:readonly?void 0:handleMouseLeave,className:"".concat(Math.max(selectedStar,hoveredStar)>=index+1?"fill-sub-color1":"fill-gray-700"," ").concat(!readonly&&"cursor-pointer")})})))),viewRate&&__jsx("span",{className:"ml-[0.94rem] h-5 w-6 text-sm font-bold"},selectedStar>0?selectedStar+".0":null),reviewCount&&__jsx("span",{className:"ml-[0.5rem] whitespace-nowrap text-base font-semibold lg:text-lg"},reviewCount,"개의 리뷰"),viewSelectRate&&__jsx("span",{className:"ml-[0.81rem] text-gray-300"},selectedStar,"/5"))};Rating.displayName="Rating";const __WEBPACK_DEFAULT_EXPORT__=Rating},"./src/components/Review/ReviewStatistics.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_Rating__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Review/Rating.tsx"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement,ReviewStatistics=function ReviewStatistics(_ref){var reviewList=_ref.reviewList,totalReviews=reviewList.length,averageScore=reviewList.reduce((function(total,review){return total+review.stars}),0)/totalReviews,scoreCount=Array(5).fill(0);reviewList.forEach((function(review){return scoreCount[review.stars-1]++}));var scorePercent=scoreCount.map((function(count){return count/totalReviews*100}));return __jsx("dl",{className:"flex w-full flex-col gap-2 rounded-md bg-white p-5 shadow-vertical"},__jsx("dt",{className:"text-2xl font-bold"},reviewList.length>0?averageScore:0,__jsx("span",{className:"text-gray-500"},"/ 5.0")),__jsx("dd",{className:"mb-4"},__jsx(_Rating__WEBPACK_IMPORTED_MODULE_1__.Z,{rate:averageScore,readonly:!0,viewRate:!1,reviewCount:totalReviews})),[5,4,3,2,1].map((function(score){var percent=parseFloat(scorePercent[score-1].toFixed(2));return __jsx("dd",{key:score,className:"flex items-center gap-2 text-sm font-semibold"},__jsx("p",{className:"w-2"},score),__jsx("span",{className:"relative h-2 flex-grow rounded-md bg-sub-color1-transparent"},__jsx("span",{className:"absolute h-2 rounded-md bg-sub-color1",style:{width:"".concat(percent,"%")}})),__jsx("p",{className:"w-3 whitespace-nowrap font-medium text-gray-300"},scoreCount[score-1],"개"))})))};ReviewStatistics.displayName="ReviewStatistics";const __WEBPACK_DEFAULT_EXPORT__=ReviewStatistics}}]);
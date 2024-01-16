"use strict";(self.webpackChunkproject_connection=self.webpackChunkproject_connection||[]).push([[905],{"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return _defineProperty}});var esm_typeof=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/typeof.js");function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==(0,esm_typeof.Z)(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==(0,esm_typeof.Z)(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===(0,esm_typeof.Z)(key)?key:String(key)}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}},"./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _toConsumableArray(arr){return function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}(arr)||function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||function _unsupportedIterableToArray(o,minLen){if(o){if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}}(arr)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}__webpack_require__.d(__webpack_exports__,{Z:function(){return _toConsumableArray}})},"./node_modules/@babel/runtime/helpers/esm/typeof.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}__webpack_require__.d(__webpack_exports__,{Z:function(){return _typeof}})},"./src/components/Review/Rating.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},default:function(){return Rating_stories}});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),toConsumableArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"),svg=__webpack_require__("./public/icons/svg.ts"),__jsx=react.createElement,Rating=function Rating(props){var rate=props.rate,_props$readonly=props.readonly,readonly=void 0!==_props$readonly&&_props$readonly,_props$viewRate=props.viewRate,viewRate=void 0===_props$viewRate||_props$viewRate,_props$reviewCount=props.reviewCount,reviewCount=void 0!==_props$reviewCount&&_props$reviewCount,_props$bigStar=props.bigStar,bigStar=void 0!==_props$bigStar&&_props$bigStar,_props$viewSelectRate=props.viewSelectRate,viewSelectRate=void 0!==_props$viewSelectRate&&_props$viewSelectRate,handleRate="handleRate"in props?props.handleRate:void 0,_useState=(0,react.useState)(rate),selectedStar=_useState[0],setSelectedStar=_useState[1],_useState2=(0,react.useState)(0),hoveredStar=_useState2[0],setHoveredStar=_useState2[1],handleClick=function handleClick(index){selectedStar===index?(setSelectedStar(0),handleRate&&handleRate(0)):(setSelectedStar(index),handleRate&&handleRate(index))};(0,react.useEffect)((function(){setSelectedStar(rate)}),[rate]);var handleMouseEnter=function handleMouseEnter(index){setHoveredStar(index)},handleMouseLeave=function handleMouseLeave(){setHoveredStar(0)};return __jsx("div",{className:"flex items-center"},__jsx("div",{className:"flex items-center"},__jsx("div",{className:"flex gap-1"},(0,toConsumableArray.Z)(Array(5)).map((function(_,index){return bigStar?__jsx(svg.VT,{key:index,width:29,height:27,onClick:readonly?void 0:function(){return handleClick(index+1)},onMouseEnter:readonly?void 0:function(){return handleMouseEnter(index+1)},onMouseLeave:readonly?void 0:handleMouseLeave,className:"".concat(Math.max(selectedStar,hoveredStar)>=index+1?"fill-sub-color1":"fill-gray-900 stroke-gray-300"," ").concat(!readonly&&"cursor-pointer")}):__jsx(svg.dW,{key:index,width:18,height:17,onClick:readonly?void 0:function(){return handleClick(index+1)},onMouseEnter:readonly?void 0:function(){return handleMouseEnter(index+1)},onMouseLeave:readonly?void 0:handleMouseLeave,className:"".concat(Math.max(selectedStar,hoveredStar)>=index+1?"fill-sub-color1":"fill-gray-700"," ").concat(!readonly&&"cursor-pointer")})})))),viewRate&&__jsx("span",{className:"ml-[0.94rem] h-5 w-6 text-sm font-bold"},selectedStar>0?selectedStar+".0":null),reviewCount&&__jsx("span",{className:"ml-[0.5rem] whitespace-nowrap text-base font-semibold lg:text-lg"},reviewCount,"개의 리뷰"),viewSelectRate&&__jsx("span",{className:"ml-[0.81rem] text-gray-300"},selectedStar,"/5"))};Rating.displayName="Rating";var _Default$parameters,_Default$parameters2,Review_Rating=Rating,Rating_stories_jsx=react.createElement;function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var Rating_stories={title:"Components/Rating",component:Review_Rating,tags:["autodocs"],argTypes:{},args:{}},Default={render:function render(){return Rating_stories_jsx(Review_Rating,{rate:0,handleRate:function handleRate(){}})}};Default.parameters=_objectSpread(_objectSpread({},Default.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Default$parameters=Default.parameters)||void 0===_Default$parameters?void 0:_Default$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  render: () => <Rating rate={0} handleRate={() => {}} />\n}"},null===(_Default$parameters2=Default.parameters)||void 0===_Default$parameters2||null===(_Default$parameters2=_Default$parameters2.docs)||void 0===_Default$parameters2?void 0:_Default$parameters2.source)})})}}]);
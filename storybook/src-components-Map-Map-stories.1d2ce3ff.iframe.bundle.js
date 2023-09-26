"use strict";(self.webpackChunkproject_connection=self.webpackChunkproject_connection||[]).push([[432],{"./src/components/Map/Map.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return Map_stories},"기본":function(){return 기본}});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),objectDestructuringEmpty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectDestructuringEmpty.js"),esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),mapInfowindow=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/styles/mapInfowindow.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(mapInfowindow.Z,options),mapInfowindow.Z&&mapInfowindow.Z.locals&&mapInfowindow.Z.locals;var constants=__webpack_require__("./src/constants/constants.ts"),dist=__webpack_require__("./node_modules/react-naver-maps/dist/index.mjs"),console=__webpack_require__("./node_modules/console-browserify/index.js"),__jsx=react.createElement,Map=function Map(_ref){var props=(0,esm_extends.Z)({},((0,objectDestructuringEmpty.Z)(_ref),_ref));return __jsx(dist.r9,{submodules:["geocoder"],ncpClientId:""},__jsx(dist.W2,{style:{width:"100%",height:"100%"}},__jsx(NaverMapRenderer,props)))};Map.displayName="Map";var NaverMapRenderer=function NaverMapRenderer(_ref2){var address=_ref2.address,studioName=_ref2.studioName,navermaps=(0,dist.UL)(),_useState=(0,react.useState)(null),map=_useState[0],setMap=_useState[1],_useState2=(0,react.useState)(null),infowindow=_useState2[0],setInfoWindow=_useState2[1],_useState3=(0,react.useState)(new navermaps.LatLng(constants.n.X,constants.n.Y)),latLng=_useState3[0],setLatLng=_useState3[1];return(0,react.useEffect)((function(){navermaps.Service.geocode({query:address},(function(status,response){if(status===navermaps.Service.Status.ERROR)return console.error("Geocode Error, address:"+address);if(0===response.v2.meta.totalCount)return console.error("No result.");var item=response.v2.addresses[0];setLatLng(new navermaps.LatLng(Number(item.y),Number(item.x)))}))}),[address,navermaps.LatLng,navermaps.Service]),(0,react.useEffect)((function(){if(map&&infowindow){map.setCenter(latLng);var _navermaps$TransCoord=navermaps.TransCoord.fromLatLngToEPSG3857(latLng),x=_navermaps$TransCoord.x,y=_navermaps$TransCoord.y,startLink="https://map.naver.com/p/directions/".concat(x,",").concat(y,",").concat(studioName,"/-/-/transit?c=17.56,0,0,0,dh"),destinationLink="https://map.naver.com/p/directions/-/".concat(x,",").concat(y,",").concat(studioName,"/-/transit?c=17.56,0,0,0,dh"),content='\n        <div class="infowindow-container">\n          <address class="studio-name">'.concat(studioName,'</address>\n          <address class="studio-address">').concat(address,'</address>\n          <div class="button-container">\n            <a class="start-button" href="').concat(startLink,'" target="_blank" rel="noopener noreferrer">출발</a>\n            <a class="destination-button" href="').concat(destinationLink,'" target="_blank" rel="noopener noreferrer">도착</a>\n          </div>\n        </div>\n      ');infowindow.setContent(content),infowindow.open(map,latLng)}}),[address,infowindow,latLng,map,navermaps.TransCoord,studioName]),__jsx(dist.EL,{ref:setMap,defaultCenter:latLng},__jsx(dist.Jx,{position:latLng}),__jsx(dist.nx,{content:address,ref:setInfoWindow,borderWidth:0,backgroundColor:"none",anchorSize:new naver.maps.Size(0,40)}))};NaverMapRenderer.displayName="NaverMapRenderer";var _기본$parameters,_기본$parameters2,Map_Map=Map,Map_stories_jsx=react.createElement;function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var Map_stories={title:"Components/Map",component:Map_Map,tags:["autodocs"],argTypes:{address:{description:"지도 위치를 표시할 상세 주소"},studioName:{description:"마커 아래 표시할 스튜디오 이름"}},args:{address:"서울특별시 성동구 뚝섬로13길 33",studioName:"원밀리언 댄스 스튜디오"}},기본={render:function render(args){return Map_stories_jsx("div",{className:" h-96 w-full "},Map_stories_jsx(Map_Map,args))}};기본.parameters=_objectSpread(_objectSpread({},기본.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_기본$parameters=기본.parameters)||void 0===_기본$parameters?void 0:_기본$parameters.docs),{},{source:_objectSpread({originalSource:'{\n  render: args => <div className=" h-96 w-full ">\n      <Map {...args} />\n    </div>\n}'},null===(_기본$parameters2=기본.parameters)||void 0===_기본$parameters2||null===(_기본$parameters2=_기본$parameters2.docs)||void 0===_기본$parameters2?void 0:_기본$parameters2.source)})})},"./src/constants/constants.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{$0:function(){return DAY_MODIFIERS},Ab:function(){return FILTER_WEEK},B9:function(){return PROGRESS_METHOD},Bl:function(){return DANCE_GENRE},JG:function(){return DAY_MODIFIERS_CLASSNAMES},ML:function(){return FILTER_TIME},Xb:function(){return DANCE_GENRE_ENGLISH},n:function(){return DEFAULT_ADDRESS},sS:function(){return SCHEDULE_MODIFIERS_CLASSNAMES},yK:function(){return DOMAIN}});var _home_runner_work_connection_frontend_connection_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js");function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,_home_runner_work_connection_frontend_connection_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var DOMAIN="http://localhost:3000",DAY_MODIFIERS={saturday:function saturday(date){return 6===date.getDay()},sunday:function sunday(date){return 0===date.getDay()}},DAY_MODIFIERS_CLASSNAMES={saturday:"saturday",sunday:"sunday"},SCHEDULE_MODIFIERS_CLASSNAMES=_objectSpread(_objectSpread({},DAY_MODIFIERS_CLASSNAMES),{},{selectableDays:"selectableDays"}),DEFAULT_ADDRESS={X:37.5666103,Y:126.9783882},DANCE_GENRE=["K-pop","브레이킹","팝핑","락킹","왁킹","힙합","하우스","크럼프","보깅","코레오그래피","키즈댄스"],DANCE_GENRE_ENGLISH=["","(Breaking)","(Popping)","(Rocking)","(Waaking)","(Hiphop)","(House)","(Crump)","(voguing)","(choreography)","(kids dance)"],PROGRESS_METHOD=["개인(1:1)레슨","그룹레슨","원데이 레슨","다회차"],FILTER_WEEK=["월","화","수","목","금","토","일"],FILTER_TIME=["오전(6시-11시)","오후(12시-17시)","저녁(18시-23시)","새벽(00시-05시)"]},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./src/styles/mapInfowindow.css":function(module,__webpack_exports__,__webpack_require__){var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".infowindow-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: 15.625rem;\n  height: 5.75rem;\n  border-radius: 0.3125rem;\n  background-color: white;\n  -webkit-box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.25);\n          box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.25);\n}\n\n.studio-name {\n  color: var(--sub-color1);\n  font-weight: 700;\n  margin-bottom: 0.1rem;\n}\n\n.studio-address {\n  font-size: 0.7rem;\n  margin-bottom: 0.4rem;\n}\n\n.button-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  border-radius: 0.3125rem;\n  border: 1px solid #d8d8d8;\n  width: 5.625rem;\n  height: 1.5625rem;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.start-button {\n  width: 50%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 0.875rem;\n  text-align: center;\n  border-right: 1px solid #d8d8d8;\n}\n\n.destination-button {\n  width: 50%;\n  font-size: 0.875rem;\n  text-align: center;\n}\n\n.start-button:hover {\n  color: var(--sub-color1);\n}\n\n.destination-button:hover {\n  color: var(--sub-color1);\n}\n","",{version:3,sources:["webpack://./src/styles/mapInfowindow.css"],names:[],mappings:"AAAA;EACE,oBAAa;EAAb,oBAAa;EAAb,aAAa;EACb,wBAAuB;MAAvB,qBAAuB;UAAvB,uBAAuB;EACvB,4BAAsB;EAAtB,6BAAsB;MAAtB,0BAAsB;UAAtB,sBAAsB;EACtB,yBAAmB;MAAnB,sBAAmB;UAAnB,mBAAmB;EACnB,gBAAgB;EAChB,eAAe;EACf,wBAAwB;EACxB,uBAAuB;EACvB,uDAA+C;UAA/C,+CAA+C;AACjD;;AAEA;EACE,wBAAwB;EACxB,gBAAgB;EAChB,qBAAqB;AACvB;;AAEA;EACE,iBAAiB;EACjB,qBAAqB;AACvB;;AAEA;EACE,oBAAa;EAAb,oBAAa;EAAb,aAAa;EACb,wBAAwB;EACxB,yBAAyB;EACzB,eAAe;EACf,iBAAiB;EACjB,yBAA8B;MAA9B,sBAA8B;UAA9B,8BAA8B;EAC9B,yBAAiB;KAAjB,sBAAiB;MAAjB,qBAAiB;UAAjB,iBAAiB;AACnB;;AAEA;EACE,UAAU;EACV,8BAAsB;UAAtB,sBAAsB;EACtB,mBAAmB;EACnB,kBAAkB;EAClB,+BAA+B;AACjC;;AAEA;EACE,UAAU;EACV,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,wBAAwB;AAC1B",sourcesContent:[".infowindow-container {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  width: 15.625rem;\n  height: 5.75rem;\n  border-radius: 0.3125rem;\n  background-color: white;\n  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.25);\n}\n\n.studio-name {\n  color: var(--sub-color1);\n  font-weight: 700;\n  margin-bottom: 0.1rem;\n}\n\n.studio-address {\n  font-size: 0.7rem;\n  margin-bottom: 0.4rem;\n}\n\n.button-container {\n  display: flex;\n  border-radius: 0.3125rem;\n  border: 1px solid #d8d8d8;\n  width: 5.625rem;\n  height: 1.5625rem;\n  justify-content: space-between;\n  user-select: none;\n}\n\n.start-button {\n  width: 50%;\n  box-sizing: border-box;\n  font-size: 0.875rem;\n  text-align: center;\n  border-right: 1px solid #d8d8d8;\n}\n\n.destination-button {\n  width: 50%;\n  font-size: 0.875rem;\n  text-align: center;\n}\n\n.start-button:hover {\n  color: var(--sub-color1);\n}\n\n.destination-button:hover {\n  color: var(--sub-color1);\n}\n"],sourceRoot:""}]),__webpack_exports__.Z=___CSS_LOADER_EXPORT___}}]);
// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.

define(["require","exports","esri/urlUtils","dojo/_base/url"],function(e,r,n,t){function i(e){return n.normalize(e)}function u(e){return n.canUseXhr(e)}function s(e){return"data:"===e.slice(0,5)}function o(e){return O.test(e)}function l(e){return a(e)||c(e)}function a(e){return e&&"/"===e[0]&&"/"===e[1]}function c(e){return x.test(e)}function p(e){return n.urlToObject(e)}function f(e){return"string"==typeof e?new t(m(e)):(e.scheme||(e.scheme=r.appUrl.scheme),e)}function h(e){if(s(e))return null;var r=e.indexOf("://");if(-1===r&&a(e))r=2;else{if(-1===r)return null;r+=3}var n=e.indexOf("/",r);return-1===n?e:e.slice(0,n)}function m(e,n){return void 0===n&&(n=r.appBaseUrl),a(e)?"file"===r.appUrl.scheme?"https:"+e:r.appUrl.scheme+":"+e:c(e)?e:g("/"===e[0]?v(n):n,e)}function v(e){var r=e.indexOf("//"),n=e.indexOf("/",r+2);return-1===n?e:e.slice(0,n)}function U(e,r,n){void 0===n&&(n=!1);var t=f(e),i=f(r);return n||t.scheme===i.scheme?t.host.toLowerCase()===i.host.toLowerCase()&&t.port===i.port:!1}function g(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];if(e&&e.length){var n=[];if(l(e[0])){var t=e[0],i=t.indexOf("//");n.push(t.slice(0,i+1)),o(e[0])&&(n[0]+="/"),e[0]=t.slice(i+2)}else"/"===e[0][0]&&n.push("");for(var u=e.reduce(function(e,r){return e.concat(r.split("/"))},[]),s=0;s<u.length;s++){var a=u[s];".."===a&&n.length>0?n.pop():!a||"."===a&&0!==n.length||n.push(a)}return n.join("/")}}r.normalize=i,r.canUseXhr=u;var d=Function("return this")();r.appUrl=new t(d.location),r.appBaseUrl=function(){var e=r.appUrl.path,n=e.substring(0,e.lastIndexOf(e.split("/")[e.split("/").length-1])),t=r.appUrl.scheme+"://"+r.appUrl.host+(null!=r.appUrl.port?":"+r.appUrl.port:"");return""+t+n}();var O=/^\s*file:/i,x=/^\s*[a-z][a-z0-9-+.]*:[^0-9]/i;r.isAbsolute=l,r.urlToObject=p,r.getOrigin=h,r.makeAbsolute=m,r.hasSameOrigin=U,r.join=g});
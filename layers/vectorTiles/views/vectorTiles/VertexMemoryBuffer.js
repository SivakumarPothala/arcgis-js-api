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

define(["require","exports","../../core/tsSupport/extendsHelper","../../core/tsSupport/decorateHelper","./MemoryBuffer","./GeometryUtils"],function(t,r,n,o,i,e){var u=function(t){function r(){return t.call(this,12)||this}return n(r,t),r.prototype.add=function(t,r,n,o,e,u,a){var h=this.array,s=this.index,f=i.i1616to32(t,r);h.push(f);var p=31;return f=i.i8888to32(Math.round(p*n),Math.round(p*o),e,u),h.push(f),f=i.i1616to32(a,0),h.push(f),s},r}(i);r.LineMemoryBuffer=u;var a=function(t){function r(){return t.call(this,4)||this}return n(r,t),r.prototype.add=function(t,r){var n=this.index;return this.array.push(i.i1616to32(t,r)),n},r}(i);r.LineJoinMemoryBuffer=a;var h=function(t){function r(){return t.call(this,4)||this}return n(r,t),r.prototype.add=function(t,r){this.array.push(i.i1616to32(t,r))},r}(i);r.PolygonMemoryBuffer=h;var s=function(t){function r(){return t.call(this,8)||this}return n(r,t),r.prototype.add=function(t,r,n,o,e,u){var a=this.array,h=this.index,s=i.i1616to32(t,r);a.push(s);var f=15;return s=i.i8888to32(Math.round(f*n),Math.round(f*o),e,u),a.push(s),h},r}(i);r.PolygonOutlineMemoryBuffer=s;var f=function(t){function r(){return t.call(this,16)||this}return n(r,t),r.prototype.add=function(t,r,n,o,u,a,h,s,f,p){var c=this.array,d=this.index,y=i.i1616to32(t,r);return c.push(y),y=i.i1616to32(Math.round(32*n),Math.round(32*o)),c.push(y),y=i.i8888to32(u/4,a/4,0,0),c.push(y),y=i.i8888to32(Math.ceil(10*p),e.radToByte(h),10*s,10*Math.min(f,25)),c.push(y),d},r}(i);r.SymbolMemoryBuffer=f});
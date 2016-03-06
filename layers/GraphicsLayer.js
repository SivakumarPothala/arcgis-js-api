// COPYRIGHT © 2016 Esri
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
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/connect","dojo/_base/lang","dojo/_base/array","dojo/dom-attr","dojo/dom-construct","dojo/dom-style","dojo/dom","dojox/gfx","dojox/gfx/matrix","./gfxSniff!esri-svg?dojox/gfx/filters","./layer","../kernel","../lang","../sniff","../Color","../domUtils","../symbols/MarkerSymbol","../symbols/SimpleMarkerSymbol","../geometry/Point","../geometry/ScreenPoint","../geometry/Extent","../geometry/mathUtils","../geometry/screenUtils","../PluginTarget","./gfxSniff!esri-svg?dojox/gfx/svgext"],function(e,t,n,i,r,s,o,a,h,c,l,_,u,d,p,f,g,m,v,y,S,x,b,w,E){var M,P=-1!==h.renderer.toLowerCase().indexOf("svg"),I=-1!==h.renderer.toLowerCase().indexOf("canvas"),R=p("ie")<9,T=p("esri-touch"),C=e(null,{declaredClass:"esri.layers._GraphicsContainer",_setMap:function(e,n){var i,r=this._connects=[];if(this._map=e,I)i=s.create("div",{style:"overflow: visible; position: absolute;"},n),this._surface={getEventSource:function(){return i}},r.push(t.connect(i,"onmousedown",this,this._canvasDownHandler)),r.push(t.connect(i,"onmouseup",this,this._canvasUpHandler)),r.push(t.connect(i,"onclick",this,this._canvasClickHandler)),M.prototype._canvas=!0;else{var a=this._surface=h.createSurface(n,e.width,e.height);i=a.getEventSource(),o.set(i=R?i.parentNode:i,{overflow:"visible",position:"absolute"})}return r.push(t.connect(e,"onResize",this,"_onResizeHandler")),i},_onResizeHandler:function(e,t,n){var s,a=this._surface.getEventSource(),h=this._map;R&&o.set(a=a.parentNode,{width:t+"px",height:n+"px",clip:"rect(0px "+t+"px "+n+"px 0px)"}),r.set(a,"width",t),r.set(a,"height",n),this._surface.declaredClass||i.forEach(a.childNodes,function(e){r.set(e,"width",t),r.set(e,"height",n)}),h.loaded&&(h.graphics.suspended||(h.graphics._resized=!0),i.forEach(h.graphicsLayerIds,function(e){s=h.getLayer(e),s.suspended||(s._resized=!0),s._updateSVGFilters(null,null,t,n)}))},_cleanUp:function(){i.forEach(this._connects,t.disconnect,t),this._map=this._surface=null},_processEvent:function(e){var t=this._map;e.screenPoint=new S(e.pageX-t.position.x,e.pageY-t.position.y),e.mapPoint=t.toMap(e.screenPoint)},_canvasDownHandler:function(e){this._processEvent(e),this._downPt=e.screenPoint.x+","+e.screenPoint.y},_canvasUpHandler:function(e){this._processEvent(e),this._upPt=e.screenPoint.x+","+e.screenPoint.y},_tolerance:15,_isPrimaryMatch:function(e,t,n,r){if(!e.visible||!t)return!1;var s,o=t.getTransformedBoundingBox();return o?(s=new x(o[0].x,o[0].y,o[2].x,o[2].y),delete s.spatialReference,T?s.intersects(n):s.contains(r)):i.some(t.children||[],function(e){return o=e.getTransformedBoundingBox(),s=new x(o[0].x,o[0].y,o[2].x,o[2].y),delete s.spatialReference,T?s.intersects(n):s.contains(r)})},_canvasClickHandler:function(e){if(this._downPt&&this._upPt&&this._downPt===this._upPt){this._processEvent(e);var t=this._map,n=i.map(t.graphicsLayerIds,function(e){return t.getLayer(e)});n.push(t.graphics),n.reverse(),n=i.filter(n,function(e){return e.loaded&&e._mouseEvents&&!e.suspended&&(!d.isDefined(e.opacity)||e.opacity>0)});var r,s=e.screenPoint,o=this._tolerance,a=s.x-o,h=s.y+o,c=s.x+o,l=s.y-o,_=new x(a,l,c,h),u=t.toMap(new S(a,h)),p=t.toMap(new S(c,l)),f=u.spatialReference._getInfo(),g=new x(x.prototype._normalizeX(u.x,f).x,u.y,x.prototype._normalizeX(p.x,f).x,p.y,u.spatialReference);if(delete _.spatialReference,i.some(n,function(e){var t=i.filter(e.graphics,function(e){return this._isPrimaryMatch(e,e.getDojoShape(),_,s)||!(!e._bgShape||!this._isPrimaryMatch(e,e._bgShape,_,s))},this);if(t.reverse(),t.length>0){var n;if(i.some(t,function(e){return e.geometry&&g.intersects(e.geometry)?(n=e,!0):!1}),n)return r=n,!0}return!1},this),r){var m=r.getLayer();m&&(e.graphic=r,m.onClick(e))}}}});M=e(_,{declaredClass:"esri.layers._GraphicsLayer",managedSuspension:!0,surfaceType:I?"canvas-2d":h.renderer,_eventMap:{"graphic-add":["graphic"],"graphic-remove":["graphic"],"renderer-change":["renderer"]},constructor:function(e){e&&(n.isString(e)||n.isObject(e)&&(e.layerDefinition||e.query))&&(e=arguments[1]),this._params=n.mixin({displayOnPan:!0,drawMode:!0,styling:!0},e||{});var t=this._params.dataAttributes;"string"==typeof t&&(t=[t]),this.styling=P?this._params.styling:!0,this.dataAttributes=t,this.infoTemplate=e&&e.infoTemplate,this.graphics=[],this._draw=n.hitch(this,this._draw),this._refresh=n.hitch(this,this._refresh),this.registerConnectEvents()},getNode:function(){return this._div&&this._div.getEventSource()},setDrawMode:function(e){this._params.drawMode=e},renderer:null,_setMap:function(e,t){this.inherited(arguments),this._map=e,this._wrap=e.wrapAround180,this._srInfo=e.spatialReference._getInfo(),this._svgFilters={},this._canvas?(t=h.createSurface(t.getEventSource(),e.width,e.height),o.set(t.rawNode,"position","absolute"),this._div=t.createGroup(),this._renderProto=this._div.constructor.prototype._render,this._div._render=n.hitch(this,this._canvasRender)):this._div=t.createGroup(),this._bgGroup=this._div.createGroup(),this._div.getEventSource().id=this.id+"_layer";var i=this.opacity;return d.isDefined(i)&&1>i&&this.setOpacity(i,!0),this._div},_unsetMap:function(e,t){i.forEach(this.graphics,function(e){e._shape=null}),this._canvas?(t=this._div.getParent(),t._parent={},s.destroy(t.rawNode),t.destroy()):(this._div.clear(),t.remove(this._div),s.destroy(this._div.getEventSource())),this._map=this._div=this._svgFilters=null,clearTimeout(this._wakeTimer),this._wakeTimer=null,this._disableDrawConnectors(),this.inherited(arguments)},_onZoomStartHandler:function(){g.hide(this._div.getEventSource())},_onExtentChangeHandler:function(e,t,n){if(clearTimeout(this._wakeTimer),this._wakeTimer=null,n){var i=this._map.__visibleRect,r=this._div;this._evalSDRenderer(),this._refresh(!0),this._updateTransform(r,i.x,i.y,!0),this._renderProto&&r.surface.pendingRender?this._dirty=!0:this.suspended||g.show(r.getEventSource())}else this._resized&&(this._refresh(!1),this._resized=!1);this.graphics.length>0&&this.onUpdate()},_canvasRender:function(){var e=this._div;return this._dirty&&(delete this._dirty,this.suspended||g.show(e.getEventSource())),this._renderProto.apply(e,arguments)},_refresh:function(e){var t,n=this.graphics,i=n.length,r=this._draw;for(t=0;i>t;t++)r(n[t],e)},refresh:function(){this._refresh(!0)},redraw:function(){this._refresh(!0)},_onPanHandler:function(e,t){this._panDx=t.x,this._panDy=t.y;var n=this._map.__visibleRect;this._updateTransform(this._div,n.x+t.x,n.y+t.y)},_onPanEndUpdateHandler:function(e,t){var n=this._map.__visibleRect;this._params._child||t.x===this._panDx&&t.y===this._panDy?this._updateSVGFilters(-n.x,-n.y):this._updateTransform(this._div,n.x,n.y,!0),this._refresh(!1),this.graphics.length&&this.onUpdate()},_onPanStartHandler:function(){g.hide(this._div.getEventSource())},_onPanEndHandler:function(){var e=this._map.__visibleRect,t=this._div;this._updateTransform(t,e.x,e.y,!0),this._refresh(!1),this._renderProto&&t.surface.pendingRender?this._dirty=!0:g.show(t.getEventSource()),this.graphics.length&&this.onUpdate()},_updateTransform:function(e,t,n,i){e.setTransform(c.translate({x:t,y:n})),i&&this._updateSVGFilters(-t,-n)},onSuspend:function(){this.inherited(arguments),g.hide(this._div.getEventSource()),clearTimeout(this._wakeTimer),this._wakeTimer=null,this._disableDrawConnectors()},onResume:function(e){this.inherited(arguments),e.firstOccurrence&&this._evalSDRenderer(),this._enableDrawConnectors(),this._wakeTimer=this._wakeTimer||setTimeout(n.hitch(this,function(){this.suspended||this._onExtentChangeHandler(null,null,!0)}),0)},_enableDrawConnectors:function(){var e=this._map,n=t.connect;this._disableDrawConnectors(),this._params.displayOnPan?(this._params._child||(this._onPanHandler_connect=n(e,"onPan",this,"_onPanHandler")),this._onPanEndHandler_connect=n(e,"onPanEnd",this,"_onPanEndUpdateHandler")):(this._onPanStartHandler_connect=n(e,"onPanStart",this,"_onPanStartHandler"),this._onPanEndHandler_connect=n(e,"onPanEnd",this,"_onPanEndHandler")),this._onZoomStartHandler_connect=n(e,"onZoomStart",this,"_onZoomStartHandler"),this._onExtentChangeHandler_connect=n(e,"onExtentChange",this,"_onExtentChangeHandler")},_disableDrawConnectors:function(){var e=t.disconnect;e(this._onExtentChangeHandler_connect),e(this._onZoomStartHandler_connect),e(this._onPanHandler_connect),e(this._onPanStartHandler_connect),e(this._onPanEndHandler_connect),this._onExtentChangeHandler_connect=this._onZoomStartHandler_connect=this._onPanHandler_connect=this._onPanStartHandler_connect=this._onPanEndHandler_connect=null},_updateExtent:function(e){var t=e.geometry;if(!t)return void(e._extent=null);var n=e._extent=t.getExtent();if(!n){var i,r;if("esri.geometry.Point"===t.declaredClass)i=t.x,r=t.y;else{if("esri.geometry.Multipoint"!==t.declaredClass)return void(e._extent=null);i=t.points[0][0],r=t.points[0][1]}e._extent=new x(i,r,i,r,t.spatialReference)}},_intersects:function(e,t,n){var r=e.spatialReference,s=t.spatialReference,o=r&&s&&!r.equals(s)&&r._canProject(s)&&4326===s.wkid;if(this._wrap&&!n){var a,h,c,l,_,u,d,p,f,g,m=[],v=e._getFrameWidth(),y=this._srInfo,S=e._clip?e._getAvailExtent():e.extent,x=[],b=t._partwise;if(o&&(S=e.geographicExtent,y=s._getInfo()),h=S._getParts(y),b&&b.length)for(a=[],c=0,u=b.length;u>c;c++)a=a.concat(b[c]._getParts(y));else a=t._getParts(y);for(c=0,u=a.length;u>c;c++)for(f=a[c],l=0,d=h.length;d>l;l++)if(g=h[l],g.extent.intersects(f.extent))for(_=0,p=f.frameIds.length;p>_;_++)m.push((g.frameIds[0]-f.frameIds[_])*v);for(c=0,u=m.length;u>c;c++)_=m[c],i.indexOf(m,_)===c&&x.push(_);return x.length?x:null}return(o?e.geographicExtent:e.extent).intersects(t)?[0]:null},_defaultMarker:{type:"simplemarkersymbol",style:"square",size:1,xoffset:0,yoffset:0,angle:0},_draw:function(e,t){if(this._params.drawMode&&this._map&&!this.suspended)try{var n,i,r,s=e._extent,o=!P||this.styling,a=P&&this.dataAttributes,h=e.getDojoShape();if(e.visible&&s&&(n=this._intersects(this._map,s,e.geometry._originOnly))&&(i=o?this._getSymbol(e):this._defaultMarker)){if(e._offsets&&e._offsets.join(",")===n.join(",")?r=!0:e._offsets=n,!h||t||!r){var c=e.geometry.type,l={graphic:e},_=e._bgShape,u=o&&!e.symbol?this._getRenderer(e):null,d=u&&u.backgroundFillSymbol;if("point"===c)this._isInvalidShape(i,h)&&this._removeShape(e),e._shape=this._drawPoint(this._div,e.geometry,i,e.getDojoShape(),n,u,e),o&&this._symbolizePoint(e.getDojoShape(),i,u,e);else if("multipoint"===c)this._drawMarkers(e,i,n,u),o&&this._symbolizeMarkers(e,i,u);else{var p,f,g,m=i;if(o&&(p="simplemarkersymbol"===i.type||"picturemarkersymbol"===i.type||"textsymbol"===i.type?i:null,m=p?d:i),m&&m===d&&(f=this._bgGroup),_&&!f&&this._removeBgShape(e),m&&(!f&&this._isInvalidShape(m,e._shape)&&this._removeShape(e,!1),g=this._drawShape(e,n,f||this._div,f?_:e.getDojoShape()),o&&this._symbolizeShape(g,m,u,!!d,e),e[f?"_bgShape":"_shape"]=g),p){this._isInvalidShape(p,e._shape)&&this._removeShape(e,!1);var v=e.geometry.getCentroid();g=v&&this._drawPoint(this._div,v,p,e._shape,n,u,e),g&&this._symbolizePoint(g,p,u,e),e._shape=g}}I||(e._bgShape&&this._initNode(e,e._bgShape,e._bgShape!==_,l,a),e._shape&&this._initNode(e,e._shape,e._shape!==h,l,a)),l.node=e.getNode(),this.onGraphicDraw(l)}}else h&&this._removeShape(e)}catch(y){this._errorHandler(y,e)}},_initNode:function(e,t,n,i,r){var s=t&&t.getNode();s&&(s.e_graphic=e,this._addDataAttrs(e,r,s),n&&(i.node=s,this.onGraphicNodeAdd(i)))},_removeShape:function(e,t){var n=e.getDojoShape(),i=n&&n.getNode();n&&(n.removeShape(),n.destroy()),e._shape=e._offsets=null,t!==!1&&this._removeBgShape(e),i&&(i.e_graphic=null,I||this.onGraphicNodeRemove({graphic:e,node:i}))},_removeBgShape:function(e){var t=e._bgShape,n=t&&t.getNode();t&&(t.removeShape(),t.destroy(),e._bgShape=null),n&&(n.e_graphic=null,I||this.onGraphicNodeRemove({graphic:e,node:n}))},_addDataAttrs:function(e,t,n){var i,r,s,o=e.attributes,a=t?t.length:0,h=this._getRenderer(e);if(n&&o){for(r=0;a>r;r++)i=t[r],i&&e.attr("data-"+i,o[i]);!this.styling&&h&&(h.getBreakIndex?(s=h.getBreakIndex(e),e.attr("data-class-break",-1!==s?s:null)):h.getUniqueValueInfo&&(s=h.getUniqueValueInfo(e),e.attr("data-unique-value",s?s.value:null)))}},_drawShape:function(e,t,n,i){var r,s,o,a,h,c,l=e.geometry,_=l.type,u=this._map,d=u.extent,p=u.width,f=u.height,g=u.__visibleRect,m=[],v="extent"===_;if("rect"===_||v)a={x:0,y:0,spatialReference:l.spatialReference},a.x=v?l.xmin:l.x,a.y=v?l.ymax:l.y,h=w.toScreenPoint(d,p,f,a),a.x=v?l.xmax:l.x+l.width,a.y=v?l.ymin:l.y+l.height,c=w.toScreenPoint(d,p,f,a),o={x:h.x-g.x+t[0],y:h.y-g.y,width:Math.abs(c.x-h.x),height:Math.abs(c.y-h.y)},0===o.width&&(o.width=1),0===o.height&&(o.height=1),i=this._drawRect(n,i,o);else if("polyline"===_||"polygon"===_){for(r=0,s=t.length;s>r;r++)m=m.concat(w._toScreenPath(d,p,f,l,-g.x+t[r],-g.y));i=this._drawPath(n,i,m),this._rendererLimits&&("polyline"===_?this._clipPolyline(i,l):this._clipPolygon(i,l))}return i},_drawRect:function(e,t,n){return t?t.setShape(n):e.createRect(n)},_drawImage:function(e,t,n){return t?t.setShape(n):e.createImage(n)},_drawCircle:function(e,t,n){return t?t.setShape(n):e.createCircle(n)},_drawPath:function(){return R?function(e,t,n,i){if(n=i?n:n.join(" "),t)return t.setShape(n);var r=e.createObject(i?h.Path:h.EsriPath,n);return e._overrideSize(r.getEventSource()),r}:function(e,t,n,i){return n=i?n:n.join(" "),t?t.setShape(n):e.createPath(n)}}(),_drawText:function(e,t,n){return t?t.setShape(n):e.createText(n)},_evalSDRenderer:function(e){var t,n=this._map,i=this.renderer,r=this._rndForScale;n&&n.loaded&&i&&i.getRendererInfo&&(t="zoom"===i.rangeType?i.getRendererInfoByZoom(n.getZoom()):i.getRendererInfoByScale(n.getScale())),this._rndForScale=t&&t.renderer,e||this._rndForScale==r||this.emit("renderer-change",{renderer:this._rndForScale})},_getRenderer:function(e){var t=this._rndForScale||this.renderer;return e&&t&&t.getObservationRenderer&&(t=t.getObservationRenderer(e)),t},_getSymbol:function(e){var t=this._getRenderer();return e.symbol||t&&t.getSymbol(e)},_getVariable:function(e,t,n){var i,r;return e&&(i=e.getVisualVariablesForType(t,n),r=i&&i[0]),r},_applyOpacity:function(e,t,n,i){var r=t.getOpacity(i,{opacityInfo:n});return null!=r&&(e=new f(e),e.a=r),e},_symbolizeShape:function(e,t,i,r,s){var o,a,h=t.getStroke(),c=t.getFill(),l=t.type,_=this._getVariable(i,"sizeInfo",!1),u=this._getVariable(i,"colorInfo",!1),d=this._getVariable(i,"opacityInfo",!1),p=-1!==l.indexOf("linesymbol"),f=p?"none"!==t.style:t.outline&&"none"!==t.outline.style,g=p?null:this._getVariable(i,"sizeInfo","outline"),m=r?g:g||_,v=m?i.getSize(s,{sizeInfo:m,resolution:this._map.getResolutionInMeters(),scale:this._map.getScale()}):null;r&&(u=d=null),(u||d)&&"picturefillsymbol"!==l&&(p?(o=h&&h.color,u&&(o=i.getColor(s,{colorInfo:u})||o),o&&d&&(o=this._applyOpacity(o,i,d,s))):c&&c.toCss&&(a=c,u&&(a=i.getColor(s,{colorInfo:u})||a),a&&d&&(a=this._applyOpacity(a,i,d,s)))),e.setStroke(!f||null==v&&!o?h:n.mixin({},h,null!=v?{width:v}:null,o&&{color:o})).setFill(a||c)},_smsToPath:function(){return R?function(e,t,n,i,r,s,o,a,h){switch(t){case e.STYLE_SQUARE:return["M",r+","+o,"L",s+","+o,s+","+a,r+","+a,"X","E"];case e.STYLE_CROSS:return["M",n+","+o,"L",n+","+a,"M",r+","+i,"L",s+","+i,"E"];case e.STYLE_X:return["M",r+","+o,"L",s+","+a,"M",r+","+a,"L",s+","+o,"E"];case e.STYLE_DIAMOND:return["M",n+","+o,"L",s+","+i,n+","+a,r+","+i,"X","E"];case e.STYLE_TARGET:return["M",r+","+o,"L",s+","+o,s+","+a,r+","+a,r+","+o,"M",r-h+","+i,"L",r+","+i,"M",n+","+(o-h),"L",n+","+o,"M",s+h+","+i,"L",s+","+i,"M",n+","+(a+h),"L",n+","+a,"E"]}}:function(e,t,n,i,r,s,o,a,h){switch(t){case e.STYLE_SQUARE:return["M",r+","+o,s+","+o,s+","+a,r+","+a,"Z"];case e.STYLE_CROSS:return["M",n+","+o,n+","+a,"M",r+","+i,s+","+i];case e.STYLE_X:return["M",r+","+o,s+","+a,"M",r+","+a,s+","+o];case e.STYLE_DIAMOND:return["M",n+","+o,s+","+i,n+","+a,r+","+i,"Z"];case e.STYLE_TARGET:return["M",r+","+o,s+","+o,s+","+a,r+","+a,r+","+o,"M",r-h+","+i,r+","+i,"M",n+","+(o-h),n+","+o,"M",s+h+","+i,s+","+i,"M",n+","+(a+h),n+","+a]}}}(),_pathStyles:{square:1,cross:1,x:1,diamond:1,target:1},_typeMaps:{picturemarkersymbol:"image",picturefillsymbol:"path",simplefillsymbol:"path",simplelinesymbol:"path",cartographiclinesymbol:"path",textsymbol:"text"},_isInvalidShape:function(e,t){var n=t&&t.shape&&t.shape.type,i=e&&e.type,r=e&&e.style;return"rect"===n&&(n="path"),i&&(r=this._typeMaps[i]||r),this._pathStyles[r]&&(r="path"),"shieldlabelsymbol"===i?!0:!(!n||!r||n===r)},_drawPoint:function(e,t,n,i,r,s,o){var a,h,l,_,u=n.type,d=this._map,p=d.__visibleRect,f=w.toScreenPoint(d.extent,d.width,d.height,t).offset(-p.x+r[0],-p.y),g=f.x,m=f.y,y=[],S=this._getVariable(s,"rotationInfo",!1),x=S?s.getRotationAngle(o,{rotationInfo:S}):null,b=this._getVariable(s,"sizeInfo",!1),E=b?s.getSize(o,{sizeInfo:b,shape:n.style,resolution:d.getResolutionInMeters(),scale:d.getScale()}):null;if(x&&y.push(c.rotategAt(x,f)),(0!==n.xoffset||0!==n.yoffset)&&(_=c.translate(n.xoffset,-n.yoffset),y.push(_)),0!==n.angle&&y.push(c.rotategAt(n.angle,f)),"simplemarkersymbol"===u){var M,I=n.style,R=Math.round;switch(E=null!=E?E:n.size,I){case v.STYLE_SQUARE:case v.STYLE_CROSS:case v.STYLE_X:case v.STYLE_DIAMOND:M=isNaN(E)?16:E/2,a=this._drawPath(e,i,this._smsToPath(v,I,g,m,R(g-M),R(g+M),R(m-M),R(m+M)));break;case v.STYLE_TARGET:var T=n._targetWidth/2,C=n._targetHeight/2;a=this._drawPath(e,i,this._smsToPath(v,I,g,m,R(g-T),R(g+T),R(m-C),R(m+C),n._spikeSize));break;case v.STYLE_PATH:a=this._drawPath(e,i,n.path,!0);var k=a.getBoundingBox(),H=this._getScaleMatrix(k,E);(1!==H.xx||1!==H.yy)&&y.push(c.scaleAt(H.xx,H.yy,f)),y.push(c.translate(-(k.x+k.width/2)+g,-(k.y+k.height/2)+m));break;default:M=isNaN(E)?16:E/2,a=this._drawCircle(e,i,{cx:g,cy:m,r:M})}}else if("shieldlabelsymbol"===u){h=n.width,l=n.height;var O=e.createGroup(),L=e.createImage({x:g-h/2,y:m-l/2,width:h,height:l,src:n.url});if(O.add(L),null!=n.font){var D=g,G=m+.2*n.getHeight(),F=e.createText({type:"text",text:n.text,x:D,y:G,align:"middle",decoration:n.decoration,rotated:n.rotated,kerning:n.kerning});F.setFont(n.font),F.setFill(n.color),O.add(F)}a=O}else if("picturemarkersymbol"===u){if(null==E?(h=n.width,l=n.height):(l=E,h=l*(n.width/n.height),_&&(null!=_.dx&&(_.dx=h*(_.dx/n.width)),null!=_.dy&&(_.dy=l*(_.dy/n.height)))),a=this._drawImage(e,i,{x:g-h/2,y:m-l/2,width:h,height:l,src:n.url}),P){var A=a.getNode();if(A){var j=this._getVariable(s,"opacityInfo",!1),N=j?s.getOpacity(o,{opacityInfo:j}):null;null!=N?A.setAttribute("opacity",N):A.setAttribute("opacity",1)}}}else if("textsymbol"===u){var B=n.font;if(null!=E&&B&&(B=new B.constructor(B.toJson()),B.setSize(E)),a=this._drawText(e,i,{type:"text",text:n.text,x:g,y:m,align:n.getSVGAlign(),decoration:n.decoration||B&&B.decoration,rotated:n.rotated,kerning:n.kerning}),B&&a.setFont(B),P){var A=a.getNode(),z=n.getSVGBaseline(),U=n.getSVGBaselineShift();A&&(A.setAttribute("dominant-baseline",z),U&&A.setAttribute("baseline-shift",U),this._applyHalo(a,n.haloColor,n.haloSize))}}return a.setTransform(c.multiply(y)),a._wrapOffsets=r,a},_applyHalo:function(e,t,n){var i=t&&n?this._getHaloId(t,n):null;e.setFilter(t&&n?p("webkit")||p("ff")?this._getDilateFilter(t,n,i):this._getOffsetFilter(t,n,i):null)},_getDilateFilter:function(e,t,n){var i=this._getSVGFilter(n);return i||(i=this._createSVGFilter({id:n},[l.feMorphology({operator:"dilate",radius:t,result:"dilated"}),l.feFlood({"flood-color":e.toCss(!0)}),l.feComposite({in2:"dilated",operator:"in",result:"composite"}),l.feMerge("composite","SourceGraphic")])),i},_getOffsetFilter:function(e,t,n){var i=this._getSVGFilter(n);if(!i){var r,s=e.toCss(!0),o=this._offsetPrimitives,a=o.length,h=[],c=[];for(r=0;a>r;r++){var _=o[r],u="offset"+_.dir,d="composite"+_.dir;c.push(d),h.push(l.feOffset({dx:_.dx*t,dy:_.dy*t,"in":"SourceAlpha",result:u}),l.feFlood({"flood-color":s}),l.feComposite({in2:u,operator:"in",result:d}))}c.push("SourceGraphic"),h.push(l.feMerge.apply(l.feMerge,c)),i=this._createSVGFilter({id:n},h)}return i},_offsetPrimitives:[{dir:"L",dx:-1,dy:0},{dir:"TL",dx:-1,dy:-1},{dir:"T",dx:0,dy:-1},{dir:"TR",dx:1,dy:-1},{dir:"R",dx:1,dy:0},{dir:"BR",dx:1,dy:1},{dir:"B",dx:0,dy:1},{dir:"BL",dx:-1,dy:1}],_getHaloId:function(e,t){return"halo_"+this._map.id+"_"+this.id+"_"+e.r+"_"+e.g+"_"+e.b+"_"+e.a+"_"+t},_getSVGFilter:function(e){return this._svgFilters[e]},_createSVGFilter:function(e,t){var n=l.createFilter(e,t),i=this._map,r=i.__visibleRect;return n.x=-r.x,n.y=-r.y,n.width=i.width,n.height=i.height,this._svgFilters[e.id]=n,n},_updateSVGFilters:function(e,t,n,i){var r,s,o,h=this._svgFilters;for(s in h)r=h[s],r&&(o=a.byId(s),o&&(null!=e&&o.setAttribute("x",e),null!=t&&o.setAttribute("y",t),null!=n&&o.setAttribute("width",n),null!=i&&o.setAttribute("height",i)),null!=e&&(r.x=e),null!=t&&(r.y=t),null!=n&&(r.width=n),null!=i&&(r.height=i))},_getScaleMatrix:function(e,t){var n=e.width/e.height,i=1,r=1;return isNaN(t)||(n>1?(i=t/e.width,r=t/n/e.height):(r=t/e.height,i=t*n/e.width)),{xx:i,yy:r}},_symbolizePoint:function(e,t,i,r){var s=t.type,o=t.style;if("shieldlabelsymbol"!==s&&"picturemarkersymbol"!==s){var a=t.getStroke(),h=t.getFill(),c=o===v.STYLE_X||o===v.STYLE_CROSS,l=a&&a.color,_=c?l:h;if(i){var u=this._getVariable(i,"colorInfo",!1),d=this._getVariable(i,"opacityInfo",!1);u&&(_=i.getColor(r,{colorInfo:u})||_),_&&d&&(_=this._applyOpacity(_,i,d,r)),_&&(c?_!==l&&(a=a?n.mixin({},a):{},a.color=_):_!==h&&(h=_))}"textsymbol"===s?e.setFill(h):"simplemarkersymbol"===s&&e.setFill(h).setStroke(a)}},_drawMarkers:function(e,t,n,i){var r,s,o,a=e.geometry,h=a.points,c=e.getDojoShape()||this._div.createGroup(),l=h.length,_=[],u=0,d=n?n.length:0;for(c.children[0]&&this._isInvalidShape(t,c.children[0])&&c.clear(),s=0;l>s;s++)for(r=h[s],o=0;d>o;o++)_[0]=n[o],this._drawPoint(c,{x:r[0],y:r[1],spatialReference:a.spatialReference},t,c.children[u++],_,i,e);var p=c.children.length;if(l*n.length<p)for(s=p-1;s>=l*n.length;s--)c.children[s].removeShape();e._shape=c},_symbolizeMarkers:function(e,t,n){var i,r=e.getDojoShape(),s=r.children,o=s.length;for(i=0;o>i;i++)this._symbolizePoint(s[i],t,n,e)},_errorHandler:function(e,t){var n="Unable to draw graphic ";e.message=t?n+"(geometry:"+(t.geometry?t.geometry.declaredClass:null)+", symbol:"+(t.symbol?t.symbol.declaredClass:null)+"): "+e.message:n+"(null): "+e.message,this.inherited(arguments)},_rendererLimits:function(){var e,t,n;if(p("ff")?(e=16125,t=-32250,n=32250):R?(e=1e5,t=-1e5,n=1e5):p("chrome")&&p("chrome")<6&&(e=8150,t=-1e4,n=1e4),e){var i,r;return i=[-e,-e,e,e],r=[[[-e,-e],[e,-e]],[[e,-e],[e,e]],[[e,e],[-e,e]],[[-e,e],[-e,-e]]],{clipLimit:e,rangeMin:t,rangeMax:n,clipBBox:i,clipSegments:r}}}(),_clipPolyline:function(e,t){var n=this._getCorners(e,t),r=n.tl,s=n.br,o=this._rendererLimits,a=o.rangeMin,h=o.rangeMax,c=o.clipBBox,l=o.clipSegments,_=this._isPointWithinRange,u=this._isPointWithinBBox,d=this._getClipperIntersection,p=this._getPlaneIndex;if(!_(r,a,h)||!_(s,a,h)){R&&this._createSegments(e);var f=[];i.forEach(e.segments,function(e){var t,n=e.args,i=n.length,r=[];for(t=0;i>t;t+=2){var s=[n[t],n[t+1]],o=[n[t+2],n[t+3]],a=u(s,c),h=u(o,c);if(a^h){var _=d([s,o],l);_&&(a?(t?r.push(_[1]):r.push(s,_[1]),f.push(r),r=[]):r.push(_[1],o))}else if(a)t?r.push(o):r.push(s,o);else{var g=p(s,c),m=p(o,c);if(-1===g||-1===m||g===m)continue;var v=d([s,o],l,!0);if(v.length>0){v[g]||(g=v[g[0]]?g[0]:g[1]),v[m]||(m=v[m[0]]?m[0]:m[1]);var y=v[g],S=v[m];y&&r.push(y),S&&(r.push(S),f.push(r),r=[])}}}f.push(r)}),e.setShape(this._getPathStringFromPaths(f))}},_clipPolygon:function(e,t){var r=this._getCorners(e,t),s=r.tl,o=r.br,a=this._rendererLimits,h=a.clipLimit,c=a.rangeMin,l=a.rangeMax,_=a.clipBBox,u=a.clipSegments,d=this._isPointWithinRange,p=this._isPointWithinBBox,f=this._getClipperIntersection,g=this._getPlaneIndex,m=b._pointLineDistance;if(!d(s,c,l)||!d(o,c,l)){R&&this._createSegments(e);var v=i.map(e.segments,function(e){var t,r=e.args,s=r.length,o=[],a=[];for(t=0;s>t;t+=2){var c=[r[t],r[t+1]],l=[r[t+2],r[t+3]];if(t===s-2){o.push(c);break}var d,v=p(c,_),y=p(l,_);if(o.push(c),v^y){if(d=f([c,l],u)){var S=d[1];S[v?"inOut":"outIn"]=!0,o.push(S),a.push([v?"INOUT":"OUTIN",o.length-1,d[0]])}}else if(!v){var x=g(c,_),b=g(l,_);if(-1===x||-1===b||x===b)continue;if(d=f([c,l],u,!0),d.length>0){d[x]||(x=d[x[0]]?x[0]:x[1]),d[b]||(b=d[b[0]]?b[0]:b[1]);var w=d[x],E=d[b];w&&(w.outIn=!0,o.push(w),a.push(["OUTIN",o.length-1,x])),E&&(E.inOut=!0,o.push(E),a.push(["INOUT",o.length-1,b]))}else if(n.isArray(x)&&n.isArray(b)){var M=x.concat(b);if(M.sort(),"0123"===M.join("")){var P=[];x[0]+x[1]===3?P.push([h,-h],[-h,h]):P.push([-h,-h],[h,h]);var I=m(P[0],[c,l]),R=m(P[1],[c,l]);o.push(R>I?P[0]:P[1])}}}}var T=_[0],C=_[1],k=_[2],H=_[3];i.forEach(o,function(e){e[0]<T&&(e[1]>=C&&e[1]<=H?e[0]=T:(e[0]=T,e[1]=e[1]<C?C:H))}),i.forEach(o,function(e){e[1]<C&&(e[0]>=T&&e[0]<=k?e[1]=C:(e[1]=C,e[0]=e[0]<T?T:k))}),i.forEach(o,function(e){e[0]>k&&(e[1]>=C&&e[1]<=H?e[0]=k:(e[0]=k,e[1]=e[1]<C?C:H))}),i.forEach(o,function(e){e[1]>H&&(e[0]>=T&&e[0]<=k?e[1]=H:(e[1]=H,e[0]=e[0]<T?T:k))});var O,L,D=0;if(s=a.length,s>0)do{if(O=a[D],L=a[(D+1)%s],O[2]===L[2]&&"INOUT"===O[0]&&"OUTIN"===L[0]){var G,F=O[1],A=L[1];if(A>F)for(G=F+1;A>G;G++)o[G][2]=!0;else if(F>A){for(G=F+1;G<o.length;G++)o[G][2]=!0;for(G=0;A>G;G++)o[G][2]=!0}}D=(D+1)%s}while(0!==D);var j,N=o[0],B=o[o.length-1];for(N[2]&&(B[2]=!0,i.some(a,function(e){return 1===e[1]?(o.splice(o.length-1,0,n.clone(o[1])),!0):!1})),o=i.filter(o,function(e){return e[2]?!1:!0}),D=0;D<o.length-1;D++)j=o[D],L=o[D+1],L&&j[0]===L[0]&&j[1]===L[1]&&(L.outIn?j.outIn=!0:L.inOut&&(j.inOut=!0),o.splice(D+1,1));var z=Math.abs,U=[];for(D=0;D<o.length-1;D++){O=o[D];var V=O[0],Y=O[1],X=z(V)===h,Z=z(Y)===h;L=o[D+1];var W=L[0],q=L[1],Q=z(W)===h,J=z(q)===h;X&&J?U.push([D+1,[V,q]]):Z&&Q&&U.push([D+1,[W,Y]])}for(D=U.length-1;D>=0;D--){var K=U[D],$=o[K[0]-1];j=o[K[0]],$.outIn||$.inOut||j.outIn||j.inOut||o.splice(K[0],0,K[1])}return N=o[0],B=o[o.length-1],(N[0]!==B[0]||N[1]!==B[1])&&o.push(N),o});e.setShape(this._getPathStringFromPaths(v))}},_getCorners:function(e,t){if(R){var n=this._map,i=t.getExtent(),r=i.spatialReference,s=n.toScreen(new y(i.xmin,i.ymax,r)),o=n.toScreen(new y(i.xmax,i.ymin,r));return{tl:s,br:o}}var a=e.getTransformedBoundingBox();return{tl:a[0],br:a[2]}},_createSegments:function(e){e.shape.path=e.vmlPath,e.segmented=!1,e._confirmSegmented();var t=e.segments;t.length>1&&(e.segments=i.filter(t,function(e,t,n){var i=n[t+1];return"M"===e.action&&i&&"L"===i.action?(e.args=e.args.concat(i.args),!0):!1}))},_getPathStringFromPaths:function(e){return R?(e=i.map(e,function(e){var t=i.map(e,function(e,t){return(1===t?"l ":"")+e.join(",")});return"m "+t.join(" ")}),e.push("e")):e=i.map(e,function(e){var t=i.map(e,function(e){return e.join(",")});return"M "+t.join(" ")}),e.join(" ")},_isPointWithinBBox:function(e,t){var n=t[0],i=t[1],r=t[2],s=t[3],o=e[0],a=e[1];return o>n&&r>o&&a>i&&s>a?!0:!1},_isPointWithinRange:function(e,t,n){var i=e.x,r=e.y;return t>i||t>r||i>n||r>n?!1:!0},_getClipperIntersection:function(e,t,n){var i,r=b._getLineIntersection2,s=Math.round,o={length:0};for(i=0;4>i;i++){var a=r(e,t[i]);if(a){if(a[0]=s(a[0]),a[1]=s(a[1]),!n)return[i,a];o[i]=a,o.length++}}return n?o:null},_getPlaneIndex:function(e,t){var n=e[0],i=e[1],r=t[0],s=t[1],o=t[2],a=t[3];return r>=n?i>=s&&a>=i?3:s>i?[0,3]:[2,3]:s>=i?n>=r&&o>=n?0:r>n?[3,0]:[1,0]:n>=o?i>=s&&a>=i?1:s>i?[0,1]:[2,1]:i>=a?n>=r&&o>=n?2:r>n?[3,2]:[1,2]:-1},onGraphicAdd:function(){},onGraphicRemove:function(){},onGraphicNodeAdd:function(){},onGraphicNodeRemove:function(){},onGraphicDraw:function(){},onGraphicsClear:function(){},onRendererChange:function(){},onOpacityChange:function(){},setInfoTemplate:function(e){this.infoTemplate=e},add:function(e,t){return e._graphicsLayer===this?e:(t||this.graphics.push(e),e._graphicsLayer=this,e._layer=this,this._updateExtent(e),this._draw(e),t||this.onGraphicAdd(e),e)},remove:function(e,t){if(!t){var n,r=this.graphics;if(-1===(n=i.indexOf(r,e)))return null;e=this.graphics.splice(n,1)[0]}return e.getDojoShape()&&this._removeShape(e),e._shape=e._graphicsLayer=null,this.onGraphicRemove(e),e},clear:function(){for(var e=arguments[1],t=this.graphics;t.length>0;)this.remove(t[0]);e||this.onGraphicsClear()},_setIEOpacity:function(e,t){var n=e&&e.getNode();if(n){var i=e.strokeStyle,r=n.stroke;i&&r&&(r.opacity=i.color.a*t);var s=e.fillStyle,a=n.fill;s&&a&&("tile"===a.type?o.set(n,"opacity",t):a.opacity=s.a*t)}},setOpacity:function(e,t){if(t||this.opacity!=e){var n=this._div;n&&(R?(i.forEach(this.graphics,function(t){this._setIEOpacity(t._shape,e),this._setIEOpacity(t._bgShape,e)},this),n._esriIeOpacity=e,this._bgGroup._esriIeOpacity=e):this._canvas?o.set(n.getEventSource(),"opacity",e):n.getEventSource().setAttribute("opacity",e)),this.opacity=e,t||this.onOpacityChange(e)}},setRenderer:function(e){this.renderer=e,this._evalSDRenderer(!0),this.emit("renderer-change",{renderer:this._rndForScale||e})}});var k=e([M,E],{declaredClass:"esri.layers.GraphicsLayer",constructor:function(){this.enableMouseEvents=n.hitch(this,this.enableMouseEvents),this.disableMouseEvents=n.hitch(this,this.disableMouseEvents),this._processEvent=n.hitch(this,this._processEvent),this._initLayer()},_initLayer:function(){this.loaded=!0,this.onLoad(this)},_setMap:function(){var e=this.inherited("_setMap",arguments);return this.enableMouseEvents(),e},_unsetMap:function(){this.disableMouseEvents(),this.inherited("_unsetMap",arguments)},_processEvent:function(e){var t,n=this._map,i=e.target;for(e.screenPoint=new S(e.pageX-n.position.x,e.pageY-n.position.y),e.mapPoint=n.toMap(e.screenPoint);i&&!(t=i.e_graphic);)i=i.parentNode;return t?(e.graphic=t,e):void 0},_onMouseOverHandler:function(e){this._processEvent(e)&&this.onMouseOver(e)},_onMouseMoveHandler:function(e){this._processEvent(e)&&this.onMouseMove(e)},_onMouseDragHandler:function(e){this._processEvent(e)&&this.onMouseDrag(e)},_onMouseOutHandler:function(e){this._processEvent(e)&&this.onMouseOut(e)},_onMouseDownHandler:function(e){this._downGr=this._downPt=null,this._processEvent(e)&&(t.disconnect(this._onmousemove_connect),t.disconnect(this._onmousedrag_connect),this._onmousedrag_connect=t.connect(this._div.getEventSource(),"onmousemove",this,"_onMouseDragHandler"),this._downGr=e.graphic,this._downPt=e.screenPoint.x+","+e.screenPoint.y,this.onMouseDown(e))},_onMouseUpHandler:function(e){this._upGr=this._upPt=null,this._processEvent(e)&&(t.disconnect(this._onmousedrag_connect),t.disconnect(this._onmousemove_connect),this._onmousemove_connect=t.connect(this._div.getEventSource(),"onmousemove",this,"_onMouseMoveHandler"),this._upGr=e.graphic,this._upPt=e.screenPoint.x+","+e.screenPoint.y,this.onMouseUp(e))},_onClickHandler:function(e){if(this._processEvent(e)){var t=this._downGr,n=this._upGr;t&&n&&t===n&&this._downPt===this._upPt&&(R&&(u._ieGraphic=e.graphic),this.onClick(e))}},_onDblClickHandler:function(e){this._processEvent(e)&&this.onDblClick(e)},onMouseOver:function(){},onMouseMove:function(){},onMouseDrag:function(){},onMouseOut:function(){},onMouseDown:function(){},onMouseUp:function(){},onClick:function(){},onDblClick:function(){},enableMouseEvents:function(){if(!this._mouseEvents){var e=t.connect,n=this._div.getEventSource();I||(this._onmouseover_connect=e(n,"onmouseover",this,"_onMouseOverHandler"),this._onmousemove_connect=e(n,"onmousemove",this,"_onMouseMoveHandler"),this._onmouseout_connect=e(n,"onmouseout",this,"_onMouseOutHandler"),this._onmousedown_connect=e(n,"onmousedown",this,"_onMouseDownHandler"),this._onmouseup_connect=e(n,"onmouseup",this,"_onMouseUpHandler"),this._onclick_connect=e(n,"onclick",this,"_onClickHandler"),this._ondblclick_connect=e(n,"ondblclick",this,"_onDblClickHandler")),this._mouseEvents=!0}},disableMouseEvents:function(){if(this._mouseEvents){var e=t.disconnect;e(this._onmouseover_connect),e(this._onmousemove_connect),e(this._onmousedrag_connect),e(this._onmouseout_connect),e(this._onmousedown_connect),e(this._onmouseup_connect),e(this._onclick_connect),e(this._ondblclick_connect),this._mouseEvents=!1}}});return k._GraphicsContainer=C,k._GraphicsLayer=M,p("extend-esri")&&(n.setObject("layers.GraphicsLayer",k,u),n.setObject("layers._GraphicsContainer",C,u),n.setObject("layers._GraphicsLayer",M,u)),k
});
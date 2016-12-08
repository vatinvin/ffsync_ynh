var _SearchParams=function(e){var t=this.params={};e=e||location.search||"",e=e.match(/^\??(.*)/)[1],e=e?e.split(/[&;]/m):[],$.each(e,function(e,n){n=n.split("=");var r=n[0],i=n[1];t[r]=isNaN(i)?i:parseFloat(i)})};_SearchParams.prototype.get=function(e){return this.params[e]},_SearchParams.prototype.set=function(e,t){this.params[e]=isNaN(t)?t:parseFloat(t)},_SearchParams.prototype.has=function(e){return e in this.params},_SearchParams.prototype.remove=function(e){delete this.params[e]},_SearchParams.prototype.toString=function(){return $.map(this.params,function(e,t){return[encodeURIComponent(t),encodeURIComponent(e)].join("=")}).join("&")},_SearchParams.prototype.utmParams=function(){var e={};return $.each(this.params,function(t,n){t.indexOf("utm_")===0&&(e[t]=n)}),e},_SearchParams.prototype.utmParamsFxA=function(e){e=e||window.location.pathname||"";var t=this.utmParams();t.utm_campaign||(t.utm_campaign="page referral - not part of a campaign");var n=e.match(/\/[\w-]+(\/.*)$/);return n&&n.length>1&&(t.utm_content=n[1]),t},
/*!
Waypoints - 3.1.1
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){"use strict";function e(r){if(!r)throw new Error("No options passed to Waypoint constructor");if(!r.element)throw new Error("No element option passed to Waypoint constructor");if(!r.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+t,this.options=e.Adapter.extend({},e.defaults,r),this.element=this.options.element,this.adapter=new e.Adapter(this.element),this.callback=r.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=e.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=e.Context.findOrCreateByElement(this.options.context),e.offsetAliases[this.options.offset]&&(this.options.offset=e.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),n[this.key]=this,t+=1}var t=0,n={};e.prototype.queueTrigger=function(e){this.group.queueTrigger(this,e)},e.prototype.trigger=function(e){this.enabled&&this.callback&&this.callback.apply(this,e)},e.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete n[this.key]},e.prototype.disable=function(){return this.enabled=!1,this},e.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},e.prototype.next=function(){return this.group.next(this)},e.prototype.previous=function(){return this.group.previous(this)},e.invokeAll=function(e){var t=[];for(var r in n)t.push(n[r]);for(var s=0,o=t.length;o>s;s++)t[s][e]()},e.destroyAll=function(){e.invokeAll("destroy")},e.disableAll=function(){e.invokeAll("disable")},e.enableAll=function(){e.invokeAll("enable")},e.refreshAll=function(){e.Context.refreshAll()},e.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},e.viewportWidth=function(){return document.documentElement.clientWidth},e.adapters=[],e.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},e.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=e}(),function(){"use strict";function e(e){window.setTimeout(e,1e3/60)}function t(e){this.element=e,this.Adapter=i.Adapter,this.adapter=new this.Adapter(e),this.key="waypoint-context-"+n,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},e.waypointContextKey=this.key,r[e.waypointContextKey]=this,n+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var n=0,r={},i=window.Waypoint,s=window.onload;t.prototype.add=function(e){var t=e.options.horizontal?"horizontal":"vertical";this.waypoints[t][e.key]=e,this.refresh()},t.prototype.checkEmpty=function(){var e=this.Adapter.isEmptyObject(this.waypoints.horizontal),t=this.Adapter.isEmptyObject(this.waypoints.vertical);e&&t&&(this.adapter.off(".waypoints"),delete r[this.key])},t.prototype.createThrottledResizeHandler=function(){function e(){t.handleResize(),t.didResize=!1}var t=this;this.adapter.on("resize.waypoints",function(){t.didResize||(t.didResize=!0,i.requestAnimationFrame(e))})},t.prototype.createThrottledScrollHandler=function(){function e(){t.handleScroll(),t.didScroll=!1}var t=this;this.adapter.on("scroll.waypoints",function(){(!t.didScroll||i.isTouch)&&(t.didScroll=!0,i.requestAnimationFrame(e))})},t.prototype.handleResize=function(){i.Context.refreshAll()},t.prototype.handleScroll=function(){var e={},t={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var n in t){var r=t[n],i=r.newScroll>r.oldScroll,s=i?r.forward:r.backward;for(var o in this.waypoints[n]){var u=this.waypoints[n][o],a=r.oldScroll<u.triggerPoint,f=r.newScroll>=u.triggerPoint,l=a&&f,c=!a&&!f;(l||c)&&(u.queueTrigger(s),e[u.group.id]=u.group)}}for(var h in e)e[h].flushTriggers();this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}},t.prototype.innerHeight=function(){return this.element==this.element.window?i.viewportHeight():this.adapter.innerHeight()},t.prototype.remove=function(e){delete this.waypoints[e.axis][e.key],this.checkEmpty()},t.prototype.innerWidth=function(){return this.element==this.element.window?i.viewportWidth():this.adapter.innerWidth()},t.prototype.destroy=function(){var e=[];for(var t in this.waypoints)for(var n in this.waypoints[t])e.push(this.waypoints[t][n]);for(var r=0,i=e.length;i>r;r++)e[r].destroy()},t.prototype.refresh=function(){var e,t=this.element==this.element.window,n=this.adapter.offset(),r={};this.handleScroll(),e={horizontal:{contextOffset:t?0:n.left,contextScroll:t?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right"
,backward:"left",offsetProp:"left"},vertical:{contextOffset:t?0:n.top,contextScroll:t?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var i in e){var s=e[i];for(var o in this.waypoints[i]){var u,a,f,l,c,h=this.waypoints[i][o],p=h.options.offset,d=h.triggerPoint,v=0,m=null==d;h.element!==h.element.window&&(v=h.adapter.offset()[s.offsetProp]),"function"==typeof p?p=p.apply(h):"string"==typeof p&&(p=parseFloat(p),h.options.offset.indexOf("%")>-1&&(p=Math.ceil(s.contextDimension*p/100))),u=s.contextScroll-s.contextOffset,h.triggerPoint=v+u-p,a=d<s.oldScroll,f=h.triggerPoint>=s.oldScroll,l=a&&f,c=!a&&!f,!m&&l?(h.queueTrigger(s.backward),r[h.group.id]=h.group):!m&&c?(h.queueTrigger(s.forward),r[h.group.id]=h.group):m&&s.oldScroll>=h.triggerPoint&&(h.queueTrigger(s.forward),r[h.group.id]=h.group)}}for(var g in r)r[g].flushTriggers();return this},t.findOrCreateByElement=function(e){return t.findByElement(e)||new t(e)},t.refreshAll=function(){for(var e in r)r[e].refresh()},t.findByElement=function(e){return r[e.waypointContextKey]},window.onload=function(){s&&s(),t.refreshAll()},i.requestAnimationFrame=function(t){var n=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||e;n.call(window,t)},i.Context=t}(),function(){"use strict";function e(e,t){return e.triggerPoint-t.triggerPoint}function t(e,t){return t.triggerPoint-e.triggerPoint}function n(e){this.name=e.name,this.axis=e.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),r[this.axis][this.name]=this}var r={vertical:{},horizontal:{}},i=window.Waypoint;n.prototype.add=function(e){this.waypoints.push(e)},n.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},n.prototype.flushTriggers=function(){for(var n in this.triggerQueues){var r=this.triggerQueues[n],i="up"===n||"left"===n;r.sort(i?t:e);for(var s=0,o=r.length;o>s;s+=1){var u=r[s];(u.options.continuous||s===r.length-1)&&u.trigger([n])}}this.clearTriggerQueues()},n.prototype.next=function(t){this.waypoints.sort(e);var n=i.Adapter.inArray(t,this.waypoints),r=n===this.waypoints.length-1;return r?null:this.waypoints[n+1]},n.prototype.previous=function(t){this.waypoints.sort(e);var n=i.Adapter.inArray(t,this.waypoints);return n?this.waypoints[n-1]:null},n.prototype.queueTrigger=function(e,t){this.triggerQueues[t].push(e)},n.prototype.remove=function(e){var t=i.Adapter.inArray(e,this.waypoints);t>-1&&this.waypoints.splice(t,1)},n.prototype.first=function(){return this.waypoints[0]},n.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},n.findOrCreate=function(e){return r[e.axis][e.name]||new n(e)},i.Group=n}(),function(){"use strict";function e(e){this.$element=t(e)}var t=window.jQuery,n=window.Waypoint;t.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(t,n){e.prototype[n]=function(){var e=Array.prototype.slice.call(arguments);return this.$element[n].apply(this.$element,e)}}),t.each(["extend","inArray","isEmptyObject"],function(n,r){e[r]=t[r]}),n.adapters.push({name:"jquery",Adapter:e}),n.Adapter=e}(),function(){"use strict";function e(e){return function(){var n=[],r=arguments[0];return e.isFunction(arguments[0])&&(r=e.extend({},arguments[1]),r.handler=arguments[0]),this.each(function(){var s=e.extend({},r,{element:this});"string"==typeof s.context&&(s.context=e(this).closest(s.context)[0]),n.push(new t(s))}),n}}var t=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=e(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=e(window.Zepto))}(),
/*!
Waypoints Sticky Element Shortcut - 3.1.1
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){"use strict";function e(r){this.options=t.extend({},n.defaults,e.defaults,r),this.element=this.options.element,this.$element=t(this.element),this.createWrapper(),this.createWaypoint()}var t=window.jQuery,n=window.Waypoint;e.prototype.createWaypoint=function(){var e=this.options.handler;this.waypoint=new n(t.extend({},this.options,{element:this.wrapper,handler:t.proxy(function(t){var n=this.options.direction.indexOf(t)>-1,r=n?this.$element.outerHeight(!0):"";this.$wrapper.height(r),this.$element.toggleClass(this.options.stuckClass,n),e&&e.call(this,t)},this)}))},e.prototype.createWrapper=function(){this.$element.wrap(this.options.wrapper),this.$wrapper=this.$element.parent(),this.wrapper=this.$wrapper[0]},e.prototype.destroy=function(){this.$element.parent()[0]===this.wrapper&&(this.waypoint.destroy(),this.$element.removeClass(this.options.stuckClass).unwrap())},e.defaults={wrapper:'<div class="sticky-wrapper" />',stuckClass:"stuck",direction:"down right"},n.Sticky=e}(),typeof window.Mozilla=="undefined"&&(window.Mozilla={}),function(e,t,n){"use strict";e.FxFamilyNav=function(){var e,r;typeof matchMedia!="undefined"&&(e=matchMedia("(min-width: 760px)"));var i=t("#fxfamilynav-header"),s=t("#fxfamilynav-adjunctnav-trigger"),o=t("#fxfamilynav-adjunctnav"),u=function(){e.addListener(function(e){e.matches?a():f()}),e.matches&&a()},a=function(){s.on("click",function(){s.toggleClass("active"),o.toggleClass("active"),s.hasClass("active")&&window.dataLayer.push({event:"open-side-menu"})}).addClass("visible"),o.on("mouseover",function(){o.addClass("active"),s.addClass("active")}).on("mouseout",function(){o.removeClass("active"),s.removeClass("active")}),i.on("mouseleave",function(){o.removeClass("active"),s.removeClass("active")}),e&&(r=new n.Sticky({element:i,offset:-50}))},f=function(){o.removeClass("active"),s.off(),o.off(),i.off(),e&&r.destroy()},l=function(){e?u():(a(),/MSIE\s[1-8]\./.test(navigator.userAgent)&&t(".trigger-dots").addClass("fallback"))};return{init:function(){l()}}}()}(window.Mozilla,window.jQuery,window.Waypoint),Mozilla.FxFamilyNav.init();var Mozilla=window.Mozilla||{};(function(e){"use strict";Mozilla.syncAnimation=function(){var t=e(".sync-anim"),n=t.find(".laptop"),r=n.find(".inner"),i=t.find(".phone"),s=n.
find(".arrows");t.addClass("on"),s.one("webkitAnimationStart MSAnimationStart animationstart",function(){r.addClass("faded")}),s.one("webkitAnimationEnd MSAnimationEnd animationend",function(){r.removeClass("faded")}),i.one("webkitAnimationEnd MSAnimationEnd animationend",".passwords",function(){t.addClass("complete")})}})(window.jQuery);if(typeof Mozilla=="undefined")var Mozilla={};(function(){"use strict";function t(){e&&(clearInterval(e),e=null)}function n(e,t){var n=new CustomEvent("mozUITour",{bubbles:!0,detail:{action:e,data:t||{}}});document.dispatchEvent(n)}function r(){return Math.random().toString(36).replace(/[^a-z]+/g,"")}function i(e){function n(r){if(typeof r.detail!="object")return;if(r.detail.callbackID!==t)return;document.removeEventListener("mozUITourResponse",n),e(r.detail.data)}var t=r();return document.addEventListener("mozUITourResponse",n),t}function o(e){if(typeof e.detail!="object")return;if(typeof s!="function")return;s(e.detail.event,e.detail.params)}typeof Mozilla.UITour=="undefined"&&(Mozilla.UITour={});var e=null;Mozilla.UITour.DEFAULT_THEME_CYCLE_DELAY=1e4,Mozilla.UITour.registerPageID=function(e){n("registerPageID",{pageID:e})},Mozilla.UITour.showHighlight=function(e,t){n("showHighlight",{target:e,effect:t})},Mozilla.UITour.hideHighlight=function(){n("hideHighlight")},Mozilla.UITour.showInfo=function(e,t,r,s,o,u){var a=[];if(Array.isArray(o))for(var f=0;f<o.length;f++)a.push({label:o[f].label,icon:o[f].icon,style:o[f].style,callbackID:i(o[f].callback)});var l,c;u&&u.closeButtonCallback&&(l=i(u.closeButtonCallback)),u&&u.targetCallback&&(c=i(u.targetCallback)),n("showInfo",{target:e,title:t,text:r,icon:s,buttons:a,closeButtonCallbackID:l,targetCallbackID:c})},Mozilla.UITour.hideInfo=function(){n("hideInfo")},Mozilla.UITour.previewTheme=function(e){t(),n("previewTheme",{theme:JSON.stringify(e)})},Mozilla.UITour.resetTheme=function(){t(),n("resetTheme")},Mozilla.UITour.cycleThemes=function(r,i,s){function o(){var e=r.shift();r.push(e),n("previewTheme",{theme:JSON.stringify(e),state:!0}),s(e)}t(),i||(i=Mozilla.UITour.DEFAULT_THEME_CYCLE_DELAY),e=setInterval(o,i),o()},Mozilla.UITour.showMenu=function(e,t){var r;t&&(r=i(t)),n("showMenu",{name:e,showCallbackID:r})},Mozilla.UITour.hideMenu=function(e){n("hideMenu",{name:e})},Mozilla.UITour.getConfiguration=function(e,t){n("getConfiguration",{callbackID:i(t),configuration:e})},Mozilla.UITour.setConfiguration=function(e,t){n("setConfiguration",{configuration:e,value:t})},Mozilla.UITour.showFirefoxAccounts=function(e){n("showFirefoxAccounts",{extraURLCampaignParams:JSON.stringify(e)})},Mozilla.UITour.resetFirefox=function(){n("resetFirefox")},Mozilla.UITour.addNavBarWidget=function(e,t){n("addNavBarWidget",{name:e,callbackID:i(t)})},Mozilla.UITour.setDefaultSearchEngine=function(e){n("setDefaultSearchEngine",{identifier:e})},Mozilla.UITour.setTreatmentTag=function(e,t){n("setTreatmentTag",{name:e,value:t})},Mozilla.UITour.getTreatmentTag=function(e,t){n("getTreatmentTag",{name:e,callbackID:i(t)})},Mozilla.UITour.setSearchTerm=function(e){n("setSearchTerm",{term:e})},Mozilla.UITour.openSearchPanel=function(e){n("openSearchPanel",{callbackID:i(e)})},Mozilla.UITour.ping=function(e){var t={};e&&(t.callbackID=i(e)),n("ping",t)};var s=null;Mozilla.UITour.observe=function(e,t){s=e,e?(document.addEventListener("mozUITourNotification",o),Mozilla.UITour.ping(t)):document.removeEventListener("mozUITourNotification",o)},Mozilla.UITour.openPreferences=function(e){n("openPreferences",{pane:e})},Mozilla.UITour.closeTab=function(){n("closeTab")}})(),function(e,t){"use strict";function d(){try{window.sessionStorage.setItem("moz-session-storage-check",!0),window.sessionStorage.removeItem("moz-session-storage-check"),f.addClass("active"),l.attr("required","required"),h=!0}catch(t){}a.on("submit",function(t){t.preventDefault(),a.off("submit"),window.dataLayer.push({event:"sync-interactions",interaction:"form submit","form-name":e.trim(e("#cta-sync-variation").text()),"test-variation":e("#variation").val()}),h&&(c=l.val(),/(.+)@(.+)\.(.+){2,}/.test(c)&&window.sessionStorage.setItem("fxa-email",l.val()),l.removeAttr("required").val("")),a.submit()})}window.dataLayer=window.dataLayer||[],setTimeout(t.syncAnimation,1e3);var n=new window._SearchParams,r=window.Mozilla.Client,i=r.FirefoxMajorVersion,s="Unknown",o=!1,u=e("body"),a=e("#fxa-email-form"),f=e(".fxa-email"),l=e("#fxa-email"),c,h=!1,p=function(e){u.removeClass("state-default"),u.addClass(e),e==="state-fx-31-signed-out"&&d()};r.isFirefox?r.isFirefoxAndroid?(p("state-fx-android"),s="Firefox for Android"):r.isFirefoxDesktop&&(i>=31?(o=!0,t.UITour.getConfiguration("sync",function(e){e.setup?(p("state-fx-31-signed-in"),s="Firefox 31 or Higher: Signed-In"):(p("state-fx-31-signed-out"),s="Firefox 31 or Higher: Signed-Out"),window.dataLayer.push({event:"page-load",browser:s})})):i===29||i===30?(p("state-fx-29-30"),s="Firefox 29 or 30"):i<=28&&(p("state-fx-28-older"),s="Firefox 28 or Older")):(p("state-not-fx"),s="Not Firefox"),o===!1&&window.dataLayer.push({event:"page-load",browser:s}),e("#cta-sync").on("click",function(e){e.preventDefault(),window.dataLayer.push({event:"sync-click",browser:s}),t.UITour.showFirefoxAccounts(n.utmParamsFxA())})}(window.jQuery,window.Mozilla);

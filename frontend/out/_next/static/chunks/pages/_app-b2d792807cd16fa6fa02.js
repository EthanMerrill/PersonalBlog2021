_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[6],{0:function(t,n,e){e("GcxT"),t.exports=e("nOHt")},"1TCz":function(t,n,e){"use strict";e.r(n),e.d(n,"GlobalContext",(function(){return y}));var r=e("o0o1"),o=e.n(r),i=e("rePB"),c=e("HaE+"),u=e("q1tI"),s=e.n(u),a=e("8Bbg"),l=e.n(a),f=e("8Kt/"),p=e.n(f),h=(e("6zHJ"),e("q4pp")),d=e("qoWs"),v=s.a.createElement;function m(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,r)}return e}function b(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?m(Object(e),!0).forEach((function(n){Object(i.a)(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):m(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}var y=Object(u.createContext)({}),g=function(t){var n=t.Component,e=t.pageProps,r=e.global;return v(s.a.Fragment,null,v(p.a,null,v("link",{rel:"shortcut icon",href:Object(h.a)(r.favicon)}),v("link",{rel:"stylesheet",href:"https://use.fontawesome.com/releases/v5.5.0/css/all.css",integrity:"sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU",crossorigin:"anonymous"}),v("html",{xmlnsXlinkk:"http://www.w3.org/1999/xlink"}),v("script",{src:"https://d3js.org/d3.v6.min.js"}),v("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/css?family=Staatliches"}),v("link",{rel:"stylesheet",href:"https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/css/uikit.min.css"}),v("script",{src:"https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js"}),v("script",{src:"https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/js/uikit-icons.min.js"}),v("script",{src:"https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js"})),v(y.Provider,{value:r},v(n,e)))};g.getInitialProps=function(){var t=Object(c.a)(o.a.mark((function t(n){var e,r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.getInitialProps(n);case 2:return e=t.sent,t.next=5,Object(d.a)("/global");case 5:return r=t.sent,t.abrupt("return",b(b({},e),{},{pageProps:{global:r}}));case 7:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),n.default=g},"6zHJ":function(t,n,e){},"8Bbg":function(t,n,e){t.exports=e("B5Ud")},"8oxB":function(t,n){var e,r,o=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function c(){throw new Error("clearTimeout has not been defined")}function u(t){if(e===setTimeout)return setTimeout(t,0);if((e===i||!e)&&setTimeout)return e=setTimeout,setTimeout(t,0);try{return e(t,0)}catch(n){try{return e.call(null,t,0)}catch(n){return e.call(this,t,0)}}}!function(){try{e="function"===typeof setTimeout?setTimeout:i}catch(t){e=i}try{r="function"===typeof clearTimeout?clearTimeout:c}catch(t){r=c}}();var s,a=[],l=!1,f=-1;function p(){l&&s&&(l=!1,s.length?a=s.concat(a):f=-1,a.length&&h())}function h(){if(!l){var t=u(p);l=!0;for(var n=a.length;n;){for(s=a,a=[];++f<n;)s&&s[f].run();f=-1,n=a.length}s=null,l=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===c||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(n){try{return r.call(null,t)}catch(n){return r.call(this,t)}}}(t)}}function d(t,n){this.fun=t,this.array=n}function v(){}o.nextTick=function(t){var n=new Array(arguments.length-1);if(arguments.length>1)for(var e=1;e<arguments.length;e++)n[e-1]=arguments[e];a.push(new d(t,n)),1!==a.length||l||u(h)},d.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=v,o.addListener=v,o.once=v,o.off=v,o.removeListener=v,o.removeAllListeners=v,o.emit=v,o.prependListener=v,o.prependOnceListener=v,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},B5Ud:function(t,n,e){"use strict";var r=e("o0o1"),o=e("lwsE"),i=e("W8MJ"),c=e("7W2i"),u=e("a1gu"),s=e("Nsbk"),a=e("yXPU");function l(t){var n=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,r=s(t);if(n){var o=s(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return u(this,e)}}var f=e("TqRt");n.__esModule=!0,n.Container=function(t){0;return t.children},n.createUrl=b,n.default=void 0;var p=f(e("q1tI")),h=e("g/15");function d(t){return v.apply(this,arguments)}function v(){return(v=a(r.mark((function t(n){var e,o,i;return r.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=n.Component,o=n.ctx,t.next=3,(0,h.loadGetInitialProps)(e,o);case 3:return i=t.sent,t.abrupt("return",{pageProps:i});case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}n.AppInitialProps=h.AppInitialProps,n.NextWebVitalsMetric=h.NextWebVitalsMetric;var m=function(t){c(e,t);var n=l(e);function e(){return o(this,e),n.apply(this,arguments)}return i(e,[{key:"componentDidCatch",value:function(t,n){throw t}},{key:"render",value:function(){var t=this.props,n=t.router,e=t.Component,r=t.pageProps,o=t.__N_SSG,i=t.__N_SSP;return p.default.createElement(e,Object.assign({},r,o||i?{}:{url:b(n)}))}}]),e}(p.default.Component);function b(t){var n=t.pathname,e=t.asPath,r=t.query;return{get query(){return r},get pathname(){return n},get asPath(){return e},back:function(){t.back()},push:function(n,e){return t.push(n,e)},pushTo:function(n,e){var r=e?n:"",o=e||n;return t.push(r,o)},replace:function(n,e){return t.replace(n,e)},replaceTo:function(n,e){var r=e?n:"",o=e||n;return t.replace(r,o)}}}n.default=m,m.origGetInitialProps=d,m.getInitialProps=d},GcxT:function(t,n,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return e("1TCz")}])},"HaE+":function(t,n,e){"use strict";function r(t,n,e,r,o,i,c){try{var u=t[i](c),s=u.value}catch(a){return void e(a)}u.done?n(s):Promise.resolve(s).then(r,o)}function o(t){return function(){var n=this,e=arguments;return new Promise((function(o,i){var c=t.apply(n,e);function u(t){r(c,o,i,u,s,"next",t)}function s(t){r(c,o,i,u,s,"throw",t)}u(void 0)}))}}e.d(n,"a",(function(){return o}))},q4pp:function(t,n,e){"use strict";e.d(n,"a",(function(){return o}));var r=e("qoWs");function o(t){return t?t.url.startsWith("/")?Object(r.b)(t.url):t.url:void 0}},qoWs:function(t,n,e){"use strict";(function(t){e.d(n,"b",(function(){return c})),e.d(n,"a",(function(){return u}));var r=e("o0o1"),o=e.n(r),i=e("HaE+");function c(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return"".concat(t.env.NEXT_PUBLIC_STRAPI_API_URL||"http://localhost:1337").concat(n)}function u(t){return s.apply(this,arguments)}function s(){return(s=Object(i.a)(o.a.mark((function t(n){var e,r,i;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=c(n),t.next=3,fetch(e);case 3:return r=t.sent,t.next=6,r.json();case 6:return i=t.sent,t.abrupt("return",i);case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}}).call(this,e("8oxB"))},rePB:function(t,n,e){"use strict";function r(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}e.d(n,"a",(function(){return r}))}},[[0,0,2,1]]]);
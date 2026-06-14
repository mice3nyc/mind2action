var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var ee=Array.isArray;function te(){}var S={H:null,A:null,T:null,S:null},C=Object.prototype.hasOwnProperty;function ne(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function re(e,t){return ne(e.type,t,e.props)}function ie(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function ae(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var oe=/\/+/g;function se(e,t){return typeof e==`object`&&e&&e.key!=null?ae(``+e.key):t.toString(36)}function ce(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(te,te):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function le(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,le(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+se(e,0):a,ee(o)?(i=``,c!=null&&(i=c.replace(oe,`$&/`)+`/`),le(o,r,i,``,function(e){return e})):o!=null&&(ie(o)&&(o=re(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(oe,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(ee(e))for(var u=0;u<e.length;u++)a=e[u],s=l+se(a,u),c+=le(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+se(a,u++),c+=le(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return le(ce(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ue(e,t,n){if(e==null)return e;var r=[],i=0;return le(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function de(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var w=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},T={map:ue,forEach:function(e,t,n){ue(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ue(e,function(){t++}),t},toArray:function(e){return ue(e,function(e){return e})||[]},only:function(e){if(!ie(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=T,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=S,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return S.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!C.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return ne(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)C.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return ne(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=ie,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:de}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=S.T,n={};S.T=n;try{var r=e(),i=S.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(te,w)}catch(e){w(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),S.T=t}},e.unstable_useCacheRefresh=function(){return S.H.useCacheRefresh()},e.use=function(e){return S.H.use(e)},e.useActionState=function(e,t,n){return S.H.useActionState(e,t,n)},e.useCallback=function(e,t){return S.H.useCallback(e,t)},e.useContext=function(e){return S.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return S.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return S.H.useEffect(e,t)},e.useEffectEvent=function(e){return S.H.useEffectEvent(e)},e.useId=function(){return S.H.useId()},e.useImperativeHandle=function(e,t,n){return S.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return S.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return S.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return S.H.useMemo(e,t)},e.useOptimistic=function(e,t){return S.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return S.H.useReducer(e,t,n)},e.useRef=function(e){return S.H.useRef(e)},e.useState=function(e){return S.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return S.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return S.H.useTransition()},e.version=`19.2.6`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,ee||(ee=!0,ie());else{var t=n(l);t!==null&&se(x,t.startTime-e)}}var ee=!1,te=-1,S=5,C=-1;function ne(){return g?!0:!(e.unstable_now()-C<S)}function re(){if(g=!1,ee){var t=e.unstable_now();C=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(te),te=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&ne());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&se(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?ie():ee=!1}}}var ie;if(typeof y==`function`)ie=function(){y(re)};else if(typeof MessageChannel<`u`){var ae=new MessageChannel,oe=ae.port2;ae.port1.onmessage=re,ie=function(){oe.postMessage(null)}}else ie=function(){_(re,0)};function se(t,n){te=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):S=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(te),te=-1):h=!0,se(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,ee||(ee=!0,ie()))),r},e.unstable_shouldYield=ne,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.6`})),m=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),ee=Symbol.for(`react.consumer`),te=Symbol.for(`react.context`),S=Symbol.for(`react.forward_ref`),C=Symbol.for(`react.suspense`),ne=Symbol.for(`react.suspense_list`),re=Symbol.for(`react.memo`),ie=Symbol.for(`react.lazy`),ae=Symbol.for(`react.activity`),oe=Symbol.for(`react.memo_cache_sentinel`),se=Symbol.iterator;function ce(e){return typeof e!=`object`||!e?null:(e=se&&e[se]||e[`@@iterator`],typeof e==`function`?e:null)}var le=Symbol.for(`react.client.reference`);function ue(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===le?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case C:return`Suspense`;case ne:return`SuspenseList`;case ae:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case te:return e.displayName||`Context`;case ee:return(e._context.displayName||`Context`)+`.Consumer`;case S:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case re:return t=e.displayName||null,t===null?ue(e.type)||`Memo`:t;case ie:t=e._payload,e=e._init;try{return ue(e(t))}catch{}}return null}var de=Array.isArray,w=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,T=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,fe={pending:!1,data:null,method:null,action:null},pe=[],me=-1;function he(e){return{current:e}}function ge(e){0>me||(e.current=pe[me],pe[me]=null,me--)}function E(e,t){me++,pe[me]=e.current,e.current=t}var _e=he(null),ve=he(null),ye=he(null),be=he(null);function xe(e,t){switch(E(ye,t),E(ve,e),E(_e,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}ge(_e),E(_e,e)}function Se(){ge(_e),ge(ve),ge(ye)}function Ce(e){e.memoizedState!==null&&E(be,e);var t=_e.current,n=Hd(t,e.type);t!==n&&(E(ve,e),E(_e,n))}function we(e){ve.current===e&&(ge(_e),ge(ve)),be.current===e&&(ge(be),Qf._currentValue=fe)}var Te,Ee;function De(e){if(Te===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Te=t&&t[1]||``,Ee=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Te+e+Ee}var Oe=!1;function ke(e,t){if(!e||Oe)return``;Oe=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,`props`,{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,`name`,{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Oe=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?De(n):``}function Ae(e,t){switch(e.tag){case 26:case 27:case 5:return De(e.type);case 16:return De(`Lazy`);case 13:return e.child!==t&&t!==null?De(`Suspense Fallback`):De(`Suspense`);case 19:return De(`SuspenseList`);case 0:case 15:return ke(e.type,!1);case 11:return ke(e.type.render,!1);case 1:return ke(e.type,!0);case 31:return De(`Activity`);default:return``}}function je(e){try{var t=``,n=null;do t+=Ae(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Me=Object.prototype.hasOwnProperty,Ne=t.unstable_scheduleCallback,Pe=t.unstable_cancelCallback,Fe=t.unstable_shouldYield,Ie=t.unstable_requestPaint,Le=t.unstable_now,Re=t.unstable_getCurrentPriorityLevel,ze=t.unstable_ImmediatePriority,Be=t.unstable_UserBlockingPriority,Ve=t.unstable_NormalPriority,He=t.unstable_LowPriority,Ue=t.unstable_IdlePriority,We=t.log,Ge=t.unstable_setDisableYieldValue,Ke=null,qe=null;function Je(e){if(typeof We==`function`&&Ge(e),qe&&typeof qe.setStrictMode==`function`)try{qe.setStrictMode(Ke,e)}catch{}}var Ye=Math.clz32?Math.clz32:Qe,Xe=Math.log,Ze=Math.LN2;function Qe(e){return e>>>=0,e===0?32:31-(Xe(e)/Ze|0)|0}var $e=256,et=262144,tt=4194304;function nt(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function rt(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=nt(n))):i=nt(o):i=nt(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=nt(n))):i=nt(o)):i=nt(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function it(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function at(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ot(){var e=tt;return tt<<=1,!(tt&62914560)&&(tt=4194304),e}function st(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ct(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function lt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Ye(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&ut(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function ut(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Ye(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function dt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ye(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function ft(e,t){var n=t&-t;return n=n&42?1:pt(n),(n&(e.suspendedLanes|t))===0?n:0}function pt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function mt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function ht(){var e=T.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function gt(e,t){var n=T.p;try{return T.p=e,t()}finally{T.p=n}}var _t=Math.random().toString(36).slice(2),vt=`__reactFiber$`+_t,yt=`__reactProps$`+_t,bt=`__reactContainer$`+_t,xt=`__reactEvents$`+_t,St=`__reactListeners$`+_t,Ct=`__reactHandles$`+_t,wt=`__reactResources$`+_t,Tt=`__reactMarker$`+_t;function Et(e){delete e[vt],delete e[yt],delete e[xt],delete e[St],delete e[Ct]}function Dt(e){var t=e[vt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[bt]||n[vt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[vt])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function Ot(e){if(e=e[vt]||e[bt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function kt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function At(e){var t=e[wt];return t||=e[wt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function jt(e){e[Tt]=!0}var Mt=new Set,Nt={};function Pt(e,t){Ft(e,t),Ft(e+`Capture`,t)}function Ft(e,t){for(Nt[e]=t,e=0;e<t.length;e++)Mt.add(t[e])}var It=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Lt={},Rt={};function zt(e){return Me.call(Rt,e)?!0:Me.call(Lt,e)?!1:It.test(e)?Rt[e]=!0:(Lt[e]=!0,!1)}function Bt(e,t,n){if(zt(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function Vt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Ht(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Ut(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Wt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Gt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Kt(e){if(!e._valueTracker){var t=Wt(e)?`checked`:`value`;e._valueTracker=Gt(e,t,``+e[t])}}function qt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Wt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Jt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Yt=/[\n"\\]/g;function Xt(e){return e.replace(Yt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Zt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Ut(t)):e.value!==``+Ut(t)&&(e.value=``+Ut(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):$t(e,o,Ut(n)):$t(e,o,Ut(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Ut(s):e.removeAttribute(`name`)}function Qt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Kt(e);return}n=n==null?``:``+Ut(n),t=t==null?n:``+Ut(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Kt(e)}function $t(e,t,n){t===`number`&&Jt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function en(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Ut(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function tn(e,t,n){if(t!=null&&(t=``+Ut(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Ut(n)}function nn(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(de(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Ut(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Kt(e)}function rn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var an=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function on(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||an.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function sn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&on(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&on(e,o,t[o])}function cn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var ln=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),un=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function dn(e){return un.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function fn(){}var pn=null;function mn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var hn=null,gn=null;function _n(e){var t=Ot(e);if(t&&(e=t.stateNode)){var n=e[yt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Zt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Xt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[yt]||null;if(!a)throw Error(i(90));Zt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&qt(r)}break a;case`textarea`:tn(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&en(e,!!n.multiple,t,!1)}}}var vn=!1;function yn(e,t,n){if(vn)return e(t,n);vn=!0;try{return e(t)}finally{if(vn=!1,(hn!==null||gn!==null)&&(bu(),hn&&(t=hn,e=gn,gn=hn=null,_n(t),e)))for(t=0;t<e.length;t++)_n(e[t])}}function bn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[yt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var xn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),Sn=!1;if(xn)try{var Cn={};Object.defineProperty(Cn,`passive`,{get:function(){Sn=!0}}),window.addEventListener(`test`,Cn,Cn),window.removeEventListener(`test`,Cn,Cn)}catch{Sn=!1}var wn=null,Tn=null,En=null;function Dn(){if(En)return En;var e,t=Tn,n=t.length,r,i=`value`in wn?wn.value:wn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return En=i.slice(e,1<r?1-r:void 0)}function On(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function kn(){return!0}function An(){return!1}function jn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?kn:An,this.isPropagationStopped=An,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=kn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=kn)},persist:function(){},isPersistent:kn}),t}var Mn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Nn=jn(Mn),Pn=h({},Mn,{view:0,detail:0}),Fn=jn(Pn),In,Ln,Rn,zn=h({},Pn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Xn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Rn&&(Rn&&e.type===`mousemove`?(In=e.screenX-Rn.screenX,Ln=e.screenY-Rn.screenY):Ln=In=0,Rn=e),In)},movementY:function(e){return`movementY`in e?e.movementY:Ln}}),Bn=jn(zn),Vn=jn(h({},zn,{dataTransfer:0})),Hn=jn(h({},Pn,{relatedTarget:0})),Un=jn(h({},Mn,{animationName:0,elapsedTime:0,pseudoElement:0})),Wn=jn(h({},Mn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Gn=jn(h({},Mn,{data:0})),Kn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},qn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Jn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Yn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Jn[e])?!!t[e]:!1}function Xn(){return Yn}var Zn=jn(h({},Pn,{key:function(e){if(e.key){var t=Kn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=On(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?qn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Xn,charCode:function(e){return e.type===`keypress`?On(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?On(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Qn=jn(h({},zn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),$n=jn(h({},Pn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Xn})),er=jn(h({},Mn,{propertyName:0,elapsedTime:0,pseudoElement:0})),tr=jn(h({},zn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),nr=jn(h({},Mn,{newState:0,oldState:0})),rr=[9,13,27,32],ir=xn&&`CompositionEvent`in window,ar=null;xn&&`documentMode`in document&&(ar=document.documentMode);var or=xn&&`TextEvent`in window&&!ar,sr=xn&&(!ir||ar&&8<ar&&11>=ar),cr=` `,lr=!1;function ur(e,t){switch(e){case`keyup`:return rr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function dr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var fr=!1;function pr(e,t){switch(e){case`compositionend`:return dr(t);case`keypress`:return t.which===32?(lr=!0,cr):null;case`textInput`:return e=t.data,e===cr&&lr?null:e;default:return null}}function mr(e,t){if(fr)return e===`compositionend`||!ir&&ur(e,t)?(e=Dn(),En=Tn=wn=null,fr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return sr&&t.locale!==`ko`?null:t.data;default:return null}}var hr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function gr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!hr[e.type]:t===`textarea`}function _r(e,t,n,r){hn?gn?gn.push(r):gn=[r]:hn=r,t=Ed(t,`onChange`),0<t.length&&(n=new Nn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var vr=null,yr=null;function br(e){yd(e,0)}function xr(e){if(qt(kt(e)))return e}function Sr(e,t){if(e===`change`)return t}var Cr=!1;if(xn){var wr;if(xn){var Tr=`oninput`in document;if(!Tr){var Er=document.createElement(`div`);Er.setAttribute(`oninput`,`return;`),Tr=typeof Er.oninput==`function`}wr=Tr}else wr=!1;Cr=wr&&(!document.documentMode||9<document.documentMode)}function Dr(){vr&&(vr.detachEvent(`onpropertychange`,Or),yr=vr=null)}function Or(e){if(e.propertyName===`value`&&xr(yr)){var t=[];_r(t,yr,e,mn(e)),yn(br,t)}}function kr(e,t,n){e===`focusin`?(Dr(),vr=t,yr=n,vr.attachEvent(`onpropertychange`,Or)):e===`focusout`&&Dr()}function Ar(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return xr(yr)}function jr(e,t){if(e===`click`)return xr(t)}function Mr(e,t){if(e===`input`||e===`change`)return xr(t)}function Nr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Pr=typeof Object.is==`function`?Object.is:Nr;function Fr(e,t){if(Pr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Me.call(t,i)||!Pr(e[i],t[i]))return!1}return!0}function Ir(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function D(e,t){var n=Ir(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Ir(n)}}function Lr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Lr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Rr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Jt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Jt(e.document)}return t}function zr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Br=xn&&`documentMode`in document&&11>=document.documentMode,Vr=null,Hr=null,Ur=null,Wr=!1;function Gr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Wr||Vr==null||Vr!==Jt(r)||(r=Vr,`selectionStart`in r&&zr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ur&&Fr(Ur,r)||(Ur=r,r=Ed(Hr,`onSelect`),0<r.length&&(t=new Nn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Vr)))}function Kr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var qr={animationend:Kr(`Animation`,`AnimationEnd`),animationiteration:Kr(`Animation`,`AnimationIteration`),animationstart:Kr(`Animation`,`AnimationStart`),transitionrun:Kr(`Transition`,`TransitionRun`),transitionstart:Kr(`Transition`,`TransitionStart`),transitioncancel:Kr(`Transition`,`TransitionCancel`),transitionend:Kr(`Transition`,`TransitionEnd`)},Jr={},Yr={};xn&&(Yr=document.createElement(`div`).style,`AnimationEvent`in window||(delete qr.animationend.animation,delete qr.animationiteration.animation,delete qr.animationstart.animation),`TransitionEvent`in window||delete qr.transitionend.transition);function Xr(e){if(Jr[e])return Jr[e];if(!qr[e])return e;var t=qr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Yr)return Jr[e]=t[n];return e}var Zr=Xr(`animationend`),Qr=Xr(`animationiteration`),$r=Xr(`animationstart`),ei=Xr(`transitionrun`),ti=Xr(`transitionstart`),ni=Xr(`transitioncancel`),ri=Xr(`transitionend`),ii=new Map,ai=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);ai.push(`scrollEnd`);function oi(e,t){ii.set(e,t),Pt(t,[e])}var si=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},ci=[],li=0,ui=0;function di(){for(var e=li,t=ui=li=0;t<e;){var n=ci[t];ci[t++]=null;var r=ci[t];ci[t++]=null;var i=ci[t];ci[t++]=null;var a=ci[t];if(ci[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&hi(n,i,a)}}function fi(e,t,n,r){ci[li++]=e,ci[li++]=t,ci[li++]=n,ci[li++]=r,ui|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function pi(e,t,n,r){return fi(e,t,n,r),gi(e)}function mi(e,t){return fi(e,null,null,t),gi(e)}function hi(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Ye(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function gi(e){if(50<du)throw du=0,fu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var _i={};function vi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function yi(e,t,n,r){return new vi(e,t,n,r)}function bi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function xi(e,t){var n=e.alternate;return n===null?(n=yi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Si(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Ci(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)bi(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,_e.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case ae:return e=yi(31,n,t,a),e.elementType=ae,e.lanes=o,e;case y:return wi(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=yi(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case C:return e=yi(13,n,t,a),e.elementType=C,e.lanes=o,e;case ne:return e=yi(19,n,t,a),e.elementType=ne,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case te:s=10;break a;case ee:s=9;break a;case S:s=11;break a;case re:s=14;break a;case ie:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=yi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function wi(e,t,n,r){return e=yi(7,e,r,t),e.lanes=n,e}function Ti(e,t,n){return e=yi(6,e,null,t),e.lanes=n,e}function Ei(e){var t=yi(18,null,null,0);return t.stateNode=e,t}function Di(e,t,n){return t=yi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Oi=new WeakMap;function ki(e,t){if(typeof e==`object`&&e){var n=Oi.get(e);return n===void 0?(t={value:e,source:t,stack:je(t)},Oi.set(e,t),t):n}return{value:e,source:t,stack:je(t)}}var Ai=[],ji=0,Mi=null,Ni=0,Pi=[],Fi=0,Ii=null,Li=1,Ri=``;function zi(e,t){Ai[ji++]=Ni,Ai[ji++]=Mi,Mi=e,Ni=t}function Bi(e,t,n){Pi[Fi++]=Li,Pi[Fi++]=Ri,Pi[Fi++]=Ii,Ii=e;var r=Li;e=Ri;var i=32-Ye(r)-1;r&=~(1<<i),n+=1;var a=32-Ye(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Li=1<<32-Ye(t)+i|n<<i|r,Ri=a+e}else Li=1<<a|n<<i|r,Ri=e}function Vi(e){e.return!==null&&(zi(e,1),Bi(e,1,0))}function Hi(e){for(;e===Mi;)Mi=Ai[--ji],Ai[ji]=null,Ni=Ai[--ji],Ai[ji]=null;for(;e===Ii;)Ii=Pi[--Fi],Pi[Fi]=null,Ri=Pi[--Fi],Pi[Fi]=null,Li=Pi[--Fi],Pi[Fi]=null}function Ui(e,t){Pi[Fi++]=Li,Pi[Fi++]=Ri,Pi[Fi++]=Ii,Li=t.id,Ri=t.overflow,Ii=e}var Wi=null,O=null,k=!1,Gi=null,Ki=!1,A=Error(i(519));function qi(e){throw $i(ki(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),A}function Ji(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[vt]=e,t[yt]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Qt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),nn(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=fn),t=!0):t=!1,t||qi(e,!0)}function Yi(e){for(Wi=e.return;Wi;)switch(Wi.tag){case 5:case 31:case 13:Ki=!1;return;case 27:case 3:Ki=!0;return;default:Wi=Wi.return}}function Xi(e){if(e!==Wi)return!1;if(!k)return Yi(e),k=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Ud(e.type,e.memoizedProps)),n=!n),n&&O&&qi(e),Yi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));O=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));O=uf(e)}else t===27?(t=O,Zd(e.type)?(e=lf,lf=null,O=e):O=t):O=Wi?cf(e.stateNode.nextSibling):null;return!0}function Zi(){O=Wi=null,k=!1}function Qi(){var e=Gi;return e!==null&&(Zl===null?Zl=e:Zl.push.apply(Zl,e),Gi=null),e}function $i(e){Gi===null?Gi=[e]:Gi.push(e)}var ea=he(null),ta=null,na=null;function ra(e,t,n){E(ea,t._currentValue),t._currentValue=n}function ia(e){e._currentValue=ea.current,ge(ea)}function aa(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function oa(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),aa(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),aa(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function sa(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Pr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===be.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&oa(t,e,n,r),t.flags|=262144}function ca(e){for(e=e.firstContext;e!==null;){if(!Pr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function la(e){ta=e,na=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ua(e){return fa(ta,e)}function da(e,t){return ta===null&&la(e),fa(e,t)}function fa(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},na===null){if(e===null)throw Error(i(308));na=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else na=na.next=t;return n}var pa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},ma=t.unstable_scheduleCallback,ha=t.unstable_NormalPriority,ga={$$typeof:te,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function _a(){return{controller:new pa,data:new Map,refCount:0}}function va(e){e.refCount--,e.refCount===0&&ma(ha,function(){e.controller.abort()})}var ya=null,ba=0,xa=0,Sa=null;function Ca(e,t){if(ya===null){var n=ya=[];ba=0,xa=dd(),Sa={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return ba++,t.then(wa,wa),t}function wa(){if(--ba===0&&ya!==null){Sa!==null&&(Sa.status=`fulfilled`);var e=ya;ya=null,xa=0,Sa=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Ta(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Ea=w.S;w.S=function(e,t){eu=Le(),typeof t==`object`&&t&&typeof t.then==`function`&&Ca(e,t),Ea!==null&&Ea(e,t)};var Da=he(null);function Oa(){var e=Da.current;return e===null?q.pooledCache:e}function ka(e,t){t===null?E(Da,Da.current):E(Da,t.pool)}function Aa(){var e=Oa();return e===null?null:{parent:ga._currentValue,pool:e}}var ja=Error(i(460)),Ma=Error(i(474)),Na=Error(i(542)),Pa={then:function(){}};function Fa(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Ia(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(fn,fn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ba(e),e;default:if(typeof t.status==`string`)t.then(fn,fn);else{if(e=q,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ba(e),e}throw Ra=t,ja}}function La(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Ra=e,ja):e}}var Ra=null;function za(){if(Ra===null)throw Error(i(459));var e=Ra;return Ra=null,e}function Ba(e){if(e===ja||e===Na)throw Error(i(483))}var j=null,Va=0;function Ha(e){var t=Va;return Va+=1,j===null&&(j=[]),Ia(j,e,t)}function Ua(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Wa(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Ga(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=xi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Ti(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===ie&&La(i)===t.type)?(t=a(t,n.props),Ua(t,n),t.return=e,t):(t=Ci(n.type,n.key,n.props,null,e.mode,r),Ua(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Di(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=wi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Ti(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=Ci(t.type,t.key,t.props,null,e.mode,n),Ua(n,t),n.return=e,n;case v:return t=Di(t,e.mode,n),t.return=e,t;case ie:return t=La(t),f(e,t,n)}if(de(t)||ce(t))return t=wi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Ha(t),n);if(t.$$typeof===te)return f(e,da(e,t),n);Wa(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case ie:return n=La(n),p(e,t,n,r)}if(de(n)||ce(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Ha(n),r);if(n.$$typeof===te)return p(e,t,da(e,n),r);Wa(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ie:return r=La(r),m(e,t,n,r,i)}if(de(r)||ce(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Ha(r),i);if(r.$$typeof===te)return m(e,t,n,da(t,r),i);Wa(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),k&&zi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return k&&zi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),k&&zi(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),k&&zi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return k&&zi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),k&&zi(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===ie&&La(l)===r.type){n(e,r.sibling),c=a(r,o.props),Ua(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===y?(c=wi(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=Ci(o.type,o.key,o.props,null,e.mode,c),Ua(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=Di(o,e.mode,c),c.return=e,e=c}return s(e);case ie:return o=La(o),b(e,r,o,c)}if(de(o))return h(e,r,o,c);if(ce(o)){if(l=ce(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Ha(o),c);if(o.$$typeof===te)return b(e,r,da(e,o),c);Wa(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Ti(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{Va=0;var i=b(e,t,n,r);return j=null,i}catch(t){if(t===ja||t===Na)throw t;var a=yi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Ka=Ga(!0),qa=Ga(!1),Ja=!1;function Ya(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Xa(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Za(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Qa(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,K&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=gi(e),hi(e,null,n),t}return fi(e,r,t,n),gi(e)}function $a(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,dt(e,n)}}function eo(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var to=!1;function no(){if(to){var e=Sa;if(e!==null)throw e}}function ro(e,t,n,r){to=!1;var i=e.updateQueue;Ja=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Y&f)===f:(r&f)===f){f!==0&&f===xa&&(to=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:Ja=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Gl|=o,e.lanes=o,e.memoizedState=d}}function io(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function ao(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)io(n[e],t)}var oo=he(null),so=he(0);function co(e,t){e=Ul,E(so,e),E(oo,t),Ul=e|t.baseLanes}function lo(){E(so,Ul),E(oo,oo.current)}function uo(){Ul=so.current,ge(oo),ge(so)}var fo=he(null),po=null;function mo(e){var t=e.alternate;E(N,N.current&1),E(fo,e),po===null&&(t===null||oo.current!==null||t.memoizedState!==null)&&(po=e)}function ho(e){E(N,N.current),E(fo,e),po===null&&(po=e)}function go(e){e.tag===22?(E(N,N.current),E(fo,e),po===null&&(po=e)):_o(e)}function _o(){E(N,N.current),E(fo,fo.current)}function M(e){ge(fo),po===e&&(po=null),ge(N)}var N=he(0);function vo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var yo=0,P=null,F=null,I=null,bo=!1,xo=!1,So=!1,Co=0,wo=0,To=null,Eo=0;function Do(){throw Error(i(321))}function Oo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Pr(e[n],t[n]))return!1;return!0}function ko(e,t,n,r,i,a){return yo=a,P=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,w.H=e===null||e.memoizedState===null?Hs:V,So=!1,a=n(r,i),So=!1,xo&&(a=jo(t,n,r,i)),Ao(e),a}function Ao(e){w.H=Vs;var t=F!==null&&F.next!==null;if(yo=0,I=F=P=null,bo=!1,wo=0,To=null,t)throw Error(i(300));e===null||ac||(e=e.dependencies,e!==null&&ca(e)&&(ac=!0))}function jo(e,t,n,r){P=e;var a=0;do{if(xo&&(To=null),wo=0,xo=!1,25<=a)throw Error(i(301));if(a+=1,I=F=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}w.H=Us,o=t(n,r)}while(xo);return o}function Mo(){var e=w.H,t=e.useState()[0];return t=typeof t.then==`function`?Lo(t):t,e=e.useState()[0],(F===null?null:F.memoizedState)!==e&&(P.flags|=1024),t}function No(){var e=Co!==0;return Co=0,e}function Po(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Fo(e){if(bo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}bo=!1}yo=0,I=F=P=null,xo=!1,wo=Co=0,To=null}function L(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return I===null?P.memoizedState=I=e:I=I.next=e,I}function R(){if(F===null){var e=P.alternate;e=e===null?null:e.memoizedState}else e=F.next;var t=I===null?P.memoizedState:I.next;if(t!==null)I=t,F=e;else{if(e===null)throw P.alternate===null?Error(i(467)):Error(i(310));F=e,e={memoizedState:F.memoizedState,baseState:F.baseState,baseQueue:F.baseQueue,queue:F.queue,next:null},I===null?P.memoizedState=I=e:I=I.next=e}return I}function Io(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Lo(e){var t=wo;return wo+=1,To===null&&(To=[]),e=Ia(To,e,t),t=P,(I===null?t.memoizedState:I.next)===null&&(t=t.alternate,w.H=t===null||t.memoizedState===null?Hs:V),e}function Ro(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Lo(e);if(e.$$typeof===te)return ua(e)}throw Error(i(438,String(e)))}function zo(e){var t=null,n=P.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=P.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Io(),P.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=oe;return t.index++,n}function Bo(e,t){return typeof t==`function`?t(e):t}function Vo(e){return Ho(R(),F,e)}function Ho(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(yo&f)===f:(Y&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===xa&&(d=!0);else if((yo&p)===p){u=u.next,p===xa&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,P.lanes|=p,Gl|=p;f=u.action,So&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,P.lanes|=f,Gl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Pr(o,e.memoizedState)&&(ac=!0,d&&(n=Sa,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function z(e){var t=R(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Pr(o,t.memoizedState)||(ac=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Uo(e,t,n){var r=P,a=R(),o=k;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Pr((F||a).memoizedState,n);if(s&&(a.memoizedState=n,ac=!0),a=a.queue,ps(Ko.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||I!==null&&I.memoizedState.tag&1){if(r.flags|=2048,B(9,{destroy:void 0},Go.bind(null,r,a,n,t),null),q===null)throw Error(i(349));o||yo&127||Wo(r,t,n)}return n}function Wo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=P.updateQueue,t===null?(t=Io(),P.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Go(e,t,n,r){t.value=n,t.getSnapshot=r,qo(t)&&Jo(e)}function Ko(e,t,n){return n(function(){qo(t)&&Jo(e)})}function qo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Pr(e,n)}catch{return!0}}function Jo(e){var t=mi(e,2);t!==null&&hu(t,e,2)}function Yo(e){var t=L();if(typeof e==`function`){var n=e;if(e=n(),So){Je(!0);try{n()}finally{Je(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bo,lastRenderedState:e},t}function Xo(e,t,n,r){return e.baseState=n,Ho(e,F,typeof r==`function`?r:Bo)}function Zo(e,t,n,r,a){if(Rs(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};w.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Qo(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Qo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=w.T,o={};w.T=o;try{var s=n(i,r),c=w.S;c!==null&&c(o,s),$o(e,t,s)}catch(n){ts(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),w.T=a}}else try{a=n(i,r),$o(e,t,a)}catch(n){ts(e,t,n)}}function $o(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){es(e,t,n)},function(n){return ts(e,t,n)}):es(e,t,n)}function es(e,t,n){t.status=`fulfilled`,t.value=n,ns(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Qo(e,n)))}function ts(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,ns(t),t=t.next;while(t!==r)}e.action=null}function ns(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function rs(e,t){return t}function is(e,t){if(k){var n=q.formState;if(n!==null){a:{var r=P;if(k){if(O){b:{for(var i=O,a=Ki;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){O=cf(i.nextSibling),r=i.data===`F!`;break a}}qi(r)}r=!1}r&&(t=n[0])}}return n=L(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:rs,lastRenderedState:t},n.queue=r,n=Fs.bind(null,P,r),r.dispatch=n,r=Yo(!1),a=Ls.bind(null,P,!1,r.queue),r=L(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Zo.bind(null,P,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function as(e){return os(R(),F,e)}function os(e,t,n){if(t=Ho(e,t,rs)[0],e=Vo(Bo)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Lo(t)}catch(e){throw e===ja?Na:e}else r=t;t=R();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(P.flags|=2048,B(9,{destroy:void 0},ss.bind(null,i,n),null)),[r,a,e]}function ss(e,t){e.action=t}function cs(e){var t=R(),n=F;if(n!==null)return os(t,n,e);R(),t=t.memoizedState,n=R();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function B(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=P.updateQueue,t===null&&(t=Io(),P.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ls(){return R().memoizedState}function us(e,t,n,r){var i=L();P.flags|=e,i.memoizedState=B(1|t,{destroy:void 0},n,r===void 0?null:r)}function ds(e,t,n,r){var i=R();r=r===void 0?null:r;var a=i.memoizedState.inst;F!==null&&r!==null&&Oo(r,F.memoizedState.deps)?i.memoizedState=B(t,a,n,r):(P.flags|=e,i.memoizedState=B(1|t,a,n,r))}function fs(e,t){us(8390656,8,e,t)}function ps(e,t){ds(2048,8,e,t)}function ms(e){P.flags|=4;var t=P.updateQueue;if(t===null)t=Io(),P.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function hs(e){var t=R().memoizedState;return ms({ref:t,nextImpl:e}),function(){if(K&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function gs(e,t){return ds(4,2,e,t)}function _s(e,t){return ds(4,4,e,t)}function vs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ys(e,t,n){n=n==null?null:n.concat([e]),ds(4,4,vs.bind(null,t,e),n)}function bs(){}function xs(e,t){var n=R();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Oo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ss(e,t){var n=R();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Oo(t,r[1]))return r[0];if(r=e(),So){Je(!0);try{e()}finally{Je(!1)}}return n.memoizedState=[r,t],r}function Cs(e,t,n){return n===void 0||yo&1073741824&&!(Y&261930)?e.memoizedState=t:(e.memoizedState=n,e=mu(),P.lanes|=e,Gl|=e,n)}function ws(e,t,n,r){return Pr(n,t)?n:oo.current===null?!(yo&42)||yo&1073741824&&!(Y&261930)?(ac=!0,e.memoizedState=n):(e=mu(),P.lanes|=e,Gl|=e,t):(e=Cs(e,n,r),Pr(e,t)||(ac=!0),e)}function Ts(e,t,n,r,i){var a=T.p;T.p=a!==0&&8>a?a:8;var o=w.T,s={};w.T=s,Ls(e,!1,t,n);try{var c=i(),l=w.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Is(e,t,Ta(c,r),pu(e)):Is(e,t,r,pu(e))}catch(n){Is(e,t,{then:function(){},status:`rejected`,reason:n},pu())}finally{T.p=a,o!==null&&s.types!==null&&(o.types=s.types),w.T=o}}function Es(){}function Ds(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Os(e).queue;Ts(e,a,t,fe,n===null?Es:function(){return ks(e),n(r)})}function Os(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:fe,baseState:fe,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bo,lastRenderedState:fe},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bo,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ks(e){var t=Os(e);t.next===null&&(t=e.alternate.memoizedState),Is(e,t.next.queue,{},pu())}function As(){return ua(Qf)}function js(){return R().memoizedState}function Ms(){return R().memoizedState}function Ns(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=pu();e=Za(n);var r=Qa(t,e,n);r!==null&&(hu(r,t,n),$a(r,t,n)),t={cache:_a()},e.payload=t;return}t=t.return}}function Ps(e,t,n){var r=pu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Rs(e)?zs(t,n):(n=pi(e,t,n,r),n!==null&&(hu(n,e,r),Bs(n,t,r)))}function Fs(e,t,n){Is(e,t,n,pu())}function Is(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Rs(e))zs(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Pr(s,o))return fi(e,t,i,0),q===null&&di(),!1}catch{}if(n=pi(e,t,i,r),n!==null)return hu(n,e,r),Bs(n,t,r),!0}return!1}function Ls(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Rs(e)){if(t)throw Error(i(479))}else t=pi(e,n,r,2),t!==null&&hu(t,e,2)}function Rs(e){var t=e.alternate;return e===P||t!==null&&t===P}function zs(e,t){xo=bo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Bs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,dt(e,n)}}var Vs={readContext:ua,use:Ro,useCallback:Do,useContext:Do,useEffect:Do,useImperativeHandle:Do,useLayoutEffect:Do,useInsertionEffect:Do,useMemo:Do,useReducer:Do,useRef:Do,useState:Do,useDebugValue:Do,useDeferredValue:Do,useTransition:Do,useSyncExternalStore:Do,useId:Do,useHostTransitionStatus:Do,useFormState:Do,useActionState:Do,useOptimistic:Do,useMemoCache:Do,useCacheRefresh:Do};Vs.useEffectEvent=Do;var Hs={readContext:ua,use:Ro,useCallback:function(e,t){return L().memoizedState=[e,t===void 0?null:t],e},useContext:ua,useEffect:fs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),us(4194308,4,vs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return us(4194308,4,e,t)},useInsertionEffect:function(e,t){us(4,2,e,t)},useMemo:function(e,t){var n=L();t=t===void 0?null:t;var r=e();if(So){Je(!0);try{e()}finally{Je(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=L();if(n!==void 0){var i=n(t);if(So){Je(!0);try{n(t)}finally{Je(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Ps.bind(null,P,e),[r.memoizedState,e]},useRef:function(e){var t=L();return e={current:e},t.memoizedState=e},useState:function(e){e=Yo(e);var t=e.queue,n=Fs.bind(null,P,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:bs,useDeferredValue:function(e,t){return Cs(L(),e,t)},useTransition:function(){var e=Yo(!1);return e=Ts.bind(null,P,e.queue,!0,!1),L().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=P,a=L();if(k){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),q===null)throw Error(i(349));Y&127||Wo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,fs(Ko.bind(null,r,o,e),[e]),r.flags|=2048,B(9,{destroy:void 0},Go.bind(null,r,o,n,t),null),n},useId:function(){var e=L(),t=q.identifierPrefix;if(k){var n=Ri,r=Li;n=(r&~(1<<32-Ye(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Co++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Eo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:As,useFormState:is,useActionState:is,useOptimistic:function(e){var t=L();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Ls.bind(null,P,!0,n),n.dispatch=t,[e,t]},useMemoCache:zo,useCacheRefresh:function(){return L().memoizedState=Ns.bind(null,P)},useEffectEvent:function(e){var t=L(),n={impl:e};return t.memoizedState=n,function(){if(K&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},V={readContext:ua,use:Ro,useCallback:xs,useContext:ua,useEffect:ps,useImperativeHandle:ys,useInsertionEffect:gs,useLayoutEffect:_s,useMemo:Ss,useReducer:Vo,useRef:ls,useState:function(){return Vo(Bo)},useDebugValue:bs,useDeferredValue:function(e,t){return ws(R(),F.memoizedState,e,t)},useTransition:function(){var e=Vo(Bo)[0],t=R().memoizedState;return[typeof e==`boolean`?e:Lo(e),t]},useSyncExternalStore:Uo,useId:js,useHostTransitionStatus:As,useFormState:as,useActionState:as,useOptimistic:function(e,t){return Xo(R(),F,e,t)},useMemoCache:zo,useCacheRefresh:Ms};V.useEffectEvent=hs;var Us={readContext:ua,use:Ro,useCallback:xs,useContext:ua,useEffect:ps,useImperativeHandle:ys,useInsertionEffect:gs,useLayoutEffect:_s,useMemo:Ss,useReducer:z,useRef:ls,useState:function(){return z(Bo)},useDebugValue:bs,useDeferredValue:function(e,t){var n=R();return F===null?Cs(n,e,t):ws(n,F.memoizedState,e,t)},useTransition:function(){var e=z(Bo)[0],t=R().memoizedState;return[typeof e==`boolean`?e:Lo(e),t]},useSyncExternalStore:Uo,useId:js,useHostTransitionStatus:As,useFormState:cs,useActionState:cs,useOptimistic:function(e,t){var n=R();return F===null?(n.baseState=e,[e,n.queue.dispatch]):Xo(n,F,e,t)},useMemoCache:zo,useCacheRefresh:Ms};Us.useEffectEvent=hs;function Ws(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Gs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Za(r);i.payload=t,n!=null&&(i.callback=n),t=Qa(e,i,r),t!==null&&(hu(t,e,r),$a(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Za(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Qa(e,i,r),t!==null&&(hu(t,e,r),$a(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pu(),r=Za(n);r.tag=2,t!=null&&(r.callback=t),t=Qa(e,r,n),t!==null&&(hu(t,e,n),$a(t,e,n))}};function Ks(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Fr(n,r)||!Fr(i,a):!0}function qs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Gs.enqueueReplaceState(t,t.state,null)}function Js(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Ys(e){si(e)}function Xs(e){console.error(e)}function Zs(e){si(e)}function Qs(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function $s(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function ec(e,t,n){return n=Za(n),n.tag=3,n.payload={element:null},n.callback=function(){Qs(e,t)},n}function tc(e){return e=Za(e),e.tag=3,e}function nc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){$s(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){$s(t,n,r),typeof i!=`function`&&(ru===null?ru=new Set([this]):ru.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function rc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&sa(t,n,a,!0),n=fo.current,n!==null){switch(n.tag){case 31:case 13:return po===null?Du():n.alternate===null&&Wl===0&&(Wl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Pa?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,a)),!1;case 22:return n.flags|=65536,r===Pa?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,a)),!1}throw Error(i(435,n.tag))}return Gu(e,r,a),Du(),!1}if(k)return t=fo.current,t===null?(r!==A&&(t=Error(i(423),{cause:r}),$i(ki(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=ki(r,n),a=ec(e.stateNode,r,a),eo(e,a),Wl!==4&&(Wl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==A&&(e=Error(i(422),{cause:r}),$i(ki(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=ki(o,n),Xl===null?Xl=[o]:Xl.push(o),Wl!==4&&(Wl=2),t===null)return!0;r=ki(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=ec(n.stateNode,r,e),eo(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(ru===null||!ru.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=tc(a),nc(a,e,n,r),eo(n,a),!1}n=n.return}while(n!==null);return!1}var ic=Error(i(461)),ac=!1;function oc(e,t,n,r){t.child=e===null?qa(t,null,n,r):Ka(t,e.child,n,r)}function sc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return la(t),r=ko(e,t,n,o,a,i),s=No(),e!==null&&!ac?(Po(e,t,i),Ac(e,t,i)):(k&&s&&Vi(t),t.flags|=1,oc(e,t,r,i),t.child)}function cc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!bi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,H(e,t,a,r,i)):(e=Ci(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!jc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Fr:n,n(o,r)&&e.ref===t.ref)return Ac(e,t,i)}return t.flags|=1,e=xi(a,r),e.ref=t.ref,e.return=t,t.child=e}function H(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Fr(a,r)&&e.ref===t.ref)if(ac=!1,t.pendingProps=r=a,jc(e,i))e.flags&131072&&(ac=!0);else return t.lanes=e.lanes,Ac(e,t,i)}return gc(e,t,n,r,i)}function lc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return dc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&ka(t,a===null?null:a.cachePool),a===null?lo():co(t,a),go(t);else return r=t.lanes=536870912,dc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&ka(t,null),lo(),_o(t)):(ka(t,a.cachePool),co(t,a),_o(t),t.memoizedState=null);return oc(e,t,i,n),t.child}function uc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function dc(e,t,n,r,i){var a=Oa();return a=a===null?null:{parent:ga._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&ka(t,null),lo(),go(t),e!==null&&sa(e,t,r,!0),t.childLanes=i,null}function fc(e,t){return t=Tc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function pc(e,t,n){return Ka(t,e.child,null,n),e=fc(t,t.pendingProps),e.flags|=2,M(t),t.memoizedState=null,e}function mc(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(k){if(r.mode===`hidden`)return e=fc(t,r),t.lanes=536870912,uc(null,e);if(ho(t),(e=O)?(e=rf(e,Ki),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ii===null?null:{id:Li,overflow:Ri},retryLane:536870912,hydrationErrors:null},n=Ei(e),n.return=t,t.child=n,Wi=t,O=null)):e=null,e===null)throw qi(t);return t.lanes=536870912,null}return fc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(ho(t),a)if(t.flags&256)t.flags&=-257,t=pc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if(ac||sa(e,t,n,!1),a=(n&e.childLanes)!==0,ac||a){if(r=q,r!==null&&(s=ft(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,mi(e,s),hu(r,e,s),ic;Du(),t=pc(e,t,n)}else e=o.treeContext,O=cf(s.nextSibling),Wi=t,k=!0,Gi=null,Ki=!1,e!==null&&Ui(t,e),t=fc(t,r),t.flags|=4096;return t}return e=xi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function hc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function gc(e,t,n,r,i){return la(t),n=ko(e,t,n,r,void 0,i),r=No(),e!==null&&!ac?(Po(e,t,i),Ac(e,t,i)):(k&&r&&Vi(t),t.flags|=1,oc(e,t,n,i),t.child)}function _c(e,t,n,r,i,a){return la(t),t.updateQueue=null,n=jo(t,r,n,i),Ao(e),r=No(),e!==null&&!ac?(Po(e,t,a),Ac(e,t,a)):(k&&r&&Vi(t),t.flags|=1,oc(e,t,n,a),t.child)}function vc(e,t,n,r,i){if(la(t),t.stateNode===null){var a=_i,o=n.contextType;typeof o==`object`&&o&&(a=ua(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Gs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Ya(t),o=n.contextType,a.context=typeof o==`object`&&o?ua(o):_i,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Ws(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Gs.enqueueReplaceState(a,a.state,null),ro(t,r,a,i),no(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Js(n,s);a.props=c;var l=a.context,u=n.contextType;o=_i,typeof u==`object`&&u&&(o=ua(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&qs(t,a,r,o),Ja=!1;var f=t.memoizedState;a.state=f,ro(t,r,a,i),no(),l=t.memoizedState,s||f!==l||Ja?(typeof d==`function`&&(Ws(t,n,d,r),l=t.memoizedState),(c=Ja||Ks(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Xa(e,t),o=t.memoizedProps,u=Js(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=_i,typeof l==`object`&&l&&(c=ua(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&qs(t,a,r,c),Ja=!1,f=t.memoizedState,a.state=f,ro(t,r,a,i),no();var p=t.memoizedState;o!==d||f!==p||Ja||e!==null&&e.dependencies!==null&&ca(e.dependencies)?(typeof s==`function`&&(Ws(t,n,s,r),p=t.memoizedState),(u=Ja||Ks(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&ca(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,hc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Ka(t,e.child,null,i),t.child=Ka(t,null,n,i)):oc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Ac(e,t,i),e}function yc(e,t,n,r){return Zi(),t.flags|=256,oc(e,t,n,r),t.child}var bc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function xc(e){return{baseLanes:e,cachePool:Aa()}}function Sc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Jl),e}function Cc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(N.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(k){if(a?mo(t):_o(t),(e=O)?(e=rf(e,Ki),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ii===null?null:{id:Li,overflow:Ri},retryLane:536870912,hydrationErrors:null},n=Ei(e),n.return=t,t.child=n,Wi=t,O=null)):e=null,e===null)throw qi(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(_o(t),a=t.mode,c=Tc({mode:`hidden`,children:c},a),r=wi(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=xc(n),r.childLanes=Sc(e,s,n),t.memoizedState=bc,uc(null,r)):(mo(t),wc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(mo(t),t.flags&=-257,t=Ec(e,t,n)):t.memoizedState===null?(_o(t),c=r.fallback,a=t.mode,r=Tc({mode:`visible`,children:r.children},a),c=wi(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Ka(t,e.child,null,n),r=t.child,r.memoizedState=xc(n),r.childLanes=Sc(e,s,n),t.memoizedState=bc,t=uc(null,r)):(_o(t),t.child=e.child,t.flags|=128,t=null);else if(mo(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,$i({value:r,source:null,stack:null}),t=Ec(e,t,n)}else if(ac||sa(e,t,n,!1),s=(n&e.childLanes)!==0,ac||s){if(s=q,s!==null&&(r=ft(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,mi(e,r),hu(s,e,r),ic;af(c)||Du(),t=Ec(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,O=cf(c.nextSibling),Wi=t,k=!0,Gi=null,Ki=!1,e!==null&&Ui(t,e),t=wc(t,r.children),t.flags|=4096);return t}return a?(_o(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=xi(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=wi(c,a,n,null),c.flags|=2):c=xi(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,uc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=xc(n):(a=c.cachePool,a===null?a=Aa():(l=ga._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=Sc(e,s,n),t.memoizedState=bc,uc(e.child,r)):(mo(t),n=e.child,e=n.sibling,n=xi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function wc(e,t){return t=Tc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Tc(e,t){return e=yi(22,e,null,t),e.lanes=0,e}function Ec(e,t,n){return Ka(t,e.child,null,n),e=wc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Dc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),aa(e.return,t,n)}function Oc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function kc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=N.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,E(N,o),oc(e,t,r,n),r=k?Ni:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Dc(e,n,t);else if(e.tag===19)Dc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&vo(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Oc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&vo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Oc(t,!0,n,null,a,r);break;case`together`:Oc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Ac(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Gl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(sa(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=xi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=xi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function jc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&ca(e))):!0}function Mc(e,t,n){switch(t.tag){case 3:xe(t,t.stateNode.containerInfo),ra(t,ga,e.memoizedState.cache),Zi();break;case 27:case 5:Ce(t);break;case 4:xe(t,t.stateNode.containerInfo);break;case 10:ra(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,ho(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(mo(t),e=Ac(e,t,n),e===null?null:e.sibling):Cc(e,t,n):(mo(t),t.flags|=128,null);mo(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(sa(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return kc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),E(N,N.current),r)break;return null;case 22:return t.lanes=0,lc(e,t,n,t.pendingProps);case 24:ra(t,ga,e.memoizedState.cache)}return Ac(e,t,n)}function Nc(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)ac=!0;else{if(!jc(e,n)&&!(t.flags&128))return ac=!1,Mc(e,t,n);ac=!!(e.flags&131072)}else ac=!1,k&&t.flags&1048576&&Bi(t,Ni,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=La(t.elementType),t.type=e,typeof e==`function`)bi(e)?(r=Js(e,r),t.tag=1,t=vc(null,t,e,r,n)):(t.tag=0,t=gc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===S){t.tag=11,t=sc(null,t,e,r,n);break a}else if(a===re){t.tag=14,t=cc(null,t,e,r,n);break a}}throw t=ue(e)||e,Error(i(306,t,``))}}return t;case 0:return gc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Js(r,t.pendingProps),vc(e,t,r,a,n);case 3:a:{if(xe(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Xa(e,t),ro(t,r,null,n);var s=t.memoizedState;if(r=s.cache,ra(t,ga,r),r!==o.cache&&oa(t,[ga],n,!0),no(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=yc(e,t,r,n);break a}else if(r!==a){a=ki(Error(i(424)),t),$i(a),t=yc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(O=cf(e.firstChild),Wi=t,k=!0,Gi=null,Ki=!0,n=qa(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Zi(),r===a){t=Ac(e,t,n);break a}oc(e,t,r,n)}t=t.child}return t;case 26:return hc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:k||(n=t.type,e=t.pendingProps,r=Bd(ye.current).createElement(n),r[vt]=t,r[yt]=e,Pd(r,n,e),jt(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Ce(t),e===null&&k&&(r=t.stateNode=ff(t.type,t.pendingProps,ye.current),Wi=t,Ki=!0,a=O,Zd(t.type)?(lf=a,O=cf(r.firstChild)):O=a),oc(e,t,t.pendingProps.children,n),hc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&k&&((a=r=O)&&(r=tf(r,t.type,t.pendingProps,Ki),r===null?a=!1:(t.stateNode=r,Wi=t,O=cf(r.firstChild),Ki=!1,a=!0)),a||qi(t)),Ce(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=ko(e,t,Mo,null,null,n),Qf._currentValue=a),hc(e,t),oc(e,t,r,n),t.child;case 6:return e===null&&k&&((e=n=O)&&(n=nf(n,t.pendingProps,Ki),n===null?e=!1:(t.stateNode=n,Wi=t,O=null,e=!0)),e||qi(t)),null;case 13:return Cc(e,t,n);case 4:return xe(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ka(t,null,r,n):oc(e,t,r,n),t.child;case 11:return sc(e,t,t.type,t.pendingProps,n);case 7:return oc(e,t,t.pendingProps,n),t.child;case 8:return oc(e,t,t.pendingProps.children,n),t.child;case 12:return oc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,ra(t,t.type,r.value),oc(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,la(t),a=ua(a),r=r(a),t.flags|=1,oc(e,t,r,n),t.child;case 14:return cc(e,t,t.type,t.pendingProps,n);case 15:return H(e,t,t.type,t.pendingProps,n);case 19:return kc(e,t,n);case 31:return mc(e,t,n);case 22:return lc(e,t,n,t.pendingProps);case 24:return la(t),r=ua(ga),e===null?(a=Oa(),a===null&&(a=q,o=_a(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Ya(t),ra(t,ga,a)):((e.lanes&n)!==0&&(Xa(e,t),ro(t,null,null,n),no()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,ra(t,ga,r),r!==a.cache&&oa(t,[ga],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),ra(t,ga,r))),oc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Pc(e){e.flags|=4}function Fc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(wu())e.flags|=8192;else throw Ra=Pa,Ma}else e.flags&=-16777217}function Ic(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t))if(wu())e.flags|=8192;else throw Ra=Pa,Ma}function Lc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:ot(),e.lanes|=t,Yl|=t)}function Rc(e,t){if(!k)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function U(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function zc(e,t,n){var r=t.pendingProps;switch(Hi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return U(t),null;case 1:return U(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),ia(ga),Se(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Xi(t)?Pc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Qi())),U(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Pc(t),o===null?(U(t),Fc(t,a,null,r,n)):(U(t),Ic(t,o))):o?o===e.memoizedState?(U(t),t.flags&=-16777217):(Pc(t),U(t),Ic(t,o)):(e=e.memoizedProps,e!==r&&Pc(t),U(t),Fc(t,a,e,r,n)),null;case 27:if(we(t),n=ye.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Pc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return U(t),null}e=_e.current,Xi(t)?Ji(t,e):(e=ff(a,r,n),t.stateNode=e,Pc(t))}return U(t),null;case 5:if(we(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Pc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return U(t),null}if(o=_e.current,Xi(t))Ji(t,o);else{var s=Bd(ye.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[vt]=t,o[yt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Pc(t)}}return U(t),Fc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Pc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=ye.current,Xi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Wi,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[vt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||qi(t,!0)}else e=Bd(e).createTextNode(r),e[vt]=t,t.stateNode=e}return U(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Xi(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[vt]=t}else Zi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;U(t),e=!1}else n=Qi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(M(t),t):(M(t),null);if(t.flags&128)throw Error(i(558))}return U(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Xi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[vt]=t}else Zi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;U(t),a=!1}else a=Qi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(M(t),t):(M(t),null)}return M(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Lc(t,t.updateQueue),U(t),null);case 4:return Se(),e===null&&Sd(t.stateNode.containerInfo),U(t),null;case 10:return ia(t.type),U(t),null;case 19:if(ge(N),r=t.memoizedState,r===null)return U(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)Rc(r,!1);else{if(Wl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=vo(e),o!==null){for(t.flags|=128,Rc(r,!1),e=o.updateQueue,t.updateQueue=e,Lc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Si(n,e),n=n.sibling;return E(N,N.current&1|2),k&&zi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Le()>tu&&(t.flags|=128,a=!0,Rc(r,!1),t.lanes=4194304)}else{if(!a)if(e=vo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Lc(t,e),Rc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!k)return U(t),null}else 2*Le()-r.renderingStartTime>tu&&n!==536870912&&(t.flags|=128,a=!0,Rc(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(U(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Le(),e.sibling=null,n=N.current,E(N,a?n&1|2:n&1),k&&zi(t,r.treeForkCount),e);case 22:case 23:return M(t),uo(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(U(t),t.subtreeFlags&6&&(t.flags|=8192)):U(t),n=t.updateQueue,n!==null&&Lc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&ge(Da),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ia(ga),U(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Bc(e,t){switch(Hi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ia(ga),Se(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return we(t),null;case 31:if(t.memoizedState!==null){if(M(t),t.alternate===null)throw Error(i(340));Zi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(M(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Zi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ge(N),null;case 4:return Se(),null;case 10:return ia(t.type),null;case 22:case 23:return M(t),uo(),e!==null&&ge(Da),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ia(ga),null;case 25:return null;default:return null}}function Vc(e,t){switch(Hi(t),t.tag){case 3:ia(ga),Se();break;case 26:case 27:case 5:we(t);break;case 4:Se();break;case 31:t.memoizedState!==null&&M(t);break;case 13:M(t);break;case 19:ge(N);break;case 10:ia(t.type);break;case 22:case 23:M(t),uo(),e!==null&&ge(Da);break;case 24:ia(ga)}}function Hc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Uc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Wc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{ao(t,n)}catch(t){Z(e,e.return,t)}}}function Gc(e,t,n){n.props=Js(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Kc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function qc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}function Jc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Yc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[yt]=t}catch(t){Z(e,e.return,t)}}function Xc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Zc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Xc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Qc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=fn));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Qc(e,t,n),e=e.sibling;e!==null;)Qc(e,t,n),e=e.sibling}function $c(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for($c(e,t,n),e=e.sibling;e!==null;)$c(e,t,n),e=e.sibling}function el(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[vt]=e,t[yt]=n}catch(t){Z(e,e.return,t)}}var tl=!1,nl=!1,rl=!1,il=typeof WeakSet==`function`?WeakSet:Set,al=null;function ol(e,t){if(e=e.containerInfo,Rd=sp,e=Rr(e),zr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,al=t;al!==null;)if(t=al,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,al=e;else for(;al!==null;){switch(t=al,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Js(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,al=e;break}al=t.return}}function sl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:xl(e,n),r&4&&Hc(5,n);break;case 1:if(xl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Js(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}r&64&&Wc(n),r&512&&Kc(n,n.return);break;case 3:if(xl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{ao(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&el(n);case 26:case 5:xl(e,n),t===null&&r&4&&Jc(n),r&512&&Kc(n,n.return);break;case 12:xl(e,n);break;case 31:xl(e,n),r&4&&fl(e,n);break;case 13:xl(e,n),r&4&&pl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||tl,!r){t=t!==null&&t.memoizedState!==null||nl,i=tl;var a=nl;tl=r,(nl=t)&&!a?Cl(e,n,(n.subtreeFlags&8772)!=0):xl(e,n),tl=i,nl=a}break;case 30:break;default:xl(e,n)}}function cl(e){var t=e.alternate;t!==null&&(e.alternate=null,cl(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Et(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var W=null,ll=!1;function ul(e,t,n){for(n=n.child;n!==null;)dl(e,t,n),n=n.sibling}function dl(e,t,n){if(qe&&typeof qe.onCommitFiberUnmount==`function`)try{qe.onCommitFiberUnmount(Ke,n)}catch{}switch(n.tag){case 26:nl||qc(n,t),ul(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:nl||qc(n,t);var r=W,i=ll;Zd(n.type)&&(W=n.stateNode,ll=!1),ul(e,t,n),pf(n.stateNode),W=r,ll=i;break;case 5:nl||qc(n,t);case 6:if(r=W,i=ll,W=null,ul(e,t,n),W=r,ll=i,W!==null)if(ll)try{(W.nodeType===9?W.body:W.nodeName===`HTML`?W.ownerDocument.body:W).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{W.removeChild(n.stateNode)}catch(e){Z(n,t,e)}break;case 18:W!==null&&(ll?(e=W,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(W,n.stateNode));break;case 4:r=W,i=ll,W=n.stateNode.containerInfo,ll=!0,ul(e,t,n),W=r,ll=i;break;case 0:case 11:case 14:case 15:Uc(2,n,t),nl||Uc(4,n,t),ul(e,t,n);break;case 1:nl||(qc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Gc(n,t,r)),ul(e,t,n);break;case 21:ul(e,t,n);break;case 22:nl=(r=nl)||n.memoizedState!==null,ul(e,t,n),nl=r;break;default:ul(e,t,n)}}function fl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Z(t,t.return,e)}}}function pl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Z(t,t.return,e)}}function ml(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new il),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new il),t;default:throw Error(i(435,e.tag))}}function hl(e,t){var n=ml(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function gl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){W=c.stateNode,ll=!1;break a}break;case 5:W=c.stateNode,ll=!1;break a;case 3:case 4:W=c.stateNode.containerInfo,ll=!0;break a}c=c.return}if(W===null)throw Error(i(160));dl(o,s,a),W=null,ll=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)vl(t,e),t=t.sibling}var _l=null;function vl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:gl(t,e),yl(e),r&4&&(Uc(3,e,e.return),Hc(3,e),Uc(5,e,e.return));break;case 1:gl(t,e),yl(e),r&512&&(nl||n===null||qc(n,n.return)),r&64&&tl&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=_l;if(gl(t,e),yl(e),r&512&&(nl||n===null||qc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[Tt]||o[vt]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[vt]=e,jt(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[vt]=e,jt(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode);else e.stateNode=If(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&Yc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:gl(t,e),yl(e),r&512&&(nl||n===null||qc(n,n.return)),n!==null&&r&4&&Yc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(gl(t,e),yl(e),r&512&&(nl||n===null||qc(n,n.return)),e.flags&32){a=e.stateNode;try{rn(a,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Yc(e,a,n===null?a:n.memoizedProps)),r&1024&&(rl=!0);break;case 6:if(gl(t,e),yl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Bf=null,a=_l,_l=gf(t.containerInfo),gl(t,e),_l=a,yl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Z(e,e.return,t)}rl&&(rl=!1,bl(e));break;case 4:r=_l,_l=gf(e.stateNode.containerInfo),gl(t,e),yl(e),_l=r;break;case 12:gl(t,e),yl(e);break;case 31:gl(t,e),yl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,hl(e,r)));break;case 13:gl(t,e),yl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&($l=Le()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,hl(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=tl,d=nl;if(tl=u||a,nl=d||l,gl(t,e),nl=d,tl=u,yl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||tl||nl||Sl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,hl(e,n))));break;case 19:gl(t,e),yl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,hl(e,r)));break;case 30:break;case 21:break;default:gl(t,e),yl(e)}}function yl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Xc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;$c(e,Zc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(rn(o,``),n.flags&=-33),$c(e,Zc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;Qc(e,Zc(e),s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function bl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;bl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function xl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)sl(e,t.alternate,t),t=t.sibling}function Sl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Uc(4,t,t.return),Sl(t);break;case 1:qc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Gc(t,t.return,n),Sl(t);break;case 27:pf(t.stateNode);case 26:case 5:qc(t,t.return),Sl(t);break;case 22:t.memoizedState===null&&Sl(t);break;case 30:Sl(t);break;default:Sl(t)}e=e.sibling}}function Cl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:Cl(i,a,n),Hc(4,a);break;case 1:if(Cl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)io(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&Wc(a),Kc(a,a.return);break;case 27:el(a);case 26:case 5:Cl(i,a,n),n&&r===null&&o&4&&Jc(a),Kc(a,a.return);break;case 12:Cl(i,a,n);break;case 31:Cl(i,a,n),n&&o&4&&fl(i,a);break;case 13:Cl(i,a,n),n&&o&4&&pl(i,a);break;case 22:a.memoizedState===null&&Cl(i,a,n),Kc(a,a.return);break;case 30:break;default:Cl(i,a,n)}t=t.sibling}}function wl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&va(n))}function Tl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&va(e))}function G(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)El(e,t,n,r),t=t.sibling}function El(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:G(e,t,n,r),i&2048&&Hc(9,t);break;case 1:G(e,t,n,r);break;case 3:G(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&va(e)));break;case 12:if(i&2048){G(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else G(e,t,n,r);break;case 31:G(e,t,n,r);break;case 13:G(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?G(e,t,n,r):(a._visibility|=2,Dl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?G(e,t,n,r):Ol(e,t),i&2048&&wl(o,t);break;case 24:G(e,t,n,r),i&2048&&Tl(t.alternate,t);break;default:G(e,t,n,r)}}function Dl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Dl(a,o,s,c,i),Hc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Dl(a,o,s,c,i)):u._visibility&2?Dl(a,o,s,c,i):Ol(a,o),i&&l&2048&&wl(o.alternate,o);break;case 24:Dl(a,o,s,c,i),i&&l&2048&&Tl(o.alternate,o);break;default:Dl(a,o,s,c,i)}t=t.sibling}}function Ol(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Ol(n,r),i&2048&&wl(r.alternate,r);break;case 24:Ol(n,r),i&2048&&Tl(r.alternate,r);break;default:Ol(n,r)}t=t.sibling}}var kl=8192;function Al(e,t,n){if(e.subtreeFlags&kl)for(e=e.child;e!==null;)jl(e,t,n),e=e.sibling}function jl(e,t,n){switch(e.tag){case 26:Al(e,t,n),e.flags&kl&&e.memoizedState!==null&&Gf(n,_l,e.memoizedState,e.memoizedProps);break;case 5:Al(e,t,n);break;case 3:case 4:var r=_l;_l=gf(e.stateNode.containerInfo),Al(e,t,n),_l=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=kl,kl=16777216,Al(e,t,n),kl=r):Al(e,t,n));break;default:Al(e,t,n)}}function Ml(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Nl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];al=r,Il(r,e)}Ml(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Pl(e),e=e.sibling}function Pl(e){switch(e.tag){case 0:case 11:case 15:Nl(e),e.flags&2048&&Uc(9,e,e.return);break;case 3:Nl(e);break;case 12:Nl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Fl(e)):Nl(e);break;default:Nl(e)}}function Fl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];al=r,Il(r,e)}Ml(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Uc(8,t,t.return),Fl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Fl(t));break;default:Fl(t)}e=e.sibling}}function Il(e,t){for(;al!==null;){var n=al;switch(n.tag){case 0:case 11:case 15:Uc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:va(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,al=r;else a:for(n=e;al!==null;){r=al;var i=r.sibling,a=r.return;if(cl(r),r===n){al=null;break a}if(i!==null){i.return=a,al=i;break a}al=a}}}var Ll={getCacheForType:function(e){var t=ua(ga),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return ua(ga).controller.signal}},Rl=typeof WeakMap==`function`?WeakMap:Map,K=0,q=null,J=null,Y=0,X=0,zl=null,Bl=!1,Vl=!1,Hl=!1,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=null,Zl=null,Ql=!1,$l=0,eu=0,tu=1/0,nu=null,ru=null,iu=0,au=null,ou=null,su=0,cu=0,lu=null,uu=null,du=0,fu=null;function pu(){return K&2&&Y!==0?Y&-Y:w.T===null?ht():dd()}function mu(){if(Jl===0)if(!(Y&536870912)||k){var e=et;et<<=1,!(et&3932160)&&(et=262144),Jl=e}else Jl=536870912;return e=fo.current,e!==null&&(e.flags|=32),Jl}function hu(e,t,n){(e===q&&(X===2||X===9)||e.cancelPendingCommit!==null)&&(Su(e,0),yu(e,Y,Jl,!1)),ct(e,n),(!(K&2)||e!==q)&&(e===q&&(!(K&2)&&(Kl|=n),Wl===4&&yu(e,Y,Jl,!1)),rd(e))}function gu(e,t,n){if(K&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||it(e,t),a=r?Au(e,t):Ou(e,t,!0),o=r;do{if(a===0){Vl&&!r&&yu(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!vu(n)){a=Ou(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Xl;var l=c.current.memoizedState.isDehydrated;if(l&&(Su(c,s).flags|=256),s=Ou(c,s,!1),s!==2){if(Hl&&!l){c.errorRecoveryDisabledLanes|=o,Kl|=o,a=4;break a}o=Zl,Zl=a,o!==null&&(Zl===null?Zl=o:Zl.push.apply(Zl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Su(e,0),yu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:yu(r,t,Jl,!Bl);break a;case 2:Zl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=$l+300-Le(),10<a)){if(yu(r,t,Jl,!Bl),rt(r,0,!0)!==0)break a;su=t,r.timeoutHandle=Kd(_u.bind(null,r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,o,`Throttled`,-0,0),a);break a}_u(r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,o,null,-0,0)}}break}while(1);rd(e)}function _u(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:fn},jl(t,a,d);var m=(a&62914560)===a?$l-Le():(a&4194048)===a?eu-Le():0;if(m=qf(d,m),m!==null){su=a,e.cancelPendingCommit=m(Lu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),yu(e,a,o,!l);return}}Lu(e,t,a,n,r,i,o,s,c)}function vu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Pr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yu(e,t,n,r){t&=~ql,t&=~Kl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Ye(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&ut(e,n,t)}function bu(){return K&6?!0:(id(0,!1),!1)}function xu(){if(J!==null){if(X===0)var e=J.return;else e=J,na=ta=null,Fo(e),j=null,Va=0,e=J;for(;e!==null;)Vc(e.alternate,e),e=e.return;J=null}}function Su(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),su=0,xu(),q=e,J=n=xi(e.current,null),Y=t,X=0,zl=null,Bl=!1,Vl=it(e,t),Hl=!1,Yl=Jl=ql=Kl=Gl=Wl=0,Zl=Xl=null,Ql=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Ye(r),a=1<<i;t|=e[i],r&=~a}return Ul=t,di(),n}function Cu(e,t){P=null,w.H=Vs,t===ja||t===Na?(t=za(),X=3):t===Ma?(t=za(),X=4):X=t===ic?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,zl=t,J===null&&(Wl=1,Qs(e,ki(t,e.current)))}function wu(){var e=fo.current;return e===null?!0:(Y&4194048)===Y?po===null:(Y&62914560)===Y||Y&536870912?e===po:!1}function Tu(){var e=w.H;return w.H=Vs,e===null?Vs:e}function Eu(){var e=w.A;return w.A=Ll,e}function Du(){Wl=4,Bl||(Y&4194048)!==Y&&fo.current!==null||(Vl=!0),!(Gl&134217727)&&!(Kl&134217727)||q===null||yu(q,Y,Jl,!1)}function Ou(e,t,n){var r=K;K|=2;var i=Tu(),a=Eu();(q!==e||Y!==t)&&(nu=null,Su(e,t)),t=!1;var o=Wl;a:do try{if(X!==0&&J!==null){var s=J,c=zl;switch(X){case 8:xu(),o=6;break a;case 3:case 2:case 9:case 6:fo.current===null&&(t=!0);var l=X;if(X=0,zl=null,Pu(e,s,c,l),n&&Vl){o=0;break a}break;default:l=X,X=0,zl=null,Pu(e,s,c,l)}}ku(),o=Wl;break}catch(t){Cu(e,t)}while(1);return t&&e.shellSuspendCounter++,na=ta=null,K=r,w.H=i,w.A=a,J===null&&(q=null,Y=0,di()),o}function ku(){for(;J!==null;)Mu(J)}function Au(e,t){var n=K;K|=2;var r=Tu(),a=Eu();q!==e||Y!==t?(nu=null,tu=Le()+500,Su(e,t)):Vl=it(e,t);a:do try{if(X!==0&&J!==null){t=J;var o=zl;b:switch(X){case 1:X=0,zl=null,Pu(e,t,o,1);break;case 2:case 9:if(Fa(o)){X=0,zl=null,Nu(t);break}t=function(){X!==2&&X!==9||q!==e||(X=7),rd(e)},o.then(t,t);break a;case 3:X=7;break a;case 4:X=5;break a;case 7:Fa(o)?(X=0,zl=null,Nu(t)):(X=0,zl=null,Pu(e,t,o,7));break;case 5:var s=null;switch(J.tag){case 26:s=J.memoizedState;case 5:case 27:var c=J;if(s?Wf(s):c.stateNode.complete){X=0,zl=null;var l=c.sibling;if(l!==null)J=l;else{var u=c.return;u===null?J=null:(J=u,Fu(u))}break b}}X=0,zl=null,Pu(e,t,o,5);break;case 6:X=0,zl=null,Pu(e,t,o,6);break;case 8:xu(),Wl=6;break a;default:throw Error(i(462))}}ju();break}catch(t){Cu(e,t)}while(1);return na=ta=null,w.H=r,w.A=a,K=n,J===null?(q=null,Y=0,di(),Wl):0}function ju(){for(;J!==null&&!Fe();)Mu(J)}function Mu(e){var t=Nc(e.alternate,e,Ul);e.memoizedProps=e.pendingProps,t===null?Fu(e):J=t}function Nu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=_c(n,t,t.pendingProps,t.type,void 0,Y);break;case 11:t=_c(n,t,t.pendingProps,t.type.render,t.ref,Y);break;case 5:Fo(t);default:Vc(n,t),t=J=Si(t,Ul),t=Nc(n,t,Ul)}e.memoizedProps=e.pendingProps,t===null?Fu(e):J=t}function Pu(e,t,n,r){na=ta=null,Fo(t),j=null,Va=0;var i=t.return;try{if(rc(e,i,t,n,Y)){Wl=1,Qs(e,ki(n,e.current)),J=null;return}}catch(t){if(i!==null)throw J=i,t;Wl=1,Qs(e,ki(n,e.current)),J=null;return}t.flags&32768?(k||r===1?e=!0:Vl||Y&536870912?e=!1:(Bl=e=!0,(r===2||r===9||r===3||r===6)&&(r=fo.current,r!==null&&r.tag===13&&(r.flags|=16384))),Iu(t,e)):Fu(t)}function Fu(e){var t=e;do{if(t.flags&32768){Iu(t,Bl);return}e=t.return;var n=zc(t.alternate,t,Ul);if(n!==null){J=n;return}if(t=t.sibling,t!==null){J=t;return}J=t=e}while(t!==null);Wl===0&&(Wl=5)}function Iu(e,t){do{var n=Bc(e.alternate,e);if(n!==null){n.flags&=32767,J=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){J=e;return}J=e=n}while(e!==null);Wl=6,J=null}function Lu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Hu();while(iu!==0);if(K&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=ui,lt(e,n,o,s,c,l),e===q&&(J=q=null,Y=0),ou=t,au=e,su=n,cu=o,lu=a,uu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(Ve,function(){return Uu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=w.T,w.T=null,a=T.p,T.p=2,s=K,K|=4;try{ol(e,t,n)}finally{K=s,T.p=a,w.T=r}}iu=1,Ru(),zu(),Bu()}}function Ru(){if(iu===1){iu=0;var e=au,t=ou,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=w.T,w.T=null;var r=T.p;T.p=2;var i=K;K|=4;try{vl(t,e);var a=zd,o=Rr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Lr(s.ownerDocument.documentElement,s)){if(c!==null&&zr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=D(s,h),v=D(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{K=i,T.p=r,w.T=n}}e.current=t,iu=2}}function zu(){if(iu===2){iu=0;var e=au,t=ou,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=w.T,w.T=null;var r=T.p;T.p=2;var i=K;K|=4;try{sl(e,t.alternate,t)}finally{K=i,T.p=r,w.T=n}}iu=3}}function Bu(){if(iu===4||iu===3){iu=0,Ie();var e=au,t=ou,n=su,r=uu;t.subtreeFlags&10256||t.flags&10256?iu=5:(iu=0,ou=au=null,Vu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(ru=null),mt(n),t=t.stateNode,qe&&typeof qe.onCommitFiberRoot==`function`)try{qe.onCommitFiberRoot(Ke,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=w.T,i=T.p,T.p=2,w.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{w.T=t,T.p=i}}su&3&&Hu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===fu?du++:(du=0,fu=e):du=0,id(0,!1)}}function Vu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,va(t)))}function Hu(){return Ru(),zu(),Bu(),Uu()}function Uu(){if(iu!==5)return!1;var e=au,t=cu;cu=0;var n=mt(su),r=w.T,a=T.p;try{T.p=32>n?32:n,w.T=null,n=lu,lu=null;var o=au,s=su;if(iu=0,ou=au=null,su=0,K&6)throw Error(i(331));var c=K;if(K|=4,Pl(o.current),El(o,o.current,s,n),K=c,id(0,!1),qe&&typeof qe.onPostCommitFiberRoot==`function`)try{qe.onPostCommitFiberRoot(Ke,o)}catch{}return!0}finally{T.p=a,w.T=r,Vu(e,t)}}function Wu(e,t,n){t=ki(n,t),t=ec(e.stateNode,t,2),e=Qa(e,t,2),e!==null&&(ct(e,2),rd(e))}function Z(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(ru===null||!ru.has(r))){e=ki(n,e),n=tc(2),r=Qa(t,n,2),r!==null&&(nc(n,r,t,e),ct(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Rl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Hl=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,q===e&&(Y&n)===n&&(Wl===4||Wl===3&&(Y&62914560)===Y&&300>Le()-$l?!(K&2)&&Su(e,0):ql|=n,Yl===Y&&(Yl=0)),rd(e)}function qu(e,t){t===0&&(t=ot()),e=mi(e,t),e!==null&&(ct(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return Ne(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Ye(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=Y,a=rt(r,r===q?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||it(r,a)||(n=!0,ld(r,a));r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=Le(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}iu!==0&&iu!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Ye(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=at(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=q,n=Y,n=rt(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(X===2||X===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Pe(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||it(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Pe(r),mt(n)){case 2:case 8:n=Be;break;case 32:n=Ve;break;case 268435456:n=Ue;break;default:n=Ve}return r=cd.bind(null,e),n=Ne(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Pe(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(iu!==0&&iu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Hu()&&e.callbackNode!==n)return null;var r=Y;return r=rt(e,e===q?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(gu(e,r,t),sd(e,Le()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Hu())return null;gu(e,t,!0)}function ud(){Yd(function(){K&6?Ne(ze,ad):od()})}function dd(){if(nd===0){var e=xa;e===0&&(e=$e,$e<<=1,!($e&261888)&&($e=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:dn(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[yt]||null).action),o=r.submitter;o&&(t=(t=o[yt]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Nn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);Ds(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),Ds(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<ai.length;hd++){var gd=ai[hd];oi(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}oi(Zr,`onAnimationEnd`),oi(Qr,`onAnimationIteration`),oi($r,`onAnimationStart`),oi(`dblclick`,`onDoubleClick`),oi(`focusin`,`onFocus`),oi(`focusout`,`onBlur`),oi(ei,`onTransitionRun`),oi(ti,`onTransitionStart`),oi(ni,`onTransitionCancel`),oi(ri,`onTransitionEnd`),Ft(`onMouseEnter`,[`mouseout`,`mouseover`]),Ft(`onMouseLeave`,[`mouseout`,`mouseover`]),Ft(`onPointerEnter`,[`pointerout`,`pointerover`]),Ft(`onPointerLeave`,[`pointerout`,`pointerover`]),Pt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Pt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Pt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Pt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Pt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Pt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){si(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){si(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[xt];n===void 0&&(n=t[xt]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,Mt.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!Sn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=Dt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}yn(function(){var r=a,i=mn(n),s=[];a:{var c=ii.get(e);if(c!==void 0){var l=Nn,u=e;switch(e){case`keypress`:if(On(n)===0)break a;case`keydown`:case`keyup`:l=Zn;break;case`focusin`:u=`focus`,l=Hn;break;case`focusout`:u=`blur`,l=Hn;break;case`beforeblur`:case`afterblur`:l=Hn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Bn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Vn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=$n;break;case Zr:case Qr:case $r:l=Un;break;case ri:l=er;break;case`scroll`:case`scrollend`:l=Fn;break;case`wheel`:l=tr;break;case`copy`:case`cut`:case`paste`:l=Wn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Qn;break;case`toggle`:case`beforetoggle`:l=nr}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=bn(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==pn&&(u=n.relatedTarget||n.fromElement)&&(Dt(u)||u[bt]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?Dt(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=Bn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Qn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:kt(l),h=u==null?c:kt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,Dt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Dd,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Od(s,c,l,d,!1),u!==null&&f!==null&&Od(s,f,u,d,!0)}}a:{if(c=r?kt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=Sr;else if(gr(c))if(Cr)v=Mr;else{v=Ar;var y=kr}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&cn(r.elementType)&&(v=Sr):v=jr;if(v&&=v(e,r)){_r(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&$t(c,`number`,c.value)}switch(y=r?kt(r):window,e){case`focusin`:(gr(y)||y.contentEditable===`true`)&&(Vr=y,Hr=r,Ur=null);break;case`focusout`:Ur=Hr=Vr=null;break;case`mousedown`:Wr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Wr=!1,Gr(s,n,i);break;case`selectionchange`:if(Br)break;case`keydown`:case`keyup`:Gr(s,n,i)}var b;if(ir)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else fr?ur(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(sr&&n.locale!==`ko`&&(fr||x!==`onCompositionStart`?x===`onCompositionEnd`&&fr&&(b=Dn()):(wn=i,Tn=`value`in wn?wn.value:wn.textContent,fr=!0)),y=Ed(r,x),0<y.length&&(x=new Gn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=dr(n),b!==null&&(x.data=b)))),(b=or?pr(e,n):mr(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new Gn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),md(s,e,r,n,i)}yd(s,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=bn(e,n),i!=null&&r.unshift(Td(e,i,a)),i=bn(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=bn(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=bn(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||rn(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&rn(e,``+r);break;case`className`:Vt(e,`class`,r);break;case`tabIndex`:Vt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Vt(e,n,r);break;case`style`:sn(e,r,o);break;case`data`:if(t!==`object`){Vt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=dn(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=dn(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=fn);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=dn(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Bt(e,`popover`,r);break;case`xlinkActuate`:Ht(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Ht(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Ht(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Ht(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Ht(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Ht(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Ht(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Ht(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Ht(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Bt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=ln.get(n)||n,Bt(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:sn(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?rn(e,r):(typeof r==`number`||typeof r==`bigint`)&&rn(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=fn);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!Nt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[yt]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Bt(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}Qt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&en(e,!!r,n,!0):en(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}nn(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(cn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Zt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?en(e,!!n,n?[]:``,!1):en(e,!!n,t,!0)):en(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}tn(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(cn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e===Wd?!1:(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Tt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body);n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),Et(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[Tt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Et(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=T.d;T.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=bu();return e||t}function yf(e){var t=Ot(e);t!==null&&t.tag===5&&t.type===`form`?ks(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Xt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),jt(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Xt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Xt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Xt(n.imageSizes)+`"]`)):i+=`[href="`+Xt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),jt(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Xt(r)+`"][href="`+Xt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),jt(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=At(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);jt(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=At(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),jt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=At(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),jt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=ye.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=At(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=At(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=At(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+Xt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),jt(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Xt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Xt(n.href)+`"]`);if(r)return t.instance=r,jt(r),r;var a=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),jt(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,jt(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),jt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,jt(a),a):(r=n,(a=mf.get(o))&&(r=h({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),jt(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Tt]||a[vt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,jt(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),jt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:te,Provider:null,Consumer:null,_currentValue:fe,_currentValue2:fe,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=st(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=st(0),this.hiddenUpdates=st(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=yi(3,null,null,t),e.current=a,a.stateNode=e,t=_a(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Ya(a),e}function tp(e){return e?(e=_i,e):_i}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Za(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Qa(e,r,t),n!==null&&(hu(n,e,t),$a(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=mi(e,67108864);t!==null&&hu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=pu();t=pt(t);var n=mi(e,t);n!==null&&hu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=w.T;w.T=null;var a=T.p;try{T.p=2,up(e,t,n,r)}finally{T.p=a,w.T=i}}function lp(e,t,n,r){var i=w.T;w.T=null;var a=T.p;try{T.p=8,up(e,t,n,r)}finally{T.p=a,w.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=Ot(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=nt(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Ye(o);s.entanglements[1]|=c,o&=~c}rd(a),!(K&6)&&(tu=Le()+500,id(0,!1))}}break;case 31:case 13:s=mi(a,2),s!==null&&hu(s,a,2),bu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=mn(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=Dt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Re()){case ze:return 2;case Be:return 8;case Ve:case He:return 32;case Ue:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Ot(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=Dt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,gt(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,gt(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);pn=r,n.target.dispatchEvent(r),pn=null}else return t=Ot(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=Ot(n);a!==null&&(e.splice(t,3),t-=3,Ds(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[yt]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[yt]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,pu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),bu(),t[bt]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=ht();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.6`)throw Error(i(527,Lp,`19.2.6`));T.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.6`,rendererPackageName:`react-dom`,currentDispatcherRef:w,reconcilerVersion:`19.2.6`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{Ke=zp.inject(Rp),qe=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Ys,s=Xs,c=Zs;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[bt]=t.current,Sd(e),new Fp(t)}})),g=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=`modulepreload`,v=function(e){return`/`+e},y={},b=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=v(t,n),t in y)return;y[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:_,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},x=c(u(),1),ee=`popstate`;function te(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function S(e={}){function t(e,t){let{pathname:n=`/`,search:r=``,hash:i=``}=se(e.location.hash.substring(1));return!n.startsWith(`/`)&&!n.startsWith(`.`)&&(n=`/`+n),ae(``,{pathname:n,search:r,hash:i},t.state&&t.state.usr||null,t.state&&t.state.key||`default`)}function n(e,t){let n=e.document.querySelector(`base`),r=``;if(n&&n.getAttribute(`href`)){let t=e.location.href,n=t.indexOf(`#`);r=n===-1?t:t.slice(0,n)}return r+`#`+(typeof t==`string`?t:oe(t))}function r(e,t){ne(e.pathname.charAt(0)===`/`,`relative pathnames are not supported in hash history.push(${JSON.stringify(t)})`)}return ce(t,n,r,e)}function C(e,t){if(e===!1||e==null)throw Error(t)}function ne(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function re(){return Math.random().toString(36).substring(2,10)}function ie(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function ae(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?se(t):t,state:n,key:t&&t.key||r||re(),mask:i}}function oe({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function se(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function ce(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=te(e)?e:ae(h.location,e,t);n&&n(r,e),l=u()+1;let d=ie(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=te(e)?e:ae(h.location,e,t);n&&n(r,e),l=u();let i=ie(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return le(e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(ee,d),c=e,()=>{i.removeEventListener(ee,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function le(e,t=!1){let n=`http://localhost`;typeof window<`u`&&(n=window.location.origin===`null`?window.location.href:window.location.origin),C(n,`No window.location.(origin|href) available to create URL`);let r=typeof e==`string`?e:oe(e);return r=r.replace(/ $/,`%20`),!t&&r.startsWith(`//`)&&(r=n+r),new URL(r,n)}function ue(e,t,n=`/`){return de(e,t,n,!1)}function de(e,t,n,r,i){let a=De((typeof t==`string`?se(t):t).pathname||`/`,n);if(a==null)return null;let o=i??T(e),s=null,c=Ee(a);for(let e=0;s==null&&e<o.length;++e)s=Ce(o[e],c,r);return s}function w(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function T(e){let t=fe(e);return me(t),t}function fe(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;C(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=Ie([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(C(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),fe(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:xe(l,e.index),routesMeta:u})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of pe(e.path))a(e,t,!0,n)}),t}function pe(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=pe(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function me(e){e.sort((e,t)=>e.score===t.score?Se(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var he=/^:[\w-]+$/,ge=3,E=2,_e=1,ve=10,ye=-2,be=e=>e===`*`;function xe(e,t){let n=e.split(`/`),r=n.length;return n.some(be)&&(r+=ye),t&&(r+=E),n.filter(e=>!be(e)).reduce((e,t)=>e+(he.test(t)?ge:t===``?_e:ve),r)}function Se(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function Ce(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u=we({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},l),d=s.route;if(!u&&c&&n&&!r[r.length-1].route.index&&(u=we({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!u)return null;Object.assign(i,u.params),o.push({params:i,pathname:Ie([a,u.pathname]),pathnameBase:Re(Ie([a,u.pathnameBase])),route:d}),u.pathnameBase!==`/`&&(a=Ie([a,u.pathnameBase]))}return o}function we(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Te(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function Te(e,t=!1,n=!0){ne(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function Ee(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return ne(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function De(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}var Oe=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function ke(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?se(e):e,a;return n?(n=Fe(n),a=n.startsWith(`/`)?Ae(n.substring(1),`/`):Ae(n,t)):a=t,{pathname:a,search:ze(r),hash:Be(i)}}function Ae(e,t){let n=Le(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function je(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Me(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Ne(e){let t=Me(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function Pe(e,t,n,r=!1){let i;typeof e==`string`?i=se(e):(i={...e},C(!i.pathname||!i.pathname.includes(`?`),je(`?`,`pathname`,`search`,i)),C(!i.pathname||!i.pathname.includes(`#`),je(`#`,`pathname`,`hash`,i)),C(!i.search||!i.search.includes(`#`),je(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=ke(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var Fe=e=>e.replace(/\/\/+/g,`/`),Ie=e=>Fe(e.join(`/`)),Le=e=>e.replace(/\/+$/,``),Re=e=>Le(e).replace(/^\/*/,`/`),ze=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Be=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,Ve=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function He(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function Ue(e){return Ie(e.map(e=>e.route.path).filter(Boolean))||`/`}var We=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Ge(e,t){let n=e;if(typeof n!=`string`||!Oe.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(We)try{let e=new URL(window.location.href),r=n.startsWith(`//`)?new URL(e.protocol+n):new URL(n),a=De(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{ne(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Ke=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(Ke);var qe=[`GET`,...Ke];new Set(qe);var Je=x.createContext(null);Je.displayName=`DataRouter`;var Ye=x.createContext(null);Ye.displayName=`DataRouterState`;var Xe=x.createContext(!1);function Ze(){return x.useContext(Xe)}var Qe=x.createContext({isTransitioning:!1});Qe.displayName=`ViewTransition`;var $e=x.createContext(new Map);$e.displayName=`Fetchers`;var et=x.createContext(null);et.displayName=`Await`;var tt=x.createContext(null);tt.displayName=`Navigation`;var nt=x.createContext(null);nt.displayName=`Location`;var rt=x.createContext({outlet:null,matches:[],isDataRoute:!1});rt.displayName=`Route`;var it=x.createContext(null);it.displayName=`RouteError`;var at=`REACT_ROUTER_ERROR`,ot=`REDIRECT`,st=`ROUTE_ERROR_RESPONSE`;function ct(e){if(e.startsWith(`${at}:${ot}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function lt(e){if(e.startsWith(`${at}:${st}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new Ve(t.status,t.statusText,t.data)}catch{}}function ut(e,{relative:t}={}){C(dt(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=x.useContext(tt),{hash:i,pathname:a,search:o}=vt(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:Ie([n,a])),r.createHref({pathname:s,search:o,hash:i})}function dt(){return x.useContext(nt)!=null}function ft(){return C(dt(),`useLocation() may be used only in the context of a <Router> component.`),x.useContext(nt).location}var pt=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function mt(e){x.useContext(tt).static||x.useLayoutEffect(e)}function ht(){let{isDataRoute:e}=x.useContext(rt);return e?Lt():gt()}function gt(){C(dt(),`useNavigate() may be used only in the context of a <Router> component.`);let e=x.useContext(Je),{basename:t,navigator:n}=x.useContext(tt),{matches:r}=x.useContext(rt),{pathname:i}=ft(),a=JSON.stringify(Ne(r)),o=x.useRef(!1);return mt(()=>{o.current=!0}),x.useCallback((r,s={})=>{if(ne(o.current,pt),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=Pe(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:Ie([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}x.createContext(null);function _t(){let{matches:e}=x.useContext(rt);return e[e.length-1]?.params??{}}function vt(e,{relative:t}={}){let{matches:n}=x.useContext(rt),{pathname:r}=ft(),i=JSON.stringify(Ne(n));return x.useMemo(()=>Pe(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function yt(e,t){return bt(e,t)}function bt(e,t,n){C(dt(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=x.useContext(tt),{matches:i}=x.useContext(rt),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;zt(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=ft(),d;if(t){let e=typeof t==`string`?se(t):t;C(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):ue(e,{pathname:p});ne(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),ne(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=Dt(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:Ie([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:Ie([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?x.createElement(nt.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function xt(){let e=It(),t=He(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=x.createElement(x.Fragment,null,x.createElement(`p`,null,`💿 Hey developer 👋`),x.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,x.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,x.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),x.createElement(x.Fragment,null,x.createElement(`h2`,null,`Unexpected Application Error!`),x.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?x.createElement(`pre`,{style:i},n):null,o)}var St=x.createElement(xt,null),Ct=class extends x.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=lt(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:x.createElement(rt.Provider,{value:this.props.routeContext},x.createElement(it.Provider,{value:e,children:this.props.component}));return this.context?x.createElement(Tt,{error:e},t):t}};Ct.contextType=Xe;var wt=new WeakMap;function Tt({children:e,error:t}){let{basename:n}=x.useContext(tt);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=ct(t.digest);if(e){let r=wt.get(t);if(r)throw r;let i=Ge(e.location,n);if(We&&!wt.get(t))if(i.isExternal||e.reloadDocument)window.location.href=i.absoluteURL||i.to;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw wt.set(t,n),n}return x.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${i.absoluteURL||i.to}`})}}return e}function Et({routeContext:e,match:t,children:n}){let r=x.useContext(Je);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),x.createElement(rt.Provider,{value:e},n)}function Dt(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);C(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:Ue(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||St,o&&(s<0&&c===0?(zt(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?x.createElement(n.route.Component,null):n.route.element?n.route.element:e,x.createElement(Et,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?x.createElement(Ct,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function Ot(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function kt(e){let t=x.useContext(Je);return C(t,Ot(e)),t}function At(e){let t=x.useContext(Ye);return C(t,Ot(e)),t}function jt(e){let t=x.useContext(rt);return C(t,Ot(e)),t}function Mt(e){let t=jt(e),n=t.matches[t.matches.length-1];return C(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Nt(){return Mt(`useRouteId`)}function Pt(){return At(`useNavigation`).navigation}function Ft(){let{matches:e,loaderData:t}=At(`useMatches`);return x.useMemo(()=>e.map(e=>w(e,t)),[e,t])}function It(){let e=x.useContext(it),t=At(`useRouteError`),n=Mt(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Lt(){let{router:e}=kt(`useNavigate`),t=Mt(`useNavigate`),n=x.useRef(!1);return mt(()=>{n.current=!0}),x.useCallback(async(r,i={})=>{ne(n.current,pt),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var Rt={};function zt(e,t,n){!t&&!Rt[e]&&(Rt[e]=!0,ne(!1,n))}x.memo(Bt);function Bt({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return bt(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function Vt(e){C(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function Ht({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){C(!dt(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=x.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=se(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=x.useMemo(()=>{let e=De(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return ne(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:x.createElement(tt.Provider,{value:c},x.createElement(nt.Provider,{children:t,value:h}))}function Ut({children:e,location:t}){return yt(Wt(e),t)}x.Component;function Wt(e,t=[]){let n=[];return x.Children.forEach(e,(e,r)=>{if(!x.isValidElement(e))return;let i=[...t,r];if(e.type===x.Fragment){n.push.apply(n,Wt(e.props.children,i));return}C(e.type===Vt,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),C(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Wt(e.props.children,i)),n.push(a)}),n}var Gt=`get`,Kt=`application/x-www-form-urlencoded`;function qt(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function Jt(e){return qt(e)&&e.tagName.toLowerCase()===`button`}function Yt(e){return qt(e)&&e.tagName.toLowerCase()===`form`}function Xt(e){return qt(e)&&e.tagName.toLowerCase()===`input`}function Zt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Qt(e,t){return e.button===0&&(!t||t===`_self`)&&!Zt(e)}var $t=null;function en(){if($t===null)try{new FormData(document.createElement(`form`),0),$t=!1}catch{$t=!0}return $t}var tn=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function nn(e){return e!=null&&!tn.has(e)?(ne(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Kt}"`),null):e}function rn(e,t){let n,r,i,a,o;if(Yt(e)){let o=e.getAttribute(`action`);r=o?De(o,t):null,n=e.getAttribute(`method`)||Gt,i=nn(e.getAttribute(`enctype`))||Kt,a=new FormData(e)}else if(Jt(e)||Xt(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?De(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Gt,i=nn(e.getAttribute(`formenctype`))||nn(o.getAttribute(`enctype`))||Kt,a=new FormData(o,e),!en()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(qt(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Gt,r=null,i=Kt,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var an={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},on=/[&><\u2028\u2029]/g;function sn(e){return e.replace(on,e=>an[e])}function cn(e,t){if(e===!1||e==null)throw Error(t)}function ln(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&De(i.pathname,t)===`/`?i.pathname=`${Le(t)}/_root.${r}`:i.pathname=`${Le(i.pathname)}.${r}`,i}async function un(e,t){if(e.id in t)return t[e.id];try{let n=await b(()=>import(e.module),[]);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function dn(e){return e!=null&&typeof e.page==`string`}function fn(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function pn(e,t,n){return vn((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await un(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(fn).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function mn(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function hn(e,t,{includeHydrateFallback:n}={}){return gn(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function gn(e){return[...new Set(e)]}function _n(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function vn(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!dn(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(_n(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function yn(){let e=x.useContext(Je);return cn(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function bn(){let e=x.useContext(Ye);return cn(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var xn=x.createContext(void 0);xn.displayName=`FrameworkContext`;function Sn(){let e=x.useContext(xn);return cn(e,`You must render this element inside a <HydratedRouter> element`),e}function Cn(e,t){let n=x.useContext(xn),[r,i]=x.useState(!1),[a,o]=x.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=x.useRef(null);x.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),x.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:wn(s,p),onBlur:wn(c,m),onMouseEnter:wn(l,p),onMouseLeave:wn(u,m),onTouchStart:wn(d,p)}]:[a,f,{}]:[!1,f,{}]}function wn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function Tn({page:e,...t}){let n=Ze(),{router:r}=yn(),i=x.useMemo(()=>ue(r.routes,e,r.basename),[r.routes,e,r.basename]);return i?n?x.createElement(Dn,{page:e,matches:i,...t}):x.createElement(On,{page:e,matches:i,...t}):null}function En(e){let{manifest:t,routeModules:n}=Sn(),[r,i]=x.useState([]);return x.useEffect(()=>{let r=!1;return pn(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function Dn({page:e,matches:t,...n}){let r=ft(),{future:i}=Sn(),{basename:a}=yn(),o=x.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=ln(e,a,i.unstable_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.unstable_trailingSlashAwareDataRequests,e,r,t]);return x.createElement(x.Fragment,null,o.map(e=>x.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function On({page:e,matches:t,...n}){let r=ft(),{future:i,manifest:a,routeModules:o}=Sn(),{basename:s}=yn(),{loaderData:c,matches:l}=bn(),u=x.useMemo(()=>mn(e,t,l,a,r,`data`),[e,t,l,a,r]),d=x.useMemo(()=>mn(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=x.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=ln(e,s,i.unstable_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.unstable_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=x.useMemo(()=>hn(d,a),[d,a]),m=En(d);return x.createElement(x.Fragment,null,f.map(e=>x.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>x.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>x.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function kn(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}x.Component;var An=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{An&&(window.__reactRouterVersion=`7.15.0`)}catch{}function jn({basename:e,children:t,useTransitions:n,window:r}){let i=x.useRef();i.current??=S({window:r,v5Compat:!0});let a=i.current,[o,s]=x.useState({action:a.action,location:a.location}),c=x.useCallback(e=>{n===!1?s(e):x.startTransition(()=>s(e))},[n]);return x.useLayoutEffect(()=>a.listen(c),[a,c]),x.createElement(Ht,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}function Mn({basename:e,children:t,history:n,useTransitions:r}){let[i,a]=x.useState({action:n.action,location:n.location}),o=x.useCallback(e=>{r===!1?a(e):x.startTransition(()=>a(e))},[r]);return x.useLayoutEffect(()=>n.listen(o),[n,o]),x.createElement(Ht,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,useTransitions:r})}Mn.displayName=`unstable_HistoryRouter`;var Nn=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Pn=x.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:_}=x.useContext(tt),v=typeof l==`string`&&Nn.test(l),y=Ge(l,h);l=y.to;let b=ut(l,{relative:r}),ee=ft(),te=null;if(o){let e=Pe(o,[],ee.mask?ee.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:Ie([h,e.pathname])),te=g.createHref(e)}let[S,C,ne]=Cn(n,p),re=Vn(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:_});function ie(t){e&&e(t),t.defaultPrevented||re(t)}let ae=!(y.isExternal||i),oe=x.createElement(`a`,{...p,...ne,href:(ae?te:void 0)||y.absoluteURL||b,onClick:ae?ie:e,ref:kn(m,C),target:c,"data-discover":!v&&t===`render`?`true`:void 0});return S&&!v?x.createElement(x.Fragment,null,oe,x.createElement(Tn,{page:b})):oe});Pn.displayName=`Link`;var Fn=x.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=vt(a,{relative:c.relative}),d=ft(),f=x.useContext(Ye),{navigator:p,basename:m}=x.useContext(tt),h=f!=null&&Zn(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,v=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),v=v?v.toLowerCase():null,g=g.toLowerCase()),v&&m&&(v=De(v,m)||v);let y=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,b=_===g||!r&&_.startsWith(g)&&_.charAt(y)===`/`,ee=v!=null&&(v===g||!r&&v.startsWith(g)&&v.charAt(g.length)===`/`),te={isActive:b,isPending:ee,isTransitioning:h},S=b?e:void 0,C;C=typeof n==`function`?n(te):[n,b?`active`:null,ee?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let ne=typeof i==`function`?i(te):i;return x.createElement(Pn,{...c,"aria-current":S,className:C,ref:l,style:ne,to:a,viewTransition:o},typeof s==`function`?s(te):s)});Fn.displayName=`NavLink`;var In=x.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Gt,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=x.useContext(tt),g=Wn(),_=Gn(s,{relative:l}),v=o.toLowerCase()===`get`?`get`:`post`,y=typeof s==`string`&&Nn.test(s);return x.createElement(`form`,{ref:m,method:v,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?x.startTransition(()=>p()):p()},...p,"data-discover":!y&&e===`render`?`true`:void 0})});In.displayName=`Form`;function Ln({getKey:e,storageKey:t,...n}){let r=x.useContext(xn),{basename:i}=x.useContext(tt),a=ft(),o=Ft();Yn({getKey:e,storageKey:t});let s=x.useMemo(()=>{if(!r||!e)return null;let t=Jn(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return x.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${sn(JSON.stringify(t||Kn))}, ${sn(JSON.stringify(s))})`}})}Ln.displayName=`ScrollRestoration`;function Rn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function zn(e){let t=x.useContext(Je);return C(t,Rn(e)),t}function Bn(e){let t=x.useContext(Ye);return C(t,Rn(e)),t}function Vn(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=ht(),d=ft(),f=vt(e,{relative:o});return x.useCallback(p=>{if(Qt(p,t)){p.preventDefault();let t=n===void 0?oe(d)===oe(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?x.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}var Hn=0,Un=()=>`__${String(++Hn)}__`;function Wn(){let{router:e}=zn(`useSubmit`),{basename:t}=x.useContext(tt),n=Nt(),r=e.fetch,i=e.navigate;return x.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=rn(e,t);a.navigate===!1?await r(a.fetcherKey||Un(),n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync}):await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function Gn(e,{relative:t}={}){let{basename:n}=x.useContext(tt),r=x.useContext(rt);C(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...vt(e||`.`,{relative:t})},o=ft();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:Ie([n,a.pathname])),oe(a)}var Kn=`react-router-scroll-positions`,qn={};function Jn(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:De(e.pathname,n)||e.pathname},t)),i??=e.key,i}function Yn({getKey:e,storageKey:t}={}){let{router:n}=zn(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=Bn(`useScrollRestoration`),{basename:a}=x.useContext(tt),o=ft(),s=Ft(),c=Pt();x.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),Xn(x.useCallback(()=>{if(c.state===`idle`){let t=Jn(o,s,a,e);qn[t]=window.scrollY}try{sessionStorage.setItem(t||Kn,JSON.stringify(qn))}catch(e){ne(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(x.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||Kn);e&&(qn=JSON.parse(e))}catch{}},[t]),x.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(qn,()=>window.scrollY,e?(t,n)=>Jn(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),x.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{ne(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function Xn(e,t){let{capture:n}=t||{};x.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function Zn(e,{relative:t}={}){let n=x.useContext(Qe);C(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=zn(`useViewTransitionState`),i=vt(e,{relative:t});if(!n.isTransitioning)return!1;let a=De(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=De(n.nextLocation.pathname,r)||n.nextLocation.pathname;return we(i.pathname,o)!=null||we(i.pathname,a)!=null}var Qn=g();function $n(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols==`function`)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n}function er(e,t,n,r){function i(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||=Promise)(function(n,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?n(e.value):i(e.value).then(o,s)}c((r=r.apply(e,t||[])).next())})}var tr=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),nr=class extends Error{constructor(e,t=`FunctionsError`,n){super(e),this.name=t,this.context=n}toJSON(){return{name:this.name,message:this.message,context:this.context}}},rr=class extends nr{constructor(e){super(`Failed to send a request to the Edge Function`,`FunctionsFetchError`,e)}},ir=class extends nr{constructor(e){super(`Relay Error invoking the Edge Function`,`FunctionsRelayError`,e)}},ar=class extends nr{constructor(e){super(`Edge Function returned a non-2xx status code`,`FunctionsHttpError`,e)}},or;(function(e){e.Any=`any`,e.ApNortheast1=`ap-northeast-1`,e.ApNortheast2=`ap-northeast-2`,e.ApSouth1=`ap-south-1`,e.ApSoutheast1=`ap-southeast-1`,e.ApSoutheast2=`ap-southeast-2`,e.CaCentral1=`ca-central-1`,e.EuCentral1=`eu-central-1`,e.EuWest1=`eu-west-1`,e.EuWest2=`eu-west-2`,e.EuWest3=`eu-west-3`,e.SaEast1=`sa-east-1`,e.UsEast1=`us-east-1`,e.UsWest1=`us-west-1`,e.UsWest2=`us-west-2`})(or||={});var sr=class{constructor(e,{headers:t={},customFetch:n,region:r=or.Any}={}){this.url=e,this.headers=t,this.region=r,this.fetch=tr(n)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return er(this,arguments,void 0,function*(e,t={}){let n,r;try{let{headers:i,method:a,body:o,signal:s,timeout:c}=t,l={},{region:u}=t;u||=this.region;let d=new URL(`${this.url}/${e}`);u&&u!==`any`&&(l[`x-region`]=u,d.searchParams.set(`forceFunctionRegion`,u));let f;o&&(i&&!Object.prototype.hasOwnProperty.call(i,`Content-Type`)||!i)?typeof Blob<`u`&&o instanceof Blob||o instanceof ArrayBuffer?(l[`Content-Type`]=`application/octet-stream`,f=o):typeof o==`string`?(l[`Content-Type`]=`text/plain`,f=o):typeof FormData<`u`&&o instanceof FormData?f=o:(l[`Content-Type`]=`application/json`,f=JSON.stringify(o)):f=o&&typeof o!=`string`&&!(typeof Blob<`u`&&o instanceof Blob)&&!(o instanceof ArrayBuffer)&&!(typeof FormData<`u`&&o instanceof FormData)?JSON.stringify(o):o;let p=s;c&&(r=new AbortController,n=setTimeout(()=>r.abort(),c),s?(p=r.signal,s.addEventListener(`abort`,()=>r.abort())):p=r.signal);let m=yield this.fetch(d.toString(),{method:a||`POST`,headers:Object.assign(Object.assign(Object.assign({},l),this.headers),i),body:f,signal:p}).catch(e=>{throw new rr(e)}),h=m.headers.get(`x-relay-error`);if(h&&h===`true`)throw new ir(m);if(!m.ok)throw new ar(m);let g=(m.headers.get(`Content-Type`)??`text/plain`).split(`;`)[0].trim(),_;return _=g===`application/json`?yield m.json():g===`application/octet-stream`||g===`application/pdf`?yield m.blob():g===`text/event-stream`?m:g===`multipart/form-data`?yield m.formData():yield m.text(),{data:_,error:null,response:m}}catch(e){return{data:null,error:e,response:e instanceof ar||e instanceof ir?e.context:void 0}}finally{n&&clearTimeout(n)}})}},cr=3,lr=e=>Math.min(1e3*2**e,3e4),ur=[520,503],dr=[`GET`,`HEAD`,`OPTIONS`],fr=class extends Error{constructor(e){super(e.message),this.name=`PostgrestError`,this.details=e.details,this.hint=e.hint,this.code=e.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};function pr(e,t){return new Promise(n=>{if(t?.aborted){n();return}let r=setTimeout(()=>{t?.removeEventListener(`abort`,i),n()},e);function i(){clearTimeout(r),n()}t?.addEventListener(`abort`,i)})}function mr(e,t,n,r){return!(!r||n>=cr||!dr.includes(e)||!ur.includes(t))}var hr=class{constructor(e){this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=e.method,this.url=e.url,this.headers=new Headers(e.headers),this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=e.shouldThrowOnError??!1,this.signal=e.signal,this.isMaybeSingle=e.isMaybeSingle??!1,this.shouldStripNulls=e.shouldStripNulls??!1,this.urlLengthLimit=e.urlLengthLimit??8e3,this.retryEnabled=e.retry??!0,e.fetch?this.fetch=e.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get(`Accept`)===`text/csv`)throw Error(`stripNulls() cannot be used with csv()`);return this.shouldStripNulls=!0,this}setHeader(e,t){return this.headers=new Headers(this.headers),this.headers.set(e,t),this}retry(e){return this.retryEnabled=e,this}then(e,t){var n=this;if(this.schema===void 0||([`GET`,`HEAD`].includes(this.method)?this.headers.set(`Accept-Profile`,this.schema):this.headers.set(`Content-Profile`,this.schema)),this.method!==`GET`&&this.method!==`HEAD`&&this.headers.set(`Content-Type`,`application/json`),this.shouldStripNulls){let e=this.headers.get(`Accept`);e===`application/vnd.pgrst.object+json`?this.headers.set(`Accept`,`application/vnd.pgrst.object+json;nulls=stripped`):(!e||e===`application/json`)&&this.headers.set(`Accept`,`application/vnd.pgrst.array+json;nulls=stripped`)}let r=this.fetch,i=(async()=>{let e=0;for(;;){let t=new Headers(n.headers);e>0&&t.set(`X-Retry-Count`,String(e));let i;try{i=await r(n.url.toString(),{method:n.method,headers:t,body:JSON.stringify(n.body,(e,t)=>typeof t==`bigint`?t.toString():t),signal:n.signal})}catch(t){if(t instanceof Error&&(t.name===`AbortError`||`code`in t&&t.code===`ABORT_ERR`)||!dr.includes(n.method))throw t;if(n.retryEnabled&&e<cr){let t=lr(e);e++,await pr(t,n.signal);continue}throw t}if(mr(n.method,i.status,e,n.retryEnabled)){let t=i.headers?.get(`Retry-After`)??null,r=t===null?lr(e):Math.max(0,parseInt(t,10)||0)*1e3;await i.text(),e++,await pr(r,n.signal);continue}return await n.processResponse(i)}})();return this.shouldThrowOnError||(i=i.catch(e=>{let t=``,n=``,r=``,i=e?.cause;if(i){let n=i?.message??``,r=i?.code??``;t=`${e?.name??`FetchError`}: ${e?.message}`,t+=`\n\nCaused by: ${i?.name??`Error`}: ${n}`,r&&(t+=` (${r})`),i?.stack&&(t+=`\n${i.stack}`)}else t=e?.stack??``;let a=this.url.toString().length;return e?.name===`AbortError`||e?.code===`ABORT_ERR`?(r=``,n=`Request was aborted (timeout or manual cancellation)`,a>this.urlLengthLimit&&(n+=`. Note: Your request URL is ${a} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):(i?.name===`HeadersOverflowError`||i?.code===`UND_ERR_HEADERS_OVERFLOW`)&&(r=``,n=`HTTP headers exceeded server limits (typically 16KB)`,a>this.urlLengthLimit&&(n+=`. Your request URL is ${a} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${e?.name??`FetchError`}: ${e?.message}`,details:t,hint:n,code:r},data:null,count:null,status:0,statusText:``}})),i.then(e,t)}async processResponse(e){var t=this;let n=null,r=null,i=null,a=e.status,o=e.statusText;if(e.ok){if(t.method!==`HEAD`){let n=await e.text();n===``||(r=t.headers.get(`Accept`)===`text/csv`||t.headers.get(`Accept`)&&t.headers.get(`Accept`)?.includes(`application/vnd.pgrst.plan+text`)?n:JSON.parse(n))}let s=t.headers.get(`Prefer`)?.match(/count=(exact|planned|estimated)/),c=e.headers.get(`content-range`)?.split(`/`);s&&c&&c.length>1&&(i=parseInt(c[1])),t.isMaybeSingle&&Array.isArray(r)&&(r.length>1?(n={code:`PGRST116`,details:`Results contain ${r.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:`JSON object requested, multiple (or no) rows returned`},r=null,i=null,a=406,o=`Not Acceptable`):r=r.length===1?r[0]:null)}else{let i=await e.text();try{n=JSON.parse(i),Array.isArray(n)&&e.status===404&&(r=[],n=null,a=200,o=`OK`)}catch{e.status===404&&i===``?(a=204,o=`No Content`):n={message:i}}if(n&&t.shouldThrowOnError)throw new fr(n)}return{success:n===null,error:n,data:r,count:i,status:a,statusText:o}}returns(){return this}overrideTypes(){return this}},gr=class extends hr{select(e){let t=!1,n=(e??`*`).split(``).map(e=>/\s/.test(e)&&!t?``:(e===`"`&&(t=!t),e)).join(``);return this.url.searchParams.set(`select`,n),this.headers.append(`Prefer`,`return=representation`),this}order(e,{ascending:t=!0,nullsFirst:n,foreignTable:r,referencedTable:i=r}={}){let a=i?`${i}.order`:`order`,o=this.url.searchParams.get(a);return this.url.searchParams.set(a,`${o?`${o},`:``}${e}.${t?`asc`:`desc`}${n===void 0?``:n?`.nullsfirst`:`.nullslast`}`),this}limit(e,{foreignTable:t,referencedTable:n=t}={}){let r=n===void 0?`limit`:`${n}.limit`;return this.url.searchParams.set(r,`${e}`),this}range(e,t,{foreignTable:n,referencedTable:r=n}={}){let i=r===void 0?`offset`:`${r}.offset`,a=r===void 0?`limit`:`${r}.limit`;return this.url.searchParams.set(i,`${e}`),this.url.searchParams.set(a,`${t-e+1}`),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.set(`Accept`,`application/vnd.pgrst.object+json`),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set(`Accept`,`text/csv`),this}geojson(){return this.headers.set(`Accept`,`application/geo+json`),this}explain({analyze:e=!1,verbose:t=!1,settings:n=!1,buffers:r=!1,wal:i=!1,format:a=`text`}={}){let o=[e?`analyze`:null,t?`verbose`:null,n?`settings`:null,r?`buffers`:null,i?`wal`:null].filter(Boolean).join(`|`),s=this.headers.get(`Accept`)??`application/json`;return this.headers.set(`Accept`,`application/vnd.pgrst.plan+${a}; for="${s}"; options=${o};`),this}rollback(){return this.headers.append(`Prefer`,`tx=rollback`),this}returns(){return this}maxAffected(e){return this.headers.append(`Prefer`,`handling=strict`),this.headers.append(`Prefer`,`max-affected=${e}`),this}},_r=RegExp(`[,()]`),vr=class extends gr{eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(`,`)}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(`,`)}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(`,`)}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(`,`)}}`),this}regexMatch(e,t){return this.url.searchParams.append(e,`match.${t}`),this}regexIMatch(e,t){return this.url.searchParams.append(e,`imatch.${t}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}isDistinct(e,t){return this.url.searchParams.append(e,`isdistinct.${t}`),this}in(e,t){let n=Array.from(new Set(t)).map(e=>typeof e==`string`&&_r.test(e)?`"${e}"`:`${e}`).join(`,`);return this.url.searchParams.append(e,`in.(${n})`),this}notIn(e,t){let n=Array.from(new Set(t)).map(e=>typeof e==`string`&&_r.test(e)?`"${e}"`:`${e}`).join(`,`);return this.url.searchParams.append(e,`not.in.(${n})`),this}contains(e,t){return typeof t==`string`?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(`,`)}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return typeof t==`string`?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(`,`)}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return typeof t==`string`?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(`,`)}}`),this}textSearch(e,t,{config:n,type:r}={}){let i=``;r===`plain`?i=`pl`:r===`phrase`?i=`ph`:r===`websearch`&&(i=`w`);let a=n===void 0?``:`(${n})`;return this.url.searchParams.append(e,`${i}fts${a}.${t}`),this}match(e){return Object.entries(e).filter(([e,t])=>t!==void 0).forEach(([e,t])=>{this.url.searchParams.append(e,`eq.${t}`)}),this}not(e,t,n){return this.url.searchParams.append(e,`not.${t}.${n}`),this}or(e,{foreignTable:t,referencedTable:n=t}={}){let r=n?`${n}.or`:`or`;return this.url.searchParams.append(r,`(${e})`),this}filter(e,t,n){return this.url.searchParams.append(e,`${t}.${n}`),this}},yr=class{constructor(e,{headers:t={},schema:n,fetch:r,urlLengthLimit:i=8e3,retry:a}){this.url=e,this.headers=new Headers(t),this.schema=n,this.fetch=r,this.urlLengthLimit=i,this.retry=a}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(e,t){let{head:n=!1,count:r}=t??{},i=n?`HEAD`:`GET`,a=!1,o=(e??`*`).split(``).map(e=>/\s/.test(e)&&!a?``:(e===`"`&&(a=!a),e)).join(``),{url:s,headers:c}=this.cloneRequestState();return s.searchParams.set(`select`,o),r&&c.append(`Prefer`,`count=${r}`),new vr({method:i,url:s,headers:c,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(e,{count:t,defaultToNull:n=!0}={}){let{url:r,headers:i}=this.cloneRequestState();if(t&&i.append(`Prefer`,`count=${t}`),n||i.append(`Prefer`,`missing=default`),Array.isArray(e)){let t=e.reduce((e,t)=>e.concat(Object.keys(t)),[]);if(t.length>0){let e=[...new Set(t)].map(e=>`"${e}"`);r.searchParams.set(`columns`,e.join(`,`))}}return new vr({method:`POST`,url:r,headers:i,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(e,{onConflict:t,ignoreDuplicates:n=!1,count:r,defaultToNull:i=!0}={}){let{url:a,headers:o}=this.cloneRequestState();if(o.append(`Prefer`,`resolution=${n?`ignore`:`merge`}-duplicates`),t!==void 0&&a.searchParams.set(`on_conflict`,t),r&&o.append(`Prefer`,`count=${r}`),i||o.append(`Prefer`,`missing=default`),Array.isArray(e)){let t=e.reduce((e,t)=>e.concat(Object.keys(t)),[]);if(t.length>0){let e=[...new Set(t)].map(e=>`"${e}"`);a.searchParams.set(`columns`,e.join(`,`))}}return new vr({method:`POST`,url:a,headers:o,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(e,{count:t}={}){let{url:n,headers:r}=this.cloneRequestState();return t&&r.append(`Prefer`,`count=${t}`),new vr({method:`PATCH`,url:n,headers:r,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:e}={}){let{url:t,headers:n}=this.cloneRequestState();return e&&n.append(`Prefer`,`count=${e}`),new vr({method:`DELETE`,url:t,headers:n,schema:this.schema,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};function br(e){"@babel/helpers - typeof";return br=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},br(e)}function xr(e,t){if(br(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(br(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function Sr(e){var t=xr(e,`string`);return br(t)==`symbol`?t:t+``}function Cr(e,t,n){return(t=Sr(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function wr(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Tr(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?wr(Object(n),!0).forEach(function(t){Cr(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):wr(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var Er=class e{constructor(e,{headers:t={},schema:n,fetch:r,timeout:i,urlLengthLimit:a=8e3,retry:o}={}){this.url=e,this.headers=new Headers(t),this.schemaName=n,this.urlLengthLimit=a;let s=r??globalThis.fetch;i!==void 0&&i>0?this.fetch=(e,t)=>{let n=new AbortController,r=setTimeout(()=>n.abort(),i),a=t?.signal;if(a){if(a.aborted)return clearTimeout(r),s(e,t);let i=()=>{clearTimeout(r),n.abort()};return a.addEventListener(`abort`,i,{once:!0}),s(e,Tr(Tr({},t),{},{signal:n.signal})).finally(()=>{clearTimeout(r),a.removeEventListener(`abort`,i)})}return s(e,Tr(Tr({},t),{},{signal:n.signal})).finally(()=>clearTimeout(r))}:this.fetch=s,this.retry=o}from(e){if(!e||typeof e!=`string`||e.trim()===``)throw Error(`Invalid relation name: relation must be a non-empty string.`);return new yr(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(t){return new e(this.url,{headers:this.headers,schema:t,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}rpc(e,t={},{head:n=!1,get:r=!1,count:i}={}){let a,o=new URL(`${this.url}/rpc/${e}`),s,c=e=>typeof e==`object`&&!!e&&(!Array.isArray(e)||e.some(c)),l=n&&Object.values(t).some(c);l?(a=`POST`,s=t):n||r?(a=n?`HEAD`:`GET`,Object.entries(t).filter(([e,t])=>t!==void 0).map(([e,t])=>[e,Array.isArray(t)?`{${t.join(`,`)}}`:`${t}`]).forEach(([e,t])=>{o.searchParams.append(e,t)})):(a=`POST`,s=t);let u=new Headers(this.headers);return l?u.set(`Prefer`,i?`count=${i},return=minimal`:`return=minimal`):i&&u.set(`Prefer`,`count=${i}`),new vr({method:a,url:o,headers:u,schema:this.schemaName,body:s,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}},Dr=class{constructor(){}static detectEnvironment(){if(typeof WebSocket<`u`)return{type:`native`,wsConstructor:WebSocket};let e=globalThis;if(typeof globalThis<`u`&&e.WebSocket!==void 0)return{type:`native`,wsConstructor:e.WebSocket};let t=typeof global<`u`?global:void 0;if(t&&t.WebSocket!==void 0)return{type:`native`,wsConstructor:t.WebSocket};if(typeof globalThis<`u`&&e.WebSocketPair!==void 0&&globalThis.WebSocket===void 0)return{type:`cloudflare`,error:`Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.`,workaround:`Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime.`};if(typeof globalThis<`u`&&e.EdgeRuntime||typeof navigator<`u`&&navigator.userAgent?.includes(`Vercel-Edge`))return{type:`unsupported`,error:`Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.`,workaround:`Use serverless functions or a different deployment target for WebSocket functionality.`};let n=globalThis.process;if(n){let e=n.versions;if(e&&e.node){let t=e.node,n=parseInt(t.replace(/^v/,``).split(`.`)[0]);return n>=22?globalThis.WebSocket===void 0?{type:`unsupported`,error:`Node.js ${n} detected but native WebSocket not found.`,workaround:`Provide a WebSocket implementation via the transport option.`}:{type:`native`,wsConstructor:globalThis.WebSocket}:{type:`unsupported`,error:`Node.js ${n} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:`unsupported`,error:`Unknown JavaScript runtime without WebSocket support.`,workaround:`Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation.`}}static getWebSocketConstructor(){let e=this.detectEnvironment();if(e.wsConstructor)return e.wsConstructor;let t=e.error||`WebSocket not supported in this environment.`;throw e.workaround&&(t+=`\n\nSuggested solution: ${e.workaround}`),Error(t)}static isWebSocketSupported(){try{let e=this.detectEnvironment();return e.type===`native`||e.type===`ws`}catch{return!1}}},Or=`realtime-js/2.105.3`,kr=`1.0.0`,Ar=`2.0.0`,jr=Ar,Mr=1e4,Nr={closed:`closed`,errored:`errored`,joined:`joined`,joining:`joining`,leaving:`leaving`},Pr={close:`phx_close`,error:`phx_error`,join:`phx_join`,reply:`phx_reply`,leave:`phx_leave`,access_token:`access_token`},Fr={connecting:`connecting`,open:`open`,closing:`closing`,closed:`closed`},Ir=class{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT=`broadcast`,this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,t){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event==`string`)return t(this._binaryEncodeUserBroadcastPush(e));let n=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(n))}_binaryEncodeUserBroadcastPush(e){return this._isArrayBuffer(e.payload?.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){let t=e.payload?.payload??new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,t)}_encodeJsonUserBroadcastPush(e){let t=e.payload?.payload??{},n=new TextEncoder().encode(JSON.stringify(t)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,n)}_encodeUserBroadcastPush(e,t,n){let r=e.topic,i=e.ref??``,a=e.join_ref??``,o=e.payload.event,s=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},c=Object.keys(s).length===0?``:JSON.stringify(s);if(a.length>255)throw Error(`joinRef length ${a.length} exceeds maximum of 255`);if(i.length>255)throw Error(`ref length ${i.length} exceeds maximum of 255`);if(r.length>255)throw Error(`topic length ${r.length} exceeds maximum of 255`);if(o.length>255)throw Error(`userEvent length ${o.length} exceeds maximum of 255`);if(c.length>255)throw Error(`metadata length ${c.length} exceeds maximum of 255`);let l=this.USER_BROADCAST_PUSH_META_LENGTH+a.length+i.length+r.length+o.length+c.length,u=new ArrayBuffer(this.HEADER_LENGTH+l),d=new DataView(u),f=0;d.setUint8(f++,this.KINDS.userBroadcastPush),d.setUint8(f++,a.length),d.setUint8(f++,i.length),d.setUint8(f++,r.length),d.setUint8(f++,o.length),d.setUint8(f++,c.length),d.setUint8(f++,t),Array.from(a,e=>d.setUint8(f++,e.charCodeAt(0))),Array.from(i,e=>d.setUint8(f++,e.charCodeAt(0))),Array.from(r,e=>d.setUint8(f++,e.charCodeAt(0))),Array.from(o,e=>d.setUint8(f++,e.charCodeAt(0))),Array.from(c,e=>d.setUint8(f++,e.charCodeAt(0)));var p=new Uint8Array(u.byteLength+n.byteLength);return p.set(new Uint8Array(u),0),p.set(new Uint8Array(n),u.byteLength),p.buffer}decode(e,t){if(this._isArrayBuffer(e))return t(this._binaryDecode(e));if(typeof e==`string`){let[n,r,i,a,o]=JSON.parse(e);return t({join_ref:n,ref:r,topic:i,event:a,payload:o})}return t({})}_binaryDecode(e){let t=new DataView(e),n=t.getUint8(0),r=new TextDecoder;switch(n){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,t,r)}}_decodeUserBroadcast(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=t.getUint8(4),s=this.HEADER_LENGTH+4,c=n.decode(e.slice(s,s+r));s+=r;let l=n.decode(e.slice(s,s+i));s+=i;let u=n.decode(e.slice(s,s+a));s+=a;let d=e.slice(s,e.byteLength),f=o===this.JSON_ENCODING?JSON.parse(n.decode(d)):d,p={type:this.BROADCAST_EVENT,event:l,payload:f};return a>0&&(p.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:p}}_isArrayBuffer(e){return e instanceof ArrayBuffer||e?.constructor?.name===`ArrayBuffer`}_pick(e,t){return!e||typeof e!=`object`?{}:Object.fromEntries(Object.entries(e).filter(([e])=>t.includes(e)))}},D;(function(e){e.abstime=`abstime`,e.bool=`bool`,e.date=`date`,e.daterange=`daterange`,e.float4=`float4`,e.float8=`float8`,e.int2=`int2`,e.int4=`int4`,e.int4range=`int4range`,e.int8=`int8`,e.int8range=`int8range`,e.json=`json`,e.jsonb=`jsonb`,e.money=`money`,e.numeric=`numeric`,e.oid=`oid`,e.reltime=`reltime`,e.text=`text`,e.time=`time`,e.timestamp=`timestamp`,e.timestamptz=`timestamptz`,e.timetz=`timetz`,e.tsrange=`tsrange`,e.tstzrange=`tstzrange`})(D||={});var Lr=(e,t,n={})=>{let r=n.skipTypes??[];return t?Object.keys(t).reduce((n,i)=>(n[i]=Rr(i,e,t,r),n),{}):{}},Rr=(e,t,n,r)=>{let i=t.find(t=>t.name===e)?.type,a=n[e];return i&&!r.includes(i)?zr(i,a):Br(a)},zr=(e,t)=>{if(e.charAt(0)===`_`)return Wr(t,e.slice(1,e.length));switch(e){case D.bool:return Vr(t);case D.float4:case D.float8:case D.int2:case D.int4:case D.int8:case D.numeric:case D.oid:return Hr(t);case D.json:case D.jsonb:return Ur(t);case D.timestamp:return Gr(t);case D.abstime:case D.date:case D.daterange:case D.int4range:case D.int8range:case D.money:case D.reltime:case D.text:case D.time:case D.timestamptz:case D.timetz:case D.tsrange:case D.tstzrange:return Br(t);default:return Br(t)}},Br=e=>e,Vr=e=>{switch(e){case`t`:return!0;case`f`:return!1;default:return e}},Hr=e=>{if(typeof e==`string`){let t=parseFloat(e);if(!Number.isNaN(t))return t}return e},Ur=e=>{if(typeof e==`string`)try{return JSON.parse(e)}catch{return e}return e},Wr=(e,t)=>{if(typeof e!=`string`)return e;let n=e.length-1,r=e[n];if(e[0]===`{`&&r===`}`){let r,i=e.slice(1,n);try{r=JSON.parse(`[`+i+`]`)}catch{r=i?i.split(`,`):[]}return r.map(e=>zr(t,e))}return e},Gr=e=>typeof e==`string`?e.replace(` `,`T`):e,Kr=e=>{let t=new URL(e);return t.protocol=t.protocol.replace(/^ws/i,`http`),t.pathname=t.pathname.replace(/\/+$/,``).replace(/\/socket\/websocket$/i,``).replace(/\/socket$/i,``).replace(/\/websocket$/i,``),t.pathname===``||t.pathname===`/`?t.pathname=`/api/broadcast`:t.pathname+=`/api/broadcast`,t.href},qr=e=>typeof e==`function`?e:function(){return e},Jr=typeof self<`u`?self:null,Yr=typeof window<`u`?window:null,Xr=Jr||Yr||globalThis,Zr=`2.0.0`,Qr=1e4,$r=1e3,ei={connecting:0,open:1,closing:2,closed:3},ti={closed:`closed`,errored:`errored`,joined:`joined`,joining:`joining`,leaving:`leaving`},ni={close:`phx_close`,error:`phx_error`,join:`phx_join`,reply:`phx_reply`,leave:`phx_leave`},ri={longpoll:`longpoll`,websocket:`websocket`},ii={complete:4},ai=`base64url.bearer.phx.`,oi=class{constructor(e,t,n,r){this.channel=e,this.event=t,this.payload=n||function(){return{}},this.receivedResp=null,this.timeout=r,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(e){this.timeout=e,this.reset(),this.send()}send(){this.hasReceived(`timeout`)||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(e,t){return this.hasReceived(e)&&t(this.receivedResp.response),this.recHooks.push({status:e,callback:t}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:e,response:t,_ref:n}){this.recHooks.filter(t=>t.status===e).forEach(e=>e.callback(t))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,e=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=e,this.matchReceive(e)}),this.timeoutTimer=setTimeout(()=>{this.trigger(`timeout`,{})},this.timeout)}hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}trigger(e,t){this.channel.trigger(this.refEvent,{status:e,response:t})}},si=class{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries+=1,this.callback()},this.timerCalc(this.tries+1))}},ci=class{constructor(e,t,n){this.state=ti.closed,this.topic=e,this.params=qr(t||{}),this.socket=n,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new oi(this,ni.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new si(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive(`ok`,()=>{this.state=ti.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(e=>e.send()),this.pushBuffer=[]}),this.joinPush.receive(`error`,e=>{this.state=ti.errored,this.socket.hasLogger()&&this.socket.log(`channel`,`error ${this.topic}`,e),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log(`channel`,`close ${this.topic}`),this.state=ti.closed,this.socket.remove(this)}),this.onError(e=>{this.socket.hasLogger()&&this.socket.log(`channel`,`error ${this.topic}`,e),this.isJoining()&&this.joinPush.reset(),this.state=ti.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive(`timeout`,()=>{this.socket.hasLogger()&&this.socket.log(`channel`,`timeout ${this.topic}`,this.joinPush.timeout),new oi(this,ni.leave,qr({}),this.timeout).send(),this.state=ti.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(ni.reply,(e,t)=>{this.trigger(this.replyEventName(t),e)})}join(e=this.timeout){if(this.joinedOnce)throw Error(`tried to join multiple times. 'join' can only be called a single time per channel instance`);return this.timeout=e,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=ti.closed,this.bindings=[]}onClose(e){this.on(ni.close,e)}onError(e){return this.on(ni.error,t=>e(t))}on(e,t){let n=this.bindingRef++;return this.bindings.push({event:e,ref:n,callback:t}),n}off(e,t){this.bindings=this.bindings.filter(n=>!(n.event===e&&(t===void 0||t===n.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(e,t,n=this.timeout){if(t||={},!this.joinedOnce)throw Error(`tried to push '${e}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let r=new oi(this,e,function(){return t},n);return this.canPush()?r.send():(r.startTimeout(),this.pushBuffer.push(r)),r}leave(e=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=ti.leaving;let t=()=>{this.socket.hasLogger()&&this.socket.log(`channel`,`leave ${this.topic}`),this.trigger(ni.close,`leave`)},n=new oi(this,ni.leave,qr({}),e);return n.receive(`ok`,()=>t()).receive(`timeout`,()=>t()),n.send(),this.canPush()||n.trigger(`ok`,{}),n}onMessage(e,t,n){return t}filterBindings(e,t,n){return!0}isMember(e,t,n,r){return this.topic===e?r&&r!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log(`channel`,`dropping outdated message`,{topic:e,event:t,payload:n,joinRef:r}),!1):!0:!1}joinRef(){return this.joinPush.ref}rejoin(e=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=ti.joining,this.joinPush.resend(e))}trigger(e,t,n,r){let i=this.onMessage(e,t,n,r);if(t&&!i)throw Error(`channel onMessage callbacks must return the payload, modified or unmodified`);let a=this.bindings.filter(r=>r.event===e&&this.filterBindings(r,t,n));for(let e=0;e<a.length;e++)a[e].callback(i,n,r||this.joinRef())}replyEventName(e){return`chan_reply_${e}`}isClosed(){return this.state===ti.closed}isErrored(){return this.state===ti.errored}isJoined(){return this.state===ti.joined}isJoining(){return this.state===ti.joining}isLeaving(){return this.state===ti.leaving}},li=class{static request(e,t,n,r,i,a,o){if(Xr.XDomainRequest){let n=new Xr.XDomainRequest;return this.xdomainRequest(n,e,t,r,i,a,o)}else if(Xr.XMLHttpRequest){let s=new Xr.XMLHttpRequest;return this.xhrRequest(s,e,t,n,r,i,a,o)}else if(Xr.fetch&&Xr.AbortController)return this.fetchRequest(e,t,n,r,i,a,o);else throw Error(`No suitable XMLHttpRequest implementation found`)}static fetchRequest(e,t,n,r,i,a,o){let s={method:e,headers:n,body:r},c=null;return i&&(c=new AbortController,setTimeout(()=>c.abort(),i),s.signal=c.signal),Xr.fetch(t,s).then(e=>e.text()).then(e=>this.parseJSON(e)).then(e=>o&&o(e)).catch(e=>{e.name===`AbortError`&&a?a():o&&o(null)}),c}static xdomainRequest(e,t,n,r,i,a,o){return e.timeout=i,e.open(t,n),e.onload=()=>{let t=this.parseJSON(e.responseText);o&&o(t)},a&&(e.ontimeout=a),e.onprogress=()=>{},e.send(r),e}static xhrRequest(e,t,n,r,i,a,o,s){e.open(t,n,!0),e.timeout=a;for(let[t,n]of Object.entries(r))e.setRequestHeader(t,n);return e.onerror=()=>s&&s(null),e.onreadystatechange=()=>{e.readyState===ii.complete&&s&&s(this.parseJSON(e.responseText))},o&&(e.ontimeout=o),e.send(i),e}static parseJSON(e){if(!e||e===``)return null;try{return JSON.parse(e)}catch{return console&&console.log(`failed to parse JSON response`,e),null}}static serialize(e,t){let n=[];for(var r in e){if(!Object.prototype.hasOwnProperty.call(e,r))continue;let i=t?`${t}[${r}]`:r,a=e[r];typeof a==`object`?n.push(this.serialize(a,i)):n.push(encodeURIComponent(i)+`=`+encodeURIComponent(a))}return n.join(`&`)}static appendParams(e,t){return Object.keys(t).length===0?e:`${e}${e.match(/\?/)?`&`:`?`}${this.serialize(t)}`}},ui=e=>{let t=``,n=new Uint8Array(e),r=n.byteLength;for(let e=0;e<r;e++)t+=String.fromCharCode(n[e]);return btoa(t)},di=class{constructor(e,t){t&&t.length===2&&t[1].startsWith(ai)&&(this.authToken=atob(t[1].slice(ai.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(e),this.readyState=ei.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(e){return e.replace(`ws://`,`http://`).replace(`wss://`,`https://`).replace(RegExp(`(.*)/`+ri.websocket),`$1/`+ri.longpoll)}endpointURL(){return li.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(e,t,n){this.close(e,t,n),this.readyState=ei.connecting}ontimeout(){this.onerror(`timeout`),this.closeAndRetry(1005,`timeout`,!1)}isActive(){return this.readyState===ei.open||this.readyState===ei.connecting}poll(){let e={Accept:`application/json`};this.authToken&&(e[`X-Phoenix-AuthToken`]=this.authToken),this.ajax(`GET`,e,null,()=>this.ontimeout(),e=>{if(e){var{status:t,token:n,messages:r}=e;if(t===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,`session_gone`,!1);return}this.token=n}else t=0;switch(t){case 200:r.forEach(e=>{setTimeout(()=>this.onmessage({data:e}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=ei.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,`forbidden`,!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,`internal server error`,500);break;default:throw Error(`unhandled poll status ${t}`)}})}send(e){typeof e!=`string`&&(e=ui(e)),this.currentBatch?this.currentBatch.push(e):this.awaitingBatchAck?this.batchBuffer.push(e):(this.currentBatch=[e],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(e){this.awaitingBatchAck=!0,this.ajax(`POST`,{"Content-Type":`application/x-ndjson`},e.join(`
`),()=>this.onerror(`timeout`),e=>{this.awaitingBatchAck=!1,!e||e.status!==200?(this.onerror(e&&e.status),this.closeAndRetry(1011,`internal server error`,!1)):this.batchBuffer.length>0&&(this.batchSend(this.batchBuffer),this.batchBuffer=[])})}close(e,t,n){for(let e of this.reqs)e.abort();this.readyState=ei.closed;let r=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:e,reason:t,wasClean:n});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<`u`?this.onclose(new CloseEvent(`close`,r)):this.onclose(r)}ajax(e,t,n,r,i){let a;a=li.request(e,this.endpointURL(),t,n,this.timeout,()=>{this.reqs.delete(a),r()},e=>{this.reqs.delete(a),this.isActive()&&i(e)}),this.reqs.add(a)}},fi=class e{constructor(t,n={}){let r=n.events||{state:`presence_state`,diff:`presence_diff`};this.state={},this.pendingDiffs=[],this.channel=t,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(r.state,t=>{let{onJoin:n,onLeave:r,onSync:i}=this.caller;this.joinRef=this.channel.joinRef(),this.state=e.syncState(this.state,t,n,r),this.pendingDiffs.forEach(t=>{this.state=e.syncDiff(this.state,t,n,r)}),this.pendingDiffs=[],i()}),this.channel.on(r.diff,t=>{let{onJoin:n,onLeave:r,onSync:i}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(t):(this.state=e.syncDiff(this.state,t,n,r),i())})}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(t){return e.list(this.state,t)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,t,n,r){let i=this.clone(e),a={},o={};return this.map(i,(e,n)=>{t[e]||(o[e]=n)}),this.map(t,(e,t)=>{let n=i[e];if(n){let r=t.metas.map(e=>e.phx_ref),i=n.metas.map(e=>e.phx_ref),s=t.metas.filter(e=>i.indexOf(e.phx_ref)<0),c=n.metas.filter(e=>r.indexOf(e.phx_ref)<0);s.length>0&&(a[e]=t,a[e].metas=s),c.length>0&&(o[e]=this.clone(n),o[e].metas=c)}else a[e]=t}),this.syncDiff(i,{joins:a,leaves:o},n,r)}static syncDiff(e,t,n,r){let{joins:i,leaves:a}=this.clone(t);return n||=function(){},r||=function(){},this.map(i,(t,r)=>{let i=e[t];if(e[t]=this.clone(r),i){let n=e[t].metas.map(e=>e.phx_ref),r=i.metas.filter(e=>n.indexOf(e.phx_ref)<0);e[t].metas.unshift(...r)}n(t,i,r)}),this.map(a,(t,n)=>{let i=e[t];if(!i)return;let a=n.metas.map(e=>e.phx_ref);i.metas=i.metas.filter(e=>a.indexOf(e.phx_ref)<0),r(t,i,n),i.metas.length===0&&delete e[t]}),e}static list(e,t){return t||=function(e,t){return t},this.map(e,(e,n)=>t(e,n))}static map(e,t){return Object.getOwnPropertyNames(e).map(n=>t(n,e[n]))}static clone(e){return JSON.parse(JSON.stringify(e))}},pi={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(e,t){if(e.payload.constructor===ArrayBuffer)return t(this.binaryEncode(e));{let n=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(n))}},decode(e,t){if(e.constructor===ArrayBuffer)return t(this.binaryDecode(e));{let[n,r,i,a,o]=JSON.parse(e);return t({join_ref:n,ref:r,topic:i,event:a,payload:o})}},binaryEncode(e){let{join_ref:t,ref:n,event:r,topic:i,payload:a}=e,o=this.META_LENGTH+t.length+n.length+i.length+r.length,s=new ArrayBuffer(this.HEADER_LENGTH+o),c=new DataView(s),l=0;c.setUint8(l++,this.KINDS.push),c.setUint8(l++,t.length),c.setUint8(l++,n.length),c.setUint8(l++,i.length),c.setUint8(l++,r.length),Array.from(t,e=>c.setUint8(l++,e.charCodeAt(0))),Array.from(n,e=>c.setUint8(l++,e.charCodeAt(0))),Array.from(i,e=>c.setUint8(l++,e.charCodeAt(0))),Array.from(r,e=>c.setUint8(l++,e.charCodeAt(0)));var u=new Uint8Array(s.byteLength+a.byteLength);return u.set(new Uint8Array(s),0),u.set(new Uint8Array(a),s.byteLength),u.buffer},binaryDecode(e){let t=new DataView(e),n=t.getUint8(0),r=new TextDecoder;switch(n){case this.KINDS.push:return this.decodePush(e,t,r);case this.KINDS.reply:return this.decodeReply(e,t,r);case this.KINDS.broadcast:return this.decodeBroadcast(e,t,r)}},decodePush(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=this.HEADER_LENGTH+this.META_LENGTH-1,s=n.decode(e.slice(o,o+r));o+=r;let c=n.decode(e.slice(o,o+i));o+=i;let l=n.decode(e.slice(o,o+a));return o+=a,{join_ref:s,ref:null,topic:c,event:l,payload:e.slice(o,e.byteLength)}},decodeReply(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=t.getUint8(4),s=this.HEADER_LENGTH+this.META_LENGTH,c=n.decode(e.slice(s,s+r));s+=r;let l=n.decode(e.slice(s,s+i));s+=i;let u=n.decode(e.slice(s,s+a));s+=a;let d=n.decode(e.slice(s,s+o));s+=o;let f={status:d,response:e.slice(s,e.byteLength)};return{join_ref:c,ref:l,topic:u,event:ni.reply,payload:f}},decodeBroadcast(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=this.HEADER_LENGTH+2,o=n.decode(e.slice(a,a+r));a+=r;let s=n.decode(e.slice(a,a+i));return a+=i,{join_ref:null,ref:null,topic:o,event:s,payload:e.slice(a,e.byteLength)}}},mi=class{constructor(e,t={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=t.timeout||Qr,this.transport=t.transport||Xr.WebSocket||di,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=t.longPollFallbackMs,this.fallbackTimer=null,this.sessionStore=t.sessionStorage||Xr&&Xr.sessionStorage,this.establishedConnections=0,this.defaultEncoder=pi.encode.bind(pi),this.defaultDecoder=pi.decode.bind(pi),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=t.binaryType||`arraybuffer`,this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport===di?(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder):(this.encode=t.encode||this.defaultEncoder,this.decode=t.decode||this.defaultDecoder);let n=null;Yr&&Yr.addEventListener&&(Yr.addEventListener(`pagehide`,e=>{this.conn&&(this.disconnect(),n=this.connectClock)}),Yr.addEventListener(`pageshow`,e=>{n===this.connectClock&&(n=null,this.connect())}),Yr.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=t.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=t.autoSendHeartbeat??!0,this.heartbeatCallback=t.heartbeatCallback??(()=>{}),this.rejoinAfterMs=e=>t.rejoinAfterMs?t.rejoinAfterMs(e):[1e3,2e3,5e3][e-1]||1e4,this.reconnectAfterMs=e=>t.reconnectAfterMs?t.reconnectAfterMs(e):[10,50,100,150,200,250,500,1e3,2e3][e-1]||5e3,this.logger=t.logger||null,!this.logger&&t.debug&&(this.logger=(e,t,n)=>{console.log(`${e}: ${t}`,n)}),this.longpollerTimeout=t.longpollerTimeout||2e4,this.params=qr(t.params||{}),this.endPoint=`${e}/${ri.websocket}`,this.vsn=t.vsn||Zr,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new si(()=>{if(this.pageHidden){this.log(`Not reconnecting as page is hidden!`),this.teardown();return}this.teardown(async()=>{t.beforeReconnect&&await t.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=t.authToken}getLongPollTransport(){return di}replaceTransport(e){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&=(this.conn.close(),null),this.transport=e}protocol(){return location.protocol.match(/^https/)?`wss`:`ws`}endPointURL(){let e=li.appendParams(li.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return e.charAt(0)===`/`?e.charAt(1)===`/`?`${this.protocol()}:${e}`:`${this.protocol()}://${location.host}${e}`:e}disconnect(e,t,n){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,e&&e()},t,n)}connect(e){e&&(console&&console.log(`passing params to connect is deprecated. Instead pass :params to the Socket constructor`),this.params=qr(e)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==di?this.connectWithFallback(di,this.longPollFallbackMs):this.transportConnect())}log(e,t,n){this.logger&&this.logger(e,t,n)}hasLogger(){return this.logger!==null}onOpen(e){let t=this.makeRef();return this.stateChangeCallbacks.open.push([t,e]),t}onClose(e){let t=this.makeRef();return this.stateChangeCallbacks.close.push([t,e]),t}onError(e){let t=this.makeRef();return this.stateChangeCallbacks.error.push([t,e]),t}onMessage(e){let t=this.makeRef();return this.stateChangeCallbacks.message.push([t,e]),t}onHeartbeat(e){this.heartbeatCallback=e}ping(e){if(!this.isConnected())return!1;let t=this.makeRef(),n=Date.now();this.push({topic:`phoenix`,event:`heartbeat`,payload:{},ref:t});let r=this.onMessage(i=>{i.ref===t&&(this.off([r]),e(Date.now()-n))});return!0}transportName(e){switch(e){case di:return`LongPoll`;default:return e.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let e;this.authToken&&(e=[`phoenix`,`${ai}${btoa(this.authToken).replace(/=/g,``)}`]),this.conn=new this.transport(this.endPointURL(),e),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(e){return this.sessionStore&&this.sessionStore.getItem(e)}storeSession(e,t){this.sessionStore&&this.sessionStore.setItem(e,t)}connectWithFallback(e,t=2500){clearTimeout(this.fallbackTimer);let n=!1,r=!0,i,a=this.transportName(e),o=t=>{this.log(`transport`,`falling back to ${a}...`,t),this.off([void 0,i]),r=!1,this.replaceTransport(e),this.transportConnect()};if(this.getSession(`phx:fallback:${a}`))return o(`memorized`);this.fallbackTimer=setTimeout(o,t),i=this.onError(e=>{this.log(`transport`,`error`,e),r&&!n&&(clearTimeout(this.fallbackTimer),o(e))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(n=!0,!r){let t=this.transportName(e);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${t}`,`true`),this.log(`transport`,`established ${t} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(o,t),this.ping(e=>{this.log(`transport`,`connected to primary after`,e),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log(`transport`,`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks(`open`)}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log(`transport`,`heartbeat timeout. Attempting to re-establish connection`);try{this.heartbeatCallback(`timeout`)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}this.triggerChanError(Error(`heartbeat timeout`)),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),$r,`heartbeat timeout`)}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(e,t,n){if(!this.conn)return e&&e();let r=this.conn;this.waitForBufferDone(r,()=>{t?r.close(t,n||``):r.close(),this.waitForSocketClosed(r,()=>{this.conn===r&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),e&&e()})})}waitForBufferDone(e,t,n=1){if(n===5||!e.bufferedAmount){t();return}setTimeout(()=>{this.waitForBufferDone(e,t,n+1)},150*n)}waitForSocketClosed(e,t,n=1){if(n===5||e.readyState===ei.closed){t();return}setTimeout(()=>{this.waitForSocketClosed(e,t,n+1)},150*n)}onConnClose(e){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log(`transport`,`close`,e),this.triggerChanError(e),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks(`close`,e)}onConnError(e){this.hasLogger()&&this.log(`transport`,`error`,e);let t=this.transport,n=this.establishedConnections;this.triggerStateCallbacks(`error`,e,t,n),(t===this.transport||n>0)&&this.triggerChanError(e)}triggerChanError(e){this.channels.forEach(t=>{t.isErrored()||t.isLeaving()||t.isClosed()||t.trigger(ni.error,e)})}connectionState(){switch(this.conn&&this.conn.readyState){case ei.connecting:return`connecting`;case ei.open:return`open`;case ei.closing:return`closing`;default:return`closed`}}isConnected(){return this.connectionState()===`open`}remove(e){this.off(e.stateChangeRefs),this.channels=this.channels.filter(t=>t!==e)}off(e){for(let t in this.stateChangeCallbacks)this.stateChangeCallbacks[t]=this.stateChangeCallbacks[t].filter(([t])=>e.indexOf(t)===-1)}channel(e,t={}){let n=new ci(e,t,this);return this.channels.push(n),n}push(e){if(this.hasLogger()){let{topic:t,event:n,payload:r,ref:i,join_ref:a}=e;this.log(`push`,`${t} ${n} (${a}, ${i})`,r)}this.isConnected()?this.encode(e,e=>this.conn.send(e)):this.sendBuffer.push(()=>this.encode(e,e=>this.conn.send(e)))}makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback(`disconnected`)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:`phoenix`,event:`heartbeat`,payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback(`sent`)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}onConnMessage(e){this.decode(e.data,e=>{let{topic:t,event:n,payload:r,ref:i,join_ref:a}=e;if(i&&i===this.pendingHeartbeatRef){let e=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(r.status===`ok`?`ok`:`error`,e)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log(`receive`,`${r.status||``} ${t} ${n} ${i&&`(`+i+`)`||``}`.trim(),r);for(let e=0;e<this.channels.length;e++){let o=this.channels[e];o.isMember(t,n,r,a)&&o.trigger(n,r,i,a)}this.triggerStateCallbacks(`message`,e)})}triggerStateCallbacks(e,...t){try{this.stateChangeCallbacks[e].forEach(([n,r])=>{try{r(...t)}catch(t){this.log(`error`,`error in ${e} callback`,t)}})}catch(t){this.log(`error`,`error triggering ${e} callbacks`,t)}}leaveOpenTopic(e){let t=this.channels.find(t=>t.topic===e&&(t.isJoined()||t.isJoining()));t&&(this.hasLogger()&&this.log(`transport`,`leaving duplicate topic "${e}"`),t.leave())}},hi=class e{constructor(t,n){let r=vi(n);this.presence=new fi(t.getChannel(),r),this.presence.onJoin((n,r,i)=>{let a=e.onJoinPayload(n,r,i);t.getChannel().trigger(`presence`,a)}),this.presence.onLeave((n,r,i)=>{let a=e.onLeavePayload(n,r,i);t.getChannel().trigger(`presence`,a)}),this.presence.onSync(()=>{t.getChannel().trigger(`presence`,{event:`sync`})})}get state(){return e.transformState(this.presence.state)}static transformState(e){return e=_i(e),Object.getOwnPropertyNames(e).reduce((t,n)=>{let r=e[n];return t[n]=gi(r),t},{})}static onJoinPayload(e,t,n){return{event:`join`,key:e,currentPresences:yi(t),newPresences:gi(n)}}static onLeavePayload(e,t,n){return{event:`leave`,key:e,currentPresences:yi(t),leftPresences:gi(n)}}};function gi(e){return e.metas.map(e=>(e.presence_ref=e.phx_ref,delete e.phx_ref,delete e.phx_ref_prev,e))}function _i(e){return JSON.parse(JSON.stringify(e))}function vi(e){return e?.events&&{events:e.events}}function yi(e){return e?.metas?gi(e):[]}var bi;(function(e){e.SYNC=`sync`,e.JOIN=`join`,e.LEAVE=`leave`})(bi||={});var xi=class{get state(){return this.presenceAdapter.state}constructor(e,t){this.channel=e,this.presenceAdapter=new hi(this.channel.channelAdapter,t)}};function Si(e){if(e instanceof Error)return e;if(typeof e==`string`)return Error(e);if(e&&typeof e==`object`){let t=e;if(typeof t.code==`number`){let n=typeof t.reason==`string`&&t.reason?` (${t.reason})`:``;return Error(`socket closed: ${t.code}${n}`,{cause:e})}return Error(`channel error: transport failure`,{cause:e})}return Error(`channel error: connection lost`)}var Ci=class{constructor(e,t,n){let r=wi(n);this.channel=e.getSocket().channel(t,r),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,t){return this.channel.on(e,t)}off(e,t){this.channel.off(e,t)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,t,n){let r;try{r=this.channel.push(e,t,n)}catch{throw Error(`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>100){let e=this.channel.pushBuffer.shift();e.cancelTimeout(),this.socket.log(`channel`,`discarded push due to buffer overflow: ${e.event}`,e.payload())}return r}updateJoinPayload(e){let t=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},t),e)}canPush(){return this.socket.isConnected()&&this.state===Nr.joined}isJoined(){return this.state===Nr.joined}isJoining(){return this.state===Nr.joining}isClosed(){return this.state===Nr.closed}isLeaving(){return this.state===Nr.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}};function wi(e){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:``,enabled:!1},private:!1},e.config)}}var Ti;(function(e){e.ALL=`*`,e.INSERT=`INSERT`,e.UPDATE=`UPDATE`,e.DELETE=`DELETE`})(Ti||={});var Ei;(function(e){e.BROADCAST=`broadcast`,e.PRESENCE=`presence`,e.POSTGRES_CHANGES=`postgres_changes`,e.SYSTEM=`system`})(Ei||={});var Di;(function(e){e.SUBSCRIBED=`SUBSCRIBED`,e.TIMED_OUT=`TIMED_OUT`,e.CLOSED=`CLOSED`,e.CHANNEL_ERROR=`CHANNEL_ERROR`})(Di||={});var Oi=class e{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,t={config:{}},n){if(this.topic=e,this.params=t,this.socket=n,this.bindings={},this.subTopic=e.replace(/^realtime:/i,``),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:``,enabled:!1},private:!1},t.config),this.channelAdapter=new Ci(this.socket.socketAdapter,e,this.params),this.presence=new xi(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=Kr(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&this.params.config?.broadcast?.replay)throw Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(e,t=this.timeout){if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){let{config:{broadcast:n,presence:r,private:i}}=this.params,a=this.bindings.postgres_changes?.map(e=>e.filter)??[],o=!!this.bindings[Ei.PRESENCE]&&this.bindings[Ei.PRESENCE].length>0||this.params.config.presence?.enabled===!0,s={},c={broadcast:n,presence:Object.assign(Object.assign({},r),{enabled:o}),postgres_changes:a,private:i};this.socket.accessTokenValue&&(s.access_token=this.socket.accessTokenValue),this._onError(t=>{e?.(Di.CHANNEL_ERROR,Si(t))}),this._onClose(()=>e?.(Di.CLOSED)),this.updateJoinPayload(Object.assign({config:c},s)),this._updateFilterMessage(),this.channelAdapter.subscribe(t).receive(`ok`,async({postgres_changes:t})=>{if(this.socket._isManualToken()||this.socket.setAuth(),t===void 0){e?.(Di.SUBSCRIBED);return}this._updatePostgresBindings(t,e)}).receive(`error`,t=>{this.state=Nr.errored;let n=Object.values(t).join(`, `)||`error`;e?.(Di.CHANNEL_ERROR,Error(n,{cause:t}))}).receive(`timeout`,()=>{e?.(Di.TIMED_OUT)})}return this}_updatePostgresBindings(t,n){let r=this.bindings.postgres_changes,i=r?.length??0,a=[];for(let o=0;o<i;o++){let i=r[o],{filter:{event:s,schema:c,table:l,filter:u}}=i,d=t&&t[o];if(d&&d.event===s&&e.isFilterValueEqual(d.schema,c)&&e.isFilterValueEqual(d.table,l)&&e.isFilterValueEqual(d.filter,u))a.push(Object.assign(Object.assign({},i),{id:d.id}));else{this.unsubscribe(),this.state=Nr.errored,n?.(Di.CHANNEL_ERROR,Error(`mismatch between server and client bindings for postgres changes`));return}}this.bindings.postgres_changes=a,this.state!=Nr.errored&&n&&n(Di.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:`presence`,event:`track`,payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:`presence`,event:`untrack`},e)}on(e,t,n){let r=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),i=e===Ei.PRESENCE||e===Ei.POSTGRES_CHANGES;if(r&&i)throw this.socket.log(`channel`,`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,t,n)}async httpSend(e,t,n={}){if(t==null)return Promise.reject(Error(`Payload is required for httpSend()`));let r={apikey:this.socket.apiKey?this.socket.apiKey:``,"Content-Type":`application/json`};this.socket.accessTokenValue&&(r.Authorization=`Bearer ${this.socket.accessTokenValue}`);let i={method:`POST`,headers:r,body:JSON.stringify({messages:[{topic:this.subTopic,event:e,payload:t,private:this.private}]})},a=await this._fetchWithTimeout(this.broadcastEndpointURL,i,n.timeout??this.timeout);if(a.status===202)return{success:!0};let o=a.statusText;try{let e=await a.json();o=e.error||e.message||o}catch{}return Promise.reject(Error(o))}async send(e,t={}){if(!this.channelAdapter.canPush()&&e.type===`broadcast`){console.warn(`Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.`);let{event:n,payload:r}=e,i={apikey:this.socket.apiKey?this.socket.apiKey:``,"Content-Type":`application/json`};this.socket.accessTokenValue&&(i.Authorization=`Bearer ${this.socket.accessTokenValue}`);let a={method:`POST`,headers:i,body:JSON.stringify({messages:[{topic:this.subTopic,event:n,payload:r,private:this.private}]})};try{let e=await this._fetchWithTimeout(this.broadcastEndpointURL,a,t.timeout??this.timeout);return await e.body?.cancel(),e.ok?`ok`:`error`}catch(e){return e instanceof Error&&e.name===`AbortError`?`timed out`:`error`}}else return new Promise(n=>{let r=this.channelAdapter.push(e.type,e,t.timeout||this.timeout);e.type===`broadcast`&&!this.params?.config?.broadcast?.ack&&n(`ok`),r.receive(`ok`,()=>n(`ok`)),r.receive(`error`,()=>n(`error`)),r.receive(`timeout`,()=>n(`timed out`))})}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise(t=>{this.channelAdapter.unsubscribe(e).receive(`ok`,()=>t(`ok`)).receive(`timeout`,()=>t(`timed out`)).receive(`error`,()=>t(`error`))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,t,n){let r=new AbortController,i=setTimeout(()=>r.abort(),n),a=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:r.signal}));return clearTimeout(i),a}_on(e,t,n){let r=e.toLocaleLowerCase(),i={type:r,filter:t,callback:n,ref:this.channelAdapter.on(e,n)};return this.bindings[r]?this.bindings[r].push(i):this.bindings[r]=[i],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((e,t,n)=>{let r=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(r,n))return!1;let i=this.bindings[r]?.find(t=>t.ref===e.ref);if(!i)return!0;if([`broadcast`,`presence`,`postgres_changes`].includes(r))if(`id`in i){let e=i.id,n=i.filter?.event;return e&&t.ids?.includes(e)&&(n===`*`||n?.toLocaleLowerCase()===t.data?.type.toLocaleLowerCase())}else{let e=(i?.filter?.event)?.toLocaleLowerCase();return e===`*`||e===(t?.event)?.toLocaleLowerCase()}else return i.type.toLocaleLowerCase()===r})}_notThisChannelEvent(e,t){let{close:n,error:r,leave:i,join:a}=Pr;return t&&[n,r,i,a].includes(e)&&t!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((e,t,n)=>{if(typeof t==`object`&&`ids`in t){let e=t.data,{schema:n,table:r,commit_timestamp:i,type:a,errors:o}=e;return Object.assign(Object.assign({},{schema:n,table:r,commit_timestamp:i,eventType:a,new:{},old:{},errors:o}),this._getPayloadRecords(e))}return t})}copyBindings(e){if(this.joinedOnce)throw Error(`cannot copy bindings into joined channel`);for(let t in e.bindings)for(let n of e.bindings[t])this._on(n.type,n.filter,n.callback)}static isFilterValueEqual(e,t){return(e??void 0)===(t??void 0)}_getPayloadRecords(e){let t={new:{},old:{}};return(e.type===`INSERT`||e.type===`UPDATE`)&&(t.new=Lr(e.columns,e.record)),(e.type===`UPDATE`||e.type===`DELETE`)&&(t.old=Lr(e.columns,e.old_record)),t}},ki=class{constructor(e,t){this.socket=new mi(e,t)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,t,n,r=1e4){return new Promise(i=>{setTimeout(()=>i(`timeout`),r),this.socket.disconnect(()=>{e(),i(`ok`)},t,n)})}push(e){this.socket.push(e)}log(e,t,n){this.socket.log(e,t,n)}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==Fr.connecting}isDisconnecting(){return this.socket.connectionState()==Fr.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}},Ai={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},ji=[1e3,2e3,5e3,1e4],Mi=1e4,Ni=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`,Pi=class{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,t){if(this.channels=[],this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint=``,this.headers={},this.params={},this.ref=0,this.serializer=new Ir,this._manuallySetToken=!1,this._authPromise=null,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._pendingDisconnectTimer=null,this._disconnectOnEmptyChannelsAfterMs=0,this._resolveFetch=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),!t?.params?.apikey)throw Error(`API key is required to connect to Realtime`);this.apiKey=t.params.apikey;let n=this._initializeOptions(t);this.socketAdapter=new ki(e,n),this.httpEndpoint=Kr(e),this.fetch=this._resolveFetch(t?.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely(`connect`),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){let t=e.message;throw t.includes(`Node.js`)?Error(`${t}\n\nTo use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):Error(`WebSocket not available: ${t}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,t){return this._cancelPendingDisconnect(),this.isDisconnecting()?`ok`:await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},e,t)}getChannels(){return this.channels}async removeChannel(e){let t=await e.unsubscribe();return t===`ok`&&e.teardown(),t}async removeAllChannels(){let e=this.channels.map(async e=>{let t=await e.unsubscribe();return e.teardown(),t}),t=await Promise.all(e);return await this.disconnect(),t}log(e,t,n){this.socketAdapter.log(e,t,n)}connectionState(){return this.socketAdapter.connectionState()||Fr.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,t={config:{}}){let n=`realtime:${e}`,r=this.getChannels().find(e=>e.topic===n);if(r)return r;{let n=new Oi(`realtime:${e}`,t,this);return this._cancelPendingDisconnect(),this.channels.push(n),n}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic),this.channels.length===0&&(this.log(`transport`,`no channels remaining, scheduling disconnect`),this._schedulePendingDisconnect())}_schedulePendingDisconnect(){if(this._cancelPendingDisconnect(),this._disconnectOnEmptyChannelsAfterMs===0){this.log(`transport`,`disconnecting immediately - no channels`),this.disconnect();return}this._pendingDisconnectTimer=setTimeout(()=>{this._pendingDisconnectTimer=null,this.channels.length===0&&(this.log(`transport`,`deferred disconnect fired - no channels, disconnecting`),this.disconnect())},this._disconnectOnEmptyChannelsAfterMs),this.log(`transport`,`deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`)}_cancelPendingDisconnect(){this._pendingDisconnectTimer!==null&&(this.log(`transport`,`pending disconnect cancelled - channel activity detected`),clearTimeout(this._pendingDisconnectTimer),this._pendingDisconnectTimer=null)}async _performAuth(e=null){let t,n=!1;if(e)t=e,n=!0;else if(this.accessToken)try{t=await this.accessToken()}catch(e){this.log(`error`,`Error fetching access token from callback`,e),t=this.accessTokenValue}else t=this.accessTokenValue;n?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=t&&(this.accessTokenValue=t,this.channels.forEach(e=>{let n={access_token:t,version:Or};t&&e.updateJoinPayload(n),e.joinedOnce&&e.channelAdapter.isJoined()&&e.channelAdapter.push(Pr.access_token,{access_token:t})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e=`general`){this._isManualToken()||this.setAuth().catch(t=>{this.log(`error`,`Error setting auth in ${e}`,t)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(e=>{this.log(`error`,`error waiting for auth on connect`,e)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(t,n)=>{t==`sent`&&this._setAuthSafely(),e&&e(t,n)}}_startWorkerHeartbeat(){this.workerUrl?this.log(`worker`,`starting worker for from ${this.workerUrl}`):this.log(`worker`,`starting default worker`);let e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=e=>{this.log(`worker`,`worker error`,e.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=e=>{e.data.event===`keepAlive`&&this.sendHeartbeat()},this.workerRef.postMessage({event:`start`,interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&=(this.log(`worker`,`terminating worker`),this.workerRef.terminate(),void 0)}_workerObjectUrl(e){let t;if(e)t=e;else{let e=new Blob([Ni],{type:`application/javascript`});t=URL.createObjectURL(e)}return t}_initializeOptions(e){this.worker=e?.worker??!1,this.accessToken=e?.accessToken??null;let t={};t.timeout=e?.timeout??Mr,t.heartbeatIntervalMs=e?.heartbeatIntervalMs??Ai.HEARTBEAT_INTERVAL,this._disconnectOnEmptyChannelsAfterMs=e?.disconnectOnEmptyChannelsAfterMs??2*(e?.heartbeatIntervalMs??Ai.HEARTBEAT_INTERVAL),t.transport=e?.transport??Dr.getWebSocketConstructor(),t.params=e?.params,t.logger=e?.logger,t.heartbeatCallback=this._wrapHeartbeatCallback(e?.heartbeatCallback),t.reconnectAfterMs=e?.reconnectAfterMs??(e=>ji[e-1]||Mi);let n,r,i=e?.vsn??jr;switch(i){case kr:n=(e,t)=>t(JSON.stringify(e)),r=(e,t)=>t(JSON.parse(e));break;case Ar:n=this.serializer.encode.bind(this.serializer),r=this.serializer.decode.bind(this.serializer);break;default:throw Error(`Unsupported serializer version: ${t.vsn}`)}if(t.vsn=i,t.encode=e?.encode??n,t.decode=e?.decode??r,t.beforeReconnect=this._reconnectAuth.bind(this),(e?.logLevel||e?.log_level)&&(this.logLevel=e.logLevel||e.log_level,t.params=Object.assign(Object.assign({},t.params),{log_level:this.logLevel})),this.worker){if(typeof window<`u`&&!window.Worker)throw Error(`Web Worker is not supported`);this.workerUrl=e?.workerUrl,t.autoSendHeartbeat=!this.worker}return t}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}},Fi=class extends Error{constructor(e,t){super(e),this.name=`IcebergError`,this.status=t.status,this.icebergType=t.icebergType,this.icebergCode=t.icebergCode,this.details=t.details,this.isCommitStateUnknown=t.icebergType===`CommitStateUnknownException`||[500,502,504].includes(t.status)&&t.icebergType?.includes(`CommitState`)===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function Ii(e,t,n){let r=new URL(t,e);if(n)for(let[e,t]of Object.entries(n))t!==void 0&&r.searchParams.set(e,t);return r.toString()}async function Li(e){return!e||e.type===`none`?{}:e.type===`bearer`?{Authorization:`Bearer ${e.token}`}:e.type===`header`?{[e.name]:e.value}:e.type===`custom`?await e.getHeaders():{}}function Ri(e){let t=e.fetchImpl??globalThis.fetch;return{async request({method:n,path:r,query:i,body:a,headers:o}){let s=Ii(e.baseUrl,r,i),c=await Li(e.auth),l=await t(s,{method:n,headers:{...a?{"Content-Type":`application/json`}:{},...c,...o},body:a?JSON.stringify(a):void 0}),u=await l.text(),d=(l.headers.get(`content-type`)||``).includes(`application/json`),f=d&&u?JSON.parse(u):u;if(!l.ok){let e=d?f:void 0,t=e?.error;throw new Fi(t?.message??`Request failed with status ${l.status}`,{status:l.status,icebergType:t?.type,icebergCode:t?.code,details:e})}return{status:l.status,headers:l.headers,data:f}}}}function zi(e){return e.join(``)}var Bi=class{constructor(e,t=``){this.client=e,this.prefix=t}async listNamespaces(e){let t=e?{parent:zi(e.namespace)}:void 0;return(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces`,query:t})).data.namespaces.map(e=>({namespace:e}))}async createNamespace(e,t){let n={namespace:e.namespace,properties:t?.properties};return(await this.client.request({method:`POST`,path:`${this.prefix}/namespaces`,body:n})).data}async dropNamespace(e){await this.client.request({method:`DELETE`,path:`${this.prefix}/namespaces/${zi(e.namespace)}`})}async loadNamespaceMetadata(e){return{properties:(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces/${zi(e.namespace)}`})).data.properties}}async namespaceExists(e){try{return await this.client.request({method:`HEAD`,path:`${this.prefix}/namespaces/${zi(e.namespace)}`}),!0}catch(e){if(e instanceof Fi&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(e,t){try{return await this.createNamespace(e,t)}catch(e){if(e instanceof Fi&&e.status===409)return;throw e}}};function Vi(e){return e.join(``)}var Hi=class{constructor(e,t=``,n){this.client=e,this.prefix=t,this.accessDelegation=n}async listTables(e){return(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces/${Vi(e.namespace)}/tables`})).data.identifiers}async createTable(e,t){let n={};return this.accessDelegation&&(n[`X-Iceberg-Access-Delegation`]=this.accessDelegation),(await this.client.request({method:`POST`,path:`${this.prefix}/namespaces/${Vi(e.namespace)}/tables`,body:t,headers:n})).data.metadata}async updateTable(e,t){let n=await this.client.request({method:`POST`,path:`${this.prefix}/namespaces/${Vi(e.namespace)}/tables/${e.name}`,body:t});return{"metadata-location":n.data[`metadata-location`],metadata:n.data.metadata}}async dropTable(e,t){await this.client.request({method:`DELETE`,path:`${this.prefix}/namespaces/${Vi(e.namespace)}/tables/${e.name}`,query:{purgeRequested:String(t?.purge??!1)}})}async loadTable(e){let t={};return this.accessDelegation&&(t[`X-Iceberg-Access-Delegation`]=this.accessDelegation),(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces/${Vi(e.namespace)}/tables/${e.name}`,headers:t})).data.metadata}async tableExists(e){let t={};this.accessDelegation&&(t[`X-Iceberg-Access-Delegation`]=this.accessDelegation);try{return await this.client.request({method:`HEAD`,path:`${this.prefix}/namespaces/${Vi(e.namespace)}/tables/${e.name}`,headers:t}),!0}catch(e){if(e instanceof Fi&&e.status===404)return!1;throw e}}async createTableIfNotExists(e,t){try{return await this.createTable(e,t)}catch(n){if(n instanceof Fi&&n.status===409)return await this.loadTable({namespace:e.namespace,name:t.name});throw n}}},Ui=class{constructor(e){let t=`v1`;e.catalogName&&(t+=`/${e.catalogName}`);let n=e.baseUrl.endsWith(`/`)?e.baseUrl:`${e.baseUrl}/`;this.client=Ri({baseUrl:n,auth:e.auth,fetchImpl:e.fetch}),this.accessDelegation=e.accessDelegation?.join(`,`),this.namespaceOps=new Bi(this.client,t),this.tableOps=new Hi(this.client,t,this.accessDelegation)}async listNamespaces(e){return this.namespaceOps.listNamespaces(e)}async createNamespace(e,t){return this.namespaceOps.createNamespace(e,t)}async dropNamespace(e){await this.namespaceOps.dropNamespace(e)}async loadNamespaceMetadata(e){return this.namespaceOps.loadNamespaceMetadata(e)}async listTables(e){return this.tableOps.listTables(e)}async createTable(e,t){return this.tableOps.createTable(e,t)}async updateTable(e,t){return this.tableOps.updateTable(e,t)}async dropTable(e,t){await this.tableOps.dropTable(e,t)}async loadTable(e){return this.tableOps.loadTable(e)}async namespaceExists(e){return this.namespaceOps.namespaceExists(e)}async tableExists(e){return this.tableOps.tableExists(e)}async createNamespaceIfNotExists(e,t){return this.namespaceOps.createNamespaceIfNotExists(e,t)}async createTableIfNotExists(e,t){return this.tableOps.createTableIfNotExists(e,t)}};function Wi(e){"@babel/helpers - typeof";return Wi=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Wi(e)}function O(e,t){if(Wi(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(Wi(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function k(e){var t=O(e,`string`);return Wi(t)==`symbol`?t:t+``}function Gi(e,t,n){return(t=k(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ki(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function A(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?Ki(Object(n),!0).forEach(function(t){Gi(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ki(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var qi=class extends Error{constructor(e,t=`storage`,n,r){super(e),this.__isStorageError=!0,this.namespace=t,this.name=t===`vectors`?`StorageVectorsError`:`StorageError`,this.status=n,this.statusCode=r}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function Ji(e){return typeof e==`object`&&!!e&&`__isStorageError`in e}var Yi=class extends qi{constructor(e,t,n,r=`storage`){super(e,r,t,n),this.name=r===`vectors`?`StorageVectorsApiError`:`StorageApiError`,this.status=t,this.statusCode=n}toJSON(){return A({},super.toJSON())}},Xi=class extends qi{constructor(e,t,n=`storage`){super(e,n),this.name=n===`vectors`?`StorageVectorsUnknownError`:`StorageUnknownError`,this.originalError=t}};function Zi(e,t,n){let r=A({},e),i=t.toLowerCase();for(let e of Object.keys(r))e.toLowerCase()===i&&delete r[e];return r[i]=n,r}function Qi(e){let t={};for(let[n,r]of Object.entries(e))t[n.toLowerCase()]=r;return t}var $i=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),ea=e=>{if(typeof e!=`object`||!e)return!1;let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},ta=e=>{if(Array.isArray(e))return e.map(e=>ta(e));if(typeof e==`function`||e!==Object(e))return e;let t={};return Object.entries(e).forEach(([e,n])=>{let r=e.replace(/([-_][a-z])/gi,e=>e.toUpperCase().replace(/[-_]/g,``));t[r]=ta(n)}),t},na=e=>!e||typeof e!=`string`||e.length===0||e.length>100||e.trim()!==e||e.includes(`/`)||e.includes(`\\`)?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(e),ra=e=>{if(typeof e==`object`&&e){let t=e;if(typeof t.msg==`string`)return t.msg;if(typeof t.message==`string`)return t.message;if(typeof t.error_description==`string`)return t.error_description;if(typeof t.error==`string`)return t.error;if(typeof t.error==`object`&&t.error!==null){let e=t.error;if(typeof e.message==`string`)return e.message}}return JSON.stringify(e)},ia=async(e,t,n,r)=>{if(typeof e==`object`&&e&&`json`in e&&typeof e.json==`function`){let n=e,i=parseInt(String(n.status),10);Number.isFinite(i)||(i=500),n.json().then(e=>{let n=e?.statusCode||e?.code||i+``;t(new Yi(ra(e),i,n,r))}).catch(()=>{let e=i+``;t(new Yi(n.statusText||`HTTP ${i} error`,i,e,r))})}else t(new Xi(ra(e),e,r))},aa=(e,t,n,r)=>{let i={method:e,headers:t?.headers||{}};if(e===`GET`||e===`HEAD`||!r)return A(A({},i),n);if(ea(r)){let e=t?.headers||{},n;for(let[t,r]of Object.entries(e))t.toLowerCase()===`content-type`&&(n=r);i.headers=Zi(e,`Content-Type`,n??`application/json`),i.body=JSON.stringify(r)}else i.body=r;return t?.duplex&&(i.duplex=t.duplex),A(A({},i),n)};async function oa(e,t,n,r,i,a,o){return new Promise((s,c)=>{e(n,aa(t,r,i,a)).then(e=>{if(!e.ok)throw e;if(r?.noResolveJson)return e;if(o===`vectors`){let t=e.headers.get(`content-type`);if(e.headers.get(`content-length`)===`0`||e.status===204||!t||!t.includes(`application/json`))return{}}return e.json()}).then(e=>s(e)).catch(e=>ia(e,c,r,o))})}function sa(e=`storage`){return{get:async(t,n,r,i)=>oa(t,`GET`,n,r,i,void 0,e),post:async(t,n,r,i,a)=>oa(t,`POST`,n,i,a,r,e),put:async(t,n,r,i,a)=>oa(t,`PUT`,n,i,a,r,e),head:async(t,n,r,i)=>oa(t,`HEAD`,n,A(A({},r),{},{noResolveJson:!0}),i,void 0,e),remove:async(t,n,r,i,a)=>oa(t,`DELETE`,n,i,a,r,e)}}var{get:ca,post:la,put:ua,head:da,remove:fa}=sa(`storage`),pa=sa(`vectors`),ma=class{constructor(e,t={},n,r=`storage`){this.shouldThrowOnError=!1,this.url=e,this.headers=Qi(t),this.fetch=$i(n),this.namespace=r}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=Zi(this.headers,e,t),this}async handleOperation(e){var t=this;try{return{data:await e(),error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(Ji(e))return{data:null,error:e};throw e}}},ha=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t}then(e,t){return this.execute().then(e,t)}async execute(){var e=this;try{return{data:(await e.downloadFn()).body,error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(Ji(t))return{data:null,error:t};throw t}}},ga=Symbol.toStringTag,_a=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[ga]=`BlobDownloadBuilder`,this.promise=null}asStream(){return new ha(this.downloadFn,this.shouldThrowOnError)}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||=this.execute(),this.promise}async execute(){var e=this;try{return{data:await(await e.downloadFn()).blob(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(Ji(t))return{data:null,error:t};throw t}}},va={limit:100,offset:0,sortBy:{column:`name`,order:`asc`}},ya={cacheControl:`3600`,contentType:`text/plain;charset=UTF-8`,upsert:!1},ba=class extends ma{constructor(e,t={},n,r){super(e,t,r,`storage`),this.bucketId=n}async uploadOrUpdate(e,t,n,r){var i=this;return i.handleOperation(async()=>{let a,o=A(A({},ya),r),s=A(A({},i.headers),e===`POST`&&{"x-upsert":String(o.upsert)}),c=o.metadata;if(typeof Blob<`u`&&n instanceof Blob?(a=new FormData,a.append(`cacheControl`,o.cacheControl),c&&a.append(`metadata`,i.encodeMetadata(c)),a.append(``,n)):typeof FormData<`u`&&n instanceof FormData?(a=n,a.has(`cacheControl`)||a.append(`cacheControl`,o.cacheControl),c&&!a.has(`metadata`)&&a.append(`metadata`,i.encodeMetadata(c))):(a=n,s[`cache-control`]=`max-age=${o.cacheControl}`,s[`content-type`]=o.contentType,c&&(s[`x-metadata`]=i.toBase64(i.encodeMetadata(c))),(typeof ReadableStream<`u`&&a instanceof ReadableStream||a&&typeof a==`object`&&`pipe`in a&&typeof a.pipe==`function`)&&!o.duplex&&(o.duplex=`half`)),r?.headers)for(let[e,t]of Object.entries(r.headers))s=Zi(s,e,t);let l=i._removeEmptyFolders(t),u=i._getFinalPath(l),d=await(e==`PUT`?ua:la)(i.fetch,`${i.url}/object/${u}`,a,A({headers:s},o?.duplex?{duplex:o.duplex}:{}));return{path:l,id:d.Id,fullPath:d.Key}})}async upload(e,t,n){return this.uploadOrUpdate(`POST`,e,t,n)}async uploadToSignedUrl(e,t,n,r){var i=this;let a=i._removeEmptyFolders(e),o=i._getFinalPath(a),s=new URL(i.url+`/object/upload/sign/${o}`);return s.searchParams.set(`token`,t),i.handleOperation(async()=>{let e,t=A(A({},ya),r),o=A(A({},i.headers),{"x-upsert":String(t.upsert)}),c=t.metadata;if(typeof Blob<`u`&&n instanceof Blob?(e=new FormData,e.append(`cacheControl`,t.cacheControl),c&&e.append(`metadata`,i.encodeMetadata(c)),e.append(``,n)):typeof FormData<`u`&&n instanceof FormData?(e=n,e.has(`cacheControl`)||e.append(`cacheControl`,t.cacheControl),c&&!e.has(`metadata`)&&e.append(`metadata`,i.encodeMetadata(c))):(e=n,o[`cache-control`]=`max-age=${t.cacheControl}`,o[`content-type`]=t.contentType,c&&(o[`x-metadata`]=i.toBase64(i.encodeMetadata(c))),(typeof ReadableStream<`u`&&e instanceof ReadableStream||e&&typeof e==`object`&&`pipe`in e&&typeof e.pipe==`function`)&&!t.duplex&&(t.duplex=`half`)),r?.headers)for(let[e,t]of Object.entries(r.headers))o=Zi(o,e,t);return{path:a,fullPath:(await ua(i.fetch,s.toString(),e,A({headers:o},t?.duplex?{duplex:t.duplex}:{}))).Key}})}async createSignedUploadUrl(e,t){var n=this;return n.handleOperation(async()=>{let r=n._getFinalPath(e),i=A({},n.headers);t?.upsert&&(i[`x-upsert`]=`true`);let a=await la(n.fetch,`${n.url}/object/upload/sign/${r}`,{},{headers:i}),o=new URL(n.url+a.url),s=o.searchParams.get(`token`);if(!s)throw new qi(`No token returned by API`);return{signedUrl:o.toString(),path:e,token:s}})}async update(e,t,n){return this.uploadOrUpdate(`PUT`,e,t,n)}async move(e,t,n){var r=this;return r.handleOperation(async()=>await la(r.fetch,`${r.url}/object/move`,{bucketId:r.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n?.destinationBucket},{headers:r.headers}))}async copy(e,t,n){var r=this;return r.handleOperation(async()=>({path:(await la(r.fetch,`${r.url}/object/copy`,{bucketId:r.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n?.destinationBucket},{headers:r.headers})).Key}))}async createSignedUrl(e,t,n){var r=this;return r.handleOperation(async()=>{let i=r._getFinalPath(e),a=typeof n?.transform==`object`&&n.transform!==null&&Object.keys(n.transform).length>0,o=await la(r.fetch,`${r.url}/object/sign/${i}`,A({expiresIn:t},a?{transform:n.transform}:{}),{headers:r.headers}),s=new URLSearchParams;n?.download&&s.set(`download`,n.download===!0?``:n.download),n?.cacheNonce!=null&&s.set(`cacheNonce`,String(n.cacheNonce));let c=s.toString();return{signedUrl:encodeURI(`${r.url}${o.signedURL}${c?`&${c}`:``}`)}})}async createSignedUrls(e,t,n){var r=this;return r.handleOperation(async()=>{let i=await la(r.fetch,`${r.url}/object/sign/${r.bucketId}`,{expiresIn:t,paths:e},{headers:r.headers}),a=new URLSearchParams;n?.download&&a.set(`download`,n.download===!0?``:n.download),n?.cacheNonce!=null&&a.set(`cacheNonce`,String(n.cacheNonce));let o=a.toString();return i.map(e=>A(A({},e),{},{signedUrl:e.signedURL?encodeURI(`${r.url}${e.signedURL}${o?`&${o}`:``}`):null}))})}download(e,t,n){let r=typeof t?.transform==`object`&&t.transform!==null&&Object.keys(t.transform).length>0?`render/image/authenticated`:`object`,i=new URLSearchParams;t?.transform&&this.applyTransformOptsToQuery(i,t.transform),t?.cacheNonce!=null&&i.set(`cacheNonce`,String(t.cacheNonce));let a=i.toString(),o=this._getFinalPath(e);return new _a(()=>ca(this.fetch,`${this.url}/${r}/${o}${a?`?${a}`:``}`,{headers:this.headers,noResolveJson:!0},n),this.shouldThrowOnError)}async info(e){var t=this;let n=t._getFinalPath(e);return t.handleOperation(async()=>ta(await ca(t.fetch,`${t.url}/object/info/${n}`,{headers:t.headers})))}async exists(e){var t=this;let n=t._getFinalPath(e);try{return await da(t.fetch,`${t.url}/object/${n}`,{headers:t.headers}),{data:!0,error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(Ji(e)){let t=e instanceof Yi?e.status:e instanceof Xi?e.originalError?.status:void 0;if(t!==void 0&&[400,404].includes(t))return{data:!1,error:e}}throw e}}getPublicUrl(e,t){let n=this._getFinalPath(e),r=new URLSearchParams;t?.download&&r.set(`download`,t.download===!0?``:t.download),t?.transform&&this.applyTransformOptsToQuery(r,t.transform),t?.cacheNonce!=null&&r.set(`cacheNonce`,String(t.cacheNonce));let i=r.toString(),a=typeof t?.transform==`object`&&t.transform!==null&&Object.keys(t.transform).length>0?`render/image`:`object`;return{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${n}`)+(i?`?${i}`:``)}}}async remove(e){var t=this;return t.handleOperation(async()=>await fa(t.fetch,`${t.url}/object/${t.bucketId}`,{prefixes:e},{headers:t.headers}))}async list(e,t,n){var r=this;return r.handleOperation(async()=>{let i=A(A(A({},va),t),{},{prefix:e||``});return await la(r.fetch,`${r.url}/object/list/${r.bucketId}`,i,{headers:r.headers},n)})}async listV2(e,t){var n=this;return n.handleOperation(async()=>{let r=A({},e);return await la(n.fetch,`${n.url}/object/list-v2/${n.bucketId}`,r,{headers:n.headers},t)})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<`u`?Buffer.from(e).toString(`base64`):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,``)}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,``).replace(/\/+/g,`/`)}applyTransformOptsToQuery(e,t){return t.width&&e.set(`width`,t.width.toString()),t.height&&e.set(`height`,t.height.toString()),t.resize&&e.set(`resize`,t.resize),t.format&&e.set(`format`,t.format),t.quality&&e.set(`quality`,t.quality.toString()),e}},xa={"X-Client-Info":`storage-js/2.105.3`},Sa=class extends ma{constructor(e,t={},n,r){let i=new URL(e);r?.useNewHostname&&/supabase\.(co|in|red)$/.test(i.hostname)&&!i.hostname.includes(`storage.supabase.`)&&(i.hostname=i.hostname.replace(`supabase.`,`storage.supabase.`));let a=i.href.replace(/\/$/,``),o=A(A({},xa),t);super(a,o,n,`storage`)}async listBuckets(e){var t=this;return t.handleOperation(async()=>{let n=t.listBucketOptionsToQueryString(e);return await ca(t.fetch,`${t.url}/bucket${n}`,{headers:t.headers})})}async getBucket(e){var t=this;return t.handleOperation(async()=>await ca(t.fetch,`${t.url}/bucket/${e}`,{headers:t.headers}))}async createBucket(e,t={public:!1}){var n=this;return n.handleOperation(async()=>await la(n.fetch,`${n.url}/bucket`,{id:e,name:e,type:t.type,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:n.headers}))}async updateBucket(e,t){var n=this;return n.handleOperation(async()=>await ua(n.fetch,`${n.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:n.headers}))}async emptyBucket(e){var t=this;return t.handleOperation(async()=>await la(t.fetch,`${t.url}/bucket/${e}/empty`,{},{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await fa(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}listBucketOptionsToQueryString(e){let t={};return e&&(`limit`in e&&(t.limit=String(e.limit)),`offset`in e&&(t.offset=String(e.offset)),e.search&&(t.search=e.search),e.sortColumn&&(t.sortColumn=e.sortColumn),e.sortOrder&&(t.sortOrder=e.sortOrder)),Object.keys(t).length>0?`?`+new URLSearchParams(t).toString():``}},Ca=class extends ma{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=A(A({},xa),t);super(r,i,n,`storage`)}async createBucket(e){var t=this;return t.handleOperation(async()=>await la(t.fetch,`${t.url}/bucket`,{name:e},{headers:t.headers}))}async listBuckets(e){var t=this;return t.handleOperation(async()=>{let n=new URLSearchParams;e?.limit!==void 0&&n.set(`limit`,e.limit.toString()),e?.offset!==void 0&&n.set(`offset`,e.offset.toString()),e?.sortColumn&&n.set(`sortColumn`,e.sortColumn),e?.sortOrder&&n.set(`sortOrder`,e.sortOrder),e?.search&&n.set(`search`,e.search);let r=n.toString(),i=r?`${t.url}/bucket?${r}`:`${t.url}/bucket`;return await ca(t.fetch,i,{headers:t.headers})})}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await fa(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}from(e){var t=this;if(!na(e))throw new qi(`Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.`);let n=new Ui({baseUrl:this.url,catalogName:e,auth:{type:`custom`,getHeaders:async()=>t.headers},fetch:this.fetch}),r=this.shouldThrowOnError;return new Proxy(n,{get(e,t){let n=e[t];return typeof n==`function`?async(...t)=>{try{return{data:await n.apply(e,t),error:null}}catch(e){if(r)throw e;return{data:null,error:e}}}:n}})}},wa=class extends ma{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=A(A({},xa),{},{"Content-Type":`application/json`},t);super(r,i,n,`vectors`)}async createIndex(e){var t=this;return t.handleOperation(async()=>await pa.post(t.fetch,`${t.url}/CreateIndex`,e,{headers:t.headers})||{})}async getIndex(e,t){var n=this;return n.handleOperation(async()=>await pa.post(n.fetch,`${n.url}/GetIndex`,{vectorBucketName:e,indexName:t},{headers:n.headers}))}async listIndexes(e){var t=this;return t.handleOperation(async()=>await pa.post(t.fetch,`${t.url}/ListIndexes`,e,{headers:t.headers}))}async deleteIndex(e,t){var n=this;return n.handleOperation(async()=>await pa.post(n.fetch,`${n.url}/DeleteIndex`,{vectorBucketName:e,indexName:t},{headers:n.headers})||{})}},Ta=class extends ma{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=A(A({},xa),{},{"Content-Type":`application/json`},t);super(r,i,n,`vectors`)}async putVectors(e){var t=this;if(e.vectors.length<1||e.vectors.length>500)throw Error(`Vector batch size must be between 1 and 500 items`);return t.handleOperation(async()=>await pa.post(t.fetch,`${t.url}/PutVectors`,e,{headers:t.headers})||{})}async getVectors(e){var t=this;return t.handleOperation(async()=>await pa.post(t.fetch,`${t.url}/GetVectors`,e,{headers:t.headers}))}async listVectors(e){var t=this;if(e.segmentCount!==void 0){if(e.segmentCount<1||e.segmentCount>16)throw Error(`segmentCount must be between 1 and 16`);if(e.segmentIndex!==void 0&&(e.segmentIndex<0||e.segmentIndex>=e.segmentCount))throw Error(`segmentIndex must be between 0 and ${e.segmentCount-1}`)}return t.handleOperation(async()=>await pa.post(t.fetch,`${t.url}/ListVectors`,e,{headers:t.headers}))}async queryVectors(e){var t=this;return t.handleOperation(async()=>await pa.post(t.fetch,`${t.url}/QueryVectors`,e,{headers:t.headers}))}async deleteVectors(e){var t=this;if(e.keys.length<1||e.keys.length>500)throw Error(`Keys batch size must be between 1 and 500 items`);return t.handleOperation(async()=>await pa.post(t.fetch,`${t.url}/DeleteVectors`,e,{headers:t.headers})||{})}},Ea=class extends ma{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=A(A({},xa),{},{"Content-Type":`application/json`},t);super(r,i,n,`vectors`)}async createBucket(e){var t=this;return t.handleOperation(async()=>await pa.post(t.fetch,`${t.url}/CreateVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}async getBucket(e){var t=this;return t.handleOperation(async()=>await pa.post(t.fetch,`${t.url}/GetVectorBucket`,{vectorBucketName:e},{headers:t.headers}))}async listBuckets(e={}){var t=this;return t.handleOperation(async()=>await pa.post(t.fetch,`${t.url}/ListVectorBuckets`,e,{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await pa.post(t.fetch,`${t.url}/DeleteVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}},Da=class extends Ea{constructor(e,t={}){super(e,t.headers||{},t.fetch)}from(e){return new Oa(this.url,this.headers,e,this.fetch)}async createBucket(e){var t=()=>super.createBucket,n=this;return t().call(n,e)}async getBucket(e){var t=()=>super.getBucket,n=this;return t().call(n,e)}async listBuckets(e={}){var t=()=>super.listBuckets,n=this;return t().call(n,e)}async deleteBucket(e){var t=()=>super.deleteBucket,n=this;return t().call(n,e)}},Oa=class extends wa{constructor(e,t,n,r){super(e,t,r),this.vectorBucketName=n}async createIndex(e){var t=()=>super.createIndex,n=this;return t().call(n,A(A({},e),{},{vectorBucketName:n.vectorBucketName}))}async listIndexes(e={}){var t=()=>super.listIndexes,n=this;return t().call(n,A(A({},e),{},{vectorBucketName:n.vectorBucketName}))}async getIndex(e){var t=()=>super.getIndex,n=this;return t().call(n,n.vectorBucketName,e)}async deleteIndex(e){var t=()=>super.deleteIndex,n=this;return t().call(n,n.vectorBucketName,e)}index(e){return new ka(this.url,this.headers,this.vectorBucketName,e,this.fetch)}},ka=class extends Ta{constructor(e,t,n,r,i){super(e,t,i),this.vectorBucketName=n,this.indexName=r}async putVectors(e){var t=()=>super.putVectors,n=this;return t().call(n,A(A({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async getVectors(e){var t=()=>super.getVectors,n=this;return t().call(n,A(A({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async listVectors(e={}){var t=()=>super.listVectors,n=this;return t().call(n,A(A({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async queryVectors(e){var t=()=>super.queryVectors,n=this;return t().call(n,A(A({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async deleteVectors(e){var t=()=>super.deleteVectors,n=this;return t().call(n,A(A({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}},Aa=class extends Sa{constructor(e,t={},n,r){super(e,t,n,r)}from(e){return new ba(this.url,this.headers,e,this.fetch)}get vectors(){return new Da(this.url+`/vector`,{headers:this.headers,fetch:this.fetch})}get analytics(){return new Ca(this.url+`/iceberg`,this.headers,this.fetch)}},ja=`2.105.3`,Ma=30*1e3,Na=3*Ma,Pa=`http://localhost:9999`,Fa=`supabase.auth.token`,Ia={"X-Client-Info":`gotrue-js/${ja}`},La=`X-Supabase-Api-Version`,Ra={"2024-01-01":{timestamp:Date.parse(`2024-01-01T00:00:00.0Z`),name:`2024-01-01`}},za=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,Ba=class extends Error{constructor(e,t,n){super(e),this.__isAuthError=!0,this.name=`AuthError`,this.status=t,this.code=n}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}};function j(e){return typeof e==`object`&&!!e&&`__isAuthError`in e}var Va=class extends Ba{constructor(e,t,n){super(e,t,n),this.name=`AuthApiError`,this.status=t,this.code=n}};function Ha(e){return j(e)&&e.name===`AuthApiError`}var Ua=class extends Ba{constructor(e,t){super(e),this.name=`AuthUnknownError`,this.originalError=t}},Wa=class extends Ba{constructor(e,t,n,r){super(e,n,r),this.name=t,this.status=n}},Ga=class extends Wa{constructor(){super(`Auth session missing!`,`AuthSessionMissingError`,400,void 0)}};function Ka(e){return j(e)&&e.name===`AuthSessionMissingError`}var qa=class extends Wa{constructor(){super(`Auth session or user missing`,`AuthInvalidTokenResponseError`,500,void 0)}},Ja=class extends Wa{constructor(e){super(e,`AuthInvalidCredentialsError`,400,void 0)}},Ya=class extends Wa{constructor(e,t=null){super(e,`AuthImplicitGrantRedirectError`,500,void 0),this.details=null,this.details=t}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}};function Xa(e){return j(e)&&e.name===`AuthImplicitGrantRedirectError`}var Za=class extends Wa{constructor(e,t=null){super(e,`AuthPKCEGrantCodeExchangeError`,500,void 0),this.details=null,this.details=t}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}},Qa=class extends Wa{constructor(){super(`PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.`,`AuthPKCECodeVerifierMissingError`,400,`pkce_code_verifier_not_found`)}},$a=class extends Wa{constructor(e,t){super(e,`AuthRetryableFetchError`,t,void 0)}};function eo(e){return j(e)&&e.name===`AuthRetryableFetchError`}var to=class extends Wa{constructor(e,t,n){super(e,`AuthWeakPasswordError`,t,`weak_password`),this.reasons=n}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}},no=class extends Wa{constructor(e){super(e,`AuthInvalidJwtError`,400,`invalid_jwt`)}},ro=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_`.split(``),io=` 	
\r=`.split(``),ao=(()=>{let e=Array(128);for(let t=0;t<e.length;t+=1)e[t]=-1;for(let t=0;t<io.length;t+=1)e[io[t].charCodeAt(0)]=-2;for(let t=0;t<ro.length;t+=1)e[ro[t].charCodeAt(0)]=t;return e})();function oo(e,t,n){if(e!==null)for(t.queue=t.queue<<8|e,t.queuedBits+=8;t.queuedBits>=6;)n(ro[t.queue>>t.queuedBits-6&63]),t.queuedBits-=6;else if(t.queuedBits>0)for(t.queue<<=6-t.queuedBits,t.queuedBits=6;t.queuedBits>=6;)n(ro[t.queue>>t.queuedBits-6&63]),t.queuedBits-=6}function so(e,t,n){let r=ao[e];if(r>-1)for(t.queue=t.queue<<6|r,t.queuedBits+=6;t.queuedBits>=8;)n(t.queue>>t.queuedBits-8&255),t.queuedBits-=8;else if(r===-2)return;else throw Error(`Invalid Base64-URL character "${String.fromCharCode(e)}"`)}function co(e){let t=[],n=e=>{t.push(String.fromCodePoint(e))},r={utf8seq:0,codepoint:0},i={queue:0,queuedBits:0},a=e=>{fo(e,r,n)};for(let t=0;t<e.length;t+=1)so(e.charCodeAt(t),i,a);return t.join(``)}function lo(e,t){if(e<=127){t(e);return}else if(e<=2047){t(192|e>>6),t(128|e&63);return}else if(e<=65535){t(224|e>>12),t(128|e>>6&63),t(128|e&63);return}else if(e<=1114111){t(240|e>>18),t(128|e>>12&63),t(128|e>>6&63),t(128|e&63);return}throw Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`)}function uo(e,t){for(let n=0;n<e.length;n+=1){let r=e.charCodeAt(n);if(r>55295&&r<=56319){let t=(r-55296)*1024&65535;r=(e.charCodeAt(n+1)-56320&65535|t)+65536,n+=1}lo(r,t)}}function fo(e,t,n){if(t.utf8seq===0){if(e<=127){n(e);return}for(let n=1;n<6;n+=1)if(!(e>>7-n&1)){t.utf8seq=n;break}if(t.utf8seq===2)t.codepoint=e&31;else if(t.utf8seq===3)t.codepoint=e&15;else if(t.utf8seq===4)t.codepoint=e&7;else throw Error(`Invalid UTF-8 sequence`);--t.utf8seq}else if(t.utf8seq>0){if(e<=127)throw Error(`Invalid UTF-8 sequence`);t.codepoint=t.codepoint<<6|e&63,--t.utf8seq,t.utf8seq===0&&n(t.codepoint)}}function po(e){let t=[],n={queue:0,queuedBits:0},r=e=>{t.push(e)};for(let t=0;t<e.length;t+=1)so(e.charCodeAt(t),n,r);return new Uint8Array(t)}function mo(e){let t=[];return uo(e,e=>t.push(e)),new Uint8Array(t)}function ho(e){let t=[],n={queue:0,queuedBits:0},r=e=>{t.push(e)};return e.forEach(e=>oo(e,n,r)),oo(null,n,r),t.join(``)}function go(e){return Math.round(Date.now()/1e3)+e}function _o(){return Symbol(`auth-callback`)}var M=()=>typeof window<`u`&&typeof document<`u`,N={tested:!1,writable:!1},vo=()=>{if(!M())return!1;try{if(typeof globalThis.localStorage!=`object`)return!1}catch{return!1}if(N.tested)return N.writable;let e=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(e,e),globalThis.localStorage.removeItem(e),N.tested=!0,N.writable=!0}catch{N.tested=!0,N.writable=!1}return N.writable};function yo(e){let t={},n=new URL(e);if(n.hash&&n.hash[0]===`#`)try{new URLSearchParams(n.hash.substring(1)).forEach((e,n)=>{t[n]=e})}catch{}return n.searchParams.forEach((e,n)=>{t[n]=e}),t}var P=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),F=e=>typeof e==`object`&&!!e&&`status`in e&&`ok`in e&&`json`in e&&typeof e.json==`function`,I=async(e,t,n)=>{await e.setItem(t,JSON.stringify(n))},bo=async(e,t)=>{let n=await e.getItem(t);if(!n)return null;try{return JSON.parse(n)}catch{return n}},xo=async(e,t)=>{await e.removeItem(t)},So=class e{constructor(){this.promise=new e.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}};So.promiseConstructor=Promise;function Co(e){let t=e.split(`.`);if(t.length!==3)throw new no(`Invalid JWT structure`);for(let e=0;e<t.length;e++)if(!za.test(t[e]))throw new no(`JWT not in base64url format`);return{header:JSON.parse(co(t[0])),payload:JSON.parse(co(t[1])),signature:po(t[2]),raw:{header:t[0],payload:t[1]}}}async function wo(e){return await new Promise(t=>{setTimeout(()=>t(null),e)})}function To(e,t){return new Promise((n,r)=>{(async()=>{for(let i=0;i<1/0;i++)try{let r=await e(i);if(!t(i,null,r)){n(r);return}}catch(e){if(!t(i,e)){r(e);return}}})()})}function Eo(e){return(`0`+e.toString(16)).substr(-2)}function Do(){let e=new Uint32Array(56);if(typeof crypto>`u`){let e=``;for(let t=0;t<56;t++)e+=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~`.charAt(Math.floor(Math.random()*66));return e}return crypto.getRandomValues(e),Array.from(e,Eo).join(``)}async function Oo(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest(`SHA-256`,t),r=new Uint8Array(n);return Array.from(r).map(e=>String.fromCharCode(e)).join(``)}async function ko(e){if(!(typeof crypto<`u`&&crypto.subtle!==void 0&&typeof TextEncoder<`u`))return console.warn(`WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.`),e;let t=await Oo(e);return btoa(t).replace(/\+/g,`-`).replace(/\//g,`_`).replace(/=+$/,``)}async function Ao(e,t,n=!1){let r=Do(),i=r;n&&(i+=`/recovery`),await I(e,`${t}-code-verifier`,i);let a=await ko(r);return[a,r===a?`plain`:`s256`]}var jo=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function Mo(e){let t=e.headers.get(La);if(!t||!t.match(jo))return null;try{return new Date(`${t}T00:00:00.0Z`)}catch{return null}}function No(e){if(!e)throw Error(`Missing exp claim`);if(e<=Math.floor(Date.now()/1e3))throw Error(`JWT has expired`)}function Po(e){switch(e){case`RS256`:return{name:`RSASSA-PKCS1-v1_5`,hash:{name:`SHA-256`}};case`ES256`:return{name:`ECDSA`,namedCurve:`P-256`,hash:{name:`SHA-256`}};default:throw Error(`Invalid alg claim`)}}var Fo=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function L(e){if(!Fo.test(e))throw Error(`@supabase/auth-js: Expected parameter to be UUID but is not`)}function R(e){if(!e.passkey)throw Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).")}function Io(){return new Proxy({},{get:(e,t)=>{if(t===`__isUserNotAvailableProxy`)return!0;if(typeof t==`symbol`){let e=t.toString();if(e===`Symbol(Symbol.toPrimitive)`||e===`Symbol(Symbol.toStringTag)`||e===`Symbol(util.inspect.custom)`)return}throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function Lo(e,t){return new Proxy(e,{get:(e,n,r)=>{if(n===`__isInsecureUserWarningProxy`)return!0;if(typeof n==`symbol`){let t=n.toString();if(t===`Symbol(Symbol.toPrimitive)`||t===`Symbol(Symbol.toStringTag)`||t===`Symbol(util.inspect.custom)`||t===`Symbol(nodejs.util.inspect.custom)`)return Reflect.get(e,n,r)}return!t.value&&typeof n==`string`&&(console.warn(`Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.`),t.value=!0),Reflect.get(e,n,r)}})}function Ro(e){return JSON.parse(JSON.stringify(e))}var zo=e=>{if(typeof e==`object`&&e){let t=e;if(typeof t.msg==`string`)return t.msg;if(typeof t.message==`string`)return t.message;if(typeof t.error_description==`string`)return t.error_description;if(typeof t.error==`string`)return t.error}return JSON.stringify(e)},Bo=[502,503,504,520,521,522,523,524,530];async function Vo(e){if(!F(e))throw new $a(zo(e),0);if(Bo.includes(e.status))throw new $a(zo(e),e.status);let t;try{t=await e.json()}catch(e){throw new Ua(zo(e),e)}let n,r=Mo(e);if(r&&r.getTime()>=Ra[`2024-01-01`].timestamp&&typeof t==`object`&&t&&typeof t.code==`string`?n=t.code:typeof t==`object`&&t&&typeof t.error_code==`string`&&(n=t.error_code),!n){if(typeof t==`object`&&t&&typeof t.weak_password==`object`&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((e,t)=>e&&typeof t==`string`,!0))throw new to(zo(t),e.status,t.weak_password.reasons)}else if(n===`weak_password`)throw new to(zo(t),e.status,t.weak_password?.reasons||[]);else if(n===`session_not_found`)throw new Ga;throw new Va(zo(t),e.status||500,n)}var Ho=(e,t,n,r)=>{let i={method:e,headers:t?.headers||{}};return e===`GET`?i:(i.headers=Object.assign({"Content-Type":`application/json;charset=UTF-8`},t?.headers),i.body=JSON.stringify(r),Object.assign(Object.assign({},i),n))};async function z(e,t,n,r){let i=Object.assign({},r?.headers);i[`X-Supabase-Api-Version`]||(i[La]=Ra[`2024-01-01`].name),r?.jwt&&(i.Authorization=`Bearer ${r.jwt}`);let a=r?.query??{};r?.redirectTo&&(a.redirect_to=r.redirectTo);let o=await Uo(e,t,n+(Object.keys(a).length?`?`+new URLSearchParams(a).toString():``),{headers:i,noResolveJson:r?.noResolveJson},{},r?.body);return r?.xform?r?.xform(o):{data:Object.assign({},o),error:null}}async function Uo(e,t,n,r,i,a){let o=Ho(t,r,i,a),s;try{s=await e(n,Object.assign({},o))}catch(e){throw console.error(e),new $a(zo(e),0)}if(s.ok||await Vo(s),r?.noResolveJson)return s;try{return await s.json()}catch(e){await Vo(e)}}function Wo(e){let t=null;Xo(e)&&(t=Object.assign({},e),e.expires_at||(t.expires_at=go(e.expires_in)));let n=e.user??e;return{data:{session:t,user:n},error:null}}function Go(e){let t=Wo(e);return!t.error&&e.weak_password&&typeof e.weak_password==`object`&&Array.isArray(e.weak_password.reasons)&&e.weak_password.reasons.length&&e.weak_password.message&&typeof e.weak_password.message==`string`&&e.weak_password.reasons.reduce((e,t)=>e&&typeof t==`string`,!0)&&(t.data.weak_password=e.weak_password),t}function Ko(e){return{data:{user:e.user??e},error:null}}function qo(e){return{data:e,error:null}}function Jo(e){let{action_link:t,email_otp:n,hashed_token:r,redirect_to:i,verification_type:a}=e,o=$n(e,[`action_link`,`email_otp`,`hashed_token`,`redirect_to`,`verification_type`]);return{data:{properties:{action_link:t,email_otp:n,hashed_token:r,redirect_to:i,verification_type:a},user:Object.assign({},o)},error:null}}function Yo(e){return e}function Xo(e){return!!e.access_token&&!!e.refresh_token&&!!e.expires_in}var Zo=[`global`,`local`,`others`],Qo=class{constructor({url:e=``,headers:t={},fetch:n,experimental:r}){this.url=e,this.headers=t,this.fetch=P(n),this.experimental=r??{},this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)},this.passkey={listPasskeys:this._adminListPasskeys.bind(this),deletePasskey:this._adminDeletePasskey.bind(this)}}async signOut(e,t=Zo[0]){if(Zo.indexOf(t)<0)throw Error(`@supabase/auth-js: Parameter scope must be one of ${Zo.join(`, `)}`);try{return await z(this.fetch,`POST`,`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(e){if(j(e))return{data:null,error:e};throw e}}async inviteUserByEmail(e,t={}){try{return await z(this.fetch,`POST`,`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:Ko})}catch(e){if(j(e))return{data:{user:null},error:e};throw e}}async generateLink(e){try{let{options:t}=e,n=$n(e,[`options`]),r=Object.assign(Object.assign({},n),t);return`newEmail`in n&&(r.new_email=n?.newEmail,delete r.newEmail),await z(this.fetch,`POST`,`${this.url}/admin/generate_link`,{body:r,headers:this.headers,xform:Jo,redirectTo:t?.redirectTo})}catch(e){if(j(e))return{data:{properties:null,user:null},error:e};throw e}}async createUser(e){try{return await z(this.fetch,`POST`,`${this.url}/admin/users`,{body:e,headers:this.headers,xform:Ko})}catch(e){if(j(e))return{data:{user:null},error:e};throw e}}async listUsers(e){try{let t={nextPage:null,lastPage:0,total:0},n=await z(this.fetch,`GET`,`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(e?.page)?.toString()??``,per_page:(e?.perPage)?.toString()??``},xform:Yo});if(n.error)throw n.error;let r=await n.json(),i=n.headers.get(`x-total-count`)??0,a=n.headers.get(`link`)?.split(`,`)??[];return a.length>0&&(a.forEach(e=>{let n=parseInt(e.split(`;`)[0].split(`=`)[1].substring(0,1)),r=JSON.parse(e.split(`;`)[1].split(`=`)[1]);t[`${r}Page`]=n}),t.total=parseInt(i)),{data:Object.assign(Object.assign({},r),t),error:null}}catch(e){if(j(e))return{data:{users:[]},error:e};throw e}}async getUserById(e){L(e);try{return await z(this.fetch,`GET`,`${this.url}/admin/users/${e}`,{headers:this.headers,xform:Ko})}catch(e){if(j(e))return{data:{user:null},error:e};throw e}}async updateUserById(e,t){L(e);try{return await z(this.fetch,`PUT`,`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:Ko})}catch(e){if(j(e))return{data:{user:null},error:e};throw e}}async deleteUser(e,t=!1){L(e);try{return await z(this.fetch,`DELETE`,`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:Ko})}catch(e){if(j(e))return{data:{user:null},error:e};throw e}}async _listFactors(e){L(e.userId);try{let{data:t,error:n}=await z(this.fetch,`GET`,`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:e=>({data:{factors:e},error:null})});return{data:t,error:n}}catch(e){if(j(e))return{data:null,error:e};throw e}}async _deleteFactor(e){L(e.userId),L(e.id);try{return{data:await z(this.fetch,`DELETE`,`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(e){if(j(e))return{data:null,error:e};throw e}}async _listOAuthClients(e){try{let t={nextPage:null,lastPage:0,total:0},n=await z(this.fetch,`GET`,`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(e?.page)?.toString()??``,per_page:(e?.perPage)?.toString()??``},xform:Yo});if(n.error)throw n.error;let r=await n.json(),i=n.headers.get(`x-total-count`)??0,a=n.headers.get(`link`)?.split(`,`)??[];return a.length>0&&(a.forEach(e=>{let n=parseInt(e.split(`;`)[0].split(`=`)[1].substring(0,1)),r=JSON.parse(e.split(`;`)[1].split(`=`)[1]);t[`${r}Page`]=n}),t.total=parseInt(i)),{data:Object.assign(Object.assign({},r),t),error:null}}catch(e){if(j(e))return{data:{clients:[]},error:e};throw e}}async _createOAuthClient(e){try{return await z(this.fetch,`POST`,`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(j(e))return{data:null,error:e};throw e}}async _getOAuthClient(e){try{return await z(this.fetch,`GET`,`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(j(e))return{data:null,error:e};throw e}}async _updateOAuthClient(e,t){try{return await z(this.fetch,`PUT`,`${this.url}/admin/oauth/clients/${e}`,{body:t,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(j(e))return{data:null,error:e};throw e}}async _deleteOAuthClient(e){try{return await z(this.fetch,`DELETE`,`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(j(e))return{data:null,error:e};throw e}}async _regenerateOAuthClientSecret(e){try{return await z(this.fetch,`POST`,`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(j(e))return{data:null,error:e};throw e}}async _listCustomProviders(e){try{let t={};return e?.type&&(t.type=e.type),await z(this.fetch,`GET`,`${this.url}/admin/custom-providers`,{headers:this.headers,query:t,xform:e=>({data:{providers:e?.providers??[]},error:null})})}catch(e){if(j(e))return{data:{providers:[]},error:e};throw e}}async _createCustomProvider(e){try{return await z(this.fetch,`POST`,`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(j(e))return{data:null,error:e};throw e}}async _getCustomProvider(e){try{return await z(this.fetch,`GET`,`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(j(e))return{data:null,error:e};throw e}}async _updateCustomProvider(e,t){try{return await z(this.fetch,`PUT`,`${this.url}/admin/custom-providers/${e}`,{body:t,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(j(e))return{data:null,error:e};throw e}}async _deleteCustomProvider(e){try{return await z(this.fetch,`DELETE`,`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(j(e))return{data:null,error:e};throw e}}async _adminListPasskeys(e){R(this.experimental),L(e.userId);try{return await z(this.fetch,`GET`,`${this.url}/admin/users/${e.userId}/passkeys`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(j(e))return{data:null,error:e};throw e}}async _adminDeletePasskey(e){R(this.experimental),L(e.userId),L(e.passkeyId);try{return await z(this.fetch,`DELETE`,`${this.url}/admin/users/${e.userId}/passkeys/${e.passkeyId}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(j(e))return{data:null,error:e};throw e}}};function $o(e={}){return{getItem:t=>e[t]||null,setItem:(t,n)=>{e[t]=n},removeItem:t=>{delete e[t]}}}var es={debug:!!(globalThis&&vo()&&globalThis.localStorage&&globalThis.localStorage.getItem(`supabase.gotrue-js.locks.debug`)===`true`)},ts=class extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}},ns=class extends ts{};async function rs(e,t,n){es.debug&&console.log(`@supabase/gotrue-js: navigatorLock: acquire lock`,e,t);let r=new globalThis.AbortController,i;t>0&&(i=setTimeout(()=>{r.abort(),es.debug&&console.log(`@supabase/gotrue-js: navigatorLock acquire timed out`,e)},t)),await Promise.resolve();try{return await globalThis.navigator.locks.request(e,t===0?{mode:`exclusive`,ifAvailable:!0}:{mode:`exclusive`,signal:r.signal},async r=>{if(r){clearTimeout(i),es.debug&&console.log(`@supabase/gotrue-js: navigatorLock: acquired`,e,r.name);try{return await n()}finally{es.debug&&console.log(`@supabase/gotrue-js: navigatorLock: released`,e,r.name)}}else if(t===0)throw es.debug&&console.log(`@supabase/gotrue-js: navigatorLock: not immediately available`,e),new ns(`Acquiring an exclusive Navigator LockManager lock "${e}" immediately failed`);else{if(es.debug)try{let e=await globalThis.navigator.locks.query();console.log(`@supabase/gotrue-js: Navigator LockManager state`,JSON.stringify(e,null,`  `))}catch(e){console.warn(`@supabase/gotrue-js: Error when querying Navigator LockManager state`,e)}return console.warn(`@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request`),clearTimeout(i),await n()}})}catch(a){if(t>0&&clearTimeout(i),typeof a==`object`&&a&&`name`in a&&a.name===`AbortError`&&t>0){if(r.signal.aborted)return es.debug&&console.log(`@supabase/gotrue-js: navigatorLock: acquire timeout, recovering by stealing lock`,e),console.warn(`@supabase/gotrue-js: Lock "${e}" was not released within ${t}ms. This may indicate an orphaned lock from a component unmount (e.g., React Strict Mode). Forcefully acquiring the lock to recover.`),await Promise.resolve().then(()=>globalThis.navigator.locks.request(e,{mode:`exclusive`,steal:!0},async t=>{if(t){es.debug&&console.log(`@supabase/gotrue-js: navigatorLock: recovered (stolen)`,e,t.name);try{return await n()}finally{es.debug&&console.log(`@supabase/gotrue-js: navigatorLock: released (stolen)`,e,t.name)}}else return console.warn(`@supabase/gotrue-js: Navigator LockManager returned null lock even with steal: true`),await n()}));throw es.debug&&console.log(`@supabase/gotrue-js: navigatorLock: lock was stolen by another request`,e),new ns(`Lock "${e}" was released because another request stole it`)}throw a}}function is(){if(typeof globalThis!=`object`)try{Object.defineProperty(Object.prototype,`__magic__`,{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<`u`&&(self.globalThis=self)}}function as(e){if(!/^0x[a-fA-F0-9]{40}$/.test(e))throw Error(`@supabase/auth-js: Address "${e}" is invalid.`);return e.toLowerCase()}function os(e){return parseInt(e,16)}function ss(e){let t=new TextEncoder().encode(e);return`0x`+Array.from(t,e=>e.toString(16).padStart(2,`0`)).join(``)}function cs(e){let{chainId:t,domain:n,expirationTime:r,issuedAt:i=new Date,nonce:a,notBefore:o,requestId:s,resources:c,scheme:l,uri:u,version:d}=e;if(!Number.isInteger(t))throw Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);if(!n)throw Error(`@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.`);if(a&&a.length<8)throw Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a}`);if(!u)throw Error(`@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.`);if(d!==`1`)throw Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${d}`);if(e.statement?.includes(`
`))throw Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e.statement}`);let f=as(e.address),p=`${l?`${l}://${n}`:n} wants you to sign in with your Ethereum account:\n${f}\n\n${e.statement?`${e.statement}\n`:``}`,m=`URI: ${u}\nVersion: ${d}\nChain ID: ${t}${a?`\nNonce: ${a}`:``}\nIssued At: ${i.toISOString()}`;if(r&&(m+=`\nExpiration Time: ${r.toISOString()}`),o&&(m+=`\nNot Before: ${o.toISOString()}`),s&&(m+=`\nRequest ID: ${s}`),c){let e=`
Resources:`;for(let t of c){if(!t||typeof t!=`string`)throw Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${t}`);e+=`\n- ${t}`}m+=e}return`${p}\n${m}`}var B=class extends Error{constructor({message:e,code:t,cause:n,name:r}){super(e,{cause:n}),this.__isWebAuthnError=!0,this.name=r??(n instanceof Error?n.name:void 0)??`Unknown Error`,this.code=t}toJSON(){return{name:this.name,message:this.message,code:this.code}}},ls=class extends B{constructor(e,t){super({code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:t,message:e}),this.name=`WebAuthnUnknownError`,this.originalError=t}};function us({error:e,options:t}){let{publicKey:n}=t;if(!n)throw Error(`options was missing required publicKey property`);if(e.name===`AbortError`){if(t.signal instanceof AbortSignal)return new B({message:`Registration ceremony was sent an abort signal`,code:`ERROR_CEREMONY_ABORTED`,cause:e})}else if(e.name===`ConstraintError`){if(n.authenticatorSelection?.requireResidentKey===!0)return new B({message:`Discoverable credentials were required but no available authenticator supported it`,code:`ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT`,cause:e});if(t.mediation===`conditional`&&n.authenticatorSelection?.userVerification===`required`)return new B({message:`User verification was required during automatic registration but it could not be performed`,code:`ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE`,cause:e});if(n.authenticatorSelection?.userVerification===`required`)return new B({message:`User verification was required but no available authenticator supported it`,code:`ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT`,cause:e})}else if(e.name===`InvalidStateError`)return new B({message:`The authenticator was previously registered`,code:`ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED`,cause:e});else if(e.name===`NotAllowedError`)return new B({message:e.message,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e});else if(e.name===`NotSupportedError`)return n.pubKeyCredParams.filter(e=>e.type===`public-key`).length===0?new B({message:`No entry in pubKeyCredParams was of type "public-key"`,code:`ERROR_MALFORMED_PUBKEYCREDPARAMS`,cause:e}):new B({message:`No available authenticator supported any of the specified pubKeyCredParams algorithms`,code:`ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG`,cause:e});else if(e.name===`SecurityError`){let t=window.location.hostname;if(!_s(t))return new B({message:`${window.location.hostname} is an invalid domain`,code:`ERROR_INVALID_DOMAIN`,cause:e});if(n.rp.id!==t)return new B({message:`The RP ID "${n.rp.id}" is invalid for this domain`,code:`ERROR_INVALID_RP_ID`,cause:e})}else if(e.name===`TypeError`){if(n.user.id.byteLength<1||n.user.id.byteLength>64)return new B({message:`User ID was not between 1 and 64 characters`,code:`ERROR_INVALID_USER_ID_LENGTH`,cause:e})}else if(e.name===`UnknownError`)return new B({message:`The authenticator was unable to process the specified options, or could not create a new credential`,code:`ERROR_AUTHENTICATOR_GENERAL_ERROR`,cause:e});return new B({message:`a Non-Webauthn related error has occurred`,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e})}function ds({error:e,options:t}){let{publicKey:n}=t;if(!n)throw Error(`options was missing required publicKey property`);if(e.name===`AbortError`){if(t.signal instanceof AbortSignal)return new B({message:`Authentication ceremony was sent an abort signal`,code:`ERROR_CEREMONY_ABORTED`,cause:e})}else if(e.name===`NotAllowedError`)return new B({message:e.message,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e});else if(e.name===`SecurityError`){let t=window.location.hostname;if(!_s(t))return new B({message:`${window.location.hostname} is an invalid domain`,code:`ERROR_INVALID_DOMAIN`,cause:e});if(n.rpId!==t)return new B({message:`The RP ID "${n.rpId}" is invalid for this domain`,code:`ERROR_INVALID_RP_ID`,cause:e})}else if(e.name===`UnknownError`)return new B({message:`The authenticator was unable to process the specified options, or could not create a new assertion signature`,code:`ERROR_AUTHENTICATOR_GENERAL_ERROR`,cause:e});return new B({message:`a Non-Webauthn related error has occurred`,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e})}var fs=new class{createNewAbortSignal(){if(this.controller){let e=Error(`Cancelling existing WebAuthn API call for new one`);e.name=`AbortError`,this.controller.abort(e)}let e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){let e=Error(`Manually cancelling existing WebAuthn API call`);e.name=`AbortError`,this.controller.abort(e),this.controller=void 0}}};function ps(e){if(!e)throw Error(`Credential creation options are required`);if(typeof PublicKeyCredential<`u`&&`parseCreationOptionsFromJSON`in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON==`function`)return PublicKeyCredential.parseCreationOptionsFromJSON(e);let{challenge:t,user:n,excludeCredentials:r}=e,i=$n(e,[`challenge`,`user`,`excludeCredentials`]),a=po(t).buffer,o=Object.assign(Object.assign({},n),{id:po(n.id).buffer}),s=Object.assign(Object.assign({},i),{challenge:a,user:o});if(r&&r.length>0){s.excludeCredentials=Array(r.length);for(let e=0;e<r.length;e++){let t=r[e];s.excludeCredentials[e]=Object.assign(Object.assign({},t),{id:po(t.id).buffer,type:t.type||`public-key`,transports:t.transports})}}return s}function ms(e){if(!e)throw Error(`Credential request options are required`);if(typeof PublicKeyCredential<`u`&&`parseRequestOptionsFromJSON`in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON==`function`)return PublicKeyCredential.parseRequestOptionsFromJSON(e);let{challenge:t,allowCredentials:n}=e,r=$n(e,[`challenge`,`allowCredentials`]),i=po(t).buffer,a=Object.assign(Object.assign({},r),{challenge:i});if(n&&n.length>0){a.allowCredentials=Array(n.length);for(let e=0;e<n.length;e++){let t=n[e];a.allowCredentials[e]=Object.assign(Object.assign({},t),{id:po(t.id).buffer,type:t.type||`public-key`,transports:t.transports})}}return a}function hs(e){if(`toJSON`in e&&typeof e.toJSON==`function`)return e.toJSON();let t=e;return{id:e.id,rawId:e.id,response:{attestationObject:ho(new Uint8Array(e.response.attestationObject)),clientDataJSON:ho(new Uint8Array(e.response.clientDataJSON))},type:`public-key`,clientExtensionResults:e.getClientExtensionResults(),authenticatorAttachment:t.authenticatorAttachment??void 0}}function gs(e){if(`toJSON`in e&&typeof e.toJSON==`function`)return e.toJSON();let t=e,n=e.getClientExtensionResults(),r=e.response;return{id:e.id,rawId:e.id,response:{authenticatorData:ho(new Uint8Array(r.authenticatorData)),clientDataJSON:ho(new Uint8Array(r.clientDataJSON)),signature:ho(new Uint8Array(r.signature)),userHandle:r.userHandle?ho(new Uint8Array(r.userHandle)):void 0},type:`public-key`,clientExtensionResults:n,authenticatorAttachment:t.authenticatorAttachment??void 0}}function _s(e){return e===`localhost`||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e)}function vs(){return!!(M()&&`PublicKeyCredential`in window&&window.PublicKeyCredential&&`credentials`in navigator&&typeof(navigator==null?void 0:navigator.credentials)?.create==`function`&&typeof(navigator==null?void 0:navigator.credentials)?.get==`function`)}async function ys(e){try{let t=await navigator.credentials.create(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new ls(`Browser returned unexpected credential type`,t)}:{data:null,error:new ls(`Empty credential response`,t)}}catch(t){return{data:null,error:us({error:t,options:e})}}}async function bs(e){try{let t=await navigator.credentials.get(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new ls(`Browser returned unexpected credential type`,t)}:{data:null,error:new ls(`Empty credential response`,t)}}catch(t){return{data:null,error:ds({error:t,options:e})}}}var xs={hints:[`security-key`],authenticatorSelection:{authenticatorAttachment:`cross-platform`,requireResidentKey:!1,userVerification:`preferred`,residentKey:`discouraged`},attestation:`direct`},Ss={userVerification:`preferred`,hints:[`security-key`],attestation:`direct`};function Cs(...e){let t=e=>typeof e==`object`&&!!e&&!Array.isArray(e),n=e=>e instanceof ArrayBuffer||ArrayBuffer.isView(e),r={};for(let i of e)if(i)for(let e in i){let a=i[e];if(a!==void 0)if(Array.isArray(a))r[e]=a;else if(n(a))r[e]=a;else if(t(a)){let n=r[e];t(n)?r[e]=Cs(n,a):r[e]=Cs(a)}else r[e]=a}return r}function ws(e,t){return Cs(xs,e,t||{})}function Ts(e,t){return Cs(Ss,e,t||{})}var Es=class{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:`webauthn`}))}async _challenge({factorId:e,webauthn:t,friendlyName:n,signal:r},i){try{let{data:a,error:o}=await this.client.mfa.challenge({factorId:e,webauthn:t});if(!a)return{data:null,error:o};let s=r??fs.createNewAbortSignal();if(a.webauthn.type===`create`){let{user:e}=a.webauthn.credential_options.publicKey;if(!e.name){let t=n;if(t)e.name=`${e.id}:${t}`;else{let t=(await this.client.getUser()).data.user,n=t?.user_metadata?.name||t?.email||t?.id||`User`;e.name=`${e.id}:${n}`}}e.displayName||=e.name}switch(a.webauthn.type){case`create`:{let{data:t,error:n}=await ys({publicKey:ws(a.webauthn.credential_options.publicKey,i?.create),signal:s});return t?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:t}},error:null}:{data:null,error:n}}case`request`:{let t=Ts(a.webauthn.credential_options.publicKey,i?.request),{data:n,error:r}=await bs(Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:t,signal:s}));return n?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:n}},error:null}:{data:null,error:r}}}}catch(e){return j(e)?{data:null,error:e}:{data:null,error:new Ua(`Unexpected error in challenge`,e)}}}async _verify({challengeId:e,factorId:t,webauthn:n}){return this.client.mfa.verify({factorId:t,challengeId:e,webauthn:n})}async _authenticate({factorId:e,webauthn:{rpId:t=typeof window<`u`?window.location.hostname:void 0,rpOrigins:n=typeof window<`u`?[window.location.origin]:void 0,signal:r}={}},i){if(!t)return{data:null,error:new Ba(`rpId is required for WebAuthn authentication`)};try{if(!vs())return{data:null,error:new Ua(`Browser does not support WebAuthn`,null)};let{data:a,error:o}=await this.challenge({factorId:e,webauthn:{rpId:t,rpOrigins:n},signal:r},{request:i});if(!a)return{data:null,error:o};let{webauthn:s}=a;return this._verify({factorId:e,challengeId:a.challengeId,webauthn:{type:s.type,rpId:t,rpOrigins:n,credential_response:s.credential_response}})}catch(e){return j(e)?{data:null,error:e}:{data:null,error:new Ua(`Unexpected error in authenticate`,e)}}}async _register({friendlyName:e,webauthn:{rpId:t=typeof window<`u`?window.location.hostname:void 0,rpOrigins:n=typeof window<`u`?[window.location.origin]:void 0,signal:r}={}},i){if(!t)return{data:null,error:new Ba(`rpId is required for WebAuthn registration`)};try{if(!vs())return{data:null,error:new Ua(`Browser does not support WebAuthn`,null)};let{data:a,error:o}=await this._enroll({friendlyName:e});if(!a)return await this.client.mfa.listFactors().then(t=>t.data?.all.find(t=>t.factor_type===`webauthn`&&t.friendly_name===e&&t.status!==`unverified`)).then(e=>e?this.client.mfa.unenroll({factorId:e?.id}):void 0),{data:null,error:o};let{data:s,error:c}=await this._challenge({factorId:a.id,friendlyName:a.friendly_name,webauthn:{rpId:t,rpOrigins:n},signal:r},{create:i});return s?this._verify({factorId:a.id,challengeId:s.challengeId,webauthn:{rpId:t,rpOrigins:n,type:s.webauthn.type,credential_response:s.webauthn.credential_response}}):{data:null,error:c}}catch(e){return j(e)?{data:null,error:e}:{data:null,error:new Ua(`Unexpected error in register`,e)}}}};is();var Ds={url:Pa,storageKey:Fa,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Ia,flowType:`implicit`,debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1,experimental:{}};async function Os(e,t,n){return await n()}var ks={},As=class e{get jwks(){return ks[this.storageKey]?.jwks??{keys:[]}}set jwks(e){ks[this.storageKey]=Object.assign(Object.assign({},ks[this.storageKey]),{jwks:e})}get jwks_cached_at(){return ks[this.storageKey]?.cachedAt??-(2**53-1)}set jwks_cached_at(e){ks[this.storageKey]=Object.assign(Object.assign({},ks[this.storageKey]),{cachedAt:e})}constructor(t){var n;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;let r=Object.assign(Object.assign({},Ds),t);if(this.storageKey=r.storageKey,this.instanceID=e.nextInstanceID[this.storageKey]??0,e.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!r.debug,typeof r.debug==`function`&&(this.logger=r.debug),this.instanceID>0&&M()){let e=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(e),this.logDebugMessages&&console.trace(e)}if(this.persistSession=r.persistSession,this.autoRefreshToken=r.autoRefreshToken,this.experimental=r.experimental??{},this.admin=new Qo({url:r.url,headers:r.headers,fetch:r.fetch,experimental:this.experimental}),this.url=r.url,this.headers=r.headers,this.fetch=P(r.fetch),this.lock=r.lock||Os,this.detectSessionInUrl=r.detectSessionInUrl,this.flowType=r.flowType,this.hasCustomAuthorizationHeader=r.hasCustomAuthorizationHeader,this.throwOnError=r.throwOnError,this.lockAcquireTimeout=r.lockAcquireTimeout,r.lock?this.lock=r.lock:this.persistSession&&M()&&(globalThis==null?void 0:globalThis.navigator)?.locks?this.lock=rs:this.lock=Os,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=-(2**53-1)),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Es(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.passkey={startRegistration:this._startPasskeyRegistration.bind(this),verifyRegistration:this._verifyPasskeyRegistration.bind(this),startAuthentication:this._startPasskeyAuthentication.bind(this),verifyAuthentication:this._verifyPasskeyAuthentication.bind(this),list:this._listPasskeys.bind(this),update:this._updatePasskey.bind(this),delete:this._deletePasskey.bind(this)},this.persistSession?(r.storage?this.storage=r.storage:vo()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=$o(this.memoryStorage)),r.userStorage&&(this.userStorage=r.userStorage)):(this.memoryStorage={},this.storage=$o(this.memoryStorage)),M()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(e){console.error(`Failed to create a new BroadcastChannel, multi-tab state changes will not be available`,e)}(n=this.broadcastChannel)==null||n.addEventListener(`message`,async e=>{this._debug(`received broadcast notification from other tab or client`,e);try{await this._notifyAllSubscribers(e.data.event,e.data.session,!1)}catch(e){this._debug(`#broadcastChannel`,`error`,e)}})}r.skipAutoInitialize||this.initialize().catch(e=>{this._debug(`#initialize()`,`error`,e)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${ja}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){return this.initializePromise||=(async()=>await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))(),await this.initializePromise}async _initialize(){try{let e={},t=`none`;if(M()&&(e=yo(window.location.href),this._isImplicitGrantCallback(e)?t=`implicit`:await this._isPKCECallback(e)&&(t=`pkce`)),M()&&this.detectSessionInUrl&&t!==`none`){let{data:n,error:r}=await this._getSessionFromURL(e,t);if(r){if(this._debug(`#_initialize()`,`error detecting session from URL`,r),Xa(r)){let e=r.details?.code;if(e===`identity_already_exists`||e===`identity_not_found`||e===`single_identity_not_deletable`)return{error:r}}return{error:r}}let{session:i,redirectType:a}=n;return this._debug(`#_initialize()`,`detected session in URL`,i,`redirect type`,a),await this._saveSession(i),setTimeout(async()=>{a===`recovery`?await this._notifyAllSubscribers(`PASSWORD_RECOVERY`,i):await this._notifyAllSubscribers(`SIGNED_IN`,i)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(e){return j(e)?this._returnResult({error:e}):this._returnResult({error:new Ua(`Unexpected error during initialization`,e)})}finally{await this._handleVisibilityChange(),this._debug(`#_initialize()`,`end`)}}async signInAnonymously(e){try{let{data:t,error:n}=await z(this.fetch,`POST`,`${this.url}/signup`,{headers:this.headers,body:{data:e?.options?.data??{},gotrue_meta_security:{captcha_token:e?.options?.captchaToken}},xform:Wo});if(n||!t)return this._returnResult({data:{user:null,session:null},error:n});let r=t.session,i=t.user;return t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers(`SIGNED_IN`,r)),this._returnResult({data:{user:i,session:r},error:null})}catch(e){if(j(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signUp(e){try{let t;if(`email`in e){let{email:n,password:r,options:i}=e,a=null,o=null;this.flowType===`pkce`&&([a,o]=await Ao(this.storage,this.storageKey)),t=await z(this.fetch,`POST`,`${this.url}/signup`,{headers:this.headers,redirectTo:i?.emailRedirectTo,body:{email:n,password:r,data:i?.data??{},gotrue_meta_security:{captcha_token:i?.captchaToken},code_challenge:a,code_challenge_method:o},xform:Wo})}else if(`phone`in e){let{phone:n,password:r,options:i}=e;t=await z(this.fetch,`POST`,`${this.url}/signup`,{headers:this.headers,body:{phone:n,password:r,data:i?.data??{},channel:i?.channel??`sms`,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Wo})}else throw new Ja(`You must provide either an email or phone number and a password`);let{data:n,error:r}=t;if(r||!n)return await xo(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:r});let i=n.session,a=n.user;return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers(`SIGNED_IN`,i)),this._returnResult({data:{user:a,session:i},error:null})}catch(e){if(await xo(this.storage,`${this.storageKey}-code-verifier`),j(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithPassword(e){try{let t;if(`email`in e){let{email:n,password:r,options:i}=e;t=await z(this.fetch,`POST`,`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:n,password:r,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Go})}else if(`phone`in e){let{phone:n,password:r,options:i}=e;t=await z(this.fetch,`POST`,`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:n,password:r,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Go})}else throw new Ja(`You must provide either an email or phone number and a password`);let{data:n,error:r}=t;if(r)return this._returnResult({data:{user:null,session:null},error:r});if(!n||!n.session||!n.user){let e=new qa;return this._returnResult({data:{user:null,session:null},error:e})}return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers(`SIGNED_IN`,n.session)),this._returnResult({data:Object.assign({user:n.user,session:n.session},n.weak_password?{weakPassword:n.weak_password}:null),error:r})}catch(e){if(j(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithOAuth(e){return await this._handleProviderSignIn(e.provider,{redirectTo:e.options?.redirectTo,scopes:e.options?.scopes,queryParams:e.options?.queryParams,skipBrowserRedirect:e.options?.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){let{chain:t}=e;switch(t){case`ethereum`:return await this.signInWithEthereum(e);case`solana`:return await this.signInWithSolana(e);default:throw Error(`@supabase/auth-js: Unsupported chain "${t}"`)}}async signInWithEthereum(e){let t,n;if(`message`in e)t=e.message,n=e.signature;else{let{chain:r,wallet:i,statement:a,options:o}=e,s;if(!M()){if(typeof i!=`object`||!o?.url)throw Error(`@supabase/auth-js: Both wallet and url must be specified in non-browser environments.`);s=i}else if(typeof i==`object`)s=i;else{let e=window;if(`ethereum`in e&&typeof e.ethereum==`object`&&`request`in e.ethereum&&typeof e.ethereum.request==`function`)s=e.ethereum;else throw Error(`@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.`)}let c=new URL(o?.url??window.location.href),l=await s.request({method:`eth_requestAccounts`}).then(e=>e).catch(()=>{throw Error(`@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid`)});if(!l||l.length===0)throw Error(`@supabase/auth-js: No accounts available. Please ensure the wallet is connected.`);let u=as(l[0]),d=o?.signInWithEthereum?.chainId;d||=os(await s.request({method:`eth_chainId`})),t=cs({domain:c.host,address:u,statement:a,uri:c.href,version:`1`,chainId:d,nonce:o?.signInWithEthereum?.nonce,issuedAt:o?.signInWithEthereum?.issuedAt??new Date,expirationTime:o?.signInWithEthereum?.expirationTime,notBefore:o?.signInWithEthereum?.notBefore,requestId:o?.signInWithEthereum?.requestId,resources:o?.signInWithEthereum?.resources}),n=await s.request({method:`personal_sign`,params:[ss(t),u]})}try{let{data:r,error:i}=await z(this.fetch,`POST`,`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:`ethereum`,message:t,signature:n},e.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options?.captchaToken}}:null),xform:Wo});if(i)throw i;if(!r||!r.session||!r.user){let e=new qa;return this._returnResult({data:{user:null,session:null},error:e})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers(`SIGNED_IN`,r.session)),this._returnResult({data:Object.assign({},r),error:i})}catch(e){if(j(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithSolana(e){let t,n;if(`message`in e)t=e.message,n=e.signature;else{let{chain:r,wallet:i,statement:a,options:o}=e,s;if(!M()){if(typeof i!=`object`||!o?.url)throw Error(`@supabase/auth-js: Both wallet and url must be specified in non-browser environments.`);s=i}else if(typeof i==`object`)s=i;else{let e=window;if(`solana`in e&&typeof e.solana==`object`&&(`signIn`in e.solana&&typeof e.solana.signIn==`function`||`signMessage`in e.solana&&typeof e.solana.signMessage==`function`))s=e.solana;else throw Error(`@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.`)}let c=new URL(o?.url??window.location.href);if(`signIn`in s&&s.signIn){let e=await s.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},o?.signInWithSolana),{version:`1`,domain:c.host,uri:c.href}),a?{statement:a}:null)),r;if(Array.isArray(e)&&e[0]&&typeof e[0]==`object`)r=e[0];else if(e&&typeof e==`object`&&`signedMessage`in e&&`signature`in e)r=e;else throw Error(`@supabase/auth-js: Wallet method signIn() returned unrecognized value`);if(`signedMessage`in r&&`signature`in r&&(typeof r.signedMessage==`string`||r.signedMessage instanceof Uint8Array)&&r.signature instanceof Uint8Array)t=typeof r.signedMessage==`string`?r.signedMessage:new TextDecoder().decode(r.signedMessage),n=r.signature;else throw Error(`@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields`)}else{if(!(`signMessage`in s)||typeof s.signMessage!=`function`||!(`publicKey`in s)||typeof s!=`object`||!s.publicKey||!(`toBase58`in s.publicKey)||typeof s.publicKey.toBase58!=`function`)throw Error(`@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API`);t=[`${c.host} wants you to sign in with your Solana account:`,s.publicKey.toBase58(),...a?[``,a,``]:[``],`Version: 1`,`URI: ${c.href}`,`Issued At: ${o?.signInWithSolana?.issuedAt??new Date().toISOString()}`,...o?.signInWithSolana?.notBefore?[`Not Before: ${o.signInWithSolana.notBefore}`]:[],...o?.signInWithSolana?.expirationTime?[`Expiration Time: ${o.signInWithSolana.expirationTime}`]:[],...o?.signInWithSolana?.chainId?[`Chain ID: ${o.signInWithSolana.chainId}`]:[],...o?.signInWithSolana?.nonce?[`Nonce: ${o.signInWithSolana.nonce}`]:[],...o?.signInWithSolana?.requestId?[`Request ID: ${o.signInWithSolana.requestId}`]:[],...o?.signInWithSolana?.resources?.length?[`Resources`,...o.signInWithSolana.resources.map(e=>`- ${e}`)]:[]].join(`
`);let e=await s.signMessage(new TextEncoder().encode(t),`utf8`);if(!e||!(e instanceof Uint8Array))throw Error(`@supabase/auth-js: Wallet signMessage() API returned an recognized value`);n=e}}try{let{data:r,error:i}=await z(this.fetch,`POST`,`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:`solana`,message:t,signature:ho(n)},e.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options?.captchaToken}}:null),xform:Wo});if(i)throw i;if(!r||!r.session||!r.user){let e=new qa;return this._returnResult({data:{user:null,session:null},error:e})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers(`SIGNED_IN`,r.session)),this._returnResult({data:Object.assign({},r),error:i})}catch(e){if(j(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async _exchangeCodeForSession(e){let[t,n]=(await bo(this.storage,`${this.storageKey}-code-verifier`)??``).split(`/`);try{if(!t&&this.flowType===`pkce`)throw new Qa;let{data:r,error:i}=await z(this.fetch,`POST`,`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:t},xform:Wo});if(await xo(this.storage,`${this.storageKey}-code-verifier`),i)throw i;if(!r||!r.session||!r.user){let e=new qa;return this._returnResult({data:{user:null,session:null,redirectType:null},error:e})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers(n===`recovery`?`PASSWORD_RECOVERY`:`SIGNED_IN`,r.session)),this._returnResult({data:Object.assign(Object.assign({},r),{redirectType:n??null}),error:i})}catch(e){if(await xo(this.storage,`${this.storageKey}-code-verifier`),j(e))return this._returnResult({data:{user:null,session:null,redirectType:null},error:e});throw e}}async signInWithIdToken(e){try{let{options:t,provider:n,token:r,access_token:i,nonce:a}=e,{data:o,error:s}=await z(this.fetch,`POST`,`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:n,id_token:r,access_token:i,nonce:a,gotrue_meta_security:{captcha_token:t?.captchaToken}},xform:Wo});if(s)return this._returnResult({data:{user:null,session:null},error:s});if(!o||!o.session||!o.user){let e=new qa;return this._returnResult({data:{user:null,session:null},error:e})}return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers(`SIGNED_IN`,o.session)),this._returnResult({data:o,error:s})}catch(e){if(j(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithOtp(e){try{if(`email`in e){let{email:t,options:n}=e,r=null,i=null;this.flowType===`pkce`&&([r,i]=await Ao(this.storage,this.storageKey));let{error:a}=await z(this.fetch,`POST`,`${this.url}/otp`,{headers:this.headers,body:{email:t,data:n?.data??{},create_user:n?.shouldCreateUser??!0,gotrue_meta_security:{captcha_token:n?.captchaToken},code_challenge:r,code_challenge_method:i},redirectTo:n?.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:a})}if(`phone`in e){let{phone:t,options:n}=e,{data:r,error:i}=await z(this.fetch,`POST`,`${this.url}/otp`,{headers:this.headers,body:{phone:t,data:n?.data??{},create_user:n?.shouldCreateUser??!0,gotrue_meta_security:{captcha_token:n?.captchaToken},channel:n?.channel??`sms`}});return this._returnResult({data:{user:null,session:null,messageId:r?.message_id},error:i})}throw new Ja(`You must provide either an email or phone number.`)}catch(e){if(await xo(this.storage,`${this.storageKey}-code-verifier`),j(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async verifyOtp(e){try{let t,n;`options`in e&&(t=e.options?.redirectTo,n=e.options?.captchaToken);let{data:r,error:i}=await z(this.fetch,`POST`,`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:n}}),redirectTo:t,xform:Wo});if(i)throw i;if(!r)throw Error(`An error occurred on token verification.`);let a=r.session,o=r.user;return a?.access_token&&(await this._saveSession(a),await this._notifyAllSubscribers(e.type==`recovery`?`PASSWORD_RECOVERY`:`SIGNED_IN`,a)),this._returnResult({data:{user:o,session:a},error:null})}catch(e){if(j(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithSSO(e){try{let t=null,n=null;this.flowType===`pkce`&&([t,n]=await Ao(this.storage,this.storageKey));let r=await z(this.fetch,`POST`,`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},`providerId`in e?{provider_id:e.providerId}:null),`domain`in e?{domain:e.domain}:null),{redirect_to:e.options?.redirectTo??void 0}),e?.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:t,code_challenge_method:n}),headers:this.headers,xform:qo});return r.data?.url&&M()&&!e.options?.skipBrowserRedirect&&window.location.assign(r.data.url),this._returnResult(r)}catch(e){if(await xo(this.storage,`${this.storageKey}-code-verifier`),j(e))return this._returnResult({data:null,error:e});throw e}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;if(n)throw n;if(!t)throw new Ga;let{error:r}=await z(this.fetch,`GET`,`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return this._returnResult({data:{user:null,session:null},error:r})})}catch(e){if(j(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){try{let t=`${this.url}/resend`;if(`email`in e){let{email:n,type:r,options:i}=e,{error:a}=await z(this.fetch,`POST`,t,{headers:this.headers,body:{email:n,type:r,gotrue_meta_security:{captcha_token:i?.captchaToken}},redirectTo:i?.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:a})}else if(`phone`in e){let{phone:n,type:r,options:i}=e,{data:a,error:o}=await z(this.fetch,`POST`,t,{headers:this.headers,body:{phone:n,type:r,gotrue_meta_security:{captcha_token:i?.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:a?.message_id},error:o})}throw new Ja(`You must provide either an email or phone number and a type`)}catch(e){if(j(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async getSession(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async e=>e))}async _acquireLock(e,t){this._debug(`#_acquireLock`,`begin`,e);try{if(this.lockAcquired){let e=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),n=(async()=>(await e,await t()))();return this.pendingInLock.push((async()=>{try{await n}catch{}})()),n}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug(`#_acquireLock`,`lock acquired for storage key`,this.storageKey);try{this.lockAcquired=!0;let e=t();for(this.pendingInLock.push((async()=>{try{await e}catch{}})()),await e;this.pendingInLock.length;){let e=[...this.pendingInLock];await Promise.all(e),this.pendingInLock.splice(0,e.length)}return await e}finally{this._debug(`#_acquireLock`,`lock released for storage key`,this.storageKey),this.lockAcquired=!1}})}finally{this._debug(`#_acquireLock`,`end`)}}async _useSession(e){this._debug(`#_useSession`,`begin`);try{return await e(await this.__loadSession())}finally{this._debug(`#_useSession`,`end`)}}async __loadSession(){this._debug(`#__loadSession()`,`begin`),this.lockAcquired||this._debug(`#__loadSession()`,`used outside of an acquired lock!`,Error().stack);try{let e=null,t=await bo(this.storage,this.storageKey);if(this._debug(`#getSession()`,`session from storage`,t),t!==null&&(this._isValidSession(t)?e=t:(this._debug(`#getSession()`,`session from storage is not valid`),await this._removeSession())),!e)return{data:{session:null},error:null};let n=e.expires_at?e.expires_at*1e3-Date.now()<Na:!1;if(this._debug(`#__loadSession()`,`session has${n?``:` not`} expired`,`expires_at`,e.expires_at),!n){if(this.userStorage){let t=await bo(this.userStorage,this.storageKey+`-user`);t?.user?e.user=t.user:e.user=Io()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){let t={value:this.suppressGetSessionWarning};e.user=Lo(e.user,t),t.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}let{data:r,error:i}=await this._callRefreshToken(e.refresh_token);return i?this._returnResult({data:{session:null},error:i}):this._returnResult({data:{session:r},error:null})}finally{this._debug(`#__loadSession()`,`end`)}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;let t=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser());return t.data.user&&(this.suppressGetSessionWarning=!0),t}async _getUser(e){try{return e?await z(this.fetch,`GET`,`${this.url}/user`,{headers:this.headers,jwt:e,xform:Ko}):await this._useSession(async e=>{let{data:t,error:n}=e;if(n)throw n;return!t.session?.access_token&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new Ga}:await z(this.fetch,`GET`,`${this.url}/user`,{headers:this.headers,jwt:t.session?.access_token??void 0,xform:Ko})})}catch(e){if(j(e))return Ka(e)&&(await this._removeSession(),await xo(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:e});throw e}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){try{return await this._useSession(async n=>{let{data:r,error:i}=n;if(i)throw i;if(!r.session)throw new Ga;let a=r.session,o=null,s=null;this.flowType===`pkce`&&e.email!=null&&([o,s]=await Ao(this.storage,this.storageKey));let{data:c,error:l}=await z(this.fetch,`PUT`,`${this.url}/user`,{headers:this.headers,redirectTo:t?.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:o,code_challenge_method:s}),jwt:a.access_token,xform:Ko});if(l)throw l;return a.user=c.user,await this._saveSession(a),await this._notifyAllSubscribers(`USER_UPDATED`,a),this._returnResult({data:{user:a.user},error:null})})}catch(e){if(await xo(this.storage,`${this.storageKey}-code-verifier`),j(e))return this._returnResult({data:{user:null},error:e});throw e}}async setSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new Ga;let t=Date.now()/1e3,n=t,r=!0,i=null,{payload:a}=Co(e.access_token);if(a.exp&&(n=a.exp,r=n<=t),r){let{data:t,error:n}=await this._callRefreshToken(e.refresh_token);if(n)return this._returnResult({data:{user:null,session:null},error:n});if(!t)return{data:{user:null,session:null},error:null};i=t}else{let{data:r,error:a}=await this._getUser(e.access_token);if(a)return this._returnResult({data:{user:null,session:null},error:a});i={access_token:e.access_token,refresh_token:e.refresh_token,user:r.user,token_type:`bearer`,expires_in:n-t,expires_at:n},await this._saveSession(i),await this._notifyAllSubscribers(`SIGNED_IN`,i)}return this._returnResult({data:{user:i.user,session:i},error:null})}catch(e){if(j(e))return this._returnResult({data:{session:null,user:null},error:e});throw e}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{if(!e){let{data:n,error:r}=t;if(r)throw r;e=n.session??void 0}if(!e?.refresh_token)throw new Ga;let{data:n,error:r}=await this._callRefreshToken(e.refresh_token);return r?this._returnResult({data:{user:null,session:null},error:r}):n?this._returnResult({data:{user:n.user,session:n},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(e){if(j(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async _getSessionFromURL(e,t){try{if(!M())throw new Ya(`No browser detected.`);if(e.error||e.error_description||e.error_code)throw new Ya(e.error_description||`Error in URL with unspecified error_description`,{error:e.error||`unspecified_error`,code:e.error_code||`unspecified_code`});switch(t){case`implicit`:if(this.flowType===`pkce`)throw new Za(`Not a valid PKCE flow url.`);break;case`pkce`:if(this.flowType===`implicit`)throw new Ya(`Not a valid implicit grant flow url.`);break;default:}if(t===`pkce`){if(this._debug(`#_initialize()`,`begin`,`is PKCE flow`,!0),!e.code)throw new Za(`No code detected.`);let{data:t,error:n}=await this._exchangeCodeForSession(e.code);if(n)throw n;let r=new URL(window.location.href);return r.searchParams.delete(`code`),window.history.replaceState(window.history.state,``,r.toString()),{data:{session:t.session,redirectType:t.redirectType??null},error:null}}let{provider_token:n,provider_refresh_token:r,access_token:i,refresh_token:a,expires_in:o,expires_at:s,token_type:c}=e;if(!i||!o||!a||!c)throw new Ya(`No session defined in URL`);let l=Math.round(Date.now()/1e3),u=parseInt(o),d=l+u;s&&(d=parseInt(s));let f=d-l;f*1e3<=3e4&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${f}s, should have been closer to ${u}s`);let p=d-u;l-p>=120?console.warn(`@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale`,p,d,l):l-p<0&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew`,p,d,l);let{data:m,error:h}=await this._getUser(i);if(h)throw h;let g={provider_token:n,provider_refresh_token:r,access_token:i,expires_in:u,expires_at:d,refresh_token:a,token_type:c,user:m.user};return window.location.hash=``,this._debug(`#_getSessionFromURL()`,`clearing window.location.hash`),this._returnResult({data:{session:g,redirectType:e.type},error:null})}catch(e){if(j(e))return this._returnResult({data:{session:null,redirectType:null},error:e});throw e}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl==`function`?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error_description)}async _isPKCECallback(e){let t=await bo(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:`global`}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:`global`}){return await this._useSession(async t=>{let{data:n,error:r}=t;if(r&&!Ka(r))return this._returnResult({error:r});let i=n.session?.access_token;if(i){let{error:t}=await this.admin.signOut(i,e);if(t&&!(Ha(t)&&(t.status===404||t.status===401||t.status===403)||Ka(t)))return this._returnResult({error:t})}return e!==`others`&&(await this._removeSession(),await xo(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(e){let t=_o(),n={id:t,callback:e,unsubscribe:()=>{this._debug(`#unsubscribe()`,`state change callback with id removed`,t),this.stateChangeEmitters.delete(t)}};return this._debug(`#onAuthStateChange()`,`registered callback with id`,t),this.stateChangeEmitters.set(t,n),(async()=>{await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(t)})})(),{data:{subscription:n}}}async _emitInitialSession(e){return await this._useSession(async t=>{try{let{data:{session:n},error:r}=t;if(r)throw r;await this.stateChangeEmitters.get(e)?.callback(`INITIAL_SESSION`,n),this._debug(`INITIAL_SESSION`,`callback id`,e,`session`,n)}catch(t){await this.stateChangeEmitters.get(e)?.callback(`INITIAL_SESSION`,null),this._debug(`INITIAL_SESSION`,`callback id`,e,`error`,t),Ka(t)?console.warn(t):console.error(t)}})}async resetPasswordForEmail(e,t={}){let n=null,r=null;this.flowType===`pkce`&&([n,r]=await Ao(this.storage,this.storageKey,!0));try{return await z(this.fetch,`POST`,`${this.url}/recover`,{body:{email:e,code_challenge:n,code_challenge_method:r,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(e){if(await xo(this.storage,`${this.storageKey}-code-verifier`),j(e))return this._returnResult({data:null,error:e});throw e}}async getUserIdentities(){try{let{data:e,error:t}=await this.getUser();if(t)throw t;return this._returnResult({data:{identities:e.user.identities??[]},error:null})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}async linkIdentity(e){return`token`in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){try{let{data:t,error:n}=await this._useSession(async t=>{let{data:n,error:r}=t;if(r)throw r;let i=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:e.options?.redirectTo,scopes:e.options?.scopes,queryParams:e.options?.queryParams,skipBrowserRedirect:!0});return await z(this.fetch,`GET`,i,{headers:this.headers,jwt:n.session?.access_token??void 0})});if(n)throw n;return M()&&!e.options?.skipBrowserRedirect&&window.location.assign(t?.url),this._returnResult({data:{provider:e.provider,url:t?.url},error:null})}catch(t){if(j(t))return this._returnResult({data:{provider:e.provider,url:null},error:t});throw t}}async linkIdentityIdToken(e){return await this._useSession(async t=>{try{let{error:n,data:{session:r}}=t;if(n)throw n;let{options:i,provider:a,token:o,access_token:s,nonce:c}=e,{data:l,error:u}=await z(this.fetch,`POST`,`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:r?.access_token??void 0,body:{provider:a,id_token:o,access_token:s,nonce:c,link_identity:!0,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Wo});return u?this._returnResult({data:{user:null,session:null},error:u}):!l||!l.session||!l.user?this._returnResult({data:{user:null,session:null},error:new qa}):(l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers(`USER_UPDATED`,l.session)),this._returnResult({data:l,error:u}))}catch(e){if(await xo(this.storage,`${this.storageKey}-code-verifier`),j(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}})}async unlinkIdentity(e){try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)throw r;return await z(this.fetch,`DELETE`,`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:n.session?.access_token??void 0})})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}async _refreshAccessToken(e){let t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,`begin`);try{let n=Date.now();return await To(async n=>(n>0&&await wo(200*2**(n-1)),this._debug(t,`refreshing attempt`,n),await z(this.fetch,`POST`,`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:Wo})),(e,t)=>{let r=200*2**e;return t&&eo(t)&&Date.now()+r-n<3e4})}catch(e){if(this._debug(t,`error`,e),j(e))return this._returnResult({data:{session:null,user:null},error:e});throw e}finally{this._debug(t,`end`)}}_isValidSession(e){return typeof e==`object`&&!!e&&`access_token`in e&&`refresh_token`in e&&`expires_at`in e}async _handleProviderSignIn(e,t){let n=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug(`#_handleProviderSignIn()`,`provider`,e,`options`,t,`url`,n),M()&&!t.skipBrowserRedirect&&window.location.assign(n),{data:{provider:e,url:n},error:null}}async _recoverAndRefresh(){let e=`#_recoverAndRefresh()`;this._debug(e,`begin`);try{let t=await bo(this.storage,this.storageKey);if(t&&this.userStorage){let e=await bo(this.userStorage,this.storageKey+`-user`);!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!e&&(e={user:t.user},await I(this.userStorage,this.storageKey+`-user`,e)),t.user=e?.user??Io()}else if(t&&!t.user&&!t.user){let e=await bo(this.storage,this.storageKey+`-user`);e&&e?.user?(t.user=e.user,await xo(this.storage,this.storageKey+`-user`),await I(this.storage,this.storageKey,t)):t.user=Io()}if(this._debug(e,`session from storage`,t),!this._isValidSession(t)){this._debug(e,`session is not valid`),t!==null&&await this._removeSession();return}let n=(t.expires_at??1/0)*1e3-Date.now()<Na;if(this._debug(e,`session has${n?``:` not`} expired with margin of ${Na}s`),n){if(this.autoRefreshToken&&t.refresh_token){let{error:n}=await this._callRefreshToken(t.refresh_token);n&&(console.error(n),eo(n)||(this._debug(e,`refresh failed with a non-retryable error, removing the session`,n),await this._removeSession()))}}else if(t.user&&t.user.__isUserNotAvailableProxy===!0)try{let{data:n,error:r}=await this._getUser(t.access_token);!r&&n?.user?(t.user=n.user,await this._saveSession(t),await this._notifyAllSubscribers(`SIGNED_IN`,t)):this._debug(e,`could not get user data, skipping SIGNED_IN notification`)}catch(t){console.error(`Error getting user data:`,t),this._debug(e,`error getting user data, skipping SIGNED_IN notification`,t)}else await this._notifyAllSubscribers(`SIGNED_IN`,t)}catch(t){this._debug(e,`error`,t),console.error(t);return}finally{this._debug(e,`end`)}}async _callRefreshToken(e){var t,n;if(!e)throw new Ga;if(this.refreshingDeferred)return this.refreshingDeferred.promise;let r=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(r,`begin`);try{this.refreshingDeferred=new So;let{data:t,error:n}=await this._refreshAccessToken(e);if(n)throw n;if(!t.session)throw new Ga;await this._saveSession(t.session),await this._notifyAllSubscribers(`TOKEN_REFRESHED`,t.session);let r={data:t.session,error:null};return this.refreshingDeferred.resolve(r),r}catch(e){if(this._debug(r,`error`,e),j(e)){let n={data:null,error:e};return eo(e)||await this._removeSession(),(t=this.refreshingDeferred)==null||t.resolve(n),n}throw(n=this.refreshingDeferred)==null||n.reject(e),e}finally{this.refreshingDeferred=null,this._debug(r,`end`)}}async _notifyAllSubscribers(e,t,n=!0){let r=`#_notifyAllSubscribers(${e})`;this._debug(r,`begin`,t,`broadcast = ${n}`);try{this.broadcastChannel&&n&&this.broadcastChannel.postMessage({event:e,session:t});let r=[],i=Array.from(this.stateChangeEmitters.values()).map(async n=>{try{await n.callback(e,t)}catch(e){r.push(e)}});if(await Promise.all(i),r.length>0){for(let e=0;e<r.length;e+=1)console.error(r[e]);throw r[0]}}finally{this._debug(r,`end`)}}async _saveSession(e){this._debug(`#_saveSession()`,e),this.suppressGetSessionWarning=!0,await xo(this.storage,`${this.storageKey}-code-verifier`);let t=Object.assign({},e),n=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!n&&t.user&&await I(this.userStorage,this.storageKey+`-user`,{user:t.user});let e=Object.assign({},t);delete e.user;let r=Ro(e);await I(this.storage,this.storageKey,r)}else{let e=Ro(t);await I(this.storage,this.storageKey,e)}}async _removeSession(){this._debug(`#_removeSession()`),this.suppressGetSessionWarning=!1,await xo(this.storage,this.storageKey),await xo(this.storage,this.storageKey+`-code-verifier`),await xo(this.storage,this.storageKey+`-user`),this.userStorage&&await xo(this.userStorage,this.storageKey+`-user`),await this._notifyAllSubscribers(`SIGNED_OUT`,null)}_removeVisibilityChangedCallback(){this._debug(`#_removeVisibilityChangedCallback()`);let e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&M()&&window!=null&&window.removeEventListener&&window.removeEventListener(`visibilitychange`,e)}catch(e){console.error(`removing visibilitychange callback failed`,e)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug(`#_startAutoRefresh()`);let e=setInterval(()=>this._autoRefreshTokenTick(),Ma);this.autoRefreshTicker=e,e&&typeof e==`object`&&typeof e.unref==`function`?e.unref():typeof Deno<`u`&&typeof Deno.unrefTimer==`function`&&Deno.unrefTimer(e);let t=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=t,t&&typeof t==`object`&&typeof t.unref==`function`?t.unref():typeof Deno<`u`&&typeof Deno.unrefTimer==`function`&&Deno.unrefTimer(t)}async _stopAutoRefresh(){this._debug(`#_stopAutoRefresh()`);let e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);let t=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,t&&clearTimeout(t)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug(`#_autoRefreshTokenTick()`,`begin`);try{await this._acquireLock(0,async()=>{try{let e=Date.now();try{return await this._useSession(async t=>{let{data:{session:n}}=t;if(!n||!n.refresh_token||!n.expires_at){this._debug(`#_autoRefreshTokenTick()`,`no session`);return}let r=Math.floor((n.expires_at*1e3-e)/Ma);this._debug(`#_autoRefreshTokenTick()`,`access token expires in ${r} ticks, a tick lasts ${Ma}ms, refresh threshold is 3 ticks`),r<=3&&await this._callRefreshToken(n.refresh_token)})}catch(e){console.error(`Auto refresh tick failed with error. This is likely a transient error.`,e)}}finally{this._debug(`#_autoRefreshTokenTick()`,`end`)}})}catch(e){if(e instanceof ts)this._debug(`auto refresh token tick lock not available`);else throw e}}async _handleVisibilityChange(){if(this._debug(`#_handleVisibilityChange()`),!M()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug(`#visibilityChangedCallback`,`error`,e)}},window==null||window.addEventListener(`visibilitychange`,this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error(`_handleVisibilityChange`,e)}}async _onVisibilityChanged(e){let t=`#_onVisibilityChanged(${e})`;this._debug(t,`visibilityState`,document.visibilityState),document.visibilityState===`visible`?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!==`visible`){this._debug(t,`acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting`);return}await this._recoverAndRefresh()}))):document.visibilityState===`hidden`&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,n){let r=[`provider=${encodeURIComponent(t)}`];if(n?.redirectTo&&r.push(`redirect_to=${encodeURIComponent(n.redirectTo)}`),n?.scopes&&r.push(`scopes=${encodeURIComponent(n.scopes)}`),this.flowType===`pkce`){let[e,t]=await Ao(this.storage,this.storageKey),n=new URLSearchParams({code_challenge:`${encodeURIComponent(e)}`,code_challenge_method:`${encodeURIComponent(t)}`});r.push(n.toString())}if(n?.queryParams){let e=new URLSearchParams(n.queryParams);r.push(e.toString())}return n?.skipBrowserRedirect&&r.push(`skip_http_redirect=${n.skipBrowserRedirect}`),`${e}?${r.join(`&`)}`}async _unenroll(e){try{return await this._useSession(async t=>{let{data:n,error:r}=t;return r?this._returnResult({data:null,error:r}):await z(this.fetch,`DELETE`,`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:n?.session?.access_token})})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}async _enroll(e){try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let i=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType===`phone`?{phone:e.phone}:e.factorType===`totp`?{issuer:e.issuer}:{}),{data:a,error:o}=await z(this.fetch,`POST`,`${this.url}/factors`,{body:i,headers:this.headers,jwt:n?.session?.access_token});return o?this._returnResult({data:null,error:o}):(e.factorType===`totp`&&a.type===`totp`&&a?.totp?.qr_code&&(a.totp.qr_code=`data:image/svg+xml;utf-8,${a.totp.qr_code}`),this._returnResult({data:a,error:null}))})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}async _verify(e){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let i=Object.assign({challenge_id:e.challengeId},`webauthn`in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type===`create`?hs(e.webauthn.credential_response):gs(e.webauthn.credential_response)})}:{code:e.code}),{data:a,error:o}=await z(this.fetch,`POST`,`${this.url}/factors/${e.factorId}/verify`,{body:i,headers:this.headers,jwt:n?.session?.access_token});return o?this._returnResult({data:null,error:o}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+a.expires_in},a)),await this._notifyAllSubscribers(`MFA_CHALLENGE_VERIFIED`,a),this._returnResult({data:a,error:o}))})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}})}async _challenge(e){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let i=await z(this.fetch,`POST`,`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:n?.session?.access_token});if(i.error)return i;let{data:a}=i;if(a.type!==`webauthn`)return{data:a,error:null};switch(a.webauthn.type){case`create`:return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:ps(a.webauthn.credential_options.publicKey)})})}),error:null};case`request`:return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:ms(a.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}})}async _challengeAndVerify(e){let{data:t,error:n}=await this._challenge({factorId:e.factorId});return n?this._returnResult({data:null,error:n}):await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){let{data:{user:e},error:t}=await this.getUser();if(t)return{data:null,error:t};let n={all:[],phone:[],totp:[],webauthn:[]};for(let t of e?.factors??[])n.all.push(t),t.status===`verified`&&n[t.factor_type].push(t);return{data:n,error:null}}async _getAuthenticatorAssuranceLevel(e){if(e)try{let{payload:t}=Co(e),n=null;t.aal&&(n=t.aal);let r=n,{data:{user:i},error:a}=await this.getUser(e);if(a)return this._returnResult({data:null,error:a});((i?.factors)?.filter(e=>e.status===`verified`)??[]).length>0&&(r=`aal2`);let o=t.amr||[];return{data:{currentLevel:n,nextLevel:r,currentAuthenticationMethods:o},error:null}}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}let{data:{session:t},error:n}=await this.getSession();if(n)return this._returnResult({data:null,error:n});if(!t)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};let{payload:r}=Co(t.access_token),i=null;r.aal&&(i=r.aal);let a=i;(t.user.factors?.filter(e=>e.status===`verified`)??[]).length>0&&(a=`aal2`);let o=r.amr||[];return{data:{currentLevel:i,nextLevel:a,currentAuthenticationMethods:o},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;return r?this._returnResult({data:null,error:r}):n?await z(this.fetch,`GET`,`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:n.access_token,xform:e=>({data:e,error:null})}):this._returnResult({data:null,error:new Ga})})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}async _approveAuthorization(e,t){try{return await this._useSession(async n=>{let{data:{session:r},error:i}=n;if(i)return this._returnResult({data:null,error:i});if(!r)return this._returnResult({data:null,error:new Ga});let a=await z(this.fetch,`POST`,`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:`approve`},xform:e=>({data:e,error:null})});return a.data&&a.data.redirect_url&&M()&&!t?.skipBrowserRedirect&&window.location.assign(a.data.redirect_url),a})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}async _denyAuthorization(e,t){try{return await this._useSession(async n=>{let{data:{session:r},error:i}=n;if(i)return this._returnResult({data:null,error:i});if(!r)return this._returnResult({data:null,error:new Ga});let a=await z(this.fetch,`POST`,`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:`deny`},xform:e=>({data:e,error:null})});return a.data&&a.data.redirect_url&&M()&&!t?.skipBrowserRedirect&&window.location.assign(a.data.redirect_url),a})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}async _listOAuthGrants(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;return n?this._returnResult({data:null,error:n}):t?await z(this.fetch,`GET`,`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:t.access_token,xform:e=>({data:e,error:null})}):this._returnResult({data:null,error:new Ga})})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;return r?this._returnResult({data:null,error:r}):n?(await z(this.fetch,`DELETE`,`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:n.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new Ga})})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}async fetchJwk(e,t={keys:[]}){let n=t.keys.find(t=>t.kid===e);if(n)return n;let r=Date.now();if(n=this.jwks.keys.find(t=>t.kid===e),n&&this.jwks_cached_at+6e5>r)return n;let{data:i,error:a}=await z(this.fetch,`GET`,`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(a)throw a;return!i.keys||i.keys.length===0||(this.jwks=i,this.jwks_cached_at=r,n=i.keys.find(t=>t.kid===e),!n)?null:n}async getClaims(e,t={}){try{let n=e;if(!n){let{data:e,error:t}=await this.getSession();if(t||!e.session)return this._returnResult({data:null,error:t});n=e.session.access_token}let{header:r,payload:i,signature:a,raw:{header:o,payload:s}}=Co(n);t?.allowExpired||No(i.exp);let c=!r.alg||r.alg.startsWith(`HS`)||!r.kid||!(`crypto`in globalThis&&`subtle`in globalThis.crypto)?null:await this.fetchJwk(r.kid,t?.keys?{keys:t.keys}:t?.jwks);if(!c){let{error:e}=await this.getUser(n);if(e)throw e;return{data:{claims:i,header:r,signature:a},error:null}}let l=Po(r.alg),u=await crypto.subtle.importKey(`jwk`,c,l,!0,[`verify`]);if(!await crypto.subtle.verify(l,u,a,mo(`${o}.${s}`)))throw new no(`Invalid JWT signature`);return{data:{claims:i,header:r,signature:a},error:null}}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}async signInWithPasskey(e){R(this.experimental);try{if(!vs())return this._returnResult({data:null,error:new Ua(`Browser does not support WebAuthn`,null)});let{data:t,error:n}=await this._startPasskeyAuthentication({options:{captchaToken:e?.options?.captchaToken}});if(n||!t)return this._returnResult({data:null,error:n});let{data:r,error:i}=await bs({publicKey:ms(t.options),signal:e?.options?.signal??fs.createNewAbortSignal()});if(i||!r)return this._returnResult({data:null,error:i??new Ua(`WebAuthn ceremony failed`,null)});let a=gs(r);return this._verifyPasskeyAuthentication({challengeId:t.challenge_id,credential:a})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}async registerPasskey(e){R(this.experimental);try{if(!vs())return this._returnResult({data:null,error:new Ua(`Browser does not support WebAuthn`,null)});let{data:t,error:n}=await this._startPasskeyRegistration();if(n||!t)return this._returnResult({data:null,error:n});let{data:r,error:i}=await ys({publicKey:ps(t.options),signal:e?.options?.signal??fs.createNewAbortSignal()});if(i||!r)return this._returnResult({data:null,error:i??new Ua(`WebAuthn ceremony failed`,null)});let a=hs(r);return this._verifyPasskeyRegistration({challengeId:t.challenge_id,credential:a})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}async _startPasskeyRegistration(){R(this.experimental);try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;if(n)return this._returnResult({data:null,error:n});if(!t)return this._returnResult({data:null,error:new Ga});let{data:r,error:i}=await z(this.fetch,`POST`,`${this.url}/passkeys/registration/options`,{headers:this.headers,jwt:t.access_token,body:{}});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyRegistration(e){R(this.experimental);try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new Ga});let{data:i,error:a}=await z(this.fetch,`POST`,`${this.url}/passkeys/registration/verify`,{headers:this.headers,jwt:n.access_token,body:{challenge_id:e.challengeId,credential:e.credential}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:i,error:null})})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}async _startPasskeyAuthentication(e){R(this.experimental);try{let{data:t,error:n}=await z(this.fetch,`POST`,`${this.url}/passkeys/authentication/options`,{headers:this.headers,body:{gotrue_meta_security:{captcha_token:e?.options?.captchaToken}}});return n?this._returnResult({data:null,error:n}):this._returnResult({data:t,error:null})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyAuthentication(e){R(this.experimental);try{let{data:t,error:n}=await z(this.fetch,`POST`,`${this.url}/passkeys/authentication/verify`,{headers:this.headers,body:{challenge_id:e.challengeId,credential:e.credential},xform:Wo});return n?this._returnResult({data:null,error:n}):(t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers(`SIGNED_IN`,t.session)),this._returnResult({data:t,error:null}))}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}async _listPasskeys(){R(this.experimental);try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;if(n)return this._returnResult({data:null,error:n});if(!t)return this._returnResult({data:null,error:new Ga});let{data:r,error:i}=await z(this.fetch,`GET`,`${this.url}/passkeys`,{headers:this.headers,jwt:t.access_token,xform:e=>({data:e,error:null})});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}async _updatePasskey(e){R(this.experimental);try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new Ga});let{data:i,error:a}=await z(this.fetch,`PATCH`,`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:n.access_token,body:{friendly_name:e.friendlyName}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:i,error:null})})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}async _deletePasskey(e){R(this.experimental);try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new Ga});let{error:i}=await z(this.fetch,`DELETE`,`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:n.access_token,noResolveJson:!0});return i?this._returnResult({data:null,error:i}):this._returnResult({data:null,error:null})})}catch(e){if(j(e))return this._returnResult({data:null,error:e});throw e}}};As.nextInstanceID={};var js=As,Ms=`2.105.3`,Ns=``;Ns=typeof Deno<`u`?`deno`:typeof document<`u`?`web`:typeof navigator<`u`&&navigator.product===`ReactNative`?`react-native`:`node`;var Ps={headers:{"X-Client-Info":`supabase-js-${Ns}/${Ms}`}},Fs={schema:`public`},Is={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:`implicit`},Ls={};function Rs(e){"@babel/helpers - typeof";return Rs=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Rs(e)}function zs(e,t){if(Rs(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(Rs(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function Bs(e){var t=zs(e,`string`);return Rs(t)==`symbol`?t:t+``}function Vs(e,t,n){return(t=Bs(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Hs(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function V(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?Hs(Object(n),!0).forEach(function(t){Vs(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Hs(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var Us=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),Ws=()=>Headers,Gs=(e,t,n)=>{let r=Us(n),i=Ws();return async(n,a)=>{let o=await t()??e,s=new i(a?.headers);return s.has(`apikey`)||s.set(`apikey`,e),s.has(`Authorization`)||s.set(`Authorization`,`Bearer ${o}`),r(n,V(V({},a),{},{headers:s}))}};function Ks(e){return e.endsWith(`/`)?e:e+`/`}function qs(e,t){let{db:n,auth:r,realtime:i,global:a}=e,{db:o,auth:s,realtime:c,global:l}=t,u={db:V(V({},o),n),auth:V(V({},s),r),realtime:V(V({},c),i),storage:{},global:V(V(V({},l),a),{},{headers:V(V({},l?.headers??{}),a?.headers??{})}),accessToken:async()=>``};return e.accessToken?u.accessToken=e.accessToken:delete u.accessToken,u}function Js(e){let t=e?.trim();if(!t)throw Error(`supabaseUrl is required.`);if(!t.match(/^https?:\/\//i))throw Error(`Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.`);try{return new URL(Ks(t))}catch{throw Error(`Invalid supabaseUrl: Provided URL is malformed.`)}}var Ys=class extends js{constructor(e){super(e)}},Xs=class{constructor(e,t,n){this.supabaseUrl=e,this.supabaseKey=t;let r=Js(e);if(!t)throw Error(`supabaseKey is required.`);this.realtimeUrl=new URL(`realtime/v1`,r),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace(`http`,`ws`),this.authUrl=new URL(`auth/v1`,r),this.storageUrl=new URL(`storage/v1`,r),this.functionsUrl=new URL(`functions/v1`,r);let i=`sb-${r.hostname.split(`.`)[0]}-auth-token`,a={db:Fs,realtime:Ls,auth:V(V({},Is),{},{storageKey:i}),global:Ps},o=qs(n??{},a);this.storageKey=o.auth.storageKey??``,this.headers=o.global.headers??{},o.accessToken?(this.accessToken=o.accessToken,this.auth=new Proxy({},{get:(e,t)=>{throw Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t)} is not possible`)}})):this.auth=this._initSupabaseAuthClient(o.auth??{},this.headers,o.global.fetch),this.fetch=Gs(t,this._getAccessToken.bind(this),o.global.fetch),this.realtime=this._initRealtimeClient(V({headers:this.headers,accessToken:this._getAccessToken.bind(this),fetch:this.fetch},o.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(e=>this.realtime.setAuth(e)).catch(e=>console.warn(`Failed to set initial Realtime auth token:`,e)),this.rest=new Er(new URL(`rest/v1`,r).href,{headers:this.headers,schema:o.db.schema,fetch:this.fetch,timeout:o.db.timeout,urlLengthLimit:o.db.urlLengthLimit}),this.storage=new Aa(this.storageUrl.href,this.headers,this.fetch,n?.storage),o.accessToken||this._listenForAuthEvents()}get functions(){return new sr(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},n={head:!1,get:!1,count:void 0}){return this.rest.rpc(e,t,n)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var e=this;if(e.accessToken)return await e.accessToken();let{data:t}=await e.auth.getSession();return t.session?.access_token??e.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:r,userStorage:i,storageKey:a,flowType:o,lock:s,debug:c,throwOnError:l,experimental:u,lockAcquireTimeout:d,skipAutoInitialize:f},p,m){let h={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Ys({url:this.authUrl.href,headers:V(V({},h),p),storageKey:a,autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:r,userStorage:i,flowType:o,lock:s,debug:c,throwOnError:l,experimental:u,fetch:m,lockAcquireTimeout:d,skipAutoInitialize:f,hasCustomAuthorizationHeader:Object.keys(this.headers).some(e=>e.toLowerCase()===`authorization`)})}_initRealtimeClient(e){return new Pi(this.realtimeUrl.href,V(V({},e),{},{params:V(V({},{apikey:this.supabaseKey}),e?.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((e,t)=>{this._handleTokenChanged(e,`CLIENT`,t?.access_token)})}_handleTokenChanged(e,t,n){(e===`TOKEN_REFRESHED`||e===`SIGNED_IN`)&&this.changedAccessToken!==n?(this.changedAccessToken=n,this.realtime.setAuth(n)):e===`SIGNED_OUT`&&(this.realtime.setAuth(),t==`STORAGE`&&this.auth.signOut(),this.changedAccessToken=void 0)}},Zs=(e,t,n)=>new Xs(e,t,n);function Qs(){if(typeof window<`u`)return!1;let e=globalThis.process;if(!e)return!1;let t=e.version;if(t==null)return!1;let n=t.match(/^v(\d+)\./);return n?parseInt(n[1],10)<=18:!1}Qs()&&console.warn(`⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217`);var $s=Zs(`https://dkpsbsmpizjnukkpmgrq.supabase.co`,`sb_publishable_HB51IVJn5yV1OpsieMN7PA_Y5JPUFN8`),ec=`abcdefghjkmnpqrstuvwxyz23456789`;function tc(e=7){let t=``;for(let n=0;n<e;n++)t+=ec[Math.floor(Math.random()*31)];return t}function nc(e){return`https://survey.mind2action.kr/?g=${e}`}async function rc(){let{data:e,error:t}=await $s.from(`campaigns`).select(`*`).order(`created_at`,{ascending:!1});return t?(console.error(`listCampaigns failed:`,t),[]):e||[]}async function ic({clientName:e,target:t,status:n,periodStart:r,periodEnd:i,educationDate:a,memo:o,expectedCount:s}){for(let c=0;c<6;c++){let c=tc(),{data:l,error:u}=await $s.from(`campaigns`).insert({code:c,client_name:e,target:t||null,status:n||`active`,period_start:r||null,period_end:i||null,education_date:a||null,memo:o||null,expected_count:s!=null&&s!==``?Number(s):null}).select().single();if(!u)return l;if(u.code!==`23505`)throw console.error(`createCampaign failed:`,u),u}throw Error(`코드 발급에 실패했습니다. 다시 시도해주세요.`)}async function ac(e,t){let{data:n,error:r}=await $s.from(`campaigns`).update(t).eq(`id`,e).select().single();if(r)throw console.error(`updateCampaign failed:`,r),r;return n}async function oc(e){let{error:t}=await $s.from(`responses`).delete().eq(`campaign_id`,e);if(t)throw console.error(`deleteCampaign(responses) failed:`,t),t;let{error:n}=await $s.from(`campaigns`).delete().eq(`id`,e);if(n)throw console.error(`deleteCampaign(campaign) failed:`,n),n}async function sc(e){let{data:t,error:n}=await $s.rpc(`get_campaign_by_code`,{p_code:e});return n?(console.error(`getCampaignByCode failed:`,n),null):t&&t[0]||null}var cc=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),H=o(((e,t)=>{t.exports=cc()}))();function lc(){return new URLSearchParams(window.location.search).get(`g`)}function uc(){let e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function dc(e){if(!e)return``;let[,t,n]=e.split(`-`);return`${Number(t)}.${Number(n)}`}function fc(e,t){return e&&t?`${dc(e)} ~ ${dc(t)}`:e?`${dc(e)}부터`:t?`${dc(t)}까지`:``}function pc({onEnter:e}){let[t,n]=(0,x.useState)(`loading`),[r,i]=(0,x.useState)(null);return(0,x.useEffect)(()=>{let e=lc();if(!e){n(`nolink`);return}sc(e.trim()).then(e=>{if(!e)n(`invalid`);else if(e.status!==`active`)n(`closed`);else{let t=uc();e.period_start&&t<e.period_start?(i(e),n(`notstarted`)):e.period_end&&t>e.period_end?(i(e),n(`ended`)):(i(e),n(`ready`))}})},[]),t===`loading`?(0,H.jsx)(`section`,{className:`landing-section`,children:(0,H.jsx)(`p`,{className:`landing-desc`,children:`설문을 불러오는 중...`})}):t===`nolink`||t===`invalid`?(0,H.jsxs)(`section`,{className:`landing-section`,children:[(0,H.jsxs)(`h1`,{children:[`설문 링크를`,(0,H.jsx)(`br`,{}),`확인해 주세요`]}),(0,H.jsxs)(`p`,{className:`landing-desc`,children:[`발급된 설문 링크로만 참여할 수 있습니다.`,(0,H.jsx)(`br`,{}),`링크가 올바른지 확인해 주세요.`]})]}):t===`closed`?(0,H.jsxs)(`section`,{className:`landing-section`,children:[(0,H.jsxs)(`h1`,{children:[`설문이`,(0,H.jsx)(`br`,{}),`종료되었습니다`]}),(0,H.jsx)(`p`,{className:`landing-desc`,children:`현재 진행 중인 설문이 아닙니다.`})]}):t===`notstarted`?(0,H.jsxs)(`section`,{className:`landing-section`,children:[r?.client_name&&(0,H.jsxs)(`div`,{className:`intro-group-badge`,children:[`소속: `,r.client_name]}),(0,H.jsxs)(`h1`,{children:[`아직 설문`,(0,H.jsx)(`br`,{}),`기간이 아닙니다`]}),(0,H.jsxs)(`p`,{className:`landing-desc`,children:[`설문 참여 기간이 시작되면 다시 접속해 주세요.`,(r?.period_start||r?.period_end)&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`br`,{}),`참여 기간 `,fc(r.period_start,r.period_end)]})]})]}):t===`ended`?(0,H.jsxs)(`section`,{className:`landing-section`,children:[r?.client_name&&(0,H.jsxs)(`div`,{className:`intro-group-badge`,children:[`소속: `,r.client_name]}),(0,H.jsxs)(`h1`,{children:[`설문 기간이`,(0,H.jsx)(`br`,{}),`종료되었습니다`]}),(0,H.jsxs)(`p`,{className:`landing-desc`,children:[`설문 참여 기간이 지났습니다.`,(r?.period_start||r?.period_end)&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`br`,{}),`참여 기간 `,fc(r.period_start,r.period_end)]})]})]}):(0,H.jsxs)(`section`,{className:`landing-section`,children:[(0,H.jsxs)(`div`,{className:`intro-group-badge`,children:[`소속: `,r.client_name]}),(0,H.jsx)(`h1`,{children:`나를 알면 행동이 바뀝니다`}),(0,H.jsxs)(`p`,{className:`landing-desc`,children:[`50문항 성향 진단 설문입니다.`,(0,H.jsx)(`br`,{}),`약 5~10분 소요됩니다. 아래 버튼을 눌러 시작하세요.`]}),(0,H.jsx)(`button`,{type:`button`,className:`btn btn-primary btn-full`,onClick:()=>e(r),children:`시작하기`})]})}var mc=[{value:``,label:`선택해주세요`},{value:`sales`,label:`고객 컨설팅 영업`},{value:`coach`,label:`신인 육성 코칭`},{value:`sales_leader`,label:`조직운영 리더`}],hc=[{value:``,label:`선택해주세요 (선택사항)`},{value:`under200`,label:`200만원 미만`},{value:`200-400`,label:`200~400만원`},{value:`400-600`,label:`400~600만원`},{value:`600-800`,label:`600~800만원`},{value:`800-1000`,label:`800~1000만원`},{value:`1000-1500`,label:`1000~1500만원`},{value:`1500-2000`,label:`1500~2000만원`},{value:`over2000`,label:`2000만원 이상`}];function gc({group:e,onSubmit:t}){let[n,r]=(0,x.useState)({name:``,birthDate:``,careerMonths:``,company:``,department:``,jobType:``,incomeRange:``});function i(e){r(t=>({...t,[e.target.name]:e.target.value}))}function a(e){e.preventDefault(),!(!n.name||!n.birthDate||!n.careerMonths||!n.company||!n.department||!n.jobType)&&t(n)}let o=n.name&&n.birthDate&&n.careerMonths&&n.company&&n.department&&n.jobType;return(0,H.jsxs)(`section`,{className:`intro-section`,children:[e&&(0,H.jsxs)(`div`,{className:`intro-group-badge`,children:[`소속: `,e]}),(0,H.jsx)(`h2`,{children:`기본 정보 입력`}),(0,H.jsx)(`p`,{children:`모든 개인 정보는 성향코칭 외에는 그 어디에도 활용되지 않습니다.`}),(0,H.jsxs)(`form`,{onSubmit:a,children:[(0,H.jsxs)(`div`,{className:`form-group`,children:[(0,H.jsx)(`label`,{className:`form-label`,children:`이름 *`}),(0,H.jsx)(`input`,{className:`form-input`,name:`name`,value:n.name,onChange:i,placeholder:`홍길동`})]}),(0,H.jsxs)(`div`,{className:`form-group`,children:[(0,H.jsx)(`label`,{className:`form-label`,children:`생년월일 *`}),(0,H.jsx)(`input`,{className:`form-input`,name:`birthDate`,value:n.birthDate,onChange:i,placeholder:`19850315`,maxLength:8})]}),(0,H.jsxs)(`div`,{className:`form-group`,children:[(0,H.jsx)(`label`,{className:`form-label`,children:`경력 (개월) *`}),(0,H.jsx)(`input`,{className:`form-input`,name:`careerMonths`,type:`number`,value:n.careerMonths,onChange:i,placeholder:`36`})]}),(0,H.jsxs)(`div`,{className:`form-group`,children:[(0,H.jsx)(`label`,{className:`form-label`,children:`회사 *`}),(0,H.jsx)(`input`,{className:`form-input`,name:`company`,value:n.company,onChange:i,placeholder:`회사명`})]}),(0,H.jsxs)(`div`,{className:`form-group`,children:[(0,H.jsx)(`label`,{className:`form-label`,children:`소속 *`}),(0,H.jsx)(`input`,{className:`form-input`,name:`department`,value:n.department,onChange:i,placeholder:`OO지점`})]}),(0,H.jsxs)(`div`,{className:`form-group`,children:[(0,H.jsx)(`label`,{className:`form-label`,children:`성향 코칭을 받고 싶은 역할 *`}),(0,H.jsx)(`select`,{className:`form-input form-select`,name:`jobType`,value:n.jobType,onChange:i,children:mc.map(e=>(0,H.jsx)(`option`,{value:e.value,children:e.label},e.value))})]}),(0,H.jsxs)(`div`,{className:`form-group`,children:[(0,H.jsx)(`label`,{className:`form-label`,children:`직전 3개월 평균 소득`}),(0,H.jsx)(`select`,{className:`form-input form-select`,name:`incomeRange`,value:n.incomeRange,onChange:i,children:hc.map(e=>(0,H.jsx)(`option`,{value:e.value,children:e.label},e.value))})]}),(0,H.jsx)(`button`,{type:`submit`,className:`btn btn-primary btn-full`,disabled:!o,children:`설문 시작`})]})]})}var _c=[{id:`Q1`,egoState:`CP`,text:`나는 시간 약속을 잘 지킵니다.`},{id:`Q11`,egoState:`NP`,text:`나는 부탁을 한 사람이 실망할까 봐, 쉽게 거절하지 못하는 편입니다.`},{id:`Q21`,egoState:`A`,text:`나는 감성적이기보다는 이성적이라는 말을 듣는 편입니다.`},{id:`Q31`,egoState:`FC`,text:`나는 대화할 때 유머감각이 좋다는 말을 듣는 편입니다.`},{id:`Q41`,egoState:`AC`,text:`나는 상대가 강하게 주장하면 반박하기가 망설여지는 편입니다.`},{id:`Q2`,egoState:`CP`,text:`나는 조직 안에서 누군가 인사를 안 하거나 예의 없는 행동을 하면 바로 눈에 띄는 편입니다.`},{id:`Q12`,egoState:`NP`,text:`나는 상대방의 말을 끝까지 들어주며 공감해 주는 편입니다.`},{id:`Q22`,egoState:`A`,text:`나는 감정이 격한 사람 앞에서도 차분하게 말하는 편입니다.`},{id:`Q32`,egoState:`FC`,text:`나는 어렸을 때부터 호기심이 강한 편입니다.`},{id:`Q42`,egoState:`AC`,text:`나는 주변 사람들의 눈치와 분위기를 잘 살피는 편입니다.`},{id:`Q3`,egoState:`CP`,text:`나는 대화 중 상대의 말이 잘못되었다고 느끼면 바로잡아야 한다고 생각하는 편입니다.`},{id:`Q13`,egoState:`NP`,text:`나는 상대방의 단점보다는 장점을 잘 깨닫는 편입니다.`},{id:`Q23`,egoState:`A`,text:`나는 "제가 보기엔.."이라고 말하며 논리적으로 설명하는 편입니다.`},{id:`Q33`,egoState:`FC`,text:`나는 같은 내용이라도 더 재미있게 표현하려고 말이나 방식의 변화를 주는 편입니다.`},{id:`Q43`,egoState:`AC`,text:`나는 여러 사람이 함께 있을 때, 메뉴 결정은 남이 해주기를 기다리는 편입니다.`},{id:`Q4`,egoState:`CP`,text:`나는 판단이 서면 반대 의견을 들어도 쉽게 바꾸지 않습니다.`},{id:`Q14`,egoState:`NP`,text:`나와 있으면 마음이 편하다고 말을 종종 듣습니다.`},{id:`Q24`,egoState:`A`,text:`나는 누군가 길게 설명하면 "그래서 요점이 뭐지?"를 속으로 정리합니다.`},{id:`Q34`,egoState:`FC`,text:`나는 감정이 표정에 잘 드러나는 편입니다.`},{id:`Q44`,egoState:`AC`,text:`나는 갈등보다는 적당한 타협이 낫다고 느낍니다.`},{id:`Q5`,egoState:`CP`,text:`나는 목표를 세울 때 스스로 기준을 정하고 반드시 지키려고 한다.`},{id:`Q15`,egoState:`NP`,text:`나는 의견이 다를 때도 상대의 기분을 먼저 생각하며 말을 꺼냅니다.`},{id:`Q25`,egoState:`A`,text:`나는 일정이 꼬이거나 계획이 틀어졌을 때, 감정부터 반응하지 않고 우선 상황을 정리합니다.`},{id:`Q35`,egoState:`FC`,text:`나는 중요한 자리에서도 농담을 하고 싶은 충동이 듭니다.`},{id:`Q45`,egoState:`AC`,text:`나는 다른 사람들의 마음에 들었으면 좋겠다고 생각합니다.`},{id:`Q6`,egoState:`CP`,text:`나는 비판적인 성향이 있는 편입니다`},{id:`Q16`,egoState:`NP`,text:`나는 가족이 아니어도 주변 사람이 잘되면 진심으로 기뻐합니다.`},{id:`Q26`,egoState:`A`,text:`나는 상대의 감정과 상관없이 사실과 기준만으로 사람을 대하는 편입니다.`},{id:`Q36`,egoState:`FC`,text:`나는 "와~", "대단하다", "대박" 같은 감탄사를 자주 사용합니다.`},{id:`Q46`,egoState:`AC`,text:`나는 괴로울 때 감정을 표현하기보다 참고 넘기는 편입니다.`},{id:`Q7`,egoState:`CP`,text:`나는 "이건 해야 해" , "아냐 하지 마" 같은 표현을 쓰는 편입니다.`},{id:`Q17`,egoState:`NP`,text:`나는 손해를 봐도 관계가 유지되면 괜찮다고 생각합니다.`},{id:`Q27`,egoState:`A`,text:`나는 현실적인 손익을 고려해 판단하는 편입니다.`},{id:`Q37`,egoState:`FC`,text:`나는 순간 기분이 좋아지면, 계획 없이 행동해도 괜찮다고 느낍니다.`},{id:`Q47`,egoState:`AC`,text:`나는 주목받는 상황을 그다지 좋아하지 않습니다.`},{id:`Q8`,egoState:`CP`,text:`나는 일이 잘못될 가능성이 보이면, 상대의 기분보다 바로잡는 것이 더 중요하다고 생각합니다.`},{id:`Q18`,egoState:`NP`,text:`나는 누군가 실수를 하면 그 사람의 의도를 먼저 이해하려 합니다.`},{id:`Q28`,egoState:`A`,text:`나는 시간, 돈, 관계를 계획적으로 관리합니다.`},{id:`Q38`,egoState:`FC`,text:`나는 상담이나 회의 중 분위기가 가라앉으면 먼저 풀려고 합니다.`},{id:`Q48`,egoState:`AC`,text:`나는 조직에서 정한 규칙과 기준을 잘 따릅니다.`},{id:`Q9`,egoState:`CP`,text:`나는 조직 내에서 누군가가 맡은 일에 책임감이 없는 태도를 보이면 쉽게 넘기기 어렵습니다.`},{id:`Q19`,egoState:`NP`,text:`나는 주변 사람들을 챙기고 특히 아이들을 돌보는 걸 좋아합니다.`},{id:`Q29`,egoState:`A`,text:`나는 미래 상황을 현실적으로 판단한 후 행동하는 편입니다.`},{id:`Q39`,egoState:`FC`,text:`나는 하고 싶은 마음이 들면 손해가 있어도 먼저 행동하는 편입니다.`},{id:`Q49`,egoState:`AC`,text:`나는 옳고 그름을 따지기보다 관계가 불편해지지 않는 선택을 하는 편이다.`},{id:`Q10`,egoState:`CP`,text:`나는 분위기가 불편해질 것을 알아도 말해야 할 때는 하는 편입니다.`},{id:`Q20`,egoState:`NP`,text:`나는 어려운 상황에 있는 사람을 보면 그냥 지나치기보다 마음이 쓰이는 편입니다.`},{id:`Q30`,egoState:`A`,text:`나는 어떤 정보를 들으면 바로 믿기보다 사실인지 한 번 더 확인하는 편입니다.`},{id:`Q40`,egoState:`FC`,text:`나는 자유분방해서 즉흥적으로 행동하는 경우가 종종 있습니다.`},{id:`Q50`,egoState:`AC`,text:`나는 타인의 기대에 맞추다 보니 나답지 않게 행동하고 있다고 느낀 적이 있습니다,`}],vc=[`CP`,`NP`,`A`,`FC`,`AC`],yc={CP:`기준·결단`,NP:`배려·공감`,A:`이성·판단`,FC:`친화·표현`,AC:`협조·조율`},bc=[`A`,`CP`,`NP`,`FC`,`AC`],xc={};for(let e of _c)xc[e.id]=e.egoState;function Sc(e){return e>=17?`극고`:e>=14?`고`:e>=11?`중`:e>=8?`저`:`극저`}var Cc={CP:[11,20],NP:[11,20],A:[11,20],FC:[11,20],AC:[8,16]},wc={sales:Cc,manager:Cc,coach:Cc},Tc={sales:`sales`,coach:`coach`,sales_leader:`manager`,branch_manager:`manager`,training_leader:`manager`,division_head:`manager`,executive:`manager`};function Ec(e){return Tc[e]||`sales`}function Dc(e,t){return wc[Ec(t)]?.[e]||[11,16]}function Oc(e){let t={};for(let e of vc)t[e]=0;for(let[n,r]of Object.entries(e)){let e=xc[n];e&&(t[e]+=r)}let n={};for(let e of vc)n[e]=Sc(t[e]);let r=[...vc].sort((e,n)=>t[n]===t[e]?bc.indexOf(e)-bc.indexOf(n):t[n]-t[e]),i=[...vc].sort((e,n)=>t[e]===t[n]?bc.indexOf(e)-bc.indexOf(n):t[e]-t[n]);return{scores:t,grades:n,top1:r[0],top2:r[1],bottom:i[0],total:Object.values(t).reduce((e,t)=>e+t,0)}}var kc=5,Ac=Math.ceil(_c.length/kc),jc=[{value:2,label:`그렇다`},{value:0,label:`그렇지 않다`},{value:1,label:`어느 쪽도 아니다`}];function Mc({currentPage:e,totalPages:t,completedPages:n}){return(0,H.jsx)(`div`,{className:`step-dots`,children:Array.from({length:t},(t,r)=>{let i=r<n,a=r===e,o=`step-dot`;return i&&!a&&(o+=` completed`),a&&(o+=` current`),(0,H.jsxs)(`span`,{children:[r>0&&(0,H.jsx)(`span`,{className:`step-connector${r<=n?` completed`:``}`}),(0,H.jsx)(`span`,{className:o,children:r+1})]},r)})})}function Nc({onComplete:e}){let[t,n]=(0,x.useState)({}),[r,i]=(0,x.useState)(0),[a,o]=(0,x.useState)(!1),s=r*kc,c=_c.slice(s,s+kc);function l(e){let n=e*kc;return _c.slice(n,n+kc).every(e=>t[e.id]!==void 0)}let u=0;for(let e=0;e<Ac&&l(e);e++)u=e+1;function d(e,t){n(n=>({...n,[e]:t}))}function f(){r<Ac-1&&(i(r+1),window.scrollTo({top:0,behavior:`smooth`}))}function p(){r>0&&(i(r-1),window.scrollTo({top:0,behavior:`smooth`}))}async function m(){Object.keys(t).length<50||a||(o(!0),await e(Oc(t)))}let h=r===Ac-1,g=c.every(e=>t[e.id]!==void 0);return(0,H.jsxs)(`section`,{children:[(0,H.jsx)(Mc,{currentPage:r,totalPages:Ac,completedPages:u}),c.map((e,n)=>(0,H.jsxs)(`div`,{className:`question-card`,children:[(0,H.jsxs)(`div`,{className:`question-number`,children:[`Q`,s+n+1]}),(0,H.jsx)(`div`,{className:`question-text`,children:e.text}),(0,H.jsx)(`div`,{className:`answer-options`,children:jc.map(n=>(0,H.jsx)(`button`,{type:`button`,className:`answer-option ${t[e.id]===n.value?`selected`:``}`,onClick:()=>d(e.id,n.value),children:n.label},n.value))})]},e.id)),(0,H.jsxs)(`div`,{className:`survey-nav`,children:[(0,H.jsx)(`button`,{type:`button`,className:`btn btn-secondary`,onClick:p,disabled:r===0,children:`이전`}),h?(0,H.jsx)(`button`,{type:`button`,className:`btn btn-primary`,onClick:m,disabled:!g||a,children:a?`저장 중...`:`결과 보기`}):(0,H.jsx)(`button`,{type:`button`,className:`btn btn-primary`,onClick:f,disabled:!g,children:`다음`})]})]})}var Pc={CP:`#ef4444`,NP:`#f59e0b`,A:`#38bdf8`,FC:`#10b981`,AC:`#8b5cf6`};function Fc({ego:e}){return(0,H.jsx)(`strong`,{style:{color:Pc[e]},children:yc[e]})}function Ic({result:e,profile:t}){let{scores:n,top1:r,top2:i,bottom:a}=e;return(0,H.jsxs)(`section`,{className:`result-section`,children:[(0,H.jsxs)(`h1`,{children:[t?.name,`님의 성향 진단 결과`]}),(0,H.jsxs)(`p`,{className:`result-summary`,children:[t?.name,`님, 가장 강한 성향은 `,(0,H.jsx)(Fc,{ego:r}),`, 두 번째는 `,(0,H.jsx)(Fc,{ego:i}),`입니다. 가장 약한 성향은 `,(0,H.jsx)(Fc,{ego:a}),`입니다.`]}),(0,H.jsx)(`p`,{className:`result-summary-cta`,children:`자세한 성향 코칭은 Mind2Action 성향리포트에서 확인하세요.`}),(0,H.jsx)(`div`,{className:`score-grid`,children:vc.map(e=>{let[o,s]=Dc(e,t?.jobType),c=e===r||e===i,l=e===a,u=`score-bar-fill`;return c?u+=` is-top`:l?u+=` is-bottom`:u+=` is-normal`,(0,H.jsxs)(`div`,{className:`score-row`,children:[(0,H.jsx)(`div`,{className:`score-label`,children:(0,H.jsxs)(`div`,{className:`score-label-ego`,style:{color:Pc[e]},children:[yc[e],`성향`]})}),(0,H.jsxs)(`div`,{className:`score-bar-wrap`,children:[(0,H.jsx)(`div`,{className:`score-bar-success`,style:{left:`${o/20*100}%`,width:`${(s-o+1)/20*100}%`}}),(0,H.jsx)(`div`,{className:u,style:{width:`${n[e]/20*100}%`}})]}),(0,H.jsx)(`div`,{className:`score-value`,children:n[e]})]},e)})}),(0,H.jsxs)(`div`,{className:`result-tags`,children:[(0,H.jsxs)(`div`,{className:`result-tag tag-top`,children:[`TOP 1. `,yc[r],` 성향`]}),(0,H.jsxs)(`div`,{className:`result-tag tag-top`,children:[`TOP 2. `,yc[i],` 성향`]}),(0,H.jsxs)(`div`,{className:`result-tag tag-bottom`,children:[`BOTTOM. `,yc[a],` 성향`]})]})]})}async function Lc(e,t,n=null){let r={campaign_id:n,group_name:e.group||``,name:e.name,birth_date:e.birthDate,career_months:e.careerMonths,company:e.company||``,department:e.department,job_type:e.jobType,income_range:e.incomeRange||``,recruit_count:e.recruitCount||``,score_cp:t.scores.CP,score_np:t.scores.NP,score_a:t.scores.A,score_fc:t.scores.FC,score_ac:t.scores.AC,total:t.total,top1:t.top1,top2:t.top2,bottom:t.bottom,grades:t.grades},{error:i}=await $s.from(`responses`).insert(r);return i&&console.error(`Save failed:`,i),r}async function Rc(){let{data:e,error:t}=await $s.from(`responses`).select(`*`).order(`created_at`,{ascending:!1});return t?(console.error(`Load failed:`,t),[]):(e||[]).map(e=>({id:e.id,timestamp:e.created_at,campaignId:e.campaign_id,group:e.group_name,name:e.name,birthDate:e.birth_date,careerMonths:e.career_months,company:e.company||``,department:e.department,jobType:e.job_type,incomeRange:e.income_range,recruitCount:e.recruit_count,scores:{CP:e.score_cp,NP:e.score_np,A:e.score_a,FC:e.score_fc,AC:e.score_ac},grades:e.grades,total:e.total,top1:e.top1,top2:e.top2,bottom:e.bottom}))}async function U(e){let{error:t}=await $s.from(`responses`).delete().eq(`id`,e);return t&&console.error(`Delete failed:`,t),Rc()}function zc(){let[e,t]=(0,x.useState)(`landing`),[n,r]=(0,x.useState)(null),[i,a]=(0,x.useState)(null),[o,s]=(0,x.useState)(null);function c(e){r(e),t(`intro`)}function l(e){a({...e,group:n?.client_name||``}),t(`survey`)}async function u(e){await Lc({...i,group:n?.client_name||``},e,n?.id||null),s(e),t(`result`)}function d(){t(`landing`),a(null),s(null)}return(0,H.jsxs)(H.Fragment,{children:[e===`landing`&&(0,H.jsx)(pc,{onEnter:c}),e===`intro`&&(0,H.jsx)(gc,{group:n?.client_name,onSubmit:l}),e===`survey`&&(0,H.jsx)(Nc,{onComplete:u}),e===`result`&&(0,H.jsx)(Ic,{result:o,profile:i,onRestart:d})]})}function Bc(){let[e,t]=(0,x.useState)(``),[n,r]=(0,x.useState)(``),[i,a]=(0,x.useState)(``),[o,s]=(0,x.useState)(!1);async function c(t){t.preventDefault(),s(!0),a(``);let{error:r}=await $s.auth.signInWithPassword({email:e.trim(),password:n});s(!1),r&&a(`이메일 또는 비밀번호가 올바르지 않습니다.`)}return(0,H.jsxs)(`section`,{className:`landing-section`,children:[(0,H.jsx)(`div`,{className:`landing-badge`,children:`ADMIN`}),(0,H.jsx)(`h1`,{children:`관리자 로그인`}),(0,H.jsx)(`p`,{className:`landing-desc`,children:`설문 결과를 확인하려면 관리자 계정으로 로그인하세요.`}),(0,H.jsxs)(`form`,{onSubmit:c,className:`landing-code-wrap`,children:[(0,H.jsx)(`div`,{className:`form-group`,children:(0,H.jsx)(`input`,{className:`form-input`,type:`email`,value:e,onChange:e=>{t(e.target.value),a(``)},placeholder:`이메일`,autoComplete:`username`})}),(0,H.jsxs)(`div`,{className:`form-group`,children:[(0,H.jsx)(`input`,{className:`form-input landing-code-input`,type:`password`,value:n,onChange:e=>{r(e.target.value),a(``)},placeholder:`비밀번호`,autoComplete:`current-password`}),i&&(0,H.jsx)(`div`,{className:`landing-error`,children:i})]}),(0,H.jsx)(`button`,{type:`submit`,className:`btn btn-primary btn-full`,disabled:!e||!n||o,children:o?`로그인 중...`:`로그인`})]})]})}var Vc={active:`진행중`,draft:`준비`,closed:`마감`},Hc={clientName:``,target:``,expectedCount:``,periodStart:``,periodEnd:``,educationDate:``,memo:``};function Uc(){let e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function Wc(e){return!!e.period_end&&Uc()>e.period_end}function Gc({camp:e}){return e.status===`active`&&Wc(e)?(0,H.jsx)(`span`,{className:`campaign-status campaign-status-ended`,children:`설문종료`}):(0,H.jsx)(`span`,{className:`campaign-status campaign-status-${e.status}`,children:Vc[e.status]||e.status})}function Kc({campaigns:e,counts:t,onChange:n,onViewResults:r,onDeleteCampaign:i}){let[a,o]=(0,x.useState)(Hc),[s,c]=(0,x.useState)(!1),[l,u]=(0,x.useState)(null),[d,f]=(0,x.useState)(``),[p,m]=(0,x.useState)(null);function h(e){o(t=>({...t,[e.target.name]:e.target.value}))}function g(e){o({clientName:e.client_name||``,target:e.target||``,expectedCount:e.expected_count==null?``:String(e.expected_count),periodStart:e.period_start||``,periodEnd:e.period_end||``,educationDate:e.education_date||``,memo:e.memo||``}),m(e.id),f(``),typeof window<`u`&&window.scrollTo({top:0,behavior:`smooth`})}function _(){o(Hc),m(null),f(``)}async function v(e){if(e.preventDefault(),a.clientName.trim()){c(!0),f(``);try{p?await ac(p,{client_name:a.clientName.trim(),target:a.target.trim()||null,expected_count:a.expectedCount===``?null:Number(a.expectedCount),period_start:a.periodStart||null,period_end:a.periodEnd||null,education_date:a.educationDate||null,memo:a.memo.trim()||null}):await ic({clientName:a.clientName.trim(),target:a.target.trim(),status:`active`,expectedCount:a.expectedCount,periodStart:a.periodStart||null,periodEnd:a.periodEnd||null,educationDate:a.educationDate||null,memo:a.memo.trim()}),o(Hc),m(null),n()}catch(e){f(e.message||(p?`수정에 실패했습니다.`:`생성에 실패했습니다.`))}finally{c(!1)}}}async function y(e){try{await navigator.clipboard.writeText(nc(e.code)),u(e.id),setTimeout(()=>u(null),1600)}catch{window.prompt(`아래 링크를 복사하세요`,nc(e.code))}}async function b(e){let t=e.status===`closed`?`active`:`closed`,r=t===`closed`?`마감`:`재개`;window.confirm(`${e.client_name} 설문을 ${r}하시겠습니까?`)&&(await ac(e.id,{status:t}),n())}return(0,H.jsx)(`div`,{className:`campaign-pane`,children:(0,H.jsxs)(`div`,{className:`campaign-layout`,children:[(0,H.jsxs)(`form`,{className:`campaign-create`,onSubmit:v,children:[(0,H.jsx)(`h2`,{className:`campaign-create-title`,children:p?`캠페인 수정`:`새 설문 캠페인`}),(0,H.jsxs)(`fieldset`,{className:`campaign-fieldset`,children:[(0,H.jsx)(`legend`,{className:`campaign-fieldset-label`,children:`기본 정보`}),(0,H.jsxs)(`div`,{className:`form-group`,children:[(0,H.jsx)(`label`,{className:`form-label`,children:`고객사 / 대상명 *`}),(0,H.jsx)(`input`,{className:`form-input`,name:`clientName`,value:a.clientName,onChange:h,placeholder:`예: 한화생명 FC 1기`}),(0,H.jsx)(`div`,{className:`form-hint form-hint-public`,children:`설문 참여자에게 표시됩니다 ("○○ 설문")`})]}),(0,H.jsxs)(`div`,{className:`form-group`,children:[(0,H.jsx)(`label`,{className:`form-label`,children:`대상 설명`}),(0,H.jsx)(`input`,{className:`form-input`,name:`target`,value:a.target,onChange:h,placeholder:`예: 신입 설계사 (선택)`}),(0,H.jsx)(`div`,{className:`form-hint`,children:`관리자 기록용 — 참여자에게는 보이지 않습니다`})]}),(0,H.jsxs)(`div`,{className:`form-group`,children:[(0,H.jsx)(`label`,{className:`form-label`,children:`참여 예상 인원`}),(0,H.jsx)(`input`,{className:`form-input`,type:`number`,min:`0`,name:`expectedCount`,value:a.expectedCount,onChange:h,placeholder:`예: 40 (선택)`}),(0,H.jsx)(`div`,{className:`form-hint`,children:`진행 현황 진행률 기준값 — 실제가 더 적거나 많아도 무방합니다`})]})]}),(0,H.jsxs)(`fieldset`,{className:`campaign-fieldset`,children:[(0,H.jsx)(`legend`,{className:`campaign-fieldset-label`,children:`일정`}),(0,H.jsxs)(`div`,{className:`campaign-form-grid`,children:[(0,H.jsxs)(`div`,{className:`form-group`,children:[(0,H.jsx)(`label`,{className:`form-label`,children:`참여 시작`}),(0,H.jsx)(`input`,{className:`form-input`,type:`date`,name:`periodStart`,value:a.periodStart,onChange:h})]}),(0,H.jsxs)(`div`,{className:`form-group`,children:[(0,H.jsx)(`label`,{className:`form-label`,children:`참여 종료`}),(0,H.jsx)(`input`,{className:`form-input`,type:`date`,name:`periodEnd`,value:a.periodEnd,onChange:h})]}),(0,H.jsxs)(`div`,{className:`form-group`,children:[(0,H.jsx)(`label`,{className:`form-label`,children:`교육일`}),(0,H.jsx)(`input`,{className:`form-input`,type:`date`,name:`educationDate`,value:a.educationDate,onChange:h})]})]})]}),(0,H.jsxs)(`fieldset`,{className:`campaign-fieldset`,children:[(0,H.jsx)(`legend`,{className:`campaign-fieldset-label`,children:`메모`}),(0,H.jsxs)(`div`,{className:`form-group`,children:[(0,H.jsx)(`input`,{className:`form-input`,name:`memo`,value:a.memo,onChange:h,placeholder:`내부 메모 (선택)`}),(0,H.jsx)(`div`,{className:`form-hint`,children:`관리자 내부 메모 — 참여자·결과 화면에 보이지 않습니다`})]})]}),p&&(0,H.jsx)(`div`,{className:`form-hint`,children:`코드(링크)와 진행 상태는 바뀌지 않습니다. 상태 변경은 목록의 마감/재개로.`}),d&&(0,H.jsx)(`div`,{className:`landing-error`,children:d}),(0,H.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,disabled:!a.clientName.trim()||s,children:s?p?`저장 중...`:`생성 중...`:p?`수정 저장`:`캠페인 생성 + 링크 발급`}),p&&(0,H.jsx)(`button`,{type:`button`,className:`btn btn-secondary`,onClick:_,disabled:s,children:`취소`})]}),(0,H.jsx)(`div`,{className:`campaign-list-col`,children:e.length===0?(0,H.jsx)(`div`,{className:`admin-empty`,children:`아직 생성된 캠페인이 없습니다.`}):(0,H.jsx)(`div`,{className:`admin-table-wrap`,children:(0,H.jsxs)(`table`,{className:`admin-table campaign-table`,children:[(0,H.jsx)(`thead`,{children:(0,H.jsxs)(`tr`,{children:[(0,H.jsx)(`th`,{children:`고객사 / 대상`}),(0,H.jsx)(`th`,{children:`상태`}),(0,H.jsx)(`th`,{children:`참여 시작`}),(0,H.jsx)(`th`,{children:`참여 종료`}),(0,H.jsx)(`th`,{children:`교육일`}),(0,H.jsx)(`th`,{children:`인원`}),(0,H.jsx)(`th`,{children:`설문 링크`}),(0,H.jsx)(`th`,{children:`설문 결과`}),(0,H.jsx)(`th`,{children:`전체 PDF`}),(0,H.jsx)(`th`,{children:`관리`})]})}),(0,H.jsx)(`tbody`,{children:e.map(e=>(0,H.jsxs)(`tr`,{children:[(0,H.jsxs)(`td`,{className:`td-name`,children:[e.client_name,e.target&&(0,H.jsx)(`div`,{className:`campaign-target`,children:e.target}),e.memo&&(0,H.jsxs)(`div`,{className:`campaign-memo`,children:[`메모: `,e.memo]})]}),(0,H.jsx)(`td`,{children:(0,H.jsx)(Gc,{camp:e})}),(0,H.jsx)(`td`,{className:`td-small`,children:e.period_start||`-`}),(0,H.jsx)(`td`,{className:`td-small${Wc(e)?` td-period-ended`:``}`,children:e.period_end||`-`}),(0,H.jsx)(`td`,{className:`td-small`,children:e.education_date||`-`}),(0,H.jsxs)(`td`,{className:`td-score`,children:[t[e.id]||0,e.expected_count?(0,H.jsxs)(`span`,{className:`td-expected`,children:[`/`,e.expected_count]}):null]}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`button`,{className:`btn-copy-link`,onClick:()=>y(e),children:l===e.id?`복사됨 ✓`:`링크 복사`})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`button`,{className:`btn-view-results`,onClick:()=>r(e.client_name),children:`설문결과 데이터 보기`})}),(0,H.jsx)(`td`,{children:t[e.id]>0?(0,H.jsx)(`a`,{className:`btn-view-results`,href:`#/report-batch/${e.id}`,target:`_blank`,rel:`noopener noreferrer`,title:`전 참여자 리포트를 한 화면에 모아 PDF로 저장`,children:`전체리포트 PDF 출력하기`}):(0,H.jsx)(`button`,{className:`btn-view-results`,disabled:!0,title:`참여자가 없습니다`,children:`전체리포트 PDF 출력하기`})}),(0,H.jsx)(`td`,{children:(0,H.jsxs)(`div`,{className:`campaign-actions`,children:[(0,H.jsx)(`button`,{className:`btn-view-results`,onClick:()=>g(e),disabled:p===e.id,children:p===e.id?`변경 중`:`캠페인설정변경`}),(0,H.jsx)(`button`,{className:`btn-delete-action`,onClick:()=>b(e),children:e.status===`closed`?`재개`:`마감`}),(0,H.jsx)(`button`,{className:`btn-delete-action btn-delete-campaign`,onClick:()=>i(e),title:`이 캠페인과 응답을 삭제 (백업 후)`,children:`삭제`})]})})]},e.id))})]})})})]})})}var qc={active:`진행중`,draft:`준비`,closed:`마감`};function Jc(){let e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function Yc(e){if(!e)return null;let[t,n,r]=e.split(`-`).map(Number),i=new Date(t,n-1,r);return Math.round((i-Jc())/864e5)}function Xc(e){return e===null?`-`:e>0?`D-${e}`:e===0?`D-DAY`:`${-e}일 지남`}function Zc(e){if(!e)return`-`;let[,t,n]=e.split(`-`);return`${Number(t)}.${Number(n)}`}function Qc({campaigns:e,counts:t}){return!e||e.length===0?(0,H.jsx)(`div`,{className:`admin-empty`,children:`아직 생성된 캠페인이 없습니다.`}):(0,H.jsx)(`div`,{className:`campaign-dashboard`,children:(0,H.jsx)(`div`,{className:`dashboard-grid`,children:e.slice().sort((e,t)=>{let n=e.status===`active`?0:1,r=t.status===`active`?0:1;return n===r?(e.period_end||`9999-99-99`).localeCompare(t.period_end||`9999-99-99`):n-r}).map(e=>{let n=t[e.id]||0,r=e.expected_count,i=r?Math.round(n/r*100):null,a=Yc(e.period_end),o=Yc(e.education_date);return(0,H.jsxs)(`div`,{className:`dashboard-card`,"data-status":e.status,children:[(0,H.jsxs)(`div`,{className:`dashboard-card-head`,children:[(0,H.jsx)(`span`,{className:`dashboard-card-name`,children:e.client_name}),(0,H.jsx)(`span`,{className:`campaign-status campaign-status-${e.status}`,children:qc[e.status]||e.status})]}),(0,H.jsxs)(`div`,{className:`dashboard-progress`,children:[(0,H.jsxs)(`div`,{className:`dashboard-progress-num`,children:[`참여 `,(0,H.jsx)(`strong`,{children:n}),r?(0,H.jsxs)(H.Fragment,{children:[` / 예상 `,r,`명`]}):(0,H.jsx)(H.Fragment,{children:`명`}),i!==null&&(0,H.jsxs)(`span`,{className:`dashboard-pct`,children:[` (`,i,`%)`]})]}),r?(0,H.jsx)(`div`,{className:`dashboard-bar`,children:(0,H.jsx)(`div`,{className:`dashboard-bar-fill`,style:{width:`${Math.min(i,100)}%`}})}):(0,H.jsx)(`div`,{className:`dashboard-hint`,children:`예상 인원 미설정`})]}),(0,H.jsxs)(`div`,{className:`dashboard-meta`,children:[(0,H.jsxs)(`div`,{className:`dashboard-meta-row`,children:[(0,H.jsx)(`span`,{children:`참여 기간`}),(0,H.jsxs)(`span`,{children:[Zc(e.period_start),` ~ `,Zc(e.period_end),e.period_end&&(0,H.jsxs)(`span`,{className:`dashboard-dday`,children:[` `,Xc(a)]})]})]}),(0,H.jsxs)(`div`,{className:`dashboard-meta-row`,children:[(0,H.jsx)(`span`,{children:`교육일`}),(0,H.jsxs)(`span`,{children:[Zc(e.education_date),e.education_date&&(0,H.jsxs)(`span`,{className:`dashboard-dday`,children:[` `,Xc(o)]})]})]})]})]},e.id)})})})}var $c=JSON.parse(`[{"id":"d1417bff-c387-4e4a-a2f4-3bfbb1972186","timestamp":"2026-05-08T07:16:00.000Z","group":"망원동","name":"김수아","birthDate":"19831206","careerMonths":"81","department":"용인 에이스지점 2팀","jobType":"sales","incomeRange":"800-1000","recruitCount":"","scores":{"CP":16,"NP":9,"A":15,"FC":20,"AC":9},"grades":{"CP":"고","NP":"저","A":"고","FC":"극고","AC":"저"},"top1":"FC","top2":"CP","bottom":"NP","total":69},{"id":"905dbeac-946d-433e-a732-07b2f9c03f8e","timestamp":"2026-05-08T08:19:00.000Z","group":"서교동","name":"장현정","birthDate":"19840325","careerMonths":"91","department":"용인동백지점 1팀","jobType":"sales_leader","incomeRange":"400-600","recruitCount":"2","scores":{"CP":16,"NP":16,"A":16,"FC":6,"AC":10},"grades":{"CP":"고","NP":"고","A":"고","FC":"극저","AC":"저"},"top1":"CP","top2":"A","bottom":"FC","total":64},{"id":"74d58dcd-5dbc-4a33-b2b9-e80a03d84af8","timestamp":"2026-05-08T05:22:00.000Z","group":"합정동","name":"김정임","birthDate":"19800223","careerMonths":"68","department":"용인 에이스지점","jobType":"sales","incomeRange":"400-600","recruitCount":"1","scores":{"CP":14,"NP":13,"A":18,"FC":14,"AC":6},"grades":{"CP":"고","NP":"중","A":"극고","FC":"고","AC":"극저"},"top1":"A","top2":"CP","bottom":"AC","total":65},{"id":"e2312270-0172-45a6-8ba4-81a93df61d1d","timestamp":"2026-05-08T06:25:00.000Z","group":"망원동","name":"김지윤","birthDate":"19830528","careerMonths":"36차월","department":"북부티씨지점","jobType":"sales","incomeRange":"800-1000","recruitCount":"3","scores":{"CP":17,"NP":15,"A":12,"FC":19,"AC":10},"grades":{"CP":"극고","NP":"고","A":"중","FC":"극고","AC":"저"},"top1":"FC","top2":"CP","bottom":"AC","total":73},{"id":"a67a0a47-53ce-4877-b2fa-1fc416b7c72d","timestamp":"2026-05-08T07:28:00.000Z","group":"서교동","name":"박세미","birthDate":"19790628","careerMonths":"100","department":"DB손보용인 에이스4팀","jobType":"sales_leader","incomeRange":"400-600","recruitCount":"1","scores":{"CP":17,"NP":15,"A":17,"FC":16,"AC":8},"grades":{"CP":"극고","NP":"고","A":"극고","FC":"고","AC":"저"},"top1":"CP","top2":"A","bottom":"AC","total":73},{"id":"0e040538-977e-416d-b072-75e256f7d1b4","timestamp":"2026-05-08T08:31:00.000Z","group":"합정동","name":"김동현","birthDate":"19820318","careerMonths":"150","department":"북부TC지점","jobType":"sales","incomeRange":"800-1000","recruitCount":"38","scores":{"CP":13,"NP":15,"A":19,"FC":16,"AC":5},"grades":{"CP":"중","NP":"고","A":"극고","FC":"고","AC":"극저"},"top1":"A","top2":"FC","bottom":"AC","total":68},{"id":"0c8eaaa8-66e4-4f2a-90e5-d87f387583a0","timestamp":"2026-05-08T05:34:00.000Z","group":"망원동","name":"박희수","birthDate":"19730916","careerMonths":"312","department":"남산지점","jobType":"sales","incomeRange":"400-600","recruitCount":"20","scores":{"CP":8,"NP":17,"A":11,"FC":15,"AC":18},"grades":{"CP":"저","NP":"극고","A":"중","FC":"고","AC":"극고"},"top1":"AC","top2":"NP","bottom":"CP","total":69},{"id":"08587ff1-7ee1-42ea-ac26-74a7dbeff1d6","timestamp":"2026-05-08T06:37:00.000Z","group":"서교동","name":"정혜은","birthDate":"19770329","careerMonths":"29","department":"북부tc 82팀","jobType":"sales","incomeRange":"400-600","recruitCount":"0","scores":{"CP":16,"NP":8,"A":16,"FC":14,"AC":9},"grades":{"CP":"고","NP":"저","A":"고","FC":"고","AC":"저"},"top1":"CP","top2":"A","bottom":"NP","total":63},{"id":"7a685c3e-3b03-4fe5-85d4-55c7a93b46e8","timestamp":"2026-05-08T07:40:00.000Z","group":"합정동","name":"임명옥","birthDate":"19791120","careerMonths":"16","department":"북부TC지점 82센터","jobType":"sales","incomeRange":"400-600","recruitCount":"0","scores":{"CP":11,"NP":15,"A":9,"FC":19,"AC":10},"grades":{"CP":"중","NP":"고","A":"저","FC":"극고","AC":"저"},"top1":"FC","top2":"NP","bottom":"A","total":64},{"id":"29211930-5e2b-492e-ac7c-e38dd7cfcbd7","timestamp":"2026-05-08T08:43:00.000Z","group":"망원동","name":"서한솔","birthDate":"19930223","careerMonths":"26","department":"북부사업단 북부tc 82팀","jobType":"coach","incomeRange":"over2000","recruitCount":"0","scores":{"CP":8,"NP":14,"A":15,"FC":16,"AC":14},"grades":{"CP":"저","NP":"고","A":"고","FC":"고","AC":"고"},"top1":"FC","top2":"A","bottom":"CP","total":67},{"id":"bdccc17a-c8ee-49d8-ad02-3919ebe6d6a7","timestamp":"2026-05-08T05:46:00.000Z","group":"서교동","name":"전미경","birthDate":"19770420","careerMonths":"17","department":"북부지점 82센터","jobType":"sales","incomeRange":"400-600","recruitCount":"3","scores":{"CP":9,"NP":16,"A":16,"FC":11,"AC":3},"grades":{"CP":"저","NP":"고","A":"고","FC":"중","AC":"극저"},"top1":"A","top2":"NP","bottom":"AC","total":55},{"id":"0ccd67be-88ab-4150-8810-4f0233cd18df","timestamp":"2026-05-08T06:49:00.000Z","group":"합정동","name":"이정희","birthDate":"19860119","careerMonths":"16","department":"북부TC 81팀","jobType":"sales","incomeRange":"400-600","recruitCount":"1","scores":{"CP":10,"NP":5,"A":10,"FC":6,"AC":5},"grades":{"CP":"저","NP":"극저","A":"저","FC":"극저","AC":"극저"},"top1":"CP","top2":"A","bottom":"NP","total":36},{"id":"673be236-a129-427f-8d43-c316d804fa33","timestamp":"2026-05-08T07:52:00.000Z","group":"망원동","name":"손용배","birthDate":"19680412","careerMonths":"50","department":"북부지점 1","jobType":"sales","incomeRange":"400-600","recruitCount":"1","scores":{"CP":12,"NP":9,"A":11,"FC":14,"AC":11},"grades":{"CP":"중","NP":"저","A":"중","FC":"고","AC":"중"},"top1":"FC","top2":"CP","bottom":"NP","total":57},{"id":"eabdd2a9-a17f-4e61-8e9f-940a58652888","timestamp":"2026-05-08T08:55:00.000Z","group":"서교동","name":"이정희","birthDate":"19860119","careerMonths":"16","department":"북부TC 81센터","jobType":"sales","incomeRange":"400-600","recruitCount":"1","scores":{"CP":6,"NP":12,"A":7,"FC":5,"AC":10},"grades":{"CP":"극저","NP":"중","A":"극저","FC":"극저","AC":"저"},"top1":"NP","top2":"AC","bottom":"FC","total":40},{"id":"d8cca97e-0609-4b14-bb50-26d2b8ac4718","timestamp":"2026-05-08T05:58:00.000Z","group":"합정동","name":"조태신","birthDate":"19711005","careerMonths":"257","department":"강남지점 1팀","jobType":"sales","incomeRange":"800-1000","recruitCount":"1","scores":{"CP":8,"NP":19,"A":7,"FC":12,"AC":13},"grades":{"CP":"저","NP":"극고","A":"극저","FC":"중","AC":"중"},"top1":"NP","top2":"AC","bottom":"A","total":59},{"id":"2dbdb569-0ba7-4356-9da7-8659dc84e6e2","timestamp":"2026-05-08T06:61:00.000Z","group":"망원동","name":"유현주","birthDate":"19791014","careerMonths":"88","department":"용인에이스 3팀","jobType":"sales_leader","incomeRange":"800-1000","recruitCount":"2","scores":{"CP":10,"NP":16,"A":16,"FC":14,"AC":16},"grades":{"CP":"저","NP":"고","A":"고","FC":"고","AC":"고"},"top1":"A","top2":"NP","bottom":"CP","total":72},{"id":"b4c26df2-da32-433c-a23d-a54787df2fe0","timestamp":"2026-05-08T07:64:00.000Z","group":"서교동","name":"이현미","birthDate":"19781125","careerMonths":"61","department":"에이스지점 2팀","jobType":"sales_leader","incomeRange":"800-1000","recruitCount":"1-2","scores":{"CP":12,"NP":8,"A":6,"FC":14,"AC":8},"grades":{"CP":"중","NP":"저","A":"극저","FC":"고","AC":"저"},"top1":"FC","top2":"CP","bottom":"A","total":48},{"id":"7dead1bb-0fe8-4024-ae05-55e712401a03","timestamp":"2026-05-08T08:67:00.000Z","group":"합정동","name":"김도예","birthDate":"19861023","careerMonths":"46차월","department":"별내TC지점","jobType":"sales","incomeRange":"under200","recruitCount":"1","scores":{"CP":10,"NP":18,"A":8,"FC":19,"AC":16},"grades":{"CP":"저","NP":"극고","A":"저","FC":"극고","AC":"고"},"top1":"FC","top2":"NP","bottom":"A","total":71},{"id":"9aa8c6be-3abd-4a33-957b-1a5a28930c22","timestamp":"2026-05-08T05:10:00.000Z","group":"망원동","name":"조성순","birthDate":"19711102","careerMonths":"125","department":"노원별내","jobType":"sales","incomeRange":"over2000","recruitCount":"1","scores":{"CP":16,"NP":10,"A":10,"FC":7,"AC":11},"grades":{"CP":"고","NP":"저","A":"저","FC":"극저","AC":"중"},"top1":"CP","top2":"AC","bottom":"FC","total":54},{"id":"67f7777f-bea9-4948-a293-232e350c0a21","timestamp":"2026-05-08T06:13:00.000Z","group":"서교동","name":"은미옥","birthDate":"19800303","careerMonths":"65","department":"별내TC 83센터","jobType":"sales_leader","incomeRange":"400-600","recruitCount":"4","scores":{"CP":10,"NP":20,"A":10,"FC":14,"AC":20},"grades":{"CP":"저","NP":"극고","A":"저","FC":"고","AC":"극고"},"top1":"NP","top2":"AC","bottom":"CP","total":74},{"id":"sample-coach-52","timestamp":"2026-01-14T10:00:00","group":"합정동","name":"이윤교","birthDate":"23055938.0","careerMonths":"32개월","company":"DB손해보험","department":"신노원리더tc","jobType":"coach","incomeRange":"월   300만원 이상","recruitCount":"4명","scores":{"CP":7,"NP":15,"A":10,"FC":15,"AC":13},"grades":{"CP":"극저","NP":"고","A":"저","FC":"고","AC":"중"},"top1":"NP","top2":"FC","bottom":"CP","total":60},{"id":"sample-coach-65","timestamp":"2026-01-14T10:00:00","group":"합정동","name":"제은지","birthDate":"19921212.0","careerMonths":"65개월","company":"DB손해보험","department":"DB손해보험, 창원지점, 1팀","jobType":"coach","incomeRange":"월   300만원 이상","recruitCount":"9명","scores":{"CP":9,"NP":13,"A":16,"FC":5,"AC":12},"grades":{"CP":"저","NP":"중","A":"고","FC":"극저","AC":"중"},"top1":"A","top2":"NP","bottom":"FC","total":55}]`),el={sales:`보험설계사`,coach:`코치/멘토`,sales_leader:`관리자`,branch_manager:`관리자`,training_leader:`관리자`,division_head:`관리자`,executive:`관리자`},tl={sales:`고객 컨설팅 영업`,coach:`신인 육성 코칭`,sales_leader:`조직운영 리더`,branch_manager:`지점장/지사장`,training_leader:`교육팀장/지원팀장`,division_head:`사업단장/부장`,executive:`본부장`},nl={under200:`200만 미만`,"200-400":`200~400만`,"400-600":`400~600만`,"600-800":`600~800만`,"800-1000":`800~1000만`,"1000-1500":`1000~1500만`,"1500-2000":`1500~2000만`,over2000:`2000만 이상`},rl={CP:{bg:`#ef4444`,light:`#fef2f2`,text:`#dc2626`},NP:{bg:`#f59e0b`,light:`#fffbeb`,text:`#d97706`},A:{bg:`#38bdf8`,light:`#f0f9ff`,text:`#0284c7`},FC:{bg:`#10b981`,light:`#ecfdf5`,text:`#059669`},AC:{bg:`#8b5cf6`,light:`#f5f3ff`,text:`#7c3aed`}},il=[`#0012de`,`#e11d48`,`#059669`,`#d97706`,`#7c3aed`,`#0891b2`,`#be185d`,`#4338ca`];function al(e){if(!e)return{bg:`#888`,text:`#fff`};let t=0;for(let n=0;n<e.length;n++)t=t*31+e.charCodeAt(n)>>>0;return{bg:il[t%il.length],text:`#fff`}}function ol({ego:e,score:t}){let n=t/20*100,r=rl[e];return(0,H.jsx)(`td`,{className:`td-score-bar`,children:(0,H.jsx)(`div`,{className:`score-cell-v`,style:{background:`linear-gradient(to top, ${r.bg}30 ${n}%, transparent ${n}%)`},children:(0,H.jsx)(`span`,{className:`score-num`,children:t})})})}function sl({ego:e,type:t}){let n=rl[e];return(0,H.jsx)(`span`,{className:`ego-tag`,style:t===`top`?{background:n.light,color:n.text,border:`1.5px solid ${n.bg}40`}:{background:`#f5f5f5`,color:`#999`,border:`1.5px solid #e0e0e0`},children:e})}function cl({group:e}){let t=al(e);return(0,H.jsx)(`span`,{className:`group-badge`,style:{background:t.bg,color:t.text},children:e||`-`})}function W({onLogout:e}){let[t,n]=(0,x.useState)(`results`),[r,i]=(0,x.useState)([]),[a,o]=(0,x.useState)([]),[s,c]=(0,x.useState)(`all`);async function l(){let[e,t]=await Promise.all([Rc(),rc()]);i(e),o(t)}(0,x.useEffect)(()=>{l()},[]);function u(e){c(e||`all`),n(`results`)}let d={};for(let e of r)e.campaignId&&(d[e.campaignId]=(d[e.campaignId]||0)+1);let f=s===`all`?r:r.filter(e=>e.group===s),p={};for(let e of r)e.group&&(p[e.group]=(p[e.group]||0)+1);let m=[...new Set(a.slice().sort((e,t)=>(e.period_start||`9999-99-99`).localeCompare(t.period_start||`9999-99-99`)||(e.created_at||``).localeCompare(t.created_at||``)).map(e=>e.client_name))];async function h(e){let t=r.find(t=>t.id===e);window.confirm(`${t?.name||``}님의 결과를 삭제하시겠습니까?`)&&i(await U(e))}async function g(e){let t=r.filter(t=>t.campaignId===e.id);window.confirm(`[${e.client_name}] 캠페인과 연결된 응답 ${t.length}건을 삭제합니다.\n\n삭제 전 이 캠페인 응답을 CSV로 백업 다운로드합니다. 계속할까요?`)&&(t.length>0&&v(t,`backup_${e.client_name}_${new Date().toISOString().slice(0,10)}.csv`),await oc(e.id),await l())}async function _(){let e=await rc(),t={};for(let n of e)t[n.client_name]=n;let n=[...new Set($c.map(e=>e.group))],r={},i=0;for(let e of n)t[e]?r[e]=t[e].id:r[e]=(await ic({clientName:e,target:`샘플 캠페인`,status:`active`,periodStart:new Date(Date.now()+i*7*864e5).toISOString().slice(0,10),periodEnd:null,educationDate:null,memo:`테스트용 샘플 데이터`})).id,i++;for(let e of $c)await Lc({group:e.group,name:e.name,birthDate:e.birthDate,careerMonths:e.careerMonths,company:e.company||``,department:e.department,jobType:e.jobType,incomeRange:e.incomeRange,recruitCount:e.recruitCount},{scores:e.scores,grades:e.grades,top1:e.top1,top2:e.top2,bottom:e.bottom,total:e.total},r[e.group]||null);await l()}function v(e,t){if(!e||e.length===0)return;let n=`﻿`+[[`그룹`,`이름`,`생년월일`,`경력(월)`,`회사`,`소속`,`직무`,`소득`,`리크루팅`,`CP`,`NP`,`A`,`FC`,`AC`,`총점`,`TOP1`,`TOP2`,`BOTTOM`,`일시`],...e.map(e=>[e.group,e.name,e.birthDate,e.careerMonths,e.company||``,e.department,tl[e.jobType]||e.jobType,nl[e.incomeRange]||e.incomeRange||``,e.recruitCount||``,e.scores?.CP,e.scores?.NP,e.scores?.A,e.scores?.FC,e.scores?.AC,e.total,`${e.top1} ${yc[e.top1]}`,`${e.top2} ${yc[e.top2]}`,`${e.bottom} ${yc[e.bottom]}`,new Date(e.timestamp).toLocaleString(`ko-KR`)])].map(e=>e.join(`,`)).join(`
`),r=new Blob([n],{type:`text/csv;charset=utf-8;`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=t,a.click(),URL.revokeObjectURL(i)}function y(){v(f,`egogram_results_${new Date().toISOString().slice(0,10)}.csv`)}let b=[`CP`,`NP`,`A`,`FC`,`AC`];return(0,H.jsxs)(`section`,{className:`admin-section`,children:[(0,H.jsxs)(`div`,{className:`admin-header`,children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`h1`,{children:`관리자`}),(0,H.jsxs)(`p`,{className:`admin-count`,children:[`설문 결과 `,r.length,`건 · 캠페인 `,a.length,`개`]})]}),(0,H.jsx)(`button`,{className:`btn btn-secondary`,onClick:e,children:`로그아웃`})]}),(0,H.jsxs)(`div`,{className:`admin-tabs`,children:[(0,H.jsx)(`button`,{className:`admin-tab ${t===`campaigns`?`active`:``}`,onClick:()=>n(`campaigns`),children:`캠페인 관리`}),(0,H.jsx)(`button`,{className:`admin-tab ${t===`dashboard`?`active`:``}`,onClick:()=>n(`dashboard`),children:`진행 현황`}),(0,H.jsx)(`button`,{className:`admin-tab ${t===`results`?`active`:``}`,onClick:()=>n(`results`),children:`결과 확인`})]}),t===`campaigns`&&(0,H.jsx)(Kc,{campaigns:a,counts:d,onChange:l,onViewResults:u,onDeleteCampaign:g}),t===`dashboard`&&(0,H.jsx)(Qc,{campaigns:a,counts:d}),t===`results`&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(`div`,{className:`admin-toolbar`,children:[(0,H.jsxs)(`div`,{className:`admin-filters`,children:[(0,H.jsx)(`label`,{className:`results-filter-label`,children:`캠페인`}),(0,H.jsxs)(`select`,{className:`form-input results-filter-select`,value:s,onChange:e=>c(e.target.value),children:[(0,H.jsxs)(`option`,{value:`all`,children:[`전체 (`,r.length,`)`]}),m.map(e=>(0,H.jsxs)(`option`,{value:e,children:[e,` (`,p[e]||0,`)`]},e))]})]}),(0,H.jsxs)(`div`,{className:`admin-actions`,children:[(0,H.jsx)(`button`,{className:`btn btn-secondary`,onClick:_,children:`샘플 20명`}),(0,H.jsx)(`button`,{className:`btn btn-primary`,onClick:y,disabled:f.length===0,children:`CSV 다운로드`})]})]}),f.length===0?(0,H.jsx)(`div`,{className:`admin-empty`,children:`아직 설문 결과가 없습니다.`}):(0,H.jsx)(`div`,{className:`admin-table-wrap`,children:(0,H.jsxs)(`table`,{className:`admin-table`,children:[(0,H.jsx)(`thead`,{children:(0,H.jsxs)(`tr`,{children:[(0,H.jsx)(`th`,{children:`그룹`}),(0,H.jsx)(`th`,{children:`이름`}),(0,H.jsx)(`th`,{children:`생년월일`}),(0,H.jsx)(`th`,{children:`경력`}),(0,H.jsx)(`th`,{children:`회사`}),(0,H.jsx)(`th`,{children:`소속`}),(0,H.jsx)(`th`,{children:`직무`}),(0,H.jsx)(`th`,{children:`소득`}),(0,H.jsx)(`th`,{children:`리크루팅`}),b.map(e=>(0,H.jsx)(`th`,{className:`th-ego`,style:{color:rl[e].bg},children:e},e)),(0,H.jsx)(`th`,{children:`총점`}),(0,H.jsx)(`th`,{children:`TOP1`}),(0,H.jsx)(`th`,{children:`BOT`}),(0,H.jsx)(`th`,{children:`일시`}),(0,H.jsx)(`th`,{children:`리포트`}),(0,H.jsx)(`th`,{})]})}),(0,H.jsx)(`tbody`,{children:f.map(e=>(0,H.jsxs)(`tr`,{children:[(0,H.jsx)(`td`,{children:(0,H.jsx)(cl,{group:e.group})}),(0,H.jsx)(`td`,{className:`td-name`,children:e.name}),(0,H.jsx)(`td`,{children:e.birthDate}),(0,H.jsx)(`td`,{children:e.careerMonths&&`${e.careerMonths}개월`}),(0,H.jsx)(`td`,{children:e.company||`-`}),(0,H.jsx)(`td`,{children:e.department}),(0,H.jsx)(`td`,{children:tl[e.jobType]||e.jobType}),(0,H.jsx)(`td`,{className:`td-small`,children:nl[e.incomeRange]||`-`}),(0,H.jsx)(`td`,{children:e.recruitCount||`-`}),b.map(t=>(0,H.jsx)(ol,{ego:t,score:e.scores?.[t]||0},t)),(0,H.jsx)(`td`,{className:`td-score td-total`,children:e.total}),(0,H.jsx)(`td`,{children:(0,H.jsx)(sl,{ego:e.top1,type:`top`})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(sl,{ego:e.bottom,type:`bot`})}),(0,H.jsx)(`td`,{className:`td-date`,children:new Date(e.timestamp).toLocaleString(`ko-KR`,{month:`numeric`,day:`numeric`,hour:`2-digit`,minute:`2-digit`})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`div`,{className:`report-action-group`,children:(0,H.jsxs)(`a`,{href:`#/report/${e.id}`,target:`_blank`,className:`btn-report-action`,children:[`리포트 보기`,(0,H.jsx)(`span`,{className:`btn-report-type`,"data-type":el[e.jobType]||`보험설계사`,children:el[e.jobType]||`보험설계사`})]})})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`button`,{className:`btn-delete-action`,onClick:()=>h(e.id),children:`삭제`})})]},e.id))})]})})]})]})}function ll(){let[e,t]=(0,x.useState)(null),[n,r]=(0,x.useState)(!0);return(0,x.useEffect)(()=>{$s.auth.getSession().then(({data:e})=>{t(e.session),r(!1)});let{data:e}=$s.auth.onAuthStateChange((e,n)=>{t(n)});return()=>e.subscription.unsubscribe()},[]),n?(0,H.jsx)(`section`,{className:`landing-section`,children:(0,H.jsx)(`p`,{className:`landing-desc`,children:`불러오는 중...`})}):e?(0,H.jsx)(W,{onLogout:()=>$s.auth.signOut()}):(0,H.jsx)(Bc,{})}var ul={job_type:`insurance`,job_label:`보험설계사`,cm1:{"17-20":{CP:`주장이 강함, 단호함, 책임감 강함, 밀어붙임, 기준과 통제가 높음.`,NP:`탁월한 공감능력, 강한 배려심, 보호본능, 신뢰형성`,A:`강한 분석력과 판단력, 명확성, 객관성, 높은 이성`,FC:`아주 밝음, 활발함, 표현 풍부, 친근함, 에너지, 다소 가벼움`,AC:`순응, 눈치, 조심, 맞춤형, 불안.`},"14-16":{CP:`결정력 있음, 믿음직한, 판단이 빠름, 기준과 통제가 있음.`,NP:`공감 잘함, 배려 깊음, 따뜻함, 신뢰감 있음, 안정적.`,A:`이성적, 균형감, 현실적, 분석적.`,FC:`밝음, 친화력, 유연함, 편안함, 자연스러움.`,AC:`협조, 적당한 순응, 적당한 눈치, 조율.`},"11-13":{CP:`균형감 있는 결정력, 유연한 기준과 통제, 보통의 주장성.`,NP:`적당한 친절, 예의 바름, 부담 없음.`,A:`평균적 분석, 보통의 현실감각, 보통의 이성과 상황 판단.`,FC:`안정감, 차분한, 균형감, 무난함.`,AC:`적응력, 균형감, 무난함, 순응과 직설의 중용.`},"8-10":{CP:`완화된 결정력과 주장성, 조금 망설임, 조율함.`,NP:`차분함, 무심해 보임, 실무형, 표현 적음.`,A:`감정이 우선, 계산이 다소 약함, 판단이 조금 흔들림.`,FC:`조용함, 신중함, 진지함, 다소 거리감`,AC:`독립적, 솔직함, 직설적, 자기 기준.`},"0-7":{CP:`우유부단, 착함,  결정 어려움, 말을 아낌.`,NP:`무뚝뚝함, 공감 부족, 차갑게 보임.`,A:`감정 몰임, 즉각 반응, 예술적, 판단과 논리가 조금 부족 .`,FC:`무표정, 감정 절제, 경직됨, 딱딱함.`,AC:`단호함, 직선적, 눈치 안 봄, 상대를 통제.`}},cm2:{"17-20":{CP:`기준과 원칙이 아주 분명합니다. 상담 자리에서 말과 자세가 단정하고 자신감이 있습니다. “이 부분은 꼭 필요합니다”, “이 선택이 가장 안전합니다”처럼 단호하게 말합니다. 고객이 망설이면 방향을 잡아 주려는 마음이 강합니다. 다만 너무 확신에 찬 말투 때문에 고객이 압박을 느낄 수 있습니다.`,NP:`고객을 향한 마음의 온도가 매우 높습니다. 고객의 말을 들으면 먼저 이해하려 하고, 판단보다 공감을 앞세웁니다. 그래서 고객은 이분과 상담할 때 편안함을 느끼고, 자신의 이야기를 솔직하게 꺼내도 괜찮겠다는 신뢰를 갖게 됩니다. 힘든 상황에서도 끝까지 함께해 줄 사람이라는 확신을 주는, 관계의 기반을 만드는 따뜻한 힘이 있습니다.`,A:`고객 상담에서 감정에 치우치지 않고 사실과 흐름을 차분히 정리하는 능력이 뛰어납니다. 복잡한 조건 속에서도 핵심을 잡아 주기 때문에 고객은 방향을 잃지 않습니다. 설명은 명확하고 판단은 균형 잡혀 있어, 고객에게 안정감과 전문성을 동시에 느끼게 합니다. 믿고 맡길 수 있는 사람이라는 확신을 만드는 힘입니다.`,FC:`사람을 만나는 걸 정말 즐깁니다. 상담할 때 표정이 밝고 마음이 열려 있으며, 먼저 웃으며 말을 겁니다. 고객의 이야기에 고개를 끄덕이고 반응이 빠릅니다. 말투는 부드럽고 친근해서 “아, 그런 상황이셨군요”처럼 공감부터 합니다. 다만 분위기가 너무 가벼워 보이면 중요한 설명이 가볍게 느껴질 수 있어 조절이 필요합니다.`,AC:`고객의 표정과 말투를 아주 민감하게 살핍니다. 고객이 불편해할까 봐 먼저 조심하고, 맞춰 주는 태도가 강합니다. 말할 때도 “괜찮으시면요”, “부담되시면 안 하셔도 돼요” 같은 표현을 자주 씁니다. 고객의 기분은 잘 읽지만, 본인 의견을 끝까지 말하지 못해 설명이 흐려질 수 있습니다.`},"14-16":{CP:`책임감 있고 믿음직한 태도를 보입니다. 상담할 때 흐트러짐 없이 차분하게 설명하고, 중요한 포인트를 분명히 짚어 줍니다. 말투는 또렷하지만 공격적이지 않고 “이 기준으로 보시면 이해가 쉬워요”처럼 안내합니다. 고객은 이 성향의 컨섵턴트를 통해 안정감과 신뢰를 느끼기 쉽습니다.`,NP:`따뜻하면서도 안정감 있게 고객을 대합니다. 고객의 이야기를 잘 들어주고 고개를 끄덕이며 공감해 줍니다. 말투는 부드럽고 “그렇게 느끼실 수 있어요”, “많이 고민되셨죠” 같은 표현을 자연스럽게 씁니다. 필요할 때는 조심스럽게 방향을 제시해 고객이 혼자 결정한다고 느끼게 해줍니다. 신뢰받기 쉬운 태도입니다.`,A:`감정보다 이성과 논리로 상담합니다. 고객의 이야기를 차분히 듣고, 필요한 정보만 골라 쉽게 제안합니다. “걱정되실 수 있어요. 그래서 이 상황에서는 이렇게 해 봅시다”처럼 짧게 공감을 한 후에 코칭을 합니다. 말투가 안정적이고 판단이 흔들리지 않아 고객이 신뢰하기 쉽습니다. 가장 이상적인 상담 태도입니다.`,FC:`편안한 분위기를 자연스럽게 만듭니다. 자세는 안정적이고 표정도 부드러워 고객이 긴장을 풀기 쉽습니다. 말할 때는 웃음과 공감을 섞어 “편하게 생각하셔도 됩니다”라고 말합니다. 분위기는 밝고 과하지 않아 상담이 편안합니다.`,AC:`상황을 보며 말을 고르는 편입니다. 고객 반응을 보면서 속도를 조절하고, 무리하게 밀지 않습니다. “이 부분은 고객님 상황에 맞춰 생각해 보셔도 돼요”처럼 부드럽게 말합니다. 배려와 안정감은 주지만, 결정이 늦어질 수 있습니다.`},"11-13":{CP:`상황에 맞게 유연하게 대응합니다. 자기 의견도 있지만 고객 말도 잘 듣습니다. 상담에서는 “제 생각은 이렇지만, 고객님 상황도 중요합니다”처럼 균형 잡힌 말을 합니다. 강하게 밀어붙이지도, 너무 물러서지도 않아 편안한 상담이 됩니다. 고객은 부담 없이 설명을 받아들입니다.`,NP:`고객에게 예의 있게 대하고 필요한 설명을 차분히 합니다. 말은 짧고 정리되어 있으며 “이 부분은 이렇게 보시면 돼요”처럼 담백한 표현을 씁니다. 고객은 부담 없이 설명을 듣는 느낌을 받습니다. 다만 공감하는 표현을 조금만 더 한다면 고객의 만족도는 더 상승합니다.`,A:`상황에 따라 감정과 논리를 오가며 상담합니다. 고객 반응을 보며 설명을 조절하고, 너무 딱딱하지도 너무 감정적이지도 않습니다. “이렇게 생각하실 수 있는데, 현실적으로 보면 이 선택이 좋아요”처럼 말합니다. 무난하지만 결정이 조금 늦어질 수 있어 정리 멘트가 필요합니다.`,FC:`무난하고 차분한 태도를 보입니다. 자세는 바르고 표정은 안정적입니다. 말투는 또렷하지만 감정 표현은 많지 않습니다. “이 부분을 설명드리겠습니다”처럼 설명 중심으로 말합니다. 편하지도 불편하지도 않은 느낌을 주며, 고객은 안정감을 느끼며 “이 분은 전문가 답다"라고 느낌`,AC:`고객 눈치도 보고 자기 생각도 말할 줄 압니다. 분위기가 무겁지 않게 유지하면서도 필요한 설명은 분명히 합니다. “이건 장단점이 있어요. 고객님께 맞는 쪽을 같이 보죠”처럼 균형 잡힌 말투를 씁니다. 고객도 부담 없이 듣습니다.`},"8-10":{CP:`고객을 존중하면서도 자기 생각을 조금씩 말할 수 있습니다. 상담할 때 “제 경험으로 보면 이 방법이 더 안전해요”처럼 조심스럽게 방향을 제시합니다. 고객을 몰아붙이지는 않지만, 완전히 맡기지도 않습니다. 다만 확신이 조금은 약해 보여서 고객이 결정을 미루는 경우가 가끔 생기기도 합니다.`,NP:`배려하는 표현이 다소 적은 편입니다. 고객을 존중하긴 하지만 말수가 많지 않습니다. 상담에서는 설명 위주로 말하며 “이 상품은 이런 구조입니다”처럼 사실 중심으로 이야기합니다. 공감 표현은 적어 다소 차갑게 느껴질 수 있지만, 일은 또렷하게 진행됩니다. 고객에 따라 거리감이 느껴질 수 있습니다.`,A:`상황을 이해하고 판단하려는 노력은 있지만 중요한 결정에서 경험이나 익숙한 방법을 우선 참고하는 경우가 있습니다. 상담 중에도 사실 확인이나 원인 분석보다 다소 감정적인 해석이나 경험 중심의 판단에 의존하는 경우가 있어 문제의 원인과 해결 방법을 한 번 더 정리하는 습관이 필요합니다.`,FC:`조용하고 진지한 모습이 강합니다. 상담 중 말수가 적고 표정 변화도 크지 않습니다. 자세는 단정하지만 다소 굳어 보일 수 있습니다. 말할 때는 필요한 말만 짧게 하며 감정 표현이 거의 없습니다. 고객은 신뢰는 느끼지만 “조금 신중하다”고 느낄 수 있습니다.`,AC:`고객 반응에 크게 흔들리지 않습니다. 자기 기준으로 차분하게 설명하고, 필요하면 직설적으로 말합니다. “지금 상황에는 이 상품이 맞습니다”처럼 간단히 말합니다. 솔직해서 신뢰는 주지만, 예민한 고객에게는 조금은 차갑게 느껴질 수 있습니다.`},"0-7":{CP:`자기 기준을 강하게 내세우지 않습니다. 상담할 때 고객 말을 먼저 듣고, 웬만하면 반대하지 않습니다. “고객님 생각이 맞아요”, “원하시는 대로 하셔도 됩니다”라는 말을 자주 합니다. 분위기는 편하지만, 고객이 “그래서 뭘 선택해야 하지?” 하고 헷갈릴 수 있습니다. 방향을 잡아주는 힘은 약한 편입니다.`,NP:`상대가 느끼기에 다소 차갑게 보일 수 있습니다.  상담할 때도 바로 본론으로 들어가며 “필요한 것만 말씀드리겠습니다”라는 식의 말투를 씁니다. 위로나 공감보다는 정보 전달이 중심입니다. 고객은 정확하다고 느낄 수 있지만, 마음을 이해받는 느낌은 적을 수 있습니다. 친절해 보이지 않는다는 오해를 받을 수 있습니다.`,A:`직관과 경험을 중요하게 생각하는 편입니다. 다만 중요한 판단에서도 사실 확인이나 객관적인 비교가 충분하지 않을 수 있습니다. 고객 상담 시에도 감정적인 판단이나 개인 경험을 사실보다 우선하는 경우가 있어 내용은 자료와 근거를 다시 확인하는 습관이 필요합니다.`,FC:`감정을 거의 드러내지 않습니다. 표정이 굳어 있고 몸도 긴장돼 보일 수 있습니다. 말투는 건조하고 설명 위주이며 공감 표현이 적습니다. 고객이 말을 해도 반응이 적어 “내 말이 전달됐나?”라고 느낄 수 있습니다. 신뢰는 줄 수 있지만 거리감이 커질 가능성이 있습니다.`,AC:`남의 시선을 크게 신경 쓰지 않습니다. 고객 눈치를 거의 보지 않고 자기 생각대로 말합니다. “이게 제일 합리적입니다”처럼 단정적인 표현이 많습니다. 자신감은 느껴지지만, 고객이 압박을 느끼는 경우가 발생할 수 있습니다.`}},cm3:{CP_NP:`고객은 OOO님을 통해 단단함과 따뜻함을 동시에 느끼게 됩니다. 무엇이 맞는지 분명하게 이야기해 주는 힘이 있어 방향을 잃지 않게 도와주고, 혹시라도 마음이 불안해지면 옆에서 손을 잡아 주듯 안정감을 줍니다. 그래서 고객은 “나를 제대로 챙겨 줄 사람을 만났다”는 느낌을 자연스럽게 받습니다.

기준이 있다는 것은 전문가라는 뜻입니다.
하지만 그 기준을 사람을 위해 사용한다는 점이 더 큰 감동을 만듭니다. 고객의 상황을 듣고, 이해하고, 무리한 선택을 막아 주며, 필요한 부분을 책임 있게 정리해 줍니다. 이 모습은 신뢰를 만들고, 신뢰는 결국 관계를 오래가게 합니다.

시간이 지날수록 고객의 마음속에서는 이런 생각이 자랍니다.
“이 사람은 나에게 팔려고 하기보다 도와 주려고 한다.”

보험은 계약보다 사람이 남는 일입니다.
그리고 OOO님은 사람을 남기는 힘이 매우 큽니다.

앞으로의 성장 가능성은 분명합니다.
원칙이 흔들리지 않기 때문에 실수로 무너지지 않고, 따뜻함이 있기 때문에 고객이 떠나지 않습니다. 단단한 뿌리와 넓은 그늘을 함께 가진 나무처럼, 시간이 흐를수록 더 많은 사람이 찾게 될 것입니다.

이미 좋은 컨설턴트의 길 위에 서 있습니다.
그리고 앞으로는 더 많은 사람이 그 가치를 알아보게 될 것입니다.`,CP_A:`상담 자리에 앉는 순간 고객은 묘한 안정감을 느낍니다. 말의 기준이 분명하고, 설명에는 흔들림이 없습니다. 감정에 휩쓸리기보다 사실을 바탕으로 또박또박 정리해 주기 때문에 고객은 복잡했던 생각이 차분하게 정돈됩니다. 무엇을 선택해야 할지 몰라 답답했던 마음이 “이제 알겠다”로 바뀌는 경험을 하게 됩니다.

OOO님은 강한 책임감을 바탕으로 움직입니다. 맞는 것은 맞다고, 아닌 것은 아니라고 이야기해 주는 힘이 있습니다. 그런데 그것이 차갑게 들리지 않는 이유는 판단이 공정하고 근거가 분명하기 때문입니다. 고객은 압박을 받는 느낌이 아니라 보호받는 느낌을 받습니다.

상담이 끝날 즈음이면 고객의 머릿속에는 이런 생각이 남습니다.
“나에게 팔려고 온 사람이 아니라, 제대로 판단하게 도와주는 전문가구나.”

보험은 결국 신뢰가 쌓여야 이어지는 일입니다. OOO님은 말을 많이 하지 않아도 믿음이 쌓이는 구조를 이미 가지고 있습니다. 시간이 지날수록 고객은 더 의지하게 되고, 소개와 재계약으로 관계는 넓어집니다.

앞으로의 성장 가능성은 매우 큽니다. 기준이 단단하기 때문에 방향을 잃지 않고, 이성적인 판단이 받쳐 주기 때문에 큰 실수를 줄일 수 있습니다. 한 번 신뢰를 얻으면 오래 가는 상담을 만들어 내는 힘, 그것이 가장 큰 자산입니다.

지금도 충분히 잘하고 있습니다.
그리고 경험이 더해질수록 무게감 있는 전문가로 기억될 것입니다.`,CP_FC:`OOO님은 고객을 만나는 순간부터 분위기가 단번에 살아납니다. 기준과 원칙은 분명하게 세워 두면서도, 표정이 밝고 생기가 흐르기 때문입니다. 해야 할 말은 또렷하게 전달하고, 동시에 상대가 편안하게 웃을 수 있는 여유도 있습니다. 그래서 상담 시간이 부담이 아니라 즐거운 만남처럼 느껴집니다.

이 성향의 힘은 신뢰와 친밀함을 동시에 만든다는 점입니다. 한쪽만 있으면 부족해질 수 있지만, 두 가지가 함께 움직이니 고객의 마음은 빠르게 열립니다. 설명을 들을수록 “이 사람은 믿을 수 있다”는 생각이 들고, 함께 이야기할수록 “또 만나고 싶다”는 마음이 생깁니다.

상담이 끝나면 고객의 기억 속에는 이런 느낌이 남습니다.
“원칙이 분명한데도 불편하지 않고, 오히려 기분 좋게 결정하게 해 준 사람.”

보험은 결국 사람의 마음을 얻는 일입니다. 즐거움 속에서 신뢰를 만들 수 있다면, 관계는 오래 갑니다. 시간이 갈수록 소개가 늘어나고, 고객은 자연스럽게 주변 사람에게 이 성향의 컨섵턴트 이야기를 꺼내게 됩니다.

앞으로의 성장 가능성은 더욱 기대됩니다. 기준이 중심을 잡아 주고, 밝은 에너지가 사람을 끌어당기기 때문입니다. 경험이 더해질수록 만남 하나하나가 팬을 만드는 시간이 될 것입니다.

지금의 모습 자체가 이미 큰 경쟁력입니다.
그리고 앞으로는 사람을 모으는 전문가로 더 또렷하게 빛나게 될 것입니다.`,CP_AC:`고객은 OOO님을 통해 묘하게 안심이 됩니다. 왜냐하면 기준이 분명하기 때문입니다. 해야 할 말과 하지 말아야 할 말을 구분하고, 도움이 되는 방향을 또렷하게 제시합니다. 그래서 고객은 생각합니다.
“이 사람은 흔들리지 않는 전문가구나.”

그런데 여기에 한 가지 힘이 더 있습니다. 상대의 입장과 분위기를 빠르게 읽고 맞추는 능력입니다. 고객이 조심스러워하면 속도를 낮추고, 고민이 많아 보이면 충분히 기다려 줍니다. 강하게 밀어붙이기보다 편안하게 결정할 수 있는 환경을 만들어 줍니다.

원칙은 단단하지만 태도는 부드럽습니다.
그래서 고객은 부담보다 신뢰를 먼저 느낍니다.

OOO님은 시간이 지날수록 더 큰 힘을 냅니다.
기준이 있으니 실수가 적고, 배려가 있으니 사람이 남습니다.
결국 계약은 관계 위에서 반복됩니다.

앞으로의 성장 가능성은 분명합니다.
신뢰를 주는 리더십과 상황에 맞추는 감각이 함께 있기 때문입니다. 고객은 이런 사람에게 가족을 맡기고, 지인을 소개합니다.

계속 이렇게만 가시면 됩니다.
이미 좋은 전문가의 길 위에 올라와 있습니다.`,NP_CP:`고객은 OOO님을 만나는 순간부터 따뜻함을 느끼게 됩니다. 말투에는 배려가 담겨 있고, 표정에는 상대를 진심으로 도와주고 싶다는 마음이 보입니다. 그래서 처음 보는 사람도 경계하기보다 편안함을 느끼게 됩니다. 그런데 이 부드러움 속에는 분명한 기준과 방향이 함께 자리 잡고 있습니다. 필요한 부분에서는 또렷하게 정리해 주고, 무엇이 고객에게 더 안전하고 유리한 선택인지 확신 있게 안내합니다.

이 성향의 힘은 마음을 열게 만드는 친절함과 결정을 돕는 단단함이 동시에 존재한다는 데 있습니다. 고객은 이야기를 나누면서 “정말 나를 생각해 주는구나”라는 감동을 받고, 설명을 들을수록 “그래서 믿고 맡길 수 있겠다”라는 확신을 가지게 됩니다.

상담이 끝난 뒤 고객의 마음속에는 이런 생각이 남습니다.
“나를 아껴 주면서도 제대로 이끌어 준 사람.”

보험은 상품을 파는 일이 아니라 사람의 삶을 책임지는 일입니다. 상대를 품는 따뜻함 위에 분명한 기준이 세워져 있으니, 시간이 지날수록 신뢰는 더 깊어집니다. 그 신뢰는 다시 소개로 이어지고, 소개는 또 다른 만남을 부릅니다.

앞으로의 성장 가능성은 매우 큽니다. 이미 사람의 마음을 얻는 방법을 알고 있고, 그 마음 위에 올바른 방향까지 제시할 수 있기 때문입니다. 경험이 쌓일수록 주변에는 도움받았다고 말하는 사람들이 계속 늘어나게 될 것입니다.

지금도 충분히 훌륭합니다.
그리고 앞으로는 고객의 인생에 오래 기억되는 이름으로 남게 될 것입니다.`,NP_A:`고객이 OOO님을 통해 가장 먼저 느껴지는 것은 따뜻함입니다. 상대의 이야기를 끊지 않고 끝까지 들으며, 무엇이 힘들고 무엇이 필요한지를 세심하게 살핍니다. 그래서 고객은 자연스럽게 마음을 열고 속마음까지 이야기하게 됩니다. 그런데 여기서 끝나지 않습니다. 충분히 공감한 뒤에는 감정에만 머물지 않고, 상황을 차분히 정리하여 현실적으로 도움이 되는 방법을 제시합니다.

이 성향의 큰 힘은 배려와 판단이 함께 움직인다는 점입니다. 고객은 “내 마음을 이해해 준다”는 안정감을 느끼면서도 동시에 “그래서 무엇을 하면 좋을지 명확하다”는 신뢰를 갖게 됩니다. 따뜻한데도 흔들리지 않고, 친절한데도 결정이 분명하니 상담의 밀도가 높아집니다.

상담이 끝나고 나면 고객의 마음속에는 이런 생각이 남습니다.
“나를 위로해 주면서도 길을 알려준 사람.”

보험은 복잡하고 어렵게 느껴질 수 있지만, 이 조합을 가진 사람을 만나면 이해가 쉬워집니다. 말이 과장되지 않고, 필요한 이유를 납득하게 만들기 때문입니다. 그래서 시간이 흐를수록 관계는 더 단단해지고, 고객은 주변 사람에게 자신 있게 소개하게 됩니다.

앞으로의 성장 가능성 역시 매우 밝습니다. 이미 사람을 품는 힘이 있고, 그 위에 정확한 판단을 더할 수 있기 때문입니다. 경험이 늘어날수록 상담의 깊이는 더욱 커지고, 신뢰는 오래 유지될 것입니다.

결국 고객에게 이렇게 기억됩니다.
“힘들 때 생각나는 전문가.”`,NP_FC:`고객은 OOO님을 만나는 순간 분위기가 부드러지는 것을 느낍니다. 상대를 편안하게 해주는 따뜻함이 먼저 전해지고, 이어서 밝은 에너지가 공간을 환하게 만듭니다. 그래서 처음 만난 사람도 금방 긴장을 풀고 웃게 됩니다. 보험 이야기는 딱딱할 수 있지만, 이 성향을 가진 사람의 설명은 부담이 적고 자연스럽게 들립니다.

상대의 상황을 세심하게 살피는 마음이 있기 때문에 고객은 “나를 생각해 주는 사람”이라고 느낍니다. 동시에 유연하고 생동감 있는 표현 덕분에 상담이 지루하지 않습니다. 어렵던 내용도 이야기처럼 쉽게 이해됩니다. 고객은 어느새 고개를 끄덕이며 대화를 따라오고, 상담 시간이 길어도 힘들다고 느끼지 않습니다.

이 성향의 진짜 힘은 정서적인 연결입니다. 고객의 마음에 따뜻한 기억이 남습니다. 단순히 상품을 들은 것이 아니라, 좋은 사람을 만났다고 느끼게 됩니다. 그래서 상담이 끝난 뒤에도 여운이 오래 갑니다.

시간이 지날수록 이 강점은 더 크게 자랍니다. 경험이 더해지면 공감의 깊이가 깊어지고, 전달력은 더 좋아집니다. 그러면 고객은 스스로 주변 사람을 소개해 주고 싶어집니다.

결국 이렇게 평가받게 됩니다.
“설명을 잘하는 사람이 아니라, 함께하고 싶은 사람.”

이 한마디가 앞으로의 성장을 계속 열어 줄 것입니다.`,NP_AC:`고객은 OOO님에게 금방 마음의 문을 엽니다. 나를 이해해 주고 내 편이 되어 줄 사람이라는 느낌을 받기 때문입니다. 말 한마디, 표정 하나에도 배려가 묻어나고, 고객의 이야기를 끝까지 들으려는 태도가 자연스럽게 전달됩니다. 그래서 상담은 설득의 시간이 아니라 함께 고민하는 시간처럼 느껴집니다.

여기에 더해 조직과 상황을 존중하는 태도가 더해지면 고객은 이렇게 생각합니다. “이 사람이라면 무리하게 밀어붙이지 않겠구나.” 신뢰는 바로 여기서 만들어집니다. 부담을 주지 않으면서도 필요한 방향으로 안내해 주기 때문에 편안함 속에서 결정이 이루어집니다.

OOO님은 고객의 속도를 기다릴 줄 압니다. 재촉하지 않고, 이해할 때까지 설명하며, 불안해 보이면 다시 풀어줍니다. 그래서 시간이 지나면 고객은 상품보다 사람을 믿고 선택하게 됩니다.

경험이 쌓일수록 공감 능력은 더 깊어지고, 배려는 더 세밀해집니다. 그러면 고객은 주변 사람에게 이렇게 말합니다.
“나를 생각해 주는 컨설턴트가 있는데, 꼭 한번 만나봐.”

이 말 한마디가 새로운 만남을 계속 만들어 줍니다. 결국 성장은 숫자가 아니라 사람의 신뢰가 쌓이는 속도만큼 커지게 됩니다.`,A_CP:`OOO님은 말의 무게가 다르게 느껴집니다. 감정에 흔들리지 않고 차분하게 상황을 정리해 주기 때문에, 복잡했던 고민이 또렷해집니다. 무엇이 필요하고 무엇을 먼저 준비해야 하는지 길을 잡아 주는 사람처럼 보입니다. 그래서 고객은 “이 사람 말이라면 믿고 따라가도 되겠다”는 안정감을 느낍니다.

원칙을 중요하게 여기면서도 판단은 냉정하고 공정합니다. 되는 것과 어려운 것을 분명하게 알려주기 때문에 오히려 더 신뢰가 깊어집니다. 듣기 좋은 말보다 도움이 되는 말을 해 주는 사람이라는 인상을 주기 때문입니다.

OOO님은 시간이 지날수록 더 큰 힘을 냅니다. 경험이 쌓일수록 설명은 더 정확해지고, 방향 제시는 더 단단해집니다. 고객은 선택의 순간마다 다시 연락하게 되고, 주변 사람에게 이렇게 소개합니다.
“정확하게 판단해 주는 컨설턴트야. 괜히 맡기는 게 아니야.”

결국 이 신뢰가 소개로 이어지고, 소개가 또 다른 인연을 만듭니다. 당신의 성장은 빠른 설득이 아니라 단단한 믿음이 넓어지는 과정으로 만들어집니다.`,A_NP:`고객을 만났을 때 OOO님은 아주 큰 힘을 냅니다. 먼저 상황을 차분하게 정리하고 사실을 정확하게 이해하려는 태도가 기본이 됩니다. 그래서 고객의 이야기를 들을 때도 감정에 끌려가기보다, 무엇이 문제인지 또 어떤 준비가 필요한지 또렷하게 보게 됩니다. 동시에 상대의 마음을 따뜻하게 살피는 배려가 함께 나오기 때문에 고객은 부담을 느끼지 않습니다.

설명을 들은 고객은 이런 느낌을 받습니다.
“내 상황을 제대로 이해해 주면서도, 나를 위해 진심으로 고민해 주는 사람이구나.”

이 신뢰는 매우 깊습니다. 단순히 상품을 권하는 사람이 아니라, 인생의 중요한 선택을 함께 생각해 주는 조력자로 보이기 때문입니다. 시간이 흐를수록 고객은 점점 더 많은 부분을 상의하게 되고, 자연스럽게 관계는 오래 이어집니다.

성장은 여기서 시작됩니다. 정확한 판단 위에 따뜻함이 더해지면, 고객은 스스로 주변 사람에게 이야기합니다. “그 사람은 믿어도 된다”고 말입니다. 그렇게 당신의 이름이 신뢰의 상징처럼 퍼져 나가게 됩니다.

결국 이 성향은 빠른 기술보다 오래가는 힘을 만듭니다.
당신의 미래는 지속되는 관계가 만들어 주는 안정적인 성장으로 이어질 가능성이 매우 큽니다.`,A_FC:`고객을 만나면 OOO님은 독특한 매력을 만들어 냅니다. 먼저 상황을 이성적으로 정리하고, 복잡한 내용을 쉽게 풀어 설명하는 힘이 있습니다. 무엇이 필요한지, 어떤 선택이 더 나은지 차분하게 보여 주기 때문에 고객은 마음이 편안해집니다. 여기에 밝고 자연스러운 표현, 편안한 분위기를 만드는 친근함이 더해집니다. 그래서 상담 시간이 딱딱하거나 어렵게 느껴지지 않습니다.

고객은 이런 느낌을 받습니다.
“설명은 똑 부러지게 해 주는데, 이야기하는 동안 부담이 없다. 같이 있으면 편하다.”

이 편안함은 아주 큰 자산입니다. 사람은 믿을 수 있는 사람에게 다시 연락하고, 기분 좋았던 사람을 다시 찾기 때문입니다. 한 번의 계약으로 끝나는 관계가 아니라, 오래 함께 가는 연결이 만들어집니다.

앞으로의 성장 가능성도 큽니다. 정확함 위에 호감이 더해지면 소개가 자연스럽게 이어집니다. 고객은 스스로 당신을 추천하게 되고, 당신의 일은 시간이 갈수록 단단해집니다.

결국 이 성향은 신뢰 + 호감이라는 가장 강력한 두 가지 무기를 동시에 가진 모습입니다. 그리고 그 힘은 시간이 지날수록 더 크게 빛나게 됩니다.`,A_AC:`고객을 만났을 때 OOO님은 단단하면서도 예의 바른 전문가의 분위기를 만들어 냅니다. 먼저 상황을 차분하게 파악하고, 숫자와 조건을 정리해 주며, 무엇이 더 현실적인 선택인지 또박또박 설명합니다. 그래서 고객은 “이 사람 말은 믿어도 되겠다”라는 안정감을 느끼게 됩니다. 여기에 상대의 입장과 분위기를 존중하는 태도가 함께 나타나기 때문에 말 한마디, 표정 하나에서도 배려가 느껴집니다.

고객은 이렇게 느끼기 쉽습니다.
“나를 이해하려고 노력하고, 괜히 부담을 주지 않는다. 그런데 설명은 정확하다.”

OOO님은 상담을 오래 이어 가게 만드는 힘이 있습니다. 강하게 밀어붙이지 않아도 고객이 스스로 고개를 끄덕이게 됩니다. 판단을 도와주는 사람, 옆에서 안전하게 길을 안내해 주는 사람처럼 보이기 때문입니다.

앞으로의 가능성도 매우 좋습니다. 신뢰를 바탕으로 관계가 깊어지고, 시간이 지나면서 소개와 재계약이 자연스럽게 따라옵니다. 화려하지 않아 보여도, 오래 갈수록 더 단단해지는 스타일입니다.

결국 이 성향은 정확함으로 믿음을 만들고, 배려로 마음을 얻는 힘을 가진 모습입니다. 그래서 시간이 흐를수록 더 크게 인정받게 됩니다.`,FC_CP:`고객은 OOO님을 만나는 순간 밝은 에너지와 자신감이 동시에 느껴집니다. 표정은 따뜻하고 말투는 생동감이 있어 처음 보는 사람도 금세 마음의 문을 열게 됩니다. 그런데 그 안에는 분명한 기준과 책임감이 자리 잡고 있어서, 분위기에만 머무르지 않고 반드시 결론까지 안내하는 힘이 있습니다. 즐겁게 이야기를 풀어가다가도 중요한 순간에는 딱 중심을 잡아 주기 때문에 고객은 “편하지만 믿을 수 있다”는 느낌을 받게 됩니다.

고객의 입장에서는 이렇게 보일 가능성이 큽니다.
“나를 편하게 해주면서도, 중요한 건 정확하게 짚어 준다. 그래서 맡겨도 되겠다.”

OOO님은 관계를 빠르게 만들고, 그 관계를 결과로 연결하는 능력이 뛰어납니다. 웃음으로 거리를 좁히고, 원칙으로 선택을 돕습니다. 감성과 기준이 함께 움직이기 때문에 상담의 밀도가 높아지고, 고객은 만남 자체에 만족을 느낍니다.

앞으로의 성장 가능성은 더욱 큽니다. 사람을 끌어당기는 힘이 이미 충분하고, 여기에 책임감 있는 안내가 더해지니 소개와 재방문이 자연스럽게 이어집니다. 시간이 지날수록 고객은 늘어나고, 신뢰는 더 단단해집니다.

결국 이 성향은 사람을 웃게 만들 줄 알면서도, 삶을 지켜 주는 결정을 이끌어 내는 힘을 가진 모습입니다. 그래서 함께하고 싶은 전문가로 오래 기억됩니다.`,FC_NP:`고객은 OOO님을 만나는 순간 공기가 부드러워짐을 느낍니다. 밝은 미소와 따뜻한 말 한마디가 긴장을 풀어 주고, 고객은 어느새 마음을 열고 자신의 이야기를 꺼내게 됩니다. 억지로 설득당한다는 느낌보다 “이 사람은 나를 이해해 주는구나”라는 감정을 먼저 받습니다. 즐거운 분위기를 만들 줄 알고, 동시에 상대의 입장을 배려하기 때문에 상담 시간이 부담이 아니라 위로와 응원의 시간이 됩니다.

고객의 마음속에는 이런 생각이 자리 잡기 쉽습니다.
“나를 편하게 해주고, 내 상황을 진짜로 걱정해 준다.”

이 힘은 단순히 계약을 만드는 능력을 넘어섭니다. 관계가 오래 가고, 시간이 지나도 다시 찾고 싶은 사람이 됩니다. 소개가 이어지고, 주변 사람에게 자연스럽게 추천하고 싶어집니다. 사람을 기분 좋게 만드는 재능은 쉽게 사라지지 않기 때문에 경험이 쌓일수록 영향력은 더 커집니다.

앞으로의 성장 가능성은 매우 밝습니다. 이미 사람의 마음을 얻는 방법을 알고 있기 때문입니다. 여기에 약간의 기준과 방향만 더 단단해지면, 고객은 편안함과 신뢰를 동시에 느끼게 됩니다. 그러면 만남은 늘어나고, 관계는 깊어지며, 성과는 뒤따라옵니다.

결국 이 모습은 사람을 웃게 하고 마음을 쉬게 해 주는 전문가입니다. 그래서 고객의 기억 속에 오래 남고, 시간이 갈수록 더 빛나는 길을 걷게 됩니다.`,FC_A:`OOO님은 사람을 처음 만나는 자리에서도 분위기가 딱딱해지지 않습니다. 밝고 편안한 에너지로 고객의 마음을 풀어 주면서도, 중요한 순간에는 차분하고 이성적으로 핵심을 정리해 줍니다. 그래서 고객은 상담을 받으며 이렇게 느끼게 됩니다. “재미있게 이야기하는데 내용은 정확하다.” 웃음과 신뢰가 동시에 생기는 아주 드문 힘입니다.

대화는 어렵지 않고, 설명은 복잡하지 않습니다. 이해하기 쉬운 말로 풀어 주기 때문에 고객은 부담 없이 질문하고, 스스로 판단할 수 있는 힘을 얻습니다. 억지로 밀어붙인 느낌이 아니라, 충분히 납득해서 선택했다는 만족이 남습니다. 이 경험은 계약 이후에도 좋은 기억으로 이어지고, 다시 찾고 싶은 사람으로 자리 잡게 만듭니다.

OOO님은 시간이 갈수록 더 강해집니다. 경험이 쌓일수록 설명은 더 단단해지고, 분위기를 만드는 능력은 더 자연스러워집니다. 결국 고객은 즐거움 때문에 만나고, 신뢰 때문에 맡기게 됩니다. 관계가 쌓이고 소개가 늘어나는 구조가 만들어집니다.

앞으로의 모습은 분명합니다. 사람을 편하게 해 주면서도 결과까지 만들어 내는 전문가. 그래서 주변에서 오래 기억하고, 오래 함께하고 싶은 사람이 됩니다.`,FC_AC:`OOO님은 사람을 만나면 먼저 분위기가 따뜻해집니다. 밝은 표정과 부드러운 태도 덕분에 고객은 긴장하지 않고 마음을 열게 됩니다. 이야기를 나누다 보면 자연스럽게 “이 사람은 내 말을 잘 들어주는구나”라는 느낌을 받습니다. 편안함과 배려가 동시에 전달되기 때문입니다.

상담 시간은 무겁지 않습니다. 어렵고 딱딱한 설명보다는 이해하기 쉬운 말로 천천히 맞춰 주기 때문에 고객이 부담을 느끼지 않습니다. 고객의 속도에 맞추고, 고객의 표정을 살피고, 혹시라도 불편하지 않을까 한 번 더 생각해 줍니다. 그래서 상담을 받고 나면 기분이 좋아지고, 다시 만나고 싶다는 생각이 남습니다.

이 힘은 시간이 지날수록 더 큰 자산이 됩니다. 왜냐하면 보험은 결국 사람이 사람을 통해 선택하는 일이기 때문입니다. 함께 있으면 마음이 편해지는 사람, 내 입장에서 생각해 주는 사람에게 고객은 중요한 결정을 맡기게 됩니다. 소개가 이어지고, 관계가 길어지고, 신뢰가 깊어집니다.

앞으로의 가능성은 충분합니다. 이미 사람의 마음을 얻는 재능을 가지고 있기 때문입니다. 여기에 경험이 더해지고 자신감이 붙으면, 고객에게 오래 기억되는 전문가로 성장하게 됩니다. 편안함으로 다가가 신뢰로 남는 사람, 바로 그런 길을 걷게 될 것입니다.`,AC_CP:`OOO님은 고객을 만나면 먼저 예의를 갖추고 상대의 상황을 세심하게 살핍니다. 말 한마디를 꺼내기 전에도 혹시 불편하지 않을지 생각하기 때문에, 고객은 자연스럽게 존중받는 느낌을 받습니다. 그러면서도 기준이 분명해 중요한 내용에서는 흐트러지지 않습니다. 필요한 부분은 또렷하게 설명하고, 선택의 순간에는 책임 있는 방향을 제시합니다.

그래서 고객은 이런 마음을 갖게 됩니다.
“나를 배려하지만, 아무 말이나 하는 사람은 아니구나.”
이 신뢰가 상담의 깊이를 만듭니다.

부드럽게 다가가되 원칙을 지키는 태도는 보험 일을 오래 할수록 더 큰 힘이 됩니다. 시간이 지날수록 고객은 중요한 결정을 맡길 수 있는 사람으로 기억하게 되고, 한 번의 만남이 관계로 이어집니다. 소개가 생기고, 다시 찾는 고객이 늘어납니다.

앞으로의 성장 가능성도 매우 큽니다. 이미 상대를 존중하는 마음과, 일을 바로 세우는 기준을 함께 가지고 있기 때문입니다. 여기에 경험과 확신이 더해지면, 고객에게 편안함을 주면서도 믿고 따를 수 있는 전문가로 자리 잡게 됩니다. 결국 오래 사랑받는 컨설턴트의 길을 걷게 될 것입니다.`,AC_NP:`고객을 만나는 순간부터 OOO님은 상대의 표정과 분위기를 빠르게 읽고, 마음이 어디에 있는지 먼저 느끼는 힘이 큽니다. 부담을 주기보다 편안하게 다가가고, 상대가 말을 꺼내기 쉽게 기다려 줄 줄 압니다. 그래서 고객은 “이 사람은 나를 이해하려고 한다”는 안도감을 느낍니다.

따뜻함이 기본이기 때문에 대화에는 방어가 생기지 않습니다. 고객이 걱정을 털어놓고, 가족 이야기를 하고, 자신의 상황을 솔직하게 말하게 됩니다. 상담의 출발점이 신뢰이기 때문에 관계가 깊어질 가능성이 매우 큽니다.

또한 상대를 존중하는 태도가 있어 무리하게 밀어붙이지 않습니다. 대신 상대에게 맞는 속도를 찾습니다. 그 결과 고객은 강요받는 느낌 없이 스스로 결정했다고 느끼게 됩니다. 이런 경험은 시간이 지나 소개와 재상담으로 이어집니다.

앞으로의 성장 가능성은 더욱 큽니다. 이미 사람의 마음을 얻는 재능을 가지고 있기 때문입니다. 여기에 의식적인 자신감과 한 문장의 방향 제시가 더해지면, 고객에게 가장 편안하면서도 믿을 수 있는 전문가로 자리 잡게 됩니다. 오래 함께하고 싶은 컨설턴트, 가족에게 소개하고 싶은 사람이 되는 길 위에 서 있습니다.`,AC_A:`OOO님이 고객을 만났을 때 가장 먼저 드러나는 힘은 상대를 존중하는 태도와 차분한 판단력입니다. 말을 하기 전에 분위기를 읽고, 고객이 어떤 마음 상태인지 먼저 살핍니다. 그래서 고객은 부담을 느끼지 않고 자연스럽게 이야기를 꺼내게 됩니다. “이 사람은 내 편이다”라는 안정감이 생기기 때문입니다.

동시에 감정에 휩쓸리기보다는 상황을 객관적으로 정리하는 능력이 좋습니다. 필요한 정보, 우선순위, 선택 기준을 차근차근 정리해 주기 때문에 고객 입장에서는 복잡했던 문제가 단순해집니다. 어렵던 보험이 이해되기 시작하고, 결정이 편안해집니다.

무리하게 끌고 가지 않으면서도 핵심을 놓치지 않는 균형감이 바로 큰 경쟁력입니다. 고객은 강한 압박보다 신뢰할 수 있는 안내자를 원합니다. 그리고 이미 그런 이미지를 가지고 있습니다.

앞으로 여기에 조금만 더 확신 있는 제안이 더해진다면, 고객은 이렇게 느낄 가능성이 큽니다.
“나를 생각해 주면서도, 가장 좋은 길을 정확히 알려주는 사람.”

이 힘은 시간이 지날수록 더 크게 빛납니다. 관계는 깊어지고, 소개는 늘어나고, 상담은 점점 안정적으로 쌓입니다. 이미 신뢰를 얻는 방법을 알고 있기 때문에 성장의 속도는 앞으로 더 빨라질 준비가 되어 있습니다.`,AC_FC:`OOO님은 고객을 만났을 때 부드럽고 편안하게 대합니다. 상대의 말에 귀를 기울이고, 눈을 맞추고, 고개를 끄덕이며 “당신 이야기를 정말 듣고 있어요”라는 신호를 자연스럽게 보냅니다. 그래서 처음 만나는 사람도 경계를 풀고 마음을 열게 됩니다.

여기에 더해 밝고 따뜻한 에너지가 있습니다. 딱딱하거나 무거운 상담이 아니라, 사람 냄새 나는 대화가 됩니다. 웃음이 생기고, 공감이 생기고, 고객은 어느 순간 이렇게 느끼게 됩니다.
“이 사람과는 더 이야기해도 괜찮겠다.”

보험은 결국 신뢰로 결정됩니다. 조건 이전에 사람을 보고 선택합니다. 이미 고객에게 좋은 사람으로 기억될 가능성이 매우 높습니다. 이것은 기술로 만들기 어려운 아주 큰 재능입니다.

앞으로 경험이 쌓이고 제안의 힘이 조금 더 단단해지면, 편안함 위에 전문성까지 더해집니다. 그러면 고객은 단순히 좋은 사람이 아니라 믿고 맡길 수 있는 사람으로 보게 됩니다. 관계는 오래가고, 다시 찾게 되고, 소개로 이어질 가능성도 커집니다.

지금 가지고 있는 따뜻함과 친근함은 이미 큰 자산입니다. 여기에 작은 확신과 방향 제시만 더해진다면, 성장의 문은 훨씬 더 크게 열릴 준비가 되어 있습니다.`},cm4_1:{"17-20":{CP:`기준이 매우 분명하고 주도적이며 강하게 추진합니다.`,NP:`공감이 뛰어나고 따뜻하며 사람을 잘 챙깁니다.`,A:`객관적이고 명확하며 이성적으로 판단합니다.`,FC:`밝고 활발하며 표현력이 매우 풍부합니다.`,AC:`눈치가 빠르고 민감하며 잘 맞춰줍니다.`},"14-16":{CP:`책임감이 강하고 결단력 있으며 방향을 제시합니다`,NP:`배려심이 깊고 친절하며 신뢰를 줍니다.`,A:`현실적이고 균형감 있으며 판단이 안정적입니다.`,FC:`친근하고 자연스러우며 분위기를 잘 만듭니다.`,AC:`협조적이고 유연하며 적응력이 좋습니다.`},"11-13":{CP:`유연하게 판단하고 균형감 있으며 조율합니다.`,NP:`공감이 가능하고 무난하며 편안함을 줍니다.`,A:`무난하고 실용적이며 상황에 맞춰 판단합니다.`,FC:`차분하고 안정적이며 편안함을 줍니다.`,AC:`균형감이 있고 무난하며 조화를 이룹니다.`},"8-10":{CP:`배려가 많고 신중하며 결정을 고민합니다`,NP:`공감은 가능하지만 표현은 다소 적은 편입니다.`,A:`상황을 이해하며 다소 감정적으로 판단할 수 있습니다.`,FC:`신중하고 진지하며 표현이 절제됩니다.`,AC:`독립적이고 솔직하며 자기기준이 있습니다.`},"0-7":{CP:`조심성이 많고 겸손하며 의견을 아낍니다.`,NP:`솔직하고 직설적이며 공감표현이 약합니다.`,A:`직관과 경험을 중시하며 감정적인 판단을 하는 편입니다.`,FC:`과묵하고 조용하며 감정표현이 적습니다.`,AC:`주관이 강하고 자기 기준이 또렷합니다`}},cm4_2:{"17-20":{CP:`조율이 필요없는 구간`,NP:``,A:``,FC:``,AC:`고객의 표정과 반응을 세심하게 살피는 강점이 있습니다. 다만 고객이 부담을 느낄까 봐 필요한 설명이나 권유를 충분히 하지 못하는 경우가 생길 수 있습니다. 고객의 속도를 존중하는 것은 좋지만, 전문가로서의 의견도 함께 전달해야 합니다. 공감한 뒤에는 "고객님 상황이라면 저는 이 방법을 추천드립니다.", "현재는 이 선택이 가장 적합합니다."와 같이 방향을 분명하게 제시하는 연습이 필요합니다. 배려와 전문적인 권유가 함께할 때 상담의 신뢰도와 설득력이 더욱 높아집니다.`},"14-16":{CP:``,NP:``,A:``,FC:``,AC:``},"11-13":{CP:``,NP:``,A:``,FC:``,AC:``},"8-10":{CP:`신중하고 부드러운 태도로 고객을 편안하게 만듭니다. 고객 입장을 존중하는 분위기 덕분에 부담 없이 이야기를 이어갈 수 있습니다. 다만 기준 제시와 결단 표현이 약하면 전문가로서 방향을 잡아주는 힘이 부족해 보일 수 있으니, 필요한 순간에는 “이 선택이 더 유리합니다”처럼 결론을 분명히 말해 신뢰를 강화해 주세요.`,NP:`배려와 공감의 표현이 다소 적어 고객에게 차갑거나 거리감 있게 느껴질 수 있는 성향입니다. 상담에서는 설명과 정보 전달은 정확하지만, 고객의 마음을 먼저 공감해주는 표현을 조금 더 늘려주는 연습이 필요합니다. “걱정되실 수 있습니다”, “충분히 고민되실 수 있습니다”처럼 고객 입장을 먼저 이해해주면 상담의 편안함과 신뢰감, 계약 연결력이 더욱 안정적으로 올라갈 수 있습니다.`,A:`고객의 감정과 분위기에 영향을 받아 설명과 판단이 조금은 흔들려 보일 수 있는 성향입니다. 고객 공감은 잘하지만 상담의 방향과 결론이 흐려지지 않도록 핵심과 우선순위를 먼저 정리해 전달하는 연습이 필요합니다. “현재 상황에서는 이 선택이 가장 안정적입니다”처럼 이유와 결론을 분명하게 설명하면 고객의 신뢰감과 결정력이 더욱 안정적으로 올라갈 수 있습니다.`,FC:`차분하면서도 부드러운 태도로 고객을 편안하게 만드는 장점이 있습니다. 과하지 않은 반응 덕분에 상담이 안정적으로 흘러가며 부담을 주지 않습니다. 다만 감정 표현이 적으면 거리감이 생길 수 있으니, 고개 끄덕임이나 “충분히 그럴 수 있습니다” 같은 공감 표현을 의식적으로 늘리면 신뢰 형성이 더 빨라집니다.`,AC:``},"0-7":{CP:``,NP:``,A:``,FC:``,AC:`조율이 필요함 - 신설`}},cm4_3:{all_no_coaching:`OOO님은 모든 점수가 '조율이 필요 없는 구간'에 있습니다. 
다섯 가지 에고성향이 모두 조율이 필요 없는 구간에 있다는 것은 자아의 에너지를 상황에 맞게 자연스럽게 꺼내 쓸 수 있는 안정된 단계에 와 있습니다. 필요할 때는 기준을 세워 방향을 잡고, 또 필요할 때는 고객의 마음을 살피며, 판단해야 할 순간에는 균형 있게 결정을 내릴 줄 압니다. 그래서 상담이 무리 없이 이어지고, 고객은 편안함 속에서 신뢰를 느끼게 됩니다.

이 일은 분명 OOO님에게 잘 맞는 분야입니다. 억지로 애쓰는 느낌이 아니라, 본래 가지고 있는 기질과 업무 방식이 서로 맞물리며 힘을 내고 있기 때문입니다. 이미 충분한 준비가 되어 있고, 앞으로 더 발전할 수 있는 잠재력도 크게 보입니다.
뿐만 아니라 이런 균형감은 고객에게만 좋은 것이 아닙니다. 함께 일하는 동료들에게도 안정감을 주고, 조직 안에서 믿고 의지할 수 있는 사람이라는 평가로 이어집니다. 말보다 태도가 기준이 되고, 행동이 곧 신뢰가 됩니다.

이제 중요한 것은 새로운 무언가를 더하기보다, 지금의 좋은 흐름을 꾸준히 유지하고 반복해 누구 앞에서도 같은 실력을 보여주는 것입니다. 그 지속성이 성향의 컨섵턴트를 더 높은 자리로 이끌 것입니다.
지금처럼 계속 가시면 됩니다. 충분히 잘하고 계십니다.

⚠️ 만약 다섯 가지 성향 중 17점 이상인 항목이 있다면, 해당 성향의 에너지가 강하게 발휘되는 상태입니다. 이는 큰 강점이 될 수 있지만, 상황에 따라 상대방이 다소 과하게 느낄 수도 있습니다. 이 부분만 의식적으로 조율하면 더욱 균형 잡힌 관계와 성과에 도움이 됩니다.
    또한 가장 낮은 성향은 성과와 인간관계에서 반복적으로 나타나는 아쉬움의 원인이 될 수 있습니다. 가장 낮은 성향을 잘 이해하고 의식적으로 활용하려는 노력이 더해지면 강점은 더욱 빛을 발하게 됩니다.`,some_coaching:``},cm4_4:{CP:{condition:`0-7`,trait:`조심성이 많고 겸손하며 의견을 아낍니다.`,coaching:`이 성향은 사람을 존중하고 고객이 편안하게 이야기할 수 있는 분위기를 만드는 장점이 있습니다. 
다만 고객의 의견을 존중하는 마음이 큰 만큼 가입 권유나 결정을 도와야 하는 순간에도 조심스럽게 접근하는 경우가 있습니다. 컨설턴트는 고객의 이야기를 잘 듣는 것도 중요하지만 방향을 제시하는 역할도 필요합니다. "고객님 상황이라면 저는 이 방법을 추천드립니다.", "지금 준비하시는 것이 가장 유리할 수 있습니다." 와 같이 자신의 의견을 조금 더 분명하게 전달하면 상담의 신뢰도가 높아질 수 있습니다.`,script:``},NP:{condition:`0-7`,trait:`솔직하고 직설적이며 공감표현이 약합니다.`,coaching:`이 성향은 감정에 흔들리지 않고 핵심을 빠르게 파악하여 현실적으로 상담하는 장점이 있습니다. 
다만 바쁠수록 고객의 감정보다 문제 해결과 정보 전달에 집중하는 경우가 있습니다. 고객은 상품보다 자신의 이야기를 이해받고 싶어 하는 경우가 많습니다. "그동안 많이 걱정되셨겠네요.", "충분히 그렇게 생각하실 수 있습니다." 와 같은 공감의 말을 먼저 건네면 고객의 마음이 열리고 상담도 훨씬 부드럽게 진행될 수 있습니다.`,script:``},A:{condition:`0-7`,trait:`직관과 경험을 중시하며 감정적인 판단을 하는 편입니다.`,coaching:`이 성향은 풍부한 경험과 직관을 활용하여 빠르게 상담을 진행하는 장점이 있습니다. 
다만 바쁠수록 현재 고객의 상황보다 자신의 경험을 기준으로 설명하는 경우가 있습니다. 상담할 때는 느낌보다 사실과 근거를 중심으로 설명하는 습관이 필요합니다. "현재 고객님 상황에서는 이 부분이 가장 중요합니다.", "이렇게 말씀드리는 이유는 실제 데이터와 사례를 기준으로 판단했기 때문입니다." 와 같이 설명하면 고객의 신뢰와 설득력이 더욱 높아질 수 있습니다.`,script:``},FC:{condition:`0-7`,trait:`과묵하고 조용하며 감정표현이 적습니다.`,coaching:`이 성향은 진중하고 신뢰감 있는 태도로 고객에게 안정감을 주는 장점이 있습니다. 
다만 바쁠수록 표정과 반응이 줄어들어 고객이 다소 딱딱하게 느끼는 경우가 있습니다. 좋은 상담도 분위기가 무거우면 고객이 부담을 느낄 수 있습니다. 의식적으로 미소를 띄고 고개를 끄덕이며 "좋은 질문입니다.", "정확한 말씀이십니다.", "핵심적인 내용을 말씀하셨네요." 와 같은 표현을 사용하면 고객이 더욱 밝은 분위기에서 편안함을 느낄 수 있습니다.`,script:``},AC:{condition:`0-7`,trait:`주관이 강하고 자기 기준이 또렷합니다`,coaching:`이 성향은 주관과 결단력이 뚜렷하며 고객에게 확신 있게 설명하는 장점이 있습니다. 
다만 자신의 판단이 분명한 만큼 고객이 이해하고 결정하는 속도까지 충분히 살피지 못하는 경우가 있습니다. 상담은 설명도 중요하지만 고객이 받아들이는 과정도 중요합니다. "한 번에 결정하시기보다 충분히 이해하시고 판단하시면 됩니다.", "고객님 상황에 맞춰 천천히 설명드리겠습니다." 와 같이 고객의 속도에 맞춰 설명하면 신뢰와 계약 성사 가능성을 함께 높일 수 있습니다.`,script:``}},cm4_5:`OOO님께서 현재 조율 포인트를 이미 인식하고 계시고, 평소 의식적으로 말과 행동에 반영하고 계신다면 강점이 더욱 안정적으로 발휘되어 지금도 좋은 성과를 내고 계실 가능성이 높습니다.

⚠️ 만약 다섯 가지 성향 중 17점 이상인 항목이 있다면, 해당 성향의 에너지가 강하게 발휘되는 상태입니다. 이는 큰 강점이 될 수 있지만, 상황에 따라 상대방이 다소 과하게 느낄 수도 있습니다. 이 부분만 의식적으로 조율하면 더욱 균형 잡힌 관계와 성과에 도움이 됩니다.
    또한 가장 낮은 성향은 성과와 인간관계에서 반복적으로 나타나는 아쉬움의 원인이 될 수 있습니다. 가장 낮은 성향을 잘 이해하고 의식적으로 활용하려는 노력이 더해지면 강점은 더욱 빛을 발하게 됩니다.`,cm5:{CP_NP_A:{manner:`고객에게 도움이 되는 길을 분명히 알려주려는 책임감이 강하게 드러납니다. 옳다고 생각하는 방향을 흔들림 없이 제시하고, 동시에 따뜻하게 챙기려는 마음이 함께 느껴집니다. 그래서 고객은 보호받는 느낌과 믿고 맡겨도 되겠다는 안정감을 받습니다. 다만 내용을 구조적으로 정리하거나 왜 이 선택이 필요한지 논리적으로 힘 있게 설명하는 부분에서는 다소 약하게 보일 수 있습니다.`,improvement:`이미 좋은 의도로 권하고 있다는 점은 큰 강점입니다. 여기에 논리적인 정리와 명확한 기준을 더하는 태도가 붙으면 신뢰도가 급격히 올라갑니다. 친절함 위에 구조를 세운다는 마음으로 한 번 더 정리해서 말하는 습관을 가져보면 좋겠습니다.

✔ 화법 ①
“지금 상황에서 가장 중요한 핵심내용은 세 가지입니다.”

✔ 화법 ②
“현재 상황을 기준으로 다시 한번 정리해보겠습니다.”`},CP_NP_FC:{manner:`고객에게 무엇이 필요한지 분명하게 정리해 주고, 준비해야 할 방향을 단단하게 잡아 줍니다. 설명에는 확신이 있고 태도에는 책임감이 묻어나기 때문에 고객은 믿고 맡겨도 되겠다는 안정감을 느낍니다. 동시에 챙겨 주려는 마음이 자연스럽게 전달되어 관계도 쉽게 무너지지 않습니다. 다만 웃음이나 가벼운 공감 표현이 적으면 다소 긴장된 분위기가 만들어질 수 있습니다.`,improvement:`이미 기준과 배려는 충분합니다. 이제 고객이 느끼는 온도를 올리는 것이 중요합니다. 의식적으로 미소를 띄고 고개를 끄덕이며 감정을 전달한다는 마음을 가지면 신뢰가 훨씬 깊어집니다.
✔ 화법 ①
“아, 충분히 그렇게 느끼실 수 있습니다.” (미소 + 고개 끄덕임) “그래서 더 쉽게 정리해 드리겠습니다.”

✔ 화법 ②
“좋은 질문 주셨습니다.” (미소 + 고개 끄덕임) “그 부분이 핵심적인 내용입니다. 잘 설명해 드리겠습니다.”

차분함에 온기가 더해질 때 선택은 자연스럽게 이어집니다.`},CP_NP_AC:{manner:`고객에게 필요한 준비와 방향을 분명하게 제시합니다. 말에는 확신이 있고 태도에는 책임감이 담겨 있어 고객은 든든함과 신뢰를 느낍니다. 동시에 진심으로 도와주려는 마음이 보여 관계도 쉽게 깊어집니다. 다만 설명이 또렷한 만큼 속도가 빠르거나 결론 중심으로 들리면, 고객이 따라가기에 약간 버겁게 느낄 수 있습니다.`,improvement:`이미 기준과 배려는 충분합니다. 여기에 고객의 리듬을 존중한다는 마음가짐을 더하면 체감 신뢰가 훨씬 높아집니다. 말하기 전에 한 템포 멈추고 확인하는 태도가 필요합니다.

✔ 화법 ①
“고객님 생각을 먼저 듣고 진행하겠습니다.”

✔ 화법 ②
“설명을 들으시고 어떤 느낌이 드셨나요?”`},CP_A_NP:{manner:`설명은 명확하고 판단은 빠릅니다. 왜 필요한지, 무엇이 유리한지 논리적으로 정리해 주기 때문에 고객은 전문성을 느끼고 믿을 만하다고 생각합니다. 준비된 자료와 근거로 이야기하므로 흔들림도 적습니다. 다만 내용이 정확한 만큼 감정적인 공감 표현이 적게 느껴지면, 고객의 입장에서는 이해는 되지만 마음이 충분히 따뜻해졌다고 느끼지 못할 수 있습니다.`,improvement:`이미 방향 제시와 분석은 훌륭합니다. 여기에 고객의 마음을 언어로 확인해 주는 태도를 더하면 신뢰가 훨씬 단단해집니다. 이해했다는 생각을 마음속에 두지 말고 반드시 말로 전달하는 연습이 필요합니다.

✔ 화법 ①
"고객님 말씀 충분히 이해됩니다. 저라도 같은 고민을 했을 것 같습니다."

✔ 화법 ②
"고객님 입장에서 생각해보면 충분히 그렇게 느끼실 수 있습니다."`},CP_A_FC:{manner:`판단이 분명하고 설명이 체계적입니다. 무엇이 필요하고 왜 준비해야 하는지를 명확하게 전달하기 때문에 고객은 전문성과 신뢰를 느낍니다. 이야기 흐름이 논리적이라 흔들림이 없고, 결정을 도와주는 힘도 있습니다. 다만 표정이나 분위기가 다소 진지하게 유지되면 고객이 편안하게 마음을 열기까지 시간이 조금 더 걸릴 수 있습니다.`,improvement:`이미 방향 제시 능력은 충분합니다. 이제 고객이 느끼는 온도를 올리는 것이 중요합니다. 의식적으로 미소를 띄고 고개를 끄덕이며 감정을 전달한다는 마음을 가지면 신뢰가 훨씬 깊어집니다.


✔ 화법 ①
“아, 충분히 그렇게 느끼실 수 있습니다.” (미소 + 고개 끄덕임) “그래서 더 쉽게 정리해 드리겠습니다.”

✔ 화법 ②
“좋은 질문 주셨습니다.” (미소 + 고개 끄덕임) “그 부분이 핵심적인 내용입니다. 잘 설명해 드리겠습니다.”

차분함에 온기가 더해질 때 선택은 자연스럽게 이어집니다.`},CP_A_AC:{manner:`무엇이 맞고 필요한지 분명하게 제시합니다. 설명은 논리적이고 판단에는 흔들림이 없어서 고객은 전문가를 만났다는 안정감을 느낍니다. 준비해야 할 이유, 하지 않았을 때의 위험, 선택의 기준을 명확히 알려주기 때문에 결정 단계로 끌고 가는 힘이 있습니다. 다만 속도와 방향 제시는 좋지만, 고객의 감정 속도를 충분히 기다려 주는 표현은 조금 줄어들 수 있습니다.`,improvement:`이미 방향을 잡는 능력은 뛰어납니다. 여기에 고객의 리듬을 존중한다는 마음가짐을 더하면 체감 신뢰가 훨씬 높아집니다. 말하기 전에 한 템포 멈추고 확인하는 태도가 필요합니다.

✔ 화법 ①
“고객님 생각을 먼저 듣고 진행하겠습니다.”

✔ 화법 ②
“설명을 들으시고 어떤 느낌이 드셨나요?”`},CP_FC_NP:{manner:`판단이 빠르고 자신감이 있습니다. 필요한 보장을 명확히 구분해 주고, 지금 왜 준비해야 하는지 힘 있게 전달합니다. 분위기를 이끌 줄 알고 활력이 있어 고객은 상담이 지루하지 않습니다. 밀어주는 에너지가 좋아 결정 단계까지 끌고 가는 힘도 있습니다. 다만 설명이 앞서다 보니 고객의 속마음이나 감정을 세밀하게 살피는 표현은 조금 부족해 보일 수 있습니다.`,improvement:`이미 추진력은 충분합니다. 여기에 고객의 마음을 언어로 확인해 주는 태도를 더하면 신뢰가 훨씬 단단해집니다. 이해했다는 생각을 마음속에 두지 말고 반드시 말로 전달하는 연습이 필요합니다.

✔ 화법 ①
"고객님 말씀 충분히 이해됩니다. 저라도 같은 고민을 했을 것 같습니다."

✔ 화법 ②
"고객님 입장에서 생각해보면 충분히 그렇게 느끼실 수 있습니다."`},CP_FC_A:{manner:`확신 있게 말하고 힘 있게 방향을 제시합니다. 무엇이 필요하고 왜 준비해야 하는지 분명하게 짚어 주며, 현장의 분위기도 활기차게 만듭니다. 자신감과 에너지가 좋아 고객이 끌려오게 만드는 추진력이 있습니다. 상담이 늘어지지 않고 속도감 있게 진행되는 장점도 큽니다. 다만 내용을 구조적으로 정리하거나 왜 이 선택이 필요한지 논리적으로 힘 있게 설명하는 부분에서는 다소 약하게 보일 수 있습니다.`,improvement:`이미 설득력과 추진력은 충분합니다. 여기에 논리적인 정리와 명확한 기준을 더하는 태도가 붙으면 신뢰도가 급격히 올라갑니다. 친절함 위에 구조를 세운다는 마음으로 한 번 더 정리해서 말하는 습관을 가져보면 좋겠습니다.

✔ 화법 ①
“지금 상황에서 가장 중요한 핵심내용은 세 가지입니다.”

✔ 화법 ②
“현재 상황을 기준으로 다시 한번 정리해보겠습니다.”`},CP_FC_AC:{manner:`자신감이 분명하고 주도적으로 상담을 끌고 갑니다. 필요한 보장을 단호하게 정리해 주며, 밝은 에너지로 분위기를 열어 고객을 집중하게 만듭니다. 리드하는 힘이 좋아 상담의 흐름이 흔들리지 않고 결정 단계까지 빠르게 이동하는 추진력이 있습니다. 다만 방향을 강하게 잡는 만큼 고객의 표정과 속도를 세밀하게 살피는 부분은 순간적으로 놓칠 수 있습니다.`,improvement:`이미 추진력과 현장 장악력은 충분합니다. 여기에 고객의 리듬을 존중한다는 마음가짐을 더하면 체감 신뢰가 훨씬 높아집니다. 말하기 전에 한 템포 멈추고 확인하는 태도가 필요합니다.

✔ 화법 ①
“고객님 생각을 먼저 듣고 진행하겠습니다.”

✔ 화법 ②
“설명을 들으시고 어떤 느낌이 드셨나요?”`},CP_AC_NP:{manner:`상담의 중심을 단단히 잡고 명확한 기준을 제시합니다. 해야 할 것과 위험한 부분을 분명하게 설명하며 고객이 판단을 미루지 않도록 방향을 잡아 줍니다. 또한 상대의 반응을 보며 흐름을 읽는 감각도 있어 필요하면 속도를 조절하기도 합니다. 다만 해결 중심으로 빠르게 가다 보니 감정을 충분히 공감하고 따뜻하게 표현하는 부분은 지나갈 수 있습니다.`,improvement:`이미 판단력과 리드 능력은 충분히 좋습니다. 여기에 고객의 마음을 언어로 확인해 주는 태도를 더하면 신뢰가 훨씬 단단해집니다. 이해했다는 생각을 마음속에 두지 말고 반드시 말로 전달하는 연습이 필요합니다.

✔ 화법 ①
"고객님 말씀 충분히 이해됩니다. 저라도 같은 고민을 했을 것 같습니다."

✔ 화법 ②
"고객님 입장에서 생각해보면 충분히 그렇게 느끼실 수 있습니다."`},CP_AC_A:{manner:`분명한 기준을 가지고 또렷하게 이야기하며 무엇이 필요한지 명확히 짚어 줍니다. 동시에 고객의 표정과 분위기를 빠르게 읽어 강약을 조절하는 능력도 좋습니다. 그래서 상담의 흐름을 끌고 가는 힘이 있습니다. 다만 내용을 구조적으로 정리하거나 왜 이 선택이 필요한지 논리적으로 힘 있게 설명하는 부분에서는 다소 약하게 보일 수 있습니다.`,improvement:`리드하는 능력은 이미 훌륭합니다. 여기에 논리적인 정리와 명확한 기준을 더하는 태도가 붙으면 신뢰도가 급격히 올라갑니다. 친절함 위에 구조를 세운다는 마음으로 한 번 더 정리해서 말하는 습관을 가져보면 좋겠습니다.

✔ 화법 ①
“지금 상황에서 가장 중요한 핵심내용은 세 가지입니다.”

✔ 화법 ②
“현재 상황을 기준으로 다시 한번 정리해보겠습니다.”`},CP_AC_FC:{manner:`상담의 방향을 또렷하게 잡고 무엇이 맞는지 분명하게 이야기합니다. 고객의 반응도 빠르게 읽기 때문에 타이밍을 놓치지 않고 핵심을 전달하는 능력이 있습니다. 다만 효율을 중시하다 보니 감정 표현이나 공감의 말이 짧아질 수 있고, 고객에게는 조금 단단하거나 차갑게 느껴질 가능성도 있습니다.`,improvement:`리드하는 힘은 이미 충분합니다. 이제 고객이 느끼는 온도를 올리는 것이 중요합니다. 의식적으로 미소를 띄고 고개를 끄덕이며 감정을 전달한다는 마음을 가지면 신뢰가 훨씬 깊어집니다.

✔ 화법 ①
“아, 충분히 그렇게 느끼실 수 있습니다.” (미소 + 고개 끄덕임) “그래서 더 쉽게 정리해 드리겠습니다.”

✔ 화법 ②
“좋은 질문 주셨습니다.” (미소 + 고개 끄덕임) “그 부분이 핵심적인 내용입니다. 잘 설명해 드리겠습니다.”

차분함에 온기가 더해질 때 선택은 자연스럽게 이어집니다.`},NP_CP_A:{manner:`고객의 이야기를 잘 들어주고 마음을 편안하게 만드는 힘이 뛰어납니다. 동시에 무엇이 필요한지도 분명하게 알려주기 때문에 보호받는 느낌을 줍니다. 다만 내용을 구조적으로 정리하거나 왜 이 선택이 필요한지 논리적으로 힘 있게 설명하는 부분에서는 다소 약하게 보일 수 있습니다.`,improvement:`따뜻함과 기준은 이미 훌륭합니다. 여기에 논리적인 정리와 명확한 기준을 더하는 태도가 붙으면 신뢰도가 급격히 올라갑니다. 친절함 위에 구조를 세운다는 마음으로 한 번 더 정리해서 말하는 습관을 가져보면 좋겠습니다.

✔ 화법 ①
“지금 상황에서 가장 중요한 핵심내용은 세 가지입니다.”

✔ 화법 ②
“현재 상황을 기준으로 다시 한번 정리해보겠습니다.”`},NP_CP_FC:{manner:`고객을 보호해야 할 사람처럼 여기며 책임 있게 안내하려는 마음이 먼저 드러납니다. 따뜻한 배려 속에서도 기준을 분명히 세워 주기 때문에 상담의 방향이 흔들리지 않습니다. 설명은 또렷하고 단정하며, 고객에게 도움이 되는 선택을 하게 해주려는 진심이 느껴집니다. 다만 분위기를 부드럽게 풀어 주는 표현이나 감정의 온도가 상대적으로 적어 보일 수 있어, 때로는 조금 딱딱하다는 인상을 줄 수도 있습니다. 신뢰는 빠르게 형성되지만, 편안함이 완전히 열리기까지 시간이 조금 필요할 수 있습니다.`,improvement:`마음속으로는 돕고 싶은 진심이 충분하기 때문에 이제는 그 진심이 표정과 분위기로도 전달되도록 조율하면 좋습니다. 의식적으로 미소를 띄고 고객의 말에 고개를 끄덕이는 작은 반응만 더해져도 전문성에 따뜻함이 더해집니다.
추천 화법은 다음과 같습니다.

✔ 화법 ①
“아, 충분히 그렇게 느끼실 수 있습니다.” (미소 + 고개 끄덕임) “그래서 더 쉽게 정리해 드리겠습니다.”

✔ 화법 ②
“좋은 질문 주셨습니다.” (미소 + 고개 끄덕임) “그 부분이 핵심적인 내용입니다. 잘 설명해 드리겠습니다.”

차분함에 온기가 더해질 때 선택은 자연스럽게 이어집니다.`},NP_CP_AC:{manner:`고객을 먼저 생각하고 보호하려는 마음이 자연스럽게 드러나며, 도움이 되는 방향으로 이끌고자 하는 책임감이 강하게 보입니다. 따뜻하게 공감하면서도 기준과 원칙을 분명히 잡아 주기 때문에 상담의 중심이 잘 서 있습니다. 고객입장에서는 믿고 맡길 수 있는 든든함을 느끼게 됩니다. 다만 상황에 따라 상대의 반응을 세심하게 살피는 움직임이 조금은 부족해 보일 수 있어, 때때로 단정적이라는 인상을 줄 수도 있습니다.`,improvement:`이미 고객을 위하는 진심과 기준은 충분히 갖추고 있습니다. 여기에 고객의 리듬을 존중한다는 마음가짐을 더하면 체감 신뢰가 훨씬 높아집니다. 말하기 전에 한 템포 멈추고 확인하는 태도가 필요합니다.

✔ 화법 ①
“고객님 생각을 먼저 듣고 진행하겠습니다.”

✔ 화법 ②
“설명을 들으시고 어떤 느낌이 드셨나요?”`},NP_A_CP:{manner:`고객을 배려하고 이해하려는 따뜻함이 상담 전반에 흐르며, 설명은 차분하고 논리적으로 정리되어 전달됩니다. 무리하게 몰아붙이기보다 충분히 납득하도록 돕는 방식이라 신뢰를 쌓기에 좋습니다. 고객은 편안함과 안정감을 느끼며 이야기를 듣게 됩니다. 다만 기준을 분명히 세워 방향을 제시하는 힘이 조금 약해 보여 결정 순간에 확신이 부족하다고 느낄 수 있습니다.`,improvement:`이미 공감과 논리는 훌륭합니다. 여기에 전문가로서의 기준을 분명히 전달하겠다는 마음가짐을 더하면 설득력이 훨씬 강해집니다. 배려 속에서도 방향을 잡아주는 태도가 필요합니다.

✔ 화법 ①
“고객님 상황을 충분히 고려했을 때 저는 이 선택이 가장 안전하다고 판단합니다.”

✔ 화법 ②
"제가 고객님이라면 이 상품을 선택할 것 같습니다. 현재 고객님 상황에 가장 잘 맞는 상품입니다."`},NP_A_FC:{manner:`고객의 입장을 먼저 이해하려는 마음이 크고, 설명은 차분하며 정리가 잘 되어 있습니다. 질문을 던지고 답을 들으며 맞춰가는 과정이 자연스러워 부담을 주지 않습니다. 그래서 고객은 존중받는다고 느끼고 신뢰도 빠르게 생깁니다. 다만 감정 표현이나 분위기를 부드럽게 만드는 따뜻한 표정과 반응이 적으면 다소 딱딱하거나 거리감 있게 보일 수 있습니다.`,improvement:`이미 배려와 논리는 충분합니다. 여기에 표정과 분위기를 여는 태도를 의식적으로 더하면 전달력이 훨씬 살아납니다. 상담 내내 가볍게 미소를 띄고, 고객의 말에 고개를 끄덕이며 공감의 신호를 주겠다는 마음가짐이 중요합니다.
추천 화법은 다음과 같습니다.

✔ 화법 ①
“아, 충분히 그렇게 느끼실 수 있습니다.” (미소 + 고개 끄덕임) “그래서 더 쉽게 정리해 드리겠습니다.”

✔ 화법 ②
“좋은 질문 주셨습니다.” (미소 + 고개 끄덕임) “그 부분이 핵심적인 내용입니다. 잘 설명해 드리겠습니다.”

차분함에 온기가 더해질 때 선택은 자연스럽게 이어집니다.`},NP_A_AC:{manner:`고객을 편안하게 배려하며 대화를 시작하고, 설명은 이성적이고 체계적으로 풀어 갑니다. 상대가 부담을 느끼지 않도록 속도를 맞추는 능력이 뛰어나 신뢰 형성이 빠릅니다. 다만 고객의 반응을 많이 살피다 보니 결정이 필요한 순간에도 한 걸음 물러서거나 표현이 완곡해져 확신이 약하게 전달될 수 있습니다.`,improvement:`배려와 논리는 이미 훌륭합니다. 여기에 고객의 리듬을 존중한다는 마음가짐을 더하면 체감 신뢰가 훨씬 높아집니다. 말하기 전에 한 템포 멈추고 확인하는 태도가 필요합니다.

✔ 화법 ①
“고객님 생각을 먼저 듣고 진행하겠습니다.”

✔ 화법 ②
“설명을 들으시고 어떤 느낌이 드셨나요?”`},NP_FC_CP:{manner:`고객을 따뜻하게 챙기고 분위기를 부드럽게 만드는 힘이 큽니다. 웃음과 공감이 자연스럽고, 어렵게 느껴질 수 있는 보험 이야기를 편안하게 풀어내기 때문에 고객이 마음을 열기 쉽습니다. 다만 기준을 또렷하게 세우는 표현은 상대적으로 약해 보여, 제안의 무게나 방향이 흐릿하게 전달될 때가 있습니다.`,improvement:`이미 충분히 친절하고 매력적입니다. 여기에 전문가로서의 기준을 분명히 전달하겠다는 마음가짐을 더하면 설득력이 훨씬 강해집니다. 배려 속에서도 방향을 잡아주는 태도가 필요합니다.

✔ 화법 ①
“고객님 상황을 충분히 고려했을 때 저는 이 선택이 가장 안전하다고 판단합니다.”

✔ 화법 ②
"제가 고객님이라면 이 상품을 선택할 것 같습니다. 현재 고객님 상황에 가장 잘 맞는 상품입니다."`},NP_FC_A:{manner:`고객을 편하게 해주는 힘이 아주 큽니다. 따뜻한 배려와 밝은 분위기로 긴장을 풀어 주기 때문에 상담 자리가 부드럽게 열립니다. 사람의 마음을 읽고 공감하는 능력이 좋아 고객이 이야기를 많이 하게 됩니다. 다만 내용을 구조적으로 정리하거나 왜 이 선택이 필요한지 논리적으로 힘 있게 설명하는 부분에서는 다소 약하게 보일 수 있습니다.`,improvement:`이미 관계를 만드는 능력은 충분합니다. 여기에 논리적인 정리와 명확한 기준을 더하는 태도가 붙으면 신뢰도가 급격히 올라갑니다. 친절함 위에 구조를 세운다는 마음으로 한 번 더 정리해서 말하는 습관을 가져보면 좋겠습니다.

✔ 화법 ①
“지금 상황에서 가장 중요한 핵심내용은 세 가지입니다.”

✔ 화법 ②
“현재 상황을 기준으로 다시 한번 정리해보겠습니다.”`},NP_FC_AC:{manner:`따뜻하고 밝습니다. 고객의 긴장을 풀어 주는 힘이 크고, 먼저 웃으며 다가가 분위기를 부드럽게 만듭니다. 설명할 때도 상대 기분을 살피며 친절하게 말하기 때문에 호감도가 빠르게 올라갑니다. 다만 눈치를 덜 보는 편이라 필요하다고 느끼면 비교적 단호하고 직설적으로 들릴 수 있어, 고객이 준비되지 않았을 때는 조금 갑작스럽게 느낄 가능성도 있습니다.`,improvement:`충분한 친근함과 배려와 함께, 고객의 리듬을 존중한다는 마음가짐을 더하면 체감 신뢰가 훨씬 높아집니다. 말하기 전에 한 템포 멈추고 확인하는 태도가 필요합니다.

✔ 화법 ①
“고객님 생각을 먼저 듣고 진행하겠습니다.”

✔ 화법 ②
“설명을 들으시고 어떤 느낌이 드셨나요?”`},NP_AC_CP:{manner:`고객을 편안하게 배려하며 맞추는 능력이 뛰어납니다. 상대가 부담을 느끼지 않도록 부드럽게 설명하고, 고객의 표정과 분위기를 세심하게 읽으며 조심스럽게 접근합니다. 그래서 처음 만나는 자리에서도 거부감이 적고 관계 형성은 매우 좋습니다. 다만 기준을 세우고 방향을 딱 정해 주는 힘은 조금 약해 보여 제안이 흐릿해질 때가 있습니다.`,improvement:`이미 배려와 존중은 훌륭합니다. 여기에 전문가로서의 기준을 분명히 전달하겠다는 마음가짐을 더하면 설득력이 훨씬 강해집니다. 배려 속에서도 방향을 잡아주는 태도가 필요합니다.

✔ 화법 ①
“고객님 상황을 충분히 고려했을 때 저는 이 선택이 가장 안전하다고 판단합니다.”

✔ 화법 ②
"제가 고객님이라면 이 상품을 선택할 것 같습니다. 현재 고객님 상황에 가장 잘 맞는 상품입니다."`},NP_AC_A:{manner:`고객을 먼저 배려하고 맞춰 주는 힘이 큽니다. 말투가 부드럽고 공손해서 부담을 주지 않으며, 상대가 편안하게 이야기하도록 기다려 줍니다. 그래서 상담 분위기가 따뜻하게 흐르고 신뢰도 빠르게 형성됩니다. 다만 내용을 구조적으로 정리하거나 왜 이 선택이 필요한지 논리적으로 힘 있게 설명하는 부분에서는 다소 약하게 보일 수 있습니다.`,improvement:`고객에 대한 배려는 충분합니다. 여기에 논리적인 정리와 명확한 기준을 더하는 태도가 붙으면 신뢰도가 급격히 올라갑니다. 친절함 위에 구조를 세운다는 마음으로 한 번 더 정리해서 말하는 습관을 가져보면 좋겠습니다.

✔ 화법 ①
“지금 상황에서 가장 중요한 핵심내용은 세 가지입니다.”

✔ 화법 ②
“현재 상황을 기준으로 다시 한번 정리해보겠습니다.”`},NP_AC_FC:{manner:`고객의 마음을 먼저 살피고 맞추려는 배려가 강합니다. 상대의 이야기를 끊지 않고 들어 주며 조심스럽게 동의를 구하는 방식이라 편안함을 줍니다. 그래서 고객은 “나를 이해해 준다”는 느낌을 빨리 받습니다. 다만 분위기를 주도하거나 활기를 만들어 내는 힘이 약해 상담이 차분하기만 하고 에너지가 부족해 보일 수 있습니다.`,improvement:`마음속 기준을 “따뜻함에 활기를 더해 고객을 이끄는 사람”으로 잡아 보세요. 의식적으로 표정과 반응을 키우면 신뢰와 친밀감이 동시에 올라갑니다. 특히 미소를 띄고 고개를 끄덕이는 행동을 습관처럼 사용하면 좋습니다.


✔ 화법 ①
“아, 충분히 그렇게 느끼실 수 있습니다.” (미소 + 고개 끄덕임) “그래서 더 쉽게 정리해 드리겠습니다.”

✔ 화법 ②
“좋은 질문 주셨습니다.” (미소 + 고개 끄덕임) “그 부분이 핵심적인 내용입니다. 잘 설명해 드리겠습니다.”

부드러움에 생기가 더해질 때 설득력이 완성됩니다.`},A_CP_NP:{manner:`정보와 수치를 중심으로 정확하게 설명하며, 준비의 필요성과 원칙을 또렷하게 전달합니다. 흔들림 없이 방향을 제시하기 때문에 고객은 전문가를 만났다는 안정감을 느낍니다. 다만 공감 표현이 적어 보일 수 있어 고객의 마음을 충분히 어루만지기보다는 해결을 서두르는 인상으로 비칠 가능성도 있습니다.`,improvement:`이미 방향 제시와 분석은 훌륭합니다. 여기에 고객의 마음을 언어로 확인해 주는 태도를 더하면 신뢰가 훨씬 단단해집니다. 이해했다는 생각을 마음속에 두지 말고 반드시 말로 전달하는 연습이 필요합니다.

✔ 화법 ①
"고객님 말씀 충분히 이해됩니다. 저라도 같은 고민을 했을 것 같습니다."

✔ 화법 ②
"고객님 입장에서 생각해보면 충분히 그렇게 느끼실 수 있습니다."`},A_CP_FC:{manner:`사실과 근거를 중심으로 또렷하게 설명하고, 기준을 분명히 제시하는 힘이 있습니다. 고객에게 안정감과 전문성을 느끼게 하며 결정의 방향을 잡아주는 상담을 합니다. 대신 표정과 감정 표현이 절제되어 있어 때로는 차갑거나 딱딱하게 보일 수 있고, 고객님과의 정서적 거리가 조금 생길 수 있습니다.`,improvement:`마음속 기준을 “맞는 말에 따뜻함을 더하자”로 두세요. 의식적으로 미소를 띄고 고개를 끄덕이며 고객의 감정을 받아주는 태도를 보이면 신뢰가 깊어집니다.

✔ 화법 ①
“아, 충분히 그렇게 느끼실 수 있습니다.” (미소 + 고개 끄덕임) “그래서 더 쉽게 정리해 드리겠습니다.”

✔ 화법 ②
“좋은 질문 주셨습니다.” (미소 + 고개 끄덕임) “그 부분이 핵심적인 내용입니다. 잘 설명해 드리겠습니다.”


논리에 온기가 더해질 때 선택은 더 빨라집니다.`},A_CP_AC:{manner:`근거와 데이터를 토대로 논리적으로 설명하고, 필요한 준비를 명확하게 짚어 줍니다. 기준과 원칙이 분명해 고객은 체계적인 전문가를 만났다고 느낍니다. 다만 상대의 분위기를 세심하게 살피기보다 옳은 방향을 바로 제시하려 하기에, 때로는 차갑거나 단호하다는 인상을 줄 수 있습니다.`,improvement:`이미 방향을 잡는 능력은 뛰어납니다. 여기에 고객의 리듬을 존중한다는 마음가짐을 더하면 체감 신뢰가 훨씬 높아집니다. 말하기 전에 한 템포 멈추고 확인하는 태도가 필요합니다.

✔ 화법 ①
“고객님 생각을 먼저 듣고 진행하겠습니다.”

✔ 화법 ②
“설명을 들으시고 어떤 느낌이 드셨나요?”`},A_NP_CP:{manner:`고객의 상황을 먼저 듣고 사실과 자료를 토대로 차분히 설명합니다. 따뜻하게 배려하면서도 무리 없는 방향을 찾으려 하기 때문에 고객은 편안함과 안정감을 느낍니다. 다만 기준을 강하게 제시하거나 결단을 요구하는 힘은 상대적으로 약해, 결정의 순간에 선택을 고객에게 넘기는 모습으로 비칠 수 있습니다.`,improvement:`논리와 배려는 충분합니다. 여기에 전문가로서의 기준을 분명히 전달하겠다는 마음가짐을 더하면 설득력이 훨씬 강해집니다. 배려 속에서도 방향을 잡아주는 태도가 필요합니다.

✔ 화법 ①
“고객님 상황을 충분히 고려했을 때 저는 이 선택이 가장 안전하다고 판단합니다.”

✔ 화법 ②
"제가 고객님이라면 이 상품을 선택할 것 같습니다. 현재 고객님 상황에 가장 잘 맞는 상품입니다."`},A_NP_FC:{manner:`자료와 근거를 중심으로 설명하며, 고객의 형편과 마음을 세심하게 배려합니다. 무리한 권유보다 이해를 돕는 대화를 택하기 때문에 고객은 부담 없이 상담을 이어갑니다. 다만 감정 표현이 크지 않아 분위기가 다소 차분하고 무게감 있게 느껴질 수 있고, 친근함의 속도가 느리다는 인상을 줄 수도 있습니다.`,improvement:`전문성과 배려라는 큰 장점 위에 따뜻한 표정과 반응을 조금 더 보태겠다는 마음가짐이 필요합니다. 의식적으로 미소를 띄고 고개를 끄덕이며 공감 표현을 늘리면 고객의 체감 신뢰가 훨씬 빨라집니다.

✔ 화법 ①
“아, 충분히 그렇게 느끼실 수 있습니다.” (미소 + 고개 끄덕임) “그래서 더 쉽게 정리해 드리겠습니다.”

✔ 화법 ②
“좋은 질문 주셨습니다.” (미소 + 고개 끄덕임) “그 부분이 핵심적인 내용입니다. 잘 설명해 드리겠습니다.”

차분함에 온기가 더해질 때 선택은 자연스럽게 이어집니다.`},A_NP_AC:{manner:`상황을 객관적으로 파악해 이해하기 쉽게 설명하고, 고객의 마음을 배려하는 부드러움이 함께 나타납니다. 무리한 압박 없이 필요성을 차분히 전달하기 때문에 신뢰받는 상담자로 보입니다. 다만 눈치를 덜 보는 성향이 강해 보이면, 고객의 숨은 망설임을 세밀하게 읽는 부분은 조금 부족하게 느껴질 수 있습니다.`,improvement:`논리와 배려는 이미 훌륭합니다. 여기에 고객의 리듬을 존중한다는 마음가짐을 더하면 체감 신뢰가 훨씬 높아집니다. 말하기 전에 한 템포 멈추고 확인하는 태도가 필요합니다.

✔ 화법 ①
“고객님 생각을 먼저 듣고 진행하겠습니다.”

✔ 화법 ②
“설명을 들으시고 어떤 느낌이 드셨나요?”`},A_FC_CP:{manner:`논리와 정보를 바탕으로 이해하기 쉽게 설명하면서도 분위기를 부드럽게 만드는 장점이 있습니다. 고객이 어렵게 느끼지 않도록 사례를 들어 풀어주고, 대화의 흐름을 자연스럽게 이어가 신뢰를 쌓습니다. 다만 기준을 세우고 방향을 제시하는 힘이 약해 보이면 전문가로서의 무게감이 덜 전달될 수 있습니다.`,improvement:`논리와 친화력은 충분합니다. 여기에 전문가로서의 기준을 분명히 전달하겠다는 마음가짐을 더하면 설득력이 훨씬 강해집니다. 배려 속에서도 방향을 잡아주는 태도가 필요합니다.

✔ 화법 ①
“고객님 상황을 충분히 고려했을 때 저는 이 선택이 가장 안전하다고 판단합니다.”

✔ 화법 ②
"제가 고객님이라면 이 상품을 선택할 것 같습니다. 현재 고객님 상황에 가장 잘 맞는 상품입니다."`},A_FC_NP:{manner:`상담에서는 논리와 사실을 중심으로 또렷하게 설명하며, 분위기는 밝고 편안하게 이끌어 갑니다. 고객이 이해하기 쉽도록 정리해 주고 말도 부드럽게 건네지만, 마음 깊은 곳의 감정을 충분히 어루만지는 표현은 다소 적을 수 있습니다. 그래서 전문적이고 믿음직하다는 인상은 강하게 남지만, 정서적인 따뜻함이 약간 부족하다고 느끼는 고객도 있을 수 있습니다.`,improvement:`정보를 정확히 전달하는 능력은 이미 훌륭합니다. 여기에 고객의 마음을 언어로 확인해 주는 태도를 더하면 신뢰가 훨씬 단단해집니다. 이해했다는 생각을 마음속에 두지 말고 반드시 말로 전달하는 연습이 필요합니다.

✔ 화법 ①
"고객님 말씀 충분히 이해됩니다. 저라도 같은 고민을 했을 것 같습니다."

✔ 화법 ②
"고객님 입장에서 생각해보면 충분히 그렇게 느끼실 수 있습니다."`},A_FC_AC:{manner:`상담에서 근거와 수치를 중심으로 명확하게 설명하며, 밝은 분위기로 고객을 편안하게 만듭니다. 이해하기 쉽게 풀어주는 능력이 좋아 전문성과 친밀함을 동시에 느끼게 합니다. 다만 상대의 반응을 세밀하게 살피는 표현은 상대적으로 약해, 때로는 조금 빠르거나 혼자 많이 말하는 느낌을 줄 수 있습니다. 그래서 믿음은 있지만 배려받는 느낌은 약간 부족할 수 있습니다.`,improvement:`이미 설명력과 분위기 형성 능력은 큰 강점입니다. 여기에 고객의 표정과 속도를 맞추겠다는 마음가짐을 더하면 상담의 깊이가 달라집니다. 말하기 전에 확인하고, 설명 중간마다 허락을 구하는 태도를 의식적으로 사용해 보세요.

✔ 화법 ①
“제가 조금 빠를 수도 있는데 괜찮으실까요? 불편하시면 바로 말씀 주세요.”

✔ 화법 ②
“여기까지 들으시면서 고객님 생각은 어떠신지 먼저 여쭤보고 싶습니다.”`},A_AC_CP:{manner:`고객의 상황을 분석하고 무리 없는 방향으로 안내하려는 태도가 돋보입니다. 설명은 차분하고 합리적이며 상대의 기분을 불편하게 만들지 않으려 노력합니다. 그래서 상담 분위기가 부드럽고 안정적입니다. 다만 결정해야 할 순간에도 강하게 기준을 제시하기보다는 고객의 선택에 맡기는 모습이 나타나 책임 있게 이끌어 준다는 인상은 다소 약해질 수 있습니다.`,improvement:`이미 신중함과 배려는 충분한 강점입니다. 여기에 전문가로서 방향을 잡아 주겠다는 마음가짐을 더하면 상담의 무게가 커집니다. 맞추기보다 안내한다는 태도를 의식적으로 사용해 보세요.

✔ 화법 ①
“고객님 상황을 충분히 고려했을 때 저는 이 선택이 가장 안전하다고 판단합니다.”

✔ 화법 ②
"제가 고객님이라면 이 상품을 선택할 것 같습니다. 현재 고객님 상황에 가장 잘 맞는 상품입니다."`},A_AC_NP:{manner:`상담을 매우 논리적으로 이끌며 실수 없이 정리하려는 모습이 강합니다. 고객의 반응을 살피며 불편하지 않게 맞추는 능력도 좋아 안정감 있는 전문가로 보입니다. 설명은 체계적이고 신뢰를 주지만, 따뜻하게 마음을 보듬어 준다는 느낌은 상대적으로 약해 차갑거나 일 중심으로 느껴질 수 있습니다.`,improvement:`이미 분석력과 배려는 훌륭합니다. 여기에 고객의 마음을 언어로 확인해 주는 태도를 더하면 신뢰가 훨씬 단단해집니다. 이해했다는 생각을 마음속에 두지 말고 반드시 말로 전달하는 연습이 필요합니다.

✔ 화법 ①
"고객님 말씀 충분히 이해됩니다. 저라도 같은 고민을 했을 것 같습니다."

✔ 화법 ②
"고객님 입장에서 생각해보면 충분히 그렇게 느끼실 수 있습니다."`},A_AC_FC:{manner:`상담을 매우 체계적으로 진행하며 사실과 근거 중심으로 설명하는 힘이 뛰어납니다. 고객의 입장과 분위기를 빠르게 읽고 맞추는 능력도 좋아 불편함을 만들지 않습니다. 그래서 믿을 수 있는 전문가로 보이지만, 표현이 절제되어 있어 다소 딱딱하거나 따뜻함이 부족하다고 느끼는 고객도 있을 수 있습니다.`,improvement:`이미 설명력과 상황판단은 충분히 좋습니다. 이제 고객이 느끼는 온도를 올리는 것이 중요합니다. 의식적으로 미소를 띄고 고개를 끄덕이며 감정을 전달한다는 마음을 가지면 신뢰가 훨씬 깊어집니다.

✔ 화법 ①
“아, 충분히 그렇게 느끼실 수 있습니다.” (미소 + 고개 끄덕임) “그래서 더 쉽게 정리해 드리겠습니다.”

✔ 화법 ②
“좋은 질문 주셨습니다.” (미소 + 고개 끄덕임) “그 부분이 핵심적인 내용입니다. 잘 설명해 드리겠습니다.”`},FC_CP_NP:{manner:`밝은 에너지와 자신감 있는 태도로 상담의 분위기를 주도합니다. 전달력과 추진력이 좋아 고객이 결정을 미루지 않게 만드는 힘도 큽니다. 다만 속도와 방향 제시에 집중하다 보면 고객의 마음을 충분히 헤아리기 전에 다음 단계로 넘어가는 인상을 줄 수 있어, 따뜻함이 있음에도 세심한 배려가 부족하게 보일 때가 있습니다.`,improvement:`이미 분위기를 만드는 힘과 기준을 제시하는 능력은 훌륭합니다. 여기에 고객의 마음을 언어로 확인해 주는 태도를 더하면 신뢰가 훨씬 단단해집니다. 이해했다는 생각을 마음속에 두지 말고 반드시 말로 전달하는 연습이 필요합니다.

✔ 화법 ①
"고객님 말씀 충분히 이해됩니다. 저라도 같은 고민을 했을 것 같습니다."

✔ 화법 ②
"고객님 입장에서 생각해보면 충분히 그렇게 느끼실 수 있습니다."`},FC_CP_A:{manner:`밝고 자신감 있는 태도로 상담의 흐름을 빠르게 잡습니다. 리더십 있게 방향을 제시하고 결정해야 할 이유를 분명히 말하기 때문에 고객이 끌려오듯 집중하게 만드는 힘이 있습니다. 다만 내용을 구조적으로 정리하거나 왜 이 선택이 필요한지 논리적으로 힘 있게 설명하는 부분에서는 다소 약하게 보일 수 있습니다.`,improvement:`이미 에너지와 추진력은 충분합니다. 여기에 논리적인 정리와 명확한 기준을 더하는 태도가 붙으면 신뢰도가 급격히 올라갑니다. 친절함 위에 구조를 세운다는 마음으로 한 번 더 정리해서 말하는 습관을 가져보면 좋겠습니다.

✔ 화법 ①
“지금 상황에서 가장 중요한 핵심내용은 세 가지입니다.”

✔ 화법 ②
“현재 상황을 기준으로 다시 한번 정리해보겠습니다.”`},FC_CP_AC:{manner:`상담의 분위기를 밝게 만들고 주도권을 자연스럽게 가져옵니다. 자신 있는 어조로 방향과 기준을 제시하기 때문에 고객은 전문가에게 안내받는다는 안정감을 느끼기 쉽습니다. 다만 설명이 빠르게 전개되다 보면 고객이 따라오고 있는지, 마음이 준비되어 있는지를 세밀하게 살피는 부분은 조금 약해 보일 수 있습니다.`,improvement:`이미 에너지와 추진력은 충분히 좋습니다. 여기에 고객의 표정과 속도를 한 번 더 살피겠다는 마음가짐이 더해지면 신뢰의 깊이가 완전히 달라집니다. 잠시 멈추는 여유가 오히려 결정력을 높입니다.

✔ 화법 ①
“제가 조금 빠를 수 있는데, 괜찮으실까요? 천천히 맞춰가겠습니다.”

✔ 화법 ②
“제 설명보다 고객님 마음이 더 중요합니다. 부담되는 점은 말씀해주세요.”`},FC_NP_CP:{manner:`대화의 분위기를 부드럽게 만들고 고객이 마음을 열도록 돕는 힘이 큽니다. 표정과 반응이 따뜻해 상담이 편안하게 느껴지고, 부담 없이 이야기할 수 있는 사람으로 인식됩니다. 다만 관계를 중요하게 생각하다 보니 결정의 기준을 또렷하게 잡아 주는 장면에서는 다소 조심스러워 보일 수 있습니다.`,improvement:`공감 능력은 이미 충분히 훌륭합니다. 여기에 고객을 위해 필요한 선택은 분명하게 안내하겠다는 마음가짐을 더하면 전문가로서의 무게가 살아납니다. 부드럽지만 흔들리지 않는 태도가 신뢰를 완성합니다.

✔ 화법 ①
“고객님 상황을 충분히 고려했을 때 저는 이 선택이 가장 안전하다고 판단합니다.”

✔ 화법 ②
"제가 고객님이라면 이 상품을 선택할 것 같습니다. 현재 고객님 상황에 가장 잘 맞는 상품입니다."`},FC_NP_A:{manner:`고객을 편안하게 해 주는 힘이 아주 좋습니다. 표정이 밝고 반응이 따뜻해서 상담 분위기가 부드럽게 흐르고, 고객은 이해받고 있다고 느끼기 쉽습니다. 말을 경청하고 공감하는 능력이 뛰어나 관계 형성은 빠릅니다. 다만 내용을 구조적으로 정리하거나 왜 이 선택이 필요한지 논리적으로 힘 있게 설명하는 부분에서는 다소 약하게 보일 수 있습니다.`,improvement:`따뜻함은 이미 큰 장점입니다. 이제 고객이 결정할 수 있도록 정리해 주는 역할까지 내가 책임진다는 마음가짐을 더해 보시면 좋겠습니다. 부드러움 위에 논리를 얹는 태도가 전문가의 신뢰를 완성합니다.

✔ 화법 ①
“지금 상황에서 가장 중요한 핵심내용은 세 가지입니다.”

✔ 화법 ②
“현재 상황을 기준으로 다시 한번 정리해보겠습니다.”`},FC_NP_AC:{manner:`고객을 먼저 생각하고 보호하려는 마음이 자연스럽게 드러나며, 도움이 되는 방향으로 이끌고자 하는 책임감이 강하게 보입니다. 따뜻하게 공감하면서도 기준과 원칙을 분명히 잡아 주기 때문에 상담의 중심이 잘 서 있습니다. 고객의 입장에서는 믿고 맡길 수 있는 든든함을 느끼게 됩니다. 다만 상황에 따라 상대의 반응을 세심하게 살피는 움직임이 조금은 부족해 보일 수 있어, 때때로 단정적이라는 인상을 줄 수도 있습니다.`,improvement:`좋은 에너지는 이미 충분합니다. 여기에 고객의 속도와 표정을 읽으며 맞춘다는 마음가짐을 더하면 상담 완성도가 크게 올라갑니다. 배려를 느끼게 하는 조율의 태도가 필요합니다.

✔ 화법 ①
“제가 조금 빨랐을 수 있습니다. 이해되시는 부분까지 다시 맞춰 드릴까요?”

✔ 화법 ②
“지금 설명 속도가 괜찮으신지 확인하면서 진행하겠습니다.”`},FC_A_CP:{manner:`표정이 밝고 편안해 고객이 부담 없이 이야기를 시작합니다. 설명은 논리적이고 차분해 이해하기 쉽고, 정보 전달의 신뢰도도 높습니다. 고객의 질문에도 감정적으로 흔들리지 않고 침착하게 답하는 힘이 있습니다. 다만 결정을 밀어주는 단호한 기준 제시는 다소 약해질 수 있어, 좋은 설명에 비해 마무리 힘이 부족하게 느껴질 때가 있습니다.`,improvement:`이미 분위기와 논리는 훌륭합니다. 여기에 전문가로서 방향을 잡아준다는 마음가짐을 더하면 상담 완성도가 올라갑니다. 친절함 속에서도 선택의 기준을 분명히 전달하는 태도가 필요합니다.

✔ 화법 ①
“고객님 상황을 충분히 고려했을 때 저는 이 선택이 가장 안전하다고 판단합니다.”

✔ 화법 ②
"제가 고객님이라면 이 상품을 선택할 것 같습니다. 현재 고객님 상황에 가장 잘 맞는 상품입니다."`},FC_A_NP:{manner:`밝은 분위기로 고객의 긴장을 잘 풀어주고 대화의 문을 여는 능력이 좋습니다. 설명은 논리적이고 체계적이어서 상품 이해도와 신뢰를 높입니다. 감정보다 사실을 중심으로 이야기하기 때문에 상담이 깔끔하고 명확합니다. 다만 고객 마음속의 불안이나 망설임을 충분히 안아주는 따뜻한 표현은 조금 부족하게 느껴질 수 있습니다.`,improvement:`이미 설명력은 훌륭합니다. 여기에 고객의 마음을 언어로 확인해 주는 태도를 더하면 신뢰가 훨씬 단단해집니다. 이해했다는 생각을 마음속에 두지 말고 반드시 말로 전달하는 연습이 필요합니다.

✔ 화법 ①
"고객님 말씀 충분히 이해됩니다. 저라도 같은 고민을 했을 것 같습니다."

✔ 화법 ②
"고객님 입장에서 생각해보면 충분히 그렇게 느끼실 수 있습니다."`},FC_A_AC:{manner:`밝고 에너지 있는 분위기로 고객의 경계를 빠르게 허무는 힘이 있습니다. 설명은 논리와 근거가 분명해 신뢰를 얻기에 좋습니다. 자신감 있는 태도로 상담을 리드하며 결정을 도와주는 추진력도 갖추고 있습니다. 다만 고객의 속도나 망설임을 세밀하게 맞추기보다는 방향을 제시하는 쪽으로 흐르기 쉬워 조금 빠르거나 단호하게 느껴질 수 있습니다.`,improvement:`이미 분위기와 설명은 충분합니다. 여기에 고객의 리듬을 존중한다는 마음가짐을 더하면 체감 신뢰가 훨씬 높아집니다. 말하기 전에 한 템포 멈추고 확인하는 태도가 필요합니다.

✔ 화법 ①
“고객님 생각을 먼저 듣고 진행하겠습니다.”

✔ 화법 ②
“설명을 들으시고 어떤 느낌이 드셨나요?”`},FC_AC_CP:{manner:`밝은 표정과 부드러운 태도로 고객이 편안함을 느끼게 만드는 힘이 큽니다. 상대의 반응을 민감하게 읽어 무리 없이 대화를 이어가며 관계 형성이 자연스럽습니다. 고객의 입장에서 부담되지 않도록 표현을 조절하는 능력도 좋아 상담 분위기가 따뜻합니다. 다만 기준을 분명히 제시하기보다는 맞춰주는 쪽으로 흐르면서 결정의 무게가 약해 보일 수 있습니다.`,improvement:`지금의 친절함은 이미 큰 자산입니다. 여기에 전문가로서의 기준을 분명히 전달하겠다는 마음가짐을 더하면 설득력이 훨씬 강해집니다. 배려 속에서도 방향을 잡아주는 태도가 필요합니다.

✔ 화법 ①
“고객님 상황을 충분히 고려했을 때 저는 이 선택이 가장 안전하다고 판단합니다.”

✔ 화법 ②
"제가 고객님이라면 이 상품을 선택할 것 같습니다. 현재 고객님 상황에 가장 잘 맞는 상품입니다."`},FC_AC_NP:{manner:`밝은 표정과 부드러운 분위기로 고객의 긴장을 빠르게 풀어 주는 힘이 있습니다. 상대의 반응을 살피며 맞추는 능력이 좋아 부담 없는 상담이 만들어집니다. 대화의 흐름이 자연스럽고 관계 형성이 빠르다는 강점도 분명합니다. 다만 이해하고 있다는 표현이 깊게 전달되지 않으면 친절하지만 마음까지 읽어준다는 느낌은 부족해 보일 수 있습니다.`,improvement:`지금처럼 편안한 분위기를 만드는 능력은 매우 훌륭합니다. 여기에 고객의 마음을 먼저 이해하고 있다는 태도를 의식적으로 표현하겠다는 마음가짐이 더해지면 신뢰는 훨씬 깊어집니다. 웃음과 배려 위에 공감을 얹는 것이 핵심입니다.

✔ 화법 ①
"고객님 말씀 충분히 이해됩니다. 저라도 같은 고민을 했을 것 같습니다."

✔ 화법 ②
"고객님 입장에서 생각해보면 충분히 그렇게 느끼실 수 있습니다."`},FC_AC_A:{manner:`밝은 에너지와 편안한 태도로 고객의 경계를 빠르게 낮추는 능력이 있습니다. 상대 기분을 세심하게 살피며 맞추기 때문에 대화가 부드럽고 거부감이 적습니다. 분위기 속에서 신뢰의 문을 여는 데 탁월한 장점이 있습니다. 다만 내용을 구조적으로 정리하거나 왜 이 선택이 필요한지 논리적으로 힘 있게 설명하는 부분에서는 다소 약하게 보일 수 있습니다.`,improvement:`지금의 친절함은 이미 큰 무기입니다. 여기에 논리적인 정리와 명확한 기준을 더하는 태도가 붙으면 신뢰도가 급격히 올라갑니다. 친절함 위에 구조를 세운다는 마음으로 한 번 더 정리해서 말하는 습관을 가져보면 좋겠습니다.

✔ 화법 ①
“지금 상황에서 가장 중요한 핵심내용은 세 가지입니다.”

✔ 화법 ②
“현재 상황을 기준으로 다시 한번 정리해보겠습니다.”`},AC_CP_NP:{manner:`고객의 표정과 말의 뉘앙스를 빠르게 알아차리고 분위기를 민감하게 파악합니다. 그리고 판단이 서면 분명한 기준과 방향을 제시하며 상담을 정리합니다. 준비된 전문가, 결정을 도와주는 사람처럼 보이는 힘이 있습니다. 다만 고객의 마음을 읽고 있으면서도 그 이해를 따뜻한 말로 풀어 주는 표현이 적으면, 고객은 공감받기보다 설명을 듣는 느낌에 머무를 수 있습니다.`,improvement:`이미 고객의 반응을 읽는 능력과 기준을 잡는 힘은 충분합니다. 여기에 ‘읽은 마음을 먼저 말로 인정한다’는 태도가 더해지면 신뢰는 훨씬 깊어집니다. 이해 → 기준 제시의 순서를 의식적으로 만드는 것이 핵심입니다.

✔ 화법 ①
“지금 말씀을 들어보니 걱정이 되실 수 있겠다고 느껴집니다. 그래서 저는 기준을 이렇게 준비했습니다.”

✔ 화법 ②
“부담이 있으실 수 있다는 점 공감합니다. 그 부분을 고려해 가장 안전한 방향을 안내드리겠습니다.”`},AC_CP_A:{manner:`상대가 무엇을 부담스러워하는지, 어디에서 망설이는지를 읽어내는 감각이 뛰어납니다. 그리고 방향을 잡을 때는 분명한 기준을 세워 단호하게 정리하는 힘도 있습니다. 그래서 상담은 빠르게 결론 쪽으로 향합니다. 다만 내용을 구조적으로 정리하거나 왜 이 선택이 필요한지 논리적으로 힘 있게 설명하는 부분에서는 다소 약하게 보일 수 있습니다.`,improvement:`이미 흐름을 읽는 감각과 결단력은 충분히 좋습니다. 여기에 논리적인 정리와 명확한 기준을 더하는 태도가 붙으면 신뢰도가 급격히 올라갑니다. 친절함 위에 구조를 세운다는 마음으로 한 번 더 정리해서 말하는 습관을 가져보면 좋겠습니다.

✔ 화법 ①
“지금 상황에서 가장 중요한 핵심내용은 세 가지입니다.”

✔ 화법 ②
“현재 상황을 기준으로 다시 한번 정리해보겠습니다.”`},AC_CP_FC:{manner:`고객의 표정과 분위기를 민감하게 살피며 상대의 마음을 빠르게 읽어냅니다. 그리고 필요할 때는 옳다고 생각하는 기준을 분명히 제시하며 결정의 방향을 잡아 줍니다. 상담은 안정적으로 흘러가지만, 감정 표현이 크지 않아 다소 진지하고 딱딱하게 보일 수 있어 고객이 정서적 따뜻함을 느끼는 부분은 조금 부족할 수 있습니다.`,improvement:`이미 흐름을 읽고 방향을 제시하는 힘은 충분합니다. 여기에 의식적으로 표정을 부드럽게 하고 공감의 표현을 더한다는 마음가짐을 더하면 고객은 훨씬 편안해집니다. 설명 중에는 고개를 끄덕이고 미소를 띠며 따뜻함을 전달하는 태도를 반복해 보시면 좋습니다.

✔ 화법 ①
“아, 충분히 그렇게 느끼실 수 있습니다.” (미소 + 고개 끄덕임) “그래서 더 쉽게 정리해 드리겠습니다.”

✔ 화법 ②
“좋은 질문 주셨습니다.” (미소 + 고개 끄덕임) “그 부분이 핵심적인 내용입니다. 잘 설명해 드리겠습니다.”`},AC_NP_CP:{manner:`고객의 표정과 분위기 변화를 빠르게 느끼며 불편함이 생기지 않도록 말을 고르는 능력이 좋습니다. 상대의 입장을 이해하고 부드럽게 공감해 주기 때문에 상담 자리가 편안해지고 관계 형성이 자연스럽게 이루어집니다. 다만 혹시라도 부담을 줄까 염려하여 단호하게 방향을 잡거나 필요성을 또렷하게 말하는 순간에는 조심스러워질 수 있어 결정의 힘이 약하게 보일 가능성은 있습니다.`,improvement:`이미 배려와 공감 능력은 충분히 훌륭합니다. 여기에 고객에게 도움이 되는 결정은 분명하게 안내한다는 마음가짐을 더하면 신뢰가 훨씬 커집니다. 책임 있게 기준을 전한다는 태도를 의식적으로 연습하면 좋습니다.

✔ 화법 ①
“고객님 상황을 충분히 고려했을 때 저는 이 선택이 가장 안전하다고 판단합니다.”

✔ 화법 ②
"제가 고객님이라면 이 상품을 선택할 것 같습니다. 현재 고객님 상황에 가장 잘 맞는 상품입니다."`},AC_NP_A:{manner:`고객의 표정과 말투에서 마음의 변화를 빠르게 느끼며 혹시 불편하지 않을까 세심하게 살피는 힘이 큽니다. 따뜻한 공감과 배려가 자연스럽게 전달되어 상담 분위기가 부드럽고 신뢰 형성이 빠릅니다. 다만 분위기를 맞추는 데 집중하다 보면 내용을 구조적으로 정리하거나 왜 이 선택이 필요한지 논리적으로 힘 있게 설명하는 부분에서는 다소 약하게 보일 수 있습니다.`,improvement:`이미 관계를 만드는 능력은 뛰어납니다. 여기에 사실과 기준을 또렷하게 정리해 주는 사람이라는 이미지를 더하면 전문가로서의 무게가 훨씬 커집니다. 공감 후에는 반드시 이유와 근거를 붙여 결론을 안내한다는 태도를 의식적으로 가져보시면 좋습니다.

✔ 화법 ①
“지금 상황에서 가장 중요한 핵심내용은 세 가지입니다.”

✔ 화법 ②
“현재 상황을 기준으로 다시 한번 정리해보겠습니다.”`},AC_NP_FC:{manner:`고객의 눈빛과 분위기를 빠르게 읽으며 부담을 주지 않으려 세심하게 맞추는 능력이 뛰어납니다. 따뜻한 배려와 이해 중심의 대화를 하기에 고객은 편안함을 느끼고 마음의 문을 잘 엽니다. 그러나 감정 표현이나 밝은 에너지 전달이 약하면 전문적이지만 조금은 딱딱하거나 거리감 있게 보일 수 있습니다.`,improvement:`이미 공감 능력은 충분하니 여기에 의도적으로 밝은 표정과 생동감을 더하는 것이 핵심입니다. 설명을 할 때도 마음만 전달하는 것이 아니라 표정과 반응으로 확신을 보여준다는 태도를 가져보시면 좋습니다. 특히 의식적으로 미소를 띄고 고개를 끄덕이는 행동이 큰 차이를 만듭니다.

✔ 화법 ①
“고객님 마음 충분히 이해합니다. 그래서 더 도움이 되는 방향을 제가 책임지고 함께 찾아보겠습니다.” (미소 + 끄덕임)

✔ 화법 ②
“걱정되실 수 있지만 제가 끝까지 도와드릴게요. 편하게 하나씩 같이 정리해 보시죠.” (부드러운 표정 유지)`},AC_A_CP:{manner:`고객의 표정과 분위기를 세밀하게 살피며 무리 없이 흐름을 맞추는 능력이 뛰어납니다. 설명은 체계적이고 근거 중심이라 신뢰를 만들기에 좋습니다. 다만 결정이 필요한 순간에도 조심스러운 표현을 사용하다 보니 권유의 힘이 약해 보일 수 있고, 주도권이 고객에게 넘어가는 장면이 생기기도 합니다.`,improvement:`이미 상황 판단과 정보 전달 능력은 훌륭하니 이제는 확신을 보여주는 태도를 더하는 것이 중요합니다. 맞추는 사람이 아니라 안내하는 사람이라는 마음가짐을 가지면 설득력이 훨씬 커집니다. 근거 위에 단호한 한마디를 올린다는 느낌으로 접근해 보시면 좋겠습니다.

✔ 화법 ①
“고객님 상황을 충분히 고려했을 때 저는 이 선택이 가장 안전하다고 판단합니다.”

✔ 화법 ②
"제가 고객님이라면 이 상품을 선택할 것 같습니다. 현재 고객님 상황에 가장 잘 맞는 상품입니다."`},AC_A_NP:{manner:`고객의 표정과 분위기 변화를 빠르게 알아차리고 상황에 맞게 속도를 조절하는 능력이 뛰어납니다. 설명은 사실과 근거 중심으로 정리되어 이해하기 쉽고 전문적으로 느껴집니다. 다만 마음을 다독이거나 감정을 먼저 어루만지는 표현이 적어 차갑게 보일 수 있고, 공감받는 느낌이 약해 관계 형성이 늦어질 때도 있습니다.`,improvement:`이미 흐름을 읽고 정확하게 설명하는 힘은 충분합니다. 여기에 마음을 먼저 알아주는 한 문장을 더하면 고객은 훨씬 빨리 마음을 엽니다. 맞는 말을 하는 전문가에서 나를 이해하는 사람으로 느끼게 만드는 것이 핵심입니다.

✔ 화법 ①
"고객님 말씀 충분히 이해됩니다. 저라도 같은 고민을 했을 것 같습니다."

✔ 화법 ②
"고객님 입장에서 생각해보면 충분히 그렇게 느끼실 수 있습니다."`},AC_A_FC:{manner:`고객의 작은 표정 변화와 분위기를 빠르게 읽어 대화의 방향을 맞추는 능력이 좋습니다. 설명은 자료와 근거 중심이라 신뢰감이 있고, 불필요한 말을 줄이며 핵심을 전달하는 힘이 있습니다. 다만 표정과 리액션이 크지 않아 차분하고 진지한 전문가로 보이지만, 조금은 딱딱하거나 거리감 있게 느껴질 수 있습니다.`,improvement:`이미 상황 판단과 논리 전달은 훌륭합니다. 이제는 고객이 편안함을 느끼도록 감정 표현을 의식적으로 더하는 태도가 필요합니다. 특히 설명 중에는 미소를 띄고 고개를 끄덕이며 반응해 주는 것이 관계를 부드럽게 만듭니다. 이해시키는 상담에서 좋아지게 만드는 상담으로 바뀌게 됩니다.

✔ 화법 ①
“아, 충분히 그렇게 느끼실 수 있습니다.” (미소 + 고개 끄덕임) “그래서 더 쉽게 정리해 드리겠습니다.”

✔ 화법 ②
“좋은 질문 주셨습니다.” (미소 + 고개 끄덕임) “그 부분이 핵심적인 내용입니다. 잘 설명해 드리겠습니다.”`},AC_FC_CP:{manner:`고객의 표정과 말투의 변화를 민감하게 알아차리고 상황에 맞게 대화를 조절하는 능력이 뛰어납니다. 분위기를 편안하게 만들고 친근하게 다가가며 부담을 줄이는 장점이 큽니다. 다만 배려가 앞서다 보니 결정적인 순간에 방향을 잡아 주는 힘이나 기준 제시는 약하게 느껴질 수 있습니다.`,improvement:`관계를 따뜻하게 만드는 능력은 이미 충분합니다. 여기에 전문가로서 이끌어 주는 마음가짐과 분명한 제안 태도를 더하면 신뢰가 훨씬 강해집니다. 공감 후에는 선택의 이유를 또렷하게 정리해 주는 연습이 필요합니다.

✔ 화법 ①
“고객님 상황을 충분히 고려했을 때 저는 이 선택이 가장 안전하다고 판단합니다.”

✔ 화법 ②
"제가 고객님이라면 이 상품을 선택할 것 같습니다. 현재 고객님 상황에 가장 잘 맞는 상품입니다."`},AC_FC_NP:{manner:`고객의 표정과 미묘한 신호를 빠르게 읽어 상황에 맞게 대응하는 능력이 매우 좋습니다. 현장을 부드럽게 만들고 대화를 편안하게 이어가며 관계의 긴장을 풀어 주는 힘도 뛰어납니다. 다만 이해는 하고 있어도 그것을 말로 충분히 표현하지 않으면 고객이 마음을 깊이 공감받는 느낌은 덜할 수 있습니다.`,improvement:`상황 판단과 분위기 조성 능력은 이미 훌륭합니다. 여기에 고객의 마음을 언어로 확인해 주는 태도를 더하면 신뢰가 훨씬 단단해집니다. 이해했다는 생각을 마음속에 두지 말고 반드시 말로 전달하는 연습이 필요합니다.

✔ 화법 ①
"고객님 말씀 충분히 이해됩니다. 저라도 같은 고민을 했을 것 같습니다."

✔ 화법 ②
"고객님 입장에서 생각해보면 충분히 그렇게 느끼실 수 있습니다."`},AC_FC_A:{manner:`고객의 표정과 분위기 변화를 민감하게 살피며 그에 맞추어 대화를 자연스럽게 조율하는 능력이 뛰어납니다. 현장을 편안하게 만들고 경직된 마음을 풀어 관계 형성도 빠르게 이루어집니다. 그러나 공감과 분위기에 집중하다 보면 정작 중요한 정보 전달이 체계적으로 정리되지 않아 판단 근거가 약하게 들릴 수 있습니다.`,improvement:`이미 관계를 여는 힘은 충분합니다. 여기에 논리적인 정리와 명확한 기준을 더하는 태도가 붙으면 신뢰도가 급격히 올라갑니다. 친절함 위에 구조를 세운다는 마음으로 한 번 더 정리해서 말하는 습관을 가져보면 좋겠습니다.

✔ 화법 ①
“지금 상황에서 가장 중요한 핵심내용은 세 가지입니다.”

✔ 화법 ②
“현재 상황을 기준으로 다시 한번 정리해보겠습니다.”`}},cm5_1:{CP_NP_A:`OOO님은 결단력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_NP_FC:`OOO님은 결단력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_NP_AC:`OOO님은 결단력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_A_NP:`OOO님은 결단력과 객관적 판단력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_A_FC:`OOO님은 결단력과 객관적 판단력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_A_AC:`OOO님은 결단력과 객관적 판단력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_FC_NP:`OOO님은 결단력과 친화력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_FC_A:`OOO님은  결단력과 친화력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_FC_AC:`OOO님은 결단력과 친화력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_AC_NP:`OOO님은 결단력과 상대를 잘 살피는 능력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_AC_A:`OOO님은 결단력과 상대를 잘 살피는 능력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_AC_FC:`OOO님은 추진력과 상대를 잘 살피는 능력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_CP_A:`OOO님은 배려와 공감능력 그리고 결단력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_CP_FC:`OOO님은 배려와 공감능력 그리고 결단력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_CP_AC:`OOO님은 배려와 공감능력 그리고 결단력이 강점으로 나타나며, 상대 입장 살피기를  조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다`,NP_A_CP:`OOO님은 배려와 공감능력 그리고 객관적 판단력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_A_FC:`OOO님은 배려와 공감능력 그리고 객관적 판단력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_A_AC:`OOO님은 배려와 공감능력 그리고 객관적 판단력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_FC_CP:`OOO님은 배려와 공감능력 그리고 친화력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_FC_A:`OOO님은 배려와 공감능력 그리고 친화력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_FC_AC:`OOO님은 배려와 공감능력 드리고 친화력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_AC_CP:`OOO님은 공감을 바탕으로 한 배려심과 상대를 살피는 능력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_AC_A:`OOO님은 공감을 바탕으로 한 배려심과 상대를 살피는 능력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_AC_FC:`OOO님은 공감을 바탕으로 한 배려심과 상대를 살피는 능력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_CP_NP:`OOO님은 객관적 판단력과 결단력이 강점으로 나타나며, 상대에게 공감하는 것을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_CP_FC:`OOO님은 객관적 판단력과 결단력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_CP_AC:`OOO님은 객관적 판단력과 결단력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_NP_CP:`OOO님은 객관적 판단력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_NP_FC:`OOO님은 객관적 판단력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_NP_AC:`OOO님은 객관적 판단력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_FC_CP:`OOO님은 객관적 판단력과 친화력을 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_FC_NP:`OOO님은 객관적 판단력과 친화력을 강점으로 나타나며, 상대에게 공감하는 것을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_FC_AC:`OOO님은 객관적 판단력과 친화력을 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_AC_CP:`OOO님은 객관적 판단력과 상대를 살피는 능력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_AC_NP:`OOO님은 객관적 판단력과 상대를 살피는 능력이 강점으로 나타나며, 상대에게 공감하는 것을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_AC_FC:`OOO님은 객관적 판단력과 상대를 살피는 능력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_CP_NP:`OOO님은 친화력과 결단력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_CP_A:`OOO님은 친화력과 결단력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_CP_AC:`OOO님은 친화력과 결단력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_NP_CP:`OOO님은 친화력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_NP_A:`OOO님은 친화력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_NP_AC:`OOO님은 친화력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_A_CP:`OOO님은 친화력과 객관적 판단력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_A_NP:`OOO님은 친화력과 객관적 판단력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_A_AC:`OOO님은 친화력과 객관적 판단력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_AC_CP:`OOO님은 친화력과 상대를 살피는 능력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_AC_NP:`OOO님은 친화력과 상대를 살피는 능력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_AC_A:`OOO님은 친화력과 상대를 살피는 능력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_CP_NP:`OOO님은 상대를 잘 살피는 능력과 결단력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_CP_A:`OOO님은 상대를 잘 살피는 능력과 결단력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_CP_FC:`OOO님은 상대를 잘 살피는 능력과 결단력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_NP_CP:`OOO님은 상대를 살피는 능력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_NP_A:`OOO님은 상대를 살피는 능력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_NP_FC:`OOO님은 상대를 살피는 능력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_A_CP:`OOO님은 상대를 살피는 능력과 객관적 판단력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_A_NP:`OOO님은 상대를 살피는 능력과 객관적 판단력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_A_FC:`OOO님은 상대를 살피는 능력과 객관적 판단력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_FC_CP:`OOO님은 상대를 살피는 능력과 친화력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_FC_NP:`OOO님은 상대를 살피는 능력과 친화력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_FC_A:`OOO님은 상대를 살피는 능력과 친화력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`},closing:`이 성향리포트가 작은 거울이 되어 인간관계와 하시는 일의 성과에 도움이 되기를 기원합니다.`,cm6:{CP_NP:`이 상황에서 OOO님은 “여기까지 설명했으면 결정할 때가 됐다”라고 느낍니다. 기준을 세우고 밀어붙이는 힘이 강하고, 동시에 고객에게 도움이 되는 선택을 하게 해주고 싶다는 보호 본능도 같이 올라옵니다. 그래서 말은 단호하지만 방향은 고객을 위하는 쪽으로 갑니다. 예를 들면 “걱정되시는 부분 제가 책임지고 관리하겠습니다”라든가 “미루실수록 위험은 그대로입니다”처럼 따뜻함과 압박이 함께 들어갑니다.

하지만 고객의 마음은 조금 다릅니다. 틀린 선택을 할까 봐 부담스럽고, 혹시 더 생각해볼 여지가 없나 시간을 벌고 싶은 상태입니다. 그래서 상의, 다음에, 생각해본다는 표현으로 뒤로 물러나 숨을 고르는 겁니다.

코칭의 핵심은 공감 후 전환입니다. 따뜻함은 이미 충분합니다. 이제는 방향을 잡아줘야 합니다. 친절은 유지하되 결론을 제시해야 합니다. 그래야 고객이 안심하고 따라옵니다.`,CP_A:`이 상황에서 OOO님은 제안내용도 맞고, 타이밍도 맞고, 더 미루는 것이 손해라는 판단이 서 있습니다. 그래서 머릿속에는 “이제는 정리할 단계”라는 확신이 있습니다. 말은 비교적 단단하게 나가지만 감정이 아니라 사실과 데이터로 밀어붙입니다. “지금 준비 안 하시면 공백이 생깁니다”, “조건 좋을 때 확정하는 게 유리합니다”처럼 근거 중심으로 고객을 움직이려 합니다. 스스로 보기에는 합리적이고 깔끔한 안내라고 느낍니다.

그런데 고객의 마음은 조금 다릅니다. 틀릴까 봐 걱정되고, 혹시 놓친 부분이 있을까 봐 불안합니다. 그래서 배우자 상의나 다음에 하겠다는 말로 시간을 벌며 안전한 선택을 찾으려 합니다. 아직 머리보다 마음이 완전히 따라오지 않은 상태입니다.

여기서 필요한 코칭은 옳은 말에 온도를 더한 전환입니다. 그리고 나서 방향을 잡아줘야 합니다. 즉 친절은 유지하되 결론을 제시해야 합니다. 그래야 고객이 안심하고 따라옵니다.`,CP_FC:`이 상황에서 OOO님의 마음은 솔직히 답답합니다. 준비는 충분했고 설명도 다 했다고 느끼기 때문입니다. 그래서 속으로는 “왜 또 미루시지?”라는 생각이 올라옵니다. 하지만 표현은 비교적 부드럽고 인간적으로 나갑니다. 분위기를 풀고, 웃고, 가볍게 다가가면서 “충분히 고민되실 수 있어요”라고 공감부터 꺼냅니다. 딱딱하게 몰아붙이기보다는 친근함과 현장 감각으로 자연스럽게 결정을 끌어내려는 모습입니다. 본인은 부담을 줄여주고 있다고 생각합니다.

하지만 고객의 마음은 아직 마지막 불안이 남아 있습니다. 혹시 급하게 결정하는 건 아닐지, 집에 가서 다시 생각하면 다른 선택이 떠오르지는 않을지 망설입니다. 그래서 시간을 벌 수 있는 말을 찾게 됩니다. 미루는 말은 거절이라기보다 확신이 더 필요하다는 신호에 가깝습니다.

코칭의 핵심은 공감 후 전환입니다. 따뜻함은 이미 충분합니다. 이제는 방향을 잡아줘야 합니다. 친절은 유지하되 결론을 제시해야 합니다. 그래야 고객이 안심하고 따라옵니다.`,CP_AC:`이 상황에서 OOO님의 마음은 이미 답이 나와 있다고 느낍니다. 준비했고, 설명했고, 조건도 맞췄다고 생각합니다. 그래서 속에서는 “여기서 더 뭐가 필요하지?”라는 생각이 올라옵니다. 다만 고객의 표정과 말의 뉘앙스를 빠르게 읽는 힘이 좋아서 강하게 밀어붙이기 전에 분위기를 살핍니다. 상대가 부담을 느끼는지, 진짜 고민인지, 그냥 습관처럼 미루는지 촉으로 파악하려고 합니다. 그러면서 말은 비교적 단호하고 결론 중심으로 갑니다. “사실 지금 결정 못 하시는 이유가 따로 있으실까요?”처럼 핵심을 바로 건드립니다.

하지만 고객의 마음은 압박을 피하고 싶은 상태일 가능성이 큽니다. 아직 완전히 확신이 안 섰거나, 책임지는 느낌이 무거워서 시간을 벌고 싶습니다. 그래서 상의, 다음에 같은 말을 꺼냅니다. 마음은 불안 쪽에 더 가깝습니다.

코칭의 핵심은 공감 후 전환입니다. 따뜻함은 이미 충분합니다. 이제는 방향을 잡아줘야 합니다. 친절은 유지하되 결론을 제시해야 합니다. 그래야 고객이 안심하고 따라옵니다.`,NP_CP:`이 상황에서 OOO님의 마음은 고객을 놓치고 싶지 않은 보호자의 마음이 먼저 올라옵니다. 도움이 되어야 한다는 생각, 혹시라도 손해 보게 하면 안 된다는 마음이 큽니다. 동시에 기준을 세우고 결론을 내야 한다는 책임감도 같이 작동합니다. 그래서 말은 따뜻하지만 방향은 또렷합니다. “충분히 상의하실 수 있는데요, 혹시 가장 걸리는 부분이 어떤 걸까요?”처럼 배려를 깔고 핵심을 묻습니다. 필요하면 “제가 볼 때는 지금 준비하시는 게 더 안전합니다”라고 정리해 주려 합니다.

하지만 고객의 마음은 아직 결정 부담을 피하고 싶은 상태일 때가 많습니다. 틀릴까 봐, 괜히 급하게 했다가 후회할까 봐 시간을 벌고 싶습니다. 그래서 상의나 다음이라는 표현으로 숨을 고릅니다. 누군가 확신을 대신 져주길 바라기도 합니다.

코칭의 핵심은 공감 후 전환입니다. 따뜻함은 이미 충분합니다. 이제는 방향을 잡아줘야 합니다. 친절은 유지하되 결론을 제시해야 합니다. 그래야 고객이 안심하고 따라옵니다.`,NP_A:`이 상황에서 OOO님의 마음은 “도움이 되고 싶다”가 가장 먼저 올라옵니다. 괜히 부담을 줘서 관계를 망치고 싶지 않고, 고객이 편안해야 한다고 생각합니다. 동시에 머리는 계산을 합니다. 언제 준비하는 게 유리한지, 미루면 무엇이 달라지는지를 빠르게 정리합니다. 그래서 말은 부드럽지만 내용은 현실적입니다. “충분히 상의 가능하신데요, 혹시 결정에 가장 걸리는 숫자가 어떤 부분일까요?”처럼 접근합니다. 감정을 안정시키면서 판단 자료를 줍니다. 필요하면 “지금 하실 때와 나중의 차이만 비교해 보시죠”라며 표로 정리해 주려 합니다.

반면 고객의 마음은 아직 확신이 부족합니다. 틀린 선택을 할까 봐 시간을 벌고 싶고, 누군가 명확하게 정리해 주길 바랍니다. 거절이라기보다 불안 회피에 가깝습니다.

이 성향의 코칭 포인트는 착한 사람으로 남는 것에서 멈추지 말고, 결정을 돕는 사람까지 가는 것입니다. 이해해 주는 말 뒤에 반드시 판단 기준을 붙여야 합니다.`,NP_FC:`이 상황에서 OOO님의 마음은 “부담 주지 말자, 기분 좋게 끝내자”가 가장 크게 움직입니다. 혹시라도 강하게 말했다가 관계가 틀어질까 봐 속도를 늦추고, 고객이 웃으면서 이야기하도록 분위기를 만듭니다. 그래서 응대는 따뜻하고 친근합니다. “네, 당연히 상의하셔야죠. 제가 괜히 급하게 하는 사람 되면 안 되니까요.” 같은 말이 자연스럽게 나옵니다. 중간중간 농담이나 공감으로 긴장을 풀어 주고, 선택을 편안하게 느끼게 해 줍니다.

하지만 고객의 마음은 조금 다릅니다. 사실은 더 설명을 듣고 싶은데 스스로 결정하기가 부담스럽거나, 누군가 등을 살짝 밀어주길 기다리는 경우가 많습니다. 겉으로는 미루지만 속에서는 정리를 원합니다.

이 성향의 코칭 포인트는 좋게 끝내는 것과 결정 나게 끝내는 것을 구분하는 것입니다. 분위기를 따뜻하게 만드는 힘은 이미 충분합니다. 여기에 마지막 한 문장, 방향을 잡아주는 말만 보태면 됩니다.`,NP_AC:`이 상황에서 OOO님의 마음은 “지금 밀어붙이면 부담 느끼시지 않을까?”라는 생각이 가장 먼저 올라옵니다. 상대 반응을 매우 빠르게 캐치하고, 혹시라도 싫은 기색이 보이면 바로 속도를 낮춥니다. 그래서 응대는 조심스럽고 배려 깊습니다. “네, 상의 충분히 하셔야죠. 결정은 편하실 때 하시면 됩니다.” 같은 말로 안전한 공간을 만들어 줍니다. 고객의 입장에서 듣기 편하고 사람 좋다는 느낌을 받습니다.

하지만 이 순간 고객의 속마음은 조금 다를 수 있습니다. 누군가 책임 있게 정리해 주길 바라면서도 괜히 먼저 결정하기는 부담스러워 잠깐 뒤로 물러나 있는 경우가 많습니다. 즉, 편안함은 고맙지만 동시에 리드를 기다립니다.

여기서 필요한 코칭은 배려는 유지하되 기준을 제시하는 힘을 올리는 것입니다. 이미 분위기를 읽는 능력은 뛰어나기 때문에, 거기에 방향 한 줄만 추가하면 완전히 달라집니다.`,A_CP:`이 상황에서 OOO님의 마음은 “지금 밀어붙이면 부담 느끼시지 않을까?”라는 생각이 가장 먼저 올라옵니다. 상대 반응을 매우 빠르게 캐치하고, 혹시라도 싫은 기색이 보이면 바로 속도를 낮춥니다. 그래서 응대는 조심스럽고 배려 깊습니다. “네, 상의 충분히 하셔야죠. 결정은 편하실 때 하시면 됩니다.” 같은 말로 안전한 공간을 만들어 줍니다. 고객의 입장에서는 듣기 편하고 사람 좋다는 느낌을 받습니다.

하지만 이 순간 고객의 속마음은 조금 다를 수 있습니다. 누군가 책임 있게 정리해 주길 바라면서도 괜히 먼저 결정하기는 부담스러워 잠깐 뒤로 물러나 있는 경우가 많습니다. 즉, 편안함은 고맙지만 동시에 리드를 기다립니다.

여기서 필요한 코칭은 배려는 유지하되 기준을 제시하는 힘을 올리는 것입니다. 이미 분위기를 읽는 능력은 뛰어나기 때문에, 거기에 방향 한 줄만 추가하면 완전히 달라집니다.`,A_NP:`이 상황애서 OOO님은 차분합니다. 감정보다 사실이 먼저 정리되고, 고객에게 무엇이 필요한지 이미 구조가 보입니다. 동시에 상대 입장을 배려하려는 마음이 큽니다. 그래서 응대는 논리 위에 따뜻함이 얹힙니다. “충분히 고민되실 수 있습니다. 다만 현재 조건에서는 준비해 두시는 게 가장 안전합니다.”처럼 부담을 줄이면서 방향을 안내합니다. 고객을 몰아붙이기보다 보호해 주려는 태도가 자연스럽게 나옵니다.

하지만 고객의 마음은 아직 결정 버튼을 누를 준비가 덜 되었을 수 있습니다. 필요성은 이해했지만 혹시 모를 후회, 가족 의견, 돈 나가는 느낌 같은 감정이 남아 있습니다. 그래서 시간을 벌고 싶은 말을 합니다. 이때 설명만 더 길어지면 고객은 ‘좋은 사람인데 조금 부담된다’고 느끼며 한 발 물러설 수 있습니다.

여기서 필요한 코칭은 정리된 판단을 더 분명하게 제시하는 것입니다. 배려는 이미 충분하니 이제는 선택을 도와주는 힘을 보태야 합니다..따뜻함 위에 확신이 올라가면 고객은 편안하게 따라옵니다.`,A_FC:`이 상황애서 OOO님은 머릿속이 먼저 정리됩니다. 계산이 끝났고 비교도 끝났고 지금 결정하는 게 왜 좋은지 이미 알고 있습니다. 그런데 분위기를 부드럽게 만들고 싶어집니다. 혹시 부담 줄까 봐, 혹시 밀어붙인다고 느낄까 봐 한 번 더 웃으며 풀어주려 합니다. 그래서 응대는 논리적이면서도 가볍게 들립니다. “충분히 생각하실 수 있죠, 그래도 방향은 잡아 두시는 게 좋습니다.”처럼 말입니다. 정리는 잘하지만 힘 있게 잠그는 동작이 약해질 수 있습니다.

이때 고객의 마음은 이해는 했지만 아직 감정이 완전히 넘어오지 않은 상태입니다. 필요성은 공감하지만 결정의 책임을 바로 지고 싶지는 않습니다. 그래서 시간을 벌 수 있는 말을 꺼냅니다. 배우자 이야기, 다음에 하겠다는 말은 사실 거절이라기보다 뒤로 미루는 신호에 가깝습니다. OOO님이 더 부드러워질수록 고객도 같이 뒤로 갑니다.

여기서 필요한 코칭은 친절은 유지하되 마침표를 찍는 힘입니다. 이미 분석은 충분히 되었으니 이제는 선택을 도와주고 방향을 잡아 줘야 합니다. 즉 공감은 하되 결론은 제시해야 합니다. 그래야 고객이 안심하고 따라옵니다.`,A_AC:`이 상황애서 OOO님은 상황을 머리로 빠르게 정리합니다. 왜 망설이는지, 어디에서 걸리는지 계산이 됩니다. 동시에 상대의 눈빛과 말투를 세심하게 읽기 때문에 강하게 밀기보다는 분위기를 맞추려 합니다. 응대는 차분하고 합리적입니다. “충분히 고민되실 수 있습니다, 다만 현재 조건에서 가장 유리한 선택은 이것입니다.”처럼 설명 중심으로 갑니다. 문제는 너무 이해해 주다 보면 주도권까지 같이 넘겨줄 수 있다는 점입니다.

이때 고객의 마음은 아직 결정을 확정할 준비가 끝난 상태는 아닙니다. 틀렸다고 생각하지는 않지만, 혹시 모를 선택의 부담을 줄이고 싶어 합니다. 그래서 시간을 확보할 수 있는 표현을 씁니다. OOO님이 더 배려해 줄수록 고객은 더 생각해 보겠다고 뒤로 이동합니다. 서로 맞춰 주다가 계약 타이밍이 흘러갈 수 있습니다.

필요한 코칭은 읽는 능력 위에 리드하는 힘을 얹는 것입니다. 이미 충분히 파악했으니 이제는 방향을 잡아 줘야 합니다. 공감은 하되 결론은 제시해야 합니다. 그래야 고객이 안심하고 따라옵니다.`,FC_CP:`이 상황애서 OOO님은 에너지가 밝고 분위기를 따뜻하게 만들 줄 압니다. 동시에 기준은 분명해서 필요하다고 판단되면 방향을 잡으려 합니다. 그래서 응대는 “고민되실 수 있지만 지금 준비하시는 게 맞습니다.”처럼 친근함 속에 단호함이 섞입니다. 문제는 분위기가 좋다 보니 고객이 아직 웃고 있고, 거절도 부드럽게 나오기 때문에 ‘조금 더 이야기해도 되겠지’ 하며 타이밍을 늦출 수 있다는 점입니다.

이때 고객의 마음은 나쁘지 않습니다. OOO님이 싫어서가 아니라 결정의 무게를 뒤로 미루고 싶은 상태입니다. 편안한 분위기를 유지하고 싶어서 상의, 다음에 같은 말을 꺼냅니다. 결국 관계는 좋은데 계약은 미뤄지는 그림이 됩니다.

필요한 코칭은 웃음 뒤에 결론을 붙이는 습관입니다. 이미 분석은 충분히 되었으니 이제는 선택을 도와주고 방향을 잡아 줘야 합니다. 즉 공감은 하되 결론은 제시해야 합니다. 그래야 고객이 안심하고 따라옵니다.`,FC_NP:`이 상황애서 OOO님은 따뜻하게 응대합니다. 고객의 표정, 분위기, 말투를 빠르게 읽고 맞춰 줍니다. 그래서 응대는 부드럽고 배려가 깊습니다. “충분히 상의하실 수 있죠, 고민되시는 부분 있으세요?”처럼 상대를 이해하려는 말이 먼저 나옵니다. 고객의 입장에서는 편하고 좋은 사람을 만났다고 느낍니다. 다만 결정 순간에도 계속 맞춰 주다 보면 주도권이 고객 쪽으로 넘어가 버릴 수 있습니다.

이때 고객의 마음은 나쁘지 않습니다. 부담을 주지 않으니 고맙고 미안합니다. 하지만 동시에 ‘조금 더 생각해도 기다려 줄 사람’이라고 느끼기 때문에 급하게 선택하지 않습니다. 즉 편안함은 유지되지만 계약은 뒤로 갑니다. 결국 좋은 상담이었는데 실행이 미뤄지는 상황이 됩니다.

여기서 필요한 코칭은 따뜻함 위에 방향을 얹는 것입니다. 공감은 이미 잘하니, 그 다음에 정리를 붙여야 합니다. 즉 공감은 하되 결론은 제시해야 합니다. 그래야 고객이 안심하고 따라옵니다.`,FC_A:`이 상황애서 OOO님은 분위기를 부드럽게 만듭니다. 표정이 밝고 말투가 친근하며, 설명은 논리적으로 차분하게 이어집니다. 그래서 응대는 무리하지 않고 이해를 돕는 방향으로 갑니다. “충분히 생각해 보셔도 됩니다. 대신 지금 조건이 왜 필요한지 다시 한번 정리해 드릴게요.”처럼 감정과 이성을 함께 사용합니다. 고객은 부담은 덜하지만 설득력은 있다고 느낍니다.

하지만 결정의 순간에도 설명을 더 해 주려는 경향이 있습니다. 한 번 더 이해시키면 되겠지라고 생각합니다. 그래서 고객이 미루는 말을 하면 바로 닫기보다 추가 설명이나 자료로 들어갈 가능성이 큽니다. 상담은 좋았는데 마지막 문을 닫는 힘이 약해질 수 있습니다.

이때 고객의 마음은 거의 다 왔습니다. 필요성도 알고 있고 맞는 선택이라는 것도 압니다. 다만 책임지는 느낌이 부담돼서 시간을 벌고 싶어 합니다.  OOO님이 더 설명을 하게 되면 편하게 뒤로 빠질 수 있다고 느끼기도 합니다.

코칭 포인트는 충분히 이해했다는 전제를 깔고 선택만 남기는 것입니다. 즉 이미 분석은 충분히 되었으니 이제는 선택을 도와주고 방향을 잡아 줘야 합니다. 그래야 고객이 안심하고 따라옵니다.`,FC_AC:`이 상황애서 OOO님은 표정이 좋고 공감이 빠릅니다. 고객의 눈빛, 말끝, 망설임을 잘 읽습니다. 그래서 밀어붙이기보다 맞춰 주는 방식으로 움직입니다. “네, 충분히 상의해 보셔야죠.” “부담되실 수 있어요.” 같은 말이 자연스럽게 먼저 나옵니다. 고객은 편안함을 느끼고 좋은 사람이라고 생각합니다.

하지만 바로 그 편안함 때문에 결정이 늦어지기도 합니다. OOO님의 마음속에는 고객이 불편해하면 안 된다는 생각이 큽니다. 그래서 확정 질문 대신 한 발 물러나는 선택을 하기가 쉽습니다. 괜히 강하게 말했다가 관계가 멀어질까 걱정도 됩니다.

이때 고객의 마음은 어떤 상태일까요. 사실은 대부분 가입 쪽으로 많이 기울어 있습니다. 필요성도 이해했고 조건도 나쁘지 않다는 걸 압니다. 다만 누가 등을 살짝 밀어 주면 좋겠다는 상태입니다. 

코칭의 핵심은 공감 후 전환입니다. 따뜻함은 이미 충분합니다. 이제는 방향을 잡아줘야 합니다. 친절은 유지하되 결론을 제시해야 합니다. 그래야 고객이 안심하고 따라옵니다.`,AC_CP:`이 상황애서 OOO님은 고객의 반응을 기가 막히게 읽습니다. 표정, 호흡, 말의 속도를 보면서 지금 밀어도 되는지, 멈춰야 하는지를 빠르게 판단합니다. 동시에 기준이 분명합니다. 필요하면 말해야 한다고 생각합니다. 그래서 속마음은 ‘지금 결정할 타이밍인데’라고 느끼고 있습니다. 다만 괜히 부담 줄까 봐 순간 조절을 합니다.

응대는 보통 이렇게 나옵니다. “네, 상의해 보셔야죠.”라고 받아 주면서도 속에서는 오늘 끝내고 싶습니다. 그래서 말투는 부드러운데 내용은 점점 결론 쪽으로 갑니다. 고객은 존중받는 느낌을 받으면서도 살짝 압박도 같이 느낍니다. 나쁘지 않은 긴장입니다.

이때 고객의 마음은 완전 거절이라기보다 도망갈 출구를 만드는 상태입니다. 확신은 있는데 책임을 미루고 싶은 겁니다. 누가 괜찮다고 등을 밀어 주면 결정할 준비가 되어 있습니다.

코칭의 핵심은 공감 후 전환입니다. 따뜻함은 이미 충분합니다. 이제는 방향을 잡아줘야 합니다. 친절은 유지하되 결론을 제시해야 합니다. 그래야 고객이 안심하고 따라옵니다.`,AC_NP:`이 상황애서 OOO님은 고객의 반응을 잘 읽습니다. 표정이 굳었는지, 마음이 흔들리는지, 진짜 미루려는 건지 감으로 빠르게 느낍니다. 그리고 기본 마음은 ‘고객이 편해야 한다’입니다. 무리하게 몰아붙이기보다는 보호해 주고 싶습니다. 그래서 속으로는 아쉽지만 관계를 깨고 싶지 않은 마음이 먼저 올라옵니다.

응대는 부드럽습니다. “그러실 수 있죠, 충분히 이해합니다.”라고 안정감을 줍니다. 고객은 이 말을 들으며 경계가 풀립니다. 대신 방향을 못 잡아 주면 대화가 길어지거나 자연스럽게 다음으로 밀릴 수 있습니다. 좋게 말하면 배려, 나쁘게 말하면 결단이 약해질 수 있는 순간입니다.

이때 고객의 마음은 사실 완전 거절이라기보다 불안 회피에 가깝습니다. 누군가 대신 괜찮다고 말해 주면 움직일 수 있는데, OOO님이 같이 망설이게 되면 그냥 미루는 쪽을 선택합니다.

코칭의 핵심은 공감 후 전환입니다. 따뜻함은 이미 충분합니다. 이제는 방향을 잡아줘야 합니다. 친절은 유지하되 결론을 제시해야 합니다. 그래야 고객이 안심하고 따라옵니다.`,AC_A:`이 상황애서 OOO님은 고객의 반응을 기가 막히게 읽습니다. 표정, 호흡, 말의 속도를 보면서 지금 밀어도 되는지, 멈춰야 하는지를 빠르게 판단합니다. 동시에 기준이 분명합니다. 필요하면 말해야 한다고 생각합니다.상황을 굉장히 빨리 파악합니다. 고객이 왜 미루는지, 진짜 고민인지 단순한 회피인지 분위기로 느낍니다. 그리고 마음속에서는 감정보다 “합리적으로 맞는가”를 계산합니다. 괜히 압박했다가 불편해지는 것이 걱정이 되어 조심하면서도, 논리적으로는 지금이 필요하다고 판단합니다.

그래서 응대는 차분하고 정리형으로 나갑니다. 밀어붙이지는 않지만, 이유와 구조를 다시 잡아 줍니다.

이때 고객의 마음은 결정의 부담을 피하고 싶은 상태입니다. 틀린 선택을 할까 걱정되고, 혹시 모를 책임을 뒤로 미루고 싶습니다. 누군가 명확하게 정리해 주면 편해지는데, 확신을 주는 말이 약하면 그냥 연기가 됩니다.

코칭의 핵심은 공감 후 전환입니다. 따뜻함은 이미 충분합니다. 이제는 방향을 잡아줘야 합니다. 친절은 유지하되 결론을 제시해야 합니다. 그래야 고객이 안심하고 따라옵니다.`,AC_FC:`이 상황애서 OOO님은 상대 반응을 정말 잘 느낍니다. 고객이 말을 미루는 순간 공기가 달라진 걸 바로 압니다. 마음속에서는 ‘부담을 느끼시는구나, 불편하게 하면 안 되겠다’는 생각이 먼저 올라옵니다. 그래서 강하게 밀기보다 부드럽게 분위기를 풀어 주려고 합니다. 웃어 주고, 고개를 끄덕이고, 이해한다는 표정을 보내면서 관계를 지키는 쪽을 선택합니다.

응대도 따뜻합니다. “아, 충분히 그러실 수 있죠.”, “당연히 상의는 필요하시죠.” 하며 고객의 마음을 안심시킵니다. 고객은 압박받지 않으니 편해집니다. 하지만 동시에 ‘오늘 안 해도 되겠다’는 출구도 같이 열립니다. 편안하지만 결정은 멀어질 수 있습니다.

이때 고객의 마음은 사실 틀릴까 봐 두려운 상태입니다. 누가 대신 확신을 조금만 얹어 주면 움직일 준비는 되어 있습니다. 그런데 OOO님이 배려에 집중하면, 고객은 계속 생각해 보겠다고 뒤로 갑니다.

코칭의 핵심은 공감 후 전환입니다. 따뜻함은 이미 충분합니다. 이제는 방향을 잡아줘야 합니다. 친절은 유지하되 결론을 제시해야 합니다. 그래야 고객이 안심하고 따라옵니다.`},cm7:{},cm8:{CP:{encourage:`리더의 첫 번째 책임은 현실을 정의하는 것이다.
— 맥스 드프리, "Leadership Is an Art"`,improve:`사람들은 당신이 얼마나 관심을 갖는지 알기 전까지, 당신이 얼마나 아는지에 관심 없다.
— 시어도어 루스벨트`},NP:{encourage:`관심을 기울이는 것은 가장 희귀하고 순수한 형태의 관대함이다.
— 시몬 베유`,improve:`명확한 것이 친절한 것이다. 불명확한 것이 불친절한 것이다.
— 브레네 브라운, "Dare to Lead"`},A:{encourage:`간단하게 설명할 수 없으면, 충분히 이해한 것이 아니다.
— 알베르트 아인슈타인`,improve:`사람들은 당신이 한 말은 잊어도, 당신이 느끼게 한 감정은 잊지 않는다.
— 마야 안젤루`},FC:{encourage:`열의 없이 위대한 것이 성취된 적은 없다.
— 랄프 왈도 에머슨`,improve:`자유란 책임을 의미한다. 그래서 대부분의 사람들이 자유를 두려워한다.
— 조지 버나드 쇼`},AC:{encourage:`세상에서 가장 부드러운 것이 세상에서 가장 단단한 것을 이긴다.
— 노자, 도덕경 43장`,improve:`내가 나를 위하지 않으면, 누가 나를 위하겠는가.
— 힐렐, 탈무드 피르케이 아보트`}}},dl={job_type:`manager`,job_label:`관리자`,cm1:{"17-20":{CP:`주장이 강함, 단호함, 책임감 강함, 밀어붙임, 기준과 통제가 높음.`,NP:`탁월한 공감능력, 강한 배려심, 보호본능, 신뢰형성`,A:`강한 분석력과 판단력, 명확성, 객관성, 높은 이성`,FC:`아주 밝음, 활발함, 표현 풍부, 친근함, 에너지, 다소 가벼움.`,AC:`순응, 눈치, 조심, 맞춤형, 불안.`},"14-16":{CP:`결정력 있음, 믿음직한, 판단이 빠름, 기준과 통제가 있음.`,NP:`공감 잘함, 배려 깊음, 따뜻함, 신뢰감 있음, 안정적.`,A:`이성적, 균형감, 현실적, 분석적.`,FC:`밝음, 친화력, 유연함, 편안함, 자연스러움.`,AC:`협조, 적당한 순응, 적당한 눈치, 조율.`},"11-13":{CP:`균형감 있는 결정력, 유연한 기준과 통제, 보통의 주장성.`,NP:`적당한 친절, 예의 바름, 부담 없음.`,A:`평균적 분석, 보통의 현실감각, 보통의 이성과 상황 판단.`,FC:`안정감, 차분한, 균형감, 무난함.`,AC:`적응력, 균형감, 무난함, 순응과 직설의 중용.`},"8-10":{CP:`완화된 결정력과 주장성, 조금 망설임, 조율함.`,NP:`차분함, 무심해 보임, 실무형, 표현 적음.`,A:`감정이 우선, 계산이 다소 약함, 판단이 조금 흔들림.`,FC:`조용함, 신중함, 진지함, 다소 거리감`,AC:`독립적, 솔직함, 직설적, 자기 기준.`},"0-7":{CP:`우유부단, 착함, 결정 어려움, 말을 아낌.`,NP:`무뚝뚝함, 공감 부족, 차갑게 보임.`,A:`감정 몰임, 즉각 반응, 예술적, 판단과 논리가 조금 부족`,FC:`무표정, 감정 절제, 경직됨, 딱딱함.`,AC:`단호함, 직선적, 눈치 안 봄, 상대를 통제.`}},cm2:{"17-20":{CP:`기준과 원칙이 아주 분명합니다. 면담 자리에서 말과 자세가 단정하고 자신감이 있습니다. “이 부분은 꼭 필요합니다”, “이렇게 하셔야 성과가 납니다”처럼 단호하게 말합니다. 구성원들이 망설이면 방향을 잡아 주려는 마음이 강합니다. 다만 너무 확신에 찬 말투 때문에 구성원들이 압박을 느낄 수 있습니다.`,NP:`구성원들을 향한 마음의 온도가 매우 높습니다. 구성원들의 말을 들으면 먼저 이해하려 하고, 판단보다 공감을 앞세웁니다. 그래서 구성원들은 이분과 상담할 때 편안함을 느끼고, 자신의 이야기를 솔직하게 꺼내도 괜찮겠다는 신뢰를 갖게 됩니다. 힘든 상황에서도 끝까지 함께해 줄 사람이라는 확신을 주는, 관계의 기반을 만드는 따뜻한 힘이 있습니다.`,A:`구성원들과의 상담에서 감정에 치우치지 않고 사실과 흐름을 차분히 정리하는 능력이 뛰어납니다. 복잡한 조건 속에서도 핵심을 잡아 주기 때문에 구성원들은 방향을 잃지 않습니다. 설명은 명확하고 판단은 균형 잡혀 있어, 구성원들에게 안정감과 전문성을 동시에 느끼게 합니다. 믿고 맡길 수 있는 사람이라는 확신을 만드는 힘입니다.`,FC:`구성원들을 만나는 걸 정말 즐깁니다. 면담할 때 표정이 밝고 마음이 열려 있으며, 먼저 웃으며 말을 겁니다. 구성원들 이야기에 고개를 끄덕이고 반응이 빠릅니다. 말투는 부드럽고 친근해서 “아, 그런 상황이셨군요”처럼 공감부터 합니다. 다만 분위기가 너무 가벼워 보이면 중요한 코칭이 가볍게 느껴질 수 있어 조절이 필요합니다.`,AC:`구성원들의 표정과 말투를 아주 민감하게 살핍니다. 구성원들이 불편해할까 봐 먼저 조심하고, 맞춰 주는 태도가 강합니다. 말할 때도 “괜찮으시면요”, “부담되시면 안 하셔도 돼요” 같은 표현을 자주 씁니다. 구성원들 기분은 잘 읽지만, 본인 의견을 끝까지 말하지 못해 코칭이 흐려질 수 있습니다.`},"14-16":{CP:`책임감 있고 믿음직한 태도를 보입니다. 면담할 때 흐트러짐 없이 차분하게 코칭하고, 중요한 포인트를 분명히 짚어 줍니다. 말투는 또렷하지만 공격적이지 않고 “이 기준으로 보시면 이해가 쉬워요”처럼 안내합니다. 구성원들은 리더를 통해 안정감과 신뢰를 느끼기 쉽습니다.`,NP:`따뜻하면서도 안정감 있게 구성원들을 대합니다. 구성원들 이야기를 잘 들어주고 고개를 끄덕이며 공감해 줍니다. 말투는 부드럽고 “그렇게 느끼실 수 있어요”, “많이 고민되셨죠” 같은 표현을 자연스럽게 씁니다. 필요할 때는 조심스럽게 방향을 제시해 구성원들이 혼자 결정한다고 느끼게 해줍니다. 신뢰받기 쉬운 태도입니다.`,A:`감정보다 이성과 논리로 코칭합니다. 구성원들 이야기를 차분히 듣고, 필요한 정보만 골라 쉽게 코칭합니다. “걱정되실 수 있어요. 그래서 이 상황에서는 이렇게 해 봅시다”처럼 짧게 공감을 한 후에 코칭을 합니다. 말투가 안정적이고 판단이 흔들리지 않아 구성원들이 신뢰하기 쉽습니다. 가장 이상적인 면담 태도입니다.`,FC:`편안한 분위기를 자연스럽게 만듭니다. 자세는 안정적이고 표정도 부드러워 구성원들이 긴장을 풀기 쉽습니다. 말할 때는 웃음과 공감을 섞어 “편하게 생각하셔도 됩니다”라고 말합니다. 분위기는 밝고 과하지 않아 면담이 부담스럽지 않습니다.`,AC:`상황을 보며 말을 고르는 편입니다. 구성원들 반응을 보면서 속도를 조절하고, 무리하게 밀지 않습니다. “이 부분은 ㅇㅇ님 상황에 맞춰 생각해 보셔도 돼요”처럼 부드럽게 말합니다. 배려와 안정감은 주지만, 결정이 늦어질 수 있습니다.`},"11-13":{CP:`상황에 맞게 유연하게 대응합니다. 자기 의견도 있지만 구성원들 말도 잘 듣습니다. 면담에서는 “제 생각은 이렇지만, ㅇㅇ님 상황도 중요합니다”처럼 균형 잡힌 말을 합니다. 강하게 밀어붙이지도, 너무 물러서지도 않아 편안한 면담이 됩니다. 구성원들은 부담 없이 코칭을 받아들입니다.`,NP:`구성원들에게 예의 있게 대하고 필요한 코칭을 차분히 합니다. 말은 짧고 정리되어 있으며 “이 부분은 이렇게 보시면 돼요”처럼 담백한 표현을 씁니다. 공감도 하지만 과하지 않아 면담이 깔끔하게 끝납니다. 구성원들은 부담 없이 코칭을 듣는 느낌을 받습니다.`,A:`상황에 따라 감정과 논리를 오가며 면담합니다. 구성원들 반응을 보며 코칭을 조절하고, 너무 딱딱하지도 너무 감정적이지도 않습니다. “이렇게 생각하실 수 있는데, 현실적으로 보면 이 방법이 좋아요”처럼 말합니다. 무난하지만 결정이 조금 늦어질 수 있어 정리 멘트가 필요합니다.`,FC:`무난하고 차분한 태도를 보입니다. 자세는 바르고 표정은 안정적입니다. 말투는 또렷하지만 감정 표현은 많지 않습니다. “이 부분을 코칭드리겠습니다”처럼 코칭 중심으로 말합니다. 편하지도 불편하지도 않은 느낌을 주며, 구성원들은 안정감을 느끼며 “이 분은 전문가 답다"라고 느낌`,AC:`구성원들 눈치도 보고 자기 생각도 말할 줄 압니다. 분위기가 무겁지 않게 유지하면서도 필요한 코칭은 분명히 합니다. “이건 장단점이 있어요. ㅇㅇ님께 맞는 쪽을 같이 보죠”처럼 균형 잡힌 말투를 씁니다. 구성원들도 부담 없이 듣습니다.`},"8-10":{CP:`구성원들을 존중하면서도 자기 생각을 조금씩 말할 수 있습니다. 면담할 때 “제 경험으로 보면 이 방법이 더 안전해요”처럼 조심스럽게 방향을 제시합니다. 구성원들을 몰아붙이지는 않지만, 완전히 맡기지도 않습니다. 다만 확신이 조금은 약해 보여서 구성원들이 결정을 미루는 경우가 가끔 생기기도 합니다.`,NP:`구성원들을 존중하긴 하지만 말수가 많지 않고 표정도 차분합니다. 면담에서는 코칭 위주로 말하며 “이 내용은 이런 구조입니다”처럼 사실 중심으로 이야기합니다. 공감 표현은 적어 다소 차갑게 느껴질 수 있지만, 일은 또렷하게 진행됩니다. 구성원들에 따라 거리감이 느껴질 수 있습니다.`,A:`구성원의 이야기를 잘 듣고 이해하려고 노력합니다. 다만 코칭 과정에서 사실 확인이나 원인 분석보다 다소 감정적인 해석이나 경험 중심의 판단에 의존하는 경우가 있어, 문제의 원인과 해결 방법을 한 번 더 정리하는 습관이 필요합니다.`,FC:`조용하고 진지한 모습이 강합니다. 면담 중 말수가 적고 표정 변화도 크지 않습니다. 자세는 단정하지만 다소 굳어 보일 수 있습니다. 말할 때는 필요한 말만 짧게 하며 감정 표현이 거의 없습니다. 구성원들은 신뢰는 느끼지만 “조금 신중하다”고 느낄 수 있습니다.`,AC:`구성원들 반응에 크게 흔들리지 않습니다. 자기 기준으로 차분하게 코칭하고, 필요하면 직설적으로 말합니다. “이 내용은 이렇게 해야 맞습니다”처럼 간단히 말합니다. 솔직해서 신뢰는 주지만, 예민한 구성원들에게는 조금은 차갑게 느껴질 수 있어서 이 점만 주위하면 됩니다.`},"0-7":{CP:`자기 기준을 강하게 내세우지 않습니다. 면담할 때 구성원들 말을 먼저 듣고, 웬만하면 반대하지 않습니다. “ㅇㅇ님 생각이 맞아요”, “원하시는 대로 하셔도 됩니다”라는 말을 자주 합니다. 분위기는 편하지만, 구성원들이 “그래서 뭘 선택해야 하지?” 하고 헷갈릴 수 있습니다. 방향을 잡아주는 힘은 약한 편입니다.`,NP:`상대가 느끼기에 다소 차갑게 보일 수 있습니다. 상담할 때도 바로 본론으로 들어가며 “필요한 것만 말씀드리겠습니다”라는 식의 말투를 씁니다. 위로나 공감보다는 정보 전달이 중심입니다. 구성원들은 정확하다고 느낄 수 있지만, 마음을 이해받는 느낌은 적을 수 있습니다. 친절해 보이지 않는다는 오해를 받을 수 있습니다.`,A:`구성원과 편안하게 소통하는 장점이 있습니다. 다만 코칭 과정에서 감정적인 판단이나 개인 경험을 사실보다 우선하는 경우가 있어, 이유와 근거를 함께 확인하는 습관을 갖는다면 코칭의 신뢰도가 더욱 높아질 수 있습니다.`,FC:`감정을 거의 드러내지 않습니다. 표정이 굳어 있고 몸도 긴장돼 보일 수 있습니다. 말투는 건조하고 코칭 위주이며 공감 표현이 적습니다. 구성원들이 말을 해도 반응이 적어 “내 말이 전달됐나?”라고 느낄 수 있습니다. 신뢰는 줄 수 있지만 거리감이 커질 가능성이 있습니다.`,AC:`남의 시선을 크게 신경 쓰지 않습니다. 구성원들 눈치를 거의 보지 않고 자기 생각대로 말합니다. “이게 제일 합리적입니다”처럼 단정적인 표현이 많습니다. 자신감은 느껴지지만, 구성원들이 압박을 느끼는 경우가 발생할 수 있습니다.`}},cm3:{CP_NP:`OOO님은 조직이 기대하는 리더의 가장 이상적인 모습을 가지고 있습니다.
왜냐하면 기준을 세우는 힘과 사람을 끝까지 품는 마음을 함께 갖추고 있기 때문입니다.

구성원들은 무엇을 해야 하는지, 어디로 가야 하는지, 지금 내가 잘 가고 있는지 알고 싶어 합니다.
리더는 애매한 표현 대신 분명한 방향을 제시합니다. 해야 할 것과 하지 말아야 할 것을 또렷하게 말해 주기 때문에 조직은 혼란이 줄어듭니다. 기준이 명확하면 사람은 안정감을 느끼고, 안정감 속에서 실력이 자랍니다.

동시에 리더는 사람을 쉽게 놓지 않습니다.
성과가 부족한 날에도 이유를 먼저 묻고, 다시 해볼 수 있도록 기회를 줍니다.
혼내기보다 붙잡아 주는 시간이 많기 때문에 구성원들은 마음으로 충성하게 됩니다.
“이분 밑에서라면 다시 한번 해보고 싶다”라는 생각이 자연스럽게 생깁니다.

회사의 정책을 존중하면서도 현장의 마음을 이해하고, 현장의 어려움을 알면서도 원칙을 무너지게 두지 않습니다.
그래서 위에서는 신뢰하고, 아래에서는 의지합니다.

단단한 기준과 따뜻한 보호가 함께 있는 리더.
조직이 오래가고 커질 수밖에 없는 이유가 바로 여기에 있습니다.`,CP_A:`OOO님은 조직을 안정적으로 성장시키는 리더가 갖추어야 할 두 개의 기둥을 단단히 가지고 있습니다. 하나는 기준을 세우는 힘, 또 하나는 흔들리지 않고 판단하는 힘입니다.

조직에서 사람들이 가장 불안해지는 순간은 “그래서 어떻게 해야 하지?”가 보이지 않을 때입니다. 리더는 그 질문을 오래 남겨두지 않습니다. 무엇이 맞는지, 어디로 가야 하는지, 지금 선택이 왜 필요한지를 분명하고 논리적으로 설명해 줍니다. 그래서 구성원들은 감정에 휩쓸리기보다 방향을 보고 움직이게 됩니다.

성과에 대해서도 마찬가지입니다. 결과가 좋으면 이유를 분석해 다시 재현할 방법을 찾고, 부족하면 감정 대신 데이터를 보며 해결책을 만듭니다. 변명보다 개선이 먼저 나오는 문화가 만들어집니다.

그러면서도 이 기준은 차갑지 않습니다. 누구를 자르기 위한 기준이 아니라, 함께 올라가기 위한 기준이기 때문입니다. 사람을 보호하기 위해 원칙을 세우고, 오래 가기 위해 방향을 반복합니다.

회사가 원하는 틀 안에서 움직이되, 현장이 이해할 수 있는 언어로 풀어 주는 리더.
위에서는 믿고 맡기고, 아래에서는 따라가고 싶어지는 이유가 바로 여기에 있습니다.

원칙과 판단이 만났을 때, 조직은 비로소 흔들리지 않는 힘을 갖게 됩니다.`,CP_FC:`OOO님은 강한 기준과 살아 있는 에너지를 동시에 갖춘 리더입니다. 조직은 규칙만으로 움직이지도 않고, 분위기만으로 성장하지도 않습니다. 그런데 이 두 요소가 한 사람 안에서 함께 나오면 이야기가 달라집니다.

먼저 기준을 분명히 세웁니다. 무엇을 해야 하고, 무엇은 하지 말아야 하는지 모호하게 두지 않습니다. 그래서 구성원들은 헷갈리지 않습니다. 실적에 대해서도 책임의 선을 또렷하게 긋습니다. 노력의 방향이 틀어지지 않도록 중심을 잡아 줍니다.

동시에 분위기를 움직입니다. 무거운 목표 앞에서 주저앉지 않도록, 다시 해보자고 말할 힘을 만듭니다. 사람들은 단지 지시를 따르는 것이 아니라, 함께 해보고 싶다는 마음으로 따라가게 됩니다. 이 차이가 큽니다.

회사의 정책 역시 딱딱하게 전달되지 않습니다. 현장이 받아들일 수 있는 온도로 풀어 주고, 어려운 내용도 실행 가능한 말로 바꿉니다. 그래서 위에서는 신뢰하고, 아래에서는 납득합니다.

원칙이 방향을 만들고, 에너지가 속도를 만듭니다.
이 두 가지를 동시에 가진 리더 밑의 조직은 결국 멀리 갑니다.

사람들은 강한 리더에게 복종하지 않습니다. 살아 있는 리더를 따라갑니다.`,CP_AC:`OOO님은 원칙을 세우는 힘과 조직의 흐름을 읽는 감각을 함께 가진 리더입니다. 기준을 말할 줄 알고, 동시에 그 기준이 현장에서 어떻게 받아들여질지도 생각합니다. 그래서 말 한마디, 결정 하나가 가볍지 않습니다.

무엇이 맞는지 분명하게 이야기합니다. 해야 할 일과 하지 말아야 할 일을 정확히 알려 주기 때문에 구성원들은 흔들리지 않습니다. 목표가 생기면 돌아가지 않고 곧게 갑니다. 실적에 대해서도 책임을 피하지 않습니다. 리더가 중심을 잡고 있으니 조직은 안심하고 움직입니다.

또 하나의 힘은 조직과 회사의 방향을 민감하게 맞출 수 있다는 점입니다. 위에서 원하는 메시지를 정확히 이해하고, 아래 사람들이 받아들일 수 있는 언어로 전달합니다. 그래서 위에서는 믿고 맡기고, 아래에서는 따르려 합니다.

사람을 품는 방식도 특별합니다. 무조건 감싸기보다, 기준 안에서 보호합니다. 잘될 수 있는 길을 벗어나지 않게 붙잡아 주는 어른 같은 역할을 합니다.

원칙이 무너지지 않으면서도 관계가 깨지지 않는 조직,
그 균형을 만들 수 있는 사람이 바로 이런 리더입니다.`,NP_CP:`OOO님은 사람을 살리면서도 기준을 무너지지 않게 만드는 리더입니다. 따뜻함과 원칙이 함께 움직입니다. 그래서 조직은 편안하지만 느슨해지지 않습니다.

구성원의 어려움을 먼저 알아보고 손을 내밀 줄 압니다. 힘들어하는 사람을 외면하지 않고, 다시 일어설 수 있도록 곁에서 도와줍니다. 그래서 구성원들은 “리더는 우리 편”이라고 느낍니다. 그 신뢰가 조직의 바닥을 단단하게 만듭니다.

동시에 해야 할 일에 대해서는 분명합니다. 목표, 방향, 책임을 또렷하게 제시합니다. 잘하고 못하고의 기준을 명확히 알려 주기 때문에 조직은 어디로 가야 하는지 헷갈리지 않습니다. 따뜻하지만 흐리지 않습니다. 배려하지만 물러서지 않습니다.

회사 정책을 받아들이는 태도 또한 안정적입니다. 왜 필요한지 이해하고, 사람들에게 납득이 가도록 풀어 줍니다. 그래서 위에서는 신뢰하고, 아래에서는 존중합니다.

사람을 품는 마음 위에 기준을 세우는 힘이 더해질 때,
조직은 오래가고 결과는 자연스럽게 따라옵니다.`,NP_A:`OOO님은 마음을 품으면서도 흔들리지 않는 판단을 내릴 수 있는 리더입니다. 따뜻함이 바탕이 되지만 운영은 냉정하고, 배려를 하면서도 방향을 잃지 않습니다. 그래서 조직은 편안함 속에서 안정감을 느낍니다.

구성원의 이야기를 충분히 들어주고, 어려움을 이해해 주며, 사람을 먼저 생각합니다. 누군가 실수를 해도 바로 문제를 삼기보다 어떻게 다시 세울 수 있을지를 고민합니다. 그 과정에서 신뢰가 쌓이고, 사람들은 스스로 책임지고 싶어집니다.

하지만 정에만 머물지 않습니다. 숫자와 현실을 분명히 봅니다. 무엇이 가능한지, 무엇을 바꿔야 하는지, 어떤 선택이 조직에 이익인지를 차분하게 판단합니다. 그래서 목표가 감정에 흔들리지 않고 꾸준히 앞으로 나아갑니다.

회사 정책이 내려오면 무조건 밀어붙이기보다, 왜 필요한지 이해하고 납득 가능한 언어로 풀어 전달합니다. 구성원은 존중받는다고 느끼고, 본사는 실행력을 신뢰합니다.

사람을 지키는 따뜻함과
결과를 만들어내는 이성이 함께 갈 때,
조직은 오래 성장합니다.`,NP_FC:`OOO님은 사람을 사랑하는 힘과 현장을 움직이게 하는 활력을 동시에 가진 리더입니다. 조직을 관리한다는 느낌보다 함께 뛰어준다는 느낌을 주기 때문에 구성원들의 마음이 자연스럽게 열립니다.

누군가 힘들어하면 먼저 다가가 안부를 묻고, 성과가 부족해도 가능성을 보며 다시 도전할 용기를 줍니다. 혼내기보다 격려가 앞서고, 지적보다 응원이 많습니다. 그래서 사람들은 “이 조직에 남고 싶다”는 마음을 갖게 됩니다.

여기에 밝은 에너지와 친근함이 더해지면 분위기가 살아납니다. 무거워질 수 있는 목표와 실적 이야기도 부담이 아니라 함께 해보자는 제안으로 들립니다. 구성원은 압박을 느끼기보다 참여하고 싶어집니다.

방향을 제시할 때도 딱딱한 명령이 아니라 꿈을 보여주듯 설명합니다. 회사 정책 역시 “해야 한다”가 아니라 “우리에게 도움이 된다”는 언어로 전달합니다. 그러니 저항보다 협력이 일어납니다.

사람을 품는 따뜻함과
사람을 움직이게 하는 생동감이 만나면,
조직은 떠밀려 가는 곳이 아니라
스스로 뛰고 싶은 무대가 됩니다.`,NP_AC:`OOO님은 사람을 먼저 생각하는 마음과 조직의 흐름을 읽는 감각이 함께 움직이는 리더입니다. 구성원을 대할 때 계산보다 배려가 앞서고, 성과를 요구하기 전에 마음을 살핍니다. 그래서 구성원은 보호받고 있다는 안정감을 느끼며 자연스럽게 신뢰를 보냅니다.

또한 조직의 분위기와 회사의 방향을 민감하게 읽어내기 때문에 위와 아래를 부드럽게 이어주는 연결자가 됩니다. 정책이 내려오면 현장의 언어로 풀어 전달하고, 현장의 어려움은 정제해 위로 올립니다. 덕분에 조직은 불필요한 충돌 없이 한 방향으로 움직일 수 있습니다.

사람을 품는 힘이 크기 때문에 누구 하나 쉽게 포기하지 않습니다. 부족해 보여도 기다려주고, 실수해도 다시 기회를 줍니다. 그 과정에서 구성원은 마음의 빚을 느끼고 더 잘하고 싶어집니다. 이것이 결국 성과로 이어집니다.

강하게 밀어붙이지 않아도 사람들이 따르는 이유, 명령하지 않아도 조직이 움직이는 이유는 따뜻함 속에서 느끼는 책임감 때문입니다.

이 리더 곁에 있으면
사람은 버텨지고,
조직은 단단해지며,
방향은 자연스럽게 하나로 모입니다.`,A_CP:`OOO님은 냉정한 판단과 분명한 기준으로 조직을 세우는 리더입니다. 감정이나 분위기에 흔들리기보다 무엇이 옳은지, 무엇이 필요한지를 먼저 생각합니다. 그래서 방향을 정할 때 망설임이 적고, 결정에는 힘이 실립니다. 구성원들은 그 단단함 속에서 “이 길을 따라가면 된다”는 확신을 얻습니다.

또한 기준을 말로만 두지 않고 실제 행동으로 보여 줍니다. 목표를 세우면 왜 필요한지 설명하고, 방법을 정하면 끝까지 관리합니다. 이 과정에서 조직은 점점 정리되고, 흐트러짐 없이 움직이게 됩니다. 성과가 좋아질 수밖에 없는 구조가 만들어집니다.

회사 정책과 전략을 받아들일 때도 단순 전달이 아니라 이유와 목적을 해석해 현장에 맞게 정리합니다. 그래서 구성원은 억지로 따른다는 느낌보다 이해하고 납득하며 움직입니다.

강한 기준은 차갑기 위한 것이 아니라
모두가 헤매지 않도록 하기 위한 배려입니다.

이 리더와 함께하면
방향은 선명해지고,
책임은 분명해지며,
조직은 자연스럽게 성장합니다.`,A_NP:`OOO님은 이성으로 길을 찾고, 마음으로 사람을 붙잡는 리더입니다. 방향을 정할 때 감정에 휘둘리지 않고 현실을 정확히 봅니다. 무엇이 가능하고 무엇이 위험한지 차분하게 판단하기 때문에 조직은 불안하지 않습니다. 동시에 사람을 숫자로만 보지 않습니다. 한 명 한 명의 상황을 이해하고, 어려움이 있으면 먼저 손을 내밉니다.

그래서 구성원은 이렇게 느낍니다.
“우리 리더는 냉정하지만 차갑지 않다.”

목표를 세울 때는 근거를 설명해 납득하게 만들고, 실적을 이야기할 때는 방법을 함께 고민합니다. 못한 부분을 탓하기보다 다음에 잘할 수 있는 길을 알려 줍니다. 그러니 사람들은 자존심이 상하지 않고 다시 도전할 힘을 얻습니다.

회사 정책이 내려오면 무조건 밀어붙이지 않습니다. 왜 필요한지 풀어 설명하고, 현장에서 어떻게 적용하면 좋을지 함께 생각합니다. 그 과정에서 구성원은 존중받고 있다고 느끼며 더 깊이 따르게 됩니다.

판단은 단단하고,
마음은 따뜻합니다.

그래서 이 리더의 조직은
억지로 움직이지 않아도
스스로 앞으로 나아갑니다.`,A_FC:`OOO님은 냉정한 판단 위에 따뜻한 활력을 더하는 리더입니다. 방향을 잡을 때는 숫자와 현실을 분명히 보고, 왜 이 길로 가야 하는지를 이해하기 쉽게 설명합니다. 그래서 조직은 막연히 끌려가는 느낌이 아니라, 이유를 알고 스스로 움직이게 됩니다.

동시에 분위기를 살리는 힘이 있습니다. 무거워질 수 있는 목표도 다시 해볼 만한 도전으로 바꾸고, 지친 마음에 웃음을 넣어 줍니다. 사람들은 “힘들지만 같이 가보고 싶다”는 마음이 생깁니다.

실적을 책임지는 자리에서 가장 어려운 일은 압박과 격려의 균형인데, 이 리더는 그 균형을 자연스럽게 만듭니다. 기준은 분명히 제시하되, 방법에서는 숨을 쉴 공간을 줍니다. 그러니 구성원은 통제받는 느낌보다 신뢰받는 느낌을 더 크게 받습니다.

회사 정책이 내려와도 딱딱하게 전달하지 않습니다. 현장에서 살아 움직이도록 풀어주고, 할 수 있는 그림으로 바꿔 줍니다. 그래서 조직은 변화를 부담이 아니라 기회로 받아들입니다.

이성으로 길을 밝히고,
에너지로 사람을 일으키는 리더.

그래서 이 조직에서는
포기가 오래 머물지 못합니다.`,A_AC:`OOO님은 현실을 정확히 읽으면서도 조직의 흐름을 놓치지 않는 리더입니다. 목표를 정할 때 감정이나 분위기에 흔들리기보다, 지금 우리에게 필요한 선택이 무엇인지 차분하게 판단합니다. 그래서 구성원은 “왜 이 방향으로 가는지”를 납득하게 되고, 결정에는 힘이 실립니다.

동시에 위와 아래를 함께 바라보는 균형 감각이 있습니다. 회사의 정책이 내려오면 의미를 이해하고, 현장에서 받아들일 수 있는 모습으로 조정합니다. 무조건 밀어붙이기보다 현실 속에서 작동하게 만드는 능력이 뛰어납니다. 그래서 조직은 안정감을 느낍니다.

사람을 대할 때도 섬세합니다. 누가 부담을 느끼는지, 어디에서 막히는지 빨리 알아차립니다. 덕분에 구성원은 보호받고 있다고 느끼며, 리더를 신뢰하게 됩니다. 신뢰가 생기면 실행도 따라옵니다.

실적을 책임지는 자리에서 가장 중요한 것은 방향과 조화인데, 이 리더는 두 가지를 동시에 붙잡습니다. 조직은 편안하지만 느슨하지 않고, 규율이 있지만 차갑지 않습니다.

그래서 사람들은 말합니다.
“우리 리더와 함께라면 길을 잃지 않겠다”고.`,FC_CP:`OOO님은 조직에 활력을 불어넣으면서도 기준을 분명하게 세우는 리더입니다. 분위기를 밝게 만들고 사람의 마음을 열게 하는 힘이 있습니다. 구성원은 긴장만 하는 조직이 아니라, 도전해 보고 싶어지는 구성원에 서 있다고 느낍니다. 웃음과 에너지가 돌면 움직임이 빨라지고, 결국 성과로 이어집니다.

하지만 따뜻함만 있는 리더는 아닙니다. 해야 할 일과 지켜야 할 선에서는 단단합니다. 목표를 흐리지 않고, 약속한 기준을 분명하게 이야기합니다. 그래서 조직은 자유롭지만 방향을 잃지 않습니다. 즐겁게 뛰면서도 어디로 가야 하는지 모두가 알고 있습니다.

회사 정책을 받아들일 때에도 긍정적인 에너지로 해석해 줍니다. “해야 한다”가 아니라 “이렇게 하면 우리가 더 좋아진다”로 바꾸어 말할 줄 압니다. 구성원은 부담이 아니라 기회로 듣게 됩니다.

사람을 품으면서도 책임을 놓지 않는 힘.
부드럽게 웃지만 중심은 흔들리지 않는 단단함.

그래서 사람들은 믿습니다.
“우리 리더는 즐겁게 만들지만, 결국 우리를 성장시키는 사람이다”라고.`,FC_NP:`OOO님은 사람의 마음을 먼저 따뜻하게 열 줄 아는 리더입니다. 구성원에게 다가갈 때 경직된 지시가 아니라 웃음과 관심으로 시작합니다. 그래서 구성원들은 부담보다 편안함을 먼저 느끼고, 그 편안함 속에서 자연스럽게 움직이게 됩니다. 조직은 명령으로 굴러가기보다 자발성으로 커집니다.

또한 사람을 귀하게 여기는 힘이 큽니다. 누군가 뒤처지면 이유를 먼저 살피고, 부족함을 탓하기보다 가능성을 찾아줍니다. 그래서 구성원들은 ‘혼나는 곳’이 아니라 ‘성장할 수 있는 곳’에 있다고 느낍니다. 이 믿음은 오래가고, 오래가는 마음은 결국 실적으로 돌아옵니다.

기준과 방향을 제시할 때에도 차갑지 않습니다. 왜 필요한지, 우리에게 어떤 도움이 되는지를 이해시키며 함께 가자고 손을 내밉니다. 회사의 정책 역시 압박이 아닌 보호막처럼 전달합니다.

즐거움을 만들고, 사람을 품고, 다시 도전하게 만드는 힘.
그래서 구성원은 이렇게 생각합니다.
“우리 리더와 함께라면 힘들어도 끝까지 가보고 싶다.”`,FC_A:`OOO님은 조직에 숨을 불어넣는 활력과 동시에 흔들림 없는 판단을 함께 가진 리더입니다. 분위기를 밝게 만들 줄 알기에 사람들은 가까이 다가오고 싶어 하고, 합리적으로 생각할 줄 알기에 그 결정에 신뢰를 보냅니다. 즐거움과 이성이 함께 존재하기 때문에 구성원은 지치지 않으면서도 방향을 잃지 않습니다.

기준을 세워야 할 때에는 감정이 아니라 현실을 보고 판단합니다. 무엇이 우리 조직에 필요한지, 무엇이 결과로 이어지는지 차분하게 정리해 제시합니다. 그래서 구성원은 명확함 속에서 움직일 수 있습니다. 방향을 잡아주는 사람이 있다는 안정감은 구성원을 단단하게 만듭니다.

또한 실적을 책임질 때에도 분위기를 무겁게 짓누르지 않습니다. 웃음과 격려 속에서 목표를 다시 바라보게 하고, “우리는 할 수 있다”는 감각을 회복하게 만듭니다. 회사의 정책 역시 딱딱한 규정이 아니라 이해 가능한 선택으로 풀어 전달합니다.

사람들은 이렇게 느낍니다.
“재미있게 일하지만, 결국 결과를 만드는 리더다.”`,FC_AC:`OOO님은 사람의 마음을 먼저 움직이게 만드는 힘을 가진 리더입니다. 밝은 에너지로 조직의 분위기를 부드럽게 풀어 주면서도, 상황과 환경을 빠르게 읽고 흐름에 맞추어 움직입니다. 그래서 구성원들은 부담보다 편안함을 느끼고, 통제보다 자발성을 선택하게 됩니다.

기준을 세워야 할 때 이 리더는 딱딱한 명령 대신 공감으로 설득합니다. “왜 우리가 이 방향으로 가야 하는지”를 이해시키기 때문에 구성원들은 스스로 납득하고 따라옵니다. 방향을 정할 때에도 위에서 밀어붙이는 느낌이 아니라, 함께 합의해 나가는 과정처럼 느끼게 합니다.

실적을 책임지는 자리에서도 분위기를 잃지 않습니다. 구성원들이 위축되지 않게 격려하고, 작은 성취를 발견해 다시 도전할 힘을 줍니다. 동시에 회사의 정책과 흐름을 세심하게 살피며 조직이 어긋나지 않도록 자연스럽게 맞춥니다.

그래서 사람들은 이렇게 말합니다.
“함께하고 싶고, 그래서 더 잘 해내고 싶어지는 리더다.”`,AC_CP:`OOO님은 조직의 기대와 기준을 누구보다 정확하게 읽어 내면서도, 반드시 결과로 증명해 내는 리더입니다. 위에서 요구하는 방향이 무엇인지, 회사가 중요하게 보는 가치가 무엇인지 빠르게 파악하고 그것을 현장에 분명한 언어로 전달합니다. 그래서 구성원들은 헷갈리지 않습니다. 어디로 가야 하는지, 무엇을 해야 하는지 또렷하게 보입니다.

기준을 세울 때 흔들림이 적습니다. 잘되는 방법은 지키고, 부족한 부분은 바로 잡습니다. 그 태도에서 책임감이 느껴지기 때문에 구성원들은 처음에는 긴장해도 결국 신뢰하게 됩니다. “우리 조직은 되는 방식이 있다”는 믿음이 생기기 때문입니다.

동시에 조직의 분위기와 위의 시선을 세심하게 살피는 장점이 있어, 구성원이 무리하지 않으면서도 정책의 흐름 안에서 성장하도록 이끕니다. 사람을 품되 방향을 잃지 않고, 성과를 요구하되 기준을 놓지 않는 리더. 그래서 주변에서는 이렇게 평가합니다.

“우리 조직을 안전하게, 그러나 확실하게 앞으로 가게 만드는 사람이다.”`,AC_NP:`OOO님은 조직의 흐름을 읽는 감각과 사람을 품는 따뜻함을 동시에 갖춘 리더입니다. 위에서 무엇을 요구하는지 빠르게 이해하고, 그 방향을 무리 없이 현장에 스며들게 만드는 힘이 있습니다. 억지로 밀어붙이기보다 사람들이 자연스럽게 따라오게 합니다. 그래서 구성원들은 통제받는 느낌보다 보호받는 느낌을 더 크게 받습니다.

실적을 이야기할 때조차 사람을 먼저 생각합니다. “왜 못했나”를 묻기 전에 “무엇이 어려웠나”를 살피고, 해결 방법을 함께 찾습니다. 이 과정에서 구성원들은 존중받고 있다고 느끼며 다시 일어설 용기를 얻습니다. 조직은 이런 리더 밑에서 오래 버티고, 결국 더 크게 성장합니다.

또한 회사의 정책과 기준을 가볍게 여기지 않습니다. 윗선의 의도를 헤아리고, 구성원이 그 흐름 안에서 성공하도록 다리를 놓습니다. 부드럽지만 방향은 분명한 리더, 따뜻하지만 책임을 외면하지 않는 리더. 그래서 사람들은 이렇게 말합니다.

“나를 이해해 주면서도 결국 더 나은 곳으로 이끌어 주는 사람이다.”`,AC_A:`OOO님은 조직과 회사의 흐름을 읽는 힘이 뛰어나면서도, 감정이 아닌 사실과 기준으로 판단하는 안정된 리더입니다. 위에서 내려오는 방향을 예민하게 파악하고, 그 의도를 왜 해야 하는지 이해한 뒤 구성원이 납득하도록 설명합니다. 그래서 구성원들은 억지로 끌려간다고 느끼기보다, 스스로 방향을 받아들이게 됩니다.

기준을 세울 때에도 목소리를 높이기보다 현실적인 이유를 제시합니다. “이게 맞다”가 아니라 “그래서 이렇게 가는 게 우리에게 가장 도움이 된다”고 말합니다. 그러면 사람들은 자연스럽게 움직입니다. 강압이 아닌 이해로 만드는 실행력, 이것이 가장 큰 힘입니다.

실적을 책임지는 자리에서도 감정에 치우치지 않습니다. 잘된 것은 왜 잘됐는지, 부족한 부분은 무엇을 바꾸면 좋아질지를 차분하게 짚어 줍니다. 구성원들은 혼나는 느낌보다 성장의 길을 안내받는다고 느끼게 됩니다.

회사의 정책과 현장의 상황을 연결하는 다리 역할도 탁월합니다. 위를 존중하면서 아래를 보호하는 균형, 그래서 조직은 믿고 따르게 됩니다. 사람들은 결국 이렇게 이야기합니다.

“우리 조직은 방향이 분명하고, 그래서 마음이 편하다.”`,AC_FC:`OOO님은 조직의 분위기를 읽는 섬세함과 사람의 마음을 밝히는 따뜻한 에너지를 함께 가진 리더입니다. 위의 흐름을 빠르게 감지해 회사가 원하는 방향을 놓치지 않으면서도, 현장에서는 사람들의 표정과 숨결을 먼저 살핍니다. 그래서 기준을 세울 때도 차갑게 선을 긋기보다, 함께 이해하고 따라올 수 있는 길을 만들어 줍니다.

방향을 정하는 순간에도 이 리더는 말합니다. “우리가 같이 가야 오래 간다.” 그 말 속에는 배려와 현실 감각이 동시에 담겨 있습니다. 구성원은 통제받는 느낌이 아니라 존중받는 느낌을 받습니다. 그러니 움직임이 자발적으로 살아납니다.

실적을 책임지는 자리에서도 분위기를 무겁게 짓누르지 않습니다. 오히려 할 수 있다는 희망을 불어넣고, 서로를 격려하게 만들어 구성원의 온도를 끌어올립니다. 사람을 품는 리더십이 곧 성과로 이어지는 구조를 자연스럽게 만듭니다.

회사 정책 역시 부드럽게 녹여 전달합니다. 딱딱한 지시가 아니라 “우리에게 필요한 변화”로 설명하기에 저항이 줄어듭니다. 그래서 사람들은 이렇게 느끼게 됩니다.

“이 리더와 함께라면 힘들어도 해볼 만하다.”`},cm4_1:{"17-20":{CP:`기준이 매우 분명하고 주도적이며 강하게 추진합니다.`,NP:`공감이 뛰어나고 따뜻하며 사람을 잘 챙깁니다.`,A:`객관적이고 명확하며 이성적으로 판단합니다.`,FC:`밝고 활발하며 표현력이 매우 풍부합니다.`,AC:`눈치가 빠르고 민감하며 잘 맞춰줍니다.`},"14-16":{CP:`책임감이 강하고 결단력 있으며 방향을 제시합니다`,NP:`배려심이 깊고 친절하며 신뢰를 줍니다.`,A:`현실적이고 균형감 있으며 판단이 안정적입니다.`,FC:`친근하고 자연스러우며 분위기를 잘 만듭니다.`,AC:`협조적이고 유연하며 적응력이 좋습니다.`},"11-13":{CP:`유연하게 판단하고 균형감 있으며 조율합니다.`,NP:`공감이 가능하고 무난하며 편안함을 줍니다.`,A:`무난하고 실용적이며 상황에 맞춰 판단합니다.`,FC:`차분하고 안정적이며 편안함을 줍니다.`,AC:`균형감이 있고 무난하며 조화를 이룹니다.`},"8-10":{CP:`배려가 많고 신중하며 결정을 고민합니다`,NP:`공감은 가능하지만 표현은 다소 적은 편입니다.`,A:`상황을 이해하며 다소 감정적으로 판단할 수 있습니다.`,FC:`신중하고 진지하며 표현이 절제됩니다.`,AC:`독립적이고 솔직하며 자기기준이 있습니다.`},"0-7":{CP:`조심성이 많고 겸손하며 의견을 아낍니다.`,NP:`솔직하고 직설적이며 공감표현이 약합니다.`,A:`직관과 경험을 중시하며 감정적인 판단을 하는 편입니다.`,FC:`과묵하고 조용하며 감정표현이 적습니다.`,AC:`주관이 강하고 자기 기준이 또렷합니다.`}},cm4_2:{"17-20":{CP:`조율이 필요없는 구간`,NP:``,A:``,FC:``,AC:`리더는 구성원의 표정과 반응을 세심하게 살피고 배려하는 강점이 있습니다. 다만 구성원이 부담을 느낄까 봐 필요한 기준이나 피드백을 충분히 전달하지 못하는 경우가 생길 수 있습니다. 구성원의 입장을 이해하는 것은 중요하지만, 리더는 방향도 함께 제시해야 합니다. 공감한 뒤에는 "이번에는 이렇게 해봅시다.", "지금은 이 방향으로 가는 것이 좋겠습니다."와 같이 기준과 결론을 분명하게 전달하는 연습이 필요합니다. 배려와 기준이 함께할 때 구성원의 성장과 성과는 더욱 높아질 수 있습니다.`},"14-16":{CP:``,NP:``,A:``,FC:``,AC:``},"11-13":{CP:``,NP:``,A:``,FC:``,AC:``},"8-10":{CP:`구성원을 편안하게 대하며 관계를 부드럽게 유지하는 장점이 있는 성향입니다. 다만 리더 역할에서는 기준과 결론이 약하게 전달되면 구성원들이 방향을 헷갈릴 수 있습니다. “지금은 이것부터 먼저 진행합시다”처럼 우선순위와 기준을 조금 더 분명하게 말하는 연습이 필요합니다. 부드러움 속에 기준까지 함께 전달되면 조직의 안정감과 실행력이 더욱 좋아질 수 있습니다.`,NP:`공감과 배려, 돌봄의 표현이 부족하게 보일 수 있어 구성원이 심리적 거리감을 느낄 가능성이 있습니다. 업무 지시와 설명은 분명하지만, 결과보다 먼저 사람의 마음을 살피는 태도를 조금 더 의식적으로 늘려주는 것이 중요합니다. “괜찮아요?”, “힘든 부분은 없었어요?” 같은 짧은 관심 표현만 늘어나도 구성원의 긴장감이 줄고 조직의 신뢰와 몰입도가 더욱 안정적으로 올라갈 수 있습니다.`,A:`구성원의 감정과 분위기를 이해하려는 장점은 있지만, 상황에 따라 판단과 기준이 흔들려 보일 수 있는 구간입니다. 리더 역할에서는 공감만 하기보다 결과와 우선순위를 먼저 정리해 전달하는 연습이 중요합니다. “이번에는 이 방향으로 진행하겠습니다”처럼 결론을 먼저 이야기하면 조직의 혼란이 줄고 안정감과 실행력이 더욱 좋아질 수 있습니다.`,FC:`차분하고 안정감 있는 분위기로 조직을 편안하게 만드는 장점이 있는 성향입니다. 다만 감정 표현과 리액션이 적으면 구성원에게 다소 딱딱하거나 거리감 있게 느껴질 수 있습니다. 의식적으로 미소를 띄고 고개를 끄덕이며 반응을 조금 더 표현해주는 연습이 필요합니다. 작은 표정과 따뜻한 반응이 늘어나면 조직의 분위기와 소통 안정감이 훨씬 좋아질 수 있습니다.`,AC:``},"0-7":{CP:``,NP:``,A:``,FC:``,AC:``}},cm4_3:{all_no_coaching:`OOO님은 모든 점수가 '조율이 필요 없는 구간'에 있습니다. 
다섯 가지 에고성향이 모두 조율이 필요 없는 구간에 있다는 것은 특정 성향 하나가 강한 것이 아니라, 상황에 따라 필요한 성향을 적절하게 사용할 수 있다는 의미입니다.
기준을 세워야 할 때는 분명하게 방향을 제시할 수 있고, 사람을 챙겨야 할 때는 진심으로 공감할 수 있으며, 판단이 필요한 순간에는 감정에 치우치지 않고 현실적으로 결정할 수 있습니다.
또한 분위기를 부드럽게 만들 줄 알고, 조직의 규칙과 흐름도 무리 없이 받아들이며 활용할 수 있습니다.

특히 리더에게 있어 다섯 가지 성향의 균형은 매우 중요합니다.
기준만 강하면 사람이 떠나고, 배려만 강하면 성과가 약해질 수 있습니다.
분석만 강하면 조직이 차가워지고, 관계만 중시하면 실행력이 떨어질 수 있습니다.

그러나 지금은 이러한 요소들이 한쪽으로 치우치지 않고 균형을 이루고 있기 때문에 조직은 안정감을 느끼고, 구성원은 신뢰를 가지며, 성과는 꾸준히 유지될 가능성이 높습니다.
결국 다섯 가지 성향이 모두 코칭이 필요 없는 구간이라는 것은
"리더로서 필요한 다섯 가지 기능이 모두 안정적으로 작동하고 있다"
는 의미이며,
"조직 관리, 사람 관리, 성과 관리가 특정 성향에 의존하지 않고 균형 있게 이루어지고 있다"
는 의미입니다.

⚠️ 만약 다섯 가지 성향 중 17점 이상인 항목이 있다면, 해당 성향의 에너지가 강하게 발휘되는 상태입니다. 이는 큰 강점이 될 수 있지만, 상황에 따라 상대방이 다소 과하게 느낄 수도 있습니다. 이 부분만 의식적으로 조율하면 더욱 균형 잡힌 관계와 성과에 도움이 됩니다. 
    또한 가장 낮은 성향은 성과와 인간관계에서 반복적으로 나타나는 아쉬움의 원인이 될 수 있습니다. 가장 낮은 성향을 잘 이해하고 의식적으로 활용하려는 노력이 더해지면 강점은 더욱 빛을 발하게 됩니다.`,some_coaching:``},cm4_4:{CP:{condition:`0-7`,trait:`조심성이 많고 겸손하며 의견을 아낍니다.`,coaching:`이 성향은 사람을 존중하고 배려하며 구성원이 편안하게 의견을 낼 수 있는 분위기를 만드는 장점이 있습니다. 
다만 구성원의 생각을 존중하는 마음이 큰 만큼 기준을 분명하게 제시해야 하는 순간에도 결정을 미루거나 표현을 조심스럽게 하는 경우가 있습니다. 리더는 공감도 중요하지만 방향을 정해주는 역할도 필요합니다. 의견을 충분히 들은 뒤에는 "좋은 의견입니다. 그럼 이번에는 이 방향으로 진행해봅시다.", "우선 이것부터 실행해보겠습니다." 와 같이 기준과 결론을 명확하게 전달하는 습관을 가지면 조직의 실행력이 더욱 높아질 수 있습니다.`,script:``},NP:{condition:`0-7`,trait:`솔직하고 직설적이며 공감표현이 약합니다.`,coaching:`이 성향은 감정에 흔들리지 않고 핵심을 빠르게 파악하여 현실적으로 판단하는 장점이 있습니다.
다만 바쁠수록 구성원의 감정이나 마음을 살피기보다 문제 해결과 결과 중심으로 대화를 진행하는 경우가 있습니다. 구성원은 해결책보다 먼저 이해받고 싶어 하는 경우가 많습니다. "고생 많으셨습니다.", "그 상황이면 충분히 힘들 수 있었겠네요." 와 같은 공감의 말을 먼저 건넨 후 코칭을 진행하면 구성원의 신뢰와 수용성이 더욱 높아질 수 있습니다.`,script:``},A:{condition:`0-7`,trait:`직관과 경험을 중시하며 감정적인 판단을 하는 편입니다.`,coaching:`이 성향은 풍부한 경험과 직관을 활용하여 빠르게 판단하고 실행으로 연결하는 장점이 있습니다. 
다만 바쁠수록 현재 상황을 객관적으로 분석하기보다 경험이나 느낌을 기준으로 판단하는 경우가 있습니다. 리더는 구성원에게 설명할 때도 느낌보다 사실과 근거를 중심으로 전달하는 것이 중요합니다. "현재 상황을 보면 이 부분이 가장 중요합니다.", "지금은 이 방법이 가장 효과적인 이유가 있습니다." 와 같이 이성과 판단을 바탕으로 설명하면 구성원의 이해와 실행력이 더욱 높아질 수 있습니다.`,script:``},FC:{condition:`0-7`,trait:`과묵하고 조용하며 감정표현이 적습니다.`,coaching:`이 성향은 진중하고 신뢰감 있는 태도로 구성원에게 안정감을 주는 장점이 있습니다. 
다만 바쁠수록 표정 변화나 감정 표현이 줄어들어 구성원이 거리감을 느끼는 경우가 있습니다. 좋은 의도를 가지고 있어도 표현이 부족하면 관심이 없거나 만족하지 않는다고 오해받을 수 있습니다. 의식적으로 미소를 띄고 고개를 끄덕이며 "좋습니다.", "잘하셨습니다.", "수고 많았습니다." 와 같은 긍정적인 표현을 자주 사용하면 조직 분위기와 구성원의 동기부여가 크게 달라질 수 있습니다.`,script:``},AC:{condition:`0-7`,trait:`주관이 강하고 자기 기준이 또렷합니다.`,coaching:`이 성향은 주관과 결단력이 뚜렷하며 흔들림 없이 방향을 제시하는 장점이 있습니다. 
다만 자신의 생각이 분명한 만큼 바쁠수록 구성원이 따라오는 속도까지 살피지 못하는 경우가 있습니다. 리더는 앞에서 끌고 가는 것도 중요하지만 뒤에서 따라오는 사람도 함께 봐야 합니다. 방향은 분명하게 알려주되 구성원이 이해하고 따라올 수 있는 시간을 주고, 내 기준만 말하기보다 상대가 받아들일 수 있는 속도에 맞춰 설명해야 합니다. 그렇게 해야 구성원의 신뢰와 실행력을 높이는 데 도움이 될 수 있습니다.`,script:``}},cm4_5:`OOO님께서 현재 조율 포인트를 이미 인식하고 계시고, 평소 의식적으로 말과 행동에 반영하고 계신다면 강점이 더욱 안정적으로 발휘되어 지금도 좋은 성과를 내고 계실 가능성이 높습니다.

⚠️ 만약 다섯 가지 성향 중 17점 이상인 항목이 있다면, 해당 성향의 에너지가 강하게 발휘되는 상태입니다. 이는 큰 강점이 될 수 있지만, 상황에 따라 상대방이 다소 과하게 느낄 수도 있습니다. 이 부분만 의식적으로 조율하면 더욱 균형 잡힌 관계와 성과에 도움이 됩니다.
    또한 가장 낮은 성향은 성과와 인간관계에서 반복적으로 나타나는 아쉬움의 원인이 될 수 있습니다. 가장 낮은 성향을 잘 이해하고 의식적으로 활용하려는 노력이 더해지면 강점은 더욱 빛을 발하게 됩니다.`,cm5:{CP_NP_A:{manner:`OOO님은 조직 안에서 사람을 챙기려는 마음이 강하면서도 조직의 흐름과 운영 방향을 놓치지 않으려는 성향이 강하게 나타납니다.

CP(기준,결단)의 점수가 높기 때문에 업무의 흐름과 약속, 실행 수준을 중요하게 생각합니다. 그래서 구성원에게도
“이 부분은 꼭 맞춰가야 합니다.”
“여기까지는 같이 해보셔야 합니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 압박만 주는 방식으로 관리하지 않습니다. 구성원이 힘들어하면 먼저 이유를 들으려 하고, 상황을 이해하려 하며, 오래 함께 가고 싶은 마음이 큽니다. 그래서 구성원 입장에서는
“나를 이해해주려고 한다.”
“나를 함부로 몰아붙이지 않는다.”
“챙겨주려는 마음이 느껴진다.”
라는 안정감을 느끼게 됩니다.

다만 A(이성,판단)의 점수가 가장 낮으면 한 가지 아쉬운 부분이 생길 수 있습니다. 리더 본인은 충분히 설명했다고 느끼는데 구성원 입장에서는
“그래서 지금 무엇부터 해야 하지?”
“결국 어떤 행동을 먼저 바꾸라는 거지?”
“우선순위가 잘 정리되지 않는다.”
처럼 느끼는 경우가 많습니다.

즉, OOO님의 성향은 공감과 배려는 충분하지만 실행 정리와 행동 방향이 흐려질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감 뒤에 행동을 남기는 습관이 중요합니다. 위로로 끝나는 것이 아니라 “그래서 지금 무엇을 해야 하는지”를 분명하게 남겨줘야 구성원이 실제로 움직이기 시작합니다.

특히 구성원이 힘들어할 때
“괜찮습니다.”
“이해합니다.”
“많이 힘드셨겠어요.”
이런 말만 하고 끝나면 마음은 편해지지만 행동은 남지 않을 가능성이 있습니다.

그래서 마지막에는 반드시
 “그럼 오늘은 고객 연락 열 건만 정확하게 해보시죠.”
 “이번 주는 상담 약속만 다섯 명 이상 잡아보시죠”
 “지금은 기존 고객 관리부터 다시 정리해보시죠.”
처럼 행동 문장을 붙여주는 것이 중요합니다.

OOO님의 성향은 원래 사람을 오래 데리고 가는 힘이 강한 성향입니다. 여기에 실행 정리와 우선순위 안내가 조금만 더해지면 조직의 움직임 속도와 활동량, 상담 진행률과 매출 흐름이 훨씬 안정적으로 올라가게 됩니다.

결국 OOO님의 성향의 핵심은 따뜻함 자체가 아니라 따뜻함 뒤에 실행이 남도록 만드는 것입니다. 공감으로 마음을 열고 마지막에는 행동을 남겨야 조직의 활동량과 생산성도 함께 올라가게 됩니다.`,improvement:``},CP_NP_FC:{manner:`OOO님은 조직 안에서 사람을 챙기려는 마음과 운영의 중심을 잡으려는 힘이 함께 강하게 나타나는 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 흐름과 실행 수준을 중요하게 생각합니다. 그래서 구성원에게도
“이 부분은 꼭 맞춰가야 합니다.”
“지금은 이 흐름이 중요합니다.”
같이 방향을 정리하는 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 강하게 밀어붙이는 방식으로 조직을 운영하지 않습니다. 구성원이 힘들어하면 먼저 이유를 들으려 하고, 상황을 이해하려 하며, 오래 함께 가고 싶은 마음이 큽니다. 그래서 구성원 입장에서는
“나를 챙겨주려고 한다.”
“내 상황을 이해하려고 한다.”
“쉽게 포기하지 않는 리더다.”
라는 안정감을 느끼게 됩니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 조직 안에서 한 가지 아쉬운 흐름이 생길 수 있습니다. 리더 본인은 진지하게 이야기하고 있다고 생각하지만 구성원 입장에서는 표정이나 분위기가 다소 무겁게 느껴질 수 있고, 거리감이 생길 수도 있습니다.

특히 결과와 실행을 중요하게 생각하는 말이 반복되면 구성원은
“계속 긴장된다.”
“잘못하면 혼날 것 같다.”
“가까이 다가가기 어렵다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직을 안정적으로 끌고 가는 힘은 강하지만 분위기를 부드럽게 풀어주는 표현과 감정 전달이 부족해질 수 있는 구조입니다.

그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는
“요즘 너무 잘 하시고 계세요^^”
“수고 많았어요 이 부분은  제가 높게 평가합니다.”
“결과도 중요하지만 지금 과정도 아주 잘하고 있습니다.”
같은 멘트를 먼저 넣어주는 것이 필요합니다.

특히 FC(친화,표현)가 낮은 리더는 의식적으로 미소를 띄고 고개를 끄덕이는 행동만 추가해도 구성원이 느끼는 심리적 압박감이 훨씬 줄어들게 됩니다.

OOO님의 성향은 원래 조직을 오래 유지하고 사람을 책임감 있게 끌고 가는 힘이 매우 강한 성향입니다. 여기에 분위기를 조금 더 편안하게 만드는 표현이 더해지면 구성원의 활동량과 조직의 움직임이 훨씬 살아나게 됩니다.

결국 OOO님의 성향의 핵심은 강한 책임감과 배려를 가지고 있다는 점입니다. 다만 구성원이 리더를 조금 더 편하게 느끼고 가까이 다가올 수 있도록 분위기를 부드럽게 풀어주는 표현이 함께 들어가야 조직의 활동량과 생산성도 더 안정적으로 올라가게 됩니다.`,improvement:``},CP_NP_AC:{manner:`OOO님은 조직 안에서 사람을 챙기려는 마음과 운영의 중심을 잡으려는 힘이 함께 강하게 나타나는 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 흐름과 실행 수준을 중요하게 생각합니다. 그래서 구성원에게도
“이 부분은 꼭 맞춰가야 합니다.”
“지금은 이 흐름이 중요합니다.”
같이 방향을 정리하는 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 강하게 밀어붙이는 방식으로 조직을 운영하지 않습니다. 구성원이 힘들어하면 먼저 이유를 들으려 하고, 상황을 이해하려 하며, 오래 함께 가고 싶은 마음이 큽니다. 그래서 구성원 입장에서는
“나를 챙겨주려고 한다.”
“내 상황을 이해하려고 한다.”
“쉽게 포기하지 않는 리더다.”
라는 안정감을 느끼게 됩니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 상태와 부담 정도를 세밀하게 살피는 부분이 부족해질 수 있습니다. 리더 본인은 조직을 위해 필요한 이야기를 하고 있다고 느끼지만 구성원 입장에서는
“말이 조금 강하게 느껴진다.”
“결론이 너무 빨리 나온다.”
“내 상황을 충분히 설명하기 어렵다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직을 안정적으로 끌고 가는 힘은 매우 강하지만 구성원의 현재 상태와 부담 정도를 확인하는 질문이 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 실행 방향을 이야기하기 전에 상대의 현재 흐름을 먼저 확인하는 습관이 중요합니다.

특히 OOO님은 결과와 행동을 먼저 이야기하기 전에
“지금 코칭속도는 괜찮으신가요?”
“요즘 가장 버거운 부분은 어떤 건가요?”
“이 방향이 부담스럽게 느껴지진 않으신가요?”
같은 질문을 먼저 넣어주는 것만으로도 구성원의 긴장감과 거리감이 크게 줄어들게 됩니다.

또한 구성원이 실적이 떨어졌을 때 바로 수정 방향부터 이야기하면 구성원은 자신이 이해받지 못한다고 느끼기 쉽습니다. 그래서 먼저 현재 상황을 듣고 난 뒤 행동 방향을 정리해주는 순서가 중요합니다. 공감 없이 바로 결론으로 들어가면 구성원은 움직이기보다 방어적으로 변할 가능성이 높아집니다.

그래서 OOO님은
“무엇을 바꿀 것인가”보다
“지금 어떤 상태인가”를 먼저 묻는 습관이 중요합니다.

OOO님의 성향은 책임감과 배려가 매우 뛰어난 성향입니다. 여기에 구성원의 감정과 부담을 한 번 더 확인하는 표현이 더해지면 활동량과 상담 움직임, 조직의 실행 지속력이 훨씬 안정적으로 살아나게 됩니다.`,improvement:``},CP_A_NP:{manner:`OOO님은 조직 안에서 방향을 잡고 흐름을 정리하는 힘이 매우 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 운영 흐름과 실행 수준을 중요하게 생각합니다. 그래서 구성원에게도
“지금은 이 부분을 먼저 맞춰야 합니다.”
“여기서는 흐름이 흔들리면 안 됩니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 감정적으로 흔들리기보다 상황을 정리하고 분석하려는 힘이 강합니다. 구성원의 활동량, 상담 흐름, 고객 반응, 실적 흐름을 비교적 냉정하게 보려고 하며 문제를 발견하면 빠르게 정리해서 해결 방향을 잡으려 합니다. 그래서 조직원 입장에서는
“판단이 빠르고 정확하다.”
“흐름을 잘 정리해준다.”
“문제가 생겨도 중심을 잃지 않는다.”
라는 신뢰감을 느끼게 됩니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 구성원의 감정 상태를 충분히 살피기 전에 해결과 수정 방향이 먼저 나오는 경우가 생길 수 있습니다. 리더 본인은 조직을 위해 필요한 말을 한다고 느끼지만 구성원 입장에서는
“결과만 중요하게 보는 것 같다.”
“내 마음은 충분히 이해받지 못한 느낌이다.”
“실수하면 바로 지적받을 것 같다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 흐름을 안정적으로 끌고 가는 힘은 매우 강하지만 구성원의 감정과 긴장 상태를 풀어주는 표현이 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 문제를 바로 수정하려 하기 전에 먼저 구성원의 상황과 마음 상태를 한 번 들어주는 습관이 중요합니다.

특히 NP(배려,공감)가 낮은 리더는
 “요즘 가장 힘든 부분이 어떤 건가요?”
 “지금 계속 움직이고 계신 건 정말 잘하고 계십니다.”
 “혼자 너무 오래 끌고 가지 마시고 중간에 꼭 이야기해주세요.”
같은 공감 문장을 의식적으로 먼저 사용하는 것만으로도 구성원의 심리적 거리감이 크게 줄어들게 됩니다.

OOO님의 성향은 원래 조직을 안정적으로 끌고 갈 수 있는 힘이 매우 강한 성향입니다. 여기에 따뜻한 인정과 공감 표현이 조금만 더해지면 구성원의 활동 지속력과 조직의 분위기가 훨씬 좋아지고 매출 흐름도 더 안정적으로 올라가게 됩니다.

결국 OOO님의 성향의 핵심은 강한 책임감과 상황 정리 능력입니다. 다만 구성원이 ‘이 리더는 내 상황도 이해하려고 한다’라는 느낌을 받을 수 있도록 공감의 표현을 조금 더 의식적으로 사용해야 조직의 활동량과 생산성도 더 오래 안정적으로 유지될 수 있습니다.`,improvement:``},CP_A_FC:{manner:`OOO님은 조직 안에서 방향을 잡고 흐름을 정리하는 힘이 매우 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 운영 흐름과 실행 수준을 중요하게 생각합니다. 그래서 구성원에게도
“지금은 이 부분을 먼저 맞춰야 합니다.”
“여기서는 흐름이 흔들리면 안 됩니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 감정적으로 흔들리기보다 상황을 정리하고 분석하려는 힘이 강합니다. 구성원의 활동량, 상담 흐름, 고객 반응, 실적 흐름을 비교적 냉정하게 보려고 하며 문제를 발견하면 빠르게 정리해서 해결 방향을 잡으려 합니다. 그래서 조직원 입장에서는
“판단이 빠르고 정확하다.”
“흐름을 잘 정리해준다.”
“문제가 생겨도 중심을 잃지 않는다.”
라는 신뢰감을 느끼게 됩니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 조직 안에서 분위기를 부드럽게 풀어주는 표현이 부족해질 수 있습니다. 리더 본인은 진지하게 이야기하고 있다고 느끼지만 구성원 입장에서는
“조금 어렵게 느껴진다.”
“가까이 다가가기 쉽지 않다.”
“계속 긴장하게 된다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 방향과 실행 흐름을 안정적으로 끌고 가는 힘은 매우 강하지만, 구성원의 긴장감을 풀어주고 편하게 움직이게 만드는 표현이 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 결과 점검만 하는 것이 아니라 구성원이 심리적으로 편안하게 움직일 수 있는 분위기를 함께 만들어주는 것이 중요합니다.

특히 FC(친화,표현)가 낮은 리더는 의식적으로
 미소를 띄고 고개를 끄덕이는 반응을 보여주고
 결과 이야기 전에 인정하는 말을 먼저 넣어주고
 무거운 분위기를 너무 오래 끌고 가지 않는 습관
이 중요합니다.

OOO님의 성향은 원래 조직을 오래 안정적으로 운영할 수 있는 힘이 매우 강한 성향입니다. 여기에 분위기를 조금 더 편안하게 만드는 표현이 더해지면 구성원의 활동량과 상담 움직임, 조직의 에너지와 매출 흐름이 훨씬 살아나게 됩니다.

결국 OOO님의 성향의 핵심은 강한 책임감과 상황 정리 능력입니다. 다만 구성원이 긴장만 하기보다 편하게 움직일 수 있도록 분위기를 조금 더 부드럽게 만들어줘야 조직의 활동량과 생산성도 더 안정적으로 올라가게 됩니다.`,improvement:``},CP_A_AC:{manner:`OOO님은 조직 안에서 방향을 잡고 흐름을 안정적으로 유지하는 힘이 매우 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 운영 흐름과 실행 수준을 중요하게 생각합니다. 그래서 구성원에게도
“지금은 이 흐름을 먼저 맞춰야 합니다.”
“여기서는 실행 움직임이 중요합니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 감정적으로 흔들리기보다 상황을 정리하고 분석하려는 힘이 강합니다. 구성원의 활동량, 고객 흐름, 상담 진행률, 계약 흐름 등을 비교적 객관적으로 보려고 하며 문제가 생기면 빠르게 원인을 찾고 해결 방향을 정리하려 합니다. 그래서 구성원 입장에서는
“판단이 빠르다.”
“흐름 정리가 명확하다.”
“조직 운영이 안정적이다.”
라는 신뢰감을 느끼게 됩니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 상태와 부담 정도를 세밀하게 살피는 부분이 부족해질 수 있습니다. 리더 본인은 조직을 위해 필요한 이야기를 하고 있다고 느끼지만 구성원 입장에서는
“말이 조금 강하게 느껴진다.”
“결론이 너무 빨리 나온다.”
“내 상황을 충분히 설명하기 어렵다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직을 안정적으로 끌고 가는 힘은 매우 강하지만 구성원의 현재 상태와 부담 정도를 확인하는 질문이 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 실행 방향을 이야기하기 전에 상대의 현재 흐름을 먼저 확인하는 습관이 중요합니다.

특히 OOO님은 결과와 행동을 먼저 이야기하기 전에
“지금 코칭속도는 괜찮으신가요?”
“요즘 가장 버거운 부분은 어떤 건가요?”
“이 방향이 부담스럽게 느껴지진 않으신가요?”
같은 질문을 먼저 넣어주는 것만으로도 구성원의 긴장감과 거리감이 크게 줄어들게 됩니다.

또한 구성원이 실적이 떨어졌을 때 바로 수정 방향부터 이야기하면 구성원은 자신이 이해받지 못한다고 느끼기 쉽습니다. 그래서 먼저 현재 상황을 듣고 난 뒤 행동 방향을 정리해주는 순서가 중요합니다. 공감 없이 바로 결론으로 들어가면 구성원은 움직이기보다 방어적으로 변할 가능성이 높아집니다.

그래서 OOO님은
“무엇을 바꿀 것인가”보다
“지금 어떤 상태인가”를 먼저 묻는 습관이 중요합니다.

OOO님의 성향은 원래 조직을 강하게 끌고 갈 수 있는 힘이 매우 뛰어난 성향입니다. 여기에 구성원의 감정과 부담을 한 번 더 확인하는 표현이 더해지면 활동량과 상담 움직임, 조직의 실행 지속력이 훨씬 안정적으로 살아나게 됩니다.`,improvement:``},CP_FC_NP:{manner:`OOO님은 조직 안에서 실행력과 분위기를 동시에 끌고 가는 힘이 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 흐름과 실행 수준을 중요하게 생각합니다. 그래서 구성원에게도
“지금은 이 흐름을 먼저 맞춰야 합니다.”
“여기서는 실행 움직임이 중요합니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로 FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며, 상담 현장이나 회의 분위기가 너무 가라앉지 않도록 에너지를 살리려는 모습도 강하게 나타납니다. 그래서 구성원 입장에서는
“분위기를 답답하지 않게 만든다.”
“조직 안의 에너지를 살린다.”
“같이 움직이면 힘이 난다.”
라는 느낌을 받는 경우가 많습니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 구성원의 감정 상태와 속마음을 깊게 공감해주는 부분이 부족해질 수 있습니다. 리더 본인은 분위기도 좋고 방향도 잘 잡아주고 있다고 느끼지만 구성원 입장에서는
“내 마음까지 충분히 이해받는 느낌은 아니다.”
“결국 결과 중심으로 느껴질 때가 있다.”
“힘든 상황을 길게 이야기하기 어렵다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 움직임과 분위기를 끌어올리는 힘은 강하지만 구성원의 감정을 오래 들어주고 공감하는 부분이 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 분위기를 살리는 것만으로 끝나는 것이 아니라 구성원의 현재 상태를 차분하게 들어주는 시간이 함께 필요합니다.

특히 OOO님은
“괜찮습니다. 다시 해보면 됩니다.”
라고 빠르게 넘어가기보다
“지금 어떤 부분이 가장 힘드셨나요?”
“최근에 마음이 가장 무거웠던 순간이 언제였나요?”
처럼 현재 감정 상태를 먼저 물어보는 습관이 중요합니다.

또한 FC(친화,표현)가 높은 리더는 조직 분위기를 밝게 만들려는 힘이 강하기 때문에 구성원이 보내는 무거운 신호를 가볍게 넘길 가능성도 있습니다. 그래서 분위기를 올리는 말 뒤에는 반드시 현재 상태를 확인하는 질문이 함께 들어가야 구성원이 심리적으로 더 오래 버틸 수 있게 됩니다.

OOO님의 성향은 원래 조직의 활동량과 움직임을 끌어올리는 힘이 매우 좋은 성향입니다. 여기에 공감과 경청이 조금 더해지면 구성원의 안정감과 조직의 유지력이 훨씬 좋아지고 활동량과 생산성 흐름도 더 안정적으로 올라가게 됩니다.`,improvement:``},CP_FC_A:{manner:`OOO님은 조직 안에서 실행력과 분위기를 동시에 끌고 가는 힘이 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 흐름과 실행 수준을 중요하게 생각합니다. 그래서 구성원에게도
“지금은 이 흐름을 먼저 맞춰야 합니다.”
“여기서는 움직임이 끊기면 안 됩니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로 FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며, 현장 분위기가 처지지 않도록 에너지를 끌어올리는 힘도 강하게 나타납니다. 그래서 구성원 입장에서는
“분위기를 답답하지 않게 만든다.”
“같이 움직이면 힘이 난다.”
“조직 안에 에너지가 살아 있다.”
라는 느낌을 받는 경우가 많습니다.

다만 A(이성,판단)의 점수가 가장 낮으면 감정과 분위기 중심으로 조직을 끌고 가다가도 실제 문제 원인이나 숫자 흐름을 차분하게 정리하는 부분이 부족해질 수 있습니다. 리더 본인은 열심히 독려하고 분위기를 살리고 있다고 느끼지만 구성원 입장에서는
“무엇부터 정리해야 하는지 헷갈린다.”
“구체적인 우선순위가 부족하다.”
“열심히는 하는데 방향이 흐려질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 활동량과 분위기를 끌어올리는 힘은 매우 강하지만 실행의 우선순위와 현실적인 정리 부분이 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 분위기를 올리는 것과 동시에 “지금 가장 먼저 해야 할 한 가지”를 명확하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“열심히 해봅시다.”
라는 독려만 반복하기보다
“오늘 가장 먼저 해야 하는 건 고객과 전화통화 10건입니다.”
“이번 주는 상담 약속 확보에 집중해보시죠.”
처럼 행동 순서를 구체적으로 정리해주는 것이 중요합니다.

또한 FC(친화,표현)가 높은 리더는 조직 분위기를 살리는 힘이 좋은 대신 구성원의 어려움을 가볍게 넘기거나 현실적인 문제를 정확히 짚지 못하는 경우도 생길 수 있습니다. 그래서 격려 이후에는 반드시 현재 숫자 흐름과 행동량을 차분하게 확인하는 과정이 함께 들어가야 합니다.

OOO님의 성향은 원래 조직의 에너지와 활동량을 끌어올리는 힘이 매우 뛰어난 성향입니다. 여기에 우선순위를 정리해주는 습관과 현실적인 점검이 더해지면 조직의 활동량과 생산성 흐름이 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},CP_FC_AC:{manner:`OOO님은 조직 안에서 실행력과 분위기를 동시에 끌고 가는 힘이 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 흐름과 실행 움직임을 중요하게 생각합니다. 그래서 구성원에게도
“지금은 이 흐름을 먼저 맞춰야 합니다.”
“여기서는 움직임이 끊기면 안 됩니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로 FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며, 현장 분위기가 처지지 않도록 에너지를 끌어올리는 힘도 강하게 나타납니다. 그래서 구성원 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“현장 에너지가 살아 있다.”
라는 느낌을 받는 경우가 많습니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 상태와 부담 정도를 세밀하게 살피는 부분이 부족해질 수 있습니다. 리더 본인은 분위기도 좋고 방향도 잘 잡아주고 있다고 느끼지만 구성원 입장에서는
“조금 압박처럼 느껴질 때가 있다.”
“결론이 빨리 나온다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 활동량과 분위기를 끌어올리는 힘은 매우 강하지만 구성원의 현재 상태와 부담 정도를 세밀하게 확인하는 질문이 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 분위기를 살리는 것만으로 끝나는 것이 아니라 상대의 현재 상태를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은 분위기를 밝게 만들면서도 중간중간
“지금 코칭속도는 괜찮으신가요?”
“요즘 가장 버거운 부분은 어떤 건가요?”
“지금 이 흐름이 부담스럽게 느껴지진 않으신가요?”
같은 질문을 함께 넣어주는 것이 필요합니다.

또한 FC(친화,표현)가 높은 리더는 조직 분위기를 끌어올리는 힘이 강하기 때문에 구성원의 힘든 신호를 가볍게 넘길 가능성도 있습니다. 그래서 격려와 독려 이후에는 반드시 현재 상태와 부담 정도를 차분하게 확인하는 과정이 함께 들어가야 구성원이 더 오래 안정적으로 움직이게 됩니다.

OOO님의 성향은 원래 조직의 에너지와 실행 움직임을 끌어올리는 힘이 매우 뛰어난 성향입니다. 여기에 상대의 감정과 부담을 한 번 더 살피는 질문이 더해지면 조직의 활동량과 생산성 흐름이 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},CP_AC_NP:{manner:`OOO님은 조직 안에서 흐름을 안정적으로 유지하고 구성원을 관리하는 힘이 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 방향과 실행 움직임을 중요하게 생각합니다. 그래서 구성원에게도
“지금은 이 흐름을 먼저 맞춰야 합니다.”
“여기서는 움직임이 끊기면 안 됩니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로 AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름을 비교적 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고, 조직 안에서 충돌이 커지지 않도록 중간에서 흐름을 조율하려는 모습도 나타납니다. 그래서 구성원 입장에서는
“조직 분위기를 안정적으로 유지하려고 한다.”
“강하게 밀어붙이기보다 조율하려 한다.”
“함부로 부담 주는 말을 하지 않는다.”
라는 느낌을 받는 경우가 많습니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 구성원의 감정 상태를 따뜻하게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 배려하고 있다고 느끼지만 구성원 입장에서는
“정은 있지만 따뜻한 공감은 부족하다.”
“내 마음을 깊게 이해받는 느낌은 아니다.”
“결국 실행 이야기로 빨리 넘어간다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직을 안정적으로 운영하고 흐름을 유지하는 힘은 좋지만 구성원의 감정을 깊게 공감하고 심리적으로 안아주는 표현은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 결과와 실행 방향을 이야기하기 전에 구성원의 현재 감정 상태를 먼저 들어주는 습관이 중요합니다.

특히 OOO님은
“왜 이것밖에 안 됐을까요?”
보다
“요즘 가장 힘든 부분은 어떤 건가요?”
“최근에 가장 지쳤던 순간은 언제였나요?”
같은 질문을 먼저 넣어주는 것이 필요합니다.

또한 AC(협조,조율)가 높은 리더는 조직 분위기를 맞추려는 힘이 있기 때문에 속으로 답답함이 있어도 직접 표현하지 못하고 혼자 끌어안는 경우도 있습니다. 그러다 어느 순간 말이 차갑게 나오거나 거리감이 생길 수 있기 때문에 평소 작은 공감 표현을 자주 사용하는 것이 중요합니다.

OOO님의 성향은 원래 조직을 오래 안정적으로 유지할 수 있는 힘이 좋은 성향입니다. 여기에 따뜻한 공감과 감정 확인이 조금 더해지면 구성원의 심리적 안정감과 조직의 유지력이 훨씬 좋아지고 활동량과 생산성 흐름도 더 안정적으로 올라가게 됩니다.`,improvement:``},CP_AC_A:{manner:`OOO님은 조직 안에서 흐름을 안정적으로 유지하고 구성원을 책임감 있게 관리하려는 힘이 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 방향과 실행 움직임을 중요하게 생각합니다. 그래서 구성원에게도
“지금은 이 흐름을 먼저 맞춰야 합니다.”
“여기서는 움직임이 끊기면 안 됩니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로 AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고, 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 구성원 입장에서는
“조직 분위기를 안정적으로 유지하려고 한다.”
“말을 함부로 강하게 하지 않는다.”
“조율하면서 같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

다만 A(이성,판단)의 점수가 가장 낮으면 감정과 분위기 중심으로 조직을 운영하다가도 실제 문제 원인과 우선순위를 차분하게 정리하는 부분이 부족해질 수 있습니다. 리더 본인은 충분히 노력하고 챙기고 있다고 느끼지만 구성원 입장에서는
“무엇부터 해야 할지 헷갈린다.”
“이야기는 많은데 정리가 안 되는 느낌이다.”
“실행 순서가 흐려질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직을 안정적으로 유지하고 관계 흐름을 맞추는 힘은 좋지만 실제 실행 우선순위와 현실적인 정리 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 배려만으로 끝나는 것이 아니라 “지금 가장 먼저 해야 하는 한 가지”를 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“열심히 해봅시다.”
라는 격려만 반복하기보다
“오늘 가장 먼저 해야 하는 건 고객과 전화통화 10건입니다.”
“이번 주는 상담 약속 확보에 집중해보시죠.”
처럼 행동 순서를 구체적으로 정리해주는 것이 중요합니다.

또한 AC(협조,조율)가 높은 리더는 상대 눈치를 많이 보다가 정작 꼭 해야 하는 말을 늦게 꺼내는 경우도 있습니다. 그러다 어느 순간 답답함이 쌓이면 말이 갑자기 강하게 나올 수 있기 때문에 평소 짧고 분명하게 방향을 정리해주는 습관이 중요합니다.

OOO님의 성향은 원래 조직을 오래 안정적으로 유지할 수 있는 힘이 좋은 성향입니다. 여기에 실행 우선순위를 명확하게 정리하는 습관이 더해지면 조직의 활동량과 생산성, 매출 흐름이 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},CP_AC_FC:{manner:`OOO님은 조직 안에서 흐름을 안정적으로 유지하고 구성원을 책임감 있게 관리하려는 힘이 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 방향과 실행 움직임을 중요하게 생각합니다. 그래서 구성원에게도
“지금은 이 흐름을 먼저 맞춰야 합니다.”
“여기서는 움직임이 끊기면 안 됩니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로 AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고, 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 구성원 입장에서는
“조직 분위기를 안정적으로 유지하려고 한다.”
“말을 함부로 강하게 하지 않는다.”
“조율하면서 같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 조직 안에서 분위기를 부드럽게 풀어주는 표현이 부족해질 수 있습니다. 리더 본인은 충분히 배려하면서 이야기하고 있다고 느끼지만 구성원 입장에서는
“조금 어렵게 느껴진다.”
“가까이 다가가기 쉽지 않다.”
“긴장감이 오래 유지된다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직을 안정적으로 유지하고 흐름을 관리하는 힘은 좋지만 구성원이 심리적으로 편하게 움직일 수 있도록 분위기를 풀어주는 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 실행 방향과 조율만 하는 것이 아니라 구성원이 편하게 이야기할 수 있는 분위기를 만드는 습관이 중요합니다.

특히 OOO님은 결과와 움직임을 이야기하기 전에
“요즘 너무 잘 하시고 계세요^^”
“수고 많았어요 이 부분은  제가 높게 평가합니다.”
“결과도 중요하지만 지금 과정도 아주 잘하고 있습니다.”
같은 멘트를 먼저 넣어주는 것이 필요합니다.

또한 FC(친화,표현)가 낮은 리더는 표정과 반응이 차분하게 유지되는 경우가 많기 때문에 구성원은 자신이 혼나고 있다고 오해할 수도 있습니다. 그래서 의식적으로 미소를 띄고 고개를 끄덕이며 들어주는 반응을 추가하는 것만으로도 조직 분위기가 훨씬 편안해질 수 있습니다.

OOO님의 성향은 원래 조직을 오래 안정적으로 유지할 수 있는 힘이 매우 좋은 성향입니다. 여기에 구성원이 심리적으로 편하게 움직일 수 있는 분위기와 따뜻한 반응이 더해지면 조직의 활동량과 생산성, 매출 흐름이 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_CP_A:{manner:`OOO님은 조직 안에서 사람을 챙기고 보호하려는 마음이 매우 강한 성향입니다.

NP(배려,공감)의 점수가 높기 때문에 구성원의 감정 상태와 어려움을 잘 살피려고 합니다. 그래서 구성원이 힘들어하면 먼저 이유를 들으려 하고, 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 조직원 입장에서는
“내 이야기를 잘 들어준다.”
“쉽게 포기하지 않고 끝까지 챙겨준다.”
“사람을 중요하게 생각한다.”
라는 안정감을 느끼는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 단순히 따뜻하기만 한 리더가 아니라 조직의 방향과 실행 흐름도 중요하게 생각합니다. 필요할 때는 분명하게 방향을 정리하고, 움직임이 흐트러질 때는 다시 중심을 잡아주려는 힘도 있습니다. 그래서 구성원 입장에서는
“따뜻하지만 중심은 있는 리더다.”
“조직 흐름을 놓치지 않는다.”
“결국은 움직이게 만든다.”
라는 신뢰감을 느끼게 됩니다.

다만 A(이성,판단)의 점수가 가장 낮으면 감정과 분위기 중심으로 조직을 운영하다가도 실제 문제 원인과 실행 우선순위를 차분하게 정리하는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 챙기고 있다고 느끼지만 구성원 입장에서는
“무엇부터 해야 하는지 헷갈린다.”
“위로는 되는데 정리가 부족하다.”
“방향이 조금 흐려질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 관계를 안정적으로 유지하는 힘은 매우 좋지만 실행 우선순위와 현실적인 정리 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 격려만으로 끝나는 것이 아니라 “지금 가장 먼저 해야 하는 행동”을 명확하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“괜찮습니다. 잘하실 수 있습니다.”
라는 위로만 반복하기보다
“오늘 가장 먼저 해야 하는 건 고객과 전화통화 10건입니다.”
“이번 주는 상담 약속 확보 하나에 집중해보시죠.”
처럼 행동 순서를 구체적으로 정리해주는 것이 중요합니다.

또한 NP(배려,공감)가 높은 리더는 구성원이 힘들어하면 너무 오래 감정을 들어주다가 실행 흐름이 늦어지는 경우도 생길 수 있습니다. 그래서 충분히 공감해준 뒤에는 반드시 행동 방향을 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 움직임과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 실행 순서를 명확하게 정리하는 힘이 더해지면 조직의 활동량과 생산성, 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_CP_FC:{manner:`OOO님은 조직 안에서 사람을 챙기고 보호하려는 마음이 매우 강한 성향입니다.

NP(배려,공감)의 점수가 높기 때문에 구성원의 감정 상태와 어려움을 잘 살피려고 합니다. 그래서 구성원이 힘들어하면 먼저 이유를 들으려 하고, 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 조직원 입장에서는
“내 이야기를 잘 들어준다.”
“쉽게 포기하지 않고 끝까지 챙겨준다.”
“사람을 중요하게 생각한다.”
라는 안정감을 느끼는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 단순히 따뜻하기만 한 리더가 아니라 조직의 방향과 실행 흐름도 중요하게 생각합니다. 필요할 때는 분명하게 방향을 정리하고, 움직임이 흐트러질 때는 다시 중심을 잡아주려는 힘도 있습니다. 그래서 구성원 입장에서는
“따뜻하지만 중심은 있는 리더다.”
“조직 흐름을 놓치지 않는다.”
“결국은 움직이게 만든다.”
라는 신뢰감을 느끼게 됩니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 조직 안에서 분위기를 부드럽게 풀어주는 표현은 부족해질 수 있습니다. 리더 본인은 충분히 배려하고 있다고 느끼지만 구성원 입장에서는
“조금 어렵게 느껴진다.”
“칭찬과 반응 표현이 부족하다.”
“긴장감이 오래 유지된다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 유지력을 만드는 힘은 매우 좋지만 구성원이 심리적으로 편하게 움직일 수 있도록 분위기를 풀어주는 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 실행 방향만 이야기하는 것이 아니라 구성원이 편하게 움직일 수 있는 분위기를 함께 만들어주는 습관이 중요합니다.

특히 OOO님은
“고생 많으셨습니다.”
“지금 계속 움직이고 계신 부분이 정말 좋습니다.”
“오늘 분위기 좋게 잘 버텨주셨습니다.”
같은 짧은 인정 표현을 의식적으로 자주 사용하는 것이 중요합니다.

또한 FC(친화,표현)가 낮은 리더는 표정과 반응이 차분하게 유지되는 경우가 많기 때문에 구성원은 자신이 혼나고 있다고 오해할 수도 있습니다. 그래서 의식적으로 미소를 띄고 고개를 끄덕이며 들어주는 반응을 추가하는 것만으로도 조직 분위기가 훨씬 편안해질 수 있습니다.

OOO님의 성향은 원래 조직을 오래 안정적으로 유지하고 구성원을 지켜주는 힘이 매우 좋은 성향입니다. 여기에 밝은 반응과 편안한 분위기가 더해지면 조직의 활동량과 생산성, 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_CP_AC:{manner:`OOO님은 조직 안에서 사람을 챙기고 보호하려는 마음이 매우 강한 성향입니다.

NP(배려,공감)의 점수가 높기 때문에 구성원의 감정 상태와 어려움을 잘 살피려고 합니다. 그래서 구성원이 힘들어하면 먼저 이유를 들으려 하고, 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 조직원 입장에서는
“내 이야기를 잘 들어준다.”
“쉽게 포기하지 않고 끝까지 챙겨준다.”
“사람을 중요하게 생각한다.”
라는 안정감을 느끼는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 단순히 따뜻하기만 한 리더가 아니라 조직의 방향과 실행 흐름도 중요하게 생각합니다. 필요할 때는 분명하게 방향을 정리하고, 움직임이 흐트러질 때는 다시 중심을 잡아주려는 힘도 있습니다. 그래서 구성원 입장에서는
“따뜻하지만 조직 흐름은 놓치지 않는다.”
“사람을 챙기면서도 실행 움직임은 관리한다.”
“결국은 다시 움직이게 만든다.”
라는 신뢰감을 느끼게 됩니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 속도와 부담 정도를 세밀하게 살피는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 챙기고 배려하고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 빨리 나온다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
“조금 압박처럼 느껴질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 유지력을 안정적으로 만드는 힘은 매우 좋지만 구성원의 현재 부담과 심리 상태를 세밀하게 확인하는 질문은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 격려만 하는 것이 아니라 상대의 현재 흐름과 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“괜찮습니다. 다시 해보면 됩니다.”
라고 바로 정리하기보다
“지금 가장 버거운 부분은 어떤 건가요?”
“요즘 코칭속도는 괜찮으신가요?”
“지금 어떤 부분에서 가장 부담을 느끼고 계신가요?”
같은 질문을 먼저 넣어주는 것이 필요합니다.

또한 NP(배려,공감)가 높은 리더는 구성원을 오래 챙기려는 마음이 강하기 때문에 속으로 답답함이 있어도 참고 넘어가는 경우도 있습니다. 그러다가 어느 순간 말이 갑자기 강하게 나오면 구성원은 더 크게 위축될 수 있습니다. 그래서 평소 짧고 부드럽게 현재 상태를 확인하는 습관이 중요합니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 상대의 부담과 현재 흐름을 한 번 더 확인하는 질문이 더해지면 조직의 활동량과 생산성, 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_A_CP:{manner:`OOO님은 조직 안에서 사람을 안정적으로 챙기고 구성원의 감정 흐름을 세밀하게 살피려는 힘이 강한 성향입니다.

NP(배려,공감)의 점수가 높기 때문에 구성원이 힘들어하면 먼저 이유를 들으려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 조직원 입장에서는
“내 이야기를 편하게 할 수 있다.”
“압박보다 안정감을 준다.”
“사람을 중요하게 생각한다.”
라는 느낌을 받는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 단순히 감정적으로만 조직을 운영하는 것이 아니라 현실적인 흐름과 숫자도 같이 보려고 합니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 객관적으로 보며 문제 원인을 차분하게 정리하려는 모습도 나타납니다. 그래서 구성원 입장에서는
“차분하게 상황을 정리해준다.”
“무리하게 몰아가지 않는다.”
“이야기를 들은 뒤 현실적으로 방향을 잡아준다.”
라는 신뢰감을 느끼게 됩니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 리더 본인은 충분히 설명하고 공감하고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“움직임을 강하게 끌어주는 느낌은 부족하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 안정감을 유지하는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 이해만으로 끝나는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“괜찮습니다. 천천히 해봅시다.”
라는 말만 반복하기보다
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 집중해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 중요합니다.

또한 NP(배려,공감)가 높은 리더는 구성원이 힘들어하면 너무 오래 감정을 들어주다가 실제 행동 흐름이 늦어지는 경우도 생길 수 있습니다. 그래서 충분히 공감해준 뒤에는 반드시 행동 방향을 짧게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 실행 움직임을 조금 더 분명하게 끌어주는 힘이 더해지면 조직의 활동량과 생산성 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_A_FC:{manner:`OOO님은 조직 안에서 사람을 안정적으로 챙기고 구성원의 감정 흐름을 세밀하게 살피려는 힘이 강한 성향입니다.

NP(배려,공감)의 점수가 높기 때문에 구성원이 힘들어하면 먼저 이유를 들으려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 조직원 입장에서는
“내 이야기를 편하게 할 수 있다.”
“압박보다 안정감을 준다.”
“사람을 중요하게 생각한다.”
라는 느낌을 받는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 단순히 감정적으로만 조직을 운영하는 것이 아니라 현실적인 흐름과 숫자도 같이 보려고 합니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 객관적으로 보며 문제 원인을 차분하게 정리하려는 모습도 나타납니다. 그래서 구성원 입장에서는
“차분하게 상황을 정리해준다.”
“무리하게 몰아가지 않는다.”
“이야기를 들은 뒤 현실적으로 방향을 잡아준다.”
라는 신뢰감을 느끼게 됩니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 조직 안에서 분위기를 부드럽게 풀어주는 표현은 부족해질 수 있습니다. 리더 본인은 충분히 배려하고 차분하게 이야기하고 있다고 느끼지만 구성원 입장에서는
“조금 어렵게 느껴진다.”
“칭찬과 반응 표현이 부족하다.”
“긴장감이 오래 유지된다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 유지력을 만드는 힘은 매우 좋지만 구성원이 심리적으로 편하게 움직일 수 있는 분위기를 만드는 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 현실적인 정리만 하는 것이 아니라 구성원이 “편하게 움직일 수 있는 분위기”를 함께 만들어주는 습관이 중요합니다.

특히 OOO님은
“요즘 너무 잘 하시고 계세요^^”
“수고 많았어요 이 부분은  제가 높게 평가합니다.”
“결과도 중요하지만 지금 과정도 아주 잘하고 있습니다.”
같은 멘트를 먼저 넣어주는 것이 필요합니다.

또한 FC(친화,표현)가 낮은 리더는 표정과 반응이 차분하게 유지되는 경우가 많기 때문에 구성원은 자신이 혼나고 있다고 오해할 수도 있습니다. 그래서 의식적으로 미소를 띄고 고개를 끄덕이며 들어주는 반응을 추가하는 것만으로도 조직 분위기가 훨씬 편안해질 수 있습니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 밝은 반응과 편안한 분위기가 더해지면 조직의 활동량과 생산성, 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_A_AC:{manner:`OOO님은 조직 안에서 사람을 안정적으로 챙기고 구성원의 감정 흐름을 세밀하게 살피려는 힘이 강한 성향입니다.

NP(배려,공감)의 점수가 높기 때문에 구성원이 힘들어하면 먼저 이유를 들으려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 조직원 입장에서는
“내 이야기를 편하게 할 수 있다.”
“압박보다 안정감을 준다.”
“사람을 중요하게 생각한다.”
라는 느낌을 받는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 단순히 감정적으로만 조직을 운영하는 것이 아니라 현실적인 흐름과 숫자도 같이 보려고 합니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 객관적으로 보며 문제 원인을 차분하게 정리하려는 모습도 나타납니다. 그래서 구성원 입장에서는
“차분하게 상황을 정리해준다.”
“무리하게 몰아가지 않는다.”
“이야기를 들은 뒤 현실적으로 방향을 잡아준다.”
라는 신뢰감을 느끼게 됩니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 속도와 부담 정도를 세밀하게 살피는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 배려하고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 빨리 나온다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
“조금 압박처럼 느껴질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 안정감을 유지하는 힘은 매우 좋지만 구성원의 현재 부담과 심리 상태를 세밀하게 확인하는 질문은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 현실적인 정리만 하는 것이 아니라 상대의 현재 흐름과 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“괜찮습니다. 다시 해보면 됩니다.”
라고 바로 정리하기보다
“지금 가장 버거운 부분은 어떤 건가요?”
“요즘 코칭속도는 괜찮으신가요?”
“지금 어떤 부분에서 가장 부담을 느끼고 계신가요?”
같은 질문을 먼저 넣어주는 것이 필요합니다.

또한 NP(배려,공감)가 높은 리더는 구성원을 오래 챙기려는 마음이 강하기 때문에 속으로 답답함이 있어도 참고 넘어가는 경우도 있습니다. 그러다가 어느 순간 말이 갑자기 강하게 나오면 구성원은 더 크게 위축될 수 있습니다. 그래서 평소 짧고 부드럽게 현재 상태를 확인하는 습관이 중요합니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 상대의 부담과 현재 흐름을 한 번 더 확인하는 질문이 더해지면 조직의 활동량과 생산성, 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_FC_CP:{manner:`OOO님은 조직 안에서 사람을 편안하게 만들고 분위기를 밝게 유지하는 힘이 매우 강한 성향입니다.

NP(배려,공감)의 점수가 높기 때문에 구성원의 감정 상태와 어려움을 잘 살피려고 합니다. 그래서 구성원이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 조직원 입장에서는
“내 이야기를 편하게 할 수 있다.”
“정서적으로 안정감을 준다.”
“사람을 진심으로 챙긴다.”
라는 느낌을 받는 경우가 많습니다.

그리고 두 번째로 FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며, 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 구성원 입장에서는
“조직 분위기가 답답하지 않다.”
“같이 움직이면 힘이 난다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 리더 본인은 충분히 공감하고 격려하고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 약하다.”
“긴장감이 느슨해질 때가 있다.”
“좋은 분위기인데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 관계 유지력은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 “지금 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“괜찮습니다. 잘될 겁니다.”
라는 격려만 반복하기보다
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 집중해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 중요합니다.

또한 NP(배려,공감)와 FC(친화,표현)가 함께 높은 리더는 구성원과 관계가 좋아지는 대신 분위기가 너무 편안해져 실행 긴장감이 약해질 가능성도 있습니다. 그래서 충분히 공감해준 뒤에는 반드시 행동 목표를 짧고 명확하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 실행 움직임을 조금 더 분명하게 끌어주는 힘이 더해지면 조직의 활동량과 생산성 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_FC_A:{manner:`OOO님은 조직 안에서 사람을 편안하게 만들고 분위기를 밝게 유지하는 힘이 매우 강한 성향입니다.

NP(배려,공감)의 점수가 높기 때문에 구성원의 감정 상태와 어려움을 잘 살피려고 합니다. 그래서 구성원이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 조직원 입장에서는
“내 이야기를 편하게 할 수 있다.”
“정서적으로 안정감을 준다.”
“사람을 진심으로 챙긴다.”
라는 느낌을 받는 경우가 많습니다.

그리고 두 번째로 FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며, 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 구성원 입장에서는
“조직 분위기가 답답하지 않다.”
“같이 움직이면 힘이 난다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

다만 A(이성,판단)의 점수가 가장 낮으면 분위기와 감정 중심으로 조직을 운영하다가 실제 문제 원인과 우선순위를 차분하게 정리하는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 공감하고 격려하고 있다고 느끼지만 구성원 입장에서는
“무엇부터 해야 하는지 헷갈린다.”
“위로는 되는데 정리가 부족하다.”
“열심히는 하는데 방향이 흐려질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 관계 유지력은 매우 좋지만 실행 우선순위와 현실적인 정리 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 “지금 가장 먼저 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“괜찮습니다. 잘될 겁니다.”
라는 격려만 반복하기보다
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 집중해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 중요합니다.

또한 NP(배려,공감)와 FC(친화,표현)가 함께 높은 리더는 구성원과 관계가 좋아지는 대신 분위기가 너무 편안해져 실행 긴장감이 약해질 가능성도 있습니다. 그래서 충분히 공감해준 뒤에는 반드시 행동 목표를 짧고 명확하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 실행 우선순위를 정리해주는 힘이 더해지면 조직의 활동량과 생산성 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_FC_AC:{manner:`OOO님은 조직 안에서 사람을 편안하게 만들고 분위기를 밝게 유지하는 힘이 매우 강한 성향입니다.

NP(배려,공감)의 점수가 높기 때문에 구성원의 감정 상태와 어려움을 잘 살피려고 합니다. 그래서 구성원이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 조직원 입장에서는
“내 이야기를 편하게 할 수 있다.”
“정서적으로 안정감을 준다.”
“사람을 진심으로 챙긴다.”
라는 느낌을 받는 경우가 많습니다.

그리고 두 번째로 FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며, 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 구성원 입장에서는
“조직 분위기가 답답하지 않다.”
“같이 움직이면 힘이 난다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 속도와 부담 정도를 세밀하게 살피는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 공감하고 편안한 분위기를 만들고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 빨리 나온다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
“좋은 분위기인데도 압박처럼느껴질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 관계 유지력은 매우 좋지만 구성원의 현재 부담과 심리 상태를 세밀하게 확인하는 질문은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 상대의 현재 흐름과 부담 정도를 먼저 확인하는 습관이 중요합니다.


또한 NP(배려,공감)와 FC(친화,표현)가 함께 높은 리더는 조직 분위기를 너무 편안하게 유지하려다가 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 어느 순간 답답함이 쌓이면 말이 갑자기 강하게 나올 수 있기 때문에 평소 짧고 부드럽게 현재 상태를 확인하면서도 실행 움직임은 분명하게 정리해주는 습관이 중요합니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 상대의 부담과 현재 흐름을 한 번 더 확인하는 질문이 더해지면 조직의 활동량과 생산성, 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_AC_CP:{manner:`OOO님은 조직 안에서 사람을 안정적으로 챙기고 구성원의 감정 흐름과 조직 분위기를 부드럽게 유지하려는 힘이 강한 성향입니다.

NP(배려,공감)의 점수가 높기 때문에 구성원이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 조직원 입장에서는
“내 이야기를 편하게 할 수 있다.”
“사람을 함부로 대하지 않는다.”
“정서적으로 안정감을 준다.”
라는 느낌을 받는 경우가 많습니다.

그리고 두 번째로 AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 구성원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 편안하게 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 리더 본인은 충분히 챙기고 배려하고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“좋은 분위기인데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 유지력을 안정적으로 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 배려만으로 끝나는 것이 아니라 “지금 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“괜찮습니다. 천천히 해봅시다.”
라는 말만 반복하기보다
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 중요합니다.

또한 NP(배려,공감)와 AC(협조,조율)가 함께 높은 리더는 구성원의 부담을 너무 배려하다가 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 조직 분위기가 느슨해지면 활동량과 상담 움직임도 함께 떨어질 가능성이 있습니다. 그래서 충분히 공감해준 뒤에는 반드시 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 실행 움직임을 조금 더 분명하게 끌어주는 힘이 더해지면 조직의 활동량과 생산성 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_AC_A:{manner:`OOO님은 조직 안에서 사람을 안정적으로 챙기고 구성원의 감정 흐름과 조직 분위기를 부드럽게 유지하려는 힘이 강한 성향입니다.

NP(배려,공감)의 점수가 높기 때문에 구성원이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 그래서 구성원 입장에서는
“내 이야기를 편하게 할 수 있다.”
“사람을 함부로 대하지 않는다.”
“정서적으로 안정감을 준다.”
라는 느낌을 받는 경우가 많습니다.

그리고 두 번째로 AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 구성원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 편안하게 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

다만 A(이성,판단)의 점수가 가장 낮으면 감정과 분위기 중심으로 조직을 운영하다가 실제 문제 원인과 우선순위를 차분하게 정리하는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 챙기고 배려하고 있다고 느끼지만 구성원 입장에서는
“무엇부터 해야 하는지 헷갈린다.”
“좋은 분위기인데 방향이 흐려질 때가 있다.”
“위로는 되는데 정리가 부족하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 유지력을 안정적으로 만드는 힘은 매우 좋지만 실행 우선순위와 현실적인 정리 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 배려만 하는 것이 아니라 “지금 가장 먼저 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 구성원이 힘들어할 때 너무 오래 위로와 공감만 이어가기보다, 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“지금 여러 가지를 한꺼번에 하려고 하기보다 이번 주는 상담 약속 확보 하나에 집중해보시지요.”
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 NP(배려,공감)와 AC(협조,조율)가 함께 높은 리더는 구성원의 부담을 너무 배려하다가 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 조직 분위기가 느슨해지면 활동량과 상담 움직임도 함께 떨어질 가능성이 있습니다. 그래서 충분히 공감해준 뒤에는 반드시 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 실행 우선순위를 정리해주는 힘이 더해지면 조직의 활동량과 생산성 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_AC_FC:{manner:`OOO님은 조직 안에서 사람을 안정적으로 챙기고 구성원의 감정 흐름과 조직 분위기를 부드럽게 유지하려는 힘이 강한 성향입니다.

NP(배려,공감)의 점수가 높기 때문에 구성원이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 조직원 입장에서는
“내 이야기를 편하게 할 수 있다.”
“사람을 함부로 대하지 않는다.”
“정서적으로 안정감을 준다.”
라는 느낌을 받는 경우가 많습니다.

그리고 두 번째로 AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 구성원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 편안하게 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 조직 안에서 분위기를 부드럽게 풀어주는 표현은 부족해질 수 있습니다. 리더 본인은 충분히 배려하고 조심해서 이야기하고 있다고 느끼지만 구성원 입장에서는
“조금 어렵게 느껴진다.”
“칭찬과 반응 표현이 부족하다.”
“긴장감이 오래 유지된다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 유지력을 안정적으로 만드는 힘은 매우 좋지만 구성원이 심리적으로 편하게 움직일 수 있는 분위기를 만드는 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 배려만 하는 것이 아니라 구성원이 “편하게 움직일 수 있는 반응과 표현”을 의식적으로 자주 사용하는 습관이 중요합니다.

특히 OOO님은 구성원이 힘들어할 때 차분하게 듣기만 하기보다
“고생 많으셨습니다.”
“요즘 너무 잘 하시고 계세요^^”
“수고 많았어요 이 부분은  제가 높게 평가합니다.”
같은 멘트를 먼저 넣어주는 것이 필요합니다.

또한 FC(친화,표현)가 낮은 리더는 표정과 반응이 차분하게 유지되는 경우가 많기 때문에 구성원은 자신이 혼나고 있다고 오해할 수도 있습니다. 그래서 의식적으로 미소를 띄고 고개를 끄덕이며 들어주는 반응을 추가하는 것만으로도 조직 분위기가 훨씬 편안해질 수 있습니다.

그리고 NP(배려,공감)와 AC(협조,조율)가 함께 높은 리더는 구성원의 부담을 너무 배려하다가 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그래서 충분히 공감해준 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결되는 표현을 함께 정리해주는 것이 중요합니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 밝은 반응과 편안한 분위기가 더해지면 조직의 활동량과 생산성, 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_CP_NP:{manner:`OOO님은 조직 안에서 흐름을 차분하게 정리하고 현실적으로 움직임을 관리하려는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 조직원 입장에서는
“상황 정리가 명확하다.”
“감정적으로 흔들리지 않는다.”
“현실적으로 방향을 잡아준다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 조직의 실행 움직임과 운영 흐름도 중요하게 생각합니다. 필요할 때는 분명하게 방향을 정리하고 움직임이 흐트러질 때는 다시 중심을 잡아주려는 힘도 있습니다. 그래서 구성원 입장에서는
“조직 흐름을 놓치지 않는다.”
“결국 움직이게 만든다.”
“성과 방향이 분명하다.”
라는 느낌을 받게 됩니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 구성원의 감정 상태를 따뜻하게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 설명하고 방향도 잘 잡아주고 있다고 느끼지만 구성원 입장에서는
“조금 차갑게 느껴질 때가 있다.”
“내 마음까지 충분히 이해받는 느낌은 아니다.”
“결론이 빨리 나온다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 실행력과 생산성을 안정적으로 끌고 가는 힘은 매우 좋지만 구성원의 감정과 심리 상태를 충분히 공감해주는 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 결과와 방향만 이야기하는 것이 아니라 현재 구성원의 감정 상태와 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“지금 왜 안 되고 있을까요?”
라고 바로 원인을 정리하기보다
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근에 가장 지쳤던 순간은 언제였나요?”
같은 질문을 먼저 넣어주는 것이 필요합니다.

또한 A(이성,판단)와 CP(기준,결단)가 함께 높은 리더는 문제를 빨리 해결하려는 힘이 강하기 때문에 구성원이 충분히 이야기하기 전에 결론부터 정리하는 경우도 생길 수 있습니다. 그러다 보면 구성원은 “내 마음은 이해받지 못했다”라고 느끼면서 움직임까지 줄어들 가능성이 있습니다. 그래서 충분히 듣고 난 뒤 행동 방향을 정리해주는 순서가 매우 중요합니다.

그리고 OOO님의 성향은 실행 움직임을 끌어가는 힘이 좋기 때문에 공감 이후에는 반드시 실제 행동으로 연결해주는 흐름이 필요합니다. 예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 현실적인 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 흐름과 생산성을 안정적으로 유지하는 힘이 매우 뛰어난 성향입니다. 여기에 따뜻한 공감과 감정 확인이 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_CP_FC:{manner:`OOO님은 조직 안에서 흐름을 차분하게 정리하고 현실적으로 움직임을 관리하려는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 조직원 입장에서는
“상황 정리가 명확하다.”
“감정적으로 흔들리지 않는다.”
“현실적으로 방향을 잡아준다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 조직의 실행 움직임과 운영 흐름도 중요하게 생각합니다. 필요할 때는 분명하게 방향을 정리하고 움직임이 흐트러질 때는 다시 중심을 잡아주려는 힘도 있습니다. 그래서 구성원 입장에서는
“조직 흐름을 놓치지 않는다.”
“결국 움직이게 만든다.”
“성과 방향이 분명하다.”
라는 느낌을 받게 됩니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 조직 안에서 분위기를 부드럽게 풀어주거나 감정을 편안하게 표현하는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 설명하고 방향도 잘 잡아주고 있다고 느끼지만 구성원 입장에서는
“조금 어렵게 느껴진다.”
“칭찬과 반응 표현이 부족하다.”
“긴장감이 오래 유지된다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 실행력과 생산성을 안정적으로 끌고 가는 힘은 매우 좋지만 구성원이 심리적으로 편하게 움직일 수 있는 분위기를 만드는 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 결과와 방향만 이야기하는 것이 아니라 구성원이 편하게 움직일 수 있는 반응과 표현을 의식적으로 자주 사용하는 습관이 중요합니다.

특히 OOO님은
“이 부분은 이렇게 정리하겠습니다.”
처럼 결론 중심으로만 이야기하기보다
“요즘 너무 잘 하시고 계세요^^”
“결과도 중요하지만 지금 과정도 아주 잘하고 있습니다.”
“지금 계속 움직이고 계신 부분이 정말 좋습니다.”
같은 짧은 인정 표현을 자주 넣어주는 것이 필요합니다.

또한 A(이성,판단)와 CP(기준,결단)가 함께 높은 리더는 문제를 빨리 해결하려는 힘이 강하기 때문에 구성원이 충분히 이야기하기 전에 결론부터 정리하는 경우도 생길 수 있습니다. 거기에 FC(친화,표현)까지 낮아지면 말투와 분위기가 더 단단하게 전달될 가능성도 있습니다. 그래서 의식적으로 미소를 띄고 고개를 끄덕이며 들어주는 반응을 추가하는 것만으로도 조직 분위기가 훨씬 편안해질 수 있습니다.

그리고 OOO님의 성향은 실행 움직임을 끌어가는 힘이 좋기 때문에 분위기를 편안하게 만든 뒤에는 반드시 실제 행동으로 연결해주는 흐름이 필요합니다. 예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 현실적인 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 흐름과 생산성을 안정적으로 유지하는 힘이 매우 뛰어난 성향입니다. 여기에 부드러운 반응과 따뜻한 표현이 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_CP_AC:{manner:`OOO님은 조직 안에서 흐름을 차분하게 정리하고 현실적으로 움직임을 관리하려는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 조직원 입장에서는
“상황 정리가 명확하다.”
“감정적으로 흔들리지 않는다.”
“현실적으로 방향을 잡아준다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 조직의 실행 움직임과 운영 흐름도 중요하게 생각합니다. 필요할 때는 분명하게 방향을 정리하고 움직임이 흐트러질 때는 다시 중심을 잡아주려는 힘도 있습니다. 그래서 구성원 입장에서는
“조직 흐름을 놓치지 않는다.”
“결국 움직이게 만든다.”
“성과 방향이 분명하다.”
라는 느낌을 받게 됩니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 속도와 부담 정도를 세밀하게 살피는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 설명하고 방향도 잘 잡아주고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 빨리 나온다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
“압박처럼 느껴질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 실행력과 생산성을 안정적으로 끌고 가는 힘은 매우 좋지만 구성원의 현재 감정 상태와 부담 정도를 세밀하게 확인하는 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 결과와 방향만 이야기하는 것이 아니라 상대의 현재 흐름과 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“이 부분은 이렇게 정리하겠습니다.”
라고 바로 결론부터 이야기하기보다
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근에 가장 지쳤던 순간은 언제였나요?”
“지금 어떤 부분이 가장 부담되시는 건가요?”
같은 질문을 먼저 넣어주는 것이 필요합니다.

또한 A(이성,판단)와 CP(기준,결단)가 함께 높은 리더는 문제를 빨리 해결하려는 힘이 강하기 때문에 구성원이 충분히 이야기하기 전에 결론부터 정리하는 경우도 생길 수 있습니다. 거기에 AC(협조,조율)까지 낮아지면 상대 입장에서는 “내 상황은 충분히 이해받지 못했다”라고 느끼면서 움직임이 위축될 가능성도 있습니다. 그래서 충분히 듣고 난 뒤 행동 방향을 정리해주는 순서가 매우 중요합니다.

그리고 OOO님의 성향은 실행 움직임을 끌어가는 힘이 좋기 때문에 공감 이후에는 반드시 실제 행동으로 연결해주는 흐름이 필요합니다. 예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 현실적인 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 흐름과 생산성을 안정적으로 유지하는 힘이 매우 뛰어난 성향입니다. 여기에 상대의 부담과 감정 상태를 한 번 더 확인해주는 부드러운 접근이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_NP_CP:{manner:`OOO님은 조직 안에서 상황을 차분하게 정리하고 구성원을 안정적으로 챙기려는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 조직원 입장에서는
“상황 정리가 명확하다.”
“감정적으로 흔들리지 않는다.”
“현실적으로 방향을 잡아준다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 결과만 보는 리더가 아니라 구성원의 감정 상태와 어려움도 함께 보려고 합니다. 구성원이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습도 나타납니다. 그래서 구성원 입장에서는
“내 이야기를 들어주려고 한다.”
“사람을 함부로 대하지 않는다.”
“결과만 보는 사람이 아니다.”
라는 안정감을 느끼게 됩니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 리더 본인은 충분히 설명하고 공감하고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“좋은 방향 설명은 있는데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 유지력을 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 상황 설명과 공감만으로 끝나는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“지금 상황은 이해했습니다.”
라고 정리만 하기보다
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 중요합니다.

또한 A(이성,판단)와 NP(배려,공감)가 함께 높은 리더는 구성원의 감정과 현실 상황을 모두 이해하려는 힘이 좋기 때문에 오히려 결론을 늦게 내리는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 움직임이 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 공감해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

그리고 OOO님의 성향은 조직을 안정적으로 유지하는 힘이 매우 좋은 성향이기 때문에 여기에 실행 움직임을 조금 더 끌어주는 힘이 더해지면 조직의 활동량과 생산성 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_NP_FC:{manner:`OOO님은 조직 안에서 상황을 차분하게 정리하고 구성원을 안정적으로 챙기려는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 조직원 입장에서는
“상황 정리가 명확하다.”
“감정적으로 흔들리지 않는다.”
“현실적으로 방향을 잡아준다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 결과만 보는 리더가 아니라 구성원의 감정 상태와 어려움도 함께 보려고 합니다. 구성원이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습도 나타납니다. 그래서 구성원 입장에서는
“내 이야기를 들어주려고 한다.”
“사람을 함부로 대하지 않는다.”
“결과만 보는 사람이 아니다.”
라는 안정감을 느끼게 됩니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 조직 안에서 분위기를 부드럽게 풀어주거나 감정을 편안하게 표현하는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 설명하고 공감하고 있다고 느끼지만 구성원 입장에서는
“조금 어렵게 느껴질 때가 있다.”
“칭찬과 반응 표현이 부족하다.”
“긴장감이 오래 유지된다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 유지력을 만드는 힘은 매우 좋지만 구성원이 심리적으로 편하게 움직일 수 있는 분위기를 만드는 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 상황 설명과 공감만 하는 것이 아니라 구성원이 편하게 움직일 수 있는 반응과 표현을 의식적으로 자주 사용하는 습관이 중요합니다.

특히 OOO님은
“이 부분은 이렇게 정리하겠습니다.”
처럼 결론 중심으로만 이야기하기보다
“고생 많으셨습니다.”
“지금 계속 움직이고 계신 부분이 정말 좋습니다.”
“오늘 분위기 좋게 잘 버텨주셨습니다.”
같은 짧은 인정 표현을 자주 넣어주는 것이 필요합니다.

또한 A(이성,판단)와 NP(배려,공감)가 함께 높은 리더는 문제를 빨리 정리하면서도 구성원을 챙기려는 마음이 함께 있기 때문에 속으로는 배려하고 있어도 표정과 반응은 차분하게 유지되는 경우가 많습니다. 거기에 FC(친화,표현)까지 낮아지면 구성원 입장에서는 “혼나고 있는 건가?”라고 오해할 수도 있습니다. 그래서 의식적으로 미소를 띄고 고개를 끄덕이며 들어주는 반응을 추가하는 것만으로도 조직 분위기가 훨씬 편안해질 수 있습니다.

그리고 OOO님의 성향은 실행 움직임을 끌어가는 힘도 좋은 편이기 때문에 분위기를 안정적으로 만든 뒤에는 반드시 실제 행동으로 연결해주는 흐름이 필요합니다. 예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 현실적인 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 흐름과 안정감을 함께 유지하는 힘이 매우 뛰어난 성향입니다. 여기에 조금 더 부드러운 반응과 밝은 표현이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_NP_AC:{manner:`OOO님은 조직 안에서 상황을 차분하게 정리하고 구성원을 안정적으로 챙기려는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 조직원 입장에서는
“상황 정리가 명확하다.”
“감정적으로 흔들리지 않는다.”
“현실적으로 방향을 잡아준다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 결과만 보는 리더가 아니라 구성원의 감정 상태와 어려움도 함께 보려고 합니다. 구성원이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습도 나타납니다. 그래서 구성원 입장에서는
“내 이야기를 들어주려고 한다.”
“사람을 함부로 대하지 않는다.”
“결과만 보는 사람이 아니다.”
라는 안정감을 느끼게 됩니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 속도와 부담 정도를 세밀하게 살피는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 설명하고 공감하고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 빨리 나온다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
“압박처럼 느껴질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 실행력과 안정감을 함께 끌고 가는 힘은 매우 좋지만 구성원의 현재 감정 상태와 부담 정도를 세밀하게 확인하는 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 결과와 방향만 이야기하는 것이 아니라 상대의 현재 흐름과 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“이 부분은 이렇게 정리하겠습니다.”
라고 바로 결론부터 이야기하기보다
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근에 가장 지쳤던 순간은 언제였나요?”
“지금 어떤 부분이 가장 부담되시는 건가요?”
같은 질문을 먼저 넣어주는 것이 필요합니다.

또한 A(이성,판단)와 NP(배려,공감)가 함께 높은 리더는 문제를 빨리 정리하면서도 구성원을 챙기려는 마음이 함께 있기 때문에 속으로는 배려하고 있어도 행동 속도가 빨라지는 경우가 많습니다. 거기에 AC(협조,조율)까지 낮아지면 구성원 입장에서는 “내 상황을 충분히 설명하기 전에 결론이 나온다”라고 느끼면서 심리적으로 위축될 가능성도 있습니다. 그래서 충분히 듣고 난 뒤 행동 방향을 정리해주는 순서가 매우 중요합니다.

그리고 OOO님의 성향은 실행 움직임을 끌어가는 힘이 좋기 때문에 공감 이후에는 반드시 실제 행동으로 연결해주는 흐름이 필요합니다. 예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 현실적인 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 흐름과 안정감을 함께 유지하는 힘이 매우 뛰어난 성향입니다. 여기에 상대의 감정 속도와 부담을 한 번 더 확인해주는 부드러운 접근이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_FC_CP:{manner:`OOO님은 조직 안에서 상황을 빠르게 정리하고 활동 분위기를 살리는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 조직원 입장에서는
“상황 정리가 명확하다.”
“현실적으로 방향을 잡아준다.”
“무엇을 해야 하는지 분명하다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로 FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 구성원 입장에서는
“조직 분위기가 답답하지 않다.”
“같이 움직이면 힘이 난다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 리더 본인은 충분히 설명하고 분위기도 좋게 만들고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“좋은 분위기인데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 활동성을 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 분위기와 공감만 만드는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 중요합니다.

또한 A(이성,판단)와 FC(친화,표현)가 함께 높은 리더는 상황 판단과 분위기 조성은 좋은 편이지만 조직 분위기가 너무 편안해지면 실행 긴장감이 약해질 가능성도 있습니다. 그러다 보면 활동량은 바쁜데 실제 계약 흐름은 약해지는 상황도 생길 수 있습니다. 그래서 충분히 분위기를 살려준 뒤에는 반드시 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

그리고 OOO님의 성향은 조직 분위기를 살리면서도 흐름을 현실적으로 정리하는 힘이 좋은 성향이기 때문에 여기에 실행 움직임을 조금 더 끌어주는 힘이 더해지면 조직의 활동량과 생산성 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_FC_NP:{manner:`OOO님은 조직 안에서 상황을 빠르게 정리하고 활동 분위기를 살리는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 조직원 입장에서는
“상황 정리가 명확하다.”
“현실적으로 방향을 잡아준다.”
“무엇을 해야 하는지 분명하다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로 FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 구성원 입장에서는
“조직 분위기가 답답하지 않다.”
“같이 움직이면 힘이 난다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 구성원의 감정 상태를 따뜻하게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 설명하고 분위기도 좋게 만들고 있다고 느끼지만 구성원 입장에서는
“조금 차갑게 느껴질 때가 있다.”
“내 마음까지 충분히 이해받는 느낌은 아니다.”
“결론이 빨리 나온다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 활동성을 만드는 힘은 매우 좋지만 구성원의 감정과 심리 상태를 충분히 공감해주는 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 분위기와 결과만 이야기하는 것이 아니라 현재 구성원의 감정 상태와 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근에 가장 지쳤던 순간은 언제였나요?”
같은 질문을 먼저 넣어주는 것이 필요합니다.

또한 A(이성,판단)와 FC(친화,표현)가 함께 높은 리더는 상황 판단과 분위기 조성은 좋은 편이지만 문제를 빨리 정리하려는 힘도 강하기 때문에 구성원이 충분히 이야기하기 전에 결론부터 정리하는 경우도 생길 수 있습니다. 그러다 보면 구성원은 “내 마음은 충분히 이해받지 못했다”라고 느끼면서 움직임까지 줄어들 가능성이 있습니다. 그래서 충분히 듣고 난 뒤 행동 방향을 정리해주는 순서가 매우 중요합니다.

그리고 OOO님의 성향은 실행 움직임을 끌어가는 힘도 좋은 편이기 때문에 공감 이후에는 반드시 실제 행동으로 연결해주는 흐름이 필요합니다. 예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 현실적인 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직 분위기를 살리면서도 흐름을 현실적으로 정리하는 힘이 매우 뛰어난 성향입니다. 여기에 따뜻한 공감과 감정 확인이 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_FC_AC:{manner:`OOO님은 조직 안에서 상황을 빠르게 정리하고 활동 분위기를 살리는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 조직원 입장에서는
“상황 정리가 명확하다.”
“현실적으로 방향을 잡아준다.”
“무엇을 해야 하는지 분명하다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로 FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 구성원 입장에서는
“조직 분위기가 답답하지 않다.”
“같이 움직이면 힘이 난다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 속도와 부담 정도를 세밀하게 살피는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 설명하고 분위기도 좋게 만들고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 빨리 나온다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
“압박처럼 느껴질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 활동성을 만드는 힘은 매우 좋지만 구성원의 현재 감정 상태와 부담 정도를 세밀하게 확인하는 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 분위기와 결과만 이야기하는 것이 아니라 상대의 현재 흐름과 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“지금 어떤 부분이 가장 부담되시는 건가요?”
같은 질문을 먼저 넣어주는 것이 필요합니다.

또한 A(이성,판단)와 FC(친화,표현)가 함께 높은 리더는 상황 판단과 분위기 조성은 좋은 편이지만 움직임 속도가 빨라지는 경우도 많습니다. 거기에 AC(협조,조율)까지 낮아지면 구성원 입장에서는 “내 상황을 충분히 설명하기 전에 결론이 나온다”라고 느끼면서 심리적으로 위축될 가능성도 있습니다. 그래서 충분히 듣고 난 뒤 행동 방향을 정리해주는 순서가 매우 중요합니다.

그리고 OOO님의 성향은 실행 움직임을 끌어가는 힘도 좋은 편이기 때문에 공감 이후에는 반드시 실제 행동으로 연결해주는 흐름이 필요합니다. 예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 현실적인 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직 분위기를 살리면서도 흐름을 현실적으로 정리하는 힘이 매우 뛰어난 성향입니다. 여기에 상대의 감정 속도와 부담을 한 번 더 확인해주는 부드러운 접근이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다`,improvement:``},A_AC_CP:{manner:`OOO님은 조직 안에서 흐름을 현실적으로 정리하고 조직 전체 움직임을 안정적으로 유지하려는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 조직원 입장에서는
“상황 정리가 명확하다.”
“현실적으로 방향을 잡아준다.”
“무엇을 해야 하는지 분명하다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로 AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름도 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 구성원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 리더 본인은 충분히 설명하고 조율하고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“움직임을 강하게 끌어주는 느낌은 부족하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 유지력을 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 상황 설명과 조율만으로 끝나는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 구성원이 힘들어할 때 너무 오래 설명과 조율만 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 A(이성,판단)와 AC(협조,조율)가 함께 높은 리더는 조직 흐름을 안정적으로 유지하려는 힘이 좋은 대신 구성원의 부담을 너무 고려하다가 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

그리고 OOO님의 성향은 원래 조직을 안정적으로 유지하고 문제를 현실적으로 정리하는 힘이 매우 뛰어난 성향입니다. 여기에 실행 움직임을 조금 더 끌어주는 힘이 더해지면 조직의 활동량과 생산성 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_AC_NP:{manner:`OOO님은 조직 안에서 흐름을 현실적으로 정리하고 조직 전체 움직임을 안정적으로 유지하려는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 조직원 입장에서는
“상황 정리가 명확하다.”
“현실적으로 방향을 잡아준다.”
“무엇을 해야 하는지 분명하다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로 AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름도 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 구성원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 구성원의 감정 상태를 따뜻하게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 설명하고 조율하고 있다고 느끼지만 구성원 입장에서는
“조금 차갑게 느껴질 때가 있다.”
“내 마음까지 충분히 이해받는 느낌은 아니다.”
“결론이 빨리 나온다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 운영 흐름을 만드는 힘은 매우 좋지만 구성원의 감정과 심리 상태를 충분히 공감해주는 부분은 부족해질 수 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 상황 설명과 조율만 하는 것이 아니라 현재 구성원의 감정 상태와 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“이 부분은 이렇게 정리하겠습니다.”
라고 바로 결론부터 이야기하기보다
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근에 가장 지쳤던 순간은 언제였나요?”
“지금 어떤 부분이 가장 부담되시는 건가요?”
같은 질문을 먼저 넣어주는 것이 필요합니다.

또한 A(이성,판단)와 AC(협조,조율)가 함께 높은 리더는 조직 흐름을 안정적으로 유지하려는 힘이 좋은 대신 구성원의 부담을 너무 고려하다가 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

그리고 OOO님의 성향은 원래 조직을 안정적으로 유지하고 문제를 현실적으로 정리하는 힘이 매우 뛰어난 성향입니다. 여기에 따뜻한 공감과 감정 확인이 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_AC_FC:{manner:`OOO님은 조직 안에서 흐름을 현실적으로 정리하고 조직 전체 움직임을 안정적으로 유지하려는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 조직원 입장에서는
“상황 정리가 명확하다.”
“현실적으로 방향을 잡아준다.”
“무엇을 해야 하는지 분명하다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로 AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름도 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 흐름이 흔들리지 않도록 안정적으로 조율하려는 모습도 나타납니다. 그래서 조직원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“함께 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 감정 표현과 반응 표현은 비교적 절제되어 보일 수 있습니다. 실제로는 충분히 배려하고 조심하고 있지만 표정 변화나 표현이 크지 않다 보니 구성원 입장에서는
“조금 어렵게 느껴진다.”
“칭찬 표현이 적게 느껴진다.”
“조심스럽게 느껴질 때가 있다.”
라고 받아들이는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 운영 흐름을 만드는 힘은 매우 좋지만 구성원이 심리적으로 편하게 움직일 수 있는 분위기를 만드는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 상황 설명과 조율만 하는 것이 아니라 짧더라도 반응과 인정 표현을 자주 전달해주는 습관이 중요합니다.

특히 OOO님은
“고생 많으셨습니다.”
“지금 계속 움직이고 계신 부분이 좋습니다.”
“오늘 고객 연락 흐름 잘 유지하고 계십니다.”
같은 짧은 인정 표현을 의식적으로 자주 사용하는 것이 좋습니다.

또한 A(이성,판단)와 AC(협조,조율)가 함께 높은 리더는 조직 흐름을 안정적으로 유지하려는 힘이 좋은 대신 분위기를 너무 조용하게 끌고 갈 수도 있습니다. 그러다 보면 조직 전체 에너지가 차분해지면서 활동량까지 함께 내려갈 가능성도 있습니다. 그래서 현실적인 방향 정리 이후에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하고 문제를 현실적으로 정리하는 힘이 매우 뛰어난 성향입니다. 여기에 조금 더 부드러운 반응과 표현이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_CP_NP:{manner:`OOO님은 조직 안에서 분위기를 밝게 만들고 움직임 에너지를 끌어올리는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 조직원 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 단순히 분위기만 좋은 것이 아니라 실제 움직임과 실행 흐름도 중요하게 생각합니다. 필요할 때는 분명하게 방향을 정리하고 활동량이 떨어질 때는 다시 흐름을 끌어올리려는 힘도 있습니다. 그래서 구성원 입장에서는
“결국 움직이게 만든다.”
“실행 방향이 분명하다.”
“성과 흐름을 놓치지 않는다.”
라는 느낌을 받게 됩니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 구성원의 감정 상태를 깊게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 리더 본인은 분위기도 좋게 만들고 실행 방향도 잘 잡아주고 있다고 느끼지만 구성원 입장에서는
“속마음까지 충분히 이해받는 느낌은 아니다.”
“힘든 이야기를 오래 하기는 어렵다.”
“결론이 비교적 빨리 나온다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 실행 에너지를 끌어올리는 힘은 매우 좋지만 구성원의 감정과 심리 상태를 충분히 공감해주는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 분위기와 실행만 강조하는 것이 아니라 현재 구성원의 감정 상태와 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“이번 주는 조금 더 움직여보시지요.”
라고 바로 방향만 이야기하기보다
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근에 가장 지치는 순간은 언제였나요?”
같은 질문을 먼저 넣어주는 것이 좋습니다.

또한 FC(친화,표현)와 CP(기준,결단)가 함께 높은 리더는 분위기를 살리면서도 실행 움직임을 강하게 끌어가는 힘이 좋기 때문에 조직 에너지를 빠르게 끌어올리는 장점이 있습니다. 다만 활동 흐름에 집중하다 보면 구성원이 지치고 있는 신호를 놓칠 가능성도 있습니다. 그래서 충분히 듣고 공감해준 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 흐름이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직 분위기와 실행 에너지를 끌어올리는 힘이 매우 뛰어난 성향입니다. 여기에 조금 더 따뜻한 공감과 감정 확인이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_CP_A:{manner:`OOO님은 조직 안에서 분위기를 밝게 만들고 실행 에너지를 끌어올리는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 조직원 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 단순히 분위기만 좋은 것이 아니라 실제 움직임과 실행 흐름도 중요하게 생각합니다. 필요할 때는 분명하게 방향을 정리하고 활동량이 떨어질 때는 다시 흐름을 끌어올리려는 힘도 있습니다. 그래서 구성원 입장에서는
“결국 움직이게 만든다.”
“실행 방향이 분명하다.”
“성과 흐름을 놓치지 않는다.”
라는 느낌을 받게 됩니다.

다만 A(이성,판단)의 점수가 가장 낮으면 분위기와 실행 중심으로 조직을 운영하다가 실제 문제 원인과 우선순위를 차분하게 정리하는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 분위기도 만들고 움직임도 끌어가고 있다고 느끼지만 구성원 입장에서는
“무엇부터 해야 하는지 헷갈릴 때가 있다.”
“열심히는 하는데 방향 정리가 부족하다.”
“분위기에 따라 움직임이 달라질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 실행 에너지를 끌어올리는 힘은 매우 좋지만 현실적인 우선순위와 흐름 정리는 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 분위기와 실행만 강조하는 것이 아니라 “지금 가장 먼저 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“일단 많이 움직여보시지요.”
라고 넓게 이야기하기보다
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 우선순위를 짧고 명확하게 정리해주는 것이 좋습니다.

또한 FC(친화,표현)와 CP(기준,결단)가 함께 높은 리더는 조직 에너지를 빠르게 끌어올리는 장점이 매우 강합니다. 다만 분위기와 추진력이 강해질수록 구성원이 여러 가지를 동시에 하려다 흐름이 분산될 가능성도 있습니다. 그래서 활동량을 늘리는 것과 동시에 “지금 가장 중요한 한 가지”를 반복해서 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성 흐름이 더 안정적으로 올라가게 됩니다.

그리고 OOO님의 성향은 원래 조직 분위기와 실행 움직임을 강하게 끌어올리는 힘이 매우 뛰어난 성향입니다. 여기에 현실적인 우선순위 정리와 흐름 관리가 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_CP_AC:{manner:`OOO님은 조직 안에서 분위기를 밝게 만들고 실행 에너지를 끌어올리는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 조직원 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 단순히 분위기만 좋은 것이 아니라 실제 움직임과 실행 흐름도 중요하게 생각합니다. 필요할 때는 분명하게 방향을 정리하고 활동량이 떨어질 때는 다시 흐름을 끌어올리려는 힘도 있습니다. 그래서 구성원 입장에서는
“결국 움직이게 만든다.”
“실행 방향이 분명하다.”
“성과 흐름을 놓치지 않는다.”
라는 느낌을 받게 됩니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 속도와 부담 정도를 세밀하게 살피는 부분은 부족해질 수 있습니다. 리더 본인은 분위기도 좋게 만들고 실행 방향도 잘 잡아주고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 빠르게 느껴질 때가 있다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
“압박처럼 느껴질 때가 있다.”
라고 받아들이는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 실행 에너지를 끌어올리는 힘은 매우 좋지만 구성원의 현재 감정 상태와 부담 정도를 세밀하게 확인하는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 분위기와 실행만 강조하는 것이 아니라 상대의 현재 흐름과 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
라고 방향을 이야기하기 전에
“지금 가장 부담되는 부분은 어떤 건가요?”
“최근 활동하면서 가장 막히는 부분은 어떤 건가요?”
같은 질문을 먼저 넣어주는 것이 좋습니다.

또한 FC(친화,표현)와 CP(기준,결단)가 함께 높은 리더는 조직 에너지를 빠르게 끌어올리는 장점이 매우 강합니다. 다만 분위기와 추진력이 강해질수록 구성원이 따라오는 속도까지 세밀하게 살피지 못할 가능성도 있습니다. 그러다 보면 조직 안에서 활동량은 늘어나지만 심리적으로 지치는 구성원이 생길 수도 있습니다. 그래서 충분히 듣고 난 뒤
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 흐름이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직 분위기와 실행 움직임을 강하게 끌어올리는 힘이 매우 뛰어난 성향입니다. 여기에 상대의 속도와 부담을 한 번 더 확인해주는 조율이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_NP_CP:{manner:`OOO님은 조직 안에서 분위기를 밝게 만들고 사람의 마음을 편안하게 움직이게 하는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 조직원 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 분위기만 좋은 것이 아니라 구성원의 감정 상태와 어려움도 함께 보려고 합니다. 구성원이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습도 나타납니다. 그래서 조직원 입장에서는
“내 이야기를 잘 들어준다.”
“사람을 함부로 대하지 않는다.”
“정서적으로 안정감을 준다.”
라는 느낌을 받게 됩니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 리더 본인은 충분히 분위기도 좋게 만들고 구성원도 잘 챙기고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“좋은 분위기인데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 유지력을 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 구성원이 힘들어할 때 공감만 오래 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 FC(친화,표현)와 NP(배려,공감)가 함께 높은 리더는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 구성원이 힘들어할 때 너무 이해하고 배려만 하다 보면 활동량 관리가 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 공감해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직 분위기와 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 실행 움직임을 조금 더 끌어주는 힘이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_NP_A:{manner:`OOO님은 조직 안에서 분위기를 밝게 만들고 사람의 마음을 편안하게 움직이게 하는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 조직원 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 분위기만 좋은 것이 아니라 구성원의 감정 상태와 어려움도 함께 보려고 합니다. 구성원이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습도 나타납니다. 그래서 조직원 입장에서는
“내 이야기를 잘 들어준다.”
“사람을 함부로 대하지 않는다.”
“정서적으로 안정감을 준다.”
라는 느낌을 받게 됩니다.

다만 A(이성,판단)의 점수가 가장 낮으면 분위기와 공감 중심으로 조직을 운영하다가 실제 문제 원인과 우선순위를 차분하게 정리하는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 분위기도 좋게 만들고 구성원도 잘 챙기고 있다고 느끼지만 구성원 입장에서는
“무엇부터 해야 하는지 헷갈릴 때가 있다.”
“열심히는 하는데 방향 정리가 부족하다.”
“분위기에 따라 움직임이 달라질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 유지력을 만드는 힘은 매우 좋지만 현실적인 우선순위와 흐름 정리는 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 “지금 가장 먼저 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 구성원이 힘들어할 때 공감만 오래 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 FC(친화,표현)와 NP(배려,공감)가 함께 높은 리더는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 분위기와 공감에 집중하다 보면 활동 방향이 흐려질 가능성도 있습니다. 그래서 충분히 듣고 공감해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직 분위기와 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 현실적인 흐름 정리와 우선순위 관리가 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_NP_AC:{manner:`OOO님은 조직 안에서 분위기를 밝게 만들고 사람의 마음을 편안하게 움직이게 하는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 조직원 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 분위기만 좋은 것이 아니라 구성원의 감정 상태와 어려움도 함께 보려고 합니다. 구성원이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습도 나타납니다. 그래서 조직원 입장에서는
“내 이야기를 잘 들어준다.”
“사람을 함부로 대하지 않는다.”
“정서적으로 안정감을 준다.”
라는 느낌을 받게 됩니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 속도와 부담 정도를 세밀하게 살피는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 분위기도 좋게 만들고 구성원도 잘 챙기고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 빠르게 느껴질 때가 있다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
“압박처럼 느껴질 때가 있다.”
라고 받아들이는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 유지력을 만드는 힘은 매우 좋지만 구성원의 현재 감정 상태와 부담 정도를 세밀하게 확인하는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 상대의 현재 흐름과 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은 구성원이 힘들어할 때 공감만 오래 이어가기보다 현재 부담되는 부분을 먼저 확인한 뒤 행동 방향을 함께 정리해주는 흐름이 중요합니다.

예를 들어
“지금 가장 부담되는 부분은 어떤 건가요?”
“최근 활동하면서 가장 막히는 부분은 어떤 건가요?”
처럼 먼저 듣고 난 뒤
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
처럼 실제 움직임으로 연결해주는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 FC(친화,표현)와 NP(배려,공감)가 함께 높은 리더는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 분위기와 공감에 집중하다 보면 조직 전체 움직임이 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 공감해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직 분위기와 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 상대의 속도와 부담을 한 번 더 확인해주는 조율이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다。`,improvement:``},FC_A_CP:{manner:`OOO님은 조직 안에서 분위기를 밝게 만들면서도 현실적인 흐름을 빠르게 정리하는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 조직원 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 단순히 분위기만 좋은 것이 아니라 현재 상황을 현실적으로 정리하려는 힘도 함께 나타납니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 객관적으로 보며 문제 원인을 빠르게 정리하려는 모습도 있습니다. 그래서 조직원 입장에서는
“현실적으로 방향을 잡아준다.”
“상황 정리가 빠르다.”
“무엇을 해야 하는지 이해가 된다.”
라는 신뢰감을 느끼는 경우가 많습니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 리더 본인은 충분히 분위기도 좋게 만들고 현실적인 정리도 잘하고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“좋은 분위기인데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 활동 에너지를 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 분위기와 설명만 만드는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“잘하고 계십니다.”
라고 격려만 이어가기보다
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 FC(친화,표현)와 A(이성,판단)가 함께 높은 리더는 조직 분위기를 밝게 유지하면서도 흐름 정리를 잘하는 장점이 있습니다. 다만 분위기가 좋아질수록 실행 긴장감까지 함께 약해질 가능성도 있습니다. 그래서 활동 방향과 우선순위를 짧고 반복적으로 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 살아나게 됩니다.

OOO님의 성향은 원래 조직 분위기와 활동 에너지를 끌어올리는 힘이 매우 뛰어난 성향입니다. 여기에 실행 움직임을 조금 더 끌어주는 힘이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_A_NP:{manner:`OOO님은 조직 안에서 분위기를 밝게 만들면서도 현실적인 흐름을 빠르게 정리하는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 조직원 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 단순히 분위기만 좋은 것이 아니라 현재 상황을 현실적으로 정리하려는 힘도 함께 나타납니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 객관적으로 보며 문제 원인을 빠르게 정리하려는 모습도 있습니다. 그래서 조직원 입장에서는
“현실적으로 방향을 잡아준다.”
“상황 정리가 빠르다.”
“무엇을 해야 하는지 이해가 된다.”
라는 신뢰감을 느끼는 경우가 많습니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 구성원의 감정 상태를 깊게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 분위기도 좋게 만들고 현실적인 정리도 잘하고 있다고 느끼지만 구성원 입장에서는
“속마음까지 충분히 이해받는 느낌은 아니다.”
“힘든 이야기를 오래 하기는 어렵다.”
“결론이 비교적 빨리 나온다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 활동 에너지를 만드는 힘은 매우 좋지만 구성원의 감정과 심리 상태를 충분히 공감해주는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 분위기와 설명만 만드는 것이 아니라 현재 구성원의 감정 상태와 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
라고 방향만 이야기하기보다
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근 활동하면서 가장 지치는 순간은 언제였나요?”
같은 질문을 먼저 넣어주는 것이 좋습니다.

또한 FC(친화,표현)와 A(이성,판단)가 함께 높은 리더는 조직 분위기를 밝게 유지하면서도 흐름 정리를 잘하는 장점이 있습니다. 다만 분위기와 활동 흐름에 집중하다 보면 구성원이 지치고 있는 신호를 놓칠 가능성도 있습니다. 그래서 충분히 듣고 공감해준 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 흐름이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직 분위기와 활동 에너지를 끌어올리는 힘이 매우 뛰어난 성향입니다. 여기에 따뜻한 공감과 감정 확인이 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_A_AC:{manner:`OOO님은 조직 안에서 분위기를 밝게 만들면서도 현실적인 흐름을 빠르게 정리하는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 조직원 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 단순히 분위기만 좋은 것이 아니라 현재 상황을 현실적으로 정리하려는 힘도 함께 나타납니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 객관적으로 보며 문제 원인을 빠르게 정리하려는 모습도 있습니다. 그래서 조직원 입장에서는
“현실적으로 방향을 잡아준다.”
“상황 정리가 빠르다.”
“무엇을 해야 하는지 이해가 된다.”
라는 신뢰감을 느끼는 경우가 많습니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 속도와 부담 정도를 세밀하게 살피는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 분위기도 좋게 만들고 현실적인 정리도 잘하고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 빠르게 느껴질 때가 있다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
“압박처럼 느껴질 때가 있다.”
라고 받아들이는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 활동 에너지를 만드는 힘은 매우 좋지만 구성원의 현재 감정 상태와 부담 정도를 세밀하게 확인하는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 분위기와 설명만 만드는 것이 아니라 상대의 현재 흐름과 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
라고 방향만 이야기하기보다
“지금 가장 부담되는 부분은 어떤 건가요?”
“최근 활동하면서 가장 막히는 부분은 어떤 건가요?”
같은 질문을 먼저 넣어주는 것이 좋습니다.

또한 FC(친화,표현)와 A(이성,판단)가 함께 높은 리더는 조직 분위기를 밝게 유지하면서도 흐름 정리를 잘하는 장점이 있습니다. 다만 분위기와 활동 흐름에 집중하다 보면 구성원이 따라오는 속도까지 세밀하게 살피지 못할 가능성도 있습니다. 그래서 충분히 듣고 난 뒤
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 흐름이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직 분위기와 활동 에너지를 끌어올리는 힘이 매우 뛰어난 성향입니다. 여기에 상대의 속도와 부담을 한 번 더 확인해주는 조율이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_AC_CP:{manner:`OOO님은 조직 안에서 분위기를 밝고 편안하게 만들면서 사람 간의 관계 흐름을 안정적으로 유지하려는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 조직원 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름도 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 조직원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 편안하게 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 안정감을 느끼는 경우가 많습니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 리더 본인은 충분히 분위기도 좋게 만들고 조직도 잘 챙기고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“좋은 분위기인데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 유지력을 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 구성원이 힘들어할 때 공감과 배려만 오래 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 FC(친화,표현)와 AC(협조,조율)가 함께 높은 리더는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 구성원의 부담을 너무 고려하다 보면 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직 분위기와 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 실행 움직임을 조금 더 끌어주는 힘이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_AC_NP:{manner:`OOO님은 조직 안에서 분위기를 밝고 편안하게 만들면서 사람 간의 관계 흐름을 안정적으로 유지하려는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 조직원 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름도 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 조직원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 편안하게 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 안정감을 느끼는 경우가 많습니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 구성원의 감정 상태를 깊게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 분위기도 좋게 만들고 조직도 잘 챙기고 있다고 느끼지만 구성원 입장에서는
“속마음까지 충분히 이해받는 느낌은 아니다.”
“힘든 이야기를 오래 하기는 어렵다.”
“결론이 비교적 빨리 나온다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 유지력을 만드는 힘은 매우 좋지만 구성원의 감정과 심리 상태를 충분히 공감해주는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 현재 구성원의 감정 상태와 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은 구성원이 힘들어할 때
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근 활동하면서 가장 지치는 순간은 언제였나요?”
같은 질문을 먼저 넣어주는 것이 좋습니다. 그리고 충분히 들은 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
처럼 실제 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

또한 FC(친화,표현)와 AC(협조,조율)가 함께 높은 리더는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 구성원의 부담을 너무 고려하다 보면 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직 분위기와 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 따뜻한 공감과 현실적인 행동 정리가 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_AC_A:{manner:`OOO님은 조직 안에서 분위기를 밝고 편안하게 만들면서 관계 흐름을 안정적으로 유지하려는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 조직원 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름도 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 조직원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 편안하게 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 안정감을 느끼는 경우가 많습니다.

다만 A(이성,판단)의 점수가 가장 낮으면 분위기와 관계 중심으로 조직을 운영하다가 실제 문제 원인과 우선순위를 차분하게 정리하는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 분위기도 좋게 만들고 조직도 잘 챙기고 있다고 느끼지만 구성원 입장에서는
“무엇부터 해야 하는지 헷갈릴 때가 있다.”
“열심히는 하는데 방향 정리가 부족하다.”
“분위기에 따라 움직임이 달라질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 관계 유지력을 만드는 힘은 매우 좋지만 현실적인 우선순위와 흐름 정리는 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 “지금 가장 먼저 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 구성원이 힘들어할 때 공감과 배려만 오래 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 FC(친화,표현)와 AC(협조,조율)가 함께 높은 리더는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 분위기와 공감에 집중하다 보면 조직 전체 움직임이 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직 분위기와 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 현실적인 흐름 정리와 우선순위 관리가 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_CP_NP:{manner:`OOO님은 조직 안에서 흐름을 안정적으로 유지하면서도 실행 움직임을 놓치지 않으려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 조직원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 단순히 분위기만 챙기는 것이 아니라 실제 움직임과 실행 흐름도 중요하게 생각합니다. 활동량이 떨어질 때는 다시 흐름을 끌어올리려 하고 해야 할 부분은 비교적 분명하게 정리하려는 힘도 있습니다. 그래서 조직원 입장에서는
“결국 움직이게 만든다.”
“실행 방향이 분명하다.”
“성과 흐름을 놓치지 않는다.”
라는 느낌을 받게 됩니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 구성원의 감정 상태를 깊게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 조율하고 방향도 잘 잡아주고 있다고 느끼지만 구성원 입장에서는
“속마음까지 충분히 이해받는 느낌은 아니다.”
“힘든 이야기를 오래 하기는 어렵다.”
“결론이 비교적 빨리 나온다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 실행 흐름을 만드는 힘은 매우 좋지만 구성원의 감정과 심리 상태를 충분히 공감해주는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 조율과 방향 정리만 하는 것이 아니라 현재 구성원의 감정 상태와 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
라고 방향만 이야기하기보다
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근 활동하면서 가장 지치는 순간은 언제였나요?”
같은 질문을 먼저 넣어주는 것이 좋습니다.

또한 AC(협조,조율)와 CP(기준,결단)가 함께 높은 리더는 조직 흐름을 안정적으로 유지하면서도 실행 움직임을 끌어가는 힘이 좋은 편입니다. 다만 구성원의 부담을 너무 고려하다 보면 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 흐름이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하면서도 실행 흐름을 끌어가는 힘이 매우 뛰어난 성향입니다. 여기에 따뜻한 공감과 감정 확인이 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_CP_A:{manner:`OOO님은 조직 안에서 흐름을 안정적으로 유지하면서도 실행 움직임을 놓치지 않으려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 조직원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 단순히 분위기만 챙기는 것이 아니라 실제 움직임과 실행 흐름도 중요하게 생각합니다. 활동량이 떨어질 때는 다시 흐름을 끌어올리려 하고 해야 할 부분은 비교적 분명하게 정리하려는 힘도 있습니다. 그래서 조직원 입장에서는
“결국 움직이게 만든다.”
“실행 방향이 분명하다.”
“성과 흐름을 놓치지 않는다.”
라는 느낌을 받게 됩니다.

다만 A(이성,판단)의 점수가 가장 낮으면 분위기와 관계 흐름 중심으로 조직을 운영하다가 실제 문제 원인과 우선순위를 차분하게 정리하는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 조율하고 방향도 잘 잡아주고 있다고 느끼지만 구성원 입장에서는
“무엇부터 해야 하는지 헷갈릴 때가 있다.”
“열심히는 하는데 방향 정리가 부족하다.”
“상황에 따라 움직임이 달라질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 실행 흐름을 만드는 힘은 매우 좋지만 현실적인 우선순위와 흐름 정리는 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 조율과 분위기만 유지하는 것이 아니라 “지금 가장 먼저 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 구성원이 힘들어할 때 공감과 조율만 오래 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 AC(협조,조율)와 CP(기준,결단)가 함께 높은 리더는 조직 흐름을 안정적으로 유지하면서도 실행 움직임을 끌어가는 힘이 좋은 편입니다. 다만 구성원의 부담을 너무 고려하다 보면 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하면서도 실행 흐름을 끌어가는 힘이 매우 뛰어난 성향입니다. 여기에 현실적인 흐름 정리와 우선순위 관리가 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_CP_FC:{manner:`OOO님은 조직 안에서 흐름을 안정적으로 유지하면서도 실행 움직임을 놓치지 않으려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 조직원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 단순히 분위기만 챙기는 것이 아니라 실제 움직임과 실행 흐름도 중요하게 생각합니다. 활동량이 떨어질 때는 다시 흐름을 끌어올리려 하고 해야 할 부분은 비교적 분명하게 정리하려는 힘도 있습니다. 그래서 조직원 입장에서는
“결국 움직이게 만든다.”
“실행 방향이 분명하다.”
“성과 흐름을 놓치지 않는다.”
라는 느낌을 받게 됩니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 감정 표현과 반응 표현은 비교적 절제되어 보일 수 있습니다. 실제로는 충분히 배려하고 조심하고 있지만 표정 변화나 표현이 크지 않다 보니 구성원 입장에서는
“조금 어렵게 느껴진다.”
“칭찬 표현이 적게 느껴진다.”
“조심스럽게 느껴질 때가 있다.”
라고 받아들이는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 실행 흐름을 만드는 힘은 매우 좋지만 구성원이 심리적으로 편하게 움직일 수 있는 분위기를 만드는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 조율과 방향 정리만 하는 것이 아니라 짧더라도 반응과 인정 표현을 자주 전달해주는 습관이 중요합니다.

특히 OOO님은
“고생 많으셨습니다.”
“지금 계속 움직이고 계신 부분이 좋습니다.”
“오늘 고객 연락 흐름 잘 유지하고 계십니다.”
같은 짧은 인정 표현을 의식적으로 자주 사용하는 것이 좋습니다.

또한 AC(협조,조율)와 CP(기준,결단)가 함께 높은 리더는 조직 흐름을 안정적으로 유지하면서도 실행 움직임을 끌어가는 힘이 좋은 편입니다. 다만 분위기를 너무 차분하게 유지하다 보면 조직 전체 에너지가 함께 내려갈 가능성도 있습니다. 그래서 의식적으로 미소를 띄고 고개를 끄덕이며 들어주는 반응을 추가하는 것만으로도 조직 분위기가 훨씬 편안해질 수 있습니다.

그리고 충분히 듣고 조율해준 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 흐름이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하면서도 실행 흐름을 끌어가는 힘이 매우 뛰어난 성향입니다. 여기에 조금 더 부드러운 반응과 밝은 표현이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_NP_CP:{manner:`OOO님은 조직 안에서 관계 흐름을 안정적으로 유지하면서 구성원을 편안하게 이끌어가려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 조직원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 분위기만 유지하는 것이 아니라 구성원의 감정 상태와 어려움도 함께 보려고 합니다. 구성원이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습도 나타납니다. 그래서 조직원 입장에서는
“내 이야기를 잘 들어준다.”
“사람을 함부로 대하지 않는다.”
“정서적으로 안정감을 준다.”
라는 느낌을 받게 됩니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 리더 본인은 충분히 조율하고 구성원도 잘 챙기고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“좋은 분위기인데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 관계 유지력을 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 조율만 만드는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 구성원이 힘들어할 때 공감과 배려만 오래 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 AC(협조,조율)와 NP(배려,공감)가 함께 높은 리더는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 구성원의 부담을 너무 고려하다 보면 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 공감해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하고 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 실행 움직임을 조금 더 끌어주는 힘이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_NP_A:{manner:`OOO님은 조직 안에서 관계 흐름을 안정적으로 유지하면서 구성원을 편안하게 이끌어가려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 조직원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 분위기만 유지하는 것이 아니라 구성원의 감정 상태와 어려움도 함께 보려고 합니다. 구성원이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습도 나타납니다. 그래서 조직원 입장에서는
“내 이야기를 잘 들어준다.”
“사람을 함부로 대하지 않는다.”
“정서적으로 안정감을 준다.”
라는 느낌을 받게 됩니다.

다만 A(이성,판단)의 점수가 가장 낮으면 분위기와 공감 중심으로 조직을 운영하다가 실제 문제 원인과 우선순위를 차분하게 정리하는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 조율하고 구성원도 잘 챙기고 있다고 느끼지만 구성원 입장에서는
“무엇부터 해야 하는지 헷갈릴 때가 있다.”
“열심히는 하는데 방향 정리가 부족하다.”
“상황에 따라 움직임이 달라질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 관계 유지력을 만드는 힘은 매우 좋지만 현실적인 우선순위와 흐름 정리는 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 조율만 만드는 것이 아니라 “지금 가장 먼저 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 구성원이 힘들어할 때 공감과 배려만 오래 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 AC(협조,조율)와 NP(배려,공감)가 함께 높은 리더는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 구성원의 부담을 너무 고려하다 보면 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 공감해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하고 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 현실적인 흐름 정리와 우선순위 관리가 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_NP_FC:{manner:`OOO님은 조직 안에서 관계 흐름을 안정적으로 유지하면서 구성원을 편안하게 이끌어가려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 조직원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 분위기만 유지하는 것이 아니라 구성원의 감정 상태와 어려움도 함께 보려고 합니다. 구성원이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습도 나타납니다. 그래서 조직원 입장에서는
“내 이야기를 잘 들어준다.”
“사람을 함부로 대하지 않는다.”
“정서적으로 안정감을 준다.”
라는 느낌을 받게 됩니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 감정 표현과 반응 표현은 비교적 절제되어 보일 수 있습니다. 실제로는 충분히 배려하고 조심하고 있지만 표정 변화나 표현이 크지 않다 보니 구성원 입장에서는
“조금 어렵게 느껴진다.”
“칭찬 표현이 적게 느껴진다.”
“조심스럽게 느껴질 때가 있다.”
라고 받아들이는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 관계 유지력을 만드는 힘은 매우 좋지만 구성원이 심리적으로 편하게 움직일 수 있는 분위기를 만드는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 조율만 하는 것이 아니라 짧더라도 반응과 인정 표현을 자주 전달해주는 습관이 중요합니다.

특히 OOO님은
“고생 많으셨습니다.”
“지금 계속 움직이고 계신 부분이 좋습니다.”
“오늘 고객 연락 흐름 잘 유지하고 계십니다.”
같은 짧은 인정 표현을 의식적으로 자주 사용하는 것이 좋습니다.

또한 AC(협조,조율)와 NP(배려,공감)가 함께 높은 리더는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 분위기를 너무 차분하게 유지하다 보면 조직 전체 에너지가 함께 내려갈 가능성도 있습니다. 그래서 의식적으로 미소를 띄고 고개를 끄덕이며 들어주는 반응을 추가하는 것만으로도 조직 분위기가 훨씬 편안해질 수 있습니다.

그리고 충분히 듣고 공감해준 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 흐름이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하고 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 조금 더 부드러운 반응과 밝은 표현이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_A_CP:{manner:`OOO님은 조직 안에서 흐름을 안정적으로 유지하면서도 전체 움직임을 차분하게 관리하려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 조직원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 단순히 분위기만 챙기는 것이 아니라 현재 상황을 현실적으로 정리하려는 힘도 함께 나타납니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 객관적으로 보며 문제 원인을 빠르게 정리하려는 모습도 있습니다. 그래서 조직원 입장에서는
“상황 정리가 명확하다.”
“현실적으로 방향을 잡아준다.”
“무엇을 해야 하는지 이해가 된다.”
라는 신뢰감을 느끼는 경우가 많습니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 리더 본인은 충분히 조율하고 흐름도 잘 관리하고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“좋은 분위기인데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 운영 흐름을 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 조율과 설명만 하는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 구성원이 힘들어할 때 충분히 듣고 조율해준 뒤에는 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 AC(협조,조율)와 A(이성,판단)가 함께 높은 리더는 조직 흐름을 안정적으로 유지하고 문제를 차분하게 정리하는 힘이 매우 좋은 편입니다. 다만 구성원의 부담을 너무 고려하다 보면 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하고 흐름을 현실적으로 관리하는 힘이 매우 뛰어난 성향입니다. 여기에 실행 움직임을 조금 더 끌어주는 힘이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_A_NP:{manner:`OOO님은 조직 안에서 흐름을 안정적으로 유지하면서도 전체 움직임을 차분하게 관리하려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 조직원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 단순히 분위기만 챙기는 것이 아니라 현재 상황을 현실적으로 정리하려는 힘도 함께 나타납니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 객관적으로 보며 문제 원인을 빠르게 정리하려는 모습도 있습니다. 그래서 조직원 입장에서는
“상황 정리가 명확하다.”
“현실적으로 방향을 잡아준다.”
“무엇을 해야 하는지 이해가 된다.”
라는 신뢰감을 느끼는 경우가 많습니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 구성원의 감정 상태를 깊게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 조율하고 흐름도 잘 관리하고 있다고 느끼지만 구성원 입장에서는
“속마음까지 충분히 이해받는 느낌은 아니다.”
“힘든 이야기를 오래 하기는 어렵다.”
“결론이 비교적 빨리 나온다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 운영 흐름을 만드는 힘은 매우 좋지만 구성원의 감정과 심리 상태를 충분히 공감해주는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 조율과 설명만 하는 것이 아니라 현재 구성원의 감정 상태와 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
라고 방향만 이야기하기보다
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근 활동하면서 가장 지치는 순간은 언제였나요?”
같은 질문을 먼저 넣어주는 것이 좋습니다.

또한 AC(협조,조율)와 A(이성,판단)가 함께 높은 리더는 조직 흐름을 안정적으로 유지하고 문제를 차분하게 정리하는 힘이 매우 좋은 편입니다. 다만 분위기를 너무 안정적으로 유지하려다 보면 조직 전체 에너지가 조용해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 흐름이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하고 흐름을 현실적으로 관리하는 힘이 매우 뛰어난 성향입니다. 여기에 따뜻한 공감과 감정 확인이 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_A_FC:{manner:`OOO님은 조직 안에서 흐름을 안정적으로 유지하면서도 전체 움직임을 차분하게 관리하려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 조직원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 단순히 분위기만 챙기는 것이 아니라 현재 상황을 현실적으로 정리하려는 힘도 함께 나타납니다. 구성원의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 객관적으로 보며 문제 원인을 빠르게 정리하려는 모습도 있습니다. 그래서 조직원 입장에서는
“상황 정리가 명확하다.”
“현실적으로 방향을 잡아준다.”
“무엇을 해야 하는지 이해가 된다.”
라는 신뢰감을 느끼는 경우가 많습니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 감정 표현과 반응 표현은 비교적 절제되어 보일 수 있습니다. 실제로는 충분히 배려하고 조심하고 있지만 표정 변화나 표현이 크지 않다 보니 구성원 입장에서는
“조금 어렵게 느껴진다.”
“칭찬 표현이 적게 느껴진다.”
“조심스럽게 느껴질 때가 있다.”
라고 받아들이는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 운영 흐름을 만드는 힘은 매우 좋지만 구성원이 심리적으로 편하게 움직일 수 있는 분위기를 만드는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 조율과 설명만 하는 것이 아니라 짧더라도 반응과 인정 표현을 자주 전달해주는 습관이 중요합니다.

특히 OOO님은
“고생 많으셨습니다.”
“지금 계속 움직이고 계신 부분이 좋습니다.”
“오늘 고객 연락 흐름 잘 유지하고 계십니다.”
같은 짧은 인정 표현을 의식적으로 자주 사용하는 것이 좋습니다.

또한 AC(협조,조율)와 A(이성,판단)가 함께 높은 리더는 조직 흐름을 안정적으로 유지하고 문제를 차분하게 정리하는 힘이 매우 좋은 편입니다. 다만 분위기를 너무 차분하게 유지하다 보면 조직 전체 에너지가 함께 내려갈 가능성도 있습니다. 그래서 의식적으로 미소를 띄고 고개를 끄덕이며 들어주는 반응을 추가하는 것만으로도 조직 분위기가 훨씬 편안해질 수 있습니다.

그리고 충분히 듣고 조율해준 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 흐름이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하고 흐름을 현실적으로 관리하는 힘이 매우 뛰어난 성향입니다. 여기에 조금 더 부드러운 반응과 밝은 표현이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_FC_CP:{manner:`OOO님은 조직 안에서 분위기를 편안하게 유지하면서 관계 흐름을 안정적으로 관리하려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 조직원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 편안하게 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 조직원 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 느낌을 받게 됩니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 리더 본인은 충분히 분위기도 좋게 만들고 조직도 잘 챙기고 있다고 느끼지만 구성원 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“좋은 분위기인데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 분위기를 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 구성원이 힘들어할 때 공감과 배려만 오래 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 AC(협조,조율)와 FC(친화,표현)가 함께 높은 리더는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 구성원의 부담을 너무 고려하다 보면 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직 분위기와 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 실행 움직임을 조금 더 끌어주는 힘이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_FC_NP:{manner:`OOO님은 조직 안에서 분위기를 편안하게 유지하면서 관계 흐름을 안정적으로 관리하려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 조직원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 편안하게 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 조직원 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 느낌을 받게 됩니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 구성원의 감정 상태를 깊게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 분위기도 좋게 만들고 조직도 잘 챙기고 있다고 느끼지만 구성원 입장에서는
“속마음까지 충분히 이해받는 느낌은 아니다.”
“힘든 이야기를 오래 하기는 어렵다.”
“결론이 비교적 빨리 나온다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 분위기를 만드는 힘은 매우 좋지만 구성원의 감정과 심리 상태를 충분히 공감해주는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 현재 구성원의 감정 상태와 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은 구성원이 힘들어할 때
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근 활동하면서 가장 지치는 순간은 언제였나요?”
같은 질문을 먼저 넣어주는 것이 좋습니다. 그리고 충분히 들은 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
처럼 실제 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

또한 AC(협조,조율)와 FC(친화,표현)가 함께 높은 리더는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 구성원의 부담을 너무 고려하다 보면 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직 분위기와 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 따뜻한 공감과 현실적인 행동 정리가 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_FC_A:{manner:`OOO님은 조직 안에서 분위기를 편안하게 유지하면서 관계 흐름을 안정적으로 관리하려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 구성원이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 조직원 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 편안하게 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 구성원과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 조직원 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 느낌을 받게 됩니다.

다만 A(이성,판단)의 점수가 가장 낮으면 분위기와 관계 중심으로 조직을 운영하다가 실제 문제 원인과 우선순위를 차분하게 정리하는 부분은 부족해질 수 있습니다. 리더 본인은 충분히 분위기도 좋게 만들고 조직도 잘 챙기고 있다고 느끼지만 구성원 입장에서는
“무엇부터 해야 하는지 헷갈릴 때가 있다.”
“열심히는 하는데 방향 정리가 부족하다.”
“상황에 따라 움직임이 달라질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 분위기를 만드는 힘은 매우 좋지만 현실적인 우선순위와 흐름 정리는 조금 의식할 필요가 있는 구조입니다. 그래서 조직의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 “지금 가장 먼저 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 구성원이 힘들어할 때 공감과 배려만 오래 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 AC(협조,조율)와 FC(친화,표현)가 함께 높은 리더는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 분위기와 공감에 집중하다 보면 조직 전체 움직임이 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직 분위기와 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 현실적인 흐름 정리와 우선순위 관리가 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``}},cm5_1:{CP_NP_A:`OOO님은 결단력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_NP_FC:`OOO님은 결단력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_NP_AC:`OOO님은 결단력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_A_NP:`OOO님은 결단력과 객관적 판단력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_A_FC:`OOO님은 결단력과 객관적 판단력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_A_AC:`OOO님은 결단력과 객관적 판단력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_FC_NP:`OOO님은 결단력과 친화력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_FC_A:`OOO님은  결단력과 친화력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_FC_AC:`OOO님은 결단력과 친화력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_AC_NP:`OOO님은 결단력과 상대를 잘 살피는 능력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_AC_A:`OOO님은 결단력과 상대를 잘 살피는 능력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_AC_FC:`OOO님은 추진력과 상대를 잘 살피는 능력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_CP_A:`OOO님은 배려와 공감능력 그리고 결단력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_CP_FC:`OOO님은 배려와 공감능력 그리고 결단력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_CP_AC:`OOO님은 배려와 공감능력 그리고 결단력이 강점으로 나타나며, 상대 입장 살피기를  조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다`,NP_A_CP:`OOO님은 배려와 공감능력 그리고 객관적 판단력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_A_FC:`OOO님은 배려와 공감능력 그리고 객관적 판단력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_A_AC:`OOO님은 배려와 공감능력 그리고 객관적 판단력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_FC_CP:`OOO님은 배려와 공감능력 그리고 친화력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_FC_A:`OOO님은 배려와 공감능력 그리고 친화력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_FC_AC:`OOO님은 배려와 공감능력 드리고 친화력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_AC_CP:`OOO님은 공감을 바탕으로 한 배려심과 상대를 살피는 능력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_AC_A:`OOO님은 공감을 바탕으로 한 배려심과 상대를 살피는 능력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_AC_FC:`OOO님은 공감을 바탕으로 한 배려심과 상대를 살피는 능력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_CP_NP:`OOO님은 객관적 판단력과 결단력이 강점으로 나타나며, 상대에게 공감하는 것을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_CP_FC:`OOO님은 객관적 판단력과 결단력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_CP_AC:`OOO님은 객관적 판단력과 결단력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_NP_CP:`OOO님은 객관적 판단력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_NP_FC:`OOO님은 객관적 판단력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_NP_AC:`OOO님은 객관적 판단력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_FC_CP:`OOO님은 객관적 판단력과 친화력을 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_FC_NP:`OOO님은 객관적 판단력과 친화력을 강점으로 나타나며, 상대에게 공감하는 것을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_FC_AC:`OOO님은 객관적 판단력과 친화력을 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_AC_CP:`OOO님은 객관적 판단력과 상대를 살피는 능력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_AC_NP:`OOO님은 객관적 판단력과 상대를 살피는 능력이 강점으로 나타나며, 상대에게 공감하는 것을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_AC_FC:`OOO님은 객관적 판단력과 상대를 살피는 능력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_CP_NP:`OOO님은 친화력과 결단력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_CP_A:`OOO님은 친화력과 결단력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_CP_AC:`OOO님은 친화력과 결단력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_NP_CP:`OOO님은 친화력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_NP_A:`OOO님은 친화력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_NP_AC:`OOO님은 친화력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_A_CP:`OOO님은 친화력과 객관적 판단력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_A_NP:`OOO님은 친화력과 객관적 판단력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_A_AC:`OOO님은 친화력과 객관적 판단력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_AC_CP:`OOO님은 친화력과 상대를 살피는 능력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_AC_NP:`OOO님은 친화력과 상대를 살피는 능력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_AC_A:`OOO님은 친화력과 상대를 살피는 능력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_CP_NP:`OOO님은 상대를 잘 살피는 능력과 결단력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_CP_A:`OOO님은 상대를 잘 살피는 능력과 결단력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_CP_FC:`OOO님은 상대를 잘 살피는 능력과 결단력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_NP_CP:`OOO님은 상대를 살피는 능력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_NP_A:`OOO님은 상대를 살피는 능력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_NP_FC:`OOO님은 상대를 살피는 능력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_A_CP:`OOO님은 상대를 살피는 능력과 객관적 판단력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_A_NP:`OOO님은 상대를 살피는 능력과 객관적 판단력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_A_FC:`OOO님은 상대를 살피는 능력과 객관적 판단력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_FC_CP:`OOO님은 상대를 살피는 능력과 친화력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_FC_NP:`OOO님은 상대를 살피는 능력과 친화력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_FC_A:`OOO님은 상대를 살피는 능력과 친화력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`},closing:`이 성향리포트가 작은 거울이 되어 인간관계와 하시는 일의 성과에 도움이 되기를 기원합니다.`,cm6:{},cm7:{},cm8:{CP_NP:{encourage:`리더십이란 잃은 방향을 제시하고, 그 방향을 끝까지 지키는 용이다 
-피터 드러커

강한 기준은 사람을 억누르기 위해서가 아니라, 사람을 보호하기 위해 존재한다
-임마누엘 칸트`,improve:`이해하려는 노력 없이 내려진 판단은 언제나 불완전하다
-칼 로저스

사람은 논리로 움직이지만, 마음으로 결정한다
-블레즈 파스칼`},CP_A:{encourage:`정의는 강한 의지에서 나온다
의미-옳고 그름을 분명히 가르는 힘은 결단과 기준에서 나온다 
-아리스토 텔레스

원칙이 없는 타협은 방향을 잃게 된다 
의미-CP의 성향 결단력, 기준제시를 격려-임마누엘 칸트`,improve:`코칭할 수 없다면, 아직 충분히 이해한 것이 아니다
의미-코칭의 부족은 능력의 부족이 아니라 훈련의 부족이다
-알베르트 아인슈타인`},CP_FC:{encourage:`올바른 판단은 인기보다 중요하다
의미- 관계의 호불호보다 옳음을 선택하는 단호함이 리더십의 핵심임을 말함
-피터 드러커`,improve:`열정은 불꽃이 아니라 연료다. 관리하지 않으면 꺼진다"
의미-FC가 약할수록 감정에 의존하지 않는 몰입과 집중이 필요함을 알려줌
-프리드리히 니체`},CP_AC:{encourage:`정의는 힘이 없으면 공허하고, 힘은 정의가 없으면 폭력이다'
의미-기준을 세우고 옳고 그름을 가르는 힘(CP)은 상황을 지탱하는 핵심 에너지다.
-블레즈 파스칼`,improve:`가장 강한 사람은 혼자 서는 사람이 아니라, 함께 움직일 줄 아는 사람이다
-헬렌 켈러

지혜로운 사람은 바람을 거스르지 않고, 돛의 각도를 조절한다
-공자`},NP_CP:{encourage:`타인을 존중하는 마음이야말로 모든 관계의 시작이다
-마하트마 간디

사람은 이해받을 때 비로소 변화할 수 있다
-칼 로저스`,improve:`용기는 옳다고 생각하는 것을 말하는 데서 시작한다
의미-내가 할 말을 하는 것은 용기이고 상과로 나타난다
-루스벨트`},NP_A:{encourage:`사람은 비판으로 변하지 않고, 이해받을 때 성장한다
-칼 로저스

부드러움은 약함이 아니라, 가장 오래가는 힘이다
-노자`,improve:`생각하지 않으면 감정이 결정을 대신한다
의미-A가 낮을 때 감정이나 분위기로 끌려감 이 문장은 ‘생각-판단-말'의 순서를 훈련하라는 의미`},NP_FC:{encourage:`이해받고 있다고 느끼는 순간, 사람은 스스로 움직이기 시작한다
-칼 로저스

타인을 이기는 사람은 힘이 세지만,타인을 품는 사람은 진정 강하다 -노자`,improve:`느끼는 것을 표현하지 않으면, 그 감정은 사라지지 않고 안에 쌓인다.
-프로이트

자기 자신에게 솔직해질 때, 삶의 에너지가 흐르기 시작한다
-칼 융`},NP_AC:{encourage:`사람은 이해받을 때 비로소 변화할 수 있다
-칼 로저스

부드러움은 가장 강한 설득이다
-노자`,improve:`상대를 고려하는 것은 약해지는 것이 아니라, 선택지를 넓히는 것이다
의미-독립성을 해치지 않으면서 상대방과의 조율을 강조하는 문장
-임마누엘 칸트`},A_CP:{encourage:`지혜란 감정을 제거하는 것이 아니라 감정위에 사고를 올리는 것이다
의미-감정을 인식하되 판단은 이성적으로 하라는 뜻
-아리스토텔레스`,improve:`기준이 없는 친절은 결국 누구도 돕지 못한다
의미-배려와 이해가 중요하지만, 명확한 기준과 방향 제시가 없으면 관계도 성과도 흐려진다는 뜻
-피터 드러커`},A_NP:{encourage:`생각하고 판단하는 법을 배우는 것이야말로 인간의 가장 큰 자유다
-에리히 프롬

현명한 사람은 상황을 탓하지 않고, 상황을 이해한 뒤 선택한다
의미-판단과 선택이 성숙함의 기준임
-마르쿠스 아우렐리우스`,improve:`사람들은 당신이 한 말은 잊을지라도, 당신이 느끼게 한 감정은 잊지 않는다
의미-설득의 논리보다 면담에서 남는 것은 ‘내가 존중받았는가'라는 감정이라는 뜻
-마야 안젤로`},A_FC:{encourage:`사실을 있는 그대로 보는 능력은 지혜의 시작이다
-아리스토텔레스

생각하는 데 시간을 쓰는 사람은, 행동에서 실수를 줄인다
-발타자르 그라시안`,improve:`느낀 것을 말하지 않으면, 아무도 그것을 이해할 수 없다.
의미-감정을 숨긴 채로는 공감도, 연결도 일어날 수 없다는 뜻
-칼 로저스`},A_AC:{encourage:`현상을 있는 그대로 볼 수 있는 사람만이 올바르게 판단할 수 있다
-아리스토텔레스

감정이 아닌 이성에 따라 행동할 수 있을 때, 인간은 선택의 자유가 생긴다.
-스피노자`,improve:`부드러움은 강함을 이긴다
의미-밀어붙이는 힘보다, 상대를 살리며 가는 부드러움이 더 멀리 간다는 뜻
-노자`},FC_CP:{encourage:`진정한 힘은 즐거움에서 나온다
의미-자발적 에너지와 감정 표현은 사람을 움직이는 원천이며, 관계의 활력을 만든다
-프리드리히 니체

웃음은 두려움을 밀어내는 가장 인간적인 용기다
-찰리 채플린`,improve:`결단하지 않는 것도 하나의 선택이며, 그 또한 결과를 낳는다
의미-결정을 안 하는 우유부단함도 책임이 따른다는 뜻
-윌리엄 제임스`},FC_NP:{encourage:`열정은 전염된다
의미- 당신의 에너지와 감정 표현은 상대의 분위기를 바꾼다.
-랄프 왈도 에머슨

당신이 웃을 때, 세상은 당신 편이 된다.
의미-감정 표현과 밝음은 사람 마음을 여는 가장 빠른 언어다
-윌리엄 제임스`,improve:`사람은 논리로 설득되기보다, 이해받았다고 느낄 때 움직인다
-따뜻한 배려와 정서적 수용은 상대의 방어를 낮추고 행동 변화를 이끈다
-칼 로저스`},FC_A:{encourage:`진짜 용기는 자기감정을 숨기지 않은 데 있다.
의미-솔직한 감정 표현은 약함이 아니라 성숙함이다.
-브레네 브라운

기쁨은 성공의 결과가 아니라, 성공의 원인이다.
의미-즐거움과 에너지가 먼저 있을 때 성과가 따라온다 - 숀 에이커`,improve:`현명한 사람은 반응하기 전에 질문한다
의미-질문은 좋은 판단력을 의미함
-소크라테스`},FC_AC:{encourage:`자유롭게 표현하는 사람은 이미 절반은 설득한 것이다
의미-자연스러운 감정 표현은 사람을 끌어당기는 힘이 있다
-데일 카네기

사람들은 논리보다 당신이 느낌을 기억한다.
의미-감정을 전달하는 능력은 관계와 신뢰를 만든다
-마야 안젤로`,improve:`상대를 고려하는 것은 약해지는 것이 아니라, 선택지를 넓히는 것이다
의미-독립성을 해치지 않으면서 상대방과의 조율을 강조하는 문장
-임마누엘 칸트`},AC_CP:{encourage:`지혜로운 사람은 말보다 상황을 먼저 읽는다
의미-눈치와 관찰력을 지혜의 핵심으로 인정
-노자`,improve:`당신이 결정하지 않으면 타인의 기준에 끌려간다
의미 - 우유부단하지 말고 결정을 내리는 것의 중요성을 부드럽게 각인
-짐 론

자기의 입장을 말하지 않는 사람은 결국 입장을 잃는다
의미 침묵의 대가를 인식하는 문장
-마틴 루터 킹`},AC_NP:{encourage:`조심스러움은 미래를 지키는 방식이다
의미-신중해야 오래갈 수 있다는 말
-세네카`,improve:`마음을 얻지 못하는 논리는 설득이 아니다
의미- 논리만 과신하면 안 되고 마음을 얻으려는 노력도 필요
-블레즈 파스칼

상대의 감정을 인정하는 순간, 대화는 언쟁이 되지 않는다
의미-공감과 배려의 중요성
-마셜 로젠버그`},AC_A:{encourage:`조율할 줄 아는 사람만이 오래간다
의미-조직 내에서 AC의 역할 강조
-피터 드러커`,improve:`문제를 감정으로 풀려 하면 문제가 꼬이고 정리해서 생각하면 해결이 된다
-피터 드러커

감정 속에 있을 때는 판단하지 말고, 판단할 때는 감정에서 나오라
의미-감정과 판단은 같은 시점에서 하지 말라는 말
-빅터 프랭크`},AC_FC:{encourage:`조심성은 약함이 아니라 책임감이다
의미-위험 회피를 책임감으로 재정의
-에드먼드 버크`,improve:`아이처럼 웃을 수 있는 능력은 성숙함의 증거다
의미 - 미소와 웃음의 중요성 인식
-파블로 피카소

감정을 억누르는 힘보다, 표현하는 용기가 더 필요하다
의미- 감정 표현의 두려움을 낮춤
-브레네 브라운`}}},fl={job_type:`coach`,job_label:`코치/멘토`,cm1:{"17-20":{CP:`주장이 강함, 단호함, 책임감 강함, 밀어붙임, 기준과 통제가 높음.`,NP:`탁월한 공감능력, 강한 배려심, 보호본능, 신뢰형성`,A:`강한 분석력과 판단력, 명확성, 객관성, 높은 이성`,FC:`아주 밝음, 활발함, 표현 풍부, 친근함, 에너지, 다소 가벼움`,AC:`순응, 눈치, 조심, 맞춤형, 불안.`},"14-16":{CP:`결정력 있음, 믿음직한, 판단이 빠름, 기준과 통제가 있음.`,NP:`공감 잘함, 배려 깊음, 따뜻함, 신뢰감 있음, 안정적.`,A:`이성적, 균형감, 현실적, 분석적.`,FC:`밝음, 친화력, 유연함, 편안함, 자연스러움.`,AC:`협조, 적당한 순응, 적당한 눈치, 조율.`},"11-13":{CP:`균형감 있는 결정력, 유연한 기준과 통제, 보통의 주장성.`,NP:`적당한 친절, 예의 바름, 부담 없음.`,A:`평균적 분석, 보통의 현실감각, 보통의 이성과 상황 판단.`,FC:`안정감, 차분한, 균형감, 무난함.`,AC:`적응력, 균형감, 무난함, 순응과 직설의 중용.`},"8-10":{CP:`완화된 결정력과 주장성, 조금 망설임, 조율함.`,NP:`차분함, 무심해 보임, 실무형, 표현 적음.`,A:`감정이 우선, 계산이 다소 약함, 판단이 조금 흔들림.`,FC:`조용함, 신중함, 진지함, 다소 거리감`,AC:`독립적, 솔직함, 직설적, 자기 기준.`},"0-7":{CP:`우유부단, 착함,  결정 어려움, 말을 아낌.`,NP:`무뚝뚝함, 공감 부족, 차갑게 보임.`,A:`감정 몰임, 즉각 반응, 예술적, 판단과 논리가 조금 부족 .`,FC:`무표정, 감정 절제, 경직됨, 딱딱함.`,AC:`단호함, 직선적, 눈치 안 봄, 상대를 통제.`}},cm2:{"17-20":{CP:`기준과 원칙이 아주 분명합니다. 상담 자리에서 말과 자세가 단정하고 자신감이 있습니다. “이 부분은 꼭 필요합니다”, “이 선택이 가장 안전합니다”처럼 단호하게 말합니다. 신인이 망설이면 방향을 잡아 주려는 마음이 강합니다. 다만 너무 확신에 찬 말투 때문에 신인이 압박을 느낄 수 있습니다.`,NP:`신인을 향한 마음의 온도가 매우 높습니다. 신인의 말을 들으면 먼저 이해하려 하고, 판단보다 공감을 앞세웁니다. 그래서 신인은 이분과 상담할 때 편안함을 느끼고, 자신의 이야기를 솔직하게 꺼내도 괜찮겠다는 신뢰를 갖게 됩니다. 힘든 상황에서도 끝까지 함께해 줄 사람이라는 확신을 주는, 관계의 기반을 만드는 따뜻한 힘이 있습니다.`,A:`신인과의 상담에서 감정에 치우치지 않고 사실과 흐름을 차분히 정리하는 능력이 뛰어납니다. 복잡한 조건 속에서도 핵심을 잡아 주기 때문에 신인은 방향을 잃지 않습니다. 설명은 명확하고 판단은 균형 잡혀 있어, 신인에게 안정감과 전문성을 동시에 느끼게 합니다. 믿고 맡길 수 있는 사람이라는 확신을 만드는 힘입니다.`,FC:`사람을 만나는 걸 정말 즐깁니다. 상담할 때 표정이 밝고 마음이 열려 있으며, 먼저 웃으며 말을 겁니다. 신인 이야기에 고개를 끄덕이고 반응이 빠릅니다. 말투는 부드럽고 친근해서 “아, 그런 상황이셨군요”처럼 공감부터 합니다. 분위기를 편안하게 풀어 주는 힘이 있어 신인이 긴장을 빨리 내려놓고, 핵심 메시지를 열린 마음으로 받아들이게 만드는 탁월한 장점이 있습니다.`,AC:`신인의 표정과 말투를 아주 민감하게 살핍니다. 신인이 불편해할까 봐 먼저 조심하고, 맞춰 주는 태도가 강합니다. 말할 때도 “괜찮으시면요”, “부담되시면 안 하셔도 돼요” 같은 표현을 자주 씁니다. 신인 기분은 잘 읽지만, 본인 의견을 끝까지 말하지 못해 설명이 흐려질 수 있습니다.`},"14-16":{CP:`책임감 있고 믿음직한 태도를 보입니다. 상담할 때 흐트러짐 없이 차분하게 설명하고, 중요한 포인트를 분명히 짚어 줍니다. 말투는 또렷하지만 공격적이지 않고 “이 기준으로 보시면 이해가 쉬워요”처럼 안내합니다. 신인은 코치를 통해 안정감과 신뢰를 느끼기 쉽습니다.`,NP:`따뜻하면서도 안정감 있게 신인을 대합니다. 신인 이야기를 잘 들어주고 고개를 끄덕이며 공감해 줍니다. 말투는 부드럽고 “그렇게 느끼실 수 있어요”, “많이 고민되셨죠” 같은 표현을 자연스럽게 씁니다. 필요할 때는 조심스럽게 방향을 제시해 신인이 혼자 결정한다고 느끼게 해줍니다. 신뢰받기 쉬운 태도입니다.`,A:`감정보다 이성과 논리로 코칭합니다. 신인의 이야기를 차분히 듣고, 필요한 정보만 골라 쉽게 코칭합니다. “걱정되실 수 있어요. 그래서 이 상황에서는 이렇게 해 봅시다”처럼 짧게 공감을 한 후에 코칭을 합니다. 말투가 안정적이고 판단이 흔들리지 않아 신인이 신뢰하기 쉽습니다. 가장 이상적인 면담 태도입니다.`,FC:`편안한 분위기를 자연스럽게 만듭니다. 자세는 안정적이고 표정도 부드러워 신인이 긴장을 풀기 쉽습니다. 말할 때는 웃음과 공감을 섞어 “편하게 생각하셔도 됩니다”라고 말합니다. 분위기는 밝고 과하지 않아 상담이 부담스럽지 않습니다.`,AC:`상황을 보며 말을 고르는 편입니다. 신인 반응을 보면서 속도를 조절하고, 무리하게 밀지 않습니다. “이 부분은 신인 상황에 맞춰 생각해 보셔도 돼요”처럼 부드럽게 말합니다. 배려와 안정감은 주지만, 결정이 늦어질 수 있습니다.`},"11-13":{CP:`상황에 맞게 유연하게 대응합니다. 자기 의견도 있지만 신인 말도 잘 듣습니다. 상담에서는 “제 생각은 이렇지만, 신인 상황도 중요합니다”처럼 균형 잡힌 말을 합니다. 강하게 밀어붙이지도, 너무 물러서지도 않아 편안한 상담이 됩니다. 신인은 부담 없이 설명을 받아들입니다.`,NP:`신인에게 예의 있게 대하고 필요한 설명을 차분히 합니다. 말은 짧고 정리되어 있으며 “이 부분은 이렇게 보시면 돼요”처럼 담백한 표현을 씁니다. 신인은 부담 없이 설명을 듣는 느낌을 받습니다. 다만 공감하는 표현을 조금만 더 한다면 신인의 만족도는 더 상승합니다.`,A:`상황에 따라 감정과 논리를 오가며 상담합니다. 신인 반응을 보며 설명을 조절하고, 너무 딱딱하지도 너무 감정적이지도 않습니다. “이렇게 생각하실 수 있는데, 현실적으로 보면 이 선택이 좋아요”처럼 말합니다. 무난하지만 결정이 조금 늦어질 수 있어 정리 멘트가 필요합니다.`,FC:`무난하고 차분한 태도를 보입니다. 자세는 바르고 표정은 안정적입니다. 말투는 또렷하지만 감정 표현은 많지 않습니다. “이 부분을 설명드리겠습니다”처럼 설명 중심으로 말합니다. 편하지도 불편하지도 않은 느낌을 주며, 신인은 안정감을 느낍니다. 다만 의식적으로 밝음이 다소 필요합니다.`,AC:`신인 눈치도 보고 자기 생각도 말할 줄 압니다. 분위기가 무겁지 않게 유지하면서도 필요한 설명은 분명히 합니다. “이건 장단점이 있어요. 신인께 맞는 쪽을 같이 보죠”처럼 균형 잡힌 말투를 씁니다. 신인도 부담 없이 듣습니다.`},"8-10":{CP:`신인을 존중하면서도 자기 생각을 조금씩 말할 수 있습니다. 상담할 때 “제 경험으로 보면 이 방법이 더 안전해요”처럼 조심스럽게 방향을 제시합니다. 신인을 몰아붙이지는 않지만, 완전히 맡기지도 않습니다. 다만 확신이 조금은 약해 보여서 신인이 결정을 미루는 경우가 가끔 생기기도 합니다.`,NP:`신인을 존중하긴 하지만 말수가 많지 않습니다. 상담에서는 설명 위주로 말하며 “이 상품은 이런 구조입니다”처럼 사실 중심으로 이야기합니다. 공감 표현은 적어 다소 차갑게 느껴질 수 있지만, 일은 또렷하게 진행됩니다. 신인에 따라 거리감이 느껴질 수 있습니다.`,A:`신인의 이야기를 잘 듣고 이해하려고 노력합니다. 다만 코칭 과정에서 사실 확인이나 원인 분석보다 다소 감정적인 해석이나 경험 중심의 판단에 의존하는 경우가 있어, 문제의 원인과 해결 방법을 한 번 더 정리하는 습관이 필요합니다.`,FC:`조용하고 진지한 모습이 강합니다. 상담 중 말수가 적고 표정 변화도 크지 않습니다. 자세는 단정하지만 다소 굳어 보일 수 있습니다. 말할 때는 필요한 말만 짧게 하며 감정 표현이 거의 없습니다. 신인은 신뢰는 느끼지만 “조금 신중하다”고 느낄 수 있습니다.`,AC:`신인 반응에 크게 흔들리지 않습니다. 자기 기준으로 차분하게 설명하고, 필요하면 직설적으로 말합니다. “이 상품은 이런 분께 맞습니다”처럼 간단히 말합니다. 솔직해서 신뢰는 주지만, 예민한 신인에게는 조금은 차갑게 느껴질 수 있습니다.`},"0-7":{CP:`자기 기준을 강하게 내세우지 않습니다. 상담할 때 신인 말을 먼저 듣고, 웬만하면 반대하지 않습니다. “신인 생각이 맞아요”, “원하시는 대로 하셔도 됩니다”라는 말을 자주 합니다. 분위기는 편하지만, 신인이 “그래서 뭘 선택해야 하지?” 하고 헷갈릴 수 있습니다. 방향을 잡아주는 힘은 약한 편입니다.`,NP:`상대가 느끼기에 다소 차갑게 보일 수 있습니다. 상담할 때도 바로 본론으로 들어가며 “필요한 것만 말씀드리겠습니다”라는 식의 말투를 씁니다. 위로나 공감보다는 정보 전달이 중심입니다. 신인은 정확하다고 느낄 수 있지만, 마음을 이해받는 느낌은 적을 수 있습니다. 친절해 보이지 않는다는 오해를 받을 수 있습니다.`,A:`신인과 편안하게 소통하는 장점이 있습니다. 다만 코칭 과정에서 감정적인 판단이나 개인 경험을 사실보다 우선하는 경우가 있어, 이유와 근거를 함께 확인하는 습관을 갖는다면 코칭의 신뢰도가 더욱 높아질 수 있습니다.`,FC:`감정을 거의 드러내지 않습니다. 표정이 굳어 있고 몸도 긴장돼 보일 수 있습니다. 말투는 건조하고 설명 위주이며 공감 표현이 적습니다. 신인이 말을 해도 반응이 적어 “내 말이 전달됐나?”라고 느낄 수 있습니다. 신뢰는 줄 수 있지만 거리감이 커질 가능성이 있습니다.`,AC:`남의 시선을 크게 신경 쓰지 않습니다. 신인 눈치를 거의 보지 않고 자기 생각대로 말합니다. “이게 제일 합리적입니다”처럼 단정적인 표현이 많습니다. 자신감은 느껴지지만, 신인이 압박을 느끼는 경우가 발생할 수 있습니다.`}},cm3:{CP_NP:`OOO님은 말보다 행동으로 기준을 보여주는 힘을 가지고 있습니다. 원칙이 분명해 신인은 무엇을 해야 하는지 혼란스럽지 않습니다. 동시에 사람을 향한 따뜻함이 있어, 부족하다고 밀어내기보다 끝까지 곁에 둡니다. 그래서 신인은 “지적받아도 버려지지는 않겠구나”라는 깊은 신뢰를 느끼게 됩니다.

CP(기준,결단)의 힘은 방향을 잡아 줍니다. 지금 무엇을 먼저 해야 하는지, 오늘 어디까지 가야 하는지를 분명히 알려줍니다. 여기에 NP(배려,공감)의 따뜻함이 더해지면, 그 방향은 압박이 아니라 안심이 됩니다. 신인은 통제당한다고 느끼지 않고, 보호받고 있다고 느끼며 움직입니다. 이 조합이 만들어내는 분위기는 “엄격하지만 안전한 공간”입니다.

또한 OOO님은 결과 앞에서 책임지는 사람입니다. 성과가 나올 때만 옆에 서는 사람이 아니라, 잘 안 될 때 더 가까이 다가옵니다. 실수가 반복돼도 포기하지 않고, 속도가 느려도 기다릴 줄 압니다. 그 과정에서 신인은 자연스럽게 자신감을 회복하고 다시 도전할 힘을 얻습니다.

시간이 흐를수록 신인들의 마음속에는 한 문장이 남습니다.
“이 사람은 나를 키우는 사람이다.”
이 믿음이 생길 때, 신인은 스스로 성장하려 하고 조직은 흔들리지 않는 힘을 갖게 됩니다.`,CP_A:`OOO님은 기준을 말로 설명하는 데서 멈추지 않습니다. 왜 그 기준이 필요한지, 지키면 어떤 결과가 생기는지를 차분하게 보여줍니다. 신인은 감정이 아니라 납득으로 움직이게 됩니다. 그래서 흔들림이 적고, 한 번 이해한 원칙은 오래 갑니다.

CP(기준,결단)의 힘은 방향을 명확하게 만듭니다. 해야 할 것과 하지 말아야 할 것을 분명히 가릅니다. 여기에 A(이성,판단)의 힘이 더해지면 판단이 감정에 휘둘리지 않습니다. 상황을 보고, 수치를 보고, 가능성을 계산하며 가장 현실적인 길을 안내합니다. 신인은 그 모습에서 “따라가면 된다”는 확신을 얻게 됩니다.

또한 OOO님은 결과 앞에서 도망가지 않습니다. 성과가 부족하면 이유를 찾고, 방법을 바꾸고, 다시 시도합니다. 변명 대신 해결을 선택하는 태도는 조직 전체를 단단하게 만듭니다. 신인은 점점 감정적인 위로보다 정확한 해답을 주는 코치를 신뢰하게 됩니다.

시간이 지나면 신인들의 마음속에는 이런 믿음이 자리 잡습니다.
“이 사람은 우리를 성공하게 만들 사람이다.”
그 확신이 생기는 순간, 조직은 말이 아니라 실행으로 움직이기 시작합니다.`,CP_FC:`OOO님은 무엇이 맞고 무엇이 틀린지를 분명하게 이야기합니다. 해야 할 일과 멈춰야 할 일을 또렷하게 구분해 주기 때문에 신인은 길을 잃지 않습니다. 그런데 그 전달 방식이 딱딱하지 않습니다. FC(배려,공감)의 밝음과 에너지가 더해져, 말이 부담이 아니라 힘이 됩니다. 그래서 신인은 지적을 받아도 기가 죽기보다 다시 해보려는 용기를 냅니다.

CP(기준,결단)는 팀을 단단하게 세웁니다. 흐트러짐을 그냥 넘기지 않고, 약속과 책임을 중요하게 여깁니다. 덕분에 조직에는 기본기가 만들어집니다. 여기에 FC(배려,공감)가 더해지면, 어려운 상황에서도 분위기가 무너지지 않습니다. 웃으면서 다시 도전하게 만들고, “우리 한번 더 해보자”라는 말을 자연스럽게 끌어냅니다.

OOO님은 압박으로 끌고 가지 않습니다. 기준은 높게, 마음은 뜨겁게 가져갑니다. 신인은 그 모습에서 이상한 안정감을 느낍니다. 엄격한데 이상하게 따뜻하고, 부담스러운데 또 가까이 가고 싶은 사람. 그래서 어느 순간 이런 마음이 생깁니다.

“OOO님과 함께라면 힘들어도 끝까지 가보고 싶다.”
그 마음이 팀을 성장시키는 가장 큰 연료가 됩니다.`,CP_AC:`OOO님은 단순히 엄격한 사람이 아닙니다. 무엇이 옳은지, 어디로 가야 하는지를 분명히 말할 수 있는 힘이 있으면서도, 동시에 사람과 조직의 분위기를 살피며 움직입니다. 그래서 원칙을 밀어붙이되 무리하게 다치게 하지는 않습니다. 방향을 제시하면서도 함께 가는 길을 선택합니다.

신인들은 이 모습에서 안정감을 느낍니다. 흔들리지 않는 기준이 있어 의지할 수 있고, 또 자신들의 상황을 이해받고 있다고 느끼기 때문입니다. “우리를 이끌어 주는 사람”, “그래도 우리 편인 사람”이라는 신뢰가 자연스럽게 만들어집니다.

또한 회사의 정책과 큰 흐름을 존중하며 움직이기 때문에 조직 전체로 보았을 때도 매우 믿음직한 존재가 됩니다. 위로는 신뢰를 얻고, 아래로는 따르는 마음을 얻는 자리. 바로 그 중심에 설 수 있는 힘이 여기에서 나옵니다.

시간이 흐를수록 사람들은 깨닫게 됩니다.
강한 기준 뒤에 따뜻한 배려가 있다는 것을.
그리고 그 배려가 있기에 더 멀리 갈 수 있다는 것을.`,NP_CP:`OOO님의 강점은 따뜻함과 원칙이 함께 움직인다는 점입니다. 누군가를 이해하고 감싸 주는 마음이 기본이 되기 때문에 신인은 쉽게 마음을 엽니다. 실수했을 때도 야단을 맞는 기분보다 보호받는 느낌을 먼저 받습니다. “괜찮아, 다시 해보자”라는 분위기 속에서 다시 일어날 용기를 얻습니다.

하지만 부드럽기만 하다면 성장 속도는 더딜 수 있습니다. 여기서 CP(기준,결단)의 힘이 살아납니다. 해야 할 일은 해야 한다고, 준비가 부족하면 다시 하자고 분명히 말해 줍니다. 방향이 흐려질 때는 선을 다시 그어 줍니다. 그래서 신인은 알게 됩니다.
“OOO님은 나를 좋아만 하는 분이 아니라, 나를 제대로 키우려는 분이구나.”

따뜻하게 안아 주면서도 기준을 세워 주는 코칭은 오래 갑니다. 감정에 기대는 관계가 아니라, 성장으로 증명되는 관계가 되기 때문입니다. 신인은 힘들 때 기대고, 흔들릴 때 바로 잡힙니다. 그 반복 속에서 실력이 만들어집니다.

결국OOO님의 주변에는 사람이 남습니다. 남은 사람이 성장하고, 성장한 사람이 또 다른 사람을 살립니다. 그래서 조직은 시간이 갈수록 더 단단해집니다.

신인은 마음속으로 이렇게 말합니다.
“혼날 때도 믿음이 생기는 사람, 그래서 떠나고 싶지 않은 코치.”`,NP_A:`OOO님의 강점은 따뜻함이 감정에만 머물지 않는다는 데 있습니다. 신인이 힘들어하면 먼저 이유를 들어 주고, 마음을 살핍니다. 함부로 판단하지 않고, 충분히 공감합니다. 그래서 신인은 ‘이 사람에게는 이야기해도 되겠다’라는 안전함을 느낍니다.

그리고 그 다음에 A(이성,판단)의 힘이 움직입니다. 위로로 끝나지 않습니다. 상황을 정리하고, 무엇이 문제였는지 차분하게 짚어 줍니다. 감정에 휩쓸리지 않고 현실적인 방법을 찾아 줍니다. 신인은 혼나지 않았는데도 스스로 고치고 싶어집니다. 왜냐하면 이해받았고, 동시에 길을 보았기 때문입니다.

OOO님은 소리를 높이지 않아도 방향을 세웁니다. 강하게 밀지 않아도 스스로 걷게 만듭니다. 억지로 끌려가는 성장이 아니라, 납득하고 움직이는 성장을 만들기 때문입니다. 그래서 시간이 지날수록 신인은 더 단단해집니다.

결국 조직은 이런 코치를 오래 기억합니다.
“내 마음을 알아주면서도, 결국 나를 성장하게 만든 사람.”`,NP_FC:`OOO님의 강점은 신인이 마음을 닫을 틈을 주지 않는다는 데 있습니다. 먼저 다가가 말을 걸고, 표정을 읽고, 긴장을 풀어 줍니다. 처음 조직에 들어온 사람은 늘 어색하고 두렵습니다. 그런데 이 코치 앞에서는 웃게 됩니다. 굳어 있던 어깨가 내려가고, “여기 있어도 되겠다”는 마음이 생깁니다.

따뜻함은 신뢰를 만들고, 밝음은 용기를 만듭니다. 혼내기 전에 이해하고, 지적하기 전에 격려합니다. 그래서 신인은 실수를 숨기지 않습니다. 오히려 먼저 와서 말합니다. 그 순간부터 진짜 성장이 시작됩니다.

OOO님은 무거운 책임을 가르치면서도 분위기를 무겁게 만들지 않습니다. 힘든 과정 속에서도 웃음을 잃지 않게 해 줍니다. 사람을 남게 하는 힘, 오래 버티게 하는 힘, 다시 도전하게 만드는 힘이 바로 여기에서 나옵니다.

시간이 지나면 신인들은 이렇게 말합니다.
“나를 믿어주고, 다시 해볼 힘을 준 사람이었다.”`,NP_AC:`OOO님이 주는 힘은 배려와 안정감입니다. 신인은 새로운 환경에서 늘 긴장합니다. 내가 잘하고 있는지, 혹시 민폐가 되지는 않는지 끊임없이 눈치를 봅니다. 그런데 이 코치 앞에 서면 마음이 조금씩 풀립니다. 나를 이해해 주는 표정, 기다려 주는 태도, 그리고 조직 안에서 안전하게 자리 잡을 수 있도록 길을 열어 주는 분위기를 느끼기 때문입니다.

사람을 품으면서도 제도와 방향을 벗어나지 않게 안내합니다. 무조건 감싸기만 하지 않고, 팀이 가야 할 길을 함께 보게 합니다. 그래서 신인은 혼자가 아니라 보호받는 느낌 속에서 성장합니다. 억지로 끌려가는 것이 아니라, 스스로 따라가고 싶어집니다.

또한 OOO님은 갈등을 크게 만들지 않습니다. 누군가 실수했을 때도 관계가 상처받지 않도록 표현을 고르고, 조직이 흔들리지 않도록 균형을 잡습니다. 그 덕분에 팀 분위기는 부드럽게 유지되고, 사람들은 오래 남습니다.

시간이 지나면 신인들은 이렇게 기억합니다.
“나를 이해해 주면서도, 이 조직 안에서 잘 해낼 수 있게 도와준 사람이었다.”`,A_CP:`OOO님은 ‘흔들리지 않는 기준’입니다. 팀이 어려운 상황에 놓여도 감정에 끌려 급하게 판단하지 않습니다. 무엇이 맞는지, 무엇이 팀에 도움이 되는지를 차분하게 따져 본 뒤 결정합니다. 그래서 신인들은 압박 속에서도 방향을 잃지 않습니다. “저 사람이 결정했다면 이유가 있을 것이다.”라는 신뢰가 자연스럽게 만들어집니다.

또한 OOO님은 해야 할 말과 하지 말아야 할 말을 분명히 구분합니다. 잘한 부분은 정확히 인정하고, 부족한 부분은 피하지 않고 알려 줍니다. 그렇다고 차갑게 밀어붙이지는 않습니다. 왜 필요한지, 지금 고치면 어떤 미래가 열리는지 논리적으로 설명합니다. 듣는 사람은 순간 뜨끔할 수 있어도, 시간이 지나면 고마움을 느끼게 됩니다.

신인 입장에서 보면 든든한 기둥과 같습니다. 감정에 따라 흔들리지 않고, 기준을 낮추지 않으며, 모두가 더 높은 곳으로 올라가게 만들기 때문입니다. 그래서 OOO님과 함께 일하면 힘들어도 성장합니다. 버티는 시간이 실력이 되고, 그 과정이 결국 자부심이 됩니다.

사람들은 결국 이렇게 말하게 됩니다.
“쉽게 가게 하지는 않았지만, 가장 빨리 강해지게 만든 사람이었다.”`,A_NP:`OOO님의 힘은 이성적인 판단과 배려에서 나옵니다. 누군가 실수를 했을 때 감정적으로 먼저 반응하기보다, 왜 그런 선택이 나왔는지부터 살펴봅니다. 그리고 그 사람의 마음이 다치지 않도록 배려하면서도, 다음에는 더 나아질 수 있는 길을 분명하게 보여 줍니다. 그래서 신인은 혼나기보다 배우고 있다고 느끼게 됩니다.

또한 OOO님과 이야기하면 마음이 안정됩니다. 판단이 흔들리지 않기 때문에 믿을 수 있고, 동시에 자신을 존중받고 있다고 느끼기 때문입니다. 누군가는 힘들었던 하루를 정리받고 돌아가고, 누군가는 포기하려던 순간 다시 용기를 얻습니다. 단순한 업무 지시가 아니라, 사람을 다시 일으켜 세우는 말이 오가기 때문입니다.

시간이 지나면 신인들의 마음속에 이런 생각이 남습니다.
“나를 이해해 주면서도, 내가 더 잘할 수 있다고 믿어 준 사람.”
그 믿음은 결국 책임감으로 바뀌고, 책임감은 성과로 이어집니다.

OOO님이 만드는 조직은 빠르기보다 오래 갑니다. 서로가 서로를 신뢰하고, 어려움이 와도 무너지지 않는 단단함이 자라기 때문입니다. 따뜻하지만 흐트러지지 않는 코치, 바로 그 모습이 이 성향이 가진 가장 큰 감동입니다.`,A_FC:`OOO님의 특별함은 차갑지 않은 이성에 있습니다. 상황을 분석하고 우선순위를 정하는 힘이 분명하기 때문에 방향이 흔들리지 않습니다. 그런데 그 전달 방식이 딱딱하지 않습니다. 표정과 말에 에너지가 있고, 분위기를 밝게 만들 줄 압니다. 그래서 신인은 “해야 한다”는 압박보다 “해보고 싶다”는 마음으로 움직이게 됩니다.

무언가를 설명할 때도 복잡하게 말하지 않습니다. 핵심을 짚어 주면서도 이해하기 쉽게 풀어 주고, 긴장이 도는 순간에는 농담과 여유로 공기를 바꿉니다. 덕분에 사람들은 OOO님과 함께 있으면 부담이 줄어들고, 대신 집중력은 더 또렷해집니다.

시간이 지나면 이런 평가가 따라옵니다.
“현실을 정확히 보면서도, 사람을 편하게 대해 주는 밝은 코치.”

이 신뢰는 자연스럽게 몰입으로 이어집니다. 신인은 혼나는 자리가 아니라 성장하는 자리에 와 있다고 느끼고, 스스로 더 잘해 보고 싶다는 의지가 생깁니다. 판단은 명확하고, 분위기는 살아 있고, 사람은 지치지 않는 구조. 바로 그 균형이 이 성향이 만들어 내는 감동의 힘입니다.`,A_AC:`OOO님의 가장 큰 힘은 ‘맞추는 능력’입니다. 무엇이 옳은지 계산하고, 무엇이 필요한지 판단하고, 그 기준을 조직의 흐름과 연결합니다. 그래서 위에서는 신뢰를 받고, 아래에서는 안정감을 줍니다. 원칙을 이해한 상태에서 움직이기 때문에 불필요한 충돌이 줄어들고, 신인들은 안전한 울타리 안에서 성장한다는 느낌을 받습니다.

누군가 어려움을 겪을 때도 감정으로 먼저 흔들리기보다 상황을 파악하고 해결의 순서를 잡습니다. 그리고 그 과정에서 상대의 입장을 놓치지 않습니다. “왜 안 했어?”가 아니라 “어디가 막혔어?”라고 묻는 태도, 이것이 사람을 다시 일어서게 합니다.

신인들은 이렇게 말하게 됩니다.
“나를 몰아붙이기보다 이해해 주면서도, 결국 갈 길을 보여주는 사람이다.”

조직을 따르되 사람을 잃지 않고, 사람을 배려하되 방향을 놓치지 않는 힘. 조용하지만 오래 가는 코치십이 바로 여기에서 나옵니다. 화려하게 앞에 서기보다 뒤에서 균형을 잡아 주는 존재이기에, 시간이 흐를수록 더 크게 인정받는 코치가 됩니다.`,FC_CP:`OOO님은 보기 드문 힘을 만듭니다. 마음은 뜨겁게 뛰지만 방향은 흐트러지지 않습니다. 사람을 좋아하고 분위기를 살리며 팀에 활기를 넣으면서도, 해야 할 일과 지켜야 할 선을 분명하게 알려 줍니다. 그래서 신인은 즐겁게 따라오면서도 느슨해지지 않습니다. 웃음 속에 규칙이 있고, 자유 속에 책임이 있는 코치십입니다.

OOO님은 신인을 볼 때 가능성을 먼저 발견합니다. “잘할 수 있어!”라고 힘을 넣어 주고, 동시에 “이 기준은 꼭 지키자”라고 길을 세워 줍니다. 그래서 신인은 보호받는 느낌과 함께 성장의 압박을 건강하게 받습니다. 혼나는 것이 아니라 기대받는 느낌을 받게 되는 것이죠.

신인들은 시간이 지나며 이렇게 말합니다.
“나를 믿어 주는데, 그래서 더 제대로 해내고 싶다.”

현장은 결국 사람의 에너지로 움직입니다. 그 에너지를 살리는 밝음과, 흔들리지 않게 잡아 주는 기준이 함께 있을 때 조직은 오래 갑니다. 즐거움이 동력이 되고, 원칙이 방향이 되며, 그 사이에서 사람들은 실력을 키웁니다.

OOO님 밑에서 자란 사람은 어디를 가도 무너지지 않습니다. 왜냐하면 기분만 좋았던 경험이 아니라, 성장의 구조를 함께 배웠기 때문입니다.`,FC_NP:`OOO님은 밝은 에너지로 분위기를 부드럽게 만들고, 상대가 긴장을 풀 수 있게 웃음을 건넵니다. 그런데 그 웃음은 가벼움이 아니라 배려에서 나옵니다. “괜찮아, 다시 하면 돼”, “처음인데 잘하고 있어” 같은 말이 자연스럽게 나오기 때문입니다. 신인은 혼나지 않을까 걱정하기보다, 해보고 싶다는 마음을 먼저 갖게 됩니다.

OOO님과 이야기하면 마음이 열립니다. 실수를 숨기기보다 먼저 말하게 되고, 부족함을 감추기보다 도움을 요청하게 됩니다. 왜냐하면 나를 평가하는 사람이 아니라 나를 도와주는 사람으로 느껴지기 때문입니다. 그래서 관계는 빨리 가까워지고, 배우는 속도도 빨라집니다.

신인들은 시간이 지나면 이렇게 말합니다.
“내가 힘들 때 가장 먼저 생각나는 사람이다.”

가르침이 강압이 되지 않고, 응원이 빈말이 되지 않습니다. 진심으로 믿어 주고, 진심으로 기다려 주기 때문입니다. 그러니 신인은 넘어져도 다시 일어납니다. 혼자라면 포기했을 순간에도, 나를 믿어 주는 사람이 있다는 기억이 발걸음을 다시 움직이게 합니다.

OOO님 밑에서 자란 사람은 자신감이 생깁니다. 실력이 늘어서만이 아니라, 존중받았던 경험이 마음에 남기 때문입니다. 그리고 그 따뜻함은 또 다른 사람을 키우는 힘으로 이어집니다.`,FC_A:`OOO님은 밝은 에너지로 분위기를 편안하게 만들면서도 문제의 원인과 해결 방법을 논리적으로 설명합니다. 신인이 어려움을 이야기하면 공감만 하고 끝나는 것이 아니라 무엇이 문제인지 함께 정리하고 해결 방향까지 제시해 줍니다. 그래서 신인은 위로받는 동시에 배움을 얻었다고 느끼게 됩니다.

OOO님과 대화하면 머릿속이 정리됩니다. 답답했던 상황도 하나씩 원인을 찾게 되고 무엇을 먼저 해야 하는지 알게 됩니다. 신인은 단순히 힘을 얻는 것이 아니라 스스로 생각하는 방법을 배우게 됩니다. 그래서 시간이 지날수록 독립적으로 문제를 해결하는 힘도 함께 성장합니다.

신인들은 시간이 지나면 이렇게 말합니다.

"힘들 때 위로도 받지만 결국 길을 알려주는 사람이다."

OOO님의 가르침은 감정에만 머물지 않고 행동으로 이어집니다. 분위기는 부드럽지만 기준은 분명하고, 공감은 따뜻하지만 설명은 논리적입니다. 그래서 신인은 왜 해야 하는지 이해한 후 움직이게 되고 실행력도 높아집니다.

OOO님 밑에서 자란 사람은 문제를 감정으로만 보지 않게 됩니다. 상황을 분석하고 해결책을 찾는 습관이 생기기 때문입니다. 따뜻함과 논리가 함께 전달되기 때문에 신인은 성장 과정에서 안정감과 자신감을 동시에 얻게 됩니다.`,FC_AC:`OOO님의 가장 큰 힘은 “함께 가고 있다”는 느낌을 주는 능력입니다. 먼저 다가갈 때 표정이 밝고, 말투가 부드럽습니다. 그래서 신인은 긴장을 내려놓습니다. 혼날까 봐 숨는 분위기가 아니라, 털어놓고 싶어지는 분위기가 됩니다. 코치 앞에서는 실수를 숨기기보다 이야기하게 되고, 모르는 것을 아는 척하기보다 배우려고 합니다.

또한 OOO님은 상대의 표정과 반응을 매우 잘 살핍니다. 힘들어 보이면 속도를 조절해 주고, 자신감이 떨어져 보이면 옆에서 다시 기운을 넣어 줍니다. 억지로 끌고 가지 않고, 함께 걷는 느낌을 줍니다. 그래서 신인은 버텨 냅니다. 포기하지 않습니다.

시간이 흐르면 이런 말이 자연스럽게 나옵니다.
“저 사람은 나를 이해해 준다.”
“혼자가 아니라 같이 간다.”

조직에서 이런 믿음을 만들어 내는 코치는 쉽게 나오지 않습니다. 실적 이전에 사람을 남기고, 성과 이전에 마음을 남깁니다. 그리고 바로 그 마음이 결국 다시 움직이게 하는 힘이 됩니다.

편안함 속에서 성장하게 만드는 코치.
그것이 이 성향이 가진 깊은 가치입니다.`,AC_CP:`OOO님은 위와 아래를 동시에 바라볼 수 있는 드문 균형을 만듭니다. 무엇이 필요한지, 지금 조직이 어디로 가야 하는지 빠르게 읽어내면서도, 흔들리지 않는 원칙으로 방향을 잡습니다. 그래서 사람들은 OOO님을 보며 “따라가면 안전하다”는 느낌을 받습니다.

정책을 존중하고 체계를 이해하기 때문에 조직 전체의 신뢰를 얻고, 동시에 해야 할 말은 또렷하게 전달하기 때문에 실행력이 살아납니다. 눈치를 보는 사람이 아니라 분위기를 읽는 사람, 강압적인 사람이 아니라 기준을 세워 주는 사람으로 기억됩니다.

신인 입장에서는 더욱 든든합니다. 무리한 요구가 아니라 현실을 반영한 판단을 내려주고, 노력하면 인정받을 수 있는 구조를 만들어 주기 때문입니다. 그래서 시간이 지날수록 존경이 쌓이고, 그 존경이 곧 영향력이 됩니다.

결국 OOO님은 사람을 지키면서 성과를 만드는 코치입니다.
함께 가지만 느슨하지 않고, 단호하지만 차갑지 않습니다.
그래서 많은 사람들이 마음으로 따르게 됩니다.`,AC_NP:`OOO님은 누군가를 움직이게 하기 전에 먼저 공감합니다. 상대의 입장에서 생각하고, 무엇이 힘들지, 어디에서 막히는지, 어떤 말이 용기가 될지를 자연스럽게 느낍니다. 그래서 함께 일하는 사람들은 지시를 받는 느낌보다 보호받고 있다는 안정감을 경험합니다.

분위기를 읽는 감각이 뛰어나 조직의 흐름을 부드럽게 만들고, 갈등이 생기기 전에 완충 역할을 해냅니다. 누군가 실수하더라도 먼저 이유를 묻고 다시 일어설 수 있도록 손을 내밉니다. 그 손길이 반복되면서 사람들은 점점 마음을 열고, 결국 자발적으로 따르게 됩니다.

OOO님 곁에 있으면 괜히 더 잘하고 싶어집니다. 혼나서가 아니라 기대를 저버리고 싶지 않아서입니다. 존중받는 경험이 쌓이면 책임감이 커지고, 책임감이 커지면 성과가 따라옵니다.

결국 이 성향의 힘은 사람을 남게 만드는 힘입니다.
곁에 있고 싶게 만들고, 계속 함께 가고 싶게 만드는 힘.
그래서 시간이 갈수록 더 많은 이들이 마음으로 모입니다.`,AC_A:`OOO님은 감정과 현실을 동시에 다루는 힘을 만듭니다. 상대의 표정과 분위기를 섬세하게 느끼기 때문에 무리하게 밀어붙이지 않습니다. 대신 무엇이 필요한지 파악하고, 지금 할 수 있는 가장 현실적인 방법을 제시합니다. 그래서 신인은 혼란 대신 방향을 얻습니다.

또 하나의 큰 장점은 차분함입니다. 문제가 생겨도 감정적으로 흔들리기보다, 사실을 정리하고 해결 순서를 알려 줍니다. 옆에 있는 사람은 자연스럽게 안정감을 느끼고 “이 사람을 따라가면 되겠다”는 마음이 생깁니다.

조직에서도 신뢰를 받습니다. 기준을 무조건 강요하기보다 상황을 이해한 뒤 합리적인 길을 찾기 때문입니다. 위와 아래를 연결하고, 사람과 결과를 함께 지켜 냅니다.

시간이 흐르면 신인들은 이렇게 말합니다.
“복잡할 때 가장 믿고 찾는 사람.”
“나를 존중하면서 성장하게 해 준 코치.”

따뜻함과 이성, 배려와 판단이 함께 움직일 때 팀은 오래 갑니다. OOO님은 조용하지만 단단한 힘으로 사람을 앞으로 걷게 만듭니다.`,AC_FC:`OOO님은 딱딱한 지시보다 관계의 온도로 움직이게 만듭니다. 상대가 무엇을 부담스러워하는지, 어디에서 용기가 필요한지 자연스럽게 알아차립니다. 그리고 무거운 공기를 웃음과 격려로 풀어 주며 다시 도전할 수 있는 마음을 만들어 줍니다. 그래서 신인은 “혼나는 자리”가 아니라 “다시 해 볼 수 있는 자리”라고 느끼게 됩니다.

또한 OOO님은 눈치가 빨라서 신인을 세심하게 살피면서도 현장을 밝게 만듭니다. 누구 하나 소외되지 않도록 손을 내밀고, 작은 성과에도 진심으로 기뻐해 줍니다. 그 순간 사람은 인정받는 느낌을 받고, 그 인정이 다시 움직일 힘이 됩니다.

시간이 지나면 신인들의 기억에는 이런 모습이 남습니다.
“나를 편하게 해 준 사람.”
“포기하고 싶을 때 웃으며 다시 세워 준 사람.”

사람을 긴장시키기보다 안심시키고, 압박하기보다 가능성을 보게 하는 힘. 이 따뜻한 에너지가 모이면 조직은 오래가고, 사람은 스스로 더 높은 목표를 향해 걷게 됩니다.`},cm4_1:{"17-20":{CP:`기준이 매우 분명하고 주도적이며 강하게 추진합니다.`,NP:`공감이 뛰어나고 따뜻하며 사람을 잘 챙깁니다.`,A:`객관적이고 명확하며 이성적으로 판단합니다.`,FC:`밝고 활발하며 표현력이 매우 풍부합니다.`,AC:`눈치가 빠르고 민감하며 잘 맞춰줍니다.`},"14-16":{CP:`책임감이 강하고 결단력 있으며 방향을 제시합니다`,NP:`배려심이 깊고 친절하며 신뢰를 줍니다.`,A:`현실적이고 균형감 있으며 판단이 안정적입니다.`,FC:`친근하고 자연스러우며 분위기를 잘 만듭니다.`,AC:`협조적이고 유연하며 적응력이 좋습니다.`},"11-13":{CP:`유연하게 판단하고 균형감 있으며 조율합니다.`,NP:`공감이 가능하고 무난하며 편안함을 줍니다.`,A:`무난하고 실용적이며 상황에 맞춰 판단합니다.`,FC:`차분하고 안정적이며 편안함을 줍니다.`,AC:`균형감이 있고 무난하며 조화를 이룹니다.`},"8-10":{CP:`배려가 많고 신중하며 결정을 고민합니다`,NP:`공감은 가능하지만 표현은 다소 적은 편입니다.`,A:`상황을 이해하며 다소 감정적으로 판단할 수 있습니다.`,FC:`신중하고 진지하며 표현이 절제됩니다.`,AC:`독립적이고 솔직하며 자기기준이 있습니다.`},"0-7":{CP:`조심성이 많고 겸손하며 의견을 아낍니다.`,NP:`솔직하고 직설적이며 공감표현이 약합니다.`,A:`직관과 경험을 중시하며 감정적인 판단을 하는 편입니다.`,FC:`과묵하고 조용하며 감정표현이 적습니다.`,AC:`주관이 강하고 자기 기준이 또렷합니다`}},cm4_2:{"17-20":{CP:`코칭이 필요없는 구간`,NP:``,A:``,FC:``,AC:`신인의 마음을 잘 읽고 배려하는 강점이 있습니다. 다만 신인이 부담을 느낄까 봐 설명을 줄이거나 결론을 약하게 말하는 경우가 생길 수 있습니다. 신인의 표정과 반응을 살피는 것은 좋지만, 코치의 역할은 편안함만 주는 것이 아니라 방향을 제시하는 것입니다. 따라서 공감한 뒤에는 "지금은 이 방법으로 해봅시다.", "이번 주 목표는 이것입니다." 와 같이 결론을 분명하게 전달하는 연습이 필요합니다. 신인의 속도를 존중하되, 성장에 필요한 기준과 행동까지 함께 제시할 때 코칭의 효과가 더욱 커집니다. 결국 좋은 코치는 신인을 편하게 해주는 사람을 넘어, 신인이 움직일 수 있도록 방향을 잡아주는 사람입니다.`},"14-16":{CP:``,NP:``,A:``,FC:``,AC:``},"11-13":{CP:``,NP:``,A:``,FC:``,AC:``},"8-10":{CP:`신인에게 부드럽고 편안하게 이야기하는 장점이 있어 부담감 없이 코칭을 받아들이게 만드는 힘이 있습니다. 다만 기준과 방향 제시가 약하면 신인이 무엇을 먼저 해야 하는지 헷갈릴 수 있습니다. “지금은 이것부터 먼저 해봅시다”처럼 우선순위와 기준을 조금 더 분명하게 전달하면 신인의 행동 속도와 실행력이 훨씬 안정적으로 올라갈 수 있습니다.`,NP:`배려와 공감의 표현이 다소 적어 신인에게 차갑거나 거리감 있게 느껴질 수 있는 성향입니다. 설명은 정확하고 일의 진행도 분명하지만, 먼저 “어려운 부분은 없었어요?”처럼 신인의 마음을 확인하는 질문을 한 번 더 건네는 연습이 필요합니다. 작은 공감 표현과 부드러운 말투를 의식적으로 늘리면 신인의 긴장감이 줄고 신뢰와 실행력이 훨씬 안정적으로 올라갈 수 있습니다.`,A:`신인의 감정과 분위기를 먼저 받아들이는 따뜻함은 있지만, 설명과 판단 기준이 다소 흔들릴 수 있는 성향입니다. 코칭할 때는 공감만 하고 끝내지 말고 “지금은 이 순서대로 해보는 게 좋겠습니다”처럼 이유와 방향을 함께 정리해주는 연습이 필요합니다. 차분하게 핵심을 정리해주면 신인의 혼란이 줄고 실행력과 신뢰감이 더욱 안정적으로 올라갈 수 있습니다.`,FC:`분위기를 편하게 만들 줄 알고 상대를 긴장하지 않게 하는 힘이 있습니다. 다만 조금 무거운 분위기가 있을 수 있습니다. 에너지 표현, 즉 미소와 고개 끄덕이기를 조금만 더 의식적으로 실천해 보면 분위기가 훨씬 살아나고 칭찬과 리액션을 한 박자 더 크게 보여주면 조직의 활력이 더 빠르게 올라옵니다.`,AC:``},"0-7":{CP:``,NP:``,A:``,FC:``,AC:``}},cm4_3:{all_no_coaching:`OOO님은 모든 점수가 '조율이 필요 없는 구간'에 있습니다.
다섯 가지 에고성향이 모두 조율이 필요 없는 구간에 있다는 것은 특정 성향 하나가 강한 것이 아니라, 신인을 육성할 때 필요한 다양한 역할을 상황에 맞게 자연스럽게 사용할 수 있다는 의미입니다.
신인에게 방향을 제시해야 할 때는 기준을 분명하게 설명할 수 있고, 어려움을 겪는 신인에게는 진심으로 공감하며 이야기를 들어줄 수 있습니다.
또한 신인의 활동을 점검할 때는 감정에 치우치지 않고 현실적으로 판단할 수 있으며, 교육과 면담에서는 편안한 분위기를 만들면서도 실행으로 연결시키는 힘을 가지고 있습니다.

특히 코치에게는 다섯 가지 성향의 균형이 매우 중요합니다.
기준만 강하면 신인이 부담을 느낄 수 있고, 배려만 강하면 행동이 느슨해질 수 있습니다. 하지만 현재는 이러한 요소들이 한쪽으로 치우치지 않고 균형을 이루고 있기 때문에 신인은 안정감을 느끼고 코치님을 신뢰할 가능성이 높습니다.

결국 다섯 가지 성향이 모두 코칭이 필요 없는 구간이라는 것은
"신인을 육성하는 데 필요한 다섯 가지 기능이 안정적으로 작동하고 있다"
는 의미이며,
"신인 관리, 교육, 동기부여, 생산성 관리가 균형 있게 이루어지고 있다"
는 의미입니다.


⚠️ 만약 다섯 가지 성향 중 17점 이상인 항목이 있다면, 해당 성향의 에너지가 강하게 발휘되는 상태입니다. 이는 큰 강점이 될 수 있지만, 상황에 따라 상대방이 다소 과하게 느낄 수도 있습니다. 이 부분만 의식적으로 조율하면 더욱 균형 잡힌 관계와 성과에 도움이 됩니다.
    또한 가장 낮은 성향은 성과와 인간관계에서 반복적으로 나타나는 아쉬움의 원인이 될 수 있습니다. 가장 낮은 성향을 잘 이해하고 의식적으로 활용하려는 노력이 더해지면 강점은 더욱 빛을 발하게 됩니다.`,some_coaching:``},cm4_4:{CP:{condition:`0-7`,trait:`조심성이 많고 겸손하며 의견을 아낍니다`,coaching:`이 성향은 사람을 존중하고 배려하며 신인이 편안하게 의견을 낼 수 있는 분위기를 만드는 장점이 있습니다. 
다만 신인의 생각을 존중하는 마음이 큰 만큼 기준을 분명하게 제시해야 하는 순간에도 결정을 미루거나 표현을 조심스럽게 하는 경우가 있습니다. 코치는 공감도 중요하지만 방향을 정해주는 역할도 필요합니다. 의견을 충분히 들은 뒤에는 "좋은 의견입니다. 그럼 이번에는 이 방향으로 진행해봅시다.", "우선 이것부터 실행해보겠습니다." 와 같이 기준과 결론을 명확하게 전달하는 습관을 가지면 신인의 실행력이 더욱 높아질 수 있습니다.`,script:``},NP:{condition:`0-7`,trait:`솔직하고 직설적이며 공감표현이 약합니다.`,coaching:`이 성향은 감정에 흔들리지 않고 핵심을 빠르게 파악하여 현실적으로 판단하는 장점이 있습니다.
다만 바쁠수록 신인의 감정이나 마음을 살피기보다 문제 해결과 결과 중심으로 대화를 진행하는 경우가 있습니다. 신인은 해결책보다 먼저 이해받고 싶어 하는 경우가 많습니다. "고생 많으셨습니다.", "그 상황이면 충분히 힘들 수 있었겠네요." 와 같은 공감의 말을 먼저 건넨 후 코칭을 진행하면 신인의 신뢰와 수용성이 더욱 높아질 수 있습니다.`,script:``},A:{condition:`0-7`,trait:`직관과 경험을 중시하며 감정적인 판단을 하는 편입니다.`,coaching:`이 성향은 풍부한 경험과 직관을 활용하여 빠르게 판단하고 실행으로 연결하는 장점이 있습니다. 
다만 바쁠수록 현재 상황을 객관적으로 분석하기보다 경험이나 느낌을 기준으로 판단하는 경우가 있습니다. 코치는 신인에게 설명할 때도 느낌보다 사실과 근거를 중심으로 전달하는 것이 중요합니다. "현재 상황을 보면 이 부분이 가장 중요합니다.", "지금은 이 방법이 가장 효과적인 이유가 있습니다." 와 같이 이성과 판단을 바탕으로 설명하면 신인의 이해와 실행력이 더욱 높아질 수 있습니다.`,script:``},FC:{condition:`0-7`,trait:`과묵하고 조용하며 감정표현이 적습니다.`,coaching:`이 성향은 진중하고 신뢰감 있는 태도로 신인에게 안정감을 주는 장점이 있습니다. 
다만 바쁠수록 표정 변화나 감정 표현이 줄어들어 신인이 거리감을 느끼는 경우가 있습니다. 좋은 의도를 가지고 있어도 표현이 부족하면 관심이 없거나 만족하지 않는다고 오해받을 수 있습니다. 의식적으로 미소를 띄고 고개를 끄덕이며 "좋습니다.", "잘하셨습니다.", "수고 많았습니다." 와 같은 긍정적인 표현을 자주 사용하면 신인의 동기부여가 크게 달라질 수 있습니다.`,script:``},AC:{condition:`0-7`,trait:`주관이 강하고 자기 기준이 또렷합니다`,coaching:`이 성향은 주관과 결단력이 뚜렷하며 흔들림 없이 방향을 제시하는 장점이 있습니다. 
다만 자신의 생각이 분명한 만큼 바쁠수록 신인이 따라오는 속도까지 살피지 못하는 경우가 있습니다. 코치는 앞에서 끌고 가는 것도 중요하지만 뒤에서 따라오는 사람도 함께 봐야 합니다. 방향은 분명하게 알려주되 신인이 이해하고 따라올 수 있는 시간을 주고, 내 기준만 말하기보다 상대가 받아들일 수 있는 속도에 맞춰 설명해야 합니다. 그렇게 해야 신인의 신뢰와 실행력을 높이는 데 도움이 될 수 있습니다.`,script:``}},cm4_5:`OOO님께서 현재 조율 포인트를 이미 인식하고 계시고, 평소 의식적으로 말과 행동에 반영하고 계신다면 강점이 더욱 안정적으로 발휘되어 지금도 좋은 성과를 내고 계실 가능성이 높습니다.

⚠️ 만약 다섯 가지 성향 중 17점 이상인 항목이 있다면, 해당 성향의 에너지가 강하게 발휘되는 상태입니다. 이는 큰 강점이 될 수 있지만, 상황에 따라 상대방이 다소 과하게 느낄 수도 있습니다. 이 부분만 의식적으로 조율하면 더욱 균형 잡힌 관계와 성과에 도움이 됩니다.
    또한 가장 낮은 성향은 성과와 인간관계에서 반복적으로 나타나는 아쉬움의 원인이 될 수 있습니다. 가장 낮은 성향을 잘 이해하고 의식적으로 활용하려는 노력이 더해지면 강점은 더욱 빛을 발하게 됩니다.`,cm5:{CP_NP_A:{manner:`OOO님은 조직 안에서 사람을 챙기려는 마음이 강하면서도 조직의 흐름과 운영 방향을 놓치지 않으려는 성향이 강하게 나타납니다.

CP(기준,결단)의 점수가 높기 때문에 업무의 흐름과 약속, 실행 수준을 중요하게 생각합니다. 그래서 신인에게도
“이 부분은 꼭 맞춰가야 합니다.”
“여기까지는 같이 해보셔야 합니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 압박만 주는 방식으로 관리하지 않습니다. 신인이 힘들어하면 먼저 이유를 들으려 하고, 상황을 이해하려 하며, 오래 함께 가고 싶은 마음이 큽니다. 그래서 신인 입장에서는
“나를 이해해주려고 한다.”
“나를 함부로 몰아붙이지 않는다.”
“챙겨주려는 마음이 느껴진다.”
라는 안정감을 느끼게 됩니다.

다만 A(이성,판단)의 점수가 가장 낮으면 한 가지 아쉬운 부분이 생길 수 있습니다. 코치 본인은 충분히 설명했다고 느끼는데 신인 입장에서는
“그래서 지금 무엇부터 해야 하지?”
“결국 어떤 행동을 먼저 바꾸라는 거지?”
“우선순위가 잘 정리되지 않는다.”
처럼 느끼는 경우가 많습니다.

즉, OOO님의 성향은 공감과 배려는 충분하지만 실행 정리와 행동 방향이 흐려질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감 뒤에 행동을 남기는 습관이 중요합니다. 위로로 끝나는 것이 아니라 “그래서 지금 무엇을 해야 하는지”를 분명하게 남겨줘야 신인이 실제로 움직이기 시작합니다.

특히 신인이 힘들어할 때
“괜찮습니다.”
“이해합니다.”
“많이 힘드셨겠어요.”
이런 말만 하고 끝나면 마음은 편해지지만 행동은 남지 않을 가능성이 있습니다.

그래서 마지막에는 반드시
 “그럼 오늘은 고객 연락 열 건만 정확하게 해보시죠.”
 "오늘은 상담 프로세스를 다시 점검해 보시죠."
 “지금은 기존 고객 관리부터 다시 정리해보시죠.”
처럼 행동 문장을 붙여주는 것이 중요합니다.

OOO님의 성향은 원래 사람을 오래 데리고 가는 힘이 강한 성향입니다. 여기에 실행 정리와 우선순위 안내가 조금만 더해지면 조직의 움직임 속도와 활동량, 상담 진행률과 매출 흐름이 훨씬 안정적으로 올라가게 됩니다.

결국 OOO님의 성향의 핵심은 따뜻함 자체가 아니라 따뜻함 뒤에 실행이 남도록 만드는 것입니다. 공감으로 마음을 열고 마지막에는 행동을 남겨야 신인의 활동량과 생산성도 함께 올라가게 됩니다.`,improvement:``},CP_NP_FC:{manner:`OOO님은 조직 안에서 사람을 챙기려는 마음과 운영의 중심을 잡으려는 힘이 함께 강하게 나타나는 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 흐름과 실행 수준을 중요하게 생각합니다. 그래서 신인에게도
“이 부분은 꼭 맞춰가야 합니다.”
“지금은 이 흐름이 중요합니다.”
같이 방향을 정리하는 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 강하게 밀어붙이는 방식으로 조직을 운영하지 않습니다. 신인이 힘들어하면 먼저 이유를 들으려 하고, 상황을 이해하려 하며, 오래 함께 가고 싶은 마음이 큽니다. 그래서 신인 입장에서는
“나를 챙겨주려고 한다.”
“내 상황을 이해하려고 한다.”
“쉽게 포기하지 않는 코치다.”
라는 안정감을 느끼게 됩니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 조직 안에서 한 가지 아쉬운 흐름이 생길 수 있습니다. 코치 본인은 진지하게 이야기하고 있다고 생각하지만 신인 입장에서는 표정이나 분위기가 다소 무겁게 느껴질 수 있고, 거리감이 생길 수도 있습니다.

특히 결과와 실행을 중요하게 생각하는 말이 반복되면 신인은
“계속 긴장된다.”
“잘못하면 혼날 것 같다.”
“가까이 다가가기 어렵다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직을 안정적으로 끌고 가는 힘은 강하지만 분위기를 부드럽게 풀어주는 표현과 감정 전달이 부족해질 수 있는 구조입니다.

그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는
“요즘 너무 잘 하시고 계세요^^”
“수고 많았어요 이 부분은  제가 높게 평가합니다.”
“결과도 중요하지만 지금 과정도 아주 잘하고 있습니다.”
같은 멘트를 먼저 넣어주는 것이 필요합니다.

특히 FC(친화,표현)가 낮은 코치는 의식적으로 미소를 띄고 고개를 끄덕이는 행동만 추가해도 신인이 느끼는 심리적 압박감이 훨씬 줄어들게 됩니다.

OOO님은 원래 조직을 오래 유지하고 사람을 책임감 있게 끌고 가는 힘이 매우 강한 성향입니다. 여기에 분위기를 조금 더 편안하게 만드는 표현이 더해지면 신인의 활동량과 조직의 움직임이 훨씬 살아나게 됩니다.

결국 OOO님의 성향의 핵심은 강한 책임감과 배려를 가지고 있다는 점입니다. 다만 신인이 코치를 조금 더 편하게 느끼고 가까이 다가올 수 있도록 분위기를 부드럽게 풀어주는 표현이 함께 들어가야 신인의 활동량과 생산성도 더 안정적으로 올라가게 됩니다.`,improvement:``},CP_NP_AC:{manner:`OOO님은 조직 안에서 사람을 챙기면서도 흐트러지지 않게 방향을 잡아주는 힘이 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 흐름과 실행 수준을 중요하게 생각합니다. 그래서 신인에게도
“지금은 이 흐름이 중요합니다.”
“이 부분은 꼭 맞춰가야 합니다.”
같이 방향을 정리하는 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 결과만 보는 관리 스타일이 아니라 사람을 오래 데리고 가려는 마음이 큽니다. 신인이 힘들어하면 먼저 이유를 들으려 하고, 쉽게 포기하지 않으며, 정서적으로 버틸 수 있도록 챙겨주려는 모습이 강하게 나타납니다. 그래서 신인 입장에서는
“나를 책임감 있게 챙겨주는 코치다.”
“혼내기보다 같이 가려고 한다.”
“쉽게 내치지 않는다.”
라는 안정감을 느끼게 됩니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 본인의 말이 상대에게 어떻게 느껴지는지를 놓치는 경우가 생길 수 있습니다. 코치 본인은 조직을 위해 당연한 이야기를 하고 있다고 느끼지만 신인 입장에서는
“압박처럼 느껴진다.”
“내 마음을 충분히 듣기 전에 결론이 나온다.”
“조금 무섭게 느껴질 때가 있다.”
라고 받아들이는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 책임감과 배려는 강하지만 상대의 속도와 부담감을 세밀하게 살피는 부분이 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 “내 말이 상대에게 어떻게 들릴까”를 한 번 더 확인하는 습관이 중요합니다.

특히 AC(협조,조율)가 낮은 코치는 결과와 방향을 먼저 이야기하기 전에
 “지금 이 방향이 부담스럽진 않으신가요?”
 “코칭속도는 괜찮으신가요?”
 “지금 가장 막히는 부분이 어떤 건가요?”
같은 질문을 먼저 넣어주는 것만으로도 신인의 긴장감이 훨씬 줄어들게 됩니다.

OOO님은 원래 조직을 강하게 끌고 갈 수 있는 힘이 있는 성향입니다. 여기에 상대의 감정과 부담 정도를 한 번 더 살피는 질문이 더해지면 신인의 활동량과 실행 지속력이 훨씬 안정적으로 올라가게 됩니다.

결국 OOO님의 성향의 핵심은 강한 책임감과 따뜻함입니다. 다만 상대의 부담과 감정 속도를 한 번 더 확인하는 질문이 함께 들어가야 신인의 활동량과 생산성도 더 안정적으로 올라가게 됩니다.`,improvement:``},CP_A_NP:{manner:`OOO님은 조직 안에서 방향을 잡고 흐름을 정리하는 힘이 매우 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 운영 흐름과 실행 수준을 중요하게 생각합니다. 그래서 신인에게도
“지금은 이 부분을 먼저 맞춰야 합니다.”
“여기서는 흐름이 흔들리면 안 됩니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 감정적으로 흔들리기보다 상황을 정리하고 분석하려는 힘이 강합니다. 신인의 활동량, 상담 흐름, 고객 반응, 실적 흐름을 비교적 냉정하게 보려고 하며 문제를 발견하면 빠르게 정리해서 해결 방향을 잡으려 합니다. 그래서 신인 입장에서는
“판단이 빠르고 정확하다.”
“흐름을 잘 정리해준다.”
“문제가 생겨도 중심을 잃지 않는다.”
라는 신뢰감을 느끼게 됩니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 신인의 감정 상태를 충분히 살피기 전에 해결과 수정 방향이 먼저 나오는 경우가 생길 수 있습니다. 코치 본인은 조직을 위해 필요한 말을 한다고 느끼지만 신인 입장에서는
“결과만 중요하게 보는 것 같다.”
“내 마음은 충분히 이해받지 못한 느낌이다.”
“실수하면 바로 지적받을 것 같다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 흐름을 안정적으로 끌고 가는 힘은 매우 강하지만 신인의 감정과 긴장 상태를 풀어주는 표현이 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 문제를 바로 수정하려 하기 전에 먼저 신인의 상황과 마음 상태를 한 번 들어주는 습관이 중요합니다.

특히 NP(배려,공감)가 낮은 코치는
 “요즘 가장 힘든 부분이 어떤 건가요?”
 “지금 계속 움직이고 계신 건 정말 잘하고 계십니다.”
 “혼자 너무 오래 끌고 가지 마시고 중간에 꼭 이야기해주세요.”
같은 공감 문장을 의식적으로 먼저 사용하는 것만으로도 신인의 심리적 거리감이 크게 줄어들게 됩니다.

OOO님은 원래 조직을 안정적으로 끌고 갈 수 있는 힘이 매우 강한 성향입니다. 여기에 따뜻한 인정과 공감 표현이 조금만 더해지면 신인의 활동 지속력과 조직의 분위기가 훨씬 좋아지고 매출 흐름도 더 안정적으로 올라가게 됩니다.

결국 OOO님의 성향의 핵심은 강한 책임감과 상황 정리 능력입니다. 다만 신인이 ‘이 코치는 내 상황도 이해하려고 한다’라는 느낌을 받을 수 있도록 공감의 표현을 조금 더 의식적으로 사용해야 신인의 활동량과 생산성도 더 오래 안정적으로 유지될 수 있습니다.`,improvement:``},CP_A_FC:{manner:`OOO님은 조직 안에서 방향을 잡고 흐름을 정리하는 힘이 매우 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 운영 흐름과 실행 수준을 중요하게 생각합니다. 그래서 신인에게도
“지금은 이 부분을 먼저 맞춰야 합니다.”
“여기서는 흐름이 흔들리면 안 됩니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 감정적으로 흔들리기보다 상황을 정리하고 분석하려는 힘이 강합니다. 신인의 활동량, 상담 흐름, 고객 반응, 실적 흐름을 비교적 냉정하게 보려고 하며 문제를 발견하면 빠르게 정리해서 해결 방향을 잡으려 합니다. 그래서 신인 입장에서는
“판단이 빠르고 정확하다.”
“흐름을 잘 정리해준다.”
“문제가 생겨도 중심을 잃지 않는다.”
라는 신뢰감을 느끼게 됩니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 조직 안에서 분위기를 부드럽게 풀어주는 표현이 부족해질 수 있습니다. 코치 본인은 진지하게 이야기하고 있다고 느끼지만 신인 입장에서는
“조금 어렵게 느껴진다.”
“가까이 다가가기 쉽지 않다.”
“계속 긴장하게 된다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 방향과 실행 흐름을 안정적으로 끌고 가는 힘은 매우 강하지만, 신인의 긴장감을 풀어주고 편하게 움직이게 만드는 표현이 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 결과 점검만 하는 것이 아니라 신인이 심리적으로 편안하게 움직일 수 있는 분위기를 함께 만들어주는 것이 중요합니다.

그래서 신인을 독려하기 위헤서
“요즘 너무 잘 하시고 계세요^^”
“수고 많았어요 이 부분은  제가 높게 평가합니다.”
“결과도 중요하지만 지금 과정도 아주 잘하고 있습니다.”
같은 멘트를 먼저 넣어주는 것이 필요합니다.
 
FC(친화,표현)가 낮은 코치는 의식적으로 미소를 띄고 고개를 끄덕이는 반응을 보여주고 결과 이야기 전에 인정하는 말을 먼저 넣어주고 무거운 분위기를 너무 오래 끌고 가지 않는 습관이 있어야 합니다.

OOO님의 성향은 원래 조직을 오래 안정적으로 운영할 수 있는 힘이 매우 강한 성향입니다. 여기에 분위기를 조금 더 편안하게 만드는 표현이 더해지면 신인의 활동량과 상담 움직임, 조직의 에너지와 매출 흐름이 훨씬 살아나게 됩니다.

결국 OOO님의 성향의 핵심은 강한 책임감과 상황 정리 능력입니다. 다만 신인이 긴장만 하기보다 편하게 움직일 수 있도록 분위기를 조금 더 부드럽게 만들어줘야 신인의 활동량과 생산성도 더 안정적으로 올라가게 됩니다.`,improvement:``},CP_A_AC:{manner:`OOO님은 조직 안에서 방향을 잡고 흐름을 안정적으로 유지하는 힘이 매우 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 운영 흐름과 실행 수준을 중요하게 생각합니다. 그래서 신인에게도
“지금은 이 흐름을 먼저 맞춰야 합니다.”
“여기서는 실행 움직임이 중요합니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 감정적으로 흔들리기보다 상황을 정리하고 분석하려는 힘이 강합니다. 신인의 활동량, 고객 흐름, 상담 진행률, 계약 흐름 등을 비교적 객관적으로 보려고 하며 문제가 생기면 빠르게 원인을 찾고 해결 방향을 정리하려 합니다. 그래서 신인 입장에서는
“판단이 빠르다.”
“흐름 정리가 명확하다.”
“조직 운영이 안정적이다.”
라는 신뢰감을 느끼게 됩니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 상태와 부담 정도를 세밀하게 살피는 부분이 부족해질 수 있습니다. 코치 본인은 조직을 위해 필요한 이야기를 하고 있다고 느끼지만 신인 입장에서는
“말이 조금 강하게 느껴진다.”
“결론이 너무 빨리 나온다.”
“내 상황을 충분히 설명하기 어렵다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직을 안정적으로 끌고 가는 힘은 매우 강하지만 신인의 현재 상태와 부담 정도를 확인하는 질문이 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 실행 방향을 이야기하기 전에 상대의 현재 흐름을 먼저 확인하는 습관이 중요합니다.

특히 OOO님은 결과와 행동을 먼저 이야기하기 전에
“지금 코칭속도는 괜찮으신가요?”
“요즘 가장 버거운 부분은 어떤 건가요?”
“이 방향이 부담스럽게 느껴지진 않으신가요?”
같은 질문을 먼저 넣어주는 것만으로도 신인의 긴장감과 거리감이 크게 줄어들게 됩니다.

또한 신인이 실적이 떨어졌을 때 바로 수정 방향부터 이야기하면 신인은 자신이 이해받지 못한다고 느끼기 쉽습니다. 그래서 먼저 현재 상황을 듣고 난 뒤 행동 방향을 정리해주는 순서가 중요합니다. 공감 없이 바로 결론으로 들어가면 신인은 움직이기보다 방어적으로 변할 가능성이 높아집니다.

그래서 OOO님은
“무엇을 바꿀 것인가”보다
“지금 어떤 상태인가”를 먼저 묻는 습관이 중요합니다.

OOO님의 성향은 원래 조직을 강하게 끌고 갈 수 있는 힘이 매우 뛰어난 성향입니다. 여기에 신인의 감정과 부담을 한 번 더 확인하는 표현이 더해지면 활동량과 상담 움직임, 조직의 실행 지속력이 훨씬 안정적으로 살아나게 됩니다.`,improvement:``},CP_FC_NP:{manner:`OOO님은 조직 안에서 실행력과 분위기를 동시에 끌고 가는 힘이 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 흐름과 실행 수준을 중요하게 생각합니다. 그래서 신인에게도
“지금은 이 흐름을 먼저 맞춰야 합니다.”
“여기서는 실행 움직임이 중요합니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로  FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며, 상담 현장이나 회의 분위기가 너무 가라앉지 않도록 에너지를 살리려는 모습도 강하게 나타납니다. 그래서 신인 입장에서는
“분위기를 답답하지 않게 만든다.”
“조직 안의 에너지를 살린다.”
“같이 움직이면 힘이 난다.”
라는 느낌을 받는 경우가 많습니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 신인의 감정 상태와 속마음을 깊게 공감해주는 부분이 부족해질 수 있습니다. 코치 본인은 분위기도 좋고 방향도 잘 잡아주고 있다고 느끼지만 신인 입장에서는
“내 마음까지 충분히 이해받는 느낌은 아니다.”
“결국 결과 중심으로 느껴질 때가 있다.”
“힘든 상황을 길게 이야기하기 어렵다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 움직임과 분위기를 끌어올리는 힘은 강하지만 신인의 감정을 오래 들어주고 공감하는 부분이 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 분위기를 살리는 것만으로 끝나는 것이 아니라 신인의 현재 상태를 차분하게 들어주는 시간이 함께 필요합니다.

특히 OOO님은
“괜찮습니다. 다시 해보면 됩니다.”
라고 빠르게 넘어가기보다
“지금 어떤 부분이 가장 힘드셨나요?”
“최근에 마음이 가장 무거웠던 순간이 언제였나요?”
처럼 현재 감정 상태를 먼저 물어보는 습관이 중요합니다.

또한 FC(친화,표현)가 높은 코치는 조직 분위기를 밝게 만들려는 힘이 강하기 때문에 신인이 보내는 무거운 신호를 가볍게 넘길 가능성도 있습니다. 그래서 분위기를 올리는 말 뒤에는 반드시 현재 상태를 확인하는 질문이 함께 들어가야 신인이 심리적으로 더 오래 버틸 수 있게 됩니다.

OOO님의 성향은 원래 조직의 활동량과 움직임을 끌어올리는 힘이 매우 좋은 성향입니다. 여기에 공감과 경청이 조금 더해지면 신인의 안정감과 조직의 유지력이 훨씬 좋아지고 활동량과 생산성 흐름도 더 안정적으로 올라가게 됩니다.`,improvement:``},CP_FC_A:{manner:`OOO님은 조직 안에서 실행력과 분위기를 동시에 끌고 가는 힘이 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 흐름과 실행 수준을 중요하게 생각합니다. 그래서 신인에게도
“지금은 이 흐름을 먼저 맞춰야 합니다.”
“여기서는 움직임이 끊기면 안 됩니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로  FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며, 현장 분위기가 처지지 않도록 에너지를 끌어올리는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“분위기를 답답하지 않게 만든다.”
“같이 움직이면 힘이 난다.”
“조직 안에 에너지가 살아 있다.”
라는 느낌을 받는 경우가 많습니다.

다만 A(이성,판단)의 점수가 가장 낮으면 감정과 분위기 중심으로 조직을 끌고 가다가도 실제 문제 원인이나 숫자 흐름을 차분하게 정리하는 부분이 부족해질 수 있습니다. 코치 본인은 열심히 독려하고 분위기를 살리고 있다고 느끼지만 신인 입장에서는
“무엇부터 정리해야 하는지 헷갈린다.”
“구체적인 우선순위가 부족하다.”
“열심히는 하는데 방향이 흐려질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 활동량과 분위기를 끌어올리는 힘은 매우 강하지만 실행의 우선순위와 현실적인 정리 부분이 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 분위기를 올리는 것과 동시에 “지금 가장 먼저 해야 할 한 가지”를 명확하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“열심히 해봅시다.”
라는 독려만 반복하기보다
“오늘 가장 먼저 해야 하는 건 고객 연락 3건입니다.”
“이번 주는 상담 약속 확보에 집중해보시죠.”
처럼 행동 순서를 구체적으로 정리해주는 것이 중요합니다.

또한 FC(친화,표현)가 높은 코치는 조직 분위기를 살리는 힘이 좋은 대신 신인의 어려움을 가볍게 넘기거나 현실적인 문제를 정확히 짚지 못하는 경우도 생길 수 있습니다. 그래서 격려 이후에는 반드시 현재 숫자 흐름과 행동량을 차분하게 확인하는 과정이 함께 들어가야 합니다.

OOO님의 성향은 원래 조직의 에너지와 활동량을 끌어올리는 힘이 매우 뛰어난 성향입니다. 여기에 우선순위를 정리해주는 습관과 현실적인 점검이 더해지면 신인의 활동량과 생산성 흐름이 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},CP_FC_AC:{manner:`OOO님은 조직 안에서 실행력과 분위기를 동시에 끌고 가는 힘이 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 흐름과 실행 움직임을 중요하게 생각합니다. 그래서 신인에게도
“지금은 이 흐름을 먼저 맞춰야 합니다.”
“여기서는 움직임이 끊기면 안 됩니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로  FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며, 현장 분위기가 처지지 않도록 에너지를 끌어올리는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“현장 에너지가 살아 있다.”
라는 느낌을 받는 경우가 많습니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 상태와 부담 정도를 세밀하게 살피는 부분이 부족해질 수 있습니다. 코치 본인은 분위기도 좋고 방향도 잘 잡아주고 있다고 느끼지만 신인 입장에서는
“조금 압박처럼 느껴질 때가 있다.”
“결론이 빨리 나온다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 활동량과 분위기를 끌어올리는 힘은 매우 강하지만 신인의 현재 상태와 부담 정도를 세밀하게 확인하는 질문이 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 분위기를 살리는 것만으로 끝나는 것이 아니라 상대의 현재 상태를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은 분위기를 밝게 만들면서도 중간중간
“지금 코칭속도는 괜찮으신가요?”
“요즘 가장 버거운 부분은 어떤 건가요?”
“지금 이 흐름이 부담스럽게 느껴지진 않으신가요?”
같은 질문을 함께 넣어주는 것이 중요합니다.

또한 FC(친화,표현)가 높은 코치는 조직 분위기를 끌어올리는 힘이 강하기 때문에 신인의 힘든 신호를 가볍게 넘길 가능성도 있습니다. 그래서 격려와 독려 이후에는 반드시 현재 상태와 부담 정도를 차분하게 확인하는 과정이 함께 들어가야 신인이 더 오래 안정적으로 움직이게 됩니다.

OOO님의 성향은 원래 조직의 에너지와 실행 움직임을 끌어올리는 힘이 매우 뛰어난 성향입니다. 여기에 상대의 감정과 부담을 한 번 더 살피는 질문이 더해지면 신인의 활동량과 생산성 흐름이 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},CP_AC_NP:{manner:`OOO님은 조직 안에서 흐름을 안정적으로 유지하고 신인을 관리하는 힘이 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 방향과 실행 움직임을 중요하게 생각합니다. 그래서 신인에게도
“지금은 이 흐름을 먼저 맞춰야 합니다.”
“여기서는 움직임이 끊기면 안 됩니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로  AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름을 비교적 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고, 조직 안에서 충돌이 커지지 않도록 중간에서 흐름을 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“조직 분위기를 안정적으로 유지하려고 한다.”
“강하게 밀어붙이기보다 조율하려 한다.”
“함부로 부담 주는 말을 하지 않는다.”
라는 느낌을 받는 경우가 많습니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 신인의 감정 상태를 따뜻하게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 배려하고 있다고 느끼지만 신인 입장에서는
“정은 있지만 따뜻한 공감은 부족하다.”
“내 마음을 깊게 이해받는 느낌은 아니다.”
“결국 실행 이야기로 빨리 넘어간다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직을 안정적으로 운영하고 흐름을 유지하는 힘은 좋지만 신인의 감정을 깊게 공감하고 심리적으로 안아주는 표현은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 결과와 실행 방향을 이야기하기 전에 신인의 현재 감정 상태를 먼저 들어주는 습관이 중요합니다.

특히 OOO님은
“왜 이것밖에 안 됐을까요?”
보다
“요즘 가장 힘든 부분은 어떤 건가요?”
“최근에 가장 지쳤던 순간은 언제였나요?”
같은 질문을 먼저 넣어주는 것이 중요합니다.

또한 AC(협조,조율)가 높은 코치는 조직 분위기를 맞추려는 힘이 있기 때문에 속으로 답답함이 있어도 직접 표현하지 못하고 혼자 끌어안는 경우도 있습니다. 그러다 어느 순간 말이 차갑게 나오거나 거리감이 생길 수 있기 때문에 평소 작은 공감 표현을 자주 사용하는 것이 중요합니다.

OOO님의 성향은 원래 조직을 오래 안정적으로 유지할 수 있는 힘이 좋은 성향입니다. 여기에 따뜻한 공감과 감정 확인이 조금 더해지면 신인의 심리적 안정감과 조직의 유지력이 훨씬 좋아지고 활동량과 생산성 흐름도 더 안정적으로 올라가게 됩니다.`,improvement:``},CP_AC_A:{manner:`OOO님은 조직 안에서 흐름을 안정적으로 유지하고 신인을 책임감 있게 관리하려는 힘이 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 방향과 실행 움직임을 중요하게 생각합니다. 그래서 신인에게도
“지금은 이 흐름을 먼저 맞춰야 합니다.”
“여기서는 움직임이 끊기면 안 됩니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로  AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고, 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“조직 분위기를 안정적으로 유지하려고 한다.”
“말을 함부로 강하게 하지 않는다.”
“조율하면서 같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

다만 A(이성,판단)의 점수가 가장 낮으면 감정과 분위기 중심으로 조직을 운영하다가도 실제 문제 원인과 우선순위를 차분하게 정리하는 부분이 부족해질 수 있습니다. 코치 본인은 충분히 노력하고 챙기고 있다고 느끼지만 신인 입장에서는
“무엇부터 해야 할지 헷갈린다.”
“이야기는 많은데 정리가 안 되는 느낌이다.”
“실행 순서가 흐려질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직을 안정적으로 유지하고 관계 흐름을 맞추는 힘은 좋지만 실제 실행 우선순위와 현실적인 정리 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 배려만으로 끝나는 것이 아니라 “지금 가장 먼저 해야 하는 한 가지”를 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“열심히 해봅시다.”
라는 격려만 반복하기보다
“오늘 가장 먼저 해야 하는 건 고객 연락 3건입니다.”
“이번 주는 상담 약속 확보에 집중해보시죠.”
처럼 행동 순서를 구체적으로 정리해주는 것이 중요합니다.

또한 AC(협조,조율)가 높은 코치는 상대 눈치를 많이 보다가 정작 꼭 해야 하는 말을 늦게 꺼내는 경우도 있습니다. 그러다 어느 순간 답답함이 쌓이면 말이 갑자기 강하게 나올 수 있기 때문에 평소 짧고 분명하게 방향을 정리해주는 습관이 중요합니다.

OOO님의 성향은 원래 조직을 오래 안정적으로 유지할 수 있는 힘이 좋은 성향입니다. 여기에 실행 우선순위를 명확하게 정리하는 습관이 더해지면 조직의 활동량과 생산성, 매출 흐름이 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},CP_AC_FC:{manner:`OOO님은 조직 안에서 흐름을 안정적으로 유지하고 신인을 책임감 있게 관리하려는 힘이 강한 성향입니다.

CP(기준,결단)의 점수가 높기 때문에 조직의 방향과 실행 움직임을 중요하게 생각합니다. 그래서 신인에게도
“지금은 이 흐름을 먼저 맞춰야 합니다.”
“여기서는 움직임이 끊기면 안 됩니다.”
같은 말이 자연스럽게 먼저 나오는 경우가 많습니다.

그리고 두 번째로  AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고, 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“조직 분위기를 안정적으로 유지하려고 한다.”
“말을 함부로 강하게 하지 않는다.”
“조율하면서 같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 조직 안에서 분위기를 부드럽게 풀어주는 표현이 부족해질 수 있습니다. 코치 본인은 충분히 배려하면서 이야기하고 있다고 느끼지만 신인 입장에서는
“조금 어렵게 느껴진다.”
“가까이 다가가기 쉽지 않다.”
“긴장감이 오래 유지된다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직을 안정적으로 유지하고 흐름을 관리하는 힘은 좋지만 신인이 심리적으로 편하게 움직일 수 있도록 분위기를 풀어주는 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 실행 방향과 조율만 하는 것이 아니라 신인이 편하게 이야기할 수 있는 분위기를 만드는 습관이 중요합니다.

그래서 신인을 독려하기 위헤서
“요즘 너무 잘 하시고 계세요^^”
“수고 많았어요 이 부분은  제가 높게 평가합니다.”
“결과도 중요하지만 지금 과정도 아주 잘하고 있습니다.”
같은 멘트를 먼저 넣어주는 것이 필요합니다. 

또한 FC(친화,표현)가 낮은 코치는 표정과 반응이 차분하게 유지되는 경우가 많기 때문에 신인은 자신이 혼나고 있다고 오해할 수도 있습니다. 그래서 의식적으로 미소를 띄고 고개를 끄덕이며 들어주는 반응을 추가하는 것만으로도 조직 분위기가 훨씬 편안해질 수 있습니다.

OOO님의 성향은 원래 조직을 오래 안정적으로 유지할 수 있는 힘이 매우 좋은 성향입니다. 여기에 신인이 심리적으로 편하게 움직일 수 있는 분위기와 따뜻한 반응이 더해지면 조직의 활동량과 생산성, 매출 흐름이 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_CP_A:{manner:`OOO님은 조직 안에서 사람을 챙기고 보호하려는 마음이 매우 강한 성향입니다.

 NP(배려,공감)의 점수가 높기 때문에 신인의 감정 상태와 어려움을 잘 살피려고 합니다. 그래서 신인이 힘들어하면 먼저 이유를 들으려 하고, 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 신인 입장에서는
“내 이야기를 잘 들어준다.”
“쉽게 포기하지 않고 끝까지 챙겨준다.”
“사람을 중요하게 생각한다.”
라는 안정감을 느끼는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 단순히 따뜻하기만 한 코치가 아니라 조직의 방향과 실행 흐름도 중요하게 생각합니다. 필요할 때는 분명하게 방향을 정리하고, 움직임이 흐트러질 때는 다시 중심을 잡아주려는 힘도 있습니다. 그래서 신인 입장에서는
“따뜻하지만 중심은 있는 코치다.”
“조직 흐름을 놓치지 않는다.”
“결국은 움직이게 만든다.”
라는 신뢰감을 느끼게 됩니다.

다만 A(이성,판단)의 점수가 가장 낮으면 감정과 분위기 중심으로 조직을 운영하다가도 실제 문제 원인과 실행 우선순위를 차분하게 정리하는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 챙기고 있다고 느끼지만 신인 입장에서는
“무엇부터 해야 하는지 헷갈린다.”
“위로는 되는데 정리가 부족하다.”
“방향이 조금 흐려질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 관계를 안정적으로 유지하는 힘은 매우 좋지만 실행 우선순위와 현실적인 정리 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 격려만으로 끝나는 것이 아니라 “지금 가장 먼저 해야 하는 행동”을 명확하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“괜찮습니다. 잘하실 수 있습니다.”
라는 위로만 반복하기보다
“오늘 가장 먼저 해야 하는 건 고객 연락 3건입니다.”
“이번 주는 상담 약속 확보 하나에 집중해보시죠.”
처럼 행동 순서를 구체적으로 정리해주는 것이 중요합니다.

또한 NP(배려,공감)가 높은 코치는 신인이 힘들어하면 너무 오래 감정을 들어주다가 실행 흐름이 늦어지는 경우도 생길 수 있습니다. 그래서 충분히 공감해준 뒤에는 반드시 행동 방향을 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 움직임과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 실행 순서를 명확하게 정리하는 힘이 더해지면 조직의 활동량과 생산성, 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_CP_FC:{manner:`OOO님은 조직 안에서 사람을 챙기고 보호하려는 마음이 매우 강한 성향입니다.

 NP(배려,공감)의 점수가 높기 때문에 신인의 감정 상태와 어려움을 잘 살피려고 합니다. 그래서 신인이 힘들어하면 먼저 이유를 들으려 하고, 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 신인 입장에서는
“내 이야기를 잘 들어준다.”
“쉽게 포기하지 않고 끝까지 챙겨준다.”
“사람을 중요하게 생각한다.”
라는 안정감을 느끼는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 단순히 따뜻하기만 한 코치가 아니라 조직의 방향과 실행 흐름도 중요하게 생각합니다. 필요할 때는 분명하게 방향을 정리하고, 움직임이 흐트러질 때는 다시 중심을 잡아주려는 힘도 있습니다. 그래서 신인 입장에서는
“따뜻하지만 중심은 있는 코치다.”
“조직 흐름을 놓치지 않는다.”
“결국은 움직이게 만든다.”
라는 신뢰감을 느끼게 됩니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 조직 안에서 분위기를 부드럽게 풀어주는 표현은 부족해질 수 있습니다. 코치 본인은 충분히 배려하고 있다고 느끼지만 신인 입장에서는
“조금 어렵게 느껴진다.”
“칭찬과 반응 표현이 부족하다.”
“긴장감이 오래 유지된다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 유지력을 만드는 힘은 매우 좋지만 신인이 심리적으로 편하게 움직일 수 있도록 분위기를 풀어주는 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 실행 방향만 이야기하는 것이 아니라 신인이 편하게 움직일 수 있는 분위기를 함께 만들어주는 습관이 중요합니다.

특히 OOO님은
“고생 많으셨습니다.”
“지금 계속 움직이고 계신 부분이 정말 좋습니다.”
“오늘 분위기 좋게 잘 버텨주셨습니다.”
같은 짧은 인정 표현을 의식적으로 자주 사용하는 것이 중요합니다.

또한 FC(친화,표현)가 낮은 코치는 표정과 반응이 차분하게 유지되는 경우가 많기 때문에 신인은 자신이 혼나고 있다고 오해할 수도 있습니다. 그래서 의식적으로 미소를 띄고 고개를 끄덕이며 들어주는 반응을 추가하는 것만으로도 조직 분위기가 훨씬 편안해질 수 있습니다.

OOO님의 성향은 원래 조직을 오래 안정적으로 유지하고 신인을 지켜주는 힘이 매우 좋은 성향입니다. 여기에 밝은 반응과 편안한 분위기가 더해지면 조직의 활동량과 생산성, 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_CP_AC:{manner:`OOO님은 조직 안에서 사람을 챙기고 보호하려는 마음이 매우 강한 성향입니다.

 NP(배려,공감)의 점수가 높기 때문에 신인의 감정 상태와 어려움을 잘 살피려고 합니다. 그래서 신인이 힘들어하면 먼저 이유를 들으려 하고, 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 신인 입장에서는
“내 이야기를 잘 들어준다.”
“쉽게 포기하지 않고 끝까지 챙겨준다.”
“사람을 중요하게 생각한다.”
라는 안정감을 느끼는 경우가 많습니다.

그리고 두 번째로 높은 점수인 CP(기준,결단)가 높기 때문에 단순히 따뜻하기만 한 코치가 아니라 조직의 방향과 실행 흐름도 중요하게 생각합니다. 필요할 때는 분명하게 방향을 정리하고, 움직임이 흐트러질 때는 다시 중심을 잡아주려는 힘도 있습니다. 그래서 신인 입장에서는
“따뜻하지만 중심은 있는 코치다.”
“조직 흐름을 놓치지 않는다.”
“결국은 움직이게 만든다.”
라는 신뢰감을 느끼게 됩니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 본인의 말이 상대에게 어떻게 느껴지는지를 놓치는 경우가 생길 수 있습니다. 코치 본인은 조직을 위해 당연한 이야기를 하고 있다고 느끼지만 신인 입장에서는
“압박처럼 느껴진다.”
“내 마음을 충분히 듣기 전에 결론이 나온다.”
“조금 무섭게 느껴질 때가 있다.”
라고 받아들이는 경우도 생길 수 있습니다.

즉즉, OOO님의 성향은 조직의 안정감과 유지력을 만드는 힘은 매우 좋지만  상대의 속도와 부담감을 세밀하게 살피는 부분이 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 “내 말이 상대에게 어떻게 들릴까”를 한 번 더 확인하는 습관이 중요합니다.

특히 AC(협조,조율)가 낮은 코치는 결과와 방향을 먼저 이야기하기 전에
 “지금 이 방향이 부담스럽진 않으신가요?”
 “코칭속도는 괜찮으신가요?”
 “지금 가장 막히는 부분이 어떤 건가요?”
같은 질문을 먼저 넣어주는 것만으로도 신인의 긴장감이 훨씬 줄어들게 됩니다.

OOO님의 성향은 원래 조직을 오래 안정적으로 유지하고 신인을 지켜주는 힘이 매우 좋은 성향입니다. 여기에 상대의 감정과 부담 정도를 한 번 더 살피는 질문이 더해지면 신인의 활동량과 실행 지속력이 훨씬 안정적으로 올라가게 됩니다.

결국 OOO님의 성향의 핵심은 강한 책임감과 따뜻함입니다. 다만 상대의 부담과 감정 속도를 한 번 더 확인하는 질문이 함께 들어가야 신인의 활동량과 생산성도 더 안정적으로 올라가게 됩니다.`,improvement:``},NP_A_CP:{manner:`OOO님은 조직 안에서 사람을 안정적으로 챙기고 신인의 감정 흐름을 세밀하게 살피려는 힘이 강한 성향입니다.

 NP(배려,공감)의 점수가 높기 때문에 신인이 힘들어하면 먼저 이유를 들으려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 신인 입장에서는
“내 이야기를 편하게 할 수 있다.”
“압박보다 안정감을 준다.”
“사람을 중요하게 생각한다.”
라는 느낌을 받는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 단순히 감정적으로만 조직을 운영하는 것이 아니라 현실적인 흐름과 숫자도 같이 보려고 합니다. 신인의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 객관적으로 보며 문제 원인을 차분하게 정리하려는 모습도 나타납니다. 그래서 신인 입장에서는
“차분하게 상황을 정리해준다.”
“무리하게 몰아가지 않는다.”
“이야기를 들은 뒤 현실적으로 방향을 잡아준다.”
라는 신뢰감을 느끼게 됩니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 코치 본인은 충분히 설명하고 공감하고 있다고 느끼지만 신인 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“움직임을 강하게 끌어주는 느낌은 부족하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 안정감을 유지하는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 이해만으로 끝나는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“괜찮습니다. 천천히 해봅시다.”
라는 말만 반복하기보다
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 집중해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 중요합니다.

또한 NP(배려,공감)가 높은 코치는 신인이 힘들어하면 너무 오래 감정을 들어주다가 실제 행동 흐름이 늦어지는 경우도 생길 수 있습니다. 그래서 충분히 공감해준 뒤에는 반드시 행동 방향을 짧게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 실행 움직임을 조금 더 분명하게 끌어주는 힘이 더해지면 신인의 활동량과 생산성 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_A_FC:{manner:`OOO님은 조직 안에서 사람을 안정적으로 챙기고 신인의 감정 흐름을 세밀하게 살피려는 힘이 강한 성향입니다.

 NP(배려,공감)의 점수가 높기 때문에 신인이 힘들어하면 먼저 이유를 들으려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 신인 입장에서는
“내 이야기를 편하게 할 수 있다.”
“압박보다 안정감을 준다.”
“사람을 중요하게 생각한다.”
라는 느낌을 받는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 단순히 감정적으로만 조직을 운영하는 것이 아니라 현실적인 흐름과 숫자도 같이 보려고 합니다. 신인의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 객관적으로 보며 문제 원인을 차분하게 정리하려는 모습도 나타납니다. 그래서 신인 입장에서는
“차분하게 상황을 정리해준다.”
“무리하게 몰아가지 않는다.”
“이야기를 들은 뒤 현실적으로 방향을 잡아준다.”
라는 신뢰감을 느끼게 됩니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 조직 안에서 분위기를 부드럽게 풀어주는 표현은 부족해질 수 있습니다. 코치 본인은 충분히 배려하고 차분하게 이야기하고 있다고 느끼지만 신인 입장에서는
“조금 어렵게 느껴진다.”
“칭찬과 반응 표현이 부족하다.”
“긴장감이 오래 유지된다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 유지력을 만드는 힘은 매우 좋지만 신인이 심리적으로 편하게 움직일 수 있는 분위기를 만드는 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 현실적인 정리만 하는 것이 아니라 신인이 “편하게 움직일 수 있는 분위기”를 함께 만들어주는 습관이 중요합니다.

특히 OOO님은
“고생 많으셨습니다.”
“지금 계속 움직이고 계신 부분이 정말 좋습니다.”
“오늘 분위기 좋게 잘 버텨주셨습니다.”
같은 짧은 인정 표현을 의식적으로 자주 사용하는 것이 중요합니다.

또한 FC(친화,표현)가 낮은 코치는 표정과 반응이 차분하게 유지되는 경우가 많기 때문에 신인은 자신이 혼나고 있다고 오해할 수도 있습니다. 그래서 의식적으로 미소를 띄고 고개를 끄덕이며 들어주는 반응을 추가하는 것만으로도 조직 분위기가 훨씬 편안해질 수 있습니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 밝은 반응과 편안한 분위기가 더해지면 조직의 활동량과 생산성, 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_A_AC:{manner:`OOO님은 조직 안에서 사람을 안정적으로 챙기고 신인의 감정 흐름을 세밀하게 살피려는 힘이 강한 성향입니다.

 NP(배려,공감)의 점수가 높기 때문에 신인이 힘들어하면 먼저 이유를 들으려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 신인 입장에서는
“내 이야기를 편하게 할 수 있다.”
“압박보다 안정감을 준다.”
“사람을 중요하게 생각한다.”
라는 느낌을 받는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 단순히 감정적으로만 조직을 운영하는 것이 아니라 현실적인 흐름과 숫자도 같이 보려고 합니다. 신인의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 객관적으로 보며 문제 원인을 차분하게 정리하려는 모습도 나타납니다. 그래서 신인 입장에서는
“차분하게 상황을 정리해준다.”
“무리하게 몰아가지 않는다.”
“이야기를 들은 뒤 현실적으로 방향을 잡아준다.”
라는 신뢰감을 느끼게 됩니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 속도와 부담 정도를 세밀하게 살피는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 배려하고 있다고 느끼지만 신인 입장에서는
“결론이 조금 빨리 나온다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
“조금 압박처럼 느껴질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 안정감을 유지하는 힘은 매우 좋지만 신인의 현재 부담과 심리 상태를 세밀하게 확인하는 질문은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 현실적인 정리만 하는 것이 아니라 상대의 현재 흐름과 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“괜찮습니다. 다시 해보면 됩니다.”
라고 바로 정리하기보다
“지금 가장 버거운 부분은 어떤 건가요?”
“요즘 코칭속도는 괜찮으신가요?”
“지금 어떤 부분에서 가장 부담을 느끼고 계신가요?”
같은 질문을 먼저 넣어주는 것이 중요합니다.

또한 NP(배려,공감)가 높은 코치는 신인을 오래 챙기려는 마음이 강하기 때문에 속으로 답답함이 있어도 참고 넘어가는 경우도 있습니다. 그러다가 어느 순간 말이 갑자기 강하게 나오면 신인은 더 크게 위축될 수 있습니다. 그래서 평소 짧고 부드럽게 현재 상태를 확인하는 습관이 중요합니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 상대의 부담과 현재 흐름을 한 번 더 확인하는 질문이 더해지면 조직의 활동량과 생산성, 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_FC_CP:{manner:`OOO님은 조직 안에서 사람을 편안하게 만들고 분위기를 밝게 유지하는 힘이 매우 강한 성향입니다.

 NP(배려,공감)의 점수가 높기 때문에 신인의 감정 상태와 어려움을 잘 살피려고 합니다. 그래서 신인이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 신인 입장에서는
“내 이야기를 편하게 할 수 있다.”
“정서적으로 안정감을 준다.”
“사람을 진심으로 챙긴다.”
라는 느낌을 받는 경우가 많습니다.

그리고 두 번째로  FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며, 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“조직 분위기가 답답하지 않다.”
“같이 움직이면 힘이 난다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 코치 본인은 충분히 공감하고 격려하고 있다고 느끼지만 신인 입장에서는
“결론이 조금 약하다.”
“긴장감이 느슨해질 때가 있다.”
“좋은 분위기인데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 관계 유지력은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 “지금 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“괜찮습니다. 잘될 겁니다.”
라는 격려만 반복하기보다
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 집중해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 중요합니다.

또한 NP(배려,공감)와 FC(친화,표현)가 함께 높은 코치는 신인과 관계가 좋아지는 대신 분위기가 너무 편안해져 실행 긴장감이 약해질 가능성도 있습니다. 그래서 충분히 공감해준 뒤에는 반드시 행동 목표를 짧고 명확하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 실행 움직임을 조금 더 분명하게 끌어주는 힘이 더해지면 신인의 활동량과 생산성 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_FC_A:{manner:`OOO님은 조직 안에서 사람을 편안하게 만들고 분위기를 밝게 유지하는 힘이 매우 강한 성향입니다.

 NP(배려,공감)의 점수가 높기 때문에 신인의 감정 상태와 어려움을 잘 살피려고 합니다. 그래서 신인이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 신인 입장에서는
“내 이야기를 편하게 할 수 있다.”
“정서적으로 안정감을 준다.”
“사람을 진심으로 챙긴다.”
라는 느낌을 받는 경우가 많습니다.

그리고 두 번째로  FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며, 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“조직 분위기가 답답하지 않다.”
“같이 움직이면 힘이 난다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

다만 A(이성,판단)의 점수가 가장 낮으면 분위기와 감정 중심으로 조직을 운영하다가 실제 문제 원인과 우선순위를 차분하게 정리하는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 공감하고 격려하고 있다고 느끼지만 신인 입장에서는
“무엇부터 해야 하는지 헷갈린다.”
“위로는 되는데 정리가 부족하다.”
“열심히는 하는데 방향이 흐려질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 관계 유지력은 매우 좋지만 실행 우선순위와 현실적인 정리 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 “지금 가장 먼저 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“괜찮습니다. 잘될 겁니다.”
라는 격려만 반복하기보다
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 집중해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 중요합니다.

또한 NP(배려,공감)와 FC(친화,표현)가 함께 높은 코치는 신인과 관계가 좋아지는 대신 분위기가 너무 편안해져 실행 긴장감이 약해질 가능성도 있습니다. 그래서 충분히 공감해준 뒤에는 반드시 행동 목표를 짧고 명확하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 실행 우선순위를 정리해주는 힘이 더해지면 신인의 활동량과 생산성 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_FC_AC:{manner:`OOO님은 조직 안에서 사람을 편안하게 만들고 분위기를 밝게 유지하는 힘이 매우 강한 성향입니다.

 NP(배려,공감)의 점수가 높기 때문에 신인의 감정 상태와 어려움을 잘 살피려고 합니다. 그래서 신인이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 신인 입장에서는
“내 이야기를 편하게 할 수 있다.”
“정서적으로 안정감을 준다.”
“사람을 진심으로 챙긴다.”
라는 느낌을 받는 경우가 많습니다.

그리고 두 번째로  FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며, 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“조직 분위기가 답답하지 않다.”
“같이 움직이면 힘이 난다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 속도와 부담 정도를 세밀하게 살피는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 공감하고 편안한 분위기를 만들고 있다고 느끼지만 신인 입장에서는
“결론이 조금 빨리 나온다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
“좋은 분위기인데도 압박처럼느껴질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 관계 유지력은 매우 좋지만 신인의 현재 부담과 심리 상태를 세밀하게 확인하는 질문은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 상대의 현재 흐름과 부담 정도를 먼저 확인하는 습관이 중요합니다.


또한 NP(배려,공감)와 FC(친화,표현)가 함께 높은 코치는 조직 분위기를 너무 편안하게 유지하려다가 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 어느 순간 답답함이 쌓이면 말이 갑자기 강하게 나올 수 있기 때문에 평소 짧고 부드럽게 현재 상태를 확인하면서도 실행 움직임은 분명하게 정리해주는 습관이 중요합니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 상대의 부담과 현재 흐름을 한 번 더 확인하는 질문이 더해지면 조직의 활동량과 생산성, 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_AC_CP:{manner:`OOO님은 조직 안에서 사람을 안정적으로 챙기고 신인의 감정 흐름과 조직 분위기를 부드럽게 유지하려는 힘이 강한 성향입니다.

 NP(배려,공감)의 점수가 높기 때문에 신인이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 신인 입장에서는
“내 이야기를 편하게 할 수 있다.”
“사람을 함부로 대하지 않는다.”
“정서적으로 안정감을 준다.”
라는 느낌을 받는 경우가 많습니다.

그리고 두 번째로  AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 편안하게 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 코치 본인은 충분히 챙기고 배려하고 있다고 느끼지만 신인 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“좋은 분위기인데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 유지력을 안정적으로 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 배려만으로 끝나는 것이 아니라 “지금 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“괜찮습니다. 천천히 해봅시다.”
라는 말만 반복하기보다
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 중요합니다.

또한 NP(배려,공감)와 AC(협조,조율)가 함께 높은 코치는 신인의 부담을 너무 배려하다가 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 조직 분위기가 느슨해지면 활동량과 상담 움직임도 함께 떨어질 가능성이 있습니다. 그래서 충분히 공감해준 뒤에는 반드시 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 실행 움직임을 조금 더 분명하게 끌어주는 힘이 더해지면 신인의 활동량과 생산성 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_AC_A:{manner:`OOO님은 조직 안에서 사람을 안정적으로 챙기고 신인의 감정 흐름과 조직 분위기를 부드럽게 유지하려는 힘이 강한 성향입니다.

 NP(배려,공감)의 점수가 높기 때문에 신인이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 그래서 신인 입장에서는
“내 이야기를 편하게 할 수 있다.”
“사람을 함부로 대하지 않는다.”
“정서적으로 안정감을 준다.”
라는 느낌을 받는 경우가 많습니다.

그리고 두 번째로  AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 편안하게 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

다만 A(이성,판단)의 점수가 가장 낮으면 감정과 분위기 중심으로 조직을 운영하다가 실제 문제 원인과 우선순위를 차분하게 정리하는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 챙기고 배려하고 있다고 느끼지만 신인 입장에서는
“무엇부터 해야 하는지 헷갈린다.”
“좋은 분위기인데 방향이 흐려질 때가 있다.”
“위로는 되는데 정리가 부족하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 유지력을 안정적으로 만드는 힘은 매우 좋지만 실행 우선순위와 현실적인 정리 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 배려만 하는 것이 아니라 “지금 가장 먼저 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 신인이 힘들어할 때 너무 오래 위로와 공감만 이어가기보다, 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“지금 여러 가지를 한꺼번에 하려고 하기보다 이번 주는 상담 약속 확보 하나에 집중해보시지요.”
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 NP(배려,공감)와 AC(협조,조율)가 함께 높은 코치는 신인의 부담을 너무 배려하다가 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 조직 분위기가 느슨해지면 활동량과 상담 움직임도 함께 떨어질 가능성이 있습니다. 그래서 충분히 공감해준 뒤에는 반드시 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 실행 우선순위를 정리해주는 힘이 더해지면 신인의 활동량과 생산성 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},NP_AC_FC:{manner:`OOO님은 조직 안에서 사람을 안정적으로 챙기고 신인의 감정 흐름과 조직 분위기를 부드럽게 유지하려는 힘이 강한 성향입니다.

 NP(배려,공감)의 점수가 높기 때문에 신인이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습이 강하게 나타납니다. 신인 입장에서는
“내 이야기를 편하게 할 수 있다.”
“사람을 함부로 대하지 않는다.”
“정서적으로 안정감을 준다.”
라는 느낌을 받는 경우가 많습니다.

그리고 두 번째로  AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 편안하게 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 조직 안에서 분위기를 부드럽게 풀어주는 표현은 부족해질 수 있습니다. 코치 본인은 충분히 배려하고 조심해서 이야기하고 있다고 느끼지만 신인 입장에서는
“조금 어렵게 느껴진다.”
“칭찬과 반응 표현이 부족하다.”
“긴장감이 오래 유지된다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 유지력을 안정적으로 만드는 힘은 매우 좋지만 신인이 심리적으로 편하게 움직일 수 있는 분위기를 만드는 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 배려만 하는 것이 아니라 신인이 “편하게 움직일 수 있는 반응과 표현”을 의식적으로 자주 사용하는 습관이 중요합니다.

특히 OOO님은 신인이 힘들어할 때 차분하게 듣기만 하기보다
“고생 많으셨습니다.”
“계속 움직이고 계신 부분이 정말 좋습니다.”
“오늘 분위기 좋게 잘 버텨주셨습니다.”
같은 짧은 인정 표현을 자주 넣어주는 것이 중요합니다.

또한 FC(친화,표현)가 낮은 코치는 표정과 반응이 차분하게 유지되는 경우가 많기 때문에 신인은 자신이 혼나고 있다고 오해할 수도 있습니다. 그래서 의식적으로 미소를 띄고 고개를 끄덕이며 들어주는 반응을 추가하는 것만으로도 조직 분위기가 훨씬 편안해질 수 있습니다.

그리고 NP(배려,공감)와 AC(협조,조율)가 함께 높은 코치는 신인의 부담을 너무 배려하다가 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그래서 충분히 공감해준 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결되는 표현을 함께 정리해주는 것이 중요합니다.

OOO님의 성향은 원래 조직의 분위기와 유지력을 매우 좋게 만드는 성향입니다. 여기에 밝은 반응과 편안한 분위기가 더해지면 조직의 활동량과 생산성, 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_CP_NP:{manner:`OOO님은 조직 안에서 흐름을 차분하게 정리하고 현실적으로 움직임을 관리하려는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 신인의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 신인 입장에서는
“상황 정리가 명확하다.”
“감정적으로 흔들리지 않는다.”
“현실적으로 방향을 잡아준다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 조직의 실행 움직임과 운영 흐름도 중요하게 생각합니다. 필요할 때는 분명하게 방향을 정리하고 움직임이 흐트러질 때는 다시 중심을 잡아주려는 힘도 있습니다. 그래서 신인 입장에서는
“조직 흐름을 놓치지 않는다.”
“결국 움직이게 만든다.”
“성과 방향이 분명하다.”
라는 느낌을 받게 됩니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 신인의 감정 상태를 따뜻하게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 설명하고 방향도 잘 잡아주고 있다고 느끼지만 신인 입장에서는
“조금 차갑게 느껴질 때가 있다.”
“내 마음까지 충분히 이해받는 느낌은 아니다.”
“결론이 빨리 나온다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 실행력과 생산성을 안정적으로 끌고 가는 힘은 매우 좋지만 신인의 감정과 심리 상태를 충분히 공감해주는 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 결과와 방향만 이야기하는 것이 아니라 현재 신인의 감정 상태와 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“지금 왜 안 되고 있을까요?”
라고 바로 원인을 정리하기보다
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근에 가장 지쳤던 순간은 언제였나요?”
같은 질문을 먼저 넣어주는 것이 중요합니다.

또한 A(이성,판단)와 CP(기준,결단)가 함께 높은 코치는 문제를 빨리 해결하려는 힘이 강하기 때문에 신인이 충분히 이야기하기 전에 결론부터 정리하는 경우도 생길 수 있습니다. 그러다 보면 신인은 “내 마음은 이해받지 못했다”라고 느끼면서 움직임까지 줄어들 가능성이 있습니다. 그래서 충분히 듣고 난 뒤 행동 방향을 정리해주는 순서가 매우 중요합니다.

그리고 OOO님의 성향은 실행 움직임을 끌어가는 힘이 좋기 때문에 공감 이후에는 반드시 실제 행동으로 연결해주는 흐름이 필요합니다. 예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 현실적인 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 흐름과 생산성을 안정적으로 유지하는 힘이 매우 뛰어난 성향입니다. 여기에 따뜻한 공감과 감정 확인이 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_CP_FC:{manner:`OOO님은 조직 안에서 흐름을 차분하게 정리하고 현실적으로 움직임을 관리하려는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 신인의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 신인 입장에서는
“상황 정리가 명확하다.”
“감정적으로 흔들리지 않는다.”
“현실적으로 방향을 잡아준다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 조직의 실행 움직임과 운영 흐름도 중요하게 생각합니다. 필요할 때는 분명하게 방향을 정리하고 움직임이 흐트러질 때는 다시 중심을 잡아주려는 힘도 있습니다. 그래서 신인 입장에서는
“조직 흐름을 놓치지 않는다.”
“결국 움직이게 만든다.”
“성과 방향이 분명하다.”
라는 느낌을 받게 됩니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 조직 안에서 분위기를 부드럽게 풀어주거나 감정을 편안하게 표현하는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 설명하고 방향도 잘 잡아주고 있다고 느끼지만 신인 입장에서는
“조금 어렵게 느껴진다.”
“칭찬과 반응 표현이 부족하다.”
“긴장감이 오래 유지된다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 실행력과 생산성을 안정적으로 끌고 가는 힘은 매우 좋지만 신인이 심리적으로 편하게 움직일 수 있는 분위기를 만드는 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 결과와 방향만 이야기하는 것이 아니라 신인이 편하게 움직일 수 있는 반응과 표현을 의식적으로 자주 사용하는 습관이 중요합니다.

특히 OOO님은
“이 부분은 이렇게 정리하겠습니다.”
처럼 결론 중심으로만 이야기하기보다
“고생 많으셨습니다.”
“지금 계속 움직이고 계신 부분이 정말 좋습니다.”
“오늘 분위기 좋게 잘 버텨주셨습니다.”
같은 짧은 인정 표현을 자주 넣어주는 것이 중요합니다.

또한 A(이성,판단)와 CP(기준,결단)가 함께 높은 코치는 문제를 빨리 해결하려는 힘이 강하기 때문에 신인이 충분히 이야기하기 전에 결론부터 정리하는 경우도 생길 수 있습니다. 거기에 FC(친화,표현)까지 낮아지면 말투와 분위기가 더 단단하게 전달될 가능성도 있습니다. 그래서 의식적으로 미소를 띄고 고개를 끄덕이며 들어주는 반응을 추가하는 것만으로도 조직 분위기가 훨씬 편안해질 수 있습니다.

그리고 OOO님의 성향은 실행 움직임을 끌어가는 힘이 좋기 때문에 분위기를 편안하게 만든 뒤에는 반드시 실제 행동으로 연결해주는 흐름이 필요합니다. 예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 현실적인 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 흐름과 생산성을 안정적으로 유지하는 힘이 매우 뛰어난 성향입니다. 여기에 부드러운 반응과 따뜻한 표현이 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_CP_AC:{manner:`OOO님은 조직 안에서 흐름을 차분하게 정리하고 현실적으로 움직임을 관리하려는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 신인의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 신인 입장에서는
“상황 정리가 명확하다.”
“감정적으로 흔들리지 않는다.”
“현실적으로 방향을 잡아준다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 조직의 실행 움직임과 운영 흐름도 중요하게 생각합니다. 필요할 때는 분명하게 방향을 정리하고 움직임이 흐트러질 때는 다시 중심을 잡아주려는 힘도 있습니다. 그래서 신인 입장에서는
“조직 흐름을 놓치지 않는다.”
“결국 움직이게 만든다.”
“성과 방향이 분명하다.”
라는 느낌을 받게 됩니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 속도와 부담 정도를 세밀하게 살피는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 설명하고 방향도 잘 잡아주고 있다고 느끼지만 신인 입장에서는
“결론이 조금 빨리 나온다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
“압박처럼 느껴질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 실행력과 생산성을 안정적으로 끌고 가는 힘은 매우 좋지만 신인의 현재 감정 상태와 부담 정도를 세밀하게 확인하는 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 결과와 방향만 이야기하는 것이 아니라 상대의 현재 흐름과 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“이 부분은 이렇게 정리하겠습니다.”
라고 바로 결론부터 이야기하기보다
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근에 가장 지쳤던 순간은 언제였나요?”
“지금 어떤 부분이 가장 부담되시는 건가요?”
같은 질문을 먼저 넣어주는 것이 중요합니다.

또한 A(이성,판단)와 CP(기준,결단)가 함께 높은 코치는 문제를 빨리 해결하려는 힘이 강하기 때문에 신인이 충분히 이야기하기 전에 결론부터 정리하는 경우도 생길 수 있습니다. 거기에 AC(협조,조율)까지 낮아지면 상대 입장에서는 “내 상황은 충분히 이해받지 못했다”라고 느끼면서 움직임이 위축될 가능성도 있습니다. 그래서 충분히 듣고 난 뒤 행동 방향을 정리해주는 순서가 매우 중요합니다.

그리고 OOO님의 성향은 실행 움직임을 끌어가는 힘이 좋기 때문에 공감 이후에는 반드시 실제 행동으로 연결해주는 흐름이 필요합니다. 예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 현실적인 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 흐름과 생산성을 안정적으로 유지하는 힘이 매우 뛰어난 성향입니다. 여기에 상대의 부담과 감정 상태를 한 번 더 확인해주는 부드러운 접근이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_NP_CP:{manner:`OOO님은 조직 안에서 상황을 차분하게 정리하고 신인을 안정적으로 챙기려는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 신인의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 신인 입장에서는
“상황 정리가 명확하다.”
“감정적으로 흔들리지 않는다.”
“현실적으로 방향을 잡아준다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 결과만 보는 코치가 아니라 신인의 감정 상태와 어려움도 함께 보려고 합니다. 신인이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습도 나타납니다. 그래서 신인 입장에서는
“내 이야기를 들어주려고 한다.”
“사람을 함부로 대하지 않는다.”
“결과만 보는 사람이 아니다.”
라는 안정감을 느끼게 됩니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 코치 본인은 충분히 설명하고 공감하고 있다고 느끼지만 신인 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“좋은 방향 설명은 있는데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 유지력을 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 상황 설명과 공감만으로 끝나는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“지금 상황은 이해했습니다.”
라고 정리만 하기보다
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 중요합니다.

또한 A(이성,판단)와 NP(배려,공감)가 함께 높은 코치는 신인의 감정과 현실 상황을 모두 이해하려는 힘이 좋기 때문에 오히려 결론을 늦게 내리는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 움직임이 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 공감해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

그리고 OOO님의 성향은 조직을 안정적으로 유지하는 힘이 매우 좋은 성향이기 때문에 여기에 실행 움직임을 조금 더 끌어주는 힘이 더해지면 신인의 활동량과 생산성 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_NP_FC:{manner:`OOO님은 조직 안에서 상황을 차분하게 정리하고 신인을 안정적으로 챙기려는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 신인의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 신인 입장에서는
“상황 정리가 명확하다.”
“감정적으로 흔들리지 않는다.”
“현실적으로 방향을 잡아준다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 결과만 보는 코치가 아니라 신인의 감정 상태와 어려움도 함께 보려고 합니다. 신인이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습도 나타납니다. 그래서 신인 입장에서는
“내 이야기를 들어주려고 한다.”
“사람을 함부로 대하지 않는다.”
“결과만 보는 사람이 아니다.”
라는 안정감을 느끼게 됩니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 조직 안에서 분위기를 부드럽게 풀어주거나 감정을 편안하게 표현하는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 설명하고 공감하고 있다고 느끼지만 신인 입장에서는
“조금 어렵게 느껴질 때가 있다.”
“칭찬과 반응 표현이 부족하다.”
“긴장감이 오래 유지된다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 유지력을 만드는 힘은 매우 좋지만 신인이 심리적으로 편하게 움직일 수 있는 분위기를 만드는 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 상황 설명과 공감만 하는 것이 아니라 신인이 편하게 움직일 수 있는 반응과 표현을 의식적으로 자주 사용하는 습관이 중요합니다.

특히 OOO님은
“이 부분은 이렇게 정리하겠습니다.”
처럼 결론 중심으로만 이야기하기보다
“고생 많으셨습니다.”
“지금 계속 움직이고 계신 부분이 정말 좋습니다.”
“오늘 분위기 좋게 잘 버텨주셨습니다.”
같은 짧은 인정 표현을 자주 넣어주는 것이 중요합니다.

또한 A(이성,판단)와 NP(배려,공감)가 함께 높은 코치는 문제를 빨리 정리하면서도 신인을 챙기려는 마음이 함께 있기 때문에 속으로는 배려하고 있어도 표정과 반응은 차분하게 유지되는 경우가 많습니다. 거기에 FC(친화,표현)까지 낮아지면 신인 입장에서는 “혼나고 있는 건가?”라고 오해할 수도 있습니다. 그래서 의식적으로 미소를 띄고 고개를 끄덕이며 들어주는 반응을 추가하는 것만으로도 조직 분위기가 훨씬 편안해질 수 있습니다.

그리고 OOO님의 성향은 실행 움직임을 끌어가는 힘도 좋은 편이기 때문에 분위기를 안정적으로 만든 뒤에는 반드시 실제 행동으로 연결해주는 흐름이 필요합니다. 예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 현실적인 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 흐름과 안정감을 함께 유지하는 힘이 매우 뛰어난 성향입니다. 여기에 조금 더 부드러운 반응과 밝은 표현이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_NP_AC:{manner:`OOO님은 조직 안에서 상황을 차분하게 정리하고 신인을 안정적으로 챙기려는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 신인의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 신인 입장에서는
“상황 정리가 명확하다.”
“감정적으로 흔들리지 않는다.”
“현실적으로 방향을 잡아준다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 결과만 보는 코치가 아니라 신인의 감정 상태와 어려움도 함께 보려고 합니다. 신인이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습도 나타납니다. 그래서 신인 입장에서는
“내 이야기를 들어주려고 한다.”
“사람을 함부로 대하지 않는다.”
“결과만 보는 사람이 아니다.”
라는 안정감을 느끼게 됩니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 속도와 부담 정도를 세밀하게 살피는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 설명하고 공감하고 있다고 느끼지만 신인 입장에서는
“결론이 조금 빨리 나온다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
“압박처럼 느껴질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 실행력과 안정감을 함께 끌고 가는 힘은 매우 좋지만 신인의 현재 감정 상태와 부담 정도를 세밀하게 확인하는 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 결과와 방향만 이야기하는 것이 아니라 상대의 현재 흐름과 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“이 부분은 이렇게 정리하겠습니다.”
라고 바로 결론부터 이야기하기보다
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근에 가장 지쳤던 순간은 언제였나요?”
“지금 어떤 부분이 가장 부담되시는 건가요?”
같은 질문을 먼저 넣어주는 것이 중요합니다.

또한 A(이성,판단)와 NP(배려,공감)가 함께 높은 코치는 문제를 빨리 정리하면서도 신인을 챙기려는 마음이 함께 있기 때문에 속으로는 배려하고 있어도 행동 속도가 빨라지는 경우가 많습니다. 거기에 AC(협조,조율)까지 낮아지면 신인 입장에서는 “내 상황을 충분히 설명하기 전에 결론이 나온다”라고 느끼면서 심리적으로 위축될 가능성도 있습니다. 그래서 충분히 듣고 난 뒤 행동 방향을 정리해주는 순서가 매우 중요합니다.

그리고 OOO님의 성향은 실행 움직임을 끌어가는 힘이 좋기 때문에 공감 이후에는 반드시 실제 행동으로 연결해주는 흐름이 필요합니다. 예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 현실적인 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직의 흐름과 안정감을 함께 유지하는 힘이 매우 뛰어난 성향입니다. 여기에 상대의 감정 속도와 부담을 한 번 더 확인해주는 부드러운 접근이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_FC_CP:{manner:`OOO님은 조직 안에서 상황을 빠르게 정리하고 활동 분위기를 살리는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 신인의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 신인 입장에서는
“상황 정리가 명확하다.”
“현실적으로 방향을 잡아준다.”
“무엇을 해야 하는지 분명하다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로  FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“조직 분위기가 답답하지 않다.”
“같이 움직이면 힘이 난다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 코치 본인은 충분히 설명하고 분위기도 좋게 만들고 있다고 느끼지만 신인 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“좋은 분위기인데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 활동성을 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 분위기와 공감만 만드는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 중요합니다.

또한 A(이성,판단)와 FC(친화,표현)가 함께 높은 코치는 상황 판단과 분위기 조성은 좋은 편이지만 조직 분위기가 너무 편안해지면 실행 긴장감이 약해질 가능성도 있습니다. 그러다 보면 활동량은 바쁜데 실제 계약 흐름은 약해지는 상황도 생길 수 있습니다. 그래서 충분히 분위기를 살려준 뒤에는 반드시 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

그리고 OOO님의 성향은 조직 분위기를 살리면서도 흐름을 현실적으로 정리하는 힘이 좋은 성향이기 때문에 여기에 실행 움직임을 조금 더 끌어주는 힘이 더해지면 신인의 활동량과 생산성 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_FC_NP:{manner:`OOO님은 조직 안에서 상황을 빠르게 정리하고 활동 분위기를 살리는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 신인의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 신인 입장에서는
“상황 정리가 명확하다.”
“현실적으로 방향을 잡아준다.”
“무엇을 해야 하는지 분명하다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로  FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“조직 분위기가 답답하지 않다.”
“같이 움직이면 힘이 난다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 신인의 감정 상태를 따뜻하게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 설명하고 분위기도 좋게 만들고 있다고 느끼지만 신인 입장에서는
“조금 차갑게 느껴질 때가 있다.”
“내 마음까지 충분히 이해받는 느낌은 아니다.”
“결론이 빨리 나온다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 활동성을 만드는 힘은 매우 좋지만 신인의 감정과 심리 상태를 충분히 공감해주는 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 분위기와 결과만 이야기하는 것이 아니라 현재 신인의 감정 상태와 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근에 가장 지쳤던 순간은 언제였나요?”
같은 질문을 먼저 넣어주는 것이 중요합니다.

또한 A(이성,판단)와 FC(친화,표현)가 함께 높은 코치는 상황 판단과 분위기 조성은 좋은 편이지만 문제를 빨리 정리하려는 힘도 강하기 때문에 신인이 충분히 이야기하기 전에 결론부터 정리하는 경우도 생길 수 있습니다. 그러다 보면 신인은 “내 마음은 충분히 이해받지 못했다”라고 느끼면서 움직임까지 줄어들 가능성이 있습니다. 그래서 충분히 듣고 난 뒤 행동 방향을 정리해주는 순서가 매우 중요합니다.

그리고 OOO님의 성향은 실행 움직임을 끌어가는 힘도 좋은 편이기 때문에 공감 이후에는 반드시 실제 행동으로 연결해주는 흐름이 필요합니다. 예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 현실적인 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직 분위기를 살리면서도 흐름을 현실적으로 정리하는 힘이 매우 뛰어난 성향입니다. 여기에 따뜻한 공감과 감정 확인이 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_FC_AC:{manner:`OOO님은 조직 안에서 상황을 빠르게 정리하고 활동 분위기를 살리는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 신인의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 신인 입장에서는
“상황 정리가 명확하다.”
“현실적으로 방향을 잡아준다.”
“무엇을 해야 하는지 분명하다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로  FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“조직 분위기가 답답하지 않다.”
“같이 움직이면 힘이 난다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 속도와 부담 정도를 세밀하게 살피는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 설명하고 분위기도 좋게 만들고 있다고 느끼지만 신인 입장에서는
“결론이 조금 빨리 나온다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
“압박처럼 느껴질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 분위기와 활동성을 만드는 힘은 매우 좋지만 신인의 현재 감정 상태와 부담 정도를 세밀하게 확인하는 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 분위기와 결과만 이야기하는 것이 아니라 상대의 현재 흐름과 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“지금 어떤 부분이 가장 부담되시는 건가요?”
같은 질문을 먼저 넣어주는 것이 중요합니다.

또한 A(이성,판단)와 FC(친화,표현)가 함께 높은 코치는 상황 판단과 분위기 조성은 좋은 편이지만 움직임 속도가 빨라지는 경우도 많습니다. 거기에 AC(협조,조율)까지 낮아지면 신인 입장에서는 “내 상황을 충분히 설명하기 전에 결론이 나온다”라고 느끼면서 심리적으로 위축될 가능성도 있습니다. 그래서 충분히 듣고 난 뒤 행동 방향을 정리해주는 순서가 매우 중요합니다.

그리고 OOO님의 성향은 실행 움직임을 끌어가는 힘도 좋은 편이기 때문에 공감 이후에는 반드시 실제 행동으로 연결해주는 흐름이 필요합니다. 예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 현실적인 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직 분위기를 살리면서도 흐름을 현실적으로 정리하는 힘이 매우 뛰어난 성향입니다. 여기에 상대의 감정 속도와 부담을 한 번 더 확인해주는 부드러운 접근이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다`,improvement:``},A_AC_CP:{manner:`OOO님은 조직 안에서 흐름을 현실적으로 정리하고 조직 전체 움직임을 안정적으로 유지하려는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 신인의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 신인 입장에서는
“상황 정리가 명확하다.”
“현실적으로 방향을 잡아준다.”
“무엇을 해야 하는지 분명하다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로  AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름도 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 코치 본인은 충분히 설명하고 조율하고 있다고 느끼지만 신인 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“움직임을 강하게 끌어주는 느낌은 부족하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 유지력을 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 상황 설명과 조율만으로 끝나는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 신인이 힘들어할 때 너무 오래 설명과 조율만 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 A(이성,판단)와 AC(협조,조율)가 함께 높은 코치는 조직 흐름을 안정적으로 유지하려는 힘이 좋은 대신 신인의 부담을 너무 고려하다가 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

그리고 OOO님의 성향은 원래 조직을 안정적으로 유지하고 문제를 현실적으로 정리하는 힘이 매우 뛰어난 성향입니다. 여기에 실행 움직임을 조금 더 끌어주는 힘이 더해지면 신인의 활동량과 생산성 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_AC_NP:{manner:`OOO님은 조직 안에서 흐름을 현실적으로 정리하고 조직 전체 움직임을 안정적으로 유지하려는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 신인의 활동량, 고객 흐름, 상담 진행 상황, 계약 움직임 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 신인 입장에서는
“상황 정리가 명확하다.”
“현실적으로 방향을 잡아준다.”
“무엇을 해야 하는지 분명하다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로  AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름도 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 신인의 감정 상태를 따뜻하게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 설명하고 조율하고 있다고 느끼지만 신인 입장에서는
“조금 차갑게 느껴질 때가 있다.”
“내 마음까지 충분히 이해받는 느낌은 아니다.”
“결론이 빨리 나온다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 운영 흐름을 만드는 힘은 매우 좋지만 신인의 감정과 심리 상태를 충분히 공감해주는 부분은 부족해질 수 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 상황 설명과 조율만 하는 것이 아니라 현재 신인의 감정 상태와 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“이 부분은 이렇게 정리하겠습니다.”
라고 바로 결론부터 이야기하기보다
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근에 가장 지쳤던 순간은 언제였나요?”
“지금 어떤 부분이 가장 부담되시는 건가요?”
같은 질문을 먼저 넣어주는 것이 중요합니다.

또한 A(이성,판단)와 AC(협조,조율)가 함께 높은 코치는 조직 흐름을 안정적으로 유지하려는 힘이 좋은 대신 신인의 부담을 너무 고려하다가 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

그리고 OOO님의 성향은 원래 조직을 안정적으로 유지하고 문제를 현실적으로 정리하는 힘이 매우 뛰어난 성향입니다. 여기에 따뜻한 공감과 감정 확인이 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},A_AC_FC:{manner:`OOO님은 조직 안에서 흐름을 현실적으로 정리하고 조직 전체 움직임을 안정적으로 유지하려는 힘이 강한 성향입니다.

A(이성,판단)의 점수가 높기 때문에 감정적으로 흔들리기보다 현재 상황을 객관적으로 보려고 합니다. 신인의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 냉정하게 확인하며 문제 원인을 빠르게 정리하려는 모습이 강하게 나타납니다. 그래서 신인 입장에서는
“상황 정리가 명확하다.”
“현실적으로 방향을 잡아준다.”
“무엇을 해야 하는지 분명하다.”
라는 신뢰감을 느끼는 경우가 많습니다.

그리고 두 번째로  AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름도 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 흐름이 흔들리지 않도록 안정적으로 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“함께 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 감정 표현과 반응 표현은 비교적 절제되어 보일 수 있습니다. 실제로는 충분히 배려하고 조심하고 있지만 표정 변화나 표현이 크지 않다 보니 신인 입장에서는
“조금 어렵게 느껴진다.”
“칭찬 표현이 적게 느껴진다.”
“조심스럽게 느껴질 때가 있다.”
라고 받아들이는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 운영 흐름을 만드는 힘은 매우 좋지만 신인이 심리적으로 편하게 움직일 수 있는 분위기를 만드는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 상황 설명과 조율만 하는 것이 아니라 짧더라도 반응과 인정 표현을 자주 전달해주는 습관이 중요합니다.

특히 OOO님은
“고생 많으셨습니다.”
“지금 계속 움직이고 계신 부분이 좋습니다.”
“오늘 고객 연락 흐름 잘 유지하고 계십니다.”
같은 짧은 인정 표현을 의식적으로 자주 사용하는 것이 좋습니다.

또한 A(이성,판단)와 AC(협조,조율)가 함께 높은 코치는 조직 흐름을 안정적으로 유지하려는 힘이 좋은 대신 분위기를 너무 조용하게 끌고 갈 수도 있습니다. 그러다 보면 조직 전체 에너지가 차분해지면서 활동량까지 함께 내려갈 가능성도 있습니다. 그래서 현실적인 방향 정리 이후에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하고 문제를 현실적으로 정리하는 힘이 매우 뛰어난 성향입니다. 여기에 조금 더 부드러운 반응과 표현이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_CP_NP:{manner:`OOO님은 조직 안에서 분위기를 밝게 만들고 움직임 에너지를 끌어올리는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 단순히 분위기만 좋은 것이 아니라 실제 움직임과 실행 흐름도 중요하게 생각합니다. 필요할 때는 분명하게 방향을 정리하고 활동량이 떨어질 때는 다시 흐름을 끌어올리려는 힘도 있습니다. 그래서 신인 입장에서는
“결국 움직이게 만든다.”
“실행 방향이 분명하다.”
“성과 흐름을 놓치지 않는다.”
라는 느낌을 받게 됩니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 신인의 감정 상태를 깊게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 코치 본인은 분위기도 좋게 만들고 실행 방향도 잘 잡아주고 있다고 느끼지만 신인 입장에서는
“속마음까지 충분히 이해받는 느낌은 아니다.”
“힘든 이야기를 오래 하기는 어렵다.”
“결론이 비교적 빨리 나온다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 실행 에너지를 끌어올리는 힘은 매우 좋지만 신인의 감정과 심리 상태를 충분히 공감해주는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 분위기와 실행만 강조하는 것이 아니라 현재 신인의 감정 상태와 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“이번 주는 조금 더 움직여보시지요.”
라고 바로 방향만 이야기하기보다
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근에 가장 지치는 순간은 언제였나요?”
같은 질문을 먼저 넣어주는 것이 좋습니다.

또한 FC(친화,표현)와 CP(기준,결단)가 함께 높은 코치는 분위기를 살리면서도 실행 움직임을 강하게 끌어가는 힘이 좋기 때문에 조직 에너지를 빠르게 끌어올리는 장점이 있습니다. 다만 활동 흐름에 집중하다 보면 신인이 지치고 있는 신호를 놓칠 가능성도 있습니다. 그래서 충분히 듣고 공감해준 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 흐름이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직 분위기와 실행 에너지를 끌어올리는 힘이 매우 뛰어난 성향입니다. 여기에 조금 더 따뜻한 공감과 감정 확인이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_CP_A:{manner:`OOO님은 조직 안에서 분위기를 밝게 만들고 실행 에너지를 끌어올리는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 단순히 분위기만 좋은 것이 아니라 실제 움직임과 실행 흐름도 중요하게 생각합니다. 필요할 때는 분명하게 방향을 정리하고 활동량이 떨어질 때는 다시 흐름을 끌어올리려는 힘도 있습니다. 그래서 신인 입장에서는
“결국 움직이게 만든다.”
“실행 방향이 분명하다.”
“성과 흐름을 놓치지 않는다.”
라는 느낌을 받게 됩니다.

다만 A(이성,판단)의 점수가 가장 낮으면 분위기와 실행 중심으로 조직을 운영하다가 실제 문제 원인과 우선순위를 차분하게 정리하는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 분위기도 만들고 움직임도 끌어가고 있다고 느끼지만 신인 입장에서는
“무엇부터 해야 하는지 헷갈릴 때가 있다.”
“열심히는 하는데 방향 정리가 부족하다.”
“분위기에 따라 움직임이 달라질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 실행 에너지를 끌어올리는 힘은 매우 좋지만 현실적인 우선순위와 흐름 정리는 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 분위기와 실행만 강조하는 것이 아니라 “지금 가장 먼저 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“일단 많이 움직여보시지요.”
라고 넓게 이야기하기보다
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 우선순위를 짧고 명확하게 정리해주는 것이 좋습니다.

또한 FC(친화,표현)와 CP(기준,결단)가 함께 높은 코치는 조직 에너지를 빠르게 끌어올리는 장점이 매우 강합니다. 다만 분위기와 추진력이 강해질수록 신인이 여러 가지를 동시에 하려다 흐름이 분산될 가능성도 있습니다. 그래서 활동량을 늘리는 것과 동시에 “지금 가장 중요한 한 가지”를 반복해서 정리해주는 과정이 함께 들어가야 신인의 활동량과 생산성 흐름이 더 안정적으로 올라가게 됩니다.

그리고 OOO님의 성향은 원래 조직 분위기와 실행 움직임을 강하게 끌어올리는 힘이 매우 뛰어난 성향입니다. 여기에 현실적인 우선순위 정리와 흐름 관리가 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_CP_AC:{manner:`OOO님은 조직 안에서 분위기를 밝게 만들고 실행 에너지를 끌어올리는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 단순히 분위기만 좋은 것이 아니라 실제 움직임과 실행 흐름도 중요하게 생각합니다. 필요할 때는 분명하게 방향을 정리하고 활동량이 떨어질 때는 다시 흐름을 끌어올리려는 힘도 있습니다. 그래서 신인 입장에서는
“결국 움직이게 만든다.”
“실행 방향이 분명하다.”
“성과 흐름을 놓치지 않는다.”
라는 느낌을 받게 됩니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 속도와 부담 정도를 세밀하게 살피는 부분은 부족해질 수 있습니다. 코치 본인은 분위기도 좋게 만들고 실행 방향도 잘 잡아주고 있다고 느끼지만 신인 입장에서는
“결론이 조금 빠르게 느껴질 때가 있다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
“압박처럼 느껴질 때가 있다.”
라고 받아들이는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 실행 에너지를 끌어올리는 힘은 매우 좋지만 신인의 현재 감정 상태와 부담 정도를 세밀하게 확인하는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 분위기와 실행만 강조하는 것이 아니라 상대의 현재 흐름과 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
라고 방향을 이야기하기 전에
“지금 가장 부담되는 부분은 어떤 건가요?”
“최근 활동하면서 가장 막히는 부분은 어떤 건가요?”
같은 질문을 먼저 넣어주는 것이 좋습니다.

또한 FC(친화,표현)와 CP(기준,결단)가 함께 높은 코치는 조직 에너지를 빠르게 끌어올리는 장점이 매우 강합니다. 다만 분위기와 추진력이 강해질수록 신인이 따라오는 속도까지 세밀하게 살피지 못할 가능성도 있습니다. 그러다 보면 조직 안에서 활동량은 늘어나지만 심리적으로 지치는 신인이 생길 수도 있습니다. 그래서 충분히 듣고 난 뒤
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 흐름이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직 분위기와 실행 움직임을 강하게 끌어올리는 힘이 매우 뛰어난 성향입니다. 여기에 상대의 속도와 부담을 한 번 더 확인해주는 조율이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_NP_CP:{manner:`OOO님은 조직 안에서 분위기를 밝게 만들고 사람의 마음을 편안하게 움직이게 하는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 분위기만 좋은 것이 아니라 신인의 감정 상태와 어려움도 함께 보려고 합니다. 신인이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습도 나타납니다. 그래서 신인 입장에서는
“내 이야기를 잘 들어준다.”
“사람을 함부로 대하지 않는다.”
“정서적으로 안정감을 준다.”
라는 느낌을 받게 됩니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 코치 본인은 충분히 분위기도 좋게 만들고 신인도 잘 챙기고 있다고 느끼지만 신인 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“좋은 분위기인데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 유지력을 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 신인이 힘들어할 때 공감만 오래 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 FC(친화,표현)와 NP(배려,공감)가 함께 높은 코치는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 신인이 힘들어할 때 너무 이해하고 배려만 하다 보면 활동량 관리가 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 공감해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직 분위기와 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 실행 움직임을 조금 더 끌어주는 힘이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_NP_A:{manner:`OOO님은 조직 안에서 분위기를 밝게 만들고 사람의 마음을 편안하게 움직이게 하는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 분위기만 좋은 것이 아니라 신인의 감정 상태와 어려움도 함께 보려고 합니다. 신인이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습도 나타납니다. 그래서 신인 입장에서는
“내 이야기를 잘 들어준다.”
“사람을 함부로 대하지 않는다.”
“정서적으로 안정감을 준다.”
라는 느낌을 받게 됩니다.

다만 A(이성,판단)의 점수가 가장 낮으면 분위기와 공감 중심으로 조직을 운영하다가 실제 문제 원인과 우선순위를 차분하게 정리하는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 분위기도 좋게 만들고 신인도 잘 챙기고 있다고 느끼지만 신인 입장에서는
“무엇부터 해야 하는지 헷갈릴 때가 있다.”
“열심히는 하는데 방향 정리가 부족하다.”
“분위기에 따라 움직임이 달라질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 유지력을 만드는 힘은 매우 좋지만 현실적인 우선순위와 흐름 정리는 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 “지금 가장 먼저 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 신인이 힘들어할 때 공감만 오래 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 FC(친화,표현)와 NP(배려,공감)가 함께 높은 코치는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 분위기와 공감에 집중하다 보면 활동 방향이 흐려질 가능성도 있습니다. 그래서 충분히 듣고 공감해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직 분위기와 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 현실적인 흐름 정리와 우선순위 관리가 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_NP_AC:{manner:`OOO님은 조직 안에서 분위기를 밝게 만들고 사람의 마음을 편안하게 움직이게 하는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 분위기만 좋은 것이 아니라 신인의 감정 상태와 어려움도 함께 보려고 합니다. 신인이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습도 나타납니다. 그래서 신인 입장에서는
“내 이야기를 잘 들어준다.”
“사람을 함부로 대하지 않는다.”
“정서적으로 안정감을 준다.”
라는 느낌을 받게 됩니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 속도와 부담 정도를 세밀하게 살피는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 분위기도 좋게 만들고 신인도 잘 챙기고 있다고 느끼지만 신인 입장에서는
“결론이 조금 빠르게 느껴질 때가 있다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
“압박처럼 느껴질 때가 있다.”
라고 받아들이는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 유지력을 만드는 힘은 매우 좋지만 신인의 현재 감정 상태와 부담 정도를 세밀하게 확인하는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 상대의 현재 흐름과 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은 신인이 힘들어할 때 공감만 오래 이어가기보다 현재 부담되는 부분을 먼저 확인한 뒤 행동 방향을 함께 정리해주는 흐름이 중요합니다.

예를 들어
“지금 가장 부담되는 부분은 어떤 건가요?”
“최근 활동하면서 가장 막히는 부분은 어떤 건가요?”
처럼 먼저 듣고 난 뒤
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
처럼 실제 움직임으로 연결해주는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 FC(친화,표현)와 NP(배려,공감)가 함께 높은 코치는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 분위기와 공감에 집중하다 보면 조직 전체 움직임이 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 공감해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직 분위기와 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 상대의 속도와 부담을 한 번 더 확인해주는 조율이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다。`,improvement:``},FC_A_CP:{manner:`OOO님은 조직 안에서 분위기를 밝게 만들면서도 현실적인 흐름을 빠르게 정리하는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 단순히 분위기만 좋은 것이 아니라 현재 상황을 현실적으로 정리하려는 힘도 함께 나타납니다. 신인의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 객관적으로 보며 문제 원인을 빠르게 정리하려는 모습도 있습니다. 그래서 신인 입장에서는
“현실적으로 방향을 잡아준다.”
“상황 정리가 빠르다.”
“무엇을 해야 하는지 이해가 된다.”
라는 신뢰감을 느끼는 경우가 많습니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 코치 본인은 충분히 분위기도 좋게 만들고 현실적인 정리도 잘하고 있다고 느끼지만 신인 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“좋은 분위기인데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 활동 에너지를 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 분위기와 설명만 만드는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은
“잘하고 계십니다.”
라고 격려만 이어가기보다
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 FC(친화,표현)와 A(이성,판단)가 함께 높은 코치는 조직 분위기를 밝게 유지하면서도 흐름 정리를 잘하는 장점이 있습니다. 다만 분위기가 좋아질수록 실행 긴장감까지 함께 약해질 가능성도 있습니다. 그래서 활동 방향과 우선순위를 짧고 반복적으로 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 살아나게 됩니다.

OOO님의 성향은 원래 조직 분위기와 활동 에너지를 끌어올리는 힘이 매우 뛰어난 성향입니다. 여기에 실행 움직임을 조금 더 끌어주는 힘이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_A_NP:{manner:`OOO님은 조직 안에서 분위기를 밝게 만들면서도 현실적인 흐름을 빠르게 정리하는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 단순히 분위기만 좋은 것이 아니라 현재 상황을 현실적으로 정리하려는 힘도 함께 나타납니다. 신인의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 객관적으로 보며 문제 원인을 빠르게 정리하려는 모습도 있습니다. 그래서 신인 입장에서는
“현실적으로 방향을 잡아준다.”
“상황 정리가 빠르다.”
“무엇을 해야 하는지 이해가 된다.”
라는 신뢰감을 느끼는 경우가 많습니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 신인의 감정 상태를 깊게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 분위기도 좋게 만들고 현실적인 정리도 잘하고 있다고 느끼지만 신인 입장에서는
“속마음까지 충분히 이해받는 느낌은 아니다.”
“힘든 이야기를 오래 하기는 어렵다.”
“결론이 비교적 빨리 나온다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 활동 에너지를 만드는 힘은 매우 좋지만 신인의 감정과 심리 상태를 충분히 공감해주는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 분위기와 설명만 만드는 것이 아니라 현재 신인의 감정 상태와 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
라고 방향만 이야기하기보다
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근 활동하면서 가장 지치는 순간은 언제였나요?”
같은 질문을 먼저 넣어주는 것이 좋습니다.

또한 FC(친화,표현)와 A(이성,판단)가 함께 높은 코치는 조직 분위기를 밝게 유지하면서도 흐름 정리를 잘하는 장점이 있습니다. 다만 분위기와 활동 흐름에 집중하다 보면 신인이 지치고 있는 신호를 놓칠 가능성도 있습니다. 그래서 충분히 듣고 공감해준 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 흐름이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직 분위기와 활동 에너지를 끌어올리는 힘이 매우 뛰어난 성향입니다. 여기에 따뜻한 공감과 감정 확인이 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_A_AC:{manner:`OOO님은 조직 안에서 분위기를 밝게 만들면서도 현실적인 흐름을 빠르게 정리하는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 단순히 분위기만 좋은 것이 아니라 현재 상황을 현실적으로 정리하려는 힘도 함께 나타납니다. 신인의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 객관적으로 보며 문제 원인을 빠르게 정리하려는 모습도 있습니다. 그래서 신인 입장에서는
“현실적으로 방향을 잡아준다.”
“상황 정리가 빠르다.”
“무엇을 해야 하는지 이해가 된다.”
라는 신뢰감을 느끼는 경우가 많습니다.

다만 AC(협조,조율)의 점수가 가장 낮으면 상대의 감정 속도와 부담 정도를 세밀하게 살피는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 분위기도 좋게 만들고 현실적인 정리도 잘하고 있다고 느끼지만 신인 입장에서는
“결론이 조금 빠르게 느껴질 때가 있다.”
“내 속도까지 충분히 이해받는 느낌은 아니다.”
“압박처럼 느껴질 때가 있다.”
라고 받아들이는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 활동 에너지를 만드는 힘은 매우 좋지만 신인의 현재 감정 상태와 부담 정도를 세밀하게 확인하는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 분위기와 설명만 만드는 것이 아니라 상대의 현재 흐름과 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
라고 방향만 이야기하기보다
“지금 가장 부담되는 부분은 어떤 건가요?”
“최근 활동하면서 가장 막히는 부분은 어떤 건가요?”
같은 질문을 먼저 넣어주는 것이 좋습니다.

또한 FC(친화,표현)와 A(이성,판단)가 함께 높은 코치는 조직 분위기를 밝게 유지하면서도 흐름 정리를 잘하는 장점이 있습니다. 다만 분위기와 활동 흐름에 집중하다 보면 신인이 따라오는 속도까지 세밀하게 살피지 못할 가능성도 있습니다. 그래서 충분히 듣고 난 뒤
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 흐름이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직 분위기와 활동 에너지를 끌어올리는 힘이 매우 뛰어난 성향입니다. 여기에 상대의 속도와 부담을 한 번 더 확인해주는 조율이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_AC_CP:{manner:`OOO님은 조직 안에서 분위기를 밝고 편안하게 만들면서 사람 간의 관계 흐름을 안정적으로 유지하려는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로  AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름도 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 편안하게 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 안정감을 느끼는 경우가 많습니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 코치 본인은 충분히 분위기도 좋게 만들고 조직도 잘 챙기고 있다고 느끼지만 신인 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“좋은 분위기인데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 유지력을 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 신인이 힘들어할 때 공감과 배려만 오래 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 FC(친화,표현)와 AC(협조,조율)가 함께 높은 코치는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 신인의 부담을 너무 고려하다 보면 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

OOO님의 성향은 원래 조직 분위기와 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 실행 움직임을 조금 더 끌어주는 힘이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_AC_NP:{manner:`OOO님은 조직 안에서 분위기를 밝고 편안하게 만들면서 사람 간의 관계 흐름을 안정적으로 유지하려는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로  AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름도 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 편안하게 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 안정감을 느끼는 경우가 많습니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 신인의 감정 상태를 깊게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 분위기도 좋게 만들고 조직도 잘 챙기고 있다고 느끼지만 신인 입장에서는
“속마음까지 충분히 이해받는 느낌은 아니다.”
“힘든 이야기를 오래 하기는 어렵다.”
“결론이 비교적 빨리 나온다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 유지력을 만드는 힘은 매우 좋지만 신인의 감정과 심리 상태를 충분히 공감해주는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 현재 신인의 감정 상태와 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은 신인이 힘들어할 때
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근 활동하면서 가장 지치는 순간은 언제였나요?”
같은 질문을 먼저 넣어주는 것이 좋습니다. 그리고 충분히 들은 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
처럼 실제 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

또한 FC(친화,표현)와 AC(협조,조율)가 함께 높은 코치는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 신인의 부담을 너무 고려하다 보면 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직 분위기와 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 따뜻한 공감과 현실적인 행동 정리가 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},FC_AC_A:{manner:`OOO님은 조직 안에서 분위기를 밝고 편안하게 만들면서 관계 흐름을 안정적으로 유지하려는 힘이 강한 성향입니다.

FC(친화,표현)의 점수가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로  AC(협조,조율)가 높기 때문에 조직 안의 분위기와 관계 흐름도 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 편안하게 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 안정감을 느끼는 경우가 많습니다.

다만 A(이성,판단)의 점수가 가장 낮으면 분위기와 관계 중심으로 조직을 운영하다가 실제 문제 원인과 우선순위를 차분하게 정리하는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 분위기도 좋게 만들고 조직도 잘 챙기고 있다고 느끼지만 신인 입장에서는
“무엇부터 해야 하는지 헷갈릴 때가 있다.”
“열심히는 하는데 방향 정리가 부족하다.”
“분위기에 따라 움직임이 달라질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직 분위기와 관계 유지력을 만드는 힘은 매우 좋지만 현실적인 우선순위와 흐름 정리는 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 “지금 가장 먼저 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 신인이 힘들어할 때 공감과 배려만 오래 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 FC(친화,표현)와 AC(협조,조율)가 함께 높은 코치는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 분위기와 공감에 집중하다 보면 조직 전체 움직임이 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직 분위기와 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 현실적인 흐름 정리와 우선순위 관리가 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_CP_NP:{manner:`OOO님은 조직 안에서 흐름을 안정적으로 유지하면서도 실행 움직임을 놓치지 않으려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 단순히 분위기만 챙기는 것이 아니라 실제 움직임과 실행 흐름도 중요하게 생각합니다. 활동량이 떨어질 때는 다시 흐름을 끌어올리려 하고 해야 할 부분은 비교적 분명하게 정리하려는 힘도 있습니다. 그래서 신인 입장에서는
“결국 움직이게 만든다.”
“실행 방향이 분명하다.”
“성과 흐름을 놓치지 않는다.”
라는 느낌을 받게 됩니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 신인의 감정 상태를 깊게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 조율하고 방향도 잘 잡아주고 있다고 느끼지만 신인 입장에서는
“속마음까지 충분히 이해받는 느낌은 아니다.”
“힘든 이야기를 오래 하기는 어렵다.”
“결론이 비교적 빨리 나온다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 실행 흐름을 만드는 힘은 매우 좋지만 신인의 감정과 심리 상태를 충분히 공감해주는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 조율과 방향 정리만 하는 것이 아니라 현재 신인의 감정 상태와 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
라고 방향만 이야기하기보다
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근 활동하면서 가장 지치는 순간은 언제였나요?”
같은 질문을 먼저 넣어주는 것이 좋습니다.

또한 AC(협조,조율)와 CP(기준,결단)가 함께 높은 코치는 조직 흐름을 안정적으로 유지하면서도 실행 움직임을 끌어가는 힘이 좋은 편입니다. 다만 신인의 부담을 너무 고려하다 보면 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 흐름이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하면서도 실행 흐름을 끌어가는 힘이 매우 뛰어난 성향입니다. 여기에 따뜻한 공감과 감정 확인이 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_CP_A:{manner:`OOO님은 조직 안에서 흐름을 안정적으로 유지하면서도 실행 움직임을 놓치지 않으려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 단순히 분위기만 챙기는 것이 아니라 실제 움직임과 실행 흐름도 중요하게 생각합니다. 활동량이 떨어질 때는 다시 흐름을 끌어올리려 하고 해야 할 부분은 비교적 분명하게 정리하려는 힘도 있습니다. 그래서 신인 입장에서는
“결국 움직이게 만든다.”
“실행 방향이 분명하다.”
“성과 흐름을 놓치지 않는다.”
라는 느낌을 받게 됩니다.

다만 A(이성,판단)의 점수가 가장 낮으면 분위기와 관계 흐름 중심으로 조직을 운영하다가 실제 문제 원인과 우선순위를 차분하게 정리하는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 조율하고 방향도 잘 잡아주고 있다고 느끼지만 신인 입장에서는
“무엇부터 해야 하는지 헷갈릴 때가 있다.”
“열심히는 하는데 방향 정리가 부족하다.”
“상황에 따라 움직임이 달라질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 실행 흐름을 만드는 힘은 매우 좋지만 현실적인 우선순위와 흐름 정리는 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 조율과 분위기만 유지하는 것이 아니라 “지금 가장 먼저 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 신인이 힘들어할 때 공감과 조율만 오래 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 AC(협조,조율)와 CP(기준,결단)가 함께 높은 코치는 조직 흐름을 안정적으로 유지하면서도 실행 움직임을 끌어가는 힘이 좋은 편입니다. 다만 신인의 부담을 너무 고려하다 보면 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하면서도 실행 흐름을 끌어가는 힘이 매우 뛰어난 성향입니다. 여기에 현실적인 흐름 정리와 우선순위 관리가 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_CP_FC:{manner:`OOO님은 조직 안에서 흐름을 안정적으로 유지하면서도 실행 움직임을 놓치지 않으려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 CP(기준,결단)가 높기 때문에 단순히 분위기만 챙기는 것이 아니라 실제 움직임과 실행 흐름도 중요하게 생각합니다. 활동량이 떨어질 때는 다시 흐름을 끌어올리려 하고 해야 할 부분은 비교적 분명하게 정리하려는 힘도 있습니다. 그래서 신인 입장에서는
“결국 움직이게 만든다.”
“실행 방향이 분명하다.”
“성과 흐름을 놓치지 않는다.”
라는 느낌을 받게 됩니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 감정 표현과 반응 표현은 비교적 절제되어 보일 수 있습니다. 실제로는 충분히 배려하고 조심하고 있지만 표정 변화나 표현이 크지 않다 보니 신인 입장에서는
“조금 어렵게 느껴진다.”
“칭찬 표현이 적게 느껴진다.”
“조심스럽게 느껴질 때가 있다.”
라고 받아들이는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 실행 흐름을 만드는 힘은 매우 좋지만 신인이 심리적으로 편하게 움직일 수 있는 분위기를 만드는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 조율과 방향 정리만 하는 것이 아니라 짧더라도 반응과 인정 표현을 자주 전달해주는 습관이 중요합니다.

특히 OOO님은
“고생 많으셨습니다.”
“지금 계속 움직이고 계신 부분이 좋습니다.”
“오늘 고객 연락 흐름 잘 유지하고 계십니다.”
같은 짧은 인정 표현을 의식적으로 자주 사용하는 것이 좋습니다.

또한 AC(협조,조율)와 CP(기준,결단)가 함께 높은 코치는 조직 흐름을 안정적으로 유지하면서도 실행 움직임을 끌어가는 힘이 좋은 편입니다. 다만 분위기를 너무 차분하게 유지하다 보면 조직 전체 에너지가 함께 내려갈 가능성도 있습니다. 그래서 의식적으로 미소를 띄고 고개를 끄덕이며 들어주는 반응을 추가하는 것만으로도 조직 분위기가 훨씬 편안해질 수 있습니다.

그리고 충분히 듣고 조율해준 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 흐름이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하면서도 실행 흐름을 끌어가는 힘이 매우 뛰어난 성향입니다. 여기에 조금 더 부드러운 반응과 밝은 표현이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_NP_CP:{manner:`OOO님은 조직 안에서 관계 흐름을 안정적으로 유지하면서 신인을 편안하게 이끌어가려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 분위기만 유지하는 것이 아니라 신인의 감정 상태와 어려움도 함께 보려고 합니다. 신인이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습도 나타납니다. 그래서 신인 입장에서는
“내 이야기를 잘 들어준다.”
“사람을 함부로 대하지 않는다.”
“정서적으로 안정감을 준다.”
라는 느낌을 받게 됩니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 코치 본인은 충분히 조율하고 신인도 잘 챙기고 있다고 느끼지만 신인 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“좋은 분위기인데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 관계 유지력을 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 조율만 만드는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 신인이 힘들어할 때 공감과 배려만 오래 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 AC(협조,조율)와 NP(배려,공감)가 함께 높은 코치는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 신인의 부담을 너무 고려하다 보면 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 공감해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하고 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 실행 움직임을 조금 더 끌어주는 힘이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_NP_A:{manner:`OOO님은 조직 안에서 관계 흐름을 안정적으로 유지하면서 신인을 편안하게 이끌어가려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 분위기만 유지하는 것이 아니라 신인의 감정 상태와 어려움도 함께 보려고 합니다. 신인이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습도 나타납니다. 그래서 신인 입장에서는
“내 이야기를 잘 들어준다.”
“사람을 함부로 대하지 않는다.”
“정서적으로 안정감을 준다.”
라는 느낌을 받게 됩니다.

다만 A(이성,판단)의 점수가 가장 낮으면 분위기와 공감 중심으로 조직을 운영하다가 실제 문제 원인과 우선순위를 차분하게 정리하는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 조율하고 신인도 잘 챙기고 있다고 느끼지만 신인 입장에서는
“무엇부터 해야 하는지 헷갈릴 때가 있다.”
“열심히는 하는데 방향 정리가 부족하다.”
“상황에 따라 움직임이 달라질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 관계 유지력을 만드는 힘은 매우 좋지만 현실적인 우선순위와 흐름 정리는 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 조율만 만드는 것이 아니라 “지금 가장 먼저 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 신인이 힘들어할 때 공감과 배려만 오래 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 AC(협조,조율)와 NP(배려,공감)가 함께 높은 코치는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 신인의 부담을 너무 고려하다 보면 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 공감해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하고 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 현실적인 흐름 정리와 우선순위 관리가 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_NP_FC:{manner:`OOO님은 조직 안에서 관계 흐름을 안정적으로 유지하면서 신인을 편안하게 이끌어가려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 NP(배려,공감)가 높기 때문에 단순히 분위기만 유지하는 것이 아니라 신인의 감정 상태와 어려움도 함께 보려고 합니다. 신인이 힘들어하면 먼저 이유를 들어주려 하고 쉽게 포기하지 않도록 옆에서 계속 챙겨주려는 모습도 나타납니다. 그래서 신인 입장에서는
“내 이야기를 잘 들어준다.”
“사람을 함부로 대하지 않는다.”
“정서적으로 안정감을 준다.”
라는 느낌을 받게 됩니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 감정 표현과 반응 표현은 비교적 절제되어 보일 수 있습니다. 실제로는 충분히 배려하고 조심하고 있지만 표정 변화나 표현이 크지 않다 보니 신인 입장에서는
“조금 어렵게 느껴진다.”
“칭찬 표현이 적게 느껴진다.”
“조심스럽게 느껴질 때가 있다.”
라고 받아들이는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 관계 유지력을 만드는 힘은 매우 좋지만 신인이 심리적으로 편하게 움직일 수 있는 분위기를 만드는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 조율만 하는 것이 아니라 짧더라도 반응과 인정 표현을 자주 전달해주는 습관이 중요합니다.

특히 OOO님은
“고생 많으셨습니다.”
“지금 계속 움직이고 계신 부분이 좋습니다.”
“오늘 고객 연락 흐름 잘 유지하고 계십니다.”
같은 짧은 인정 표현을 의식적으로 자주 사용하는 것이 좋습니다.

또한 AC(협조,조율)와 NP(배려,공감)가 함께 높은 코치는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 분위기를 너무 차분하게 유지하다 보면 조직 전체 에너지가 함께 내려갈 가능성도 있습니다. 그래서 의식적으로 미소를 띄고 고개를 끄덕이며 들어주는 반응을 추가하는 것만으로도 조직 분위기가 훨씬 편안해질 수 있습니다.

그리고 충분히 듣고 공감해준 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 흐름이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하고 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 조금 더 부드러운 반응과 밝은 표현이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_A_CP:{manner:`OOO님은 조직 안에서 흐름을 안정적으로 유지하면서도 전체 움직임을 차분하게 관리하려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 단순히 분위기만 챙기는 것이 아니라 현재 상황을 현실적으로 정리하려는 힘도 함께 나타납니다. 신인의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 객관적으로 보며 문제 원인을 빠르게 정리하려는 모습도 있습니다. 그래서 신인 입장에서는
“상황 정리가 명확하다.”
“현실적으로 방향을 잡아준다.”
“무엇을 해야 하는지 이해가 된다.”
라는 신뢰감을 느끼는 경우가 많습니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 코치 본인은 충분히 조율하고 흐름도 잘 관리하고 있다고 느끼지만 신인 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“좋은 분위기인데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 운영 흐름을 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 조율과 설명만 하는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 신인이 힘들어할 때 충분히 듣고 조율해준 뒤에는 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 AC(협조,조율)와 A(이성,판단)가 함께 높은 코치는 조직 흐름을 안정적으로 유지하고 문제를 차분하게 정리하는 힘이 매우 좋은 편입니다. 다만 신인의 부담을 너무 고려하다 보면 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하고 흐름을 현실적으로 관리하는 힘이 매우 뛰어난 성향입니다. 여기에 실행 움직임을 조금 더 끌어주는 힘이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_A_NP:{manner:`OOO님은 조직 안에서 흐름을 안정적으로 유지하면서도 전체 움직임을 차분하게 관리하려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 단순히 분위기만 챙기는 것이 아니라 현재 상황을 현실적으로 정리하려는 힘도 함께 나타납니다. 신인의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 객관적으로 보며 문제 원인을 빠르게 정리하려는 모습도 있습니다. 그래서 신인 입장에서는
“상황 정리가 명확하다.”
“현실적으로 방향을 잡아준다.”
“무엇을 해야 하는지 이해가 된다.”
라는 신뢰감을 느끼는 경우가 많습니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 신인의 감정 상태를 깊게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 조율하고 흐름도 잘 관리하고 있다고 느끼지만 신인 입장에서는
“속마음까지 충분히 이해받는 느낌은 아니다.”
“힘든 이야기를 오래 하기는 어렵다.”
“결론이 비교적 빨리 나온다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 운영 흐름을 만드는 힘은 매우 좋지만 신인의 감정과 심리 상태를 충분히 공감해주는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 조율과 설명만 하는 것이 아니라 현재 신인의 감정 상태와 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
라고 방향만 이야기하기보다
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근 활동하면서 가장 지치는 순간은 언제였나요?”
같은 질문을 먼저 넣어주는 것이 좋습니다.

또한 AC(협조,조율)와 A(이성,판단)가 함께 높은 코치는 조직 흐름을 안정적으로 유지하고 문제를 차분하게 정리하는 힘이 매우 좋은 편입니다. 다만 분위기를 너무 안정적으로 유지하려다 보면 조직 전체 에너지가 조용해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 흐름이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하고 흐름을 현실적으로 관리하는 힘이 매우 뛰어난 성향입니다. 여기에 따뜻한 공감과 감정 확인이 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_A_FC:{manner:`OOO님은 조직 안에서 흐름을 안정적으로 유지하면서도 전체 움직임을 차분하게 관리하려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 안정적으로 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로 A(이성,판단)가 높기 때문에 단순히 분위기만 챙기는 것이 아니라 현재 상황을 현실적으로 정리하려는 힘도 함께 나타납니다. 신인의 활동량, 고객 흐름, 상담 진행 상황 등을 비교적 객관적으로 보며 문제 원인을 빠르게 정리하려는 모습도 있습니다. 그래서 신인 입장에서는
“상황 정리가 명확하다.”
“현실적으로 방향을 잡아준다.”
“무엇을 해야 하는지 이해가 된다.”
라는 신뢰감을 느끼는 경우가 많습니다.

다만 FC(친화,표현)의 점수가 가장 낮으면 감정 표현과 반응 표현은 비교적 절제되어 보일 수 있습니다. 실제로는 충분히 배려하고 조심하고 있지만 표정 변화나 표현이 크지 않다 보니 신인 입장에서는
“조금 어렵게 느껴진다.”
“칭찬 표현이 적게 느껴진다.”
“조심스럽게 느껴질 때가 있다.”
라고 받아들이는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 운영 흐름을 만드는 힘은 매우 좋지만 신인이 심리적으로 편하게 움직일 수 있는 분위기를 만드는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 조율과 설명만 하는 것이 아니라 짧더라도 반응과 인정 표현을 자주 전달해주는 습관이 중요합니다.

특히 OOO님은
“고생 많으셨습니다.”
“지금 계속 움직이고 계신 부분이 좋습니다.”
“오늘 고객 연락 흐름 잘 유지하고 계십니다.”
같은 짧은 인정 표현을 의식적으로 자주 사용하는 것이 좋습니다.

또한 AC(협조,조율)와 A(이성,판단)가 함께 높은 코치는 조직 흐름을 안정적으로 유지하고 문제를 차분하게 정리하는 힘이 매우 좋은 편입니다. 다만 분위기를 너무 차분하게 유지하다 보면 조직 전체 에너지가 함께 내려갈 가능성도 있습니다. 그래서 의식적으로 미소를 띄고 고개를 끄덕이며 들어주는 반응을 추가하는 것만으로도 조직 분위기가 훨씬 편안해질 수 있습니다.

그리고 충분히 듣고 조율해준 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
처럼 실제 움직임으로 연결해주는 흐름이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직을 안정적으로 유지하고 흐름을 현실적으로 관리하는 힘이 매우 뛰어난 성향입니다. 여기에 조금 더 부드러운 반응과 밝은 표현이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_FC_CP:{manner:`OOO님은 조직 안에서 분위기를 편안하게 유지하면서 관계 흐름을 안정적으로 관리하려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 편안하게 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로  FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 느낌을 받게 됩니다.

다만 CP(기준,결단)의 점수가 가장 낮으면 방향을 강하게 잡아주거나 실행 움직임을 밀어주는 힘은 부족해질 수 있습니다. 코치 본인은 충분히 분위기도 좋게 만들고 조직도 잘 챙기고 있다고 느끼지만 신인 입장에서는
“결론이 조금 약하다.”
“긴장감이 흐려질 때가 있다.”
“좋은 분위기인데 실행 압박은 약하다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 분위기를 만드는 힘은 매우 좋지만 실행 움직임을 강하게 끌어올리는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 “지금 반드시 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 신인이 힘들어할 때 공감과 배려만 오래 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 AC(협조,조율)와 FC(친화,표현)가 함께 높은 코치는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 신인의 부담을 너무 고려하다 보면 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직 분위기와 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 실행 움직임을 조금 더 끌어주는 힘이 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_FC_NP:{manner:`OOO님은 조직 안에서 분위기를 편안하게 유지하면서 관계 흐름을 안정적으로 관리하려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 편안하게 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로  FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 느낌을 받게 됩니다.

다만 NP(배려,공감)의 점수가 가장 낮으면 신인의 감정 상태를 깊게 공감하거나 오래 들어주는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 분위기도 좋게 만들고 조직도 잘 챙기고 있다고 느끼지만 신인 입장에서는
“속마음까지 충분히 이해받는 느낌은 아니다.”
“힘든 이야기를 오래 하기는 어렵다.”
“결론이 비교적 빨리 나온다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 분위기를 만드는 힘은 매우 좋지만 신인의 감정과 심리 상태를 충분히 공감해주는 부분은 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 현재 신인의 감정 상태와 부담 정도를 먼저 확인하는 습관이 중요합니다.

특히 OOO님은 신인이 힘들어할 때
“요즘 가장 버겁게 느껴지는 부분은 어떤 건가요?”
“최근 활동하면서 가장 지치는 순간은 언제였나요?”
같은 질문을 먼저 넣어주는 것이 좋습니다. 그리고 충분히 들은 뒤에는
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
처럼 실제 움직임으로 연결해주는 표현이 함께 들어가야 조직의 활동량과 생산성이 살아나게 됩니다.

또한 AC(협조,조율)와 FC(친화,표현)가 함께 높은 코치는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 신인의 부담을 너무 고려하다 보면 꼭 해야 하는 이야기를 늦게 꺼내는 경우도 생길 수 있습니다. 그러다 보면 조직 전체 활동량이 점점 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직 분위기와 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 따뜻한 공감과 현실적인 행동 정리가 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``},AC_FC_A:{manner:`OOO님은 조직 안에서 분위기를 편안하게 유지하면서 관계 흐름을 안정적으로 관리하려는 힘이 강한 성향입니다.

AC(협조,조율)의 점수가 높기 때문에 조직 안의 분위기와 관계 흐름을 많이 살피는 편입니다. 신인이 부담을 느끼지 않도록 조심하려 하고 조직 안에서 충돌이 커지지 않도록 흐름을 안정적으로 조율하려는 모습도 나타납니다. 그래서 신인 입장에서는
“부담을 심하게 주지 않는다.”
“조직 분위기를 편안하게 유지하려 한다.”
“같이 가려는 느낌이 있다.”
라는 인상을 받는 경우가 많습니다.

그리고 두 번째로  FC(친화,표현)가 높기 때문에 조직 분위기를 너무 무겁게 끌고 가지 않습니다. 신인과 이야기할 때 비교적 밝고 편안한 분위기를 만들려고 하며 조직 안의 긴장감을 줄이고 활동 분위기를 살리려는 힘도 강하게 나타납니다. 그래서 신인 입장에서는
“같이 움직이면 힘이 난다.”
“조직 분위기가 답답하지 않다.”
“편안하게 다가갈 수 있다.”
라는 느낌을 받게 됩니다.

다만 A(이성,판단)의 점수가 가장 낮으면 분위기와 관계 중심으로 조직을 운영하다가 실제 문제 원인과 우선순위를 차분하게 정리하는 부분은 부족해질 수 있습니다. 코치 본인은 충분히 분위기도 좋게 만들고 조직도 잘 챙기고 있다고 느끼지만 신인 입장에서는
“무엇부터 해야 하는지 헷갈릴 때가 있다.”
“열심히는 하는데 방향 정리가 부족하다.”
“상황에 따라 움직임이 달라질 때가 있다.”
라고 느끼는 경우도 생길 수 있습니다.

즉, OOO님의 성향은 조직의 안정감과 분위기를 만드는 힘은 매우 좋지만 현실적인 우선순위와 흐름 정리는 조금 의식할 필요가 있는 구조입니다. 그래서 신인의 활동량과 생산성을 더 끌어올리기 위해서는 공감과 분위기만 만드는 것이 아니라 “지금 가장 먼저 해야 하는 행동”을 짧고 분명하게 정리해주는 습관이 중요합니다.

특히 OOO님은 신인이 힘들어할 때 공감과 배려만 오래 이어가기보다 현재 가장 먼저 움직여야 하는 행동을 하나씩 정리해주는 흐름이 중요합니다.

예를 들어
“그래서 내일까지 고객에게 안부전화하고 추가적인 약속을 잡아보는 데 힘을 써보시지요.”
“이번 주는 상담 약속 확보에 조금 더 집중해보시지요.”
“지금은 기존 고객 재상담 연결 움직임을 유지해보시지요.”
처럼 실제 움직임으로 연결되는 표현을 의식적으로 사용하는 것이 좋습니다.

또한 AC(협조,조율)와 FC(친화,표현)가 함께 높은 코치는 조직 분위기와 관계 유지력은 매우 좋은 편이지만 분위기와 공감에 집중하다 보면 조직 전체 움직임이 느슨해질 가능성도 있습니다. 그래서 충분히 듣고 조율해준 뒤에는 행동 목표를 짧고 분명하게 정리해주는 과정이 함께 들어가야 조직의 활동량과 생산성이 안정적으로 유지될 수 있습니다.

OOO님의 성향은 원래 조직 분위기와 사람의 에너지를 살리는 힘이 매우 뛰어난 성향입니다. 여기에 현실적인 흐름 정리와 우선순위 관리가 조금 더해지면 조직의 유지력과 매출 흐름도 훨씬 안정적으로 올라가게 됩니다.`,improvement:``}},cm5_1:{CP_NP_A:`OOO님은 결단력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_NP_FC:`OOO님은 결단력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_NP_AC:`OOO님은 결단력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_A_NP:`OOO님은 결단력과 객관적 판단력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_A_FC:`OOO님은 결단력과 객관적 판단력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_A_AC:`OOO님은 결단력과 객관적 판단력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_FC_NP:`OOO님은 결단력과 친화력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_FC_A:`OOO님은  결단력과 친화력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_FC_AC:`OOO님은 결단력과 친화력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_AC_NP:`OOO님은 결단력과 상대를 잘 살피는 능력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_AC_A:`OOO님은 결단력과 상대를 잘 살피는 능력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,CP_AC_FC:`OOO님은 추진력과 상대를 잘 살피는 능력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_CP_A:`OOO님은 배려와 공감능력 그리고 결단력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_CP_FC:`OOO님은 배려와 공감능력 그리고 결단력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_CP_AC:`OOO님은 배려와 공감능력 그리고 결단력이 강점으로 나타나며, 상대 입장 살피기를  조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다`,NP_A_CP:`OOO님은 배려와 공감능력 그리고 객관적 판단력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_A_FC:`OOO님은 배려와 공감능력 그리고 객관적 판단력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_A_AC:`OOO님은 배려와 공감능력 그리고 객관적 판단력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_FC_CP:`OOO님은 배려와 공감능력 그리고 친화력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_FC_A:`OOO님은 배려와 공감능력 그리고 친화력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_FC_AC:`OOO님은 배려와 공감능력 드리고 친화력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_AC_CP:`OOO님은 공감을 바탕으로 한 배려심과 상대를 살피는 능력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_AC_A:`OOO님은 공감을 바탕으로 한 배려심과 상대를 살피는 능력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,NP_AC_FC:`OOO님은 공감을 바탕으로 한 배려심과 상대를 살피는 능력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_CP_NP:`OOO님은 객관적 판단력과 결단력이 강점으로 나타나며, 상대에게 공감하는 것을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_CP_FC:`OOO님은 객관적 판단력과 결단력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_CP_AC:`OOO님은 객관적 판단력과 결단력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_NP_CP:`OOO님은 객관적 판단력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_NP_FC:`OOO님은 객관적 판단력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_NP_AC:`OOO님은 객관적 판단력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_FC_CP:`OOO님은 객관적 판단력과 친화력을 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_FC_NP:`OOO님은 객관적 판단력과 친화력을 강점으로 나타나며, 상대에게 공감하는 것을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_FC_AC:`OOO님은 객관적 판단력과 친화력을 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_AC_CP:`OOO님은 객관적 판단력과 상대를 살피는 능력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_AC_NP:`OOO님은 객관적 판단력과 상대를 살피는 능력이 강점으로 나타나며, 상대에게 공감하는 것을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,A_AC_FC:`OOO님은 객관적 판단력과 상대를 살피는 능력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_CP_NP:`OOO님은 친화력과 결단력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_CP_A:`OOO님은 친화력과 결단력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_CP_AC:`OOO님은 친화력과 결단력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_NP_CP:`OOO님은 친화력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_NP_A:`OOO님은 친화력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_NP_AC:`OOO님은 친화력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_A_CP:`OOO님은 친화력과 객관적 판단력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_A_NP:`OOO님은 친화력과 객관적 판단력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_A_AC:`OOO님은 친화력과 객관적 판단력이 강점으로 나타나며, 상대 입장 살피기를 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_AC_CP:`OOO님은 친화력과 상대를 살피는 능력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_AC_NP:`OOO님은 친화력과 상대를 살피는 능력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,FC_AC_A:`OOO님은 친화력과 상대를 살피는 능력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_CP_NP:`OOO님은 상대를 잘 살피는 능력과 결단력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_CP_A:`OOO님은 상대를 잘 살피는 능력과 결단력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_CP_FC:`OOO님은 상대를 잘 살피는 능력과 결단력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_NP_CP:`OOO님은 상대를 살피는 능력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_NP_A:`OOO님은 상대를 살피는 능력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_NP_FC:`OOO님은 상대를 살피는 능력과 공감을 바탕으로 한 배려심이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_A_CP:`OOO님은 상대를 살피는 능력과 객관적 판단력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_A_NP:`OOO님은 상대를 살피는 능력과 객관적 판단력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_A_FC:`OOO님은 상대를 살피는 능력과 객관적 판단력이 강점으로 나타나며, 친화력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_FC_CP:`OOO님은 상대를 살피는 능력과 친화력이 강점으로 나타나며, 결단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_FC_NP:`OOO님은 상대를 살피는 능력과 친화력이 강점으로 나타나며, 공감표현을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`,AC_FC_A:`OOO님은 상대를 살피는 능력과 친화력이 강점으로 나타나며, 객관적 판단력을 조금 더 의식적으로 활용하면 성과향상에 도움이 될 겁니다.`},closing:`이 성향리포트가 작은 거울이 되어 인간관계와 하시는 일의 성과에 도움이 되기를 기원합니다.`,cm6:{},cm7:{},cm8:{CP_NP:{encourage:`리더십이란 잃은 방향을 제시하고, 그 방향을 끝까지 지키는 용이다 
-피터 드러커

강한 기준은 사람을 억누르기 위해서가 아니라, 사람을 보호하기 위해 존재한다
-임마누엘 칸트`,improve:`이해하려는 노력 없이 내려진 판단은 언제나 불완전하다
-칼 로저스

사람은 논리로 움직이지만, 마음으로 결정한다
-블레즈 파스칼`},CP_A:{encourage:`정의는 강한 의지에서 나온다
의미-옳고 그름을 분명히 가르는 힘은 결단과 기준에서 나온다 
-아리스토 텔레스

원칙이 없는 타협은 방향을 잃게 된다 
의미-CP의 성향 결단력, 기준제시를 격려-임마누엘 칸트`,improve:`코칭할 수 없다면, 아직 충분히 이해한 것이 아니다
의미-코칭의 부족은 능력의 부족이 아니라 훈련의 부족이다
-알베르트 아인슈타인`},CP_FC:{encourage:`올바른 판단은 인기보다 중요하다
의미- 관계의 호불호보다 옳음을 선택하는 단호함이 리더십의 핵심임을 말함
-피터 드러커`,improve:`열정은 불꽃이 아니라 연료다. 관리하지 않으면 꺼진다"
의미-FC가 약할수록 감정에 의존하지 않는 몰입과 집중이 필요함을 알려줌
-프리드리히 니체`},CP_AC:{encourage:`정의는 힘이 없으면 공허하고, 힘은 정의가 없으면 폭력이다'
의미-기준을 세우고 옳고 그름을 가르는 힘(CP)은 상황을 지탱하는 핵심 에너지다.
-블레즈 파스칼`,improve:`가장 강한 사람은 혼자 서는 사람이 아니라, 함께 움직일 줄 아는 사람이다
-헬렌 켈러

지혜로운 사람은 바람을 거스르지 않고, 돛의 각도를 조절한다
-공자`},NP_CP:{encourage:`타인을 존중하는 마음이야말로 모든 관계의 시작이다
-마하트마 간디

사람은 이해받을 때 비로소 변화할 수 있다
-칼 로저스`,improve:`용기는 옳다고 생각하는 것을 말하는 데서 시작한다
의미-내가 할 말을 하는 것은 용기이고 상과로 나타난다
-루스벨트`},NP_A:{encourage:`사람은 비판으로 변하지 않고, 이해받을 때 성장한다
-칼 로저스

부드러움은 약함이 아니라, 가장 오래가는 힘이다
-노자`,improve:`생각하지 않으면 감정이 결정을 대신한다
의미-A가 낮을 때 감정이나 분위기로 끌려감 이 문장은 ‘생각-판단-말'의 순서를 훈련하라는 의미`},NP_FC:{encourage:`이해받고 있다고 느끼는 순간, 사람은 스스로 움직이기 시작한다
-칼 로저스

타인을 이기는 사람은 힘이 세지만,타인을 품는 사람은 진정 강하다 -노자`,improve:`느끼는 것을 표현하지 않으면, 그 감정은 사라지지 않고 안에 쌓인다.
-프로이트

자기 자신에게 솔직해질 때, 삶의 에너지가 흐르기 시작한다
-칼 융`},NP_AC:{encourage:`사람은 이해받을 때 비로소 변화할 수 있다
-칼 로저스

부드러움은 가장 강한 설득이다
-노자`,improve:`상대를 고려하는 것은 약해지는 것이 아니라, 선택지를 넓히는 것이다
의미-독립성을 해치지 않으면서 상대방과의 조율을 강조하는 문장
-임마누엘 칸트`},A_CP:{encourage:`지혜란 감정을 제거하는 것이 아니라 감정위에 사고를 올리는 것이다
의미-감정을 인식하되 판단은 이성적으로 하라는 뜻
-아리스토텔레스`,improve:`기준이 없는 친절은 결국 누구도 돕지 못한다
의미-배려와 이해가 중요하지만, 명확한 기준과 방향 제시가 없으면 관계도 성과도 흐려진다는 뜻
-피터 드러커`},A_NP:{encourage:`생각하고 판단하는 법을 배우는 것이야말로 인간의 가장 큰 자유다
-에리히 프롬

현명한 사람은 상황을 탓하지 않고, 상황을 이해한 뒤 선택한다
의미-판단과 선택이 성숙함의 기준임
-마르쿠스 아우렐리우스`,improve:`사람들은 당신이 한 말은 잊을지라도, 당신이 느끼게 한 감정은 잊지 않는다
의미-설득의 논리보다 면담에서 남는 것은 ‘내가 존중받았는가'라는 감정이라는 뜻
-마야 안젤로`},A_FC:{encourage:`사실을 있는 그대로 보는 능력은 지혜의 시작이다
-아리스토텔레스

생각하는 데 시간을 쓰는 사람은, 행동에서 실수를 줄인다
-발타자르 그라시안`,improve:`느낀 것을 말하지 않으면, 아무도 그것을 이해할 수 없다.
의미-감정을 숨긴 채로는 공감도, 연결도 일어날 수 없다는 뜻
-칼 로저스`},A_AC:{encourage:`현상을 있는 그대로 볼 수 있는 사람만이 올바르게 판단할 수 있다
-아리스토텔레스

감정이 아닌 이성에 따라 행동할 수 있을 때, 인간은 선택의 자유가 생긴다.
-스피노자`,improve:`부드러움은 강함을 이긴다
의미-밀어붙이는 힘보다, 상대를 살리며 가는 부드러움이 더 멀리 간다는 뜻
-노자`},FC_CP:{encourage:`진정한 힘은 즐거움에서 나온다
의미-자발적 에너지와 감정 표현은 사람을 움직이는 원천이며, 관계의 활력을 만든다
-프리드리히 니체

웃음은 두려움을 밀어내는 가장 인간적인 용기다
-찰리 채플린`,improve:`결단하지 않는 것도 하나의 선택이며, 그 또한 결과를 낳는다
의미-결정을 안 하는 우유부단함도 책임이 따른다는 뜻
-윌리엄 제임스`},FC_NP:{encourage:`열정은 전염된다
의미- 당신의 에너지와 감정 표현은 상대의 분위기를 바꾼다.
-랄프 왈도 에머슨

당신이 웃을 때, 세상은 당신 편이 된다.
의미-감정 표현과 밝음은 사람 마음을 여는 가장 빠른 언어다
-윌리엄 제임스`,improve:`사람은 논리로 설득되기보다, 이해받았다고 느낄 때 움직인다
-따뜻한 배려와 정서적 수용은 상대의 방어를 낮추고 행동 변화를 이끈다
-칼 로저스`},FC_A:{encourage:`진짜 용기는 자기감정을 숨기지 않은 데 있다.
의미-솔직한 감정 표현은 약함이 아니라 성숙함이다.
-브레네 브라운

기쁨은 성공의 결과가 아니라, 성공의 원인이다.
의미-즐거움과 에너지가 먼저 있을 때 성과가 따라온다 - 숀 에이커`,improve:`현명한 사람은 반응하기 전에 질문한다
의미-질문은 좋은 판단력을 의미함
-소크라테스`},FC_AC:{encourage:`자유롭게 표현하는 사람은 이미 절반은 설득한 것이다
의미-자연스러운 감정 표현은 사람을 끌어당기는 힘이 있다
-데일 카네기

사람들은 논리보다 당신이 느낌을 기억한다.
의미-감정을 전달하는 능력은 관계와 신뢰를 만든다
-마야 안젤로`,improve:`상대를 고려하는 것은 약해지는 것이 아니라, 선택지를 넓히는 것이다
의미-독립성을 해치지 않으면서 상대방과의 조율을 강조하는 문장
-임마누엘 칸트`},AC_CP:{encourage:`지혜로운 사람은 말보다 상황을 먼저 읽는다
의미-눈치와 관찰력을 지혜의 핵심으로 인정
-노자`,improve:`당신이 결정하지 않으면 타인의 기준에 끌려간다
의미 - 우유부단하지 말고 결정을 내리는 것의 중요성을 부드럽게 각인
-짐 론

자기의 입장을 말하지 않는 사람은 결국 입장을 잃는다
의미 침묵의 대가를 인식하는 문장
-마틴 루터 킹`},AC_NP:{encourage:`조심스러움은 미래를 지키는 방식이다
의미-신중해야 오래갈 수 있다는 말
-세네카`,improve:`마음을 얻지 못하는 논리는 설득이 아니다
의미- 논리만 과신하면 안 되고 마음을 얻으려는 노력도 필요
-블레즈 파스칼

상대의 감정을 인정하는 순간, 대화는 언쟁이 되지 않는다
의미-공감과 배려의 중요성
-마셜 로젠버그`},AC_A:{encourage:`조율할 줄 아는 사람만이 오래간다
의미-조직 내에서 AC의 역할 강조
-피터 드러커`,improve:`문제를 감정으로 풀려 하면 문제가 꼬이고 정리해서 생각하면 해결이 된다
-피터 드러커

감정 속에 있을 때는 판단하지 말고, 판단할 때는 감정에서 나오라
의미-감정과 판단은 같은 시점에서 하지 말라는 말
-빅터 프랭크`},AC_FC:{encourage:`조심성은 약함이 아니라 책임감이다
의미-위험 회피를 책임감으로 재정의
-에드먼드 버크`,improve:`아이처럼 웃을 수 있는 능력은 성숙함의 증거다
의미 - 미소와 웃음의 중요성 인식
-파블로 피카소

감정을 억누르는 힘보다, 표현하는 용기가 더 필요하다
의미- 감정 표현의 두려움을 낮춤
-브레네 브라운`}}},pl={items:[{title:`고객의 실제 심리 해석`,body:`먼저 고객이 “배우자와 상의해 보겠다"  “조금 더 생각 해 보겠다"는  거절의 근저에 있는 심리는  계약을 거절하겠다는 말이 아니라 ‘결정을 하기에는 아직 심리적으로 안전하지 않다'는 신호라고 판단하면 됩니다. 고객은 어느정도 이해했고 상품의 필요성도 인식했으며 진짜 심리는 “안하겠다"가 아니라 “지금 결정할 마음이 아직 아니다" 인 경우가 많습니다.  이때 컨설턴트의 역할은 설득자이기 보다는  결정을 가능하게 만드는 조율자가 되야 합니다. 
이 단계에서 고객의 문제는 이해부족이 아니라 결정불안이니 절대로 설득과 결론을 밀지 말아야 합니다.`},{title:`재질문 및 재결정 유도`,body:`먼저 고객이 어디까지 결정했고 무엇이 남아 있는지 질문을 통해서 알아봐야 합니다.
 “이 보장의 필요성은 어느정도 공감이  되셨는지요?" 
 “망설여지는 진짜 이유는 무엇일까요?” “보장내용 때문일까요? 아니면 보험료 때문일까요?”
 “그럼 핵심만 정리한 내용을 하나 드릴게요 이걸 보시고  판단을 해보시지요"
가장 잘못된 대응은 “상의해 보시고 연락주세요" “ 그럼 생각해 보시고 연락주세요" 이 말은 바로 계약 이탈로 연결이 되니 사용하지 않도록 주의 하시기 바랍니다.`}]},ml={sales:ul,manager:dl,coach:fl},hl={sales:`sales`,coach:`coach`,sales_leader:`manager`,branch_manager:`manager`,training_leader:`manager`,division_head:`manager`,executive:`manager`};function gl(e){return e>=17?`17-20`:e>=14?`14-16`:e>=11?`11-13`:e>=8?`8-10`:`0-7`}function _l(e,t,n){let[r,i]=wc[Ec(n)]?.[e]||[11,16];return t<r||t>i}function vl(e,t){return t<=7}function yl(e){return!!e&&/조율[이은]?\s*필요\s*없는\s*구간/.test(e)}function bl(e,t){let n=hl[t]||`sales`,r=ml[n];if(!r)return null;let{scores:i,top1:a,top2:o,bottom:s}=e,c={},l={},u={},d={},f=[];for(let e of vc){let t=gl(i[e]);c[e]=r.cm1[t]?.[e]||``,l[e]=r.cm2[t]?.[e]||``,u[e]=r.cm4_1[t]?.[e]||``,d[e]=r.cm4_2[t]?.[e]||``,vl(e,i[e])&&f.push({ego:e,...r.cm4_4[e]})}let p=vc.every(e=>{let n=vl(e,i[e]),r=_l(e,i[e],t)&&!yl(d[e]);return!n&&!r}),m=`${a}_${o}`,h=`${a}_${o}_${s}`,g=n===`sales`,_=``,v=``,y=null;if(g)_=r.cm6[m]||``,v=r.cm7[h]||``,y=r.cm8[a]||null;else{v=r.cm7[h]||``;let e=`${a}_${s}`;y=r.cm8[e]||null}return{jobLabel:r.job_label,name:``,isInsurance:g,cm1:c,cm2:l,cm3:r.cm3[m]||``,cm4_1:u,cm4_2:d,cm4_3:p?r.cm4_3.all_no_coaching:``,cm4_4:f,cm4_5:r.cm4_5||``,cm5:r.cm5[h]||null,cm5_1:r.cm5_1?.[h]||``,closing:r.closing||``,cm6:_,cm6_common:g?pl?.items||[]:null,cm7:v,cm8:y}}var xl={report:{intro:{title:`성향 코칭 리포트의 목적`,items:[`거울로 얼굴을 보듯이 성향리포트로 나의 성향을 발견할 수 있습니다. 이후 다섯가지의 성향을 조절해서 사용할 수 있습니다.`,`나를 진심으로 알게 되면 각성과 성찰을 통해 에고상태의 의식적인 조절과 수정을 실천해 나가게 됩니다. 결국 점점 체득화 되고 습관이 바뀌어 원만한 인간관계와 성공적인 비지니스를 달성할 수 있습니다.`,`특히 비지니스를 하는 사람은 "왜 흔들리는 지"를 알게 하고 "어떻게 다시 중심을 잡을 지"를 스스로 알게 되어 상담을 원하는 방향으로 이끌 수 있고 슬럼프에 빠지는 것을 예방할 수 있습니다.`,`궁극적으로 인생 전반에 거쳐 지금보다 나은 삶을 영위할 수 있으며 특히 사랑하는 사람들과의 좋은 관계를 잘 유지해 나갈 수 있습니다.`]},closing:{greeting:`끝까지 함께해 주셔서 감사합니다. 이 리포트가 작은 거울이 되어 드리길 바랍니다.`,contact:{name:``,email:`egogram.son@gmail.com`,instagram:``,phone:``}},sections:{s1_title:`님의 성향`,s2_title:`자아상태의 성향과 말투`,s3_title:`내 성향의 강점`,s4_title:`내 성향의 조율 포인트`,s4_no_coaching:`조율을 하지 않아도 되는 성향`,s4_detailed_title:`세밀한 코칭`,s5_title_insurance:`상품 제안을 할 때`,s5_title_manager:`성과에 도움이 되는 말투`,s5_title_coach:`성과에 도움이 되는 말투`,s5_manner:`이 성향의 말투와 태도`,s5_improvement:`개선이 되는 코칭 내용`,s6_title:`클로징 전 고객님이 거절시`,s7_title:`신인 리크루팅 레벨업`,s8_title:`명언`,quote_encourage:`격려`,quote_improve:`개선`}}},Sl={CP_NP:{title:`기준이 또렷하면서도 사람을 먼저 챙기는 분`,desc:`무엇이 맞는지 분명히 말해 방향을 잡아 주고, 동시에 상대의 마음을 살펴 안심시킵니다. 단단함과 따뜻함을 함께 가졌습니다.`},CP_A:{title:`기준과 분석이 함께 단단한 분`,desc:`원칙이 또렷하고 판단이 냉철해, 복잡한 상황에서도 흔들리지 않고 방향을 제시합니다.`},CP_FC:{title:`분명한 기준을 밝은 기운으로 전하는 분`,desc:`무엇이 맞는지 또렷하게 짚어 주면서도, 그 말이 딱딱하지 않고 밝은 힘으로 전해집니다. 그래서 곁에 있으면 방향이 분명한데도 부담스럽지 않습니다.`},CP_AC:{title:`분명한 기준을 갖되 상대에 맞춰 조율하는 분`,desc:`결정의 중심은 또렷한데, 밀어붙이기보다 상황과 상대를 살펴 속도를 맞춥니다. 신뢰를 주면서도 부담을 주지 않습니다.`},NP_CP:{title:`따뜻하게 품으면서 기준도 분명한 분`,desc:`상대를 먼저 이해하고 보듬되, 필요한 자리에서는 분명한 방향을 짚어 줍니다.`},NP_A:{title:`따뜻하게 공감하면서 차분하게 길을 짚어 주는 분`,desc:`먼저 상대의 마음을 살펴 안심시키고, 그다음 상황을 차분히 정리해 길을 짚어 줍니다. 위로로 그치지 않고 현실적인 방법까지 함께 보여 줍니다.`},NP_FC:{title:`따뜻하게 공감하고 밝게 다가가는 분`,desc:`상대의 마음을 먼저 읽고, 환하고 편안한 분위기로 거리를 좁힙니다. 함께 있으면 마음이 놓이는 사람입니다.`},NP_AC:{title:`깊이 공감하며 세심하게 맞춰 주는 분`,desc:`상대의 감정을 먼저 살피고 조심스럽게 보폭을 맞춥니다. 곁에서 끝까지 함께해 줄 사람이라는 신뢰를 줍니다.`},A_CP:{title:`냉철하게 분석하고 기준이 또렷한 분`,desc:`사실과 흐름을 차분히 정리해 핵심을 짚고, 그 위에 분명한 기준을 세웁니다.`},A_NP:{title:`차분하게 살피면서 마음을 함께 챙기는 분`,desc:`감정에 먼저 휩쓸리지 않고 상황부터 차분히 들여다보되, 상대의 마음이 다치지 않도록 배려하며 길을 보여 줍니다. 흔들리지 않으면서도 따뜻합니다.`},A_FC:{title:`차분하게 판단하면서 분위기를 밝게 살리는 분`,desc:`상황을 차분히 분석해 방향을 또렷하게 잡으면서도, 그 전달이 딱딱하지 않고 밝은 기운을 띱니다. 그래서 곁에 있으면 집중은 또렷해지고 부담은 줄어듭니다.`},A_AC:{title:`차분하게 판단하면서 상황에 맞춰 조율하는 분`,desc:`무엇이 필요한지 차분히 따져 본 뒤, 그 판단을 상대와 조직의 흐름에 맞춰 풀어냅니다. 밀어붙이기보다 상황을 살펴 부드럽게 길을 냅니다.`},FC_CP:{title:`밝은 기운으로 이끌면서 기준도 또렷한 분`,desc:`사람과 분위기를 환하게 살리면서도, 지켜야 할 선과 방향은 분명하게 짚어 줍니다. 즐겁게 따라오게 하면서도 느슨해지지 않게 합니다.`},FC_NP:{title:`밝은 에너지로 다가가 따뜻하게 품는 분`,desc:`먼저 웃으며 다가가 분위기를 열고, 상대의 마음을 따뜻하게 감싸 안습니다.`},FC_A:{title:`밝게 다가가면서 차분하게 판단하는 분`,desc:`환한 기운으로 먼저 다가가 분위기를 열면서도, 정작 판단은 차분하고 또렷합니다. 가볍게 보이지 않고, 밝음 안에 분석의 단단함이 있습니다.`},FC_AC:{title:`밝게 다가가며 상대에 맞춰 함께 걷는 분`,desc:`표정과 말이 밝아 곁에 있으면 긴장이 풀리고, 상대의 반응을 세심하게 살펴 속도를 맞춰 줍니다. 끌고 가기보다 함께 걷는 느낌을 줍니다.`},AC_CP:{title:`상대에 맞춰 조율하되 자기 기준이 또렷한 분`,desc:`상황과 상대를 세심히 살펴 맞추면서도, 중요한 자리에서는 자기 중심을 지킵니다.`},AC_NP:{title:`세심하게 맞추며 먼저 마음을 살피는 분`,desc:`상대의 입장에서 먼저 헤아리고, 분위기를 읽어 갈등이 생기기 전에 부드럽게 풀어 줍니다. 곁에 있으면 지시받는 느낌보다 보호받는 안정감을 느낍니다.`},AC_A:{title:`상대에 맞춰 조율하면서 차분하게 길을 찾는 분`,desc:`상대의 분위기를 섬세하게 살펴 무리하게 밀지 않으면서, 지금 할 수 있는 가장 현실적인 길을 차분히 제시합니다. 흔들리지 않는 안정감을 줍니다.`},AC_FC:{title:`상대를 세심하게 살피며 밝게 기운을 북돋는 분`,desc:`무엇을 부담스러워하는지 빠르게 알아차리고, 무거운 분위기를 웃음과 격려로 풀어 줍니다. 그래서 곁에 있으면 "다시 해 볼 수 있다"는 마음이 듭니다.`}},Cl=/(CP|NP|FC|AC|A)\([가-힣,·]+\)/g,wl={가:`이`,는:`은`,를:`을`,와:`과`,로:`으로`};function Tl(e,t){let n=[],r=0,i=0,a;for(Cl.lastIndex=0;(a=Cl.exec(e))!==null;){a.index>r&&n.push(e.slice(r,a.index));let o=a[1],s=a.index+a[0].length,c=/^ ?성향/.test(e.slice(s));n.push((0,H.jsxs)(`span`,{style:{color:kl[o],fontWeight:600},children:[Ll[o],c?``:` 성향`]},`${t}-e${i++}`)),!c&&wl[e[s]]&&(n.push(wl[e[s]]),s+=1),r=s}return r<e.length&&n.push(e.slice(r)),n.length?n:[e]}function G({text:e,breaks:t}){if(!e)return null;let n=e.split(/\n\s*\n/).map(e=>e.trim()).filter(Boolean);return t?n.map((e,t)=>(0,H.jsx)(`p`,{children:e.split(`
`).map(e=>e.trim()).filter(Boolean).flatMap((e,n)=>{let r=Tl(e,`c${t}-${n}`);return n===0?r:[(0,H.jsx)(`br`,{},`b${t}-${n}`),...r]})},t)):n.map((e,t)=>(0,H.jsx)(`p`,{children:Tl(e.replace(/\n/g,` `).trim(),`c${t}`)},t))}function El(e,t){return e?Tl(e.replace(/\n\s*\n/g,` `).replace(/\n/g,` `).trim(),t):null}function Dl(e){return e&&e.replace(/(✔\s*화법\s*[①②③④⑤⑥⑦⑧⑨⑩0-9]+)\s*\n+/g,`$1 `)}function Ol(e){return e&&e.replace(/^\s*\([^)]*(?:성향|첫번째|두번째|높아|발현|BOTTOM|TOP)[^)]*\)\s*/g,``).trim()}var kl={CP:`#ef4444`,NP:`#f59e0b`,A:`#38bdf8`,FC:`#10b981`,AC:`#8b5cf6`};function Al(e){return e>=17?`17-20`:e>=14?`14-16`:e>=11?`11-13`:e>=8?`8-10`:`0-7`}var jl={"0-7":{CP:`부드럽고 · 수용적이며 · 상대를 앞세운다`,NP:`담백하고 · 군더더기 없으며 · 사실 중심이다`,A:`직관적이고 · 즉각적이며 · 감성이 풍부하다`,FC:`감정을 절제하고 · 차분하며 · 진중하다`,AC:`소신 있고 · 솔직하며 · 자기 기준이 또렷하다`},"8-10":{NP:`차분하고 · 담백하며 · 실무 중심이다`,A:`느낌을 먼저 받아들이고 · 공감이 빠르며 · 사람 중심이다`,FC:`조용하고 · 신중하며 · 진지하다`}};function Ml(e){return e?e.split(/[,，.]/).map(e=>e.trim()).filter(Boolean).join(` · `):``}function Nl(e,t,n){return jl[Al(t)]?.[e]||Ml(n?.[e])}var Pl=Sl,Fl={CP:`또렷한 기준`,NP:`따뜻한 공감`,A:`차분한 분석`,FC:`밝은 표현력`,AC:`세심한 조율`};function Il(e,t,n){return Pl[`${e}_${t}`]||{title:`${Fl[e]}과 ${Fl[t]}이 함께 도드라지는 분`,desc:``,fallback:!0}}var Ll={CP:`기준·결단`,NP:`배려·공감`,A:`이성·판단`,FC:`친화·표현`,AC:`협조·조율`};function Rl(e){return`${e}(${Ll[e]})`}function K(e){let t=e.map(Rl);return t.length<=1?t.join(``):t.length===2?`${t[0]}과 ${t[1]}`:t.join(`, `)}function q(e,t,n){let r=vc.filter(t=>e[t]>=17),i=Rl(t),a=[];return r.length>0&&a.push(`${n}님은 ${K(r)}이 17점 이상입니다. 이는 큰 강점이 될 수 있지만, 상황에 따라 상대방이 다소 과하게 느낄 수도 있습니다. 이 부분만 의식적으로 조율하면 더욱 균형 잡힌 관계와 성과에 도움이 됩니다.`),a.push(`${r.length>0?`또한 `:``}가장 낮은 ${i}은 성과와 인간관계에서 반복적으로 나타나는 아쉬움의 원인이 될 수 있습니다. 가장 낮은 ${i}을 잘 이해하고 의식적으로 활용하려는 노력이 더해지면 강점은 더욱 빛을 발하게 됩니다.`),a.join(`

`)}function J(e){return e&&e.replace(/⚠️[\s\S]*$/,``).trimEnd()}function Y(e,t){if(typeof e==`string`)return e.replace(/OOO/g,t);if(Array.isArray(e))return e.map(e=>Y(e,t));if(e&&typeof e==`object`){let n={};for(let r of Object.keys(e))n[r]=Y(e[r],t);return n}return e}var X={CP:`기준을 세우는 힘`,NP:`마음을 살피는 힘`,A:`흐름을 읽는 힘`,FC:`분위기를 여는 힘`,AC:`보폭을 맞추는 힘`};function zl({number:e,title:t,children:n}){return(0,H.jsxs)(`div`,{className:`report-section`,children:[(0,H.jsxs)(`h2`,{className:`report-section-title`,children:[e&&(0,H.jsxs)(`span`,{className:`report-section-num`,children:[e,`.`]}),t]}),n]})}function Bl({scores:e,jobType:t}){return(0,H.jsx)(`div`,{className:`report-chart`,children:vc.map(n=>{let[r,i]=Dc(n,t);return(0,H.jsxs)(`div`,{className:`report-chart-row`,children:[(0,H.jsxs)(`div`,{className:`report-chart-label`,style:{color:kl[n]},children:[(0,H.jsx)(`strong`,{children:Ll[n]}),(0,H.jsx)(`span`,{className:`report-chart-code`,children:n})]}),(0,H.jsxs)(`div`,{className:`report-chart-bar-wrap`,children:[(0,H.jsx)(`div`,{className:`report-chart-success`,style:{left:`${r/20*100}%`,width:`${(i-r+1)/20*100}%`}}),(0,H.jsx)(`div`,{className:`report-chart-bar`,style:{width:`${e[n]/20*100}%`,backgroundColor:kl[n]}})]}),(0,H.jsx)(`div`,{className:`report-chart-score`,children:e[n]})]},n)})})}function Vl({row:e,showToggle:t=!0}){let[n,r]=(0,x.useState)(!1),i={scores:{CP:e.score_cp,NP:e.score_np,A:e.score_a,FC:e.score_fc,AC:e.score_ac},top1:e.top1,top2:e.top2,bottom:e.bottom,total:e.total,grades:e.grades},a=Y(bl(i,e.job_type),e.name||``);a.name=e.name;let o={...e,result:i},{scores:s,top1:c,top2:l,bottom:u}=i,d=Il(c,l,a.name);return(0,H.jsxs)(`div`,{className:`report-container ${n?`report-bling`:``}`,children:[t&&(0,H.jsx)(`button`,{className:`bling-toggle`,onClick:()=>r(!n),children:n?`기본`:`bling`}),(0,H.jsxs)(`div`,{className:`report-cover`,children:[(0,H.jsx)(`div`,{className:`report-cover-title`,children:(0,H.jsxs)(`h1`,{children:[(0,H.jsx)(`span`,{className:`report-cover-brand`,children:`MIND2ACTION`}),` 성향 코칭 리포트`]})}),(0,H.jsxs)(`div`,{className:`report-cover-id`,children:[(o.company||o.department)&&(0,H.jsx)(`span`,{className:`report-cover-meta`,children:[o.company,o.department].filter(Boolean).join(` `)}),(0,H.jsxs)(`span`,{className:`report-cover-name`,children:[a.name,`님`]})]})]}),(0,H.jsxs)(`div`,{className:`report-intro report-intro-v2`,children:[(0,H.jsx)(`h2`,{children:xl.report.intro.title}),(0,H.jsx)(`p`,{children:`성향 리포트는 나를 더 잘 이해하고, 다섯 가지 성향을 상황에 맞게 활용할 수 있도록 돕는 안내서입니다.`}),(0,H.jsx)(`p`,{children:`자신의 강점과 조율할 점을 알게 되면 인간관계와 비즈니스가 더욱 안정적으로 이루어지고, 흔들릴 때 다시 중심을 잡는 데 도움이 됩니다.`}),(0,H.jsx)(`p`,{children:`궁극적으로 더 나은 삶과 좋은 관계를 만들어 가도록 돕는 리포트입니다.`})]}),(0,H.jsxs)(zl,{number:1,title:`${a.name}${xl.report.sections.s1_title}`,children:[(0,H.jsxs)(`div`,{className:`report-identity`,children:[(0,H.jsx)(`p`,{className:`report-identity-toplabel`,children:`가장 강한 힘`}),(0,H.jsx)(`p`,{className:`report-identity-top`,children:X[c]}),(0,H.jsxs)(`p`,{className:`report-identity-line`,children:[a.name,`님은 `,(0,H.jsx)(`strong`,{children:d.title}),`입니다.`]}),d.desc&&(0,H.jsx)(`p`,{className:`report-identity-desc`,children:d.desc})]}),(0,H.jsx)(`h3`,{className:`report-subhead`,children:`한눈에 보는 다섯 성향`}),(0,H.jsx)(`p`,{className:`report-scale-note`,children:`각 성향 0~20점`}),(0,H.jsx)(Bl,{scores:s,jobType:o.job_type}),(0,H.jsxs)(`p`,{className:`report-chart-legend`,children:[(0,H.jsx)(`span`,{className:`report-chart-legend-mark`}),` 점선 안 = 조율이 필요없는 구간`]}),(0,H.jsx)(`h3`,{className:`report-subhead`,children:`성향별로 자세히 보기`}),(()=>{let e=[...vc].sort((e,t)=>s[t]-s[e]),t=e.filter(e=>e===c||e===l),n=e.filter(e=>e!==c&&e!==l);return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`div`,{className:`report-traits`,children:t.map(e=>(0,H.jsxs)(`div`,{className:`report-trait-item`,children:[(0,H.jsxs)(`p`,{className:`report-trait-ego`,style:{borderColor:kl[e]},children:[(0,H.jsx)(`span`,{className:`report-trait-ego-name`,style:{color:kl[e]},children:Ll[e]}),(0,H.jsxs)(`span`,{className:`report-trait-ego-score`,children:[s[e],`점`]}),(0,H.jsx)(`span`,{className:`report-trait-ego-sep`,children:`:`}),(0,H.jsx)(`span`,{className:`report-trait-ego-plain`,children:Nl(e,s[e],a.cm1)})]}),(0,H.jsx)(G,{text:a.cm2[e]})]},e))}),n.length>0&&(0,H.jsx)(`div`,{className:`report-traits-rest`,children:n.map(e=>(0,H.jsxs)(`p`,{className:`report-trait-rest-line`,children:[(0,H.jsx)(`strong`,{style:{color:kl[e]},children:Ll[e]}),(0,H.jsxs)(`span`,{className:`report-trait-rest-score`,children:[s[e],`점`]}),(0,H.jsx)(`span`,{className:`report-trait-rest-text`,children:Ol(a.cm4_1[e])})]},e))})]})})()]}),(0,H.jsxs)(zl,{number:2,title:xl.report.sections.s3_title,children:[(0,H.jsxs)(`p`,{className:`report-strength-lead`,children:[a.name,`님은 `,(0,H.jsx)(`strong`,{children:d.title}),`. 그 성향은 이런 강점으로 드러납니다.`]}),(0,H.jsx)(G,{text:Ol(a.cm3)})]}),(()=>{let e=[],t=[];return vc.forEach(n=>{let r=a.cm4_4.find(e=>e.ego===n),i=_l(n,s[n],o.job_type)&&!yl(a.cm4_2[n]);r||i?e.push({ego:n,detailed:r,needs:i}):t.push(n)}),(0,H.jsxs)(zl,{number:3,title:xl.report.sections.s4_title,children:[e.map(({ego:e,detailed:t,needs:n})=>(0,H.jsx)(`div`,{className:`report-coaching-item`,children:t?(0,H.jsxs)(`div`,{className:`report-coaching-detailed`,children:[(0,H.jsxs)(`p`,{className:`report-coaching-head`,children:[(0,H.jsx)(`span`,{className:`report-coaching-ego`,style:{color:kl[e]},children:Ll[e]}),(0,H.jsxs)(`span`,{className:`report-coaching-score`,children:[s[e],`점`]}),(0,H.jsx)(`span`,{className:`report-coaching-sep`,children:`:`}),(0,H.jsx)(`span`,{className:`report-coaching-headtext`,children:El(Ol(t.trait),`ct${e}`)})]}),(0,H.jsx)(G,{text:t.coaching}),t.script&&(0,H.jsxs)(`div`,{className:`report-detailed-script`,children:[(0,H.jsx)(`strong`,{children:`화법 스크립트:`}),(0,H.jsx)(`p`,{children:t.script})]})]}):n?(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(`p`,{className:`report-coaching-head`,children:[(0,H.jsx)(`span`,{className:`report-coaching-ego`,style:{color:kl[e]},children:Ll[e]}),(0,H.jsxs)(`span`,{className:`report-coaching-score`,children:[s[e],`점`]}),(0,H.jsx)(`span`,{className:`report-coaching-sep`,children:`:`}),(0,H.jsx)(`span`,{className:`report-coaching-headtext`,children:El(Ol(a.cm4_1[e]),`cn${e}`)})]}),a.cm4_2[e]&&(0,H.jsx)(`div`,{className:`report-coaching-detail`,children:(0,H.jsx)(G,{text:Ol(a.cm4_2[e])})})]}):null},e)),a.cm4_3&&(0,H.jsxs)(`div`,{className:`report-coaching-message`,children:[(0,H.jsx)(G,{text:J(a.cm4_3)}),(0,H.jsx)(`div`,{className:`report-adjust-note`,children:(0,H.jsx)(G,{text:q(s,u,a.name)})})]}),a.cm4_5&&e.length>0&&(0,H.jsxs)(`div`,{className:`report-cm4-5`,children:[(0,H.jsx)(`div`,{className:`report-adjust-note`,children:(0,H.jsx)(G,{text:q(s,u,a.name)})}),(0,H.jsx)(G,{text:J(Ol(a.cm4_5))})]})]})})(),a.cm5&&(0,H.jsxs)(zl,{number:4,title:a.isInsurance?xl.report.sections.s5_title_insurance:a.jobLabel===`관리자`?xl.report.sections.s5_title_manager:xl.report.sections.s5_title_coach,children:[a.cm5_1&&(0,H.jsx)(`p`,{className:`report-cm5-oneliner`,children:Ol(a.cm5_1)}),(0,H.jsxs)(`div`,{className:`report-cm5`,children:[a.isInsurance&&(0,H.jsx)(`h4`,{className:`report-cm5-subhead`,children:`제안시 이 성향의 태도`}),(0,H.jsx)(G,{text:Dl(a.cm5.manner),breaks:!0}),(0,H.jsxs)(`div`,{className:`report-cm5-improvement`,children:[a.isInsurance&&(0,H.jsx)(`h4`,{className:`report-cm5-subhead`,children:`개선에 도움이 되는 코칭과 화법예시`}),(0,H.jsx)(G,{text:Dl(a.cm5.improvement),breaks:!0})]})]})]}),a.isInsurance&&(0,H.jsxs)(zl,{number:5,title:xl.report.sections.s6_title,children:[a.cm6&&(0,H.jsx)(G,{text:Ol(a.cm6)}),a.cm6_common&&a.cm6_common.length>0&&(0,H.jsx)(`div`,{className:`report-cm6-common`,children:a.cm6_common.map((e,t)=>(0,H.jsxs)(`div`,{className:`report-cm6-common-item`,children:[(0,H.jsx)(`h4`,{children:e.title}),(0,H.jsx)(G,{text:e.body})]},t))})]}),(0,H.jsx)(`div`,{className:`report-closing`,children:a.closing?(0,H.jsx)(`div`,{className:`report-closing-message`,children:(0,H.jsx)(G,{text:a.closing})}):(0,H.jsx)(`p`,{className:`report-closing-greeting`,children:xl.report.closing.greeting})}),(0,H.jsxs)(`div`,{className:`report-footer-bar`,children:[(0,H.jsx)(`span`,{className:`report-footer-copyright`,children:`© 2026 MIND2ACTION`}),xl.report.closing.contact.email&&(0,H.jsxs)(`span`,{className:`report-footer-email`,children:[`✉\xA0\xA0`,xl.report.closing.contact.email]}),(0,H.jsx)(`span`,{className:`report-footer-build`,children:`v0.12 · 0614-1340 · 545516f`})]})]})}function Hl(){let{id:e}=_t(),[t,n]=(0,x.useState)(null),[r,i]=(0,x.useState)(!0),[a,o]=(0,x.useState)(null);return(0,x.useEffect)(()=>{async function t(){let{data:t,error:r}=await $s.from(`responses`).select(`*`).eq(`id`,e).single();if(r||!t){o(`리포트를 찾을 수 없습니다.`),i(!1);return}n(t),i(!1)}t()},[e]),r?(0,H.jsx)(`div`,{className:`report-loading`,children:`리포트 생성 중...`}):a?(0,H.jsx)(`div`,{className:`report-error`,children:a}):t?(0,H.jsx)(Vl,{row:t}):null}function Ul(){let{campaignId:e}=_t(),[t,n]=(0,x.useState)(null),[r,i]=(0,x.useState)(null),[a,o]=(0,x.useState)(null),[s,c]=(0,x.useState)(0);if((0,x.useEffect)(()=>{async function t(){let{data:t}=await $s.from(`campaigns`).select(`*`).eq(`id`,e).single(),{data:r,error:a}=await $s.from(`responses`).select(`*`).eq(`campaign_id`,e).order(`created_at`,{ascending:!0});if(a){o(`응답을 불러오지 못했습니다.`);return}n(t||null),i(r||[])}t()},[e]),(0,x.useEffect)(()=>{if(!r||r.length===0||s>=r.length)return;let e=setTimeout(()=>{c(e=>Math.min(e+2,r.length))},16);return()=>clearTimeout(e)},[r,s]),a)return(0,H.jsx)(`div`,{className:`report-error`,children:a});if(!r)return(0,H.jsx)(`div`,{className:`report-loading`,children:`불러오는 중...`});let l=r.length,u=s>=l,d=t?.client_name||`캠페인`;return l===0?(0,H.jsx)(`div`,{className:`report-batch`,children:(0,H.jsxs)(`div`,{className:`report-batch-toolbar`,children:[(0,H.jsx)(`div`,{className:`report-batch-info`,children:(0,H.jsxs)(`div`,{className:`report-batch-title`,children:[d,` — 전체 리포트`]})}),(0,H.jsx)(`div`,{className:`report-batch-count`,children:`참여자가 없습니다.`})]})}):(0,H.jsxs)(`div`,{className:`report-batch`,children:[(0,H.jsxs)(`div`,{className:`report-batch-toolbar`,children:[(0,H.jsxs)(`div`,{className:`report-batch-info`,children:[(0,H.jsxs)(`div`,{className:`report-batch-title`,children:[d,` — 전체 리포트`]}),(0,H.jsxs)(`div`,{className:`report-batch-count`,children:[`참여 `,l,`명`]})]}),(0,H.jsx)(`div`,{className:`report-batch-actions`,children:u?(0,H.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>window.print(),children:`PDF로 저장 (인쇄)`}):(0,H.jsxs)(`div`,{className:`report-batch-progress`,children:[(0,H.jsxs)(`div`,{className:`report-batch-progress-label`,children:[`리포트 준비 `,s,`/`,l]}),(0,H.jsx)(`div`,{className:`report-batch-progress-track`,children:(0,H.jsx)(`div`,{className:`report-batch-progress-fill`,style:{width:`${s/l*100}%`}})})]})})]}),(0,H.jsx)(`div`,{className:`report-batch-body`,children:r.slice(0,s).map(e=>(0,H.jsx)(`div`,{className:`report-batch-item`,children:(0,H.jsx)(Vl,{row:e,showToggle:!1})},e.id))})]})}function Wl(){return(0,H.jsx)(`header`,{className:`header`,children:(0,H.jsx)(`div`,{className:`header-inner`,children:(0,H.jsx)(`div`,{className:`header-brand`,children:`MIND2ACTION`})})})}function Gl(){return(0,H.jsxs)(`footer`,{className:`footer`,children:[`MIND2ACTION © 2026 `,(0,H.jsx)(`span`,{className:`footer-version`,children:`v0.8`})]})}function Kl(){let e=ft(),t=e.pathname===`/admin`,n=e.pathname.startsWith(`/report`);return(0,H.jsxs)(`div`,{className:`app`,children:[!n&&(0,H.jsx)(Wl,{}),(0,H.jsx)(`main`,{className:t?`main-content main-admin`:n?`main-content main-report`:`main-content`,children:(0,H.jsxs)(Ut,{children:[(0,H.jsx)(Vt,{path:`/admin`,element:(0,H.jsx)(ll,{})}),(0,H.jsx)(Vt,{path:`/report/:id`,element:(0,H.jsx)(Hl,{})}),(0,H.jsx)(Vt,{path:`/report-batch/:campaignId`,element:(0,H.jsx)(Ul,{})}),(0,H.jsx)(Vt,{path:`/*`,element:(0,H.jsx)(zc,{})})]})}),!n&&(0,H.jsx)(Gl,{})]})}function ql(){return(0,H.jsx)(jn,{children:(0,H.jsx)(Kl,{})})}(0,Qn.createRoot)(document.getElementById(`root`)).render((0,H.jsx)(x.StrictMode,{children:(0,H.jsx)(ql,{})}));
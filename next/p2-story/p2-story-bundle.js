/*!
 * GSAP 3.15.0
 * https://gsap.com
 * 
 * @license Copyright 2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle, jack@greensock.com
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).window=t.window||{})}(this,function(e){"use strict";function _inheritsLoose(t,e){t.prototype=Object.create(e.prototype),(t.prototype.constructor=t).__proto__=e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function r(t){return"string"==typeof t}function s(t){return"function"==typeof t}function t(t){return"number"==typeof t}function u(t){return void 0===t}function v(t){return"object"==typeof t}function w(t){return!1!==t}function x(){return"undefined"!=typeof window}function y(t){return s(t)||r(t)}function R(t){return(i=bt(t,ht))&&Fe}function S(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")}function T(t,e){return!e&&console.warn(t)}function U(t,e){return t&&(ht[t]=e)&&i&&(i[t]=e)||ht}function V(){return 0}function ga(t){var e,r,i=t[0];if(v(i)||s(i)||(t=[t]),!(e=(i._gsap||{}).harness)){for(r=yt.length;r--&&!yt[r].targetTest(i););e=yt[r]}for(r=t.length;r--;)t[r]&&(t[r]._gsap||(t[r]._gsap=new Xt(t[r],e)))||t.splice(r,1);return t}function ha(t){return t._gsap||ga(Pt(t))[0]._gsap}function ia(t,e,r){return(r=t[e])&&s(r)?t[e]():u(r)&&t.getAttribute&&t.getAttribute(e)||r}function ja(t,e){return(t=t.split(",")).forEach(e)||t}function ka(t){return Math.round(1e5*t)/1e5||0}function la(t){return Math.round(1e7*t)/1e7||0}function ma(t,e){var r=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),"+"===r?t+i:"-"===r?t-i:"*"===r?t*i:t/i}function na(t,e){for(var r=e.length,i=0;t.indexOf(e[i])<0&&++i<r;);return i<r}function oa(){var t,e,r=pt.length,i=pt.slice(0);for(_t={},t=pt.length=0;t<r;t++)(e=i[t])&&e._lazy&&(e.render(e._lazy[0],e._lazy[1],!0)._lazy=0)}function pa(t){return!!(t._initted||t._startAt||t.add)}function qa(t,e,r,i){pt.length&&!I&&oa(),t.render(e,r,i||!!(I&&e<0&&pa(t))),pt.length&&!I&&oa()}function ra(t){var e=parseFloat(t);return(e||0===e)&&(t+"").match(ot).length<2?e:r(t)?t.trim():t}function sa(t){return t}function ta(t,e){for(var r in e)r in t||(t[r]=e[r]);return t}function wa(t,e){for(var r in e)"__proto__"!==r&&"constructor"!==r&&"prototype"!==r&&(t[r]=v(e[r])?wa(t[r]||(t[r]={}),e[r]):e[r]);return t}function xa(t,e){var r,i={};for(r in t)r in e||(i[r]=t[r]);return i}function ya(t){var e=t.parent||L,r=t.keyframes?function _setKeyframeDefaults(i){return function(t,e){for(var r in e)r in t||"duration"===r&&i||"ease"===r||(t[r]=e[r])}}(K(t.keyframes)):ta;if(w(t.inherit))for(;e;)r(t,e.vars.defaults),e=e.parent||e._dp;return t}function Aa(t,e,r,i,n){void 0===r&&(r="_first"),void 0===i&&(i="_last");var a,s=t[i];if(n)for(a=e[n];s&&s[n]>a;)s=s._prev;return s?(e._next=s._next,s._next=e):(e._next=t[r],t[r]=e),e._next?e._next._prev=e:t[i]=e,e._prev=s,e.parent=e._dp=t,e}function Ba(t,e,r,i){void 0===r&&(r="_first"),void 0===i&&(i="_last");var n=e._prev,a=e._next;n?n._next=a:t[r]===e&&(t[r]=a),a?a._prev=n:t[i]===e&&(t[i]=n),e._next=e._prev=e.parent=null}function Ca(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0}function Da(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var r=t;r;)r._dirty=1,r=r.parent;return t}function Fa(t,e,r,i){return t._startAt&&(I?t._startAt.revert(ft):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))}function Ha(t){return t._repeat?wt(t._tTime,t=t.duration()+t._rDelay)*t:0}function Ja(t,e){return(t-e._start)*e._ts+(0<=e._ts?0:e._dirty?e.totalDuration():e._tDur)}function Ka(t){return t._end=la(t._start+(t._tDur/Math.abs(t._ts||t._rts||q)||0))}function La(t,e){var r=t._dp;return r&&r.smoothChildTiming&&t._ts&&(t._start=la(r._time-(0<t._ts?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Ka(t),r._dirty||Da(r,t)),t}function Ma(t,e){var r;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(r=Ja(t.rawTime(),e),(!e._dur||Mt(0,e.totalDuration(),r)-e._tTime>q)&&e.render(r,!0)),Da(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(r=t;r._dp;)0<=r.rawTime()&&r.totalTime(r._tTime),r=r._dp;t._zTime=-q}}function Na(e,r,i,n){return r.parent&&Ca(r),r._start=la((t(i)?i:i||e!==L?Ot(e,i,r):e._time)+r._delay),r._end=la(r._start+(r.totalDuration()/Math.abs(r.timeScale())||0)),Aa(e,r,"_first","_last",e._sort?"_start":0),xt(r)||(e._recent=r),n||Ma(e,r),e._ts<0&&La(e,e._tTime),e}function Oa(t,e){return(ht.ScrollTrigger||S("scrollTrigger",e))&&ht.ScrollTrigger.create(e,t)}function Pa(t,e,r,i,n){return Ht(t,e,n),t._initted?!r&&t._pt&&!I&&(t._dur&&!1!==t.vars.lazy||!t._dur&&t.vars.lazy)&&f!==It.frame?(pt.push(t),t._lazy=[n,i],1):void 0:1}function Ua(t,e,r,i){var n=t._repeat,a=la(e)||0,s=t._tTime/t._tDur;return s&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=n?n<0?1e10:la(a*(n+1)+t._rDelay*n):a,0<s&&!i&&La(t,t._tTime=t._tDur*s),t.parent&&Ka(t),r||Da(t.parent,t),t}function Va(t){return t instanceof Gt?Da(t):Ua(t,t._dur)}function Ya(e,r,i){var n,a,s=t(r[1]),o=(s?2:1)+(e<2?0:1),u=r[o];if(s&&(u.duration=r[1]),u.parent=i,e){for(n=u,a=i;a&&!("immediateRender"in n);)n=a.vars.defaults||{},a=w(a.vars.inherit)&&a.parent;u.immediateRender=w(n.immediateRender),e<2?u.runBackwards=1:u.startAt=r[o-1]}return new te(r[0],u,r[1+o])}function Za(t,e){return t||0===t?e(t):e}function _a(t,e){return r(t)&&(e=ut.exec(t))?e[1]:""}function cb(t,e){return t&&v(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&v(t[0]))&&!t.nodeType&&t!==h}function fb(r){return r=Pt(r)[0]||T("Invalid scope")||{},function(t){var e=r.current||r.nativeElement||r;return Pt(t,e.querySelectorAll?e:e===r?T("Invalid scope")||a.createElement("div"):r)}}function gb(t){return t.sort(function(){return.5-Math.random()})}function hb(t){if(s(t))return t;var p=v(t)?t:{each:t},_=jt(p.ease),m=p.from||0,g=parseFloat(p.base)||0,y={},e=0<m&&m<1,T=isNaN(m)||e,b=p.axis,w=m,x=m;return r(m)?w=x={center:.5,edges:.5,end:1}[m]||0:!e&&T&&(w=m[0],x=m[1]),function(t,e,r){var i,n,a,s,o,u,h,l,f,c=(r||p).length,d=y[c];if(!d){if(!(f="auto"===p.grid?0:(p.grid||[1,X])[1])){for(h=-X;h<(h=r[f++].getBoundingClientRect().left)&&f<c;);f<c&&f--}for(d=y[c]=[],i=T?Math.min(f,c)*w-.5:m%f,n=f===X?0:T?c*x/f-.5:m/f|0,l=X,u=h=0;u<c;u++)a=u%f-i,s=n-(u/f|0),d[u]=o=b?Math.abs("y"===b?s:a):$(a*a+s*s),h<o&&(h=o),o<l&&(l=o);"random"===m&&gb(d),d.max=h-l,d.min=l,d.v=c=(parseFloat(p.amount)||parseFloat(p.each)*(c<f?c-1:b?"y"===b?c/f:f:Math.max(f,c/f))||0)*("edges"===m?-1:1),d.b=c<0?g-c:g,d.u=_a(p.amount||p.each)||0,_=_&&c<0?Yt(_):_}return c=(d[t]-d.min)/d.max||0,la(d.b+(_?_(c):c)*d.v)+d.u}}function ib(i){var n=Math.pow(10,((i+"").split(".")[1]||"").length);return function(e){var r=la(Math.round(parseFloat(e)/i)*i*n);return(r-r%1)/n+(t(e)?0:_a(e))}}function jb(h,e){var l,f,r=K(h);return!r&&v(h)&&(l=r=h.radius||X,h.values?(h=Pt(h.values),(f=!t(h[0]))&&(l*=l)):h=ib(h.increment)),Za(e,r?s(h)?function(t){return f=h(t),Math.abs(f-t)<=l?f:t}:function(e){for(var r,i,n=parseFloat(f?e.x:e),a=parseFloat(f?e.y:0),s=X,o=0,u=h.length;u--;)(r=f?(r=h[u].x-n)*r+(i=h[u].y-a)*i:Math.abs(h[u]-n))<s&&(s=r,o=u);return o=!l||s<=l?h[o]:e,f||o===e||t(e)?o:o+_a(e)}:ib(h))}function kb(t,e,r,i){return Za(K(t)?!e:!0===r?!!(r=0):!i,function(){return K(t)?t[~~(Math.random()*t.length)]:(r=r||1e-5)&&(i=r<1?Math.pow(10,(r+"").length-2):1)&&Math.floor(Math.round((t-r/2+Math.random()*(e-t+.99*r))/r)*r*i)/i})}function ob(e,r,t){return Za(t,function(t){return e[~~r(t)]})}function rb(t){return t.replace(tt,function(t){var e=t.indexOf("[")+1,r=t.substring(e||7,e?t.indexOf("]"):t.length-1).split(et);return kb(e?r:+r[0],e?0:+r[1],+r[2]||1e-5)})}function ub(t,e,r){var i,n,a,s=t.labels,o=X;for(i in s)(n=s[i]-e)<0==!!r&&n&&o>(n=Math.abs(n))&&(a=i,o=n);return a}function wb(t){return Ca(t),t.scrollTrigger&&t.scrollTrigger.kill(!!I),t.progress()<1&&At(t,"onInterrupt"),t}function zb(t){if(t)if(t=!t.name&&t.default||t,x()||t.headless){var e=t.name,r=s(t),i=e&&!r&&t.init?function(){this._props=[]}:t,n={init:V,render:_e,add:$t,kill:Te,modifier:ve,rawVars:0},a={targetTest:0,get:0,getSetter:ue,aliases:{},register:0};if(Lt(),t!==i){if(mt[e])return;ta(i,ta(xa(t,n),a)),bt(i.prototype,bt(n,xa(t,a))),mt[i.prop=e]=i,t.targetTest&&(yt.push(i),dt[e]=1),e=("css"===e?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}U(e,i),t.register&&t.register(Fe,i,we)}else Dt.push(t)}function Cb(t,e,r){return(6*(t+=t<0?1:1<t?-1:0)<1?e+(r-e)*t*6:t<.5?r:3*t<2?e+(r-e)*(2/3-t)*6:e)*zt+.5|0}function Db(e,r,i){var n,a,s,o,u,h,l,f,c,d,p=e?t(e)?[e>>16,e>>8&zt,e&zt]:0:Rt.black;if(!p){if(","===e.substr(-1)&&(e=e.substr(0,e.length-1)),Rt[e])p=Rt[e];else if("#"===e.charAt(0)){if(e.length<6&&(e="#"+(n=e.charAt(1))+n+(a=e.charAt(2))+a+(s=e.charAt(3))+s+(5===e.length?e.charAt(4)+e.charAt(4):"")),9===e.length)return[(p=parseInt(e.substr(1,6),16))>>16,p>>8&zt,p&zt,parseInt(e.substr(7),16)/255];p=[(e=parseInt(e.substr(1),16))>>16,e>>8&zt,e&zt]}else if("hsl"===e.substr(0,3))if(p=d=e.match(rt),r){if(~e.indexOf("="))return p=e.match(it),i&&p.length<4&&(p[3]=1),p}else o=+p[0]%360/360,u=p[1]/100,n=2*(h=p[2]/100)-(a=h<=.5?h*(u+1):h+u-h*u),3<p.length&&(p[3]*=1),p[0]=Cb(o+1/3,n,a),p[1]=Cb(o,n,a),p[2]=Cb(o-1/3,n,a);else p=e.match(rt)||Rt.transparent;p=p.map(Number)}return r&&!d&&(n=p[0]/zt,a=p[1]/zt,s=p[2]/zt,h=((l=Math.max(n,a,s))+(f=Math.min(n,a,s)))/2,l===f?o=u=0:(c=l-f,u=.5<h?c/(2-l-f):c/(l+f),o=l===n?(a-s)/c+(a<s?6:0):l===a?(s-n)/c+2:(n-a)/c+4,o*=60),p[0]=~~(o+.5),p[1]=~~(100*u+.5),p[2]=~~(100*h+.5)),i&&p.length<4&&(p[3]=1),p}function Eb(t){var r=[],i=[],n=-1;return t.split(Et).forEach(function(t){var e=t.match(nt)||[];r.push.apply(r,e),i.push(n+=e.length+1)}),r.c=i,r}function Fb(t,e,r){var i,n,a,s,o="",u=(t+o).match(Et),h=e?"hsla(":"rgba(",l=0;if(!u)return t;if(u=u.map(function(t){return(t=Db(t,e,1))&&h+(e?t[0]+","+t[1]+"%,"+t[2]+"%,"+t[3]:t.join(","))+")"}),r&&(a=Eb(t),(i=r.c).join(o)!==a.c.join(o)))for(s=(n=t.replace(Et,"1").split(nt)).length-1;l<s;l++)o+=n[l]+(~i.indexOf(l)?u.shift()||h+"0,0,0,0)":(a.length?a:u.length?u:r).shift());if(!n)for(s=(n=t.split(Et)).length-1;l<s;l++)o+=n[l]+u[l];return o+n[s]}function Ib(t){var e,r=t.join(" ");if(Et.lastIndex=0,Et.test(r))return e=Ft.test(r),t[1]=Fb(t[1],e),t[0]=Fb(t[0],e,Eb(t[1])),!0}function Rb(t){var e=(t+"").split("("),r=Bt[e[0]];return r&&1<e.length&&r.config?r.config.apply(null,~t.indexOf("{")?[function _parseObjectInString(t){for(var e,r,i,n={},a=t.substr(1,t.length-3).split(":"),s=a[0],o=1,u=a.length;o<u;o++)r=a[o],e=o!==u-1?r.lastIndexOf(","):r.length,i=r.substr(0,e),n[s]=isNaN(i)?i.replace(Ut,"").trim():+i,s=r.substr(e+1).trim();return n}(e[1])]:function _valueInParentheses(t){var e=t.indexOf("(")+1,r=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<r?t.indexOf(")",r+1):r)}(t).split(",").map(ra)):Bt._CE&&Nt.test(t)?Bt._CE("",t):r}function Ub(t,e,r,i){void 0===r&&(r=function easeOut(t){return 1-e(1-t)}),void 0===i&&(i=function easeInOut(t){return t<.5?e(2*t)/2:1-e(2*(1-t))/2});var n,a={easeIn:e,easeOut:r,easeInOut:i};return ja(t,function(t){for(var e in Bt[t]=ht[t]=a,Bt[n=t.toLowerCase()]=r,a)Bt[n+("easeIn"===e?".in":"easeOut"===e?".out":".inOut")]=Bt[t+"."+e]=a[e]}),a}function Vb(e){return function(t){return t<.5?(1-e(1-2*t))/2:.5+e(2*(t-.5))/2}}function Wb(r,t,e){function Gm(t){return 1===t?1:i*Math.pow(2,-10*t)*Q((t-a)*n)+1}var i=1<=t?t:1,n=(e||(r?.3:.45))/(t<1?t:1),a=n/G*(Math.asin(1/i)||0),s="out"===r?Gm:"in"===r?function(t){return 1-Gm(1-t)}:Vb(Gm);return n=G/n,s.config=function(t,e){return Wb(r,t,e)},s}function Xb(e,r){function Om(t){return t?--t*t*((r+1)*t+r)+1:0}void 0===r&&(r=1.70158);var t="out"===e?Om:"in"===e?function(t){return 1-Om(1-t)}:Vb(Om);return t.config=function(t){return Xb(e,t)},t}var F,I,l,L,h,n,a,i,o,f,c,d,p,_,m,g,b,k,O,M,C,P,A,D,z,E,B,N,Y={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},j={duration:.5,overwrite:!1,delay:0},X=1e8,q=1/X,G=2*Math.PI,Z=G/4,W=0,$=Math.sqrt,H=Math.cos,Q=Math.sin,J="function"==typeof ArrayBuffer&&ArrayBuffer.isView||function(){},K=Array.isArray,tt=/random\([^)]+\)/g,et=/,\s*/g,rt=/(?:-?\.?\d|\.)+/gi,it=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,nt=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,at=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,st=/[+-]=-?[.\d]+/,ot=/[^,'"\[\]\s]+/gi,ut=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ht={},lt={suppressEvents:!0,isStart:!0,kill:!1},ft={suppressEvents:!0,kill:!1},ct={suppressEvents:!0},dt={},pt=[],_t={},mt={},gt={},vt=30,yt=[],Tt="",bt=function _merge(t,e){for(var r in e)t[r]=e[r];return t},wt=function _animationCycle(t,e){var r=Math.floor(t=la(t/e));return t&&r===t?r-1:r},xt=function _isFromOrFromStart(t){var e=t.data;return"isFromStart"===e||"isStart"===e},kt={_start:0,endTime:V,totalDuration:V},Ot=function _parsePosition(t,e,i){var n,a,s,o=t.labels,u=t._recent||kt,h=t.duration()>=X?u.endTime(!1):t._dur;return r(e)&&(isNaN(e)||e in o)?(a=e.charAt(0),s="%"===e.substr(-1),n=e.indexOf("="),"<"===a||">"===a?(0<=n&&(e=e.replace(/=/,"")),("<"===a?u._start:u.endTime(0<=u._repeat))+(parseFloat(e.substr(1))||0)*(s?(n<0?u:i).totalDuration()/100:1)):n<0?(e in o||(o[e]=h),o[e]):(a=parseFloat(e.charAt(n-1)+e.substr(n+1)),s&&i&&(a=a/100*(K(i)?i[0]:i).totalDuration()),1<n?_parsePosition(t,e.substr(0,n-1),i)+a:h+a)):null==e?h:+e},Mt=function _clamp(t,e,r){return r<t?t:e<r?e:r},Ct=[].slice,Pt=function toArray(t,e,i){return l&&!e&&l.selector?l.selector(t):!r(t)||i||!n&&Lt()?K(t)?function _flatten(t,e,i){return void 0===i&&(i=[]),t.forEach(function(t){return r(t)&&!e||cb(t,1)?i.push.apply(i,Pt(t)):i.push(t)})||i}(t,i):cb(t)?Ct.call(t,0):t?[t]:[]:Ct.call((e||a).querySelectorAll(t),0)},St=function mapRange(e,t,r,i,n){var a=t-e,s=i-r;return Za(n,function(t){return r+((t-e)/a*s||0)})},At=function _callback(t,e,r){var i,n,a,s=t.vars,o=s[e],u=l,h=t._ctx;if(o)return i=s[e+"Params"],n=s.callbackScope||t,r&&pt.length&&oa(),h&&(l=h),a=i?o.apply(n,i):o.call(n),l=u,a},Dt=[],zt=255,Rt={aqua:[0,zt,zt],lime:[0,zt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,zt],navy:[0,0,128],white:[zt,zt,zt],olive:[128,128,0],yellow:[zt,zt,0],orange:[zt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[zt,0,0],pink:[zt,192,203],cyan:[0,zt,zt],transparent:[zt,zt,zt,0]},Et=function(){var t,e="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";for(t in Rt)e+="|"+t+"\\b";return new RegExp(e+")","gi")}(),Ft=/hsl[a]?\(/,It=(O=Date.now,M=500,C=33,P=O(),A=P,z=D=1e3/240,g={time:0,frame:0,tick:function tick(){zl(!0)},deltaRatio:function deltaRatio(t){return b/(1e3/(t||60))},wake:function wake(){o&&(!n&&x()&&(h=n=window,a=h.document||{},ht.gsap=Fe,(h.gsapVersions||(h.gsapVersions=[])).push(Fe.version),R(i||h.GreenSockGlobals||!h.gsap&&h||{}),Dt.forEach(zb)),m="undefined"!=typeof requestAnimationFrame&&requestAnimationFrame,p&&g.sleep(),_=m||function(t){return setTimeout(t,z-1e3*g.time+1|0)},d=1,zl(2))},sleep:function sleep(){(m?cancelAnimationFrame:clearTimeout)(p),d=0,_=V},lagSmoothing:function lagSmoothing(t,e){M=t||1/0,C=Math.min(e||33,M)},fps:function fps(t){D=1e3/(t||240),z=1e3*g.time+D},add:function add(n,t,e){var a=t?function(t,e,r,i){n(t,e,r,i),g.remove(a)}:n;return g.remove(n),E[e?"unshift":"push"](a),Lt(),a},remove:function remove(t,e){~(e=E.indexOf(t))&&E.splice(e,1)&&e<=k&&k--},_listeners:E=[]}),Lt=function _wake(){return!d&&It.wake()},Bt={},Nt=/^[\d.\-M][\d.\-,\s]/,Ut=/["']/g,Yt=function _invertEase(e){return function(t){return 1-e(1-t)}},jt=function _parseEase(t,e){return t&&(s(t)?t:Bt[t]||Rb(t))||e};function zl(t){var e,r,i,n,a=O()-A,s=!0===t;if((M<a||a<0)&&(P+=a-C),(0<(e=(i=(A+=a)-P)-z)||s)&&(n=++g.frame,b=i-1e3*g.time,g.time=i/=1e3,z+=e+(D<=e?4:D-e),r=1),s||(p=_(zl)),r)for(k=0;k<E.length;k++)E[k](i,b,n,t)}function dn(t){return t<N?B*t*t:t<.7272727272727273?B*Math.pow(t-1.5/2.75,2)+.75:t<.9090909090909092?B*(t-=2.25/2.75)*t+.9375:B*Math.pow(t-2.625/2.75,2)+.984375}ja("Linear,Quad,Cubic,Quart,Quint,Strong",function(t,e){var r=e<5?e+1:e;Ub(t+",Power"+(r-1),e?function(t){return Math.pow(t,r)}:function(t){return t},function(t){return 1-Math.pow(1-t,r)},function(t){return t<.5?Math.pow(2*t,r)/2:1-Math.pow(2*(1-t),r)/2})}),Bt.Linear.easeNone=Bt.none=Bt.Linear.easeIn,Ub("Elastic",Wb("in"),Wb("out"),Wb()),B=7.5625,N=1/2.75,Ub("Bounce",function(t){return 1-dn(1-t)},dn),Ub("Expo",function(t){return Math.pow(2,10*(t-1))*t+t*t*t*t*t*t*(1-t)}),Ub("Circ",function(t){return-($(1-t*t)-1)}),Ub("Sine",function(t){return 1===t?1:1-H(t*Z)}),Ub("Back",Xb("in"),Xb("out"),Xb()),Bt.SteppedEase=Bt.steps=ht.SteppedEase={config:function config(t,e){void 0===t&&(t=1);var r=1/t,i=t+(e?0:1),n=e?1:0;return function(t){return((i*Mt(0,.99999999,t)|0)+n)*r}}},j.ease=Bt["quad.out"],ja("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(t){return Tt+=t+","+t+"Params,"});var Vt,Xt=function GSCache(t,e){this.id=W++,(t._gsap=this).target=t,this.harness=e,this.get=e?e.get:ia,this.set=e?e.getSetter:ue},qt=((Vt=Animation.prototype).delay=function delay(t){return t||0===t?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+t-this._delay),this._delay=t,this):this._delay},Vt.duration=function duration(t){return arguments.length?this.totalDuration(0<this._repeat?t+(t+this._rDelay)*this._repeat:t):this.totalDuration()&&this._dur},Vt.totalDuration=function totalDuration(t){return arguments.length?(this._dirty=0,Ua(this,this._repeat<0?t:(t-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},Vt.totalTime=function totalTime(t,e){if(Lt(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(La(this,t),!r._dp||r.parent||Ma(r,this);r&&r.parent;)r.parent._time!==r._start+(0<=r._ts?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(0<this._ts&&t<this._tDur||this._ts<0&&0<t||!this._tDur&&!t)&&Na(this._dp,this,this._start-this._delay)}return(this._tTime!==t||!this._dur&&!e||this._initted&&Math.abs(this._zTime)===q||!this._initted&&this._dur&&t||!t&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=t),qa(this,t,e)),this},Vt.time=function time(t,e){return arguments.length?this.totalTime(Math.min(this.totalDuration(),t+Ha(this))%(this._dur+this._rDelay)||(t?this._dur:0),e):this._time},Vt.totalProgress=function totalProgress(t,e){return arguments.length?this.totalTime(this.totalDuration()*t,e):this.totalDuration()?Math.min(1,this._tTime/this._tDur):0<=this.rawTime()&&this._initted?1:0},Vt.progress=function progress(t,e){return arguments.length?this.totalTime(this.duration()*(!this._yoyo||1&this.iteration()?t:1-t)+Ha(this),e):this.duration()?Math.min(1,this._time/this._dur):0<this.rawTime()?1:0},Vt.iteration=function iteration(t,e){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(t-1)*r,e):this._repeat?wt(this._tTime,r)+1:1},Vt.timeScale=function timeScale(t,e){if(!arguments.length)return this._rts===-q?0:this._rts;if(this._rts===t)return this;var r=this.parent&&this._ts?Ja(this.parent._time,this):this._tTime;return this._rts=+t||0,this._ts=this._ps||t===-q?0:this._rts,this.totalTime(Mt(-Math.abs(this._delay),this.totalDuration(),r),!1!==e),Ka(this),function _recacheAncestors(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t}(this)},Vt.paused=function paused(t){return arguments.length?(this._ps!==t&&((this._ps=t)?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Lt(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,1===this.progress()&&Math.abs(this._zTime)!==q&&(this._tTime-=q)))),this):this._ps},Vt.startTime=function startTime(t){if(arguments.length){this._start=la(t);var e=this.parent||this._dp;return!e||!e._sort&&this.parent||Na(e,this,this._start-this._delay),this}return this._start},Vt.endTime=function endTime(t){return this._start+(w(t)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},Vt.rawTime=function rawTime(t){var e=this.parent||this._dp;return e?t&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ja(e.rawTime(t),this):this._tTime:this._tTime},Vt.revert=function revert(t){void 0===t&&(t=ct);var e=I;return I=t,pa(this)&&(this.timeline&&this.timeline.revert(t),this.totalTime(-.01,t.suppressEvents)),"nested"!==this.data&&!1!==t.kill&&this.kill(),I=e,this},Vt.globalTime=function globalTime(t){for(var e=this,r=arguments.length?t:e.rawTime();e;)r=e._start+r/(Math.abs(e._ts)||1),e=e._dp;return!this.parent&&this._sat?this._sat.globalTime(t):r},Vt.repeat=function repeat(t){return arguments.length?(this._repeat=t===1/0?-2:t,Va(this)):-2===this._repeat?1/0:this._repeat},Vt.repeatDelay=function repeatDelay(t){if(arguments.length){var e=this._time;return this._rDelay=t,Va(this),e?this.time(e):this}return this._rDelay},Vt.yoyo=function yoyo(t){return arguments.length?(this._yoyo=t,this):this._yoyo},Vt.seek=function seek(t,e){return this.totalTime(Ot(this,t),w(e))},Vt.restart=function restart(t,e){return this.play().totalTime(t?-this._delay:0,w(e)),this._dur||(this._zTime=-q),this},Vt.play=function play(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},Vt.reverse=function reverse(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},Vt.pause=function pause(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},Vt.resume=function resume(){return this.paused(!1)},Vt.reversed=function reversed(t){return arguments.length?(!!t!==this.reversed()&&this.timeScale(-this._rts||(t?-q:0)),this):this._rts<0},Vt.invalidate=function invalidate(){return this._initted=this._act=0,this._zTime=-q,this},Vt.isActive=function isActive(){var t,e=this.parent||this._dp,r=this._start;return!(e&&!(this._ts&&this._initted&&e.isActive()&&(t=e.rawTime(!0))>=r&&t<this.endTime(!0)-q))},Vt.eventCallback=function eventCallback(t,e,r){var i=this.vars;return 1<arguments.length?(e?(i[t]=e,r&&(i[t+"Params"]=r),"onUpdate"===t&&(this._onUpdate=e)):delete i[t],this):i[t]},Vt.then=function then(t){var i=this,n=i._prom;return new Promise(function(e){function Ao(){var t=i.then;i.then=null,n&&n(),s(r)&&(r=r(i))&&(r.then||r===i)&&(i.then=t),e(r),i.then=t}var r=s(t)?t:sa;i._initted&&1===i.totalProgress()&&0<=i._ts||!i._tTime&&i._ts<0?Ao():i._prom=Ao})},Vt.kill=function kill(){wb(this)},Animation);function Animation(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Ua(this,+t.duration,1,1),this.data=t.data,l&&(this._ctx=l).data.push(this),d||It.wake()}ta(qt.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-q,_prom:0,_ps:!1,_rts:1});var Gt=function(i){function Timeline(t,e){var r;return void 0===t&&(t={}),(r=i.call(this,t)||this).labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=w(t.sortChildren),L&&Na(t.parent||L,_assertThisInitialized(r),e),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&Oa(_assertThisInitialized(r),t.scrollTrigger),r}_inheritsLoose(Timeline,i);var e=Timeline.prototype;return e.to=function to(t,e,r){return Ya(0,arguments,this),this},e.from=function from(t,e,r){return Ya(1,arguments,this),this},e.fromTo=function fromTo(t,e,r,i){return Ya(2,arguments,this),this},e.set=function set(t,e,r){return e.duration=0,e.parent=this,ya(e).repeatDelay||(e.repeat=0),e.immediateRender=!!e.immediateRender,new te(t,e,Ot(this,r),1),this},e.call=function call(t,e,r){return Na(this,te.delayedCall(0,t,e),r)},e.staggerTo=function staggerTo(t,e,r,i,n,a,s){return r.duration=e,r.stagger=r.stagger||i,r.onComplete=a,r.onCompleteParams=s,r.parent=this,new te(t,r,Ot(this,n)),this},e.staggerFrom=function staggerFrom(t,e,r,i,n,a,s){return r.runBackwards=1,ya(r).immediateRender=w(r.immediateRender),this.staggerTo(t,e,r,i,n,a,s)},e.staggerFromTo=function staggerFromTo(t,e,r,i,n,a,s,o){return i.startAt=r,ya(i).immediateRender=w(i.immediateRender),this.staggerTo(t,e,i,n,a,s,o)},e.render=function render(t,e,r){var i,n,a,s,o,u,h,l,f,c,d,p,_=this._time,m=this._dirty?this.totalDuration():this._tDur,g=this._dur,v=t<=0?0:la(t),y=this._zTime<0!=t<0&&(this._initted||!g);if(this!==L&&m<v&&0<=t&&(v=m),v!==this._tTime||r||y){if(_!==this._time&&g&&(v+=this._time-_,t+=this._time-_),i=v,f=this._start,u=!(l=this._ts),y&&(g||(_=this._zTime),!t&&e||(this._zTime=t)),this._repeat){if(d=this._yoyo,o=g+this._rDelay,this._repeat<-1&&t<0)return this.totalTime(100*o+t,e,r);if(i=la(v%o),v===m?(s=this._repeat,i=g):((s=~~(c=la(v/o)))&&s===c&&(i=g,s--),g<i&&(i=g)),c=wt(this._tTime,o),!_&&this._tTime&&c!==s&&this._tTime-c*o-this._dur<=0&&(c=s),d&&1&s&&(i=g-i,p=1),s!==c&&!this._lock){var T=d&&1&c,b=T===(d&&1&s);if(s<c&&(T=!T),_=T?0:v%g?g:v,this._lock=1,this.render(_||(p?0:la(s*o)),e,!g)._lock=0,this._tTime=v,!e&&this.parent&&At(this,"onRepeat"),this.vars.repeatRefresh&&!p&&(this.invalidate()._lock=1,c=s),_&&_!==this._time||u!=!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(g=this._dur,m=this._tDur,b&&(this._lock=2,_=T?g:-1e-4,this.render(_,!0),this.vars.repeatRefresh&&!p&&this.invalidate()),this._lock=0,!this._ts&&!u)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(h=function _findNextPauseTween(t,e,r){var i;if(e<r)for(i=t._first;i&&i._start<=r;){if("isPause"===i.data&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=r;){if("isPause"===i.data&&i._start<e)return i;i=i._prev}}(this,la(_),la(i)))&&(v-=i-(i=h._start)),this._tTime=v,this._time=i,this._act=!!l,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=t,_=0),!_&&v&&g&&!e&&!c&&(At(this,"onStart"),this._tTime!==v))return this;if(_<=i&&0<=t)for(n=this._first;n;){if(a=n._next,(n._act||i>=n._start)&&n._ts&&h!==n){if(n.parent!==this)return this.render(t,e,r);if(n.render(0<n._ts?(i-n._start)*n._ts:(n._dirty?n.totalDuration():n._tDur)+(i-n._start)*n._ts,e,r),i!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=-q);break}}n=a}else{n=this._last;for(var w=t<0?t:i;n;){if(a=n._prev,(n._act||w<=n._end)&&n._ts&&h!==n){if(n.parent!==this)return this.render(t,e,r);if(n.render(0<n._ts?(w-n._start)*n._ts:(n._dirty?n.totalDuration():n._tDur)+(w-n._start)*n._ts,e,r||I&&pa(n)),i!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=w?-q:q);break}}n=a}}if(h&&!e&&(this.pause(),h.render(_<=i?0:-q)._zTime=_<=i?1:-1,this._ts))return this._start=f,Ka(this),this.render(t,e,r);this._onUpdate&&!e&&At(this,"onUpdate",!0),(v===m&&this._tTime>=this.totalDuration()||!v&&_)&&(f!==this._start&&Math.abs(l)===Math.abs(this._ts)||this._lock||(!t&&g||!(v===m&&0<this._ts||!v&&this._ts<0)||Ca(this,1),e||t<0&&!_||!v&&!_&&m||(At(this,v===m&&0<=t?"onComplete":"onReverseComplete",!0),!this._prom||v<m&&0<this.timeScale()||this._prom())))}return this},e.add=function add(e,i){var n=this;if(t(i)||(i=Ot(this,i,e)),!(e instanceof qt)){if(K(e))return e.forEach(function(t){return n.add(t,i)}),this;if(r(e))return this.addLabel(e,i);if(!s(e))return this;e=te.delayedCall(0,e)}return this!==e?Na(this,e,i):this},e.getChildren=function getChildren(t,e,r,i){void 0===t&&(t=!0),void 0===e&&(e=!0),void 0===r&&(r=!0),void 0===i&&(i=-X);for(var n=[],a=this._first;a;)a._start>=i&&(a instanceof te?e&&n.push(a):(r&&n.push(a),t&&n.push.apply(n,a.getChildren(!0,e,r)))),a=a._next;return n},e.getById=function getById(t){for(var e=this.getChildren(1,1,1),r=e.length;r--;)if(e[r].vars.id===t)return e[r]},e.remove=function remove(t){return r(t)?this.removeLabel(t):s(t)?this.killTweensOf(t):(t.parent===this&&Ba(this,t),t===this._recent&&(this._recent=this._last),Da(this))},e.totalTime=function totalTime(t,e){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=la(It.time-(0<this._ts?t/this._ts:(this.totalDuration()-t)/-this._ts))),i.prototype.totalTime.call(this,t,e),this._forcing=0,this):this._tTime},e.addLabel=function addLabel(t,e){return this.labels[t]=Ot(this,e),this},e.removeLabel=function removeLabel(t){return delete this.labels[t],this},e.addPause=function addPause(t,e,r){var i=te.delayedCall(0,e||V,r);return i.data="isPause",this._hasPause=1,Na(this,i,Ot(this,t))},e.removePause=function removePause(t){var e=this._first;for(t=Ot(this,t);e;)e._start===t&&"isPause"===e.data&&Ca(e),e=e._next},e.killTweensOf=function killTweensOf(t,e,r){for(var i=this.getTweensOf(t,r),n=i.length;n--;)Zt!==i[n]&&i[n].kill(t,e);return this},e.getTweensOf=function getTweensOf(e,r){for(var i,n=[],a=Pt(e),s=this._first,o=t(r);s;)s instanceof te?na(s._targets,a)&&(o?(!Zt||s._initted&&s._ts)&&s.globalTime(0)<=r&&s.globalTime(s.totalDuration())>r:!r||s.isActive())&&n.push(s):(i=s.getTweensOf(a,r)).length&&n.push.apply(n,i),s=s._next;return n},e.tweenTo=function tweenTo(t,e){e=e||{};var r,i=this,n=Ot(i,t),a=e.startAt,s=e.onStart,o=e.onStartParams,u=e.immediateRender,h=te.to(i,ta({ease:e.ease||"none",lazy:!1,immediateRender:!1,time:n,overwrite:"auto",duration:e.duration||Math.abs((n-(a&&"time"in a?a.time:i._time))/i.timeScale())||q,onStart:function onStart(){if(i.pause(),!r){var t=e.duration||Math.abs((n-(a&&"time"in a?a.time:i._time))/i.timeScale());h._dur!==t&&Ua(h,t,0,1).render(h._time,!0,!0),r=1}s&&s.apply(h,o||[])}},e));return u?h.render(0):h},e.tweenFromTo=function tweenFromTo(t,e,r){return this.tweenTo(e,ta({startAt:{time:Ot(this,t)}},r))},e.recent=function recent(){return this._recent},e.nextLabel=function nextLabel(t){return void 0===t&&(t=this._time),ub(this,Ot(this,t))},e.previousLabel=function previousLabel(t){return void 0===t&&(t=this._time),ub(this,Ot(this,t),1)},e.currentLabel=function currentLabel(t){return arguments.length?this.seek(t,!0):this.previousLabel(this._time+q)},e.shiftChildren=function shiftChildren(t,e,r){void 0===r&&(r=0);var i,n=this._first,a=this.labels;for(t=la(t);n;)n._start>=r&&(n._start+=t,n._end+=t),n=n._next;if(e)for(i in a)a[i]>=r&&(a[i]+=t);return Da(this)},e.invalidate=function invalidate(t){var e=this._first;for(this._lock=0;e;)e.invalidate(t),e=e._next;return i.prototype.invalidate.call(this,t)},e.clear=function clear(t){void 0===t&&(t=!0);for(var e,r=this._first;r;)e=r._next,this.remove(r),r=e;return this._dp&&(this._time=this._tTime=this._pTime=0),t&&(this.labels={}),Da(this)},e.totalDuration=function totalDuration(t){var e,r,i,n=0,a=this,s=a._last,o=X;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-t:t));if(a._dirty){for(i=a.parent;s;)e=s._prev,s._dirty&&s.totalDuration(),o<(r=s._start)&&a._sort&&s._ts&&!a._lock?(a._lock=1,Na(a,s,r-s._delay,1)._lock=0):o=r,r<0&&s._ts&&(n-=r,(!i&&!a._dp||i&&i.smoothChildTiming)&&(a._start+=la(r/a._ts),a._time-=r,a._tTime-=r),a.shiftChildren(-r,!1,-Infinity),o=0),s._end>n&&s._ts&&(n=s._end),s=e;Ua(a,a===L&&a._time>n?a._time:n,1,1),a._dirty=0}return a._tDur},Timeline.updateRoot=function updateRoot(t){if(L._ts&&(qa(L,Ja(t,L)),f=It.frame),It.frame>=vt){vt+=Y.autoSleep||120;var e=L._first;if((!e||!e._ts)&&Y.autoSleep&&It._listeners.length<2){for(;e&&!e._ts;)e=e._next;e||It.sleep()}}},Timeline}(qt);ta(Gt.prototype,{_lock:0,_hasPause:0,_forcing:0});function cc(t,e,i,n,a,o){var u,h,l,f;if(mt[t]&&!1!==(u=new mt[t]).init(a,u.rawVars?e[t]:function _processVars(t,e,i,n,a){if(s(t)&&(t=Qt(t,a,e,i,n)),!v(t)||t.style&&t.nodeType||K(t)||J(t))return r(t)?Qt(t,a,e,i,n):t;var o,u={};for(o in t)u[o]=Qt(t[o],a,e,i,n);return u}(e[t],n,a,o,i),i,n,o)&&(i._pt=h=new we(i._pt,a,t,0,1,u.render,u,0,u.priority),i!==c))for(l=i._ptLookup[i._targets.indexOf(a)],f=u._props.length;f--;)l[u._props[f]]=h;return u}function ic(t,r,e,i){var n,a,s=r.ease||i||"power1.inOut";if(K(r))a=e[t]||(e[t]=[]),r.forEach(function(t,e){return a.push({t:e/(r.length-1)*100,v:t,e:s})});else for(n in r)a=e[n]||(e[n]=[]),"ease"===n||a.push({t:parseFloat(t),v:r[n],e:s})}var Zt,Wt,$t=function _addPropTween(t,e,i,n,a,o,u,h,l,f){s(n)&&(n=n(a||0,t,o));var c,d=t[e],p="get"!==i?i:s(d)?l?t[e.indexOf("set")||!s(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():d,_=s(d)?l?se:ae:ie;if(r(n)&&(~n.indexOf("random(")&&(n=rb(n)),"="===n.charAt(1)&&(!(c=ma(p,n)+(_a(p)||0))&&0!==c||(n=c))),!f||p!==n||Wt)return isNaN(p*n)||""===n?(d||e in t||S(e,n),function _addComplexStringPropTween(t,e,r,i,n,a,s){var o,u,h,l,f,c,d,p,_=new we(this._pt,t,e,0,1,pe,null,n),m=0,g=0;for(_.b=r,_.e=i,r+="",(d=~(i+="").indexOf("random("))&&(i=rb(i)),a&&(a(p=[r,i],t,e),r=p[0],i=p[1]),u=r.match(at)||[];o=at.exec(i);)l=o[0],f=i.substring(m,o.index),h?h=(h+1)%5:"rgba("===f.substr(-5)&&(h=1),l!==u[g++]&&(c=parseFloat(u[g-1])||0,_._pt={_next:_._pt,p:f||1===g?f:",",s:c,c:"="===l.charAt(1)?ma(c,l)-c:parseFloat(l)-c,m:h&&h<4?Math.round:0},m=at.lastIndex);return _.c=m<i.length?i.substring(m,i.length):"",_.fp=s,(st.test(i)||d)&&(_.e=0),this._pt=_}.call(this,t,e,p,n,_,h||Y.stringFilter,l)):(c=new we(this._pt,t,e,+p||0,n-(p||0),"boolean"==typeof d?de:fe,0,_),l&&(c.fp=l),u&&c.modifier(u,this,t),this._pt=c)},Ht=function _initTween(t,e,r){var i,n,a,s,o,u,h,l,f,c,d,p,_,m=t.vars,g=m.ease,v=m.startAt,y=m.immediateRender,T=m.lazy,b=m.onUpdate,x=m.runBackwards,k=m.yoyoEase,O=m.keyframes,M=m.autoRevert,C=t._dur,P=t._startAt,S=t._targets,A=t.parent,D=A&&"nested"===A.data?A.vars.targets:S,z="auto"===t._overwrite&&!F,R=t.timeline,E=m.easeReverse||k;if(!R||O&&g||(g="none"),t._ease=jt(g,j.ease),t._rEase=E&&(jt(E)||t._ease),t._from=!R&&!!m.runBackwards,t._from&&(t.ratio=1),!R||O&&!m.stagger){if(p=(l=S[0]?ha(S[0]).harness:0)&&m[l.prop],i=xa(m,dt),P&&(P._zTime<0&&P.progress(1),e<0&&x&&y&&!M?P.render(-1,!0):P.revert(x&&C?ft:lt),P._lazy=0),v){if(Ca(t._startAt=te.set(S,ta({data:"isStart",overwrite:!1,parent:A,immediateRender:!0,lazy:!P&&w(T),startAt:null,delay:0,onUpdate:b&&function(){return At(t,"onUpdate")},stagger:0},v))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(I||!y&&!M)&&t._startAt.revert(ft),y&&C&&e<=0&&r<=0)return void(e&&(t._zTime=e))}else if(x&&C&&!P)if(e&&(y=!1),a=ta({overwrite:!1,data:"isFromStart",lazy:y&&!P&&w(T),immediateRender:y,stagger:0,parent:A},i),p&&(a[l.prop]=p),Ca(t._startAt=te.set(S,a)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(I?t._startAt.revert(ft):t._startAt.render(-1,!0)),t._zTime=e,y){if(!e)return}else _initTween(t._startAt,q,q);for(t._pt=t._ptCache=0,T=C&&w(T)||T&&!C,n=0;n<S.length;n++){if(h=(o=S[n])._gsap||ga(S)[n]._gsap,t._ptLookup[n]=c={},_t[h.id]&&pt.length&&oa(),d=D===S?n:D.indexOf(o),l&&!1!==(f=new l).init(o,p||i,t,d,D)&&(t._pt=s=new we(t._pt,o,f.name,0,1,f.render,f,0,f.priority),f._props.forEach(function(t){c[t]=s}),f.priority&&(u=1)),!l||p)for(a in i)mt[a]&&(f=cc(a,i,t,d,o,D))?f.priority&&(u=1):c[a]=s=$t.call(t,o,a,"get",i[a],d,D,0,m.stringFilter);t._op&&t._op[n]&&t.kill(o,t._op[n]),z&&t._pt&&(Zt=t,L.killTweensOf(o,c,t.globalTime(e)),_=!t.parent,Zt=0),t._pt&&T&&(_t[h.id]=1)}u&&be(t),t._onInit&&t._onInit(t)}t._onUpdate=b,t._initted=(!t._op||t._pt)&&!_,O&&e<=0&&R.render(X,!0,!0)},Qt=function _parseFuncOrString(t,e,i,n,a){return s(t)?t.call(e,i,n,a):r(t)&&~t.indexOf("random(")?rb(t):t},Jt=Tt+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Kt={};ja(Jt+",id,stagger,delay,duration,paused,scrollTrigger",function(t){return Kt[t]=1});var te=function(E){function Tween(e,r,i,n){var a;"number"==typeof r&&(i.duration=r,r=i,i=null);var s,o,u,h,l,f,c,d,p=(a=E.call(this,n?r:ya(r))||this).vars,_=p.duration,m=p.delay,g=p.immediateRender,b=p.stagger,x=p.overwrite,k=p.keyframes,O=p.defaults,M=p.scrollTrigger,C=r.parent||L,P=(K(e)||J(e)?t(e[0]):"length"in r)?[e]:Pt(e);if(a._targets=P.length?ga(P):T("GSAP target "+e+" not found. https://gsap.com",!Y.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=x,k||b||y(_)||y(m)){var S=(r=a.vars).easeReverse||r.yoyoEase;if((s=a.timeline=new Gt({data:"nested",defaults:O||{},targets:C&&"nested"===C.data?C.vars.targets:P})).kill(),s.parent=s._dp=_assertThisInitialized(a),s._start=0,b||y(_)||y(m)){if(h=P.length,c=b&&hb(b),v(b))for(l in b)~Jt.indexOf(l)&&((d=d||{})[l]=b[l]);for(o=0;o<h;o++)(u=xa(r,Kt)).stagger=0,S&&(u.easeReverse=S),d&&bt(u,d),f=P[o],u.duration=+Qt(_,_assertThisInitialized(a),o,f,P),u.delay=(+Qt(m,_assertThisInitialized(a),o,f,P)||0)-a._delay,!b&&1===h&&u.delay&&(a._delay=m=u.delay,a._start+=m,u.delay=0),s.to(f,u,c?c(o,f,P):0),s._ease=Bt.none;s.duration()?_=m=0:a.timeline=0}else if(k){ya(ta(s.vars.defaults,{ease:"none"})),s._ease=jt(k.ease||r.ease||"none");var A,D,z,R=0;if(K(k))k.forEach(function(t){return s.to(P,t,">")}),s.duration();else{for(l in u={},k)"ease"===l||"easeEach"===l||ic(l,k[l],u,k.easeEach);for(l in u)for(A=u[l].sort(function(t,e){return t.t-e.t}),o=R=0;o<A.length;o++)(z={ease:(D=A[o]).e,duration:(D.t-(o?A[o-1].t:0))/100*_})[l]=D.v,s.to(P,z,R),R+=z.duration;s.duration()<_&&s.to({},{duration:_-s.duration()})}}_||a.duration(_=s.duration())}else a.timeline=0;return!0!==x||F||(Zt=_assertThisInitialized(a),L.killTweensOf(P),Zt=0),Na(C,_assertThisInitialized(a),i),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(g||!_&&!k&&a._start===la(C._time)&&w(g)&&function _hasNoPausedAncestors(t){return!t||t._ts&&_hasNoPausedAncestors(t.parent)}(_assertThisInitialized(a))&&"nested"!==C.data)&&(a._tTime=-q,a.render(Math.max(0,-m)||0)),M&&Oa(_assertThisInitialized(a),M),a}_inheritsLoose(Tween,E);var e=Tween.prototype;return e.render=function render(t,e,r){var i,n,a,s,o,u,h,l,f=this._time,c=this._tDur,d=this._dur,p=t<0,_=c-q<t&&!p?c:t<q?0:t;if(d){if(_!==this._tTime||!t||r||!this._initted&&this._tTime||this._startAt&&this._zTime<0!=p||this._lazy){if(i=_,l=this.timeline,this._repeat){if(s=d+this._rDelay,this._repeat<-1&&p)return this.totalTime(100*s+t,e,r);if(i=la(_%s),_===c?(a=this._repeat,i=d):(a=~~(o=la(_/s)))&&a===o?(i=d,a--):d<i&&(i=d),(u=this._yoyo&&1&a)&&(i=d-i),o=wt(this._tTime,s),i===f&&!r&&this._initted&&a===o)return this._tTime=_,this;a!==o&&this.vars.repeatRefresh&&!u&&!this._lock&&i!==s&&this._initted&&(this._lock=r=1,this.render(la(s*a),!0).invalidate()._lock=0)}if(!this._initted){if(Pa(this,p?t:i,r,e,_))return this._tTime=0,this;if(!(f===this._time||r&&this.vars.repeatRefresh&&a!==o))return this;if(d!==this._dur)return this.render(t,e,r)}if(this._rEase){var m=i<f;if(m!==this._inv){var g=m?f:d-f;this._inv=m,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=f,this._invRecip=g?(m?-1:1)/g:0,this._invScale=m?-this.ratio:1-this.ratio,this._invEase=m?this._rEase:this._ease}this.ratio=h=this._invRatio+this._invScale*this._invEase((i-this._invTime)*this._invRecip)}else this.ratio=h=this._ease(i/d);if(this._from&&(this.ratio=h=1-h),this._tTime=_,this._time=i,!this._act&&this._ts&&(this._act=1,this._lazy=0),!f&&_&&!e&&!o&&(At(this,"onStart"),this._tTime!==_))return this;for(n=this._pt;n;)n.r(h,n.d),n=n._next;l&&l.render(t<0?t:l._dur*l._ease(i/this._dur),e,r)||this._startAt&&(this._zTime=t),this._onUpdate&&!e&&(p&&Fa(this,t,0,r),At(this,"onUpdate")),this._repeat&&a!==o&&this.vars.onRepeat&&!e&&this.parent&&At(this,"onRepeat"),_!==this._tDur&&_||this._tTime!==_||(p&&!this._onUpdate&&Fa(this,t,0,!0),!t&&d||!(_===this._tDur&&0<this._ts||!_&&this._ts<0)||Ca(this,1),e||p&&!f||!(_||f||u)||(At(this,_===c?"onComplete":"onReverseComplete",!0),!this._prom||_<c&&0<this.timeScale()||this._prom()))}}else!function _renderZeroDurationTween(t,e,r,i){var n,a,s,o=t.ratio,u=e<0||!e&&(!t._start&&function _parentPlayheadIsBeforeStart(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||_parentPlayheadIsBeforeStart(e))}(t)&&(t._initted||!xt(t))||(t._ts<0||t._dp._ts<0)&&!xt(t))?0:1,h=t._rDelay,l=0;if(h&&t._repeat&&(l=Mt(0,t._tDur,e),a=wt(l,h),t._yoyo&&1&a&&(u=1-u),a!==wt(t._tTime,h)&&(o=1-u,t.vars.repeatRefresh&&t._initted&&t.invalidate())),u!==o||I||i||t._zTime===q||!e&&t._zTime){if(!t._initted&&Pa(t,e,i,r,l))return;for(s=t._zTime,t._zTime=e||(r?q:0),r=r||e&&!s,t.ratio=u,t._from&&(u=1-u),t._time=0,t._tTime=l,n=t._pt;n;)n.r(u,n.d),n=n._next;e<0&&Fa(t,e,0,!0),t._onUpdate&&!r&&At(t,"onUpdate"),l&&t._repeat&&!r&&t.parent&&At(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===u&&(u&&Ca(t,1),r||I||(At(t,u?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)}(this,t,e,r);return this},e.targets=function targets(){return this._targets},e.invalidate=function invalidate(t){return t&&this.vars.runBackwards||(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),E.prototype.invalidate.call(this,t)},e.resetTo=function resetTo(t,e,r,i,n){d||It.wake(),this._ts||this.play();var a,s=Math.min(this._dur,(this._dp._time-this._start)*this._ts);return this._initted||Ht(this,s),a=this._ease(s/this._dur),function _updatePropTweens(t,e,r,i,n,a,s,o){var u,h,l,f,c=(t._pt&&t._ptCache||(t._ptCache={}))[e];if(!c)for(c=t._ptCache[e]=[],l=t._ptLookup,f=t._targets.length;f--;){if((u=l[f][e])&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return Wt=1,t.vars[e]="+=0",Ht(t,s),Wt=0,o?T(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(f=c.length;f--;)(u=(h=c[f])._pt||h).s=!i&&0!==i||n?u.s+(i||0)+a*u.c:i,u.c=r-u.s,h.e&&(h.e=ka(r)+_a(h.e)),h.b&&(h.b=u.s+_a(h.b))}(this,t,e,r,i,a,s,n)?this.resetTo(t,e,r,i,1):(La(this,0),this.parent||Aa(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function kill(t,e){if(void 0===e&&(e="all"),!(t||e&&"all"!==e))return this._lazy=this._pt=0,this.parent?wb(this):this.scrollTrigger&&this.scrollTrigger.kill(!!I),this;if(this.timeline){var i=this.timeline.totalDuration();return this.timeline.killTweensOf(t,e,Zt&&!0!==Zt.vars.overwrite)._first||wb(this),this.parent&&i!==this.timeline.totalDuration()&&Ua(this,this._dur*this.timeline._tDur/i,0,1),this}var n,a,s,o,u,h,l,f=this._targets,c=t?Pt(t):f,d=this._ptLookup,p=this._pt;if((!e||"all"===e)&&function _arraysMatch(t,e){for(var r=t.length,i=r===e.length;i&&r--&&t[r]===e[r];);return r<0}(f,c))return"all"===e&&(this._pt=0),wb(this);for(n=this._op=this._op||[],"all"!==e&&(r(e)&&(u={},ja(e,function(t){return u[t]=1}),e=u),e=function _addAliasesToVars(t,e){var r,i,n,a,s=t[0]?ha(t[0]).harness:0,o=s&&s.aliases;if(!o)return e;for(i in r=bt({},e),o)if(i in r)for(n=(a=o[i].split(",")).length;n--;)r[a[n]]=r[i];return r}(f,e)),l=f.length;l--;)if(~c.indexOf(f[l]))for(u in a=d[l],"all"===e?(n[l]=e,o=a,s={}):(s=n[l]=n[l]||{},o=e),o)(h=a&&a[u])&&("kill"in h.d&&!0!==h.d.kill(u)||Ba(this,h,"_pt"),delete a[u]),"all"!==s&&(s[u]=1);return this._initted&&!this._pt&&p&&wb(this),this},Tween.to=function to(t,e,r){return new Tween(t,e,r)},Tween.from=function from(t,e){return Ya(1,arguments)},Tween.delayedCall=function delayedCall(t,e,r,i){return new Tween(e,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:t,onComplete:e,onReverseComplete:e,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},Tween.fromTo=function fromTo(t,e,r){return Ya(2,arguments)},Tween.set=function set(t,e){return e.duration=0,e.repeatDelay||(e.repeat=0),new Tween(t,e)},Tween.killTweensOf=function killTweensOf(t,e,r){return L.killTweensOf(t,e,r)},Tween}(qt);ta(te.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),ja("staggerTo,staggerFrom,staggerFromTo",function(r){te[r]=function(){var t=new Gt,e=Ct.call(arguments,0);return e.splice("staggerFromTo"===r?5:4,0,0),t[r].apply(t,e)}});function qc(t,e,r){return t.setAttribute(e,r)}function yc(t,e,r,i){i.mSet(t,e,i.m.call(i.tween,r,i.mt),i)}var ie=function _setterPlain(t,e,r){return t[e]=r},ae=function _setterFunc(t,e,r){return t[e](r)},se=function _setterFuncWithParam(t,e,r,i){return t[e](i.fp,r)},ue=function _getSetter(t,e){return s(t[e])?ae:u(t[e])&&t.setAttribute?qc:ie},fe=function _renderPlain(t,e){return e.set(e.t,e.p,Math.round(1e6*(e.s+e.c*t))/1e6,e)},de=function _renderBoolean(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},pe=function _renderComplexString(t,e){var r=e._pt,i="";if(!t&&e.b)i=e.b;else if(1===t&&e.e)i=e.e;else{for(;r;)i=r.p+(r.m?r.m(r.s+r.c*t):Math.round(1e4*(r.s+r.c*t))/1e4)+i,r=r._next;i+=e.c}e.set(e.t,e.p,i,e)},_e=function _renderPropTweens(t,e){for(var r=e._pt;r;)r.r(t,r.d),r=r._next},ve=function _addPluginModifier(t,e,r,i){for(var n,a=this._pt;a;)n=a._next,a.p===i&&a.modifier(t,e,r),a=n},Te=function _killPropTweensOf(t){for(var e,r,i=this._pt;i;)r=i._next,i.p===t&&!i.op||i.op===t?Ba(this,i,"_pt"):i.dep||(e=1),i=r;return!e},be=function _sortPropTweensByPriority(t){for(var e,r,i,n,a=t._pt;a;){for(e=a._next,r=i;r&&r.pr>a.pr;)r=r._next;(a._prev=r?r._prev:n)?a._prev._next=a:i=a,(a._next=r)?r._prev=a:n=a,a=e}t._pt=i},we=(PropTween.prototype.modifier=function modifier(t,e,r){this.mSet=this.mSet||this.set,this.set=yc,this.m=t,this.mt=r,this.tween=e},PropTween);function PropTween(t,e,r,i,n,a,s,o,u){this.t=e,this.s=i,this.c=n,this.p=r,this.r=a||fe,this.d=s||this,this.set=o||ie,this.pr=u||0,(this._next=t)&&(t._prev=this)}ja(Tt+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(t){return dt[t]=1}),ht.TweenMax=ht.TweenLite=te,ht.TimelineLite=ht.TimelineMax=Gt,L=new Gt({sortChildren:!1,defaults:j,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),Y.stringFilter=Ib;function Gc(t){return(Oe[t]||Me).map(function(t){return t()})}function Hc(){var t=Date.now(),o=[];2<t-Ce&&(Gc("matchMediaInit"),ke.forEach(function(t){var e,r,i,n,a=t.queries,s=t.conditions;for(r in a)(e=h.matchMedia(a[r]).matches)&&(i=1),e!==s[r]&&(s[r]=e,n=1);n&&(t.revert(),i&&o.push(t))}),Gc("matchMediaRevert"),o.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),Ce=t,Gc("matchMedia"))}var xe,ke=[],Oe={},Me=[],Ce=0,Pe=0,Se=((xe=Context.prototype).add=function add(t,i,n){function Gw(){var t,e=l,r=a.selector;return e&&e!==a&&e.data.push(a),n&&(a.selector=fb(n)),l=a,t=i.apply(a,arguments),s(t)&&a._r.push(t),l=e,a.selector=r,a.isReverted=!1,t}s(t)&&(n=i,i=t,t=s);var a=this;return a.last=Gw,t===s?Gw(a,function(t){return a.add(null,t)}):t?a[t]=Gw:Gw},xe.ignore=function ignore(t){var e=l;l=null,t(this),l=e},xe.getTweens=function getTweens(){var e=[];return this.data.forEach(function(t){return t instanceof Context?e.push.apply(e,t.getTweens()):t instanceof te&&!(t.parent&&"nested"===t.parent.data)&&e.push(t)}),e},xe.clear=function clear(){this._r.length=this.data.length=0},xe.kill=function kill(i,t){var n=this;if(i?function(){for(var t,e=n.getTweens(),r=n.data.length;r--;)"isFlip"===(t=n.data[r]).data&&(t.revert(),t.getChildren(!0,!0,!1).forEach(function(t){return e.splice(e.indexOf(t),1)}));for(e.map(function(t){return{g:t._dur||t._delay||t._sat&&!t._sat.vars.immediateRender?t.globalTime(0):-1/0,t:t}}).sort(function(t,e){return e.g-t.g||-1/0}).forEach(function(t){return t.t.revert(i)}),r=n.data.length;r--;)(t=n.data[r])instanceof Gt?"nested"!==t.data&&(t.scrollTrigger&&t.scrollTrigger.revert(),t.kill()):t instanceof te||!t.revert||t.revert(i);n._r.forEach(function(t){return t(i,n)}),n.isReverted=!0}():this.data.forEach(function(t){return t.kill&&t.kill()}),this.clear(),t)for(var e=ke.length;e--;)ke[e].id===this.id&&ke.splice(e,1)},xe.revert=function revert(t){this.kill(t||{})},Context);function Context(t,e){this.selector=e&&fb(e),this.data=[],this._r=[],this.isReverted=!1,this.id=Pe++,t&&this.add(t)}var De,Re=((De=MatchMedia.prototype).add=function add(t,e,r){v(t)||(t={matches:t});var i,n,a,s=new Se(0,r||this.scope),o=s.conditions={};for(n in l&&!s.selector&&(s.selector=l.selector),this.contexts.push(s),e=s.add("onMatch",e),s.queries=t)"all"===n?a=1:(i=h.matchMedia(t[n]))&&(ke.indexOf(s)<0&&ke.push(s),(o[n]=i.matches)&&(a=1),i.addListener?i.addListener(Hc):i.addEventListener("change",Hc));return a&&e(s,function(t){return s.add(null,t)}),this},De.revert=function revert(t){this.kill(t||{})},De.kill=function kill(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},MatchMedia);function MatchMedia(t){this.contexts=[],this.scope=t,l&&l.data.push(this)}var Ee={registerPlugin:function registerPlugin(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];e.forEach(function(t){return zb(t)})},timeline:function timeline(t){return new Gt(t)},getTweensOf:function getTweensOf(t,e){return L.getTweensOf(t,e)},getProperty:function getProperty(i,t,e,n){r(i)&&(i=Pt(i)[0]);var a=ha(i||{}).get,s=e?sa:ra;return"native"===e&&(e=""),i?t?s((mt[t]&&mt[t].get||a)(i,t,e,n)):function(t,e,r){return s((mt[t]&&mt[t].get||a)(i,t,e,r))}:i},quickSetter:function quickSetter(r,e,i){if(1<(r=Pt(r)).length){var n=r.map(function(t){return Fe.quickSetter(t,e,i)}),a=n.length;return function(t){for(var e=a;e--;)n[e](t)}}r=r[0]||{};var s=mt[e],o=ha(r),u=o.harness&&(o.harness.aliases||{})[e]||e,h=s?function(t){var e=new s;c._pt=0,e.init(r,i?t+i:t,c,0,[r]),e.render(1,e),c._pt&&_e(1,c)}:o.set(r,u);return s?h:function(t){return h(r,u,i?t+i:t,o,1)}},quickTo:function quickTo(t,i,e){function $x(t,e,r){return n.resetTo(i,t,e,r)}var r,n=Fe.to(t,ta(((r={})[i]="+=0.1",r.paused=!0,r.stagger=0,r),e||{}));return $x.tween=n,$x},isTweening:function isTweening(t){return 0<L.getTweensOf(t,!0).length},defaults:function defaults(t){return t&&t.ease&&(t.ease=jt(t.ease,j.ease)),wa(j,t||{})},config:function config(t){return wa(Y,t||{})},registerEffect:function registerEffect(t){var i=t.name,n=t.effect,e=t.plugins,a=t.defaults,r=t.extendTimeline;(e||"").split(",").forEach(function(t){return t&&!mt[t]&&!ht[t]&&T(i+" effect requires "+t+" plugin.")}),gt[i]=function(t,e,r){return n(Pt(t),ta(e||{},a),r)},r&&(Gt.prototype[i]=function(t,e,r){return this.add(gt[i](t,v(e)?e:(r=e)&&{},this),r)})},registerEase:function registerEase(t,e){Bt[t]=jt(e)},parseEase:function parseEase(t,e){return arguments.length?jt(t,e):Bt},getById:function getById(t){return L.getById(t)},exportRoot:function exportRoot(t,e){void 0===t&&(t={});var r,i,n=new Gt(t);for(n.smoothChildTiming=w(t.smoothChildTiming),L.remove(n),n._dp=0,n._time=n._tTime=L._time,r=L._first;r;)i=r._next,!e&&!r._dur&&r instanceof te&&r.vars.onComplete===r._targets[0]||Na(n,r,r._start-r._delay),r=i;return Na(L,n,0),n},context:function context(t,e){return t?new Se(t,e):l},matchMedia:function matchMedia(t){return new Re(t)},matchMediaRefresh:function matchMediaRefresh(){return ke.forEach(function(t){var e,r,i=t.conditions;for(r in i)i[r]&&(i[r]=!1,e=1);e&&t.revert()})||Hc()},addEventListener:function addEventListener(t,e){var r=Oe[t]||(Oe[t]=[]);~r.indexOf(e)||r.push(e)},removeEventListener:function removeEventListener(t,e){var r=Oe[t],i=r&&r.indexOf(e);0<=i&&r.splice(i,1)},utils:{wrap:function wrap(e,t,r){var i=t-e;return K(e)?ob(e,wrap(0,e.length),t):Za(r,function(t){return(i+(t-e)%i)%i+e})},wrapYoyo:function wrapYoyo(e,t,r){var i=t-e,n=2*i;return K(e)?ob(e,wrapYoyo(0,e.length-1),t):Za(r,function(t){return e+(i<(t=(n+(t-e)%n)%n||0)?n-t:t)})},distribute:hb,random:kb,snap:jb,normalize:function normalize(t,e,r){return St(t,e,0,1,r)},getUnit:_a,clamp:function clamp(e,r,t){return Za(t,function(t){return Mt(e,r,t)})},splitColor:Db,toArray:Pt,selector:fb,mapRange:St,pipe:function pipe(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(t){return e.reduce(function(t,e){return e(t)},t)}},unitize:function unitize(e,r){return function(t){return e(parseFloat(t))+(r||_a(t))}},interpolate:function interpolate(e,i,t,n){var a=isNaN(e+i)?0:function(t){return(1-t)*e+t*i};if(!a){var s,o,u,h,l,f=r(e),c={};if(!0===t&&(n=1)&&(t=null),f)e={p:e},i={p:i};else if(K(e)&&!K(i)){for(u=[],h=e.length,l=h-2,o=1;o<h;o++)u.push(interpolate(e[o-1],e[o]));h--,a=function func(t){t*=h;var e=Math.min(l,~~t);return u[e](t-e)},t=i}else n||(e=bt(K(e)?[]:{},e));if(!u){for(s in i)$t.call(c,e,s,"get",i[s]);a=function func(t){return _e(t,c)||(f?e.p:e)}}}return Za(t,a)},shuffle:gb},install:R,effects:gt,ticker:It,updateRoot:Gt.updateRoot,plugins:mt,globalTimeline:L,core:{PropTween:we,globals:U,Tween:te,Timeline:Gt,Animation:qt,getCache:ha,_removeLinkedListItem:Ba,reverting:function reverting(){return I},context:function context(t){return t&&l&&(l.data.push(t),t._ctx=l),l},suppressOverwrites:function suppressOverwrites(t){return F=t}}};ja("to,from,fromTo,delayedCall,set,killTweensOf",function(t){return Ee[t]=te[t]}),It.add(Gt.updateRoot),c=Ee.to({},{duration:0});function Lc(t,e){for(var r=t._pt;r&&r.p!==e&&r.op!==e&&r.fp!==e;)r=r._next;return r}function Nc(t,a){return{name:t,headless:1,rawVars:1,init:function init(t,n,e){e._onInit=function(t){var e,i;if(r(n)&&(e={},ja(n,function(t){return e[t]=1}),n=e),a){for(i in e={},n)e[i]=a(n[i]);n=e}!function _addModifiers(t,e){var r,i,n,a=t._targets;for(r in e)for(i=a.length;i--;)(n=(n=t._ptLookup[i][r])&&n.d)&&(n._pt&&(n=Lc(n,r)),n&&n.modifier&&n.modifier(e[r],t,a[i],r))}(t,n)}}}}var Fe=Ee.registerPlugin({name:"attr",init:function init(t,e,r,i,n){var a,s,o;for(a in this.tween=r,e)o=t.getAttribute(a)||"",(s=this.add(t,"setAttribute",(o||0)+"",e[a],i,n,0,0,a)).op=a,s.b=o,this._props.push(a)},render:function render(t,e){for(var r=e._pt;r;)I?r.set(r.t,r.p,r.b,r):r.r(t,r.d),r=r._next}},{name:"endArray",headless:1,init:function init(t,e){for(var r=e.length;r--;)this.add(t,r,t[r]||0,e[r],0,0,0,0,0,1)}},Nc("roundProps",ib),Nc("modifiers"),Nc("snap",jb))||Ee;te.version=Gt.version=Fe.version="3.15.0",o=1,x()&&Lt();function xd(t,e){return e.set(e.t,e.p,Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function yd(t,e){return e.set(e.t,e.p,1===t?e.e:Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function zd(t,e){return e.set(e.t,e.p,t?Math.round(1e4*(e.s+e.c*t))/1e4+e.u:e.b,e)}function Ad(t,e){return e.set(e.t,e.p,1===t?e.e:t?Math.round(1e4*(e.s+e.c*t))/1e4+e.u:e.b,e)}function Bd(t,e){var r=e.s+e.c*t;e.set(e.t,e.p,~~(r+(r<0?-.5:.5))+e.u,e)}function Cd(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)}function Dd(t,e){return e.set(e.t,e.p,1!==t?e.b:e.e,e)}function Ed(t,e,r){return t.style[e]=r}function Fd(t,e,r){return t.style.setProperty(e,r)}function Gd(t,e,r){return t._gsap[e]=r}function Hd(t,e,r){return t._gsap.scaleX=t._gsap.scaleY=r}function Id(t,e,r,i,n){var a=t._gsap;a.scaleX=a.scaleY=r,a.renderTransform(n,a)}function Jd(t,e,r,i,n){var a=t._gsap;a[e]=r,a.renderTransform(n,a)}function Md(t,e){var r=this,i=this.target,n=i.style,a=i._gsap;if(t in ur&&n){if(this.tfm=this.tfm||{},"transform"===t)return _r.transform.split(",").forEach(function(t){return Md.call(r,t,e)});if(~(t=_r[t]||t).indexOf(",")?t.split(",").forEach(function(t){return r.tfm[t]=wr(i,t)}):this.tfm[t]=a.x?a[t]:wr(i,t),t===gr&&(this.tfm.zOrigin=a.zOrigin),0<=this.props.indexOf(mr))return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(gr,e,"")),t=mr}(n||e)&&this.props.push(t,e,n[t])}function Nd(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))}function Od(){var t,e,r=this.props,i=this.target,n=i.style,a=i._gsap;for(t=0;t<r.length;t+=3)r[t+1]?2===r[t+1]?i[r[t]](r[t+2]):i[r[t]]=r[t+2]:r[t+2]?n[r[t]]=r[t+2]:n.removeProperty("--"===r[t].substr(0,2)?r[t]:r[t].replace(cr,"-$1").toLowerCase());if(this.tfm){for(e in this.tfm)a[e]=this.tfm[e];a.svg&&(a.renderTransform(),i.setAttribute("data-svg-origin",this.svgo||"")),(t=je())&&t.isStart||n[mr]||(Nd(n),a.zOrigin&&n[gr]&&(n[gr]+=" "+a.zOrigin+"px",a.zOrigin=0,a.renderTransform()),a.uncache=1)}}function Pd(t,e){var r={target:t,props:[],revert:Od,save:Md};return t._gsap||Fe.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(t){return r.save(t)}),r}function Rd(t,e){var r=Le.createElementNS?Le.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Le.createElement(t);return r&&r.style?r:Le.createElement(t)}function Sd(t,e,r){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(cr,"-$1").toLowerCase())||i.getPropertyValue(e)||!r&&Sd(t,yr(e)||e,1)||""}function Vd(){(function _windowExists(){return"undefined"!=typeof window})()&&window.document&&(Ie=window,Le=Ie.document,Be=Le.documentElement,Ue=Rd("div")||{style:{}},Rd("div"),mr=yr(mr),gr=mr+"Origin",Ue.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Ve=!!yr("perspective"),je=Fe.core.reverting,Ne=1)}function Wd(t){var e,r=t.ownerSVGElement,i=Rd("svg",r&&r.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=t.cloneNode(!0);n.style.display="block",i.appendChild(n),Be.appendChild(i);try{e=n.getBBox()}catch(t){}return i.removeChild(n),Be.removeChild(i),e}function Xd(t,e){for(var r=e.length;r--;)if(t.hasAttribute(e[r]))return t.getAttribute(e[r])}function Yd(e){var r,i;try{r=e.getBBox()}catch(t){r=Wd(e),i=1}return r&&(r.width||r.height)||i||(r=Wd(e)),!r||r.width||r.x||r.y?r:{x:+Xd(e,["x","cx","x1"])||0,y:+Xd(e,["y","cy","y1"])||0,width:0,height:0}}function Zd(t){return!(!t.getCTM||t.parentNode&&!t.ownerSVGElement||!Yd(t))}function $d(t,e){if(e){var r,i=t.style;e in ur&&e!==gr&&(e=mr),i.removeProperty?("ms"!==(r=e.substr(0,2))&&"webkit"!==e.substr(0,6)||(e="-"+e),i.removeProperty("--"===r?e:e.replace(cr,"-$1").toLowerCase())):i.removeAttribute(e)}}function _d(t,e,r,i,n,a){var s=new we(t._pt,e,r,0,1,a?Dd:Cd);return(t._pt=s).b=i,s.e=n,t._props.push(r),s}function ce(t,e,r,i){var n,a,s,o,u=parseFloat(r)||0,h=(r+"").trim().substr((u+"").length)||"px",l=Ue.style,f=dr.test(e),c="svg"===t.tagName.toLowerCase(),d=(c?"client":"offset")+(f?"Width":"Height"),p="px"===i,_="%"===i;if(i===h||!u||Tr[i]||Tr[h])return u;if("px"===h||p||(u=ce(t,e,r,"px")),o=t.getCTM&&Zd(t),(_||"%"===h)&&(ur[e]||~e.indexOf("adius")))return n=o?t.getBBox()[f?"width":"height"]:t[d],ka(_?u/n*100:u/100*n);if(l[f?"width":"height"]=100+(p?h:i),a="rem"!==i&&~e.indexOf("adius")||"em"===i&&t.appendChild&&!c?t:t.parentNode,o&&(a=(t.ownerSVGElement||{}).parentNode),a&&a!==Le&&a.appendChild||(a=Le.body),(s=a._gsap)&&_&&s.width&&f&&s.time===It.time&&!s.uncache)return ka(u/s.width*100);if(!_||"height"!==e&&"width"!==e)!_&&"%"!==h||br[Sd(a,"display")]||(l.position=Sd(t,"position")),a===t&&(l.position="static"),a.appendChild(Ue),n=Ue[d],a.removeChild(Ue),l.position="absolute";else{var m=t.style[e];t.style[e]=100+i,n=t[d],m?t.style[e]=m:$d(t,e)}return f&&_&&((s=ha(a)).time=It.time,s.width=a[d]),ka(p?n*u/100:n&&u?100/n*u:0)}function ee(t,e,r,i){if(!r||"none"===r){var n=yr(e,t,1),a=n&&Sd(t,n,1);a&&a!==r?(e=n,r=a):"borderColor"===e&&(r=Sd(t,"borderTopColor"))}var s,o,u,h,l,f,c,d,p,_,m,g=new we(this._pt,t.style,e,0,1,pe),v=0,y=0;if(g.b=r,g.e=i,r+="","var(--"===(i+="").substring(0,6)&&(i=Sd(t,i.substring(4,i.indexOf(")")))),"auto"===i&&(f=t.style[e],t.style[e]=i,i=Sd(t,e)||i,f?t.style[e]=f:$d(t,e)),Ib(s=[r,i]),i=s[1],u=(r=s[0]).match(nt)||[],(i.match(nt)||[]).length){for(;o=nt.exec(i);)c=o[0],p=i.substring(v,o.index),l?l=(l+1)%5:"rgba("!==p.substr(-5)&&"hsla("!==p.substr(-5)||(l=1),c!==(f=u[y++]||"")&&(h=parseFloat(f)||0,m=f.substr((h+"").length),"="===c.charAt(1)&&(c=ma(h,c)+m),d=parseFloat(c),_=c.substr((d+"").length),v=nt.lastIndex-_.length,_||(_=_||Y.units[e]||m,v===i.length&&(i+=_,g.e+=_)),m!==_&&(h=ce(t,e,f,_)||0),g._pt={_next:g._pt,p:p||1===y?p:",",s:h,c:d-h,m:l&&l<4||"zIndex"===e?Math.round:0});g.c=v<i.length?i.substring(v,i.length):""}else g.r="display"===e&&"none"===i?Dd:Cd;return st.test(i)&&(g.e=0),this._pt=g}function ge(t){var e=t.split(" "),r=e[0],i=e[1]||"50%";return"top"!==r&&"bottom"!==r&&"left"!==i&&"right"!==i||(t=r,r=i,i=t),e[0]=xr[r]||r,e[1]=xr[i]||i,e.join(" ")}function he(t,e){if(e.tween&&e.tween._time===e.tween._dur){var r,i,n,a=e.t,s=a.style,o=e.u,u=a._gsap;if("all"===o||!0===o)s.cssText="",i=1;else for(n=(o=o.split(",")).length;-1<--n;)r=o[n],ur[r]&&(i=1,r="transformOrigin"===r?gr:mr),$d(a,r);i&&($d(a,mr),u&&(u.svg&&a.removeAttribute("transform"),s.scale=s.rotate=s.translate="none",Cr(a,1),u.uncache=1,Nd(s)))}}function le(t){return"matrix(1, 0, 0, 1, 0, 0)"===t||"none"===t||!t}function me(t){var e=Sd(t,mr);return le(e)?Or:e.substr(7).match(it).map(ka)}function ne(t,e){var r,i,n,a,s=t._gsap||ha(t),o=t.style,u=me(t);return s.svg&&t.getAttribute("transform")?"1,0,0,1,0,0"===(u=[(n=t.transform.baseVal.consolidate().matrix).a,n.b,n.c,n.d,n.e,n.f]).join(",")?Or:u:(u!==Or||t.offsetParent||t===Be||s.svg||(n=o.display,o.display="block",(r=t.parentNode)&&(t.offsetParent||t.getBoundingClientRect().width)||(a=1,i=t.nextElementSibling,Be.appendChild(t)),u=me(t),n?o.display=n:$d(t,"display"),a&&(i?r.insertBefore(t,i):r?r.appendChild(t):Be.removeChild(t))),e&&6<u.length?[u[0],u[1],u[4],u[5],u[12],u[13]]:u)}function oe(t,e,r,i,n,a){var s,o,u,h=t._gsap,l=n||ne(t,!0),f=h.xOrigin||0,c=h.yOrigin||0,d=h.xOffset||0,p=h.yOffset||0,_=l[0],m=l[1],g=l[2],v=l[3],y=l[4],T=l[5],b=e.split(" "),w=parseFloat(b[0])||0,x=parseFloat(b[1])||0;r?l!==Or&&(o=_*v-m*g)&&(u=w*(-m/o)+x*(_/o)-(_*T-m*y)/o,w=w*(v/o)+x*(-g/o)+(g*T-v*y)/o,x=u):(w=(s=Yd(t)).x+(~b[0].indexOf("%")?w/100*s.width:w),x=s.y+(~(b[1]||b[0]).indexOf("%")?x/100*s.height:x)),i||!1!==i&&h.smooth?(y=w-f,T=x-c,h.xOffset=d+(y*_+T*g)-y,h.yOffset=p+(y*m+T*v)-T):h.xOffset=h.yOffset=0,h.xOrigin=w,h.yOrigin=x,h.smooth=!!i,h.origin=e,h.originIsAbsolute=!!r,t.style[gr]="0px 0px",a&&(_d(a,h,"xOrigin",f,w),_d(a,h,"yOrigin",c,x),_d(a,h,"xOffset",d,h.xOffset),_d(a,h,"yOffset",p,h.yOffset)),t.setAttribute("data-svg-origin",w+" "+x)}function re(t,e,r){var i=_a(e);return ka(parseFloat(e)+parseFloat(ce(t,"x",r+"px",i)))+i}function ye(t,e,i,n,a){var s,o,u=360,h=r(a),l=parseFloat(a)*(h&&~a.indexOf("rad")?hr:1)-n,f=n+l+"deg";return h&&("short"===(s=a.split("_")[1])&&(l%=u)!==l%180&&(l+=l<0?u:-u),"cw"===s&&l<0?l=(l+36e9)%u-~~(l/u)*u:"ccw"===s&&0<l&&(l=(l-36e9)%u-~~(l/u)*u)),t._pt=o=new we(t._pt,e,i,n,l,yd),o.e=f,o.u="deg",t._props.push(i),o}function ze(t,e){for(var r in e)t[r]=e[r];return t}function Ae(t,e,r){var i,n,a,s,o,u,h,l=ze({},r._gsap),f=r.style;for(n in l.svg?(a=r.getAttribute("transform"),r.setAttribute("transform",""),f[mr]=e,i=Cr(r,1),$d(r,mr),r.setAttribute("transform",a)):(a=getComputedStyle(r)[mr],f[mr]=e,i=Cr(r,1),f[mr]=a),ur)(a=l[n])!==(s=i[n])&&"perspective,force3D,transformOrigin,svgOrigin".indexOf(n)<0&&(o=_a(a)!==(h=_a(s))?ce(r,n,a,h):parseFloat(a),u=parseFloat(s),t._pt=new we(t._pt,i,n,o,u-o,xd),t._pt.u=h||0,t._props.push(n));ze(i,l)}var Ie,Le,Be,Ne,Ue,Ye,je,Ve,Xe=Bt.Power0,qe=Bt.Power1,Ge=Bt.Power2,Ze=Bt.Power3,We=Bt.Power4,$e=Bt.Linear,He=Bt.Quad,Qe=Bt.Cubic,Je=Bt.Quart,Ke=Bt.Quint,tr=Bt.Strong,er=Bt.Elastic,rr=Bt.Back,ir=Bt.SteppedEase,nr=Bt.Bounce,ar=Bt.Sine,sr=Bt.Expo,or=Bt.Circ,ur={},hr=180/Math.PI,lr=Math.PI/180,fr=Math.atan2,cr=/([A-Z])/g,dr=/(left|right|width|margin|padding|x)/i,pr=/[\s,\(]\S/,_r={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},mr="transform",gr=mr+"Origin",vr="O,Moz,ms,Ms,Webkit".split(","),yr=function _checkPropPrefix(t,e,r){var i=(e||Ue).style,n=5;if(t in i&&!r)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);n--&&!(vr[n]+t in i););return n<0?null:(3===n?"ms":0<=n?vr[n]:"")+t},Tr={deg:1,rad:1,turn:1},br={grid:1,flex:1},wr=function _get(t,e,r,i){var n;return Ne||Vd(),e in _r&&"transform"!==e&&~(e=_r[e]).indexOf(",")&&(e=e.split(",")[0]),ur[e]&&"transform"!==e?(n=Cr(t,i),n="transformOrigin"!==e?n[e]:n.svg?n.origin:Pr(Sd(t,gr))+" "+n.zOrigin+"px"):(n=t.style[e])&&"auto"!==n&&!i&&!~(n+"").indexOf("calc(")||(n=kr[e]&&kr[e](t,e,r)||Sd(t,e)||ia(t,e)||("opacity"===e?1:0)),r&&!~(n+"").trim().indexOf(" ")?ce(t,e,n,r)+r:n},xr={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},kr={clearProps:function clearProps(t,e,r,i,n){if("isFromStart"!==n.data){var a=t._pt=new we(t._pt,e,r,0,0,he);return a.u=i,a.pr=-10,a.tween=n,t._props.push(r),1}}},Or=[1,0,0,1,0,0],Mr={},Cr=function _parseTransform(t,e){var r=t._gsap||new Xt(t);if("x"in r&&!e&&!r.uncache)return r;var i,n,a,s,o,u,h,l,f,c,d,p,_,m,g,v,y,T,b,w,x,k,O,M,C,P,S,A,D,z,R,E,F=t.style,I=r.scaleX<0,L="deg",B=getComputedStyle(t),N=Sd(t,gr)||"0";return i=n=a=u=h=l=f=c=d=0,s=o=1,r.svg=!(!t.getCTM||!Zd(t)),B.translate&&("none"===B.translate&&"none"===B.scale&&"none"===B.rotate||(F[mr]=("none"!==B.translate?"translate3d("+(B.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+("none"!==B.rotate?"rotate("+B.rotate+") ":"")+("none"!==B.scale?"scale("+B.scale.split(" ").join(",")+") ":"")+("none"!==B[mr]?B[mr]:"")),F.scale=F.rotate=F.translate="none"),m=ne(t,r.svg),r.svg&&(M=r.uncache?(C=t.getBBox(),N=r.xOrigin-C.x+"px "+(r.yOrigin-C.y)+"px",""):!e&&t.getAttribute("data-svg-origin"),oe(t,M||N,!!M||r.originIsAbsolute,!1!==r.smooth,m)),p=r.xOrigin||0,_=r.yOrigin||0,m!==Or&&(T=m[0],b=m[1],w=m[2],x=m[3],i=k=m[4],n=O=m[5],6===m.length?(s=Math.sqrt(T*T+b*b),o=Math.sqrt(x*x+w*w),u=T||b?fr(b,T)*hr:0,(f=w||x?fr(w,x)*hr+u:0)&&(o*=Math.abs(Math.cos(f*lr))),r.svg&&(i-=p-(p*T+_*w),n-=_-(p*b+_*x))):(E=m[6],z=m[7],S=m[8],A=m[9],D=m[10],R=m[11],i=m[12],n=m[13],a=m[14],h=(g=fr(E,D))*hr,g&&(M=k*(v=Math.cos(-g))+S*(y=Math.sin(-g)),C=O*v+A*y,P=E*v+D*y,S=k*-y+S*v,A=O*-y+A*v,D=E*-y+D*v,R=z*-y+R*v,k=M,O=C,E=P),l=(g=fr(-w,D))*hr,g&&(v=Math.cos(-g),R=x*(y=Math.sin(-g))+R*v,T=M=T*v-S*y,b=C=b*v-A*y,w=P=w*v-D*y),u=(g=fr(b,T))*hr,g&&(M=T*(v=Math.cos(g))+b*(y=Math.sin(g)),C=k*v+O*y,b=b*v-T*y,O=O*v-k*y,T=M,k=C),h&&359.9<Math.abs(h)+Math.abs(u)&&(h=u=0,l=180-l),s=ka(Math.sqrt(T*T+b*b+w*w)),o=ka(Math.sqrt(O*O+E*E)),g=fr(k,O),f=2e-4<Math.abs(g)?g*hr:0,d=R?1/(R<0?-R:R):0),r.svg&&(M=t.getAttribute("transform"),r.forceCSS=t.setAttribute("transform","")||!le(Sd(t,mr)),M&&t.setAttribute("transform",M))),90<Math.abs(f)&&Math.abs(f)<270&&(I?(s*=-1,f+=u<=0?180:-180,u+=u<=0?180:-180):(o*=-1,f+=f<=0?180:-180)),e=e||r.uncache,r.x=i-((r.xPercent=i&&(!e&&r.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-i)?-50:0)))?t.offsetWidth*r.xPercent/100:0)+"px",r.y=n-((r.yPercent=n&&(!e&&r.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-n)?-50:0)))?t.offsetHeight*r.yPercent/100:0)+"px",r.z=a+"px",r.scaleX=ka(s),r.scaleY=ka(o),r.rotation=ka(u)+L,r.rotationX=ka(h)+L,r.rotationY=ka(l)+L,r.skewX=f+L,r.skewY=c+L,r.transformPerspective=d+"px",(r.zOrigin=parseFloat(N.split(" ")[2])||!e&&r.zOrigin||0)&&(F[gr]=Pr(N)),r.xOffset=r.yOffset=0,r.force3D=Y.force3D,r.renderTransform=r.svg?Er:Ve?Rr:Sr,r.uncache=0,r},Pr=function _firstTwoOnly(t){return(t=t.split(" "))[0]+" "+t[1]},Sr=function _renderNon3DTransforms(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Rr(t,e)},Ar="0deg",Dr="0px",zr=") ",Rr=function _renderCSSTransforms(t,e){var r=e||this,i=r.xPercent,n=r.yPercent,a=r.x,s=r.y,o=r.z,u=r.rotation,h=r.rotationY,l=r.rotationX,f=r.skewX,c=r.skewY,d=r.scaleX,p=r.scaleY,_=r.transformPerspective,m=r.force3D,g=r.target,v=r.zOrigin,y="",T="auto"===m&&t&&1!==t||!0===m;if(v&&(l!==Ar||h!==Ar)){var b,w=parseFloat(h)*lr,x=Math.sin(w),k=Math.cos(w);w=parseFloat(l)*lr,b=Math.cos(w),a=re(g,a,x*b*-v),s=re(g,s,-Math.sin(w)*-v),o=re(g,o,k*b*-v+v)}_!==Dr&&(y+="perspective("+_+zr),(i||n)&&(y+="translate("+i+"%, "+n+"%) "),!T&&a===Dr&&s===Dr&&o===Dr||(y+=o!==Dr||T?"translate3d("+a+", "+s+", "+o+") ":"translate("+a+", "+s+zr),u!==Ar&&(y+="rotate("+u+zr),h!==Ar&&(y+="rotateY("+h+zr),l!==Ar&&(y+="rotateX("+l+zr),f===Ar&&c===Ar||(y+="skew("+f+", "+c+zr),1===d&&1===p||(y+="scale("+d+", "+p+zr),g.style[mr]=y||"translate(0, 0)"},Er=function _renderSVGTransforms(t,e){var r,i,n,a,s,o=e||this,u=o.xPercent,h=o.yPercent,l=o.x,f=o.y,c=o.rotation,d=o.skewX,p=o.skewY,_=o.scaleX,m=o.scaleY,g=o.target,v=o.xOrigin,y=o.yOrigin,T=o.xOffset,b=o.yOffset,w=o.forceCSS,x=parseFloat(l),k=parseFloat(f);c=parseFloat(c),d=parseFloat(d),(p=parseFloat(p))&&(d+=p=parseFloat(p),c+=p),c||d?(c*=lr,d*=lr,r=Math.cos(c)*_,i=Math.sin(c)*_,n=Math.sin(c-d)*-m,a=Math.cos(c-d)*m,d&&(p*=lr,s=Math.tan(d-p),n*=s=Math.sqrt(1+s*s),a*=s,p&&(s=Math.tan(p),r*=s=Math.sqrt(1+s*s),i*=s)),r=ka(r),i=ka(i),n=ka(n),a=ka(a)):(r=_,a=m,i=n=0),(x&&!~(l+"").indexOf("px")||k&&!~(f+"").indexOf("px"))&&(x=ce(g,"x",l,"px"),k=ce(g,"y",f,"px")),(v||y||T||b)&&(x=ka(x+v-(v*r+y*n)+T),k=ka(k+y-(v*i+y*a)+b)),(u||h)&&(s=g.getBBox(),x=ka(x+u/100*s.width),k=ka(k+h/100*s.height)),s="matrix("+r+","+i+","+n+","+a+","+x+","+k+")",g.setAttribute("transform",s),w&&(g.style[mr]=s)};ja("padding,margin,Width,Radius",function(e,r){var t="Right",i="Bottom",n="Left",o=(r<3?["Top",t,i,n]:["Top"+n,"Top"+t,i+t,i+n]).map(function(t){return r<2?e+t:"border"+t+e});kr[1<r?"border"+e:e]=function(e,t,r,i,n){var a,s;if(arguments.length<4)return a=o.map(function(t){return wr(e,t,r)}),5===(s=a.join(" ")).split(a[0]).length?a[0]:s;a=(i+"").split(" "),s={},o.forEach(function(t,e){return s[t]=a[e]=a[e]||a[(e-1)/2|0]}),e.init(t,s,n)}});var Fr,Ir,Lr,Br={name:"css",register:Vd,targetTest:function targetTest(t){return t.style&&t.nodeType},init:function init(t,e,i,n,a){var s,o,u,h,l,f,c,d,p,_,m,g,v,y,T,b,w,x=this._props,k=t.style,O=i.vars.startAt;for(c in Ne||Vd(),this.styles=this.styles||Pd(t),b=this.styles.props,this.tween=i,e)if("autoRound"!==c&&(o=e[c],!mt[c]||!cc(c,e,i,n,t,a)))if(l=typeof o,f=kr[c],"function"===l&&(l=typeof(o=o.call(i,n,t,a))),"string"===l&&~o.indexOf("random(")&&(o=rb(o)),f)f(this,t,c,o,i)&&(T=1);else if("--"===c.substr(0,2))s=(getComputedStyle(t).getPropertyValue(c)+"").trim(),o+="",Et.lastIndex=0,Et.test(s)||(d=_a(s),(p=_a(o))?d!==p&&(s=ce(t,c,s,p)+p):d&&(o+=d)),this.add(k,"setProperty",s,o,n,a,0,0,c),x.push(c),b.push(c,0,k[c]);else if("undefined"!==l){if(O&&c in O?(s="function"==typeof O[c]?O[c].call(i,n,t,a):O[c],r(s)&&~s.indexOf("random(")&&(s=rb(s)),_a(s+"")||"auto"===s||(s+=Y.units[c]||_a(wr(t,c))||""),"="===(s+"").charAt(1)&&(s=wr(t,c))):s=wr(t,c),h=parseFloat(s),(_="string"===l&&"="===o.charAt(1)&&o.substr(0,2))&&(o=o.substr(2)),u=parseFloat(o),c in _r&&("autoAlpha"===c&&(1===h&&"hidden"===wr(t,"visibility")&&u&&(h=0),b.push("visibility",0,k.visibility),_d(this,k,"visibility",h?"inherit":"hidden",u?"inherit":"hidden",!u)),"scale"!==c&&"transform"!==c&&~(c=_r[c]).indexOf(",")&&(c=c.split(",")[0])),m=c in ur){if(this.styles.save(c),w=o,"string"===l&&"var(--"===o.substring(0,6)){if("calc("===(o=Sd(t,o.substring(4,o.indexOf(")")))).substring(0,5)){var M=t.style.perspective;t.style.perspective=o,o=Sd(t,"perspective"),M?t.style.perspective=M:$d(t,"perspective")}u=parseFloat(o)}if(g||((v=t._gsap).renderTransform&&!e.parseTransform||Cr(t,e.parseTransform),y=!1!==e.smoothOrigin&&v.smooth,(g=this._pt=new we(this._pt,k,mr,0,1,v.renderTransform,v,0,-1)).dep=1),"scale"===c)this._pt=new we(this._pt,v,"scaleY",v.scaleY,(_?ma(v.scaleY,_+u):u)-v.scaleY||0,xd),this._pt.u=0,x.push("scaleY",c),c+="X";else{if("transformOrigin"===c){b.push(gr,0,k[gr]),o=ge(o),v.svg?oe(t,o,0,y,0,this):((p=parseFloat(o.split(" ")[2])||0)!==v.zOrigin&&_d(this,v,"zOrigin",v.zOrigin,p),_d(this,k,c,Pr(s),Pr(o)));continue}if("svgOrigin"===c){oe(t,o,1,y,0,this);continue}if(c in Mr){ye(this,v,c,h,_?ma(h,_+o):o);continue}if("smoothOrigin"===c){_d(this,v,"smooth",v.smooth,o);continue}if("force3D"===c){v[c]=o;continue}if("transform"===c){Ae(this,o,t);continue}}}else c in k||(c=yr(c)||c);if(m||(u||0===u)&&(h||0===h)&&!pr.test(o)&&c in k)u=u||0,(d=(s+"").substr((h+"").length))!==(p=_a(o)||(c in Y.units?Y.units[c]:d))&&(h=ce(t,c,s,p)),this._pt=new we(this._pt,m?v:k,c,h,(_?ma(h,_+u):u)-h,m||"px"!==p&&"zIndex"!==c||!1===e.autoRound?xd:Bd),this._pt.u=p||0,m&&w!==o?(this._pt.b=s,this._pt.e=w,this._pt.r=Ad):d!==p&&"%"!==p&&(this._pt.b=s,this._pt.r=zd);else if(c in k)ee.call(this,t,c,s,_?_+o:o);else if(c in t)this.add(t,c,s||t[c],_?_+o:o,n,a);else if("parseTransform"!==c){S(c,o);continue}m||(c in k?b.push(c,0,k[c]):"function"==typeof t[c]?b.push(c,2,t[c]()):b.push(c,1,s||t[c])),x.push(c)}T&&be(this)},render:function render(t,e){if(e.tween._time||!je())for(var r=e._pt;r;)r.r(t,r.d),r=r._next;else e.styles.revert()},get:wr,aliases:_r,getSetter:function getSetter(t,e,r){var i=_r[e];return i&&i.indexOf(",")<0&&(e=i),e in ur&&e!==gr&&(t._gsap.x||wr(t,"x"))?r&&Ye===r?"scale"===e?Hd:Gd:(Ye=r||{})&&("scale"===e?Id:Jd):t.style&&!u(t.style[e])?Ed:~e.indexOf("-")?Fd:ue(t,e)},core:{_removeProperty:$d,_getMatrix:ne}};Fe.utils.checkPrefix=yr,Fe.core.getStyleSaver=Pd,Lr=ja((Fr="x,y,z,scale,scaleX,scaleY,xPercent,yPercent")+","+(Ir="rotation,rotationX,rotationY,skewX,skewY")+",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",function(t){ur[t]=1}),ja(Ir,function(t){Y.units[t]="deg",Mr[t]=1}),_r[Lr[13]]=Fr+","+Ir,ja("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",function(t){var e=t.split(":");_r[e[1]]=Lr[e[0]]}),ja("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(t){Y.units[t]="px"}),Fe.registerPlugin(Br);var Nr=Fe.registerPlugin(Br)||Fe,Ur=Nr.core.Tween;e.Back=rr,e.Bounce=nr,e.CSSPlugin=Br,e.Circ=or,e.Cubic=Qe,e.Elastic=er,e.Expo=sr,e.Linear=$e,e.Power0=Xe,e.Power1=qe,e.Power2=Ge,e.Power3=Ze,e.Power4=We,e.Quad=He,e.Quart=Je,e.Quint=Ke,e.Sine=ar,e.SteppedEase=ir,e.Strong=tr,e.TimelineLite=Gt,e.TimelineMax=Gt,e.TweenLite=te,e.TweenMax=Ur,e.default=Nr,e.gsap=Nr;if (typeof(window)==="undefined"||window!==e){Object.defineProperty(e,"__esModule",{value:!0})} else {delete e.default}});


;
/*!
 * motion-igor · core runtime
 * A small kit of seekable animations for HTML presentations, websites and HyperFrames videos.
 *
 * The one contract: every module builds ONE paused GSAP timeline of fixed length.
 *   - A page or deck plays it (player below).
 *   - HyperFrames seeks it frame by frame (MotionIgor.hyperframes).
 *   - The export tool records it to MP4 through HyperFrames.
 * Canvas and WebGL modules draw from the timeline's time (ctx.onDraw), never from a clock,
 * so the same t always gives the same picture.
 *
 * Classic script (no ES modules) on purpose: it must run from file:// in a classroom and
 * build its timelines synchronously for HyperFrames.
 */
(function (global) {
  "use strict";

  var gsap = global.gsap;
  if (!gsap) throw new Error("motion-igor: load vendor/gsap.min.js before motion-igor.js");
  ["MorphSVGPlugin", "DrawSVGPlugin"].forEach(function (p) { if (global[p]) gsap.registerPlugin(global[p]); });
  // force3D false: GSAP otherwise writes translate3d mid-tween and 2D at rest, which promotes text to GPU layers (rule 10)
  // and makes a frame depend on seek history. Set through gsap.config (a CSS setting) because timeline defaults also
  // reach plain-object tweens and log "Invalid property force3D". Note: this applies to the whole page's GSAP.
  gsap.config({ force3D: false });

  // Where the kit folder is, for assets (logo). Order: explicit override, this script's own src,
  // any <script> whose src names the kit, else "kit/" (pages that inline the scripts, e.g. HyperFrames check).
  var KIT_BASE = (function () {
    if (global.MOTION_IGOR_BASE) return String(global.MOTION_IGOR_BASE).replace(/\/?$/, "/");
    var s = document.currentScript && document.currentScript.src;
    if (s && /motion-igor(\.bundle)?\.js(\?|$)/.test(s)) return s.replace(/[^/]*$/, "");
    var tags = document.querySelectorAll("script[src]");
    for (var i = 0; i < tags.length; i++) if (/motion-igor(\.bundle)?\.js(\?|$)/.test(tags[i].src)) return tags[i].src.replace(/[^/]*$/, "");
    return "kit/";
  })();

  // ------------------------------------------------------------------ themes
  // Roles every module reads. Modules never hard-code colours.
  //   paper: background   ink: main text   muted: secondary text
  //   accent: the one loud colour (the "dot")   c1..c4: supporting palette
  //   dark: deep background for night scenes    glass: translucent card fill
  var THEMES = {
    // The AIS product family (Observation Dashboard house style, brand/brand.md).
    ais: {
      name: "AIS", paper: "#ece9df", ink: "#14233f", muted: "#586479", accent: "#C9890C",
      c1: "#1257FF", c2: "#2ea15a", c3: "#D7382B", c4: "#3CBBEC", dark: "#060816",
      glass: "rgba(255,255,255,.66)", display: "'Lora', Georgia, serif", body: "'Inter', system-ui, sans-serif",
      logo: null
    },
    // Full AIS brand: official logo colours from the approved colour sheet, plus the logo.
    "ais-brand": {
      name: "AIS brand", paper: "#f7f5f0", ink: "#000019", muted: "#4a5068", accent: "#EF343A",
      c1: "#1257FF", c2: "#FFBA14", c3: "#3CBBEC", c4: "#BE2126", dark: "#000019",
      glass: "rgba(255,255,255,.62)", display: "'Lora', Georgia, serif", body: "'Inter', system-ui, sans-serif",
      logo: { light: "assets/ais-logo-navy.png", dark: "assets/ais-logo-white.png", aspectLight: 1400 / 465, aspectDark: 1400 / 530, aspect: 1400 / 530 }
    },
    // The source look (close to Vincent's reel), for comparison in the lab.
    vivid: {
      name: "Vivid", paper: "#fbf6e9", ink: "#141428", muted: "#6b6b80", accent: "#F2484B",
      c1: "#2A1FE8", c2: "#46F2A0", c3: "#F7C832", c4: "#7B6CFF", dark: "#0b0b1a",
      glass: "rgba(255,255,255,.14)", display: "'Outfit', system-ui, sans-serif", body: "'Outfit', system-ui, sans-serif",
      logo: null
    }
  };

  function resolveTheme(t) {
    if (!t) return Object.assign({}, THEMES.ais, { id: "ais" });
    if (typeof t === "string") return Object.assign({}, THEMES[t] || THEMES.ais, { id: THEMES[t] ? t : "ais" });
    return Object.assign({}, THEMES.ais, t, { id: t.id || "custom" });
  }

  // ------------------------------------------------------------------ utils
  function prng(seed) { // mulberry32: deterministic random
    var a = (seed >>> 0) || 1;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var SVGNS = "http://www.w3.org/2000/svg";
  function svg(tag, attrs, parent) {
    var n = document.createElementNS(SVGNS, tag);
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function el(tag, cls, parent, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    if (parent) parent.appendChild(n);
    return n;
  }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  // Progress of t inside [a,b], clamped to 0..1, optionally eased (GSAP ease string).
  function seg(t, a, b, ease) {
    var p = clamp((t - a) / (b - a), 0, 1);
    return ease ? gsap.parseEase(ease)(p) : p;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function deepMerge(a, b) {
    var out = Array.isArray(a) ? a.slice() : Object.assign({}, a);
    if (!b) return out;
    Object.keys(b).forEach(function (k) {
      var bv = b[k], av = out[k];
      out[k] = (av && bv && typeof av === "object" && typeof bv === "object" && !Array.isArray(av) && !Array.isArray(bv)) ? deepMerge(av, bv) : bv;
    });
    return out;
  }
  // Inline builds (motion-igor.inline.js) put every asset in window.MOTION_IGOR_ASSETS as a data URI.
  function asset(path) {
    var inl = global.MOTION_IGOR_ASSETS;
    if (inl && inl[path]) return inl[path];
    return /^(https?:|data:|\/)/.test(path) ? path : KIT_BASE + path;
  }

  // ------------------------------------------------------------------ registry
  var REG = {};
  /**
   * define({ id, kind:"scene"|"element", title, style, duration, size:[w,h], engine:"dom"|"svg"|"canvas"|"webgl",
   *          theme?: preferred theme id when the caller gives none, defaults:{...content}, build(ctx) })
   * build(ctx) must add its tweens to ctx.tl synchronously. Optional return { destroy(), resize() }.
   */
  function define(def) {
    if (!def || !def.id || typeof def.build !== "function") throw new Error("motion-igor: define() needs id and build");
    def.kind = def.kind || "element";
    def.size = def.size || [1920, 1080];
    def.engine = def.engine || "dom";
    def.defaults = def.defaults || {};
    REG[def.id] = def;
    return def;
  }

  // ------------------------------------------------------------------ mount
  var STYLE_ID = "motion-igor-base-css";
  function ensureBaseCss() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent =
      ".mi-host{overflow:hidden}" +
      ".mi-stage{position:absolute;left:0;top:0;transform-origin:0 0;overflow:hidden}" +
      ".mi-stage *{box-sizing:border-box}" +
      ".mi-layer{position:absolute;inset:0}";
    document.head.appendChild(s);
  }

  /**
   * mount(host, id, opts) -> instance
   * opts: { content, theme, seed, fit:"contain"|"cover"|"width", background:true, params }
   */
  function mount(host, id, opts) {
    var def = REG[id];
    if (!def) throw new Error("motion-igor: unknown module '" + id + "'. Is its script loaded?");
    opts = opts || {};
    ensureBaseCss();
    if (host._mi) host._mi.destroy();
    // A page saved with its animations already rendered (e.g. a frontend-slides deck exported with Cmd+S)
    // carries a baked .mi-stage; drop it so the fresh mount is the only one.
    Array.prototype.slice.call(host.children).forEach(function (c) { if (c.classList && c.classList.contains("mi-stage")) c.remove(); });
    host.classList.add("mi-host");
    if (global.getComputedStyle(host).position === "static") host.style.position = "relative";
    host.setAttribute("data-mi-fit", opts.fit || "contain");

    var W = (opts.size && opts.size[0]) || def.size[0];
    var H = (opts.size && opts.size[1]) || def.size[1];
    if (!host.style.aspectRatio && !host.style.height && host.clientHeight < 2) host.style.aspectRatio = W + " / " + H;

    var theme = resolveTheme(opts.theme || def.theme);
    var stage = el("div", "mi-stage", host);
    stage.style.width = W + "px";
    stage.style.height = H + "px";
    stage.style.fontFamily = theme.body;
    stage.style.color = theme.ink;
    if (opts.background !== false) {
      stage.style.background = theme.paper;
      // Letterbox bars (host shape differs from the design shape) take the theme background, not white.
      if (!host.style.background && !host.style.backgroundColor) { host.style.background = theme.paper; host._miBg = true; }
    }

    var tl = gsap.timeline({ paused: true });
    var draws = [];
    var clock = { t: 0 };
    var scale = 1;
    var content = deepMerge(def.defaults, opts.content || {});
    var canvases = [];
    var children = [];

    var ctx = {
      def: def, host: host, stage: stage, W: W, H: H, theme: theme, content: content,
      params: Object.assign({}, def.params || {}, opts.params || {}),
      tl: tl, gsap: gsap, seed: opts.seed != null ? opts.seed : 1234, rand: prng(opts.seed != null ? opts.seed : 1234),
      util: { svg: svg, el: el, clamp: clamp, lerp: lerp, seg: seg, prng: prng, esc: esc, asset: asset },
      // Register a pure draw(t) function, called whenever the timeline time changes.
      onDraw: function (fn) { draws.push(fn); },
      // A canvas that covers the stage at real device resolution: canvas({ webgl, maxPr, cpu }). Returns { canvas, g, pr }.
      canvas: function (o) {
        o = o || {};
        var c = el("canvas", "mi-layer", stage);
        // maxPr caps the pixel ratio (e.g. 1 for heavy shaders: render at design size, the browser scales it).
        var info = { canvas: c, g: null, pr: 1, webgl: !!o.webgl, maxPr: o.maxPr || 2 };
        if (o.webgl) {
          info.g = c.getContext(o.webgl === 1 ? "webgl" : "webgl2", { premultipliedAlpha: true, antialias: true, preserveDrawingBuffer: true, alpha: o.alpha !== false });
        } else {
          // cpu: true keeps the 2D canvas on the CPU (willReadFrequently). Slow in WebKit at full stage size (re-uploaded
          // every frame): prefer small CPU-backed sprites blitted onto a normal canvas (AUTHORING rule 12).
          info.g = o.cpu ? c.getContext("2d", { willReadFrequently: true }) : c.getContext("2d");
        }
        canvases.push(info);
        sizeCanvas(info);
        return info;
      },
      // Play another module inside this one: mounts module `id` into `childHost` (an element inside the stage). The child
      // stays paused and is seeked from the parent's time: child time = clamp(t - at, 0, dur) + offset. So seeking the
      // parent seeks the child, the child never stretches the parent's length, and `offset` starts it mid-way.
      // o: { at, dur, offset, theme, content, seed, fit, background }. Showing or hiding the child's host outside its
      // window is the parent module's job. The child is destroyed with the parent. Used by reel-layout and grid-finale.
      nest: function (childHost, childId, o) {
        o = o || {};
        var child = mount(childHost, childId, { theme: o.theme || opts.theme || def.theme, content: o.content, seed: o.seed,
          fit: o.fit, background: o.background, size: o.size });
        var at = o.at || 0, off = o.offset || 0, dur = o.dur != null ? o.dur : child.duration - off;
        var last = null; // skip the seek when the child's time has not changed (same input, same picture)
        draws.push(function (t) { var ct = clamp(t - at, 0, dur) + off; if (ct !== last) { last = ct; child.seek(ct); } });
        children.push(child);
        return child;
      },
      time: function () { return clock.t; },
      logoUrl: function (dark) { return theme.logo ? asset(dark ? theme.logo.dark : theme.logo.light) : null; },
      // Width / height of the logo file logoUrl(dark) returns (the two files differ).
      logoAspect: function (dark) { return theme.logo ? (dark ? theme.logo.aspectDark : theme.logo.aspectLight) || theme.logo.aspect : null; }
    };

    function sizeCanvas(info) {
      var pr = Math.min(global.devicePixelRatio || 1, 2) * scale;
      pr = clamp(pr, 0.25, info.maxPr);
      info.pr = pr;
      info.canvas.width = Math.round(W * pr);
      info.canvas.height = Math.round(H * pr);
      info.canvas.style.width = W + "px";
      info.canvas.style.height = H + "px";
      if (!info.webgl) info.g.setTransform(pr, 0, 0, pr, 0, 0);
    }

    function render() { for (var i = 0; i < draws.length; i++) draws[i](clock.t, ctx); }

    var built = def.build(ctx) || {};
    if (host._miBg) host.style.background = stage.style.background || theme.paper; // match a module's own backdrop
    var duration = def.duration || tl.duration();
    // The clock tween fixes the length and drives draw(t) for canvas/WebGL modules.
    tl.fromTo(clock, { t: 0 }, { t: duration, duration: duration, ease: "none", immediateRender: true, onUpdate: render }, 0);

    function layout() {
      var w = host.clientWidth, h = host.clientHeight;
      if (!w) return;
      var fit = opts.fit || "contain";
      var s = fit === "width" ? w / W : fit === "cover" ? Math.max(w / W, h / H) : Math.min(w / W, (h || w * H / W) / H);
      var changed = Math.abs(s - scale) > 1e-4;
      scale = s;
      stage.style.transform = "translate(" + ((w - W * s) / 2) + "px," + (fit === "width" ? 0 : ((h - H * s) / 2)) + "px) scale(" + s + ")";
      if (changed && canvases.length) { canvases.forEach(sizeCanvas); if (built.resize) built.resize(scale); render(); }
    }
    var ro = global.ResizeObserver ? new ResizeObserver(layout) : null;
    if (ro) ro.observe(host);
    layout();
    render();

    var inst = {
      id: id, def: def, el: host, stage: stage, tl: tl, duration: duration, ctx: ctx,
      seek: function (t) { tl.pause(); tl.seek(clamp(t, 0, duration), false); render(); return inst; },
      play: function (from) { if (from != null) tl.seek(from, false); tl.play(); return inst; },
      pause: function () { tl.pause(); return inst; },
      replay: function () { tl.pause(); tl.seek(0, false); tl.play(); return inst; },
      end: function () { return inst.seek(duration); },
      progress: function () { return tl.time() / duration; },
      destroy: function () {
        if (inst._player) inst._player.stop();
        if (ro) ro.disconnect();
        tl.kill();
        children.forEach(function (c) { c.destroy(); });
        if (built.destroy) built.destroy();
        stage.remove();
        if (host._miBg) { host.style.background = ""; delete host._miBg; }
        host.classList.remove("mi-host");
        delete host._mi;
      }
    };
    host._mi = inst;
    return inst;
  }

  // ------------------------------------------------------------------ player
  var reduceMotion = global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * player(inst, { when, loop, threshold, replayOnEnter, trigger })
   * when:
   *   "view"     plays when at least `threshold` of the host is on screen (scroll pages, decks that hide
   *              inactive slides), resets when it leaves.
   *   "fragment" plays when its reveal step is shown: the nearest [data-fragment] ancestor (or the host)
   *              gains the class "fragment-visible" (frontend-slides decks); resets when the step is hidden.
   *   "click"    plays (from the start) when the host itself is clicked.
   *   "manual"   never starts by itself; call inst.play() / inst.replay().
   * trigger: a CSS selector or element; clicking it replays the animation (works with any `when`).
   * loop: true restarts from 0; {from:n} loops from n to the end after the first pass.
   * Reduced motion: shows the final frame, no movement.
   */
  function player(inst, o) {
    o = Object.assign({ when: "view", loop: false, threshold: 0.5, replayOnEnter: true }, o || {});
    var tl = inst.tl, io = null, mo = null, visible = false, offs = [];
    if (o.loop) {
      tl.eventCallback("onComplete", function () {
        var from = typeof o.loop === "object" && o.loop.from != null ? o.loop.from : 0;
        tl.seek(from, false); tl.play();
      });
    }
    function start() { if (reduceMotion) inst.end(); else inst.replay(); }
    function enter() {
      if (visible) return; visible = true;
      if (reduceMotion) { inst.end(); return; }
      if (o.replayOnEnter || tl.time() === 0) inst.replay(); else tl.play();
    }
    function leave() { if (!visible) return; visible = false; tl.pause(); if (o.replayOnEnter) inst.seek(0); }
    function listen(node, fn) { node.addEventListener("click", fn); offs.push(function () { node.removeEventListener("click", fn); }); }

    if (o.when === "view" && global.IntersectionObserver) {
      io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { (e.isIntersecting && e.intersectionRatio >= o.threshold - 1e-3) ? enter() : leave(); });
      }, { threshold: [0, o.threshold] });
      io.observe(inst.el);
    } else if (o.when === "fragment" && global.MutationObserver) {
      var frag = (inst.el.closest && inst.el.closest("[data-fragment]")) || inst.el;
      var check = function () { frag.classList.contains("fragment-visible") ? enter() : leave(); };
      mo = new MutationObserver(check);
      mo.observe(frag, { attributes: true, attributeFilter: ["class"] });
      check();
    } else if (o.when === "click") {
      inst.el.style.cursor = "pointer";
      listen(inst.el, start);
    } else if (reduceMotion) { inst.end(); }

    if (o.trigger) {
      var nodes = typeof o.trigger === "string" ? document.querySelectorAll(o.trigger) : [o.trigger];
      Array.prototype.forEach.call(nodes, function (n) { listen(n, function (e) { e.preventDefault(); start(); }); });
    }
    var p = { enter: enter, leave: leave, play: start, stop: function () {
      if (io) io.disconnect(); if (mo) mo.disconnect(); offs.forEach(function (f) { f(); }); tl.eventCallback("onComplete", null);
    } };
    inst._player = p;
    return p;
  }

  // ------------------------------------------------------------------ declarative auto-mount
  /**
   * <div data-motion="flat-vector" data-theme="ais" data-play="view" data-loop="true"
   *      data-trigger="#replayBtn" data-content='{"title":"..."}'></div>
   * or put the JSON in a child <script type="application/json">.
   * data-play defaults to "fragment" inside a [data-fragment] reveal step, else "view".
   */
  function auto(root) {
    root = root || document;
    var nodes = root.querySelectorAll("[data-motion]");
    var out = [];
    Array.prototype.forEach.call(nodes, function (n) {
      if (n._mi) return;
      var json = n.getAttribute("data-content");
      var sc = n.querySelector('script[type="application/json"]');
      var content = {};
      try { content = json ? JSON.parse(json) : sc ? JSON.parse(sc.textContent) : {}; } catch (e) { console.warn("motion-igor: bad JSON in", n, e); }
      var loopAttr = n.getAttribute("data-loop");
      var loop = loopAttr == null || loopAttr === "false" ? false : /^\d+(\.\d+)?$/.test(loopAttr) ? { from: parseFloat(loopAttr) } : true;
      var inst = mount(n, n.getAttribute("data-motion"), {
        content: content, theme: n.getAttribute("data-theme") || undefined,
        fit: n.getAttribute("data-fit") || undefined,
        seed: n.hasAttribute("data-seed") ? +n.getAttribute("data-seed") : undefined,
        // data-size="1080x1920": design size (portrait layouts of modules that support them)
        size: /^\d+x\d+$/.test(n.getAttribute("data-size") || "") ? n.getAttribute("data-size").split("x").map(Number) : undefined,
        background: n.getAttribute("data-background") !== "false"
      });
      var when = n.getAttribute("data-play") || (n.closest && n.closest("[data-fragment]") ? "fragment" : "view");
      if (when !== "none") player(inst, { when: when, loop: loop, trigger: n.getAttribute("data-trigger") || undefined, replayOnEnter: n.getAttribute("data-replay") !== "false" });
      out.push(inst);
    });
    return out;
  }

  // ------------------------------------------------------------------ HyperFrames adapter
  /**
   * Build the composition's single master timeline synchronously and register it.
   * items: [{ el, id, start, opts }]
   */
  function hyperframes(compositionId, items) {
    var master = gsap.timeline({ paused: true });
    (items || []).forEach(function (it) {
      var inst = mount(it.el, it.id, it.opts || {});
      master.add(inst.tl.paused(false), it.start || 0);
    });
    global.__timelines = global.__timelines || {};
    global.__timelines[compositionId] = master;
    return master;
  }

  global.MotionIgor = {
    version: "0.2.0",
    define: define, mount: mount, player: player, auto: auto, hyperframes: hyperframes,
    themes: THEMES, theme: resolveTheme, registry: REG,
    list: function (kind) { return Object.keys(REG).map(function (k) { return REG[k]; }).filter(function (d) { return !kind || d.kind === kind; }); },
    util: { prng: prng, svg: svg, el: el, clamp: clamp, lerp: lerp, seg: seg, esc: esc, deepMerge: deepMerge, asset: asset },
    base: KIT_BASE
  };
})(window);

;
/* P-2 shared helpers · p2-form  (loaded before every p2 module)
 *
 * 1. window.P2Class(child) -> string
 *    One place for how a child's class is written on screen. The app's raw form value is shown as it is, except that
 *    "PREP A" reads "Prep A" (anything starting with "PREP " gets "Prep " + the rest). With no form, the grade is used.
 *
 * 2. window.P2Fit.create({ css, html, max }) -> { scale(), width(), destroy() }
 *    ONE shrink-to-fit helper for every name / class label (gate caption, walk caption, desk name card, cake writing).
 *    The label is measured on an OFF-SCREEN twin (position:fixed far left, visibility:hidden, in document.body; never
 *    display:none, which measures 0), at its natural size. scale() = min(1, max / natural width), re-measured after the
 *    font has loaded (a measurement of 0 is never kept). Apply it as transform: scale(...) about the label's centre.
 *    Call destroy() when the beat is destroyed.
 *    P2Fit.chars(parts) builds the twin's html for a caption made of one inline-block per letter (so it measures the same
 *    as the visible letters, which pop in one by one and cannot kern across each other): parts = [[text, fontPx, color?], ...].
 *
 * 3. window.P2Wide.begin(ctx) -> { col, sw, ox, wide, bg(art, file, h), src(art, wideFile, file) }
 *    The story stage follows the screen: 1080 x 1920 on a phone, up to 3414 x 1920 (16:9) on a laptop. Every beat keeps
 *    its own 1080-wide design in a centred COLUMN (`col`, left = ox), so figures, sorter box, cake and family stay exactly
 *    where they were; only the picture behind them is the WIDE one (centre 1080 px = the portrait picture) and the extra
 *    width on each side is background. ox = (stage width - 1080) / 2, always a whole number (the story keeps the width even).
 *    bg() gives the css box of a background picture inside the column (left -1167, 3414 wide when wide), src() the file.
 */
(function () {
window.P2Class = function (child) {
  var f = child && child.form != null && String(child.form).trim() !== "" ? String(child.form).trim() : null;
  if (f === null) return child && child.grade != null ? String(child.grade) : "";
  return f.indexOf("PREP ") === 0 ? "Prep " + f.slice(5) : f;
};

// ------------------------------------------------------------------------------------------------ shrink to fit
var fitters = [];
if (document.fonts && document.fonts.addEventListener) {
  document.fonts.addEventListener("loadingdone", function () { fitters.forEach(function (f) { f.reset(); }); });
}
window.P2Fit = {
  create: function (o) {
    var m = null, nat = -1, k = 1;
    function measure() {
      if (!m) {
        m = document.createElement("div");
        m.setAttribute("aria-hidden", "true");
        m.style.cssText = "position:fixed;left:-20000px;top:0;visibility:hidden;pointer-events:none;" + o.css;
        m.innerHTML = o.html;
        document.body.appendChild(m);
      }
      var w = m.getBoundingClientRect().width;
      if (w > 0 && w !== nat) { nat = w; k = w > o.max ? o.max / w : 1; }
    }
    var f = {
      scale: function () { measure(); return k; },
      width: function () { measure(); return nat; },
      reset: function () { nat = -1; },
      destroy: function () { if (m && m.parentNode) m.parentNode.removeChild(m); m = null; var i = fitters.indexOf(f); if (i >= 0) fitters.splice(i, 1); }
    };
    fitters.push(f);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(f.reset);
    return f;
  },
  chars: function (parts, font) {
    return parts.map(function (p) {
      return '<span style="display:inline-flex">' + String(p[0]).split("").map(function (ch) {
        return '<span style="display:inline-block;font:700 ' + p[1] + "px/1 " + font + ';white-space:pre">' + ch.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</span>";
      }).join("") + "</span>";
    }).join("");
  }
};

// ------------------------------------------------------------------------------------------------ wide stage
var WIDE_W = 3414, WIDE_LEFT = (WIDE_W - 1080) / 2;                 // the wide pictures are 3414 wide with the portrait picture exactly in the middle
window.P2Wide = {
  WIDE_W: WIDE_W, WIDE_LEFT: WIDE_LEFT,
  begin: function (ctx) {
    var sw = ctx.W, ox = Math.max(0, Math.round((sw - 1080) / 2)), wide = sw > 1080;
    var col = document.createElement("div");
    col.style.cssText = "position:absolute;left:" + ox + "px;top:0;width:1080px;height:1920px";
    ctx.stage.appendChild(col);
    return {
      col: col, sw: sw, ox: ox, wide: wide, wideLeft: wide ? WIDE_LEFT : 0,
      // css box of a background picture inside the column; h = the picture's height (1920, or 1935 for the arrival and classroom ones)
      bg: function (h, top) { return "left:" + (wide ? -WIDE_LEFT : 0) + "px;top:" + (top || 0) + "px;width:" + (wide ? WIDE_W : 1080) + "px;height:" + h + "px"; },
      // the file to load: wide pictures live in <base>wide/, next to the <something>-layers/ folders (art = "<base>x-layers/")
      src: function (art, wideFile, file) { return wide ? String(art).replace(/[^\/]*\/$/, "wide/") + wideFile : art + file; }
    };
  }
};
// ------------------------------------------------------------------------------------------------ child pictures (girl / boy)
// The pictures that show the child (walk pair, gate pair, classroom desk, party, family) exist per look in <base>girl/ and <base>boy/
// (same <x>-layers/ names, plus wide/); backgrounds without the child stay in <base>. P2Kid.art(content, art) turns "<base>walk-layers/"
// into "<base>girl/walk-layers/". ON by default since 23 Oct 2026 (all pieces of both looks built): look "girl" = the girl art, anything else
// (a boy, or a name that cannot be read = neutral child) = the boy art. Switch back to the old single-child art with content.kidArt false,
// window.P2_KID_ART false or ?kidart=0 in the address.
window.P2Kid = {
  ON: true,
  art: function (c, art) {
    var on = c.kidArt !== undefined ? !!c.kidArt : (window.P2_KID_ART !== undefined ? !!window.P2_KID_ART : (P2Kid.ON && !/[?&]kidart=0\b/.test(location.search)));
    // Grade 3-6 (content.band "g36"): the same folders with a 36 on them (girl36 = Noor's art, boy36 = the Grade 3-6 boy), see rebuild-serve.sh
    var kid = (c.look === "girl" ? "girl" : "boy") + (c.band === "g36" ? "36" : "");
    return on ? String(art).replace(/([^\/]*\/)$/, kid + "/$1") : art;
  }
};
})();

;
/* P-2 shared helper · p2-data
 * Turns what the parent page gets from the app (the `fetch-student-data` response for a parent link:
 * {student, years, defaultYear, dataAsOf, dataAsOfByYear}) into the content the P-2 story plays.
 * One place for the numbers, so every beat shows exactly what the primary parent page shows:
 *   - the child's 26/27 record (`years["2627"]`, falling back to `student`) is the one used, like the page's default;
 *   - period totals come from `student.periods.{week,term,year}` (the page's PeriodTotals);
 *   - attendance % and punctuality % = Math.round(attendancePercent(...)) from src/lib/attendance.ts, copied here;
 *   - time not at school = late minutes + days absent x 330 (primary) or 315 (secondary), hours = Math.round(min / 60),
 *     lessons = Math.floor(min / 30 (primary) or 35 (secondary)), exactly as PrimaryParentDashboard.tsx works them out;
 *   - `perfect` is PrimaryParentDashboard.hasPerfectWeek, copied rule for rule (including its 26/27 empty-week rule).
 * Plain JS, no build step. Browser: window.P2Data. Node: globalThis.P2Data (and module.exports).
 * P2Data.toStory(response) -> content for p2-story (and for every beat):
 *   { response (the raw input), child:{name,form,grade}, weekEnding:"2026-10-15", weekNumber:7, episode:"Week 7", termNumber, perfect, dataAsOf, years:["2627",...],
 *     lastWeek / term / year: { daysOpen, absent, lateToSchool, lateMinutes, earlyLeave,
 *                               attendancePct, punctualityPct, minutes, hours, lessons } }
 * Week numbers and labels (D2 and D3 of the app, 22 Oct 2026): the SERVER numbers the weeks (SPEA term starts and lengths, week
 * number = whole weeks since the term's start Monday + 1, Term 1 week 1 never counted) and sends them as `weekList`
 * [{weekEnding, term, weekInTerm}] (only the weeks this child has a row in). Nothing is worked out here: the story's "Week N" is the
 * weekInTerm of the child's newest week, exactly the number the page's Term / Week picker shows for it. The page's week helpers
 * (weekEndingText, weekOptionLabel, groupWeeksByTerm, newestWeekEnding, weekHeading, periodForWeek, studentForWeek) are copied below
 * from src/lib/attendance.ts and p2-data.test.mjs runs the app's own copy against them.
 */
(function (root) {
"use strict";

// ---- copied from src/lib/attendance.ts -------------------------------------------------------------------------------
/** Attendance % = (days open - days absent) / days open, kept inside 0..100. No open days = 100. */
function attendancePercent(daysOpen, absentDays) {
  if (!(daysOpen > 0)) return 100;
  var pct = ((daysOpen - absentDays) / daysOpen) * 100;
  return Math.max(0, Math.min(100, pct));
}
function punctualityPercent(daysOpen, lateDays) { return attendancePercent(daysOpen, lateDays); }

// ---- copied from src/lib/attendance.ts (D3: Term / Week picker) --------------------------------------------------------
var MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "15 Oct" from "2026-10-15" (a plain calendar date). */
function formatShortDate(iso) {
  var m = String(iso == null ? "" : iso).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return "";
  return Number(m[3]) + " " + MONTHS_SHORT[Number(m[2]) - 1];
}
/** "Week ending 15 Oct". Empty when there is no date. */
function weekEndingText(iso) { var d = formatShortDate(iso); return d ? "Week ending " + d : ""; }
/** The option text of the Term / Week picker: "Term 1 \u00b7 Week 7 \u00b7 Week ending 15 Oct". */
function weekOptionLabel(w) { return "Term " + w.term + " \u00b7 Week " + w.weekInTerm + " \u00b7 " + weekEndingText(w.weekEnding); }
/** The weeks grouped term by term, in the order given (the server sends oldest first). */
function groupWeeksByTerm(weeks) {
  var out = [];
  for (var i = 0; i < weeks.length; i++) {
    var w = weeks[i], last = out[out.length - 1];
    if (last && last.term === w.term) last.weeks.push(w); else out.push({ term: w.term, weeks: [w] });
  }
  return out;
}
/** The newest stored week (a week_ending string), or null. */
function newestWeekEnding(weeks) {
  var best = null;
  for (var i = 0; i < weeks.length; i++) if (!best || weeks[i].weekEnding > best) best = weeks[i].weekEnding;
  return best;
}
/** What the screens call the chosen week: the newest is "Last Week", any other is "Term 1 \u00b7 Week 5"; sub = "Week ending 8 Oct". Null in 25/26. */
function weekHeading(year, chosen, newest, weeks) {
  if (year !== "2627") return null;
  var week = chosen != null ? chosen : (newest != null ? newest : null);
  if (!week) return { name: "Last Week", sub: "" };
  if (week === (newest != null ? newest : null)) return { name: "Last Week", sub: weekEndingText(week) };
  var info = null;
  for (var i = 0; i < weeks.length; i++) if (weeks[i].weekEnding === week) { info = weeks[i]; break; }
  return { name: info ? "Term " + info.term + " \u00b7 Week " + info.weekInTerm : "Selected week", sub: weekEndingText(week) };
}
/** The order of the numbers in one week's compact array (WEEK_FIELDS in src/lib/attendance.ts). */
var WEEK_FIELDS = ["daysOpen", "absentValid", "absentInvalid", "lateToSchool", "lateToSchoolMinutes", "earlyLeave", "lateToClass", "bathroom", "clinic", "awards"];
function periodForWeek(s, weekEnding) {
  var a = s.weekly ? s.weekly[weekEnding] : undefined, out = {};
  WEEK_FIELDS.forEach(function (f, i) { out[f] = Number(a ? a[i] : undefined) || 0; });
  return out;
}
/** The same child with the "week" numbers swapped for the chosen week (the newest week or no choice = untouched). */
function studentForWeek(s, weekEnding) {
  if (!weekEnding || !s.weekly || weekEnding === s.lastWeekEnding) return s;
  var w = periodForWeek(s, weekEnding), out = {};
  for (var k in s) if (Object.prototype.hasOwnProperty.call(s, k)) out[k] = s[k];
  out.periods = s.periods ? { year: s.periods.year, term: s.periods.term, week: w } : s.periods;
  out.lastWeekEnding = weekEnding;
  out.lateToSchoolThisWeek = w.lateToSchool;
  out.lateToSchoolMinutesThisWeek = w.lateToSchoolMinutes;
  out.lateToClassThisWeek = w.lateToSchool;
  out.validAbsenceLast7Days = w.absentValid;
  out.invalidAbsenceLast7Days = w.absentInvalid;
  out.earlyLeaveThisWeek = w.earlyLeave;
  out.totalDaysLast7Days = w.daysOpen;
  return out;
}

// ---- copied from src/pages/PrimaryParentDashboard.tsx ----------------------------------------------------------------
/** hasPerfectWeek(student): no absences, no lates, no early leave in the last 7 days; an empty week is not perfect and 25/26 never is. */
function hasPerfectWeek(student) {
  var totalAbsencesLast7Days = (student.validAbsenceLast7Days != null ? student.validAbsenceLast7Days : 0) +
    (student.invalidAbsenceLast7Days != null ? student.invalidAbsenceLast7Days : 0);
  // 25/26 has no last week (frozen June 2026 numbers), so no celebration there (D3).
  if (student.year !== "2627") return false;
  // A week with no open days is not a perfect week, just an empty one.
  var wk = student.periods && student.periods.week;
  var openDays = wk && wk.daysOpen != null ? wk.daysOpen : 0;
  if (openDays === 0) return false;
  return (
    totalAbsencesLast7Days === 0 &&
    student.lateToSchoolThisWeek === 0 &&
    student.lateToClassThisWeek === 0 &&
    student.earlyLeaveThisWeek === 0
  );
}

// Copied from the minutes-not-at-school statement of PrimaryParentDashboard.tsx (it still uses its own list, not isSecondaryStudent).
var SECONDARY_GRADES = ["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
function isSecondary(student) {
  return student.school ? student.school === "Secondary" : SECONDARY_GRADES.indexOf(student.grade) !== -1;
}

// ---- grade labels: the database stores "Grade -2" / "Grade -1" / "Grade 0" / "PREP", the app now SHOWS "Pre Kindy" / "Kindy" / "Prep"
// (displayGrade in supabase/functions/_shared/attendanceView.ts). ONE mapping here, used by the code and every test.
var P2_BANDS = ["Pre Kindy", "Kindy", "Prep", "Grade 1", "Grade 2"];
var P2_BAND_STORED = { "Pre Kindy": "Grade -2", "Kindy": "Grade -1", "Prep": "Grade 0", "Grade 1": "Grade 1", "Grade 2": "Grade 2" };
/** band(grade) -> "Pre Kindy" | "Kindy" | "Prep" | "Grade 1" | "Grade 2" for a P-2 child (stored OR displayed label), else null. */
function band(grade) {
  var g = String(grade == null ? "" : grade).trim().toLowerCase().replace(/\s+/g, " ");
  if (g === "grade -2" || g === "pre kindy") return "Pre Kindy";
  if (g === "grade -1" || g === "kindy") return "Kindy";
  if (g === "grade 0" || g === "prep") return "Prep";
  if (g === "grade 1") return "Grade 1";
  if (g === "grade 2") return "Grade 2";
  return null;
}
function isP2(grade) { return band(grade) !== null; }

// ---- the Grade 3-6 band (24 Oct 2026): same story, a different game scene (jigsaw for girls, football for boys). P-2 results above are untouched.
var G36_BANDS = ["Grade 3", "Grade 4", "Grade 5", "Grade 6"];
/** g36Band(grade) -> "Grade 3" | "Grade 4" | "Grade 5" | "Grade 6" for a Grade 3-6 child, else null. */
function g36Band(grade) {
  var g = String(grade == null ? "" : grade).trim().toLowerCase().replace(/\s+/g, " ");
  for (var i = 0; i < G36_BANDS.length; i++) if (g === G36_BANDS[i].toLowerCase()) return G36_BANDS[i];
  return null;
}
function isG36(grade) { return g36Band(grade) !== null; }
/** storyGrade(grade): does this child get the animated story (P-2 or Grade 3-6)? */
function storyGrade(grade) { return isP2(grade) || isG36(grade); }
/** storyBand(grade) -> "p2" | "g36" | null: which story band the grade plays. */
function storyBand(grade) { return isP2(grade) ? "p2" : isG36(grade) ? "g36" : null; }

function nz(x) { return x != null ? x : 0; }

/** One period (week / term / year) in the story's names, plus the numbers the page works out from it. */
function period(student, p) {
  var absent = nz(p.absentValid) + nz(p.absentInvalid);
  var late = nz(p.lateToSchool), lateMin = nz(p.lateToSchoolMinutes), open = nz(p.daysOpen);
  var sec = isSecondary(student);
  var perDay = sec ? 315 : 330, lessonLen = sec ? 35 : 30;
  var minutes = lateMin + absent * perDay;
  return {
    daysOpen: open,
    absent: absent,
    lateToSchool: late,
    lateMinutes: lateMin,
    earlyLeave: nz(p.earlyLeave),
    attendancePct: Math.round(attendancePercent(open, absent)),
    punctualityPct: Math.round(punctualityPercent(open, late)),
    minutes: minutes,
    hours: Math.round(minutes / 60),
    lessons: Math.floor(minutes / lessonLen)
  };
}

/** When the response has no `periods` (old shape), fall back to the old field names the page also carries. */
function legacyPeriods(s) {
  return {
    week: { daysOpen: s.totalDaysLast7Days, absentValid: s.validAbsenceLast7Days, absentInvalid: s.invalidAbsenceLast7Days,
      lateToSchool: s.lateToSchoolThisWeek, lateToSchoolMinutes: s.lateToSchoolMinutesThisWeek, earlyLeave: s.earlyLeaveThisWeek },
    term: { daysOpen: s.totalDaysThisTerm, absentValid: s.validAbsenceThisTerm, absentInvalid: s.invalidAbsenceThisTerm,
      lateToSchool: s.lateToSchoolThisTerm, lateToSchoolMinutes: s.lateToSchoolMinutesThisTerm, earlyLeave: s.earlyLeaveThisTerm },
    year: { daysOpen: s.totalDaysInSchool, absentValid: s.validAbsenceThisYear, absentInvalid: s.invalidAbsenceThisYear,
      lateToSchool: s.lateToSchoolThisYear, lateToSchoolMinutes: s.lateToSchoolMinutes, earlyLeave: s.earlyLeaveThisYear }
  };
}

// The week number is the app's own: the server sends weekList = [{weekEnding, term, weekInTerm}] and the Term / Week picker on
// the page names a week "Term 1 \u00b7 Week 7". The story shows the same weekInTerm. No weekList (older server, 25/26 only): null,
// never a guessed number.
function weekNumberOf(iso, weekList) {
  var key = String(iso || "").slice(0, 10);
  if (!key || !weekList || !weekList.length) return null;
  for (var i = 0; i < weekList.length; i++) {
    var w = weekList[i];
    if (w && String(w.weekEnding || "").slice(0, 10) === key && w.weekInTerm != null) return Number(w.weekInTerm);
  }
  return null;
}

function toStory(response) {
  var years = (response && response.years) || {};
  var student = years["2627"] || (response && response.student);
  if (!student) throw new Error("P2Data.toStory: the response has no student");
  var per = student.periods || legacyPeriods(student);
  var n = weekNumberOf(student.lastWeekEnding, response && response.weekList);
  var asOfBy = (response && response.dataAsOfByYear) || {};
  var keys = Object.keys(years);
  return {
    child: { name: student.forename != null && student.forename !== "" ? student.forename : student.name, form: student.form, grade: student.grade },
    weekEnding: student.lastWeekEnding || null,
    weekEndingText: weekEndingText(student.lastWeekEnding),          // "Week ending 15 Oct", the page's own label
    weekNumber: n,
    episode: n != null ? "Week " + n : "Last week",
    termNumber: student.termNumber != null ? student.termNumber : null,
    perfect: hasPerfectWeek(student),
    dataAsOf: asOfBy["2627"] != null ? asOfBy["2627"] : (response && response.dataAsOf != null ? response.dataAsOf : null),
    years: keys.length ? keys : (student.year ? [student.year] : []),
    lastWeek: period(student, per.week),
    term: period(student, per.term),
    year: period(student, per.year),
    response: response                  // the raw response, kept so the last beat (P2Page) can show the whole page from it
  };
}

// ---- the whole parent page (P2Page): both years, the Last Week block and the three charts ---------------------------------
/** The page's "Late to School" ring in the Last Week block reads `lateToClassThisWeek` (PrimaryParentDashboard.tsx), the charts
 *  read `lateToSchoolThisWeek`; for primary children they are equal (checked on every child in the preview). */
function pickOld(v, fallback) { return v != null ? v : fallback; }

/** One year's record in the shape P2Page draws. Rules copied from PrimaryParentDashboard.tsx (current year = 26/27).
 *  weekList = the response's weeks (26/27); picked = the week the viewer chose in the Term / Week picker (null = the newest).
 *  The page's own order: the chosen week's numbers replace the "week" ones (studentForWeek), the heading names the week
 *  (weekHeading: "Last Week" for the newest, else "Term 1 \u00b7 Week 5"), 25/26 has no week at all (weekLabel null). */
function pageYear(student, key, dataAsOf, weekList, picked) {
  var cur = key === "2627";
  var weeks = cur && weekList ? weekList : [];
  var newest = cur ? (student.lastWeekEnding != null ? student.lastWeekEnding : newestWeekEnding(weeks)) : null;
  var inList = false;
  for (var i = 0; i < weeks.length; i++) if (weeks[i].weekEnding === picked) inList = true;
  var chosen = cur ? (picked && inList ? picked : newest) : null;
  var st = cur ? studentForWeek(student, chosen) : student;
  var heading = weekHeading(key, chosen, newest, weeks);
  var per = st.periods || legacyPeriods(st);
  var wk = per.week || {}, tm = per.term || {}, yr = per.year || {};
  var weekAbsent = nz(pickOld(st.validAbsenceLast7Days, wk.absentValid)) + nz(pickOld(st.invalidAbsenceLast7Days, wk.absentInvalid));
  var termAbsent = nz(pickOld(st.validAbsenceThisTerm, tm.absentValid)) + nz(pickOld(st.invalidAbsenceThisTerm, tm.absentInvalid));
  var yearAbsent = nz(pickOld(st.validAbsenceThisYear, yr.absentValid)) + nz(pickOld(st.invalidAbsenceThisYear, yr.absentInvalid));
  var lateWeek = nz(pickOld(st.lateToSchoolThisWeek, wk.lateToSchool));
  return {
    year: key,
    current: cur,
    weekLabel: heading ? heading.name : null,                                  // null in 25/26: no week button, no week block, two bars per chart
    weekSub: heading ? heading.sub : "",                                       // "Week ending 15 Oct"
    weekEnding: cur ? chosen : null,
    newestWeek: newest,
    // the Term / Week picker (26/27 only, and only when the server sent weeks): groups term by term, option text as the page writes it
    picker: cur && weeks.length ? { value: chosen, groups: groupWeeksByTerm(weeks).map(function (g) { return { term: g.term, options: g.weeks.map(function (w) { return { value: w.weekEnding, label: weekOptionLabel(w), term: w.term, weekInTerm: w.weekInTerm }; }) }; }) } : null,
    dataAsOf: dataAsOf != null ? dataAsOf : null,
    action: !!student.action,
    child: { name: student.forename != null && student.forename !== "" ? student.forename : student.name, form: student.form, grade: student.grade },
    perfect: hasPerfectWeek(student),                                          // the page decides this once, on the newest week
    periods: { week: period(st, per.week), term: period(st, per.term), year: period(st, per.year) },
    // the Last Week block (three rings): days absent, late to school (the page reads lateToClassThisWeek), early leave
    lastWeek: { absent: weekAbsent, lateToSchool: nz(pickOld(st.lateToClassThisWeek, lateWeek)), earlyLeave: nz(pickOld(st.earlyLeaveThisWeek, wk.earlyLeave)) },
    // the three charts, each Last Week (or the chosen week) / This Term / This Year (the page's MetricChart data; 25/26 has no week bar)
    charts: {
      absence: { week: weekAbsent, term: termAbsent, year: yearAbsent },
      late: { week: lateWeek, term: nz(pickOld(st.lateToSchoolThisTerm, tm.lateToSchool)), year: nz(pickOld(st.lateToSchoolThisYear, yr.lateToSchool)) },
      early: { week: nz(pickOld(st.earlyLeaveThisWeek, wk.earlyLeave)), term: nz(pickOld(st.earlyLeaveThisTerm, tm.earlyLeave)), year: nz(pickOld(st.earlyLeaveThisYear, yr.earlyLeave)) }
    }
  };
}

/** A response-like object built from toStory content (so the last beat still draws something when it is mounted without a response). */
function responseFromStory(c) {
  function per(p) { return { daysOpen: p.daysOpen, absentValid: p.absent, absentInvalid: 0, lateToSchool: p.lateToSchool, lateToSchoolMinutes: p.lateMinutes, earlyLeave: p.earlyLeave }; }
  var student = {
    year: "2627", grade: (c.child && c.child.grade) || "", form: (c.child && c.child.form) || "", school: "Primary",
    name: c.child && c.child.name, forename: c.child && c.child.name,
    lastWeekEnding: c.weekEnding || null, termNumber: c.termNumber != null ? c.termNumber : null,
    periods: { week: per(c.lastWeek), term: per(c.term), year: per(c.year) },
    lateToClassThisWeek: c.lastWeek.lateToSchool, earlyLeaveThisWeek: c.lastWeek.earlyLeave,
    validAbsenceLast7Days: c.lastWeek.absent, invalidAbsenceLast7Days: 0
  };
  return { student: student, defaultYear: "2627", years: { "2627": student }, dataAsOf: c.dataAsOf != null ? c.dataAsOf : null, dataAsOfByYear: { "2627": c.dataAsOf != null ? c.dataAsOf : null } };
}

/** P2Data.toPage(response | story content) -> { defaultYear, years:["2627","2526"] (those present), byYear:{ "2627": pageYear, ... } }.
 *  Same year rules as the page: default = defaultYear (else 26/27), a year switch only when more than one year is present,
 *  data note date per year (dataAsOfByYear, else dataAsOf for the default year). byYear[k].atWeek(weekEnding) gives the same record
 *  for another week of the Term / Week picker (26/27; 25/26 ignores it). */
function toPage(input) {
  var response = input && input.response ? input.response : input && input.student ? input : input && input.years && !Array.isArray(input.years) ? input : responseFromStory(input);
  var yrs = response.years || (response.student ? (function () { var o = {}; o[response.student.year || "2627"] = response.student; return o; })() : {});
  var keys = ["2627", "2526"].filter(function (k) { return !!yrs[k]; });
  if (!keys.length) throw new Error("P2Data.toPage: the response has no student");
  var first = response.defaultYear && yrs[response.defaultYear] ? response.defaultYear : keys[0];
  var asOfBy = response.dataAsOfByYear || (function () { var o = {}; o[first] = response.dataAsOf != null ? response.dataAsOf : null; return o; })();
  var weekList = Array.isArray(response.weekList) ? response.weekList : [];
  var byYear = {};
  keys.forEach(function (k) {
    var cache = {};
    var rec = pageYear(yrs[k], k, asOfBy[k], weekList, null);
    rec.atWeek = function (w) {
      if (!rec.current || w == null) return rec;
      if (!cache[w]) cache[w] = pageYear(yrs[k], k, asOfBy[k], weekList, w);
      return cache[w];
    };
    byYear[k] = rec;
  });
  return { defaultYear: first, years: keys, byYear: byYear };
}

var API = { toStory: toStory, toPage: toPage, hasPerfectWeek: hasPerfectWeek, attendancePercent: attendancePercent, punctualityPercent: punctualityPercent, weekNumberOf: weekNumberOf,
  weekEndingText: weekEndingText, weekOptionLabel: weekOptionLabel, groupWeeksByTerm: groupWeeksByTerm, newestWeekEnding: newestWeekEnding, weekHeading: weekHeading, periodForWeek: periodForWeek, studentForWeek: studentForWeek, band: band, isP2: isP2, g36Band: g36Band, isG36: isG36, storyGrade: storyGrade, storyBand: storyBand, G36_BANDS: G36_BANDS, P2_BANDS: P2_BANDS, P2_BAND_STORED: P2_BAND_STORED };
root.P2Data = API;
if (typeof module !== "undefined" && module.exports) module.exports = API;
})(typeof window !== "undefined" ? window : globalThis);

;
/* P-2 page · p2-page   (the primary parent page in the story's 3D storybook look; the last story beat AND the page itself)
 *
 * P2Page.mount(el, response, opts) -> { setYear(key), setView("term"|"year"), setWeek(weekEnding), goToWeek(), seek(t), getState(), destroy() }
 *
 * One renderer, two places. Today the story's last beat mounts it inside the 1080 x 1920 stage (scaled by 1080 / 390); later the
 * app mounts the same file as /primary-parent/<token> itself. It is real, responsive DOM (design width 390 CSS px, fine from 360 to
 * 430 and wider), plain JS, no React, no build step.
 *
 * Content (what PrimaryParentDashboard.tsx shows a primary family, same order, same wording and rules):
 *   title "Student Attendance Report"; 26/27 | 25/26 year switch (only when the child has both); the Term / Week picker (26/27, a native
 *   select grouped term by term, "Term 1 \u00b7 Week 7 \u00b7 Week ending 15 Oct"; it follows D3 of the app: the chosen week replaces "Last
 *   Week" in the week button, the week block and the charts); the data note "This data is our most accurate data as of <date>.";
 *   the child's first name and class; This Year / This Term / <week name> buttons (the first two switch the three cards, the week button
 *   scrolls to the week block); Absences card (total days absent, attendance %); Total Time not at School (minutes, hours, lessons);
 *   Lateness (total days late, punctuality %); the week block with its "Week ending 15 Oct" label (days absent, late to school, early
 *   leave); three charts (Absence, Late to School, Early Leave), each with week / This Term / This Year bars; the data note again at
 *   the bottom. 25/26 follows the page: no week button, no week block, no Term / Week picker, two bars per chart.
 * Left off on purpose (primary does not track them): Late to Class, Bathroom Visits, Clinic Visits, Recognition awards, "More about this year".
 * Never red: a miss is gold, a zero is a green tick.
 *
 * Layout (22 Oct, Igor's points 4 and 6): order is title, 26/27 button + Term / Week picker, data note, then the clock wall as a modest banner (480 px wide at most,
 * about 20% of a phone screen, fading into the page on wide screens), then the child card and cards. The page scales by its OWN width (container queries, so the
 * story stage, a phone and a laptop all work): under 600 px one column; 600 and up two columns; 960 and up the three summary cards and the three charts side by
 * side, content never wider than 1200 px.
 *
 * Numbers come from P2Data.toPage(response) (p2-data.js), which copies the page's own rules; nothing is worked out here.
 * Every number element carries data-m="<name>" and data-v="<number>" (the check script and later tests read those).
 *
 * opts: { wall: "final-layers/wall-tall.jpg"   the wall picture behind the page (scrolls with it)
 *         font: "Fredoka-normal.woff2"          the font file (declared as P2Fredoka)
 *         scroll: "self" | "window"             who scrolls: the host element itself (story stage) or the document (default "window")
 *         entrance: true | false                standalone only: play the entrance by itself (default true; the story drives seek(t) instead)
 *         driven: true                          the caller drives the entrance through seek(t) (the story does) }
 *
 * seek(t): the ENTRANCE as a pure function of t (cards rise one after another, rings fill, numbers count up, bars grow), t in seconds,
 * done at P2Page.END (3 s). From END on the page is complete and live: tappable and scrollable. Seeking back before END shows the
 * entrance of the default view again (this resets the year and view). After END, seek() does nothing, so a running story clock never
 * undoes what a parent has tapped. Taps after the entrance re-fill the rings with a short live tween (not part of the story clock).
 */
(function (root) {
"use strict";

var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f", GOLDD = "#a86a00";
var END = 3.0;
var YEAR_LABEL = { "2627": "26/27 Attendance", "2526": "25/26 Attendance" };
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
function outCubic(x) { return 1 - Math.pow(1 - x, 3); }
function longDate(iso) { var m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? Number(m[3]) + " " + MONTHS[Number(m[2]) - 1] + " " + m[1] : ""; }   // as lib/attendance.ts formatLongDate
function className(child) {
  if (root.P2Class) return root.P2Class(child);
  var f = child && child.form != null && String(child.form).trim() !== "" ? String(child.form).trim() : null;
  if (f === null) return child && child.grade != null ? String(child.grade) : "";
  return f.indexOf("PREP ") === 0 ? "Prep " + f.slice(5) : f;
}

// ---------------------------------------------------------------------------------------------------------------------------
var WIDE_T = ".p2pg-hero{margin:4px 0 8px}.p2pg-art{display:none}.p2pg-artw{display:block;aspect-ratio:2400/571}.p2pg-artw img{width:142.2917%;left:-21.1667%;top:-21.0158%}";
var WIDE_L = ".p2pg-artw{aspect-ratio:2800/560}.p2pg-artw img{width:121.9286%;left:-11%;top:-25%}";
function prefix(rules, pre) { return rules.replace(/(^|\})([^{}]+)\{/g, function (m, a, sel) { return a + pre + sel + "{"; }); }
var CSS = [
  ".p2pg-host{-webkit-text-size-adjust:100%;touch-action:pan-y;overscroll-behavior:contain}",
  ".p2pg-host.p2pg-self{overflow-y:auto;overflow-x:hidden;scrollbar-width:none;-ms-overflow-style:none}",
  ".p2pg-host.p2pg-self::-webkit-scrollbar{display:none}",
  ".p2pg,.p2pg *{box-sizing:border-box}",
  ".p2pg{position:relative;width:100%;min-height:100%;container-type:inline-size;container-name:p2pg;font-family:P2Fredoka,Fredoka,'Trebuchet MS',system-ui,sans-serif;font-weight:500;color:" + INK + ";line-height:1.2;overflow-x:hidden}",
  ".p2pg button{font:inherit;color:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}",
  ".p2pg-back{position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;background:#e1d6cd;filter:saturate(1.15);pointer-events:none}",
  // the clock wall: a modest banner under the title and the controls (never a giant picture); on wide screens it stays banner size, centred, its sides fading into the page
  ".p2pg-hero{margin:0 calc(var(--pad) * -1);display:flex;justify-content:center}",
  ".p2pg-art{position:relative;width:min(100%,480px);aspect-ratio:100/42;overflow:hidden;filter:saturate(1.15);background:#e1d6cd}",
  ".p2pg-art img{position:absolute;left:0;top:0;width:100%;height:100%;max-width:none;display:block;object-fit:cover;object-position:50% 4.8%}",
  ".p2pg-art::before{content:'';position:absolute;left:0;right:0;top:0;height:10%;background:linear-gradient(to top,rgba(225,214,205,0),#e1d6cd)}",
  ".p2pg-art::after{content:'';position:absolute;left:0;right:0;bottom:0;height:16%;background:linear-gradient(to bottom,rgba(225,214,205,0),#e1d6cd)}",
  // wide banner (container 700 px and up, Igor 23 Oct "extend it, tailored for tablet"): the wide wall picture (3414 x 1920, both cork boards and the clock sit in its top 40%) as a rounded rectangle the full content width (the column caps at 1200 px), no side fade.
  // Crop = a window of the picture; the img is sized and offset in percent of the box so the window is exact. Tablet (700 to 959): window x 508..2908, y 120..691 (2400 x 571, box 4.2:1). Laptop (960 and up): window x 308..3108, y 140..700 (2800 x 560, box 5:1).
  // Boards + clock span x 879..2538, y 180..640 of the picture, so both stay whole with margin on every side. Under 700 the old banner stays exactly as it was.
  ".p2pg-artw{display:none;position:relative;width:100%;overflow:hidden;border-radius:22px;background:#e1d6cd;box-shadow:0 0 0 3px " + INK + ",0 7px 0 3px rgba(16,32,63,.38);filter:saturate(1.15)}",
  ".p2pg-artw img{position:absolute;max-width:none;height:auto;display:block}",
  ".p2pg-col{--pad:16px;position:relative;max-width:1200px;margin:0 auto;padding:16px var(--pad) 32px;display:flex;flex-direction:column;gap:16px}",
  ".p2pg-col>div:empty{display:none}",
  ".p2pg-kpis,.p2pg-charts{display:grid;grid-template-columns:minmax(0,1fr);gap:16px}",
  // title banner
  ".p2pg-title{margin:0 auto;width:100%;max-width:520px;padding:14px 12px 15px;text-align:center;background:" + INK + ";color:#fff;border-radius:22px;border:3px solid " + INK + ";box-shadow:0 6px 0 rgba(16,32,63,.38),0 16px 28px rgba(40,30,20,.22);font-weight:700;font-size:25px;letter-spacing:.005em}",
  ".p2pg-title i{display:block;width:54px;height:5px;border-radius:3px;background:" + GOLD + ";margin:8px auto 0}",
  // year switch + notes
  ".p2pg-years{display:flex;flex-direction:column;align-items:center;gap:12px}",
  ".p2pg-years>*{max-width:100%}",
  ".p2pg-seg{display:flex;gap:4px;padding:4px;border-radius:999px;background:#fff;border:3px solid " + INK + ";box-shadow:0 4px 0 rgba(16,32,63,.3)}",
  ".p2pg-seg button{min-height:42px;padding:0 16px;border:0;border-radius:999px;background:transparent;font-weight:600;font-size:15px;color:" + INK + "}",
  ".p2pg-seg button[aria-pressed=true]{background:" + INK + ";color:#fff}",
  ".p2pg-pick{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px 10px;max-width:100%;font-weight:600;font-size:15px;color:" + INK + "}",
  ".p2pg-pick select{-webkit-appearance:none;appearance:none;min-height:44px;max-width:100%;padding:0 38px 0 16px;border-radius:999px;border:3px solid " + INK + ";background:#fff url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='10' viewBox='0 0 16 10'><path d='M2 2l6 6 6-6' fill='none' stroke='%2310203f' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/></svg>\") no-repeat right 14px center;font:inherit;font-weight:600;font-size:15px;color:" + INK + ";box-shadow:0 4px 0 rgba(16,32,63,.3);cursor:pointer;text-overflow:ellipsis}",
  ".p2pg-note{margin:0 auto;width:fit-content;max-width:100%;text-align:center;font-weight:500;font-size:14px;line-height:1.35;color:#3a4766;background:rgba(255,255,255,.86);border-radius:14px;padding:8px 12px;box-shadow:0 2px 10px rgba(40,30,20,.1)}",
  // cards
  ".p2pg-card{position:relative;background:#fff;border:3px solid " + INK + ";border-radius:26px;padding:16px;box-shadow:0 6px 0 rgba(16,32,63,.34),0 18px 30px rgba(40,30,20,.2)}",
  ".p2pg-chip{display:inline-block;padding:5px 13px;border-radius:999px;background:#fff1c7;border:2px solid " + INK + ";font-weight:600;font-size:14px;line-height:1.15;color:" + INK + "}",
  ".p2pg-chip.is-week{background:" + GOLD + "}",
  ".p2pg-chip.is-act{position:absolute;right:14px;top:14px;background:#fff1c7}",
  // child card
  ".p2pg-who{display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px}",
  ".p2pg-name{margin:0;font-weight:700;font-size:28px;line-height:1.1;color:" + INK + "}",
  ".p2pg-class{padding:4px 12px;border-radius:999px;background:#e3edff;border:2px solid " + INK + ";color:" + BLUE + ";font-weight:700;font-size:16px}",
  ".p2pg-views{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}",
  ".p2pg-views button{min-height:44px;padding:0 6px;border-radius:999px;border:2px solid #9aa6c3;background:#fff;font-weight:600;font-size:15px;color:#33415f;white-space:nowrap}",
  ".p2pg-views.is-two{grid-template-columns:repeat(2,1fr)}",
  ".p2pg-views button[aria-pressed=true]{background:" + GOLD + ";border-color:" + INK + ";color:" + INK + ";box-shadow:inset 0 0 0 1px " + INK + "}",
  ".p2pg-views button.is-go{border-color:" + GOLDD + ";color:" + GOLDD + ";white-space:normal;line-height:1.1;font-size:14px;padding:4px 6px}",
  // two-column card (icon number + ring)
  ".p2pg-two{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding-top:12px}",
  ".p2pg-cell{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:8px}",
  ".p2pg-cap{margin:0;text-align:center;font-weight:600;font-size:15px;line-height:1.2;min-height:36px;display:flex;flex-direction:column;justify-content:center;color:" + INK + "}",
  ".p2pg-cap small{font-size:14px;font-weight:500;color:#44516f}",
  ".p2pg-icon{position:relative;width:96px;height:96px}",
  ".p2pg-icon svg{display:block}",
  ".p2pg-ringbox{position:relative}",
  ".p2pg-ringbox svg{display:block}",
  ".p2pg-num{position:absolute;left:0;right:0;top:0;bottom:0;display:flex;align-items:center;justify-content:center;font-weight:700;color:" + INK + ";letter-spacing:-.01em;white-space:nowrap;font-variant-numeric:tabular-nums}",
  ".p2pg-num i{font-style:normal;font-size:.7em;margin-left:1px}",
  ".p2pg-num.is-good{color:" + GREEN + "}",
  ".p2pg-num.is-miss{color:" + GOLDD + "}",
  ".p2pg-icon .p2pg-num{top:36px;bottom:6px;font-size:30px}",
  ".p2pg-icon.is-clock .p2pg-num{top:24px;bottom:12px}",
  ".p2pg-tick{width:44%;height:44%}",
  // rings rows (time card, last week)
  ".p2pg-trio{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding-top:14px}",
  ".p2pg-trio .p2pg-cell{justify-content:flex-start}",
  ".p2pg-trio .p2pg-cap{min-height:0;font-weight:700}",
  ".p2pg-weekhead{display:flex;align-items:center;flex-wrap:wrap;gap:6px 12px}",
  ".p2pg-weekhead span.p2pg-when{font-size:14px;font-weight:500;color:#44516f}",
  // charts
  ".p2pg-h3{margin:0 0 6px;font-weight:700;font-size:19px;color:" + INK + "}",
  ".p2pg-bars{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;height:176px;align-items:end;border-bottom:3px solid " + INK + ";padding:0 4px}",
  ".p2pg-bars.is-flat{height:100px}",
  ".p2pg-bcol{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%}",
  ".p2pg-bv{font-weight:700;font-size:22px;line-height:1.1;margin-bottom:4px;color:" + INK + ";font-variant-numeric:tabular-nums}",
  ".p2pg-bv.is-zero{color:" + GREEN + "}",
  ".p2pg-bar{width:58px;border-radius:12px 12px 0 0;border:3px solid " + INK + ";border-bottom:0;min-height:6px}",
  ".p2pg-bar.is-zero{background:#cfe9d5 !important;border-color:" + GREEN + "}",
  ".p2pg-lbls{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:8px 4px 0}",
  ".p2pg-lbls span{text-align:center;font-weight:600;font-size:14px;line-height:1.15;color:#33415f}",
  ".p2pg-foot{padding-bottom:4px}",
  // scaling (container queries on the page's own width, so the story stage, a phone and a laptop all pick the right layout): 1 column on a phone,
  // 2 on a tablet, the summary cards and the charts 3 in a row on a laptop (as the app's md:grid-cols-3), content never wider than 1200 px
  "@container p2pg (min-width:500px){.p2pg-art{-webkit-mask-image:linear-gradient(to right,transparent,#000 14%,#000 86%,transparent);mask-image:linear-gradient(to right,transparent,#000 14%,#000 86%,transparent)}}",
  "@container p2pg (min-width:700px){" + WIDE_T + "}",
  "@container p2pg (min-width:960px){" + WIDE_L + "}",
  // the same two rules keyed on data-bw (opts.bannerWidth): the story's last slide draws the page in a box narrower than the screen it will have after the story
  // (a portrait iPad plays the narrow portrait stage), so it takes its banner from the screen's width, not from its own box
  prefix(WIDE_T, '.p2pg[data-bw="t"] ') + prefix(WIDE_T, '.p2pg[data-bw="l"] ') + prefix(WIDE_L, '.p2pg[data-bw="l"] '),
  "@container p2pg (min-width:600px){.p2pg-col{--pad:24px;gap:20px}.p2pg-years{flex-direction:row;flex-wrap:wrap;justify-content:center;gap:12px 20px}.p2pg-kpis,.p2pg-charts{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}" +
    ".p2pg-childcard{display:flex;align-items:center;justify-content:space-between;gap:16px}.p2pg-childcard .p2pg-who{margin-bottom:0}.p2pg-childcard .p2pg-views,.p2pg-childcard .p2pg-views.is-two{display:flex;gap:10px}.p2pg-childcard .p2pg-views button{padding:0 22px}.p2pg-childcard .p2pg-views button.is-go{padding:4px 22px}" +
    ".p2pg-weekcard .p2pg-trio{max-width:560px;margin:0 auto}}",
  "@container p2pg (min-width:600px) and (max-width:959.98px){.p2pg-kpis>:last-child:nth-child(odd),.p2pg-charts>:last-child:nth-child(odd){grid-column:1/-1}}",
  "@container p2pg (min-width:960px){.p2pg-kpis,.p2pg-charts{grid-template-columns:repeat(3,minmax(0,1fr))}}"
].join("\n");

function ensureStyle(font) {          // font === false: the page declares no face of its own and uses the "Fredoka" one the host already loaded (the family list below falls back to it): no second download
  var doc = document;
  if (!doc.getElementById("p2pg-style")) {
    var st = doc.createElement("style");
    st.id = "p2pg-style";
    st.textContent = (font === false ? "" : "@font-face{font-family:P2Fredoka;src:url(" + (font || "Fredoka-normal.woff2") + ") format('woff2');font-weight:300 700;font-display:block}\n") + CSS;
    doc.head.appendChild(st);
  }
}

// ---------------------------------------------------------------------------------------------------------------------------
// SVG pieces
var TICK = '<svg class="p2pg-tick" viewBox="0 0 38 38" aria-hidden="true"><path d="M8 20 L16 28 L31 10" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var R = 36, CIRC = 2 * Math.PI * R;
function ringSVG(size, color) {
  return '<svg width="' + size + '" height="' + size + '" viewBox="-48 -48 96 96" aria-hidden="true"><circle r="' + R + '" fill="#f4f6fb" stroke="#e3e8f2" stroke-width="12"/>' +
    '<circle class="arc" r="' + R + '" fill="none" stroke="' + color + '" stroke-width="12" stroke-linecap="round" transform="rotate(-90)" stroke-dasharray="' + CIRC.toFixed(2) + '" stroke-dashoffset="' + CIRC.toFixed(2) + '"/>' +
    '<circle r="44.5" fill="none" stroke="' + INK + '" stroke-width="3.5"/></svg>';
}
function numSize(len, size) {
  var k = size / 96;
  var px = len <= 2 ? 32 : len === 3 ? 27 : len === 4 ? 22 : 18;
  return Math.max(14, Math.round(px * k));
}
var CAL = '<svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true"><rect x="10" y="16" width="76" height="72" rx="14" fill="#fff" stroke="' + INK + '" stroke-width="4"/>' +
  '<path d="M10 32a16 16 0 0 1 16-16h44a16 16 0 0 1 16 16v10H10z" fill="' + GOLD + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/><path d="M30 6v18M66 6v18" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/></svg>';
var CLOCK = '<svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true"><rect x="38" y="4" width="20" height="9" rx="4" fill="' + INK + '"/><path d="M48 12v8" stroke="' + INK + '" stroke-width="5"/>' +
  '<circle cx="48" cy="56" r="34" fill="#fff" stroke="' + INK + '" stroke-width="4"/><circle cx="48" cy="56" r="27" fill="none" stroke="' + BLUE + '" stroke-width="3" stroke-dasharray="3 7" stroke-linecap="round"/>' +
  '<path d="M76 24l7-7" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/></svg>';

// ---------------------------------------------------------------------------------------------------------------------------
function mount(el, response, opts) {
  opts = opts || {};
  var model = root.P2Data.toPage(response);
  ensureStyle(opts.font);
  var scrollSelf = opts.scroll === "self";
  var state = { year: model.defaultYear, view: "term", week: null };      // week: the Term / Week choice (null = the newest week, "Last Week")
  var mode = opts.driven ? "entrance" : (opts.entrance === false ? "final" : "entrance");
  var items = [];                         // value animations: { sec, s, d, set(f) }
  var live = null, raf = 0, selfRaf = 0, destroyed = false;
  var reduce = !!(root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches);

  el.classList.add("p2pg-host");
  if (scrollSelf) el.classList.add("p2pg-self");
  el.innerHTML = '<div class="p2pg">' +
    '<div class="p2pg-back"></div>' +
    '<div class="p2pg-col">' +
    '<div class="p2pg-rise" data-r="0.05" data-w="head"></div>' +
    '<div class="p2pg-rise p2pg-years" data-r="0.2" data-w="years"></div>' +
    '<div class="p2pg-rise" data-r="0.3" data-w="note"></div>' +
    '<div class="p2pg-hero" aria-hidden="true"><div class="p2pg-art"><img alt="" draggable="false"' + (opts.hold ? ' data-src="' : ' src="') + esc(opts.wall || "final-layers/wall-tall.jpg") + '"></div><div class="p2pg-artw"><img alt="" draggable="false"></div></div>' +
    '<div class="p2pg-rise" data-r="0.4" data-w="child"></div>' +
    '<div class="p2pg-kpis" data-w="kpis"></div>' +
    '<div class="p2pg-rise" data-r="1.25" data-w="week"></div>' +
    '<div class="p2pg-charts" data-w="charts"></div>' +
    '<div class="p2pg-rise p2pg-foot" data-r="1.95" data-w="note2"></div>' +
    '</div></div>';
  var page = el.firstChild;
  // the wide wall picture loads only once the page is 700 px wide or more (a phone never fetches it); its path is the page's own wall path with the last
  // folder + file swapped for wide/wall.jpg (final-layers/wall-tall.jpg -> wide/wall.jpg), or opts.wallWide
  var wideImg = page.querySelector(".p2pg-artw img"), ro = null;
  var wideSrc = opts.wallWide || (opts.wall && opts.wall.indexOf("data:") !== 0 ? String(opts.wall).replace(/(?:[^\/]*\/)?[^\/]*$/, "wide/wall.jpg") : (opts.wall ? "" : "wide/wall.jpg"));
  // opts.bannerWidth = the screen width the page will really have (the story's last slide passes it): the banner follows it instead of the slide's own box
  var bw = Number(opts.bannerWidth) || 0;
  if (bw >= 700) page.setAttribute("data-bw", bw >= 960 ? "l" : "t");
  var held = !!opts.hold;                        // opts.hold: no wall picture is requested until page.p2Release() (the story asks for them after the scenes it needs first; round 2 fix 2)
  function checkWide() { if (!held && wideSrc && wideImg && !wideImg.getAttribute("src") && (bw || page.clientWidth) >= 700) wideImg.setAttribute("src", wideSrc); }
  checkWide();
  if (root.ResizeObserver && wideSrc) { ro = new root.ResizeObserver(checkWide); ro.observe(page); }
  page.p2Release = function () {
    if (!held) return;
    held = false;
    var a = page.querySelector(".p2pg-art img[data-src]");
    if (a) { a.setAttribute("src", a.getAttribute("data-src")); a.removeAttribute("data-src"); }
    checkWide();
  };
  function W(name) { return page.querySelector('[data-w="' + name + '"]'); }
  var wrap = { head: W("head"), years: W("years"), note: W("note"), child: W("child"), kpis: W("kpis"), week: W("week"), charts: W("charts"), note2: W("note2") };

  function Y() { return model.byYear[state.year].atWeek(state.week); }
  function drop(sec) { items = items.filter(function (it) { return it.sec !== sec; }); }
  function base(entranceBase) { return mode === "entrance" ? entranceBase : 0; }

  // ------------------------------------------------------------------------------ sections
  function buildHead() {
    wrap.head.innerHTML = '<h1 class="p2pg-title">Student Attendance Report<i></i></h1>';
  }
  function buildControls() {
    var y = Y(), two = model.years.length > 0, pk = y.picker;   // the page always draws the year switch, a lone "26/27 Attendance" button included
    if (!two && !pk) { wrap.years.innerHTML = ""; wrap.years.style.display = "none"; return; }
    wrap.years.style.display = "";
    var h = "";
    if (two) {
      h += '<div class="p2pg-seg" role="group" aria-label="School year">' + model.years.map(function (k) {
        return '<button type="button" data-testid="year-' + k + '" data-year="' + k + '" aria-pressed="' + (k === state.year) + '">' + YEAR_LABEL[k] + "</button>";
      }).join("") + "</div>";
    }
    if (pk) {   // the page's Term / Week drop-down: a native select, grouped term by term
      h += '<label class="p2pg-pick"><span>Term / Week</span><select data-testid="week-picker" aria-label="Term and week">' + pk.groups.map(function (g) {
        return '<optgroup label="Term ' + g.term + '">' + g.options.map(function (o) {
          return '<option value="' + esc(o.value) + '"' + (o.value === pk.value ? " selected" : "") + ">" + esc(o.label) + "</option>";
        }).join("") + "</optgroup>";
      }).join("") + "</select></label>";
    }
    wrap.years.innerHTML = h;
  }
  function noteHTML() {
    var d = longDate(Y().dataAsOf);
    return d ? '<p class="p2pg-note" data-testid="data-note">This data is our most accurate data as of ' + esc(d) + ".</p>" : "";
  }
  function buildNotes() { wrap.note.innerHTML = noteHTML(); wrap.note2.innerHTML = noteHTML(); }
  function buildChild() {
    var y = Y(), v = state.view;
    wrap.child.innerHTML = '<section class="p2pg-card p2pg-childcard"><div class="p2pg-who"><h2 class="p2pg-name" data-testid="child-name">' + esc(y.child.name) + '</h2>' +
      '<span class="p2pg-class" data-testid="child-class">' + esc(className(y.child)) + '</span></div>' +
      '<div class="p2pg-views' + (y.weekLabel == null ? " is-two" : "") + '" role="group" aria-label="Show">' +
      '<button type="button" data-view="year" aria-pressed="' + (v === "year") + '">This Year</button>' +
      '<button type="button" data-view="term" aria-pressed="' + (v === "term") + '">This Term</button>' +
      (y.weekLabel != null ? '<button type="button" data-go="week" class="is-go">' + esc(y.weekLabel) + "</button>" : "") + "</div></section>";
  }

  // a ring with its number: spec -> html; bind() later gives it its animation
  var seq = 0;
  function ringHTML(o) {      // { size, frac, color, val, unit, key, good }
    var id = "r" + (seq++), len = String(o.val).length + (o.unit ? 1 : 0);
    return '<div class="p2pg-ringbox" data-i="' + id + '" style="width:' + o.size + 'px;height:' + o.size + 'px">' + ringSVG(o.size, o.color) +
      '<span class="p2pg-num ' + (o.good ? "is-good" : "") + '" data-m="' + o.key + '" data-v="' + o.val + '" style="font-size:' + numSize(len, o.size) + 'px">' + o.val + (o.unit ? "<i>" + o.unit + "</i>" : "") + "</span></div>";
  }
  function tickRingHTML(o) {  // a zero: full green ring and a tick; data-v stays 0
    return '<div class="p2pg-ringbox" data-i="t" data-tick="1" style="width:' + o.size + 'px;height:' + o.size + 'px">' + ringSVG(o.size, GREEN) +
      '<span class="p2pg-num" data-m="' + o.key + '" data-v="0" style="background:none"><span style="display:grid;place-items:center;width:46%;height:46%;border-radius:50%;background:' + GREEN + ';border:3px solid ' + INK + '">' + TICK + "</span></span></div>";
  }
  function iconHTML(svg, o, cls) {
    return '<div class="p2pg-icon ' + (cls || "") + '" data-i="c" data-count="1">' + svg + '<span class="p2pg-num ' + (o.val === 0 ? "is-good" : "is-miss") + '" data-m="' + o.key + '" data-v="' + o.val + '" style="font-size:' + numSize(String(o.val).length, 96) + 'px">' + o.val + "</span></div>";
  }

  /** Give every [data-i] under `scope` its animation. b = start of this group (entrance seconds, or 0 when live). */
  function bind(scope, sec, b, spec) {
    var k = 0;
    [].forEach.call(scope.querySelectorAll("[data-i]"), function (box) {
      var num = box.querySelector(".p2pg-num"), s = b + 0.06 * k++, d = 0.9;
      var val = Number(num.getAttribute("data-v"));
      if (box.hasAttribute("data-count")) {
        items.push({ sec: sec, s: s, d: d, set: function (f) { num.textContent = String(Math.round(val * f)); } });
      } else if (box.hasAttribute("data-tick")) {
        var arc0 = box.querySelector(".arc"), inner = num.firstChild;
        items.push({ sec: sec, s: s, d: d, set: function (f) { arc0.setAttribute("stroke-dashoffset", (CIRC * (1 - f)).toFixed(2)); inner.style.opacity = f > 0.55 ? 1 : 0; inner.style.transform = "scale(" + (f > 0.55 ? 1 : 0.4) + ")"; } });
      } else {
        var arc = box.querySelector(".arc"), frac = Number(box.getAttribute("data-frac")), unit = box.getAttribute("data-unit") || "";
        var from = unit ? Math.min(val, 80) : 0;   // a percentage counts up from 80, never a scary low number
        items.push({ sec: sec, s: s, d: d, set: function (f) {
          arc.setAttribute("stroke-dashoffset", (CIRC * (1 - frac * f)).toFixed(2));
          num.innerHTML = String(Math.round(from + (val - from) * f)) + (unit ? "<i>" + unit + "</i>" : "");
        } });
      }
    });
  }

  function pctRing(key, val) {
    return { size: 96, frac: val / 100, color: val >= 95 ? GREEN : GOLD, val: val, unit: "%", key: key, good: val >= 95 };
  }
  function withFrac(html, f, unit) { return html.replace('data-i="', 'data-frac="' + clamp(f, 0, 1) + '" ' + (unit ? 'data-unit="' + unit + '" ' : "") + 'data-i="'); }

  function buildKpis() {
    var y = Y(), v = state.view, p = y.periods[v], T = v === "term" ? "Term" : "Year";
    var allZero = p.minutes === 0 && p.hours === 0 && p.lessons === 0;
    var celebrate = v === "term" && allZero;                        // the page shows tick rings for a clean term
    function cap(a, b) { return '<p class="p2pg-cap">' + a + "<small>" + b + "</small></p>"; }
    var absentCard = '<section class="p2pg-card p2pg-rise" data-r="0.65" data-k="abs"><span class="p2pg-chip">Absences This ' + T + '</span><div class="p2pg-two">' +
      '<div class="p2pg-cell">' + iconHTML(CAL, { val: p.absent, key: "abs-total" }) + cap("Total Days", "Absent") + "</div>" +
      '<div class="p2pg-cell">' + withFrac(ringHTML(pctRing("att-pct", p.attendancePct)), p.attendancePct / 100, "%") + cap("Attendance", "Percentage") + "</div></div></section>";
    function timeRing(key, val, max, label) {
      var o = { size: 84, frac: val / max, color: allZero ? GREEN : GOLD, val: val, key: key, good: allZero };
      var h = celebrate ? tickRingHTML({ size: 84, key: key }) : withFrac(ringHTML(o), val / max, "");
      return '<div class="p2pg-cell">' + h + '<p class="p2pg-cap">' + label + "</p></div>";
    }
    var timeCard = '<section class="p2pg-card p2pg-rise" data-r="0.85" data-k="time"><span class="p2pg-chip">Total Time not at School This ' + T + "</span>" +
      (y.action ? '<span class="p2pg-chip is-act" style="position:static;margin-left:8px">Action Taken</span>' : "") +
      '<div class="p2pg-trio">' + timeRing("time-min", p.minutes, Math.ceil(p.minutes / 500) * 500 || 500, "Minutes") + timeRing("time-hrs", p.hours, Math.ceil(p.hours / 10) * 10 || 10, "Hours") +
      timeRing("time-les", p.lessons, Math.ceil(p.lessons / 20) * 20 || 20, "Lessons") + "</div></section>";
    var lateCard = '<section class="p2pg-card p2pg-rise" data-r="1.05" data-k="late"><span class="p2pg-chip">Total Days Late This ' + T + '</span><div class="p2pg-two">' +
      '<div class="p2pg-cell">' + iconHTML(CLOCK, { val: p.lateToSchool, key: "late-total" }, "is-clock") + cap("Total Days", "Late") + "</div>" +
      '<div class="p2pg-cell">' + withFrac(ringHTML(pctRing("punct-pct", p.punctualityPct)), p.punctualityPct / 100, "%") + cap("Punctuality", "Percentage") + "</div></div></section>";
    wrap.kpis.innerHTML = absentCard + timeCard + lateCard;
    drop("kpis");
    [].forEach.call(wrap.kpis.querySelectorAll("[data-k]"), function (card) { bind(card, "kpis", base(parseFloat(card.getAttribute("data-r")) + 0.3)); });
    if (mode !== "entrance") [].forEach.call(wrap.kpis.querySelectorAll(".p2pg-rise"), function (c) { c.classList.remove("p2pg-rise"); });
  }

  function buildWeek() {
    var y = Y(), lw = y.lastWeek;
    drop("week");
    if (y.weekLabel == null) { wrap.week.innerHTML = ""; return; }                // 25/26: no week block (the page hides it)
    function cell(key, val, max, label) {
      var h = val === 0 ? tickRingHTML({ size: 88, key: key }) : withFrac(ringHTML({ size: 88, frac: val / max, color: GOLD, val: val, key: key }), val / max, "");
      return '<div class="p2pg-cell">' + h + '<p class="p2pg-cap">' + label + "</p></div>";
    }
    wrap.week.innerHTML = '<section class="p2pg-card p2pg-weekcard" id="p2pg-last-week" data-testid="week-card"><div class="p2pg-weekhead"><span class="p2pg-chip is-week">' + esc(y.weekLabel) + "</span>" +
      (y.weekSub ? '<span class="p2pg-when" data-testid="week-ending-label">' + esc(y.weekSub) + "</span>" : "") + "</div>" +
      '<div class="p2pg-trio">' + cell("lw-abs", lw.absent, 7, "Days Absent") + cell("lw-late", lw.lateToSchool, 8, "Late to School") + cell("lw-early", lw.earlyLeave, 4, "Early Leave") + "</div></section>";
    bind(wrap.week, "week", base(1.25 + 0.3));
  }

  function buildCharts() {
    var y = Y();
    var defs = [["absence", "Absence", "abs"], ["late", "Late to School", "late"], ["early", "Early Leave", "early"]];
    var cols = [["term", "This Term", GOLD], ["year", "This Year", "#3b4d7a"]];
    if (y.weekLabel != null) cols.unshift(["week", y.weekLabel, BLUE]);            // 25/26 has no week bar
    var grid = "grid-template-columns:repeat(" + cols.length + ",1fr)";
    var allFlat = defs.every(function (d) { var c = y.charts[d[0]]; return Math.max.apply(null, cols.map(function (k) { return c[k[0]]; })) === 0; });   // flat style only when every chart is flat, so cards in one row share a baseline
    wrap.charts.innerHTML = defs.map(function (d, i) {
      var c = y.charts[d[0]], max = Math.max.apply(null, cols.map(function (k) { return c[k[0]]; }));
      var bars = cols.map(function (k) {
        var v = c[k[0]], h = v === 0 ? 6 : Math.max(14, Math.round(v / max * 118));
        return '<div class="p2pg-bcol"><span class="p2pg-bv ' + (v === 0 ? "is-zero" : "") + '" data-m="ch-' + d[0] + "-" + k[0] + '" data-v="' + v + '">' + v + "</span>" +
          '<i class="p2pg-bar ' + (v === 0 ? "is-zero" : "") + '" data-bar="' + h + '" data-val="' + v + '" style="height:' + h + "px;background:" + k[2] + '"></i></div>';
      }).join("");
      var lbls = cols.map(function (k) { return "<span>" + esc(k[1]) + "</span>"; }).join("");
      return '<section class="p2pg-card p2pg-rise" data-r="' + (1.45 + i * 0.15) + '" data-testid="chart-' + d[0] + '"><h3 class="p2pg-h3">' + d[1] + '</h3><div class="p2pg-bars' + (allFlat ? " is-flat" : "") + '" style="' + grid + '">' + bars + '</div><div class="p2pg-lbls" style="' + grid + '">' + lbls + "</div></section>";
    }).join("");
    drop("charts");
    [].forEach.call(wrap.charts.querySelectorAll("[data-r]"), function (card) {
      var b = base(parseFloat(card.getAttribute("data-r")) + 0.3), n = 0;
      [].forEach.call(card.querySelectorAll(".p2pg-bar"), function (bar) {
        var h = Number(bar.getAttribute("data-bar")), val = Number(bar.getAttribute("data-val")), lab = bar.previousSibling;
        items.push({ sec: "charts", s: b + 0.08 * n++, d: 0.9, set: function (f) { bar.style.height = Math.max(0, h * f).toFixed(1) + "px"; lab.textContent = String(Math.round(val * f)); } });
      });
    });
    if (mode !== "entrance") [].forEach.call(wrap.charts.querySelectorAll(".p2pg-rise"), function (c) { c.classList.remove("p2pg-rise"); });
  }

  function buildAll() { buildHead(); buildControls(); buildNotes(); buildChild(); buildKpis(); buildWeek(); buildCharts(); }

  // ------------------------------------------------------------------------------ painting
  function riseEls() { return page.querySelectorAll(".p2pg-rise[data-r]"); }
  function paintItems(tt, only) {
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (only && !only[it.sec]) continue;
      it.set(outCubic(seg(tt, it.s, it.s + it.d)));
    }
  }
  function paintEntrance(t) {
    var r = riseEls();
    for (var i = 0; i < r.length; i++) {
      var u = outCubic(seg(t, parseFloat(r[i].getAttribute("data-r")), parseFloat(r[i].getAttribute("data-r")) + 0.55));
      r[i].style.opacity = u.toFixed(3);
      r[i].style.transform = "translateY(" + ((1 - u) * 34).toFixed(1) + "px)";
    }
    paintItems(t);
  }
  function paintFinal() {
    var r = page.querySelectorAll("[data-r]");
    for (var i = 0; i < r.length; i++) { r[i].style.opacity = ""; r[i].style.transform = ""; }
    for (var j = 0; j < items.length; j++) items[j].set(1);
  }
  function setMode(m) { mode = m; page.style.pointerEvents = m === "final" ? "" : "none"; }

  /** After the entrance: re-fill the rings, counts and bars of the sections just rebuilt, over about a second (a live tween, not the story clock). */
  function runLive(secs) {
    if (raf) { root.cancelAnimationFrame(raf); raf = 0; }
    var only = {}; secs.forEach(function (s) { only[s] = 1; });
    if (reduce) { paintItems(99, only); return; }
    paintItems(0, only);
    var t0 = null;
    function step(now) {
      if (destroyed) return;
      if (t0 == null) t0 = now;
      var tt = (now - t0) / 1000;
      paintItems(tt, only);
      raf = tt < 1.4 ? root.requestAnimationFrame(step) : 0;
    }
    raf = root.requestAnimationFrame(step);
  }

  // ------------------------------------------------------------------------------ interaction
  function rebuildAfterChange(full) {
    if (full) { buildControls(); buildNotes(); buildChild(); buildKpis(); buildWeek(); buildCharts(); }
    else { buildChild(); buildKpis(); }
    if (mode === "final") runLive(full ? ["kpis", "week", "charts"] : ["kpis"]);
    else paintEntrance(lastT);
  }
  function setYear(k) {
    if (!model.byYear[k]) return;
    if (k === state.year) { setView("term"); return; }              // the page: a click on the pressed year button (the lone one too) still goes back to This Term
    state.year = k; state.view = "term";                           // the page: switching year goes back to This Term
    rebuildAfterChange(true);
  }
  /** The Term / Week picker: show another week where the page shows "Last Week" (week button, week block, three charts). */
  function setWeek(w) {
    var b = model.byYear[state.year];
    if (!b.current || !b.picker) return;
    var known = b.picker.groups.some(function (g) { return g.options.some(function (o) { return o.value === w; }); });
    if (!known) return;
    var next = w === b.newestWeek ? null : w;
    var sel = wrap.years.querySelector("select");
    if (next === state.week) { if (sel) sel.value = w; return; }
    state.week = next;
    if (sel) sel.value = w;                                          // the drop-down itself is never rebuilt while it is in use
    buildChild(); buildWeek(); buildCharts();
    if (mode === "final") runLive(["week", "charts"]);
    else paintEntrance(lastT);
  }
  function setView(v) {
    if ((v !== "term" && v !== "year") || v === state.view) return;
    state.view = v;
    rebuildAfterChange(false);
  }
  function offsetWithin(node, anc) { var y = 0; while (node && node !== anc) { y += node.offsetTop; node = node.offsetParent; } return y; }
  function goToWeek() {
    var card = page.querySelector("#p2pg-last-week");
    if (!card) return;
    var top = offsetWithin(card, page) - 12, beh = reduce ? "auto" : "smooth";
    if (scrollSelf) el.scrollTo({ top: top, behavior: beh });
    else root.scrollTo({ top: page.getBoundingClientRect().top + (root.pageYOffset || 0) + top, behavior: beh });
  }
  function onClick(e) {
    var b = e.target.closest && e.target.closest("button");
    if (!b || !page.contains(b)) return;
    if (b.hasAttribute("data-year")) setYear(b.getAttribute("data-year"));
    else if (b.hasAttribute("data-view")) setView(b.getAttribute("data-view"));
    else if (b.hasAttribute("data-go")) goToWeek();
  }
  function onChange(e) {
    var t = e.target;
    if (t && t.getAttribute && t.getAttribute("data-testid") === "week-picker") setWeek(t.value);
  }
  page.addEventListener("click", onClick);
  page.addEventListener("change", onChange);

  // ------------------------------------------------------------------------------ the entrance, driven from outside (the story)
  var lastT = -1;
  function seek(t) {
    if (destroyed) return;
    t = +t;
    if (!(t < END)) {                                              // done: complete and live; a running clock never undoes a parent's taps
      if (mode !== "final") { setMode("final"); if (state.year !== model.defaultYear || state.view !== "term" || state.week !== null) { state.year = model.defaultYear; state.view = "term"; state.week = null; buildAll(); } paintFinal(); }
      lastT = t; return;
    }
    if (mode === "final") {                                        // seeking back before the end: the entrance of the default view again
      if (raf) { root.cancelAnimationFrame(raf); raf = 0; }
      state.year = model.defaultYear; state.view = "term"; state.week = null;
      setMode("entrance"); buildAll();
    }
    lastT = t;
    paintEntrance(Math.max(0, t));
  }

  buildAll();
  setMode(mode);
  if (opts.driven) paintEntrance(0);                                 // the story drives seek(t)
  else if (opts.entrance !== false && !reduce) {                     // standalone: play the entrance by itself
    paintEntrance(0);
    var s0 = null;
    selfRaf = root.requestAnimationFrame(function step(now) {
      if (destroyed) return;
      if (s0 == null) s0 = now;
      var t = (now - s0) / 1000;
      seek(Math.min(t, END));
      selfRaf = t < END ? root.requestAnimationFrame(step) : 0;
    });
  } else { setMode("entrance"); seek(END); }                         // standalone without the entrance (still / reduced motion)

  return {
    setYear: setYear, setView: setView, setWeek: setWeek, goToWeek: goToWeek, seek: seek,
    getState: function () { return { year: state.year, view: state.view, week: Y().weekEnding, mode: mode }; },
    destroy: function () {
      destroyed = true;
      if (ro) ro.disconnect();
      if (raf) root.cancelAnimationFrame(raf);
      if (selfRaf) root.cancelAnimationFrame(selfRaf);
      page.removeEventListener("click", onClick);
      page.removeEventListener("change", onChange);
      el.classList.remove("p2pg-host", "p2pg-self");
      el.innerHTML = "";
    }
  };
}

root.P2Page = { mount: mount, END: END };
if (typeof module !== "undefined" && module.exports) module.exports = root.P2Page;
})(typeof window !== "undefined" ? window : globalThis);

;
/* P-2 title beat · p2-title  (option A: 3D living storybook)
 * The opening card: the sunburst with books, pencil, globe and stars. The camera eases back from the glowing centre,
 * a soft band of light turns slowly over the rays, the gold stars glint one after another, "Your weekly attendance
 * report" pops in letter by letter and the gold week pill stamps on underneath.
 * The picture moves only as a whole (no cut-outs): every effect is drawn in code over it.
 * Phone speed (24 Oct, iPhone Safari stutter): the turning light used to be a 2600 px square with filter:blur(18px) rotating under a soft-light blend and a mask,
 * which Safari re-blurred every frame (about 150 ms a frame in the WebKit rig; with the blur off, 17 ms). The rays' own ramps are already soft (the blur was
 * invisible past the masked-out centre), so the blur is gone; the big layers (world, light) are made persistent at mount (will-change, so no layer is created
 * or destroyed mid-animation) and animate transform / opacity only; the saturate filter sits on the still picture, not on the moving group.
 * Every frame is a pure function of t (kit rule 1); the bitmap is an approved exception to rule 7, like the mascot.
 */
(function () {
MotionIgor.define({
  id: "p2-title",
  duration: 4.5,
  size: [1080, 1920],
  kind: "scene",
  title: "P-2 report · title",
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  defaults: {
    art: "title-layers/",
    lines: [["Your", "weekly"], ["attendance"], ["report"]],
    episode: "Week 7",
    chrome: true                       // kept for the story (the week pill is part of the title and always shows)
  },
  build: function (ctx) {
    var c = ctx.content, WD = P2Wide.begin(ctx), st = WD.col, esc = ctx.util.esc;
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f";

    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function smooth(x) { return x * x * (3 - 2 * x); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function el(tag, css, parent) {
      var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e;
    }

    // ---------------------------------------------------------------- picture
    ctx.stage.style.background = "#f6ecd6";
    var CX = 540, CY = 975;                                    // the glowing centre of the rays in the picture
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:" + CX + "px " + CY + "px;will-change:transform");
    var pic = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none;filter:saturate(1.15)", world);
    pic.src = WD.src(c.art, "title.jpg", "title.jpg"); pic.alt = ""; pic.draggable = false;

    // a soft band of light over the rays: wide white wedges, blurred, faded at the centre and the edges, turning slowly
    var lightWrap = el("div", "position:absolute;left:" + (-WD.ox) + "px;top:0;width:" + WD.sw + "px;height:1920px;overflow:hidden;mix-blend-mode:soft-light;" +
      "-webkit-mask-image:radial-gradient(circle at " + (CX + WD.ox) + "px " + CY + "px, rgba(0,0,0,0) 90px, #000 360px, #000 900px, rgba(0,0,0,0.35) 1300px);" +
      "mask-image:radial-gradient(circle at " + (CX + WD.ox) + "px " + CY + "px, rgba(0,0,0,0) 90px, #000 360px, #000 900px, rgba(0,0,0,0.35) 1300px);will-change:opacity", world);
    var LS = WD.wide ? 4000 : 2600;                             // the turning light must cover the wide picture too
    var light = el("div", "position:absolute;left:" + (CX + WD.ox - LS / 2) + "px;top:" + (CY - LS / 2) + "px;width:" + LS + "px;height:" + LS + "px;will-change:transform;" +
      "transform-origin:50% 50%;background:repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.95) 9deg, rgba(255,255,255,0) 18deg, rgba(255,255,255,0) 60deg)", lightWrap);
    // warm glow breathing at the centre, behind the title
    var glow = el("div", "position:absolute;left:" + (CX - 520) + "px;top:" + (CY - 520) + "px;width:1040px;height:1040px;border-radius:50%;" +
      "background:radial-gradient(circle, rgba(255,250,232,0.85) 0%, rgba(255,246,220,0.45) 38%, rgba(255,240,210,0) 70%)", world);

    // glints on the gold stars of the picture (centres measured on the 1080 x 1920 art)
    var STARS = [[124, 160], [492, 105], [425, 232], [112, 565], [965, 567], [82, 1222], [978, 1263], [112, 1815], [570, 1808]];
    var glints = STARS.map(function (p) {
      var g = el("div", "position:absolute;left:" + (p[0] - 60) + "px;top:" + (p[1] - 60) + "px;width:120px;height:120px;transform-origin:50% 50%;mix-blend-mode:screen", world);
      g.innerHTML = '<svg viewBox="-60 -60 120 120" width="120" height="120"><defs>' +
        '<radialGradient id="gc' + p[0] + '"><stop offset="0" stop-color="#fff"/><stop offset="0.3" stop-color="#fff8dc" stop-opacity="0.8"/>' +
        '<stop offset="1" stop-color="#ffe9a0" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="gh' + p[0] + '" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff"/>' +
        '<stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
        '<linearGradient id="gv' + p[0] + '" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff"/>' +
        '<stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>' +
        '<circle r="16" fill="url(#gc' + p[0] + ')"/><rect x="-26" y="-1.6" width="52" height="3.2" rx="1.6" fill="url(#gh' + p[0] + ')"/>' +
        '<rect x="-1.6" y="-26" width="3.2" height="52" rx="1.6" fill="url(#gv' + p[0] + ')"/><circle r="3.5" fill="#fff"/></svg>';
      return g;
    });

    // ---------------------------------------------------------------- title text (live)
    var data = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none");
    

    var head = el("div", "position:absolute;left:0;right:0;top:700px;display:flex;flex-direction:column;align-items:center;gap:8px", data);
    var letters = [], colors = [BLUE, BLUE, GREEN];
    c.lines.forEach(function (words, li) {
      var row = el("div", "display:flex;justify-content:center;gap:30px", head);
      words.forEach(function (w) {
        var ws = el("span", "display:inline-flex", row);
        String(w).split("").forEach(function (ch) {
          var s = el("span", "display:inline-block;transform-origin:50% 90%;font:700 128px/1.04 " + FONT + ";color:" + colors[li % 3] +
            ";-webkit-text-stroke:18px " + INK + ";paint-order:stroke fill;text-shadow:0 12px 0 " + INK, ws);
          s.textContent = ch; letters.push(s);
        });
      });
    });
    var pill = el("div", "position:absolute;left:540px;top:1196px;translate:-50% 0;transform-origin:50% 50%;white-space:nowrap;padding:16px 46px;" +
      "border-radius:999px;background:" + GOLD + ";border:7px solid " + INK + ";box-shadow:8px 8px 0 " + INK + ";font:700 62px/1 " + FONT + ";color:" + INK, data);
    pill.innerHTML = esc(c.episode);

    // ---------------------------------------------------------------- motion
    var HEAD0 = 0.35, LET = 0.045, PILL0 = HEAD0 + 1.45;            // the pill stamps once "report" has landed

    ctx.onDraw(function (t) {
      // camera eases back from the centre; the light turns about 14 degrees
      var k = smooth(seg(t, 0, 4.5));
      world.style.transform = "scale(" + (1.12 - 0.08 * k).toFixed(4) + ")";
      light.style.transform = "rotate(" + (k * 14 - 4).toFixed(3) + "deg)";
      lightWrap.style.opacity = (0.8 + 0.2 * Math.sin(t * 1.6)).toFixed(3);
      var gs = 0.92 + 0.08 * Math.sin(t * 2.2);
      glow.style.transform = "scale(" + gs.toFixed(4) + ")";
      glow.style.opacity = (0.55 + 0.35 * seg(t, 0.1, 0.9)).toFixed(3);

      // glints: each star flashes once, staggered, a second round late in the beat
      glints.forEach(function (g, i) {
        var a = 0;
        [0.5 + i * 0.27, 2.6 + ((i * 5) % 9) * 0.16].forEach(function (t0) {
          var u = seg(t, t0, t0 + 0.35);
          if (u > 0 && u < 1) a = Math.max(a, Math.sin(u * Math.PI));
        });
        g.style.opacity = a.toFixed(3);
        g.style.transform = "scale(" + (0.3 + 0.8 * a).toFixed(3) + ") rotate(" + (a * 45).toFixed(1) + "deg)";
      });

      // title letters pop in, then bob gently
      letters.forEach(function (l, i) {
        var u = seg(t, HEAD0 + i * LET, HEAD0 + i * LET + 0.4);
        var sc = u <= 0 ? 0 : outBack(u);
        var bob = Math.sin(t * 3 + i * 0.55) * 5 * seg(t, HEAD0 + 1.6, HEAD0 + 2.2);
        l.style.transform = "translateY(" + ((1 - Math.min(1, u * 1.4)) * 70 + bob).toFixed(1) + "px) scale(" + sc.toFixed(3) + ")";
      });
      // week pill stamps on: drops from a bigger size with a little turn and settles
      var p = seg(t, PILL0, PILL0 + 0.38);
      var ps = p <= 0 ? 0 : 1.9 - 0.9 * outBack(p);
      pill.style.opacity = p > 0 ? 1 : 0;
      pill.style.transform = "scale(" + ps.toFixed(3) + ") rotate(" + (-4 + (1 - p) * 10).toFixed(2) + "deg)";
    });
  }
});
})();

;
/* P-2 walk-to-school beat · p2-walk  (option A: 3D living storybook, scene 2 of the final plan)
 * Mum and Noor, seen from behind, walk hand in hand up the school path towards the clock tower and the arched gate.
 * Nobody is welcoming them: the empty school approach is a ChatGPT picture made from Igor's reference (flat storyboard),
 * remade in the approved 3D look; the pair is one whole-figure picture cut from green, with a second leg pose for the step
 * (pose B = pose A with only the legs from the edit, tools/walk.py; the body above the hems is one shared picture), so faces and clothes never change between the two.
 * Motion = the pair walks AWAY up the path getting smaller (scale follows the path), 2-pose step cycle with a small bob and
 * sway, a contact shadow that follows the feet, a gentle camera push, warm sun glow, then the name caption pops in.
 * Every frame is a pure function of t (kit rule 1). Bitmap layers are an approved exception to kit rule 7, like the mascot
 * clips and the gate scene. Content (names, labels, art path) lives in defaults.
 */
(function () {
MotionIgor.define({
  id: "p2-walk",
  duration: 6,
  size: [1080, 1920],
  kind: "scene",
  title: "P-2 report · walk to school",
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  defaults: {
    art: "walk-layers/",
    badge: "Weekly report",
    episode: "Week 7",
    child: { name: "Noor", grade: "Grade 0", form: "PREP A" },
    chrome: true                       // false: the story draws the badge, week above its transitions
  },
  build: function (ctx) {
    var c = ctx.content, WD = P2Wide.begin(ctx), st = WD.col;
    var KART = P2Kid.art(c, c.art);                                // body and legs of the child: the girl / boy pictures when they are on (p2-form.js P2Kid)
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f";

    // ---------------------------------------------------------------- helpers (pure)
    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function smooth(x) { return x * x * (3 - 2 * x); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function el(tag, css, parent) {
      var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e;
    }
    function img(file, css, parent, art) { var i = el("img", "position:absolute;display:block;max-width:none;" + css, parent); i.src = file.charAt(0) === "@" ? file.slice(1) : (art || c.art) + file; i.alt = ""; i.draggable = false; return i; }

    // ---------------------------------------------------------------- layers (world = 1080 x 1920 design px)
    ctx.stage.style.background = "#e9dccb";
    var OX = 540, OY = 1250;                                   // camera pushes in about this point
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:" + OX + "px " + OY + "px;filter:saturate(1.12)");
    var bg = img("@" + WD.src(c.art, "walk-bg.jpg", "bg.jpg"), WD.bg(1920) + ";transform-origin:" + (OX + WD.wideLeft) + "px " + OY + "px", world);
    var glow = el("div", "position:absolute;left:560px;top:-260px;width:900px;height:900px;border-radius:50%;" +
      "background:radial-gradient(circle, rgba(255,236,180,0.55) 0%, rgba(255,222,150,0.22) 38%, rgba(255,214,140,0) 70%);" +
      "mix-blend-mode:screen", world);

    // The pair: the cut-out box in the 1080 x 1918 picture is x164-886, y382-1588 (tools/walk.py prints it). ANCHOR = the middle
    // of the pair's feet in that cut-out (the pair's own centre line, the contact line of the planted feet).
    var PW = 722, PH = 1206, AX = 360, AY = 1186;
    var shadowA = el("div", "position:absolute;left:0;top:0;width:640px;height:70px;margin:-35px 0 0 -320px;border-radius:50%;" +
      "background:radial-gradient(ellipse at center, rgba(60,38,18,0.75) 0%, rgba(60,38,18,0.38) 50%, rgba(70,44,22,0) 74%)", world);
    var shadowB = el("div", "position:absolute;left:0;top:0;width:520px;height:60px;margin:-30px 0 0 -300px;border-radius:50%;" +
      "background:radial-gradient(ellipse at center, rgba(70,44,22,0.3) 0%, rgba(70,44,22,0.12) 55%, rgba(70,44,22,0) 76%)", world);
    var pair = el("div", "position:absolute;left:0;top:0;width:" + PW + "px;height:" + PH + "px;transform-origin:" + AX + "px " + AY + "px", world);
    // body = rows 0 to 950, ONE picture for both poses (so faces and clothes can never differ between them); legs = rows 900 to the
    // end, one picture per pose, drawn on top of the body (tools/walk.py)
    var LEG0 = 900, BODY1 = 950;
    img("body.webp", "left:0;top:0;width:" + PW + "px;height:" + BODY1 + "px", pair, KART);
    var pA = img("legs-a.webp", "left:0;top:" + LEG0 + "px;width:" + PW + "px;height:" + (PH - LEG0) + "px", pair, KART);   // mid-stride
    var pB = img("legs-b.webp", "left:0;top:" + LEG0 + "px;width:" + PW + "px;height:" + (PH - LEG0) + "px", pair, KART);   // the other foot forward

    // ---------------------------------------------------------------- data layer (live text, above the camera)
    var data = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none");
    var esc = ctx.util.esc;
    var badge = el("div", "position:absolute;left:44px;top:58px;transform-origin:0 50%;display:flex;align-items:center;gap:18px;" +
      "padding:16px 34px 16px 20px;border-radius:999px;background:" + GOLD + ";border:6px solid " + INK + ";box-shadow:8px 8px 0 " + INK, data);
    badge.innerHTML = '<svg width="70" height="70" viewBox="0 0 70 70"><rect x="6" y="8" width="58" height="54" rx="8" fill="#fff" stroke="' + INK +
      '" stroke-width="5"/><rect x="15" y="20" width="16" height="12" rx="2" fill="' + BLUE + '"/><path d="M37 22h18M37 30h14M15 42h40M15 51h30" stroke="' + INK +
      '" stroke-width="4.5" stroke-linecap="round"/></svg><span style="font:700 50px/1 ' + FONT + ';color:#fff;-webkit-text-stroke:9px ' + INK +
      ';paint-order:stroke fill;letter-spacing:0.01em">' + esc(c.badge) + "</span>";
    var week = el("div", "position:absolute;left:552px;top:84px;transform-origin:50% 50%;padding:10px 24px;border-radius:999px;background:" +
      GREEN + ";border:5px solid " + INK + ";box-shadow:6px 6px 0 " + INK + ";font:700 38px/1 " + FONT + ";color:#fff", data);
    week.textContent = c.episode;
    if (!c.chrome) { badge.style.display = "none"; week.style.display = "none"; }

    // caption: NAME · CLASS, letters pop one by one (SPEA layered caption look). The whole line shrinks to fit the frame, so a
    // long name such as "Mohammed" + "Kindy A" stays inside it (measured at its natural width, then scaled about its centre).
    var CAPY = 1640, MAXW = 940;
    var capBox = el("div", "position:absolute;left:0;right:0;top:" + CAPY + "px;height:0;display:flex;justify-content:center;align-items:flex-start", data);
    var cap = el("div", "flex:none;display:flex;justify-content:center;align-items:baseline;gap:4px;white-space:nowrap;transform-origin:50% 0", capBox);
    cap.setAttribute("data-p2-label", "walk-caption");
    var letters = [];
    function word(text, color, size) {
      var w = el("span", "display:inline-flex", cap);
      String(text).split("").forEach(function (ch) {
        var s = el("span", "display:inline-block;transform-origin:50% 90%;font:700 " + size + "px/1 " + FONT + ";color:" + color +
          ";-webkit-text-stroke:14px " + INK + ";paint-order:stroke fill;text-shadow:0 10px 0 " + INK + ";white-space:pre", w);
        s.textContent = ch; letters.push(s);
      });
    }
    word(c.child.name, BLUE, 132);
    word(" · ", INK, 110);
    word(P2Class(c.child), GREEN, 132);
    // one shared shrink-to-fit (p2-form.js): measured on an off-screen twin of the caption, never with display:none
    var capFit = P2Fit.create({ css: "display:flex;align-items:baseline;gap:4px;white-space:nowrap",
      html: P2Fit.chars([[c.child.name, 132], [" \u00b7 ", 110], [P2Class(c.child), 132]], FONT), max: MAXW });
    var SP = [[120, CAPY - 8, 40, 0.0], [960, CAPY - 30, 34, 0.1], [70, CAPY + 150, 26, 0.2], [1010, CAPY + 140, 30, 0.28], [540, CAPY - 70, 24, 0.36]];
    var sparkles = SP.map(function (s) {
      var d = el("div", "position:absolute;left:" + (s[0] - s[2]) + "px;top:" + (s[1] - s[2]) + "px;width:" + (2 * s[2]) +
        "px;height:" + (2 * s[2]) + "px;transform-origin:50% 50%", data);
      d.innerHTML = '<svg viewBox="-10 -10 20 20" width="100%" height="100%"><path d="M0,-10 C1,-2 2,-1 10,0 C2,1 1,2 0,10 C-1,2 -2,1 -10,0 C-2,-1 -1,-2 0,-10Z" fill="' +
        GOLD + '" stroke="' + INK + '" stroke-width="1.2"/></svg>';
      return { d: d, at: s[3] };
    });

    // ---------------------------------------------------------------- timing (s) and path
    var W0 = 0, W1 = 5.5, STEP = 0.3;                              // walk from the start to the stop; one pose every STEP
    var CAP0 = 3.75;                                               // name caption pops in
    // The pair's feet line runs from the foot of the picture up the path towards the gate; the size follows it (nearer = bigger).
    var Y0 = 1760, Y1 = 1290, S0 = 0.70, S1 = 0.36;
    function walkU(t) { var u = seg(t, W0, W1); return 0.45 * u + 0.55 * smooth(u); }   // starts and ends gently, mostly steady

    ctx.onDraw(function (t) {
      // camera: one slow push, the background moves a little less than the people
      var k = seg(t, 0, 6), s = 1 + 0.07 * smooth(k);
      world.style.transform = "scale(" + s.toFixed(4) + ")";
      bg.style.transform = "scale(" + (1 + (1 / s - 1) * 0.35).toFixed(4) + ")";
      glow.style.transform = "translate(" + (30 * Math.sin(t * 0.5)).toFixed(1) + "px," + (14 * Math.cos(t * 0.4)).toFixed(1) + "px)";
      glow.style.opacity = (0.75 + 0.25 * Math.sin(t * 1.1)).toFixed(3);

      // the pair
      var u = walkU(t), fy = Y0 + (Y1 - Y0) * u, sc = S0 + (S1 - S0) * u;
      var ph = Math.max(0, t - W0) / STEP, step = Math.floor(ph), fr = ph - step;
      var moving = t < W1 - 0.05;
      var poseA = (step % 2) === 0 || !moving;                      // stand on pose A when the walk ends
      var bob = moving ? Math.sin(fr * Math.PI) * 9 * sc : 0;       // the body rises in the middle of each step
      var sway = moving ? Math.sin(ph * Math.PI) * 5 * sc : 0;      // a small shift from side to side with each step
      var rot = moving ? Math.sin(ph * Math.PI) * 0.7 : 0;
      var fx = 540 + sway;
      pair.style.transform = "translate(" + (fx - AX).toFixed(2) + "px," + (fy - AY - bob).toFixed(2) + "px) scale(" + sc.toFixed(4) + ") rotate(" + rot.toFixed(2) + "deg)";
      pA.style.visibility = poseA ? "visible" : "hidden";
      pB.style.visibility = poseA ? "hidden" : "visible";
      var sw = sc * (moving ? (1 - 0.06 * Math.sin(fr * Math.PI)) : 1);   // the shadow narrows a little as the body rises
      shadowA.style.transform = "translate(" + (fx + 6 * sc).toFixed(2) + "px," + (fy - 13 * sc).toFixed(2) + "px) scale(" + sw.toFixed(4) + ")";
      shadowB.style.transform = "translate(" + (fx - 70 * sc).toFixed(2) + "px," + (fy + 0 * sc).toFixed(2) + "px) scale(" + sw.toFixed(4) + ")";

      // data layer
      var b = seg(t, 0.15, 0.6);
      badge.style.transform = "scale(" + (b <= 0 ? 0 : outBack(b)).toFixed(3) + ")";
      var wkp = seg(t, 0.55, 0.95);
      week.style.transform = "scale(" + (wkp <= 0 ? 0 : outBack(wkp)).toFixed(3) + ") rotate(-4deg)";
      cap.style.transform = "scale(" + capFit.scale().toFixed(4) + ")";
      letters.forEach(function (l, i) {
        var uu = seg(t, CAP0 + i * 0.05, CAP0 + i * 0.05 + 0.38);
        var scl = uu <= 0 ? 0 : outBack(uu);
        var bobl = t > CAP0 + 1.4 ? Math.sin((t - CAP0) * 3 + i * 0.6) * 4 : 0;
        l.style.transform = "translateY(" + ((1 - Math.min(1, uu * 1.4)) * 60 + bobl).toFixed(1) + "px) scale(" + scl.toFixed(3) + ")";
      });
      sparkles.forEach(function (sp, i) {
        var uu = seg(t, CAP0 + 0.2 + sp.at, CAP0 + 0.8 + sp.at);
        var scl = uu <= 0 ? 0 : outBack(Math.min(1, uu * 1.6)) * (1 - 0.25 * seg(t, CAP0 + 1.4 + sp.at, CAP0 + 2.6 + sp.at));
        var tw = 1 + 0.12 * Math.sin(t * 6 + i);
        sp.d.style.transform = "scale(" + (scl * tw).toFixed(3) + ") rotate(" + (t * 40 + i * 30).toFixed(1) + "deg)";
      });
    });
    return { destroy: function () { capFit.destroy(); } };
  }
});
})();

;
/* P-2 arrival beat · p2-arrival  (option A: 3D living storybook)
 * Noor leads her mum by the hand up to the school gate while the teacher and friends wave; the name caption pops in.
 * The 3D art moves only as WHOLE figures (never cut at the joints). Every layer comes from image edits of the approved
 * arrival picture; each second pose is the first pose with only the hands (wave) or legs (step) replaced
 * (tools/poses.py), so faces never change between poses. Motion = camera drift with depth, a 2-pose step cycle,
 * a 2-pose wave cycle, contact shadows, and the live data layer (badge, week, name, grade) on top.
 * Every frame is a pure function of t (kit rule 1). Bitmap layers are an approved exception to kit rule 7, like the
 * mascot clips. Content (names, labels, art path) lives in defaults.
 */
(function () {
MotionIgor.define({
  id: "p2-arrival",
  duration: 8,
  size: [1080, 1920],
  kind: "scene",
  title: "P-2 report · arrival at the gate",
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  defaults: {
    art: "arrival-layers/",
    badge: "Weekly report",
    episode: "Week 7",
    child: { name: "Noor", grade: "Grade 0", form: "PREP A" },
    chrome: true                       // false: the story draws the badge, week above its transitions
  },
  build: function (ctx) {
    var c = ctx.content, WD = P2Wide.begin(ctx), st = WD.col;
    var KART = P2Kid.art(c, c.art);                                // the child + mum pair: the girl / boy pictures when they are on (p2-form.js P2Kid)
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f";

    // ---------------------------------------------------------------- helpers (pure)
    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function smooth(x) { return x * x * (3 - 2 * x); }
    function outCubic(x) { return 1 - Math.pow(1 - x, 3); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function el(tag, css, parent) {
      var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e;
    }
    function img(file, css, parent, art) { var i = el("img", "position:absolute;display:block;max-width:none;" + css, parent); i.src = file.charAt(0) === "@" ? file.slice(1) : (art || c.art) + file; i.alt = ""; i.draggable = false; return i; }
    function shadow(x, y, w, h, a, parent) {
      return el("div", "position:absolute;left:" + x + "px;top:" + y + "px;width:" + w + "px;height:" + h + "px;border-radius:50%;" +
        "background:radial-gradient(ellipse at center, rgba(55,38,22," + a + ") 0%, rgba(55,38,22," + (a * 0.45) + ") 45%, rgba(55,38,22,0) 72%)", parent);
    }

    // ---------------------------------------------------------------- layers (world = 1080 x 1920 design px)
    ctx.stage.style.background = "#e9dccb";
    var OX = 540, OY = 1300;                                   // camera zooms about this point
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:" + OX + "px " + OY + "px;filter:saturate(1.15)");
    var bg = img("@" + WD.src(c.art, "arrival-bg.jpg", "bg.jpg"), WD.bg(1935, -8) + ";transform-origin:" + (OX + WD.wideLeft) + "px " + OY + "px", world);
    var glow = el("div", "position:absolute;left:-260px;top:-300px;width:900px;height:900px;border-radius:50%;" +
      "background:radial-gradient(circle, rgba(255,226,170,0.5) 0%, rgba(255,214,150,0.2) 38%, rgba(255,210,140,0) 70%);" +
      "mix-blend-mode:screen", world);

    // welcome group: further back at the gate (smaller), right edge on the world edge (kept off screen by the camera)
    var GS = 0.74, GX = 1080 - 1080 * GS, GY = 1393 - 1421 * GS;    // friends' shoes on the paving in front of the gate rail
    var group = el("div", "position:absolute;left:0;top:0;width:1080px;height:1890px;transform-origin:0 0" + (WD.wide ?
      ";-webkit-mask-image:linear-gradient(to right,#000 calc(100% - 8px),transparent);mask-image:linear-gradient(to right,#000 calc(100% - 8px),transparent)" : ""), world);
    shadow(250, 1290, 860, 170, 0.34, group);                           // soft pool under the whole group
    [[320, 1310, 180, 44], [505, 1310, 135, 44], [625, 1318, 170, 44], [780, 1388, 270, 54]].forEach(function (s) {
      shadow(s[0], s[1], s[2], s[3], 0.4, group);                       // one under each pair of shoes (friend, friend, boy, teacher)
    });
    var gA = img("group-a.webp", "left:0;top:0;width:1080px;height:1890px", group);
    var gB = img("group-b.webp", "left:0;top:0;width:1080px;height:1890px", group);

    // Noor (leading, gate side) and her mum, walking in from the left, nearer the camera
    var PS = 0.95, PY = 1560 - 1530 * PS;
    var PX0 = -(762 * PS) - 20 - WD.ox, PX1 = 60 - 263 * PS;            // fully off screen left -> mum's back 60 px from the world edge
    var pair = el("div", "position:absolute;left:0;top:0;width:1080px;height:1935px;transform-origin:0 0", world);
    var pShadow = shadow(215, 1496, 600, 72, 0.6, pair);
    var pA = img("pair-a.webp", "left:0;top:0;width:1080px;height:1935px", pair, KART);   // mid-stride
    var pS = img("pair-s.webp", "left:0;top:0;width:1080px;height:1935px", pair, KART);   // feet together: passing step and the stop

    // ---------------------------------------------------------------- data layer (live text, above the camera)
    var data = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none");
    var esc = ctx.util.esc;
    var badge = el("div", "position:absolute;left:44px;top:58px;transform-origin:0 50%;display:flex;align-items:center;gap:18px;" +
      "padding:16px 34px 16px 20px;border-radius:999px;background:" + GOLD + ";border:6px solid " + INK + ";box-shadow:8px 8px 0 " + INK, data);
    badge.innerHTML = '<svg width="70" height="70" viewBox="0 0 70 70"><rect x="6" y="8" width="58" height="54" rx="8" fill="#fff" stroke="' + INK +
      '" stroke-width="5"/><rect x="15" y="20" width="16" height="12" rx="2" fill="' + BLUE + '"/><path d="M37 22h18M37 30h14M15 42h40M15 51h30" stroke="' + INK +
      '" stroke-width="4.5" stroke-linecap="round"/></svg><span style="font:700 50px/1 ' + FONT + ';color:#fff;-webkit-text-stroke:9px ' + INK +
      ';paint-order:stroke fill;letter-spacing:0.01em">' + esc(c.badge) + "</span>";
    var week = el("div", "position:absolute;left:552px;top:84px;transform-origin:50% 50%;padding:10px 24px;border-radius:999px;background:" +
      GREEN + ";border:5px solid " + INK + ";box-shadow:6px 6px 0 " + INK + ";font:700 38px/1 " + FONT + ";color:#fff", data);
    week.textContent = c.episode;
    if (!c.chrome) { badge.style.display = "none"; week.style.display = "none"; }

    // caption: NAME · GRADE, letters pop one by one (SPEA layered caption look)
    var CAPY = 1640, MAXW = 940;
    var capBox = el("div", "position:absolute;left:0;right:0;top:" + CAPY + "px;height:0;display:flex;justify-content:center;align-items:flex-start", data);
    var cap = el("div", "flex:none;display:flex;justify-content:center;align-items:baseline;gap:4px;white-space:nowrap;transform-origin:50% 0", capBox);
    cap.setAttribute("data-p2-label", "gate-caption");
    var letters = [];
    function word(text, color, size) {
      var w = el("span", "display:inline-flex", cap);
      String(text).split("").forEach(function (ch) {
        var s = el("span", "display:inline-block;transform-origin:50% 90%;font:700 " + size + "px/1 " + FONT + ";color:" + color +
          ";-webkit-text-stroke:14px " + INK + ";paint-order:stroke fill;text-shadow:0 10px 0 " + INK + ";white-space:pre", w);
        s.textContent = ch; letters.push(s);
      });
    }
    word(c.child.name, BLUE, 132);
    word(" · ", INK, 110);
    word(P2Class(c.child), GREEN, 132);
    // one shared shrink-to-fit (p2-form.js): a long name such as "Mohammed" + "Kindy A" must stay inside the frame
    var capFit = P2Fit.create({ css: "display:flex;align-items:baseline;gap:4px;white-space:nowrap",
      html: P2Fit.chars([[c.child.name, 132], [" \u00b7 ", 110], [P2Class(c.child), 132]], FONT), max: MAXW });
    // sparkles round the caption only (never on people)
    var SP = [[120, CAPY - 8, 40, 0.0], [960, CAPY - 30, 34, 0.1], [70, CAPY + 150, 26, 0.2], [1010, CAPY + 140, 30, 0.28], [540, CAPY - 70, 24, 0.36]];
    var sparkles = SP.map(function (s) {
      var d = el("div", "position:absolute;left:" + (s[0] - s[2]) + "px;top:" + (s[1] - s[2]) + "px;width:" + (2 * s[2]) +
        "px;height:" + (2 * s[2]) + "px;transform-origin:50% 50%", data);
      d.innerHTML = '<svg viewBox="-10 -10 20 20" width="100%" height="100%"><path d="M0,-10 C1,-2 2,-1 10,0 C2,1 1,2 0,10 C-1,2 -2,1 -10,0 C-2,-1 -1,-2 0,-10Z" fill="' +
        GOLD + '" stroke="' + INK + '" stroke-width="1.2"/></svg>';
      return { d: d, at: s[3] };
    });

    // ---------------------------------------------------------------- timing (s)
    var WALK0 = 0.2, WALK1 = 4.3, STEP = 0.25;
    var WAVE0 = 0.9, WAVE1 = 6.8, WAVEP = 0.36;
    var CAP0 = 4.5;
    // camera keys [time, scale, tx, ty]: open close on the waving group, then one steady pull-back and pan left that meets
    // Noor and mum as they walk in. The right edge of the view stays on the world's right edge the whole way, so the
    // teacher is always whole (his picture ends at his elbow, just past that edge). |tx| <= 540 (scale - 1) and ty within
    // [620 (1 - s), 1300 (s - 1)] keep every world edge off screen.
    var CAM = [[0, 1.3, -160, 0], [0.6, 1.3, -160, 0], [4.8, 1.04, -20, 10]];
    function cam(t) {
      for (var i = 1; i < CAM.length; i++) {
        if (t <= CAM[i][0]) {
          var a = CAM[i - 1], b = CAM[i], u = smooth(seg(t, a[0], b[0]));
          return [a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u, a[3] + (b[3] - a[3]) * u];
        }
      }
      var z = CAM[CAM.length - 1]; return [z[1], z[2], z[3]];
    }

    ctx.onDraw(function (t) {
      var cv = cam(t), s = cv[0], tx = cv[1], ty = cv[2];
      world.style.transform = "translate(" + tx.toFixed(2) + "px," + ty.toFixed(2) + "px) scale(" + s.toFixed(4) + ")";
      // depth: the background moves a little less than the people
      var bs = (1 + (1 / s - 1) * 0.3) * 1.02;                  // 2% spare so the parallax never pulls the picture off the right edge
      bg.style.transform = "translate(" + (-tx * 0.25 / s).toFixed(2) + "px,0) scale(" + bs.toFixed(4) + ")";
      glow.style.transform = "translate(" + (40 * Math.sin(t * 0.5)).toFixed(1) + "px," + (20 * Math.cos(t * 0.4)).toFixed(1) + "px)";
      glow.style.opacity = (0.75 + 0.25 * Math.sin(t * 1.1)).toFixed(3);

      // walkers: ease-out glide with a 2-pose step cycle while moving, a slight dip on the step pose
      var wk = seg(t, WALK0, WALK1), moving = t > WALK0 && t < WALK1 - 0.06;
      var px = PX0 + (PX1 - PX0) * outCubic(wk);
      var stridePose = moving && (Math.floor((t - WALK0) / STEP) % 2 === 0);
      var settleU = seg(t, WALK1, WALK1 + 0.45), settle = t > WALK1 ? Math.sin(settleU * Math.PI) * (1 - settleU) : 0;
      pair.style.transform = "translate(" + px.toFixed(2) + "px," + (PY + (stridePose ? 6 : 0) + settle * 5).toFixed(2) + "px) scale(" + PS + ")";
      pA.style.visibility = stridePose ? "visible" : "hidden";
      pS.style.visibility = stridePose ? "hidden" : "visible";
      pShadow.style.transform = "scale(" + (stridePose ? 1.06 : 1) + ",1)";

      // welcome group: wave cycle (hands only), small breath, a little bounce when Noor arrives
      var waving = t > WAVE0 && t < WAVE1;
      var wpose = waving && (Math.floor((t - WAVE0) / (WAVEP / 2)) % 2 === 1);
      gB.style.visibility = wpose ? "visible" : "hidden";
      gA.style.visibility = wpose ? "hidden" : "visible";
      var hop = Math.sin(seg(t, WALK1 - 0.1, WALK1 + 0.45) * Math.PI) * 8;
      var breathe = Math.sin(t * 2.1) * 1.5;
      group.style.transform = "translate(" + GX.toFixed(2) + "px," + (GY - hop + breathe).toFixed(2) + "px) scale(" + GS + ")";

      // data layer
      var b = seg(t, 0.15, 0.6);
      badge.style.transform = "scale(" + (b <= 0 ? 0 : outBack(b)).toFixed(3) + ")";
      var wkp = seg(t, 0.55, 0.95);
      week.style.transform = "scale(" + (wkp <= 0 ? 0 : outBack(wkp)).toFixed(3) + ") rotate(-4deg)";
      cap.style.transform = "scale(" + capFit.scale().toFixed(4) + ")";
      letters.forEach(function (l, i) {
        var u = seg(t, CAP0 + i * 0.05, CAP0 + i * 0.05 + 0.38);
        var sc = u <= 0 ? 0 : outBack(u);
        var bob = t > CAP0 + 1.4 ? Math.sin((t - CAP0) * 3 + i * 0.6) * 4 : 0;
        l.style.transform = "translateY(" + ((1 - Math.min(1, u * 1.4)) * 60 + bob).toFixed(1) + "px) scale(" + sc.toFixed(3) + ")";
      });
      sparkles.forEach(function (sp, i) {
        var u = seg(t, CAP0 + 0.2 + sp.at, CAP0 + 0.8 + sp.at);
        var sc = u <= 0 ? 0 : outBack(Math.min(1, u * 1.6)) * (1 - 0.25 * seg(t, CAP0 + 1.4 + sp.at, CAP0 + 2.6 + sp.at));
        var tw = 1 + 0.12 * Math.sin(t * 6 + i);
        sp.d.style.transform = "scale(" + (sc * tw).toFixed(3) + ") rotate(" + (t * 40 + i * 30).toFixed(1) + "deg)";
      });
    });
    return { destroy: function () { capFit.destroy(); } };
  }
});
})();

;
/* P-2 classroom beat · p2-class  (option A: 3D living storybook)
 * Noor at her desk, ready to learn: the camera eases in, she blinks and waves hello at the viewer, the wall clock ticks
 * from 7:55 to 8:00, "Ready to learn!" pops in and her name card drops onto the desk front.
 * Whole-figure layers only (tools/classroom.py): each extra pose is the first pose with only the waving arm or the eyes
 * replaced, so her face never changes between poses. The clock hands are drawn in code over a hand-less clock face.
 * Every frame is a pure function of t (kit rule 1); bitmap layers are an approved exception to rule 7, like the mascot.
 */
(function () {
// Sound cues (the sound layer, p2-sound.js, plays them off the story clock; beat-local seconds): the school bell rings as the lesson begins, just after the
// wipe into this scene has gone (the wipe ends 0.23 s in) and before the headline "Ready to learn!" pops in (0.6 s). Igor: "the moment the girl sits down".
var BELL_AT = 0.3;
MotionIgor.define({
  id: "p2-class",
  duration: 6,
  size: [1080, 1920],
  kind: "scene",
  cues: function () { return [{ t: BELL_AT, name: "bell" }]; },
  title: "P-2 report · ready to learn",
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  defaults: {
    art: "classroom-layers/",
    badge: "Weekly report",
    episode: "Week 7",
    headline: ["Ready", "to", "learn!"],
    child: { name: "Noor", grade: "Grade 0", form: "PREP A" },
    badgeIn: false,                    // false: badge already on screen (it popped in during the arrival beat)
    chrome: true                       // false: the story draws the badge, week above its transitions
  },
  build: function (ctx) {
    var c = ctx.content, WD = P2Wide.begin(ctx), st = WD.col;
    var KART = P2Kid.art(c, c.art);                                // the child at the desk: the girl / boy pictures when they are on (p2-form.js P2Kid)
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f";

    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function smooth(x) { return x * x * (3 - 2 * x); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function el(tag, css, parent) {
      var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e;
    }
    function img(file, css, parent, art) { var i = el("img", "position:absolute;display:block;max-width:none;" + css, parent); i.src = file.charAt(0) === "@" ? file.slice(1) : (art || c.art) + file; i.alt = ""; i.draggable = false; return i; }
    var esc = ctx.util.esc;

    // ---------------------------------------------------------------- layers
    ctx.stage.style.background = "#f3e6d6";
    var OX = 560, OY = 900;                                   // the camera eases in towards Noor's face
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:" + OX + "px " + OY + "px;filter:saturate(1.15)");
    var bg = img("@" + WD.src(c.art, "classroom-bg.jpg", "bg.jpg"), WD.bg(1935, -8) + ";transform-origin:" + (OX + WD.wideLeft) + "px " + OY + "px", world);
    // clock hands over the hand-less clock face (centre 544,522 in the picture; the wall is slightly soft-focus)
    var clock = el("div", "position:absolute;left:" + (544 - 70) + "px;top:" + (522 - 8 - 70) + "px;width:140px;height:140px;filter:blur(1.5px)", bg.parentNode);
    clock.innerHTML = '<svg viewBox="-70 -70 140 140" width="140" height="140"><defs><linearGradient id="hs" x1="0" x2="1">' +
      '<stop offset="0" stop-color="#2e2f37"/><stop offset="0.45" stop-color="#5a5c66"/><stop offset="1" stop-color="#2e2f37"/></linearGradient></defs>' +
      '<g id="hh"><rect x="-1.5" y="-28" width="7" height="34" rx="3.5" fill="rgba(40,30,20,0.22)"/><rect x="-3.5" y="-30" width="7" height="34" rx="3.5" fill="url(#hs)"/></g>' +
      '<g id="mh"><rect x="-0.5" y="-44" width="5" height="52" rx="2.5" fill="rgba(40,30,20,0.22)"/><rect x="-2.5" y="-46" width="5" height="52" rx="2.5" fill="url(#hs)"/></g>' +
      '<circle r="5.5" fill="#3a3b44"/><circle r="2" fill="#8d8f99"/></svg>';
    var hh = clock.querySelector("#hh"), mh = clock.querySelector("#mh");
    var girl = el("div", "position:absolute;left:0;top:0;width:1080px;height:1935px", world);
    var G = {};
    ["girl-a", "girl-blink", "girl-w1", "girl-w2"].forEach(function (k) { G[k] = img(k + ".webp", "left:0;top:0;width:1080px;height:1935px", girl, KART); });
    // soft shadow under the desk and chair
    var shade = el("div", "position:absolute;left:150px;top:1690px;width:900px;height:110px;border-radius:50%;" +
      "background:radial-gradient(ellipse at center, rgba(70,50,30,0.32) 0%, rgba(70,50,30,0.12) 50%, rgba(70,50,30,0) 72%)", world);
    world.insertBefore(shade, girl);

    // name card on the desk front (live text)
    var card = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none", world);
    // the desk's grey front panel spans about x 290-960, y 1162-1250 in the picture: the card sits inside it
    var tag2 = el("div", "position:absolute;left:660px;top:1176px;transform-origin:50% 0;translate:-50% 0;white-space:nowrap;" +
      "padding:9px 22px;border-radius:12px;background:#fff;border:4px solid " + INK + ";box-shadow:0 7px 9px rgba(40,30,20,0.35), 3px 3px 0 " + INK +
      ";font:700 36px/1 " + FONT + ";color:" + BLUE, card);
    tag2.innerHTML = esc(c.child.name) + ' <span style="color:' + INK + '">·</span> <span style="color:' + GREEN + '">' + esc(P2Class(c.child)) + "</span>";
    tag2.setAttribute("data-p2-label", "desk-card");
    // the card must stay inside the desk's grey front panel (x 290-960, centre 660): one shared shrink-to-fit, 580 px at most
    var cardFit = P2Fit.create({ css: "white-space:nowrap;padding:9px 22px;border:4px solid transparent;font:700 36px/1 " + FONT, html: tag2.innerHTML, max: 580 });

    // ---------------------------------------------------------------- data layer
    var data = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none");
    var badge = el("div", "position:absolute;left:44px;top:58px;transform-origin:0 50%;display:flex;align-items:center;gap:18px;" +
      "padding:16px 34px 16px 20px;border-radius:999px;background:" + GOLD + ";border:6px solid " + INK + ";box-shadow:8px 8px 0 " + INK, data);
    badge.innerHTML = '<svg width="70" height="70" viewBox="0 0 70 70"><rect x="6" y="8" width="58" height="54" rx="8" fill="#fff" stroke="' + INK +
      '" stroke-width="5"/><rect x="15" y="20" width="16" height="12" rx="2" fill="' + BLUE + '"/><path d="M37 22h18M37 30h14M15 42h40M15 51h30" stroke="' + INK +
      '" stroke-width="4.5" stroke-linecap="round"/></svg><span style="font:700 50px/1 ' + FONT + ';color:#fff;-webkit-text-stroke:9px ' + INK +
      ';paint-order:stroke fill;letter-spacing:0.01em">' + esc(c.badge) + "</span>";
    var week = el("div", "position:absolute;left:552px;top:84px;transform-origin:50% 50%;padding:10px 24px;border-radius:999px;background:" +
      GREEN + ";border:5px solid " + INK + ";box-shadow:6px 6px 0 " + INK + ";font:700 38px/1 " + FONT + ";color:#fff", data);
    week.textContent = c.episode;
    if (!c.chrome) { badge.style.display = "none"; week.style.display = "none"; }   // the headline stays

    // headline: three words, letters pop one by one
    var head = el("div", "position:absolute;left:0;right:0;top:256px;display:flex;justify-content:center;align-items:baseline;gap:26px", data);
    var letters = [], colors = [BLUE, GOLD, GREEN];
    c.headline.forEach(function (w, wi) {
      var ws = el("span", "display:inline-flex", head);
      String(w).split("").forEach(function (ch) {
        var s = el("span", "display:inline-block;transform-origin:50% 90%;font:700 92px/1 " + FONT + ";color:" + colors[wi % 3] +
          ";-webkit-text-stroke:14px " + INK + ";paint-order:stroke fill;text-shadow:0 10px 0 " + INK, ws);
        s.textContent = ch; letters.push(s);
      });
    });

    // ---------------------------------------------------------------- motion
    var HEAD0 = 0.6, CARD0 = 1.5, WAVE0 = 2.3, WAVE1 = 3.9, WAVEP = 0.4;
    var BLINKS = [1.05, 4.75];

    ctx.onDraw(function (t) {
      // camera: slow push-in towards her face
      var k = smooth(seg(t, 0, 6));
      var s = 1.05 + 0.09 * k;
      world.style.transform = "scale(" + s.toFixed(4) + ")";
      bg.style.transform = "scale(" + (1 + (1 / s - 1) * 0.35).toFixed(4) + ")";
      clock.style.transform = bg.style.transform;
      clock.style.transformOrigin = (OX - 474) + "px " + (OY - 444) + "px";

      // clock: 7:55 -> 8:00, the minute hand ticks one minute every 1.1 s with a little overshoot
      var tick = Math.min(5, Math.floor(t / 1.1)), frac = (t - tick * 1.1) / 1.1;
      var over = tick < 5 && frac < 0.18 ? Math.sin(frac / 0.18 * Math.PI) * 2.2 : 0;
      var minute = 55 + tick;
      mh.setAttribute("transform", "rotate(" + (minute * 6 + over).toFixed(2) + ")");
      hh.setAttribute("transform", "rotate(" + ((7 + minute / 60) * 30).toFixed(2) + ")");

      // poses: wave between two arm positions; blinks; otherwise hands folded
      var pose = "girl-a";
      if (t > WAVE0 && t < WAVE1) pose = Math.floor((t - WAVE0) / (WAVEP / 2)) % 2 === 0 ? "girl-w1" : "girl-w2";
      else BLINKS.forEach(function (b) { if (t > b && t < b + 0.14) pose = "girl-blink"; });
      for (var key in G) G[key].style.visibility = key === pose ? "visible" : "hidden";

      // headline and name card
      letters.forEach(function (l, i) {
        var u = seg(t, HEAD0 + i * 0.05, HEAD0 + i * 0.05 + 0.38);
        var sc = u <= 0 ? 0 : outBack(u);
        var bob = t > HEAD0 + 1.4 ? Math.sin((t - HEAD0) * 3 + i * 0.6) * 4 : 0;
        l.style.transform = "translateY(" + ((1 - Math.min(1, u * 1.4)) * 60 + bob).toFixed(1) + "px) scale(" + sc.toFixed(3) + ")";
      });
      var cu = seg(t, CARD0, CARD0 + 0.5);
      tag2.style.opacity = cu > 0 ? 1 : 0;
      tag2.style.transform = "translateY(" + ((1 - outBack(cu)) * -120).toFixed(1) + "px) rotate(" + ((1 - cu) * -6 - 2).toFixed(2) + "deg) skewX(-2deg) scale(" + cardFit.scale().toFixed(4) + ")";

      // data layer: already on screen from the arrival beat unless badgeIn
      var b = c.badgeIn ? seg(t, 0.15, 0.6) : 1;
      badge.style.transform = "scale(" + (b <= 0 ? 0 : outBack(b)).toFixed(3) + ")";
      week.style.transform = "scale(" + (b <= 0 ? 0 : outBack(b)).toFixed(3) + ") rotate(-4deg)";
    });
    return { destroy: function () { cardFit.destroy(); } };
  }
});
})();

;
/* P-2 shape sorter beat · p2-sorter  (3D living storybook, real 3D blocks, THREE ROUNDS)
 * "Last week at school" in three short rounds on the same sorter box, every week, a perfect one too. There is one wooden piece per school day
 * open (as many pieces as days open, at most four: star, cylinder, cube, triangle prism; no day names, the data is weekly totals only).
 *   Round 1 "Came to school"  : a day ABSENT is a miss (gold tag Absent).
 *   Round 2 "On time"         : a day LATE TO SCHOOL is a miss (gold tag Late to school). A day she was ABSENT plays exactly like in round 1: that
 *                               piece also flies to a wrong hole, does not fit and carries the gold tag Absent (nothing is greyed or left hanging).
 *   Round 3 "Stayed all day"  : a day she LEFT EARLY is a miss (gold tag Early leave); absent days miss again with the tag Absent.
 *   Order inside a round (rounds 2 and 3): pieces that went in first, then the round's own misses (late / early), then the absent misses LAST.
 * The blocks are REAL 3D solids drawn in code with three.js (a WebGL canvas laid over the photo, vendor/three.min.js, loaded from a local file) and
 * lit like the photo (soft light from the window on the right, soft shadows on the box top).
 *   Good piece: flies over its own hole, tilts, then SINKS into it (solid, no squash). The box top is an invisible depth-only mask with the hole
 *   outlines cut out, so the box edge is correctly in FRONT of the block as it goes in.
 *   Missed piece (always the LAST pieces of the round): goes to a WRONG hole, lands on its rim, does NOT fit, wobbles and stays sitting there
 *   with a gold tag. If a round has more misses than free pieces (odd data), the extra misses stack on a piece that is already missed: one tag
 *   with a count ("Late to school x2"); if no piece is left for them (every day absent) the number just ticks on its card.
 * Between rounds the box clears cleanly (the pieces pop away, the heading leaves, no cross-dissolve) and the next round's pieces pop in. The last round stays.
 * Three counter cards at the bottom appear one per round and build as the pieces land: Days at school N of M (round 1; days open minus absent),
 * Late to school N (round 2), Early leave N (round 3). Each ends on the exact number in the data, whatever the pieces could show
 * (absent misses in rounds 2 and 3 carry a tag but never add to the Late to school / Early leave numbers).
 * Camera: solved from the photo (the box top diamond), so the 3D box top lines up with the picture's top face and the picture's holes.
 * Every frame is a pure function of t (kit rule 1); the photo and three.js are approved exceptions to rule 7, like the mascot.
 * If WebGL is not available the photo, headings, tags and counters still play (no pieces).
 * MotionIgor.registry["p2-sorter"].cues(content) returns the moments that will later carry sounds: [{ t, name }] in beat-local seconds, names
 * round-start, drop-in (a good piece goes into its hole), wrong-hole (a missed piece lands on a rim), tag-absent, tag-late, tag-early, round-clear.
 */
(function () {
// ---------------------------------------------------------------- the rounds: timing and the plan (pure data, no three.js: cues() uses it too)
var RD = 4.6, NR = 3, DUR = 14;                                       // seconds per round, rounds, length of the beat (the last round holds to the end)
var TM = { HEAD0: 0.1, GO0: 0.9, STEP: 0.45, FLY: 0.5, DROP0: 0.55, SINKD: 0.6, FALLD: 0.22, GOODLAND: 0.2, TAG: 0.1, TAGSTEP: 0.15, OUT0: RD - 0.45, OUTD: 0.4 };
var KIND = ["star", "circle", "square", "triangle"];
var THICK = { star: 0.12, circle: 0.12, square: 0.14, triangle: 0.12 };
var AY = 0.30, SINK_TO = -0.42;                                       // height a good piece hovers over its hole, and where it ends inside it
var ROUND_TAG = ["absent", "late", "early"];
function makePlan(wk) {
  wk = wk || {};
  var D = Math.max(0, Math.round(wk.daysOpen || 0)), n = Math.min(4, D);
  var units = [Math.max(0, Math.round(wk.absent || 0)), Math.max(0, Math.round(wk.lateToSchool || 0)), Math.max(0, Math.round(wk.earlyLeave || 0))];
  var absPieces = Math.min(units[0], n);
  var plan = { D: D, n: n, units: units, rounds: [], target: [Math.max(0, D - units[0]), units[1], units[2]] };
  for (var r = 0; r < NR; r++) {
    // every piece is played in every round. Misses are the LAST pieces: this round's own misses (late / early) just before the absent misses, which come last.
    var own = r === 0 ? 0 : Math.min(units[r], n - absPieces), m = absPieces + own, firstMiss = n - m, pieces = [], i, q;
    for (i = 0; i < n; i++) {
      var tag = i < firstMiss ? null : (i >= n - absPieces ? "absent" : ROUND_TAG[r]);
      pieces.push({ i: i, state: tag ? "miss" : "good", tag: tag, k: i, u: 0, t0: 0, land: 0, tagAt: [] });
    }
    for (q = 0; q < absPieces; q++) pieces[n - absPieces + q].u = 1;
    for (q = absPieces; q < units[0] && absPieces > 0; q++) pieces[n - 1 - ((q - absPieces) % absPieces)].u++;       // extra absences stack on a piece that is already absent
    if (r > 0) {
      for (q = 0; q < own; q++) pieces[firstMiss + q].u = 1;
      for (q = own; q < units[r] && own > 0; q++) pieces[n - absPieces - 1 - ((q - own) % own)].u++;                  // extra misses stack on a piece that is already missed
    }
    var ev = [];                                                      // counter events {t, dv}, round-local seconds
    pieces.forEach(function (p) {
      p.t0 = TM.GO0 + p.k * TM.STEP;
      p.land = p.t0 + TM.DROP0 + (p.state === "miss" ? TM.FALLD : TM.GOODLAND);
      if (p.state === "good" && r === 0) ev.push({ t: p.land, dv: 1, p: p });
      for (var j = 0; j < p.u; j++) {
        p.tagAt.push(p.land + TM.TAG + j * TM.TAGSTEP);
        if (r > 0 && p.tag === ROUND_TAG[r]) ev.push({ t: p.land + TM.TAG + j * TM.TAGSTEP, dv: 1, p: p });         // absent tags never move the Late / Early numbers
      }
    });
    // the counter ends on the exact number in the data: whatever the pieces could not show goes on the last event (or a fallback one)
    var sum = 0; ev.forEach(function (e) { sum += e.dv; });
    var want = plan.target[r];
    if (sum !== want) {
      if (ev.length) ev[ev.length - 1].dv += want - sum;
      else ev.push({ t: TM.GO0 + 0.6, dv: want, p: null });
    }
    var last = 0; pieces.forEach(function (p) { last = Math.max(last, p.land); });
    plan.rounds.push({ r: r, tag: ROUND_TAG[r], present: n - absPieces, miss: m, pieces: pieces, events: ev, endAt: Math.max(last, ev.length ? ev[ev.length - 1].t : 0) + 0.5, perfect: m === 0 && n > 0 });
  }
  return plan;
}
// seconds after the start of the sink when the block's underside crosses the box top (y = 0) and goes into its hole: the sink is
// py = lerp(AY, SINK_TO, 0.5 - 0.5 cos(pi sk)) over SINKD seconds, the underside is py - thickness / 2
function sinkEnter(kind) {
  var e = (AY - THICK[kind] / 2) / (AY - SINK_TO), sk = Math.acos(1 - 2 * e) / Math.PI;
  return sk * TM.SINKD;
}
function makeCues(wk) {
  var plan = makePlan(wk), out = [];
  plan.rounds.forEach(function (R) {
    var base = R.r * RD;
    out.push({ t: +(base + 0.1).toFixed(3), name: "round-start" });
    R.pieces.forEach(function (p) {
      if (p.state === "good") out.push({ t: +(base + p.t0 + TM.DROP0 + sinkEnter(KIND[p.i])).toFixed(3), name: "drop-in" });
      if (p.state === "miss") {
        out.push({ t: +(base + p.land).toFixed(3), name: "wrong-hole" });
        p.tagAt.forEach(function (ta) { out.push({ t: +(base + ta).toFixed(3), name: "tag-" + p.tag }); });
      }
    });
    if (R.events.length && R.r > 0 && R.events[0].p === null) out.push({ t: +(base + R.events[0].t).toFixed(3), name: "tag-" + R.tag });
    if (R.r < NR - 1) out.push({ t: +(base + TM.OUT0).toFixed(3), name: "round-clear" });
  });
  out.sort(function (a, b) { return a.t - b.t; });
  return out;
}

MotionIgor.define({
  id: "p2-sorter",
  duration: DUR,
  size: [1080, 1920],
  kind: "scene",
  title: "P-2 report · last week at school",
  style: "3D living storybook",
  engine: "webgl",
  theme: "ais",
  cues: function (content) { return makeCues(MotionIgor.util.deepMerge(MotionIgor.registry["p2-sorter"].defaults, content || {}).lastWeek); },
  defaults: {
    art: "sorter-layers/",
    subtitle: "Last week at school",
    // one heading per round (rows of words)
    rounds: [{ head: [["Came", "to"], ["school"]] }, { head: [["On"], ["time"]] }, { head: [["Stayed", "all"], ["day"]] }],
    counter: "Days at school",
    of: "of",
    lateLabel: "Late to school",
    earlyLabel: "Early leave",
    tags: { absent: "Absent", late: "Late to school", early: "Early leave" },
    // last week's totals (P2Data.toStory): daysOpen, absent (days), lateToSchool (days), earlyLeave (days). Default = sample-100.
    lastWeek: { daysOpen: 2, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    badge: "Weekly report",
    episode: "Week 7",
    look: "",                          // local switch of the proof link (?look=girl|boy): both show this story for now
    chrome: true                       // false: the story draws the badge, week above its transitions
  },
  build: function (ctx) {
    var c = ctx.content, WD = P2Wide.begin(ctx), st = WD.col, esc = ctx.util.esc;
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f", GOLDD = "#d99a12";
    var T3 = (typeof THREE !== "undefined") ? THREE : null;

    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function smooth(x) { return x * x * (3 - 2 * x); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function inQuad(x) { return x * x; }
    function lerp(a, b, k) { return a + (b - a) * k; }
    function el(tag, css, parent) {
      var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e;
    }
    // ---------------------------------------------------------------- camera solved from the photo
    // World: X right, Y up, Z towards the viewer; the box top is the diamond |X|+|Z| <= 1 at Y = 0 (units = half the top's diagonal).
    // R = world -> camera (OpenCV: x right, y down, z forward), f in picture pixels, principal point (540, 960). Fitted to the four
    // corners of the box top: reprojection error 1.2 px. The four holes below were measured on the same plane (overlay-checked).
    var CAM = {
      f: 2918.4985823977227,
      R: [[0.999999449946052, 0.00040355029773606423, 0.000968119181912554],
          [0.00013711751371994814, -0.9653974454603498, 0.260782962437001],
          [0.001039858827255488, -0.26078268624620776, -0.9653969697734872]],
      pos: [-0.004990507750880654, 2.1683196520603523, 6.751904611181446]
    };
    var CT = [0, 1, 2].map(function (i) { return -(CAM.R[i][0] * CAM.pos[0] + CAM.R[i][1] * CAM.pos[1] + CAM.R[i][2] * CAM.pos[2]); });
    function projPx(x, y, z) {                                        // world point -> picture pixel
      var R = CAM.R, cx = R[0][0] * x + R[0][1] * y + R[0][2] * z + CT[0], cy = R[1][0] * x + R[1][1] * y + R[1][2] * z + CT[1], cz = R[2][0] * x + R[2][1] * y + R[2][2] * z + CT[2];
      return [CAM.f * cx / cz + 540, CAM.f * cy / cz + 960];
    }

    var SUN = [1.3, 3.6, -0.9];                                       // direction of the light (towards the sun): from the right and a little behind the box

    // ---------------------------------------------------------------- the holes (plane coordinates) and the blocks that fit them
    function circlePts(cx, cz, r, n) { var p = []; for (var i = 0; i < n; i++) { var a = i / n * Math.PI * 2; p.push([cx + r * Math.cos(a), cz + r * Math.sin(a)]); } return p; }
    function centroid(P) {                                            // area centroid of a polygon
      var a = 0, cx = 0, cz = 0, i, j, w;
      for (i = 0; i < P.length; i++) { j = (i + 1) % P.length; w = P[i][0] * P[j][1] - P[j][0] * P[i][1]; a += w; cx += (P[i][0] + P[j][0]) * w; cz += (P[i][1] + P[j][1]) * w; }
      return [cx / (3 * a), cz / (3 * a)];
    }
    var TRI = [[0.296, -0.121], [0.777, 0.024], [0.380, 0.384]];
    var TRIC = [(TRI[0][0] + TRI[1][0] + TRI[2][0]) / 3, (TRI[0][1] + TRI[1][1] + TRI[2][1]) / 3];
    // The star hole is NOT a regular star in the photo: it is traced from bg.jpg (the dark opening and its far wall, 8 points picked in picture pixels
    // (307,1071) (370,1084) (442,1075) (421,1099) (467,1118) (337,1141) (316,1121) (306,1119) and put on the box-top plane with the solved camera).
    // The pale sliver left of x = 305 in the photo is a lit bevel on solid wood, not part of the opening, so it is outside the outline.
    var STAR = [[-0.579, -0.212], [-0.416, -0.104], [-0.241, -0.179], [-0.286, 0.016], [-0.171, 0.163], [-0.468, 0.333], [-0.528, 0.186], [-0.552, 0.171]];
    // The BLOCK is a regular five-point star (so it still reads as a star), the biggest that fits inside that outline with a margin of 0.008 (found by search);
    // its centre is where the star goes in. The mask and the shadow cut-outs use the traced outline, so nothing can show through solid wood.
    function starPts(cx, cz, R, phi, ri) {
      var p = []; for (var i = 0; i < 10; i++) { var r = i % 2 ? R * ri : R; p.push([cx + r * Math.cos(phi + i * Math.PI / 5), cz + r * Math.sin(phi + i * Math.PI / 5)]); } return p;
    }
    var STARC = [-0.39, 0.09], STARB = starPts(0, 0, 0.17, 1.3963, 0.56);
    var HOLE = {
      star: { c: STARC, poly: STAR, block: STARB },
      circle: { c: [0.013, -0.40], poly: circlePts(0.013, -0.40, 0.245, 72), r: 0.245 },
      square: { c: [0, 0.50], poly: [[-0.277, 0.50], [0, 0.223], [0.277, 0.50], [0, 0.777]] },
      triangle: { c: TRIC, poly: TRI }
    };
    var FIT = 0.88;                                                   // a block is 88% of its hole, so it clears the walls
    var PAINT = { star: 0xdca02c, circle: 0x4079c2, square: 0x409e35, triangle: 0xbf2b1d };
    // Where each block rests when its day was missed: on the rim of a WRONG hole, its centre over solid wood and about 30% of its footprint over the hole,
    // so most of that hole stays open and visible from the camera. Found by search over position and yaw (every hole used by one block at most, no block touching
    // another or the other three holes, the box edge cleared, at least 70% of the wrong hole's opening uncovered in the picture, blocks overlapping each other
    // as little as possible on screen). The missed blocks are always the last ones, so the set is a run of kinds: "first-last" (0 star, 1 cylinder, 2 cube, 3 prism).
    var RESTSETS = {
      "0-0": { star: { hole: "circle", at: [0.3, -0.275], yaw: 1.5708 } },
      "0-1": { star: { hole: "triangle", at: [0.25, 0.05], yaw: 2.7489 }, circle: { hole: "star", at: [-0.15, 0.05], yaw: -3.1416 } },
      "0-2": { star: { hole: "circle", at: [-0.275, -0.325], yaw: 1.5708 }, circle: { hole: "triangle", at: [0.225, 0.125], yaw: -3.1416 }, square: { hole: "star", at: [-0.65, 0], yaw: -3.1416 } },
      "0-3": { star: { hole: "square", at: [-0.25, 0.425], yaw: -1.1781 }, circle: { hole: "triangle", at: [0.175, 0.075], yaw: -1.9635 }, square: { hole: "star", at: [-0.675, 0], yaw: -3.1416 }, triangle: { hole: "circle", at: [0.35, -0.375], yaw: 1.5708 } },
      "1-1": { circle: { hole: "triangle", at: [0.2, 0.1], yaw: -3.1416 } },
      "1-2": { circle: { hole: "triangle", at: [0.2, 0.1], yaw: -3.1416 }, square: { hole: "star", at: [-0.65, 0], yaw: -3.1416 } },
      "1-3": { circle: { hole: "triangle", at: [0.225, 0.125], yaw: -3.1416 }, square: { hole: "star", at: [-0.65, 0], yaw: -3.1416 }, triangle: { hole: "circle", at: [-0.25, -0.375], yaw: 0.7854 } },
      "2-2": { square: { hole: "triangle", at: [0.225, 0.075], yaw: -3.1416 } },
      "2-3": { square: { hole: "star", at: [-0.65, 0], yaw: -3.1416 }, triangle: { hole: "circle", at: [0.275, -0.275], yaw: 0 } },
      "3-3": { triangle: { hole: "star", at: [-0.15, 0.15], yaw: 0 } }
    };
    // hovering spots, above the box like the approved picture (picked by projecting the old cut-outs' positions onto the plane Z = -0.15)
    var HOVER = {
      star: { p: [-0.58, 0.39, -0.15], yaw: 0.5, ph: 0.4 }, circle: { p: [-0.2, 0.75, -0.15], yaw: -0.35, ph: 1.7 },
      square: { p: [0.23, 0.85, -0.15], yaw: 0.3, ph: 3.1 }, triangle: { p: [0.59, 0.36, -0.15], yaw: -0.45, ph: 4.4 }
    };
    // the rim point where the block teeters (the line from the resting centre towards the hole centre meets the hole outline)
    function rimPoint(from, hole) {
      var dx = hole.c[0] - from[0], dz = hole.c[1] - from[1], L = Math.sqrt(dx * dx + dz * dz); dx /= L; dz /= L;
      var best = 1e9, P = hole.poly;
      for (var i = 0; i < P.length; i++) {
        var a = P[i], b = P[(i + 1) % P.length], ex = b[0] - a[0], ez = b[1] - a[1];
        var den = dx * ez - dz * ex; if (Math.abs(den) < 1e-9) continue;
        var s = ((a[0] - from[0]) * ez - (a[1] - from[1]) * ex) / den, w = ((a[0] - from[0]) * dz - (a[1] - from[1]) * dx) / den;
        if (s > 0 && w >= 0 && w <= 1 && s < best) best = s;
      }
      if (best > 1e8) best = 0.1;
      return { x: from[0] + dx * best, z: from[1] + dz * best, dx: dx, dz: dz };
    }

    // ---------------------------------------------------------------- days -> what each piece does, round by round
    var PL = makePlan(c.lastWeek), daysTotal = PL.D, n = PL.n;
    var B = [], i;
    for (i = 0; i < n; i++) B.push({ i: i, kind: KIND[i], hv: HOVER[KIND[i]], th: THICK[KIND[i]], R: [] });
    PL.rounds.forEach(function (rd) {
      var first = n - rd.miss, last = n - 1;
      rd.pieces.forEach(function (p) {
        var b = B[p.i], R = { state: p.state, tag: p.tag, t0: p.t0, land: p.land, u: p.u, tagAt: p.tagAt, pop0: 0.1 + p.i * 0.08 };
        var h = HOLE[b.kind];
        if (p.state === "miss") { var rs = RESTSETS[first + "-" + last][b.kind]; R.tx = rs.at[0]; R.tz = rs.at[1]; R.yaw = rs.yaw; R.rim = rimPoint(rs.at, HOLE[rs.hole]); R.hole = HOLE[rs.hole]; }
        else { R.tx = h.c[0]; R.tz = h.c[1]; R.yaw = 0; }
        b.R[rd.r] = R;
      });
    });
    function roundOf(t) { return clamp(Math.floor(t / RD), 0, NR - 1); }
    // counter values at time t (absolute beat seconds): days, late, early
    function countersAt(t) {
      var v = [0, 0, 0], last = [-9, -9, -9];
      PL.rounds.forEach(function (rd) {
        rd.events.forEach(function (e) { var at = rd.r * RD + e.t; if (t >= at) { v[rd.r] += e.dv; last[rd.r] = Math.max(last[rd.r], at); } });
      });
      return { v: v, last: last };
    }
    // ---------------------------------------------------------------- picture + WebGL canvas (one scaled world)
    ctx.stage.style.background = "#efe2d0";
    var OX = 540, OY = 1000;
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:" + OX + "px " + OY + "px;filter:saturate(1.15)");
    var bg = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none", world);
    bg.src = WD.src(c.art, "sorter-bg.jpg", "bg.jpg"); bg.alt = ""; bg.draggable = false;

    // ---------------------------------------------------------------- three.js scene
    var SHN = 512;
    var gl = null, renderer = null, scene = null, camera = null, lastW = 0, lastH = 0, lastT = 0, ok = false;
    var shCan = null, shG = null, shUn = null, shUg = null, shMask = null, shTex = null;
    // canvas size in device pixels: device pixels per design pixel (device pixel ratio x how big the stage is on screen x the slow zoom of the picture),
    // at most 3x, and at most 16 million pixels in all (the canvas area limit of iOS Safari), so a full-screen 3x display gets 2.8x
    var CAP_PX = 16000000, GL_ZOOM = 1.08;
    function sizeGL() {
      if (!gl) return;
      var dpr = window.devicePixelRatio || 1, r = st.getBoundingClientRect(), sc = r.width > 0 ? r.width / 1080 : 1;
      var pr = clamp(dpr * sc * GL_ZOOM, 1, 3);
      pr = Math.min(pr, Math.sqrt(CAP_PX / (1080 * 1920)));
      var w = Math.round(1080 * pr), h = Math.round(1920 * pr);
      if (gl.canvas.width !== w || gl.canvas.height !== h) { gl.canvas.width = w; gl.canvas.height = h; }
    }
    if (T3) {
      try {
        // own canvas (not ctx.canvas): the kit caps its canvases at 2x, but the blocks must be as sharp as the page text at 3x (phones)
        var cv = document.createElement("canvas");
        cv.style.cssText = "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none";
        var gx = null, gopt = { premultipliedAlpha: true, antialias: true, preserveDrawingBuffer: true, alpha: true };
        try { gx = cv.getContext("webgl2", gopt); } catch (e0) { gx = null; }
        if (!gx) { try { gx = cv.getContext("webgl", gopt); } catch (e1) { gx = null; } }
        if (gx) { gl = { canvas: cv, g: gx }; world.appendChild(cv); sizeGL(); } else gl = null;
      } catch (e) { gl = null; }
    }
    if (gl && T3) {
      try {
        renderer = new T3.WebGLRenderer({ canvas: gl.canvas, context: gl.g, alpha: true, antialias: true, premultipliedAlpha: true, preserveDrawingBuffer: true });
        renderer.setClearColor(0x000000, 0);
        renderer.shadowMap.enabled = false;                           // soft shadows are drawn by hand (see drawShadows)
        scene = new T3.Scene();
        camera = new T3.PerspectiveCamera(2 * Math.atan(960 / CAM.f) * 180 / Math.PI, 1080 / 1920, 0.5, 30);
        var R = CAM.R;
        var bx = new T3.Vector3(R[0][0], R[0][1], R[0][2]), by = new T3.Vector3(-R[1][0], -R[1][1], -R[1][2]), bz = new T3.Vector3(-R[2][0], -R[2][1], -R[2][2]);
        camera.position.set(CAM.pos[0], CAM.pos[1], CAM.pos[2]);
        camera.quaternion.setFromRotationMatrix(new T3.Matrix4().makeBasis(bx, by, bz));
        camera.updateMatrixWorld(true);

        // light from the window side (right, a little behind), warm; soft fills from the room and from the camera side
        scene.add(new T3.HemisphereLight(0xfff0dc, 0xc89a68, 0.85));
        var sun = new T3.DirectionalLight(0xfff1dc, 1.3);
        sun.position.set(SUN[0], SUN[1], SUN[2]); sun.target.position.set(0, 0, 0); scene.add(sun); scene.add(sun.target);
        var fill = new T3.DirectionalLight(0xffeedd, 0.5);
        fill.position.set(-1.6, 1.8, 3.2); fill.target.position.set(0, 0, 0); scene.add(fill); scene.add(fill.target);

        // the box top: an invisible mask that only writes depth (so a block sinking below the top is hidden by the box, except through the hole
        // outlines cut out of it) plus a shadow-only layer on the box top itself
        function shapeOf(poly) { var s = new T3.Shape(); poly.forEach(function (p, i) { if (i) s.lineTo(p[0], -p[1]); else s.moveTo(p[0], -p[1]); }); s.closePath(); return s; }
        function topGeo(outer) {
          var s = shapeOf(outer);
          KIND.forEach(function (k) { var h = new T3.Path(); HOLE[k].poly.forEach(function (p, i) { if (i) h.lineTo(p[0], -p[1]); else h.moveTo(p[0], -p[1]); }); h.closePath(); s.holes.push(h); });
          var g = new T3.ShapeGeometry(s, 4); g.rotateX(-Math.PI / 2); return g;
        }
        var mask = new T3.Mesh(topGeo([[-4, -4], [4, -4], [4, 4], [-4, 4]]), new T3.MeshBasicMaterial({ colorWrite: false }));
        mask.renderOrder = -10; scene.add(mask);
        // the walls of every hole shaft (depth only): a ray that enters one hole can never see a block sitting in another hole's shaft
        var wv = [], WD = 3;
        KIND.forEach(function (k) {
          var P = HOLE[k].poly;
          for (var wi = 0; wi < P.length; wi++) {
            var a = P[wi], b2 = P[(wi + 1) % P.length];
            wv.push(a[0], 0, a[1], b2[0], 0, b2[1], b2[0], -WD, b2[1], a[0], 0, a[1], b2[0], -WD, b2[1], a[0], -WD, a[1]);
          }
        });
        var wg = new T3.BufferGeometry(); wg.setAttribute("position", new T3.BufferAttribute(new Float32Array(wv), 3));
        var walls = new T3.Mesh(wg, new T3.MeshBasicMaterial({ colorWrite: false, side: T3.DoubleSide }));
        walls.renderOrder = -10; scene.add(walls);
        // soft shadows: one 2D canvas covering the box top (plane -1..1 -> 0..SHN px), redrawn from t every frame, shown on the top face only (holes stay clear)
        var rg = topGeo([[-1, 0], [0, -1], [1, 0], [0, 1]]), rp = rg.attributes.position, ruv = new Float32Array(rp.count * 2);
        for (var vi = 0; vi < rp.count; vi++) { ruv[vi * 2] = (rp.getX(vi) + 1) / 2; ruv[vi * 2 + 1] = (1 - rp.getZ(vi)) / 2; }
        rg.setAttribute("uv", new T3.BufferAttribute(ruv, 2));
        shCan = document.createElement("canvas"); shCan.width = shCan.height = SHN; shG = shCan.getContext("2d");
        shUn = document.createElement("canvas"); shUn.width = shUn.height = SHN; shUg = shUn.getContext("2d");
        shMask = document.createElement("canvas"); shMask.width = shMask.height = SHN;
        (function () {                                                // soft diamond: shadows fade out towards the box edges (they would run down the side faces)
          var g = shMask.getContext("2d"), im = g.createImageData(SHN, SHN), d = im.data;
          for (var yy = 0; yy < SHN; yy++) for (var xx = 0; xx < SHN; xx++) {
            var X = (xx + 0.5) / SHN * 2 - 1, Z = (yy + 0.5) / SHN * 2 - 1, e = (1 - Math.abs(X) - Math.abs(Z)) / Math.SQRT2, a = clamp(e / 0.16, 0, 1);
            var o = (yy * SHN + xx) * 4; d[o] = d[o + 1] = d[o + 2] = Math.round(255 * smooth(a)); d[o + 3] = 255;
          }
          g.putImageData(im, 0, 0);
        })();
        shTex = new T3.CanvasTexture(shCan); shTex.generateMipmaps = false; shTex.minFilter = T3.LinearFilter; shTex.magFilter = T3.LinearFilter;
        var recv = new T3.Mesh(rg, new T3.MeshBasicMaterial({ color: 0x3a1e08, alphaMap: shTex, transparent: true, depthWrite: false }));
        recv.position.y = 0.002; recv.renderOrder = 5; scene.add(recv);

        // wood-painted blocks: bevelled prisms for star / cube / triangle, a bevelled cylinder for the circle
        var BV = 0.013;
        function prismGeo(poly, th) {
          var s = shapeOf(poly), d = th - 2 * BV;
          var g = new T3.ExtrudeGeometry(s, { depth: d, bevelEnabled: true, bevelThickness: BV, bevelSize: BV, bevelOffset: -BV, bevelSegments: 2, curveSegments: 1 });
          g.rotateX(-Math.PI / 2); g.translate(0, -d / 2, 0); return g;
        }
        function cylGeo(r, th) {
          var pts = [new T3.Vector2(0, -th / 2), new T3.Vector2(r - BV, -th / 2)], a;
          for (a = 1; a <= 4; a++) { var g1 = -Math.PI / 2 + a / 4 * Math.PI / 2; pts.push(new T3.Vector2(r - BV + BV * Math.cos(g1), -th / 2 + BV + BV * Math.sin(g1))); }
          for (a = 1; a <= 4; a++) { var g2 = a / 4 * Math.PI / 2; pts.push(new T3.Vector2(r - BV + BV * Math.cos(g2), th / 2 - BV + BV * Math.sin(g2))); }
          pts.push(new T3.Vector2(0, th / 2));
          var lg = new T3.LatheGeometry(pts, 72), lp = lg.attributes.position, lu = new Float32Array(lp.count * 2);
          for (var li = 0; li < lp.count; li++) { lu[li * 2] = lp.getX(li) * 1.4; lu[li * 2 + 1] = lp.getZ(li) * 1.4; }   // grain runs one way across the top, like the prisms
          lg.setAttribute("uv", new T3.BufferAttribute(lu, 2));
          return lg;
        }
        // a faint painted-wood grain (drawn once from the kit's seeded random, so every load is identical)
        var grain = (function () {
          var cv = document.createElement("canvas"); cv.width = cv.height = 256; var g = cv.getContext("2d");
          g.fillStyle = "#f4f4f4"; g.fillRect(0, 0, 256, 256);
          for (var li = 0; li < 150; li++) {
            var yy = ctx.rand() * 256, hh = 0.6 + ctx.rand() * 2.0, v = 185 + Math.floor(ctx.rand() * 60);
            g.fillStyle = "rgba(" + v + "," + v + "," + v + "," + (0.2 + ctx.rand() * 0.35).toFixed(2) + ")";
            g.beginPath(); g.moveTo(0, yy);
            for (var xx = 0; xx <= 256; xx += 32) g.lineTo(xx, yy + Math.sin(xx / 40 + li) * 1.6 + (ctx.rand() - 0.5) * 0.8);
            for (xx = 256; xx >= 0; xx -= 32) g.lineTo(xx, yy + hh + Math.sin(xx / 40 + li) * 1.6);
            g.closePath(); g.fill();
          }
          var tx = new T3.CanvasTexture(cv); tx.wrapS = tx.wrapT = T3.RepeatWrapping; tx.repeat.set(3, 3); tx.colorSpace = T3.SRGBColorSpace; return tx;
        })();
        function paint(hex) {
          var m = new T3.MeshStandardMaterial({ color: hex, roughness: 0.5, metalness: 0, map: grain });
          // darker the deeper a block is below the box top (inside the hole it is in shadow)
          m.onBeforeCompile = function (sh) {
            sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nvarying float vWY;").replace("#include <begin_vertex>", "#include <begin_vertex>\nvWY = (modelMatrix * vec4(transformed, 1.0)).y;");
            sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nvarying float vWY;").replace("#include <dithering_fragment>", "gl_FragColor.rgb = mix(vec3(0.075, 0.036, 0.014), gl_FragColor.rgb, mix(0.04, 1.0, smoothstep(-0.34, -0.01, vWY)));\n#include <dithering_fragment>");
          };
          return m;
        }
        B.forEach(function (b) {
          var h = HOLE[b.kind], local;
          var geo;
          if (b.kind === "circle") geo = cylGeo(h.r * FIT, THICK.circle);
          else { local = h.block || h.poly.map(function (p) { return [(p[0] - h.c[0]) * FIT, (p[1] - h.c[1]) * FIT]; }); geo = prismGeo(local, THICK[b.kind]); }
          var m = new T3.Mesh(geo, paint(PAINT[b.kind])); scene.add(m); b.mesh = m;
          b.ring = b.kind === "circle" ? circlePts(0, 0, h.r * FIT, 28) : local;
        });
        ok = true;
      } catch (e) { ok = false; try { console.warn("p2-sorter: WebGL scene not available (" + e.message + ")"); } catch (e2) { } }
    }

    // scratch objects for the pose maths (nothing is carried from one frame to the next)
    var VY = ok ? new T3.Vector3(0, 1, 0) : null, VX = ok ? new T3.Vector3(1, 0, 0) : null;
    var qa = ok ? new T3.Quaternion() : null, qb = ok ? new T3.Quaternion() : null, qc = ok ? new T3.Quaternion() : null, qd = ok ? new T3.Quaternion() : null;
    var pv = ok ? new T3.Vector3() : null, pw = ok ? new T3.Vector3() : null, ax = ok ? new T3.Vector3() : null;
    var HOVER_BANK = 1.38;                                            // the block hangs nearly upright, face to the camera, tipped a little back
    function placeBlock(b, t) {
      var r = roundOf(t), R = b.R[r], lt = t - r * RD, m = b.mesh, hv = b.hv, ph = hv.ph, u = lt - R.t0;
      var s = outBack(seg(lt, R.pop0, R.pop0 + 0.45));
      if (r < NR - 1) s *= 1 - smooth(seg(lt, TM.OUT0, TM.OUT0 + TM.OUTD));      // the box clears between rounds (the last round stays)
      // hovering pose at this time
      var hx = hv.p[0], hy = hv.p[1] + 0.03 * Math.sin(2.1 * t + ph), hz = hv.p[2];
      qa.setFromAxisAngle(VY, hv.yaw + 0.25 * Math.sin(1.1 * t + ph));
      qb.setFromAxisAngle(VX, HOVER_BANK + 0.06 * Math.sin(1.7 * t + ph * 1.7));
      qc.setFromAxisAngle(VY, 0.3 * Math.sin(0.9 * t + ph * 2.3));
      qa.multiply(qb).multiply(qc);                                   // qa = hovering orientation
      var px = hx, py = hy, pz = hz;
      if (u > 0) {
        var k = smooth(seg(u, 0, TM.FLY));
        var ay = R.state === "miss" ? 0.34 : AY;
        px = lerp(hx, R.tx, k); pz = lerp(hz, R.tz, k);
        py = lerp(hy, ay, k) + Math.sin(k * Math.PI) * 0.22;
        // tipped as it arrives, levelling out over the hole
        var tilt = 0.17 * (1 - smooth(seg(u, 0.56 * TM.FLY, 1.16 * TM.FLY)));
        qb.setFromAxisAngle(VY, R.yaw);
        qc.setFromEuler(new T3.Euler(tilt, 0, -tilt * 0.8));
        qd.copy(qc).multiply(qb);                                     // qd = tilted, yawed, flat orientation
        qa.slerp(qd, k);
        if (u > TM.DROP0) {
          if (R.state === "good") {
            // a good day: sinks straight into its own hole
            var sk = seg(u, TM.DROP0, TM.DROP0 + TM.SINKD);
            py = lerp(ay, SINK_TO, 0.5 - 0.5 * Math.cos(Math.PI * sk));
            qc.setFromAxisAngle(VX, 0.19 * Math.sin(Math.min(1, sk * 1.25) * Math.PI)); qa.premultiply(qc);   // its front edge goes in first
          } else {
            var fk = seg(u, TM.DROP0, TM.DROP0 + TM.FALLD);
            py = lerp(ay, b.th / 2, inQuad(fk));
            var w = u - (TM.DROP0 + TM.FALLD);
            if (w > 0) {
              py += 0.03 * Math.abs(Math.sin(Math.PI * Math.min(1, w / 0.3))) * Math.max(0, 1 - w / 0.3);
              // an attempt and a refusal: it lands on the rim, the side over the hole drops in (about 25 degrees), catches and rocks back, drops in again
              // (about 11, then 5 degrees) and ends leaning into the hole at 4 degrees, wedged, not in
              var ang = 0.07 * (1 - Math.exp(-8 * w)) + 0.46 * Math.exp(-3.1 * w) * Math.abs(Math.sin(2 * Math.PI * 2.0 * w));
              ax.set(R.rim.dz, 0, -R.rim.dx);
              qc.setFromAxisAngle(ax, ang);
              pv.set(px - R.rim.x, py, pz - R.rim.z).applyQuaternion(qc); px = R.rim.x + pv.x; py = pv.y; pz = R.rim.z + pv.z;
              qa.premultiply(qc);
            }
          }
        }
      }
      m.position.set(px, py, pz);
      m.quaternion.copy(qa);
      m.scale.setScalar(Math.max(0.0001, s));
      m.visible = s > 0.002;
      m.material.color.setHex(PAINT[b.kind]);
      b.s = s;
    }
    // ---------------------------------------------------------------- data layer (DOM over the picture)
    var data = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none");
    var badge = el("div", "position:absolute;left:44px;top:58px;display:flex;align-items:center;gap:18px;" +
      "padding:16px 34px 16px 20px;border-radius:999px;background:" + GOLD + ";border:6px solid " + INK + ";box-shadow:8px 8px 0 " + INK, data);
    badge.innerHTML = '<span style="font:700 50px/1 ' + FONT + ';color:#fff;-webkit-text-stroke:9px ' + INK + ';paint-order:stroke fill">' + esc(c.badge) + "</span>";
    var week = el("div", "position:absolute;left:552px;top:84px;padding:10px 24px;border-radius:999px;background:" + GREEN +
      ";border:5px solid " + INK + ";box-shadow:6px 6px 0 " + INK + ";font:700 38px/1 " + FONT + ";color:#fff;transform:rotate(-4deg)", data);
    week.textContent = c.episode;
    if (!c.chrome) { badge.style.display = "none"; week.style.display = "none"; }

    // the beat's own small title, then one big heading per round (letters pop one by one, the heading leaves when the round clears)
    var sub = el("div", "position:absolute;left:0;right:0;top:196px;text-align:center;font:700 52px/1 " + FONT + ";color:#fff;-webkit-text-stroke:10px " + INK +
      ";paint-order:stroke fill;letter-spacing:0.01em;text-shadow:0 6px 0 " + INK + ";transform-origin:50% 50%", data);
    sub.textContent = c.subtitle;
    var colors = [BLUE, GREEN];
    var HEADS = c.rounds.slice(0, NR).map(function (rd, r) {
      var host = el("div", "position:absolute;left:0;right:0;top:268px;height:260px;display:none;flex-direction:column;align-items:center;justify-content:center;gap:4px", data);
      var letters = [];
      rd.head.forEach(function (words, li) {
        var row = el("div", "display:flex;gap:28px", host);
        words.forEach(function (w) {
          var ws = el("span", "display:inline-flex", row);
          String(w).split("").forEach(function (ch) {
            var s = el("span", "display:inline-block;transform-origin:50% 90%;font:700 112px/1.02 " + FONT + ";color:" + colors[(li + r) % 2] +
              ";-webkit-text-stroke:16px " + INK + ";paint-order:stroke fill;text-shadow:0 11px 0 " + INK, ws);
            s.textContent = ch; letters.push(s);
          });
        });
      });
      return { host: host, letters: letters };
    });

    // dust where a missed piece touches the rim, sparkle where a good piece goes into its hole. They sit BEHIND the 3D canvas (between the photo and the
    // blocks), so a block always covers what is behind it: the dust comes from the contact point at the foot of the block, never stuck on its face.
    var puffs = B.map(function (b) {
      var p = el("div", "position:absolute;left:0;top:0;width:0;height:0", world);
      if (gl && gl.canvas.parentNode === world) world.insertBefore(p, gl.canvas);
      var dots = [];
      for (var d = 0; d < 9; d++) dots.push(el("div", "position:absolute;left:-8px;top:-8px;width:16px;height:16px;border-radius:50%", p));
      return { box: p, dots: dots, key: "" };
    });
    function puffSpot(b, r) {                                         // the contact point of this piece in this round (px on the picture), or null
      var R = b.R[r], pt = R.state === "miss" ? [R.rim.x, 0.0, R.rim.z] : R.state === "good" ? [HOLE[b.kind].c[0], 0.0, HOLE[b.kind].c[1]] : null;
      return pt ? projPx(pt[0], pt[1], pt[2]) : null;
    }

    // three counter cards at the bottom, one appears per round: Days at school N of M | Late to school N | Early leave N
    var CW = 306, CG = 22, CL = (1080 - (3 * CW + 2 * CG)) / 2, CTOP = 1592;
    function card(i, label) {
      var e = el("div", "position:absolute;left:" + (CL + i * (CW + CG)) + "px;top:" + CTOP + "px;width:" + CW + "px;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;gap:12px;" +
        "padding:16px 10px 16px;border-radius:34px;background:#fff;border:7px solid " + INK + ";box-shadow:8px 8px 0 " + INK + ";transform-origin:50% 100%", data);
      var l = el("span", "font:700 33px/1 " + FONT + ";color:" + INK + ";white-space:nowrap", e); l.textContent = label;
      var nm = el("span", "display:inline-block;min-width:150px;text-align:center;padding:8px 18px;border-radius:999px;font:700 52px/1 " + FONT +
        ";color:#fff;background:" + GREEN + ";border:5px solid " + INK + ";transform-origin:50% 50%;white-space:nowrap", e);
      return { box: e, num: nm };
    }
    var CARDS = [card(0, c.counter), card(1, c.lateLabel), card(2, c.earlyLabel)];

    // sparkle stars round a card when its round went perfectly (every played piece went in, nothing missed)
    var SPARKS = CARDS.map(function (cd, ci) {
      var spark = el("div", "position:absolute;left:" + (CL + ci * (CW + CG) + CW / 2) + "px;top:" + (CTOP + 60) + "px;width:0;height:0", data);
      var stars = [];
      for (var q = 0; q < 8; q++) {
        var e = el("div", "position:absolute;left:-16px;top:-16px;width:32px;height:32px", spark);
        e.innerHTML = '<svg viewBox="-16 -16 32 32" width="32" height="32"><path d="M0-14 L3.6-4.6 13.3-4.3 5.8 1.8 8.2 11.3 0 5.8-8.2 11.3-5.8 1.8-13.3-4.3-3.6-4.6Z" fill="' +
          [GOLD, GREEN, BLUE, "#e8577e"][q % 4] + '" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/></svg>';
        stars.push(e);
      }
      return stars;
    });

    // gold tags for missed days, above the piece that carries them (never red)
    var ICON = {
      absent: '<path d="M6 6 L22 22 M22 6 L6 22" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>',
      late: '<circle cx="14" cy="14" r="10" fill="none" stroke="#fff" stroke-width="3.5"/><path d="M14 8 V14 L18 17" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>',
      early: '<path d="M7 4 H19 V24 H7 Z" fill="none" stroke="#fff" stroke-width="3.2"/><path d="M13 14 H25 M21 10 L25 14 L21 18" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round"/>'
    };
    // Layout, per round: each tag sits right above the piece it labels, with a small pointer down to that piece. Tags that would touch are pushed sideways (never over a
    // neighbour's piece: the order left to right is the order of the pieces) and, as a last resort, lifted. A piece that carries more than one miss shows ONE tag with a count.
    var TAGF = 34, TAGH = 78, TAGLIST = [];
    function tagW(label) { return TAGF * String(label).length * 0.56 + 112; }
    PL.rounds.forEach(function (rd) {
      var L = [];
      B.forEach(function (b) {
        var R = b.R[rd.r]; if (R.state !== "miss") return;
        var label = c.tags[R.tag] + (R.u > 1 ? " ×" + R.u : ""), a0 = projPx(R.tx, b.th + 0.04, R.tz), w = tagW(label), zk = 1.06;       // the picture is zoomed about (OX, OY) by about 1.06 when the tags are up
        var a = [OX + (a0[0] - OX) * zk, OY + (a0[1] - OY) * zk];
        L.push({ r: rd.r, b: b, kind: R.tag, label: label, w: w, ax: a[0], ay: a[1], cx: clamp(a[0], 24 + w / 2, 1056 - w / 2), cy: a[1] - 98, at: R.tagAt[0] });
      });
      var it, i, j, k; L.sort(function (p, q) { return p.ax - q.ax; });
      // Each piece's box on the picture (its resting footprint, bottom and top, projected and zoomed like the tags): a tag or pointer must never cover another piece.
      L.forEach(function (p) {
        var R = p.b.R[rd.r], h = HOLE[p.b.kind], ring = p.b.kind === "circle" ? circlePts(0, 0, h.r * FIT, 20) : (h.block || h.poly.map(function (q) { return [(q[0] - h.c[0]) * FIT, (q[1] - h.c[1]) * FIT]; }));
        var cs = Math.cos(R.yaw), sn = Math.sin(R.yaw), x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
        ring.forEach(function (q) {
          [0, p.b.th].forEach(function (yy) {
            var a0 = projPx(R.tx + q[0] * cs + q[1] * sn, yy, R.tz - q[0] * sn + q[1] * cs), zx = OX + (a0[0] - OX) * 1.06, zy = OY + (a0[1] - OY) * 1.06;
            x0 = Math.min(x0, zx); x1 = Math.max(x1, zx); y0 = Math.min(y0, zy); y1 = Math.max(y1, zy);
          });
        });
        p.box = { x0: x0, y0: y0, x1: x1, y1: y1 };
      });
      // Placement: every tag picks a slot (a row, 0 = right above its piece, 1 and 2 = lifted one or two tag heights, and a sideways shift), all tags together are
      // chosen by a small exhaustive search for the least cost: tags never touch each other (at least TGAP px between them, shadow included), never cover a piece, never
      // sit in the headline zone, and no pointer runs through another tag or another piece; shorter pointers and less sideways shift are cheaper. Pure function of the data.
      var TGAP = 14, ROWSTEP = TAGH + TGAP, HEADZONE = 548, SHIFTS = [0, -40, 40, -80, 80, -130, 130, -190, 190, -260, 260];
      function tagRect(p, o) { return { x0: o.cx - p.w / 2, x1: o.cx + p.w / 2 + 5, y0: o.cy - TAGH / 2, y1: o.cy + TAGH / 2 + 5 }; }
      function hit(a, b, m) { return a.x0 < b.x1 + m && b.x0 < a.x1 + m && a.y0 < b.y1 + m && b.y0 < a.y1 + m; }
      function ptHit(p, o, rect, m) {                                  // does the pointer of tag p (placed at o) pass through the rectangle?
        var px0 = o.cx + clamp(p.ax - o.cx, -p.w / 2 + 44, p.w / 2 - 44), py0 = o.cy + TAGH / 2 - 8, x1 = p.ax, y1 = p.ay - 10;
        for (var q = 1; q < 28; q++) {
          var u = q / 28, x = px0 + (x1 - px0) * u, y = py0 + (y1 - py0) * u;
          if (x > rect.x0 - m && x < rect.x1 + m && y > rect.y0 - m && y < rect.y1 + m) return true;
        }
        return false;
      }
      var OPT = L.map(function (p) {
        var list = [], row, s;
        for (row = 0; row < 3; row++) for (s = 0; s < SHIFTS.length; s++) {
          var cx = clamp(p.ax + SHIFTS[s], 24 + p.w / 2, 1056 - p.w / 2), cy = p.ay - 98 - row * ROWSTEP, o = { cx: cx, cy: cy, row: row }, rc = tagRect(p, o);
          var cost = row * 6 + Math.abs(cx - p.ax) * 0.12 + (p.ay - cy) * 0.05, bad = false;
          if (rc.y0 < HEADZONE) cost += 4000;
          for (k = 0; k < L.length; k++) {
            if (L[k] === p) { if (hit(rc, L[k].box, 0)) bad = true; continue; }
            if (hit(rc, L[k].box, 4)) bad = true;
            if (ptHit(p, o, L[k].box, 2)) cost += 600;
          }
          o.rect = rc; o.cost = cost; if (!bad) list.push(o);
        }
        list.sort(function (a, b) { return a.cost - b.cost; });
        return list;
      });
      var bestCost = 1e18, bestPick = null, pick = [];
      (function dfs(n, cost) {
        if (cost >= bestCost) return;
        if (n === L.length) { bestCost = cost; bestPick = pick.slice(); return; }
        for (var oi = 0; oi < OPT[n].length; oi++) {
          var o = OPT[n][oi], add = o.cost, ok = true, m;
          if (cost + o.cost >= bestCost) break;                        // options are sorted by cost
          for (m = 0; m < n; m++) {
            if (hit(pick[m].rect, o.rect, TGAP)) { ok = false; break; }
            if (ptHit(L[m], pick[m], o.rect, 2)) add += 600;
            if (ptHit(L[n], o, pick[m].rect, 2)) add += 600;
          }
          if (!ok) continue;
          pick.push(o); dfs(n + 1, cost + add); pick.pop();
        }
      })(0, 0);
      if (!bestPick) bestPick = OPT.map(function (l, q) { var o = l[0] || { cx: L[q].cx, cy: L[q].cy }; return o; });      // cannot happen with the data, kept so a layout always exists
      L.forEach(function (p, q) { p.cx = bestPick[q].cx; p.cy = bestPick[q].cy; });
      L.forEach(function (p) {
        var box = el("div", "position:absolute;left:" + p.cx.toFixed(1) + "px;top:" + p.cy.toFixed(1) + "px;width:0;height:0;transform-origin:0 0", data);
        var tx = clamp(p.ax - p.cx, -p.w / 2 + 44, p.w / 2 - 44), y0 = TAGH / 2 - 8, dx = p.ax - p.cx, dy = p.ay - p.cy - 10;
        var sv = el("div", "position:absolute;left:0;top:0;width:0;height:0", box);
        sv.innerHTML = '<svg width="1" height="1" style="position:absolute;left:0;top:0;overflow:visible"><path d="M' + (tx - 17).toFixed(1) + " " + y0 + " L" + dx.toFixed(1) + " " + dy.toFixed(1) +
          " L" + (tx + 17).toFixed(1) + " " + y0 + ' Z" fill="' + GOLD + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/></svg>';
        var tg = el("div", "position:absolute;left:0;top:0;translate:-50% -50%;display:flex;align-items:center;gap:12px;white-space:nowrap;padding:12px 24px 12px 14px;border-radius:999px;" +
          "background:" + GOLD + ";border:5px solid " + INK + ";box-shadow:5px 5px 0 " + INK + ";font:700 " + TAGF + "px/1 " + FONT + ";color:" + INK + ";transform-origin:50% 50%", box);
        tg.innerHTML = '<span style="display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:' + GOLDD + ';border:3px solid ' + INK +
          '"><svg width="28" height="28" viewBox="0 0 28 28">' + ICON[p.kind] + "</svg></span>" + esc(p.label);
        TAGLIST.push({ el: box, tg: tg, at: p.at, r: rd.r, i: TAGLIST.length });
      });
    });
    // ---------------------------------------------------------------- draw
    function popNum(el2, since, t) { return 1 + 0.2 * Math.sin(seg(t, since, since + 0.32) * Math.PI); }


    // hand-drawn soft shadows: every block's outline (all of its vertices, projected along the light on to the box top) is filled solid on a scratch
    // canvas and then drawn blurred; the higher the block, the softer and paler. Pure function of t.
    var VW = ok ? new T3.Vector3() : null;
    function drawShadows(t) {
      shG.setTransform(1, 0, 0, 1, 0, 0); shG.globalCompositeOperation = "source-over"; shG.fillStyle = "#000"; shG.fillRect(0, 0, SHN, SHN);   // grey levels = how dark the shadow is (the texture is used as an alpha map)
      var kx = SUN[0] / SUN[1], kz = SUN[2] / SUN[1];
      B.forEach(function (b) {
        var m = b.mesh; if (!m.visible) return;
        var y = m.position.y, a = smooth(clamp((y + 0.05) / 0.22, 0, 1)); if (a <= 0.01) return;
        m.updateMatrixWorld(true);
        shUg.setTransform(1, 0, 0, 1, 0, 0); shUg.clearRect(0, 0, SHN, SHN); shUg.fillStyle = "#fff";
        var n2 = b.ring.length, top = [], bot = [], j, th = b.th / 2;
        for (j = 0; j < n2; j++) {
          [[th, top], [-th, bot]].forEach(function (pr) {
            VW.set(b.ring[j][0], pr[0], b.ring[j][1]).applyMatrix4(m.matrixWorld);
            pr[1].push([(VW.x - VW.y * kx + 1) * SHN / 2, (VW.z - VW.y * kz + 1) * SHN / 2]);
          });
        }
        function poly(P) { shUg.beginPath(); P.forEach(function (p, i) { if (i) shUg.lineTo(p[0], p[1]); else shUg.moveTo(p[0], p[1]); }); shUg.closePath(); shUg.fill(); }
        poly(top); poly(bot);
        for (j = 0; j < n2; j++) poly([top[j], top[(j + 1) % n2], bot[(j + 1) % n2], bot[j]]);
        var h = Math.max(0, y), blur = 4 + 26 * Math.min(1, h), al = 0.95 * (1 - 0.4 * Math.min(1, h / 0.9)) * a * clamp(m.scale.x, 0, 1);
        shG.save(); shG.globalCompositeOperation = "lighter"; shG.shadowColor = "rgba(255,255,255," + al.toFixed(3) + ")"; shG.shadowBlur = blur; shG.shadowOffsetX = SHN * 2; shG.shadowOffsetY = 0;
        shG.drawImage(shUn, -SHN * 2, 0); shG.restore();
      });
      shG.globalCompositeOperation = "multiply"; shG.drawImage(shMask, 0, 0); shG.globalCompositeOperation = "source-over";
      shTex.needsUpdate = true;
    }

    function drawGL(t) {
      if (!ok) return;
      sizeGL();
      var cw = gl.canvas.width, ch = gl.canvas.height;
      if (cw !== lastW || ch !== lastH) { renderer.setPixelRatio(1); renderer.setSize(cw, ch, false); lastW = cw; lastH = ch; }
      B.forEach(function (b) { placeBlock(b, t); });
      drawShadows(t);
      renderer.render(scene, camera);
    }
    bg.addEventListener("load", function () { /* the photo is a DOM image: nothing to redraw */ });


    ctx.onDraw(function (t) {
      lastT = t;
      var rNow = roundOf(t), ltNow = t - rNow * RD;
      var k = smooth(seg(t, 0, DUR));
      var bump = 0;
      B.forEach(function (b) { var u = ltNow - b.R[rNow].land; if (u > 0 && u < 0.25) bump = Math.max(bump, Math.sin(u / 0.25 * Math.PI) * 0.005); });
      world.style.transform = "scale(" + (1.02 + 0.06 * k + bump).toFixed(4) + ")";

      // the beat's small title: pops in at the start, stays
      var su = seg(t, 0.05, 0.45);
      sub.style.opacity = su > 0 ? 1 : 0;
      sub.style.transform = "scale(" + (su <= 0 ? 0 : outBack(su)).toFixed(3) + ")";

      // the round's heading: letters pop in one by one, leave quickly when the round clears
      HEADS.forEach(function (h, r) {
        var rt = t - r * RD, on = rt >= 0 && (r === NR - 1 || rt < TM.OUT0 + TM.OUTD);               // the last round holds to the end
        h.host.style.display = on ? "flex" : "none";
        if (!on) return;
        h.letters.forEach(function (l, i) {
          var u = seg(rt, TM.HEAD0 + i * 0.04, TM.HEAD0 + i * 0.04 + 0.34);
          var bob = Math.sin(t * 3 + i * 0.6) * 4 * seg(rt, TM.HEAD0 + 1.0, TM.HEAD0 + 1.6);
          var out = r < NR - 1 ? smooth(seg(rt, TM.OUT0 + i * 0.006, TM.OUT0 + i * 0.006 + 0.3)) : 0;
          l.style.transform = "translateY(" + (((1 - Math.min(1, u * 1.4)) * 60 + bob) - out * 50).toFixed(1) + "px) scale(" + ((u <= 0 ? 0 : outBack(u)) * (1 - out)).toFixed(3) + ")";
        });
      });

      drawGL(t);

      // puffs (dust at a rim, sparkle at a hole), placed for the piece's state in the current round
      B.forEach(function (b, i) {
        var R = b.R[rNow], pf = puffs[i], key = rNow + R.state;
        if (pf.key !== key) {
          pf.key = key;
          var sp = puffSpot(b, rNow);
          if (sp) { pf.box.style.left = sp[0].toFixed(1) + "px"; pf.box.style.top = sp[1].toFixed(1) + "px"; }
          pf.dots.forEach(function (d, j) {
            d.style.background = R.state === "miss" ? (j % 2 ? "#f6ead2" : "#e2c79a") : (j % 2 ? "#fff6dc" : GOLD);
            d.style.boxShadow = R.state === "miss" ? "0 0 8px rgba(255,244,222,0.9)" : "0 0 6px rgba(255,240,200,0.8)";
          });
        }
        var pu = seg(ltNow, R.land - 0.05, R.land + 0.55), big = R.state === "miss" ? 0.9 : 1;
        pf.dots.forEach(function (d, j) {
          var a = j / pf.dots.length * Math.PI * 2 + 0.3, dist = (14 + 80 * smooth(pu)) * big;
          d.style.opacity = pu > 0 && pu < 1 ? (0.9 * (1 - pu)).toFixed(3) : 0;
          d.style.transform = "translate(" + (Math.cos(a) * dist).toFixed(1) + "px," + (Math.sin(a) * dist * 0.4 - (R.state === "miss" ? 14 : 30) * pu).toFixed(1) + "px) scale(" + ((1.2 - pu * 0.7) * big).toFixed(3) + ")";
        });
      });

      // counters: one card per round, built by that round's landings, ending on the exact number in the data
      var cn = countersAt(t);
      CARDS.forEach(function (cd, i) {
        var cu = seg(t, i * RD + 0.2, i * RD + 0.6);
        cd.box.style.opacity = cu > 0 ? 1 : 0;
        cd.box.style.transform = "scale(" + (cu <= 0 ? 0 : outBack(cu)).toFixed(3) + ")";
        var rd = PL.rounds[i], val = cn.v[i], bg2, fg = "#fff";
        if (i === 0) {
          cd.num.textContent = val + " " + c.of + " " + daysTotal;
          bg2 = (val === daysTotal || t < rd.endAt) ? GREEN : "#b8770f";
        } else {
          cd.num.textContent = String(val);
          if (PL.units[i] > 0) { bg2 = val > 0 ? GOLD : "#8fa0bd"; if (val > 0) fg = INK; }
          else bg2 = rd.present > 0 ? GREEN : "#8fa0bd";                // a clean round: the 0 is the good news
        }
        cd.num.style.background = bg2; cd.num.style.color = fg;
        var joy = rd.perfect ? seg(t, i * RD + rd.endAt - 0.7, i * RD + rd.endAt + 0.3) : 0;
        cd.num.style.transform = "scale(" + (popNum(cd.num, cn.last[i], t) + 0.1 * Math.sin(joy * Math.PI)).toFixed(3) + ")";
        SPARKS[i].forEach(function (e, j) {
          // an arc over the top of the card (from 150 to 30 degrees above the horizontal), always outside the card, so the number stays readable
          var a = -(150 - 120 * j / (SPARKS[i].length - 1)) * Math.PI / 180, rx = 205 + 10 * smooth(joy), ry = 112 + 90 * smooth(joy);
          e.style.opacity = joy > 0 && joy < 1 ? (1 - joy * joy).toFixed(3) : 0;
          e.style.transform = "translate(" + (Math.cos(a) * rx).toFixed(1) + "px," + (Math.sin(a) * ry).toFixed(1) + "px) rotate(" + (joy * 120).toFixed(0) + "deg) scale(1.3)";
        });
      });

      // tags: pop up when the piece lands, leave with the round
      TAGLIST.forEach(function (g) {
        var rt = t - g.r * RD, tu = seg(rt, g.at, g.at + 0.35), to = g.r < NR - 1 ? smooth(seg(rt, TM.OUT0 + 0.02, TM.OUT0 + 0.3)) : 0;
        var sc = (tu <= 0 ? 0 : outBack(tu)) * (1 - to);
        g.el.style.opacity = tu > 0 && sc > 0.001 ? 1 : 0;
        g.el.style.transform = "scale(" + Math.max(0, sc).toFixed(3) + ")";
        g.tg.style.transform = "rotate(" + (Math.sin(t * 2 + g.i) * 2 * seg(rt, g.at + 0.4, g.at + 0.8)).toFixed(2) + "deg)";
      });
    });
    if (c.debug) window.__p2s = { B: B, ok: ok, PL: PL, shCan: shCan, camera: camera, renderer: renderer, scene: scene };
    // a remount (Replay, or the window changing shape) must free this WebGL context, or the browser runs out of them after about 16
    return { destroy: function () { try { if (renderer) { renderer.dispose(); renderer.forceContextLoss(); } } catch (e) { /* already gone */ } } };
  }
});
})();

;
/* P-2 claw machine beat · p2-claw  (3D living storybook, real 3D claw, THREE ROUNDS; the girls' version of p2-sorter)
 * Same data, same rounds, same counters and gold tags as the peg sorter (p2-sorter.js), told with a toy claw machine instead:
 *   Round 1 "Came to school"  : a day ABSENT is a miss (gold tag Absent).
 *   Round 2 "On time"         : a day LATE TO SCHOOL is a miss (gold tag Late to school); absent days miss again (tag Absent).
 *   Round 3 "Stayed all day"  : a day she LEFT EARLY is a miss (gold tag Early leave); absent days miss again (tag Absent).
 *   Order inside a round: days that went well first, then the round's own misses (late / early), then the absent misses LAST.
 * One plush toy per school day open (at most four, a different toy every day) sits on top of the toy heap. The toys are lamb, owl, penguin and fox: the four plush that are NOT
 * in the picture's own heap (the heap already holds teddy, bunny, elephant, duck, puppy, kitten, unicorn and panda, so picking those showed the same toy twice); every round
 * uses the same four in a rotated order, the toys of a round are spread over the heap (SPOTS), and toy-0..7 stay in the art folder unused (content.kinds can pick any of the twelve).
 *   GOOD day  : the silver three-prong claw moves over the toy, lowers, the prongs close ON it (the closing angle is solved from the toy's own outline: the front prong tips
 *               end on the toy's widest row, within a pixel or two), lifts it, carries it to the front left corner, opens; the toy drops down the left edge of the heap (clear of
 *               the front toys' faces), goes behind the machine front (the chute pipe), drops into the prize tray (the chute window) and stays there, ready to be counted; the
 *               round's won toys pile up in the tray and leave with the round.
 *   MISSED day: the claw grabs and lifts the toy right out of the pile (as high as the cable allows), the toy wobbles, slips out of the prongs, falls back on the heap and
 *               lands with a bounce (nothing comes out); a gold tag labels it.
 * The picture (cabinet, glass, heap of toys) is ChatGPT art with the claw and the lifted teddy removed (claw-layers/bg.jpg, wide/claw-bg.jpg); the claw is REAL 3D
 * (three.js: trolley on the gold rail, cable, hub, three prongs whose arms rotate open and shut) and the toys are whole pictures (toy-0..11.webp, cut by colour
 * from one sheet) standing as flat planes inside the same 3D scene, so the back prong passes BEHIND a toy and the front prongs IN FRONT of it.
 * The cabinet base is drawn again above the 3D layer, so a won toy goes down BEHIND the machine front. Toys move as whole pictures only (no limbs).
 * Between rounds the toys left on the heap pop away and the next round's pop in; the last round stays. Counter cards, tags, headings: as the sorter.
 * Every frame is a pure function of t (kit rule 1): the claw is driven by keyframe channels built from the data at build time; three.js and the pictures
 * are approved exceptions to rule 7, like the sorter.
 * MotionIgor.registry["p2-claw"].cues(content) returns the moments that carry sounds: [{ t, name }] in beat-local seconds: round-start, claw-move, claw-grab,
 * toy-drop (a won toy goes into the chute), toy-slip (a missed toy leaves the prongs), tag-absent, tag-late, tag-early, round-clear.
 */
(function () {
// ---------------------------------------------------------------- the rounds: timing and the plan (pure data, no three.js: cues() uses it too)
var RD = 4.6, NR = 3, DUR = 14;                                       // seconds per round, rounds, length of the beat (the last round holds to the end)
var TM = {
  HEAD0: 0.1, GO0: 0.3, PIECE: 0.82,                                  // heading; the claw's first move; seconds per day (piece)
  MOVE: 0.15, LOW0: 0.10, LOW1: 0.22, CLOSE1: 0.47, GRAB: 0.43,       // piece-local: arrive over the toy (opening), rise to travel height, lower, close (0.25 s, cue at GRAB = the prongs touch)
  LIFT0: 0.47, LIFT1: 0.60, CARRY0: 0.55, REL: 0.72, REL1: 0.80,      // good day: lift, carry to the front left corner, the prongs open at REL
  FALLG: 0.20, HIDE: 0.94, TRAYD: 0.12,                               // good day: the toy falls from REL + 0.02 and is behind the machine front at HIDE; it drops down the chute and lands in the tray TRAYD later
  LIFTM1: 0.62, WOB0: 0.62, SLIP: 0.76, FALLM: 0.20, LANDM: 0.96,     // missed day: the toy is lifted as high as the cable allows, wobbles, leaves the prongs at SLIP, lands back at LANDM
  TAG: 0.1, TAGSTEP: 0.15, OUT0: RD - 0.45, OUTD: 0.4
};
var ROUND_TAG = ["absent", "late", "early"];
function makePlan(wk) {
  wk = wk || {};
  var D = Math.max(0, Math.round(wk.daysOpen || 0)), n = Math.min(4, D);
  var units = [Math.max(0, Math.round(wk.absent || 0)), Math.max(0, Math.round(wk.lateToSchool || 0)), Math.max(0, Math.round(wk.earlyLeave || 0))];
  var absPieces = Math.min(units[0], n);
  var plan = { D: D, n: n, units: units, rounds: [], target: [Math.max(0, D - units[0]), units[1], units[2]] };
  for (var r = 0; r < NR; r++) {
    // every piece is played in every round. Misses are the LAST pieces: this round's own misses (late / early) just before the absent misses, which come last.
    var own = r === 0 ? 0 : Math.min(units[r], n - absPieces), m = absPieces + own, firstMiss = n - m, pieces = [], i, q;
    for (i = 0; i < n; i++) {
      var tag = i < firstMiss ? null : (i >= n - absPieces ? "absent" : ROUND_TAG[r]);
      pieces.push({ i: i, state: tag ? "miss" : "good", tag: tag, k: i, u: 0, t0: 0, land: 0, tagAt: [] });
    }
    for (q = 0; q < absPieces; q++) pieces[n - absPieces + q].u = 1;
    for (q = absPieces; q < units[0] && absPieces > 0; q++) pieces[n - 1 - ((q - absPieces) % absPieces)].u++;       // extra absences stack on a toy that is already absent
    if (r > 0) {
      for (q = 0; q < own; q++) pieces[firstMiss + q].u = 1;
      for (q = own; q < units[r] && own > 0; q++) pieces[n - absPieces - 1 - ((q - own) % own)].u++;                  // extra misses stack on a toy that is already missed
    }
    var ev = [];                                                      // counter events {t, dv}, round-local seconds
    pieces.forEach(function (p) {
      p.t0 = TM.GO0 + p.k * TM.PIECE;
      p.land = p.t0 + (p.state === "miss" ? TM.LANDM : TM.HIDE + TM.TRAYD);     // a won toy counts when it lands in the tray
      if (p.state === "good" && r === 0) ev.push({ t: p.land, dv: 1, p: p });
      for (var j = 0; j < p.u; j++) {
        p.tagAt.push(p.land + TM.TAG + j * TM.TAGSTEP);
        if (r > 0 && p.tag === ROUND_TAG[r]) ev.push({ t: p.land + TM.TAG + j * TM.TAGSTEP, dv: 1, p: p });         // absent tags never move the Late / Early numbers
      }
    });
    // the counter ends on the exact number in the data: whatever the toys could not show goes on the last event (or a fallback one)
    var sum = 0; ev.forEach(function (e) { sum += e.dv; });
    var want = plan.target[r];
    if (sum !== want) {
      if (ev.length) ev[ev.length - 1].dv += want - sum;
      else ev.push({ t: TM.GO0 + 0.6, dv: want, p: null });
    }
    var last = 0; pieces.forEach(function (p) { last = Math.max(last, p.land); });
    plan.rounds.push({ r: r, tag: ROUND_TAG[r], present: n - absPieces, miss: m, pieces: pieces, events: ev, endAt: Math.max(last, ev.length ? ev[ev.length - 1].t : 0) + 0.5, perfect: m === 0 && n > 0 });
  }
  return plan;
}
function makeCues(wk) {
  var plan = makePlan(wk), out = [];
  plan.rounds.forEach(function (R) {
    var base = R.r * RD;
    out.push({ t: +(base + 0.1).toFixed(3), name: "round-start" });
    R.pieces.forEach(function (p) {
      out.push({ t: +(base + p.t0 + 0.02).toFixed(3), name: "claw-move" });
      out.push({ t: +(base + p.t0 + TM.GRAB).toFixed(3), name: "claw-grab" });
      if (p.state === "good") out.push({ t: +(base + p.t0 + TM.HIDE).toFixed(3), name: "toy-drop" });       // the toy enters the chute
      if (p.state === "miss") {
        out.push({ t: +(base + p.t0 + TM.SLIP + 0.02).toFixed(3), name: "toy-slip" });
        p.tagAt.forEach(function (ta) { out.push({ t: +(base + ta).toFixed(3), name: "tag-" + p.tag }); });
      }
    });
    if (R.events.length && R.r > 0 && R.events[0].p === null) out.push({ t: +(base + R.events[0].t).toFixed(3), name: "tag-" + R.tag });
    if (R.r < NR - 1) out.push({ t: +(base + TM.OUT0).toFixed(3), name: "round-clear" });
  });
  out.sort(function (a, b) { return a.t - b.t; });
  return out;
}
// the twelve toys: size of each cut-out picture (claw-layers/toy-N.webp) and where the prong tips hold it, all measured from the toy's own pixels by src/tools/claw.py grab:
// gy = the row (fraction of its height from the top: the widest row between 30 and 60 %), gx = the toy's centre on that row (fraction of its width), hw = half its width there (toy px)
var TOYS = [
  { n: "teddy", w: 276, h: 340, gy: 0.3471, gx: 0.5072, hw: 111.0 },
  { n: "bunny", w: 231, h: 371, gy: 0.5256, gx: 0.513, hw: 106.5 },
  { n: "elephant", w: 365, h: 283, gy: 0.3392, gx: 0.4986, hw: 178.0 },
  { n: "duck", w: 233, h: 328, gy: 0.436, gx: 0.5021, hw: 113.0 },
  { n: "puppy", w: 338, h: 289, gy: 0.3841, gx: 0.5, hw: 166.0 },
  { n: "kitten", w: 274, h: 307, gy: 0.3909, gx: 0.4453, hw: 118.0 },
  { n: "unicorn", w: 281, h: 333, gy: 0.5646, gx: 0.4395, hw: 112.5 },
  { n: "panda", w: 269, h: 294, gy: 0.3776, gx: 0.4944, hw: 118.0 },
  { n: "lamb", w: 331, h: 294, gy: 0.4286, gx: 0.5015, hw: 161.0 },
  { n: "owl", w: 274, h: 294, gy: 0.3776, gx: 0.5036, hw: 120.0 },
  { n: "penguin", w: 296, h: 284, gy: 0.5951, gx: 0.5051, hw: 126.5 },
  { n: "fox", w: 290, h: 302, gy: 0.5397, gx: 0.5138, hw: 135.0 }
];
// which of the twelve toys plays in round r on day i: the four that are not in the picture's own heap (lamb 8, owl 9, penguin 10, fox 11), rotated every round
function kindOf(r, i, kinds) { return kinds && kinds[r * 4 + i] != null ? kinds[r * 4 + i] : 8 + ((i - r) % 4 + 4) % 4; }

MotionIgor.define({
  id: "p2-claw",
  duration: DUR,
  size: [1080, 1920],
  kind: "scene",
  title: "P-2 report · last week at school (claw machine)",
  style: "3D living storybook",
  engine: "webgl",
  theme: "ais",
  cues: function (content) { return makeCues(MotionIgor.util.deepMerge(MotionIgor.registry["p2-claw"].defaults, content || {}).lastWeek); },
  defaults: {
    art: "claw-layers/",
    subtitle: "Last week at school",
    rounds: [{ head: [["Came", "to"], ["school"]] }, { head: [["On"], ["time"]] }, { head: [["Stayed", "all"], ["day"]] }],
    counter: "Days at school",
    of: "of",
    lateLabel: "Late to school",
    earlyLabel: "Early leave",
    tags: { absent: "Absent", late: "Late to school", early: "Early leave" },
    lastWeek: { daysOpen: 2, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    badge: "Weekly report",
    episode: "Week 7",
    look: "",
    chrome: true
  },
  build: function (ctx) {
    var c = ctx.content, WD = P2Wide.begin(ctx), st = WD.col, esc = ctx.util.esc;
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f", GOLDD = "#d99a12";
    var T3 = (typeof THREE !== "undefined") ? THREE : null;

    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function smooth(x) { return x * x * (3 - 2 * x); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function inQuad(x) { return x * x; }
    function lerp(a, b, k) { return a + (b - a) * k; }
    function el(tag, css, parent) {
      var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e;
    }

    // ---------------------------------------------------------------- the picture, in picture pixels (1080 x 1920, the cabinet picture scaled 1.148)
    var RAILY = 681;                                                   // centre of the claw's trolley on the gold rail
    var HOMEX = 570, HOMET = 935, HOVT = 915, XC = 292;                // claw home (x, prong-tip y), travel height, x over the front left corner (where a won toy is let go)
    var XD = 222;                                                      // the line a won toy falls along: the left edge of the heap, clear of the front toys' faces
    var HIDEY = 1262;                                                  // top of the cabinet base: a won toy is hidden once it is behind it (it is then in the chute pipe)
    var CHUTE = [379, 1478];                                           // the prize chute opening on the picture
    var TRAY = { x0: 278, y0: 1349, w: 196, h: 190, floor: 1522 };     // the chute window's dark opening (the clip box of the tray toys) and the tray floor (toy bottoms rest here)
    var TRS = 0.48;                                                    // a toy lying in the tray is this fraction of its size on the heap
    var TS = 0.56;                                                     // toy picture px -> frame px
    var SPOTS = { 1: [590], 2: [445, 735], 3: [370, 580, 780], 4: [355, 500, 650, 795] }, SPY = 1072;   // where the toys of a round sit on the heap (centre x, by number of days open), spread over the heap
    var A_HOME = 60;                                                   // prong opening (degrees away from vertical) resting
    var S = 0.88, L1 = 95 * S, L2 = 85 * S, BETA = 62 * Math.PI / 180, HR = 24 * S, HY = 20 * S;   // claw size: arm lengths, elbow bend, hinge radius, hinge below the hub centre
    function dropOf(aDeg) { var a = aDeg * Math.PI / 180; return L1 * Math.cos(a) + L2 * Math.cos(BETA - a); }   // prong tips below the hinges
    function headYOf(tip, aDeg) { return tip - HY - dropOf(aDeg); }    // hub centre (picture y) for a given prong-tip y
    function tipMinOf(aDeg) { return 764 + HY + dropOf(aDeg); }        // highest prong-tip y the cable allows (the hub stays 764 px down: the cable still shows under the trolley)
    function radOf(aDeg) { var a = aDeg * Math.PI / 180; return HR + L1 * Math.sin(a) + L2 * Math.sin(a - BETA); }   // distance of a prong tip from the hub axis

    // ---------------------------------------------------------------- days -> what each toy does, round by round
    var PL = makePlan(c.lastWeek), daysTotal = PL.D, n = PL.n;
    var B = [], i;                                                     // B[i]: the toy at spot i, one per round (R[r])
    for (i = 0; i < n; i++) B.push({ i: i, R: [] });
    PL.rounds.forEach(function (rd) {
      var good = 0;
      rd.pieces.forEach(function (p) {
        var kind = kindOf(rd.r, p.i, c.kinds), meta = TOYS[kind], H = meta.h * TS, W = meta.w * TS, spx = (SPOTS[n] || SPOTS[4])[p.i];
        B[p.i].R[rd.r] = {
          state: p.state, tag: p.tag, t0: p.t0, land: p.land, u: p.u, tagAt: p.tagAt, pop0: 0.1 + p.i * 0.08, kind: kind, meta: meta, W: W, H: H,
          sx: spx, sy: SPY, sz: 0,                                     // the toy's centre on the heap
          ax: spx + (meta.gx - 0.5) * W,                               // the point the prongs hold: the centre of the toy on its widest row ...
          sh: SPY - H / 2 + meta.gy * H,                               // ... and that row's y
          hwpx: meta.hw * TS,                                          // half the toy's width on that row (picture px)
          aG: 54, aO: 68, mx: 0, cyo: 6, carryT: 905,                  // closing angle, wide-open angle, tips' mid x / y against the claw's nominal point (solved after the scene exists)
          slot: p.state === "good" ? good++ : -1, good: 0, tel: null
        };
      });
      rd.pieces.forEach(function (p) { B[p.i].R[rd.r].good = good; });
    });
    function roundOf(t) { return clamp(Math.floor(t / RD), 0, NR - 1); }

    // ---------------------------------------------------------------- the claw: keyframe channels (x, prong-tip y, opening, sway), built from the plan
    var EASE = { lin: function (x) { return x; }, io: smooth, out: function (x) { return 1 - Math.pow(1 - x, 3); }, inn: inQuad };
    var CH = { X: [{ t: 0, v: HOMEX, e: "lin" }], T: [{ t: 0, v: HOMET - 45, e: "lin" }], A: [{ t: 0, v: A_HOME, e: "lin" }], W: [{ t: 0, v: 1, e: "lin" }] };
    function go(ch, t0, t1, v, e) {
      var L = ch[ch.length - 1];
      if (t0 > L.t + 1e-6) ch.push({ t: t0, v: L.v, e: "lin" }); else t0 = L.t;
      if (t1 <= t0) t1 = t0 + 0.001;
      ch.push({ t: t1, v: v, e: e || "io" });
    }
    function ev(ch, t) {
      var m = ch.length, i2;
      if (t <= ch[0].t) return ch[0].v;
      for (i2 = 1; i2 < m; i2++) {
        if (t <= ch[i2].t) { var a = ch[i2 - 1], b = ch[i2], u = (t - a.t) / (b.t - a.t); return a.v + (b.v - a.v) * EASE[b.e](u); }
      }
      return ch[m - 1].v;
    }
    function buildChannels() {
      go(CH.T, 0.05, 0.55, HOMET, "out");                              // the claw settles on its cable at the start
      PL.rounds.forEach(function (rd) {
        var base = rd.r * RD, lastT0 = null;
        rd.pieces.forEach(function (p) {
          var R = B[p.i].R[rd.r], t0 = base + p.t0, hold = R.sh - R.cyo;     // hold: the nominal tip y that puts the front tips on the toy's grab row
          lastT0 = t0;
          // travel over the toy with the prongs wide open (at travel height), lower, close on it in 0.25 s (the tips settle onto the toy's widest row)
          go(CH.X, t0, t0 + TM.MOVE, R.ax - R.mx, "io");
          go(CH.A, t0, t0 + 0.13, R.aO, "io");
          go(CH.W, t0, t0 + TM.LOW0, 0, "io");                         // no sway while the claw works on a toy: the prong tips stay exactly where they were solved
          go(CH.T, t0, t0 + TM.LOW0, HOVT, "io");
          go(CH.T, t0 + TM.LOW0, t0 + TM.LOW1, hold - 8, "io");
          go(CH.A, t0 + TM.LOW1, t0 + TM.CLOSE1, R.aG, "io");
          go(CH.T, t0 + TM.LOW1, t0 + TM.CLOSE1, hold, "io");
          if (p.state === "good") {
            go(CH.T, t0 + TM.LIFT0, t0 + TM.LIFT1, R.carryT, "out");   // lift
            go(CH.X, t0 + TM.CARRY0, t0 + TM.REL, XC, "io");           // carry to the front left corner
            go(CH.A, t0 + TM.REL, t0 + TM.REL1, R.aO, "io");           // open: the toy is let go
          } else {
            go(CH.T, t0 + TM.LIFT0, t0 + TM.LIFTM1, R.carryT, "out");  // lift the toy right out of the pile
            go(CH.A, t0 + TM.WOB0, t0 + TM.SLIP, R.aG + 4, "io");      // the grip loosens
            go(CH.A, t0 + TM.SLIP, t0 + TM.PIECE - 0.02, R.aO, "io");  // the toy slides out
          }
        });
        if (lastT0 !== null) {                                         // after the last day the claw goes home
          go(CH.X, lastT0 + TM.PIECE - 0.02, lastT0 + TM.PIECE + 0.45, HOMEX, "io");
          go(CH.T, lastT0 + TM.PIECE - 0.02, lastT0 + TM.PIECE + 0.45, HOMET, "io");
          go(CH.A, lastT0 + TM.PIECE - 0.02, lastT0 + TM.PIECE + 0.45, A_HOME, "io");
          go(CH.W, lastT0 + TM.PIECE - 0.02, lastT0 + TM.PIECE + 0.45, 1, "io");
        }
      });
    }
    function clawAt(t) { return { x: ev(CH.X, t), tip: ev(CH.T, t), a: ev(CH.A, t), w: ev(CH.W, t) }; }
    function swingAt(t) { var vx = (ev(CH.X, t + 0.02) - ev(CH.X, t - 0.02)) / 0.04; return clamp(-vx * 0.00005, -0.06, 0.06); }   // the carried toy swings back a little as the claw moves (small: the prongs stay on its outline)

    // pose of the toy at spot i in round r at time t (absolute beat seconds): the point where the prongs hold it (anchor), its tilt, size, and what it is doing
    function toyPose(b, r, t) {
      var R = b.R[r], lt = t - r * RD, u = lt - R.t0, o = { ax: R.ax, ay: R.sh, rot: 0, s: 0, ph: "rest", vis: true };
      var pop = outBack(seg(lt, R.pop0, R.pop0 + 0.45));
      if (r < NR - 1) pop *= 1 - smooth(seg(lt, TM.OUT0, TM.OUT0 + TM.OUTD));      // the heap clears between rounds (the last round stays)
      o.s = pop;
      var T = r * RD + R.t0;
      if (u >= TM.CLOSE1) {
        var hx = ev(CH.X, t) + R.mx, hy = ev(CH.T, t) + R.cyo;           // the point between the front prong tips
        if (R.state === "good") {
          if (u < TM.REL + 0.02) { o.ph = "carry"; o.ax = hx; o.ay = hy; o.rot = swingAt(t); }
          else {
            var tr = T + TM.REL + 0.02, x0 = ev(CH.X, tr) + R.mx, y0 = ev(CH.T, tr) + R.cyo, k = seg(u, TM.REL + 0.02, TM.HIDE), yEnd = HIDEY + R.meta.gy * R.H * 0.62 + 8;
            o.ph = "fall";
            o.ax = lerp(x0, XD, smooth(seg(k, 0.2, 0.7))); o.ay = lerp(y0, yEnd, inQuad(k));
            o.rot = swingAt(tr) + 0.25 * k; o.s = pop * (1 - 0.38 * smooth(k));
            if (u >= TM.HIDE) o.vis = false;
          }
        } else {
          var dir = R.kind % 2 ? 1 : -1;
          if (u < TM.WOB0) { o.ph = "carry"; o.ax = hx; o.ay = hy; o.rot = swingAt(t); }
          else if (u < TM.SLIP) {                                        // held high, the toy wobbles in the loosening prongs
            var wk = seg(u, TM.WOB0, TM.SLIP);
            o.ph = "wobble"; o.ax = hx; o.ay = hy; o.rot = dir * 0.13 * Math.sin(2 * Math.PI * wk) * (0.5 + 0.5 * wk);
          } else {
            var ts = T + TM.SLIP, ay0 = ev(CH.T, ts) + R.cyo, ax0 = ev(CH.X, ts) + R.mx, kk = seg(u, TM.SLIP, TM.SLIP + TM.FALLM), w = u - TM.SLIP - TM.FALLM;
            o.ph = "slip";
            o.ay = lerp(ay0, R.sh, inQuad(kk) * 0.88 + 0.12 * kk);
            o.ax = lerp(ax0, R.ax, kk) + dir * 16 * Math.sin(Math.PI * kk);      // it slides off one side of the prongs
            o.rot = dir * 0.36 * Math.sin(Math.PI * Math.min(1, kk * 1.15));
            if (w > 0) {
              o.ax = R.ax; o.ay = R.sh;
              o.ay -= 14 * Math.sin(Math.PI * clamp(w / 0.18, 0, 1)) * (w < 0.18 ? 1 : 0);
              o.rot = dir * 0.07 * Math.exp(-9 * w) * Math.sin(2 * Math.PI * 3 * w);
              o.ph = "rest";
            }
          }
        }
      }
      return o;
    }
    // a won toy in the prize tray (a picture inside the chute window): drops in from the top of the window at HIDE, lands, bounces a little, leaves with the round
    function trayPose(R, r, t) {
      var lt = t - r * RD, tl = lt - (R.t0 + TM.HIDE), o = { vis: false, x: 0, y: 0, rot: 0, s: 1 };
      if (tl < 0) return o;
      var G = R.good, pitch = G >= 4 ? 44 : 58, th = R.H * TRS, kk = seg(tl, 0, TM.TRAYD), wl = tl - TM.TRAYD;
      var sx = TRAY.x0 + TRAY.w / 2 + (R.slot - (G - 1) / 2) * pitch, sy = TRAY.floor - th / 2 - (R.slot % 2 ? 7 : 0), tilt = (R.slot % 2 ? 1 : -1) * 0.12;
      o.x = sx; o.y = lerp(TRAY.y0 - th / 2 - 6, sy, inQuad(kk));
      if (wl > 0) o.y -= 11 * Math.sin(Math.PI * clamp(wl / 0.2, 0, 1)) * (1 - clamp(wl / 0.2, 0, 1) * 0.5) * (wl < 0.2 ? 1 : 0);
      o.rot = tilt * kk + 0.2 * (1 - kk);
      o.s = r < NR - 1 ? 1 - smooth(seg(lt, TM.OUT0, TM.OUT0 + TM.OUTD)) : 1;
      o.vis = o.s > 0.003;
      return o;
    }

    // counter values at time t (absolute beat seconds): days, late, early
    function countersAt(t) {
      var v = [0, 0, 0], last = [-9, -9, -9];
      PL.rounds.forEach(function (rd) {
        rd.events.forEach(function (e) { var at = rd.r * RD + e.t; if (t >= at) { v[rd.r] += e.dv; last[rd.r] = Math.max(last[rd.r], at); } });
      });
      return { v: v, last: last };
    }

    // ---------------------------------------------------------------- picture + shadows + WebGL canvas + cabinet front (one scaled world)
    ctx.stage.style.background = "#efe2d0";
    var OX = 540, OY = 1000;
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:" + OX + "px " + OY + "px;filter:saturate(1.1)");
    var bgSrc = WD.src(c.art, "claw-bg.jpg", "bg.jpg");
    var bg = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none", world);
    bg.src = bgSrc; bg.alt = ""; bg.draggable = false;
    // soft contact shadows of the toys on the heap (one per spot, under the toy of the round that is playing)
    var SHADOWS = B.map(function () {
      return el("div", "position:absolute;left:0;top:" + (SPY + 58) + "px;width:176px;height:46px;border-radius:50%;opacity:0;" +
        "background:radial-gradient(ellipse at center, rgba(58,28,8,0.55) 0%, rgba(58,28,8,0.30) 45%, rgba(58,28,8,0) 72%)", world);
    });
    // the gold tags live in this layer, which sits UNDER the 3D canvas (the canvas is added after it), so the claw and the toy it carries always draw above the tags
    var tagLayer = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none", world);
    // the toy pictures (hidden DOM images: the 3D layer takes them as textures; the harness and the loader wait for them)
    var toyImg = {};
    function imgFor(kind) {
      if (!toyImg[kind]) { var im = document.createElement("img"); im.alt = ""; im.style.cssText = "display:none"; im.src = c.art + "toy-" + kind + ".webp"; world.appendChild(im); toyImg[kind] = im; }
      return toyImg[kind];
    }
    B.forEach(function (b) { b.R.forEach(function (R) { imgFor(R.kind); }); });

    // ---------------------------------------------------------------- three.js scene
    var gl = null, renderer = null, scene = null, camera = null, camFull = null, lastW = 0, lastH = 0, ok = false;
    var VX0 = 200, VY0 = 630, VW = 700, VH = 760;                      // the part of the picture the 3D layer covers (claw, rail, toys, the drop to the chute)
    var CAP_PX = 16000000, GL_ZOOM = 1.06;
    function sizeGL() {
      if (!gl) return;
      var dpr = window.devicePixelRatio || 1, r = st.getBoundingClientRect(), sc = r.width > 0 ? r.width / 1080 : 1;
      var pr = clamp(dpr * sc * GL_ZOOM, 1, 3);
      pr = Math.min(pr, Math.sqrt(CAP_PX / (VW * VH)));
      var w = Math.round(VW * pr), h = Math.round(VH * pr);
      if (gl.canvas.width !== w || gl.canvas.height !== h) { gl.canvas.width = w; gl.canvas.height = h; }
    }
    if (T3) {
      try {
        var cv = document.createElement("canvas");
        cv.style.cssText = "position:absolute;left:" + VX0 + "px;top:" + VY0 + "px;width:" + VW + "px;height:" + VH + "px;pointer-events:none";
        var gx = null, gopt = { premultipliedAlpha: true, antialias: true, preserveDrawingBuffer: true, alpha: true };
        try { gx = cv.getContext("webgl2", gopt); } catch (e0) { gx = null; }
        if (!gx) { try { gx = cv.getContext("webgl", gopt); } catch (e1) { gx = null; } }
        if (gx) { gl = { canvas: cv, g: gx }; world.appendChild(cv); sizeGL(); } else gl = null;
      } catch (e) { gl = null; }
    }
    // the cabinet front (everything below the glass floor) again ABOVE the 3D layer: a won toy goes down behind it
    var front = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none;clip-path:inset(" + HIDEY + "px 0 0 0)", world);
    front.src = bgSrc; front.alt = ""; front.draggable = false;
    // the prize tray: a clip box over the chute window's dark opening, ABOVE the cabinet front, holding the pictures of the toys the claw has won (they drop in from the top of the window)
    var trayBox = el("div", "position:absolute;left:" + TRAY.x0 + "px;top:" + TRAY.y0 + "px;width:" + TRAY.w + "px;height:" + TRAY.h + "px;overflow:hidden;border-radius:0 0 14px 14px;pointer-events:none", world);
    B.forEach(function (b) {
      b.R.forEach(function (R) {
        if (!R || R.state !== "good") return;
        var im = el("img", "position:absolute;left:0;top:0;display:block;max-width:none;width:" + (R.W * TRS).toFixed(1) + "px;height:" + (R.H * TRS).toFixed(1) + "px;opacity:0;will-change:transform", trayBox);
        im.src = c.art + "toy-" + R.kind + ".webp"; im.alt = ""; im.draggable = false; R.tel = im;
      });
    });

    var CLAW = null, TROLLEY = null, CABLE = null, TOYM = [];
    var F = 3000, PITCH = 0.13;                                        // camera: 1 world unit = 1 picture pixel at the claw's plane; looking down a little
    var DEG = Math.PI / 180;
    function unp(sx, sy, out) {                                        // picture pixel -> world point on the plane z = 0
      var v = new T3.Vector3((sx - 540) / 540, (960 - sy) / 960, 0.5).unproject(camFull), d = v.sub(camFull.position);
      var k = -camFull.position.z / d.z;
      return out.set(camFull.position.x + d.x * k, camFull.position.y + d.y * k, 0);
    }
    if (gl && T3) {
      try {
        renderer = new T3.WebGLRenderer({ canvas: gl.canvas, context: gl.g, alpha: true, antialias: true, premultipliedAlpha: true, preserveDrawingBuffer: true });
        renderer.setClearColor(0x000000, 0);
        scene = new T3.Scene();
        var fov = 2 * Math.atan(960 / F) / DEG;
        function mkCam() {
          var cm = new T3.PerspectiveCamera(fov, 1080 / 1920, 100, 9000);
          cm.position.set(0, F * Math.sin(PITCH), F * Math.cos(PITCH)); cm.lookAt(0, 0, 0); cm.updateMatrixWorld(true); return cm;
        }
        camFull = mkCam();
        camera = mkCam(); camera.setViewOffset(1080, 1920, VX0, VY0, VW, VH); camera.updateProjectionMatrix();

        scene.add(new T3.HemisphereLight(0xfff4e4, 0x8a7560, 0.62));
        var sun = new T3.DirectionalLight(0xfff1dc, 1.0); sun.position.set(500, 400, 600); scene.add(sun);
        var fill = new T3.DirectionalLight(0xdfe8ff, 0.35); fill.position.set(-400, 100, 500); scene.add(fill);

        var mSil = new T3.MeshPhongMaterial({ color: 0xaab2c0, specular: 0xffffff, shininess: 70 });
        var mDark = new T3.MeshPhongMaterial({ color: 0x6c7586, specular: 0xdddddd, shininess: 50 });
        var mGold = new T3.MeshPhongMaterial({ color: 0xe0ac25, specular: 0xfff0b0, shininess: 80 });
        var mCab = new T3.MeshPhongMaterial({ color: 0x9aa3b3, specular: 0xffffff, shininess: 30 });
        function limb(len, r0, r1, mat) { var g = new T3.CylinderGeometry(r0, r1, len, 16, 1); g.translate(0, -len / 2, 0); return new T3.Mesh(g, mat); }
        function ball(r, mat) { return new T3.Mesh(new T3.SphereGeometry(r, 16, 12), mat); }
        // the claw, origin = centre of the hub, y up, z towards the viewer
        CLAW = new T3.Group();
        var head = new T3.Mesh(new T3.CylinderGeometry(24 * S, 26 * S, 56 * S, 32, 1), mSil); CLAW.add(head);
        var cap = new T3.Mesh(new T3.CylinderGeometry(30 * S, 28 * S, 10 * S, 32, 1), mGold); cap.position.y = -30 * S; CLAW.add(cap);
        var neck = new T3.Mesh(new T3.CylinderGeometry(13 * S, 15 * S, 16 * S, 24, 1), mDark); neck.position.y = 36 * S; CLAW.add(neck);
        for (var sr = 0; sr < 4; sr++) { var ring = new T3.Mesh(new T3.TorusGeometry(11 * S, 2.6 * S, 8, 20), mSil); ring.rotation.x = Math.PI / 2; ring.position.y = (30 + sr * 4.6) * S; CLAW.add(ring); }
        CLAW.userData.tips = [];
        CLAW.userData.prongs = [90, -30, -150].map(function (deg) {   // back, front right, front left
          var th = deg * DEG, P = new T3.Group(); P.rotation.y = th;
          P.position.set(HR * Math.cos(th), -HY, -HR * Math.sin(th));
          var knob = ball(10 * S, mGold); P.add(knob);
          var A = new T3.Group(); P.add(A);
          A.add(limb(L1, 11 * S, 9 * S, mSil));
          var el1 = ball(11 * S, mSil); el1.position.y = -L1; A.add(el1);
          var Bq = new T3.Group(); Bq.position.y = -L1; Bq.rotation.z = -BETA; A.add(Bq);
          Bq.add(limb(L2, 9 * S, 5.5 * S, mSil));
          var tip = ball(7.2 * S, mDark); tip.position.y = -L2; Bq.add(tip); CLAW.userData.tips.push(tip);
          CLAW.add(P);
          return A;
        });
        scene.add(CLAW);
        TROLLEY = new T3.Mesh(new T3.CylinderGeometry(58, 62, 26, 40, 1), mGold); scene.add(TROLLEY);
        var skirt = new T3.Mesh(new T3.CylinderGeometry(40, 44, 14, 32, 1), mCab); skirt.position.y = -18; TROLLEY.add(skirt);
        var cg = new T3.CylinderGeometry(2.6, 2.6, 1, 8, 1); CABLE = new T3.Mesh(cg, mDark); scene.add(CABLE);
        // the toys: flat planes standing at the claw's depth, so the back prong is hidden behind a toy and the front prongs pass in front of it
        B.forEach(function (b) {
          b.R.forEach(function (R, r) {
            if (!R) return;
            var tex = new T3.Texture(imgFor(R.kind));
            tex.colorSpace = T3.SRGBColorSpace; tex.generateMipmaps = false; tex.minFilter = T3.LinearFilter; tex.magFilter = T3.LinearFilter;
            var mat = new T3.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.01, depthWrite: true });
            var G = new T3.Group(), M = new T3.Mesh(new T3.PlaneGeometry(1, 1), mat);
            M.scale.set(R.W, R.H, 1); M.position.x = -(R.meta.gx - 0.5) * R.W; M.position.y = -(0.5 - R.meta.gy) * R.H; M.position.z = R.sz; G.add(M); scene.add(G);
            R.g3 = G; R.tex = tex; R.texOk = false; G.visible = false;
          });
        });
        ok = true;
      } catch (e) { ok = false; try { console.warn("p2-claw: WebGL scene not available (" + e.message + ")"); } catch (e2) { } }
    }
    var wp = ok ? new T3.Vector3() : null, wq = ok ? new T3.Vector3() : null;

    // ---------------------------------------------------------------- close the prongs ON each toy: solve, from the real 3D claw and camera, the closing angle that puts the two front
    // prong tips on the toy's outline at its grab row (width taken from the toy's own pixels), the sideways / vertical offset of the tips against the claw's nominal point
    // (perspective), and the wide-open angle that clears the toy. Falls back to the flat formulas when there is no WebGL (nothing is drawn then anyway).
    var tv = ok ? new T3.Vector3() : null;
    function tipsPx(clawX, tipY, aDeg) {                               // picture px of the two front tips (right, left) with the claw at (clawX, tipY), prongs at aDeg, no sway
      var hy = headYOf(tipY, aDeg), out = [];
      unp(clawX, hy, wp); CLAW.position.copy(wp); CLAW.rotation.set(0, 0, 0);
      CLAW.userData.prongs.forEach(function (A) { A.rotation.z = aDeg * DEG; });
      CLAW.updateMatrixWorld(true);
      [1, 2].forEach(function (q) { CLAW.userData.tips[q].getWorldPosition(tv); tv.project(camFull); out.push({ x: (tv.x + 1) / 2 * 1080, y: (1 - tv.y) / 2 * 1920 }); });
      return out;
    }
    function solveAngle(clawX, half) {                                 // closing angle a (degrees) whose front tips are `half` px either side of their midpoint
      var lo = 25, hi = 100, m, t;
      for (var it = 0; it < 40; it++) {
        m = (lo + hi) / 2;
        if (ok) { t = tipsPx(clawX, 1000, m); if ((t[0].x - t[1].x) / 2 < half) lo = m; else hi = m; }
        else { if (radOf(m) * 0.866 < half) lo = m; else hi = m; }
      }
      return (lo + hi) / 2;
    }
    function solveGrab(R) {
      var cx = R.ax, aG = 54, aO = 68, k;
      for (k = 0; k < 3; k++) {                                        // the sideways offset depends a little on where the claw is: refine it
        aG = solveAngle(cx, R.hwpx); aO = solveAngle(cx, R.hwpx + 30);
        if (ok) { var t = tipsPx(cx, 1000, aG); R.mx = (t[0].x + t[1].x) / 2 - cx; R.cyo = (t[0].y + t[1].y) / 2 - 1000; cx = R.ax - R.mx; }
        else { R.mx = 0; R.cyo = 6; }
      }
      R.aG = Math.min(aG, 96); R.aO = Math.min(Math.max(aO, aG + 8), 100); R.carryT = Math.max(tipMinOf(R.aG) + 3, 886);
    }
    B.forEach(function (b) { b.R.forEach(function (R) { if (R) solveGrab(R); }); });
    buildChannels();

    // ---------------------------------------------------------------- data layer (DOM over the picture)
    var data = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none");
    var badge = el("div", "position:absolute;left:44px;top:58px;display:flex;align-items:center;gap:18px;" +
      "padding:16px 34px 16px 20px;border-radius:999px;background:" + GOLD + ";border:6px solid " + INK + ";box-shadow:8px 8px 0 " + INK, data);
    badge.innerHTML = '<span style="font:700 50px/1 ' + FONT + ';color:#fff;-webkit-text-stroke:9px ' + INK + ';paint-order:stroke fill">' + esc(c.badge) + "</span>";
    var week = el("div", "position:absolute;left:552px;top:84px;padding:10px 24px;border-radius:999px;background:" + GREEN +
      ";border:5px solid " + INK + ";box-shadow:6px 6px 0 " + INK + ";font:700 38px/1 " + FONT + ";color:#fff;transform:rotate(-4deg)", data);
    week.textContent = c.episode;
    if (!c.chrome) { badge.style.display = "none"; week.style.display = "none"; }

    var sub = el("div", "position:absolute;left:0;right:0;top:196px;text-align:center;font:700 52px/1 " + FONT + ";color:#fff;-webkit-text-stroke:10px " + INK +
      ";paint-order:stroke fill;letter-spacing:0.01em;text-shadow:0 6px 0 " + INK + ";transform-origin:50% 50%", data);
    sub.textContent = c.subtitle;
    var colors = [BLUE, GREEN];
    var HEADS = c.rounds.slice(0, NR).map(function (rd, r) {
      var host = el("div", "position:absolute;left:0;right:0;top:268px;height:260px;display:none;flex-direction:column;align-items:center;justify-content:center;gap:4px", data);
      var letters = [];
      rd.head.forEach(function (words, li) {
        var row = el("div", "display:flex;gap:28px", host);
        words.forEach(function (w) {
          var ws = el("span", "display:inline-flex", row);
          String(w).split("").forEach(function (ch) {
            var s = el("span", "display:inline-block;transform-origin:50% 90%;font:700 112px/1.02 " + FONT + ";color:" + colors[(li + r) % 2] +
              ";-webkit-text-stroke:16px " + INK + ";paint-order:stroke fill;text-shadow:0 11px 0 " + INK, ws);
            s.textContent = ch; letters.push(s);
          });
        });
      });
      return { host: host, letters: letters };
    });

    // dust where a missed toy lands, sparkle at the chute where a won toy goes in (above the 3D layer, small, round the toy's feet)
    var puffs = [];
    B.forEach(function (b) {
      b.R.forEach(function (R, r) {
        var spot = R.state === "miss" ? [R.sx, R.sy + R.H / 2 - 6] : CHUTE;
        var p = el("div", "position:absolute;left:" + spot[0].toFixed(1) + "px;top:" + spot[1].toFixed(1) + "px;width:0;height:0", world);
        var dots = [];
        for (var d = 0; d < 9; d++) {
          var dd = el("div", "position:absolute;left:-8px;top:-8px;width:16px;height:16px;border-radius:50%", p);
          dd.style.background = R.state === "miss" ? (d % 2 ? "#f6ead2" : "#e2c79a") : (d % 2 ? "#fff6dc" : GOLD);
          dd.style.boxShadow = R.state === "miss" ? "0 0 8px rgba(255,244,222,0.9)" : "0 0 6px rgba(255,240,200,0.8)";
          dots.push(dd);
        }
        puffs.push({ b: b, R: R, r: r, box: p, dots: dots });
      });
    });

    // three counter cards at the bottom, one appears per round: Days at school N of M | Late to school N | Early leave N (under the cabinet, on the table)
    var CW = 306, CG = 22, CL = (1080 - (3 * CW + 2 * CG)) / 2, CTOP = 1655;
    function card(i2, label) {
      var e = el("div", "position:absolute;left:" + (CL + i2 * (CW + CG)) + "px;top:" + CTOP + "px;width:" + CW + "px;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;gap:12px;" +
        "padding:16px 10px 16px;border-radius:34px;background:#fff;border:7px solid " + INK + ";box-shadow:8px 8px 0 " + INK + ";transform-origin:50% 100%", data);
      var l = el("span", "font:700 33px/1 " + FONT + ";color:" + INK + ";white-space:nowrap", e); l.textContent = label;
      var nm = el("span", "display:inline-block;min-width:150px;text-align:center;padding:8px 18px;border-radius:999px;font:700 52px/1 " + FONT +
        ";color:#fff;background:" + GREEN + ";border:5px solid " + INK + ";transform-origin:50% 50%;white-space:nowrap", e);
      return { box: e, num: nm };
    }
    var CARDS = [card(0, c.counter), card(1, c.lateLabel), card(2, c.earlyLabel)];
    var SPARKS = CARDS.map(function (cd, ci) {
      var spark = el("div", "position:absolute;left:" + (CL + ci * (CW + CG) + CW / 2) + "px;top:" + (CTOP + 60) + "px;width:0;height:0", data);
      var stars = [];
      for (var q = 0; q < 8; q++) {
        var e = el("div", "position:absolute;left:-16px;top:-16px;width:32px;height:32px", spark);
        e.innerHTML = '<svg viewBox="-16 -16 32 32" width="32" height="32"><path d="M0-14 L3.6-4.6 13.3-4.3 5.8 1.8 8.2 11.3 0 5.8-8.2 11.3-5.8 1.8-13.3-4.3-3.6-4.6Z" fill="' +
          [GOLD, GREEN, BLUE, "#e8577e"][q % 4] + '" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/></svg>';
        stars.push(e);
      }
      return stars;
    });

    // gold tags for missed days, above the toy that carries them (never red). They sit in the world, so they move with the picture's slow push-in.
    var ICON = {
      absent: '<path d="M6 6 L22 22 M22 6 L6 22" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>',
      late: '<circle cx="14" cy="14" r="10" fill="none" stroke="#fff" stroke-width="3.5"/><path d="M14 8 V14 L18 17" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>',
      early: '<path d="M7 4 H19 V24 H7 Z" fill="none" stroke="#fff" stroke-width="3.2"/><path d="M13 14 H25 M21 10 L25 14 L21 18" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round"/>'
    };
    var TAGF = 34, TAGH = 78, TAGLIST = [];
    function tagW(label) { return TAGF * String(label).length * 0.56 + 112; }
    PL.rounds.forEach(function (rd) {
      var L = [];
      B.forEach(function (b) {
        var R = b.R[rd.r]; if (!R || R.state !== "miss") return;
        var label = c.tags[R.tag] + (R.u > 1 ? " ×" + R.u : ""), w = tagW(label), ax = R.sx, ay = R.sy - R.H / 2 - 4;
        L.push({ r: rd.r, b: b, kind: R.tag, label: label, w: w, ax: ax, ay: ay, cx: clamp(ax, 24 + w / 2, 1056 - w / 2), cy: ay - 98, at: R.tagAt[0],
          box: { x0: R.sx - R.W / 2, x1: R.sx + R.W / 2, y0: R.sy - R.H / 2, y1: R.sy + R.H / 2 } });
      });
      L.sort(function (p, q) { return p.ax - q.ax; });
      // Placement: every tag picks a slot (a row, 0 = right above its toy, 1 to 3 = lifted one to three tag heights, and a sideways shift), all tags together are
      // chosen by a small exhaustive search for the least cost: tags never touch each other (at least TGAP px between them, shadow included), never cover a toy,
      // never sit in the headline zone, and no pointer runs through another tag or another toy. Pure function of the data.
      var CLAWHOME = { x0: 480, x1: 660, y0: 740, y1: 950 };
      var TGAP = 14, ROWSTEP = TAGH + 5 + TGAP + 1, HEADZONE = 548, SHIFTS = [0, -40, 40, -80, 80, -130, 130, -190, 190, -260, 260];
      function tagRect(p, o) { return { x0: o.cx - p.w / 2, x1: o.cx + p.w / 2 + 5, y0: o.cy - TAGH / 2, y1: o.cy + TAGH / 2 + 5 }; }
      function hit(a, b2, m) { return a.x0 < b2.x1 + m && b2.x0 < a.x1 + m && a.y0 < b2.y1 + m && b2.y0 < a.y1 + m; }
      function ptHit(p, o, rect, m) {                                  // does the pointer of tag p (placed at o) pass through the rectangle?
        var px0 = o.cx + clamp(p.ax - o.cx, -p.w / 2 + 44, p.w / 2 - 44), py0 = o.cy + TAGH / 2 - 8, x1 = p.ax, y1 = p.ay - 10;
        for (var q = 1; q < 28; q++) {
          var u = q / 28, x = px0 + (x1 - px0) * u, y = py0 + (y1 - py0) * u;
          if (x > rect.x0 - m && x < rect.x1 + m && y > rect.y0 - m && y < rect.y1 + m) return true;
        }
        return false;
      }
      var OPT = L.map(function (p) {
        var list = [], row, s2, k;
        for (row = 0; row < 4; row++) for (s2 = 0; s2 < SHIFTS.length; s2++) {
          var cx = clamp(p.ax + SHIFTS[s2], 24 + p.w / 2, 1056 - p.w / 2), cy = p.ay - 98 - row * ROWSTEP, o = { cx: cx, cy: cy, row: row }, rc = tagRect(p, o);
          var cost = row * 6 + Math.abs(cx - p.ax) * 0.12 + (p.ay - cy) * 0.05, bad = false;
          if (rc.y0 < HEADZONE) cost += 4000;
          if (hit(rc, CLAWHOME, 0)) cost += 300;                       // the claw rests at home (hub and prongs) after the last day: keep tags clear of it
          for (k = 0; k < L.length; k++) {
            if (L[k] === p) { if (hit(rc, L[k].box, 0)) bad = true; continue; }
            if (hit(rc, L[k].box, 4)) bad = true;
            if (ptHit(p, o, L[k].box, 2)) cost += 600;
          }
          o.rect = rc; o.cost = cost; if (!bad) list.push(o);
        }
        list.sort(function (a, b2) { return a.cost - b2.cost; });
        return list;
      });
      var bestCost = 1e18, bestPick = null, pick = [];
      (function dfs(n2, cost) {
        if (cost >= bestCost) return;
        if (n2 === L.length) { bestCost = cost; bestPick = pick.slice(); return; }
        for (var oi = 0; oi < OPT[n2].length; oi++) {
          var o = OPT[n2][oi], add = o.cost, ok2 = true, m;
          if (cost + o.cost >= bestCost) break;                        // options are sorted by cost
          for (m = 0; m < n2; m++) {
            if (hit(pick[m].rect, o.rect, TGAP)) { ok2 = false; break; }
            if (ptHit(L[m], pick[m], o.rect, 2)) add += 600;
            if (ptHit(L[n2], o, pick[m].rect, 2)) add += 600;
          }
          if (!ok2) continue;
          pick.push(o); dfs(n2 + 1, cost + add); pick.pop();
        }
      })(0, 0);
      if (!bestPick) bestPick = OPT.map(function (l, q) { var o = l[0] || { cx: L[q].cx, cy: L[q].cy }; return o; });      // cannot happen with the data, kept so a layout always exists
      L.forEach(function (p, q) { p.cx = bestPick[q].cx; p.cy = bestPick[q].cy; });
      L.forEach(function (p) {
        var box = el("div", "position:absolute;left:" + p.cx.toFixed(1) + "px;top:" + p.cy.toFixed(1) + "px;width:0;height:0;transform-origin:0 0", tagLayer);
        var tx = clamp(p.ax - p.cx, -p.w / 2 + 44, p.w / 2 - 44), y0 = TAGH / 2 - 8, dx = p.ax - p.cx, dy = p.ay - p.cy - 10;
        var sv = el("div", "position:absolute;left:0;top:0;width:0;height:0", box);
        sv.innerHTML = '<svg width="1" height="1" style="position:absolute;left:0;top:0;overflow:visible"><path d="M' + (tx - 17).toFixed(1) + " " + y0 + " L" + dx.toFixed(1) + " " + dy.toFixed(1) +
          " L" + (tx + 17).toFixed(1) + " " + y0 + ' Z" fill="' + GOLD + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/></svg>';
        var tg = el("div", "position:absolute;left:0;top:0;translate:-50% -50%;display:flex;align-items:center;gap:12px;white-space:nowrap;padding:12px 24px 12px 14px;border-radius:999px;" +
          "background:" + GOLD + ";border:5px solid " + INK + ";box-shadow:5px 5px 0 " + INK + ";font:700 " + TAGF + "px/1 " + FONT + ";color:" + INK + ";transform-origin:50% 50%", box);
        tg.innerHTML = '<span style="display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:' + GOLDD + ';border:3px solid ' + INK +
          '"><svg width="28" height="28" viewBox="0 0 28 28">' + ICON[p.kind] + "</svg></span>" + esc(p.label);
        TAGLIST.push({ el: box, tg: tg, at: p.at, r: rd.r, i: TAGLIST.length });
      });
    });

    // ---------------------------------------------------------------- draw
    function popNum(el2, since, t) { return 1 + 0.2 * Math.sin(seg(t, since, since + 0.32) * Math.PI); }

    function tipsNow() {                                               // picture px of the three prong tips (back, front right, front left) as last drawn
      var out = [];
      if (!ok) return out;
      CLAW.updateMatrixWorld(true);
      CLAW.userData.tips.forEach(function (tp) { tp.getWorldPosition(tv); tv.project(camFull); out.push({ x: (tv.x + 1) / 2 * 1080, y: (1 - tv.y) / 2 * 1920 }); });
      return out;
    }
    function drawGL(t) {
      if (!ok) return;
      sizeGL();
      var cw = gl.canvas.width, ch = gl.canvas.height;
      if (cw !== lastW || ch !== lastH) { renderer.setPixelRatio(1); renderer.setSize(cw, ch, false); lastW = cw; lastH = ch; }
      // the claw
      var cs = clawAt(t), hy = headYOf(cs.tip, cs.a);
      unp(cs.x, hy, wp); CLAW.position.copy(wp);
      CLAW.rotation.y = 0.18 * Math.sin(0.9 * t) * cs.w;
      var ar = cs.a * DEG; CLAW.userData.prongs.forEach(function (A) { A.rotation.z = ar; });
      unp(cs.x, RAILY, wq); TROLLEY.position.copy(wq);
      // the cable runs from under the trolley to the top of the spring
      var topY = hy - 36 * S - 18 * S, botY = RAILY + 13, len = Math.max(1, topY - botY);
      unp(cs.x, (topY + botY) / 2, wq); CABLE.position.copy(wq); CABLE.scale.set(1, len, 1);
      // the toys
      var rNow = roundOf(t);
      B.forEach(function (b) {
        b.R.forEach(function (R, r) {
          if (!R || !R.g3) return;
          if (!R.texOk) { var im = imgFor(R.kind); if (im.complete && im.naturalWidth) { R.tex.needsUpdate = true; R.texOk = true; } }
          var on = r === rNow, o = on ? toyPose(b, r, t) : null;
          if (!o || !o.vis || o.s < 0.002) { R.g3.visible = false; return; }
          unp(o.ax, o.ay, wq); R.g3.position.copy(wq); R.g3.rotation.z = o.rot; R.g3.scale.setScalar(Math.max(0.0001, o.s)); R.g3.visible = true;
        });
      });
      renderer.render(scene, camera);
    }

    ctx.onDraw(function (t) {
      var rNow = roundOf(t), ltNow = t - rNow * RD;
      var k = smooth(seg(t, 0, DUR));
      world.style.transform = "scale(" + (1.0 + 0.04 * k).toFixed(4) + ")";

      var su = seg(t, 0.05, 0.45);
      sub.style.opacity = su > 0 ? 1 : 0;
      sub.style.transform = "scale(" + (su <= 0 ? 0 : outBack(su)).toFixed(3) + ")";

      HEADS.forEach(function (h, r) {
        var rt = t - r * RD, on = rt >= 0 && (r === NR - 1 || rt < TM.OUT0 + TM.OUTD);               // the last round holds to the end
        h.host.style.display = on ? "flex" : "none";
        if (!on) return;
        h.letters.forEach(function (l, i2) {
          var u = seg(rt, TM.HEAD0 + i2 * 0.04, TM.HEAD0 + i2 * 0.04 + 0.34);
          var bob = Math.sin(t * 3 + i2 * 0.6) * 4 * seg(rt, TM.HEAD0 + 1.0, TM.HEAD0 + 1.6);
          var out = r < NR - 1 ? smooth(seg(rt, TM.OUT0 + i2 * 0.006, TM.OUT0 + i2 * 0.006 + 0.3)) : 0;
          l.style.transform = "translateY(" + (((1 - Math.min(1, u * 1.4)) * 60 + bob) - out * 50).toFixed(1) + "px) scale(" + ((u <= 0 ? 0 : outBack(u)) * (1 - out)).toFixed(3) + ")";
        });
      });

      drawGL(t);

      // contact shadows under the toys on the heap: full while a toy sits there, fading as it is lifted, none while it is carried, falling to the chute or gone
      SHADOWS.forEach(function (sh, i2) {
        var b = B[i2], a = 0;
        if (b && b.R[rNow]) {
          var R = b.R[rNow], o = toyPose(b, rNow, t);
          sh.style.left = (R.sx - 88).toFixed(1) + "px"; sh.style.top = (R.sy + R.H / 2 - 28).toFixed(1) + "px";
          if (o.vis && (o.ph === "rest" || o.ph === "slip")) a = 0.9 * clamp(o.s, 0, 1) * (1 - clamp((R.sh - o.ay) / 110, 0, 1));
        }
        sh.style.opacity = a.toFixed(3);
      });

      // the prize tray: the toys the claw has won this round (a picture each, inside the chute window)
      B.forEach(function (b) {
        b.R.forEach(function (R, r) {
          if (!R || !R.tel) return;
          var o = r === rNow ? trayPose(R, r, t) : { vis: false };
          if (!o.vis) { R.tel.style.opacity = 0; return; }
          var w = R.W * TRS, h = R.H * TRS;
          R.tel.style.opacity = 1;
          R.tel.style.transform = "translate(" + (o.x - TRAY.x0 - w / 2).toFixed(1) + "px," + (o.y - TRAY.y0 - h / 2).toFixed(1) + "px) rotate(" + o.rot.toFixed(3) + "rad) scale(" + o.s.toFixed(3) + ")";
        });
      });

      // puffs (dust where a missed toy lands, sparkle at the chute where a won toy goes in), for the toy of the current round
      puffs.forEach(function (pf) {
        var R = pf.R, on = pf.r === rNow, at = R.t0 + (R.state === "miss" ? TM.LANDM : TM.HIDE + TM.TRAYD - 0.04);
        var pu = on ? seg(ltNow, at - 0.05, at + 0.55) : 0, big = R.state === "miss" ? 0.9 : 1.2;
        pf.dots.forEach(function (d, j) {
          var a = j / pf.dots.length * Math.PI * 2 + 0.3, dist = (14 + 80 * smooth(pu)) * big;
          d.style.opacity = pu > 0 && pu < 1 ? (0.9 * (1 - pu)).toFixed(3) : 0;
          d.style.transform = "translate(" + (Math.cos(a) * dist).toFixed(1) + "px," + (Math.sin(a) * dist * 0.4 - (R.state === "miss" ? 14 : 30) * pu).toFixed(1) + "px) scale(" + ((1.2 - pu * 0.7) * big).toFixed(3) + ")";
        });
      });

      // counters: one card per round, built by that round's toys, ending on the exact number in the data
      var cn = countersAt(t);
      CARDS.forEach(function (cd, i2) {
        var cu = seg(t, i2 * RD + 0.2, i2 * RD + 0.6);
        cd.box.style.opacity = cu > 0 ? 1 : 0;
        cd.box.style.transform = "scale(" + (cu <= 0 ? 0 : outBack(cu)).toFixed(3) + ")";
        var rd = PL.rounds[i2], val = cn.v[i2], bg2, fg = "#fff";
        if (i2 === 0) {
          cd.num.textContent = val + " " + c.of + " " + daysTotal;
          bg2 = (val === daysTotal || t < rd.endAt) ? GREEN : "#b8770f";
        } else {
          cd.num.textContent = String(val);
          if (PL.units[i2] > 0) { bg2 = val > 0 ? GOLD : "#8fa0bd"; if (val > 0) fg = INK; }
          else bg2 = rd.present > 0 ? GREEN : "#8fa0bd";                // a clean round: the 0 is the good news
        }
        cd.num.style.background = bg2; cd.num.style.color = fg;
        var joy = rd.perfect ? seg(t, i2 * RD + rd.endAt - 0.7, i2 * RD + rd.endAt + 0.3) : 0;
        cd.num.style.transform = "scale(" + (popNum(cd.num, cn.last[i2], t) + 0.1 * Math.sin(joy * Math.PI)).toFixed(3) + ")";
        SPARKS[i2].forEach(function (e, j) {
          // an arc over the top of the card (from 150 to 30 degrees above the horizontal), always outside the card, so the number stays readable
          var a = -(150 - 120 * j / (SPARKS[i2].length - 1)) * Math.PI / 180, rx = 205 + 10 * smooth(joy), ry = 112 + 90 * smooth(joy);
          e.style.opacity = joy > 0 && joy < 1 ? (1 - joy * joy).toFixed(3) : 0;
          e.style.transform = "translate(" + (Math.cos(a) * rx).toFixed(1) + "px," + (Math.sin(a) * ry).toFixed(1) + "px) rotate(" + (joy * 120).toFixed(0) + "deg) scale(1.3)";
        });
      });

      // tags: pop up when the toy lands, leave with the round
      TAGLIST.forEach(function (g) {
        var rt = t - g.r * RD, tu = seg(rt, g.at, g.at + 0.35), to = g.r < NR - 1 ? smooth(seg(rt, TM.OUT0 + 0.02, TM.OUT0 + 0.3)) : 0;
        var sc = (tu <= 0 ? 0 : outBack(tu)) * (1 - to);
        g.el.style.opacity = tu > 0 && sc > 0.001 ? 1 : 0;
        g.el.style.transform = "scale(" + Math.max(0, sc).toFixed(3) + ")";
        g.tg.style.transform = "rotate(" + (Math.sin(t * 2 + g.i) * 2 * seg(rt, g.at + 0.4, g.at + 0.8)).toFixed(2) + "deg)";
      });
    });
    if (c.debug) window.__p2c = { B: B, ok: ok, PL: PL, CH: CH, TM: TM, clawAt: clawAt, toyPose: toyPose, trayPose: trayPose, tips: tipsNow, camera: camera, scene: scene };
    // a remount (Replay, or the window changing shape) must free this WebGL context, or the browser runs out of them after about 16
    return { destroy: function () { try { if (renderer) { renderer.dispose(); renderer.forceContextLoss(); } } catch (e) { /* already gone */ } } };
  }
});
})();

;
/* P-2 results beat · p2-results  (option A: 3D living storybook; plays ONLY when last week was NOT 100%)
 * The classroom wall with its notice boards and clock: "Good week!" pops in, the "Last week" card rises into place,
 * three rings fill one after another (days at school, late to school, early leave) and count up, a green tick lands
 * on every zero and a gold dot on every miss (never red), then "Let's aim for every day" settles underneath.
 * The picture moves only as a whole; the card and all its numbers are live and come from content.lastWeek (the app numbers, via P2Data.toStory).
 * Every frame is a pure function of t (kit rule 1); the bitmap is an approved exception to rule 7, like the mascot.
 */
(function () {
MotionIgor.define({
  id: "p2-results",
  duration: 6,
  size: [1080, 1920],
  kind: "scene",
  title: "P-2 report · last week results",
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  defaults: {
    art: "results-layers/",
    headline: ["Good", "week!"],
    footer: "Let's aim for every day",
    cardTitle: "Last week",
    weekEnding: "2026-10-15",            // ISO date from the app
    weekEndingText: "Week ending 15 Oct", // the page's own label (P2Data.toStory().weekEndingText); with none, it is made from weekEnding the same way
    labels: { days: "Days at school", late: "Late to school", early: "Early leave", of: "of" },
    // last week's totals (P2Data.toStory): daysOpen = days the school was open, absent = days absent, lateToSchool = days late to school
    lastWeek: { daysOpen: 2, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    badge: "Weekly report",
    episode: "Week 7",
    chrome: true                       // false: the story draws the badge, week above its transitions
  },
  build: function (ctx) {
    var c = ctx.content, WD = P2Wide.begin(ctx), st = WD.col, esc = ctx.util.esc;
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f", GOLDD = "#d99a12";

    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function smooth(x) { return x * x * (3 - 2 * x); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function outCubic(x) { return 1 - Math.pow(1 - x, 3); }
    function el(tag, css, parent) {
      var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e;
    }

    var wk = c.lastWeek;
    var attended = Math.max(0, wk.daysOpen - wk.absent);
    var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(c.weekEnding));
    // the page's label: "Week ending 15 Oct" (weekEndingText in src/lib/attendance.ts)
    var weekEndingText = c.weekEndingText ? String(c.weekEndingText) : iso ? "Week ending " + Number(iso[3]) + " " + MONTHS[Number(iso[2]) - 1] : String(c.weekEnding);

    // ---------------------------------------------------------------- picture
    ctx.stage.style.background = "#efe9e1";
    var OX = 540, OY = 300;                                    // zoom about the clock so it never rises into the chrome
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:" + OX + "px " + OY + "px;filter:saturate(1.25)");
    var pic = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none", world);
    pic.src = WD.src(c.art, "wall.jpg", "wall.jpg"); pic.alt = ""; pic.draggable = false;

    // ---------------------------------------------------------------- data layer
    var data = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none");
    var badge = el("div", "position:absolute;left:44px;top:58px;display:flex;align-items:center;gap:18px;" +
      "padding:16px 34px 16px 20px;border-radius:999px;background:" + GOLD + ";border:6px solid " + INK + ";box-shadow:8px 8px 0 " + INK, data);
    badge.innerHTML = '<span style="font:700 50px/1 ' + FONT + ';color:#fff;-webkit-text-stroke:9px ' + INK + ';paint-order:stroke fill">' + esc(c.badge) + "</span>";
    var week = el("div", "position:absolute;left:552px;top:84px;padding:10px 24px;border-radius:999px;background:" + GREEN +
      ";border:5px solid " + INK + ";box-shadow:6px 6px 0 " + INK + ";font:700 38px/1 " + FONT + ";color:#fff;transform:rotate(-4deg)", data);
    week.textContent = c.episode;
    if (!c.chrome) { badge.style.display = "none"; week.style.display = "none"; }

    // headline
    var head = el("div", "position:absolute;left:0;right:0;top:790px;display:flex;justify-content:center;align-items:baseline;gap:30px", data);
    var letters = [], colors = [GREEN, BLUE];
    c.headline.forEach(function (w, wi) {
      var ws = el("span", "display:inline-flex", head);
      String(w).split("").forEach(function (ch) {
        var s = el("span", "display:inline-block;transform-origin:50% 90%;font:700 124px/1 " + FONT + ";color:" + colors[wi % 2] +
          ";-webkit-text-stroke:17px " + INK + ";paint-order:stroke fill;text-shadow:0 12px 0 " + INK, ws);
        s.textContent = ch; letters.push(s);
      });
    });

    // the card
    var card = el("div", "position:absolute;left:70px;top:970px;width:940px;height:520px;box-sizing:border-box;border-radius:44px;background:linear-gradient(180deg, " + INK + " 0 108px, #fff 108px);" +
      "border:8px solid " + INK + ";box-shadow:12px 14px 0 " + INK + ", 0 40px 60px rgba(40,30,20,0.25);overflow:hidden;transform-origin:50% 100%", data);
    var bar = el("div", "position:absolute;left:0;right:0;top:0;height:108px;background:" + INK + ";display:flex;align-items:center;justify-content:center;gap:22px", card);
    bar.innerHTML = '<span style="font:700 52px/1 ' + FONT + ';color:#fff">' + esc(c.cardTitle) + '</span><span style="font:500 30px/1 ' + FONT +
      ';color:#dbe4f7">' + esc(weekEndingText) + "</span>";

    var R = 92, CIRC = 2 * Math.PI * R;
    function ring(x, label) {
      var g = el("div", "position:absolute;left:" + (x - 130) + "px;top:140px;width:260px;height:340px", card);
      g.innerHTML = '<svg width="260" height="230" viewBox="-130 -115 260 230" style="position:absolute;left:0;top:0;overflow:visible">' +
        '<circle r="' + R + '" fill="#f4f6fb" stroke="#e3e8f2" stroke-width="26"/>' +
        '<circle class="arc" r="' + R + '" fill="none" stroke-width="26" stroke-linecap="round" transform="rotate(-90)" stroke-dasharray="' + CIRC.toFixed(1) + '"/>' +
        '<circle r="' + (R + 13) + '" fill="none" stroke="' + INK + '" stroke-width="5"/><circle r="' + (R - 13) + '" fill="none" stroke="' + INK + '" stroke-width="5"/></svg>';
      var num = el("div", "position:absolute;left:0;top:0;width:260px;height:230px;display:flex;flex-direction:column;align-items:center;justify-content:center;" +
        "font:700 84px/0.9 " + FONT + ";color:" + INK, g);
      var n1 = el("div", "", num), n2 = el("div", "font:600 33px/1.1 " + FONT + ";color:#4a5570", num);
      var mark = el("div", "position:absolute;left:186px;top:6px;width:66px;height:66px;border-radius:50%;border:5px solid " + INK +
        ";display:grid;place-items:center;transform-origin:50% 50%", g);
      el("div", "position:absolute;left:0;right:0;top:250px;text-align:center;font:700 38px/1.05 " + FONT + ";color:" + INK, g).textContent = label;
      return { g: g, arc: g.querySelector(".arc"), n1: n1, n2: n2, mark: mark };
    }
    var TICK = '<svg width="38" height="38" viewBox="0 0 38 38"><path d="M8 20 L16 28 L31 10" fill="none" stroke="#fff" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var DOT = '<svg width="38" height="38" viewBox="0 0 38 38"><path d="M19 6 L22.8 15 L32 15.8 25 22 27.2 31.4 19 26.4 10.8 31.4 13 22 6 15.8 15.2 15Z" fill="#fff"/></svg>';
    var stats = [
      { r: ring(165, c.labels.days), val: attended, frac: wk.daysOpen ? attended / wk.daysOpen : 1, good: wk.absent === 0, sub: c.labels.of + " " + wk.daysOpen },
      { r: ring(470, c.labels.late), val: wk.lateToSchool, frac: 1, good: wk.lateToSchool === 0, sub: "" },
      { r: ring(775, c.labels.early), val: wk.earlyLeave, frac: 1, good: wk.earlyLeave === 0, sub: "" }
    ];
    stats.forEach(function (s) {
      s.r.arc.setAttribute("stroke", s.good ? GREEN : GOLD);
      s.r.mark.style.background = s.good ? GREEN : GOLDD;
      s.r.mark.innerHTML = s.good ? TICK : DOT;
      s.r.n2.textContent = s.sub;
    });

    var foot = el("div", "position:absolute;left:540px;top:1560px;translate:-50% 0;white-space:nowrap;padding:22px 52px;border-radius:999px;background:" +
      "#23913f;border:7px solid " + INK + ";box-shadow:8px 8px 0 " + INK + ";font:700 54px/1 " + FONT + ";color:#fff;transform-origin:50% 50%", data);
    foot.textContent = c.footer;

    // ---------------------------------------------------------------- motion
    var HEAD0 = 0.35, CARD0 = 0.9, RING0 = 1.5, RINGD = 0.75, RINGS = 0.45, FOOT0 = 3.9;

    ctx.onDraw(function (t) {
      var k = smooth(seg(t, 0, 6));
      world.style.transform = "scale(" + (1.02 + 0.03 * k).toFixed(4) + ")";

      letters.forEach(function (l, i) {
        var u = seg(t, HEAD0 + i * 0.05, HEAD0 + i * 0.05 + 0.38);
        var bob = Math.sin(t * 3 + i * 0.6) * 4 * seg(t, HEAD0 + 1.2, HEAD0 + 1.8);
        l.style.transform = "translateY(" + ((1 - Math.min(1, u * 1.4)) * 60 + bob).toFixed(1) + "px) scale(" + (u <= 0 ? 0 : outBack(u)).toFixed(3) + ")";
      });
      var cu = seg(t, CARD0, CARD0 + 0.55);
      card.style.opacity = cu > 0 ? 1 : 0;
      card.style.transform = "translateY(" + ((1 - outBack(cu)) * 260).toFixed(1) + "px) rotate(" + ((1 - cu) * 3).toFixed(2) + "deg)";

      stats.forEach(function (s, i) {
        var t0 = RING0 + i * RINGS, u = outCubic(seg(t, t0, t0 + RINGD));
        s.r.arc.setAttribute("stroke-dashoffset", (CIRC * (1 - s.frac * u)).toFixed(1));
        s.r.arc.style.opacity = u > 0 ? 1 : 0;
        s.r.n1.textContent = u > 0 ? String(Math.round(s.val * u)) : "";
        s.r.n2.style.opacity = u > 0 ? 1 : 0;
        var m = seg(t, t0 + RINGD - 0.05, t0 + RINGD + 0.3);
        s.r.mark.style.opacity = m > 0 ? 1 : 0;
        s.r.mark.style.transform = "scale(" + (m <= 0 ? 0 : outBack(m)).toFixed(3) + ") rotate(" + ((1 - m) * -40).toFixed(1) + "deg)";
      });

      var f = seg(t, FOOT0, FOOT0 + 0.45);
      foot.style.opacity = f > 0 ? 1 : 0;
      foot.style.transform = "scale(" + (f <= 0 ? 0 : outBack(f) * (1 + 0.015 * Math.sin((t - FOOT0) * 3) * seg(t, FOOT0 + 0.5, FOOT0 + 0.9))).toFixed(4) + ")";
    });
  }
});
})();

;
/* P-2 party beat · p2-party  (option A: 3D living storybook; plays ONLY for a 100% week)
 * The class party: "100% this week!" pops in over the bunting, the camera pushes in towards the cake, the child's
 * name and "100%" are piped onto the cake front, the candles flicker and a burst of confetti falls over everyone.
 * The picture moves only as a whole (no cut-outs): every effect is drawn in code over it.
 * The class CLAPS (fix 6, 24 Oct 2026): party-apart.jpg is the same picture with the clappers' hands held apart (only hands and forearms differ,
 * made by src/tools/party_clap.py); the two whole pictures swap with a hard cut every 0.25 s, a pure function of t (no cross-dissolve, no timer).
 * Every frame is a pure function of t (kit rule 1); the bitmap is an approved exception to rule 7, like the mascot.
 */
(function () {
MotionIgor.define({
  id: "p2-party",
  duration: 6,
  size: [1080, 1920],
  kind: "scene",
  title: "P-2 report · 100% party",
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  defaults: {
    art: "party-layers/",
    headline: ["100%", "this", "week!"],
    child: { name: "Noor", grade: "Grade 0", form: "PREP A" },
    score: "100%",
    perfect: true,                     // the story only mounts this beat when the week is perfect (P2Data.toStory().perfect)
    badge: "Weekly report",
    episode: "Week 7",
    chrome: true                       // false: the story draws the badge, week above its transitions
  },
  build: function (ctx) {
    var c = ctx.content, WD = P2Wide.begin(ctx), st = WD.col, esc = ctx.util.esc;
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f", PINK = "#e8577e";

    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function smooth(x) { return x * x * (3 - 2 * x); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function el(tag, css, parent) {
      var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e;
    }
    var rnd = ctx.util.prng ? ctx.util.prng(7) : ctx.rand;

    // ---------------------------------------------------------------- picture
    ctx.stage.style.background = "#efe2d0";
    var OX = 550, OY = 1340;                                   // the camera pushes in towards the cake
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:" + OX + "px " + OY + "px;filter:saturate(1.15)");
    var pic = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none", world);
    pic.src = WD.src(P2Kid.art(c, c.art), "party.jpg", "party.jpg"); pic.alt = ""; pic.draggable = false;   // the child is in this picture: the girl / boy one when on (p2-form.js P2Kid)
    // the same picture with the clappers' hands apart, stacked under / over the first. Both stay painted all the time and a swap only changes which one is on top
    // (z-index -1 / -2 inside this stacking context: below the flames and the icing, which are later and unpositioned-z): no layer is created, hidden or faded, so
    // iOS Safari never repaints (device law: no visibility / opacity changes on a picture layer)
    var apart = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none;z-index:-2", world);
    pic.style.zIndex = "-1";
    apart.alt = ""; apart.draggable = false;
    apart.src = WD.src(P2Kid.art(c, c.art), "party-apart.jpg", "party-apart.jpg");
    var CLAP = 0.25, apartOn = false;

    // candle flames flicker (tips measured on the 1080 x 1920 art)
    var FLAMES = [[478, 1265], [500, 1262], [522, 1262], [550, 1262], [575, 1265], [597, 1262], [622, 1263]];
    var flames = FLAMES.map(function (p) {
      var f = el("div", "position:absolute;left:" + (p[0] - 18) + "px;top:" + (p[1] - 24) + "px;width:36px;height:44px;border-radius:50%;transform-origin:50% 80%;" +
        "mix-blend-mode:screen;background:radial-gradient(ellipse at 50% 60%, rgba(255,240,190,0.95) 0%, rgba(255,190,90,0.55) 35%, rgba(255,160,60,0) 70%)", world);
      return f;
    });
    // writing piped onto the cake front: white icing with a thin pink outline on two lines that follow the curve of the
    // cake's front (about x 420-680, y 1318-1388), revealed left to right like a piping bag, with a soft raised shadow
    var NS = "http://www.w3.org/2000/svg";
    var icing = document.createElementNS(NS, "svg");
    icing.setAttribute("width", "1080"); icing.setAttribute("height", "1920");
    icing.style.cssText = "position:absolute;left:0;top:0;overflow:visible";
    world.appendChild(icing);
    // the soft raised shadow is drawn INSIDE the svg (a blurred, offset copy at 30%): a CSS drop-shadow filter on the svg element left the
    // writing blank in WebKit on an iPhone (device scale 3), and so did an SVG clipPath whose rect width changes per frame
    var NM = esc(c.child.name), SC = esc(c.score);
    // the name must fit the cake front (the piping path is about 195 px long): shared shrink-to-fit, 172 px of writing at most
    var nmFit = P2Fit.create({ css: "white-space:nowrap;font:700 29px " + FONT, html: NM, max: 172 });
    icing.innerHTML = '<defs><path id="ck1" d="M455 1350 Q551 1368 647 1350"/><path id="ck2" d="M478 1380 Q551 1394 624 1380"/>' +
      '<filter id="cksh" x="-10%" y="-40%" width="120%" height="180%"><feGaussianBlur stdDeviation="1"/></filter></defs>' +
      '<g style="font:700 29px ' + FONT + '" text-anchor="middle" stroke-linejoin="round">' +
      '<g transform="translate(2,3)" opacity="0.3" filter="url(#cksh)" fill="#5a2814" stroke="#5a2814" stroke-width="3.5">' +
      '<text><textPath href="#ck1" startOffset="50%">' + NM + '</textPath></text>' +
      '<text><textPath href="#ck2" startOffset="50%">' + SC + '</textPath></text></g>' +
      '<text fill="#fffaf2" stroke="' + PINK + '" stroke-width="3.5" paint-order="stroke fill"><textPath href="#ck1" startOffset="50%">' + NM + '</textPath></text>' +
      '<text fill="#fff3c4" stroke="' + PINK + '" stroke-width="3.5" paint-order="stroke fill"><textPath href="#ck2" startOffset="50%">' + SC + '</textPath></text>' +
      '<text fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.2" transform="translate(-0.8,-1)"><textPath href="#ck1" startOffset="50%">' + NM + '</textPath></text>' +
      '</g>';
    var nameTexts = [], allTexts = icing.querySelectorAll("text"), nameFs = "";
    [0, 2, 4].forEach(function (i) { nameTexts.push(allTexts[i]); });
    allTexts[2].setAttribute("data-p2-label", "cake-name");                  // the three copies of the name (shadow, writing, highlight)

    // ---------------------------------------------------------------- confetti (pre-simulated at build time, sampled by t)
    var conf = el("div", "position:absolute;left:" + (-WD.ox) + "px;top:0;width:" + WD.sw + "px;height:1920px;pointer-events:none;overflow:hidden");   // the whole wide stage
    var COLS = [GOLD, BLUE, GREEN, PINK, "#9b6bd8", "#ff8a3d"];
    var bits = [];
    // faces in the picture: centre x, y and radii (the cake writing counts as a face: keep it clear too)
    var FACES = [[545, 1075, 95, 115], [320, 1115, 85, 110], [775, 860, 85, 105], [150, 1205, 90, 105], [935, 1225, 90, 105], [551, 1365, 120, 45]];
    var NBITS = Math.round(70 * WD.sw / 1080);                      // the same density on a wide stage
    for (var i = 0; i < NBITS; i++) {
      var w = 14 + rnd() * 12, h = 8 + rnd() * 8, round = rnd() < 0.3;
      var e = el("div", "position:absolute;left:0;top:0;width:" + w.toFixed(0) + "px;height:" + (round ? w : h).toFixed(0) + "px;border-radius:" +
        (round ? "50%" : "3px") + ";background:" + COLS[i % COLS.length] + ";box-shadow:inset -3px -3px 0 rgba(0,0,0,0.18), inset 2px 2px 0 rgba(255,255,255,0.35)", conf);
      bits.push({ e: e, x: rnd() * WD.sw - WD.ox, t0: 1.2 + rnd() * 1.6, v: 380 + rnd() * 260, sway: 20 + rnd() * 40, ph: rnd() * 6.28,
        spin: (rnd() - 0.5) * 900, flip: 2 + rnd() * 4, y0: -60 - rnd() * 300 });
    }

    // ---------------------------------------------------------------- data layer
    var data = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none");
    var badge = el("div", "position:absolute;left:44px;top:58px;display:flex;align-items:center;gap:18px;" +
      "padding:16px 34px 16px 20px;border-radius:999px;background:" + GOLD + ";border:6px solid " + INK + ";box-shadow:8px 8px 0 " + INK, data);
    badge.innerHTML = '<span style="font:700 50px/1 ' + FONT + ';color:#fff;-webkit-text-stroke:9px ' + INK + ';paint-order:stroke fill">' + esc(c.badge) + "</span>";
    var week = el("div", "position:absolute;left:552px;top:84px;padding:10px 24px;border-radius:999px;background:" + GREEN +
      ";border:5px solid " + INK + ";box-shadow:6px 6px 0 " + INK + ";font:700 38px/1 " + FONT + ";color:#fff;transform:rotate(-4deg)", data);
    week.textContent = c.episode;
    if (!c.chrome) { badge.style.display = "none"; week.style.display = "none"; }

    var head = el("div", "position:absolute;left:0;right:0;top:244px;display:flex;justify-content:center;align-items:baseline;gap:28px", data);
    var letters = [], colors = [GOLD, BLUE, GREEN];
    c.headline.forEach(function (w, wi) {
      var ws = el("span", "display:inline-flex", head);
      String(w).split("").forEach(function (ch) {
        var s = el("span", "display:inline-block;transform-origin:50% 90%;font:700 112px/1 " + FONT + ";color:" + colors[wi % 3] +
          ";-webkit-text-stroke:16px " + INK + ";paint-order:stroke fill;text-shadow:0 11px 0 " + INK, ws);
        s.textContent = ch; letters.push(s);
      });
    });
    // a ring of sparkles bursts round the headline as it lands
    var burst = el("div", "position:absolute;left:540px;top:300px;width:0;height:0", data);
    data.insertBefore(burst, head);                              // behind the letters
    var rays = [];
    for (var r = 0; r < 12; r++) {
      var ray = el("div", "position:absolute;left:-16px;top:-16px;width:32px;height:32px", burst);
      ray.innerHTML = '<svg viewBox="-16 -16 32 32" width="32" height="32"><path d="M0-14 L3.6-4.6 13.3-4.3 5.8 1.8 8.2 11.3 0 5.8-8.2 11.3-5.8 1.8-13.3-4.3-3.6-4.6Z" fill="' +
        COLS[r % COLS.length] + '" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/></svg>';
      rays.push(ray);
    }

    // ---------------------------------------------------------------- motion
    var HEAD0 = 0.4, LET = 0.05, BURST0 = HEAD0 + 0.55, PIPE0 = 2.0, PIPED = 1.2;

    ctx.onDraw(function (t) {
      var k = smooth(seg(t, 0, 6));
      var cs = 1.02 + 0.1 * k;                                     // ends at 1.12: the bunting stays clear of the headline
      world.style.transform = "scale(" + cs.toFixed(4) + ")";

      // clapping: hands together (party.jpg) on even quarter-seconds, hands apart (party-apart.jpg) on odd ones; falls back to "together" until the apart picture is loaded
      var open = (Math.floor(t / CLAP + 1e-6) % 2 === 1) && apart.complete && apart.naturalWidth > 0;
      if (open !== apartOn) { apartOn = open; pic.style.zIndex = open ? "-2" : "-1"; apart.style.zIndex = open ? "-1" : "-2"; }

      flames.forEach(function (f, i) {
        var fl = 0.85 + 0.15 * Math.sin(t * 17 + i * 2.1) * Math.sin(t * 7.3 + i);
        f.style.opacity = (0.65 + 0.3 * Math.sin(t * 11 + i * 1.3)).toFixed(3);
        f.style.transform = "scale(" + fl.toFixed(3) + "," + (fl * 1.08).toFixed(3) + ")";
      });

      var nfs = (29 * nmFit.scale()).toFixed(2);
      if (nfs !== nameFs) { nameFs = nfs; nameTexts.forEach(function (e) { e.setAttribute("font-size", nfs); }); }
      var ckw = 230 * seg(t, PIPE0, PIPE0 + PIPED);
      icing.style.clipPath = icing.style.webkitClipPath = "inset(0px " + (1080 - 440 - ckw).toFixed(1) + "px 0px 440px)";

      var faces = FACES.map(function (f) { return [OX + (f[0] - OX) * cs, OY + (f[1] - OY) * cs, f[2] * cs, f[3] * cs]; });
      bits.forEach(function (b) {
        var dt = t - b.t0;
        if (dt <= 0) { b.e.style.opacity = 0; b.e.style.transform = "translate(-100px,-100px)"; return; }
        var y = b.y0 + b.v * dt, x = b.x + Math.sin(dt * 2.4 + b.ph) * b.sway;
        var fx = Math.cos(dt * b.flip + b.ph);
        var op = y > 1700 ? clamp((1900 - y) / 200, 0, 1) : 1;
        faces.forEach(function (f) {
          var q = Math.sqrt(Math.pow((x - f[0]) / f[2], 2) + Math.pow((y - f[1]) / f[3], 2));
          op = Math.min(op, clamp((q - 1) / 0.35, 0, 1));            // no confetti on a face: fades out at the edge of each face
        });
        b.e.style.opacity = op.toFixed(3);
        b.e.style.transform = "translate(" + (x + WD.ox).toFixed(1) + "px," + y.toFixed(1) + "px) rotate(" + (b.spin * dt).toFixed(1) + "deg) scaleX(" + fx.toFixed(3) + ")";
      });

      letters.forEach(function (l, i) {
        var u = seg(t, HEAD0 + i * LET, HEAD0 + i * LET + 0.38);
        var sc = u <= 0 ? 0 : outBack(u);
        var bob = Math.sin(t * 3 + i * 0.6) * 4 * seg(t, HEAD0 + 1.4, HEAD0 + 2);
        l.style.transform = "translateY(" + ((1 - Math.min(1, u * 1.4)) * 60 + bob).toFixed(1) + "px) scale(" + sc.toFixed(3) + ")";
      });
      var bu = seg(t, BURST0, BURST0 + 0.7);
      rays.forEach(function (ray, i) {
        var a = i / (rays.length - 1) * Math.PI, d = 340 + 220 * (1 - Math.pow(1 - bu, 3));   // 0 to 180 degrees: sides and below
        ray.style.opacity = bu > 0 && bu < 1 ? (1 - bu * bu).toFixed(3) : 0;
        ray.style.transform = "translate(" + (Math.cos(a) * d * 1.25).toFixed(1) + "px," + (Math.sin(a) * d * 0.42).toFixed(1) + "px) scale(" + (1.3 - 0.6 * bu).toFixed(3) + ") rotate(" + (bu * 160).toFixed(1) + "deg)";
      });
    });
    return { destroy: function () { nmFit.destroy(); } };
  }
});
})();

;
/* P-2 family beat · p2-family  (option A: 3D living storybook)
 * At home in the evening: Noor shows her report on the phone and her parents are proud. Mum's speech bubble pops
 * first, then Dad's, word by word; the camera drifts slowly from Mum towards Dad as each one speaks; the phone screen
 * glows, the night stars in the window twinkle and a few hearts float up from the phone at the end.
 * The picture moves only as a whole (no cut-outs): every effect is drawn in code over it.
 * Every frame is a pure function of t (kit rule 1); the bitmap is an approved exception to rule 7, like the mascot.
 */
(function () {
MotionIgor.define({
  id: "p2-family",
  duration: 6,
  size: [1080, 1920],
  kind: "scene",
  title: "P-2 report · family at home",
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  defaults: {
    art: "family-layers/",
    mum: { text: "Good job, we are super proud of you!", hi: ["super", "proud"] },
    dad: { text: "Keep it up, superstar!", hi: ["superstar!"] },
    badge: "Weekly report",
    episode: "Week 7",
    chrome: true                       // false: the story draws the badge, week above its transitions
  },
  build: function (ctx) {
    var c = ctx.content, WD = P2Wide.begin(ctx), st = WD.col, esc = ctx.util.esc;
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f", PINK = "#e8577e";

    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function smooth(x) { return x * x * (3 - 2 * x); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function el(tag, css, parent) {
      var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e;
    }

    // ---------------------------------------------------------------- picture
    ctx.stage.style.background = "#efe3d2";
    var OX = 540, OY = 1000;
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:" + OX + "px " + OY + "px;filter:saturate(1.15)");
    var pic = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none", world);
    pic.src = WD.src(P2Kid.art(c, c.art), "family.jpg", "family.jpg"); pic.alt = ""; pic.draggable = false;   // the child is in this picture: the girl / boy one when on (p2-form.js P2Kid)

    // the phone screen glows softly (phone at about 365,1140 in the picture)
    var phone = el("div", "position:absolute;left:" + (365 - 110) + "px;top:" + (1140 - 110) + "px;width:220px;height:220px;border-radius:50%;" +
      "mix-blend-mode:screen;background:radial-gradient(circle, rgba(170,205,255,0.75) 0%, rgba(150,190,255,0.3) 35%, rgba(150,190,255,0) 70%)", world);
    // twinkles on the night sky in the window (top right of the table scene)
    // twinkles only on clear night sky between the window bars, away from Dad's headdress
    var SKY = [[1000, 760], [1035, 840]];                    // right pane only: never under a bubble or the headdress
    var twinkles = SKY.map(function (p) {
      var g = el("div", "position:absolute;left:" + (p[0] - 22) + "px;top:" + (p[1] - 22) + "px;width:44px;height:44px;mix-blend-mode:screen", world);
      g.innerHTML = '<svg viewBox="-22 -22 44 44" width="44" height="44"><circle r="6" fill="rgba(255,255,255,0.55)"/>' +
        '<path d="M0-20 C1.5-3 3-1.5 20 0 C3 1.5 1.5 3 0 20 C-1.5 3-3 1.5-20 0 C-3-1.5-1.5-3 0-20Z" fill="#fff"/></svg>';
      return g;
    });

    // ---------------------------------------------------------------- speech bubbles (live text)
    var data = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none");
    // box = where the bubble sits; tip = the speaker's head (the tail points there); the bubble grows from its tail root
    function bubble(line, box, tip, color) {          // box = [left, top, width, height]
      var b = el("div", "position:absolute;left:" + box[0] + "px;top:" + box[1] + "px;width:" + box[2] + "px;transform-origin:" +
        (tip[0] - box[0]) + "px 100%", data);
      var body = el("div", "position:relative;box-sizing:border-box;height:" + box[3] + "px;display:grid;place-items:center;padding:0 40px;border-radius:56px;" +
        "background:#fff;border:7px solid " + INK + ";box-shadow:10px 10px 0 " + INK + ";font:700 60px/1.12 " + FONT + ";color:" + INK + ";text-align:center", b);
      var inner = el("div", "", body);
      var words = [];
      String(line.text).split(" ").forEach(function (w, i) {
        if (i) inner.appendChild(document.createTextNode(" "));
        var s = el("span", "display:inline-block;transform-origin:50% 80%", inner);
        s.textContent = w;
        if ((line.hi || []).indexOf(w) >= 0) s.style.color = color;
        words.push(s);
      });
      // tail: a white wedge with an ink outline from the bubble's bottom edge down towards the speaker
      var tail = el("div", "position:absolute;left:0;top:0;width:" + box[2] + "px;height:1px;overflow:visible", b);
      tail.innerHTML = '<svg style="position:absolute;left:0;top:0;overflow:visible" width="1" height="1"></svg>';
      return { b: b, body: body, words: words, tail: tail, box: box, tip: tip };
    }
    function drawTail(B) {
      // the tail starts inside the body's bottom edge, centred on its root x, and points at the speaker's head
      var h = B.box[3], rx = B.tip[0] - B.box[0];
      rx = clamp(rx, 90, B.box[2] - 90);
      var tx = B.tip[0] - B.box[0], ty = B.tip[1] - B.box[1];
      var svg = B.tail.firstChild;
      svg.innerHTML = '<path d="M' + (rx - 44) + ' ' + (h - 14) + ' Q' + (rx - 10) + ' ' + (h + 30) + ' ' + tx + ' ' + ty +
        ' Q' + (rx + 18) + ' ' + (h + 20) + ' ' + (rx + 40) + ' ' + (h - 14) + 'Z" fill="#fff" stroke="' + INK + '" stroke-width="7" stroke-linejoin="round"/>' +
        '<rect x="' + (rx - 40) + '" y="' + (h - 30) + '" width="78" height="22" fill="#fff"/>';
    }
    // Mum's line follows what was missed last week (Igor, 24 Oct): Dad always keeps his line; one kind missed = that kind's line,
    // two or more kinds = the "together" line; a 100% week keeps the proud line. Long lines get a smaller font so they fit the bubble.
    var MUM_LINES = {
      absent: { text: "Every school day counts. Let's aim for all of them!", hi: ["counts.", "all"] },
      late: { text: "Let's beat the school bell together next week!", hi: ["school", "bell"] },
      early: { text: "Next week, let's stay right to the end!", hi: ["end!"] },
      mixed: { text: "We can do even better next week, together!", hi: ["even", "better"] }
    };
    function mumLine() {
      var w = c.lastWeek || {}, kinds = [];
      if ((w.absent || 0) > 0) kinds.push("absent");
      if ((w.lateToSchool || 0) > 0) kinds.push("late");
      if ((w.earlyLeave || 0) > 0) kinds.push("early");
      if (c.perfect || !kinds.length) return c.mum;
      return kinds.length > 1 ? MUM_LINES.mixed : MUM_LINES[kinds[0]];
    }
    var mumSays = mumLine();
    var mum = bubble(mumSays, [50, 456, 580, 250], [480, 850], BLUE);
    var mumLen = String(mumSays.text).length;
    if (mumLen > 38) mum.body.style.fontSize = (mumLen > 44 ? 48 : 54) + "px";
    var dad = bubble(c.dad, [652, 500, 380, 196], [815, 748], GREEN);    // beside Mum's bubble; the tip stops just above Dad's headdress
    drawTail(mum); drawTail(dad);
    // the white tail must sit under the body's text but over its border: put the body above the tail
    [mum, dad].forEach(function (B) { B.body.style.zIndex = 2; B.tail.style.zIndex = 1; B.b.insertBefore(B.tail, B.body); });

    // hearts float up from the phone at the end (data layer: x allows for the camera scale and pan)
    var HEARTS = [[347, 1100, 0.0, 0.85], [375, 1080, 0.25, 0.65], [325, 1090, 0.5, 0.6], [367, 1110, 0.75, 0.75], [341, 1120, 1.0, 0.55]];   // up from the phone, clear of every face
    var hearts = HEARTS.map(function (h) {
      var e = el("div", "position:absolute;left:" + (h[0] - 40) + "px;top:" + (h[1] - 40) + "px;width:80px;height:80px;transform-origin:50% 50%", data);
      e.innerHTML = '<svg viewBox="0 0 80 80" width="80" height="80"><defs><radialGradient id="hg" cx="0.35" cy="0.3" r="0.8">' +
        '<stop offset="0" stop-color="#ff9db5"/><stop offset="0.55" stop-color="' + PINK + '"/><stop offset="1" stop-color="#b8324f"/></radialGradient></defs>' +
        '<path d="M40 70 C10 50 4 34 12 22 C20 10 34 12 40 24 C46 12 60 10 68 22 C76 34 70 50 40 70Z" fill="url(#hg)" stroke="' + INK + '" stroke-width="4"/>' +
        '<ellipse cx="25" cy="27" rx="7" ry="4.5" fill="rgba(255,255,255,0.75)" transform="rotate(-35 25 27)"/></svg>';
      return e;
    });

    var badge = el("div", "position:absolute;left:44px;top:58px;transform-origin:0 50%;display:flex;align-items:center;gap:18px;" +
      "padding:16px 34px 16px 20px;border-radius:999px;background:" + GOLD + ";border:6px solid " + INK + ";box-shadow:8px 8px 0 " + INK, data);
    badge.innerHTML = '<span style="font:700 50px/1 ' + FONT + ';color:#fff;-webkit-text-stroke:9px ' + INK + ';paint-order:stroke fill">' + esc(c.badge) + "</span>";
    var week = el("div", "position:absolute;left:552px;top:84px;padding:10px 24px;border-radius:999px;background:" + GREEN +
      ";border:5px solid " + INK + ";box-shadow:6px 6px 0 " + INK + ";font:700 38px/1 " + FONT + ";color:#fff;transform:rotate(-4deg)", data);
    week.textContent = c.episode;
    if (!c.chrome) { badge.style.display = "none"; week.style.display = "none"; }

    // ---------------------------------------------------------------- motion
    var MUM0 = 0.5, DAD0 = 2.5, HEART0 = 4.1;

    function pop(B, t0, t) {
      var u = seg(t, t0, t0 + 0.42);
      B.b.style.opacity = u > 0 ? 1 : 0;
      B.b.style.transform = "scale(" + (u <= 0 ? 0 : outBack(u)).toFixed(3) + ")";
      B.words.forEach(function (w, i) {
        var v = seg(t, t0 + 0.08 + i * 0.09, t0 + 0.08 + i * 0.09 + 0.25);
        w.style.opacity = v > 0 ? Math.min(1, v * 2).toFixed(3) : 0;
        w.style.transform = "translateY(" + ((1 - v) * 18).toFixed(1) + "px) scale(" + (v <= 0 ? 0.6 : 0.6 + 0.4 * outBack(v)).toFixed(3) + ")";
      });
      // a gentle float once the bubble is up
      var f = seg(t, t0 + 0.5, t0 + 0.9);
      B.body.style.transform = "translateY(" + (Math.sin((t - t0) * 2.2) * 5 * f).toFixed(2) + "px)";
      B.tail.style.transform = B.body.style.transform;
    }

    ctx.onDraw(function (t) {
      // camera: slow push-in, drifting from Mum's side towards Dad's as he speaks
      var k = smooth(seg(t, 0, 6)), pan = smooth(seg(t, DAD0 - 0.4, DAD0 + 1.4));
      var s = 1.03 + 0.06 * k, tx = 12 - 24 * pan;
      world.style.transform = "translate(" + tx.toFixed(2) + "px,0) scale(" + s.toFixed(4) + ")";

      phone.style.opacity = (0.55 + 0.3 * Math.sin(t * 2.6)).toFixed(3);
      twinkles.forEach(function (g, i) {
        var a = Math.pow(Math.max(0, Math.sin(t * 1.9 + i * 1.7)), 6);
        g.style.opacity = (0.25 + 0.75 * a).toFixed(3);
        g.style.transform = "scale(" + (0.5 + 0.6 * a).toFixed(3) + ")";
      });

      pop(mum, MUM0, t);
      pop(dad, DAD0, t);

      hearts.forEach(function (e, i) {
        var h = HEARTS[i], u = seg(t, HEART0 + h[2], HEART0 + h[2] + 1.6);
        var a = u <= 0 ? 0 : u < 0.15 ? u / 0.15 : u > 0.75 ? (1 - u) / 0.25 : 1;
        e.style.opacity = a.toFixed(3);
        e.style.transform = "translate(" + (Math.sin(u * 5 + i) * 10).toFixed(1) + "px," + (-u * 300).toFixed(1) + "px) scale(" +
          (h[3] * (u <= 0 ? 0 : outBack(Math.min(1, u * 4)))).toFixed(3) + ") rotate(" + (Math.sin(u * 4 + i * 2) * 10).toFixed(1) + "deg)";
      });
    });
  }
});
})();

;
/* P-2 final beat · p2-final  (3D living storybook; the last screen, it stays)
 * Mounts P2Page (p2-page.js) in the stage: the real, live parent page in the story's 3D look (the page IS the last slide, one renderer
 * for the story and, later, the app). The 390 CSS px wide page is scaled by 1080 / 390 into the 1080 x 1920 stage, so the top 693 px of
 * the page fill the frame. Its entrance (cards rise one after another, rings fill, numbers count up, bars grow) is a pure function of t
 * (kit rule 1) through P2Page.seek(t); after about 3 s it holds still and is complete, tappable and scrollable inside the stage.
 * Content: `response` (the raw fetch-student-data response, kept by P2Data.toStory) is what the page draws; with no response it is
 * built from the story's lastWeek / term / year period records, so every earlier caller still works.
 * The page carries its own wall picture, so the story's badge and week pill fade out when this beat starts (p2-story).
 */
(function () {
MotionIgor.define({
  id: "p2-final",
  duration: 4,
  size: [1080, 1920],
  kind: "scene",
  title: "P-2 report · parent page",
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  defaults: {
    art: "final-layers/",
    response: null,                    // the raw fetch-student-data response (P2Data.toStory(response).response)
    child: { name: "Noor", grade: "Grade 0", form: "PREP A" },
    dataAsOf: "2026-10-20",
    weekEnding: "2026-10-15",
    weekNumber: 7,
    // fallback period totals (P2Data.toStory). Default = sample-100.
    lastWeek: { daysOpen: 2, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    term: { daysOpen: 22, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    year: { daysOpen: 22, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    pxScale: 0,                        // css px of the screen per stage px (the story passes it): 0 = the old phone size
    chrome: true                       // kept for the story's contract; the page draws no badge
  },
  build: function (ctx) {
    var c = ctx.content, st = ctx.stage;
    st.style.background = "#e1d6cd";
    // The page is drawn at its REAL size on the screen: ps = css px of the screen per stage px (the story passes it as content.pxScale), so
    // the page box is as wide as the screen shows the stage (a phone: about 375 to 430 px, a laptop: the window) and its own container
    // queries pick the same layout as the live page (cards side by side on a laptop). Without it: the old 390 px phone page.
    var ps = c.pxScale > 0 ? c.pxScale : (ctx.W > 1080 ? 0.5 : 390 / 1080);
    var box = document.createElement("div");
    box.style.cssText = "position:absolute;left:0;top:0;width:" + (ctx.W * ps) + "px;height:" + (1920 * ps) + "px;transform-origin:0 0;transform:scale(" + (1 / ps) + ")";
    st.appendChild(box);
    var input = c.response || c;                                    // no response: P2Data.toPage builds one from lastWeek / term / year
    var page = P2Page.mount(box, input, { scroll: "self", driven: true, hold: !!c.holdPictures, wall: c.art + "wall-tall.jpg", bannerWidth: c.pxScale > 0 ? window.innerWidth : 0 });   // in the app the page after the story is as wide as the screen: its banner choice must match (a portrait iPad plays the narrow portrait stage)
    ctx.onDraw(function (t) { page.seek(t); });
    return { destroy: function () { page.destroy(); } };
  }
});
})();

;
/* motion-igor element · swoosh-wipe
 * A slide transition on a TRANSPARENT stage. A thick S-curve band in the accent colour sweeps in from
 * content.from ("left" | "right"), a second trailing band (content.trail, default c1) riding just behind it
 * for depth. The accent band widens until it covers the whole frame, holds for 0.1 s, then collapses into a
 * thin, pointed S-curve tail that sweeps out the far side, revealing what is underneath; the trailing band
 * thins out and leaves alongside it. The first and last frames are empty.
 *
 * COVER MOMENT: the frame is fully covered from coverAt - 0.05 to coverAt + 0.05 (coverAt = 0.7 s by default).
 * Valid range 0.25 to 1.15 s (duration minus 0.25); a value outside it is clamped and the clamped value is
 * written back into content.coverAt, so a deck can always swap the slide underneath at that moment, e.g.
 *   inst.tl.call(function () { showNextSlide(); }, null, inst.ctx.content.coverAt);
 *
 * content.trail: any theme role ("c1", "c2", ...) or "tint" (a light tint of the accent).
 *
 * Geometry: in a frame rotated so the band's spine leans up and to the right, each edge is u = offset + f(w)
 * with f a deep sine (the S). The band's u-width is scaled by sqrt(1 + f'^2) so its true thickness is even.
 * Everything is drawn from t alone in ctx.onDraw (closed-form offsets); crisp fills, no blur, and a thin white
 * highlight line rides the edge that is moving.
 */
(function () {
MotionIgor.define({
  id: "swoosh-wipe",
  duration: 1.4,
  size: [1920, 1080],
  kind: "element",
  title: "Swoosh wipe transition",
  style: "Extras · swoosh wipe",
  engine: "svg",
  defaults: {
    from: "left",
    coverAt: 0.7,
    trail: "c1"
  },
  build: function (ctx) {
    var c = ctx.content, th = ctx.theme, u = ctx.util, W = ctx.W, H = ctx.H;
    var S = function (tag, attrs, parent) { return u.svg(tag, attrs, parent); };
    var E = function (name) { return ctx.gsap.parseEase(name); };
    ctx.stage.style.background = "transparent";

    var END = 1.4, HOLD = 0.05;
    var COVER = u.clamp(isFinite(+c.coverAt) && c.coverAt !== "" ? +c.coverAt : 0.7, 0.25, END - 0.25);
    c.coverAt = COVER;                                    // decks read the value actually used
    var IN_END = COVER - HOLD, OUT_START = COVER + HOLD;
    var flip = String(c.from).toLowerCase() === "right";

    function mixWhite(hex, k) {
      var m = /^#?([0-9a-f]{6})$/i.exec(String(hex || ""));
      if (!m) return hex;
      var n = parseInt(m[1], 16), ch = [n >> 16 & 255, n >> 8 & 255, n & 255].map(function (v) { return Math.round(v + (255 - v) * k); });
      return "rgb(" + ch.join(",") + ")";
    }
    var trailCol = c.trail === "tint" ? mixWhite(th.accent, 0.5) : (th[c.trail] || th.c1 || th.c2 || th.ink);

    // Rotated frame: U is the sweep direction (right and a little down), V the spine (up and to the right).
    var AL = 30 * Math.PI / 180, Ux = Math.cos(AL), Uy = Math.sin(AL), Vx = Math.sin(AL), Vy = -Math.cos(AL);
    var cx = W / 2, cy = H / 2;
    var corners = [[0, 0], [W, 0], [0, H], [W, H]], uMax = 0, wMax = 0;
    corners.forEach(function (p) {
      var dx = p[0] - cx, dy = p[1] - cy;
      uMax = Math.max(uMax, Math.abs(dx * Ux + dy * Uy)); wMax = Math.max(wMax, Math.abs(dx * Vx + dy * Vy));
    });
    var SPAN = 2 * wMax;                                  // spine length across the frame
    var A = SPAN * 0.13, K = 2 * Math.PI / (SPAN * 1.05), PH = 0.5;   // one deep S across the frame
    var T = SPAN * 0.105;                                  // band thickness on the way in (~215 px at 1080p)
    var TC = T * 0.5;                                      // trailing band thickness
    var TT = T * 0.75;                                     // tail thickness at its thick end
    var MG = 30;                                           // safety margin: no gap at any corner
    var N = 96, W0 = -wMax - 60, W1 = wMax + 60, ws = [], fw = [], sw = [], tp = [], SMAX = 1;
    for (var i = 0; i <= N; i++) {
      var w = W0 + (W1 - W0) * i / N;
      ws.push(w);
      fw.push(A * Math.sin(K * w + PH));
      var s = Math.sqrt(1 + Math.pow(A * K * Math.cos(K * w + PH), 2));
      sw.push(s); SMAX = Math.max(SMAX, s);
      var n = (w + wMax) / (2 * wMax);                     // 0 at the bottom-left end, 1 at the top-right end
      tp.push(Math.pow(Math.sin(Math.PI * u.clamp((n - 0.06) / 0.86, 0, 1)), 0.75)); // lens: pointed at both ends
    }
    var HWC = uMax + A + MG;                               // half width that covers the frame
    var C0 = -uMax - A - (T / 2 + TC) * SMAX - MG;         // entry: whole band set off-screen
    // Exact screen extent along U at each spine sample: the exit starts where the frame is only just covered
    // and ends where the last pixel has gone, so the cover window stays 0.1 s and no time is spent off-screen.
    var bLo = Infinity, bHi = -Infinity, TMAX = 0;
    for (var j = 0; j <= N; j++) {
      var wj = ws[j];
      var lo = Math.max((-cx - wj * Vx) / Ux, (-cy - wj * Vy) / Uy);
      var hi = Math.min((W - cx - wj * Vx) / Ux, (H - cy - wj * Vy) / Uy);
      TMAX = Math.max(TMAX, TT * tp[j] * sw[j]);
      if (lo > hi) continue;                               // this spine sample misses the frame
      bLo = Math.min(bLo, lo - fw[j] - 24); bHi = Math.max(bHi, hi - fw[j] + 24);
    }

    var travelE = E("power3.out"), widenE = E("power2.in"), backE = function (r) { return 0.4 * r + 0.6 * r * r; }, tailE = function (r) { return 0.15 * r + 0.85 * r * r; };
    // exit eases above move at once (no extra hold after the cover window), then accelerate out

    // Edge offsets at time t, as u-offsets from f(w): the accent runs from b to b + ev(i) * sw[i] + ex(i), so the
    // band thickness ev is drawn even (scaled by sw) and any extra cover width ex is a plain parallel shift (the
    // front stays a clean S at every width). The trailing band runs from b - tc(i) * sw[i] to b.
    function state(t) {
      if (t <= OUT_START) {
        var q = u.clamp(t / IN_END, 0, 1);
        var C = u.lerp(C0, 0, travelE(q));
        var hw = u.lerp(T / 2, HWC, widenE(u.clamp((q - 0.3) / 0.7, 0, 1)));
        return { b: C - hw, ev: function () { return T; }, ex: function () { return 2 * hw - T; }, tc: function () { return TC; }, out: false };
      }
      var rb = u.clamp((t - OUT_START) / (END - 0.2 - OUT_START), 0, 1);  // body leaves first
      var rt = u.clamp((t - OUT_START) / (END - 0.01 - OUT_START), 0, 1);   // the tail chases it and leaves last
      var bt = u.lerp(bLo - TMAX, bHi, tailE(rt));
      return {
        b: u.lerp(bLo, bHi, backE(rb)),
        ev: function () { return 0; },
        ex: function () { return 2 * HWC; },               // the body's front never retreats: it is past the far side
        tc: function () { return TC * (1 - rb); },
        tb: bt, tt: function (i) { return TT * tp[i]; },
        out: true
      };
    }

    var root = S("svg", { viewBox: "0 0 " + W + " " + H, width: W, height: H, style: "position:absolute;inset:0;display:block;overflow:hidden" }, ctx.stage);
    var g = S("g", flip ? { transform: "matrix(-1 0 0 1 " + W + " 0)" } : {}, root);
    var pK = S("path", { fill: trailCol, d: "" }, g);
    var pA = S("path", { fill: th.accent, d: "" }, g);
    var hl = S("path", { fill: "none", stroke: "#ffffff", "stroke-width": 4, "stroke-opacity": 0.6, "stroke-linejoin": "round", "stroke-linecap": "round", d: "" }, g);

    function pt(uu, i) {
      var x = cx + uu * Ux + ws[i] * Vx, y = cy + uu * Uy + ws[i] * Vy;
      return (Math.round(x * 10) / 10) + " " + (Math.round(y * 10) / 10);
    }
    function onScreen(uu, i) {
      var x = cx + uu * Ux + ws[i] * Vx, y = cy + uu * Uy + ws[i] * Vy;
      return x > -4 && x < W + 4 && y > -4 && y < H + 4;
    }
    // Region between back offset lo(i) and front offset hi(i) (both already include f(w)).
    function region(lo, hi) {
      var a = [], z = [], any = false;
      for (var i = 0; i <= N; i++) {
        var l = lo(i), h = Math.max(hi(i), l);
        if (h - l > 0.5 && l < uMax + 4 && h > -uMax - 4) any = true;
        a.push(pt(h, i)); z.push(pt(l, i));
      }
      return any ? "M" + a.join("L") + "L" + z.reverse().join("L") + "Z" : "";
    }
    function draw(t) {
      var s = state(t);
      var back = function (i) { return s.b + fw[i]; };
      var front = function (i) { return s.b + fw[i] + s.ev(i) * sw[i] + s.ex(i); };
      pK.setAttribute("d", region(function (i) { return back(i) - s.tc(i) * sw[i]; }, function (i) { return Math.min(back(i) + 12, (back(i) + front(i)) / 2); }));
      var body = region(back, front);
      if (s.out) {                                         // the pointed accent tail, an S-curve lens of its own
        var tl0 = function (i) { return s.tb + fw[i]; };
        body += region(tl0, function (i) { return tl0(i) + s.tt(i) * sw[i]; });
      }
      pA.setAttribute("d", body);
      // highlight just inside the moving edge: the front on the way in, the back on the way out
      var pts = [], any = false;
      for (var i = 0; i <= N; i++) {
        var l = back(i), h = front(i), inset = Math.min(5, (h - l) / 2);
        var uu = s.out ? l + inset : h - inset;
        if (h - l > 2 && onScreen(uu, i)) any = true;
        pts.push(pt(uu, i));
      }
      hl.setAttribute("d", any ? "M" + pts.join("L") : "");
    }
    ctx.onDraw(draw);
    draw(END); // final state: the tail has left through the far side, stage empty
  }
});
})();

;
/* P-2 report story · p2-sound
 * The sound layer of the story. It makes no pictures and the animation never waits for it: it watches the STORY CLOCK (the p2-story timeline) and plays
 *   - the effects of the cue list MotionIgor.registry["p2-story"].cues(content) = [{ t, name, beat }] (story seconds) when the clock passes each cue, and
 *   - the music bed (music.m4a, 55 s, baked to cover the 54.5 s story) from the clock's own second, so a pause, a picture wait, a seek, a resize remount or a
 *     Replay all stay in sync (the bed restarts at the clock's second if it ever drifts by more than 1 s).
 * A cue is played only when the clock passes it during normal play: after a jump of the clock (a seek, a tab switch that froze the clock) nothing is
 * re-fired, and while the clock is paused or stalled nothing plays and the music stops. Effects are scheduled on the audio clock up to 0.5 s ahead (so a late
 * timer tick on a busy frame never delays one); a pause, a jump, Skip or mute cancels the ones that have not started yet.
 * Web Audio: the files are fetched at once (effects first, music last) and decoded when the person taps (the tap creates and resumes the AudioContext, which
 * is what iPhone Safari and Chrome require). Sound blocked, unsupported or a file missing = the story plays exactly the same, silently, no errors.
 * Igor's picks (23 Oct 2026): swoosh = whoosh at every wipe, bell when the lesson begins, pop = a good piece goes in its hole, thud = absent, clank = late to
 * school, switch = early leave, tap = a counter goes up, a quiet bed under it all; NO footsteps, cheering or clapping. The claw machine sounds (claw-move,
 * claw-grab, toy-drop, toy-slip) play in the girls' claw scene (p2-claw): they are fetched only when the story's cue list has them (snd.run), never for the peg sorter.
 * Levels: the files are levelled in tools/encode-audio.sh (music -21 LUFS, effects about -16 dB RMS with a peak limit), so the effects sit clearly above the bed.
 * The last beat (the report) and the page are silent: cues stop before it and the bed is gone by 52.5 s.
 * Silent switch (iPhone): Web Audio follows the ringer switch, media playback does not. The Tap to play click calls P2Sound.unlockMedia() FIRST (synchronously, in the
 * gesture): it sets navigator.audioSession.type = "playback" (iOS 17+ / Safari 16.4+) and starts a looping, truly silent HTML <audio> element (a 0.6 s mp3 as a data URI;
 * the trick older iOS needs to move the audio session to "playback"). P2Sound.releaseMedia() undoes both (Skip, the end, mute, leaving the page). Where those APIs
 * do not exist nothing happens. The silent loop is silent: the sound on/off button only needs the Web Audio master gain.
 * Decoding: the files are fetched and DECODED at once when the story is mounted (before the tap, on an OfflineAudioContext, which needs no gesture, so there is
 * still no AudioContext before the tap); the tap then only creates and resumes the real one, so no decode work lands on the title animation.
 * Debug: snd.log holds every sound the layer triggered ({ kind: "cue", name, sound, cueT, t, played } and music-start / music-stop); P2Sound.current is the live layer.
 */
(function () {
var SOUNDS = {                       // sound name -> file in audio/ (gain = extra gain on top of the levelled file, 1 = as encoded)
  whoosh: { file: "whoosh.m4a", gain: 1 },
  bell: { file: "bell.m4a", gain: 1 },
  pop: { file: "pop.m4a", gain: 1 },
  thud: { file: "thud.m4a", gain: 1 },
  clank: { file: "clank.m4a", gain: 1 },
  "switch": { file: "switch.m4a", gain: 1 },
  tap: { file: "tap.m4a", gain: 1 },
  "claw-move": { file: "claw-move.m4a", gain: 0.25 },      // the claw machine scene (girls)
  "claw-grab": { file: "claw-grab.m4a", gain: 0.25 },
  "toy-drop": { file: "toy-drop.m4a", gain: 0.25 },
  "toy-slip": { file: "toy-slip.m4a", gain: 0.25 },
  music: { file: "music.m4a", gain: 1 }
};
var CUE_SOUND = {                    // story cue name -> sound name; cue names not listed here make no sound (round-start, wrong-hole, round-clear)
  swoosh: "whoosh", bell: "bell", "drop-in": "pop", "tag-absent": "thud", "tag-late": "clank", "tag-early": "switch", "counter-tick": "tap",
  "claw-move": "claw-move", "claw-grab": "claw-grab", "toy-drop": "toy-drop", "toy-slip": "toy-slip",     // the girls' claw machine (p2-claw), only fetched when the story has them
  // Grade 3-6 game beats (24 Oct 2026), existing files only: jigsaw (p36-puzzle) piece-in = pop, piece-miss = thud; football (p36-football) kick = tap, goal = pop, post = clank
  "piece-in": "pop", "piece-miss": "thud", kick: "tap", goal: "pop", post: "clank"
};
var CLAW_SOUNDS = { "claw-move": 1, "claw-grab": 1, "toy-drop": 1, "toy-slip": 1 };
var MUSIC = { fadeInEnd: 0.8, fadeOutFrom: 50.0, fadeOutTo: 52.5, resync: 2.0 };
var LOOKAHEAD = 0.5;
var JUMP = 0.8;                      // a forward step of the story clock bigger than the time that passed by more than this (seconds) is a seek, not time passing                // seconds of story clock: effects are handed to the audio clock this far ahead, so a late timer tick (a busy frame) never delays one
var PREF_KEY = "p2story:sound";       // "off" = the person turned the sound off on this device; anything else (or storage blocked) = sound on

function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
function envelope(t, fade) {         // music level for story second t (a pure function of t, so a seek lands on the right level); fade = [from, to] of the fade-out, default the P-2 story's
  var fo = fade || [MUSIC.fadeOutFrom, MUSIC.fadeOutTo];
  var up = clamp(t / MUSIC.fadeInEnd, 0, 1), down = 1 - clamp((t - fo[0]) / (fo[1] - fo[0]), 0, 1);
  return up * up * (3 - 2 * up) * down * down * (3 - 2 * down);
}
function nowMs() { return (window.performance && performance.now) ? performance.now() : Date.now(); }

function create(opts) {
  opts = opts || {};
  var base = opts.base || "";
  var muted = !!opts.muted;
  var deferPreload = !!opts.deferPreload;   // the host fetches the files itself (preload()), in its own turn: the tap and run() then fetch nothing (round 2 fix 1: on a slow line the music must not jump the queue)
  var ctx = null, master = null, fxBus = null, musicBus = null;
  var raw = {}, buffers = {}, decoding = {};
  var log = [], suppressed = 0;
  var clock = null, timer = 0, lastT = 0, lastSched = 0, lastWall = 0, still = 0;
  var pending = [];                  // effects handed to the audio clock that have not started yet: { src, at (ctx time), entry }
  var music = null;                  // { src, gain, off, at }: off = story second the source started at, at = ctx time it started
  var snd = {};

  function note(e) { log.push(e); if (log.length > 600) log.shift(); }
  var wanted = {};                   // claw sounds the current story asks for (set by run() from its cue list): they are fetched only then, never for the peg sorter
  function usedNames() { var o = {}; Object.keys(CUE_SOUND).forEach(function (k) { if (!CLAW_SOUNDS[CUE_SOUND[k]] || wanted[CUE_SOUND[k]]) o[CUE_SOUND[k]] = 1; }); o.music = 1; return Object.keys(o); }

  // ------------------------------------------------------------------ loading
  function fetchRaw(name) {
    if (!raw[name]) {
      raw[name] = (typeof fetch === "function" && SOUNDS[name])
        ? fetch(base + SOUNDS[name].file).then(function (r) { if (!r.ok) throw new Error("audio " + r.status); return r.arrayBuffer(); }).catch(function () { return null; })
        : Promise.resolve(null);
    }
    return raw[name];
  }
  /** fetch every sound the story uses: the effects together, then the music bed (so the small files are never queued behind the big one) */
  var preloaded = null;              // the newest preload chain (fetched, then decoded)
  snd.preload = function () {
    var names = usedNames().filter(function (n) { return n !== "music"; });
    preloaded = Promise.all(names.map(fetchRaw)).then(function () { return fetchRaw("music"); }).then(decodeAll, function () {});
  };
  /** resolves (true / false = decoded / not) once the music bed is fetched and decoded, or has failed: the loader waits for it (round 2, 25 Oct 2026) */
  snd.musicReady = function () {
    if (!preloaded) snd.preload();
    return preloaded.then(function () { return decoding.music || null; }).then(function () { return !!buffers.music; }, function () { return false; });
  };
  var offline = null;                // OfflineAudioContext used only to decode before the tap (an AudioBuffer plays in any context; the source node resamples)
  function decoder() {
    if (ctx) return ctx;
    if (offline === null) {
      offline = false;
      try { var O = window.OfflineAudioContext || window.webkitOfflineAudioContext; if (O) offline = new O(1, 1, 44100); } catch (e) { offline = false; }
    }
    return offline || null;
  }
  function decode(ab) {
    return new Promise(function (ok, no) {
      var r, d = decoder();
      if (!d) { no(new Error("no decoder")); return; }
      try { r = d.decodeAudioData(ab, ok, no); } catch (e) { no(e); return; }
      if (r && typeof r.then === "function") r.then(ok, no);
    });
  }
  function decodeNow(name) {
    if (buffers[name] || decoding[name]) return decoding[name] || null;
    if (!decoder()) return null;
    decoding[name] = fetchRaw(name).then(function (ab) { return ab ? decode(ab) : null; }).then(function (b) { if (b) buffers[name] = b; else delete decoding[name]; }, function () { delete decoding[name]; });
    return decoding[name];
  }
  function decodeAll() { if (decoder()) usedNames().forEach(decodeNow); }
  /** load (and decode) one registered sound on demand, e.g. the claw machine's; resolves when it is ready or failed */
  snd.load = function (name) { return fetchRaw(name).then(function () { return decodeNow(name); }); };

  // ------------------------------------------------------------------ the tap: create / resume the AudioContext
  snd.unlock = function () {
    if (!ctx) {
      var C = window.AudioContext || window.webkitAudioContext;
      if (!C) return false;
      try { ctx = new C(); } catch (e) { ctx = null; return false; }
      master = ctx.createGain(); master.gain.value = muted ? 0 : 1;
      var comp = ctx.createDynamicsCompressor();                  // catches the odd peak when an effect lands on the bed
      comp.threshold.value = -10; comp.knee.value = 10; comp.ratio.value = 3; comp.attack.value = 0.004; comp.release.value = 0.2;
      master.connect(comp); comp.connect(ctx.destination);
      fxBus = ctx.createGain(); fxBus.connect(master);
      musicBus = ctx.createGain(); musicBus.gain.value = 0; musicBus.connect(master);
    }
    try { var p = ctx.resume(); if (p && typeof p.catch === "function") p.catch(function () {}); } catch (e) { /* stays silent */ }
    try { var sb = ctx.createBufferSource(); sb.buffer = ctx.createBuffer(1, 1, 22050); sb.connect(ctx.destination); sb.start(0); } catch (e) { /* iOS output unlock only */ }
    if (!deferPreload || preloaded) { snd.preload(); decodeAll(); }
    return true;
  };

  // ------------------------------------------------------------------ effects
  /** hand one cue to the audio clock, to start `wait` seconds from now (0 = now). The log's t is the story second the sound actually starts at. */
  function trigger(cue, t, wait) {
    var name = CUE_SOUND[cue.name];
    if (!name) return;
    if (muted) { suppressed++; return; }
    var buf = buffers[name], src = null, at = 0;
    if (buf && ctx && ctx.state === "running") {
      try {
        src = ctx.createBufferSource(); var g = ctx.createGain();
        src.buffer = buf; g.gain.value = SOUNDS[name].gain;
        src.connect(g); g.connect(fxBus);
        at = ctx.currentTime + Math.max(0, wait);
        src.start(at);
      } catch (e) { src = null; }
    }
    var entry = { kind: "cue", name: cue.name, sound: name, cueT: cue.t, t: +(Math.max(t + Math.max(0, wait), cue.t)).toFixed(3), played: !!src };
    note(entry);
    if (src) pending.push({ src: src, at: at, entry: entry });
  }
  /** cancel every effect that has been handed over but has not started (a pause, a jump, Skip, mute): it is also taken out of the log, as it never sounded */
  function cancelPending() {
    var now = ctx ? ctx.currentTime : 0;
    pending.forEach(function (p) {
      if (p.at > now) { try { p.src.stop(); } catch (e) { /* ignore */ } var i = log.indexOf(p.entry); if (i >= 0) log.splice(i, 1); }
    });
    pending = [];
  }

  // ------------------------------------------------------------------ music
  function stopMusic(fade, t) {
    if (!music) return;
    var m = music; music = null;
    try {
      var now = ctx.currentTime;
      m.gain.gain.cancelScheduledValues(now); m.gain.gain.setValueAtTime(m.gain.gain.value, now); m.gain.gain.linearRampToValueAtTime(0, now + fade);
      m.src.stop(now + fade + 0.03);
    } catch (e) { /* already ended */ }
    note({ kind: "music-stop", t: t == null ? null : +t.toFixed(3) });
  }
  function startMusic(t) {
    var buf = buffers.music;
    if (!buf) return;
    var off = clamp(t, 0, Math.max(0, buf.duration - 0.1));
    try {
      var src = ctx.createBufferSource(), g = ctx.createGain(), now = ctx.currentTime;
      src.buffer = buf; g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(SOUNDS.music.gain, now + 0.06);
      src.connect(g); g.connect(musicBus);
      src.start(0, off);
      music = { src: src, gain: g, off: off, at: now };
      note({ kind: "music-start", t: +t.toFixed(3), off: +off.toFixed(3) });
    } catch (e) { music = null; }
  }
  function musicTick(playing, t, jumped) {
    if (!ctx) return;
    var env = envelope(t, clock && clock.musicFade);               // clock.musicFade = [from, to] for a story longer than the 55 s bed (Grade 3-6: 52.5 to 55)
    var want = playing && !muted && env > 0.001 && !!buffers.music && ctx.state === "running";
    if (!want) { if (music) stopMusic(0.08, t); return; }
    if (music && (jumped || Math.abs(music.off + (ctx.currentTime - music.at) - t) > MUSIC.resync)) stopMusic(0.05, t);
    if (!music) startMusic(t);
    try { musicBus.gain.setTargetAtTime(env, ctx.currentTime, 0.04); } catch (e) { /* ignore */ }
  }

  // ------------------------------------------------------------------ the clock
  function tick() {
    if (!clock) return;
    var t, playing;
    try { t = clock.time(); playing = clock.playing(); } catch (e) { return; }
    var now = nowMs(), wall = (now - lastWall) / 1000; lastWall = now;
    var adv = t - lastT, rate = Math.max(1, clock.rate ? clock.rate() : 1);
    if (ctx && pending.length) { var ct = ctx.currentTime; pending = pending.filter(function (p) { return p.at > ct; }); }
    if (!playing) { cancelPending(); lastT = lastSched = t; still = 0; musicTick(false, t, false); return; }
    // a clock that has not moved for 0.3 s although it "plays" is frozen (hidden tab): treat it as paused until it moves again
    still = Math.abs(adv) < 0.0005 ? still + wall : 0;
    if (still > 0.3) { cancelPending(); lastT = lastSched = t; musicTick(false, t, false); return; }
    // a seek, not time passing: re-fire nothing. A busy frame can hold the story clock back and then let it catch up in one step (up to about 0.5 s on a slow
    // machine), so only a step well beyond that counts as a jump.
    var jumped = adv < -0.02 || adv > wall * rate + JUMP;
    if (jumped) { cancelPending(); lastSched = t; }
    else if (ctx) {
      var cues = clock.cues || [], upTo = t + LOOKAHEAD * rate;
      for (var i = 0; i < cues.length; i++) if (cues[i].t > lastSched && cues[i].t <= upTo) trigger(cues[i], t, Math.max(0, (cues[i].t - t) / rate));
      lastSched = Math.max(lastSched, upTo);
    } else lastSched = t;
    lastT = t;
    musicTick(true, t, jumped);
  }
  /** follow this clock { time(), playing(), rate(), cues } (story seconds). Calling it again (a remount of the story at the same second) swaps the clock and keeps the bed going. */
  snd.run = function (c) {
    clock = c; lastT = lastSched = c.time(); lastWall = nowMs(); still = 0;
    (c.cues || []).forEach(function (q) { var nm = CUE_SOUND[q.name]; if (nm && CLAW_SOUNDS[nm] && !wanted[nm]) { wanted[nm] = 1; if (!deferPreload || preloaded) snd.load(nm); } });
    if (fxBus) { try { fxBus.gain.cancelScheduledValues(ctx.currentTime); fxBus.gain.setValueAtTime(1, ctx.currentTime); } catch (e) { /* ignore */ } }
    if (!timer) timer = window.setInterval(tick, 25);
  };
  /** the story is over, skipped or left: stop following the clock, fade the bed and the effects out */
  snd.halt = function (fadeMs) {
    clock = null; cancelPending(); releaseMedia();
    if (timer) { window.clearInterval(timer); timer = 0; }
    var f = (fadeMs == null ? 150 : fadeMs) / 1000;
    if (ctx) { stopMusic(f, null); try { fxBus.gain.setTargetAtTime(0, ctx.currentTime, f / 3 || 0.01); } catch (e) { /* ignore */ } }
  };
  /** forget the log (a new play of the story) */
  snd.reset = function () { log.length = 0; suppressed = 0; };
  snd.setMuted = function (m) {
    muted = !!m;
    if (muted) releaseMedia();
    if (ctx) { try { master.gain.setTargetAtTime(muted ? 0 : 1, ctx.currentTime, 0.02); } catch (e) { /* ignore */ } if (muted) { cancelPending(); stopMusic(0.06, null); } }
  };
  snd.isMuted = function () { return muted; };
  snd.destroy = function () { snd.halt(0); if (ctx) { try { ctx.close(); } catch (e) { /* ignore */ } } ctx = null; if (P2Sound.current === snd) P2Sound.current = null; };
  snd.log = log;
  snd.stats = function () {
    return { state: ctx ? ctx.state : "none", muted: muted, suppressed: suppressed, decoded: Object.keys(buffers), musicOn: !!music, cuesPlayed: log.filter(function (e) { return e.kind === "cue" && e.played; }).length };
  };
  P2Sound.current = snd;
  return snd;
}

// ------------------------------------------------------------------ silent switch (see the header): both calls are safe anywhere (no API = nothing happens)
// Short silent mp3 (0.6 s, 8 kHz mono, 1 KB), played in a loop.
var SILENT_MP3 = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjYyLjEyLjEwMQAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAACwAAA/AASUlJSUlJSUlJW1tbW1tbW1tbbW1tbW1tbW1tgICAgICAgICAkpKSkpKSkpKSpKSkpKSkpKSktra2tra2tra2ycnJycnJycnJ29vb29vb29vb7e3t7e3t7e3t////////////AAAAAExhdmM2Mi4yOAAAAAAAAAAAAAAAACQDwAAAAAAAAAPw41AMlwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVV/+MYxDsAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVV/+MYxHYAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVV/+MYxLEAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVV/+MYxMQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVV/+MYxMQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVV/+MYxMQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVV/+MYxMQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxMQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxMQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxMQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
var media = null, mediaSessionBefore = null;
/** call SYNCHRONOUSLY inside the Tap to play / sound-on click, before the AudioContext is created or resumed */
function unlockMedia() {
  try {
    var as = navigator.audioSession;
    if (as && "type" in as) { if (mediaSessionBefore === null) mediaSessionBefore = as.type; as.type = "playback"; }
  } catch (e) { /* not supported: the audio element below does the job on older iOS */ }
  try {
    if (!media) {
      var a = document.createElement("audio");
      a.setAttribute("playsinline", ""); a.setAttribute("webkit-playsinline", ""); a.setAttribute("x-webkit-airplay", "deny");
      a.setAttribute("aria-hidden", "true");
      a.disableRemotePlayback = true;
      a.preload = "auto"; a.loop = true; a.src = SILENT_MP3;
      a.style.cssText = "position:absolute;width:0;height:0;opacity:0;pointer-events:none";
      (document.body || document.documentElement).appendChild(a);
      media = a;
    }
    var p = media.play();
    if (p && typeof p.catch === "function") p.catch(function () { /* blocked: Web Audio still works with the ringer on */ });
  } catch (e) { /* no media element: ringer-on behaviour */ }
}
function releaseMedia() {
  if (media) { try { media.pause(); media.removeAttribute("src"); media.load(); if (media.parentNode) media.parentNode.removeChild(media); } catch (e) { /* ignore */ } media = null; }
  try { var as = navigator.audioSession; if (as && mediaSessionBefore !== null) as.type = mediaSessionBefore; } catch (e) { /* ignore */ }
  mediaSessionBefore = null;
}

function readMuted() { try { return window.localStorage.getItem(PREF_KEY) === "off"; } catch (e) { return false; } }
function saveMuted(m) { try { window.localStorage.setItem(PREF_KEY, m ? "off" : "on"); } catch (e) { /* blocked storage: sound stays on next time */ } }

var P2Sound = window.P2Sound = { create: create, unlockMedia: unlockMedia, releaseMedia: releaseMedia, SOUNDS: SOUNDS, CUE_SOUND: CUE_SOUND, MUSIC: MUSIC, envelope: envelope, readMuted: readMuted, saveMuted: saveMuted, current: null };
})();

;
/* P-2 report story · p2-story
 * Plays the P-2 beats one after another (kit layout pattern: each beat is mounted once and seeked from this clock).
 * Between beats the kit's swoosh-wipe sweeps across, played 3x faster than its own 1.4 s so the full cover lasts
 * under 0.1 s, and the beat underneath swaps at the cover moment (hard cut under the band, never a cross-dissolve,
 * which ghosted the faces). The story owns the badge and week pill and draws them ABOVE the wipe, so they stay
 * on screen the whole time (each beat runs with chrome: false); the badge and week pill pop in when the title card ends
 * (the title has its own big week pill) and the week pill fades out on the final card. Beats: title 4.5 s, walk 6 s, gate 8 s,
 * classroom 6 s, shape sorter 14 s (three rounds of 4.6 s: came to school, on time, stayed all day), then the party (100% week) OR the results card (6 s), family 6 s, final card 4 s.
 * The walk to school (6 s: mum and Noor from behind up the school path) plays between the title and the gate, so the gate and
 * everything after it start 6 s later. The three-round sorter (14 s, was 7 s) makes the story 54.5 s in all.
 * Needs swoosh-wipe.js from the kit loaded alongside the beats.
 * content.look === "girl": the sorter beat is the claw machine (p2-claw, same 14 s, same three rounds, same data); anything else is the peg sorter (p2-sorter).
 * Sound: MotionIgor.registry["p2-story"].cues(content) lists every sound moment of the story ([{ t, name, beat }], story seconds): a swoosh at each wipe, the
 * bell (p2-class), the sorter's (or the claw machine's) drops / tags and a counter-tick per counter step. p2-sound.js plays them off the story clock; nothing here makes sound.
 */
(function () {
// beats in play order with their start second (b.at). 100% = the parent page's hasPerfectWeek: the class party; otherwise the results card. Exactly one of the two plays, so the story is the same length either way.
function beatList(perfect, look, band) {
  var g36 = band === "g36";                                           // Grade 3-6: the game scene is 18 s (three rounds of 6 s): jigsaw for girls, football for boys; everything after it starts 4 s later
  var list = [
    { id: "p2-title", dur: 4.5, art: "title-layers/" },
    { id: "p2-walk", dur: 6, art: "walk-layers/" },
    { id: "p2-arrival", dur: 8, art: "arrival-layers/" },
    { id: "p2-class", dur: 6, art: "classroom-layers/" },
    g36 ? (look === "girl" ? { id: "p36-puzzle", dur: 18, art: "puzzle-layers/" } : { id: "p36-football", dur: 18, art: "football-layers/" })
        : look === "girl" ? { id: "p2-claw", dur: 14, art: "claw-layers/" } : { id: "p2-sorter", dur: 14, art: "sorter-layers/" },   // P-2 girls: the claw machine (p2-claw), P-2 boys: the peg sorter
    perfect ? { id: "p2-party", dur: 6, art: "party-layers/" } : { id: "p2-results", dur: 6, art: "results-layers/" },
    { id: "p2-family", dur: 6, art: "family-layers/" },
    { id: "p2-final", dur: 4, art: "final-layers/" }
  ];
  var at = 0;
  list.forEach(function (b) { b.at = at; at += b.dur; });
  return list;
}
var SPEED = 3, WIPE = 1.4 / SPEED, COVER = 0.7 / SPEED;
// Sound cues of the whole story: [{ t, name, beat }] in story seconds (the sound layer, p2-sound.js, plays them off the story clock).
//   swoosh        at the start of every scene-change wipe (the beat underneath swaps COVER s later)
//   (beat cues)   whatever a beat declares in MotionIgor.registry[id].cues(content), moved by the beat's start: bell (p2-class), and the sorter's
//                 round-start / drop-in / wrong-hole / tag-absent / tag-late / tag-early / round-clear
//   counter-tick  a counter card goes up: round 1 of the sorter at each good piece (drop-in), round 2 at each tag-late, round 3 at each tag-early,
//                 SORTER_TICK_LAG s after the cue (the sorter does not declare counter cues; RD 4.6 s is its round length)
// Nothing is returned for the final beat (the report is silent) or after it.
var SORTER_RD = 4.6, SORTER_TICK_LAG = 0.06, G36_RD = 6;           // G36_RD: round length of the Grade 3-6 game beats (p36-puzzle, p36-football)
function storyCues(content, band, id) {
  var c = MotionIgor.util.deepMerge(MotionIgor.registry[id || "p2-story"].defaults, content || {});
  var beats = beatList(!!c.perfect, c.look, band), out = [], last = beats[beats.length - 1];
  beats.slice(1).forEach(function (b) { out.push({ t: +(b.at - COVER).toFixed(3), name: "swoosh", beat: b.id }); });
  beats.forEach(function (b) {
    var def = MotionIgor.registry[b.id];
    if (!def || typeof def.cues !== "function") return;
    def.cues(c).forEach(function (q) {
      out.push({ t: +(b.at + q.t).toFixed(3), name: q.name, beat: b.id });
      if ((b.id === "p2-sorter" || b.id === "p2-claw") && (((q.name === "drop-in" || q.name === "toy-drop") && q.t < SORTER_RD) || q.name === "tag-late" || q.name === "tag-early")) {
        out.push({ t: +(b.at + q.t + SORTER_TICK_LAG).toFixed(3), name: "counter-tick", beat: b.id });
      }
      // Grade 3-6: round 1 counts a day at school at each piece that goes in / goal; rounds 2 and 3 tick at each tag-late / tag-early
      if ((b.id === "p36-puzzle" || b.id === "p36-football") && (((q.name === "piece-in" || q.name === "goal") && q.t < G36_RD) || q.name === "tag-late" || q.name === "tag-early")) {
        out.push({ t: +(b.at + q.t + SORTER_TICK_LAG).toFixed(3), name: "counter-tick", beat: b.id });
      }
    });
  });
  return out.filter(function (q) { return q.t < last.at; }).sort(function (a, b) { return a.t - b.t; });
}

function defineStory(id, band, duration, title) {
MotionIgor.define({
  id: id,
  duration: duration,
  size: [1080, 1920],
  kind: "layout",
  title: title,
  cues: function (content) { return storyCues(content, band, id); },
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  defaults: {
    base: "",
    lazySorter: false,                 // true (the app): the shape sorter is mounted just before its beat, once three.js has loaded (three.min.js is 630 KB: it must not delay the start)
    pxScale: 0,                        // css px of the screen per stage px (set by the app for the last beat); 0 = the old phone size
    badge: "Weekly report",
    episode: "Week 7",
    child: { name: "Noor", grade: "Grade 0", form: "PREP A" },
    // the child's numbers: what P2Data.toStory(response) gives for the app's response (lastWeek / term / year are the
    // parent page's period totals plus the numbers it works out from them). Default = sample-100 (a 100% week).
    weekEnding: "2026-10-15",
    weekEndingText: "Week ending 15 Oct",   // the page's own label for the week (P2Data.toStory)
    weekNumber: 7,                         // the weekInTerm the page's Term / Week picker shows for that week (Term 1 \u00b7 Week 7)
    perfect: true,                     // the page's hasPerfectWeek: true plays the class party, false the results card
    lastWeek: { daysOpen: 2, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    term: { daysOpen: 22, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    year: { daysOpen: 22, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    response: null,                    // the raw fetch-student-data response (P2Data.toStory(response).response): the last beat draws the whole page from it
    dataAsOf: "2026-10-20",
    look: ""                           // "girl": the claw machine (p2-claw) instead of the peg sorter in the sorter beat, handed to every beat. The link sets it from the child's gender (?look=girl|boy overrides)
  },
  build: function (ctx) {
    var c = ctx.content, st = ctx.stage, esc = ctx.util.esc;
    var SW = ctx.W;                                    // the stage follows the screen: 1080 on a phone, up to 3414 on a laptop (mount opts.size = [SW, 1920])
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f";
    // 100% = the parent page's hasPerfectWeek (computed by P2Data.toStory): the class party; otherwise the results card. Exactly one of the two plays, so the story is the same length either way.
    var perfect = !!c.perfect;
    var BEATS = beatList(perfect, c.look, band);                              // 54.5 s in all (P-2), 58.5 s (Grade 3-6)
    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function layer(z) {
      var h = document.createElement("div");
      h.style.cssText = "position:absolute;inset:0;width:" + SW + "px;height:1920px;z-index:" + z;
      st.appendChild(h); return h;
    }

    function nestBeat(h, b) {
      ctx.nest(h, b.id, { at: b.at, dur: b.dur, size: [SW, 1920], content: {
        // p36-football uses content.art as it is (no P2Kid inside): the story hands it the boy36 folder; p36-puzzle resolves girl36 itself with P2Kid.art, like the kid pictures of the other beats
        art: c.base + (b.id === "p36-football" ? P2Kid.art({ look: c.look, band: band }, b.art) : b.art), child: c.child, episode: c.episode, weekEnding: c.weekEnding, weekEndingText: c.weekEndingText, weekNumber: c.weekNumber, perfect: c.perfect,
        lastWeek: c.lastWeek, term: c.term, year: c.year, response: c.response, dataAsOf: c.dataAsOf, pxScale: c.pxScale, look: c.look, holdPictures: c.holdPictures, band: band, chrome: false
      } });
    }
    var lazy = null;                                                  // { h, b }: the beat that waits for three.js
    var hosts = BEATS.map(function (b) {
      var h = layer(1);
      if (c.lazySorter && (b.id === "p2-sorter" || b.id === "p2-claw" || b.id === "p36-football") && typeof THREE === "undefined") lazy = { h: h, b: b };
      else nestBeat(h, b);
      return h;
    });
    // wipes: mounted directly so they can run faster than their own clock (nest() only plays at 1x)
    var wipes = BEATS.slice(1).map(function (b) {
      var h = layer(5);
      var inst = MotionIgor.mount(h, "swoosh-wipe", { theme: ctx.theme && ctx.theme.id, fit: "cover", background: false, content: { from: "left", coverAt: 0.7 } });
      inst.pause();
      return { h: h, inst: inst, at: b.at - COVER, last: null };
    });

    // chrome above everything: badge, week pill (pop in at the start, then stay)
    var chrome = layer(10); chrome.style.pointerEvents = "none";
    function el(css, html) { var e = document.createElement("div"); e.style.cssText = css; if (html != null) e.innerHTML = html; chrome.appendChild(e); return e; }
    var badge = el("position:absolute;left:44px;top:58px;transform-origin:0 50%;display:flex;align-items:center;gap:18px;" +
      "padding:16px 34px 16px 20px;border-radius:999px;background:" + GOLD + ";border:6px solid " + INK + ";box-shadow:8px 8px 0 " + INK,
      '<svg width="70" height="70" viewBox="0 0 70 70"><rect x="6" y="8" width="58" height="54" rx="8" fill="#fff" stroke="' + INK +
      '" stroke-width="5"/><rect x="15" y="20" width="16" height="12" rx="2" fill="' + BLUE + '"/><path d="M37 22h18M37 30h14M15 42h40M15 51h30" stroke="' + INK +
      '" stroke-width="4.5" stroke-linecap="round"/></svg><span style="font:700 50px/1 ' + FONT + ';color:#fff;-webkit-text-stroke:9px ' + INK +
      ';paint-order:stroke fill;letter-spacing:0.01em">' + esc(c.badge) + "</span>");
    var week = el("position:absolute;left:552px;top:84px;transform-origin:50% 50%;padding:10px 24px;border-radius:999px;background:" +
      GREEN + ";border:5px solid " + INK + ";box-shadow:6px 6px 0 " + INK + ";font:700 38px/1 " + FONT + ";color:#fff", esc(c.episode));

    ctx.onDraw(function (t) {
      if (lazy && typeof THREE !== "undefined" && t >= lazy.b.at - 2.0) { var lz = lazy; lazy = null; nestBeat(lz.h, lz.b); }   // the app's clock waits for three.js at 23.9 s at the latest
      BEATS.forEach(function (b, i) {
        var next = BEATS[i + 1];
        hosts[i].style.display = t >= b.at && (!next || t < next.at) ? "block" : "none";   // display: beats set visibility on their own layers
      });
      wipes.forEach(function (w) {
        var on = t >= w.at && t <= w.at + WIPE;
        w.h.style.display = on ? "block" : "none";
        var ct = clamp((t - w.at) * SPEED, 0, 1.4);
        if (ct !== w.last) { w.last = ct; w.inst.seek(ct); }
      });
      var C0 = BEATS[1].at;                                         // badge and week pill arrive with the first story beat
      var b = seg(t, C0 + 0.15, C0 + 0.6);
      badge.style.transform = "scale(" + (b <= 0 ? 0 : outBack(b)).toFixed(3) + ")";
      var wk = seg(t, C0 + 0.55, C0 + 0.95);
      week.style.transform = "scale(" + (wk <= 0 ? 0 : outBack(wk)).toFixed(3) + ") rotate(-4deg)";
      var fin = BEATS.filter(function (x) { return x.id === "p2-final"; })[0];   // the final card's tabs name the period: no week pill there
      week.style.opacity = fin ? (1 - seg(t, fin.at - 0.05, fin.at + 0.25)).toFixed(3) : 1;
      badge.style.opacity = fin ? (1 - seg(t, fin.at - 0.05, fin.at + 0.25)).toFixed(3) : 1;   // the page carries its own title and wall: the last frame equals the page
    });
    return { destroy: function () { wipes.forEach(function (w) { if (w.inst.destroy) w.inst.destroy(); }); } };
  }
});
}
defineStory("p2-story", "p2", 54.5, "P-2 report · story");
defineStory("p36-story", "g36", 58.5, "Grade 3-6 report · story");
})();

;

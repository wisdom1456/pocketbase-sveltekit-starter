import{c as z,e as q}from"../chunks/index.3c75d8e0.js";import{s as F,f as g,a as M,g as v,h as b,u as C,c as k,d as p,i as L,v as m,E as x,G,l as A,m as D,n as w}from"../chunks/scheduler.edb94b3b.js";import{S as N,i as Y}from"../chunks/index.ab6f206b.js";const I=async function({params:{coll:o,id:e}}){return{logs:await z.collection("auditlog").getFullList({filter:`record="${e}" && collection="${o}"`,expand:"user"})}},W=Object.freeze(Object.defineProperty({__proto__:null,load:I},Symbol.toStringTag,{value:"Module"}));function B(o,e,r){const s=o.slice();return s[1]=e[r],s}function P(o){let e,r='<td colspan="3">No records found.</td> ';return{c(){e=g("tr"),e.innerHTML=r},l(s){e=v(s,"TR",{"data-svelte-h":!0}),C(e)!=="svelte-14ryxbm"&&(e.innerHTML=r)},m(s,u){L(s,e,u)},p:x,d(s){s&&p(e)}}}function $(o){var O,R;let e,r,s=o[1].updated+"",u,h,c,l=o[1].event+"",n,a,d,t=(o[1].admin||(Array.isArray(o[1].expand.user)?(O=o[1].expand.user[0])==null?void 0:O.name:(R=o[1].expand.user)==null?void 0:R.name)||o[1].user)+"",_,H,T,S="";return{c(){e=g("tr"),r=g("td"),u=A(s),h=M(),c=g("td"),n=A(l),a=M(),d=g("td"),_=A(t),H=M(),T=g("tr"),T.innerHTML=S},l(i){e=v(i,"TR",{});var f=b(e);r=v(f,"TD",{});var y=b(r);u=D(y,s),y.forEach(p),h=k(f),c=v(f,"TD",{});var E=b(c);n=D(E,l),E.forEach(p),a=k(f),d=v(f,"TD",{});var j=b(d);_=D(j,t),j.forEach(p),f.forEach(p),H=k(i),T=v(i,"TR",{"data-svelte-h":!0}),C(T)!=="svelte-cta9k3"&&(T.innerHTML=S)},m(i,f){L(i,e,f),m(e,r),m(r,u),m(e,h),m(e,c),m(c,n),m(e,a),m(e,d),m(d,_),L(i,H,f),L(i,T,f)},p(i,f){var y,E;f&1&&s!==(s=i[1].updated+"")&&w(u,s),f&1&&l!==(l=i[1].event+"")&&w(n,l),f&1&&t!==(t=(i[1].admin||(Array.isArray(i[1].expand.user)?(y=i[1].expand.user[0])==null?void 0:y.name:(E=i[1].expand.user)==null?void 0:E.name)||i[1].user)+"")&&w(_,t)},d(i){i&&(p(e),p(H),p(T))}}}function J(o){let e,r,s="<th>when</th> <th>what</th> <th>who</th>",u,h,c=q(o[0].logs),l=[];for(let a=0;a<c.length;a+=1)l[a]=$(B(o,c,a));let n=null;return c.length||(n=P()),{c(){e=g("table"),r=g("thead"),r.innerHTML=s,u=M(),h=g("tbody");for(let a=0;a<l.length;a+=1)l[a].c();n&&n.c()},l(a){e=v(a,"TABLE",{});var d=b(e);r=v(d,"THEAD",{"data-svelte-h":!0}),C(r)!=="svelte-1q8g7kt"&&(r.innerHTML=s),u=k(d),h=v(d,"TBODY",{});var t=b(h);for(let _=0;_<l.length;_+=1)l[_].l(t);n&&n.l(t),t.forEach(p),d.forEach(p)},m(a,d){L(a,e,d),m(e,r),m(e,u),m(e,h);for(let t=0;t<l.length;t+=1)l[t]&&l[t].m(h,null);n&&n.m(h,null)},p(a,[d]){if(d&1){c=q(a[0].logs);let t;for(t=0;t<c.length;t+=1){const _=B(a,c,t);l[t]?l[t].p(_,d):(l[t]=$(_),l[t].c(),l[t].m(h,null))}for(;t<l.length;t+=1)l[t].d(1);l.length=c.length,!c.length&&n?n.p(a,d):c.length?n&&(n.d(1),n=null):(n=P(),n.c(),n.m(h,null))}},i:x,o:x,d(a){a&&p(e),G(l,a),n&&n.d()}}}function K(o,e,r){let{data:s}=e;return o.$$set=u=>{"data"in u&&r(0,s=u.data)},[s]}class X extends N{constructor(e){super(),Y(this,e,K,J,F,{data:0})}}export{X as component,W as universal};

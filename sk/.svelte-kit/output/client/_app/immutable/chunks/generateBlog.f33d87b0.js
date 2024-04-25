import{s as Q,f as p,a as U,g as v,h as w,d as u,c as V,j as k,F as j,i as C,v as b,S,w as y,E as P,G as A,A as I,K as z,o as H,l as R,m as $,Q as T,n as W,T as M,U as B}from"./scheduler.c76fa77e.js";import{e as O,g as q,s as X,c as Y}from"./index.1c988bca.js";import{S as Z,i as x}from"./index.315486b9.js";import{a as m,p as ee,t as G,c as te,d as se,e as ae,f as oe,h as le}from"./api.31ef5791.js";import{w as ne}from"./index.b36f6ad1.js";import{a as F}from"./Alerts.f0e47bfd.js";import{c as re}from"./postService.6359b3df.js";const J=ne({selectedService:"",selectedModel:""});async function K(l){try{await l()}catch(e){const{message:o,data:{data:t={}}}=e;o&&F.error(o);for(const a in t){const{message:s}=t[a];s&&F.error(`${a}: ${s}`)}}}function L(l,e,o){const t=l.slice();return t[8]=e[o],t}function ce(l,e,o){const t=l.slice();return t[11]=e[o],t}function ie(l){let e,o=l[11].name+"",t;return{c(){e=p("option"),t=R(o),this.h()},l(a){e=v(a,"OPTION",{});var s=w(e);t=$(s,o),s.forEach(u),this.h()},h(){e.__value=l[11].name,T(e,e.__value)},m(a,s){C(a,e,s),b(e,t)},p:P,d(a){a&&u(e)}}}function D(l){var f;let e,o,t,a=O(((f=m.find(l[5]))==null?void 0:f.models)??[]),s=[];for(let n=0;n<a.length;n+=1)s[n]=N(L(l,a,n));return{c(){e=p("select");for(let n=0;n<s.length;n+=1)s[n].c();this.h()},l(n){e=v(n,"SELECT",{class:!0});var c=w(e);for(let r=0;r<s.length;r+=1)s[r].l(c);c.forEach(u),this.h()},h(){k(e,"class","select select-ghost w-full max-w-xs"),l[1]===void 0&&j(()=>l[6].call(e))},m(n,c){C(n,e,c);for(let r=0;r<s.length;r+=1)s[r]&&s[r].m(e,null);S(e,l[1],!0),o||(t=[y(e,"change",l[6]),y(e,"change",l[3])],o=!0)},p(n,c){var r;if(c&1){a=O(((r=m.find(n[5]))==null?void 0:r.models)??[]);let i;for(i=0;i<a.length;i+=1){const h=L(n,a,i);s[i]?s[i].p(h,c):(s[i]=N(h),s[i].c(),s[i].m(e,null))}for(;i<s.length;i+=1)s[i].d(1);s.length=a.length}c&3&&S(e,n[1])},d(n){n&&u(e),A(s,n),o=!1,I(t)}}}function N(l){let e,o=l[8]+"",t,a;return{c(){e=p("option"),t=R(o),this.h()},l(s){e=v(s,"OPTION",{});var f=w(e);t=$(f,o),f.forEach(u),this.h()},h(){e.__value=a=l[8],T(e,e.__value)},m(s,f){C(s,e,f),b(e,t)},p(s,f){f&1&&o!==(o=s[8]+"")&&W(t,o),f&1&&a!==(a=s[8])&&(e.__value=a,T(e,e.__value))},d(s){s&&u(e)}}}function fe(l){let e,o,t,a,s,f=O(m),n=[];for(let r=0;r<f.length;r+=1)n[r]=ie(ce(l,f,r));let c=l[0]&&D(l);return{c(){e=p("div"),o=p("select");for(let r=0;r<n.length;r+=1)n[r].c();t=U(),c&&c.c(),this.h()},l(r){e=v(r,"DIV",{class:!0});var i=w(e);o=v(i,"SELECT",{class:!0});var h=w(o);for(let _=0;_<n.length;_+=1)n[_].l(h);h.forEach(u),t=V(i),c&&c.l(i),i.forEach(u),this.h()},h(){k(o,"class","select select-ghost w-full max-w-xs"),l[0]===void 0&&j(()=>l[4].call(o)),k(e,"class","flex bg-primary items-center text-primary-content")},m(r,i){C(r,e,i),b(e,o);for(let h=0;h<n.length;h+=1)n[h]&&n[h].m(o,null);S(o,l[0],!0),b(e,t),c&&c.m(e,null),a||(s=[y(o,"change",l[4]),y(o,"change",l[2])],a=!0)},p(r,[i]){i&1&&S(o,r[0]),r[0]?c?c.p(r,i):(c=D(r),c.c(),c.m(e,null)):c&&(c.d(1),c=null)},i:P,o:P,d(r){r&&u(e),A(n,r),c&&c.d(),a=!1,I(s)}}}function he(l,e,o){var h,_;let{selectedService:t=((h=m[0])==null?void 0:h.name)??""}=e,{selectedModel:a=((_=m[0])==null?void 0:_.models[0])??""}=e;const s=z();H(()=>{var d;t||(o(0,t=m[0].name),s("serviceChange",t)),a||(o(1,a=((d=m.find(E=>E.name===t))==null?void 0:d.models[0])??""),s("modelChange",a))});function f(){var d;s("serviceChange",t),o(1,a=((d=m.find(E=>E.name===t))==null?void 0:d.models[0])??""),s("modelChange",a)}function n(){s("modelChange",a)}function c(){t=M(this),o(0,t)}const r=d=>d.name===t;function i(){a=M(this),o(1,a),o(0,t)}return l.$$set=d=>{"selectedService"in d&&o(0,t=d.selectedService),"selectedModel"in d&&o(1,a=d.selectedModel)},[t,a,f,n,c,r,i]}class we extends Z{constructor(e){super(),x(this,e,he,fe,Q,{selectedService:0,selectedModel:1})}}async function g(l,e,o){if(!l||!e){console.log("Selected service: ",l),console.log("Selected model: ",e);const s=m[0];l=s.name,e=s.models[0],console.log("Default service selected: ",l),console.log("Default model selected: ",e)}const t=await fetch(`/api/${l.toLowerCase()}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:o,model:e})});if(!t.ok)throw new Error("Network response was not ok");return(await t.json()).result}async function be(l,e,o){let t={title:"",slug:"",body:"",blogSummary:"",featuredImage:"",prompt:"",userid:o.id,tags:[]};try{const{selectedService:a,selectedModel:s}=B(J);t.body=await g(a,s,`${ee}'${l}'`),t.title=await g(a,s,`${G}'${t.body}'`);const f=await g(a,s,`${te}'${t.body}'`);t.blogSummary=await g(a,s,`${se}'${t.body}'`),t.slug=t.title.toLowerCase().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").substring(0,50),t.prompt=l;const n=f.split(",").map(h=>h.trim()).filter(h=>h),c=await ae(n);t.tags=c;const r=await g(a,s,`${oe}'${t.body}'`),i=await re(t,r,e);if(i!==void 0)q(`http://localhost:5173/posts/${i.slug}`);else throw new Error("Failed to create the post.")}catch(a){throw K(()=>`Failed to generate and save post: ${a}`),a}}async function Se(l,e,o){let t={title:"",content:"",post:e,slug:""};try{const{selectedService:a,selectedModel:s}=B(J),[f,n]=await Promise.all([g(a,s,`${le} + "  " + '${l}'`),g(a,s,`${G}'${l}'`)]);t.slug=n.toLowerCase().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").substring(0,50),t.content=f,t.title=n,await X("subpost",t,!0);const c=await Y.collection("posts").getOne(e);q(`http://localhost:5173//posts/${c.slug}`)}catch(a){throw K(()=>`Failed to generate and save subpost: ${a}`),a}}export{we as S,K as a,Se as b,be as g,J as s};

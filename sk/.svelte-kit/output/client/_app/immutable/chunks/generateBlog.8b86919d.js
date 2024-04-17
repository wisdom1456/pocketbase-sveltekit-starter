import{s as U,f as p,a as z,g as v,h as w,d,c as H,j as k,F as R,i as C,v as b,T as y,w as S,E as P,G as j,A,L as K,o as Q,l as I,m as $,R as T,n as W,U as F,V as B}from"./scheduler.edb94b3b.js";import{e as O,g as V,s as X,c as Y}from"./index.3c75d8e0.js";import{S as Z,i as x}from"./index.ab6f206b.js";import{a as u,p as ee,t as q,c as te,d as se,e as ae,f as oe,h as le}from"./prompts.20ccb13c.js";import{s as G}from"./stores.06d816ae.js";import{a as L}from"./Alerts.057b49a9.js";import{c as ne}from"./postService.05f00e28.js";async function J(l){try{await l()}catch(e){const{message:o,data:{data:t={}}}=e;o&&L.error(o);for(const a in t){const{message:s}=t[a];s&&L.error(`${a}: ${s}`)}}}function M(l,e,o){const t=l.slice();return t[8]=e[o],t}function re(l,e,o){const t=l.slice();return t[11]=e[o],t}function ie(l){let e,o=l[11].name+"",t;return{c(){e=p("option"),t=I(o),this.h()},l(a){e=v(a,"OPTION",{});var s=w(e);t=$(s,o),s.forEach(d),this.h()},h(){e.__value=l[11].name,T(e,e.__value)},m(a,s){C(a,e,s),b(e,t)},p:P,d(a){a&&d(e)}}}function D(l){var f;let e,o,t,a=O(((f=u.find(l[5]))==null?void 0:f.models)??[]),s=[];for(let n=0;n<a.length;n+=1)s[n]=N(M(l,a,n));return{c(){e=p("select");for(let n=0;n<s.length;n+=1)s[n].c();this.h()},l(n){e=v(n,"SELECT",{class:!0});var i=w(e);for(let r=0;r<s.length;r+=1)s[r].l(i);i.forEach(d),this.h()},h(){k(e,"class","select select-ghost w-full max-w-xs"),l[1]===void 0&&R(()=>l[6].call(e))},m(n,i){C(n,e,i);for(let r=0;r<s.length;r+=1)s[r]&&s[r].m(e,null);y(e,l[1],!0),o||(t=[S(e,"change",l[6]),S(e,"change",l[3])],o=!0)},p(n,i){var r;if(i&1){a=O(((r=u.find(n[5]))==null?void 0:r.models)??[]);let c;for(c=0;c<a.length;c+=1){const h=M(n,a,c);s[c]?s[c].p(h,i):(s[c]=N(h),s[c].c(),s[c].m(e,null))}for(;c<s.length;c+=1)s[c].d(1);s.length=a.length}i&3&&y(e,n[1])},d(n){n&&d(e),j(s,n),o=!1,A(t)}}}function N(l){let e,o=l[8]+"",t,a;return{c(){e=p("option"),t=I(o),this.h()},l(s){e=v(s,"OPTION",{});var f=w(e);t=$(f,o),f.forEach(d),this.h()},h(){e.__value=a=l[8],T(e,e.__value)},m(s,f){C(s,e,f),b(e,t)},p(s,f){f&1&&o!==(o=s[8]+"")&&W(t,o),f&1&&a!==(a=s[8])&&(e.__value=a,T(e,e.__value))},d(s){s&&d(e)}}}function ce(l){let e,o,t,a,s,f=O(u),n=[];for(let r=0;r<f.length;r+=1)n[r]=ie(re(l,f,r));let i=l[0]&&D(l);return{c(){e=p("div"),o=p("select");for(let r=0;r<n.length;r+=1)n[r].c();t=z(),i&&i.c(),this.h()},l(r){e=v(r,"DIV",{class:!0});var c=w(e);o=v(c,"SELECT",{class:!0});var h=w(o);for(let _=0;_<n.length;_+=1)n[_].l(h);h.forEach(d),t=H(c),i&&i.l(c),c.forEach(d),this.h()},h(){k(o,"class","select select-ghost w-full max-w-xs"),l[0]===void 0&&R(()=>l[4].call(o)),k(e,"class","flex bg-primary items-center text-primary-content")},m(r,c){C(r,e,c),b(e,o);for(let h=0;h<n.length;h+=1)n[h]&&n[h].m(o,null);y(o,l[0],!0),b(e,t),i&&i.m(e,null),a||(s=[S(o,"change",l[4]),S(o,"change",l[2])],a=!0)},p(r,[c]){c&1&&y(o,r[0]),r[0]?i?i.p(r,c):(i=D(r),i.c(),i.m(e,null)):i&&(i.d(1),i=null)},i:P,o:P,d(r){r&&d(e),j(n,r),i&&i.d(),a=!1,A(s)}}}function fe(l,e,o){var h,_;let{selectedService:t=((h=u[0])==null?void 0:h.name)??""}=e,{selectedModel:a=((_=u[0])==null?void 0:_.models[0])??""}=e;const s=K();Q(()=>{var m;t||(o(0,t=u[0].name),s("serviceChange",t)),a||(o(1,a=((m=u.find(E=>E.name===t))==null?void 0:m.models[0])??""),s("modelChange",a))});function f(){var m;s("serviceChange",t),o(1,a=((m=u.find(E=>E.name===t))==null?void 0:m.models[0])??""),s("modelChange",a)}function n(){s("modelChange",a)}function i(){t=F(this),o(0,t)}const r=m=>m.name===t;function c(){a=F(this),o(1,a),o(0,t)}return l.$$set=m=>{"selectedService"in m&&o(0,t=m.selectedService),"selectedModel"in m&&o(1,a=m.selectedModel)},[t,a,f,n,i,r,c]}class ve extends Z{constructor(e){super(),x(this,e,fe,ce,U,{selectedService:0,selectedModel:1})}}async function g(l,e,o){if(!l||!e){console.log("Selected service: ",l),console.log("Selected model: ",e);const s=u[0];l=s.name,e=s.models[0],console.log("Default service selected: ",l),console.log("Default model selected: ",e)}const t=await fetch(`/api/${l.toLowerCase()}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:o,model:e})});if(!t.ok)throw new Error("Network response was not ok");return(await t.json()).result}async function we(l,e,o){let t={title:"",slug:"",body:"",blogSummary:"",featuredImage:"",prompt:"",userid:o.id,tags:[]};try{const{selectedService:a,selectedModel:s}=B(G);t.body=await g(a,s,`${ee}'${l}'`),t.title=await g(a,s,`${q}'${t.body}'`);const f=await g(a,s,`${te}'${t.body}'`);t.blogSummary=await g(a,s,`${se}'${t.body}'`),t.slug=t.title.toLowerCase().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").substring(0,50),t.prompt=l;const n=f.split(",").map(h=>h.trim()).filter(h=>h),i=await ae(n);t.tags=i;const r=await g(a,s,`${oe}'${t.body}'`),c=await ne(t,r,e);if(c!==void 0)V(`http://localhost:8090/posts/${c.slug}/inspire`);else throw new Error("Failed to create the post.")}catch(a){throw J(()=>`Failed to generate and save post: ${a}`),a}}async function be(l,e,o){let t={title:"",content:"",post:e,slug:""};try{const{selectedService:a,selectedModel:s}=B(G),[f,n]=await Promise.all([g(a,s,`${le} + "  " + '${l}'`),g(a,s,`${q}'${l}'`)]);t.slug=n.toLowerCase().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").substring(0,50),t.content=f,t.title=n,await X("subpost",t,!0);const i=await Y.collection("posts").getOne(e);V(`http://localhost:8090/posts/${i.slug}`)}catch(a){throw J(()=>`Failed to generate and save subpost: ${a}`),a}}export{ve as S,J as a,be as b,we as g};

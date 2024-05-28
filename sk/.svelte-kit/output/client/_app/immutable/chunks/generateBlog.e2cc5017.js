import{s as Q,f as p,a as U,g as v,h as w,d as m,c as V,j as k,F as N,i as M,v as S,S as b,w as y,E as T,G as R,A as j,K as $,o as z,l as B,m as q,Q as O,n as H,T as D,U as C}from"./scheduler.c76fa77e.js";import{e as F,g as G,s as W,c as X}from"./index.23ea4071.js";import{S as Y,i as Z}from"./index.315486b9.js";import{a as u,p as x,t as J,c as ee,d as te,e as le,f as se,h as oe}from"./api.ff6b22b1.js";import{w as ae}from"./index.b36f6ad1.js";import{d as ne,a as K}from"./postService.2a4ca333.js";const E=ae({selectedService:"",selectedModel:""});function L(a,e,l){const t=a.slice();return t[8]=e[l],t}function ce(a,e,l){const t=a.slice();return t[11]=e[l],t}function re(a){let e,l=a[11].name+"",t;return{c(){e=p("option"),t=B(l),this.h()},l(o){e=v(o,"OPTION",{});var s=w(e);t=q(s,l),s.forEach(m),this.h()},h(){e.__value=a[11].name,O(e,e.__value)},m(o,s){M(o,e,s),S(e,t)},p:T,d(o){o&&m(e)}}}function A(a){var d;let e,l,t,o=F(((d=u.find(a[5]))==null?void 0:d.models)??[]),s=[];for(let n=0;n<o.length;n+=1)s[n]=I(L(a,o,n));return{c(){e=p("select");for(let n=0;n<s.length;n+=1)s[n].c();this.h()},l(n){e=v(n,"SELECT",{class:!0});var r=w(e);for(let c=0;c<s.length;c+=1)s[c].l(r);r.forEach(m),this.h()},h(){k(e,"class","select select-ghost w-full max-w-xs"),a[1]===void 0&&N(()=>a[6].call(e))},m(n,r){M(n,e,r);for(let c=0;c<s.length;c+=1)s[c]&&s[c].m(e,null);b(e,a[1],!0),l||(t=[y(e,"change",a[6]),y(e,"change",a[3])],l=!0)},p(n,r){var c;if(r&1){o=F(((c=u.find(n[5]))==null?void 0:c.models)??[]);let i;for(i=0;i<o.length;i+=1){const h=L(n,o,i);s[i]?s[i].p(h,r):(s[i]=I(h),s[i].c(),s[i].m(e,null))}for(;i<s.length;i+=1)s[i].d(1);s.length=o.length}r&3&&b(e,n[1])},d(n){n&&m(e),R(s,n),l=!1,j(t)}}}function I(a){let e,l=a[8]+"",t,o;return{c(){e=p("option"),t=B(l),this.h()},l(s){e=v(s,"OPTION",{});var d=w(e);t=q(d,l),d.forEach(m),this.h()},h(){e.__value=o=a[8],O(e,e.__value)},m(s,d){M(s,e,d),S(e,t)},p(s,d){d&1&&l!==(l=s[8]+"")&&H(t,l),d&1&&o!==(o=s[8])&&(e.__value=o,O(e,e.__value))},d(s){s&&m(e)}}}function ie(a){let e,l,t,o,s,d=F(u),n=[];for(let c=0;c<d.length;c+=1)n[c]=re(ce(a,d,c));let r=a[0]&&A(a);return{c(){e=p("div"),l=p("select");for(let c=0;c<n.length;c+=1)n[c].c();t=U(),r&&r.c(),this.h()},l(c){e=v(c,"DIV",{class:!0});var i=w(e);l=v(i,"SELECT",{class:!0});var h=w(l);for(let _=0;_<n.length;_+=1)n[_].l(h);h.forEach(m),t=V(i),r&&r.l(i),i.forEach(m),this.h()},h(){k(l,"class","select select-ghost w-full max-w-xs"),a[0]===void 0&&N(()=>a[4].call(l)),k(e,"class","flex items-center bg-primary text-primary-content")},m(c,i){M(c,e,i),S(e,l);for(let h=0;h<n.length;h+=1)n[h]&&n[h].m(l,null);b(l,a[0],!0),S(e,t),r&&r.m(e,null),o||(s=[y(l,"change",a[4]),y(l,"change",a[2])],o=!0)},p(c,[i]){i&1&&b(l,c[0]),c[0]?r?r.p(c,i):(r=A(c),r.c(),r.m(e,null)):r&&(r.d(1),r=null)},i:T,o:T,d(c){c&&m(e),R(n,c),r&&r.d(),o=!1,j(s)}}}function de(a,e,l){var h,_;let{selectedService:t=((h=u[0])==null?void 0:h.name)??""}=e,{selectedModel:o=((_=u[0])==null?void 0:_.models[0])??""}=e;const s=$();z(()=>{var f;t||(l(0,t=u[0].name),s("serviceChange",t)),o||(l(1,o=((f=u.find(P=>P.name===t))==null?void 0:f.models[0])??""),s("modelChange",o))});function d(){var f;s("serviceChange",t),l(1,o=((f=u.find(P=>P.name===t))==null?void 0:f.models[0])??""),s("modelChange",o)}function n(){s("modelChange",o)}function r(){t=D(this),l(0,t)}const c=f=>f.name===t;function i(){o=D(this),l(1,o),l(0,t)}return a.$$set=f=>{"selectedService"in f&&l(0,t=f.selectedService),"selectedModel"in f&&l(1,o=f.selectedModel)},[t,o,d,n,r,c,i]}class pe extends Y{constructor(e){super(),Z(this,e,de,ie,Q,{selectedService:0,selectedModel:1})}}async function g(a){try{console.log("Calling API...");let e=C(E).selectedService,l=C(E).selectedModel;if(!e||!l){console.log("Selected service: ",e),console.log("Selected model: ",l);const s=u[0];e=s.name,l=s.models[0],console.log("Default service selected: ",e),console.log("Default model selected: ",l)}const t=await fetch(`/api/${e.toLowerCase()}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:a,model:l})});if(console.log("Response:",t),!t.ok)throw new Error("Network response was not ok");const o=await t.json();return console.log("Data:",o),o.result}catch(e){throw console.error("Error:",e),e}}async function ve(a,e,l){let t={title:"",slug:"",body:"",blogSummary:"",featuredImage:"",prompt:"",userid:l.id,tags:[]};try{const{selectedService:o,selectedModel:s}=C(E);t.body=await g(`${x}'${a}'`),t.title=await g(`${J}'${t.body}'`);const d=await g(`${ee}'${t.body}'`);t.blogSummary=await g(`${te}'${t.body}'`),t.slug=t.title.toLowerCase().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").substring(0,50),t.prompt=a;const n=d.split(",").map(h=>h.trim()).filter(h=>h),r=await le(n);t.tags=r;const c=await g(`${se}'${t.body}'`),i=await ne(t,c,e);if(i!==void 0)G(`http://localhost:5173/posts/${i.slug}`);else throw new Error("Failed to create the post.")}catch(o){throw K(()=>`Failed to generate and save post: ${o}`),o}}async function we(a,e,l){let t={title:"",content:"",post:e,slug:""};try{const{selectedService:o,selectedModel:s}=C(E),[d,n]=await Promise.all([g(`${oe} + "  " + '${a}'`),g(`${J}'${a}'`)]);t.slug=n.toLowerCase().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").substring(0,50),t.content=d,t.title=n,await W("subpost",t,!0);const r=await X.collection("posts").getOne(e);G(`http://localhost:5173//posts/${r.slug}`)}catch(o){throw K(()=>`Failed to generate and save subpost: ${o}`),o}}export{pe as S,we as a,ve as g,E as s};

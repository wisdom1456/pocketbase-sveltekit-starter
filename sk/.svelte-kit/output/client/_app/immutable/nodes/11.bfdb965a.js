import{s as Te,C as he,o as Pe,p as me,f as v,a as N,g as k,h as M,c as x,d as _,j as p,i as b,v as C,B as ge,l as K,m as Q,u as J,w as se,n as re,G as Ge,A as Ne,e as be,M as ne,E as we}from"../chunks/scheduler.edb94b3b.js";import{S as xe,i as Ae,b as oe,d as ie,m as ae,a as O,t as R,e as ce,f as ve,g as Le,c as Ue}from"../chunks/index.ab6f206b.js";import{e as X,c as je,u as ze,d as De}from"../chunks/index.3c75d8e0.js";import{p as He}from"../chunks/stores.9c1bddb2.js";import{s as le}from"../chunks/stores.06d816ae.js";import{e as ke}from"../chunks/singletons.7ecd36fa.js";import"../chunks/Alerts.057b49a9.js";import"../chunks/marked.esm.c82fe51b.js";import{T as Oe}from"../chunks/TagGroup.80567f3c.js";import{S as Ve,b as Re}from"../chunks/generateBlog.8b86919d.js";import{a as $e}from"../chunks/prompts.20ccb13c.js";import{a as qe}from"../chunks/postService.05f00e28.js";import{L as Fe}from"../chunks/LoginGuard.b5c537ab.js";function Se(r,e,t){const l=r.slice();return l[17]=e[t],l}function ye(r,e,t){const l=r.slice();return l[20]=e[t],l}function We(r){const e=r.slice(),t=e[0].expand.featuredImage;e[23]=t;const l=e[23]&&e[23].file?je.getFileUrl(e[23],e[23].file):"";return e[24]=l,e}function Ce(r){let e,t,l,s=r[0].title+"",c,d,a,o,i="Clear Selection",u,f,h,$,T,q="Generate Inspiration",z,I,A,m="Tags",B,P,L,U,G,Y,F,D,Z,ue;function fe(n,g){var E;return(E=n[0].expand)!=null&&E.featuredImage?Ee:Je}function ee(n,g){return g===Ee?We(n):n}let j=fe(r),w=j(ee(r,j)),H=X(Be(r[0].body)),S=[];for(let n=0;n<H.length;n+=1)S[n]=Ie(Se(r,H,n));return P=new Oe({props:{post:r[0]}}),{c(){e=v("figure"),w.c(),t=N(),l=v("h1"),c=K(s),d=N(),a=v("section"),o=v("button"),o.textContent=i,u=N(),f=v("div");for(let n=0;n<S.length;n+=1)S[n].c();h=N(),$=v("div"),T=v("button"),T.textContent=q,z=N(),I=v("div"),A=v("h2"),A.textContent=m,B=N(),oe(P.$$.fragment),L=N(),U=v("div"),G=v("a"),Y=K("Audit Log"),this.h()},l(n){e=k(n,"FIGURE",{});var g=M(e);w.l(g),g.forEach(_),t=x(n),l=k(n,"H1",{class:!0});var E=M(l);c=Q(E,s),E.forEach(_),d=x(n),a=k(n,"SECTION",{class:!0});var y=M(a);o=k(y,"BUTTON",{class:!0,"data-svelte-h":!0}),J(o)!=="svelte-1uj8t42"&&(o.textContent=i),u=x(y),f=k(y,"DIV",{class:!0});var V=M(f);for(let te=0;te<S.length;te+=1)S[te].l(V);V.forEach(_),y.forEach(_),h=x(n),$=k(n,"DIV",{class:!0});var _e=M($);T=k(_e,"BUTTON",{class:!0,"data-svelte-h":!0}),J(T)!=="svelte-13w0bpf"&&(T.textContent=q),_e.forEach(_),z=x(n),I=k(n,"DIV",{class:!0});var W=M(I);A=k(W,"H2",{class:!0,"data-svelte-h":!0}),J(A)!=="svelte-1okzxs"&&(A.textContent=m),B=x(W),ie(P.$$.fragment,W),W.forEach(_),L=x(n),U=k(n,"DIV",{class:!0});var pe=M(U);G=k(pe,"A",{href:!0,class:!0});var de=M(G);Y=Q(de,"Audit Log"),de.forEach(_),pe.forEach(_),this.h()},h(){p(l,"class","mb-4 text-4xl font-bold"),p(o,"class","btn btn-block mt-2 text-center"),p(f,"class","mt-8"),p(a,"class","mt-8"),p(T,"class","btn btn-block mt-2 text-center"),p($,"class","align-right mt-8"),p(A,"class","w-screen text-2xl"),p(I,"class",""),p(G,"href",F=`${ke}/auditlog/posts/${r[0].id}`),p(G,"class","btn btn-primary"),p(U,"class","mt-8 text-center")},m(n,g){b(n,e,g),w.m(e,null),b(n,t,g),b(n,l,g),C(l,c),b(n,d,g),b(n,a,g),C(a,o),C(a,u),C(a,f);for(let E=0;E<S.length;E+=1)S[E]&&S[E].m(f,null);b(n,h,g),b(n,$,g),C($,T),b(n,z,g),b(n,I,g),C(I,A),C(I,B),ae(P,I,null),b(n,L,g),b(n,U,g),C(U,G),C(G,Y),D=!0,Z||(ue=[se(o,"click",r[12]),se(T,"click",r[14])],Z=!0)},p(n,g){if(j===(j=fe(n))&&w?w.p(ee(n,j),g):(w.d(1),w=j(ee(n,j)),w&&(w.c(),w.m(e,null))),(!D||g&1)&&s!==(s=n[0].title+"")&&re(c,s),g&265){H=X(Be(n[0].body));let y;for(y=0;y<H.length;y+=1){const V=Se(n,H,y);S[y]?S[y].p(V,g):(S[y]=Ie(V),S[y].c(),S[y].m(f,null))}for(;y<S.length;y+=1)S[y].d(1);S.length=H.length}const E={};g&1&&(E.post=n[0]),P.$set(E),(!D||g&1&&F!==(F=`${ke}/auditlog/posts/${n[0].id}`))&&p(G,"href",F)},i(n){D||(O(P.$$.fragment,n),D=!0)},o(n){R(P.$$.fragment,n),D=!1},d(n){n&&(_(e),_(t),_(l),_(d),_(a),_(h),_($),_(z),_(I),_(L),_(U)),w.d(),Ge(S,n),ce(P),Z=!1,Ne(ue)}}}function Je(r){let e,t;return{c(){e=v("img"),this.h()},l(l){e=k(l,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){ne(e.src,t="https://via.placeholder.com/800x400.png?text=AI+Blog")||p(e,"src",t),p(e,"alt","Placeholder"),p(e,"class","aspect-[16/9] w-full object-cover sm:aspect-[2/1] lg:aspect-[3/2]")},m(l,s){b(l,e,s)},p:we,d(l){l&&_(e)}}}function Ee(r){let e,t,l;return{c(){e=v("img"),this.h()},l(s){e=k(s,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){ne(e.src,t=r[24])||p(e,"src",t),p(e,"alt",l=r[0].title),p(e,"class","aspect-[16/9] w-full object-cover sm:aspect-[2/1] lg:aspect-[3/2]")},m(s,c){b(s,e,c)},p(s,c){c&1&&!ne(e.src,t=s[24])&&p(e,"src",t),c&1&&l!==(l=s[0].title)&&p(e,"alt",l)},d(s){s&&_(e)}}}function Ke(r){let e,t="No key takeaways found in this section.";return{c(){e=v("p"),e.textContent=t},l(l){e=k(l,"P",{"data-svelte-h":!0}),J(e)!=="svelte-7lvizu"&&(e.textContent=t)},m(l,s){b(l,e,s)},p:we,d(l){l&&_(e)}}}function Qe(r){let e,t=[],l=new Map,s,c=X(r[17].bullets);const d=a=>a[20];for(let a=0;a<c.length;a+=1){let o=ye(r,c,a),i=d(o);l.set(i,t[a]=Me(i,o))}return{c(){e=v("ul");for(let a=0;a<t.length;a+=1)t[a].c();s=N(),this.h()},l(a){e=k(a,"UL",{class:!0});var o=M(e);for(let i=0;i<t.length;i+=1)t[i].l(o);s=x(o),o.forEach(_),this.h()},h(){p(e,"class","list-disc pl-6")},m(a,o){b(a,e,o);for(let i=0;i<t.length;i+=1)t[i]&&t[i].m(e,null);C(e,s)},p(a,o){o&265&&(c=X(a[17].bullets),t=ze(t,o,d,1,a,c,l,e,De,Me,s,ye))},d(a){a&&_(e);for(let o=0;o<t.length;o+=1)t[o].d()}}}function Me(r,e){let t,l,s=e[20]+"",c,d,a,o,i;function u(){return e[13](e[20])}return{key:r,first:null,c(){t=v("li"),l=v("button"),c=K(s),this.h()},l(f){t=k(f,"LI",{class:!0});var h=M(t);l=k(h,"BUTTON",{class:!0,"aria-label":!0,type:!0});var $=M(l);c=Q($,s),$.forEach(_),h.forEach(_),this.h()},h(){p(l,"class",d=`bullet-point hover:bg-primary flex cursor-pointer items-baseline px-4 py-2 text-left transition duration-200 ease-in-out ${e[3].includes(e[20])?"bg-primary text-primary-content":""}`),p(l,"aria-label",a=`Bullet point: ${e[20]}`),p(l,"type","button"),p(t,"class","mb-2"),this.first=t},m(f,h){b(f,t,h),C(t,l),C(l,c),o||(i=se(l,"click",u),o=!0)},p(f,h){e=f,h&1&&s!==(s=e[20]+"")&&re(c,s),h&9&&d!==(d=`bullet-point hover:bg-primary flex cursor-pointer items-baseline px-4 py-2 text-left transition duration-200 ease-in-out ${e[3].includes(e[20])?"bg-primary text-primary-content":""}`)&&p(l,"class",d),h&1&&a!==(a=`Bullet point: ${e[20]}`)&&p(l,"aria-label",a)},d(f){f&&_(t),o=!1,i()}}}function Ie(r){let e,t=r[17].heading+"",l,s,c;function d(i,u){return i[17].bullets.length>0?Qe:Ke}let a=d(r),o=a(r);return{c(){e=v("h2"),l=K(t),s=N(),o.c(),c=be(),this.h()},l(i){e=k(i,"H2",{class:!0});var u=M(e);l=Q(u,t),u.forEach(_),s=x(i),o.l(i),c=be(),this.h()},h(){p(e,"class","text-2xl font-bold")},m(i,u){b(i,e,u),C(e,l),b(i,s,u),o.m(i,u),b(i,c,u)},p(i,u){u&1&&t!==(t=i[17].heading+"")&&re(l,t),a===(a=d(i))&&o?o.p(i,u):(o.d(1),o=a(i),o&&(o.c(),o.m(c.parentNode,c)))},d(i){i&&(_(e),_(s),_(c)),o.d(i)}}}function Xe(r){let e,t,l,s,c,d;function a(f){r[10](f)}function o(f){r[11](f)}let i={};r[1]!==void 0&&(i.selectedService=r[1]),r[2]!==void 0&&(i.selectedModel=r[2]),t=new Ve({props:i}),me.push(()=>ve(t,"selectedService",a)),me.push(()=>ve(t,"selectedModel",o)),t.$on("serviceChange",r[6]),t.$on("modelChange",r[7]);let u=r[0]&&Ce(r);return{c(){e=v("main"),oe(t.$$.fragment),c=N(),u&&u.c(),this.h()},l(f){e=k(f,"MAIN",{class:!0});var h=M(e);ie(t.$$.fragment,h),c=x(h),u&&u.l(h),h.forEach(_),this.h()},h(){p(e,"class","prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto p-4")},m(f,h){b(f,e,h),ae(t,e,null),C(e,c),u&&u.m(e,null),d=!0},p(f,h){const $={};!l&&h&2&&(l=!0,$.selectedService=f[1],ge(()=>l=!1)),!s&&h&4&&(s=!0,$.selectedModel=f[2],ge(()=>s=!1)),t.$set($),f[0]?u?(u.p(f,h),h&1&&O(u,1)):(u=Ce(f),u.c(),O(u,1),u.m(e,null)):u&&(Le(),R(u,1,1,()=>{u=null}),Ue())},i(f){d||(O(t.$$.fragment,f),O(u),d=!0)},o(f){R(t.$$.fragment,f),R(u),d=!1},d(f){f&&_(e),ce(t),u&&u.d()}}}function Ye(r){let e,t;return e=new Fe({props:{$$slots:{default:[Xe]},$$scope:{ctx:r}}}),{c(){oe(e.$$.fragment)},l(l){ie(e.$$.fragment,l)},m(l,s){ae(e,l,s),t=!0},p(l,[s]){const c={};s&33554463&&(c.$$scope={dirty:s,ctx:l}),e.$set(c)},i(l){t||(O(e.$$.fragment,l),t=!0)},o(l){R(e.$$.fragment,l),t=!1},d(l){ce(e,l)}}}function Be(r){const e=[],t=r.split(`
`);let l="",s=[];for(const c of t)if(c.startsWith("#"))l&&s.length>0&&e.push({heading:l,bullets:s}),l=c.replace(/^#+\s*/,"").trim(),s=[];else if(c.match(/^\s*[-*]\s+(.+)/)){const d=c.replace(/^\s*[-*]\s+/,"").trim();s.push(d)}return l&&s.length>0&&e.push({heading:l,bullets:s}),e}function Ze(r,e,t){let l,s,c;he(r,He,m=>t(9,s=m)),he(r,le,m=>t(4,c=m));let d=$e[0].name,a=$e[0].models[0],o,i=[];Pe(async()=>{try{t(0,o=await qe(l)),console.log("Received slug:",l),o||console.log("Post not found")}catch(m){console.error("Error fetching post:",m)}});const u=()=>i.join("/n ");function f(m){t(1,d=m.detail),le.update(B=>({...B,selectedService:d}))}function h(m){t(2,a=m.detail),le.update(B=>({...B,selectedModel:a}))}function $(m){i.includes(m)?t(3,i=i.filter(B=>B!==m)):t(3,i=[...i,m])}function T(m){d=m,t(1,d)}function q(m){a=m,t(2,a)}const z=()=>t(3,i=[]),I=m=>$(m),A=()=>{c&&o?Re(u(),o.id):console.error("Service model selection is not set")};return r.$$.update=()=>{r.$$.dirty&512&&(l=s.params.slug),r.$$.dirty&1&&o&&o.body.replace(/^(#+)\s+(.*)/gm,(m,B,P)=>{const L=B.length,G=`${`text-${4-L+1}xl`} font-bold mb-4`;return`<h${L} class="${G}">${P}</h${L}>`})},[o,d,a,i,c,u,f,h,$,s,T,q,z,I,A]}class pt extends xe{constructor(e){super(),Ae(this,e,Ze,Ye,Te,{})}}export{pt as component};

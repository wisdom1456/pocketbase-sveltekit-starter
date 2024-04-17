import{s as le,C as ae,J as q,o as se,a as C,e as z,c as T,i as E,d as p,f as g,l as re,g as v,h as y,u as X,m as oe,j as c,v as h,n as ne,E as M,M as A}from"../chunks/scheduler.edb94b3b.js";import{h as B,u as ie}from"../chunks/LoginForm.9ae425e7.js";import{e as J,u as ce,c as R,o as ue}from"../chunks/index.3c75d8e0.js";import{S as fe,i as me,b as Y,d as Z,m as ee,a as F,t as N,e as te,g as de,c as pe}from"../chunks/index.ab6f206b.js";import{m as H}from"../chunks/stores.06d816ae.js";import"../chunks/Alerts.057b49a9.js";import{S as _e}from"../chunks/SvelteMarkdown.98296c2c.js";import{w as he}from"../chunks/singletons.7ecd36fa.js";import{f as ge}from"../chunks/postService.05f00e28.js";import{L as ve}from"../chunks/LoginGuard.b5c537ab.js";const He=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),be=he([]);function K(i,e,a){const t=i.slice();return t[4]=e[a],t}function ke(i){return{c:M,l:M,m:M,p:M,d:M}}function $e(i){let e,a,t;return{c(){e=g("img"),this.h()},l(l){e=v(l,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){A(e.src,a=i[7])||c(e,"src",a),c(e,"alt",t=i[4].title),c(e,"class","aspect-[16/9] w-full object-cover sm:aspect-[2/1] lg:aspect-[3/2]")},m(l,n){E(l,e,n)},p(l,n){n&1&&!A(e.src,a=l[7])&&c(e,"src",a),n&1&&t!==(t=l[4].title)&&c(e,"alt",t)},d(l){l&&p(e)}}}function we(i){let e,a;return{c(){e=g("img"),this.h()},l(t){e=v(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){A(e.src,a="https://via.placeholder.com/800x400.png?text=Loading...")||c(e,"src",a),c(e,"alt","Loading..."),c(e,"class","aspect-[16/9] w-full object-cover sm:aspect-[2/1] lg:aspect-[3/2]")},m(t,l){E(t,e,l)},p:M,d(t){t&&p(e)}}}function Q(i,e){let a,t,l,n,u,f,o,s="",r,m,k,S=e[4].title+"",j,L,G,I,$,x,d={ctx:e,current:null,token:null,hasCatch:!1,pending:we,then:$e,catch:ke,value:7};return B(n=e[1](e[4]),d),$=new _e({props:{source:e[4].blogSummary||e[4].body}}),{key:i,first:null,c(){a=g("div"),t=g("div"),l=g("figure"),d.block.c(),u=C(),f=g("div"),o=g("div"),o.innerHTML=s,r=C(),m=g("div"),k=g("a"),j=re(S),G=C(),I=g("div"),Y($.$$.fragment),this.h()},l(_){a=v(_,"DIV",{class:!0});var b=y(a);t=v(b,"DIV",{});var w=y(t);l=v(w,"FIGURE",{});var O=y(l);d.block.l(O),O.forEach(p),u=T(w),f=v(w,"DIV",{class:!0});var D=y(f);o=v(D,"DIV",{class:!0,"data-svelte-h":!0}),X(o)!=="svelte-d0t448"&&(o.innerHTML=s),r=T(D),m=v(D,"DIV",{class:!0});var V=y(m);k=v(V,"A",{href:!0,class:!0});var P=y(k);j=oe(P,S),P.forEach(p),G=T(V),I=v(V,"DIV",{class:!0});var U=y(I);Z($.$$.fragment,U),U.forEach(p),V.forEach(p),D.forEach(p),w.forEach(p),b.forEach(p),this.h()},h(){c(o,"class","prose items-center gap-x-4"),c(k,"href",L=`/posts/${e[4].slug}`),c(k,"class","prose-lg text-primary line-clamp-2 font-bold"),c(I,"class","prose-sm text-base-content mt-3 line-clamp-6 text-justify"),c(m,"class","group relative mt-3"),c(f,"class","m-4 max-w-xl"),c(a,"class","card bg-base-300 flex w-full flex-col justify-between p-4 shadow-xl"),this.first=a},m(_,b){E(_,a,b),h(a,t),h(t,l),d.block.m(l,d.anchor=null),d.mount=()=>l,d.anchor=null,h(t,u),h(t,f),h(f,o),h(f,r),h(f,m),h(m,k),h(k,j),h(m,G),h(m,I),ee($,I,null),x=!0},p(_,b){e=_,d.ctx=e,b&1&&n!==(n=e[1](e[4]))&&B(n,d)||ie(d,e,b),(!x||b&1)&&S!==(S=e[4].title+"")&&ne(j,S),(!x||b&1&&L!==(L=`/posts/${e[4].slug}`))&&c(k,"href",L);const w={};b&1&&(w.source=e[4].blogSummary||e[4].body),$.$set(w)},i(_){x||(F($.$$.fragment,_),x=!0)},o(_){N($.$$.fragment,_),x=!1},d(_){_&&p(a),d.block.d(),d.token=null,d=null,te($)}}}function W(i){let e,a='<div><div class="m-4 max-w-xl"><div class="prose items-center gap-x-4"><div class="text-accent">No posts found</div></div></div></div>';return{c(){e=g("div"),e.innerHTML=a,this.h()},l(t){e=v(t,"DIV",{class:!0,"data-svelte-h":!0}),X(e)!=="svelte-nr63l2"&&(e.innerHTML=a),this.h()},h(){c(e,"class","card bg-base-300 flex w-full flex-col justify-between p-4 shadow-xl")},m(t,l){E(t,e,l)},d(t){t&&p(e)}}}function ye(i){let e=[],a=new Map,t,l,n,u=J(i[0]);const f=s=>s[4].id;for(let s=0;s<u.length;s+=1){let r=K(i,u,s),m=f(r);a.set(m,e[s]=Q(m,r))}let o=i[0].length===0&&W();return{c(){for(let s=0;s<e.length;s+=1)e[s].c();t=C(),o&&o.c(),l=z()},l(s){for(let r=0;r<e.length;r+=1)e[r].l(s);t=T(s),o&&o.l(s),l=z()},m(s,r){for(let m=0;m<e.length;m+=1)e[m]&&e[m].m(s,r);E(s,t,r),o&&o.m(s,r),E(s,l,r),n=!0},p(s,r){r&3&&(u=J(s[0]),de(),e=ce(e,r,f,1,s,u,a,t.parentNode,ue,Q,t,K),pe()),s[0].length===0?o||(o=W(),o.c(),o.m(l.parentNode,l)):o&&(o.d(1),o=null)},i(s){if(!n){for(let r=0;r<u.length;r+=1)F(e[r]);n=!0}},o(s){for(let r=0;r<e.length;r+=1)N(e[r]);n=!1},d(s){s&&(p(t),p(l));for(let r=0;r<e.length;r+=1)e[r].d(s);o&&o.d(s)}}}function Ie(i){let e,a;return e=new ve({props:{$$slots:{default:[ye]},$$scope:{ctx:i}}}),{c(){Y(e.$$.fragment)},l(t){Z(e.$$.fragment,t)},m(t,l){ee(e,t,l),a=!0},p(t,[l]){const n={};l&257&&(n.$$scope={dirty:l,ctx:t}),e.$set(n)},i(t){a||(F(e.$$.fragment,t),a=!0)},o(t){N(e.$$.fragment,t),a=!1},d(t){te(e,t)}}}function xe(i,e,a){let t;ae(i,H,u=>a(2,t=u));async function l(u){if(u.featuredImage){const f=await R.collection("images").getOne(u.featuredImage);if(f&&f.file)return R.getFileUrl(f,f.file)}return"https://via.placeholder.com/800x400.png?text=AI+Blog"}q(H,t.title="",t),q(H,t.description="AI powered note taking",t);let n=[];return se(async()=>{await ge()}),be.subscribe(u=>{a(0,n=u)}),[n,l]}class Ae extends fe{constructor(e){super(),me(this,e,xe,Ie,le,{})}}export{Ae as component,He as universal};

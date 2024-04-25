import{c}from"./index.1c988bca.js";import{w as u}from"./index.b36f6ad1.js";async function l(e){var a;if((a=e.expand)!=null&&a.featuredImage){const t=e.expand.featuredImage;if("file"in t&&"id"in t&&"collectionId"in t&&"collectionName"in t)try{return c.getFileUrl(t,t.file)}catch(o){return console.error("Error getting featured image URL:",o),"https://via.placeholder.com/800x400.png?text=cool+wind"}}}async function g(e){var a;if((a=e.expand)!=null&&a.tags)return e.expand.tags.map(t=>t.title);if(e.tags&&e.tags.length>0){const t=e.tags.map(o=>`id = "${o}"`).join(" || ");try{return(await c.collection("tags").getFullList(void 0,{filter:t})).map(r=>r.title)}catch(o){return console.error("Error fetching tags:",o),[]}}return[]}async function i(e){const a=await l(e),t=await g(e);return{...e,featuredImage:a,tags:t}}async function w(e=1,a=20){try{const t=await c.collection("posts").getList(e,a,{sort:"-updated",expand:"featuredImage,tags"}),r={posts:await Promise.all(t.items.map(i)),page:t.page,perPage:t.perPage,totalPages:t.totalPages};return p.set(r),r}catch(t){return console.error("Error fetching posts:",t),null}}async function h(e){try{const a=encodeURIComponent(e),t=await c.collection("posts").getFirstListItem(`slug = "${a}"`,{expand:"featuredImage,tags"});return await i(t)}catch(a){throw console.error("Error fetching post:",a),a}}async function y(e,a,t){try{const o=await d(a,t);e.featuredImage=o;const r=await c.collection("posts").create(e),s=await i(r);return p.update(n=>({...n,posts:[...n.posts,s]})),s}catch(o){return console.error("Error creating post:",o),null}}async function d(e,a){const t=await fetch("/api/dreamstudio",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:e})});if(!t.ok)throw new Error("Failed to upload image");const o=await t.json();return console.log("Image data:",o),o.id}async function I(e,a){try{const t=await c.collection("posts").update(e,a),o=await i(t);return p.update(r=>{const s=r.posts.findIndex(n=>n.id===e);if(s!==-1){const n=[...r.posts];return n[s]=o,{...r,posts:n}}return r}),o}catch(t){return console.error("Error updating post:",t),null}}function f(){const{subscribe:e,set:a,update:t}=u({posts:[],page:1,perPage:20,totalPages:1});return{subscribe:e,set:a,update:t,appendPosts:(o,r)=>t(s=>({...s,posts:[...s.posts,...o],totalPages:r})),reset:()=>a({posts:[],page:1,perPage:20,totalPages:1})}}const p=f();export{h as a,y as c,w as f,p,I as u};

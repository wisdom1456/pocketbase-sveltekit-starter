import{_ as x,$ as l}from"./scheduler.c76fa77e.js";function $(o){const t=o-1;return t*t*t+1}function S(o,{delay:t=0,duration:s=400,easing:c=x}={}){const a=+getComputedStyle(o).opacity;return{delay:t,duration:s,easing:c,css:r=>`opacity: ${r*a}`}}function U(o,{delay:t=0,duration:s=400,easing:c=$,x:a=0,y:r=0,opacity:e=0}={}){const n=getComputedStyle(o),i=+n.opacity,y=n.transform==="none"?"":n.transform,u=i*(1-e),[p,f]=l(a),[d,_]=l(r);return{delay:t,duration:s,easing:c,css:(m,g)=>`
			transform: ${y} translate(${(1-m)*p}${f}, ${(1-m)*d}${_});
			opacity: ${i-u*g}`}}function V(o,{delay:t=0,duration:s=400,easing:c=$,start:a=0,opacity:r=0}={}){const e=getComputedStyle(o),n=+e.opacity,i=e.transform==="none"?"":e.transform,y=1-a,u=n*(1-r);return{delay:t,duration:s,easing:c,css:(p,f)=>`
			transform: ${i} scale(${1-y*f});
			opacity: ${n-u*f}
		`}}export{S as a,U as f,V as s};

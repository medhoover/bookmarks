import{S as a,i as c,s as u,e as f,a as d,b as p,n as i,d as m}from"./vendor.4f72163b.js";const g=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}};g();function h(l){let t;return{c(){t=f("main"),t.innerHTML=`<h1>Hello User!</h1> 

  <p>This project is getting made at the moment.</p>`,d(t,"class","svelte-1vlrom")},m(n,o){p(n,t,o)},p:i,i,o:i,d(n){n&&m(t)}}}class y extends a{constructor(t){super();c(this,t,null,h,u,{})}}new y({target:document.getElementById("app")});

/* Shared sky only. The original opt-in pet lives in pet.js. */
(() => {
'use strict';
const $=id=>document.getElementById(id),canvas=$('stars'),ctx=canvas?.getContext('2d'),toggle=$('motion'),comet=$('comet'),status=$('sky-status'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
if($('year'))$('year').textContent=new Date().getFullYear();
let manual=false;try{manual=localStorage.getItem('sb-motion')==='paused';}catch{}
let w=0,h=0,stars=[],raf=0,last=0,elapsed=0,nextComet=18,flight=null,warpUntil=0;
const paused=()=>manual||reduced.matches;
function resize(){w=innerWidth;h=innerHeight;if(!ctx)return;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);stars=Array.from({length:Math.min(160,Math.max(35,Math.round(w*h/8000)))},()=>({x:(Math.random()-.5)*w,y:(Math.random()-.5)*h,z:.15+Math.random()*.85,size:.3+Math.random(),hue:Math.random()>.5?185:270}));paint(0);}
function paint(dt){if(!ctx)return;ctx.clearRect(0,0,w,h);const speed=elapsed<warpUntil?.48:.055;for(const s of stars){const old=s.z;s.z-=dt*speed;if(s.z<.1){s.z=1;continue;}const x=w/2+s.x/s.z,y=h/2+s.y/s.z;if(x<0||x>w||y<0||y>h)continue;ctx.fillStyle=`hsla(${s.hue},95%,85%,${Math.min(.9,.25+(1-s.z)*.6)})`;ctx.beginPath();ctx.arc(x,y,Math.min(2.2,s.size/s.z),0,Math.PI*2);ctx.fill();if(dt&&elapsed<warpUntil){ctx.strokeStyle=ctx.fillStyle;ctx.beginPath();ctx.moveTo(w/2+s.x/old,h/2+s.y/old);ctx.lineTo(x,y);ctx.stroke();}}}
function spawn(){if(!comet||paused()||document.hidden)return false;flight={t:0,y:50+Math.random()*h*.5};comet.hidden=false;return true;}
function loop(time){raf=0;if(paused()||document.hidden)return;if(last&&time-last<32){raf=requestAnimationFrame(loop);return;}const dt=last?Math.min((time-last)/1000,.06):0;last=time;elapsed+=dt;paint(dt);if(elapsed>nextComet){if(!flight)spawn();nextComet=elapsed+25+Math.random()*20;}if(flight&&comet){flight.t+=dt;const p=flight.t/7;comet.style.transform=`translate(${-110+(w+240)*p}px,${flight.y+p*110}px) rotate(12deg)`;if(p>1){flight=null;comet.hidden=true;}}raf=requestAnimationFrame(loop);}
function sync(){cancelAnimationFrame(raf);raf=0;last=0;document.body.classList.toggle('motion-paused',paused());if(toggle){toggle.disabled=reduced.matches;toggle.textContent=reduced.matches?'Reduced motion':manual?'Resume motion':'Pause motion';toggle.setAttribute('aria-pressed',String(paused()));}if(paused()&&comet){flight=null;comet.hidden=true;}if(!paused()&&!document.hidden)raf=requestAnimationFrame(loop);}
function set(value){manual=value;try{localStorage.setItem('sb-motion',manual?'paused':'running');}catch{}sync();}
toggle?.addEventListener('click',()=>set(!manual));reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);addEventListener('resize',resize);
comet?.addEventListener('click',()=>{flight=null;comet.hidden=true;document.body.classList.toggle('egg');if(status)status.textContent='Comet caught. Hidden nebula palette toggled.';});
addEventListener('observatory:sky',e=>{const action=e.detail;if(action==='pause')set(true);if(action==='resume')set(false);if(action==='warp'&&!paused())warpUntil=elapsed+3;if(action==='comet')spawn();if(action==='campaign-reset'){document.body.classList.remove('egg');warpUntil=0;flight=null;nextComet=elapsed+18;if(comet)comet.hidden=true;}});resize();sync();
})();

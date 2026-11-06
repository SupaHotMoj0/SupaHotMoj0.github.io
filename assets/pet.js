/* SPDX-License-Identifier: MIT
 * Bami Habitat — original vector artwork and behavior, 2026.
 * Inspired by the desktop-pet genre and adryd325/oneko.js; no upstream code or sprites copied.
 */
(() => {
'use strict';
if(document.getElementById('pet-habitat'))return;
const NS='http://www.w3.org/2000/svg',reduced=matchMedia('(prefers-reduced-motion: reduce)');
const root=document.createElement('div');root.id='pet-habitat';root.className='pet-habitat';
root.innerHTML=`<div class="habitat-orbit" aria-hidden="true"></div>
<button id="pet-earth" type="button" aria-label="Wake the cat on its tiny Earth" aria-pressed="false"><svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="bami-ocean" cx="32%" cy="25%" r="85%"><stop stop-color="#58cce2"/><stop offset=".4" stop-color="#176478"/><stop offset=".75" stop-color="#0c2b43"/><stop offset="1" stop-color="#030b1b"/></radialGradient><radialGradient id="bami-shade" cx="20%" cy="20%" r="85%"><stop offset=".4" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".85"/></radialGradient><clipPath id="bami-disc"><circle cx="50" cy="50" r="35"/></clipPath></defs><circle class="planet-atmosphere" cx="50" cy="50" r="38"/><circle cx="50" cy="50" r="35" fill="url(#bami-ocean)"/><g clip-path="url(#bami-disc)" class="planet-land" fill="#73bba1"><path d="m14 27 14-8 13 4 3 7-9 7-2 9-10 2-7-7-9-2zm25 20 10 4 8 13-6 13-6 9-5-9 1-9-7-11zm20-31 15 4 9 10-4 8-10-3-6 8-9-4-3-9zm9 34 15-5 12 9-4 9-13 1-8-7zm4 22 12-1 7 6-7 7-12-3z"/><path d="m6 52 8 3 3 6-9 6zm41-40 8 3-2 4-6-1" fill="#c0e2d1"/><g fill="none" stroke="#d6f8ff" stroke-width="1.8" opacity=".45"><path d="M15 31q22-13 44-5m-34 40q15 5 27 1m11-18q17-6 25 1"/><path d="m23 24 12-3m29 55 12-1"/></g></g><circle cx="50" cy="50" r="35" fill="url(#bami-shade)"/><path d="M22 30A35 35 0 0 1 66 19" stroke="#b9f9ed" stroke-width="1.2" fill="none" opacity=".7"/><ellipse cx="50" cy="53" rx="47" ry="13" transform="rotate(-25 50 53)" fill="none" stroke="#96dfff" stroke-width=".6" opacity=".3"/><circle class="planet-satellite" cx="88" cy="28" r="2" fill="#beeedf"/></svg><span class="habitat-caption" aria-hidden="true">a small blue world</span></button>
<button id="pet-house" type="button" aria-label="Call the cat home" hidden><svg viewBox="0 0 70 60" aria-hidden="true"><path class="house-pad" d="m9 51 26-6 26 6-26 7z" fill="#0a1c1a" stroke="#7cffac" stroke-width=".7"/><path d="M19 48V28l16-13 16 13v20" fill="#0b1215" stroke="#739e9b" stroke-width="1"/><path d="m11 30 24-20 24 20-5 5-19-15-19 15z" fill="#151c24" stroke="#84969c" stroke-width="1"/><path d="M29 49V36q6-12 12 0v13" fill="#020506" stroke="#7cffac" stroke-width=".8"/><path d="M42 16v-9h6v14" fill="#111a20" stroke="#84969c" stroke-width=".8"/><circle cx="35" cy="28" r="1.2" fill="#9bff9d"/><path class="house-smoke" d="M45 6q-5-4 0-8t0-8" fill="none" stroke="#79dda7" stroke-width="1" opacity=".4"/></svg></button>`;
const cat=document.createElement('button');cat.id='space-cat';cat.className='habitat-cat';cat.type='button';cat.hidden=true;cat.setAttribute('aria-label','Pet the black neon cat. Hold for its ancient control panel.');cat.setAttribute('aria-haspopup','dialog');cat.setAttribute('aria-controls','pet-console');cat.setAttribute('aria-expanded','false');
cat.innerHTML=`<svg viewBox="0 0 100 80" aria-hidden="true"><path class="pet-tail" d="M70 59Q99 50 88 27" fill="none" stroke="#070b0d" stroke-width="9" stroke-linecap="round"/><path class="pet-tail" d="M70 59Q99 50 88 27" fill="none" stroke="#6cf8c0" stroke-width="1.1" stroke-linecap="round"/><g class="pet-body" fill="#05080b" stroke="#78c0ae" stroke-width="1"><ellipse cx="50" cy="60" rx="23" ry="13"/><path class="pet-paw paw-back" d="m31 62-1 10h12l1-8"/><path class="pet-paw paw-front" d="m58 64 1 8h12l-2-11"/><path d="M25 45 22 10 40 23Q51 18 63 23L79 10 76 45Q69 61 51 61T25 45Z"/></g><path d="m27 20 3 14 7-8m36-6-3 14-7-8" fill="#344448"/><g class="eyes eyes-normal" fill="#9bff7e"><ellipse class="eye-left" cx="37" cy="41" rx="4" ry="3"/><ellipse class="eye-right" cx="65" cy="41" rx="4" ry="3"/><path d="M37 38v6m28-6v6" stroke="#13240b" stroke-width="1"/></g><g class="eyes eyes-happy" fill="none" stroke="#a9ff83" stroke-width="1.9" stroke-linecap="round"><path d="M32 43q5-9 10 0m18 0q5-9 10 0"/></g><g class="eyes eyes-sleepy" fill="none" stroke="#a9ff83" stroke-width="1.7" stroke-linecap="round"><path d="M33 42q4 4 9 0m18 0q4 4 9 0"/></g><g class="eyes eyes-alert" fill="#baff93"><ellipse cx="37" cy="41" rx="4.2" ry="5"/><ellipse cx="65" cy="41" rx="4.2" ry="5"/><path d="M37 37v8m28-8v8" stroke="#13240b" stroke-width="1.2"/></g><g class="eyes eyes-curious" fill="#9bff7e"><ellipse cx="37" cy="41" rx="4" ry="4"/><path d="M60 41q5-5 10 0-5 3-10 0"/></g><path d="m48 48 3 3 3-3m-3 3q-4 6-8 2m8-2q4 6 8 2" fill="none" stroke="#9bb9ae" stroke-width="1.3"/><path d="m34 49-13-2m13 6-12 3m46-7 13-2m-13 6 12 3" fill="none" stroke="#7bb4a5" stroke-width=".8"/><path class="pet-heart" d="M79 7c-4-7-13 0 0 8 13-8 4-15 0-8" fill="#ff9dce"/><g class="pet-purr" fill="none" stroke="#b8f7a2" stroke-width="1" opacity=".65"><path d="M12 28q-7 8 0 16M7 24q-12 12 0 24m78-20q7 8 0 16m5-20q12 12 0 24"/></g></svg><span id="pet-bubble" aria-hidden="true"></span>`;
const panel=document.createElement('section');panel.id='pet-console';panel.className='alien-console';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','false');panel.setAttribute('aria-labelledby','pet-console-title');
panel.innerHTML=`<div class="alien-glyphs" aria-hidden="true">⌬ ⋮ ⟐ ⊹ ⌖ ⟁ ⋮ ⌬</div><div class="alien-panel-head"><div><p class="alien-kicker">ANCIENT HABITAT INTERFACE</p><h2 id="pet-console-title">THE OBSERVER</h2></div><button type="button" data-pet-action="close" aria-label="Close pet controls">×</button></div><p id="pet-telemetry">carrier asleep / terran cradle</p><div class="alien-action-grid"><button type="button" data-pet-action="pet">♡ Pet / purr</button><button type="button" data-pet-action="follow" aria-pressed="false">⌖ Follow me</button><button type="button" data-pet-action="roam" aria-pressed="true">⟐ Explore frames</button><button type="button" data-pet-action="home">⌂ Return home</button><button type="button" data-pet-action="motion" aria-pressed="false">Ⅱ Pause motion</button><button type="button" data-pet-action="sound" aria-pressed="false">♪ Sound: off</button><button type="button" data-pet-action="top">↑ Page top</button><button type="button" data-pet-action="projects">▦ Projects</button></div><p class="alien-footer">LOCAL ORGANISM / NO TELEMETRY SENT</p>`;
const live=document.createElement('p');live.className='sr-only';live.id='pet-announcer';live.setAttribute('role','status');live.setAttribute('aria-live','polite');
const focusAnchor=document.querySelector('main');document.body.insertBefore(cat,focusAnchor);document.body.insertBefore(root,focusAnchor);document.body.append(panel,live);
const earth=root.querySelector('#pet-earth'),house=root.querySelector('#pet-house'),bubble=cat.querySelector('#pet-bubble'),telemetry=panel.querySelector('#pet-telemetry');
let active=false,state='home',emotion='sleepy',mode='roam',x=0,y=0,target=null,waypoints=[],obstacles=[],surfaces=[],raf=0,last=0,time=0,age=0,nextIdle=0,refreshAt=0,localPause=false;
let pointer={x:innerWidth/2,y:innerHeight/2,at:-Infinity},soundOn=false,audio=null,soundNodes=[],lastSound=-Infinity,returnFocus=null,bubbleTimer=0,emotionUntil=0,hold=null,holdTimer=0,tabTimer=0,suppressClick=false,keyboardHeld=false;
const clamp=(n,a,b)=>Math.max(a,Math.min(n,Math.max(a,b))),paused=()=>localPause||reduced.matches||document.body.classList.contains('motion-paused');
const centerHome=()=>{const r=house.getBoundingClientRect();return{x:clamp(r.left+r.width/2-28,4,innerWidth-60),y:clamp(r.top+7,4,innerHeight-58)};};
function announce(text){live.textContent=text;}
function setEmotion(value,duration=0){emotion=value;cat.dataset.emotion=value;emotionUntil=duration?time+duration:0;}
function setState(value){state=value;cat.dataset.state=value;telemetry.textContent=`${value} / ${mode} / terran link stable`;}
function place(){x=clamp(x,2,innerWidth-60);y=clamp(y,2,innerHeight-56);cat.style.transform=`translate3d(${x}px,${y}px,0)`;}
function speak(text){bubble.textContent=text;bubble.classList.add('shown');clearTimeout(bubbleTimer);bubbleTimer=setTimeout(()=>bubble.classList.remove('shown'),2200);}
function stopSound(){for(const n of soundNodes){try{n.stop();}catch{}}soundNodes=[];}
function purrAudio(){if(!soundOn||!active||document.hidden||paused()||performance.now()-lastSound<2500)return;try{audio ||= new (window.AudioContext||window.webkitAudioContext)();audio.resume().catch(()=>{});const carrier=audio.createOscillator(),mod=audio.createOscillator(),depth=audio.createGain(),volume=audio.createGain();carrier.type='sine';carrier.frequency.value=76;mod.type='sine';mod.frequency.value=26;depth.gain.value=.011;volume.gain.setValueAtTime(.0001,audio.currentTime);volume.gain.exponentialRampToValueAtTime(.018,audio.currentTime+.15);volume.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+1.25);mod.connect(depth);depth.connect(volume.gain);carrier.connect(volume);volume.connect(audio.destination);carrier.start();mod.start();carrier.stop(audio.currentTime+1.3);mod.stop(audio.currentTime+1.3);soundNodes=[carrier,mod];lastSound=performance.now();}catch{soundOn=false;syncPanel();}}
function pet(){if(!active||state==='returning')return;setEmotion('happy',3.2);setState('purring');speak('prrr…');purrAudio();announce('The cat purrs happily.');ensureLoop();}
function rectData(r,el){return{l:r.left,t:r.top,r:r.right,b:r.bottom,el};}
function visible(r){return r.width>12&&r.height>4&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;}
function scan(){
 obstacles=[];surfaces=[];
 const ignore=e=>e.closest('#pet-habitat,#space-cat,#pet-console,[hidden]');
 const textEls=document.querySelectorAll('main h1, main h2, main h3, main p, main .btn, main .stack span');
 let count=0;
 for(const e of textEls){if(ignore(e)||getComputedStyle(e).visibility==='hidden')continue;const r=e.getBoundingClientRect();if(!visible(r))continue;if(++count>130)break;
  if(e.matches('h1,h2,h3,p')){const range=document.createRange();range.selectNodeContents(e);for(const rr of Array.from(range.getClientRects()).slice(0,8))if(visible(rr))obstacles.push(rectData(rr,e));}
  else obstacles.push(rectData(r,e));
  if(r.top>58)surfaces.push({x:clamp(r.left+Math.min(r.width*.55,120)-28,6,innerWidth-62),y:r.top-52,el:e});
 }
 for(const e of document.querySelectorAll('header,.card,.contact,.toolbar,#terminal-window,#terminal-taskbar')){if(ignore(e))continue;const r=e.getBoundingClientRect();if(!visible(r))continue;
  if(e.matches('header,#terminal-window,#terminal-taskbar'))obstacles.push(rectData(r,e));
  if(r.top>58)surfaces.push({x:clamp(r.left+r.width*.65-28,6,innerWidth-62),y:r.top-52,el:e});
  if(r.right+65<innerWidth)surfaces.push({x:r.right+5,y:clamp(r.top+Math.min(100,r.height/2),8,innerHeight-62),el:e});
 }
 obstacles=obstacles.slice(0,180);refreshAt=time+1.2;
}
function blocked(px,py){const cx=px+29,cy=py+28;return obstacles.some(r=>cx>r.l-20&&cx<r.r+20&&cy>r.t-23&&cy<r.b+23);}
/* A small bounded A* lattice avoids text lines and interactive frames; never clicks them. */
function pathTo(goal){
 const step=32,cols=Math.max(2,Math.ceil((innerWidth-58)/step)+1),rows=Math.max(2,Math.ceil((innerHeight-54)/step)+1),size=cols*rows;
 const point=i=>({x:Math.min(innerWidth-60,(i%cols)*step+2),y:Math.min(innerHeight-56,Math.floor(i/cols)*step+2)});
 const nearest=(px,py)=>clamp(Math.round((py-2)/step),0,rows-1)*cols+clamp(Math.round((px-2)/step),0,cols-1);
 const start=nearest(x,y),desired=nearest(goal.x,goal.y),walls=new Uint8Array(size);
 for(let i=0;i<size;i++){const p=point(i);walls[i]=blocked(p.x,p.y)?1:0;}walls[start]=0;
 let end=desired;
 if(walls[end]){let best=Infinity;for(let i=0;i<size;i++)if(!walls[i]){const p=point(i),d=Math.hypot(p.x-goal.x,p.y-goal.y);if(d<best){best=d;end=i;}}}
 const open=[start],g=new Float32Array(size).fill(Infinity),came=new Int32Array(size).fill(-1),closed=new Uint8Array(size);g[start]=0;
 const endx=end%cols,endy=Math.floor(end/cols),heuristic=i=>Math.abs(i%cols-endx)+Math.abs(Math.floor(i/cols)-endy);
 let found=false,iterations=0;
 while(open.length&&iterations++<1800){let best=0;for(let j=1;j<open.length;j++)if(g[open[j]]+heuristic(open[j])<g[open[best]]+heuristic(open[best]))best=j;const current=open.splice(best,1)[0];if(current===end){found=true;break;}if(closed[current])continue;closed[current]=1;const cx=current%cols,cy=Math.floor(current/cols);for(const [dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=cx+dx,ny=cy+dy;if(nx<0||nx>=cols||ny<0||ny>=rows)continue;const ni=ny*cols+nx;if(walls[ni]||closed[ni])continue;const cost=g[current]+1;if(cost<g[ni]){g[ni]=cost;came[ni]=current;open.push(ni);}}}
 if(!found)return [];
 const route=[];for(let i=end;i!==start&&i>=0;i=came[i])route.push(point(i));route.reverse();
 // Collapse straight lattice sections so walking is smooth, not a grid demonstration.
 const simplified=[];for(let i=0;i<route.length;i++){const prev=route[i-1],cur=route[i],next=route[i+1];if(!prev||!next||(Math.sign(cur.x-prev.x)!==Math.sign(next.x-cur.x))||(Math.sign(cur.y-prev.y)!==Math.sign(next.y-cur.y)))simplified.push(cur);}
 if(!blocked(goal.x,goal.y))simplified.push(goal);return simplified;
}
function route(goal,home=false){target=goal;waypoints=pathTo(goal);if(home&&!waypoints.length){const edge=x<innerWidth/2?4:innerWidth-60;waypoints=[{x:edge,y},{x:edge,y:innerHeight-58},{x:goal.x,y:innerHeight-58},goal];}return waypoints.length>0;}
function choose(){
 scan();const options=surfaces.filter(p=>p.y>6&&p.y<innerHeight-58&&Math.hypot(p.x-x,p.y-y)>75&&!blocked(p.x,p.y));
 for(let tries=0;tries<7;tries++){const g=options.length?options[Math.floor(Math.random()*options.length)]:{x:Math.random()*(innerWidth-64)+4,y:80+Math.random()*Math.max(10,innerHeight-155)};if(route(g)){setState('exploring');setEmotion('curious');return;}}
 waypoints=[];target=null;setState('perched');setEmotion('sleepy');nextIdle=time+3;
}
function activate(){
 if(active){pet();return;}
 active=true;house.hidden=false;root.classList.add('is-awake');earth.setAttribute('aria-pressed','true');earth.setAttribute('aria-label','Beckon your cat to its tiny Earth');cat.hidden=false;const h=centerHome();x=paused()?clamp(h.x-76,4,innerWidth-60):h.x;y=h.y;place();setState(paused()?'perched':'emerging');setEmotion('alert',2);age=0;nextIdle=time+1.4;announce('A tiny black cat emerges from its house.');syncPanel();ensureLoop();
}
function settleHome(){removePerch();active=false;target=null;waypoints=[];cat.hidden=true;cat.classList.remove('is-walking');root.classList.remove('is-awake');earth.setAttribute('aria-pressed','false');earth.setAttribute('aria-label','Wake the cat on its tiny Earth');setState('home');setEmotion('sleepy');cancelAnimationFrame(raf);raf=0;last=0;stopSound();announce('The cat is home, asleep on its tiny Earth.');if(document.activeElement===cat)house.focus({preventScroll:true});syncPanel();}
function home(){closePanel();if(!active)return;setState('returning');setEmotion('sleepy');scan();const h=centerHome();if(paused()){x=h.x;y=h.y;place();settleHome();return;}route(h,true);age=0;ensureLoop();announce('The cat is finding its way home.');}
function removePerch(){document.querySelectorAll('.pet-perch').forEach(e=>e.classList.remove('pet-perch'));}
function arrive(){waypoints=[];if(state==='returning'){const h=centerHome();if(Math.hypot(x-h.x,y-h.y)>12&&age<16){scan();route(h,true);return;}settleHome();return;}removePerch();target?.el?.classList.add('pet-perch');setState('perched');setEmotion('curious',2);nextIdle=time+3+Math.random()*4;target=null;}
function loop(now){
 raf=0;if(!active||paused()||document.hidden||!panel.hidden){last=0;return;}
 if(last&&now-last<32){raf=requestAnimationFrame(loop);return;}const dt=last?Math.min(.05,(now-last)/1000):0;last=now;time+=dt;age+=dt;
 if(emotionUntil&&time>emotionUntil){emotionUntil=0;setEmotion(state==='perched'?'sleepy':'normal');}
 if(state==='returning'&&age>18){const h=centerHome();x=h.x;y=h.y;place();settleHome();return;}
 if(state==='emerging'&&time>=nextIdle){setState('exploring');choose();}
 if(time>refreshAt){scan();if(state==='returning')route(centerHome(),true);}
 if(mode==='follow'&&state!=='returning'&&state!=='emerging'&&performance.now()-pointer.at<2500&&time>nextIdle){
  const goal={x:clamp(pointer.x+(pointer.x<innerWidth/2?42:-90),4,innerWidth-62),y:clamp(pointer.y-38,60,innerHeight-58)};
  if(Math.hypot(goal.x-x,goal.y-y)>75){route(goal);setState('following');setEmotion('alert');}nextIdle=time+.8;
 }
 if(waypoints.length&&state!=='purring'){
  const p=waypoints[0],dx=p.x-x,dy=p.y-y,d=Math.hypot(dx,dy),speed=state==='returning'?155:100;
  if(d<4){x=p.x;y=p.y;waypoints.shift();if(!waypoints.length)arrive();}
  else{x+=dx/d*Math.min(d,speed*dt);y+=dy/d*Math.min(d,speed*dt);cat.dataset.facing=dx<-.2?'left':'right';cat.classList.add('is-walking');place();}
 }else{cat.classList.remove('is-walking');if(state==='purring'&&!emotionUntil){setState('perched');nextIdle=time+2;}
  if(state==='perched'&&time>nextIdle){removePerch();if(Math.random()<.33){setEmotion('happy',2.5);speak('prrr…');purrAudio();nextIdle=time+3;}else if(mode==='roam')choose();else nextIdle=time+1;}
 }
 if(active&&!paused()&&panel.hidden)raf=requestAnimationFrame(loop);
}
function ensureLoop(){if(active&&!paused()&&!document.hidden&&panel.hidden&&!raf){last=0;raf=requestAnimationFrame(loop);}}
function syncPanel(){panel.querySelector('[data-pet-action="follow"]').setAttribute('aria-pressed',String(mode==='follow'));panel.querySelector('[data-pet-action="roam"]').setAttribute('aria-pressed',String(mode==='roam'));const motion=panel.querySelector('[data-pet-action="motion"]');motion.setAttribute('aria-pressed',String(localPause));motion.textContent=localPause?'▶ Resume pet':'Ⅱ Pause pet';const sound=panel.querySelector('[data-pet-action="sound"]');sound.setAttribute('aria-pressed',String(soundOn));sound.textContent=soundOn?'♪ Sound: on':'♪ Sound: off';telemetry.textContent=`${state} / ${mode} / terran link stable`;}
function clampPanel(){const r=panel.getBoundingClientRect();panel.style.left=`${clamp(r.left,8,innerWidth-r.width-8)}px`;panel.style.top=`${clamp(r.top,8,innerHeight-r.height-8)}px`;}
function openPanel(anchor=cat){clearTimeout(holdTimer);clearTimeout(tabTimer);returnFocus=anchor;panel.hidden=false;cat.setAttribute('aria-expanded','true');cancelAnimationFrame(raf);raf=0;last=0;setEmotion('curious');syncPanel();const r=anchor.getBoundingClientRect();panel.style.left=`${clamp(r.left-240,8,innerWidth-340)}px`;panel.style.top=`${clamp(r.top-180,8,innerHeight-410)}px`;clampPanel();panel.querySelector('button').focus({preventScroll:true});announce('Ancient habitat controls opened.');}
function closePanel(restore=true){if(panel.hidden)return;panel.hidden=true;cat.setAttribute('aria-expanded','false');if(restore)(returnFocus?.isConnected&&!returnFocus.hidden?returnFocus:earth).focus({preventScroll:true});ensureLoop();}
for(const el of[earth,house,cat]){
 el.addEventListener('pointerdown',e=>{if(e.button!==0)return;suppressClick=false;hold={id:e.pointerId,x:e.clientX,y:e.clientY,el};if(el===cat){cancelAnimationFrame(raf);raf=0;last=0;}holdTimer=setTimeout(()=>{if(!hold)return;suppressClick=true;openPanel(el);},650);});
 el.addEventListener('pointermove',e=>{if(hold&&hold.id===e.pointerId&&Math.hypot(e.clientX-hold.x,e.clientY-hold.y)>12){clearTimeout(holdTimer);hold=null;ensureLoop();}});
 el.addEventListener('contextmenu',e=>{e.preventDefault();suppressClick=true;openPanel(el);});
 el.addEventListener('keydown',e=>{
  if(e.key==='Tab'&&!e.shiftKey&&!e.repeat){keyboardHeld=true;clearTimeout(tabTimer);tabTimer=setTimeout(()=>{if(keyboardHeld)openPanel(el);},700);}
  if(e.key==='ContextMenu'||e.shiftKey&&e.key==='F10'){e.preventDefault();openPanel(el);}
 });
}
function finishHold(){clearTimeout(holdTimer);hold=null;ensureLoop();}
addEventListener('pointermove',e=>{if(hold&&hold.id===e.pointerId&&Math.hypot(e.clientX-hold.x,e.clientY-hold.y)>12){clearTimeout(holdTimer);hold=null;ensureLoop();}},{passive:true});
addEventListener('pointerup',finishHold);addEventListener('pointercancel',()=>{finishHold();suppressClick=false;});
addEventListener('keyup',e=>{if(e.key==='Tab'){keyboardHeld=false;clearTimeout(tabTimer);}},true);
addEventListener('blur',()=>{finishHold();keyboardHeld=false;clearTimeout(tabTimer);stopSound();});
function consume(){if(suppressClick){suppressClick=false;return true;}return false;}
earth.addEventListener('click',()=>{if(consume())return;if(active){scan();route(centerHome());setState('following');speak('mrr?');ensureLoop();}else activate();});
house.addEventListener('click',()=>{if(consume())return;active?home():activate();});
cat.addEventListener('click',()=>{if(!consume())pet();});
cat.addEventListener('pointerenter',()=>{if(active&&emotion!=='happy')setEmotion('curious',2);});
panel.addEventListener('click',e=>{const action=e.target.closest('[data-pet-action]')?.dataset.petAction;if(!action)return;switch(action){case 'close':closePanel();break;case 'pet':if(!active)activate();pet();closePanel();break;case 'follow':mode='follow';if(!active)activate();closePanel();announce('The cat follows pointer or touch destinations without clicking page elements.');break;case 'roam':mode='roam';if(!active)activate();scan();choose();closePanel();break;case 'home':home();break;case 'motion':localPause=!localPause;sync();syncPanel();break;case 'sound':soundOn=!soundOn;if(!soundOn){stopSound();audio?.suspend().catch(()=>{});}else{purrAudio();}syncPanel();break;case 'top':scrollTo({top:0,behavior:paused()?'auto':'smooth'});closePanel();break;case 'projects':const p=document.getElementById('projects');if(p)p.scrollIntoView({behavior:paused()?'auto':'smooth'});else location.assign('/#projects');closePanel();break;}});
panel.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();closePanel();}if(['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'].includes(e.key)){const buttons=Array.from(panel.querySelectorAll('button')),i=buttons.indexOf(document.activeElement);e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?buttons.length-1:(i+(['ArrowRight','ArrowDown'].includes(e.key)?1:-1)+buttons.length)%buttons.length;buttons[next].focus();}});
addEventListener('pointerdown',e=>{if(!panel.hidden&&!panel.contains(e.target)&&!root.contains(e.target)&&!cat.contains(e.target))closePanel(false);},{capture:true});
addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;pointer={x:e.clientX,y:e.clientY,at:performance.now()};},{passive:true});
addEventListener('pointerup',e=>{if(e.pointerType==='touch'&&!e.target.closest('#pet-habitat,#space-cat,#pet-console')){pointer={x:e.clientX,y:e.clientY,at:performance.now()};}},{passive:true});
let refreshTimer=0;function refresh(){clearTimeout(refreshTimer);refreshTimer=setTimeout(()=>{if(!active)return;scan();waypoints=[];target=null;if(state==='returning')route(centerHome(),true);else{setState('perched');nextIdle=time+.5;}place();if(!panel.hidden)clampPanel();ensureLoop();},100);}
addEventListener('scroll',refresh,{passive:true});addEventListener('resize',()=>{place();refresh();clampPanel();});addEventListener('observatory:repos-render',refresh);
addEventListener('q:state',refresh);addEventListener('q:reset',()=>{closePanel(false);removePerch();mode='roam';settleHome();});
function sync(){if(paused()){clearTimeout(bubbleTimer);bubble.classList.remove('shown');}cancelAnimationFrame(raf);raf=0;last=0;if(paused()||document.hidden){stopSound();if(state==='returning')settleHome();}else ensureLoop();cat.classList.toggle('pet-paused',paused());root.classList.toggle('pet-paused',paused());syncPanel();}
reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
new MutationObserver(()=>{if(active){refreshAt=0;if(state!=='returning'){waypoints=[];nextIdle=time+.4;setState('perched');}ensureLoop();}}).observe(document.getElementById('terminal-window'),{attributes:true,attributeFilter:['hidden','style','class']});
// No persistent activation: the pet only emerges after a user activates this page's Earth.
setState('home');setEmotion('sleepy');syncPanel();
})();

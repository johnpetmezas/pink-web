/**
 * Cinematic Scrollytelling Script - Redesign Version
 * Synchronized with Scrollytelling (2) Design System
 */

const frames = Array.from({length: 96}, (_, i) => 
  `./frame_${i.toString().padStart(2, '0')}_delay-0.041s.jpg`
);

/* SCROLL TIMINGS [inStart, inEnd, outStart, outEnd] */
const T = {
  cap1:[0.00,0.02,0.12,0.18], bub1:[0.15,0.22,0.32,0.40],
  bub2:[0.34,0.43,0.52,0.60],
  photo:[0.35,0.45,0.55,0.65], 
  bub3:[0.62,0.70,0.80,0.88],
  cap4:[0.90,0.96,0.98,1.00], bub4:[0.90,0.96,0.98,1.00],
};

const fc   = document.getElementById('frame-canvas');
const ctx  = fc.getContext('2d');
const TOTAL= frames.length;

function resize(){ fc.width=innerWidth; fc.height=innerHeight; }
resize(); window.addEventListener('resize', resize);

/* ─────────────────────────────────────────────────────────────
   FRAME LOADING
─────────────────────────────────────────────────────────────── */
let imgs=[];
async function preload(){
  return new Promise(res=>{
    let done=0; imgs=new Array(TOTAL);
    frames.forEach((src,i)=>{
      const img=new Image();
      img.onload=img.onerror=()=>{if(++done===TOTAL)res();};
      img.src=src; imgs[i]=img;
    });
  });
}

function drawFrame(i){
  const img=imgs[i]; if(!img?.complete)return;
  const W=fc.width,H=fc.height,s=Math.max(W/img.naturalWidth,H/img.naturalHeight);
  ctx.clearRect(0,0,W,H);
  ctx.drawImage(img,(W-img.naturalWidth*s)/2,(H-img.naturalHeight*s)/2,img.naturalWidth*s,img.naturalHeight*s);
}

/* ─────────────────────────────────────────────────────────────
   GSAP SCROLL ENGINE
─────────────────────────────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger);

function alpha(p,[a,b,c,d]){
  if(p<a)return 0; if(p<b)return(p-a)/(b-a);
  if(p<c)return 1; if(p<d)return 1-(p-c)/(d-c); return 0;
}

function initScroll(){
  ScrollTrigger.create({
    trigger:'#canvas-section', start:'top top', end:'bottom bottom', scrub:.65,
    onUpdate(self){
      const f=Math.round(self.progress*(TOTAL-1));
      drawFrame(f);
      gsap.set('#bgw',{x:self.progress*-80});
      
      // Header scroll thinning
      gsap.set('#main-header', { 
          opacity: 1 - self.progress * 4,
          y: -self.progress * 100,
          pointerEvents: self.progress > 0.1 ? 'none' : 'auto'
      });

      Object.entries(T).forEach(([id,timing])=>{
        const elId = id === 'photo' ? 'photo-overlay' : id;
        const el = document.getElementById(elId); 
        if(!el) return;
        const op=alpha(self.progress,timing);
        const isBub=id.startsWith('bub');
        
        if (id === 'photo') {
            gsap.set(el, { opacity: op, scale: 0.9 + op * 0.1, x: (1-op) * 30 });
        } else if (isBub) {
            gsap.set(el, {opacity:op,scale:.88+op*.12,y:(1-op)*45});
        } else {
            gsap.set(el, {opacity:op,y:(1-op)*16});
        }
      });
    },
  });

  const hint=document.getElementById('hint');
  ScrollTrigger.create({
    trigger:'#canvas-section', start:'top-=4 top',
    onEnter:()=>hint.classList.add('gone'),
    onLeaveBack:()=>hint.classList.remove('gone'),
  });

  ScrollTrigger.create({
    trigger:'#final', start:'top 78%', once:true,
    onEnter(){
      gsap.to('.f-eyebrow', {opacity:1,y:0,duration:.8,ease:'power3.out'});
      gsap.to('.f-question',{opacity:1,y:0,duration:1, ease:'power3.out',delay:.15});
      gsap.to('.btns',      {opacity:1,y:0,duration:.9,ease:'power3.out',delay:.35});
    },
  });
}

/* ─────────────────────────────────────────────────────────────
   ANTIGRAVITY ENGINE (Matter.js)
─────────────────────────────────────────────────────────────── */
const AG_WORDS = [
  'ΣΥΝΕΧΙΣΕ','ΡΟΖ','ΖΑΧΑΡΗ','WORLD','TOUR','CLASSIC',
  'CINEMA','SCROLL','ΤΑΙΝΙΑ','ΑΥΓΗ','ΗΛΙΟΣ','ΦΩΣ',
  'ΣΚΟΤΑΔΙ','ΤΕΛΟΣ','ΑΡΧΗ','GRAVITY','FLOAT','FREE',
];

const AG_COLORS = [
  '#f050b8','#ff90d8','#ffffff','#ff5cc8','#ffd6f0',
  '#c0006c','#ff80d0','#ffe0f5',
];

let agRunning = false;
let agBodies  = [];   
let agEngine, agWorld, agRunner;
let mouseX = innerWidth/2, mouseY = innerHeight/2;
let agRaf;

function launchAntigravity(){
  if(agRunning) return;
  agRunning = true;

  const overlay = document.getElementById('antigravity-overlay');
  overlay.classList.add('on');
  document.getElementById('ag-close').classList.add('on');
  document.body.style.overflow = 'hidden';

  const W = innerWidth, H = innerHeight;
  const { Engine, World, Bodies, Body, Runner, Events } = Matter;

  agEngine        = Engine.create();
  agEngine.gravity.y = -0.08;   
  agEngine.gravity.x =  0;
  agWorld         = agEngine.world;
  agRunner        = Runner.create();
  Runner.run(agRunner, agEngine);

  agBodies = [];

  AG_WORDS.forEach((word, idx) => {
    const el = document.createElement('div');
    el.className = 'ag-particle';
    el.textContent = word;

    const size = 20 + Math.random() * 60;
    el.style.fontSize = size + 'px';
    el.style.color = AG_COLORS[idx % AG_COLORS.length];

    const x = 60 + Math.random() * (W - 120);
    const y = H * 0.4 + Math.random() * (H * 0.55);

    el.style.left = x + 'px';
    el.style.top  = y + 'px';
    el.style.opacity = '0';
    gsap.to(el, {opacity:1, duration:.4, delay: idx * 0.07, ease:'power2.out'});

    overlay.appendChild(el);

    const bw = word.length * size * 0.6;
    const bh = size * 1.1;
    const body = Bodies.rectangle(x + bw/2, y + bh/2, bw, bh, {
      restitution: 0.6,
      friction:    0.01,
      frictionAir: 0.008,
      label:       'word',
    });

    Body.setVelocity(body, {
      x: (Math.random() - 0.5) * 4,
      y: -(Math.random() * 3 + 1),
    });
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);

    World.add(agWorld, body);
    agBodies.push({ body, el, offX: 0, offY: 0 });
  });

  for(let i = 0; i < 18; i++){
    const size = 8 + Math.random() * 40;
    const el   = document.createElement('div');
    el.className = 'ag-dot';
    el.style.width  = size + 'px';
    el.style.height = size + 'px';

    const pink = Math.random() > .5 ? '#f050b8' : '#ff90d8';
    el.style.background = pink;
    el.style.boxShadow  = `0 0 ${size*2}px ${size}px ${pink}55`;
    el.style.opacity    = (0.3 + Math.random() * 0.5).toString();

    const x = Math.random() * W;
    const y = H * 0.3 + Math.random() * (H * 0.65);
    el.style.left = x + 'px';
    el.style.top  = y + 'px';

    overlay.appendChild(el);

    const body = Bodies.circle(x, y, size/2, {
      restitution: 0.8, friction: 0.005, frictionAir: 0.005, label:'dot',
    });
    Body.setVelocity(body, {
      x: (Math.random() - 0.5) * 6,
      y: -(Math.random() * 4 + 2),
    });
    World.add(agWorld, body);
    agBodies.push({ body, el, isDot:true });
  }

  const ceiling = Bodies.rectangle(W/2, -200, W * 2, 40, { isStatic:true, label:'ceiling' });
  const wallL   = Bodies.rectangle(-30, H/2, 60, H*3,  { isStatic:true });
  const wallR   = Bodies.rectangle(W+30,H/2, 60, H*3,  { isStatic:true });
  World.add(agWorld, [ceiling, wallL, wallR]);

  function syncLoop(){
    agBodies.forEach(({ body, el, isDot }) => {
      const { x, y } = body.position;
      const angle    = body.angle;
      el.style.left      = (x - (isDot ? el.offsetWidth/2  : 0)) + 'px';
      el.style.top       = (y - (isDot ? el.offsetHeight/2 : 0)) + 'px';
      el.style.transform = `rotate(${angle}rad)`;

      if(y < -300){
        Body.setPosition(body, { x, y: H + 100 });
        Body.setVelocity(body, { x: body.velocity.x, y: -(Math.random()*3+2) });
      }
      if(y > H + 300){
        Body.setPosition(body, { x, y: -100 });
      }
    });
    agRaf = requestAnimationFrame(syncLoop);
  }
  syncLoop();

  function applyMouseForce(){
    if(!agRunning) return;
    agBodies.forEach(({ body }) => {
      const dx = mouseX - body.position.x;
      const dy = mouseY - body.position.y;
      const dist= Math.sqrt(dx*dx + dy*dy);
      if(dist < 280){
        const force = 0.00012 * (1 - dist/280);
        Body.applyForce(body, body.position, {
          x: dx / dist * force,
          y: dy / dist * force,
        });
      }
    });
  }
  Events.on(agEngine, 'beforeUpdate', applyMouseForce);
}

function stopAntigravity(){
  if(!agRunning) return;
  agRunning = false;
  cancelAnimationFrame(agRaf);
  Matter.Runner.stop(agRunner);
  Matter.Engine.clear(agEngine);
  const overlay = document.getElementById('antigravity-overlay');
  overlay.querySelectorAll('.ag-particle, .ag-dot').forEach(el => el.remove());
  overlay.classList.remove('on');
  document.getElementById('ag-close').classList.remove('on');
  document.body.style.overflow = '';
  agBodies = [];
}

window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
window.addEventListener('touchmove', e => {
  mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY;
}, { passive:true });

/* ─────────────────────────────────────────────────────────────
   BUTTON INTERACTIONS
─────────────────────────────────────────────────────────────── */
document.getElementById('yes').addEventListener('click', () => {
  document.getElementById('punchline').classList.add('on');
  document.body.style.overflow = 'hidden';
});

document.getElementById('no').addEventListener('click', () => {
  launchAntigravity();
});

document.getElementById('ag-close').addEventListener('click', stopAntigravity);

document.getElementById('punchline').addEventListener('click', () => {
  document.getElementById('punchline').classList.remove('on');
  document.body.style.overflow = '';
});

/* ─────────────────────────────────────────────────────────────
   BOOT
─────────────────────────────────────────────────────────────── */
(async () => {
  await preload();
  drawFrame(0);
  initScroll();
})();

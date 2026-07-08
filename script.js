(function(){
  const DESTINO='https://alexsandra.site';
  const disco=document.getElementById('discoButton');
  const card=document.getElementById('card');
  const musicButton=document.getElementById('musicButton');
  let audioCtx=null, timer=null, active=false;

  disco.addEventListener('click',function(e){
    e.preventDefault();
    disco.classList.add('clicked');
    burst();
    setTimeout(()=>{window.location.href=DESTINO;},700);
  });

  function burst(){
    for(let i=0;i<28;i++){
      const s=document.createElement('span');
      const a=(Math.PI*2*i)/28;
      const d=60+Math.random()*110;
      s.className='burst';
      s.style.left=(48+Math.random()*4)+'%';
      s.style.top=(59+Math.random()*4)+'%';
      s.style.width=(3+Math.random()*6)+'px';
      s.style.height=s.style.width;
      s.style.setProperty('--x',Math.cos(a)*d+'px');
      s.style.setProperty('--y',Math.sin(a)*d+'px');
      card.appendChild(s);
      s.addEventListener('animationend',()=>s.remove());
    }
  }

  window.addEventListener('mousemove',function(e){
    const r=card.getBoundingClientRect();
    if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)return;
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`rotateY(${x*4.5}deg) rotateX(${-y*4.5}deg)`;
  });
  window.addEventListener('mouseleave',()=>{card.style.transform='rotateY(0deg) rotateX(0deg)';});

  if(window.DeviceOrientationEvent){
    window.addEventListener('deviceorientation',function(e){
      if(!e.gamma && !e.beta)return;
      const x=Math.max(-8,Math.min(8,e.gamma||0));
      const y=Math.max(-8,Math.min(8,(e.beta||0)-45));
      card.style.transform=`rotateY(${x*.35}deg) rotateX(${-y*.25}deg)`;
    },true);
  }

  musicButton.addEventListener('click',async function(){
    if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();
    if(audioCtx.state==='suspended')await audioCtx.resume();
    active=!active;
    musicButton.classList.toggle('active',active);
    musicButton.textContent=active?'♪ Brillo ON':'♪ Activar brillo';
    active?start():stop();
  });

  function tone(freq,dur,vol){
    if(!audioCtx)return;
    const now=audioCtx.currentTime;
    const osc=audioCtx.createOscillator();
    const gain=audioCtx.createGain();
    osc.type='sine'; osc.frequency.value=freq;
    gain.gain.setValueAtTime(.0001,now);
    gain.gain.linearRampToValueAtTime(vol,now+.025);
    gain.gain.exponentialRampToValueAtTime(.0001,now+dur);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(now); osc.stop(now+dur);
  }
  function start(){
    stop();
    let step=0;
    const melody=[392,494,587,494,440,523,659,523];
    timer=setInterval(()=>{
      tone(melody[step%melody.length],.22,.028);
      if(step%2===0)tone(98,.12,.016);
      step++;
    },360);
  }
  function stop(){if(timer)clearInterval(timer);timer=null;}
})();

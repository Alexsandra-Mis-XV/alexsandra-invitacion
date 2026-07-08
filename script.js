(function(){
  const DESTINO = 'https://alexsandra.site';
  const disco = document.getElementById('discoLink');
  const card = document.getElementById('card');
  if(!disco || !card) return;

  // Importante: no se usa preventDefault ni retraso largo.
  // Así el clic real del invitado se conserva al abrir alexsandra.site.
  disco.addEventListener('pointerdown', function(){
    createBurst();
  }, {passive:true});

  // Profundidad sutil solo en computadora.
  window.addEventListener('mousemove', function(e){
    const r = card.getBoundingClientRect();
    if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `rotateY(${x*4}deg) rotateX(${-y*4}deg)`;
  });
  window.addEventListener('mouseleave', function(){
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });

  function createBurst(){
    for(let i=0;i<20;i++){
      const dot=document.createElement('span');
      const angle=(Math.PI*2*i)/20;
      const dist=44+Math.random()*62;
      dot.className='burst-dot';
      dot.style.left='47%';
      dot.style.top='60%';
      dot.style.width=(3+Math.random()*5)+'px';
      dot.style.height=dot.style.width;
      dot.style.setProperty('--x', Math.cos(angle)*dist+'px');
      dot.style.setProperty('--y', Math.sin(angle)*dist+'px');
      card.appendChild(dot);
      dot.addEventListener('animationend',()=>dot.remove());
    }
  }
})();

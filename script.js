// Script opcional para la invitación interactiva de Alexsandra
// Compatible con la versión sin carpeta assets.
// Funciona con index.html que tenga .disco-link y .card.

(function () {
  const DESTINO = 'https://alexsandra.site';
  const disco = document.querySelector('.disco-link') || document.getElementById('discoLink');
  const card = document.querySelector('.card') || document.getElementById('card');

  if (!disco || !card) return;

  // Asegura que el enlace vaya al destino correcto.
  disco.setAttribute('href', DESTINO);

  // Al tocar/clic en la bola: destello breve y luego abre la invitación.
  disco.addEventListener('click', function (event) {
    event.preventDefault();
    disco.classList.add('clicked');
    createBurst(card);

    setTimeout(function () {
      window.location.href = DESTINO;
    }, 650);
  });

  // Efecto suave de profundidad en computadora.
  window.addEventListener('mousemove', function (event) {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
      card.style.transform = `rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    }
  });

  window.addEventListener('mouseleave', function () {
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });

  // Inserta el estilo del estallido de luz.
  const style = document.createElement('style');
  style.textContent = `
    .disco-link.clicked { animation: clickPopJs .65s ease-out both; }
    @keyframes clickPopJs {
      0% { transform: scale(1); }
      45% { transform: scale(1.08); filter: drop-shadow(0 0 28px rgba(255,255,255,.95)); }
      100% { transform: scale(1); }
    }
    @keyframes burstJs {
      to {
        opacity: 0;
        transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(.15);
      }
    }
  `;
  document.head.appendChild(style);

  function createBurst(container) {
    for (let i = 0; i < 24; i++) {
      const sparkle = document.createElement('span');
      const angle = (Math.PI * 2 * i) / 24;
      const distance = 55 + Math.random() * 95;

      sparkle.setAttribute('aria-hidden', 'true');
      sparkle.style.cssText = `
        position:absolute;
        left:47%;
        top:60%;
        width:${3 + Math.random() * 5}px;
        height:${3 + Math.random() * 5}px;
        border-radius:50%;
        background:white;
        box-shadow:0 0 16px rgba(130,205,255,.95);
        z-index:40;
        pointer-events:none;
        transform:translate(-50%,-50%);
        animation:burstJs .8s ease-out forwards;
        --x:${Math.cos(angle) * distance}px;
        --y:${Math.sin(angle) * distance}px;
      `;

      container.appendChild(sparkle);
      sparkle.addEventListener('animationend', function () {
        sparkle.remove();
      });
    }
  }
})();

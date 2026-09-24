// Portafolio FN-Finixtavh — Interactividad principal
// Requisitos: HTML + CSS + JS + Bulma

document.addEventListener('DOMContentLoaded', () => {
  // Año footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navbar burger (Bulma)
  const burger = document.querySelector('.navbar-burger');
  const menu = document.getElementById('navMenu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
  }

  // Cerrar menu al clickear link (mobile)
  document.querySelectorAll('.navbar-item.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (burger && menu && menu.classList.contains('is-active')) {
        burger.classList.remove('is-active');
        menu.classList.remove('is-active');
      }
    });
  });

  // Scroll spy — resalta sección activa
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(l => {
          l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));

  // Filtro proyectos
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      projects.forEach(card => {
        const cat = card.dataset.category;
        const show = filter === 'all' || cat === filter;
        card.classList.toggle('is-hidden', !show);
        if (show) {
          card.style.animation = 'none';
          void card.offsetWidth;
          card.style.animation = '';
        }
      });
    });
  });

  // Formulario contacto — validación JS puro
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('form-feedback');
  if (form) {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');
    const errNombre = document.getElementById('err-nombre');
    const errEmail = document.getElementById('err-email');
    const errMensaje = document.getElementById('err-mensaje');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validate() {
      let ok = true;
      // Nombre
      if (!nombre.value.trim() || nombre.value.trim().length < 2) {
        errNombre.classList.remove('is-hidden');
        nombre.classList.add('is-danger');
        ok = false;
      } else {
        errNombre.classList.add('is-hidden');
        nombre.classList.remove('is-danger');
      }
      // Email
      if (!emailRegex.test(email.value.trim())) {
        errEmail.classList.remove('is-hidden');
        email.classList.add('is-danger');
        ok = false;
      } else {
        errEmail.classList.add('is-hidden');
        email.classList.remove('is-danger');
      }
      // Mensaje
      if (!mensaje.value.trim() || mensaje.value.trim().length < 10) {
        errMensaje.classList.remove('is-hidden');
        mensaje.classList.add('is-danger');
        ok = false;
      } else {
        errMensaje.classList.add('is-hidden');
        mensaje.classList.remove('is-danger');
      }
      return ok;
    }

    [nombre, email, mensaje].forEach(el => {
      el.addEventListener('input', () => {
        // validación en vivo suave
        if (el === nombre && el.value.trim().length >= 2) {
          errNombre.classList.add('is-hidden');
          el.classList.remove('is-danger');
        }
        if (el === email && emailRegex.test(el.value.trim())) {
          errEmail.classList.add('is-hidden');
          el.classList.remove('is-danger');
        }
        if (el === mensaje && el.value.trim().length >= 10) {
          errMensaje.classList.add('is-hidden');
          el.classList.remove('is-danger');
        }
      });
    });

    // Toast helper
    function showToast(message, type = 'success') {
      const container = document.getElementById('toast-container');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
      toast.innerHTML = `<span class="toast-icon"><i class="fas ${icon}"></i></span><span>${message}</span>`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.animation = 'toastOut 0.32s ease forwards';
        setTimeout(() => toast.remove(), 340);
      }, 3000);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) {
        feedback.className = 'notification is-danger is-light';
        feedback.textContent = 'Revisá los campos marcados antes de enviar.';
        feedback.classList.remove('is-hidden');
        showToast('Revisá los campos marcados', 'error');
        return;
      }
      // Éxito con toast
      feedback.classList.add('is-hidden');
      showToast(`¡Éxito! Gracias ${escapeHtml(nombre.value.trim())}, mensaje enviado correctamente.`, 'success');
      form.reset();
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  // Galería lightbox con flechas
  const galleryEl = document.getElementById('gallery-modal');
  const galleryImg = document.getElementById('gallery-img');
  const galleryCaption = document.getElementById('gallery-caption');
  const galleryPrev = document.querySelector('.gallery-prev');
  const galleryNext = document.querySelector('.gallery-next');
  const galleryClose = document.querySelector('.gallery-close');
  const galleryOverlay = document.querySelector('.gallery-overlay');

  // imágenes que forman parte de la galería
  const gallerySources = Array.from(document.querySelectorAll('.screenshot-wm, .portrait-img, .portrait-small'))
    .map(img => ({ src: img.currentSrc || img.src, alt: img.alt || '' }))
    .filter((v,i,a) => a.findIndex(t=>t.src===v.src)===i); // dedup por src

  let galleryIndex = 0;

  function openGallery(index) {
    galleryIndex = index;
    updateGallery();
    galleryEl.classList.remove('is-hidden');
    galleryEl.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeGallery() {
    galleryEl.classList.add('is-hidden');
    galleryEl.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  function updateGallery() {
    if (!gallerySources.length) return;
    const item = gallerySources[galleryIndex];
    galleryImg.src = item.src;
    galleryImg.alt = item.alt;
    galleryCaption.textContent = item.alt ? `${item.alt} — ${galleryIndex+1} / ${gallerySources.length}` : `${galleryIndex+1} / ${gallerySources.length}`;
  }
  function prevGallery() {
    galleryIndex = (galleryIndex - 1 + gallerySources.length) % gallerySources.length;
    updateGallery();
  }
  function nextGallery() {
    galleryIndex = (galleryIndex + 1) % gallerySources.length;
    updateGallery();
  }

  // asignar click a cada miniatura
  document.querySelectorAll('.screenshot-wm, .portrait-img, .portrait-small').forEach(img => {
    img.addEventListener('click', () => {
      const src = img.currentSrc || img.src;
      const idx = gallerySources.findIndex(s => s.src === src);
      openGallery(idx >=0 ? idx : 0);
    });
  });

  if (galleryPrev) galleryPrev.addEventListener('click', prevGallery);
  if (galleryNext) galleryNext.addEventListener('click', nextGallery);
  if (galleryClose) galleryClose.addEventListener('click', closeGallery);
  if (galleryOverlay) galleryOverlay.addEventListener('click', closeGallery);

  document.addEventListener('keydown', (e) => {
    if (galleryEl.classList.contains('is-hidden')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowLeft') prevGallery();
    if (e.key === 'ArrowRight') nextGallery();
  });

  // Smooth scroll extra (ya nativo, pero mejora)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, null, href);
        }
      }
    });
  });

  console.log('%cFN-Finixtavh Portfolio cargado', 'color:#cba6f7; font-weight:bold');
  console.log('Secciones: Inicio · Sobre mí · Mis proyectos · Mis habilidades · Mis estudios · Contacto');
  if (gallerySources.length) console.log(`Galería: ${gallerySources.length} imágenes con navegación ← →`);
});

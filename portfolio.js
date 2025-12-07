// portfolio.js
// Code robuste — s'exécute après le chargement du HTML

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. GESTION DE LA NAVIGATION (Scroll & Mobile)
  // ============================================================

  // Smooth scroll pour toutes les ancres internes
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const targetId = a.getAttribute('href').slice(1);
      if (!targetId) return;
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        // Scroll fluide en tenant compte de la hauteur de la barre fixe (env. 70px)
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });

        // Fermer le menu mobile si ouvert
        closeMobileNav();
      }
    });
  });

  // Toggle pour le menu mobile
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.style.display = mainNav.style.display === 'block' ? '' : 'block';
    });
    
    // Fermer le menu si on repasse en format bureau
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) mainNav.style.display = '';
    });
  }

  function closeMobileNav() {
    if (window.innerWidth <= 900 && mainNav) mainNav.style.display = '';
  }


  // ============================================================
  // 2. GESTION DU ZOOM IMAGE (LIGHTBOX)
  // ============================================================

  const modal = document.getElementById("zoom-modal");
  const modalImg = document.getElementById("img-to-zoom");
  const captionText = document.getElementById("caption");
  const closeBtn = document.getElementsByClassName("close-modal")[0];

  // Sélectionner toutes les images qu'on veut pouvoir zoomer
  // (Images du programme, du référentiel et les images doubles)
  const zoomableImages = document.querySelectorAll('.program-images img, .referentiel-img img, .dual-images img');

  zoomableImages.forEach(img => {
    img.addEventListener('click', function(){
      if (modal) {
        modal.style.display = "block";
        modalImg.src = this.src;
        
        // On essaie de récupérer la légende (figcaption) ou le texte alternatif (alt)
        const figcaption = this.nextElementSibling; 
        if (figcaption && figcaption.tagName === 'FIGCAPTION') {
              captionText.innerHTML = figcaption.innerHTML;
        } else {
              captionText.innerHTML = this.alt;
        }
      }
    });
  });

  // Fermer la modale en cliquant sur la croix
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = "none";
    });
  }

  // Fermer aussi si on clique en dehors de l'image (sur le fond sombre)
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // ============================================================
  // 3. ANIMATION D'APPARITION AU SCROLL (SCROLL REVEAL)
  // ============================================================

  const revealElements = document.querySelectorAll(
    '.text-block, .info-card, .formation-block, .ac-section-wrapper, .presentation-photo, .section h2, .pdf-wrapper, .competence-card, .lexique-card, .program-images, .dual-images, .section > p, .section > ul, .ac-separator'
  );

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // MODIFICATION ICI : On passe à 800ms pour correspondre au CSS
        setTimeout(() => {
          entry.target.classList.remove('reveal', 'active');
        }, 800); // Délai augmenté pour laisser finir l'animation

        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
  });

  revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

});
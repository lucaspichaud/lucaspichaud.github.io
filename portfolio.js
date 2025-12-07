document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const targetId = a.getAttribute('href').slice(1);
            if (!targetId) return;
            const el = document.getElementById(targetId);
            if (el) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = el.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                closeMobileNav();
            }
        });
    });
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.style.display = mainNav.style.display === 'block' ? '' : 'block';
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) mainNav.style.display = '';
        });
    }

    function closeMobileNav() {
      if (window.innerWidth <= 900 && mainNav) mainNav.style.display = '';
    }


    const dropdownToggles = document.querySelectorAll('.has-dropdown > a');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                toggle.parentElement.classList.toggle('active');
            }
        });
    });


    const modal = document.getElementById("zoom-modal");
    const modalImg = document.getElementById("img-to-zoom");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close-modal")[0];
    const zoomableImages = document.querySelectorAll('.program-images img, .referentiel-img img, .dual-images img');
    zoomableImages.forEach(img => {
        img.addEventListener('click', function(){
            if (modal) {
                modal.style.display = "block";
                modalImg.src = this.src;
                const figcaption = this.nextElementSibling; 
                if (figcaption && figcaption.tagName === 'FIGCAPTION') {
                    captionText.innerHTML = figcaption.innerHTML;
                } else {
                    captionText.innerHTML = this.alt;
                }
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = "none";
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }


    const revealElements = document.querySelectorAll(
        '.text-block, .info-card, .formation-block, .ac-section-wrapper, .presentation-photo, .section h2, .pdf-wrapper, .competence-card, .lexique-card, .program-images, .dual-images, .section > p, .section > ul, .ac-separator'
    );
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                setTimeout(() => {
                    entry.target.classList.remove('reveal', 'active');
                }, 800);
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
document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     MOBILE NAVIGATION MENU
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburgerBtn.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        hamburgerBtn.classList.remove('open');
        navMenu.classList.remove('open');
      }
    });
  }

  // Note: Scroll-driven video transitions and sticky header shrink effects are now handled 100% in CSS using animation-timeline.

  /* ==========================================================================
     CONTACT FORM HANDLER
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value;
      const service = document.getElementById('form-service').value;
      const email = document.getElementById('form-email').value;
      
      // Display elegant success message
      const modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100vw';
      modal.style.height = '100vh';
      modal.style.backgroundColor = 'rgba(43, 22, 19, 0.4)';
      modal.style.backdropFilter = 'blur(8px)';
      modal.style.webkitBackdropFilter = 'blur(8px)';
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.style.zIndex = '1000';
      modal.style.opacity = '0';
      modal.style.transition = 'opacity 0.4s ease';

      modal.innerHTML = `
        <div style="background-color: var(--bg-color); padding: var(--space-lg); border-radius: var(--radius-lg); text-align: center; max-width: 450px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.05); border: 1px solid var(--border-color);">
          <span style="font-size: 3rem; color: var(--primary); display: block; margin-bottom: var(--space-sm);">✓</span>
          <h3 style="margin-bottom: var(--space-sm); font-family: var(--font-serif);">¡Gracias, ${name}!</h3>
          <p style="color: var(--text-muted); margin-bottom: var(--space-md); font-size: 0.95rem;">
            Hemos recibido tu consulta sobre <strong>${service}</strong>. Te contactaremos al correo <em>${email}</em> a la brevedad.
          </p>
          <button id="close-modal" class="btn btn-primary" style="padding: 0.8rem 2rem;">Cerrar</button>
        </div>
      `;

      document.body.appendChild(modal);
      
      // Trigger reflow for fade in transition
      setTimeout(() => {
        modal.style.opacity = '1';
      }, 10);

      document.getElementById('close-modal').addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
          modal.remove();
        }, 400);
      });

      contactForm.reset();
    });
  }

  /* ==========================================================================
     MOBILE SWIPE SNAP INDICATOR DOTS
     ========================================================================== */
  const snapContainers = document.querySelectorAll('.scroll-snap-container');
  snapContainers.forEach(container => {
    const indicator = container.nextElementSibling;
    if (indicator && indicator.classList.contains('swipe-indicator')) {
      const dots = indicator.querySelectorAll('span');
      container.addEventListener('scroll', () => {
        const firstCard = container.querySelector('.card');
        if (!firstCard) return;
        const childWidth = firstCard.clientWidth;
        const gap = parseInt(window.getComputedStyle(container).gap) || 24;
        const index = Math.round(container.scrollLeft / (childWidth + gap));
        
        dots.forEach((dot, idx) => {
          if (idx === index) {
            dot.style.opacity = '1';
            dot.style.transform = 'scale(1.2)';
          } else {
            dot.style.opacity = '0.3';
            dot.style.transform = 'scale(1)';
          }
        });
      });
    }
  });
});

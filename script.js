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

  /* ==========================================================================
     HEADER SCROLL EFFECT
     ========================================================================== */
  const mainHeader = document.getElementById('main-header');
  if (mainHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    });
  }

  /* ==========================================================================
     SCROLL-DRIVEN VIDEO HERO (HOME PAGE ONLY)
     ========================================================================== */
  const heroVideo = document.getElementById('hero-video');
  const heroSec = document.getElementById('hero-sec');
  const heroTextBlock = document.getElementById('hero-text-block');
  
  if (heroVideo && heroSec) {
    let videoDuration = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let isRunning = false;
    const lerpSpeed = 0.1; // Easing factor: lower means smoother, higher means faster response. 0.1 is ideal.
    
    const initVideoScroll = () => {
      videoDuration = heroVideo.duration;
      updateTargetProgress();
      currentProgress = targetProgress;
      if (videoDuration) {
        heroVideo.currentTime = currentProgress * (videoDuration - 0.05);
      }
    };

    const updateTargetProgress = () => {
      const rect = heroSec.getBoundingClientRect();
      const containerHeight = rect.height;
      const viewHeight = window.innerHeight;
      const totalScrollable = containerHeight - viewHeight;
      const scrolled = -rect.top;
      
      let progress = scrolled / totalScrollable;
      targetProgress = Math.max(0, Math.min(1, progress));
    };

    const animate = () => {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0001) {
        currentProgress += diff * lerpSpeed;
        if (videoDuration) {
          heroVideo.currentTime = currentProgress * (videoDuration - 0.05);
        }
        
        // Smooth text transition
        if (heroTextBlock) {
          const textRange = 0.35; // text fades completely within the first 35% of scrolling
          const textProgress = Math.min(1, currentProgress / textRange);
          const opacity = Math.max(0, 1 - textProgress);
          heroTextBlock.style.opacity = opacity.toString();
          heroTextBlock.style.transform = `translateY(${-textProgress * 30}px)`;
        }
        
        requestAnimationFrame(animate);
      } else {
        currentProgress = targetProgress;
        isRunning = false;
      }
    };

    if (heroVideo.readyState >= 1) {
      initVideoScroll();
    } else {
      heroVideo.addEventListener('loadedmetadata', initVideoScroll);
    }

    window.addEventListener('scroll', () => {
      updateTargetProgress();
      if (!isRunning) {
        isRunning = true;
        requestAnimationFrame(animate);
      }
    });

    window.addEventListener('resize', () => {
      updateTargetProgress();
      if (!isRunning) {
        isRunning = true;
        requestAnimationFrame(animate);
      }
    });
  }

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
});

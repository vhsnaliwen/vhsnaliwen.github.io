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
     DYNAMIC SERVICES & PRICING RENDERER
     ========================================================================== */
  if (typeof preciosServicios !== 'undefined') {
    
    // 1. Render Homepage Featured Treatments
    const featuredContainer = document.getElementById('featured-treatments-container');
    if (featuredContainer) {
      // Pick 3 representative treatments to show on home
      const itemsToShow = [
        preciosServicios.valores_masajes[0], // Relajación 60min
        preciosServicios.valores_masajes[1], // Drenaje Linfático 75min
        preciosServicios.valores_masajes[3]  // Descontracturante Deportivo
      ];
      
      featuredContainer.innerHTML = itemsToShow.map((item, index) => {
        if (!item) return '';
        return `
          <div class="card">
            <div>
              <div class="card-img-wrapper">
                <img src="assets/salon${(index % 3) + 1}.jpeg" alt="${item.nombre}">
              </div>
              <h3>${item.nombre}</h3>
              <p>${item.descripcion}</p>
            </div>
            <div>
              <div class="accent-border" style="display: flex; justify-content: space-between; align-items: center;">
                <a href="servicios.html" class="label-caps" style="font-size: 0.8rem;">Detalles &rarr;</a>
                <span style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--primary); font-weight: 600;">${item.precio}</span>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    // 2. Render Services Page (servicios.html)
    const masajesContainer = document.getElementById('masajes-container');
    if (masajesContainer) {
      masajesContainer.innerHTML = preciosServicios.valores_masajes.map((item, index) => `
        <div class="card" style="padding: var(--space-md);">
          <div>
            <div class="card-img-wrapper" style="aspect-ratio: 16/9;">
              <img src="assets/salon${(index % 3) + 1}.jpeg" alt="${item.nombre}">
            </div>
            <h3 style="margin-top: var(--space-sm);">${item.nombre}</h3>
            <p style="margin-bottom: var(--space-md);">${item.descripcion}</p>
            
            <div class="treatment-price-row">
              <h4>Sesión (${item.duracion})</h4>
              <span class="price">${item.precio}</span>
            </div>
          </div>
          <div style="margin-top: var(--space-md); text-align: center;">
            <a href="https://wa.me/56940415858?text=Hola,%20quisiera%20reservar%20una%20sesion%20de%20${encodeURIComponent(item.nombre)}%20de%20${item.duracion}" target="_blank" class="btn btn-primary" style="width: 100%;">Reservar ahora</a>
          </div>
        </div>
      `).join('');
    }

    const mixtosContainer = document.getElementById('mixtos-container');
    if (mixtosContainer) {
      mixtosContainer.innerHTML = preciosServicios.masajes_mixtos.map((item, index) => `
        <div class="card" style="padding: var(--space-md);">
          <div>
            <span class="label-caps">Técnicas Integradas</span>
            <h3 style="margin-top: var(--space-sm);">${item.nombre}</h3>
            <p style="margin-bottom: var(--space-md);">${item.descripcion}</p>
            
            <div class="treatment-price-row">
              <h4>Sesión (${item.duracion})</h4>
              <span class="price">${item.precio}</span>
            </div>
          </div>
          <div style="margin-top: var(--space-md); text-align: center;">
            <a href="https://wa.me/56940415858?text=Hola,%20quisiera%20reservar%20un%20${encodeURIComponent(item.nombre)}%20de%20${item.duracion}" target="_blank" class="btn btn-primary" style="width: 100%;">Reservar ahora</a>
          </div>
        </div>
      `).join('');
    }

    // Populate Domicilios & Consulta fields in servicios.html
    const domZonas = document.getElementById('domicilio-zonas');
    const domAdic = document.getElementById('domicilio-adicional');
    if (domZonas && domAdic) {
      domZonas.textContent = preciosServicios.domicilios.zonas;
      domAdic.textContent = preciosServicios.domicilios.adicional;
    }

    const conDir = document.getElementById('consulta-direccion');
    const conRef = document.getElementById('consulta-referencia');
    if (conDir && conRef) {
      conDir.innerHTML = `${preciosServicios.consulta.direccion} &nbsp; <span style="font-weight: normal; font-size: 0.9em; color: var(--text-muted);">${preciosServicios.consulta.lugar}</span>`;
      conRef.textContent = preciosServicios.consulta.referencia;
    }

    // 3. Render Gift Cards Page (giftcard.html)
    const giftcardsContainer = document.getElementById('giftcards-container');
    if (giftcardsContainer) {
      const optRelax = preciosServicios.valores_masajes[0]; // Relajación 60min
      const optMixto = preciosServicios.masajes_mixtos[0]; // Mixto 90min
      
      giftcardsContainer.innerHTML = `
        <!-- Card Option 1 -->
        <div class="card">
          <div>
            <span class="label-caps">Regalo Bienestar</span>
            <h3 style="margin-top: var(--space-sm);">${optRelax.nombre}</h3>
            <p>${optRelax.descripcion}</p>
            <div class="treatment-price-row">
              <h4>Sesión (${optRelax.duracion})</h4>
              <span class="price">${optRelax.precio}</span>
            </div>
          </div>
          <div style="margin-top: var(--space-md);">
            <a href="https://wa.me/56940415858?text=Hola,%20quiero%20comprar%20una%20Gift%20Card%20de%20${encodeURIComponent(optRelax.nombre)}%20(${optRelax.duracion})" target="_blank" class="btn btn-primary" style="width: 100%;">Comprar Regalo</a>
          </div>
        </div>

        <!-- Card Option 2 -->
        <div class="card">
          <div>
            <span class="label-caps">Regalo Premium</span>
            <h3 style="margin-top: var(--space-sm);">${optMixto.nombre}</h3>
            <p>${optMixto.descripcion}</p>
            <div class="treatment-price-row">
              <h4>Sesión (${optMixto.duracion})</h4>
              <span class="price">${optMixto.precio}</span>
            </div>
          </div>
          <div style="margin-top: var(--space-md);">
            <a href="https://wa.me/56940415858?text=Hola,%20quiero%20comprar%20una%20Gift%20Card%20de%20${encodeURIComponent(optMixto.nombre)}%20(${optMixto.duracion})" target="_blank" class="btn btn-primary" style="width: 100%;">Comprar Regalo</a>
          </div>
        </div>

        <!-- Card Option 3 -->
        <div class="card">
          <div>
            <span class="label-caps">Monto Personalizado</span>
            <h3 style="margin-top: var(--space-sm);">Valor Libre</h3>
            <p>Permite que el destinatario elija con total libertad el tratamiento que prefiera o diseñe una sesión a su medida.</p>
            <div class="treatment-price-row">
              <h4>Monto flexible</h4>
              <span class="price">A tu elección</span>
            </div>
          </div>
          <div style="margin-top: var(--space-md);">
            <a href="https://wa.me/56940415858?text=Hola,%20quiero%20comprar%20una%20Gift%20Card%20con%20monto%20personalizado" target="_blank" class="btn btn-secondary" style="width: 100%;">Consultar Monto</a>
          </div>
        </div>
      `;
    }

    // 4. Render Contact Form Select Option (contacto.html)
    const serviceSelect = document.getElementById('form-service');
    if (serviceSelect) {
      preciosServicios.valores_masajes.forEach(item => {
        const opt = document.createElement('option');
        opt.value = `${item.nombre} (${item.duracion}) - ${item.precio}`;
        opt.textContent = `${item.nombre} (${item.duracion}) - ${item.precio}`;
        serviceSelect.appendChild(opt);
      });
      
      preciosServicios.masajes_mixtos.forEach(item => {
        const opt = document.createElement('option');
        opt.value = `${item.nombre} (${item.duracion}) - ${item.precio}`;
        opt.textContent = `${item.nombre} (${item.duracion}) - ${item.precio}`;
        serviceSelect.appendChild(opt);
      });
      
      const optGift = document.createElement('option');
      optGift.value = 'Gift Card / Monto Libre';
      optGift.textContent = 'Gift Card / Monto Libre';
      serviceSelect.appendChild(optGift);
    }
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

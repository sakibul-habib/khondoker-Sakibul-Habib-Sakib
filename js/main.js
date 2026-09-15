/**
 * KHONDOKER SAKIBUL HABIB SAKIB - EXECUTIVE 3D PORTFOLIO
 * Pure Vanilla JavaScript (No frameworks, No build required)
 * Runs directly in browser, VS Code Live Server, and any static hosting.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initThreeBackground();
  initProjectFilters();
  initContactForm();
  initScrollSpyAndNav();
  initBackToTop();
});

/* ==========================================================================
   1. Theme Toggle (Dark Mode & Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('sakib_portfolio_theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeIcon) {
      themeIcon.className = 'bi bi-moon-stars-fill';
    }
  } else {
    document.body.classList.remove('light-theme');
    if (themeIcon) {
      themeIcon.className = 'bi bi-sun-fill';
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      localStorage.setItem('sakib_portfolio_theme', isLight ? 'light' : 'dark');
      
      if (themeIcon) {
        themeIcon.className = isLight ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
      }

      // Notify Three.js engine to shift color palette
      if (window.updateThreePalette) {
        window.updateThreePalette(isLight);
      }
    });
  }
}

/* ==========================================================================
   2. Three.js Parametric 3D Horizon Wave & Particle Engine
   ========================================================================== */
function initThreeBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || typeof THREE === 'undefined') {
    console.warn('Three.js or canvas not available. Running fallback mode.');
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 7, 18);
  camera.lookAt(0, 0, -5);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Colors according to theme
  let isLight = document.body.classList.contains('light-theme');
  let gridColor = isLight ? 0x0284c7 : 0x06b6d4;
  let particleColor = isLight ? 0x0369a1 : 0x38bdf8;
  let fogColor = isLight ? 0xf8fafc : 0x030712;

  scene.fog = new THREE.FogExp2(fogColor, 0.035);

  // 1. Parametric Plane Lattice
  const planeWidth = 70;
  const planeDepth = 70;
  const segmentsX = 65;
  const segmentsY = 65;
  const planeGeo = new THREE.PlaneGeometry(planeWidth, planeDepth, segmentsX, segmentsY);
  planeGeo.rotateX(-Math.PI / 2);

  const planeMat = new THREE.MeshBasicMaterial({
    color: gridColor,
    wireframe: true,
    transparent: true,
    opacity: isLight ? 0.22 : 0.35
  });

  const planeMesh = new THREE.Mesh(planeGeo, planeMat);
  planeMesh.position.set(0, -3.5, -12);
  scene.add(planeMesh);

  // Store original vertex Y positions
  const posAttribute = planeGeo.attributes.position;
  const originalY = new Float32Array(posAttribute.count);
  for (let i = 0; i < posAttribute.count; i++) {
    originalY[i] = posAttribute.getY(i);
  }

  // 2. Micro Data Particles
  const particleCount = 140;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleSpeeds = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 60;
    particlePositions[i * 3 + 1] = Math.random() * 12 - 2;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 5;
    particleSpeeds[i] = 0.02 + Math.random() * 0.04;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: particleColor,
    size: 0.15,
    transparent: true,
    opacity: isLight ? 0.45 : 0.65
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Mouse Interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Color Palette Updater for Dark/Light mode
  window.updateThreePalette = function(lightMode) {
    isLight = lightMode;
    gridColor = isLight ? 0x0284c7 : 0x06b6d4;
    particleColor = isLight ? 0x0369a1 : 0x38bdf8;
    fogColor = isLight ? 0xf8fafc : 0x030712;

    planeMat.color.setHex(gridColor);
    planeMat.opacity = isLight ? 0.22 : 0.35;
    particleMat.color.setHex(particleColor);
    particleMat.opacity = isLight ? 0.45 : 0.65;
    scene.fog.color.setHex(fogColor);
  };

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Gentle camera tilt
    camera.position.x = mouseX * 2.5;
    camera.position.y = 7 + mouseY * 1.2;
    camera.lookAt(0, 0, -5);

    // Undulating wave calculation on grid vertices
    const positions = planeGeo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const u = positions.getX(i);
      const v = positions.getZ(i);

      // Organic dual-frequency waves
      const wave1 = Math.sin(u * 0.18 + elapsedTime * 0.9) * 0.75;
      const wave2 = Math.cos(v * 0.15 + elapsedTime * 0.7) * 0.6;
      
      // Interactive mouse ripple
      const dx = u - (mouseX * 20);
      const dz = v - (-mouseY * 20);
      const dist = Math.sqrt(dx * dx + dz * dz);
      const mouseRipple = Math.exp(-dist * 0.15) * 1.5 * Math.sin(dist * 0.5 - elapsedTime * 3);

      positions.setY(i, originalY[i] + wave1 + wave2 + mouseRipple);
    }
    positions.needsUpdate = true;

    // Animate drifting data particles
    const pPositions = particleGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3 + 2] += particleSpeeds[i];
      if (pPositions[i * 3 + 2] > 15) {
        pPositions[i * 3 + 2] = -40;
      }
    }
    particleGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  // Resize Handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
}

/* ==========================================================================
   3. Project Category Filter
   ========================================================================== */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'block';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. Contact Form Validation & Dispatch
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        if (formAlert) {
          formAlert.className = 'alert alert-warning mt-3';
          formAlert.textContent = 'Please fill out all required fields (Name, Email, Message).';
          formAlert.classList.remove('d-none');
        }
        return;
      }

      // Compose mailto link as direct dispatch option
      const mailtoUrl = `mailto:sakibulhabib@gmail.com?cc=ctit.sakib@gmail.com&subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent("Sender Name: " + name + "\nSender Email: " + email + "\n\nMessage:\n" + message)}`;

      if (formAlert) {
        formAlert.className = 'alert alert-success mt-3';
        formAlert.innerHTML = `<strong>Thank you, ${name}!</strong> Your inquiry has been prepared. <a href="${mailtoUrl}" class="alert-link text-decoration-underline">Click here to send via your default email client</a>, or write directly to <strong>sakibulhabib@gmail.com</strong>.`;
        formAlert.classList.remove('d-none');
      }

      contactForm.reset();
    });
  }
}

/* ==========================================================================
   5. ScrollSpy & Mobile Nav Auto-Collapse
   ========================================================================== */
function initScrollSpyAndNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.getElementById('navbarNav');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Auto close mobile navbar if open
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // Active section spy on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (matchingNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingNavLink.classList.add('active');
        } else {
          matchingNavLink.classList.remove('active');
        }
      }
    });
  });
}

/* ==========================================================================
   6. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

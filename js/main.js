/**
 * KHONDOKER SAKIBUL HABIB SAKIB - EXECUTIVE 3D PORTFOLIO
 * Pure Vanilla JavaScript (No frameworks, No build required)
 * Runs directly in browser, VS Code Live Server, and any static hosting.
 */

/* ==========================================================================
   0. Adjustable 3D Animation Configuration
   ========================================================================== */
const DEFAULT_ANIM_CONFIG = {
  speed: 1.0,            // Animation speed multiplier (0.1x to 3.0x)
  waveHeight: 1.0,       // Wave amplitude (0.2x to 2.5x)
  waveFrequency: 1.0,    // Wave frequency / lattice detail (0.5x to 2.0x)
  particleSpeed: 1.0,    // Micro-particle velocity (0.2x to 3.0x)
  particlesEnabled: true,// Toggle floating data particles
  mouseEffect: true,     // Interactive mouse ripple & tilt
  mouseSensitivity: 1.0, // Mouse responsiveness multiplier (0.2x to 2.0x)
  isPaused: false        // Pause toggle
};

let ANIM_CONFIG = { ...DEFAULT_ANIM_CONFIG };

try {
  const saved = localStorage.getItem('sakib_anim_settings');
  if (saved) {
    ANIM_CONFIG = { ...DEFAULT_ANIM_CONFIG, ...JSON.parse(saved) };
  }
} catch (e) {
  console.warn('Could not read saved anim settings', e);
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initThreeBackground();
  initAnimationControls();
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
   2. Three.js Parametric 3D Horizon Wave & Particle Engine (Adjustable)
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
    opacity: isLight ? 0.25 : 0.35
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
    planeMat.opacity = isLight ? 0.25 : 0.35;
    particleMat.color.setHex(particleColor);
    particleMat.opacity = isLight ? 0.45 : 0.65;
    scene.fog.color.setHex(fogColor);
  };

  // Animation Loop with Adjustable Speed & Dynamics
  let clock = new THREE.Clock();
  let virtualTime = 0;

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    // Advance continuous virtual time only when not paused
    if (!ANIM_CONFIG.isPaused) {
      virtualTime += delta * ANIM_CONFIG.speed;
    }

    // Smooth mouse interpolation if mouse effects are enabled
    if (ANIM_CONFIG.mouseEffect) {
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const sens = ANIM_CONFIG.mouseSensitivity;
      camera.position.x = mouseX * 2.5 * sens;
      camera.position.y = 7 + mouseY * 1.2 * sens;
    } else {
      mouseX += (0 - mouseX) * 0.05;
      mouseY += (0 - mouseY) * 0.05;
      camera.position.x = 0;
      camera.position.y = 7;
    }
    camera.lookAt(0, 0, -5);

    // Dynamic wave calculation based on user adjustable parameters
    const positions = planeGeo.attributes.position;
    const freq = ANIM_CONFIG.waveFrequency;
    const amp = ANIM_CONFIG.waveHeight;

    for (let i = 0; i < positions.count; i++) {
      const u = positions.getX(i);
      const v = positions.getZ(i);

      // Organic dual-frequency waves scaled by user configuration
      const wave1 = Math.sin(u * (0.18 * freq) + virtualTime * 0.9) * (0.75 * amp);
      const wave2 = Math.cos(v * (0.15 * freq) + virtualTime * 0.7) * (0.6 * amp);
      
      // Interactive mouse ripple
      let mouseRipple = 0;
      if (ANIM_CONFIG.mouseEffect) {
        const dx = u - (mouseX * 20);
        const dz = v - (-mouseY * 20);
        const dist = Math.sqrt(dx * dx + dz * dz);
        mouseRipple = Math.exp(-dist * 0.15) * 1.5 * ANIM_CONFIG.mouseSensitivity * Math.sin(dist * 0.5 - virtualTime * 3);
      }

      positions.setY(i, originalY[i] + wave1 + wave2 + mouseRipple);
    }
    positions.needsUpdate = true;

    // Drifting data particles with adjustable speed and toggle
    particles.visible = ANIM_CONFIG.particlesEnabled;
    if (particles.visible && !ANIM_CONFIG.isPaused) {
      const pPositions = particleGeo.attributes.position.array;
      const pRate = ANIM_CONFIG.particleSpeed;
      for (let i = 0; i < particleCount; i++) {
        pPositions[i * 3 + 2] += particleSpeeds[i] * pRate;
        if (pPositions[i * 3 + 2] > 15) {
          pPositions[i * 3 + 2] = -40;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;
    }

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

/* ==========================================================================
   7. 3D Animation Tuning Studio Controller
   ========================================================================== */
function initAnimationControls() {
  const sliderSpeed = document.getElementById('anim-slider-speed');
  const valSpeed = document.getElementById('val-speed');

  const sliderHeight = document.getElementById('anim-slider-height');
  const valHeight = document.getElementById('val-height');

  const sliderFreq = document.getElementById('anim-slider-freq');
  const valFreq = document.getElementById('val-freq');

  const sliderParticles = document.getElementById('anim-slider-particles');
  const valParticles = document.getElementById('val-particles');

  const sliderMouse = document.getElementById('anim-slider-mouse');
  const valMouse = document.getElementById('val-mouse');

  const toggleParticles = document.getElementById('anim-toggle-particles');
  const toggleMouse = document.getElementById('anim-toggle-mouse');

  const pauseBtn = document.getElementById('anim-pause-btn');
  const pauseIcon = document.getElementById('anim-pause-icon');
  const pauseText = document.getElementById('anim-pause-text');
  const resetBtn = document.getElementById('anim-reset-btn');

  const indicatorDot = document.getElementById('anim-indicator-dot');
  const presetButtons = document.querySelectorAll('[data-anim-preset]');

  function syncUI() {
    if (sliderSpeed && valSpeed) {
      sliderSpeed.value = ANIM_CONFIG.speed;
      valSpeed.textContent = Number(ANIM_CONFIG.speed).toFixed(1) + 'x';
    }
    if (sliderHeight && valHeight) {
      sliderHeight.value = ANIM_CONFIG.waveHeight;
      valHeight.textContent = Number(ANIM_CONFIG.waveHeight).toFixed(1) + 'x';
    }
    if (sliderFreq && valFreq) {
      sliderFreq.value = ANIM_CONFIG.waveFrequency;
      valFreq.textContent = Number(ANIM_CONFIG.waveFrequency).toFixed(1) + 'x';
    }
    if (sliderParticles && valParticles) {
      sliderParticles.value = ANIM_CONFIG.particleSpeed;
      valParticles.textContent = Number(ANIM_CONFIG.particleSpeed).toFixed(1) + 'x';
    }
    if (sliderMouse && valMouse) {
      sliderMouse.value = ANIM_CONFIG.mouseSensitivity;
      valMouse.textContent = Number(ANIM_CONFIG.mouseSensitivity).toFixed(1) + 'x';
    }
    if (toggleParticles) {
      toggleParticles.checked = ANIM_CONFIG.particlesEnabled;
    }
    if (toggleMouse) {
      toggleMouse.checked = ANIM_CONFIG.mouseEffect;
    }
    if (pauseBtn && pauseIcon && pauseText) {
      if (ANIM_CONFIG.isPaused) {
        pauseIcon.className = 'bi bi-play-fill';
        pauseText.textContent = 'Resume Animation';
        pauseBtn.classList.replace('btn-outline-warning', 'btn-warning');
      } else {
        pauseIcon.className = 'bi bi-pause-fill';
        pauseText.textContent = 'Pause Animation';
        pauseBtn.classList.replace('btn-warning', 'btn-outline-warning');
      }
    }
    if (indicatorDot) {
      if (ANIM_CONFIG.isPaused) {
        indicatorDot.classList.add('paused');
      } else {
        indicatorDot.classList.remove('paused');
      }
    }
  }

  function saveConfig() {
    try {
      localStorage.setItem('sakib_anim_settings', JSON.stringify(ANIM_CONFIG));
    } catch (e) {
      console.warn('Could not save anim settings to storage', e);
    }
  }

  // Sliders input events
  if (sliderSpeed) {
    sliderSpeed.addEventListener('input', (e) => {
      ANIM_CONFIG.speed = parseFloat(e.target.value);
      if (valSpeed) valSpeed.textContent = ANIM_CONFIG.speed.toFixed(1) + 'x';
      saveConfig();
      clearActivePresets();
    });
  }

  if (sliderHeight) {
    sliderHeight.addEventListener('input', (e) => {
      ANIM_CONFIG.waveHeight = parseFloat(e.target.value);
      if (valHeight) valHeight.textContent = ANIM_CONFIG.waveHeight.toFixed(1) + 'x';
      saveConfig();
      clearActivePresets();
    });
  }

  if (sliderFreq) {
    sliderFreq.addEventListener('input', (e) => {
      ANIM_CONFIG.waveFrequency = parseFloat(e.target.value);
      if (valFreq) valFreq.textContent = ANIM_CONFIG.waveFrequency.toFixed(1) + 'x';
      saveConfig();
      clearActivePresets();
    });
  }

  if (sliderParticles) {
    sliderParticles.addEventListener('input', (e) => {
      ANIM_CONFIG.particleSpeed = parseFloat(e.target.value);
      if (valParticles) valParticles.textContent = ANIM_CONFIG.particleSpeed.toFixed(1) + 'x';
      saveConfig();
      clearActivePresets();
    });
  }

  if (sliderMouse) {
    sliderMouse.addEventListener('input', (e) => {
      ANIM_CONFIG.mouseSensitivity = parseFloat(e.target.value);
      if (valMouse) valMouse.textContent = ANIM_CONFIG.mouseSensitivity.toFixed(1) + 'x';
      saveConfig();
      clearActivePresets();
    });
  }

  if (toggleParticles) {
    toggleParticles.addEventListener('change', (e) => {
      ANIM_CONFIG.particlesEnabled = e.target.checked;
      saveConfig();
    });
  }

  if (toggleMouse) {
    toggleMouse.addEventListener('change', (e) => {
      ANIM_CONFIG.mouseEffect = e.target.checked;
      saveConfig();
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      ANIM_CONFIG.isPaused = !ANIM_CONFIG.isPaused;
      saveConfig();
      syncUI();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      ANIM_CONFIG = { ...DEFAULT_ANIM_CONFIG };
      saveConfig();
      syncUI();
      clearActivePresets();
      const defaultPreset = document.querySelector('[data-anim-preset="default"]');
      if (defaultPreset) defaultPreset.classList.add('active');
    });
  }

  function clearActivePresets() {
    presetButtons.forEach(btn => btn.classList.remove('active'));
  }

  // Presets handler
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-anim-preset');
      clearActivePresets();
      btn.classList.add('active');

      if (preset === 'calm') {
        ANIM_CONFIG.speed = 0.4;
        ANIM_CONFIG.waveHeight = 0.5;
        ANIM_CONFIG.waveFrequency = 0.8;
        ANIM_CONFIG.particleSpeed = 0.5;
        ANIM_CONFIG.mouseSensitivity = 0.6;
      } else if (preset === 'default') {
        ANIM_CONFIG.speed = 1.0;
        ANIM_CONFIG.waveHeight = 1.0;
        ANIM_CONFIG.waveFrequency = 1.0;
        ANIM_CONFIG.particleSpeed = 1.0;
        ANIM_CONFIG.mouseSensitivity = 1.0;
      } else if (preset === 'dynamic') {
        ANIM_CONFIG.speed = 1.7;
        ANIM_CONFIG.waveHeight = 1.5;
        ANIM_CONFIG.waveFrequency = 1.3;
        ANIM_CONFIG.particleSpeed = 1.6;
        ANIM_CONFIG.mouseSensitivity = 1.4;
      } else if (preset === 'cyber') {
        ANIM_CONFIG.speed = 2.4;
        ANIM_CONFIG.waveHeight = 2.0;
        ANIM_CONFIG.waveFrequency = 1.6;
        ANIM_CONFIG.particleSpeed = 2.2;
        ANIM_CONFIG.mouseSensitivity = 1.8;
      }
      ANIM_CONFIG.isPaused = false;
      saveConfig();
      syncUI();
    });
  });

  // Initial UI sync
  syncUI();

  // Expose global updater so modal can refresh on show
  window.refreshAnimUI = syncUI;
}

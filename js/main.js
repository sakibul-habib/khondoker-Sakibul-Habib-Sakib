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
  initGallery();
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

/* ==========================================================================
   8. Photo Gallery & Old Memories Module
   ========================================================================== */
function initGallery() {
  const STORAGE_KEY = 'sakibulhabib_custom_memories_v1';
  const LIKES_KEY = 'sakibulhabib_memory_likes_v1';

  // Base curated memories
  const CURATED_MEMORIES = [
    {
      id: 'mem-exec-portrait',
      title: 'Executive Leadership & Head of IT Portrait',
      category: 'milestone',
      date: 'July 2025',
      location: 'Plannet Group Headquarters, Uttara, Dhaka',
      imageUrl: './my-passport-photo.png',
      description: 'Official executive portrait upon assuming Head of IT at City Tech IT (Plannet Group), directing enterprise ERP solutions, software teams, and university CSE laboratories.',
      tags: ['Leadership', 'Head of IT', 'City Tech IT', 'Official'],
      likes: 42,
      featured: true
    },
    {
      id: 'mem-graduation-convocation',
      title: 'B.Sc in CSE Convocation & Degree Conferred',
      category: 'academic',
      date: 'November 2024',
      location: 'IUBAT Permanent Campus, Dhaka',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      description: 'Celebrating graduation milestone with high distinction in Computer Science & Engineering after 4 years of intense algorithmic study, software development, and embedded robotics.',
      tags: ['Graduation', 'Convocation', 'B.Sc CSE', 'IUBAT', 'Academic'],
      likes: 58,
      featured: true
    },
    {
      id: 'mem-lecture-laboratory',
      title: 'Undergraduate CSE Computer Lab & Teaching',
      category: 'academic',
      date: 'August 2025',
      location: 'United College of Aviation Science & Management',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      description: 'Mentoring collegiate students through practical algorithmic demonstrations, relational database engineering, and web development in the UCASM high-performance computer lab.',
      tags: ['Teaching', 'Lecturer', 'CSE Lab', 'UCASM', 'Mentorship'],
      likes: 31,
      featured: false
    },
    {
      id: 'mem-smart-glass-defense',
      title: 'Smart Glass for Blind People Thesis Defense',
      category: 'milestone',
      date: 'October 2024',
      location: 'Robotics & Embedded Systems Research Lab',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      description: 'Presenting and demonstrating the dual ultrasonic sensory prototype and bone-conduction assistive wearable designed to assist visually impaired people navigating complex environments.',
      tags: ['Thesis', 'Smart Glass', 'IoT', 'Robotics', 'Assistive Tech'],
      likes: 49,
      featured: true
    },
    {
      id: 'mem-academic-coordination',
      title: 'Program Coordination, Academic Faculty & Laboratory Standardization',
      category: 'academic',
      date: 'August 2025',
      location: 'United College of Aviation Science & Management & UCAST',
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
      description: 'Directing collegiate program coordination, departmental syllabus synchronization, faculty workflows, and engineering laboratory audits across computer science disciplines.',
      tags: ['UCASM', 'UCAST', 'Program Coordination', 'Academic Faculty'],
      likes: 45,
      featured: true
    },
    {
      id: 'mem-tech-hackathon',
      title: 'Engineering Hackathon & Software Symposium',
      category: 'career',
      date: 'March 2024',
      location: 'Dhaka Tech Convention Center',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
      description: 'Collaborating on rapid software deployment, API integration pipelines, and real-time database architecture with fellow software engineers and industry mentors.',
      tags: ['Hackathon', 'Engineering', 'API', 'Teamwork'],
      likes: 26,
      featured: false
    },
    {
      id: 'mem-it-operations-suite',
      title: 'Enterprise ERP & Multi-Warehouse Launch',
      category: 'career',
      date: 'September 2025',
      location: 'City Tech IT Operations Suite, Uttara',
      imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
      description: 'Overseeing live deployment of the custom point-of-sale inventory engine with barcode hardware integration and accounting ledgers across group retail divisions.',
      tags: ['ERP', 'POS', 'Enterprise', 'Production'],
      likes: 33,
      featured: false
    }
  ];

  // State
  let customMemories = [];
  let userLikes = {};
  let currentFilter = 'all';
  let currentSearch = '';
  let currentViewMode = 'grid'; // 'grid' | 'polaroid'
  let activeLightboxIndex = 0;
  let displayedMemories = [];
  let pendingImageData = null;

  // Load storage
  try {
    const savedCustom = localStorage.getItem(STORAGE_KEY);
    if (savedCustom) {
      customMemories = JSON.parse(savedCustom);
    }
  } catch (e) {
    console.warn('Could not parse saved memories', e);
  }

  try {
    const savedLikes = localStorage.getItem(LIKES_KEY);
    if (savedLikes) {
      userLikes = JSON.parse(savedLikes);
    }
  } catch (e) {
    console.warn('Could not parse saved likes', e);
  }

  // Combine memories helper (legacy reference)
  function getAllMemories() {
    return [...customMemories, ...CURATED_MEMORIES];
  }

  // DOM Elements
  const container = document.getElementById('gallery-memories-container');
  const emptyState = document.getElementById('gallery-empty-state');
  const searchInput = document.getElementById('gallery-search-input');
  const filterButtons = document.querySelectorAll('#gallery-filter-buttons [data-memory-filter]');
  const viewModeGridBtn = document.getElementById('view-mode-grid');
  const viewModePolaroidBtn = document.getElementById('view-mode-polaroid');
  const resetFilterBtn = document.getElementById('reset-gallery-filter-btn');

  // Add memory modal elements
  const dropzone = document.getElementById('memory-dropzone');
  const fileInput = document.getElementById('memory-file-input');
  const dropzonePrompt = document.getElementById('dropzone-prompt');
  const dropzonePreview = document.getElementById('dropzone-preview');
  const previewImg = document.getElementById('memory-preview-img');
  const removePreviewBtn = document.getElementById('btn-remove-preview');
  const imageUrlInput = document.getElementById('memory-image-url');
  const titleInput = document.getElementById('memory-title');
  const categorySelect = document.getElementById('memory-category');
  const dateInput = document.getElementById('memory-date');
  const locationInput = document.getElementById('memory-location');
  const descInput = document.getElementById('memory-desc');
  const tagsInput = document.getElementById('memory-tags');
  const saveMemoryBtn = document.getElementById('btn-save-memory');

  // Lightbox elements
  const lightboxModalEl = document.getElementById('memoryLightboxModal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxDate = document.getElementById('lightbox-date');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxLocation = document.getElementById('lightbox-location');
  const lightboxLocationWrapper = document.getElementById('lightbox-location-wrapper');
  const lightboxDesc = document.getElementById('lightbox-description');
  const lightboxTags = document.getElementById('lightbox-tags');
  const lightboxLikeBtn = document.getElementById('lightbox-like-btn');
  const lightboxLikeIcon = document.getElementById('lightbox-like-icon');
  const lightboxLikeCount = document.getElementById('lightbox-like-count');
  const lightboxDownloadLink = document.getElementById('lightbox-download-link');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');

  if (!container) return;

  // Counts update: All Memories shows curated count; My Uploads shows custom count
  function updateCounts() {
    const countAll = document.getElementById('count-all');
    const countMilestone = document.getElementById('count-milestone');
    const countAcademic = document.getElementById('count-academic');
    const countCareer = document.getElementById('count-career');
    const countCustom = document.getElementById('count-custom');

    if (countAll) countAll.textContent = CURATED_MEMORIES.length;
    if (countMilestone) countMilestone.textContent = CURATED_MEMORIES.filter(m => m.category === 'milestone').length;
    if (countAcademic) countAcademic.textContent = CURATED_MEMORIES.filter(m => m.category === 'academic').length;
    if (countCareer) countCareer.textContent = CURATED_MEMORIES.filter(m => m.category === 'career').length;
    if (countCustom) countCustom.textContent = customMemories.length;
  }

  // Render Memories
  function render() {
    updateCounts();

    // Dedicated empty state for "My Uploads" if no personal uploads exist yet
    if (currentFilter === 'custom' && customMemories.length === 0) {
      if (emptyState) emptyState.classList.add('d-none');
      displayedMemories = [];
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="custom-card p-4 p-md-5 mx-auto text-center" style="max-width: 520px; border-radius: 16px;">
            <div class="display-5 text-info mb-3"><i class="bi bi-folder-plus"></i></div>
            <h4 class="fw-bold mb-2 text-main">Your Uploaded Photos</h4>
            <p class="text-muted small mb-4" style="line-height: 1.6;">
              Only your photos will appear when clicking <strong>My Uploads</strong>. Your uploaded memories are stored separately and do not clutter the curated portfolio memories.
            </p>
            <button type="button" class="btn btn-cyan btn-sm px-4 py-2 rounded-pill shadow-sm" data-bs-toggle="modal" data-bs-target="#addMemoryModal">
              <i class="bi bi-cloud-arrow-up-fill me-1"></i> Upload Your First Photo
            </button>
          </div>
        </div>
      `;
      return;
    }

    // Select source list based on filter
    let sourceList = [];
    if (currentFilter === 'custom') {
      // ONLY show user uploaded photos
      sourceList = customMemories;
    } else if (currentFilter === 'all') {
      // ONLY show curated portfolio memories (user uploads are NOT mixed in)
      sourceList = CURATED_MEMORIES;
    } else {
      // Specific curated category (milestone, academic, career)
      sourceList = CURATED_MEMORIES.filter(item => item.category === currentFilter);
    }

    // Apply search filter
    displayedMemories = sourceList.filter(item => {
      if (currentSearch.trim() !== '') {
        const q = currentSearch.toLowerCase();
        const matchTitle = (item.title || '').toLowerCase().includes(q);
        const matchDesc = (item.description || '').toLowerCase().includes(q);
        const matchLoc = (item.location || '').toLowerCase().includes(q);
        const matchDate = (item.date || '').toLowerCase().includes(q);
        const matchTags = (item.tags || []).some(t => t.toLowerCase().includes(q));
        return matchTitle || matchDesc || matchLoc || matchDate || matchTags;
      }
      return true;
    });

    if (displayedMemories.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.classList.remove('d-none');
      return;
    } else {
      if (emptyState) emptyState.classList.add('d-none');
    }

    // Build Cards HTML based on currentViewMode
    let html = '';
    displayedMemories.forEach((item, index) => {
      const isLiked = !!userLikes[item.id];
      const likeCount = (item.likes || 0) + (isLiked ? 1 : 0);
      const isCustom = item.id.startsWith('custom-') || item.isCustom === true;

      if (currentViewMode === 'polaroid') {
        // Random slight tilt (-3deg to +3deg)
        const rot = ((index % 5) - 2) * 1.5;
        html += `
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="polaroid-card" style="transform: rotate(${rot}deg);" data-memory-index="${index}">
              <div class="polaroid-tape"></div>
              <div class="polaroid-img-box">
                <img src="${item.imageUrl}" alt="${item.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'">
              </div>
              <div class="polaroid-caption" title="${item.title}">${item.title}</div>
              <div class="d-flex justify-content-between align-items-center mt-1">
                <span class="polaroid-date"><i class="bi bi-calendar-event me-1"></i>${item.date || ''}</span>
                <span class="text-danger small"><i class="bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'} me-1"></i>${likeCount}</span>
              </div>
            </div>
          </div>
        `;
      } else {
        // Grid Card Mode
        html += `
          <div class="col-md-6 col-lg-4">
            <div class="gallery-card">
              <div class="gallery-img-wrapper" data-memory-index="${index}">
                <img src="${item.imageUrl}" alt="${item.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'">
                <div class="gallery-overlay-badge">
                  <i class="bi bi-calendar3 me-1"></i>${item.date || 'Memory'}
                </div>
                <div class="gallery-actions" onclick="event.stopPropagation();">
                  <button type="button" class="gallery-icon-btn ${isLiked ? 'liked' : ''}" data-like-id="${item.id}" title="${isLiked ? 'Liked' : 'Like'}">
                    <i class="bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}"></i>
                  </button>
                  ${isCustom ? `
                    <button type="button" class="gallery-icon-btn text-danger" data-delete-id="${item.id}" title="Delete this upload">
                      <i class="bi bi-trash"></i>
                    </button>
                  ` : ''}
                </div>
                ${item.location ? `
                  <div class="gallery-location-tag">
                    <i class="bi bi-geo-alt-fill text-info"></i>
                    <span>${item.location}</span>
                  </div>
                ` : ''}
              </div>

              <div class="gallery-card-body">
                <div>
                  <div class="d-flex align-items-center justify-content-between mb-1">
                    <span class="badge ${isCustom ? 'bg-info bg-opacity-25 text-info border border-info border-opacity-50' : 'project-category-badge'} text-uppercase" style="font-size: 0.68rem;">
                      ${isCustom ? '<i class="bi bi-person-check-fill me-1"></i>My Upload' : item.category}
                    </span>
                    <span class="text-muted small" style="font-size: 0.75rem;">
                      <i class="bi bi-heart-fill text-danger me-1"></i>${likeCount} likes
                    </span>
                  </div>
                  <h5 class="gallery-card-title cursor-pointer" data-memory-index="${index}">${item.title}</h5>
                  <p class="gallery-card-desc">${item.description || ''}</p>
                </div>

                <div class="d-flex flex-wrap gap-1 mt-2 pt-2 border-top border-secondary border-opacity-25">
                  ${(item.tags || []).map(t => `<span class="gallery-tag-pill">#${t}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>
        `;
      }
    });

    container.innerHTML = html;

    // Attach click listeners for lightbox trigger
    container.querySelectorAll('[data-memory-index]').forEach(el => {
      el.addEventListener('click', (e) => {
        // Prevent if clicked on action button
        if (e.target.closest('.gallery-actions')) return;
        const idx = parseInt(el.getAttribute('data-memory-index'), 10);
        openLightbox(idx);
      });
    });

    // Attach like listeners
    container.querySelectorAll('[data-like-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-like-id');
        toggleLike(id);
      });
    });

    // Attach delete listeners
    container.querySelectorAll('[data-delete-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-delete-id');
        deleteCustomMemory(id);
      });
    });
  }

  // Like Toggle
  function toggleLike(id) {
    if (userLikes[id]) {
      delete userLikes[id];
    } else {
      userLikes[id] = true;
    }
    try {
      localStorage.setItem(LIKES_KEY, JSON.stringify(userLikes));
    } catch (e) {
      console.warn(e);
    }
    render();
    // Also refresh lightbox if open
    if (lightboxModalEl && lightboxModalEl.classList.contains('show')) {
      updateLightboxContent();
    }
  }

  // Delete custom memory
  function deleteCustomMemory(id) {
    if (confirm('Are you sure you want to remove this photo memory?')) {
      customMemories = customMemories.filter(m => m.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customMemories));
      } catch (e) {
        console.warn(e);
      }
      render();
    }
  }

  // Lightbox opening & navigation
  function openLightbox(index) {
    if (index < 0 || index >= displayedMemories.length) return;
    activeLightboxIndex = index;
    updateLightboxContent();

    if (window.bootstrap && window.bootstrap.Modal) {
      const modal = window.bootstrap.Modal.getOrCreateInstance(lightboxModalEl);
      modal.show();
    }
  }

  function updateLightboxContent() {
    const item = displayedMemories[activeLightboxIndex];
    if (!item) return;

    if (lightboxImg) lightboxImg.src = item.imageUrl;
    if (lightboxCategory) lightboxCategory.textContent = (item.category || 'Memory').toUpperCase();
    if (lightboxDate) lightboxDate.textContent = item.date || '';
    if (lightboxTitle) lightboxTitle.textContent = item.title || '';
    if (lightboxLocation) lightboxLocation.textContent = item.location || '';
    if (lightboxLocationWrapper) {
      lightboxLocationWrapper.style.display = item.location ? 'flex' : 'none';
    }
    if (lightboxDesc) lightboxDesc.textContent = item.description || '';

    if (lightboxTags) {
      lightboxTags.innerHTML = (item.tags || []).map(t => `<span class="gallery-tag-pill">#${t}</span>`).join('');
    }

    const isLiked = !!userLikes[item.id];
    const likeCount = (item.likes || 0) + (isLiked ? 1 : 0);
    if (lightboxLikeCount) lightboxLikeCount.textContent = likeCount;
    if (lightboxLikeIcon) {
      lightboxLikeIcon.className = `bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'} me-1`;
    }
    if (lightboxLikeBtn) {
      lightboxLikeBtn.className = `btn btn-sm ${isLiked ? 'btn-danger' : 'btn-outline-danger'}`;
      lightboxLikeBtn.onclick = () => toggleLike(item.id);
    }

    if (lightboxDownloadLink) {
      lightboxDownloadLink.href = item.imageUrl;
    }
  }

  // Lightbox Next/Prev
  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', () => {
      if (displayedMemories.length <= 1) return;
      activeLightboxIndex = (activeLightboxIndex - 1 + displayedMemories.length) % displayedMemories.length;
      updateLightboxContent();
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', () => {
      if (displayedMemories.length <= 1) return;
      activeLightboxIndex = (activeLightboxIndex + 1) % displayedMemories.length;
      updateLightboxContent();
    });
  }

  // Keyboard navigation for lightbox
  window.addEventListener('keydown', (e) => {
    if (lightboxModalEl && lightboxModalEl.classList.contains('show')) {
      if (e.key === 'ArrowLeft' && lightboxPrevBtn) {
        lightboxPrevBtn.click();
      } else if (e.key === 'ArrowRight' && lightboxNextBtn) {
        lightboxNextBtn.click();
      }
    }
  });

  // Filter buttons handler
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-memory-filter');
      render();
    });
  });

  // Reset filter handler
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      currentFilter = 'all';
      currentSearch = '';
      if (searchInput) searchInput.value = '';
      filterButtons.forEach(b => {
        if (b.getAttribute('data-memory-filter') === 'all') b.classList.add('active');
        else b.classList.remove('active');
      });
      render();
    });
  }

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      render();
    });
  }

  // View mode switcher
  if (viewModeGridBtn) {
    viewModeGridBtn.addEventListener('click', () => {
      currentViewMode = 'grid';
      viewModeGridBtn.classList.add('active');
      if (viewModePolaroidBtn) viewModePolaroidBtn.classList.remove('active');
      render();
    });
  }

  if (viewModePolaroidBtn) {
    viewModePolaroidBtn.addEventListener('click', () => {
      currentViewMode = 'polaroid';
      viewModePolaroidBtn.classList.add('active');
      if (viewModeGridBtn) viewModeGridBtn.classList.remove('active');
      render();
    });
  }

  // Dropzone and File Picker for Add Memory
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => {
      fileInput.click();
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--accent-cyan)';
      dropzone.style.background = 'rgba(2, 132, 199, 0.12)';
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.style.borderColor = 'rgba(2, 132, 199, 0.4)';
      dropzone.style.background = 'rgba(2, 132, 199, 0.04)';
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'rgba(2, 132, 199, 0.4)';
      dropzone.style.background = 'rgba(2, 132, 199, 0.04)';
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileSelect(e.target.files[0]);
      }
    });
  }

  function handleFileSelect(file) {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      pendingImageData = event.target.result;
      if (previewImg) previewImg.src = pendingImageData;
      if (dropzonePrompt) dropzonePrompt.classList.add('d-none');
      if (dropzonePreview) dropzonePreview.classList.remove('d-none');
      if (imageUrlInput) imageUrlInput.value = '';
    };
    reader.readAsDataURL(file);
  }

  if (removePreviewBtn) {
    removePreviewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      pendingImageData = null;
      if (fileInput) fileInput.value = '';
      if (previewImg) previewImg.src = '';
      if (dropzonePrompt) dropzonePrompt.classList.remove('d-none');
      if (dropzonePreview) dropzonePreview.classList.add('d-none');
    });
  }

  // Save new memory
  if (saveMemoryBtn) {
    saveMemoryBtn.addEventListener('click', () => {
      const title = (titleInput ? titleInput.value : '').trim();
      if (!title) {
        alert('Please enter a title for the memory.');
        if (titleInput) titleInput.focus();
        return;
      }

      let finalImageUrl = pendingImageData;
      const directUrl = (imageUrlInput ? imageUrlInput.value : '').trim();
      if (!finalImageUrl && directUrl) {
        finalImageUrl = directUrl;
      }

      if (!finalImageUrl) {
        // Fallback placeholder image
        finalImageUrl = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';
      }

      const category = categorySelect ? categorySelect.value : 'custom';
      const date = (dateInput ? dateInput.value : '').trim() || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const location = (locationInput ? locationInput.value : '').trim();
      const description = (descInput ? descInput.value : '').trim();
      const tagsStr = (tagsInput ? tagsInput.value : '').trim();
      const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : ['Memory'];

      const newMemory = {
        id: `custom-${Date.now()}`,
        title,
        category,
        date,
        location,
        imageUrl: finalImageUrl,
        description,
        tags,
        likes: 1,
        featured: false,
        isCustom: true
      };

      customMemories.unshift(newMemory);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customMemories));
      } catch (e) {
        console.warn('Could not save to localStorage', e);
      }

      // Reset form
      if (removePreviewBtn) removePreviewBtn.click();
      if (titleInput) titleInput.value = '';
      if (imageUrlInput) imageUrlInput.value = '';
      if (dateInput) dateInput.value = '';
      if (locationInput) locationInput.value = '';
      if (descInput) descInput.value = '';
      if (tagsInput) tagsInput.value = '';

      // Close modal
      const addModalEl = document.getElementById('addMemoryModal');
      if (addModalEl && window.bootstrap && window.bootstrap.Modal) {
        const modal = window.bootstrap.Modal.getInstance(addModalEl);
        if (modal) modal.hide();
      }

      // Automatically switch to "My Uploads" so the user immediately sees their photo
      currentFilter = 'custom';
      currentSearch = '';
      if (searchInput) searchInput.value = '';
      filterButtons.forEach(b => {
        if (b.getAttribute('data-memory-filter') === 'custom') {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });

      // Render updated list in My Uploads view
      render();

      // Smooth scroll to gallery container
      const gallerySec = document.getElementById('gallery');
      if (gallerySec) {
        gallerySec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Initial render
  render();
}

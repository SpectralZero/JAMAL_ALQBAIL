/* ============================================
   JAMAL ALQBAIL — PORTFOLIO JAVASCRIPT
   Intro loader, particles, typing, scroll fx
   ============================================ */

// ========== INTRO LOADER ==========
(function () {
  document.body.classList.add('intro-active');

  // --- Hex Rain ---
  const hexRain = document.getElementById('hex-rain');
  if (hexRain) {
    const hexChars = '0123456789ABCDEF';
    const colCount = Math.floor(window.innerWidth / 28);
    for (let i = 0; i < colCount; i++) {
      const col = document.createElement('div');
      col.className = 'hex-column';
      col.style.left = (i * 28 + Math.random() * 10) + 'px';
      col.style.animationDuration = (6 + Math.random() * 10) + 's';
      col.style.animationDelay = (-Math.random() * 8) + 's';
      let str = '';
      for (let j = 0; j < 40; j++) {
        str += hexChars[Math.floor(Math.random() * 16)];
        if (j % 2 === 1 && j < 39) str += ' ';
      }
      col.textContent = str;
      hexRain.appendChild(col);
    }
  }

  // --- Intro subtitle typing ---
  const introTyping = document.getElementById('intro-typing');
  const introText = 'INITIALIZING SECURE ENVIRONMENT';
  let introCharIdx = 0;
  function introType() {
    if (!introTyping || introCharIdx > introText.length) return;
    introTyping.textContent = introText.substring(0, introCharIdx);
    introCharIdx++;
    setTimeout(introType, 50);
  }
  introType();

  // --- Terminal lines ---
  const terminal = document.getElementById('intro-terminal');
  const termLines = [
    { text: '> Establishing encrypted channel...', cls: 't-key', delay: 600 },
    { text: '  [OK] TLS 1.3 handshake complete', cls: 't-ok', delay: 1200 },
    { text: '> Authenticating credentials...', cls: 't-key', delay: 2000 },
    { text: '  [OK] Identity verified: JAMAL ALQBAIL', cls: 't-ok', delay: 2800 },
    { text: '> Loading security modules...', cls: 't-key', delay: 3400 },
    { text: '  [OK] Offensive toolchain ready', cls: 't-ok', delay: 4000 },
    { text: '  [OK] Cryptographic engine online', cls: 't-ok', delay: 4400 },
    { text: '> Preparing portfolio interface...', cls: 't-key', delay: 5000 },
    { text: '  [OK] All systems operational', cls: 't-ok', delay: 5600 },
  ];

  termLines.forEach(item => {
    setTimeout(() => {
      if (!terminal) return;
      const div = document.createElement('div');
      div.className = 't-line ' + item.cls;
      div.textContent = item.text;
      terminal.appendChild(div);
      terminal.scrollTop = terminal.scrollHeight;
    }, item.delay);
  });

  // --- Progress bar ---
  const progressBar = document.getElementById('intro-progress');
  const percentLabel = document.getElementById('intro-percent');
  const totalDuration = 6000;
  const startTime = Date.now();

  function updateProgress() {
    const elapsed = Date.now() - startTime;
    const pct = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
    if (progressBar) progressBar.style.width = pct + '%';
    if (percentLabel) percentLabel.textContent = pct + '%';
    if (pct < 100) {
      requestAnimationFrame(updateProgress);
    }
  }
  requestAnimationFrame(updateProgress);

  // --- Fade out & reveal ---
  setTimeout(() => {
    const overlay = document.getElementById('intro-overlay');
    if (overlay) overlay.classList.add('fade-out');
    document.body.classList.remove('intro-active');

    // Remove from DOM after transition
    setTimeout(() => {
      if (overlay) overlay.remove();
    }, 900);
  }, totalDuration);
})();

document.addEventListener('DOMContentLoaded', () => {

  // -------- Mobile Nav Toggle --------
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // -------- Active Nav on Scroll --------
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          navItems.forEach(a => a.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // -------- Scroll Reveal --------
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));

  // -------- Terminal Typing Effect --------
  const typingEl = document.getElementById('typing-text');
  const phrases = [
    'Cybersecurity Engineer & Penetration Tester',
    'Offensive Security Researcher',
    'Secure Software Developer',
    'Red Team Tool Builder',
    'Cryptography Enthusiast'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function typeEffect() {
    if (!typingEl) return;
    const current = phrases[phraseIndex];

    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === current.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }
  typeEffect();

  // -------- Particle / Network Canvas --------
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    const PARTICLE_COUNT = 70;
    const MAX_DIST = 140;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r = Math.random() * 1.5 + 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.4)';
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => { p.update(); p.draw(); });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.08 * (1 - dist / MAX_DIST)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  // -------- Navbar scroll effect --------
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.borderBottomColor = 'rgba(34, 211, 238, 0.2)';
      navbar.style.background = 'rgba(10, 14, 23, 0.95)';
    } else {
      navbar.style.borderBottomColor = 'rgba(34, 211, 238, 0.12)';
      navbar.style.background = 'rgba(10, 14, 23, 0.88)';
    }
  });

});

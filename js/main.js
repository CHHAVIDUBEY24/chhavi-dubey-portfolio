/* ==========================================================================
   ADVANCED INTERACTIVITY & ANIMATIONS - CHHAVI DUBEY PORTFOLIO
  Custom Cursor, Dynamic Typing & Scrollspy
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. CUSTOM GLOWING CURSOR FOLLOWER (DESKTOP)
     -------------------------------------------------------------------------- */
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');

  if (cursor && follower && window.innerWidth > 992) {
    let mouseX = -100, mouseY = -100;
    let followerX = -100, followerY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover interactive elements
    const interactiveEls = document.querySelectorAll('a, button, input, select, textarea, .glass-card, .term-btn, .tech-tag');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => follower.classList.add('active'));
      el.addEventListener('mouseleave', () => follower.classList.remove('active'));
    });
  }

  /* --------------------------------------------------------------------------
     3. HERO DYNAMIC TYPING ANIMATION
     -------------------------------------------------------------------------- */
  const typingElement = document.getElementById('hero-typing');
  const phrases = [
    "Java Backend Developer",
    "Spring Boot & REST API Architect",
    "MySQL Database Specialist",
    "Kriyeta 4.0 & Prayatna 2.0 Hackathon Competitor",
    "DSA & Problem Solving Enthusiast"
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingElement) return;

    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 45;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 95;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  /* --------------------------------------------------------------------------
     4. CODE VISUALIZER TAB SWITCHER (HERO)
     -------------------------------------------------------------------------- */
  const tabJava = document.getElementById('tab-java');
  const tabJson = document.getElementById('tab-json');
  const codeJava = document.getElementById('code-view-java');
  const codeJson = document.getElementById('code-view-json');

  if (tabJava && tabJson && codeJava && codeJson) {
    tabJava.addEventListener('click', () => {
      tabJava.classList.add('active');
      tabJson.classList.remove('active');
      codeJava.style.display = 'block';
      codeJson.style.display = 'none';
    });

    tabJson.addEventListener('click', () => {
      tabJson.classList.add('active');
      tabJava.classList.remove('active');
      codeJson.style.display = 'block';
      codeJava.style.display = 'none';
    });
  }

  /* --------------------------------------------------------------------------
     6. NAVBAR SCROLLSPY & SCROLLED STYLE
     -------------------------------------------------------------------------- */
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSec = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSec = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSec}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  /* --------------------------------------------------------------------------
     7. MOBILE DRAWER NAVIGATION
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (mobileOverlay) mobileOverlay.classList.add('active');
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);
  mobileLinks.forEach(link => link.addEventListener('click', closeDrawer));

  /* --------------------------------------------------------------------------
     8. TOAST NOTIFICATION SYSTEM & COPY EMAIL
     -------------------------------------------------------------------------- */
  const copyButtons = document.querySelectorAll('.js-copy-email');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  const emailVal = 'chhavidubey2224@gmail.com';

  function showToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(emailVal).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast(`Email: ${emailVal}`);
      });
    });
  });

});

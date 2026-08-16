/* ==========================================================================
   MAIN JS INTERACTIVITY - CHHAVI DUBEY PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. HERO TYPING ANIMATION
     -------------------------------------------------------------------------- */
  const typingElement = document.getElementById('hero-typing');
  const phrases = [
    "Java Backend Developer",
    "Spring Boot & REST API Architect",
    "MySQL Database Specialist",
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
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 120;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      typingSpeed = 2000; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  /* --------------------------------------------------------------------------
     2. CODE VISUALIZER TAB SWITCHER (JAVA VS JSON)
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
     3. NAVBAR SCROLLSPY & SCROLLED STYLE
     -------------------------------------------------------------------------- */
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    // Add scrolled shadow to navbar
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scrollspy active link detection
    let currentSec = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
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
  handleScroll(); // Initial trigger

  /* --------------------------------------------------------------------------
     4. MOBILE MENU TOGGLE
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when link clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. TOAST NOTIFICATION & COPY EMAIL TO CLIPBOARD
     -------------------------------------------------------------------------- */
  const copyButtons = document.querySelectorAll('.js-copy-email');
  const toast = document.getElementById('toast');
  const emailVal = 'chhavidubey2224@gmail.com';

  function showToast(message) {
    if (!toast) return;
    const toastMsg = toast.querySelector('.toast-msg');
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

/**
 * Sabareesan M - Portfolio JavaScript
 * Enhanced animations, smooth scrolling, and interactive features
 */

document.addEventListener('DOMContentLoaded', function () {
  // Initialize all features
  initNavigation();
  initScrollProgress();
  initScrollAnimations();
  initHeroAnimations();
  initTypingEffect();
  initStatCounters();
  initParallaxEffect();
  initCardHoverEffects();
  initNextPageNav();
  initBackToTop();
});

/**
 * Next Page Navigation - Shows when scrolled down
 */
function initNextPageNav() {
  const nextPageNav = document.querySelector('.next-page-nav');
  if (!nextPageNav) return;

  function checkScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);

    // Show when scrolled past 30%
    if (scrollPercent > 0.3) {
      nextPageNav.classList.add('visible');
    } else {
      nextPageNav.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll();
}

/**
 * Back to Top Button
 */
function initBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  if (!backToTop) return;

  function checkScroll() {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', checkScroll);
  checkScroll();
}

/**
 * Navigation functionality
 */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (!navToggle || !navLinks) return;

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = navToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  const links = navLinks.querySelectorAll('a');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
      document.body.style.overflow = '';
    });
  });

  // Navbar background on scroll
  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar);
  updateNavbar();
}

/**
 * Scroll progress bar
 */
function initScrollProgress() {
  const scrollProgress = document.getElementById('scroll-progress');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${percent}%`;
  });
}

/**
 * Scroll-triggered animations for sections
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Stagger animation for child elements
        const children = entry.target.querySelectorAll('.skill-chip, .project-card, .achievement-card, .certification-card, .interest-item, .highlight-item, .contact-card');
        children.forEach((child, index) => {
          child.style.animationDelay = `${index * 0.1}s`;
          child.classList.add('animate-in');
        });
      }
    });
  }, observerOptions);

  // Observe all dashboard cards
  document.querySelectorAll('.dashboard-card').forEach((card) => {
    observer.observe(card);
  });
}

/**
 * Hero section animations
 */
function initHeroAnimations() {
  const heroSection = document.querySelector('.hero-section');
  
  if (heroSection) {
    // Add visible class immediately for hero
    setTimeout(() => {
      heroSection.classList.add('visible');
    }, 100);
  }
}

/**
 * Typing effect for animated subtitle
 */
function initTypingEffect() {
  const subtitle = document.getElementById('animatedSubtitle');
  if (!subtitle) return;

  const phrases = [
    'Passionate about Embedded Systems & IoT',
    'Building Smart Automation Solutions',
    'Solving Real-World Problems with Tech',
    'Creating Innovative Hardware-Software Solutions',
    'Exploring the World of Electronics'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isTyping = true;
  let isPaused = false;

  function type() {
    if (isPaused) {
      setTimeout(type, 100);
      return;
    }

    const currentPhrase = phrases[phraseIndex];

    if (isTyping) {
      if (charIndex < currentPhrase.length) {
        subtitle.textContent = currentPhrase.slice(0, charIndex + 1);
        subtitle.innerHTML += '<span class="cursor">|</span>';
        charIndex++;
        setTimeout(type, 50 + Math.random() * 50);
      } else {
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          isTyping = false;
        }, 2000);
        setTimeout(type, 100);
      }
    } else {
      if (charIndex > 0) {
        subtitle.textContent = currentPhrase.slice(0, charIndex - 1);
        subtitle.innerHTML += '<span class="cursor">|</span>';
        charIndex--;
        setTimeout(type, 30);
      } else {
        isTyping = true;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500);
      }
    }
  }

  // Add cursor CSS
  const style = document.createElement('style');
  style.textContent = `
    .cursor {
      animation: blink 0.7s infinite;
      font-weight: 100;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    .animate-in {
      animation: fadeInUp 0.6s ease forwards;
      opacity: 0;
    }
  `;
  document.head.appendChild(style);

  type();
}

/**
 * Animated stat counters
 */
function initStatCounters() {
  const stats = [
    { id: 'stat-projects', end: 4, duration: 1500 },
    { id: 'stat-hackathons', end: 2, duration: 1200 },
    { id: 'stat-certifications', end: 3, duration: 1000 }
  ];

  const heroSection = document.querySelector('.hero-section');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        stats.forEach((stat) => {
          animateCounter(stat.id, 0, stat.end, stat.duration);
        });
      }
    });
  }, { threshold: 0.5 });

  if (heroSection) {
    observer.observe(heroSection);
  }
}

/**
 * Counter animation helper
 */
function animateCounter(id, start, end, duration) {
  const element = document.getElementById(id);
  if (!element) return;

  const startTime = performance.now();
  const range = end - start;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (easeOutQuart)
    const easeProgress = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + range * easeProgress);
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = end;
      // Add a subtle pulse effect when done
      element.style.transform = 'scale(1.1)';
      setTimeout(() => {
        element.style.transform = 'scale(1)';
      }, 200);
    }
  }

  requestAnimationFrame(update);
}

/**
 * Parallax effect for background
 */
function initParallaxEffect() {
  const parallax = document.getElementById('parallax-bg');
  const shapes = document.querySelectorAll('.shape');
  
  if (!parallax) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        // Subtle parallax for background
        parallax.style.transform = `translateY(${scrollY * 0.1}px)`;
        
        // Move shapes at different speeds
        shapes.forEach((shape, index) => {
          const speed = 0.05 + (index * 0.02);
          shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
        
        ticking = false;
      });
      ticking = true;
    }
  });

  // Mouse move parallax effect
  document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    
    shapes.forEach((shape, index) => {
      const factor = (index + 1) * 0.5;
      shape.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
    });
  });
}

/**
 * Card hover effects with tilt
 */
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.project-card, .achievement-card, .interest-item');
  
  cards.forEach((card) => {
    card.addEventListener('mouseenter', function(e) {
      this.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', function() {
      this.style.transition = 'transform 0.5s ease';
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

/**
 * Smooth scroll for resume and contact buttons
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navbar = document.getElementById('navbar');
      const offset = navbar ? navbar.offsetHeight + 20 : 80;
      
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  });
});

/**
 * Add loading animation
 */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Trigger initial animations
  setTimeout(() => {
    document.querySelectorAll('.dashboard-card').forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible');
      }, index * 100);
    });
  }, 200);
});

/**
 * Handle reduced motion preference
 */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.dashboard-card').forEach(card => {
    card.classList.add('visible');
  });
}

/**
 * Console easter egg
 */
console.log(`
%c╔═══════════════════════════════════════════╗
%c║   👋 Hello, curious developer!            ║
%c║   Thanks for checking out my portfolio!   ║
%c║   Let's connect and build something       ║
%c║   amazing together! 🚀                    ║
%c╚═══════════════════════════════════════════╝
`, 
'color: #10b981; font-weight: bold;',
'color: #10b981;',
'color: #10b981;',
'color: #10b981;',
'color: #10b981;',
'color: #10b981; font-weight: bold;'
);

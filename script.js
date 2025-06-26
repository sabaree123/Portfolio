// Embedded Core Portfolio JS
// Smooth scroll, navbar toggle, active link highlight

document.addEventListener("DOMContentLoaded", function () {
  // Navbar toggle for mobile
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Smooth scroll and active link
  const links = document.querySelectorAll(".nav-links a");
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth",
        });
        navLinks.classList.remove("open");
      }
    });
  });

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll("main section");
  window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + 80;
    sections.forEach((section) => {
      const id = section.getAttribute("id");
      const navLink = document.querySelector(
        '.nav-links a[href="#' + id + '"]'
      );
      if (
        section.offsetTop <= scrollPos &&
        section.offsetTop + section.offsetHeight > scrollPos
      ) {
        navLink && navLink.classList.add("active");
      } else {
        navLink && navLink.classList.remove("active");
      }
    });
  });

  // Scroll progress bar
  const scrollProgress = document.getElementById("scroll-progress");
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = percent + "%";
  });

  // Navbar active link indicator
  const navLinksArr = Array.from(document.querySelectorAll(".nav-links a"));
  const setActiveNav = () => {
    let found = false;
    for (let i = navLinksArr.length - 1; i >= 0; i--) {
      const section = document.querySelector(navLinksArr[i].hash);
      if (
        section &&
        section.getBoundingClientRect().top < window.innerHeight / 2
      ) {
        navLinksArr.forEach((l) => l.classList.remove("active"));
        navLinksArr[i].classList.add("active");
        found = true;
        break;
      }
    }
    if (!found) navLinksArr.forEach((l) => l.classList.remove("active"));
  };
  window.addEventListener("scroll", setActiveNav);
  setActiveNav();

  // Animated stat counters in hero
  animateCounter("stat-projects", 0, 3, 800);
  animateCounter("stat-hackathons", 0, 2, 800);
  animateCounter("stat-certifications", 0, 3, 800);

  // Animated subtitle (typewriter effect)
  const subtitle = document.getElementById("animatedSubtitle");
  const phrases = [
    "Passionate about Embedded Systems & IoT",
    "Building Smart Automation Solutions",
    "Solving Real-World Problems with Tech",
  ];
  let phraseIdx = 0,
    charIdx = 0,
    typing = true;
  function typeSubtitle() {
    if (typing) {
      if (charIdx < phrases[phraseIdx].length) {
        subtitle.textContent = phrases[phraseIdx].slice(0, ++charIdx);
        setTimeout(typeSubtitle, 40);
      } else {
        typing = false;
        setTimeout(typeSubtitle, 1200);
      }
    } else {
      if (charIdx > 0) {
        subtitle.textContent = phrases[phraseIdx].slice(0, --charIdx);
        setTimeout(typeSubtitle, 18);
      } else {
        typing = true;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(typeSubtitle, 400);
      }
    }
  }
  typeSubtitle();

  // Contact form (no backend, just UI feedback)
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      contactForm.reset();
      alert("Thank you for reaching out!");
    });
  }
});

function animateCounter(id, start, end, duration) {
  const el = document.getElementById(id);
  if (!el) return;
  let current = start;
  const step = (end - start) / (duration / 40);
  function update() {
    current += step;
    if ((step > 0 && current >= end) || (step < 0 && current <= end)) {
      el.textContent = end;
      el.classList.add("counter-bounce");
      setTimeout(() => el.classList.remove("counter-bounce"), 400);
    } else {
      el.textContent = Math.floor(current);
      setTimeout(update, 40);
    }
  }
  update();
}

// Parallax background effect
window.addEventListener("scroll", function () {
  const parallax = document.getElementById("parallax-bg");
  if (parallax) {
    const y = window.scrollY * 0.3;
    parallax.style.backgroundPosition = `center ${y}px`;
  }
});

// Ensure the parallax background is not covered by body background
// Remove background-image from body if present

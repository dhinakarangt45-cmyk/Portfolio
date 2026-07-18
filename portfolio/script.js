/* ============================================================
   PERSONAL PORTFOLIO - SCRIPT.JS
   ShadowFox Intern Project
   ============================================================ */

"use strict";

/* ─────────────────────────────────────────────
   1. CURSOR GLOW
───────────────────────────────────────────── */
const cursorGlow = document.getElementById("cursorGlow");

document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top  = e.clientY + "px";
});

/* ─────────────────────────────────────────────
   2. PARTICLES BACKGROUND
───────────────────────────────────────────── */
(function createParticles() {
  const container = document.getElementById("particles");
  const PARTICLE_COUNT = 30;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");

    const size     = Math.random() * 3 + 1;
    const left     = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay    = Math.random() * 15;
    const opacity  = Math.random() * 0.4 + 0.1;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -10px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: 0;
      background: ${Math.random() > 0.5 ? "#a855f7" : "#6366f1"};
      max-opacity: ${opacity};
    `;
    container.appendChild(p);
  }
})();

/* ─────────────────────────────────────────────
   3. NAVBAR — SCROLL EFFECT & ACTIVE LINK
───────────────────────────────────────────── */
const navbar    = document.getElementById("navbar");
const navLinks  = document.querySelectorAll(".nav-link");
const sections  = document.querySelectorAll("section[id]");

function updateNavbar() {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function updateActiveLink() {
  const scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", () => {
  updateNavbar();
  updateActiveLink();
});

// Close mobile nav on link click
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("open");
    hamburgerBtn.classList.remove("open");
  });
});

/* ─────────────────────────────────────────────
   4. HAMBURGER MENU
───────────────────────────────────────────── */
const hamburgerBtn      = document.getElementById("hamburgerBtn");
const navLinksContainer = document.getElementById("navLinks");

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("open");
  navLinksContainer.classList.toggle("open");
});

// Close on outside click
document.addEventListener("click", (e) => {
  if (
    !hamburgerBtn.contains(e.target) &&
    !navLinksContainer.contains(e.target)
  ) {
    hamburgerBtn.classList.remove("open");
    navLinksContainer.classList.remove("open");
  }
});

/* ─────────────────────────────────────────────
   5. TYPING EFFECT
───────────────────────────────────────────── */
(function initTyping() {
  const roles  = [
    "Full Stack Developer",
    "ECE Student",
    "IoT & Embedded Systems Enthusiast",
    "C++ & Python Programmer",
    "ShadowFox Intern 🦊",
  ];
  const target     = document.getElementById("heroRole");
  let   roleIndex  = 0;
  let   charIndex  = 0;
  let   isDeleting = false;
  const TYPING_SPEED  = 90;
  const DELETING_SPEED = 50;
  const PAUSE_END     = 2000;
  const PAUSE_START   = 400;

  function type() {
    const current = roles[roleIndex];

    if (!isDeleting) {
      target.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, PAUSE_END);
        return;
      }
    } else {
      target.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex  = (roleIndex + 1) % roles.length;
        setTimeout(type, PAUSE_START);
        return;
      }
    }
    setTimeout(type, isDeleting ? DELETING_SPEED : TYPING_SPEED);
  }

  setTimeout(type, 800);
})();

/* ─────────────────────────────────────────────
   6. SCROLL REVEAL ANIMATIONS
───────────────────────────────────────────── */
(function initReveal() {
  const revealEls = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger child reveals inside a parent grid
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
})();

/* ─────────────────────────────────────────────
   7. SKILL BARS ANIMATION
───────────────────────────────────────────── */
(function initSkillBars() {
  const bars = document.querySelectorAll(".skill-progress");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar   = entry.target;
          const width = bar.getAttribute("data-width");
          setTimeout(() => {
            bar.style.width = width + "%";
          }, 200);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach((bar) => observer.observe(bar));
})();

/* ─────────────────────────────────────────────
   8. COUNTER ANIMATION (About Stats)
───────────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll(".stat-number[data-target]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.getAttribute("data-target"), 10);
          let   count  = 0;
          const step   = Math.max(1, Math.ceil(target / 30));
          const timer  = setInterval(() => {
            count += step;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            el.textContent = count + (target > 10 ? "" : "+");
          }, 60);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
})();

/* ─────────────────────────────────────────────
   9. PROJECT FILTER
───────────────────────────────────────────── */
(function initProjectFilter() {
  const filterBtns   = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.classList.remove("hidden");
          card.style.animation = "none";
          requestAnimationFrame(() => {
            card.style.animation = "fadeInUp 0.4s ease both";
          });
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
})();

/* Add fadeInUp keyframe via JS if not in CSS */
const styleEl = document.createElement("style");
styleEl.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleEl);

/* ─────────────────────────────────────────────
   10. CONTACT FORM VALIDATION & SUBMISSION
───────────────────────────────────────────── */
(function initContactForm() {
  const form        = document.getElementById("contactForm");
  const nameInput   = document.getElementById("formName");
  const emailInput  = document.getElementById("formEmail");
  const subjectInput= document.getElementById("formSubject");
  const msgInput    = document.getElementById("formMessage");
  const submitBtn   = document.getElementById("formSubmitBtn");
  const submitText  = document.getElementById("submitBtnText");
  const successMsg  = document.getElementById("formSuccess");

  function showError(inputEl, errorId, msg) {
    inputEl.classList.add("error");
    document.getElementById(errorId).textContent = msg;
  }

  function clearError(inputEl, errorId) {
    inputEl.classList.remove("error");
    document.getElementById(errorId).textContent = "";
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validate() {
    let valid = true;

    if (!nameInput.value.trim()) {
      showError(nameInput, "formNameError", "Name is required.");
      valid = false;
    } else {
      clearError(nameInput, "formNameError");
    }

    if (!emailInput.value.trim()) {
      showError(emailInput, "formEmailError", "Email is required.");
      valid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, "formEmailError", "Enter a valid email address.");
      valid = false;
    } else {
      clearError(emailInput, "formEmailError");
    }

    if (!subjectInput.value.trim()) {
      showError(subjectInput, "formSubjectError", "Subject is required.");
      valid = false;
    } else {
      clearError(subjectInput, "formSubjectError");
    }

    if (!msgInput.value.trim() || msgInput.value.trim().length < 10) {
      showError(msgInput, "formMessageError", "Message must be at least 10 characters.");
      valid = false;
    } else {
      clearError(msgInput, "formMessageError");
    }

    return valid;
  }

  // Real-time validation
  [nameInput, emailInput, subjectInput, msgInput].forEach((input) => {
    input.addEventListener("input", () => validate());
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Simulate async send
    submitBtn.disabled = true;
    submitText.textContent = "Sending... ⏳";

    await new Promise((resolve) => setTimeout(resolve, 1500));

    submitBtn.disabled = false;
    submitText.textContent = "Send Message ✈️";
    form.reset();
    successMsg.classList.add("show");

    setTimeout(() => {
      successMsg.classList.remove("show");
    }, 5000);
  });
})();

/* ─────────────────────────────────────────────
   11. FOOTER YEAR
───────────────────────────────────────────── */
document.getElementById("footerYear").textContent = new Date().getFullYear();

/* ─────────────────────────────────────────────
   12. SMOOTH SCROLL FOR ANCHOR LINKS
───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ─────────────────────────────────────────────
   13. TECH CARD RIPPLE EFFECT
───────────────────────────────────────────── */
document.querySelectorAll(".tech-card").forEach((card) => {
  card.addEventListener("click", function (e) {
    const ripple = document.createElement("div");
    const rect   = this.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
      background: rgba(168, 85, 247, 0.3);
      border-radius: 50%;
      pointer-events: none;
      animation: rippleAnim 0.6s ease-out forwards;
    `;
    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
  @keyframes rippleAnim {
    from { transform: scale(0); opacity: 1; }
    to   { transform: scale(2); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

/* ─────────────────────────────────────────────
   14. NAVBAR SMOOTH HIGHLIGHT
───────────────────────────────────────────── */
window.addEventListener("DOMContentLoaded", () => {
  updateNavbar();
  updateActiveLink();
});

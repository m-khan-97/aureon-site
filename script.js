// Aureon Systems landing page — progressive enhancement only. The page is
// fully usable with JS disabled; this file adds the mobile menu, the
// mailto-composing contact form (a static site has no backend), the
// scrolled-header state, scroll-reveal, scrollspy and the footer year.

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

menuToggle.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const form = document.getElementById("contact-form");
const sentPanel = document.getElementById("form-sent");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("cf-name").value.trim();
  const email = document.getElementById("cf-email").value.trim();
  const message = document.getElementById("cf-message").value.trim();

  const subject = encodeURIComponent(`Consultation enquiry — ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
  window.location.href = `mailto:ibrahim@aureonsystemsltd.com?subject=${subject}&body=${body}`;

  form.style.display = "none";
  sentPanel.style.display = "block";
});

// Header gains a stronger backdrop once the page scrolls.
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Scroll reveal — cards, steps and section heads fade up as they enter the
// viewport, staggered within each group. Skipped for reduced-motion users.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  const groups = [
    ".services-grid > .card",
    ".cris-steps > .step",
    ".products-grid > .card",
    ".insights-grid > .insight",
    ".creds-grid > .cred",
  ];
  const singles = document.querySelectorAll(
    ".section-head, .cris-head, .cris-note, .research-head, .founder-note, .contact-grid > div"
  );

  const targets = [];
  groups.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.setProperty("--reveal-delay", `${i * 90}ms`);
      targets.push(el);
    });
  });
  singles.forEach((el) => targets.push(el));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
}

// Scrollspy — highlight the nav link for the section in view.
const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]:not(.btn-accent)')];
const spySections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && spySections.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) =>
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`)
        );
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  spySections.forEach((s) => spy.observe(s));
}

// Footer year.
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Aureon Systems landing page — the only two behaviours that need JS:
// the mobile menu toggle, and the contact form (a static site has no
// backend, so submitting composes a pre-filled email in the visitor's
// own mail app instead of pretending to send).

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

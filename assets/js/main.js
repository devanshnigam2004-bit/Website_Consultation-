const body = document.body;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Loader: clear on load, with a fallback so a slow asset can never trap the page behind it.
const markLoaded = () => body.classList.add("loaded");
if (document.readyState === "complete") markLoaded();
else window.addEventListener("load", markLoaded);
setTimeout(markLoaded, 2500);

const syncHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

// Mobile menu: aria state, Escape to close, focus returns to the toggle.
const setMenu = (open, restoreFocus = false) => {
  body.classList.toggle("nav-open", open);
  navToggle?.setAttribute("aria-expanded", String(open));
  if (!open && restoreFocus) navToggle?.focus();
};
navToggle?.addEventListener("click", () => setMenu(!body.classList.contains("nav-open")));
navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && body.classList.contains("nav-open")) setMenu(false, true);
});
window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => event.matches && setMenu(false));

// Scroll reveal.
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Counters: the final value is in the HTML (works without JS); animate up from 0 when visible.
if (!reduceMotion) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        const end = Number(target.dataset.counter || 0);
        const suffix = target.dataset.suffix || "";
        const duration = 1100;
        const startTime = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          target.textContent = Math.round(end * progress).toString() + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        counterObserver.unobserve(target);
      });
    },
    { threshold: 0.55 }
  );
  document.querySelectorAll("[data-counter]").forEach((counter) => {
    counter.textContent = "0" + (counter.dataset.suffix || "");
    counterObserver.observe(counter);
  });
}

// Industries strip: duplicate the track at runtime for a seamless loop (copies are hidden from assistive tech).
const marqueeTrack = document.querySelector("[data-marquee]");
if (marqueeTrack && !reduceMotion) {
  Array.from(marqueeTrack.children).forEach((item) => {
    const copy = item.cloneNode(true);
    copy.setAttribute("aria-hidden", "true");
    marqueeTrack.appendChild(copy);
  });
}

// Hero depth: light pointer parallax on the website mockups (fine pointers only, never with reduced motion).
const parallax = document.querySelector("[data-parallax]");
if (parallax && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  let frame = 0;
  const hero = parallax.closest(".hero");
  hero.addEventListener("pointermove", (event) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      parallax.style.setProperty("--mx", (((event.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3));
      parallax.style.setProperty("--my", (((event.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3));
      frame = 0;
    });
  });
  hero.addEventListener("pointerleave", () => {
    parallax.style.setProperty("--mx", "0");
    parallax.style.setProperty("--my", "0");
  });
}

// Scroll-linked motion: one rAF-throttled handler writes a few CSS variables (progress bar, hero drift, portfolio drift).
const heroEl = document.querySelector(".hero");
const workEl = document.querySelector("[data-work]");
let scrollTick = 0;
const updateScroll = () => {
  scrollTick = 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  header.style.setProperty("--sp", max > 0 ? Math.min(window.scrollY / max, 1).toFixed(4) : "0");
  if (reduceMotion) return;
  if (heroEl) heroEl.style.setProperty("--hp", Math.min(Math.max(window.scrollY / heroEl.offsetHeight, 0), 1).toFixed(3));
  if (workEl) {
    const r = workEl.getBoundingClientRect();
    workEl.style.setProperty("--wp", Math.min(Math.max((window.innerHeight - r.top) / (window.innerHeight + r.height), 0), 1).toFixed(3));
  }
};
window.addEventListener("scroll", () => { if (!scrollTick) scrollTick = requestAnimationFrame(updateScroll); }, { passive: true });
updateScroll();

// Portfolio: measure each concept site's full-page travel so hover (or touch autoplay) scrolls the whole layout.
const projects = document.querySelectorAll(".project");
const measure = () => projects.forEach((card) => {
  const site = card.querySelector(".site");
  const scroller = card.querySelector(".site-scroll");
  if (!site || !scroller) return;
  const travel = Math.max(scroller.scrollHeight - site.clientHeight, 0);
  card.style.setProperty("--travel", travel + "px");
  card.style.setProperty("--dur", Math.max(travel / 90, 2.4).toFixed(1) + "s");
});
measure();
window.addEventListener("resize", measure);
window.addEventListener("load", measure);

// Touch devices have no hover: play the preview while a card is on screen.
if (!reduceMotion && window.matchMedia("(hover: none)").matches) {
  const liveObserver = new IntersectionObserver((entries) => entries.forEach((e) => e.target.classList.toggle("is-live", e.isIntersecting)), { threshold: 0.6 });
  projects.forEach((card) => liveObserver.observe(card));
}

// Portfolio cards: gentle 3D tilt that follows the pointer (fine pointers only).
if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  projects.forEach((card) => {
    const device = card.querySelector(".device");
    card.addEventListener("pointermove", (event) => {
      const r = card.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      device.style.setProperty("--ry", (x * 10).toFixed(2) + "deg");
      device.style.setProperty("--rx", (-y * 6).toFixed(2) + "deg");
    });
    card.addEventListener("pointerleave", () => { device.style.removeProperty("--ry"); device.style.removeProperty("--rx"); });
  });
}

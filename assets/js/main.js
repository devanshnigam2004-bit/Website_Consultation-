const body = document.body;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("load", () => body.classList.add("loaded"));

const syncHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      const end = Number(target.dataset.counter || 0);
      const duration = 1100;
      const startTime = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        target.textContent = Math.round(end * progress).toString();
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(target);
    });
  },
  { threshold: 0.55 }
);
document.querySelectorAll("[data-counter]").forEach((counter) => counterObserver.observe(counter));

const canvas = document.querySelector("[data-hero-canvas]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canvas && !reduceMotion) {
  const ctx = canvas.getContext("2d");
  const particles = Array.from({ length: 46 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 2.4 + 0.8,
    vx: (Math.random() - 0.5) * 0.00042,
    vy: (Math.random() - 0.5) * 0.00042
  }));

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(canvas.offsetWidth * ratio);
    canvas.height = Math.floor(canvas.offsetHeight * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const draw = () => {
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p, index) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > 1) p.vx *= -1;
      if (p.y < 0 || p.y > 1) p.vy *= -1;
      const x = p.x * width;
      const y = p.y * height;
      ctx.beginPath();
      ctx.arc(x, y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = index % 3 === 0 ? "rgba(247,178,103,.55)" : "rgba(45,212,191,.5)";
      ctx.fill();
      particles.slice(index + 1).forEach((other) => {
        const ox = other.x * width;
        const oy = other.y * height;
        const distance = Math.hypot(x - ox, y - oy);
        if (distance < 125) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(ox, oy);
          ctx.strokeStyle = `rgba(255,255,255,${0.12 - distance / 1300})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener("resize", resize);
  draw();
}

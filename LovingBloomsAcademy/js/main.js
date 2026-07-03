/* =========================================================
   MAIN.JS — shared behaviour across every page
   - mobile nav toggle
   - dark / light theme toggle (persisted in localStorage)
   - scroll-reveal animation
   - loads shared data (data/school-data.json) into any element
     tagged with [data-field="..."]
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initThemeToggle();
  initScrollReveal();
  loadSchoolData();
});

/* ---------- Mobile nav ---------- */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------- Theme toggle ---------- */
function initThemeToggle() {
  const root = document.documentElement;
  const btn = document.querySelector(".theme-toggle");
  const saved = localStorage.getItem("lba-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const startTheme = saved || (prefersDark ? "dark" : "light");

  applyTheme(startTheme);

  if (!btn) return;
  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    showToast(next === "dark" ? "Dark mode on 🌙" : "Light mode on ☀️");
  });

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("lba-theme", theme);
    if (btn) {
      btn.textContent = theme === "dark" ? "☀️" : "🌙";
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => io.observe(el));
}

/* ---------- Shared data loader ---------- */
async function loadSchoolData() {
  const targets = document.querySelectorAll("[data-field]");
  if (!targets.length) return;

  try {
    const res = await fetch(getDataPath());
    const data = await res.json();

    targets.forEach((el) => {
      const path = el.getAttribute("data-field").split(".");
      let value = data;
      for (const key of path) value = value?.[key];
      if (value !== undefined) el.textContent = value;
    });

    document.querySelectorAll("[data-stats]").forEach((container) => {
      if (!Array.isArray(data.stats)) return;
      container.innerHTML = data.stats
        .map((s) => `<div class="stat reveal in"><strong>${s.value}</strong><span>${s.label}</span></div>`)
        .join("");
    });

    document.querySelectorAll("[data-facilities]").forEach((container) => {
      if (!Array.isArray(data.facilities)) return;
      container.innerHTML = data.facilities
        .map(
          (f) => `
        <div class="card reveal">
          <div class="icon-badge">🏫</div>
          <h3>${f.name}</h3>
          <p>${f.desc}</p>
        </div>`
        )
        .join("");
      initScrollReveal();
    });
  } catch (err) {
    console.warn("[main.js] could not load school-data.json (this is fine if you're browsing via file:// — run a local server instead):", err);
  }
}

function getDataPath() {
  // html/ pages sit one level deep, so data is one level up.
  return "../data/school-data.json";
}

/* ---------- Toast ---------- */
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

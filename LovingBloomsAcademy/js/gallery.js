/* =========================================================
   GALLERY.JS — Facilities page photo gallery
   Reads images from window.GALLERY_IMAGES (see
   googlestorage/gallery-config.js). Renders a filterable
   grid + lightbox. Shows a friendly empty state until real
   photos are added.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("[data-gallery-grid]");
  const toolbar = document.querySelector("[data-gallery-toolbar]");
  if (!grid) return;

  const images = Array.isArray(window.GALLERY_IMAGES) ? window.GALLERY_IMAGES : [];
  let activeCategory = "all";

  renderToolbar();
  renderGrid();
  buildLightbox();

  function renderToolbar() {
    if (!toolbar) return;
    if (!images.length) {
      toolbar.style.display = "none";
      return;
    }
    const categories = ["all", ...new Set(images.map((i) => i.category || "gallery"))];
    toolbar.innerHTML = categories
      .map(
        (cat) =>
          `<button class="filter-chip ${cat === "all" ? "active" : ""}" data-cat="${cat}">${capitalize(cat)}</button>`
      )
      .join("");

    toolbar.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        toolbar.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        activeCategory = chip.dataset.cat;
        renderGrid();
      });
    });
  }

  function renderGrid() {
    if (!images.length) {
      grid.innerHTML = `
        <div class="gallery-empty">
          <span>📷</span>
          <strong>Photos coming soon</strong>
          <p>We're getting our camera ready! Add image links in
          <code>googlestorage/gallery-config.js</code> and they'll appear here automatically.</p>
        </div>`;
      return;
    }

    const filtered = images.filter((img) => activeCategory === "all" || img.category === activeCategory);

    grid.innerHTML = filtered
      .map(
        (img, i) => `
      <figure class="gallery-item reveal in" data-index="${i}" tabindex="0" role="button" aria-label="View photo: ${escapeHtml(img.caption || "")}">
        <img src="${img.src}" alt="${escapeHtml(img.caption || "Loving Blooms Academy")}" loading="lazy">
        <figcaption class="cap">${escapeHtml(img.caption || "")}</figcaption>
      </figure>`
      )
      .join("");

    grid.querySelectorAll(".gallery-item").forEach((el, i) => {
      const open = () => openLightbox(filtered[i]);
      el.addEventListener("click", open);
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });
  }

  function buildLightbox() {
    if (document.querySelector(".lightbox")) return;
    const box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML = `
      <button class="lightbox-close" aria-label="Close photo viewer">✕</button>
      <img src="" alt="">
      <div class="lightbox-cap"></div>
    `;
    document.body.appendChild(box);

    box.addEventListener("click", (e) => {
      if (e.target === box) closeLightbox();
    });
    box.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }

  function openLightbox(img) {
    const box = document.querySelector(".lightbox");
    box.querySelector("img").src = img.src;
    box.querySelector("img").alt = img.caption || "";
    box.querySelector(".lightbox-cap").textContent = img.caption || "";
    box.classList.add("open");
  }

  function closeLightbox() {
    document.querySelector(".lightbox")?.classList.remove("open");
  }

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
});

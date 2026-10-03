/* =========================================================
   Shared JavaScript
   ========================================================= */
function canUseSpaRouting() {
  return location.protocol === "http:" || location.protocol === "https:";
}

function setActiveNav(page = location.pathname.split("/").pop() || "index.html") {
  document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    const isActive = href === page || (page === "" && href === "index.html");
    link.classList.toggle("active", isActive);
  });
}

async function loadPage(page) {
  try {
    const response = await fetch(page, { cache: "no-store" });
    if (!response.ok) throw new Error("Page load failed");

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const nextMain = doc.querySelector("main");
    const targetMain = document.querySelector("#page-content");

    if (!nextMain || !targetMain) {
      window.location.href = page;
      return;
    }

    targetMain.outerHTML = nextMain.outerHTML;
    document.title = doc.title || "Beyond Tradition";
    history.pushState({ page }, "", page);
    setActiveNav(page);
    initializePage();
  } catch (error) {
    window.location.href = page;
  }
}

function setupNavigation() {
  if (!canUseSpaRouting()) return;

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.onclick = async event => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || link.target === "_blank") {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      event.preventDefault();
      await loadPage(href);
    };
  });
}

function initializePage() {
  /* ---------- Mobile navigation ---------- */
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.onclick = () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    };

    if (canUseSpaRouting()) {
      nav.querySelectorAll("a").forEach(a => {
        a.onclick = async event => {
          const href = a.getAttribute("href");
          if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || a.target === "_blank") {
            nav.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
            return;
          }

          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
          }

          event.preventDefault();
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
          await loadPage(href);
        };
      });
    }
  }

  /* ---------- Hero slideshow ---------- */
  const slider = document.querySelector("[data-slider]");
  if (slider) {
    const slides = [...slider.querySelectorAll(".slide")];
    const dots = [...slider.querySelectorAll(".dot")];
    const prev = slider.querySelector("[data-prev]");
    const next = slider.querySelector("[data-next]");
    let index = 0;
    let timer = null;
    let paused = false;

    const show = i => {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle("active", n === index));
      dots.forEach((d, n) => d.classList.toggle("active", n === index));
    };

    const scheduleNext = () => {
      clearTimeout(timer);
      if (paused) return;

      const delay = Number(slides[index]?.dataset.duration || 3000);
      timer = setTimeout(() => {
        show(index + 1);
        scheduleNext();
      }, delay);
    };

    const start = () => {
      paused = false;
      scheduleNext();
    };

    const pause = () => {
      paused = true;
      clearTimeout(timer);
    };

    prev?.addEventListener("click", () => { show(index - 1); start(); });
    next?.addEventListener("click", () => { show(index + 1); start(); });
    dots.forEach((d, n) => d.addEventListener("click", () => { show(n); start(); }));
    slider.addEventListener("mouseenter", pause);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", pause);
    slider.addEventListener("focusout", start);
    show(0);
    start();
  }

  /* ---------- Event tabs ---------- */
  document.querySelectorAll("[data-tabs]").forEach(group => {
    const buttons = [...group.querySelectorAll(".tab")];
    const panels = [...group.parentElement.querySelectorAll("[data-tab-panel]")];
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.toggle("active", b === btn));
        panels.forEach(p => p.classList.toggle("hidden", p.dataset.tabPanel !== target));
      });
    });
  });

  /* ---------- Materials accordion ---------- */
  document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
      const item = header.closest(".accordion-item");
      const open = item.classList.toggle("open");
      header.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- Materials search ---------- */
  const search = document.querySelector("[data-material-search]");
  if (search) {
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      document.querySelectorAll("[data-material-item]").forEach(item => {
        item.classList.toggle("hidden", !item.textContent.toLowerCase().includes(q));
      });
    });
  }

  /* ---------- Stats counter ---------- */
  const counters = document.querySelectorAll("[data-counter]");
  if (counters.length) {
    const animate = el => {
      const target = parseInt(el.dataset.counter, 10);
      const suffix = el.dataset.suffix || "";
      const duration = 1600;
      const startTime = performance.now();
      const step = now => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(step);
    };

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animate(e.target);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => obs.observe(c));
  }

  /* ---------- Contact form ---------- */
  const form = document.querySelector("#contactForm");
  const result = document.querySelector("#formResult");
  if (form && result) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      result.textContent = "";
      result.className = "";
      let valid = true;

      form.querySelectorAll("[required]").forEach(input => {
        const error = input.parentElement.querySelector(".error");
        if (!input.value.trim() || (input.type === "email" && !input.validity.valid)) {
          valid = false;
          if (error) error.textContent = input.type === "email" ? "Please enter a valid email." : "This field is required.";
        } else if (error) {
          error.textContent = "";
        }
      });

      if (valid) {
        result.textContent = "Thank you! Your message has been validated. Connect the form to a backend or form service to receive submissions.";
        result.className = "success";
        form.reset();
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(el => obs.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("visible"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  if (canUseSpaRouting()) {
    setupNavigation();
  }
  initializePage();
});

window.addEventListener("popstate", () => {
  const page = location.pathname.split("/").pop() || "index.html";
  setActiveNav(page);
});
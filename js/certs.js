(function () {
  const CERTS = [
    {
      name: "Memulai Pemrograman dengan Kotlin",
      image: "assets/certificates/memulai-pemrograman-kotlin.jpg",
      verifyUrl: "https://www.dicoding.com/certificates/2VX34WQ7NZYQ",
    },
    {
      name: "Belajar Membuat Aplikasi Android untuk Pemula",
      image: "assets/certificates/belajar-membuat-aplikasi-android-pemula.jpg",
      verifyUrl: "https://www.dicoding.com/certificates/NVP74OY8OPR0",
    },
    {
      name: "Belajar Dasar AI",
      image: "assets/certificates/belajar-dasar-ai.jpg",
      verifyUrl: "https://www.dicoding.com/certificates/4EXG7705EPRL",
    },
    {
      name: "Belajar Pengembangan Aplikasi Android Intermediate",
      image:
        "assets/certificates/belajar-pengembangan-aplikasi-android-intermediate.jpg",
      verifyUrl: "https://www.dicoding.com/certificates/JLX14N8L5X72",
    },
    {
      name: "Belajar Penerapan Machine Learning untuk Android",
      image: "assets/certificates/belajar-penerapan-ml-android.jpg",
      verifyUrl: "https://www.dicoding.com/certificates/JMZV4O7WQXN9",
    },
    {
      name: "Belajar Fundamental Aplikasi Android",
      image: "assets/certificates/belajar-fundamental-aplikasi-android.jpg",
      verifyUrl: "https://www.dicoding.com/certificates/QLZ9V3829X5D",
    },
  ];
  const N = CERTS.length;
  const TOTAL = N * 3;

  const root = document.querySelector("[data-certs-carousel]");
  if (!root) return;

  const track = root.querySelector("[data-certs-track]");
  const viewport = root.querySelector(".certs-carousel__viewport");
  const prevBtn = root.querySelector("[data-certs-prev]");
  const nextBtn = root.querySelector("[data-certs-next]");
  const nameEl = document.querySelector("[data-certs-name]");
  const verifyEl = document.querySelector("[data-certs-verify]");

  const lightbox = document.getElementById("certsLightbox");
  const lightboxImg = document.getElementById("certsLightboxImg");

  let current = N; // start centered on the first real cert (middle copy)

  function buildSlides() {
    track.innerHTML = "";
    for (let k = 0; k < TOTAL; k++) {
      const cert = CERTS[k % N];
      const slide = document.createElement("div");
      slide.className = "certs-carousel__slide";
      const img = document.createElement("img");
      img.src = cert.image;
      img.alt = cert.name;
      img.loading = "lazy";
      slide.appendChild(img);
      slide.addEventListener("click", () => onSlideClick(k));
      track.appendChild(slide);
    }
  }

  function onSlideClick(k) {
    if (k === current) {
      openLightbox(CERTS[k % N]);
    } else {
      goTo(k);
    }
  }

  function openLightbox(cert) {
    lightboxImg.src = cert.image;
    lightboxImg.alt = cert.name;
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.setAttribute("data-open", "true"));
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.setAttribute("data-open", "false");
    document.body.style.overflow = "";
    setTimeout(() => {
      lightbox.hidden = true;
    }, 200);
  }

  lightbox.querySelectorAll("[data-certs-lightbox-close]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.getAttribute("data-open") === "true")
      closeLightbox();
  });

  function slideMetrics() {
    const slide = track.children[0];
    const style = getComputedStyle(slide);
    return {
      width: slide.offsetWidth,
      gap: parseFloat(style.marginLeft) + parseFloat(style.marginRight),
    };
  }

  function render(animate) {
    const { width, gap } = slideMetrics();
    const step = width + gap;
    const offset = viewport.clientWidth / 2 - width / 2;
    const x = offset - current * step;

    if (animate) {
      track.style.transition = "transform 0.5s var(--ease)";
      track.style.transform = `translateX(${x}px)`;
    } else {
      track.style.transition = "none";
      track.style.transform = `translateX(${x}px)`;
      void track.offsetHeight;
    }

    const activeCert = current % N;
    [...track.children].forEach((slide, k) => {
      slide.classList.toggle("is-active", k % N === activeCert);
    });

    const cert = CERTS[current % N];
    nameEl.textContent = cert.name;
    verifyEl.href = cert.verifyUrl;
  }

  function recenterIfNeeded() {
    if (current >= N * 2) {
      current -= N;
      render(false);
    } else if (current < N) {
      current += N;
      render(false);
    }
  }

  function goTo(k) {
    current = k;
    render(true);
    track.addEventListener("transitionend", recenterIfNeeded, { once: true });
  }

  nextBtn.addEventListener("click", () => goTo(current + 1));
  prevBtn.addEventListener("click", () => goTo(current - 1));
  window.addEventListener("resize", () => render(false));

  buildSlides();
  render(false);
})();

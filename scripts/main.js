function handleHeaderOnScroll() {
    const header = document.getElementById('header-js');
    const logoGdo = document.getElementById('logo-gdo');
    const logoSurtigas = document.getElementById('logo-surtigas');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
        header.classList.add('bg-banner');
        logoGdo.setAttribute('src', 'images/logos/logo-gdo-color.svg');
        logoSurtigas.setAttribute('src', 'images/logos/logo-surt-color.svg');
        } else {
        header.classList.remove('bg-banner');
        logoGdo.setAttribute('src', 'images/logos/logo-gdo-white.svg');
        logoSurtigas.setAttribute('src', 'images/logos/logo-surt-white.svg');
        }
    });
};


/* function swiperBeneficios() {
  const swiperNoticias = document.querySelector('.swiper-beneficios');
  if (swiperNoticias) {
      const swiper_noticias = new Swiper(swiperNoticias, {
          spaceBetween: 24,
          loop: false,
          allowTouchMove: true,
          breakpoints: {
              0: {
                  slidesPerView: 1,
              },
              1024: {
                  slidesPerView: 4,
              }
          },
          on: {
              init: function () {
                  // Ajustar inmediatamente
                  setEqualSlideHeights();

                  // Ajustar otra vez cuando carguen imágenes
                  swiperNoticias.querySelectorAll('img').forEach(img => {
                      img.addEventListener('load', () => setEqualSlideHeights());
                  });
              },
              resize: function () {
                  setEqualSlideHeights();
              }
          }
      });

      // También después de que cargue todo (seguro final)
      window.addEventListener("load", () => setEqualSlideHeights());

      function setEqualSlideHeights() {
          const slides = swiperNoticias.querySelectorAll('.swiper-slide');
          let maxHeight = 0;

          // Reset heights
          slides.forEach(slide => {
              slide.style.height = 'auto';
          });

          // Get max height
          slides.forEach(slide => {
              const height = slide.offsetHeight;
              if (height > maxHeight) {
                  maxHeight = height;
              }
          });

          // Set all to max height
          slides.forEach(slide => {
              slide.style.height = `${maxHeight}px`;
          });
      }

  } else {
      console.warn('No se encontró el contenedor .swiper-beneficios');
  }
} */


function swiperBeneficios() {
  const swiperNoticias = document.querySelector('.swiper-beneficios');
  if (swiperNoticias) {
    const swiper_noticias = new Swiper(swiperNoticias, {
      spaceBetween: 24,
      loop: false,
      allowTouchMove: true,
      breakpoints: {
        0: {
          slidesPerView: "auto",
          centeredSlides: true,
          spaceBetween: 16,
        },
        991: {
          slidesPerView: 3,
          centeredSlides: false,
        },
        1200: {
          slidesPerView: 4,
        }
      },
      on: {
        init: function () {
          setEqualCardHeights();

          swiperNoticias.querySelectorAll('img').forEach(img => {
            img.addEventListener('load', () => setEqualCardHeights());
          });
        },
        resize: function () {
          setEqualCardHeights();
        }
      }
    });

    window.addEventListener("load", () => setEqualCardHeights());

    function setEqualCardHeights() {
      const cards = swiperNoticias.querySelectorAll('.card.card-beneficio');
      let maxHeight = 0;

      // resetear alturas
      cards.forEach(card => {
        card.style.height = 'auto';
      });

      // buscar la altura más alta
      cards.forEach(card => {
        const height = card.offsetHeight;
        if (height > maxHeight) {
          maxHeight = height;
        }
      });

      // aplicar la altura máxima
      cards.forEach(card => {
        card.style.height = `${maxHeight}px`;
      });
    }

  } else {
    console.warn('No se encontró el contenedor .swiper-beneficios');
  }
}

function swiperRazones() {
  const swiperRazones = document.querySelector('.swiper-razones');
  if (swiperRazones) {
    const swiper_noticias = new Swiper(swiperRazones, {
      spaceBetween: 24,
      loop: true,
      allowTouchMove: true,
      breakpoints: {
        0: {
          slidesPerView: "auto",
          centeredSlides: true,
          spaceBetween: 16,
        },
        991: {
          slidesPerView: 3,
          centeredSlides: false,
        },
        1200: {
          slidesPerView: 3,
        }
      },
      on: {
        init: function () {
          setEqualCardHeights();

          swiperRazones.querySelectorAll('img').forEach(img => {
            img.addEventListener('load', () => setEqualCardHeights());
          });
        },
        resize: function () {
          setEqualCardHeights();
        }
      }
    });

    window.addEventListener("load", () => setEqualCardHeights());

    function setEqualCardHeights() {
      const cards = swiperRazones.querySelectorAll('.card.card-razon');
      let maxHeight = 0;

      // resetear alturas
      cards.forEach(card => {
        card.style.height = 'auto';
      });

      // buscar la altura más alta
      cards.forEach(card => {
        const height = card.offsetHeight;
        if (height > maxHeight) {
          maxHeight = height;
        }
      });

      // aplicar la altura máxima
      cards.forEach(card => {
        card.style.height = `${maxHeight}px`;
      });
    }

  } else {
    console.warn('No se encontró el contenedor .swiper-razones');
  }
}

function swiperPasos() {
  const swiperPasos = document.querySelector('.swiper-pasos');
  if (swiperPasos) {
    const swiper_pasos = new Swiper(swiperPasos, {
      spaceBetween: 24,
      loop: false,
      allowTouchMove: true,
      breakpoints: {
        0: {
          slidesPerView: "auto",
          centeredSlides: false,
          spaceBetween: 16,
        },
        991: {
          slidesPerView: 3,
          centeredSlides: false,
        },
        1200: {
          slidesPerView: 4.2,
        }
      },
      on: {
        init: function () {
          setEqualCardHeights();

          swiperPasos.querySelectorAll('img').forEach(img => {
            img.addEventListener('load', () => setEqualCardHeights());
          });
        },
        resize: function () {
          setEqualCardHeights();
        }
      }
    });

    window.addEventListener("load", () => setEqualCardHeights());

    function setEqualCardHeights() {
      const cards = swiperPasos.querySelectorAll('.card.card-beneficio');
      let maxHeight = 0;

      // resetear alturas
      cards.forEach(card => {
        card.style.height = 'auto';
      });

      // buscar la altura más alta
      cards.forEach(card => {
        const height = card.offsetHeight;
        if (height > maxHeight) {
          maxHeight = height;
        }
      });

      // aplicar la altura máxima
      cards.forEach(card => {
        card.style.height = `${maxHeight}px`;
      });
    }

  } else {
    console.warn('No se encontró el contenedor .swiper-beneficios');
  }
}

function swiperExperiencia() {
  const swiperExperiencia = document.querySelector('.swiper-experiencia');
  if (swiperExperiencia) {
    const swiper_noticias = new Swiper(swiperExperiencia, {
      spaceBetween: 32,
      loop: true,
      allowTouchMove: true,
      watchOverflow: false,
      autoplay: {
        delay: 3000, // cada 3 segundos
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 3,
          centeredSlides: false,
          spaceBetween: 16,
        },
        991: {
          slidesPerView: 3,
          centeredSlides: false,
        },
        1200: {
          slidesPerView: 6,
          centeredSlides: false,
        }
      },
    });

  } else {
    console.warn('No se encontró el contenedor .swiper-experiencia');
  }
}

function smoothScroll() {
    const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`.nav-link[href="#${id}"]`);

        if (entry.isIntersecting) {
          navLinks.forEach((lnk) => lnk.classList.remove("active"));
          link.classList.add("active");

          // 👇 hace visible el link activo
          link.scrollIntoView({
            behavior: "smooth",
            inline: "center", // lo centra en el scroll horizontal
            block: "nearest",
          });
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

function scrollToSection() {
    const nav = document.querySelector('.nav-responsive');
let lastScrollTop = 0;
let ignoreScroll = false; // <- flag

// --- Detectar clic en enlaces de ancla dentro del menú ---
document.querySelectorAll('.nav-responsive a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    ignoreScroll = true; // ignorar el scroll que viene
    setTimeout(() => {
      ignoreScroll = false; // después volvemos al estado normal
    }, 800); // ajusta el tiempo al que tarde el scroll suave
  });
});

// --- Mostrar/Ocultar al hacer scroll ---
window.addEventListener('scroll', () => {
  if (ignoreScroll) return; // si venimos de ancla, no ocultar

  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // scroll hacia abajo
    nav.classList.add('hidden');
  } else {
    // scroll hacia arriba
    nav.classList.remove('hidden');
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

}



document.addEventListener('DOMContentLoaded', () => {
  handleHeaderOnScroll();
  swiperBeneficios();
  swiperRazones();
  swiperPasos();
  swiperExperiencia();
  smoothScroll();
  scrollToSection();
});
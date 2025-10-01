let ytPlayers = {};
let swiperInstance = null;

/**
 * Carga la API de YouTube si no está cargada
 */
function loadYouTubeAPI() {
    return new Promise((resolve) => {
        if (typeof YT !== 'undefined' && YT.Player) {
            resolve();
            return;
        }

        if (window.onYouTubeIframeAPIReady) {
            const originalCallback = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = function() {
                originalCallback();
                resolve();
            };
        } else {
            window.onYouTubeIframeAPIReady = resolve;
        }

        if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            script.async = true;
            document.head.appendChild(script);
        }
    });
}

/**
 * Inicializa los reproductores de YouTube incrustados.
 */
function initYouTubePlayers() {
    document.querySelectorAll('iframe[data-video-id]').forEach((iframe) => {
        const videoId = iframe.dataset.videoId;

        try {
            ytPlayers[videoId] = new YT.Player(iframe, {
                events: {
                    onReady: function(event) {
                        console.log('Reproductor de YouTube listo para:', videoId);
                        // Configurar el reproductor para mejor experiencia
                        try {
                            event.target.setPlaybackQuality('hd720');
                        } catch (e) {
                            console.warn('No se pudo establecer calidad HD:', e);
                        }
                    },
                    onStateChange: function (event) {
                        const overlay = iframe.parentElement.querySelector('.video-overlay');
                        const wrapper = iframe.parentElement;

                        if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                            overlay.style.display = 'block';
                            wrapper.classList.add('video-paused');
                        } else if (event.data === YT.PlayerState.PLAYING) {
                            overlay.style.display = 'none';
                            wrapper.classList.remove('video-paused');
                        } else if (event.data === YT.PlayerState.BUFFERING) {
                            overlay.style.display = 'block';
                        }
                    },
                    onError: function(event) {
                        console.error('Error en reproductor de YouTube:', event.data);
                        const overlay = iframe.parentElement.querySelector('.video-overlay');
                        overlay.style.display = 'block';
                        overlay.innerHTML = '<div class="error-message">Error al cargar el video</div>';
                    }
                }
            });
        } catch (error) {
            console.error('Error al inicializar reproductor de YouTube:', error);
            // Limpiar el objeto si hay error
            delete ytPlayers[videoId];
        }
    });
}

/**
 * Carga el iframe de YouTube al hacer clic en el placeholder.
 */
async function loadVideoOnClick() {
    const videoId = this.dataset.videoId;

    const wrapper = document.createElement("div");
    wrapper.className = "video-wrapper";

    const iframe = document.createElement("iframe");
    // Configuración optimizada para YouTube Shorts
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&controls=1&rel=0&modestbranding=1&playsinline=1&fs=1&cc_load_policy=0&iv_load_policy=3&showinfo=0`;
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allow", "autoplay; encrypted-media; fullscreen");
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("playsinline", "true");
    iframe.className = "yt-iframe";
    iframe.dataset.videoId = videoId;
    iframe.style.width = "100%";
    iframe.style.height = "640px";

    const overlay = document.createElement("div");
    overlay.className = "video-overlay";
    Object.assign(overlay.style, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: "2",
        display: "none",
        cursor: "pointer"
    });

    // Variables para control de gestos
    let touchStartX = 0;
    let touchStartY = 0;
    let isDragging = false;

    // Manejar clicks en el overlay de forma inteligente
    overlay.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Solo procesar si no es un drag
        if (!isDragging) {
            // Si el video está pausado, intentar reproducirlo
            if (ytPlayers[videoId] && typeof ytPlayers[videoId].playVideo === 'function') {
                try {
                    ytPlayers[videoId].playVideo();
                } catch (error) {
                    console.warn('Error al reproducir video:', error);
                }
            } else {
                // Si no hay reproductor o no se puede reproducir, ir al siguiente slide
                if (swiperInstance) swiperInstance.slideNext();
            }
        }
    });

    // Manejar gestos táctiles para navegación
    overlay.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isDragging = false;
    });

    overlay.addEventListener("touchmove", (e) => {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Si el movimiento horizontal es mayor que el vertical, es un swipe
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            isDragging = true;
            e.preventDefault();
        }
    });

    overlay.addEventListener("touchend", (e) => {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Si es un swipe horizontal significativo
        if (isDragging && Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0 && swiperInstance) {
                // Swipe izquierda - siguiente slide
                swiperInstance.slideNext();
            } else if (diffX < 0 && swiperInstance) {
                // Swipe derecha - slide anterior
                swiperInstance.slidePrev();
            }
        }
        
        // Reset
        touchStartX = 0;
        touchStartY = 0;
        isDragging = false;
    });

    // Agregar clase para identificar el wrapper
    wrapper.classList.add('video-wrapper');
    wrapper.style.position = "relative";
    wrapper.appendChild(iframe);
    wrapper.appendChild(overlay);

    // Agregar listener para detectar interacción con controles de YouTube
    wrapper.addEventListener('click', (e) => {
        // Si el click es en el iframe (controles de YouTube), no interferir
        if (e.target === iframe) {
            return;
        }
    });

    this.replaceWith(wrapper);

    // Cargar la API de YouTube y luego inicializar los reproductores
    await loadYouTubeAPI();
    initYouTubePlayers();
}

/**
 * Limpia un reproductor de YouTube de forma segura
 */
function cleanupYouTubePlayer(videoId) {
    if (ytPlayers[videoId]) {
        try {
            // Verificar si el reproductor está listo antes de intentar pausarlo
            if (typeof ytPlayers[videoId].pauseVideo === 'function') {
                ytPlayers[videoId].pauseVideo();
            }
        } catch (error) {
            console.warn('Error al pausar video durante limpieza:', error);
        } finally {
            delete ytPlayers[videoId];
        }
    }
}

/**
 * Inicializa los placeholders de video.
 */
function setupVideoPlaceholders() {
    document.querySelectorAll('.video-placeholder').forEach(placeholder => {
        placeholder.addEventListener('click', loadVideoOnClick);
    });
}

/**
 * Inicializa Swiper y configura el cambio de slide para reiniciar videos.
 */
function initSwiper() {
    // Verificar que Swiper esté disponible
    if (typeof Swiper === 'undefined') {
        console.error('Swiper no está cargado. Asegúrate de incluir la librería de Swiper.');
        return;
    }

    swiperInstance = new Swiper(".effectCardsSwiper", {
        effect: "cards",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        cardsEffect: {
            rotate: false,        
            slideShadows: false,
            perSlideOffset: 10,
            perSlideRotate: 0
        },
        on: {
            slideChange: function () {
                const slides = document.querySelectorAll(".swiper-slide");

                slides.forEach((slide, index) => {
                    if (index !== swiperInstance.activeIndex) {
                        const iframeWrapper = slide.querySelector(".video-wrapper");
                        if (iframeWrapper) {
                            const iframe = iframeWrapper.querySelector("iframe");
                            const videoId = iframe.dataset.videoId;

                            if (videoId) {
                                // Limpiar el reproductor de YouTube de forma segura
                                cleanupYouTubePlayer(videoId);

                                const placeholder = document.createElement("div");
                                placeholder.className = "video-placeholder";
                                placeholder.dataset.videoId = videoId;

                                const img = document.createElement("img");
                                img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                                img.alt = "Preview video";
                                img.className = "img-fluid";
                                img.width = "424";
                                img.height = "640";
                                img.loading = "lazy";
                                img.fetchPriority = "auto";
                                placeholder.appendChild(img);

                                const btn = document.createElement("button");
                                btn.className = "btn-play";
                                btn.type = "button";
                                btn.setAttribute("aria-label", "Play video");
                                btn.innerHTML = '<span class="icon-youtube"></span>';
                                placeholder.appendChild(btn);

                                placeholder.addEventListener("click", loadVideoOnClick);

                                iframeWrapper.replaceWith(placeholder);
                            }
                        }
                    }
                });
            }
        },
    });
}

/**
 * Esta función debe estar en el scope global para la API de YouTube.
 */
window.onYouTubeIframeAPIReady = function () {
    initYouTubePlayers();
};

/**
 * Limpia todos los reproductores de YouTube
 */
function cleanupAllYouTubePlayers() {
    Object.keys(ytPlayers).forEach(videoId => {
        cleanupYouTubePlayer(videoId);
    });
}

/**
 * Ejecutar cuando el DOM esté cargado.
 */
document.addEventListener("DOMContentLoaded", () => {
    // Verificar que el elemento Swiper existe antes de inicializar
    if (document.querySelector('.effectCardsSwiper')) {
        setupVideoPlaceholders();
        initSwiper();
    }
});

// Limpiar reproductores cuando se cierre la página
window.addEventListener('beforeunload', cleanupAllYouTubePlayers);
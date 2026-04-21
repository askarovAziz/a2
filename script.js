// ========================================
// SPA WEBSITE - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  function getLowestPriceFromCard(card, priceSelector) {
    const priceNodes = card.querySelectorAll(priceSelector);
    if (!priceNodes.length) return Number.POSITIVE_INFINITY;

    const prices = Array.from(priceNodes)
      .map((node) => {
        const match = node.textContent.replace(/,/g, '').match(/\d+/);
        return match ? Number.parseInt(match[0], 10) : Number.POSITIVE_INFINITY;
      })
      .filter((price) => Number.isFinite(price));

    return prices.length ? Math.min(...prices) : Number.POSITIVE_INFINITY;
  }

  function sortCardsByAscendingPrice(gridSelector, cardSelector, priceSelector) {
    const grid = document.querySelector(gridSelector);
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll(cardSelector));
    if (cards.length < 2) return;

    cards
      .sort((leftCard, rightCard) => {
        const leftPrice = getLowestPriceFromCard(leftCard, priceSelector);
        const rightPrice = getLowestPriceFromCard(rightCard, priceSelector);
        return leftPrice - rightPrice;
      })
      .forEach((card) => grid.appendChild(card));
  }

  function ensureFloatingThemeToggle() {
    const existingBtn = document.getElementById('floatingThemeToggleBtn');
    if (existingBtn) return existingBtn;

    let floatingMessengers = document.querySelector('.floating-messengers');
    if (!floatingMessengers) {
      floatingMessengers = document.createElement('div');
      floatingMessengers.className = 'floating-messengers';
      floatingMessengers.setAttribute('aria-label', 'Quick messengers');

      const messengers = [
        {
          className: 'whatsapp',
          href: 'https://wa.me/971504715070',
          label: 'Chat in WhatsApp',
          iconPath: 'M20.52 3.48A11.85 11.85 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.16 1.6 5.98L0 24l6.3-1.64a11.87 11.87 0 0 0 5.75 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.44-8.45Zm-8.47 18.4h-.01a9.9 9.9 0 0 1-5.04-1.37l-.36-.22-3.73.97 1-3.64-.24-.37a9.9 9.9 0 0 1-1.52-5.34c0-5.48 4.46-9.94 9.94-9.94a9.84 9.84 0 0 1 7.04 2.91 9.88 9.88 0 0 1 2.9 7.05c0 5.48-4.45 9.94-9.94 9.94Zm5.45-7.42c-.3-.15-1.78-.88-2.06-.98-.27-.1-.47-.15-.66.15-.2.3-.76.98-.94 1.18-.17.2-.35.22-.64.07-.3-.15-1.27-.47-2.41-1.5a9.08 9.08 0 0 1-1.68-2.08c-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.6-.91-2.18-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.52.08-.8.37s-1.04 1.02-1.04 2.5 1.07 2.9 1.22 3.1c.15.2 2.1 3.21 5.1 4.5.71.3 1.27.48 1.7.61.71.22 1.36.19 1.87.12.57-.08 1.78-.73 2.03-1.44.25-.72.25-1.34.17-1.47-.07-.12-.27-.2-.57-.34Z'
        },
        {
          className: 'telegram',
          href: 'https://t.me/+971504715070',
          label: 'Chat in Telegram',
          iconPath: 'M23.22 4.3a1.6 1.6 0 0 0-1.8-.27L1.1 11.9a1.52 1.52 0 0 0 .06 2.84l4.67 1.63 1.81 5.56c.21.65 1.03.86 1.54.4l2.6-2.36 4.95 3.65c.66.48 1.6.1 1.73-.69L23.97 5.9c.09-.61-.18-1.22-.75-1.6ZM8.27 20.1l-1.34-4.13 9.6-6.1a.45.45 0 0 0-.47-.77l-10.57 5.8-3.45-1.21L21.5 6.2l-3.26 15.15-4.95-3.64a1.28 1.28 0 0 0-1.62.08L8.27 20.1Z'
        }
      ];

      messengers.forEach((messenger) => {
        const link = document.createElement('a');
        link.className = `floating-messenger ${messenger.className}`;
        link.href = messenger.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', messenger.label);

        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('width', '28');
        icon.setAttribute('height', '28');
        icon.setAttribute('viewBox', '0 0 24 24');
        icon.setAttribute('fill', 'none');
        icon.setAttribute('aria-hidden', 'true');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('fill', 'currentColor');
        path.setAttribute('d', messenger.iconPath);

        icon.appendChild(path);
        link.appendChild(icon);
        floatingMessengers.appendChild(link);
      });

      document.body.appendChild(floatingMessengers);
    }

    let floatingActions = document.querySelector('.floating-actions');
    if (!floatingActions) {
      floatingActions = document.createElement('div');
      floatingActions.className = 'floating-actions';
      floatingActions.setAttribute('aria-label', 'Quick actions');
      document.body.appendChild(floatingActions);
    }

    const floatingThemeToggleBtn = document.createElement('button');
    floatingThemeToggleBtn.className = 'floating-action floating-theme-toggle';
    floatingThemeToggleBtn.id = 'floatingThemeToggleBtn';
    floatingThemeToggleBtn.type = 'button';
    floatingThemeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
    floatingThemeToggleBtn.setAttribute('aria-pressed', 'false');
    floatingThemeToggleBtn.textContent = 'Dark';
    floatingActions.appendChild(floatingThemeToggleBtn);

    if (!floatingActions.querySelector('.floating-call')) {
      const floatingCallLink = document.createElement('a');
      floatingCallLink.className = 'floating-action floating-call';
      floatingCallLink.href = 'tel:+971504715070';
      floatingCallLink.setAttribute('aria-label', 'Call us');
      floatingCallLink.textContent = 'Call Us';
      floatingActions.appendChild(floatingCallLink);
    }

    return floatingThemeToggleBtn;
  }

  // ========================================
  // HEADER SCROLL EFFECT
  // ========================================
  const header = document.getElementById('header');
  let lastScrollY = 0;

  function handleHeaderScroll() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleHeaderScroll);


  // ========================================
  // THEME TOGGLE (DARK/LIGHT)
  // ========================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  const floatingThemeToggleBtn = ensureFloatingThemeToggle();

  function applyTheme(theme) {
    const normalizedTheme = theme === 'light' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', normalizedTheme);
    localStorage.setItem('spa-theme', normalizedTheme);

    const nextLabel = normalizedTheme === 'dark' ? 'Light' : 'Dark';
    const switchToLabel = normalizedTheme === 'dark' ? 'light' : 'dark';

    [themeToggleBtn, mobileThemeToggleBtn, floatingThemeToggleBtn].forEach((btn) => {
      if (!btn) return;
      btn.textContent = nextLabel;
      btn.setAttribute('aria-label', `Switch to ${switchToLabel} mode`);
      btn.setAttribute('aria-pressed', String(normalizedTheme === 'light'));
    });
  }

  const savedTheme = localStorage.getItem('spa-theme');
  applyTheme(savedTheme || 'dark');

  [themeToggleBtn, mobileThemeToggleBtn, floatingThemeToggleBtn].forEach((btn) => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  });

  sortCardsByAscendingPrice('#massagesGrid', '.massage-card', '.price-amount');
  sortCardsByAscendingPrice('#massage .services-grid', '.service-card', '.pricing-amount');

  // ========================================
  // MOBILE MENU
  // ========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');

  if (mobileMenuBtn && mobileNav) {
    const setMobileMenuState = (isOpen) => {
      mobileMenuBtn.classList.toggle('active', isOpen);
      mobileNav.classList.toggle('active', isOpen);
      mobileNavOverlay?.classList.toggle('active', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
    };

    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileNav.classList.contains('active');
      setMobileMenuState(isOpen);
    });


    mobileNavOverlay?.addEventListener('click', () => {
      setMobileMenuState(false);
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element) || !mobileNav.classList.contains('active')) return;
      if (mobileNav.contains(target) || mobileMenuBtn.contains(target)) return;
      setMobileMenuState(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobileNav.classList.contains('active')) {
        setMobileMenuState(false);
      }
    });

    // Close mobile menu on link click
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        setMobileMenuState(false);
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && mobileNav.classList.contains('active')) {
        setMobileMenuState(false);
      }
    });
  }

  // ========================================
  // HEALERS VIDEO RESILIENCE
  // ========================================
  const healersVideo = document.getElementById('healersVideo');
  const healersVideoFallback = document.getElementById('healersVideoFallback');
  const videoPlayBtn = document.getElementById('videoPlayBtn');
  const videoPauseBtn = document.getElementById('videoPauseBtn');
  const videoMuteBtn = document.getElementById('videoMuteBtn');

  if (healersVideo) {
    const revealVideoFallback = () => {
      if (!healersVideoFallback) return;
      healersVideoFallback.hidden = false;
    };

    const hideVideoFallback = () => {
      if (!healersVideoFallback) return;
      healersVideoFallback.hidden = true;
    };

    const attemptVideoPlayback = () => {
      const playPromise = healersVideo.play();

      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            hideVideoFallback();
          })
          .catch(() => {
            revealVideoFallback();
          });
      }
    };

    healersVideo.addEventListener('canplay', hideVideoFallback);
    healersVideo.addEventListener('playing', hideVideoFallback);
    healersVideo.addEventListener('error', revealVideoFallback);

    attemptVideoPlayback();

    const resumePlaybackEvents = ['click', 'touchstart', 'keydown'];
    const resumeOnInteraction = () => {
      attemptVideoPlayback();
      resumePlaybackEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resumeOnInteraction);
      });
    };

    resumePlaybackEvents.forEach((eventName) => {
      window.addEventListener(eventName, resumeOnInteraction, { once: true, passive: true });
    });

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        attemptVideoPlayback();
      }
    });

    const updateMuteButtonLabel = () => {
      if (!videoMuteBtn) return;
      const isMuted = healersVideo.muted;
      videoMuteBtn.textContent = isMuted ? 'Unmute' : 'Mute';
      videoMuteBtn.setAttribute('aria-pressed', String(isMuted));
    };

    videoPlayBtn?.addEventListener('click', () => {
      attemptVideoPlayback();
    });

    videoPauseBtn?.addEventListener('click', () => {
      healersVideo.pause();
    });

    videoMuteBtn?.addEventListener('click', () => {
      healersVideo.muted = !healersVideo.muted;
      updateMuteButtonLabel();
    });

    healersVideo.addEventListener('volumechange', updateMuteButtonLabel);
    updateMuteButtonLabel();
  }

  // ========================================
  // MASSAGES FILTER TABS + SEE MORE/LESS
  // ========================================
  const filterButtons = document.querySelectorAll('.massages-filter-btn');
  const massageCards = Array.from(document.querySelectorAll('#massagesGrid .massage-card'));
  const massagesGrid = document.getElementById('massagesGrid');
  const massagesToggleBtn = document.getElementById('massagesToggleBtn');

  if (filterButtons.length > 0 && massageCards.length > 0 && massagesGrid && massagesToggleBtn) {
    let activeFilter = 'all';
    let isExpanded = false;

    const MOBILE_BREAKPOINT = 768;
    const getCollapsedLimit = () => (window.innerWidth <= MOBILE_BREAKPOINT ? 4 : 9);

    const applyMassagesState = ({ animate = true } = {}) => {
      const previousHeight = massagesGrid.scrollHeight;

      if (animate) {
        massagesGrid.style.maxHeight = `${previousHeight}px`;
        void massagesGrid.offsetHeight;
      }

      const visibleCards = massageCards.filter((card) => {
        const category = card.dataset.category;
        return activeFilter === 'all' || category === activeFilter;
      });

      const collapsedLimit = getCollapsedLimit();
      const hasOverflow = visibleCards.length > collapsedLimit;
      const shouldExpand = isExpanded && hasOverflow;
      const cardsToShowCount = shouldExpand ? visibleCards.length : Math.min(visibleCards.length, collapsedLimit);

      massageCards.forEach((card) => card.classList.add('is-hidden'));

      visibleCards.forEach((card, index) => {
        card.classList.toggle('is-hidden', index >= cardsToShowCount);
      });

      massagesToggleBtn.classList.toggle('is-hidden', !hasOverflow);
      massagesToggleBtn.hidden = !hasOverflow;

      if (!hasOverflow) {
        isExpanded = false;
        massagesToggleBtn.textContent = 'See more';
        massagesToggleBtn.setAttribute('aria-expanded', 'false');
        massagesGrid.style.maxHeight = '';
        return;
      }

      massagesToggleBtn.textContent = shouldExpand ? 'See Less' : 'See more';
      massagesToggleBtn.setAttribute('aria-expanded', String(shouldExpand));

      const targetHeight = massagesGrid.scrollHeight;

      massagesGrid.style.maxHeight = `${targetHeight}px`;

      if (shouldExpand) {
        window.setTimeout(() => {
          if (isExpanded && activeFilter) {
            massagesGrid.style.maxHeight = 'none';
          }
        }, 420);
      }
    };

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.filter || 'all';
        isExpanded = false;

        filterButtons.forEach((btn) => {
          const isActive = btn === button;
          btn.classList.toggle('active', isActive);
          btn.setAttribute('aria-selected', String(isActive));
        });

        applyMassagesState({ animate: true });
      });
    });

    massagesToggleBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      applyMassagesState({ animate: true });
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        applyMassagesState({ animate: false });
      }, 120);
    });

    massagesGrid.style.overflow = 'hidden';
    massagesGrid.style.transition = 'max-height 0.42s ease';
    applyMassagesState({ animate: false });
  }

  // ========================================
  // HERO SLIDER - DIOR STYLE
  // ========================================
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.hero-nav-prev');
  const nextBtn = document.querySelector('.hero-nav-next');
  
  let currentSlide = 0;
  let slideInterval = null;
  const slideDuration = 6000; // 6 seconds per slide

  function stopSlideshow() {
    if (slideInterval !== null) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  function goToSlide(index) {
    if (slides.length === 0) return;

    const totalSlides = slides.length;
    currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('active', slideIndex === currentSlide);
    });

    indicators.forEach((indicator, indicatorIndex) => {
      indicator.classList.toggle('active', indicatorIndex === currentSlide);
    });
  }

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  function startSlideshow() {
    stopSlideshow();
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  function resetSlideshow() {
    startSlideshow();
  }

  // Initialize slideshow
  if (slides.length > 0) {
    goToSlide(0);
    startSlideshow();

    // Navigation arrows
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSlideshow();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSlideshow();
      });
    }

    // Indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        goToSlide(index);
        resetSlideshow();
      });
    });

    // Keep autoplay running continuously (including while hovering hero section)
    const heroSection = document.querySelector('.hero-dior');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => {
        resetSlideshow();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        resetSlideshow();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetSlideshow();
      }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
      heroSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      heroSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        resetSlideshow();
      }
    }
  }


  // ========================================
  // HEALERS CENTER-MODE CAROUSEL
  // ========================================
  const healersCarousel = document.querySelector('[data-healers-carousel]');

  if (healersCarousel) {
    const viewport = healersCarousel.querySelector('.healers-viewport');
    const track = healersCarousel.querySelector('.healers-track');
    const prevHealerBtn = healersCarousel.querySelector('.healers-nav-prev');
    const nextHealerBtn = healersCarousel.querySelector('.healers-nav-next');

    if (viewport && track) {
      const originalSlides = Array.from(track.querySelectorAll('.healer-slide'));
      const totalSlides = originalSlides.length;
      const clonesPerSide = Math.min(4, totalSlides);
      let currentIndex = 0;
      let isAnimating = false;

      const createClone = (slide) => {
        const clone = slide.cloneNode(true);
        clone.classList.add('is-clone');
        clone.setAttribute('aria-hidden', 'true');
        return clone;
      };

      const prepended = originalSlides.slice(-clonesPerSide).map(createClone);
      const appended = originalSlides.slice(0, clonesPerSide).map(createClone);

      prepended.forEach((clone) => track.prepend(clone));
      appended.forEach((clone) => track.append(clone));

      const allSlides = Array.from(track.querySelectorAll('.healer-slide'));
      const baseOffset = clonesPerSide;

      const getLoopDistance = (realIndex, targetIndex) => {
        const direct = targetIndex - realIndex;
        const wrapForward = targetIndex - (realIndex - totalSlides);
        const wrapBackward = targetIndex - (realIndex + totalSlides);
        return [direct, wrapForward, wrapBackward].reduce((best, value) => {
          return Math.abs(value) < Math.abs(best) ? value : best;
        }, direct);
      };

      const computeScale = (distance) => {
        if (distance === 0) return 1;
        if (distance === 1) return 0.9;
        if (distance === 2) return 0.8;
        return 0.7;
      };

      const updateSlideStates = () => {
        allSlides.forEach((slide) => {
          const realIndex = Number(slide.dataset.realIndex || 0);
          const distance = Math.abs(getLoopDistance(realIndex, currentIndex));
          const translateX = getLoopDistance(realIndex, currentIndex) * 6;
          const scale = computeScale(distance);

          slide.style.transform = `translateX(${translateX}px) scale(${scale})`;
          slide.classList.toggle('is-center', distance === 0);
          slide.classList.toggle('is-near', distance === 1);
          slide.classList.toggle('is-outer', distance === 2);
          slide.classList.toggle('is-far', distance >= 3);
        });
      };

      const updateTrackPosition = (shouldAnimate = true) => {
        const activeDomIndex = baseOffset + currentIndex;
        const activeSlide = allSlides[activeDomIndex];
        const viewportWidth = viewport.clientWidth;
        const slideWidth = activeSlide.offsetWidth;
        const offset = activeSlide.offsetLeft - (viewportWidth - slideWidth) / 2;

        track.style.transition = shouldAnimate
          ? 'transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)'
          : 'none';
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      };

      const normalizeIndex = (shouldAnimate = false) => {
        if (currentIndex >= totalSlides) {
          currentIndex = 0;
          updateTrackPosition(shouldAnimate);
        } else if (currentIndex < 0) {
          currentIndex = totalSlides - 1;
          updateTrackPosition(shouldAnimate);
        }

        updateSlideStates();
      };

      const moveTo = (nextIndex) => {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = nextIndex;
        updateSlideStates();
        updateTrackPosition(true);

        window.setTimeout(() => {
          normalizeIndex(false);
          isAnimating = false;
        }, 780);
      };

      const nextHealer = () => moveTo(currentIndex + 1);
      const prevHealer = () => moveTo(currentIndex - 1);

      prevHealerBtn?.addEventListener('click', prevHealer);
      nextHealerBtn?.addEventListener('click', nextHealer);

      let touchStartX = 0;
      viewport.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
      }, { passive: true });

      viewport.addEventListener('touchend', (event) => {
        const touchEndX = event.changedTouches[0].screenX;
        const delta = touchStartX - touchEndX;
        if (Math.abs(delta) < 50) return;
        if (delta > 0) {
          nextHealer();
        } else {
          prevHealer();
        }
      }, { passive: true });

      window.addEventListener('resize', () => {
        updateTrackPosition(false);
        updateSlideStates();
      });

      updateSlideStates();
      updateTrackPosition(false);
    }
  }

  // ========================================
  // SMOOTH SCROLL
  // ========================================
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // SCROLL ANIMATIONS
  // ========================================
  const animatedElements = document.querySelectorAll(
    '.feature-card, .legend-card, .massage-card, .info-block, .quote-block'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });


  // ========================================
  // LEGEND LINE-BY-LINE REVEAL
  // ========================================
  const legendSection = document.querySelector('.legend');

  if (legendSection) {
    const legendParagraphs = legendSection.querySelectorAll('.legend-paragraph, .legend-paragraph-highlight');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const splitLegendParagraphIntoLines = (paragraph) => {
      const pieces = [];
      let current = [];

      paragraph.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
          pieces.push(current);
          current = [];
        } else {
          current.push(node);
        }
      });

      if (current.length) {
        pieces.push(current);
      }

      const fragment = document.createDocumentFragment();

      pieces.forEach((nodes) => {
        if (!nodes.length) {
          return;
        }

        const line = document.createElement('span');
        line.className = 'legend-line';

        const inner = document.createElement('span');
        inner.className = 'legend-line-inner';

        nodes.forEach((node) => {
          inner.appendChild(node.cloneNode(true));
        });

        line.appendChild(inner);
        fragment.appendChild(line);
      });

      paragraph.innerHTML = '';
      paragraph.appendChild(fragment);
    };

    legendParagraphs.forEach(splitLegendParagraphIntoLines);

    const legendLines = legendSection.querySelectorAll('.legend-line-inner');

    if (prefersReducedMotion) {
      legendLines.forEach((line) => {
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      });
    } else {
      legendLines.forEach((line, index) => {
        line.style.setProperty('--line-index', index);
      });

      const legendObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            legendSection.classList.add('is-visible');
            legendObserver.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.25,
        rootMargin: '0px 0px -8% 0px'
      });

      legendObserver.observe(legendSection);
    }
  }

  // ========================================
  // PARALLAX EFFECT FOR HERO
  // ========================================
  const heroContent = document.querySelector('.hero-content-dior');
  
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
      }
    });
  }

  // ========================================
  // CURSOR GLOW EFFECT (DESKTOP ONLY)
  // ========================================
  if (window.matchMedia('(min-width: 1024px)').matches) {
    const glowFollower = document.createElement('div');
    glowFollower.className = 'cursor-glow';
    glowFollower.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(212, 165, 116, 0.08) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease;
      opacity: 0;
    `;
    document.body.appendChild(glowFollower);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glowFollower.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      glowFollower.style.opacity = '0';
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      glowFollower.style.left = glowX + 'px';
      glowFollower.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // ========================================
  // PRELOAD IMAGES
  // ========================================
  const imagesToPreload = [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/moroccan-bath-XeSTABgX7qKMFfD8tpaA28jun8mEiK.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hot-stone-ozcMxcP4p2LRpwfWkz6xlxcogUApC0.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/deep-tissue-D1EGarHWurusc7dncBgiNhIpKjE5Lf.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/four-hands-Puk08W7r8o1fBXEjfwXtiHEmC1mv6J.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/swedish-massage-C2bJ9ZEZfTErQx0yC2a469A6nhSZVx.jpg'
  ];

  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  console.log('SPA - All systems initialized');
});

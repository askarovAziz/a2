// ============================================
// THERAPISTS SLIDER FUNCTIONALITY
// ============================================

class TherapistsSlider {
  constructor() {
    this.currentIndex = 0;
    this.slider = document.getElementById('therapistSlider');
    this.track = this.slider?.querySelector('.slider-track');
    this.slides = this.slider?.querySelectorAll('.slider-card') || [];
    this.dotsContainer = document.getElementById('sliderDots');
    this.progressBar = document.getElementById('sliderProgress');
    this.prevBtn = this.slider?.querySelector('.slider-prev');
    this.nextBtn = this.slider?.querySelector('.slider-next');
    this.indicators = [];
    
    if (this.slides.length > 0) {
      this.init();
    }
  }

  init() {
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    this.createIndicators();
    window.addEventListener('resize', () => this.updateSlider());

    this.updateSlider();
  }

  getCardStep() {
    if (!this.slides.length) return 0;
    const slideRect = this.slides[0].getBoundingClientRect();
    const trackStyles = window.getComputedStyle(this.track);
    const gap = parseFloat(trackStyles.gap || trackStyles.columnGap || '0') || 0;
    return slideRect.width + gap;
  }

  getVisibleSlides() {
    if (!this.slider || !this.slides.length) return 1;
    const sliderWidth = this.slider.clientWidth;
    const cardStep = this.getCardStep();
    if (!cardStep) return 1;
    return Math.max(1, Math.floor((sliderWidth + 1) / cardStep));
  }

  getMaxIndex() {
    return Math.max(0, this.slides.length - this.getVisibleSlides());
  }

  createIndicators() {
    if (!this.dotsContainer) return;

    const totalPositions = this.getMaxIndex() + 1;
    this.dotsContainer.innerHTML = '';
    this.indicators = [];

    for (let i = 0; i < totalPositions; i += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slider-dot';
      dot.setAttribute('aria-label', `Go to therapist group ${i + 1}`);
      dot.addEventListener('click', () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
      this.indicators.push(dot);
    }
  }

  next() {
    if (this.currentIndex >= this.getMaxIndex()) {
      this.currentIndex = 0;
    } else {
      this.currentIndex += 1;
    }
    this.updateSlider();
  }

  prev() {
    if (this.currentIndex <= 0) {
      this.currentIndex = this.getMaxIndex();
    } else {
      this.currentIndex -= 1;
    }
    this.updateSlider();
  }

  goToSlide(index) {
    this.currentIndex = Math.min(Math.max(index, 0), this.getMaxIndex());
    this.updateSlider();
  }

  updateSlider() {
    const maxIndex = this.getMaxIndex();
    if (this.currentIndex > maxIndex) {
      this.currentIndex = maxIndex;
    }

    const totalPositions = maxIndex + 1;
    if (totalPositions !== this.indicators.length) {
      this.createIndicators();
    }

    if (this.track) {
      const offset = this.currentIndex * this.getCardStep();
      this.track.style.transform = `translateX(-${offset}px)`;
    }

    // Update indicators
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentIndex);
    });

    if (this.progressBar) {
      const progress = totalPositions <= 1 ? 100 : (this.currentIndex / maxIndex) * 100;
      this.progressBar.style.width = `${progress}%`;
    }
  }
}

// ============================================
// GALLERY LIGHTBOX FUNCTIONALITY
// ============================================

class GalleryLightbox {
  constructor() {
    this.galleryItems = document.querySelectorAll('.gallery-item');
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImg = document.querySelector('.lightbox-img');
    this.lightboxCaption = document.querySelector('.lightbox-caption');
    this.closeBtn = document.querySelector('.lightbox-close');
    this.prevBtn = document.querySelector('.lightbox-prev');
    this.nextBtn = document.querySelector('.lightbox-next');
    this.currentIndex = 0;

    if (this.galleryItems.length > 0) {
      this.init();
    }
  }

  init() {
    this.galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => this.openLightbox(index));
    });

    if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.closeLightbox());
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevImage());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextImage());

    // Close on background click
    if (this.lightbox) {
      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox) this.closeLightbox();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox?.classList.contains('active')) return;
      if (e.key === 'ArrowLeft') this.prevImage();
      if (e.key === 'ArrowRight') this.nextImage();
      if (e.key === 'Escape') this.closeLightbox();
    });
  }

  openLightbox(index) {
    this.currentIndex = index;
    const item = this.galleryItems[index];
    const img = item.querySelector('img');
    
    if (this.lightboxImg) this.lightboxImg.src = img.src;
    if (this.lightboxCaption) this.lightboxCaption.textContent = img.alt;
    
    if (this.lightbox) {
      this.lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeLightbox() {
    if (this.lightbox) {
      this.lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.galleryItems.length;
    this.openLightbox(this.currentIndex);
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
    this.openLightbox(this.currentIndex);
  }
}

// ============================================
// FORM HANDLING
// ============================================

function initForms() {
  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const name = contactForm.querySelector('[name="name"]').value;
      const email = contactForm.querySelector('[name="email"]').value;
      const phone = contactForm.querySelector('[name="phone"]').value;
      const message = contactForm.querySelector('[name="message"]').value;

      // Basic validation
      if (!name || !email || !message) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
      }

      // Success message
      const successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.textContent = '✓ Спасибо! Ваше сообщение отправлено.';
      contactForm.appendChild(successMsg);

      // Reset form
      contactForm.reset();

      // Remove success message after 5 seconds
      setTimeout(() => successMsg.remove(), 5000);
    });
  }

  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = newsletterForm.querySelector('[name="email"]').value;
      
      if (!email) {
        alert('Пожалуйста, введите ваш email');
        return;
      }

      const successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.textContent = '✓ Спасибо за подписку!';
      newsletterForm.appendChild(successMsg);

      newsletterForm.reset();
      setTimeout(() => successMsg.remove(), 5000);
    });
  }
}

// ============================================
// SMOOTH SCROLL & ANIMATIONS
// ============================================

function initScrollAnimations() {
  // Add scroll animation to elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}

// ============================================
// SMOOTH SCROLL LINKS
// ============================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// ============================================
// FILTER FUNCTIONALITY
// ============================================

function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('.filter-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter items
      filterItems.forEach(item => {
        const itemFilter = item.getAttribute('data-category');
        
        if (filter === 'all' || itemFilter === filter) {
          item.classList.add('active');
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.classList.remove('active');
          }, 300);
        }
      });
    });
  });
}

// ============================================
// INITIALIZATION ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all functionality
  new TherapistsSlider();
  new GalleryLightbox();
  initForms();
  initScrollAnimations();
  initSmoothScroll();
  initFilters();

  // Page transition animations
  const pageContent = document.querySelector('.page-content');
  if (pageContent) {
    pageContent.classList.add('fade-in');
  }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for resize events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add animation class on scroll
window.addEventListener('scroll', debounce(() => {
  document.querySelectorAll('[data-animate]').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('fade-in');
    }
  });
}, 100));

// Prevent accidental form submissions with unsaved changes
window.addEventListener('beforeunload', (e) => {
  const forms = document.querySelectorAll('form');
  let hasChanges = false;
  
  forms.forEach(form => {
    if (form.querySelector('input:not([value=""]), textarea:not([value=""])')) {
      hasChanges = true;
    }
  });

  if (hasChanges) {
    e.preventDefault();
    e.returnValue = '';
  }
});

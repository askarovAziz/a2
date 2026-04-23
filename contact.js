    // Theme Toggle
        function toggleTheme() {
          const body = document.body;
          const currentTheme = body.getAttribute('data-theme');
          const newTheme = currentTheme === 'light' ? 'dark' : 'light';
          body.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
          updateThemeLabels(newTheme);
        }
    
        function updateThemeLabels(theme) {
          const labels = document.querySelectorAll('.theme-label');
          labels.forEach(label => {
            label.textContent = theme === 'light' ? 'Dark' : 'Light';
          });
        }
    
        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        updateThemeLabels(savedTheme);
    
        // Mobile Menu
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    
        if (mobileMenuBtn) {
          mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
            mobileNavOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
          });
    
          mobileNavOverlay.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
          });
        }
    
        // Scroll Reveal Animation
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        
        const revealObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              revealObserver.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.15,
          rootMargin: '0px 0px -50px 0px'
        });
    
        revealElements.forEach(el => revealObserver.observe(el));
    
        // Header scroll effect
        window.addEventListener('scroll', () => {
          const header = document.querySelector('.header');
          if (window.scrollY > 50) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        });
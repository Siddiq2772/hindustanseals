// Add subtle interactions to enhance user experience
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const nav = document.querySelector('.navbar');

  // Sticky Navbar Effect on Scroll (Glassy Transition)
  const isHeroPage = !!document.getElementById('hero');
  const hasSlider = !!document.getElementById('hero-slider');
  const brand = nav.querySelector('.navbar-brand');

  if (hasSlider) nav.classList.add('has-slider');
  
  const updateNavbar = () => {
    const currentScrollY = window.scrollY;
    const isScrolled = currentScrollY > 150;
    const brandImg = brand ? brand.querySelector('img') : null;
    
    if (isScrolled) {
      nav.classList.add('py-1');
      nav.classList.add('scrolled');
      nav.style.background = 'var(--theme-gradient)';
      nav.style.backdropFilter = 'blur(15px)';
      nav.style.boxShadow = '0 10px 15px -10px rgba(51, 65, 85, 0.1)';
      if (brandImg) brandImg.src = 'logo.svg';
      if (brand) {
        brand.style.opacity = '1';
        brand.style.pointerEvents = 'auto';
        brand.style.transform = 'translateY(0)';
      }
    } else {
      nav.classList.remove('py-1');
      nav.classList.remove('scrolled');
      
      // If we have a slider, keep it transparent initially
      if (hasSlider) {
        nav.style.backgroundColor = 'transparent';
        nav.style.backdropFilter = 'none';
        if (brandImg) brandImg.src = 'logo.svg';
      } else {
        nav.style.background = 'var(--theme-gradient)';
        nav.style.backdropFilter = 'blur(25px)';
        if (brandImg) brandImg.src = 'logo.svg';
      }
      
      nav.style.boxShadow = 'none';
      if (brand) {
        brand.style.opacity = '1';
        brand.style.pointerEvents = 'auto';
        brand.style.transform = 'translateY(0)';
      }
    }
  };

  window.addEventListener('scroll', updateNavbar);
  updateNavbar(); // Initial check on load

  // Fade-in Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
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

  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    observer.observe(card);
  });

  // Simple Hover Effect for Logo
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      logo.style.transform = 'scale(1.05)';
      logo.style.transition = 'transform 0.3s ease';
    });
    logo.addEventListener('mouseleave', () => {
      logo.style.transform = 'scale(1)';
    });
  }

  // Section Scroll Slide & Fade Transitions
  const fadeSections = document.querySelectorAll('.fade-in-section');
  if (fadeSections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          sectionObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    });
    fadeSections.forEach(sec => sectionObserver.observe(sec));
  }

  // Stats counter animation
  const statsNumbers = document.querySelectorAll('.stat-number');
  if (statsNumbers.length > 0) {
    const countUp = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 2000; // 2 seconds
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        const current = Math.floor(easeProgress * target);
        
        el.textContent = current.toLocaleString() + suffix;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = target.toLocaleString() + suffix;
        }
      };
      requestAnimationFrame(animate);
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statsNumbers.forEach(stat => statsObserver.observe(stat));
  }
});

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
    const isScrolled = window.scrollY > 150;
    const brandImg = brand ? brand.querySelector('img') : null;
    
    if (isScrolled) {
      nav.classList.add('py-1');
      nav.classList.add('scrolled');
      nav.style.background = 'linear-gradient(135deg, rgba(240, 253, 250, 1) 0%, rgba(204, 251, 241, 0.95) 100%)'; /* Mint/Teal gradient */
      nav.style.backdropFilter = 'blur(15px)';
      nav.style.boxShadow = '0 10px 15px -10px rgba(13, 148, 136, 0.1)';
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
        nav.style.background = 'linear-gradient(135deg, rgba(240, 253, 250, 1) 0%, rgba(204, 251, 241, 0.95) 100%)';
        nav.style.backdropFilter = 'blur(25px)';
        if (brandImg) brandImg.src = 'logo.svg';
      }
      
      nav.style.boxShadow = 'none';
      // Only hide brand on desktop if we are on a hero page
      const isDesktop = window.innerWidth >= 992;
      if (brand && isHeroPage && isDesktop) {
        brand.style.opacity = '0';
        brand.style.pointerEvents = 'none';
        brand.style.transform = 'translateY(-10px)';
      } else if (brand) {
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
  logo.addEventListener('mouseenter', () => {
    logo.style.transform = 'scale(1.05)';
    logo.style.transition = 'transform 0.3s ease';
  });
  logo.addEventListener('mouseleave', () => {
    logo.style.transform = 'scale(1)';
  });
});

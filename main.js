// Add subtle interactions to enhance user experience
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const nav = document.querySelector('.navbar');

  // Sticky Navbar Effect on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('py-2');
      nav.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
    } else {
      nav.classList.remove('py-2');
      nav.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
    }
  });

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

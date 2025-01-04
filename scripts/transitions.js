document.addEventListener('DOMContentLoaded', () => {
  // Page transition effect
  const transitionElement = document.createElement('div');
  transitionElement.className = 'page-transition';
  document.body.appendChild(transitionElement);

  // Handle all internal navigation
  document.querySelectorAll('a').forEach(link => {
    if (link.hostname === window.location.hostname) {
      link.addEventListener('click', e => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        // Start transition
        transitionElement.classList.add('active');
        
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      });
    }
  });

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
  }
}); 
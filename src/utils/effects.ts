// Special Effects and Animations for React App
// Matching the enhanced effects from simplified.html

// Ripple effect function
export function createRipple(event: React.MouseEvent, element: HTMLElement) {
  const ripple = document.createElement('div');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
    z-index: 1;
  `;
  
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Enhanced hover effects with parallax
export function setupParallaxEffect(element: HTMLElement) {
  element.addEventListener('mouseenter', function(this: HTMLElement) {
    this.style.transform = 'translateY(-8px) scale(1.02)';
    this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  });
  
  element.addEventListener('mouseleave', function(this: HTMLElement) {
    this.style.transform = 'translateY(0) scale(1)';
  });

  // Mouse move parallax effect
  element.addEventListener('mousemove', function(this: HTMLElement, e: MouseEvent) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    this.style.transform = `translateY(-8px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
}

// Scroll animation observer
export function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.workspace-card, .action-card, .status-card, .stat-badge').forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
  });
}

// Particle background
export function createParticleBackground() {
  const canvas = document.createElement('canvas');
  canvas.className = 'particle-canvas';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
  }> = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }
  }

  function animateParticles() {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(37, 99, 235, 0.5)';
      ctx.fill();
    });

    requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  createParticles();
  animateParticles();

  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });

  return canvas;
}

// Welcome animation
export function showWelcomeAnimation() {
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.classList.add('welcome-animation');
    setTimeout(() => {
      hero.classList.add('visible');
    }, 100);
  }
}

// Initialize all effects
export function initializeEffects() {
  // Setup parallax effects for cards
  document.querySelectorAll('.workspace-card, .action-card').forEach(card => {
    setupParallaxEffect(card as HTMLElement);
  });

  // Stat badges animation
  document.querySelectorAll('.stat-badge').forEach(badge => {
    badge.addEventListener('mouseenter', function(this: HTMLElement) {
      this.style.transform = 'translateY(-6px) scale(1.05) rotate(2deg)';
    });
    
    badge.addEventListener('mouseleave', function(this: HTMLElement) {
      this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
  });

  // Status cards pulse animation
  document.querySelectorAll('.status-card').forEach(card => {
    card.addEventListener('mouseenter', function(this: HTMLElement) {
      const value = this.querySelector('.status-value') as HTMLElement;
      if (value) {
        value.style.animation = 'pulse 1s ease-in-out';
      }
    });
  });

  // Add floating animation delay to icons
  document.querySelectorAll('.card-icon, .action-icon').forEach((icon) => {
    (icon as HTMLElement).style.animationDelay = Math.random() * 2 + 's';
  });

  // Initialize scroll animations
  observeElements();
  
  // Initialize particle background
  createParticleBackground();
  
  // Show welcome animation
  setTimeout(() => {
    showWelcomeAnimation();
  }, 500);
}

// Theme toggle with enhanced animation
export function enhancedThemeToggle() {
  const root = document.documentElement;
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Add rotation animation to theme toggle button
  const themeButton = document.querySelector('.theme-toggle');
  if (themeButton) {
    (themeButton as HTMLElement).style.transform = 'scale(1.2) rotate(180deg)';
    setTimeout(() => {
      (themeButton as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
    }, 300);
  }
}

// Simulate real-time updates with enhanced animations
export function startRealTimeUpdates() {
  setInterval(() => {
    const alertCount = document.querySelector('.status-warning');
    if (alertCount) {
      const currentCount = parseInt(alertCount.textContent || '0');
      const newCount = Math.max(0, currentCount + Math.floor(Math.random() * 3) - 1);
      
      // Animate the change
      (alertCount as HTMLElement).style.transform = 'scale(1.2)';
      (alertCount as HTMLElement).style.color = 'var(--accent-danger)';
      
      setTimeout(() => {
        alertCount.textContent = newCount.toString();
        (alertCount as HTMLElement).style.transform = 'scale(1)';
        (alertCount as HTMLElement).style.color = 'var(--accent-warning)';
      }, 200);
    }
  }, 30000);
}

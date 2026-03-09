// Particles Network Background
// Interactive nodes that follow cursor with connections

(function() {
  'use strict';

  // Configuration
  const config = {
    particleCount: 80,
    particleSize: 2,
    baseSpeed: 0.3,
    connectionDistance: 120,
    cursorAttractionRadius: 180,
    cursorAttractionForce: 0.02,
    particleColor: 'rgba(6, 182, 212, 0.6)', // cyan-500 from theme
    lineColor: 'rgba(6, 182, 212, 0.15)',
    cursorColor: 'rgba(6, 182, 212, 0.3)'
  };

  let canvas, ctx;
  let particles = [];
  let mouse = { x: null, y: null };
  let animationId;

  class Particle {
    constructor() {
      this.reset();
      // Random initial position
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }

    reset() {
      this.vx = (Math.random() - 0.5) * config.baseSpeed;
      this.vy = (Math.random() - 0.5) * config.baseSpeed;
    }

    update() {
      // Move particle
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off edges
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Keep in bounds
      this.x = Math.max(0, Math.min(canvas.width, this.x));
      this.y = Math.max(0, Math.min(canvas.height, this.y));

      // Cursor attraction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.cursorAttractionRadius) {
          const force = (1 - distance / config.cursorAttractionRadius) * config.cursorAttractionForce;
          this.vx += dx * force;
          this.vy += dy * force;
        }
      }

      // Dampen velocity to prevent too much speed
      this.vx *= 0.98;
      this.vy *= 0.98;

      // Ensure minimum movement
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed < config.baseSpeed * 0.5) {
        this.vx += (Math.random() - 0.5) * 0.1;
        this.vy += (Math.random() - 0.5) * 0.1;
      }
    }

    draw() {
      ctx.fillStyle = config.particleColor;
      ctx.beginPath();
      ctx.arc(this.x, this.y, config.particleSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    // Find or create canvas
    canvas = document.getElementById('particles-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'particles-canvas';
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.zIndex = '0';
      canvas.style.pointerEvents = 'none';
      
      const homeSection = document.querySelector('#home');
      if (homeSection) {
        homeSection.style.position = 'relative';
        homeSection.insertBefore(canvas, homeSection.firstChild);
      } else {
        return; // No home section found
      }
    }

    ctx = canvas.getContext('2d');
    resizeCanvas();

    // Create particles
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(new Particle());
    }

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Start animation
    animate();
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  function onMouseLeave() {
    mouse.x = null;
    mouse.y = null;
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.connectionDistance) {
          const opacity = (1 - distance / config.connectionDistance) * 0.15;
          ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function drawCursor() {
    if (mouse.x === null || mouse.y === null) return;

    // Draw cursor glow
    const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 50);
    gradient.addColorStop(0, config.cursorColor);
    gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
    ctx.fill();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw cursor effect
    drawCursor();

    // Update and draw particles
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Draw connections
    drawConnections();

    animationId = requestAnimationFrame(animate);
  }

  function destroy() {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    window.removeEventListener('resize', resizeCanvas);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseleave', onMouseLeave);
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', destroy);
})();

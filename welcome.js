const logoCanvas = document.getElementById('logo-canvas');
const welcomeBtn = document.getElementById('welcome-btn');
const welcomePage = document.getElementById('welcome-page');

function initLogoAnimation() {
  if (!logoCanvas) return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, logoCanvas.width / logoCanvas.height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: logoCanvas, alpha: true });
  renderer.setSize(logoCanvas.width, logoCanvas.height);
  const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
  const material = new THREE.MeshBasicMaterial({ color: 0x00f2ff, wireframe: true });
  const logo = new THREE.Mesh(geometry, material);
  scene.add(logo);
  camera.position.z = 5;
  const animate = () => {
    requestAnimationFrame(animate);
    logo.rotation.x += 0.01;
    logo.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  animate();
}

function initParticles() {
  particlesJS('particles-canvas', {
    particles: {
      number: { value: 150 },
      color: { value: ['#00f2ff', '#ff00ff', '#00ff88'] },
      shape: { type: 'star' },
      size: { value: 4, random: true },
      move: { speed: 3, direction: 'random' },
      line_linked: { enable: true, color: '#00f2ff', opacity: 0.3 }
    },
    interactivity: { events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } } }
  });
}

welcomeBtn?.addEventListener('click', () => {
  gsap.to(welcomePage, {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    onComplete: () => {
      localStorage.setItem('authToken', 'mock-token-' + Date.now());
      window.location.href = 'live.html';
    }
  });
});

if (localStorage.getItem('authToken')) {
  window.location.href = 'live.html';
}

initLogoAnimation();
initParticles();
const lights = document.getElementById('floatingLights');
const sparkles = document.getElementById('sparkles');
const fireworks = document.getElementById('fireworks');
const celebrateBtn = document.getElementById('celebrateBtn');
const hint = document.getElementById('hint');

function addHangingLights() {
  // Small warm bulbs and dangling lantern-like lights across the upper edge.
  for (let i = 0; i < 25; i++) {
    const light = document.createElement('i');
    light.className = 'hanging-light';
    light.style.left = `${(i / 24) * 100}%`;
    light.style.setProperty('--wire', `${22 + Math.random() * 105}px`);
    light.style.setProperty('--size', `${4 + Math.random() * 5}px`);
    light.style.setProperty('--sway', `${2.2 + Math.random() * 2.5}s`);
    light.style.setProperty('--glow', `${1.2 + Math.random() * 1.8}s`);
    light.style.animationDelay = `${Math.random() * -3}s`;
    lights.appendChild(light);
  }
}
function addSparkles() {
  for (let i = 0; i < 75; i++) {
    const dot = document.createElement('i');
    dot.className = 'sparkle';
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.setProperty('--duration', `${1.8 + Math.random() * 4}s`);
    dot.style.animationDelay = `${Math.random() * -5}s`;
    sparkles.appendChild(dot);
  }
}
function burst(x, y) {
  const colors = ['#fff5bd', '#ffd35e', '#ff9e3d', '#ff6b42', '#fff'];
  const count = 12 + Math.floor(Math.random() * 8);
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('i');
    particle.className = 'firework';
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    const angle = (Math.PI * 2 * i) / count;
    const distance = 24 + Math.random() * 42;
    particle.animate([
      { transform: 'translate(0,0) scale(.5)', opacity: 1 },
      { transform: `translate(${Math.cos(angle) * distance}px,${Math.sin(angle) * distance}px) scale(.2)`, opacity: 0 }
    ], { duration: 900 + Math.random() * 600, easing: 'cubic-bezier(.1,.7,.2,1)' });
    fireworks.appendChild(particle);
    setTimeout(() => particle.remove(), 1600);
  }
  const flash = document.createElement('i');
  flash.className = 'firework';
  flash.style.left = `${x}%`;
  flash.style.top = `${y}%`;
  fireworks.appendChild(flash);
  setTimeout(() => flash.remove(), 1400);
}
let celebrationRunning = false;
function celebrate() {
  if (celebrationRunning) return;
  celebrationRunning = true;
  celebrateBtn.disabled = true;
  celebrateBtn.innerHTML = '<span class="button-spark">✧</span><span>Shubh Deepavali!</span><span class="button-spark">✧</span>';
  hint.textContent = 'Wishing you a bright and beautiful Diwali';
  // Several staggered bursts, spread around the background.
  const show = [
    [18, 24, 0], [80, 20, 220], [52, 34, 440], [29, 46, 720],
    [73, 43, 980], [12, 35, 1260], [89, 33, 1500], [48, 18, 1770],
    [65, 29, 2040], [35, 25, 2310], [82, 51, 2580], [20, 55, 2850]
  ];
  show.forEach(([x, y, delay]) => setTimeout(() => burst(x, y), delay));
  // A gentle second wave makes the celebration feel layered, not continuous.
  setTimeout(() => {
    [[25, 18], [76, 14], [50, 26], [9, 43], [91, 42]].forEach(([x, y], i) =>
      setTimeout(() => burst(x, y), i * 180));
  }, 3300);
  setTimeout(() => {
    celebrateBtn.disabled = false;
    celebrateBtn.innerHTML = '<span class="button-spark">✧</span><span>Celebrate Again</span><span class="button-spark">✧</span>';
    celebrationRunning = false;
  }, 5200);
}
addHangingLights();
addSparkles();
celebrateBtn.addEventListener('click', celebrate);

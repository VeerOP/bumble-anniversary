/**
 * I'M SO SORRY, KAVYA 🥺❤️ - INTERACTIVE LOGIC
 * Includes Web Audio synthesizers, smack minigame, runaway "NO" button,
 * canvas confetti, and peace offering voucher interactions.
 */

// ============================================================================
// 1. WEB AUDIO SYNTHESIZER ENGINE (Zero external dependencies)
// ============================================================================
let audioCtx = null;
let soundEnabled = true;
let musicEnabled = false;
let musicInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Punch / POW Sound
function playPunchSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(140, now);
  osc.frequency.exponentialRampToValueAtTime(35, now + 0.15);

  gain.gain.setValueAtTime(0.7, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.18);
}

// Chappal / Slipper THWACK Sound
function playChappalSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const bufferSize = ctx.sampleRate * 0.12;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02));
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1600;
  filter.Q.value = 3;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.9, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
}

// Tomato SPLAT Sound
function playTomatoSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(90, now + 0.2);

  gain.gain.setValueAtTime(0.6, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.22);
}

// Lightning ZAP Sound
function playZapSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.linearRampToValueAtTime(150, now + 0.18);

  gain.gain.setValueAtTime(0.4, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.2);
}

// Pillow POOF Sound
function playPillowSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(90, now);
  osc.frequency.linearRampToValueAtTime(40, now + 0.25);

  gain.gain.setValueAtTime(0.5, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.25);
}

// Voucher Stamp SLAM Sound
function playStampSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(110, now);
  osc.frequency.exponentialRampToValueAtTime(30, now + 0.14);

  gain.gain.setValueAtTime(0.8, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.15);
}

// Celebratory Chimes (Major 9th chord arpeggio)
function playSuccessFanfare() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 987.77, 1174.66, 1318.51, 1567.98]; // C5, E5, G5, B5, D6, E6, G6
  const now = ctx.currentTime;

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = freq;

    const startTime = now + idx * 0.08;
    const duration = 0.8;

    gain.gain.setValueAtTime(0.25, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  });
}

// Generative Lo-fi Peaceful Melody
function startLofiMelody() {
  if (musicInterval) return;
  const chords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 349.23], // G7
  ];

  let chordIndex = 0;

  function playChord() {
    if (!musicEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const chord = chords[chordIndex % chords.length];
    chordIndex++;
    const now = ctx.currentTime;

    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      const noteTime = now + (i * 0.12);
      gain.gain.setValueAtTime(0.06, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 2.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 2.5);
    });
  }

  playChord();
  musicInterval = setInterval(playChord, 3200);
}

function stopLofiMelody() {
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
}

// ============================================================================
// 2. SMACK VEER RAGE ROOM LOGIC
// ============================================================================
let currentWeapon = 'punch';
let hitsCount = 0;
let ragePercent = 100;
let forgivePercent = 0;

const dialogues = [
  "Ouch! Totally fair! Hit me again! 🥺",
  "I deserve that! Smack some sense into me!",
  "I am the biggest idiot on Earth, don't hold back!",
  "Another one! Take all your anger out on me!",
  "I will NEVER hurt you again Kavya, I swear on everything!",
  "Hit harder! I had zero braincells working!",
  "My skull is thick but my heart is broken without you!",
  "I'm an awful, terrible dummy, but I love you so much!",
  "Deserved! 100% deserved! Keep going!",
  "Oof! That one stung! But I deserve 10,000 more!",
  "Please let all the frustration out, I can take it!",
  "I promise to always listen and protect your peace from now on!",
  "Are your hands tired yet? Veer's face is durable!",
  "I love you Kavya, please don't be sad anymore 🥺"
];

const damagePhrases = [
  "-500 Braincells",
  "-999 Ego",
  "+1000 Remorse",
  "CRITICAL HIT! 💥",
  "DESERVED! 🤕",
  "POW! 🥊",
  "OUCH! 🩹",
  "100% GUILTY",
  "SMACK! 👋"
];

function setupSmackRoom() {
  const weaponBtns = document.querySelectorAll('.weapon-btn');
  const punchTarget = document.getElementById('punchTarget');
  const punchAvatar = document.getElementById('punchAvatar');
  const hitCountEl = document.getElementById('hitCount');
  const rageFill = document.getElementById('rageFill');
  const rageVal = document.getElementById('rageVal');
  const forgiveFill = document.getElementById('forgiveFill');
  const forgiveVal = document.getElementById('forgiveVal');
  const punchDialogue = document.getElementById('punchDialogue');
  const bandageOverlay = document.getElementById('bandageOverlay');
  const splatOverlay = document.getElementById('splatOverlay');
  const dizzyStars = document.getElementById('dizzyStars');
  const exhaustedNotice = document.getElementById('exhaustedNotice');

  // Weapon switching
  weaponBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      weaponBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentWeapon = btn.dataset.weapon;
      getAudioContext();
    });
  });

  // Target smack event
  punchTarget.addEventListener('click', (e) => {
    hitsCount++;
    hitCountEl.textContent = hitsCount;

    // Play appropriate sound
    if (currentWeapon === 'punch') playPunchSound();
    else if (currentWeapon === 'chappal') playChappalSound();
    else if (currentWeapon === 'tomato') playTomatoSound();
    else if (currentWeapon === 'zap') playZapSound();
    else if (currentWeapon === 'pillow') playPillowSound();

    // Visual squash, stretch & shake
    const randomAngle = (Math.random() - 0.5) * 30;
    const randomScaleX = 0.85 + Math.random() * 0.15;
    const randomScaleY = 1.15 - Math.random() * 0.15;
    punchAvatar.style.transform = `scale(${randomScaleX}, ${randomScaleY}) rotate(${randomAngle}deg)`;

    setTimeout(() => {
      punchAvatar.style.transform = `scale(1) rotate(0deg)`;
    }, 120);

    // Spawn damage number
    spawnDamageNumber(e.clientX, e.clientY);

    // Spawn visual weapon impact item
    spawnImpactSticker(currentWeapon, bandageOverlay, splatOverlay);

    // Update dizzy stars
    dizzyStars.classList.add('dizzy-active');

    // Update dialogues
    const randomDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
    punchDialogue.textContent = `"${randomDialogue}"`;

    // Update Meters
    ragePercent = Math.max(0, 100 - (hitsCount * 10));
    forgivePercent = Math.min(100, hitsCount * 10);

    rageFill.style.width = `${ragePercent}%`;
    rageVal.textContent = `${ragePercent}%`;

    forgiveFill.style.width = `${forgivePercent}%`;
    forgiveVal.textContent = `${forgivePercent}%`;

    // Once rage hits 0% (10 hits)
    if (hitsCount >= 10 && exhaustedNotice.style.display === 'none') {
      exhaustedNotice.style.display = 'block';
    }
  });
}

function spawnDamageNumber(x, y) {
  const damageEl = document.createElement('div');
  damageEl.className = 'damage-number';
  const phrase = damagePhrases[Math.floor(Math.random() * damagePhrases.length)];
  damageEl.textContent = phrase;

  damageEl.style.left = `${x - 40 + (Math.random() * 30 - 15)}px`;
  damageEl.style.top = `${y - 30}px`;

  document.body.appendChild(damageEl);

  setTimeout(() => {
    damageEl.remove();
  }, 900);
}

function spawnImpactSticker(weapon, bandageOverlay, splatOverlay) {
  const item = document.createElement('div');
  const posX = 15 + Math.random() * 65;
  const posY = 15 + Math.random() * 65;
  const rot = (Math.random() - 0.5) * 60;

  if (weapon === 'tomato') {
    item.className = 'splat-item';
    item.textContent = '🍅';
    item.style.left = `${posX}%`;
    item.style.top = `${posY}%`;
    item.style.transform = `rotate(${rot}deg)`;
    splatOverlay.appendChild(item);
    setTimeout(() => item.remove(), 2500);
  } else if (weapon === 'zap') {
    item.className = 'splat-item';
    item.textContent = '⚡';
    item.style.left = `${posX}%`;
    item.style.top = `${posY}%`;
    splatOverlay.appendChild(item);
    setTimeout(() => item.remove(), 1200);
  } else {
    item.className = 'bandage-item';
    const stickers = ['🩹', '🩹', '🧊', '🤕'];
    item.textContent = stickers[Math.floor(Math.random() * stickers.length)];
    item.style.left = `${posX}%`;
    item.style.top = `${posY}%`;
    item.style.transform = `rotate(${rot}deg)`;
    bandageOverlay.appendChild(item);
    // Keep max 6 bandages on face
    if (bandageOverlay.children.length > 6) {
      bandageOverlay.removeChild(bandageOverlay.firstChild);
    }
  }
}

// ============================================================================
// 3. VOUCHERS / COUPONS CLAIM LOGIC
// ============================================================================
window.claimVoucher = function(id) {
  const card = document.querySelector(`.voucher-card[data-voucher-id="${id}"]`);
  if (!card || card.classList.contains('claimed')) return;

  playStampSound();
  card.classList.add('claimed');

  const btn = card.querySelector('.voucher-claim-btn');
  if (btn) {
    btn.innerHTML = '<span>Redeemed &amp; Binding! ✅</span>';
  }
};

// ============================================================================
// 4. THE IMPOSSIBLE RUNAWAY "NO" BUTTON
// ============================================================================
let noEvadeCount = 0;
const noButtonPhrases = [
  "NO, Stay in the Doghouse 😤",
  "Wait no, please! 🥺",
  "Look at Veer's sad puppy eyes!",
  "Error 404: 'No' Not Found!",
  "Veer is crying on the floor 😭",
  "Can't click me! Try the green one!",
  "I swear I'll never do it again! 💔",
  "You know you love me! 👉👈",
  "Okay this button is retiring now! ❤️"
];

function setupRunawayNoButton() {
  const noBtn = document.getElementById('noBtn');
  const noBtnText = document.getElementById('noBtnText');
  const buttonStage = document.getElementById('buttonStage');

  if (!noBtn || !buttonStage) return;

  function evadeNoButton(e) {
    noEvadeCount++;
    getAudioContext();

    // Update text
    const phraseIndex = Math.min(noEvadeCount, noButtonPhrases.length - 1);
    noBtnText.textContent = noButtonPhrases[phraseIndex];

    // Compute bounds inside the stage
    const stageRect = buttonStage.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxDeltaX = stageRect.width / 2 - btnRect.width / 2 - 20;
    const maxDeltaY = 60;

    const randomX = (Math.random() - 0.5) * 2 * Math.max(80, maxDeltaX);
    const randomY = (Math.random() - 0.5) * 2 * maxDeltaY;

    noBtn.style.position = 'relative';
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(0.92)`;

    if (noEvadeCount > 6) {
      noBtn.style.opacity = '0.5';
    }
    if (noEvadeCount >= 9) {
      noBtn.style.display = 'none';
    }
  }

  noBtn.addEventListener('mouseenter', evadeNoButton);
  noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    evadeNoButton(e);
  });
  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    evadeNoButton(e);
  });
}

// ============================================================================
// 5. CELEBRATION MODAL & CONFETTI ENGINE
// ============================================================================
function setupCelebration() {
  const yesBtn = document.getElementById('yesBtn');
  const modal = document.getElementById('celebrationModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const whatsappBtn = document.getElementById('whatsappNotifyBtn');
  const virtualHugBtn = document.getElementById('virtualHugBtn');

  // Pre-fill WhatsApp message
  const whatsappText = encodeURIComponent(
    "Hey Veer, I went through your apology website... I forgive you this time ❤️🥺 But you better NEVER do that again! Now come give me the tightest hug ever."
  );
  whatsappBtn.href = `https://api.whatsapp.com/send?text=${whatsappText}`;

  yesBtn.addEventListener('click', () => {
    playSuccessFanfare();
    startConfettiCelebration();
    modal.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  virtualHugBtn.addEventListener('click', (e) => {
    launchVirtualHug(e);
  });
}

// Virtual Hug Explosion of Emojis
function launchVirtualHug(e) {
  playPunchSound();
  const rect = e.target.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top;

  const hugEmojis = ['🫂', '💖', '🧸', '🌸', '✨', '🥺', '💋', '❤️'];

  for (let i = 0; i < 24; i++) {
    const el = document.createElement('div');
    el.className = 'flying-hug-heart';
    el.textContent = hugEmojis[Math.floor(Math.random() * hugEmojis.length)];

    const targetX = (Math.random() - 0.5) * window.innerWidth * 0.8;
    const targetY = -120 - Math.random() * 250;

    el.style.left = `${originX}px`;
    el.style.top = `${originY}px`;
    el.style.setProperty('--tx', `${targetX}px`);
    el.style.setProperty('--ty', `${targetY}px`);

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 2000);
  }
}

// Canvas Confetti
function startConfettiCelebration() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#FF6584', '#FF8BA7', '#2ED573', '#FFD32A', '#FF9FF3', '#54A0FF', '#FFF'];
  const particles = [];

  for (let i = 0; i < 180; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height * 0.65,
      radius: Math.random() * 5 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 18 - 6,
      gravity: 0.35,
      tilt: Math.random() * 10,
      tiltSpeed: Math.random() * 0.1,
      alpha: 1,
      decay: Math.random() * 0.008 + 0.004,
      shape: Math.random() > 0.5 ? 'circle' : 'rect'
    });
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeParticles = 0;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= p.decay;
      p.tilt += p.tiltSpeed;

      if (p.alpha > 0) {
        activeParticles++;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();

        if (p.shape === 'circle') {
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.tilt);
          ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
        }
        ctx.restore();
      }
    });

    if (activeParticles > 0) {
      requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(render);
}

// ============================================================================
// 6. FLOATING AMBIENT PARTICLES & CONTROLS
// ============================================================================
function setupFloatingAmbient() {
  const container = document.getElementById('floatingItems');
  if (!container) return;

  const icons = ['🌸', '💖', '🩹', '🥺', '🧸', '☁️', '✨', '🧋'];

  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.className = 'floating-element';
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.left = `${Math.random() * 95}%`;
    el.style.animationDelay = `${Math.random() * 12}s`;
    el.style.animationDuration = `${12 + Math.random() * 10}s`;
    el.style.fontSize = `${1.2 + Math.random() * 1}rem`;
    container.appendChild(el);
  }
}

function setupAudioToggles() {
  const soundBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const musicBtn = document.getElementById('musicToggleBtn');
  const musicIcon = document.getElementById('musicIcon');

  soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
    soundBtn.classList.toggle('active', soundEnabled);
  });

  musicBtn.addEventListener('click', () => {
    musicEnabled = !musicEnabled;
    musicIcon.textContent = musicEnabled ? '🎶' : '🎵';
    musicBtn.classList.toggle('active', musicEnabled);

    if (musicEnabled) {
      getAudioContext();
      startLofiMelody();
    } else {
      stopLofiMelody();
    }
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  setupSmackRoom();
  setupRunawayNoButton();
  setupCelebration();
  setupFloatingAmbient();
  setupAudioToggles();

  // Resize canvas on resize
  window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });

  // Enable audio context on first user interaction
  document.addEventListener('click', () => {
    getAudioContext();
  }, { once: true });
});

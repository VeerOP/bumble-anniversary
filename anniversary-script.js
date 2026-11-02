/**
 * Bumble 1-Year Anniversary App Logic
 * Ultra-smooth swiping physics, Web Audio synthesizer, and romantic celebrations
 */

// ================= APP STATE & CONFIG =================
const DEFAULT_CONFIG = {
  herName: 'My Cutie',
  hisName: 'Veer',
  anniversaryDate: 'September 28',
  customLetter: `Exactly 365 days ago, you popped up on my Bumble feed. I swiped right without a second thought, but I had no idea that one simple swipe was about to change my entire universe.

From your very first message to all our late-night talks, lazy Sunday cuddles, pool days, photobooth kisses, and goofy cab selfies—every moment with you has felt like a dream I never want to wake up from.

Thank you for making the first move. Thank you for filling my life with your infectious laughter, your kindness, your warmth, and your unconditional love. You make every ordinary day feel like the sweetest adventure.

If Bumble gave me another 1,000 profiles, I’d still search for you in every single one. Here's to 365 unforgettable days, and to a lifetime more of loving you.`
};

let userConfig = { ...DEFAULT_CONFIG };

// Load saved config if available
try {
  const saved = localStorage.getItem('bumble_anniversary_config');
  if (saved) {
    userConfig = { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
  }
} catch (e) {
  console.log('Using default config');
}

// Memory Cards Data (13 Milestones & Moments)
const CARDS_DATA = [
  {
    id: 1,
    image: 'images/3_photobooth.jpg',
    title: 'The First Move',
    subtitle: 'Where hugs turned to cheese smiles and our favorite kiss',
    distance: '0 km away • In each other’s arms',
    tags: ['💛 365 Days Ago', '📸 Pixora x Social', '🐝 First Move'],
    prompt1: {
      question: 'THE FIRST THING I NOTICED ABOUT YOU',
      answer: 'How your smile lit up the whole room, and how effortless it felt talking to you for hours.'
    },
    prompt2: {
      question: 'WE\'RE THE SAME TYPE OF WEIRD IF',
      answer: 'You agree that 3 photobooth frames will never be enough to capture how happy you make me.'
    },
    basics: [
      { icon: '📍', label: 'Together Everywhere' },
      { icon: '🐝', label: 'Bumble Match of a Lifetime' },
      { icon: '💫', label: 'Cosmic Chemistry' },
      { icon: '☕️', label: 'Coffee & Boba Dates' }
    ],
    compliment: 'This photobooth strip is my absolute favorite keepsake. You look gorgeous in every single frame!'
  },
  {
    id: 2,
    image: 'images/8_sushi_date.jpg',
    title: 'Our Dinner Dates',
    subtitle: 'Food tastes 100x better when I’m looking at you across the table',
    distance: '0 km away • Best dinner date',
    tags: ['🥢 Chopstick Pro', '🍷 Table for Two', '✨ Pure Elegance'],
    prompt1: {
      question: 'THE KEY TO MY HEART IS',
      answer: 'Good food, warm candlelight, and watching you explain all your favorite dishes to me.'
    },
    prompt2: {
      question: 'MY GREATEST STRENGTH',
      answer: 'Letting you have the last bite of sushi (even when I secretly really want it!).'
    },
    basics: [
      { icon: '🍣', label: 'Sushi & Asian Bowls' },
      { icon: '🕯️', label: 'Candlelight Dates' },
      { icon: '🥢', label: 'Chopstick Master' },
      { icon: '🥂', label: 'Cheers to Us' }
    ],
    compliment: 'You look so stunning in that candlelight. Watching you enjoy food is my favorite view.'
  },
  {
    id: 3,
    image: 'images/9_sunglasses.jpg',
    title: 'Styling & Shopping Trips',
    subtitle: 'We can’t walk past a mirror without being iconic',
    distance: '0 km away • Dynamic duo',
    tags: ['🕶️ Too Cool For You', '🛍️ Mall Dates', '⚡️ Double Trouble'],
    prompt1: {
      question: 'WE\'LL GET ALONG IF',
      answer: 'You don’t mind trying on 10 pairs of sunglasses we have zero intention of actually buying.'
    },
    prompt2: {
      question: 'A QUICK LIFE HACK',
      answer: 'When in doubt, find any mirror with Veer and pose like we own the place.'
    },
    basics: [
      { icon: '🕶️', label: 'Cool Kids Club' },
      { icon: '🛍️', label: 'Window Shopping' },
      { icon: '📸', label: 'Mirror Selfie Addicts' },
      { icon: '👟', label: 'Matching Vibe' }
    ],
    compliment: 'Black sunglasses have never looked that chic on anyone else. Total rockstar!'
  },
  {
    id: 4,
    image: 'images/2_pool.jpg',
    title: 'Poolside & Sunny Days',
    subtitle: 'Making every regular afternoon feel like paradise',
    distance: '0 km away • Sunshine girl',
    tags: ['🌊 Summer Escapes', '✨ Pure Joy', '💛 100% Match'],
    prompt1: {
      question: 'TOGETHER, WE COULD',
      answer: 'Travel the world, swim until sunset, order too much food, and laugh until our cheeks hurt.'
    },
    prompt2: {
      question: 'I\'M HOPING YOU',
      answer: 'Know that you look completely breathtaking in every single picture we ever take.'
    },
    basics: [
      { icon: '🏊', label: 'Pool Days & Sunshine' },
      { icon: '🍹', label: 'Smoothies & Ice Creams' },
      { icon: '💖', label: 'Forehead Kisses' },
      { icon: '🏖️', label: 'Endless Adventures' }
    ],
    compliment: 'You have the most radiant, infectious smile in the universe. Period.'
  },
  {
    id: 5,
    image: 'images/6_laptop_candid.jpg',
    title: 'My Hardworking Cutie',
    subtitle: 'Even when you’re busy, you still find a way to give me butterflies',
    distance: '0 km away • In our bed bubble',
    tags: ['💻 Boss Girl', '🧸 Work From Bed', '🥰 Shy Smiles'],
    prompt1: {
      question: 'MY FAVORITE SIGHT',
      answer: 'Catching you smiling behind your hand like this while trying to look super serious at work.'
    },
    prompt2: {
      question: 'I\'LL PROMISE TO',
      answer: 'Always bring you snacks, rub your shoulders, and distract you with cuddles when work gets tiring.'
    },
    basics: [
      { icon: '☕️', label: 'Coffee Fuelled' },
      { icon: '💻', label: 'Work Hard, Cuddle Harder' },
      { icon: '🧸', label: 'Cozy Blankets' },
      { icon: '👑', label: 'Brains & Beauty' }
    ],
    compliment: 'You are the smartest, most hardworking girl I know—and impossibly cute while doing it.'
  },
  {
    id: 6,
    image: 'images/11_cap_selfie.jpg',
    title: 'The Backward Cap Menace',
    subtitle: 'Stealing all my caps and looking 10x cooler in them',
    distance: '0 km away • Cap thief alert',
    tags: ['🧢 Cap Bandit', '😜 Cheeky Grin', '💛 Too Cute'],
    prompt1: {
      question: 'MY BIGGEST WEAKNESS',
      answer: 'That mischievous grin of yours right before you do or say something ridiculously silly.'
    },
    prompt2: {
      question: 'A BOUNDARY OF MINE',
      answer: 'My hoodies, jackets, and caps are officially your property now. I have accepted my fate.'
    },
    basics: [
      { icon: '🧢', label: 'Cap Bandit' },
      { icon: '😜', label: 'Mischief Maker' },
      { icon: '⚡️', label: 'Partner in Crime' },
      { icon: '💛', label: 'Cutest Grin' }
    ],
    compliment: 'You look outrageously cute with a backwards cap. Never giving that back, are you?'
  },
  {
    id: 7,
    image: 'images/12_kaleshi_aurat.jpg',
    title: 'The Official "Kaleshi Aurat"',
    subtitle: 'My favorite drama queen in the entire universe',
    distance: '0 km away • 100% Unapologetic',
    tags: ['👑 Queen of Drama', '🌶️ Spicy & Sweet', '💅 Iconic Fit'],
    prompt1: {
      question: 'WHAT I VALUE MOST IN A PARTNER',
      answer: 'A girl who is 90% drama, 10% sweet, and 100% mine.'
    },
    prompt2: {
      question: 'TWO TRUTHS AND A LIE',
      answer: '1. You start harmless kalesh just to see me laugh. 2. You look iconic in this tee. 3. I could ever stay mad at you (Lie!).'
    },
    basics: [
      { icon: '👑', label: 'Drama Queen' },
      { icon: '🌶️', label: 'Spicy Attitude' },
      { icon: '💅', label: 'Iconic Tee' },
      { icon: '🤍', label: 'Pure Entertainment' }
    ],
    compliment: 'Best t-shirt purchase in human history! You are my favorite kaleshi aurat forever.'
  },
  {
    id: 8,
    image: 'images/7_lehenga.jpg',
    title: 'The Showstopper',
    subtitle: 'Warning: Looking at this photo causes instant heart palpitations',
    distance: '0 km away • My queen',
    tags: ['✨ Traditional Magic', '👑 Desi Fit', '🔥 Stunner'],
    prompt1: {
      question: 'A FACT ABOUT ME THAT SURPRISES PEOPLE',
      answer: 'How I somehow managed to bag the prettiest girl on the entire planet.'
    },
    prompt2: {
      question: 'I GEEK OUT ON',
      answer: 'How breathtaking you look in traditional wear. Literally jaw-dropping every single time.'
    },
    basics: [
      { icon: '👗', label: 'Dressed to Impress' },
      { icon: '✨', label: 'Regal Elegance' },
      { icon: '🌸', label: 'Floral Perfection' },
      { icon: '💖', label: 'My Forever Crush' }
    ],
    compliment: 'You look like royalty in this fit. I can’t stop staring at how gorgeous you are!'
  },
  {
    id: 9,
    image: 'images/10_concert.jpg',
    title: 'Festival Nights & High Notes',
    subtitle: 'On top of the world, shouting our favorite lyrics together',
    distance: '0 km away • Screaming our lungs out',
    tags: ['🎟️ Concert Energy', '🔊 Front Row', '🚀 Sky High'],
    prompt1: {
      question: 'BEST MEMORY UNLOCKED',
      answer: 'Having you on my shoulders, singing every single word, feeling the bass, and living in the moment.'
    },
    prompt2: {
      question: 'MY FAVORITE CONCERT BUDDY',
      answer: 'Nobody matches my chaotic energy at gigs quite like you do.'
    },
    basics: [
      { icon: '🎶', label: 'Live Music Lovers' },
      { icon: '🎸', label: 'Concert Addicts' },
      { icon: '🎇', label: 'Festival Lights' },
      { icon: '🤍', label: 'Core Memories' }
    ],
    compliment: 'That smile of yours while singing under the concert lights is etched into my heart forever.'
  },
  {
    id: 10,
    image: 'images/4_datenight.jpg',
    title: 'Late Night Conversations',
    subtitle: 'From initial Bumble texts to resting your head on my shoulder',
    distance: '0 km away • Heart-to-heart',
    tags: ['🌙 3:00 AM Talks', '🎶 City Nights', '💫 Soulmates'],
    prompt1: {
      question: 'MY GOLDEN RULE',
      answer: 'Whenever you rest your head on my shoulder like this, time stands still. I never want to be anywhere else.'
    },
    prompt2: {
      question: 'A REVIEW FROM 365 DAYS AGO',
      answer: '⭐️⭐️⭐️⭐️⭐️ Best right-swipe in human history. 10/10 would match and fall in love with you all over again.'
    },
    basics: [
      { icon: '🌙', label: 'Night Drives & Deep Talks' },
      { icon: '🍕', label: 'Midnight Cravings' },
      { icon: '🔒', label: 'Taken by My Dream Girl' },
      { icon: '🎧', label: 'Our Favorite Songs' }
    ],
    compliment: 'Resting your head on me is my favorite feeling in the whole wide world.'
  },
  {
    id: 11,
    image: 'images/13_sunset_view.jpg',
    title: 'Golden Hour Mountain Sunset',
    subtitle: 'Standing above the clouds with my entire world beside me',
    distance: '0 km away • Top of the world',
    tags: ['🌄 Chasing Sunsets', '⛰️ Mountain Peaks', '🕊️ Pure Peace'],
    prompt1: {
      question: 'MY FAVORITE VIEW',
      answer: 'No matter how breathtaking the mountain sunset is, my eyes will always wander back to you.'
    },
    prompt2: {
      question: 'THE PROMISE I’LL ALWAYS KEEP',
      answer: 'To stand right beside you through every mountain and every valley life brings us, hand in hand.'
    },
    basics: [
      { icon: '🌄', label: 'Chasing Sunsets' },
      { icon: '⛰️', label: 'Mountain Escapes' },
      { icon: '🤝', label: 'Hand in Hand' },
      { icon: '💫', label: 'Soulmate Energy' }
    ],
    compliment: 'Standing on that mountain edge with you felt like heaven on earth. You are my greatest adventure.'
  },
  {
    id: 12,
    image: 'images/1_cuddle.jpg',
    title: 'My Safe Haven',
    subtitle: 'Lazy mornings, messy hair, and purest love',
    distance: '0 km away • Forever home',
    tags: ['🧸 Cuddle Champion', '💕 Soft Moments', '🥰 Heart Eyes'],
    prompt1: {
      question: 'MY SIMPLE PLEASURES',
      answer: 'Lazy mornings lying next to you, hearing you breathe, and seeing that cute little grin when you wake up.'
    },
    prompt2: {
      question: 'WE\'LL GET ALONG IF',
      answer: 'You let me hold you close whenever the world gets overwhelming. I’ve always got you.'
    },
    basics: [
      { icon: '🛌', label: 'Lazy Cuddle Sessions' },
      { icon: '🥰', label: 'Butterflies Every Day' },
      { icon: '🍯', label: 'Sweetness Overload' },
      { icon: '✨', label: 'Safe Place' }
    ],
    compliment: 'You are the sweetest, most comforting presence in my life.'
  },
  {
    id: 13,
    image: 'images/5_car_selfie.jpg',
    title: 'My Partner In Crime',
    subtitle: 'The one I want for year 2, 3, and forever',
    distance: '0 km away • Attached at the hip',
    tags: ['🚗 Road Trips', '😜 Goofy Faces', '👑 The One'],
    prompt1: {
      question: 'RELATIONSHIP GOAL',
      answer: 'To grow old together, keep making goofy faces in every cab, and choose each other every single day.'
    },
    prompt2: {
      question: 'WILL YOU RENEW OUR BUMBLE MATCH?',
      answer: '👉 Swipe RIGHT to renew our lifetime subscription to love, cuddles, and endless dates! 💛'
    },
    basics: [
      { icon: '💍', label: 'Forever & Always' },
      { icon: '🐝', label: 'Lifetime VIP Soulmate' },
      { icon: '💖', label: 'Compatibility: 1000%' },
      { icon: '🥳', label: 'Year 1 Complete!' }
    ],
    compliment: 'Nobody makes me smile as effortlessly as you do. Happy 1 Year, my love!'
  }
];

// Rejection messages when she tries to swipe left
const REJECTION_MESSAGES = [
  "⚠️ Error 404: Unmatching is permanently disabled for soulmates! 🥰",
  "Nice try! The Bumble algorithm strictly forbids leaving Veer ❤️",
  "Swipe left was cancelled by the universe! Try swiping right 😉",
  "Hold up! You're stuck with me forever, remember? 💕",
  "Can't reject the best right-swipe of your life! 🐝💛"
];

// ================= SOUND & AUDIO ENGINE (WEB AUDIO API) =================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.musicPlaying = false;
    this.musicInterval = null;
    this.audioInitialized = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.audioInitialized = true;
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.13);
  }

  playNopeBoing() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(160, now + 0.22);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  }

  playMatchFanfare() {
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const startTime = this.ctx.currentTime + (idx * 0.12);
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  }

  toggleRomanticMelody() {
    this.init();
    if (this.musicPlaying) {
      this.stopRomanticMelody();
      return false;
    } else {
      this.startRomanticMelody();
      return true;
    }
  }

  startRomanticMelody() {
    this.musicPlaying = true;
    // Romantic chords (Cmaj7 -> Am7 -> Fmaj7 -> G7)
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 392.00]  // G6
    ];

    let chordIdx = 0;
    const playChord = () => {
      if (!this.musicPlaying || !this.ctx) return;
      const currentNotes = chords[chordIdx % chords.length];
      chordIdx++;
      
      currentNotes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = this.ctx.currentTime + (i * 0.08);
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.04, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 2.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 2.5);
      });
    };

    playChord();
    this.musicInterval = setInterval(playChord, 2600);
  }

  stopRomanticMelody() {
    this.musicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

const sounds = new SoundEngine();

// ================= MAIN CONTROLLER =================
class BumbleApp {
  constructor() {
    this.currentIndex = 0;
    this.cards = [];
    this.history = [];
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.cardStackEl = document.getElementById('cardStack');
    this.progressContainerEl = document.getElementById('deckProgress');
    
    this.initDOM();
    this.applyConfig();
    this.renderDeck();
    this.bindEvents();
    this.runSplashSequence();
  }

  initDOM() {
    // Top bar & buttons
    this.musicToggleBtn = document.getElementById('musicToggleBtn');
    this.soundWave = document.getElementById('soundWave');
    this.chatNavBtn = document.getElementById('chatNavBtn');
    this.profileNavBtn = document.getElementById('profileNavBtn');
    this.settingsTriggerBtn = document.getElementById('settingsTriggerBtn');
    
    // Bottom dock buttons
    this.btnRewind = document.getElementById('btnRewind');
    this.btnPass = document.getElementById('btnPass');
    this.btnSuperSwipe = document.getElementById('btnSuperSwipe');
    this.btnLike = document.getElementById('btnLike');
    this.btnCompliment = document.getElementById('btnCompliment');

    // Modals
    this.matchModal = document.getElementById('matchModal');
    this.loveLetterModal = document.getElementById('loveLetterModal');
    this.chatModal = document.getElementById('chatModal');
    this.galleryModal = document.getElementById('galleryModal');
    this.complimentModal = document.getElementById('complimentModal');
    this.rejectionDialog = document.getElementById('rejectionDialog');
    this.settingsModal = document.getElementById('settingsModal');
    
    // Toast
    this.bumbleToast = document.getElementById('bumbleToast');
    this.toastMessage = document.getElementById('toastMessage');
  }

  applyConfig() {
    document.querySelectorAll('.partner-name').forEach(el => el.textContent = userConfig.hisName);
    document.querySelectorAll('.author-name').forEach(el => el.textContent = userConfig.hisName);
    
    const letterHeading = document.querySelector('.letter-heading');
    if (letterHeading) {
      letterHeading.textContent = `To My Favorite Girl, ${userConfig.herName} 💛`;
    }

    const cfgHerInput = document.getElementById('cfgHerName');
    const cfgHisInput = document.getElementById('cfgHisName');
    const cfgDateInput = document.getElementById('cfgAnniversaryDate');
    const cfgLetterInput = document.getElementById('cfgLetter');
    if (cfgHerInput) cfgHerInput.value = userConfig.herName;
    if (cfgHisInput) cfgHisInput.value = userConfig.hisName;
    if (cfgDateInput) cfgDateInput.value = userConfig.anniversaryDate;
    if (cfgLetterInput) cfgLetterInput.value = userConfig.customLetter;

    const letterContent = document.getElementById('letterContent');
    if (letterContent && userConfig.customLetter) {
      const paragraphs = userConfig.customLetter.split('\n\n');
      letterContent.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('') +
        `<p class="letter-signature">Forever & always yours,<br><span class="author-name">${userConfig.hisName}</span> 💛</p>`;
    }
  }

  runSplashSequence() {
    const splash = document.getElementById('splashScreen');
    const status = document.getElementById('splashStatus');
    const progress = document.querySelector('.splash-loader-progress');
    
    setTimeout(() => {
      progress.style.width = '45%';
      status.textContent = 'Found a 100% cosmic match from 365 days ago...';
    }, 700);

    setTimeout(() => {
      progress.style.width = '100%';
      status.textContent = `Match: ${userConfig.hisName} & ${userConfig.herName} 💛`;
    }, 1500);

    setTimeout(() => {
      splash.classList.add('fade-out');
      this.triggerConfettiBurst(20);
    }, 2200);
  }

  renderDeck() {
    this.cardStackEl.innerHTML = '';
    this.progressContainerEl.innerHTML = '';

    // Render progress indicators
    CARDS_DATA.forEach((card, index) => {
      const bar = document.createElement('div');
      bar.className = `deck-bar ${index === 0 ? 'active' : ''}`;
      bar.id = `deckBar-${index}`;
      bar.innerHTML = '<div class="deck-bar-fill"></div>';
      this.progressContainerEl.appendChild(bar);
    });

    // Render cards in reverse order so card 0 is on top
    for (let i = CARDS_DATA.length - 1; i >= 0; i--) {
      const cardData = CARDS_DATA[i];
      const cardEl = this.createCardElement(cardData, i);
      this.cardStackEl.appendChild(cardEl);
    }

    this.cards = Array.from(this.cardStackEl.children).reverse();
    this.updateCardPositions();
  }

  createCardElement(data, index) {
    const card = document.createElement('div');
    card.className = 'bumble-card';
    card.id = `card-${index}`;
    card.dataset.index = index;

    // Stamp indicators
    const stampsHTML = `
      <div class="card-stamp stamp-like">LIKE 💛</div>
      <div class="card-stamp stamp-nope">TRY AGAIN 😉</div>
      <div class="card-stamp stamp-super">SUPER LIKE ⭐️</div>
    `;

    // Tags
    const tagsHTML = data.tags.map((t, idx) => 
      `<span class="card-tag ${idx === 0 ? 'tag-anniversary' : ''}">${t}</span>`
    ).join('');

    // Basics pills
    const basicsHTML = data.basics.map(b => 
      `<div class="basic-pill pill-highlight"><span>${b.icon}</span><span>${b.label}</span></div>`
    ).join('');

    // Optional prompt 3
    let prompt3HTML = '';
    if (data.prompt3) {
      prompt3HTML = `
        <div class="bumble-prompt-card">
          <div class="prompt-question">🐝 ${data.prompt3.question}</div>
          <div class="prompt-answer">${data.prompt3.answer}</div>
        </div>
      `;
    }

    card.innerHTML = `
      ${stampsHTML}
      <div class="card-photo-hero">
        <img src="${data.image}" alt="${data.title}" class="card-photo-img" loading="eager">
        <div class="photo-vignette"></div>
        <div class="card-top-tags">${tagsHTML}</div>
        <div class="card-photo-overlay">
          <div class="card-profile-header">
            <h2 class="card-name">${data.title}</h2>
            <span class="card-age">365d</span>
            <span class="card-verified-badge" title="Verified Soulmate">✓</span>
          </div>
          <div class="card-meta-line">
            <span>📍</span> ${data.distance}
          </div>
        </div>
      </div>

      <div class="card-details">
        <div class="bumble-basics-wrap">
          ${basicsHTML}
        </div>

        <div class="bumble-prompt-card">
          <div class="prompt-question">🐝 ${data.prompt1.question}</div>
          <div class="prompt-answer">${data.prompt1.answer}</div>
        </div>

        <div class="bumble-spotify-card">
          <div class="spotify-left">
            <span class="spotify-icon">🎵</span>
            <div>
              <div class="anthem-label">Our Spotify Anthem</div>
              <div class="anthem-title">Can't Take My Eyes Off You</div>
              <div class="anthem-artist">Soundtrack of our first year</div>
            </div>
          </div>
          <button class="spotify-play-btn" title="Play anthem preview">▶</button>
        </div>

        <div class="bumble-prompt-card">
          <div class="prompt-question">🐝 ${data.prompt2.question}</div>
          <div class="prompt-answer">${data.prompt2.answer}</div>
        </div>

        ${prompt3HTML}

        <div class="card-swipe-tip">
          <span>👈 Swipe left if you dare • Swipe right to love forever 👉</span>
        </div>
      </div>
    `;

    const spotifyBtn = card.querySelector('.spotify-play-btn');
    if (spotifyBtn) {
      spotifyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isPlaying = sounds.toggleRomanticMelody();
        if (isPlaying) {
          spotifyBtn.textContent = '⏸';
          this.soundWave.classList.remove('paused');
          this.showToast('🎶 Playing "Can\'t Take My Eyes Off You" 💛');
        } else {
          spotifyBtn.textContent = '▶';
          this.soundWave.classList.add('paused');
          this.showToast('🔇 Music paused');
        }
      });
    }

    this.attachCardGestures(card);
    return card;
  }

  updateCardPositions() {
    this.cards.forEach((card, idx) => {
      if (idx < this.currentIndex) {
        card.style.display = 'none';
      } else {
        card.style.display = 'block';
        const offset = idx - this.currentIndex;
        if (offset === 0) {
          card.style.transform = 'translate3d(0, 0, 0) scale(1)';
          card.style.zIndex = 10;
          card.style.opacity = '1';
          card.style.pointerEvents = 'auto';
        } else if (offset === 1) {
          card.style.transform = 'translate3d(0, 10px, -20px) scale(0.96)';
          card.style.zIndex = 9;
          card.style.opacity = '0.85';
          card.style.pointerEvents = 'none';
        } else if (offset === 2) {
          card.style.transform = 'translate3d(0, 20px, -40px) scale(0.92)';
          card.style.zIndex = 8;
          card.style.opacity = '0.65';
          card.style.pointerEvents = 'none';
        } else {
          card.style.transform = 'translate3d(0, 30px, -60px) scale(0.88)';
          card.style.zIndex = 5;
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
        }
      }
    });

    // Update progress bars
    CARDS_DATA.forEach((_, idx) => {
      const bar = document.getElementById(`deckBar-${idx}`);
      if (bar) {
        bar.className = 'deck-bar';
        if (idx < this.currentIndex) {
          bar.classList.add('completed');
        } else if (idx === this.currentIndex) {
          bar.classList.add('active');
        }
      }
    });
  }

  // ================= SWIPING PHYSICS & GESTURES =================
  attachCardGestures(card) {
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;
    let isScrollingCard = false;

    const onPointerDown = (e) => {
      const targetCard = card;
      if (parseInt(targetCard.dataset.index) !== this.currentIndex) return;

      isDragging = true;
      isScrollingCard = false;
      startX = e.clientX || (e.touches && e.touches[0].clientX);
      startY = e.clientY || (e.touches && e.touches[0].clientY);
      currentX = startX;
      currentY = startY;

      targetCard.style.transition = 'none';
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const x = e.clientX || (e.touches && e.touches[0].clientX);
      const y = e.clientY || (e.touches && e.touches[0].clientY);

      const deltaX = x - startX;
      const deltaY = y - startY;

      // Check if user is scrolling down inside the card vs dragging card horizontally
      if (!isScrollingCard && Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 15) {
        if (card.scrollTop > 5 || deltaY < 0) {
          isScrollingCard = true;
        }
      }

      if (isScrollingCard) return;

      currentX = x;
      currentY = y;

      const rotation = deltaX * 0.08;
      card.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) rotate(${rotation}deg)`;

      // Stamp opacity & effects
      const stampLike = card.querySelector('.stamp-like');
      const stampNope = card.querySelector('.stamp-nope');
      const stampSuper = card.querySelector('.stamp-super');

      if (deltaX > 25) {
        card.classList.add('swiping-right');
        card.classList.remove('swiping-left', 'swiping-up');
        const opacity = Math.min(1, (deltaX - 25) / 100);
        card.style.setProperty('--stamp-opacity', opacity);
      } else if (deltaX < -25) {
        card.classList.add('swiping-left');
        card.classList.remove('swiping-right', 'swiping-up');
        const opacity = Math.min(1, (Math.abs(deltaX) - 25) / 100);
        card.style.setProperty('--stamp-opacity', opacity);
      } else if (deltaY < -40 && Math.abs(deltaX) < 40) {
        card.classList.add('swiping-up');
        card.classList.remove('swiping-right', 'swiping-left');
        const opacity = Math.min(1, (Math.abs(deltaY) - 40) / 100);
        card.style.setProperty('--stamp-opacity', opacity);
      } else {
        card.classList.remove('swiping-right', 'swiping-left', 'swiping-up');
      }
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;

      if (isScrollingCard) {
        isScrollingCard = false;
        return;
      }

      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      card.classList.remove('swiping-right', 'swiping-left', 'swiping-up');

      // Right swipe (Like)
      if (deltaX > 110) {
        this.swipeRight();
      }
      // Left swipe (Attempted Nope -> Playful spring back!)
      else if (deltaX < -110) {
        this.triggerPlayfulRejection();
      }
      // Super swipe up
      else if (deltaY < -120 && Math.abs(deltaX) < 80) {
        this.superSwipe();
      }
      // Snap back
      else {
        card.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.transform = 'translate3d(0, 0, 0) scale(1)';
      }
    };

    // Mouse events
    card.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    // Touch events
    card.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
  }

  // ================= SWIPE ACTIONS =================
  swipeRight() {
    if (this.currentIndex >= this.cards.length) return;
    const card = this.cards[this.currentIndex];

    sounds.playPop();
    this.createHeartBurst(window.innerWidth / 2, window.innerHeight / 2);

    card.style.transition = 'transform 0.45s ease-out, opacity 0.4s ease-out';
    card.style.transform = 'translate3d(650px, -50px, 0) rotate(35deg)';
    card.style.opacity = '0';

    this.history.push(this.currentIndex);
    this.currentIndex++;

    setTimeout(() => {
      if (this.currentIndex >= this.cards.length) {
        this.triggerMatchCelebration();
      } else {
        this.updateCardPositions();
      }
    }, 280);
  }

  triggerPlayfulRejection() {
    const card = this.cards[this.currentIndex];
    sounds.playNopeBoing();

    // Elastic shake and bounce back to center
    card.style.transition = 'transform 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)';
    card.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';

    const randomMsg = REJECTION_MESSAGES[Math.floor(Math.random() * REJECTION_MESSAGES.length)];
    this.showToast(randomMsg);
  }

  superSwipe() {
    if (this.currentIndex >= this.cards.length) return;
    const card = this.cards[this.currentIndex];

    sounds.playMatchFanfare();
    this.triggerConfettiBurst(40);

    card.style.transition = 'transform 0.5s ease-out, opacity 0.45s ease-out';
    card.style.transform = 'translate3d(0, -750px, 0) scale(1.1)';
    card.style.opacity = '0';

    this.history.push(this.currentIndex);
    this.currentIndex++;

    setTimeout(() => {
      this.triggerMatchCelebration();
    }, 350);
  }

  rewind() {
    if (this.history.length === 0) {
      this.showToast("You're already at the beginning of our story! 🍯");
      return;
    }

    const prevIndex = this.history.pop();
    this.currentIndex = prevIndex;
    const card = this.cards[this.currentIndex];

    sounds.playPop();
    card.style.display = 'block';
    card.style.transition = 'none';
    card.style.transform = 'translate3d(500px, 0, 0) rotate(20deg)';
    card.style.opacity = '0';

    // Force reflow
    void card.offsetWidth;

    card.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease';
    card.style.transform = 'translate3d(0, 0, 0) scale(1)';
    card.style.opacity = '1';

    this.updateCardPositions();
  }

  openCompliment() {
    const currentCard = CARDS_DATA[this.currentIndex] || CARDS_DATA[0];
    const textEl = document.getElementById('complimentText');
    if (textEl) {
      textEl.textContent = `"${currentCard.compliment}"`;
    }
    this.complimentModal.classList.add('show');
    sounds.playPop();
  }

  // ================= MATCH CELEBRATION =================
  triggerMatchCelebration() {
    sounds.playMatchFanfare();
    this.matchModal.classList.add('show');

    // Launch celebratory confetti storm
    this.launchGrandConfetti();
  }

  launchGrandConfetti() {
    if (typeof confetti !== 'function') return;

    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#FFC629', '#FFD447', '#FF4757', '#00D26A', '#FFFFFF']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    // Secondary bursts
    setTimeout(() => {
      confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1 } });
    }, 600);
  }

  triggerConfettiBurst(count = 30) {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: count,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFC629', '#FFD447', '#FF6B8B', '#FFFFFF']
      });
    }
  }

  createHeartBurst(x, y) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart-burst';
    heart.textContent = '💖';
    heart.style.left = `${x - 15}px`;
    heart.style.top = `${y - 15}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
  }

  showToast(message) {
    this.toastMessage.textContent = message;
    this.bumbleToast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.bumbleToast.classList.remove('show');
    }, 3200);
  }

  // ================= BIND ALL EVENTS =================
  bindEvents() {
    // Dock Action Buttons
    this.btnLike.addEventListener('click', () => this.swipeRight());
    this.btnPass.addEventListener('click', () => {
      this.rejectionDialog.classList.add('show');
      sounds.playNopeBoing();
    });
    this.btnSuperSwipe.addEventListener('click', () => this.superSwipe());
    this.btnRewind.addEventListener('click', () => this.rewind());
    this.btnCompliment.addEventListener('click', () => this.openCompliment());

    // Music Toggle
    this.musicToggleBtn.addEventListener('click', () => {
      const isPlaying = sounds.toggleRomanticMelody();
      if (isPlaying) {
        this.soundWave.classList.remove('paused');
        this.showToast('🎵 Playing romantic melody...');
      } else {
        this.soundWave.classList.add('paused');
        this.showToast('🔇 Music paused');
      }
    });

    // Chat Header / Navigation Button
    this.chatNavBtn.addEventListener('click', () => {
      document.getElementById('unreadBadge').style.display = 'none';
      this.chatModal.classList.add('show');
    });

    // Profile Nav Button -> opens Memory Gallery
    this.profileNavBtn.addEventListener('click', () => {
      this.renderGalleryModal();
      this.galleryModal.classList.add('show');
    });

    // Replay Deck Button on Match screen
    document.getElementById('replayDeckBtn').addEventListener('click', () => {
      this.matchModal.classList.remove('show');
      this.currentIndex = 0;
      this.history = [];
      this.renderDeck();
      this.showToast('Reliving our story from day 1! 🐝💛');
    });

    // Open Love Letter from Match screen
    document.getElementById('openLoveLetterBtn').addEventListener('click', () => {
      this.loveLetterModal.classList.add('show');
    });

    // Open Chat from Match screen
    document.getElementById('openChatFromMatchBtn').addEventListener('click', () => {
      this.chatModal.classList.add('show');
    });

    // Open Gallery from Match screen
    document.getElementById('openGalleryFromMatchBtn').addEventListener('click', () => {
      this.renderGalleryModal();
      this.galleryModal.classList.add('show');
    });

    // Close buttons for modals
    document.getElementById('closeLetterBtn').addEventListener('click', () => this.loveLetterModal.classList.remove('show'));
    document.getElementById('letterBackdrop').addEventListener('click', () => this.loveLetterModal.classList.remove('show'));

    document.getElementById('closeChatBtn').addEventListener('click', () => this.chatModal.classList.remove('show'));
    document.getElementById('chatBackdrop').addEventListener('click', () => this.chatModal.classList.remove('show'));

    document.getElementById('closeGalleryBtn').addEventListener('click', () => this.galleryModal.classList.remove('show'));
    document.getElementById('galleryBackdrop').addEventListener('click', () => this.galleryModal.classList.remove('show'));

    document.getElementById('closeComplimentBtn').addEventListener('click', () => this.complimentModal.classList.remove('show'));
    document.getElementById('complimentBackdrop').addEventListener('click', () => this.complimentModal.classList.remove('show'));
    document.getElementById('closeComplimentActionBtn').addEventListener('click', () => this.complimentModal.classList.remove('show'));

    // Rejection Dialog Confirm
    document.getElementById('dialogAcceptBtn').addEventListener('click', () => {
      this.rejectionDialog.classList.remove('show');
      this.swipeRight();
    });

    // Share Kiss Button in Love letter
    document.getElementById('btnShareKiss').addEventListener('click', (e) => {
      const rect = e.target.getBoundingClientRect();
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          this.createHeartBurst(rect.left + Math.random() * rect.width, rect.top + Math.random() * rect.height);
        }, i * 60);
      }
      this.showToast('Kiss sent! 💋 Forever in love with you.');
    });

    // Interactive Bumble Chat
    const chatInput = document.getElementById('chatInputField');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatMessages = document.getElementById('chatMessages');

    const handleSendMessage = () => {
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = '';

      // Append her message
      const msgEl = document.createElement('div');
      msgEl.className = 'message msg-received';
      msgEl.innerHTML = `<div class="bubble">${text}</div><span class="msg-time">Just now</span>`;
      chatMessages.appendChild(msgEl);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      sounds.playPop();
      this.triggerConfettiBurst(20);

      // Reply from Veer after 1.2s
      setTimeout(() => {
        const replyEl = document.createElement('div');
        replyEl.className = 'message msg-sent';
        const replies = [
          `I love you so much! Happy 1 Year anniversary my favorite girl 🥺💛`,
          `You'll always be my best right-swipe ever. Forever yours 💕`,
          `Seeing your messages still gives me butterflies every single day 🥰`
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        replyEl.innerHTML = `<div class="bubble">${randomReply}</div><span class="msg-time">Just now</span>`;
        chatMessages.appendChild(replyEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        sounds.playPop();
      }, 1200);
    };

    chatSendBtn.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSendMessage();
    });

    // Voice Note simulation
    const voicePlayBtn = document.getElementById('voicePlayBtn');
    if (voicePlayBtn) {
      voicePlayBtn.addEventListener('click', () => {
        sounds.playPop();
        voicePlayBtn.textContent = voicePlayBtn.textContent === '▶' ? '⏸' : '▶';
        this.showToast('🎙️ "You are the love of my life..."');
      });
    }

    // Settings Modal
    this.settingsTriggerBtn.addEventListener('click', () => {
      this.settingsModal.classList.add('show');
    });
    document.getElementById('closeSettingsBtn').addEventListener('click', () => this.settingsModal.classList.remove('show'));
    document.getElementById('settingsBackdrop').addEventListener('click', () => this.settingsModal.classList.remove('show'));

    document.getElementById('settingsForm').addEventListener('submit', (e) => {
      e.preventDefault();
      userConfig.herName = document.getElementById('cfgHerName').value.trim() || DEFAULT_CONFIG.herName;
      userConfig.hisName = document.getElementById('cfgHisName').value.trim() || DEFAULT_CONFIG.hisName;
      userConfig.anniversaryDate = document.getElementById('cfgAnniversaryDate').value.trim() || DEFAULT_CONFIG.anniversaryDate;
      userConfig.customLetter = document.getElementById('cfgLetter').value.trim() || DEFAULT_CONFIG.customLetter;

      try {
        localStorage.setItem('bumble_anniversary_config', JSON.stringify(userConfig));
      } catch (err) {}

      this.applyConfig();
      this.settingsModal.classList.remove('show');
      this.showToast('Saved your personalized details! 💛');
    });

    // Keyboard navigation (Arrow Right = Like, Arrow Left = Nope, Arrow Up = SuperSwipe)
    window.addEventListener('keydown', (e) => {
      if (document.querySelector('.popup-modal.show') || this.matchModal.classList.contains('show')) return;
      if (e.key === 'ArrowRight') this.swipeRight();
      if (e.key === 'ArrowLeft') this.triggerPlayfulRejection();
      if (e.key === 'ArrowUp') this.superSwipe();
    });
  }

  renderGalleryModal() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = CARDS_DATA.map(c => `
      <div class="gallery-polaroid">
        <div class="polaroid-img-wrap">
          <img src="${c.image}" alt="${c.title}">
        </div>
        <div class="polaroid-caption">
          <div class="polaroid-title">${c.title}</div>
          <div class="polaroid-desc">${c.subtitle}</div>
        </div>
      </div>
    `).join('');
  }
}

// Start app once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new BumbleApp();
});

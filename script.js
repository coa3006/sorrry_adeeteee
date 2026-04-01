/* =========================
   🎂 COUNTDOWN TIMER
========================= */

const birthday = new Date("2026-04-01 08:20:00").getTime();
let fireworksRunning = false;
let countdownTimer = null;

countdownTimer = setInterval(updateCountdown, 1000);

function updateCountdown() {
  const now = Date.now();
  const distance = birthday - now;

if (distance <= 0) {
  

  clearInterval(countdownTimer);

  onBirthday();
  return;
}

  document.getElementById("days").innerText =
    Math.floor(distance / (1000 * 60 * 60 * 24));
  document.getElementById("hours").innerText =
    Math.floor((distance / (1000 * 60 * 60)) % 24);
  document.getElementById("minutes").innerText =
    Math.floor((distance / (1000 * 60)) % 60);
  document.getElementById("seconds").innerText =
    Math.floor((distance / 1000) % 60);
}

/* =========================
   🎉 BIRTHDAY TRIGGER
========================= */

/*function onBirthday() {
  clearInterval(countdownTimer);

  goToSlide(1);

  const cakeContainer = document.getElementById("cake-container");
  cakeContainer.classList.remove("hidden");
  cakeContainer.classList.add("show");

  // 🔥 START MUSIC HERE
  if (audioUnlocked) {
    music.currentTime = 0;
    music.play().catch(() => {});
    musicPlaying = true;
    unlock.innerText = "🔈";
  }

  launchFireworks();
  launchRibbons();
  startBirthdaySequence();
}*/
function onBirthday() {
  clearInterval(countdownTimer);

  // stop countdown music
  if (audioUnlocked) {
    bgMusic.pause();
    bgMusic.currentTime = 0;

    cakeMusic.currentTime = 0;
    cakeMusic.play().catch(() => {});
  }

  goToSlide(1);
  launchFireworks();
  launchRibbons();
  startBirthdaySequence();
}


/* =========================
   ✍️ TYPEWRITER
========================= */
const text =
  "yaha btaaa";
let textIndex = 0;
function typeWriter() {
  if (textIndex < text.length) {
    document.getElementById("message").innerHTML += text[textIndex++];
    setTimeout(typeWriter, 60);
  }
}

setTimeout(typeWriter, 1800);

/* =========================
   🧸 INTRO
========================= */

setTimeout(() => {
  document.getElementById("intro").style.display = "none";

  const main = document.getElementById("countdown-container");
  main.classList.remove("hidden");
  main.classList.add("fade-in");
}, 2000);

/* =========================
   🎵 MUSIC CONTROL
========================= */

/* =========================
   🎂 CAKE SEQUENCE
========================= */

function startBirthdaySequence() {
  const cakeContainer = document.getElementById("cake-container");
  const candles = document.querySelector(".candles");
  const cake = document.querySelector(".cake");
  const blowText = document.getElementById("blow-text");

  cakeContainer.classList.remove("hidden");
  cakeContainer.classList.add("show");

  blowText.classList.remove("hidden");
  blowText.classList.add("show");

  setTimeout(() => candles.classList.add("blow-out"), 2000);
  setTimeout(() => cake.classList.add("cut"), 4000);
  setTimeout(() => {
  showBirthdayVideo();
}, 8000); // 4s cut + 2s wait


 setTimeout(() => {
  stopFireworks();

  const finalText = document.getElementById("final-text");
  finalText.classList.remove("hidden");
  finalText.classList.add("show");
}, 6500);

}
function launchRibbons() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");

  const ribbons = [];

  for (let i = 0; i < 80; i++) {
    ribbons.push({
      x: Math.random() * canvas.width,
      y: -50,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 3 + 2,
      length: Math.random() * 40 + 20,
      color: `hsl(${Math.random() * 360},100%,60%)`,
      angle: Math.random() * Math.PI
    });
  }

  function animate() {
    ribbons.forEach(r => {
      r.y += r.vy;
      r.x += r.vx;
      r.angle += 0.1;

      ctx.save();
      ctx.translate(r.x, r.y);
      ctx.rotate(r.angle);
      ctx.strokeStyle = r.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, r.length);
      ctx.stroke();
      ctx.restore();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* =========================
   🎆 FIREWORKS
========================= */

function launchFireworks() {
  fireworksRunning = true;

  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 8;
      this.vy = (Math.random() - 0.5) * 8;
      this.life = 100;
      this.color = color;
      this.gravity = 0.05;
    }

    update() {
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.life--;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.6;
    const color = `hsl(${Math.random() * 360},100%,60%)`;

    for (let i = 0; i < 80; i++) {
      particles.push(new Particle(x, y, color));
    }
  }

  function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.update();
      p.draw();
      if (p.life <= 0) particles.splice(i, 1);
    });

    if (fireworksRunning) requestAnimationFrame(animate);
  }

  let launches = 0;
  const launcher = setInterval(() => {
    createFirework();
    launches++;
    if (launches > 8) clearInterval(launcher);
  }, 500);

  animate();
}

function stopFireworks() {
  fireworksRunning = false;
  const canvas = document.getElementById("fireworks");
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}

/* =========================
   🎊 CONFETTI
========================= */

function launchPoppers() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = [];

  const colors = [
    "#ff595e", "#ffca3a", "#8ac926",
    "#1982c4", "#6a4c93"
  ];

  for (let i = 0; i < 220; i++) {
    confetti.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.7) * 16,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      life: 120
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach((c, i) => {
      c.vy += 0.3; // gravity
      c.x += c.vx;
      c.y += c.vy;
      c.rotation += 8;
      c.life--;

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate((c.rotation * Math.PI) / 180);
      ctx.fillStyle = c.color;
      ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
      ctx.restore();

      if (c.life <= 0) confetti.splice(i, 1);
    });

    if (confetti.length) requestAnimationFrame(animate);
  }

  animate();
}



function goToSlide(index) {
  const slides = document.querySelectorAll(".slide");
  slides.forEach(s => s.classList.remove("active"));
  slides[index].classList.add("active");
}
function showBirthdayVideo() {
  const overlay = document.getElementById("video-overlay");
  const video = document.getElementById("birthday-video");

  overlay.classList.remove("hidden");

  // ⏸ STOP ALL MUSIC BEFORE VIDEO
  if (audioUnlocked) {
    bgMusic.pause();
    cakeMusic.pause();        // 🔥 THIS WAS MISSING
    cakeMusic.currentTime = 0;
  }

  video.currentTime = 0;
  video.muted = false;
  video.play();

  video.onended = () => {
  overlay.classList.add("hidden");
  showGreetingCard();
};

}



function showGreetingCard() {
  goToSlide(2); // show card slide

  const card = document.getElementById("greeting-card");
  const textEl = document.getElementById("card-text");


  textEl.innerHTML = "";

 /* // 🟢 SAFE CLICK HANDLER
  card.onclick = () => {
    if (card.classList.contains("open")) return;

    card.classList.add("open");

    let i = 0;
    function type() {
      if (i < message.length) {
        textEl.innerHTML += message[i++];
        setTimeout(type, 45);
      }
    }

    setTimeout(type, 600);
  };*/
}

const unlock = document.getElementById("audio-unlock");
const bgMusic = document.getElementById("bg-music");
const cakeMusic = document.getElementById("cake-music");

let audioUnlocked = false;

const songs = [
  "music1.mp3",
  "music2.mp3",
  "music3.mp3",
  "music4.mp3",
  "music5.mp3",
  "music6.mp3",
  "music7.mp3",
  "music8.mp3",
  "music9.mp3",
  "music10.mp3",
  "music11.mp3",
  "music12.mp3",
  "music13.mp3",
  "music14.mp3",
  "music15.mp3",
  "music16.mp3",
  "music17.mp3",
  "music18.mp3",
   "music19.mp3",
   "music20.mp3",
   "music21.mp3"
];

// 🔊 USER GESTURE — REQUIRED
unlock.addEventListener("click", () => {
  if (audioUnlocked) return;

  const randomSong = songs[Math.floor(Math.random() * songs.length)];
  bgMusic.src = randomSong;

  bgMusic.loop = true;
  bgMusic.volume = 1;

  // 🔴 CRITICAL FIX
  bgMusic.muted = true;     // allow autoplay
  bgMusic.load();           // force browser to load audio

  bgMusic.play().then(() => {
    bgMusic.muted = false;  // 🔊 unmute AFTER play starts
    audioUnlocked = true;
    unlock.innerText = "🔈";
    console.log("✅ Countdown music PLAYING");
  }).catch(err => {
    console.error("❌ Audio blocked:", err);
  });
});




 /* // 🎵 Toggle music
  if (!musicPlaying) {
    music.play().catch(() => {});
    unlock.innerText = "🔈";
    musicPlaying = true;
  } else {
    music.pause();
    unlock.innerText = "🔊";
    musicPlaying = false;
  }
});
*/
document.getElementById("audio-unlock")
  .addEventListener("click", () => {
    console.log("🔊 REAL CLICK RECEIVED");
  });

document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("greeting-card");
  const textEl = document.getElementById("card-text");

  if (!card) return;

  card.addEventListener("click", () => {
    if (card.classList.contains("open")) return;

    card.classList.add("open");

    const message = `Dearest Adeettteeee,

It’s just a small surprise for you, just to make your day and for making you smile. 
I know you’re going through a lot, I know you’re working hard for your better future 
and I know that you still love me in these tough days too…. You’ve already done a lot
for me and I don’t even know how to compensate…. You’ll always be my special one no matter
what, I just can’t even think of stop loving you…. You always made me feel special, you
always made me laugh even in my hard days…. I know things aren’t going well between us from
last few days but it’s fine cause I always wanted you to be successful…. I always wanted you to
earn more than I do (tab hi na aapke paiso se PS5 le paunga🤭🤣). I’ve always thought the best for 
you cause I love you more than anyone could even think of…. I promise you that I’ll improve myself and
get more matured…. I just want you to love me always…. You want me to wait until you clear your NEET exam….
I’ll wait for you forever just promise me that you won’t forget how to love me…. I don’t want to be a manipulator, 
I’m just writing all these just to let you know that I’ll love you always…. I’m not afraid of the waiting periods 
cause pyaar me wait krna pdta h and also patience bhi rakhna pdta h…. I just want you to be with me after all these 
waitings…. Leave these things…. I’m not writing all these to be a manipulator…. I just wanted to thank you for being 
the best person I could ever meet…. You’ll always be the best thing that have ever happened to me…. My love for you will
always be in arithmetic progression with common difference greater than 1 always…. I know things have changed between us
but I just want you to be the same forever…. You’re my princess and will always be…. Don’t worry I’m always here with you 
as your sunshine and I won’t let you die my sunflower🌻…. You are just the best yaar Adu…. Please mere sath rahiyega na
humesha cause I’m always incomplete without you…. In just 1 years and 4 months I’ve loved you so much that I can’t even
think of a second without you…. I’m improving myself and I’ll do believe me…. Won’t be that “toxic boyfriend” anymore I
promise…. Yaar schme hm ni reh pyenge aapke bina…. I’m working on myself and I too have realised that there was a lot of 
toxicity inside me…. I promise you to be the best version of myself…. Now I’m ending this please take care of yourself 
and don’t listen if mummy papa kuch ulta sidha chiz bolenge to…. I’ll always be just a message away from you….
If you ever need me in this waiting phase I’m there for you always…. I’m there for you to hear all your complaints…. 
I’m there for you to make you feel loved and also I’m there for you if you ever need me with any help…. Tough phases
to sabke relationship me aata h Adu lekin shadi sirf wahi log karte h jo tough phase khatam hone ke baad bhi pyaar karna nahi bhulte….
Chalo ab hm chalte h…. Khyaal rkhiyega jaan…. I really love you and will always do🥹🫂❤️

                                       Amrit`;


    let i = 0;
    textEl.innerHTML = "";

    function type() {
      if (i < message.length) {
        textEl.innerHTML += message[i++];
        setTimeout(type, 45);
      }
    }

    setTimeout(type, 600);
  });

});


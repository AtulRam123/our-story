/* ===============================
🧸 Teddy animation (Home page)
============================== */
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const gif = document.querySelector(".gif");

let done = 0;
function finish() {
    done++;
    if (done === 2 && gif) {
        left.style.display = "none";
        right.style.display = "none";
        gif.style.display = "block";
    }
}

if (left && right) {
    left.addEventListener("animationend", finish);
    right.addEventListener("animationend", finish);
}

/* ===============================
⏳ Utility: days between
============================== */
function daysBetween(date) {
    return Math.floor((Date.now() - new Date(date)) / 86400000);
}

/* ===============================
⏱️ Live timer (stable, no animation)
============================== */
(function liveTimer() {
    const el = document.getElementById("live");
    if (!el) return;

    setInterval(() => {
        const diff = Date.now() - new Date("2025-08-27");
        const d = Math.floor(diff / 86400000);
        const h = Math.floor(diff / 3600000) % 24;
        const m = Math.floor(diff / 60000) % 60;
        const s = Math.floor(diff / 1000) % 60;
        el.textContent = `${d} days ${h}h ${m}m ${s}s`;
    }, 1000);
})();

/* ===============================
❤️ Next meet countdown
============================== */
(function nextMeet() {
    const el = document.getElementById("next");
    if (!el) return;

    setInterval(() => {
        const diff = new Date("2026-02-08") - Date.now();
        if (diff <= 0) {
            el.textContent = "Together ❤️";
            return;
        }
        const d = Math.floor(diff / 86400000);
        const h = Math.floor(diff / 3600000) % 24;
        el.textContent = `${d} days ${h} hours`;
    }, 1000);
})();

/* ===============================
🖼️ Gallery image focus
============================== */
document.querySelectorAll(".gallery img").forEach(img => {
    img.addEventListener("click", (e) => {
        e.stopPropagation();

        const viewer = document.createElement("div");
        viewer.className = "viewer";
        viewer.innerHTML = `<img src="${img.src}">`;

        viewer.addEventListener("click", () => viewer.remove());

        document.body.appendChild(viewer);
    });
});

/* ===============================
🎞️ Scroll reveal
============================== */
function reveal() {
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add("show");
        }
    });
}
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

/* ===============================
✉️ Envelope open
============================== */
function openEnvelope() {
    const env = document.querySelector(".envelope");
    if (env) env.classList.add("open");
}

/* ===============================
🎆 Fireworks (Home page only)
============================== */
(function fireworks() {
    const canvas = document.getElementById("fireworks");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    let particles = [];
    let running = true;

    function launch() {
        const x = Math.random() * canvas.width;
        const y = canvas.height * 0.7;
        const hue = Math.random() * 40 + 300;
        for (let i = 0; i < 30; i++) {
            particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.8) * 4,
                life: 80,
                hue
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            ctx.globalAlpha = p.life / 80;
            ctx.fillStyle = `hsl(${p.hue},70%,65%)`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.03;
            p.life--;
            if (p.life <= 0) particles.splice(i, 1);
        });
        running && requestAnimationFrame(draw);
    }

    draw();
    const interval = setInterval(launch, 700);

    setTimeout(() => {
        running = false;
        clearInterval(interval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 6000);
})();

/* ===============================
✨ Animated count-up (numbers only)
============================== */
function animateCount(el, finalValue, duration = 1200) {
    if (!el || el.dataset.done) return;
    el.dataset.done = "true";

    const start = performance.now();
    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * finalValue);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = finalValue;
    }
    requestAnimationFrame(step);
}

/* ===============================
🌙 Night-only message
============================== */
(function nightMessage() {
    const msg = document.getElementById("nightMessage");
    if (!msg) return;

    const hour = new Date().getHours();
    msg.textContent =
        hour >= 22 || hour <= 5
            ? "I wish I was holding you right now 🌙"
            : "";
})();

/* ===============================
📈 Progress bar
============================== */
(function progressBar() {
    const bar = document.getElementById("progressFill");
    if (!bar) return;

    const start = new Date("2025-08-27").getTime();
    const end = new Date("2026-02-08").getTime();
    const now = Date.now();

    let percent = ((now - start) / (end - start)) * 100;
    percent = Math.min(100, Math.max(0, percent));
    bar.style.width = percent + "%";
})();

/* ===============================
💖 Floating background hearts
============================== */
setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "bg-heart";
    heart.innerHTML = ["💕", "💖", "💗"][Math.floor(Math.random() * 3)];
    heart.style.left = Math.random() * 100 + "%";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 15000);
}, 4000);

/* ===============================
📱 Touch hearts (SAFE, no blocking)
============================== */
document.addEventListener("touchstart", (e) => {
    Array.from(e.changedTouches).forEach((touch, i) => {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.className = `touch-heart ${i === 0 ? "big" : "small"}`;
            heart.innerHTML = ["💖", "💝", "🌸"][Math.floor(Math.random() * 3)];
            heart.style.left = touch.clientX + "px";
            heart.style.top = touch.clientY + "px";
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 4000);
        }, i * 50);
    });
}, { passive: true });

/* ===============================
🚀 Initialize counters on load
============================== */
window.addEventListener("load", () => {
    const sinceMeet = document.getElementById("sinceMeet");
    const sinceProp = document.getElementById("sinceProp");
    const next = document.getElementById("next");

    if (sinceMeet) animateCount(sinceMeet, daysBetween("2025-08-27"));
    if (sinceProp) animateCount(sinceProp, daysBetween("2025-09-06"));

    if (next) {
        const diff = new Date("2026-02-08") - Date.now();
        const daysLeft = Math.max(0, Math.floor(diff / 86400000));
        animateCount(next, daysLeft);
    }
    /* ===============================
   🧭 NAVBAR SHOW / HIDE ON SCROLL
=============================== */

    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        const nav = document.querySelector(".main-nav");
        if (!nav) return;

        if (window.scrollY > lastScrollY && window.scrollY > 60) {
            // scrolling down → hide
            nav.classList.add("nav-hidden");
        } else {
            // scrolling up → show
            nav.classList.remove("nav-hidden");
        }

        lastScrollY = window.scrollY;
    });



});
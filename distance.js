/* STARFIELD */
const stars = document.getElementById("stars");
const sctx = stars.getContext("2d");
stars.width = innerWidth;
stars.height = innerHeight;

let starList = Array.from({ length: 220 }, () => ({
    x: Math.random() * stars.width,
    y: Math.random() * stars.height,
    r: Math.random() * 1.2,
    v: Math.random() * 0.2 + 0.05
}));

function drawStars() {
    sctx.clearRect(0, 0, stars.width, stars.height);
    sctx.fillStyle = "white";
    starList.forEach(s => {
        s.y += s.v;
        if (s.y > stars.height) s.y = 0;
        sctx.beginPath();
        sctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        sctx.fill();
    });
    requestAnimationFrame(drawStars);
}
drawStars();

/* PARTICLES */
const pCanvas = document.getElementById("particles");
const pctx = pCanvas.getContext("2d");
pCanvas.width = innerWidth;
pCanvas.height = innerHeight;

const leftOrb = { x: innerWidth * 0.25, y: innerHeight * 0.5 };
const rightOrb = { x: innerWidth * 0.75, y: innerHeight * 0.5 };

let particles = [];

function spawnParticle() {
    const reverse = Math.random() > 0.5;
    particles.push({
        x: reverse ? rightOrb.x : leftOrb.x,
        y: reverse ? rightOrb.y : leftOrb.y,
        vx: (reverse ? leftOrb.x - rightOrb.x : rightOrb.x - leftOrb.x) / 120 + (Math.random() - 0.5),
        vy: (Math.random() - 0.5),
        life: 120
    });
}

function drawParticles() {
    pctx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        pctx.fillStyle = `rgba(210,160,255,${p.life / 120})`;
        pctx.beginPath();
        pctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        pctx.fill();
        if (p.life <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(drawParticles);
}

setInterval(spawnParticle, 150);
drawParticles();

/* MIDNIGHT MESSAGE */
const hour = new Date().getHours();
const textBlock = document.getElementById("textBlock");

if (hour >= 0 && hour <= 1) {
    textBlock.innerHTML = `
    <p class="line small">A new year begins tonight…</p>
    <p class="line big">and my first thought is you</p>
    <p class="signature">— today, tomorrow, always</p>
  `;
}

/* NAME REVEAL */
setTimeout(() => {
    const name = document.getElementById("nameReveal");
    if (name) name.style.opacity = "1";
}, 22000);

/* BACKGROUND FLASH */
setTimeout(() => {
    document.body.style.transition = "background 1.2s ease";
    document.body.style.background =
        "radial-gradient(circle at center, #2b145a, #05010a)";
}, 16000);

/* Resize */
window.addEventListener("resize", () => {
    stars.width = pCanvas.width = innerWidth;
    stars.height = pCanvas.height = innerHeight;
});

/* 💖 Name Reveal */
window.addEventListener("load", () => {
    const name = document.getElementById("nameReveal");
    if (!name) return;
    setTimeout(() => name.style.opacity = "1", 12000);
});

/* 🎆 Fireworks */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
const trigger = document.getElementById("newYear");

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

let particles = [];
let active = false;

function burst(x, y) {
    const colors = ["#ffd700", "#ff4dff", "#7df9ff", "#ff6b6b", "#c77dff"];
    const shapes = ["circle", "star", "heart", "diamond"];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 9,
            vy: (Math.random() - 0.5) * 9,
            life: 70,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            size: Math.random() * 3 + 2
        });
    }
}


function animate() {
    if (!active) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.beginPath();

        switch (p.shape) {
            case "star":
                drawStar(ctx, p.x, p.y, 5, p.size * 2, p.size);
                break;

            case "heart":
                drawHeart(ctx, p.x, p.y, p.size);
                break;

            case "diamond":
                ctx.moveTo(p.x, p.y - p.size);
                ctx.lineTo(p.x + p.size, p.y);
                ctx.lineTo(p.x, p.y + p.size);
                ctx.lineTo(p.x - p.size, p.y);
                ctx.closePath();
                break;

            default: // circle
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }

        ctx.fill();

        if (p.life <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(animate);
}

trigger.addEventListener("click", () => {
    canvas.style.display = "block";
    active = true;
    for (let i = 0; i < 8; i++) {
        setTimeout(() => burst(
            Math.random() * canvas.width,
            Math.random() * canvas.height * .6
        ), i * 250);
    }
    animate();
    setTimeout(() => {
        active = false;
        canvas.style.display = "none";
        particles = [];
    }, 5000);
});
function drawStar(ctx, x, y, points, outerRadius, innerRadius) {
    let angle = Math.PI / points;
    ctx.moveTo(x, y - outerRadius);

    for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? outerRadius : innerRadius;
        const a = i * angle - Math.PI / 2;
        ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
    }
    ctx.closePath();
}

function drawHeart(ctx, x, y, size) {
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
        x - size, y - size,
        x - size * 2, y + size / 2,
        x, y + size * 2
    );
    ctx.bezierCurveTo(
        x + size * 2, y + size / 2,
        x + size, y - size,
        x, y
    );
}


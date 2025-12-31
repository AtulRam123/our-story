/* 💖 Name Reveal */
window.addEventListener("load", () => {
    const name = document.getElementById("nameReveal");
    if (!name) return;

    setTimeout(() => {
        name.style.opacity = "1";
    }, 12000);
});

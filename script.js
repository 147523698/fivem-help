/* ===============================
   ACCORDÉONS (+ / -)
================================ */

document.querySelectorAll(".toggle").forEach(button => {
    button.addEventListener("click", () => {
        const card = button.closest(".card");
        const content = card.querySelector(".content");

        const isOpen = content.style.display === "block";

        // Fermer tous les autres
        document.querySelectorAll(".content").forEach(c => {
            c.style.display = "none";
        });
        document.querySelectorAll(".toggle").forEach(t => {
            t.textContent = "+";
        });

        // Ouvrir / fermer celui cliqué
        if (!isOpen) {
            content.style.display = "block";
            button.textContent = "−";
        }
    });
});

/* ===============================
   RECHERCHE DE TUTOS
================================ */

const searchInput = document.getElementById("search");

if (searchInput) {
    searchInput.addEventListener("input", e => {
        const value = e.target.value.toLowerCase();

        document.querySelectorAll(".card").forEach(card => {
            const title = card.dataset.title || "";
            card.style.display = title.includes(value) ? "block" : "none";
        });
    });
}

/* ===============================
   MODE SOMBRE / CLAIR
================================ */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light");
    });
}

/* ===============================
   ZOOM IMAGE (LIGHTBOX)
================================ */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".zoomable img").forEach(img => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    });
});

if (lightbox) {
    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
}

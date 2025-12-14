/* ===============================
   ACCORDÉONS (+ / -)
   Correction : Utilise la classe 'is-open' pour une gestion CSS/JS plus fiable
================================ */

document.querySelectorAll(".card-header").forEach(header => {
    header.addEventListener("click", () => {
        const card = header.closest(".card");
        const content = card.querySelector(".content");
        const toggleButton = card.querySelector(".toggle");

        // Déterminer si cette carte spécifique est actuellement ouverte
        const isCurrentlyOpen = header.getAttribute("aria-expanded") === "true";

        // --- 1. Fermer tous les autres accordéons ---
        document.querySelectorAll(".card").forEach(c => {
            const c_header = c.querySelector(".card-header");
            const c_content = c.querySelector(".content");
            const c_toggle = c.querySelector(".toggle");

            if (c !== card && c_header.getAttribute("aria-expanded") === "true") {
                // Fermer l'accordéon en JS : max-height à 0
                c_content.style.maxHeight = '0px'; 
                c_header.setAttribute("aria-expanded", "false");
                c_toggle.textContent = "+";
                c.classList.remove('open-default');
            }
        });
        
        // Retirer l'état d'ouverture par défaut du card cliqué avant de le gérer
        card.classList.remove('open-default');

        // --- 2. Ouvrir/Fermer l'élément cliqué ---
        if (isCurrentlyOpen) {
            // Fermer
            content.style.maxHeight = '0px';
            toggleButton.textContent = "+";
            header.setAttribute("aria-expanded", "false");
        } else {
            // Ouvrir avec la hauteur exacte (scrollHeight) pour l'animation fluide
            content.style.maxHeight = content.scrollHeight + "px"; 
            toggleButton.textContent = "−";
            header.setAttribute("aria-expanded", "true");
        }
    });
});


// Initialisation pour le premier élément ouvert (si open-default est présent)
document.addEventListener('DOMContentLoaded', () => {
    const defaultOpenCard = document.querySelector('.card.open-default');
    if (defaultOpenCard) {
        const header = defaultOpenCard.querySelector('.card-header');
        const content = defaultOpenCard.querySelector('.content');

        // Initialiser la hauteur pour que la transition fonctionne après le premier clic
        content.style.maxHeight = content.scrollHeight + "px";
        header.setAttribute('aria-expanded', 'true');
    }

    // Initialiser l'icône du thème au chargement
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        const isLight = document.body.classList.contains("light");
        themeToggle.textContent = isLight ? "☀️" : "🌙";
        themeToggle.setAttribute("aria-label", isLight ? "Passer au thème sombre" : "Passer au thème clair");
    }
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
            const desc = card.querySelector(".desc")?.textContent.toLowerCase() || "";
            
            const isVisible = title.includes(value) || desc.includes(value);

            card.style.display = isVisible ? "block" : "none";
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
        
        // Mettre à jour l'icône
        const isLight = document.body.classList.contains("light");
        themeToggle.textContent = isLight ? "☀️" : "🌙";
        themeToggle.setAttribute("aria-label", isLight ? "Passer au thème sombre" : "Passer au thème clair");
    });
}

/* ===============================
   ZOOM IMAGE (LIGHTBOX)
================================ */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".zoomable img").forEach(img => {
    img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.add("active"); 
        lightbox.setAttribute("aria-hidden", "false");
    });
});

if (lightbox) {
    lightbox.addEventListener("click", () => {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
    });
}

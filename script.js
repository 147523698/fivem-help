/* ===============================
   ACCORDÉONS (+ / -) - VERSION STABLE
   ================================ */

document.querySelectorAll(".card-header").forEach(header => {
    header.addEventListener("click", () => {
        const card = header.closest(".card");
        const content = card.querySelector(".content");
        const toggleButton = card.querySelector(".toggle");

        // Déterminer si cette carte spécifique est actuellement ouverte
        const isCurrentlyOpen = card.classList.contains("is-open");

        // --- 1. Fermer tous les autres accordéons ---
        document.querySelectorAll(".card.is-open").forEach(c => {
            if (c !== card) {
                const c_content = c.querySelector(".content");
                const c_header = c.querySelector(".card-header");
                const c_toggle = c.querySelector(".toggle");

                // Fermer en JS pour que la transition fonctionne
                c_content.style.maxHeight = '0px'; 
                c_header.setAttribute("aria-expanded", "false");
                c_toggle.textContent = "+";
                c.classList.remove('is-open');
                c.classList.remove('open-default'); // Nettoyage de la classe de défaut
            }
        });
        
        // --- 2. Ouvrir/Fermer l'élément cliqué ---
        if (isCurrentlyOpen) {
            // Fermer
            content.style.maxHeight = '0px';
            toggleButton.textContent = "+";
            header.setAttribute("aria-expanded", "false");
            card.classList.remove('is-open');
        } else {
            // Ouvrir avec la hauteur exacte (scrollHeight) pour l'animation fluide
            content.style.maxHeight = content.scrollHeight + "px"; 
            toggleButton.textContent = "−";
            header.setAttribute("aria-expanded", "true");
            card.classList.add('is-open');
        }

        card.classList.remove('open-default'); // Assurer le nettoyage après le clic
    });
});


// Initialisation pour les transitions et l'état par défaut
document.addEventListener('DOMContentLoaded', () => {
    // 1. Gérer l'état par défaut au chargement
    const defaultOpenCard = document.querySelector('.card.open-default');
    if (defaultOpenCard) {
        const content = defaultOpenCard.querySelector('.content');
        const header = defaultOpenCard.querySelector('.card-header');
        
        // Force l'ouverture au chargement sans animation
        content.style.maxHeight = content.scrollHeight + "px";
        header.setAttribute('aria-expanded', 'true');
        defaultOpenCard.classList.add('is-open');
    }

    // 2. Initialiser l'icône du thème au chargement
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

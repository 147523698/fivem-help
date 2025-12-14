/* ===============================
   ACCORDÉONS (+ / -)
================================ */

// Change l'écouteur du bouton au header pour une plus grande zone de clic
document.querySelectorAll(".card-header").forEach(header => {
    header.addEventListener("click", () => {
        const card = header.closest(".card");
        const content = card.querySelector(".content");
        const toggleButton = card.querySelector(".toggle");

        const isOpen = content.style.display === "block";

        // Fermer tous les autres accordéons
        document.querySelectorAll(".content").forEach(c => {
            c.style.display = "none";
            c.closest(".card").querySelector(".card-header").setAttribute("aria-expanded", "false");
        });
        document.querySelectorAll(".toggle").forEach(t => {
            t.textContent = "+";
        });

        // Ouvrir / fermer celui cliqué
        if (!isOpen) {
            content.style.display = "block";
            toggleButton.textContent = "−";
            header.setAttribute("aria-expanded", "true");
        } else {
            // S'il était déjà ouvert, le fermer (utile si on reclique sur l'accordéon déjà ouvert)
            content.style.display = "none";
            toggleButton.textContent = "+";
            header.setAttribute("aria-expanded", "false");
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
            // Inclut également la description dans la recherche pour plus de pertinence
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
    
    // Initialiser l'icône au chargement (en supposant le mode sombre par défaut)
    const isLight = document.body.classList.contains("light");
    themeToggle.textContent = isLight ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-label", isLight ? "Passer au thème sombre" : "Passer au thème clair");
}

/* ===============================
   ZOOM IMAGE (LIGHTBOX)
================================ */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".zoomable img").forEach(img => {
    img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        // Utilisez la classe 'active' pour gérer l'affichage via CSS (LightBox plus esthétique)
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

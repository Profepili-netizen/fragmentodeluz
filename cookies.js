/* ----------------------------- Carga controlada de Google Analytics ----------------------------- */
function cargarGoogleAnalytics() {
    // Evita cargar Google Analytics más de una vez
    if (document.getElementById("ga-script")) return;

    try {
        const scriptGA = document.createElement("script");
        scriptGA.id = "ga-script";
        scriptGA.async = true;
        scriptGA.src = "https://www.googletagmanager.com/gtag/js?id=G-TU_ID_REAL"; // ← reemplazar por ID real

        scriptGA.onload = function () {
            const scriptInit = document.createElement("script");
            scriptInit.id = "ga-init";
            scriptInit.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){ dataLayer.push(arguments); }
                gtag('js', new Date());
                gtag('config', 'G-TU_ID_REAL');
            `;
            document.head.appendChild(scriptInit);
        };

        document.head.appendChild(scriptGA);

    } catch (e) {
        console.warn("Error al cargar Google Analytics:", e);
    }
}

/* ----------------------------- Lógica del banner de cookies ----------------------------- */
document.addEventListener("DOMContentLoaded", function () {

    const banner = document.getElementById("cookie-banner");
    if (!banner) return;

    let consent = null;

    // Prevención de parpadeo visual
    banner.style.display = "none";
    banner.setAttribute("aria-hidden", "true");

    try {
        consent = localStorage.getItem("cookie-consent");
    } catch (e) {
        console.warn("LocalStorage no disponible:", e);
        banner.style.display = "block";
        banner.setAttribute("aria-hidden", "false");
        return;
    }

    // Evaluación del consentimiento guardado
    if (!consent) {
        banner.style.display = "block";
        banner.setAttribute("aria-hidden", "false");
        banner.setAttribute("role", "dialog");
    } 
    else if (consent === "accepted") {
        cargarGoogleAnalytics();
    } 
    else if (consent === "rejected") {
        // Rechazo explícito: no se carga ningún script
    }

    const btnAccept = document.getElementById("cookie-accept");
    const btnReject = document.getElementById("cookie-reject");

    // Aceptar cookies
    if (btnAccept) {
        btnAccept.addEventListener("click", function () {
            try {
                localStorage.setItem("cookie-consent", "accepted");
            } catch (e) {
                console.warn("No se pudo guardar la preferencia:", e);
            }

            banner.style.display = "none";
            banner.setAttribute("aria-hidden", "true");
            cargarGoogleAnalytics();
        });
    }

    // Rechazar cookies
    if (btnReject) {
        btnReject.addEventListener("click", function () {
            try {
                localStorage.setItem("cookie-consent", "rejected");
            } catch (e) {
                console.warn("No se pudo guardar la preferencia:", e);
            }

            banner.style.display = "none";
            banner.setAttribute("aria-hidden", "true");
        });
    }
});

/* ----------------------------- Captura global de errores ----------------------------- */
window.addEventListener("error", function (e) {
    console.warn("⚠️ Error capturado:", e.message);
});

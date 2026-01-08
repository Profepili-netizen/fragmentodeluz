// ——— ACORDEÓN UNIVERSAL PARA DISCOGRAFÍAS ——— //
document.addEventListener("DOMContentLoaded", () => {
    const years = document.querySelectorAll(".discografia .anio");

    if (years.length === 0) return; // si no hay acordeones, no hace nada

    // 1. Cerrar todas las sublistas por defecto
    years.forEach((li) => {
        const sublista = li.querySelector(".sublista");
        if (sublista) sublista.classList.remove("abierto");
    });

    // 2. Abrir el año más reciente automáticamente (primer .anio)
    const firstYear = years[0].querySelector(".sublista");
    if (firstYear) firstYear.classList.add("abierto");

    // 3. Manejar clics en los botones
    years.forEach((li) => {
        const btn = li.querySelector(".toggle");
        const sublista = li.querySelector(".sublista");

        if (!btn || !sublista) return;

        btn.addEventListener("click", () => {
            sublista.classList.toggle("abierto");
        });
    });
});

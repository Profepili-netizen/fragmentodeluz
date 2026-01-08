// ———————————————— FUNCIÓN PRINCIPAL ————————————————
function inicializarMenu() {

    const menuBoton = document.querySelector('.menu-boton');
    const menu = document.querySelector('.menu-desplegable');

    if (!menuBoton || !menu) return;
    // Abrir/cerrar menú principal
    menuBoton.addEventListener('click', () => {
    const visible = menu.classList.toggle('visible');
    menuBoton.setAttribute('aria-expanded', visible ? 'true' : 'false');
});
    // Submenús
    const submenus = document.querySelectorAll('.submenu');

    submenus.forEach(sub => {
        const boton = sub.querySelector('.submenu-boton');
        const lista = sub.querySelector('.submenu-lista');
        // Si NO tiene submenú (lista vacía), que funcione como enlace normal
        if (!boton || !lista || lista.children.length === 0) {
            if (boton) {
                boton.classList.remove('submenu-boton');
                boton.removeAttribute('aria-expanded');
            }
            return;
        }

        boton.addEventListener('click', (e) => {

            // Si el submenú NO está abierto → lo abrimos sin navegar
            if (!lista.classList.contains('activo')) {
                e.preventDefault();

                // Cerrar otros submenús
                submenus.forEach(s => {
                    if (s !== sub) {
                        const l = s.querySelector('.submenu-lista');
                        const b = s.querySelector('.submenu-boton');
                        if (l) l.classList.remove('activo');
                        if (b) b.setAttribute('aria-expanded', 'false');
                    }
                });

                // Abrir este
                lista.classList.add('activo');
                boton.setAttribute('aria-expanded', 'true');
                return;
            }

            // Si ya estaba abierto → permitimos navegar
            lista.classList.remove('activo');
            boton.setAttribute('aria-expanded', 'false');
        });
    });

    // Cerrar solo submenús al hacer clic afuera (NO cerrar el menú principal)
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !menuBoton.contains(e.target)) {

            submenus.forEach(sub => {
                const lista = sub.querySelector('.submenu-lista');
                const boton = sub.querySelector('.submenu-boton');

                if (lista) lista.classList.remove('activo');
                if (boton) boton.setAttribute('aria-expanded', 'false');
            });
        }
    });
}

// ———————————————— INSERCIÓN DINÁMICA ————————————————
document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.querySelector("#menu-container");

    if (contenedor) {
        // Página que usa fetch (fragmento-deluz)
       fetch("/menu.html")
    .then(r => {
        if (!r.ok) throw new Error("No se pudo cargar el menú");
        return r.text();
    })
    .then(html => {
        contenedor.innerHTML = html;
        inicializarMenu();
    })
    .catch(err => console.warn("Error cargando el menú:", err));
    } else {
        // Páginas que ya incluyen el menú directamente
        inicializarMenu();
    }
});

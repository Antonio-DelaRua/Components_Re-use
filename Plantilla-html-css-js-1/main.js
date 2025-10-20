// Efectos de parallax - CON VERIFICACIÓN DE ELEMENTOS
let moon = document.getElementById("moon");
let text = document.getElementById("text");
let train = document.getElementById("train");
let desert_moon = document.getElementById("desert-moon");
let man = document.getElementById("man");

// Verificar que los elementos existen antes de agregar event listeners
if (moon || text || train || desert_moon || man) {
    window.addEventListener("scroll", () => {
        let value = window.scrollY;
        
        // Aplicar efectos solo a elementos que existen
        if (moon) moon.style.top = value * .9 + "px";
        if (text) text.style.top = 80 + value * -0.2 + '%';
        if (train) train.style.left = value * 1.5 + "px";
        if (desert_moon) desert_moon.style.top = value * .3 + "px";
        if (man) man.style.left = value * .6 + "px";
    });
}

// Progress bar - VERSIÓN CORREGIDA Y MEJORADA
let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    
    // Verificar que el elemento existe
    if (!scrollProgress) {
        console.warn("Elemento 'progress' no encontrado en el DOM");
        return;
    }
    
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Evitar división por cero
    let scrollValue = calcHeight > 0 ? Math.round((pos * 100) / calcHeight) : 0;

    if (pos > 100) {
        scrollProgress.style.display = "grid";
    } else {
        scrollProgress.style.display = "none";
    }

    // CORREGIDO: Usar correctamente el conic-gradient
    scrollProgress.style.background = `conic-gradient(#194eb9 ${scrollValue}%, #67ccff ${scrollValue}%)`;
};

// Solo asignar eventos si el elemento progress existe
if (document.getElementById("progress")) {
    window.onscroll = calcScrollValue;
    window.onload = calcScrollValue;
    
    // Mover el event listener fuera de la función calcScrollValue
    document.getElementById("progress").addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });
}

// Control de videos - CON VERIFICACIÓN
const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

// Sidebar elements - CON VERIFICACIÓN
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const hoverSign = document.querySelector('.hover-sign');

// Verificar que los videos existen antes de agregar event listeners
const videoList = [video1, video2, video3].filter(video => video !== null);

if (videoList.length > 0 && hoverSign) {
    videoList.forEach(function(video) {
        video.addEventListener("mouseover", function() {
            video.play().catch(e => console.log("Error reproduciendo video:", e));
            hoverSign.classList.add("active");
        });
        
        video.addEventListener("mouseout", function() {
            video.pause();
            hoverSign.classList.remove("active");
        });
    });
} else {
    console.warn("No se encontraron videos o el elemento hover-sign");
}

// Sidebar functionality - CON VERIFICACIÓN
if (menu && sideBar) {
    menu.addEventListener("click", function() {
        sideBar.classList.remove("close-sidebar");
        sideBar.classList.add("open-sidebar");
    });
} else {
    console.warn("Elementos del sidebar no encontrados");
}

if (closeIcon && sideBar) {
    closeIcon.addEventListener("click", function() {
        sideBar.classList.remove("open-sidebar");
        sideBar.classList.add("close-sidebar");
    });
}
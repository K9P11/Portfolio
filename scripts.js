// Smooth scroll to section
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}







//LOTTIE
// Cargar la animación con el enlace proporcionado
const animation = lottie.loadAnimation({
  container: document.getElementById('canvas'),
  renderer: 'svg',
  loop: false,  // No hacer loop
  autoplay: false,  // No iniciar automáticamente
  path: 'https://lottie.host/3d5dbdb2-0c00-4022-acc5-6e5db1ed1cce/oaT4cHCPni.json',  // Usar el enlace proporcionado
});

// Estado de la animación
let isReverse = false; // Para controlar la dirección

// Establecer tema inicial
document.body.classList.add('dark-theme');

// Controlar la reproducción y el tema al hacer clic
document.getElementById('canvas').addEventListener('click', () => {
  if (animation.isPaused || animation.currentFrame === animation.totalFrames || animation.currentFrame === 0) {
    if (isReverse) {
      // Reproducir en reversa (del final al principio)
      animation.setDirection(-1); // Cambiar la dirección a reversa
    } else {
      // Reproducir hacia adelante (del principio al final)
      animation.setDirection(1); // Cambiar la dirección a hacia adelante
    }
    animation.play(); // Reproducir
    isReverse = !isReverse; // Alternar entre reproducir hacia adelante y hacia atrás
  } else {
    animation.stop(); // Detener la animación si ya está en reproducción
  }
});

// Cambiar el tema de manera gradual a lo largo de la animación
animation.addEventListener('enterFrame', () => {
  // Obtener el progreso de la animación como un valor entre 0 y 1
  const progress = animation.currentFrame / animation.totalFrames;

  // Interpolar el cambio entre los dos temas (oscuro y claro) usando las variables CSS
  updateTheme(progress);
});

// Función para actualizar el tema de manera gradual
function updateTheme(progress) {
  
  // Alternar entre temas gradualmente
  if (progress < 0.5) {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  } else {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
  }
}












// Observer for updating section titles and lines on scroll
function createIntersectionObserver() {
  const sections = document.querySelectorAll('section');
  const menuItems = document.querySelectorAll('nav ul li a');

  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0.2, 0.8, 0.6, 0.8, 1.0] // Ajuste de la visibilidad para considerar la sección como "visible"
  };

  function observerCallback(entries) {
    entries.forEach(entry => {
        const sectionId = entry.target.getAttribute('id');
        const menuItem = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
        const section = entry.target;

        // Verifica si la sección está en el viewport
        if (entry.isIntersecting) {
            // Agregar la clase 'active' al menú correspondiente
            menuItems.forEach(item => item.classList.remove('active'));
            if (menuItem) {
                menuItem.classList.add('active'); // Agregar 'active' al enlace correspondiente
            }

            // Agregar la clase 'active-section' para cambiar el color de los títulos y las líneas
            section.classList.add('active-section');

            // Cambiar los gradientes de los títulos y las líneas cuando la sección está visible
            const text = section.querySelector('.about-text, .experience-text, .certifications-text');
            const line = section.querySelector('.about-line, .experience-line, .certifications-line');

            if (text) text.classList.add('active');
            if (line) line.classList.add('active');
        } else {
            // Eliminar la clase 'active-section' cuando la sección no es visible
            section.classList.remove('active-section');

            // Restaurar los gradientes cuando la sección ya no es visible
            const text = section.querySelector('.about-text, .experience-text, .certifications-text');
            const line = section.querySelector('.about-line, .experience-line, .certifications-line');

            if (text) text.classList.remove('active');
            if (line) line.classList.remove('active');
        }
    });
  }

  // Crear y aplicar el observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  // Observamos todas las secciones
  sections.forEach(section => observer.observe(section));
}

// Ejecuta el observer cuando el DOM está listo
document.addEventListener('DOMContentLoaded', createIntersectionObserver);





// Medir el sticky para restarlo a los paneles
function updateRightPanelHeight() {
  const stickyMenu = document.querySelector('.sticky-menu');
  const stickyMenuHeight = stickyMenu.offsetHeight; // Obtener la altura del sticky menu

  // Asignar la altura del sticky-menu a una variable CSS
  document.documentElement.style.setProperty('--sticky-menu-height', `${stickyMenuHeight}px`);
}

// Llamar a la función cuando el DOM cargue y al redimensionar la ventana
window.addEventListener('DOMContentLoaded', updateRightPanelHeight);
window.addEventListener('resize', updateRightPanelHeight);


















//Menu
// Obtenemos los elementos del DOM
const menuIcon = document.querySelector('.menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');
const menuItems = document.querySelectorAll('.mobile-menu a'); // Asegúrate de que los enlaces del menú tengan la etiqueta <a>

// Cuando se haga clic en el ícono flotante, se muestra o se oculta el menú móvil
menuIcon.addEventListener('click', () => {
    // Agregamos o quitamos la clase 'show' para mostrar/ocultar el menú
    mobileMenu.classList.toggle('show');
});

// Cuando se haga clic en cualquier opción del menú, se cierra el menú móvil
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.remove('show'); // Quitamos la clase 'show'
    });
});















document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const loaderWrapper = document.getElementById('loaderWrapper');
  const content = document.getElementById('content');

  // Parámetro de la pausa (en milisegundos)
  const pauseDuration = 0; // 2 segundos
  const fadeDuration = 1000; // 1 segundo para desvanecerse

  // Cargar la animación de Lottie
  const animation = lottie.loadAnimation({
    container: loader, // Elemento contenedor
    renderer: 'svg',
    loop: false, // No repetir
    autoplay: true, // Reproducir automáticamente
    path: 'https://lottie.host/da8569ec-a54c-4a77-a4d5-0bb1961c92df/V6P423c0H8.json', // URL de tu animación
  });

  // Evento para verificar cuando la animación ha llegado al final
  animation.addEventListener('complete', () => {
    // Detener la animación en el último frame
    animation.stop();

    // Pausar la animación 2 segundos antes de comenzar a desvanecer
    setTimeout(() => {
      // Iniciar la animación de desvanecimiento
      fadeOutAnimation();
    }, pauseDuration);
  });

  // Función para manejar el desvanecimiento
  function fadeOutAnimation() {
    // Aplicamos la animación de opacidad para ambos: loader y loaderWrapper
    loader.style.transition = `opacity ${fadeDuration / 1000}s ease-out`; // Transición de opacidad para el loader
    loaderWrapper.style.transition = `opacity ${fadeDuration / 1000}s ease-out`; // Transición de opacidad para el loaderWrapper

    // Reducir la opacidad de ambos a 0 simultáneamente
    loader.style.opacity = '0';
    loaderWrapper.style.opacity = '0';

    // Después de la duración de la transición (1 segundo), ocultamos el loaderWrapper y mostramos el contenido
    setTimeout(() => {
      loader.style.display = 'none';
      loaderWrapper.style.display = 'none'; // Ocultar el loaderWrapper
      content.style.display = 'block'; // Mostrar el contenido
    }, fadeDuration); // Esperar a que termine la animación de desvanecimiento
  }
});






















document.addEventListener("DOMContentLoaded", function () {
  const certifications = document.querySelectorAll(".certification");
  const viewMoreBtn = document.getElementById("view-more-btn");
  const itemsPerPage = 6; // Número de certificaciones por bloque
  let currentIndex = 0;

  // Función para mostrar un bloque de certificaciones
  function showNextBatch() {
    const nextIndex = currentIndex + itemsPerPage;
    certifications.forEach((cert, index) => {
      // Mostrar solo las certificaciones que están dentro del rango
      if (index >= currentIndex && index < nextIndex) {
        cert.classList.remove("hidden"); // Mostrar
      }
    });
    currentIndex = nextIndex;

    // Si no hay más certificaciones, deshabilitar el botón
    if (currentIndex >= certifications.length) {
      viewMoreBtn.style.display = "none"; // Ocultar el botón
    }
  }

  // Oculta todas las certificaciones inicialmente 
  certifications.forEach((cert) => cert.classList.add("hidden"));

  // Mostrar el primer bloque al cargar la página 
  showNextBatch();

  // Evento para el botón "View More"
  viewMoreBtn.addEventListener("click", showNextBatch);
});

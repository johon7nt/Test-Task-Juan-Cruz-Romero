document.addEventListener('DOMContentLoaded', () => {

  // =========================================
  // 1. MENÚ HAMBURGUESA (Móvil/Tablet)
  // =========================================
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      // Alternar la clase 'active' para mostrar/ocultar menú
      nav.classList.toggle('active');
    });
  }


  // =========================================
  // 2. MODO ACCESIBILIDAD (Daltónico)
  // =========================================
  const accessBtn = document.getElementById('accessibility-toggle');
  
  // 1) Verificar si hay una preferencia guardada en el navegador
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'colorblind') {
    document.documentElement.setAttribute('data-theme', 'colorblind');
  }

  // 2) Lógica del botón para activar/desactivar
  if (accessBtn) {
    accessBtn.addEventListener('click', () => {
      const isColorblind = document.documentElement.getAttribute('data-theme') === 'colorblind';

      if (isColorblind) {
        // Desactivar
        document.documentElement.removeAttribute('data-theme');
        localStorage.removeItem('theme');
      } else {
        // Activar
        document.documentElement.setAttribute('data-theme', 'colorblind');
        localStorage.setItem('theme', 'colorblind');
      }
    });
  }


  // =========================================
  // 3. CUENTA REGRESIVA (Countdown)
  // =========================================
  // Configuración: La cuenta termina 24 horas después de cargar la página
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 1); 
  const countDownDate = targetDate.getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    // Cálculos matemáticos para días, horas, minutos y segundos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualización del DOM
    const elDays = document.getElementById('days');
    const elHours = document.getElementById('hours');
    const elMinutes = document.getElementById('minutes');
    const elSeconds = document.getElementById('seconds');

    // Agregam un '0' delante si el número es menor a 10
    if (elDays) elDays.innerText = days < 10 ? '0' + days : days;
    if (elHours) elHours.innerText = hours < 10 ? '0' + hours : hours;
    if (elMinutes) elMinutes.innerText = minutes < 10 ? '0' + minutes : minutes;
    if (elSeconds) elSeconds.innerText = seconds < 10 ? '0' + seconds : seconds;

    // Si la cuenta termina
    if (distance < 0) {
      clearInterval(timerInterval);
      const grid = document.querySelector('.countdown-grid');
      if(grid) grid.innerHTML = "<p>Oferta Finalizada</p>";
    }
  };

  // Inicia intervalo de actualización 
  const timerInterval = setInterval(updateCountdown, 1000);
  updateCountdown(); 


  // =========================================
  // 4. PREGUNTAS FRECUENTES (Acordeón)
  // =========================================
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      // Selecciona el contenedor padre (.faq-item) y alternas la clase
      const item = question.parentElement;
      item.classList.toggle('active');
    });
  });


  // =========================================
  // 5. BOTÓN VOLVER ARRIBA (Scroll Top)
  // =========================================
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    // 1) Detectar Scroll para mostrar u ocultar el botón
    window.addEventListener('scroll', () => {
      // Si bajamos más de 150px, mostramos el botón
      if (window.scrollY > 150) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    // 2) Acción al hacer clic 
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
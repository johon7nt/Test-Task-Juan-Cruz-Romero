document.addEventListener('DOMContentLoaded', () => {

  // =========================================
  // 1. HAMBURGER MENU (Mobile/Tablet)
  // =========================================
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      // Toggle the 'active' class to show/hide the menu
      nav.classList.toggle('active');
    });
  }


  // =========================================
  // 2. ACCESSIBILITY MODE (Colorblind)
  // =========================================
  const accessBtn = document.getElementById('accessibility-toggle');
  
  // 1) Check if there is a saved preference in the browser
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'colorblind') {
    document.documentElement.setAttribute('data-theme', 'colorblind');
  }

  // 2) Logic of the button to activate/deactivate
  if (accessBtn) {
    accessBtn.addEventListener('click', () => {
      const isColorblind = document.documentElement.getAttribute('data-theme') === 'colorblind';

      if (isColorblind) {
        // Deactivate
        document.documentElement.removeAttribute('data-theme');
        localStorage.removeItem('theme');
      } else {
        // Activate
        document.documentElement.setAttribute('data-theme', 'colorblind');
        localStorage.setItem('theme', 'colorblind');
      }
    });
  }


  // =========================================
  // 3. COUNTDOWN 
  // =========================================
  // Settings: The account ends 24 hours after the page loads
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 1); 
  const countDownDate = targetDate.getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    // Days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // DOM update
    const elDays = document.getElementById('days');
    const elHours = document.getElementById('hours');
    const elMinutes = document.getElementById('minutes');
    const elSeconds = document.getElementById('seconds');

    // Add a '0' in front if the number is less than 10
    if (elDays) elDays.innerText = days < 10 ? '0' + days : days;
    if (elHours) elHours.innerText = hours < 10 ? '0' + hours : hours;
    if (elMinutes) elMinutes.innerText = minutes < 10 ? '0' + minutes : minutes;
    if (elSeconds) elSeconds.innerText = seconds < 10 ? '0' + seconds : seconds;

    // If the account ends
    if (distance < 0) {
      clearInterval(timerInterval);
      const grid = document.querySelector('.countdown-grid');
      if(grid) grid.innerHTML = "<p>Oferta Finalizada</p>";
    }
  };

  // Start update interval
  const timerInterval = setInterval(updateCountdown, 1000);
  updateCountdown(); 


  // =========================================
  // 4. FAQ 
  // =========================================
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      // Select the parent container (.faq-item) and alternate the class
      const item = question.parentElement;
      item.classList.toggle('active');
    });
  });


  // =========================================
  // 5. BACK TO TOP BUTTON
  // =========================================
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    // 1) Detect Scroll to show or hide the button
    window.addEventListener('scroll', () => {
      // If it scrolls down more than 150px, it shows the button
      if (window.scrollY > 150) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    // 2) Action on click
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
// JavaScript for global functionality across the website
document.addEventListener('DOMContentLoaded', function() {
  // Mobile phone menu toggle
  const menuToggle = document.createElement('div');
  menuToggle.className = 'menu-toggle';
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  document.querySelector('header').appendChild(menuToggle);
  
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');
  
  menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    menuToggle.innerHTML = nav.classList.contains('active') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

  // Scrolled Header Effect
  //This effect makes the header change color when you scroll down
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Highlight active link based on current page URL, the header
  const currentPage = window.location.pathname.split("/").pop(); // e.g., 'projects.html'
  navLinks.forEach(link => {
    link.classList.remove('active');
    const linkPage = link.getAttribute('href').split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  
  /* ===== Typing Animation for index.html ===== */
  // Typing Animation - char loop until the end of the word, then delete
  const roleElement = document.querySelector('.info span'); // This targets the span inside the info class in index.html

  // Check if the element exists before proceeding
  if (roleElement) { 
    const roles = [
      "Cybersecurity", 
      "Artifical Intelligence", 
      "Machine Learning",
      "Software Engineer", 
      "Game Development", 
      "Web Development"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
  
    function type() {
      const currentRole = roles[roleIndex]; // Store the current role in a variable
      
      if (isDeleting) { // If deleting, remove characters
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else { // If typing, add characters
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
  
      if (!isDeleting && charIndex === currentRole.length) { // If the word is fully typed
        isDeleting = true;
        typingSpeed = 1500; 
      } else if (isDeleting && charIndex === 0) { // If the word is fully deleted
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length; // Move to the next role, Result: (1 % 6 = 1), (2 % 6 = 2), etc, (6 % 6 = 0)
        typingSpeed = 500; 
      }
  
      setTimeout(type, typingSpeed); // Recursive call with dynamic speed, recursive call means it calls itself, a loop
    }
  
    // Start typing animation
    setTimeout(type, 1000); // Initial the animation after 1 second
  }
  /* ===== End of Typing Animation ===== */
  
});
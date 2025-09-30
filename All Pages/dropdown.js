document.querySelectorAll('.dropdown-language, .dropdown-classes, .dropdown-lecture')
  .forEach(dropdown => {
    const button = dropdown.querySelector('.dropbtn-language, .dropbtn-classes, .dropbtn-lecture');
    
    button.addEventListener('click', function (e) {
      e.stopPropagation(); // don’t close immediately
      // Close all others first
      document.querySelectorAll('.dropdown-language, .dropdown-classes, .dropdown-lecture')
        .forEach(d => d.classList.remove('active'));
      
      dropdown.classList.toggle('active');
    });
  });

// Close when clicking anywhere else
document.addEventListener('click', function () {
  document.querySelectorAll('.dropdown-language, .dropdown-classes, .dropdown-lecture')
    .forEach(d => d.classList.remove('active'));
});
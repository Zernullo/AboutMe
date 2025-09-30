document.querySelectorAll('.dropdown-language, .dropdown-classes, .dropdown-lecture')
  .forEach(dropdown => {
    const button = dropdown.querySelector('button');
    
    button.addEventListener('click', function (e) {
      e.preventDefault();   // stops form-submit behavior
      e.stopPropagation();  // don’t close immediately
      
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

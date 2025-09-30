document.addEventListener('DOMContentLoaded', function() {
  
  button.addEventListener('click', function (e) {
    e.stopPropagation();

    // Close all dropdowns first
    document.querySelectorAll('.dropdown-language, .dropdown-classes, .dropdown-lecture')
      .forEach(d => {
        if (d !== dropdown) d.classList.remove('active');
      });

    // Toggle current one
    dropdown.classList.toggle('active');
  });

  // Close when clicking anywhere else
  document.addEventListener('click', function (e) {
    // If the click is NOT inside a dropdown, close all
    if (!e.target.closest('.dropdown-language, .dropdown-classes, .dropdown-lecture')) {
      document.querySelectorAll('.dropdown-language, .dropdown-classes, .dropdown-lecture')
        .forEach(d => d.classList.remove('active'));
    }
  });
});

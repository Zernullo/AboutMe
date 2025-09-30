document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.dropdown-language, .dropdown-classes, .dropdown-lecture')
    .forEach(dropdown => {
      const button = dropdown.querySelector('button');

      button.addEventListener('click', function (e) {
        e.stopPropagation();

        // Close all other dropdowns first
        document.querySelectorAll('.dropdown-language, .dropdown-classes, .dropdown-lecture')
          .forEach(d => {
            if (d !== dropdown) d.classList.remove('active');
          });

        // Toggle current dropdown
        dropdown.classList.toggle('active');
      });
    });

  // Close when clicking anywhere else
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown-language, .dropdown-classes, .dropdown-lecture')) {
      document.querySelectorAll('.dropdown-language, .dropdown-classes, .dropdown-lecture')
        .forEach(d => d.classList.remove('active'));
    }
  });
});

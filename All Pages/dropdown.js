document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.dropdown-language, .dropdown-classes, .dropdown-lecture')
    .forEach(dropdown => {
      const button = dropdown.querySelector('button');

      button.addEventListener('click', function (e) {
        e.stopPropagation(); // prevent bubbling

        // Toggle current dropdown only
        dropdown.classList.toggle('active');
      });
    });

  // Close when clicking anywhere else
  document.addEventListener('click', function () {
    document.querySelectorAll('.dropdown-language, .dropdown-classes, .dropdown-lecture')
      .forEach(d => d.classList.remove('active'));
  });
});

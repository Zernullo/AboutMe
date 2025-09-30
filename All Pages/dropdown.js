document.addEventListener('DOMContentLoaded', function () {
  const dropdowns = document.querySelectorAll('.dropdown-language, .dropdown-classes, .dropdown-lecture');

  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('button');

    button.addEventListener('click', function (e) {
      e.stopPropagation();

      // Close all others
      dropdowns.forEach(d => {
        if (d !== dropdown) {
          d.classList.remove('active');
          d.querySelector('button').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      const isActive = dropdown.classList.toggle('active');
      button.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown-language, .dropdown-classes, .dropdown-lecture')) {
      dropdowns.forEach(d => {
        d.classList.remove('active');
        d.querySelector('button').setAttribute('aria-expanded', 'false');
      });
    }
  });
});

// script.js

document.getElementById('mode-toggle').addEventListener('click', function() {
  const body = document.body;
  const navbar = document.querySelector('.navbar');
  const footer = document.querySelector('footer');
  body.classList.toggle('dark-mode');
  navbar.classList.toggle('dark-mode');
  footer.classList.toggle('dark-mode');

  const isDarkMode = body.classList.contains('dark-mode');
  this.textContent = isDarkMode ? '☀️' : '🌙';
});
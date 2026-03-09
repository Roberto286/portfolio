// ===================================
// CUSTOM JAVASCRIPT
// Roberto Saliola Portfolio
// ===================================

// Show More Projects functionality
document.addEventListener('DOMContentLoaded', function() {
  const projectHolder = document.getElementById('project-card-holder');
  if (!projectHolder) return;
  
  const projects = projectHolder.querySelectorAll('.project-card');
  if (projects.length <= 3) return; // Non serve bottone se ≤3 progetti
  
  // Crea bottone "Mostra tutti"
  const btnContainer = document.createElement('div');
  btnContainer.className = 'show-more-projects-btn';
  
  const btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  
  // Usa i18n se disponibile, altrimenti fallback
  const showAllText = window.i18n && window.i18n.show_all_projects 
    ? window.i18n.show_all_projects 
    : 'Vedi tutti i progetti';
  const showLessText = window.i18n && window.i18n.show_less 
    ? window.i18n.show_less 
    : 'Mostra meno';
  
  btn.textContent = showAllText;
  
  btn.addEventListener('click', function() {
    projectHolder.classList.toggle('show-all');
    btn.textContent = projectHolder.classList.contains('show-all') 
      ? showLessText
      : showAllText;
  });
  
  btnContainer.appendChild(btn);
  projectHolder.parentElement.appendChild(btnContainer);
});

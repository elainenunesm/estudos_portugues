document.addEventListener('DOMContentLoaded', function() {
  const nivelSelector = document.getElementById('nivelSelector');
  const heroCard = document.getElementById('heroCard');
  const heroContent = document.getElementById('heroContent');
  const pathContainer = document.getElementById('pathContainer');

  let isCollapsed = false;

  function toggleLevel() {
    isCollapsed = !isCollapsed;
    console.log('Toggle! Estado:', isCollapsed);

    if (isCollapsed) {
      nivelSelector.classList.add('collapsed');
      heroContent.classList.add('collapsed');
      heroCard.classList.add('collapsed');
      pathContainer.classList.add('collapsed');
    } else {
      nivelSelector.classList.remove('collapsed');
      heroContent.classList.remove('collapsed');
      heroCard.classList.remove('collapsed');
      pathContainer.classList.remove('collapsed');
    }
  }

  // Clique no nível
  nivelSelector.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleLevel();
  });

  // Clique em qualquer parte do card
  heroCard.addEventListener('click', function(e) {
    if (e.target.closest('.hero-content')) return;
    toggleLevel();
  });

// Botões recomeçar / continuar
    document.querySelectorAll('.btn-recomecar').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const originalText = this.textContent;
        const isContinuar = originalText === 'Continuar';
        this.textContent = isContinuar ? 'Carregando...' : 'Reiniciando...';
        this.style.background = '#4a22a8';
        setTimeout(() => {
          this.textContent = originalText;
          this.style.background = '#5B2BCB';
        }, 1200);
      });
    });

    // Toast de aviso para aulas bloqueadas
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = '🔒 Conclua a aula anterior para desbloquear';
    document.body.appendChild(toast);

    let toastTimer;
    document.querySelectorAll('.aula-node.locked').forEach(node => {
      node.style.pointerEvents = 'auto';
      node.addEventListener('click', function() {
        clearTimeout(toastTimer);
        toast.classList.add('show');
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
    });
  });

  // Navegação inferior
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Animação de entrada
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.aula-node').forEach((node, index) => {
    node.style.opacity = '0';
    node.style.transform = 'translateY(20px)';
    node.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(node);
  });
});

// Preload de recursos críticos
(function() {
  // Lista de recursos para pré-carregar
  const PRELOAD_RESOURCES = [
    { type: 'script', src: 'https://www.youtube.com/iframe_api' },
    // Adicione outros recursos críticos conforme necessário
  ];

  // Função para criar elementos de preload no head
  function preloadResource(resource) {
    if (typeof window === 'undefined') return;
    
    if (resource.type === 'script') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.src;
      link.as = 'script';
      document.head.appendChild(link);
    } else if (resource.type === 'style') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.src;
      link.as = 'style';
      document.head.appendChild(link);
    } else if (resource.type === 'image') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.src;
      link.as = 'image';
      document.head.appendChild(link);
    }
  }

  // Pré-carregar todos os recursos
  window.addEventListener('load', function() {
    PRELOAD_RESOURCES.forEach(preloadResource);
  });

  // Detectar conexão lenta e desativar animações se necessário
  function detectSlowConnection() {
    const connection = navigator.connection || 
                      navigator.mozConnection || 
                      navigator.webkitConnection;
    
    if (connection && (connection.effectiveType === '2g' || connection.saveData)) {
      document.documentElement.classList.add('reduce-motion');
    }
  }

  // Executar detecção de conexão lenta
  detectSlowConnection();
})(); 
// Lista de recursos para pré-carregar
const resourcesToPreload = [
  // Scripts
  
  // Fontes para carregar de forma otimizada
  { type: 'font', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
  { type: 'font', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap' },
  
  // Imagens críticas para o carregamento inicial
  { type: 'image', href: '/images/bg-main.webp' },
  { type: 'image', href: '/images/ornament.webp' },
  { type: 'image', href: '/logo.webp' },
];

// Função para pré-carregar recursos
const preloadResources = () => {
  if (typeof document === 'undefined') return;
  
  resourcesToPreload.forEach(resource => {
    if (resource.type === 'script') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = resource.src;
      document.head.appendChild(link);
    } 
    else if (resource.type === 'font') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = resource.href;
      document.head.appendChild(link);
    }
    else if (resource.type === 'image') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = resource.href;
      document.head.appendChild(link);
    }
  });
};

// Executar a pré-carga
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadResources);
  } else {
    preloadResources();
  }
}

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
``` 
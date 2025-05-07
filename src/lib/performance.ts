'use client';

// Monitoramento de performance para melhorar o desempenho do aplicativo

/**
 * Marca o início de uma medição de performance
 * @param label Nome da medição
 */
export function startPerformanceMeasure(label: string): void {
  if (typeof window !== 'undefined' && window.performance) {
    performance.mark(`${label}-start`);
  }
}

/**
 * Termina uma medição de performance e registra a duração
 * @param label Nome da medição (deve ser o mesmo usado em startPerformanceMeasure)
 */
export function endPerformanceMeasure(label: string): number {
  if (typeof window !== 'undefined' && window.performance) {
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
    
    const entries = performance.getEntriesByName(label);
    const latestEntry = entries[entries.length - 1];
    
    // Opcional: limpar as marcas para evitar vazamento de memória
    performance.clearMarks(`${label}-start`);
    performance.clearMarks(`${label}-end`);
    performance.clearMeasures(label);
    
    return latestEntry?.duration || 0;
  }
  return 0;
}

/**
 * Monitora métricas de Web Vitals
 */
export function monitorWebVitals(): void {
  if (typeof window !== 'undefined') {
    // First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          console.log('[Performance] FCP:', entry.startTime);
        }
      }
    });
    
    try {
      fcpObserver.observe({ type: 'paint', buffered: true });
    } catch (e) {
      console.error('[Performance] Error monitoring FCP:', e);
    }
    
    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log('[Performance] LCP:', entry.startTime);
      }
    });
    
    try {
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.error('[Performance] Error monitoring LCP:', e);
    }
    
    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        // Type assertion for PerformanceEventTiming which has processingStart
        const eventTiming = entry as PerformanceEventTiming;
        const delay = eventTiming.processingStart - entry.startTime;
        console.log('[Performance] FID:', delay);
      }
    });
    
    try {
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.error('[Performance] Error monitoring FID:', e);
    }
    
    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    let clsEntries = [];
    
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        // @ts-ignore - Type não definido corretamente
        if (!entry.hadRecentInput) {
          // @ts-ignore - Type não definido corretamente
          clsValue += entry.value;
          clsEntries.push(entry);
        }
      }
      console.log('[Performance] Current CLS:', clsValue);
    });
    
    try {
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.error('[Performance] Error monitoring CLS:', e);
    }
  }
}

/**
 * Monitora o uso de memória (suportado apenas em alguns navegadores)
 */
export function monitorMemoryUsage(): void {
  if (typeof window !== 'undefined' && (performance as any).memory) {
    setInterval(() => {
      const memory = (performance as any).memory;
      console.log('[Performance] Memory:', {
        totalJSHeapSize: formatBytes(memory.totalJSHeapSize),
        usedJSHeapSize: formatBytes(memory.usedJSHeapSize),
        jsHeapSizeLimit: formatBytes(memory.jsHeapSizeLimit)
      });
    }, 10000); // Verificar a cada 10 segundos
  }
}

/**
 * Formata bytes para um formato legível
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Inicializa todos os monitores de performance
 * Chamar esta função apenas em ambiente de desenvolvimento
 */
export function initPerformanceMonitoring(): void {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Performance] Monitoring initialized');
    monitorWebVitals();
    monitorMemoryUsage();
  }
} 
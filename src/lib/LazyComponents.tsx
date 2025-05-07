'use client';

import { lazy, Suspense } from 'react';

// Lazy loading para componentes pesados
export const LazyMeditationPlayer = lazy(() => import('../components/MeditationPlayer'));
export const LazyMantraEffectsManual = lazy(() => import('../components/MantraEffectsManual'));
export const LazyEnergyProtectionManual = lazy(() => import('../components/EnergyProtectionManual'));
export const LazySpiritualQuotes = lazy(() => import('../components/SpiritualQuotes'));
export const LazyBonusSection = lazy(() => import('../components/BonusSection'));

// Componentes de fallback
export const MeditationPlayerWithSuspense = (props: any) => (
  <Suspense fallback={
    <div style={{
      width: '100%',
      padding: '20px',
      textAlign: 'center',
      borderRadius: '15px',
      background: 'rgba(21, 0, 34, 0.7)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(123, 31, 162, 0.5)',
    }}>
      <div style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.7)' }}>
        Carregando player de meditação...
      </div>
    </div>
  }>
    <LazyMeditationPlayer {...props} />
  </Suspense>
);

export const MantraEffectsManualWithSuspense = (props: any) => (
  <Suspense fallback={
    <div style={{
      width: '100%',
      padding: '12px',
      textAlign: 'center',
      borderRadius: '8px',
      background: 'rgba(21, 0, 34, 0.5)',
    }}>
      <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>
        Carregando manual...
      </div>
    </div>
  }>
    <LazyMantraEffectsManual {...props} />
  </Suspense>
);

export const EnergyProtectionManualWithSuspense = (props: any) => (
  <Suspense fallback={
    <div style={{
      width: '100%',
      padding: '12px',
      textAlign: 'center',
      borderRadius: '8px',
      background: 'rgba(21, 0, 34, 0.5)',
    }}>
      <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>
        Carregando manual...
      </div>
    </div>
  }>
    <LazyEnergyProtectionManual {...props} />
  </Suspense>
);

export const SpiritualQuotesWithSuspense = (props: any) => (
  <Suspense fallback={
    <div style={{
      width: '100%',
      padding: '15px',
      textAlign: 'center',
      borderRadius: '10px',
      background: 'rgba(21, 0, 34, 0.5)',
    }}>
      <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>
        Carregando citações espirituais...
      </div>
    </div>
  }>
    <LazySpiritualQuotes {...props} />
  </Suspense>
);

export const BonusSectionWithSuspense = (props: any) => (
  <Suspense fallback={
    <div style={{
      width: '100%',
      padding: '15px',
      textAlign: 'center',
      borderRadius: '10px',
      background: 'rgba(21, 0, 34, 0.5)',
    }}>
      <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>
        Carregando conteúdo bônus...
      </div>
    </div>
  }>
    <LazyBonusSection {...props} />
  </Suspense>
); 
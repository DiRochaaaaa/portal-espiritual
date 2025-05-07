'use client';

import { lazy, Suspense } from 'react';

// Lazy loading para componentes pesados
export const LazyMeditationPlayer = lazy(() => import('../components/MeditationPlayer'));
export const LazyMantraEffectsManual = lazy(() => import('../components/MantraEffectsManual'));
export const LazyEnergyProtectionManual = lazy(() => import('../components/EnergyProtectionManual'));
export const LazySpiritualQuotes = lazy(() => import('../components/SpiritualQuotes'));
export const LazyBonusSection = lazy(() => import('../components/BonusSection'));
export const LazyBonusCard = lazy(() => import('../components/BonusCard'));
export const LazyNavbar = lazy(() => import('../components/Navbar'));
export const LazyLanguageSelector = lazy(() => import('../components/LanguageSelector'));
export const LazyLanguageProvider = lazy(() => import('../components/LanguageProvider'));
export const LazyFooter = lazy(() => import('../components/Footer'));

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

export const BonusCardWithSuspense = (props: any) => (
  <Suspense fallback={
    <div style={{
      width: '100%',
      padding: '15px',
      textAlign: 'center',
      borderRadius: '10px',
      background: 'rgba(21, 0, 34, 0.5)',
    }}>
      <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>
        Carregando cartão de bônus...
      </div>
    </div>
  }>
    <LazyBonusCard {...props} />
  </Suspense>
);

export const NavbarWithSuspense = (props: any) => (
  <Suspense fallback={
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      padding: '0.6rem 0.8rem',
      backgroundColor: 'rgba(21, 0, 34, 0.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(123, 31, 162, 0.3)',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
      height: '56px',
    }}>
      <div style={{ 
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>
          Carregando navegação...
        </div>
      </div>
    </div>
  }>
    <LazyNavbar {...props} />
  </Suspense>
);

export const LanguageSelectorWithSuspense = (props: any) => (
  <Suspense fallback={
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: 'rgba(67, 16, 91, 0.8)',
      border: '1px solid rgba(123, 31, 162, 0.5)',
    }}>
      <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
        ...
      </div>
    </div>
  }>
    <LazyLanguageSelector {...props} />
  </Suspense>
);

export const LanguageProviderWithSuspense = (props: any) => (
  <Suspense fallback={<>{props.children}</>}>
    <LazyLanguageProvider {...props} />
  </Suspense>
);

export const FooterWithSuspense = (props: any) => (
  <Suspense fallback={
    <footer style={{
      width: '100%',
      padding: '2rem 1rem 1rem',
      backgroundColor: 'rgba(21, 0, 34, 0.95)',
      borderTop: '1px solid rgba(123, 31, 162, 0.3)',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.85rem',
      textAlign: 'center',
    }}>
      <div style={{ 
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
      }}>
        <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>
          Carregando rodapé...
        </div>
      </div>
    </footer>
  }>
    <LazyFooter {...props} />
  </Suspense>
); 
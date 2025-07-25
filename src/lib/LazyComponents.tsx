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
export const LazyGuardianAngelSection = lazy(() => import('../components/GuardianAngelSection'));

// Componentes de fallback
interface MeditationPlayerProps {
  mantras: Array<{
    id: string;
    title: string;
    youtubeId: string;
    description: string;
    objective: string;
    color: string;
    text?: string;
  }>;
  locale: string;
}

export const MeditationPlayerWithSuspense = (props: MeditationPlayerProps) => (
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

interface MantraEffectsManualProps {
  content: {
    title: string;
    description: string;
    content: {
      respiracoes: {
        title: string;
        description: string;
        practices: Array<{ name: string; description: string }>;
      };
      posturas: {
        title: string;
        description: string;
        practices: Array<{ name: string; description: string }>;
      };
      meditacao: {
        title: string;
        description: string;
        practices: Array<{ name: string; description: string }>;
      };
      rituais: {
         title: string;
         description: string;
         practices: Array<{ name: string; description: string }>;
       };
       conclusao: {
          title: string;
          benefits: string[];
        };
        dicas: {
          title: string;
          tips: string[];
        };
     };
   };
   visible: boolean;
}

export const MantraEffectsManualWithSuspense = (props: MantraEffectsManualProps) => (
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

interface EnergyProtectionManualProps {
  content: {
    title: string;
    description: string;
    content: {
      introduction: {
        title: string;
        description: string;
      };
      crystals: {
        title: string;
        sections: Array<{
          title: string;
          description: string;
        }>;
      };
      plants: {
        title: string;
        sections: Array<{
          title: string;
          description: string;
        }>;
      };
      incense: {
        title: string;
        sections: Array<{
          title: string;
          description: string;
        }>;
      };
      techniques: {
        title: string;
        sections: Array<{
          title: string;
          description: string;
        }>;
      };
      routine: {
        title: string;
        sections: Array<{
          title: string;
          description: string;
        }>;
      };
      conclusion: {
        title: string;
        description: string;
      };
    };
  };
  visible: boolean;
}

export const EnergyProtectionManualWithSuspense = (props: EnergyProtectionManualProps) => (
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

export const SpiritualQuotesWithSuspense = (props: Record<string, unknown>) => (
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

interface BonusSectionProps {
  locale: 'pt' | 'es' | 'en' | 'fr';
}

export const BonusSectionWithSuspense = (props: BonusSectionProps) => (
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

interface BonusCardProps {
  title: string;
  description?: string;
  icon: string;
  link: string;
  index: number;
  buttonText?: string;
}

export const BonusCardWithSuspense = (props: BonusCardProps) => (
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

export const NavbarWithSuspense = (props: Record<string, unknown>) => (
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

interface LanguageSelectorProps {
  onClose: () => void;
}

export const LanguageSelectorWithSuspense = (props: LanguageSelectorProps) => (
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

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProviderWithSuspense = (props: LanguageProviderProps) => (
  <Suspense fallback={<>{props.children}</>}>
    <LazyLanguageProvider {...props} />
  </Suspense>
);

export const FooterWithSuspense = (props: Record<string, unknown>) => (
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

interface GuardianAngelSectionProps {
  locale: 'pt' | 'es' | 'en';
}

export const GuardianAngelSectionWithSuspense = (props: GuardianAngelSectionProps) => (
  <Suspense fallback={
    <div style={{
      width: '100%',
      maxWidth: '900px',
      margin: '3rem auto',
      padding: '2.5rem',
      background: 'linear-gradient(135deg, rgba(21, 0, 34, 0.95), rgba(74, 0, 114, 0.9))',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      border: '1px solid rgba(212, 175, 55, 0.3)',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.7)' }}>
        Carregando seção do anjo da guarda...
      </div>
    </div>
  }>
    <LazyGuardianAngelSection {...props} />
  </Suspense>
);
'use client';

import { useState, useEffect, useRef, CSSProperties } from 'react';
import { motion, Variants } from 'framer-motion';

// Função para codificar corretamente URLs de áudio
const encodeAudioUrl = (url: string): string => {
  // Divide a URL em partes (caminho e nome do arquivo)
  const parts = url.split('/');
  const fileName = parts.pop();
  const path = parts.join('/');
  
  // Codifica o nome do arquivo para lidar com espaços e caracteres especiais
  return `${path}/${encodeURIComponent(fileName || '')}`;
};

// Mapear IDs do YouTube para arquivos MP3 locais
const AUDIO_FILES: Record<string, string> = {
  // Mantras Li Wei
  'iGslNuNUVd4': 'https://leitura.tarodosanjos.online/wp-content/uploads/2025/05/om-mani-padme-hum.mp3',
  'HxXgTU9c8n0': 'https://leitura.tarodosanjos.online/wp-content/uploads/2025/05/Om-Gam-Ganapataye-Namaha.mp3',
  'EWZdQcNAkQ8': 'https://leitura.tarodosanjos.online/wp-content/uploads/2025/05/Om-Namah-Shivaya.mp3',
  'KtvyJBtQUag': 'https://leitura.tarodosanjos.online/wp-content/uploads/2025/05/OM-SHANTI-SHANTI-SHANTI.mp3',
  'lUKJrkKnQOQ': 'https://leitura.tarodosanjos.online/wp-content/uploads/2025/05/limpeza-de-energia.mp3',
  'bIr6dABjMWk': 'https://leitura.tarodosanjos.online/wp-content/uploads/2025/05/meditacao.mp3',
  
  // Canção Angelical
  'DXNA9A68GTY': 'https://leitura.tarodosanjos.online/wp-content/uploads/2025/05/atrair-anjos.mp3',
  '1AyuYJG_7WE': 'https://leitura.tarodosanjos.online/wp-content/uploads/2025/05/meditacao.mp3',
  'nnjICT7yu1U': 'https://leitura.tarodosanjos.online/wp-content/uploads/2025/05/frequencia-abundancia.mp3',
};

interface Mantra {
  id: string;
  title: string;
  youtubeId: string;  // Mantemos para compatibilidade, mas usaremos para mapear arquivos MP3
  description: string;
  objective: string;
  color: string;
  text?: string;
}

interface MeditationPlayerProps {
  mantras: Mantra[];
  locale: string;
}

const translations = {
  pt: {
    play: "Tocar",
    pause: "Pausar",
    objective: "Objetivo",
    nextMantra: "Próximo",
    prevMantra: "Anterior",
    loading: "Carregando...",
    error: "Erro ao carregar o áudio"
  },
  es: {
    play: "Reproducir",
    pause: "Pausar",
    objective: "Objetivo",
    nextMantra: "Siguiente",
    prevMantra: "Anterior",
    loading: "Cargando...",
    error: "Error al cargar el audio"
  }
};

const MeditationPlayer: React.FC<MeditationPlayerProps> = ({ mantras, locale }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pulseSize, setPulseSize] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const nativeAudioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentMantra = mantras[currentIndex];
  const t = translations[locale as keyof typeof translations] || translations.pt;
  
  // Efeito para o pulsar baseado no estado de reprodução
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPulseSize((prev) => (prev === 1 ? 1.05 : 1));
      }, 1000);
    } else {
      setPulseSize(1);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);
  
  // Inicializar o player de áudio
  useEffect(() => {
    const initAudio = () => {
      // Limpar estado anterior
      setIsLoaded(false);
      setIsError(false);
      setIsPlaying(false);
      setErrorMessage('');
      
      // Obter o caminho do arquivo de áudio
      const audioFilePath = AUDIO_FILES[currentMantra.youtubeId];
      
      if (audioFilePath) {
        try {
          // As URLs já estão completas, não precisamos mais codificar
          const audioUrl = audioFilePath;
          
          // Usar o elemento HTML de áudio nativo
          if (nativeAudioRef.current) {
            nativeAudioRef.current.src = audioUrl;
            
            // Configurar event listeners no áudio nativo
            nativeAudioRef.current.onloadeddata = () => {
              console.log(`Áudio carregado: ${audioUrl}`);
              setIsLoaded(true);
              setIsError(false);
            };
            
            nativeAudioRef.current.oncanplaythrough = () => {
              console.log(`Áudio pronto para reprodução: ${audioUrl}`);
              setIsLoaded(true);
            };
            
            nativeAudioRef.current.onended = () => {
              console.log('Áudio terminou');
              setIsPlaying(false);
            };
            
            nativeAudioRef.current.onerror = (e) => {
              console.error(`Erro ao carregar o áudio: ${audioFilePath}`, e);
              setIsError(true);
              setErrorMessage('Não foi possível carregar o áudio');
            };
            
            // Configurar a referência do áudio programático para usar o elemento nativo
            audioRef.current = nativeAudioRef.current;
            
            // Carregar o áudio
            nativeAudioRef.current.load();
            console.log(`Carregando áudio: ${audioUrl}`);
          } else {
            console.error("Elemento de áudio nativo não encontrado");
            setIsError(true);
            setErrorMessage('Problema ao inicializar o player de áudio');
          }
        } catch (error) {
          console.error('Erro ao configurar o áudio:', error);
          setIsError(true);
          setErrorMessage('Erro inesperado ao carregar o áudio');
        }
      } else {
        console.error(`Arquivo de áudio não encontrado para o mantra: ${currentMantra.title}`);
        setIsError(true);
        setErrorMessage('Arquivo de áudio não encontrado');
      }
    };
    
    initAudio();
    
  }, [currentIndex, currentMantra.youtubeId, currentMantra.title]);
  
  const togglePlay = () => {
    if (!audioRef.current || !isLoaded) {
      console.log("Player não disponível ou áudio não carregado");
      return;
    }
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Em dispositivos móveis, precisamos de uma interação do usuário para tocar áudio
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Áudio reproduzindo com sucesso');
              setIsPlaying(true);
              setIsError(false);
            })
            .catch((error) => {
              console.error("Erro ao reproduzir áudio:", error);
              setIsError(true);
              setErrorMessage('Não foi possível reproduzir o áudio. Tente novamente.');
              
              // Em dispositivos iOS/Safari, pode ser necessário recarregar o áudio
              if (audioRef.current) {
                audioRef.current.load();
              }
            });
        }
      }
    } catch (error) {
      console.error("Erro ao controlar reprodução:", error);
      setIsError(true);
      setErrorMessage('Erro ao controlar a reprodução');
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (currentIndex < mantras.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const playerStyles: Record<string, CSSProperties> = {
    container: {
      width: '100%',
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      borderRadius: '15px',
      background: 'rgba(21, 0, 34, 0.7)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(123, 31, 162, 0.5)',
    },
    title: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '15px',
      color: '#fff',
    },
    objectiveLabel: {
      fontSize: '0.9rem',
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '5px',
      textAlign: 'center',
    },
    objective: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#D4AF37',
      marginBottom: '20px',
      padding: '5px 15px',
      borderRadius: '20px',
      background: 'rgba(212, 175, 55, 0.1)',
      border: '1px solid rgba(212, 175, 55, 0.3)',
      textAlign: 'center',
      display: 'inline-block',
    },
    visualizer: {
      width: '180px',
      height: '180px',
      margin: '20px auto',
      borderRadius: '50%',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    outerCircle: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '2px solid',
      position: 'absolute',
    },
    innerCircle: {
      width: '75%',
      height: '75%',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
      position: 'relative',
      cursor: 'pointer',
    },
    playIcon: {
      width: '0',
      height: '0',
      borderStyle: 'solid',
      borderWidth: '15px 0 15px 26px',
      borderColor: 'transparent transparent transparent rgba(255, 255, 255, 0.9)',
      marginLeft: '5px',
    },
    loadingText: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '0.9rem',
    },
    errorIcon: {
      color: '#ff6b6b',
      fontSize: '1.5rem',
    },
    pauseIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    pauseBar: {
      width: '8px',
      height: '30px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '3px',
    },
    soundWave: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '40px',
      gap: '4px',
    },
    soundBar: {
      width: '4px',
      height: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '2px',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
      gap: '15px',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '50px',
      backgroundColor: 'rgba(123, 31, 162, 0.3)',
      color: 'white',
      border: '1px solid rgba(123, 31, 162, 0.6)',
      cursor: 'pointer',
      fontSize: '0.9rem',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    navButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'rgba(123, 31, 162, 0.2)',
      color: 'white',
      border: '1px solid rgba(123, 31, 162, 0.4)',
      cursor: 'pointer',
      fontSize: '1.2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
    },
    description: {
      fontSize: '0.9rem',
      color: 'rgba(255, 255, 255, 0.7)',
      textAlign: 'center',
      marginTop: '15px',
      lineHeight: '1.4',
    },
    alignCenter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    statusMessage: {
      fontSize: '0.85rem',
      color: 'rgba(255, 255, 255, 0.7)',
      textAlign: 'center',
      marginTop: '10px',
    },
  };

  // Variantes de animação para as barras sonoras
  const barVariants = {
    playing: (i: number) => ({
      height: ['15px', `${20 + i * 5}px`, '15px'],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
        delay: i * 0.1
      }
    }),
    paused: {
      height: '15px'
    }
  };

  // Função para garantir que a cor é válida para animação
  const ensureValidColor = (color: string): string => {
    // Se já for um formato rgba ou rgb, retornar diretamente
    if (color.startsWith('rgba(') || color.startsWith('rgb(')) {
      return color;
    }
    
    // Se for hexadecimal, garantir que tenha 6 dígitos
    if (color.startsWith('#')) {
      // Se tiver menos de 6 dígitos (excluindo o #), converter para rgb
      if (color.length < 7) {
        // Converter para um formato seguro (branco com transparência)
        return 'rgba(255, 255, 255, 0.9)';
      }
    }
    
    // Adicionar transparência CC (80%) ao final da cor
    return `${color}CC`;
  };

  // Renderização do conteúdo do círculo interno baseado no estado do player
  const renderInnerCircleContent = () => {
    if (!isLoaded) {
      return <div style={playerStyles.loadingText}>{t.loading}</div>;
    }
    
    if (isError) {
      return <div style={playerStyles.errorIcon}>!</div>;
    }
    
    if (isPlaying) {
      // Obter uma cor segura para animação
      const safeColor = ensureValidColor(currentMantra.color || '#7B1FA2');
      
      return (
        <div style={playerStyles.soundWave}>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              custom={i}
              variants={barVariants}
              animate="playing"
              style={{
                ...playerStyles.soundBar,
                backgroundColor: safeColor,
              }}
            />
          ))}
        </div>
      );
    }
    
    return <div style={playerStyles.playIcon}></div>;
  };

  return (
    <div style={playerStyles.container}>
      <h3 style={playerStyles.title}>{currentMantra.title}</h3>
      
      <div style={playerStyles.alignCenter}>
        <div style={playerStyles.objectiveLabel}>{t.objective}:</div>
        <div style={playerStyles.objective}>{currentMantra.objective}</div>
      </div>
      
      {/* Elemento de áudio nativo visível para compatibilidade mobile */}
      <audio 
        ref={nativeAudioRef} 
        controls 
        style={{ display: 'none' }}
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source 
          src={AUDIO_FILES[currentMantra.youtubeId] ? AUDIO_FILES[currentMantra.youtubeId] : ''} 
          type="audio/mpeg" 
        />
        Seu navegador não suporta o elemento de áudio.
      </audio>
      
      <motion.div 
        style={{
          ...playerStyles.visualizer,
          boxShadow: `0 0 30px ${ensureValidColor(currentMantra.color || '#7B1FA2').replace('CC', '33')}`
        }}
        animate={{ 
          scale: pulseSize 
        }}
        transition={{ 
          duration: 1.5,
          ease: "easeInOut"
        }}
      >
        <motion.div 
          style={{
            ...playerStyles.outerCircle,
            borderColor: ensureValidColor(currentMantra.color || '#7B1FA2').replace('CC', '')
          }}
          animate={{ 
            boxShadow: isPlaying 
              ? [
                  `0 0 10px ${ensureValidColor(currentMantra.color || '#7B1FA2').replace('CC', '33')}`,
                  `0 0 20px ${ensureValidColor(currentMantra.color || '#7B1FA2').replace('CC', '66')}`,
                  `0 0 10px ${ensureValidColor(currentMantra.color || '#7B1FA2').replace('CC', '33')}`
                ]
              : `0 0 10px ${ensureValidColor(currentMantra.color || '#7B1FA2').replace('CC', '33')}`
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          style={{
            ...playerStyles.innerCircle,
            cursor: isLoaded && !isError ? 'pointer' : 'default'
          }}
          animate={{ 
            boxShadow: isPlaying 
              ? [
                  `0 0 10px ${ensureValidColor(currentMantra.color || '#7B1FA2').replace('CC', '33')} inset`,
                  `0 0 25px ${ensureValidColor(currentMantra.color || '#7B1FA2').replace('CC', '66')} inset`,
                  `0 0 10px ${ensureValidColor(currentMantra.color || '#7B1FA2').replace('CC', '33')} inset`
                ]
              : `0 0 10px ${ensureValidColor(currentMantra.color || '#7B1FA2').replace('CC', '33')} inset`
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          onClick={(e) => {
            // Impedir que o clique se propague para o container pai
            e.stopPropagation();
            if (isLoaded && !isError) togglePlay();
          }}
        >
          {renderInnerCircleContent()}
        </motion.div>
      </motion.div>
      
      <div style={playerStyles.controls}>
        <motion.button 
          style={playerStyles.navButton}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(123, 31, 162, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          disabled={currentIndex === 0}
        >
          ←
        </motion.button>
        
        <motion.button 
          style={{
            ...playerStyles.button,
            opacity: isLoaded && !isError ? 1 : 0.6,
            cursor: isLoaded && !isError ? 'pointer' : 'not-allowed'
          }}
          whileHover={isLoaded && !isError ? { 
            scale: 1.05, 
            backgroundColor: isPlaying ? 'rgba(255, 100, 100, 0.5)' : 'rgba(100, 255, 100, 0.5)' 
          } : {}}
          whileTap={isLoaded && !isError ? { scale: 0.95 } : {}}
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          disabled={!isLoaded || isError}
        >
          {isPlaying ? t.pause : t.play}
        </motion.button>
        
        <motion.button 
          style={playerStyles.navButton}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(123, 31, 162, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          disabled={currentIndex === mantras.length - 1}
        >
          →
        </motion.button>
      </div>
      
      {isError && (
        <div style={playerStyles.statusMessage}>
          {errorMessage || t.error}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              
              // Tentar reproduzir usando o elemento de áudio nativo
              if (nativeAudioRef.current) {
                const audioFilePath = AUDIO_FILES[currentMantra.youtubeId];
                if (audioFilePath) {
                  const audioUrl = audioFilePath;
                  nativeAudioRef.current.src = audioUrl;
                  nativeAudioRef.current.load();
                  
                  // Mostrar controles nativos de áudio temporariamente
                  nativeAudioRef.current.style.display = 'block';
                  
                  // Tentar reproduzir automaticamente
                  nativeAudioRef.current.play()
                    .then(() => {
                      setIsPlaying(true);
                      setIsError(false);
                      
                      // Após 1 segundo, esconder os controles nativos
                      setTimeout(() => {
                        if (nativeAudioRef.current) {
                          nativeAudioRef.current.style.display = 'none';
                        }
                      }, 1000);
                    })
                    .catch(err => {
                      console.error("Ainda não foi possível reproduzir automaticamente:", err);
                      // Manter os controles visíveis para que o usuário possa clicar
                    });
                }
              }
            }}
            style={{
              marginLeft: '10px',
              padding: '5px 10px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Tentar Novamente
          </button>
        </div>
      )}
      
      <p style={playerStyles.description}>{currentMantra.description}</p>
    </div>
  );
};

export default MeditationPlayer; 
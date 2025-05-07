'use client';

import { useState, useEffect, useRef, CSSProperties } from 'react';
import { motion, Variants } from 'framer-motion';

interface Mantra {
  id: string;
  title: string;
  youtubeId: string;
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

// Utiliza a declaração existente em youtube.d.ts
// import '../lib/youtube.d.ts';

const MeditationPlayer: React.FC<MeditationPlayerProps> = ({ mantras, locale }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pulseSize, setPulseSize] = useState(1);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<any>(null);
  const apiLoadingRef = useRef<boolean>(false);
  const playerReadyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
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
  
  // Função para carregar a API do YouTube
  const loadYouTubeAPI = () => {
    if (typeof window !== 'undefined' && window.YT) return Promise.resolve();
    if (apiLoadingRef.current) return Promise.resolve();
    
    apiLoadingRef.current = true;
    return new Promise<void>((resolve) => {
      // Define a função de callback que será chamada quando a API estiver pronta
      window.onYouTubeIframeAPIReady = () => {
        apiLoadingRef.current = false;
        resolve();
      };
      
      // Cria o script e o adiciona ao documento
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      
      // Adiciona um timeout de segurança para resolver após 5 segundos caso a API não carregue
      setTimeout(() => {
        if (apiLoadingRef.current) {
          console.log("YouTube API load timeout - forcing resolve");
          apiLoadingRef.current = false;
          resolve();
        }
      }, 5000);
    });
  };
  
  // Função para inicializar o player
  const initializePlayer = async () => {
    if (!playerRef.current) return;
    
    try {
      // Limpar o estado
      setIsLoaded(false);
      setIsError(false);
      setIsPlayerReady(false);
      
      // Limpar qualquer timeout existente
      if (playerReadyTimeoutRef.current) {
        clearTimeout(playerReadyTimeoutRef.current);
      }
      
      // Certifique-se de que a API foi carregada
      await loadYouTubeAPI();
      
      // Limpe qualquer player anterior
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch (error) {
          console.error("Error destroying previous player:", error);
        }
        ytPlayerRef.current = null;
      }
      
      // Verifica se o YT existe no objeto window antes de criar o player
      if (typeof window !== 'undefined' && window.YT) {
        // Cria um novo player
        ytPlayerRef.current = new window.YT.Player(playerRef.current, {
          height: '0',
          width: '0',
          videoId: currentMantra.youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            showinfo: 0,
            rel: 0,
            fs: 0,
            modestbranding: 1
          },
          events: {
            onReady: (event: any) => {
              console.log("YouTube player ready");
              setIsLoaded(true);
              setIsPlayerReady(true);
            },
            onStateChange: (event: any) => {
              console.log("Player state changed:", event.data);
              // YT.PlayerState.ENDED = 0, PLAYING = 1, PAUSED = 2
              if (event.data === 0) {
                setIsPlaying(false);
              } else if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2) {
                setIsPlaying(false);
              }
            },
            onError: (event: any) => {
              console.error("YouTube player error:", event.data);
              setIsError(true);
              setIsLoaded(true); // Consideramos carregado mesmo com erro
              setIsPlaying(false);
              setIsPlayerReady(false);
            }
          }
        });
        
        // Adiciona um timeout para verificar se o player está realmente pronto
        playerReadyTimeoutRef.current = setTimeout(() => {
          if (!isPlayerReady && ytPlayerRef.current) {
            console.log("Setting player ready after timeout");
            setIsLoaded(true);
            setIsPlayerReady(true);
          }
        }, 3000);
      } else {
        throw new Error("YouTube API não carregada corretamente");
      }
    } catch (error) {
      console.error("Error initializing YouTube player:", error);
      setIsError(true);
      setIsLoaded(true);
      setIsPlayerReady(false);
    }
  };
  
  // Carregar a API do YouTube e configurar o player quando o componente montar ou o mantra mudar
  useEffect(() => {
    initializePlayer();
    
    return () => {
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch (error) {
          console.error("Error destroying YouTube player:", error);
        }
      }
    };
  }, [currentIndex]);
  
  // Destruir player e limpar timeouts quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (playerReadyTimeoutRef.current) {
        clearTimeout(playerReadyTimeoutRef.current);
      }
      
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch (error) {
          console.error("Error destroying YouTube player:", error);
        }
      }
    };
  }, []);
  
  const togglePlay = () => {
    if (!ytPlayerRef.current) {
      console.log("Player ref não disponível, tentando inicializar novamente");
      initializePlayer();
      return;
    }
    
    if (!isLoaded || isError) {
      console.log("Player não carregado ou com erro");
      return;
    }
    
    try {
      if (isPlaying) {
        console.log("Pausando vídeo");
        ytPlayerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        console.log("Tocando vídeo");
        
        // Tentativa com retry automático
        const attemptPlay = (retries = 0) => {
          try {
            ytPlayerRef.current.playVideo();
            
            // Verifica após 500ms se o player realmente começou a tocar
            setTimeout(() => {
              if (ytPlayerRef.current && ytPlayerRef.current.getPlayerState() !== 1) {
                console.log(`Vídeo não começou a tocar após tentativa ${retries + 1}`);
                
                if (retries < 2) {
                  console.log(`Tentando novamente (${retries + 1}/3)`);
                  attemptPlay(retries + 1);
                } else {
                  console.log("Falha após 3 tentativas, reinicializando player");
                  initializePlayer();
                }
              }
            }, 500);
          } catch (error) {
            console.error("Erro ao tentar tocar:", error);
            if (retries < 2) {
              console.log(`Tentando novamente após erro (${retries + 1}/3)`);
              setTimeout(() => attemptPlay(retries + 1), 300);
            } else {
              setIsError(true);
            }
          }
        };
        
        attemptPlay();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error toggling play state:", error);
      setIsError(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsPlaying(false);
      setIsLoaded(false);
    }
  };
  
  const handleNext = () => {
    if (currentIndex < mantras.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(false);
      setIsLoaded(false);
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
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      marginTop: '20px',
    },
    button: {
      backgroundColor: 'rgba(123, 31, 162, 0.3)',
      color: 'white',
      border: '1px solid rgba(123, 31, 162, 0.5)',
      borderRadius: '25px',
      padding: '8px 15px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
    },
    navButton: {
      backgroundColor: 'rgba(21, 0, 34, 0.5)',
      width: '35px',
      height: '35px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      cursor: 'pointer',
      fontSize: '1.2rem',
      border: '1px solid rgba(123, 31, 162, 0.3)',
    },
    description: {
      fontSize: '0.9rem',
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
      marginTop: '15px',
      lineHeight: '1.4',
    },
    alignCenter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    playerContainer: {
      display: 'none',
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

  // Renderização do conteúdo do círculo interno baseado no estado do player
  const renderInnerCircleContent = () => {
    if (!isLoaded) {
      return <div style={playerStyles.loadingText}>{t.loading}</div>;
    }
    
    if (isError) {
      return <div style={playerStyles.errorIcon}>!</div>;
    }
    
    if (isPlaying) {
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
                backgroundColor: `${currentMantra.color}CC`,
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
      
      <motion.div 
        style={{
          ...playerStyles.visualizer,
          boxShadow: `0 0 30px ${currentMantra.color}33`
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
            borderColor: currentMantra.color
          }}
          animate={{ 
            boxShadow: isPlaying 
              ? [
                  `0 0 10px ${currentMantra.color}33`,
                  `0 0 20px ${currentMantra.color}66`,
                  `0 0 10px ${currentMantra.color}33`
                ]
              : `0 0 10px ${currentMantra.color}33`
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
                  `0 0 10px ${currentMantra.color}33 inset`,
                  `0 0 25px ${currentMantra.color}66 inset`,
                  `0 0 10px ${currentMantra.color}33 inset`
                ]
              : `0 0 10px ${currentMantra.color}33 inset`
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
      
      {isError && <div style={playerStyles.statusMessage}>{t.error}</div>}
      
      <p style={playerStyles.description}>{currentMantra.description}</p>
      
      {/* Container para o player do YouTube */}
      <div ref={playerRef} style={playerStyles.playerContainer}></div>
    </div>
  );
};

export default MeditationPlayer; 
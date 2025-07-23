'use client';

import { useState, useEffect, useRef, useCallback } from 'react';



// Mapear IDs do YouTube para arquivos MP3 locais
const AUDIO_FILES: Record<string, string> = {
  // Vídeos da página principal e outros
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

interface YouTubePlayer {
  playVideo: () => Promise<void>;
  pauseVideo: () => void;
  stopVideo: () => void;
  mute: () => void;
  unMute: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
}

interface YouTubeEvent {
  target: YouTubePlayer;
  data: number;
}

interface YouTubeLoaderProps {
  videoId: string;
  onReady?: (player: YouTubePlayer) => void;
  onStateChange?: (event: YouTubeEvent) => void;
  onError?: (event: YouTubeEvent) => void;
  playerVars?: Record<string, unknown>;
}

// Interface simplificada para o player de áudio
interface SimpleAudioPlayer {
  playVideo: () => Promise<void>;
  pauseVideo: () => void;
  stopVideo: () => void;
  mute: () => void;
  unMute: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
}

const YouTubeLoader: React.FC<YouTubeLoaderProps> = ({
  videoId,
  onReady,
  onStateChange,
  onError
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<SimpleAudioPlayer | null>(null);
  const [playerState, setPlayerState] = useState(0); // 0: stopped, 1: playing, 2: paused
  const [audioError, setAudioError] = useState(false);
  
  // Inicializar o player de áudio
  const initializeAudio = useCallback(() => {
    try {
      // Resetar estados
      setAudioError(false);
      
      // Verificar se temos um arquivo de áudio para este ID
      const audioFilePath = AUDIO_FILES[videoId];
      
      if (!audioFilePath) {
        console.error(`Arquivo de áudio não encontrado para ID: ${videoId}`);
        setAudioError(true);
        return;
      }
      
      // As URLs já estão completas, não precisamos mais codificar
      const audioUrl = audioFilePath;
      
      // Limpar listeners antigos se o audioRef já existir
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadeddata', () => {});
        audioRef.current.removeEventListener('canplaythrough', () => {});
        audioRef.current.removeEventListener('ended', () => {});
        audioRef.current.removeEventListener('error', () => {});
        
        // Atualizar o src do áudio existente
        audioRef.current.src = audioUrl;
      } else {
        // Criar novo elemento de áudio
        audioRef.current = new Audio(audioUrl);
      }
      
      // Configurar eventos de áudio
      const setupEventListeners = () => {
        if (!audioRef.current) return;
        
        audioRef.current.addEventListener('loadeddata', () => {
          console.log(`Áudio carregado: ${audioUrl}`);
          
          // Criar uma interface que imita o player do YouTube
          const simplePlayer: SimpleAudioPlayer = {
            playVideo: async () => {
              if (!audioRef.current) return Promise.reject('No audio element');
              
              try {
                // Em dispositivos móveis, precisamos de uma interação do usuário para tocar áudio
                const playPromise = audioRef.current.play();
                setPlayerState(1); // playing
                if (onStateChange) onStateChange({ target: simplePlayer, data: 1 });
                
                return playPromise;
              } catch (error) {
                console.error("Erro ao reproduzir:", error);
                return Promise.reject(error);
              }
            },
            pauseVideo: () => {
              if (audioRef.current) {
                audioRef.current.pause();
                setPlayerState(2); // paused
                if (onStateChange) onStateChange({ target: simplePlayer, data: 2 });
              }
            },
            stopVideo: () => {
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setPlayerState(0); // stopped
                if (onStateChange) onStateChange({ target: simplePlayer, data: 0 });
              }
            },
            mute: () => {
              if (audioRef.current) audioRef.current.muted = true;
            },
            unMute: () => {
              if (audioRef.current) audioRef.current.muted = false;
            },
            getCurrentTime: () => audioRef.current?.currentTime || 0,
            getDuration: () => audioRef.current?.duration || 0,
            getPlayerState: () => playerState,
            seekTo: (seconds: number) => {
              if (audioRef.current) audioRef.current.currentTime = seconds;
            }
          };
          
          // Armazenar o player na referência
          playerRef.current = simplePlayer;
          
          // Chamar onReady com nosso simplePlayer
          if (onReady) onReady(simplePlayer);
        });
        
        audioRef.current.addEventListener('canplaythrough', () => {
          console.log(`Áudio pronto para reprodução: ${audioUrl}`);
        });
        
        audioRef.current.addEventListener('ended', () => {
          console.log('Áudio terminou');
          setPlayerState(0); // stopped
          if (onStateChange && playerRef.current) onStateChange({ target: playerRef.current, data: 0 });
        });
        
        audioRef.current.addEventListener('error', (e) => {
          const error = e.target as HTMLAudioElement;
          console.error(`Erro ao carregar o áudio: ${audioFilePath}`, error.error);
          setAudioError(true);
          if (onError && playerRef.current) onError({ data: -1, target: playerRef.current });
        });
      };
      
      setupEventListeners();
      
      // Carregar o áudio (mas não começar a tocar)
      audioRef.current.load();
      console.log(`Iniciando carregamento do áudio: ${audioUrl}`);
      
    } catch (error) {
      console.error("Erro ao inicializar o player de áudio:", error);
      setAudioError(true);
      // onError espera um YouTubeEvent, mas não temos um player válido aqui
      console.error('Erro de inicialização:', error);
    }
  }, [videoId, onReady, onStateChange, onError, playerState]);
  
  // Carregar o áudio quando o componente montar ou o videoId mudar
  useEffect(() => {
    initializeAudio();
    
    // Limpar quando desmontar
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current.removeEventListener('loadeddata', () => {});
        audioRef.current.removeEventListener('canplaythrough', () => {});
        audioRef.current.removeEventListener('ended', () => {});
        audioRef.current.removeEventListener('error', () => {});
      }
    };
  }, [videoId, initializeAudio]); // Reinicializar quando o videoId mudar
  
  // Adicionar um componente visível para permitir interação do usuário se necessário
  return audioError ? (
    <div 
      style={{ 
        padding: '10px', 
        margin: '5px 0',
        display: 'inline-block',
        cursor: 'pointer',
        background: 'transparent'
      }}
      onClick={() => {
        // Tentar carregar novamente quando o usuário clicar
        initializeAudio();
        
        // Tentar reproduzir imediatamente após a interação do usuário
        // Isso pode ajudar em dispositivos móveis
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => {
              setPlayerState(1);
              if (onStateChange && playerRef.current) onStateChange({ target: playerRef.current, data: 1 });
            })
            .catch(err => console.error("Não foi possível reproduzir:", err));
        }
      }}
    >
      <span style={{ display: 'none' }}>Ativar áudio</span>
    </div>
  ) : null;
};

export default YouTubeLoader;
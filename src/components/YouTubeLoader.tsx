'use client';

import { useState, useEffect, useRef } from 'react';

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
  // Vídeos da página principal e outros
  'bIr6dABjMWk': '/audio/meditação.mp3',
  'aWgD6QWkLNI': '/audio/limpeza-de-energia.mp3',
  'rvcaxqTf7MQ': '/audio/om mani padme hum.mp3',
  'DXNA9A68GTY': '/audio/atrair-anjos.mp3',
  '1AyuYJG_7WE': '/audio/meditação.mp3',
  'nnjICT7yu1U': '/audio/frequencia-abundancia.mp3',
  // Adicione outros mapeamentos conforme necessário
};

interface YouTubeLoaderProps {
  videoId: string;
  onReady?: (player: any) => void;
  onStateChange?: (event: any) => void;
  onError?: (event: any) => void;
  playerVars?: Record<string, any>;
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
  onError,
  playerVars = {}
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [playerState, setPlayerState] = useState(0); // 0: stopped, 1: playing, 2: paused
  const [audioError, setAudioError] = useState(false);
  
  // Inicializar o player de áudio
  const initializeAudio = () => {
    try {
      // Resetar estados
      setIsLoaded(false);
      setAudioError(false);
      
      // Verificar se temos um arquivo de áudio para este ID
      const audioFilePath = AUDIO_FILES[videoId];
      
      if (!audioFilePath) {
        console.error(`Arquivo de áudio não encontrado para ID: ${videoId}`);
        setAudioError(true);
        if (onError) onError({ data: 'FILE_NOT_FOUND' });
        return;
      }
      
      // Codificar o URL para lidar com espaços e caracteres especiais
      const encodedUrl = encodeAudioUrl(audioFilePath);
      
      // Limpar listeners antigos se o audioRef já existir
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadeddata', () => {});
        audioRef.current.removeEventListener('canplaythrough', () => {});
        audioRef.current.removeEventListener('ended', () => {});
        audioRef.current.removeEventListener('error', () => {});
        
        // Atualizar o src do áudio existente
        audioRef.current.src = encodedUrl;
      } else {
        // Criar novo elemento de áudio
        audioRef.current = new Audio(encodedUrl);
      }
      
      // Configurar eventos de áudio
      const setupEventListeners = () => {
        if (!audioRef.current) return;
        
        audioRef.current.addEventListener('loadeddata', () => {
          console.log(`Áudio carregado: ${encodedUrl}`);
          setIsLoaded(true);
          
          // Criar uma interface que imita o player do YouTube
          const simplePlayer: SimpleAudioPlayer = {
            playVideo: async () => {
              if (!audioRef.current) return Promise.reject('No audio element');
              
              try {
                // Em dispositivos móveis, precisamos de uma interação do usuário para tocar áudio
                const playPromise = audioRef.current.play();
                setPlayerState(1); // playing
                if (onStateChange) onStateChange({ data: 1 });
                
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
                if (onStateChange) onStateChange({ data: 2 });
              }
            },
            stopVideo: () => {
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setPlayerState(0); // stopped
                if (onStateChange) onStateChange({ data: 0 });
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
          
          // Chamar onReady com nosso simplePlayer
          if (onReady) onReady(simplePlayer);
        });
        
        audioRef.current.addEventListener('canplaythrough', () => {
          console.log(`Áudio pronto para reprodução: ${encodedUrl}`);
          setIsLoaded(true);
        });
        
        audioRef.current.addEventListener('ended', () => {
          console.log('Áudio terminou');
          setPlayerState(0); // stopped
          if (onStateChange) onStateChange({ data: 0 });
        });
        
        audioRef.current.addEventListener('error', (e) => {
          const error = e.target as HTMLAudioElement;
          console.error(`Erro ao carregar o áudio: ${audioFilePath}`, error.error);
          setAudioError(true);
          if (onError) onError({ data: 'AUDIO_LOAD_ERROR', details: error.error });
        });
      };
      
      setupEventListeners();
      
      // Carregar o áudio (mas não começar a tocar)
      audioRef.current.load();
      console.log(`Iniciando carregamento do áudio: ${encodedUrl}`);
      
    } catch (error) {
      console.error("Erro ao inicializar o player de áudio:", error);
      setAudioError(true);
      if (onError) onError({ data: 'INIT_ERROR', details: error });
    }
  };
  
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
  }, [videoId]); // Reinicializar quando o videoId mudar
  
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
              if (onStateChange) onStateChange({ data: 1 });
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
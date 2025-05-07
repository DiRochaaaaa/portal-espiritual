'use client';

import { useState, useEffect, useRef } from 'react';
import { loadScript } from '../lib/utils';

interface YouTubeLoaderProps {
  videoId: string;
  onReady?: (player: any) => void;
  onStateChange?: (event: any) => void;
  onError?: (event: any) => void;
  playerVars?: Record<string, any>;
}

const YouTubeLoader: React.FC<YouTubeLoaderProps> = ({
  videoId,
  onReady,
  onStateChange,
  onError,
  playerVars = {}
}) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Função otimizada para carregar a API do YouTube
  const loadYouTubeAPI = async () => {
    // Se já estiver no objeto global, retorne
    if (typeof window !== 'undefined' && window.YT) return true;
    
    // Carregar a API do YouTube
    return await loadScript(
      'https://www.youtube.com/iframe_api',
      'youtube-api',
      true,
      false
    );
  };
  
  // Inicializar o player do YouTube
  const initializePlayer = async () => {
    if (!playerRef.current) return;
    
    try {
      // Carregar a API do YouTube
      const apiLoaded = await loadYouTubeAPI();
      if (!apiLoaded) throw new Error("Falha ao carregar a API do YouTube");
      
      // Limpar qualquer player existente
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch (error) {
          console.error("Erro ao destruir player anterior:", error);
        }
        ytPlayerRef.current = null;
      }
      
      // Configurações padrão do player
      const defaultPlayerVars = {
        autoplay: 0,
        controls: 0,
        showinfo: 0,
        rel: 0,
        fs: 0,
        modestbranding: 1,
        ...playerVars
      };
      
      // Criar o player quando a API estiver pronta
      const createPlayer = () => {
        // Verificar se o YT existe no objeto global
        if (typeof window !== 'undefined' && window.YT && window.YT.Player) {
          // Criar novo player
          ytPlayerRef.current = new window.YT.Player(playerRef.current, {
            height: '0',
            width: '0',
            videoId: videoId,
            playerVars: defaultPlayerVars,
            events: {
              onReady: (event: any) => {
                setIsLoaded(true);
                if (onReady) onReady(event.target);
              },
              onStateChange: (event: any) => {
                if (onStateChange) onStateChange(event);
              },
              onError: (event: any) => {
                console.error("YouTube player error:", event.data);
                if (onError) onError(event);
              }
            }
          });
        }
      };
      
      // Se a API já estiver carregada, crie o player imediatamente
      if (window.YT && window.YT.Player) {
        createPlayer();
      } else {
        // Caso contrário, defina a função de callback para quando a API estiver pronta
        window.onYouTubeIframeAPIReady = createPlayer;
      }
    } catch (error) {
      console.error("Erro ao inicializar o player do YouTube:", error);
      if (onError) onError({ data: 'API_LOAD_ERROR' });
    }
  };
  
  // Carregar o player quando o componente montar
  useEffect(() => {
    initializePlayer();
    
    // Limpar quando desmontar
    return () => {
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch (error) {
          console.error("Error destroying player:", error);
        }
      }
    };
  }, [videoId]); // Reinicializar quando o videoId mudar
  
  // Retornar o elemento que conterá o player
  return <div ref={playerRef} style={{ display: 'none' }}></div>;
};

export default YouTubeLoader; 
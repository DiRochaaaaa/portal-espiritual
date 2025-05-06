// Declaração de tipos para a API do YouTube IFrame
interface YT {
  Player: {
    new (
      elementId: HTMLDivElement | string,
      options: {
        height?: string | number;
        width?: string | number;
        videoId?: string;
        playerVars?: {
          autoplay?: number;
          controls?: number;
          showinfo?: number;
          rel?: number;
          fs?: number;
          modestbranding?: number;
          [key: string]: any;
        };
        events?: {
          onReady?: (event: YT.PlayerEvent) => void;
          onStateChange?: (event: YT.OnStateChangeEvent) => void;
          onError?: (event: YT.PlayerEvent) => void;
          [key: string]: any;
        };
      }
    ): YT.Player;
  };
  PlayerState: {
    UNSTARTED: number;
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
}

declare namespace YT {
  interface Player {
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    loadVideoById(videoId: string): void;
    cueVideoById(videoId: string): void;
    getPlayerState(): number;
    getCurrentTime(): number;
    getDuration(): number;
    setVolume(volume: number): void;
    mute(): void;
    unMute(): void;
    destroy(): void;
  }

  interface PlayerEvent {
    target: Player;
  }

  interface OnStateChangeEvent {
    target: Player;
    data: number;
  }
}

// Declarar a API do YouTube como uma variável global
declare global {
  interface Window {
    YT?: YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export {};

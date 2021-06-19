import {createContext} from 'react';

type Episode = {
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  url: string;
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  tooglePlay: () => void;
  setPlayingState: (state: boolean) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  isLooping: boolean;
  toogleLoop: () => void;
  isShuffling: boolean;
  toogleShuffle: () => void;
  clearPlayerState: () => void;
  mobile: boolean;
}

export const PlayerContext = createContext({} as PlayerContextData);

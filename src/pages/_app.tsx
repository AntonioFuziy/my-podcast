import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/app"
import { theme } from '../styles/theme'
import { Box, Flex } from '@chakra-ui/react'

import { Header } from "../components/Header"
import { Player } from "../components/Player"
import { PlayerContext } from '../contexts/PlayerContext';
import { useState, useEffect } from "react"

type Episode = {
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  url: string;
}

function MyApp({ Component, pageProps } : AppProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  function play(episode: Episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number){
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function tooglePlay(){
    setIsPlaying(!isPlaying);
  }

  function toogleLoop(){
    setIsLooping(!isLooping);
  }

  function toogleShuffle(){
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state);
  }

  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;
  const hasPrevious = currentEpisodeIndex > 0;

  function playNext(){
    if(isShuffling){
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else{
      if(hasNext){
        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      }
    }
  }
  
  function playPrevious(){
    if(hasPrevious){
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  function clearPlayerState(){
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    if(windowWidth < 800){
      setMobile(true);
    } else{
      setMobile(false);
    }
    console.log(windowWidth)
  }, [windowWidth])

  return (
    <ChakraProvider theme={theme}>
      <PlayerContext.Provider value={{ 
        episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        play, 
        tooglePlay, 
        setPlayingState, 
        playList, 
        playNext, 
        playPrevious,
        hasPrevious,
        hasNext,
        isLooping,
        toogleLoop,
        isShuffling,
        toogleShuffle,
        clearPlayerState,
        mobile
      }}>
        {mobile ? (
          <Flex direction="column" justifyContent="space-between" color="blackAlpha.800">
            <Box flex="1">
              <Header/>
              <Component {...pageProps} />
            </Box>
            <Player/>
          </Flex>
        ) : (
          <Flex direction="row" justifyContent="space-between" color="blackAlpha.800">
            <Box flex="1">
              <Header/>
              <Component {...pageProps} />
            </Box>
            <Player/>
          </Flex>
        )}
      </PlayerContext.Provider>
    </ChakraProvider>
  )
}

export default MyApp

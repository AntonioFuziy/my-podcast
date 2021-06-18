import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/app"
import { theme } from '../styles/theme'
import { Box, Flex } from '@chakra-ui/react'

import { Header } from "../components/Header"
import { Player } from "../components/Player"
import { PlayerContext } from '../contexts/PlayerContext';
import { useState } from "react"

function MyApp({ Component, pageProps } : AppProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function tooglePlay(){
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state);
  }

  return (
    <ChakraProvider theme={theme}>
      <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, isPlaying, play, tooglePlay, setPlayingState }}>
        <Flex direction="row" justifyContent="space-between" color="blackAlpha.800">
          <Box flex="1">
            <Header/>
            <Component {...pageProps} />
          </Box>
          <Player/>
        </Flex>
      </PlayerContext.Provider>
    </ChakraProvider>
  )
}

export default MyApp

import { Flex, Heading, Icon, Text, Progress, Button, Box } from '@chakra-ui/react'
import { FiHeadphones, FiRepeat, FiUpload } from 'react-icons/fi';
import { FaPlay, FaStepForward, FaStepBackward, FaPause } from 'react-icons/fa';
import { useContext } from 'react';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

import { PlayerContext } from '../contexts/PlayerContext';

import Image from 'next/image';
import styles from "../pages/episode/slug.module.scss";
import { useEffect, useRef } from 'react';

export function Player(){
  const audioRef = useRef<HTMLAudioElement>(null);

  const { 
    episodeList, 
    currentEpisodeIndex, 
    isPlaying,
    tooglePlay,
    setPlayingState
  } = useContext(PlayerContext);

  useEffect(() =>  {
    if(!audioRef.current){
      return;
    }

    if(isPlaying){
      audioRef.current.play();
    } else{
      audioRef.current.pause();
    }
  }, [isPlaying])

  const episode = episodeList[currentEpisodeIndex];

  return (
    <Flex 
      paddingY="3rem"
      paddingX="4rem"
      direction="column" 
      h="100vh" 
      w="26.5rem" 
      bg="pink.600" 
      alignItems="center"
      justifyContent="space-around"
    >
      <Heading 
        display="flex" 
        flexDirection="row" 
        alignItems="center" 
        justifyContent="space-between"
      >
        <Icon as={FiHeadphones} fontSize="40" mr="5"/>
        <Text fontSize="20">Playing {episode?.title}</Text>
      </Heading>
      
      { episode ? (
          <Flex 
            alignItems="center" 
            justifyContent="center" 
            direction="column" 
            textAlign="center"
          >
            <Image 
              width={592} 
              height={592} 
              src={episode.thumbnail} 
              objectFit="cover"
              className={styles.imagesRadius}
            />
            <Text 
              mt="4" 
              fontSize="16" 
              fontWeight="bold"
            >
              {episode.title}
            </Text>
            <Text mt="4"opacity={0.8}>{episode.members}</Text>
          </Flex> 
        ) : (
          <Flex 
            w="100%"
            h="20rem" 
            alignItems="center" 
            justify="center" 
            bg="pink.500" 
            borderRadius="12"
            fontSize="20"
          >
            Select a podcast to hear
          </Flex> 
        )
      }

      <Flex w="100%" alignItems="center" justifyContent="center" direction="column">
        <Flex justifyContent="space-between" alignItems="center" direction="row" mb="10">
          <Text mr="3">00:00</Text>
          {episode ? (
            <Box w={220} h={1} borderRadius="12">
              <Slider
                trackStyle={{ backgroundColor: "#4A5568" }}
                railStyle={{ backgroundColor: "#F687B3" }}
                handleStyle={{ borderColor: "#D53F8C", borderWidth: 1 }}
              />
            </Box>
          ) : (
            <Progress value={80} colorScheme="gray" w={220} h={1} borderRadius="12" bg="pink.300"/>
          )}
          <Text ml="3">10:59</Text>
        </Flex>

        { episode && (
          <audio 
            src={episode.url}
            ref={audioRef}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        )}

        <Flex alignItems="center" justifyContent="center">
          <Button type="button" variant="ghost" disabled={!episode}>
            <Icon as={FiUpload} fontSize="25"/>
          </Button>
          <Button type="button" variant="ghost" disabled={!episode}>
            <Icon as={FaStepBackward} fontSize="25"/>
          </Button >
          <Button 
            type="button" 
            variant="ghost" 
            disabled={!episode} 
            onClick={tooglePlay}
          >
            {isPlaying ? (
              <Icon as={FaPause} fontSize="30"/>
            ) : (
              <Icon as={FaPlay} fontSize="30"/>
            )}
          </Button>
          <Button type="button" variant="ghost" disabled={!episode}>
            <Icon as={FaStepForward} fontSize="25"/>
          </Button>
          <Button type="button" variant="ghost" disabled={!episode}>
            <Icon as={FiRepeat} fontSize="25"/>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
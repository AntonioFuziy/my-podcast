import { Flex, Text, Box, Icon, Heading, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react'
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import { GetStaticProps } from 'next';
import { FaPlay } from "react-icons/fa";

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { api } from '../services/api';
import { ConvertDurationToTimeString } from '../utils/convertDurationToTimeString';

import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';

type Episode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { playList } = useContext(PlayerContext);

  const episodeList = [...latestEpisodes, ...allEpisodes];
  
  return (
    <Flex 
      color="white" 
      direction="column" 
      p="4rem" 
      overflowY="scroll"
      style={{height: `calc(100vh - 6.5rem)`}}
    >
      <Head>
        <title>Home | My Podcast</title>
      </Head>
      <Flex direction="column">
        <Heading fontSize="25" ml="8" mb="8">Last Updates</Heading>
        <Flex>
          {latestEpisodes.map((episode, index) => {
            return (
              <Box 
                width="50%" 
                ml="4"
                h="150px" 
                display="flex" 
                flexDirection="row" 
                bg="gray.800" 
                borderRadius="8" 
                p="5"
                key={episode.id}
              >
                <Image 
                  src={episode.thumbnail} 
                  width={192} 
                  height={192} 
                  objectFit="contain"
                  alt=""
                />
                <Box 
                  display="flex" 
                  flexDirection="column" 
                  justifyContent="space-around" 
                  ml="10"
                >
                  <Link 
                    href={`/episode/${episode.id}`}
                  >
                    {episode.title}
                  </Link>
                  <Text fontSize="14" color="gray.300" mt="4">{episode.members}</Text>
                  <Flex justify="space-between" mt="4">
                    <Text color="gray.300">{episode.publishedAt}</Text>
                    <Text color="gray.300">{episode.durationAsString}</Text>
                    <Button 
                      as="a" 
                      size="sm" 
                      fontSize="sm" 
                      colorScheme="pink" 
                      leftIcon={<Icon as={FaPlay} fontSize="15"/>}
                      cursor="pointer"
                      onClick={() => playList(episodeList, index)}
                    >
                      Play
                    </Button>
                  </Flex>
                </Box>
              </Box>
            )
          })}
        </Flex>
      </Flex>
      <Flex mt="10" direction="column">
        <Heading fontSize="25" ml="8" mb="8">All Podcasts</Heading>
        <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>
                </Th>

                <Th>Podcast</Th>
                <Th>Members</Th>
                <Th>Date</Th>
                <Th>Duration</Th>
                <Th w="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {allEpisodes.map((episode, index) => {
                return (
                  <Tr key={episode.id}>
                    <Td px="6">
                      <Image 
                        src={episode.thumbnail} 
                        width={100} 
                        height={100} 
                        objectFit="cover"
                      />
                    </Td>
                    <Td>
                      <Link 
                        href={`/episode/${episode.id}`}
                      >
                        {episode.title}
                      </Link>
                    </Td>
                    <Td fontSize="15">{episode.members}</Td>
                    <Td fontSize="15">{episode.publishedAt}</Td>
                    <Td fontSize="15">{episode.durationAsString}</Td>
                    <Td>
                      <Button 
                        as="a" 
                        size="sm" 
                        fontSize="sm" 
                        colorScheme="pink" 
                        leftIcon={<Icon as={FaPlay} fontSize="15"/>}
                        cursor="pointer"
                        onClick={() => playList(episodeList, index + latestEpisodes.length)}
                      >
                        Play
                      </Button>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
      </Flex>
    </Flex>
  )
}

export const getStaticProps: GetStaticProps = async () =>{
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: ConvertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url
    }
  })

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8
  }
}
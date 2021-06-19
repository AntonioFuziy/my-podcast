import { Flex, Text, Icon, Heading, Button, Box } from '@chakra-ui/react'
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { api } from '../../services/api';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FiChevronLeft } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";

import { ConvertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import { PlayerContext } from '../../contexts/PlayerContext';
import { useContext } from 'react';

type Episode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  description: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
}

type EpisodeProps = {
  episode: Episode;
}

export default function Episode({ episode }: EpisodeProps){

  const { play, mobile } = useContext(PlayerContext);

  return (
    <Flex 
      maxW="45rem"
      direction="column" 
      alignItems="center" 
      justifyContent="center" 
      px="3rem" 
      py="2rem"
      margin="0 auto"
      color="gray.100"
    >
      <Head>
        <title>{episode.title}</title>
      </Head>
      { mobile ? (
        <Flex position="relative" mb="5">
          <Link href="/">
            <Button 
              type="button"
              position="absolute"
              top="120%"
              borderRadius="8"
              w="3rem"
              h="3rem"
              bg="pink.400"
              zIndex="5"
            >
              <Icon as={FiChevronLeft} fontSize="30"/>
            </Button>
          </Link>
          <Image 
            src={episode.thumbnail} 
            width={900} 
            height={500}
            objectFit="cover"
          />
          <Button 
            position="absolute"
            right="0"
            top="120%"
            type="button"
            borderRadius="8"
            w="3rem"
            h="3rem"
            bg="pink.400"
            zIndex="5"
            onClick={() => play(episode)}
          >
            <Icon as={FaPlay} fontSize="20"/>
          </Button>
        </Flex>
      ) : (
        <Flex
          position="relative"
        >
          <Link href="/">
            <Button 
              type="button"
              position="absolute"
              left="-5%"
              top="50%"
              borderRadius="8"
              w="3rem"
              h="3rem"
              bg="pink.400"
              zIndex="5"
            >
              <Icon as={FiChevronLeft} fontSize="30"/>
            </Button>
          </Link>
          <Image 
            src={episode.thumbnail} 
            width={700} 
            height={160}
            objectFit="cover"
          />
          <Button 
            position="absolute"
            right="-5%"
            top="50%"
            type="button"
            borderRadius="8"
            w="3rem"
            h="3rem"
            bg="pink.400"
            zIndex="5"
            onClick={() => play(episode)}
          >
            <Icon as={FaPlay} fontSize="20"/>
          </Button>
        </Flex>
      )}
      
      { mobile ? (
        <>
          <Heading color="white" fontSize="28" mt="20">{episode.title}</Heading>
          <Flex 
            mt="8" 
            direction="column"
            w="100%"
          >
            <Text mt="5">{episode.members}</Text>
            <Text mt="3">{episode.publishedAt}</Text>
            <Text mt="3">{episode.durationAsString}</Text>
          </Flex>
        </>
      ) : (
        <>
          <Heading color="white" fontSize="28" mt="10">{episode.title}</Heading>
          <Flex 
            mt="8" 
            justifyContent="space-between" 
            w="100%"
          >
            <Text>{episode.members}</Text>
            <Text>{episode.publishedAt}</Text>
            <Text>{episode.durationAsString}</Text>
          </Flex>
        </>
      )}

      <Box
        mt="10"
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </Flex>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async(ctx) => {
  const { slug } = ctx.params;
  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
    duration: Number(data.file.duration),
    durationAsString: ConvertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url
  }

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24
  }
}
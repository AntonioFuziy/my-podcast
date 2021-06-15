import { Flex, Text, Box, Icon, Heading, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Button, calc } from '@chakra-ui/react'
import Image from 'next/image';

import { GetStaticProps } from 'next';
import { FaPlay } from "react-icons/fa";

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { api } from '../services/api';
import { ConvertDurationToTimeString } from '../utils/convertDurationToTimeString';

type Episode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  descritpion: string;
  duration: string;
  durationAsString: string;
  url: string;
  publishedAt: string;
}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  // const [] = useState();

  return (
    <Flex 
      color="white" 
      direction="column" 
      p="4rem" 
      overflowY="scroll"
      style={{height: `calc(100vh - 6.5rem)`}}
    >
      <Flex direction="column">
        <Heading fontSize="25" ml="8">Last Updates</Heading>
        <Flex>
          {latestEpisodes.map(episode => {
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
                  <Text fontWeight="bold">{episode.title}</Text>
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
      <Flex mt="10">
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
              {allEpisodes.map(episode => {
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
                      <Text fontWeight="bold" fontSize="16">{episode.title}</Text>
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
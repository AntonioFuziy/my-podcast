import { Flex, Heading, Icon, Text, Progress, Button } from '@chakra-ui/react'
import { FiHeadphones, FiRepeat, FiUpload } from 'react-icons/fi';
import { FaPlay, FaStepForward, FaStepBackward } from 'react-icons/fa';

export function Player(){
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
        <Text fontSize="28">Playing</Text>
      </Heading>
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
      <Flex w="100%" alignItems="center" justifyContent="center" direction="column">
        <Flex justifyContent="space-between" alignItems="center" direction="row" mb="10">
          <Text mr="3">00:00</Text>
          <Progress value={80} colorScheme="gray" w={220} h={1} borderRadius="12" bg="pink.300"/>
          <Text ml="3">10:59</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Button type="button" variant="ghost">
            <Icon as={FiUpload} fontSize="25"/>
          </Button>
          <Button type="button" variant="ghost">
            <Icon as={FaStepBackward} fontSize="25"/>
          </Button >
          <Button type="button" variant="ghost">
            <Icon as={FaPlay} fontSize="30"/>
          </Button>
          <Button type="button" variant="ghost">
            <Icon as={FaStepForward} fontSize="25"/>
          </Button>
          <Button type="button" variant="ghost">
            <Icon as={FiRepeat} fontSize="25"/>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
import { Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { FcHeadset } from "react-icons/fc";
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';

export function Header(){
  const currentDate = format(new Date(), 'EEEEEE, d, MMMM', {
    locale: ptBR
  });
  return(
    <Flex 
      alignItems="center"
      h="6.5rem"
      bg="blackAlpha.500" 
      paddingX="4rem" 
      paddingY="2rem"
      color="white"
      borderBottomWidth={1}
      borderColor="gray.600"
    >
      <Link href="/">
        <Heading display="flex" alignItems="center" cursor="pointer">
          <Icon as={FcHeadset} fontSize="40"/>
          <Text ml="8">My Podcast</Text>
        </Heading>
      </Link>
      <Text fontSize="16" ml="12">Best platform for your podcasts</Text>
      <Text ml="auto">{currentDate}</Text>
    </Flex>
  )
}
import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/app"
import { theme } from '../styles/theme'
import { Box, Flex } from '@chakra-ui/react'
import { Header } from "../components/Header"
import { Player } from "../components/Player"

function MyApp({ Component, pageProps } : AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Flex direction="row" justifyContent="space-between" color="blackAlpha.800">
        <Box flex="1">
          <Header/>
          <Component {...pageProps} />
        </Box>
        <Player/>
      </Flex>
    </ChakraProvider>
  )
}

export default MyApp

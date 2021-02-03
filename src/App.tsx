import {
  Box,
  ChakraProvider,
  Grid,
  VStack,
  theme,
} from "@chakra-ui/react"
import React, { FunctionComponent } from "react"

import { ColorModeSwitcher } from "./ColorModeSwitcher"

const App: FunctionComponent = () => (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
)

export default App;
import {
  Box,
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import React, { FunctionComponent } from "react"

import CommandInput from './components/CommandInput';

const App: FunctionComponent = () => (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <CommandInput/>
      </Box>
    </ChakraProvider>
)

export default App;
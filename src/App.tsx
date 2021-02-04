import {
  ChakraProvider,
  Container,
  Heading,
  theme
} from "@chakra-ui/react"
import React, { FunctionComponent, useState } from "react"

import CommandInput from './components/CommandInput';
import { Global } from '@emotion/react'
import { RobotState } from './typings/types';
import styles from "./App.styles";

const initialRobotState: RobotState = {
  isPlaced: false,
  commands: [],
  errorMsg: null,
  xPos: null,
  yPos: null,
  facing: null
}

const App: FunctionComponent = () => {
  const [robotState, setRobotState] = useState<RobotState>(initialRobotState);
  const [commandInputValue, setCommandInputValue] = useState<string>('');

  return (
    <ChakraProvider theme={theme}>
      <Global styles={styles}/>
      <div className="page">
        <Container>
          <Heading as="h1">Mr Robot</Heading>
          <CommandInput/>
        </Container>
      </div>
    </ChakraProvider>
  )
}

export default App;
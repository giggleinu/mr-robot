import {
    Button,
    ButtonGroup,
    Input,
} from "@chakra-ui/react"
import React, { FunctionComponent } from "react"

interface CommandInputProps {
    value: string,
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
    handleReset: () => void;
}

const CommandInput: FunctionComponent<CommandInputProps> = ({
    value,
    onChange,
    handleReset,
    handleSubmit
}) => {
    return (
        <>
            <Input
                placeholder="What should Mr Robot do?"
                value={value}
                onChange={onChange}
            />
            <ButtonGroup spacing={4}>
            <Button onClick={handleSubmit} colorScheme="purple">Run</Button>
            <Button onClick={handleReset}>Reset</Button>
            </ButtonGroup>
      </>
    );
}

export default CommandInput;
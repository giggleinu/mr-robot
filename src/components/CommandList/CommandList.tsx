import { Command, PlaceCommand } from '../../typings/types';
import React, { FunctionComponent } from "react"
import {
    Stack,
    Text
} from "@chakra-ui/react"

import { BaseCommand } from '../../typings/enums';

interface CommandListProps {
    commands: (PlaceCommand | Command)[];
}

const CommandList: FunctionComponent<CommandListProps> = ({
    commands
}) => {
    return (
        <Stack className="command-list">
        // Sorry for this - I was blocked on how to bypass this typing issue
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {commands.map((cmd: any, idx)=> {
            const {command, xPos, yPos, facing} = cmd;

            if (command === BaseCommand.PLACE) {
                return (
                    <Text key={idx} fontSize="lg">{'>'} {command} {xPos}, {yPos}, {facing}</Text>
                )
            }
            if (command === BaseCommand.REPORT) {
                return (
                    <Text key={idx} fontSize="lg">{'>'} CURRENT: {xPos}, {yPos}, {facing}</Text>
                )
            }

            return (
                <Text key={idx} fontSize="lg">{'>'} {command}</Text>
            )
        })}
        </Stack>
    );
}

export default CommandList;
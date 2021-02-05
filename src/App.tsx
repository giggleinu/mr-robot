import { BaseCommand, Error, Orientation } from './typings/enums';
import { ChakraProvider, Container, Heading, theme } from '@chakra-ui/react';
import { Coordinate, RobotState } from './typings/types';
import React, { FunctionComponent, useCallback, useState } from 'react';

import { BaseCommandStr } from './content/string';
import CommandInput from './components/CommandInput';
import CommandList from './components/CommandList';
import ErrorBanner from './components/ErrorBanner';
import { ErrorMsg } from './content/errorMsg';
import { Global } from '@emotion/react';
import { getAdjacentOrientation } from './utils/getAdjacentOrientation';
import styles from './App.styles';
import { validatePosition } from './utils/validatePosition';

const initialRobotState: RobotState = {
	isPlaced: false,
	commands: [],
	error: null,
	xPos: null,
	yPos: null,
	facing: null,
};

const App: FunctionComponent = (): JSX.Element => {
	const [robotState, setRobotState] = useState<RobotState>(initialRobotState);
	const [commandInput, setCommandInput] = useState<string>('');
	const { commands, error, facing, xPos, yPos, isPlaced } = robotState;
	const TABLE_SIZE = 5;

	const onInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>): void => {
			setCommandInput(e.target.value);
		},
		[],
	);

	const processCommand = (): void => {
		// Capitalise and split by comma
		const inputCapitalisedSplit = commandInput.toUpperCase().split(/[ ,]+/);
		// Filter out empty elements
		const commandInputCleaned = inputCapitalisedSplit.filter(
			(cmd) => !!cmd,
		);
		const inputBaseCommand = commandInputCleaned[0];
		// Errors
		const notPlaced =
			!isPlaced && inputBaseCommand !== BaseCommandStr.PLACE;
		const invalidBaseCommand = !Object.keys(BaseCommandStr).includes(
			inputBaseCommand,
		);
		const invalidParams =
			inputBaseCommand !== BaseCommandStr.PLACE &&
			commandInputCleaned.length > 1;

		if (notPlaced) {
			setRobotState({
				...robotState,
				error: Error.NOT_PLACED,
			});
		} else if (invalidBaseCommand || invalidParams) {
			setRobotState({
				...robotState,
				error: Error.INVALID_COMMAND,
			});
		}

		// * * * * * * * * * * PLACE * * * * * * * * * * //
		else if (inputBaseCommand === BaseCommandStr.PLACE) {
			if (commandInputCleaned.length === 4) {
				const inputXPos = parseInt(commandInputCleaned[1]);
				const inputYPos = parseInt(commandInputCleaned[2]);
				const inputFacing = commandInputCleaned[3] as Orientation;

				const withinBounds = validatePosition(inputXPos, inputYPos, TABLE_SIZE);
				const validOrientation = Object.keys(Orientation).includes(
					inputFacing,
				);

				if (
					!isNaN(inputXPos && inputYPos) &&
					withinBounds &&
					validOrientation
				) {
					setRobotState({
						isPlaced: true,
						error: null,
						xPos: inputXPos,
						yPos: inputYPos,
						facing: inputFacing,
						commands: [
							...robotState.commands,
							{
								command:
									BaseCommand[
										inputBaseCommand as BaseCommand
									],
								xPos: inputXPos,
								yPos: inputYPos,
								facing: inputFacing,
							},
						],
					});
				} else {
					if (!withinBounds) {
						setRobotState({
							...robotState,
							error: Error.OUT_OF_BOUNDS,
						});
					} else if (!validOrientation) {
						setRobotState({
							...robotState,
							error: Error.INVALID_ORIENTATION,
						});
					}
				}
			} else {
				setRobotState({
					...robotState,
					error: Error.INVALID_PLACE_COMMAND,
				});
			}
		}

		// * * * * * * * * * * MOVE * * * * * * * * * * //
		else if (inputBaseCommand === BaseCommandStr.MOVE) {
			const newCoord: Coordinate = {
				xPos: xPos,
				yPos: yPos,
			};
			// Check whether new coordinate is valid before updating RobotState
			if (newCoord.yPos !== null && newCoord.xPos !== null) {
				switch (facing) {
					case Orientation.NORTH:
						newCoord.yPos += 1;
						break;
					case Orientation.EAST:
						newCoord.xPos += 1;
						break;
					case Orientation.SOUTH:
						newCoord.yPos -= 1;
						break;
					case Orientation.WEST:
						newCoord.xPos -= 1;
						break;
					default:
				}

				if (validatePosition(newCoord.xPos, newCoord.yPos, TABLE_SIZE)) {
					setRobotState({
						...robotState,
						error: null,
						xPos: newCoord.xPos,
						yPos: newCoord.yPos,
						commands: [
							...robotState.commands,
							{
								command:
									BaseCommand[
										inputBaseCommand as BaseCommand
									],
							},
						],
					});
				} else
					setRobotState({
						...robotState,
						error: Error.OUT_OF_BOUNDS,
					});
			}
		}

		// * * * * * * * * * * REPORT * * * * * * * * * * //
		else if (inputBaseCommand === BaseCommandStr.REPORT) {
			setRobotState({
				...robotState,
				error: null,
				commands: [
					...robotState.commands,
					{
						command: BaseCommand[inputBaseCommand as BaseCommand],
						xPos: xPos,
						yPos: yPos,
						facing: facing,
					},
				],
			});
		}
		// * * * * * * * * * * LEFT & RIGHT * * * * * * * * * * //
		else if (
			inputBaseCommand === BaseCommandStr.LEFT ||
			inputBaseCommand === BaseCommandStr.RIGHT
		) {
			setRobotState({
				...robotState,
				error: null,
				facing:
					facing &&
					getAdjacentOrientation(
						facing,
						BaseCommand[
							inputBaseCommand as
								| BaseCommand.LEFT
								| BaseCommand.RIGHT
						],
					),
				commands: [
					...robotState.commands,
					{
						command: BaseCommand[inputBaseCommand as BaseCommand],
					},
				],
			});
		}
	};

	const handleSubmit = (): void => {
		// Don't do anything if command input is empty
		if (!commandInput.length) {
			return;
		}
		processCommand();
		// Reset command line input
		setCommandInput('');
	};

	// Clear all commands and unplace Mr Robot
	const handleReset = (): void => {
		commandInput && setCommandInput('');
		setRobotState(initialRobotState);
	};

	return (
		<ChakraProvider theme={theme}>
			<Global styles={styles} />
			<div className="page">
				<Container>
					<Heading as="h1" size={'2xl'}>
						Mr Robot
					</Heading>
					<CommandInput
						value={commandInput}
						onChange={onInputChange}
						handleSubmit={handleSubmit}
						handleReset={handleReset}
					/>
					<CommandList commands={commands} />
					{error && <ErrorBanner message={ErrorMsg[error]} />}
				</Container>
			</div>
		</ChakraProvider>
	);
};

export default App;

import { BaseCommand, Error, Orientation }  from './enums';

// * * * * * * * * * * Position * * * * * * * * * * //
export interface Coordinate {
    xPos: number | null;
    yPos: number | null;
}

export interface Facing {
    facing: Orientation | null;
}

export type Position = Coordinate & Facing;

// * * * * * * * * * * Commands * * * * * * * * * * //
export interface Command {
    command: string;
}

export type PlaceCommand = Command & Position;

// * * * * * * * * * * Robot State * * * * * * * * * * //
export interface RobotState extends Position {
    isPlaced: boolean;
    commands: (Command | PlaceCommand)[];
    error: Error | null;
}
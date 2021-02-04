import { Direction } from '../enums/index';

export interface Coordinate {
    x: number;
    y: number;
}

export interface Facing {
    facing: Direction;
}

export type Position = Coordinate & Facing;

import { Position } from './Position';

export interface RobotState extends Position {
    isPlaced: boolean;
    commands: string[];
    errorMsg: string;
}
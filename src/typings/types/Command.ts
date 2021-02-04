import { BaseCommand }  from '../enums/index';
import { Position } from './Position';

export interface Command {
    command: BaseCommand;
    errorMsg: string | null;
}

export type PlaceCommand = Command & Position;
import { Cardinal } from '@enums';

export interface Coordinates {
    X: number;
    Y: number;
}

export interface Position extends Coordinates {
    F: Cardinal;
}
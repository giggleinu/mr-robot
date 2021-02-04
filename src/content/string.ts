import { BaseCommand, Orientation } from '../typings/enums';

export const BaseCommandStr: Record<BaseCommand, string> = {
    [BaseCommand.MOVE]: 'MOVE',
    [BaseCommand.LEFT]: 'LEFT',
    [BaseCommand.RIGHT]: 'RIGHT',
    [BaseCommand.PLACE]: 'PLACE',
    [BaseCommand.REPORT]: 'REPORT',
}

export const OrientationStr: Record<Orientation, string> = {
    [Orientation.NORTH]: 'NORTH',
    [Orientation.EAST]: 'EAST',
    [Orientation.SOUTH]: 'SOUTH',
    [Orientation.WEST]: 'WEST',
}
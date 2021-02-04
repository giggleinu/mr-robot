import { BaseCommand, Orientation } from '../typings/enums';

export const getAdjacentOrientation = (facing: Orientation, command: BaseCommand.LEFT | BaseCommand.RIGHT): Orientation => {
    let newOrientation: Orientation = facing;
    switch (facing) {
        case Orientation.NORTH:
            command === BaseCommand.LEFT ? newOrientation = Orientation.WEST : newOrientation = Orientation.EAST
            break;
        case Orientation.EAST:
            command === BaseCommand.LEFT ? newOrientation = Orientation.NORTH : newOrientation = Orientation.SOUTH
            break;
        case Orientation.SOUTH:
            command === BaseCommand.LEFT ? newOrientation = Orientation.EAST : newOrientation = Orientation.WEST
            break;
        case Orientation.WEST:
            command === BaseCommand.LEFT ? newOrientation = Orientation.SOUTH : newOrientation = Orientation.NORTH
            break;
        default:
    }
    return newOrientation;
}
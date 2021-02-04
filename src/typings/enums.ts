export enum BaseCommand {
    PLACE = 'PLACE',
    MOVE = 'MOVE',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    REPORT = 'REPORT'
}

export enum Orientation {
    NORTH = 'NORTH',
    EAST = 'EAST',
    SOUTH = 'SOUTH',
    WEST = 'WEST'
}

export enum Error {
    NOT_PLACED = 'NOT_PLACED',
    OUT_OF_BOUNDS = 'OUT_OF_BOUNDS',
    INVALID_COMMAND = 'INVALID_COMMAND',
    INVALID_PLACE_COMMAND = 'INVALID_PLACE_COMMAND',
    INVALID_ORIENTATION = 'INVALID_ORIENTATION'
}
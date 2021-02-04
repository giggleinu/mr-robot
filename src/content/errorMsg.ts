import { Error } from '../typings/enums';

export const ErrorMsg: Record<Error, string> = {
    [Error.INVALID_PLACE_COMMAND]: "Invalid PLACE Command. PLACE command should have the following format: 'PLACE X,Y,F'",
    [Error.INVALID_ORIENTATION]: "Invalid Orientation. Orientation should be one of the following values: NORTH | EAST | SOUTH | WEST",
    [Error.NOT_PLACED]: "Not placed yet. You can't tell me what to do if I'm not here yet.",
    [Error.OUT_OF_BOUNDS]: "Out of Bounds. I am going to crash into a wall.",
    [Error.INVALID_COMMAND]: "Invalid Command. Sorry, I don't understand.",
}
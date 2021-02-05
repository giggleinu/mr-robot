import { BaseCommand, Orientation } from '../../typings/enums';

import { getAdjacentOrientation } from '../getAdjacentOrientation';

describe('utils/getAdjacentOrientation', () => {
	it.each`
		input                | expected
		${Orientation.NORTH} | ${Orientation.WEST}
		${Orientation.WEST}  | ${Orientation.SOUTH}
		${Orientation.SOUTH} | ${Orientation.EAST}
		${Orientation.EAST}  | ${Orientation.NORTH}
	`(
		'should return orientation $expected when orientation is $input',
		({ input, expected }) => {
			expect(getAdjacentOrientation(input, BaseCommand.LEFT)).toEqual(
				expected,
			);
		},
	);

	it.each`
		input                | expected
		${Orientation.NORTH} | ${Orientation.EAST}
		${Orientation.WEST}  | ${Orientation.NORTH}
		${Orientation.SOUTH} | ${Orientation.WEST}
		${Orientation.EAST}  | ${Orientation.SOUTH}
	`(
		'should return orientation $expected when orientation is $input',
		({ input, expected }) => {
			expect(getAdjacentOrientation(input, BaseCommand.RIGHT)).toEqual(
				expected,
			);
		},
	);
});

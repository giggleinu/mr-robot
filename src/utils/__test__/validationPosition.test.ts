import { validatePosition } from '../validatePosition';

describe('utils/sortByPriority', () => {
	it.each`
		x    | y
		${0} | ${0}
		${1} | ${0}
		${4} | ${4}
		${2} | ${3}
		${0} | ${1}
		${4} | ${0}
	`('coordinates should all be within bounds', ({ x, y}) => {
	expect(validatePosition(x,y)).toBe(true) ;
	});

	it.each`
		x    | y
		${5} | ${5}
		${-1}| ${0}
		${3} | ${5}
		${0} | ${5}
		${6} | ${5}
		${3} | ${-1}
	`('coordinates should all be out of bounds', ({ x, y}) => {
	expect(validatePosition(x,y)).toBe(false) ;
	});
});

import { validatePosition } from '../validatePosition';

describe('utils/validatePosition', () => {
	it.each`
		x     | y    | size
		${0}  | ${0} | ${5}
		${1}  | ${0} | ${5}
		${4}  | ${4} | ${5}
		${2}  | ${3} | ${8}
		${0}  | ${1} | ${3}
        ${4}  | ${0} | ${5}
        ${9}  | ${8} | ${10}
        ${99} | ${80}| ${100}
	`('coordinates should all be within bounds', ({ x, y, size}) => {
	expect(validatePosition(x,y,size)).toBe(true) ;
	});

	it.each`
		x    | y    | size
		${5} | ${5} | ${5}
		${-1}| ${0} | ${5}
		${3} | ${10}| ${10}
		${0} | ${5} | ${2}
		${6} | ${5} | ${5}
        ${3} | ${-1}| ${4}
        ${0} | ${2} | ${2}
	`('coordinates should all be out of bounds', ({ x, y, size}) => {
	expect(validatePosition(x,y, size)).toBe(false) ;
	});
});

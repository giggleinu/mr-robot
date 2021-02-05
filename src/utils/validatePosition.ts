export const validatePosition = (xPos: number, yPos: number, tableSize: number): boolean => {
	let isValid = true;
	if (xPos < 0 || yPos < 0 || xPos > tableSize - 1 || yPos > tableSize - 1) {
		isValid = false;
	}
	return isValid;
};

export const validatePosition = (xPos: number, yPos: number): boolean => {
    let isValid = true;
    if (xPos < 0 || yPos < 0 || xPos > 4 || yPos > 4) {
      isValid = false;
    }
    return isValid;
}
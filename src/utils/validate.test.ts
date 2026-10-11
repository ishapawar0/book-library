import { expect, test, describe } from 'vitest';
import { isValidTitle } from './validate';

describe('isValidTitle() Backend Logic Checks', () => {

  test('should ACCEPT a standard valid book title', () => {
    // 1. Arrange
    const standardTitle = 'The Blue Umbrella';

    // 2. Act
    const result = isValidTitle(standardTitle);

    // 3. Assert
    expect(result).toBe(true);
  });

  test('should REJECT an empty string title', () => {
    // Arrange
    const emptyTitle = '';

    // Act
    const result = isValidTitle(emptyTitle);

    // Assert
    expect(result).toBe(false);
  });

  test('should REJECT a title made only of whitespace spaces', () => {
    // Arrange
    const whitespaceTitle = '     ';

    // Act
    const result = isValidTitle(whitespaceTitle);

    // Assert
    expect(result).toBe(false);
  });
  test('should REJECT a title that is 100 characters or longer', () => {
    // 1. Arrange: Create a fake title that is exactly 100 characters long
    // "a" repeated 100 times
    const ultraLongTitle = 'a'.repeat(100); 

    // 2. Act: Run our backend validation function
    const result = isValidTitle(ultraLongTitle);

    // 3. Assert: We EXPECT the result to be false because 100 characters is too long!
    expect(result).toBe(false);
  });
});

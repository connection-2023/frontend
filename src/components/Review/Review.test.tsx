import { calculateStarArray } from './Review';

describe('calculateStarArray 함수 test', () => {
  it('평균 값이 3일 때, starArray는 [1, 1, 1, 0, 0]', () => {
    const average = 3;
    const expected = [1, 1, 1, 0, 0];
    const result = calculateStarArray(average);
    expect(result).toEqual(expected);
  });

  it('평균 값에 소수점이 있는 경우 정확한 배열을 반환', () => {
    const average = 2.75;
    const expected = [1, 1, 0.75, 0, 0];
    const result = calculateStarArray(average);
    expect(result).toEqual(expected);
  });
});

type TSquares = string | null;

/**
 * winner {string} 赢家
 * coordinate {number[]} 赢家的坐标
 */
type TResult = { winner: string; coordinate: number[] } | null;

declare function calculateWinner(squares: TSquares[]): TResult;

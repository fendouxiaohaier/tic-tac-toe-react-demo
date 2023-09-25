import { memo, useCallback, useMemo, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";

import Board from "../Board";
import Demo from "../Demo/index.tsx";

import { calculateWinner } from "../../util";

import GameContext from "../../context/GameContext";

import "./index.css";

const Game = () => {
  /** 当前的步数 */
  const [stepNumber, setStepNumber] = useState(0);

  /** 是否轮到X走了 */
  const [xIsNext, setXIsNext] = useState(true);

  /** 是否升序展示历史记录，默认为true */
  const [isShowHistoryAsc, setIsShowHistoryAsc] = useState(true);

  /** 历史记录 */
  const [history, setHistory] = useState([
    {
      /** 历史格子状态 */
      squares: Array(9).fill(null),
      /** 历史坐标 */
      coordinate: [],
    },
  ]);

  const handleClick = useCallback(
    (i, coordinate) => {
      // 丢弃未来的数据，只保留时间旅行回到的某个时刻
      const historyTemp = history.slice(0, stepNumber + 1);
      const current = historyTemp[historyTemp.length - 1];
      const squares = current.squares.slice();

      // 当有玩家胜出时，或者某个 Square 已经被填充时，该函数不做任何处理直接返回。
      if (calculateWinner(squares) || squares[i]) {
        return;
      }

      squares[i] = xIsNext ? "X" : "O";

      unstable_batchedUpdates(() => {
        setHistory(
          historyTemp.concat([
            {
              squares: squares,
              coordinate,
            },
          ])
        );
        setStepNumber(historyTemp.length);
        setXIsNext(!xIsNext);
      });
    },
    [history, stepNumber, xIsNext]
  );

  // 时间旅行 跳转到指定的步数去
  const jumpTo = useCallback((step) => {
    unstable_batchedUpdates(() => {
      setStepNumber(step);
      setXIsNext(step % 2 === 0);
    });
  }, []);

  /**
   * @description 当前格子的状态
   */
  const current = useMemo(() => history[stepNumber], [history, stepNumber]);

  /**
   * @description 计算出当前是否有胜者
   */
  const winner = useMemo(
    () => calculateWinner(current.squares),
    [current.squares]
  );

  /**
   * @description 计算是否有胜者的文本状态
   */
  const status = useMemo(() => {
    if (winner) {
      return `Winner:  ${winner.winner}`;
    } else {
      if (current.squares.includes(null)) {
        return `Next player: ${xIsNext ? "X" : "O"}`;
      } else {
        return `Level the score`;
      }
    }
  }, [current.squares, winner, xIsNext]);

  /**
   * @description 渲染跳转步骤按钮UI
   */
  const moves = useMemo(() => {
    return history.map((step, move) => {
      // 在描述后面展示坐标（列号，行号）
      const desc = move
        ? "Go to move #" +
          move +
          "  坐标(列,横)：(" +
          step.coordinate.toString() +
          ")"
        : "Go to game start";
      return (
        <li key={move}>
          <button
            style={{
              fontWeight: move === stepNumber ? "bold" : "normal",
            }}
            onClick={() => jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });
  }, [history, jumpTo, stepNumber]);

  return (
    <GameContext.Provider value={{ onClick: handleClick }}>
      <div className="game">
        <Demo value="123" />
        <div className="game-board">
          <Board squares={history[stepNumber].squares} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => setIsShowHistoryAsc(!isShowHistoryAsc)}>
            {isShowHistoryAsc ? "降序" : "升序"}
          </button>
          <ol>{isShowHistoryAsc ? moves : moves.reverse()}</ol>
        </div>
      </div>
    </GameContext.Provider>
  );
};

export default memo(Game);

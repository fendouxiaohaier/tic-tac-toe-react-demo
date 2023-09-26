import { useCallback, memo, useMemo } from "react";

import { Square } from "../../components";

import { calculateWinner } from "../../util";
import { BoardRows } from "../../constants";

import "./index.css";

const Board = (props) => {
  const { squares } = props;

  /**
   * @description 根据参数 渲染一个一个的格子
   *
   * @param {number} i 格子的索引
   * @param {[number, number]} coordinate 格子的坐标（[列,行]格式）
   * @param {boolean} isLightBtn 是否高亮格子 这个在有胜者的时候需要展示高亮
   */
  const renderSquare = useCallback(
    (i, coordinate, isLightBtn) => {
      return (
        <Square
          value={squares[i]}
          key={i} 
          isLightBtn={isLightBtn}
          index={i}
          coordinate={coordinate}
        />
      );
    },
    [squares]
  );

  /**
   * @description 判断是否需要高亮格子
   */
  const isLightSquare = useCallback((winner, index) => {
    if (!winner) {
      return false;
    }

    if (winner?.coordinate?.includes(index)) {
      return true;
    }
  }, []);

  const winner = useMemo(() => calculateWinner(squares), [squares]);

  return (
    <div>
      {BoardRows.map((item, row) => (
        <div className="board-row" key={item}>
          {BoardRows.map((item_, col) =>
            renderSquare(
              row * 3 + col,
              [col, row],
              isLightSquare(winner, row * 3 + col)
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default memo(Board);

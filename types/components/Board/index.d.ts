import { ReactNode, JSX } from "react";

type TSquares = string | null;

interface BoardProps {
  children: ReactNode;
  /** 当前展示格子状态 */
  squares: TSquares[];
}

declare function Board(props: BoardProps): JSX.Element;

export default Board;
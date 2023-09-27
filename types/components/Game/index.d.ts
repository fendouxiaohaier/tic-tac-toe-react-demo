import { ReactNode, JSX } from "react";

interface GameProps {
  /** 子组件 */
  children: ReactNode;
}

declare function Game(props: GameProps): JSX.Element;

export default Game;
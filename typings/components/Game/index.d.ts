import { ReactNode, JSX } from "react";

interface GameProps {
  /** 子组件 */
  children: ReactNode;
}

export function Game(props: GameProps): JSX.Element;

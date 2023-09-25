import { ReactNode, JSX } from "react";

interface SquareProps {
  children: ReactNode;
  /** 是否高亮格子 */
  isLightBtn: boolean;
  /** 格子展示的值 */
  value: string;
  /** 格子的索引 */
  index: number;
  /** 格子的坐标 */
  coordinate: [number, number];
}

export default function Square(props: SquareProps): JSX.Element;

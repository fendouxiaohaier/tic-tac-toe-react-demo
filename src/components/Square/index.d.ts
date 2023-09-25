import { ReactNode, JSX } from "react";

interface SquareProps {
  children?: ReactNode;
  /** 是否高亮 */
  isLightBtn: boolean;
  /** 展示的值 */
  value: string;
  /** 格子对应的索引 */
  index: number;
  /** 格子的坐标 */
  coordinate: [number, number];
}

export function Square(props: SquareProps): JSX.Element;

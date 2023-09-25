import { memo, useContext } from "react";

import { GameContext } from "../../context";

import "./index.css";

/**
 * @description 一个一个的方格组件
 * @param {*} props
 * @returns
 */
const Square = (props) => {
  const gameContextValue = useContext(GameContext);

  const { isLightBtn, value, index, coordinate } = props;

  return (
    <button
      style={{ background: isLightBtn ? "red" : "white" }}
      className="square"
      onClick={() => gameContextValue.onClick(index, coordinate)}
    >
      {value}
    </button>
  );
};

export default memo(Square);

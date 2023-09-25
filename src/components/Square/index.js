import { memo } from "react";

import './index.css';

/**
 * @description 一个一个的方格组件
 * @param {*} props 
 * @returns 
 */
const Square = (props) => {
  return (
    <button
      style={{ background: props.isLightBtn ? "red" : "white" }}
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default memo(Square);

import React, { FC, memo } from "react";

import Square from "../Square";

const TSDemo: FC<{ demoValue: string }> = ({ demoValue }) => {
  return (
    <div style={{ margin: "100px" }}>
      <button>{demoValue}</button>
      <Square
        children={<span>我是Square组件的子组件</span>}
        coordinate={[1, 2]}
        index={1}
        isLightBtn
        value="X"
      />
    </div>
  );
};

export default memo(TSDemo);

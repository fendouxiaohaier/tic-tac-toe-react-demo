import React, { FC, memo, useEffect } from "react";

// import logo from '../../../public/logo192.png';

// import { Square } from "../../components/index.js";


import { Square } from "../../components/index";

const TSDemo: FC<{ demoValue: string }> = ({ demoValue }) => {
  useEffect(() => {
  }, []);

  return (
    <div style={{ margin: "100px" }}>
      <button>{demoValue}</button>
      <Square children={<span>123</span>} coordinate={[1, 2]} index={1} isLightBtn value="X"/>
    </div>
  );
};

export default memo(TSDemo);

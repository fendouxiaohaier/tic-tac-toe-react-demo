import React, { FC, memo, useEffect } from "react";

// import logo from '../../../public/logo192.png';

import { Square } from "../../components";

const TSDemo: FC<{ demoValue: string }> = ({ demoValue }) => {

  useEffect(() => {
  }, []);

  return (
    <div style={{ margin: "100px" }}>
      <button>{demoValue}</button>
      <Square />
    </div>
  );
};

export default memo(TSDemo);

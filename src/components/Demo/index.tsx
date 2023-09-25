import React, { FC, memo } from "react";

const Demo: FC<{ value: string }> = ({ value }) => {
  return <span>{value}</span>;
};

export default memo(Demo);

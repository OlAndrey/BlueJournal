import React from "react";
import * as icons from "../../../icons";

const Icon = ({ size = 20, name, className = "" }) => {
  const [width, height] = size instanceof Array ? size : [size, size];
  const [icon, viewBox] = icons[name];
  // console.log(name)
  return (
    <svg
      fill="none"
      className={"icon " + className}
      width={width}
      height={height}
      dangerouslySetInnerHTML={{ __html: icon }}
      viewBox={viewBox}
    />
  );
};

export default Icon;
import { IComponentBaseProps } from "@/utils/types/component";
import classNames from "classnames";
import React from "react";

const CardHeader = ({ className, children }: IComponentBaseProps) => {
  return <div className={classNames([className])}>{children}</div>;
};

export default CardHeader;

import { IComponentBaseProps } from "@/utils/types/component";
import React from "react";

const Body = ({ className, children }: IComponentBaseProps) => (
  <section className={className}>{children}</section>
);

export default Body;

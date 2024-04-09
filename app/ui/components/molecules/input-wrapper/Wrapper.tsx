import style from "@/app/ui/styles/components/input-group.module.scss";
import { IComponentBaseProps } from "@/utils/types/component";
import React from "react";

const InputWrapper = ({ children }: IComponentBaseProps) => (
  <div className={style.input_wrapper}>{children}</div>
);

export default InputWrapper;

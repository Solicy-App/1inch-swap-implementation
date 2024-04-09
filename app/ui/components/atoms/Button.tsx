import React from "react";
import classNames from "classnames";
import { IButton } from "@/utils/types/component";

const Button: React.FC<IButton> = ({ text, onClick, className }) => {
  return (
    <button
      className={classNames([className])}
      onClick={(e) => {
        onClick && onClick();
      }}
    >
      {text}
    </button>
  );
};

export default Button;

import { IInputField } from "@/utils/types/input";
import flexStyle from "@/app/ui/styles/components/flex.module.scss";
import alignStyle from "@/app/ui/styles/components/align.module.scss";
import inputStyle from "@/app/ui/styles/components/input.module.scss";
import classNames from "classnames";

const Input = ({
  label,
  type,
  name,
  id,
  error,
  className,
  defaultValue,
  required,
  disabled,
  autoFocus,
  onChange,
  ...restProps
}: IInputField) => {
  return (
    <div
      className={classNames([flexStyle.flex, flexStyle.flex_col, className])}
    >
      <label htmlFor={id}>{label}</label>
      <input
        {...restProps}
        name={name}
        disabled={disabled}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        id={id}
        type={type}
        className={classNames([alignStyle.text_r, inputStyle.input])}
        onChange={onChange}
      />
      {error ? <div>{error}</div> : null}
    </div>
  );
};

export default Input;

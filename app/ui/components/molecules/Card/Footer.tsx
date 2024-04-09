import { IComponentBaseProps } from "@/utils/types/component";
import classNames from "classnames";

const Footer = ({ className, children }: IComponentBaseProps) => {
  return <div className={classNames([className])}>{children}</div>;
};

export default Footer;

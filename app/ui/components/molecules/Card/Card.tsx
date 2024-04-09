import style from "@/app/ui/styles/components/card.module.scss";
import { IComponentBaseProps } from "@/utils/types/component";
import classNames from "classnames";

const Card = ({ className, children }: IComponentBaseProps) => {
  return <div className={classNames([style.card, className])}>{children}</div>;
};

export default Card;

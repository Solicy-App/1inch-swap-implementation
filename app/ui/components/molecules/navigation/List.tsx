import style from "@/app/ui/styles/components/navigation-list.module.scss";
import { IComponentBaseProps } from "@/utils/types/component";

const List = ({ children }: IComponentBaseProps) => (
  <ul className={style.nav_inline}>{children}</ul>
);

export default List;

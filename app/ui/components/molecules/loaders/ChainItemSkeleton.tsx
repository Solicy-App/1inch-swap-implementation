import classNames from "classnames";
import flexStyle from "@/app/ui/styles/components/flex.module.scss";
import alignStyle from "@/app/ui/styles/components/align.module.scss";
import Skeleton from "react-loading-skeleton";

const ChainItemSkeleton = () => (
  <div
    className={classNames([
      flexStyle.flex,
      flexStyle.items_center,
      flexStyle.justify_between,
      alignStyle.text_xl,
    ])}
  >
    <div
      className={classNames([
        flexStyle.flex,
        flexStyle.items_center,
        flexStyle.gap_4,
      ])}
    >
      <Skeleton circle={true} width={50} height={50} />
      <div className={classNames([flexStyle.flex, flexStyle.flex_col])}>
        <strong>
          <Skeleton width={150} />
        </strong>
        <span
          className={classNames([alignStyle.text_info, alignStyle.text_md])}
        >
          <Skeleton width={100} />
        </span>
      </div>
    </div>
    <div>
      <Skeleton width={80} />
    </div>
  </div>
);

export default ChainItemSkeleton;

import Link from "next/link";
import { Suspense } from "react";
import classNames from "classnames";
import Skeleton from "react-loading-skeleton";
import ArrowIcon from "@/app/ui/components/atoms/ArrowIcon";
import flexStyle from "@/app/ui/styles/components/flex.module.scss";
import alignStyle from "@/app/ui/styles/components/align.module.scss";
import buttonStyle from "@/app/ui/styles/components/button.module.scss";
import arrowStyle from "@/app/ui/styles/components/arrow_icon.module.scss";
import { IReceiveQueryParams } from "@/utils/types/component";
import Image from "next/image";
import { toWei } from "@/utils/helpers";

const YouReceive = ({ query, data, amount }: IReceiveQueryParams) => {
  return (
    <div
      className={classNames([
        flexStyle.flex,
        flexStyle.justify_between,
        flexStyle.items_center,
        flexStyle.gap_4,
      ])}
    >
      <Link
        href={{ pathname: "/select-destination-token", query: { ...query } }}
        className={classNames([
          flexStyle.flex,
          buttonStyle.btn,
          buttonStyle.btn_hover_gray,
          flexStyle.gap_4,
          !data ? buttonStyle.btn_info : null,
          !data ? alignStyle.text_xl : alignStyle.text_2xl,
        ])}
      >
        {data?.image ? (
          <Image
            width={30}
            height={30}
            alt={data?.symbol || ""}
            src={data?.image || ""}
          />
        ) : null}
        {data?.symbol || "Select a token"}
        <ArrowIcon
          className={classNames([arrowStyle.arrow, arrowStyle.arrow_b])}
        />
      </Link>
      <div
        className={classNames([
          flexStyle.flex_1,
          alignStyle.text_r,
          alignStyle.text_lg,
        ])}
      >
        <Suspense fallback={<Skeleton width={100} />}>{amount}</Suspense>
      </div>
    </div>
  );
};

export default YouReceive;

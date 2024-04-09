import Image from "next/image";
import classNames from "classnames";
import { IChainItemProps } from "@/utils/types/component";
import flexStyle from "@/app/ui/styles/components/flex.module.scss";
import alignStyle from "@/app/ui/styles/components/align.module.scss";
import spaceStyle from "@/app/ui/styles/components/spaces.module.scss";
import hoverStyle from "@/app/ui/styles/components/hover.module.scss";
import React from "react";

const ChainItem = ({
  image,
  name,
  amount,
  symbol,
  address,
  decimals,
  chooseToken,
}: IChainItemProps) => {
  return (
    <div
      onClick={() =>
        chooseToken({ image, name, amount, symbol, address, decimals })
      }
      className={classNames([
        flexStyle.flex,
        flexStyle.items_center,
        flexStyle.justify_between,
        alignStyle.text_xl,
        spaceStyle.p_2,
        spaceStyle.rounded_3,
        hoverStyle.hover,
      ])}
    >
      <div
        className={classNames([
          flexStyle.flex,
          flexStyle.items_center,
          flexStyle.gap_4,
        ])}
      >
        <Image src={image} width={50} height={50} alt={symbol} />
        <div className={classNames([flexStyle.flex, flexStyle.flex_col])}>
          <strong>{name}</strong>
          <span
            className={classNames([alignStyle.text_info, alignStyle.text_md])}
          >
            {amount} {symbol}
          </span>
        </div>
      </div>
      <div>$0</div>
    </div>
  );
};

export default ChainItem;

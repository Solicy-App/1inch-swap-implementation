"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import Input from "@/app/ui/components/atoms/Input";
import ArrowIcon from "@/app/ui/components/atoms/ArrowIcon";
import { IQueryWithSwapAction } from "@/utils/types/component";
import flexStyle from "@/app/ui/styles/components/flex.module.scss";
import alignStyle from "@/app/ui/styles/components/align.module.scss";
import buttonStyle from "@/app/ui/styles/components/button.module.scss";
import arrowStyle from "@/app/ui/styles/components/arrow_icon.module.scss";
import { useDebouncedCallback } from "use-debounce";

const PayForm = ({
  query,
  data,
  swap1Inch,
  handleQuote,
}: IQueryWithSwapAction) => {
  const inputHandler = useDebouncedCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      handleQuote(+e?.target?.value);
      swap1Inch(+e?.target?.value);
    },
    500
  );
  console.log(query);
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
        href={{ pathname: "/select-source-token", query: { ...query } }}
        className={classNames([
          flexStyle.flex,
          buttonStyle.btn,
          buttonStyle.btn_hover_white,
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
      <Input
        className={flexStyle.flex_1}
        label=""
        type="number"
        id="you_pay"
        name="you_pay"
        step="0.000000000001"
        required
        disabled={!data}
        autoFocus={!!data}
        onChange={inputHandler}
      />
    </div>
  );
};

export default PayForm;

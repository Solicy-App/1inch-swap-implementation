import React from "react";

export interface IComponentBaseProps {
  className?: string;
  children: Readonly<React.ReactNode>;
}

export interface IChainItem {
  address: string;
  decimals: number;
  image: string;
  name: string;
  amount: number | string;
  symbol: string;
}

export interface IChainItemClick {
  chooseToken: (token: IChainItem) => void;
}

export interface IChainItemProps extends IChainItemClick, IChainItem {}

export interface IQueryParams {
  query?: { from?: string; to?: string };
  data?: IChainItem;
}

export interface IReceiveQueryParams extends IQueryParams {
  amount: number | string;
}

export interface IQueryWithSwapAction extends IQueryParams {
  swap1Inch: (value: number) => void;
  handleQuote: (value: number) => void;
}

export interface IButton {
  text: string;
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
}

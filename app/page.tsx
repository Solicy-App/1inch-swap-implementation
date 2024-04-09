"use client";
import classNames from "classnames";
import { toWei } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useSwap1Inch } from "@/hooks/one-inch";
import { getQuote } from "@/app/lib/actions/chains";
import { NAVIGATION_LIST } from "@/utils/navigations";
import * as Card from "@/app/ui/components/molecules/Card";
import PayForm from "@/app/ui/components/organisms/PayForm";
import YouReceive from "./ui/components/organisms/YouReceive";
import { useSwapSourceContext } from "@/app/ui/contexts/source";
import cardStyle from "@/app/ui/styles/components/card.module.scss";
import * as Navigation from "@/app/ui/components/molecules/navigation";
import { INavigationItem, ISearchParams } from "@/utils/types/navigation";
import InputWrapper from "@/app/ui/components/molecules/input-wrapper/Wrapper";
import InputGroup from "@/app/ui/components/molecules/input-wrapper/InputGroup";
import SwapTokenWrapper from "@/app/ui/components/organisms/SwapTokenAppWrapper";
import ConnectWalletButton from "@/app/ui/components/molecules/ConnectWalletButton";

export default function Home({ searchParams }: ISearchParams) {
  const [quoteResult, setQuoteResult] = useState<any>();
  const [inputValue, setInputValue] = useState(0);
  const { from, to } = useSwapSourceContext();
  const { setFrom, setTo, swap1Inch } = useSwap1Inch();

  useEffect(() => {
    if (from) setFrom(from.address);
    if (to) setTo(to.address);
  }, [from, to]);

  const handleQuote = async (value: number) => {
    if (!value) return;
    setInputValue(value);
    if (!from?.address || !to?.address) return;
    console.log(!from?.address, !to?.address, !from?.address && !to?.address);
    const quote = await getQuote({
      value,
      from: from?.address,
      to: to?.address,
    });
    setQuoteResult(quote);
  };

  return (
    <SwapTokenWrapper>
      <Card.Card
        className={classNames([
          cardStyle.card_white,
          cardStyle.card_shadow,
          cardStyle.card_col,
        ])}
      >
        <Card.Header>
          <Navigation.List>
            {NAVIGATION_LIST.map(
              ({ href, text }: INavigationItem, index: number) => (
                <Navigation.Item href={href} text={text} key={index} />
              )
            )}
          </Navigation.List>
        </Card.Header>
        <Card.Body className={cardStyle.card_col}>
          <Card.Card className={cardStyle.sub_card}>
            <InputWrapper>
              <InputGroup
                coinName={from?.name || ""}
                title={"You pay"}
                amount={toWei(
                  quoteResult?.dstAmount || 0,
                  -Math.abs(10 || 0)
                ).toString(10)}
              >
                <PayForm
                  query={searchParams}
                  data={from}
                  swap1Inch={swap1Inch}
                  handleQuote={handleQuote}
                />
              </InputGroup>
            </InputWrapper>
          </Card.Card>
          <Card.Card
            className={classNames([cardStyle.sub_card, cardStyle.bordered])}
          >
            <InputWrapper>
              <InputGroup
                coinName={to?.name || ""}
                title="You receive"
                amount={toWei(
                  quoteResult?.dstAmount || 0,
                  -Math.abs(10 || 0)
                ).toString(10)}
              >
                <YouReceive
                  query={searchParams}
                  data={to}
                  amount={toWei(
                    quoteResult?.dstAmount || 0,
                    -Math.abs(to?.decimals || 0)
                  ).toString(10)}
                />
              </InputGroup>
            </InputWrapper>
          </Card.Card>
        </Card.Body>
        <Card.Footer>
          <ConnectWalletButton />
        </Card.Footer>
      </Card.Card>
      <ToastContainer />
    </SwapTokenWrapper>
  );
}

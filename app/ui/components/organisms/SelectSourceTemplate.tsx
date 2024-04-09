import Link from "next/link";
import classNames from "classnames";
import * as Card from "@/app/ui/components/molecules/Card";
import ArrowIcon from "@/app/ui/components/atoms/ArrowIcon";
import { getAvailableChains } from "@/app/lib/actions/chains";
import { IComponentBaseProps } from "@/utils/types/component";
import cardStyle from "@/app/ui/styles/components/card.module.scss";
import flexStyle from "@/app/ui/styles/components/flex.module.scss";
import alignStyle from "@/app/ui/styles/components/align.module.scss";
import spaceStyle from "@/app/ui/styles/components/spaces.module.scss";
import arrowStyle from "@/app/ui/styles/components/arrow_icon.module.scss";
import ChainsBodyWrapper from "@/app/ui/components/organisms/ChainsBodyWrapper";

const SelectSourceTemplate = async ({ children }: IComponentBaseProps) => {
  const availableChains: any = await getAvailableChains();

  return (
    <Card.Card
      className={classNames([
        cardStyle.card_white,
        cardStyle.card_shadow,
        cardStyle.card_col,
        spaceStyle.p_x_9,
        spaceStyle.p_y_4,
      ])}
    >
      <Card.Header
        className={classNames([
          flexStyle.flex,
          flexStyle.items_center,
          spaceStyle.p_y_6,
        ])}
      >
        <Link href="/" className={arrowStyle.arrow_l}>
          <ArrowIcon
            className={classNames([arrowStyle.arrow, arrowStyle.arrow_black])}
          />
        </Link>
        <div
          className={classNames([
            alignStyle.text_c,
            alignStyle.text_xl,
            flexStyle.flex_1,
          ])}
        >
          <strong>Select a token</strong>
        </div>
      </Card.Header>
      <Card.Body>
        <ChainsBodyWrapper availableChains={availableChains?.data}>
          {children}
        </ChainsBodyWrapper>
      </Card.Body>
    </Card.Card>
  );
};

export default SelectSourceTemplate;

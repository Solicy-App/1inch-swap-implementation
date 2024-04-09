import { Suspense } from "react";
import classNames from "classnames";
import ChainList from "@/app/ui/components/organisms/ChainList";
import SearchInput from "@/app/ui/components/atoms/SearchInput";
import flexStyle from "@/app/ui/styles/components/flex.module.scss";
import spacesStyle from "@/app/ui/styles/components/spaces.module.scss";
import overflowStyle from "@/app/ui/styles/components/overflow.module.scss";
import SelectSourceTemplate from "@/app/ui/components/organisms/SelectSourceTemplate";

export default function SelectSource({}) {
  return (
    <SelectSourceTemplate>
      <div>
        <Suspense fallback={<></>}>
          <SearchInput
            type="from"
            placeholder="Search by name or paste address"
          />
        </Suspense>
      </div>
      <ChainList
        type="from"
        className={classNames([
          flexStyle.flex,
          flexStyle.flex_col,
          flexStyle.gap_6,
          spacesStyle.m_t_12,
          spacesStyle.p_t_16,
          spacesStyle.border_t_1,
          spacesStyle.border_primary,
          spacesStyle.height_5,
          overflowStyle.overflow_y_auto,
        ])}
      />
    </SelectSourceTemplate>
  );
}

import Link from "next/link";
import { IInputGroup } from "@/utils/types/input";
import style from "@/app/ui/styles/components/input-group.module.scss";
import { Suspense } from "react";
import GroupFooter from "./GroupFooter";
import { GroupFooterSkeleton } from "../loaders/GroupFooterSkeleton";

const InputGroup = ({ title, amount, coinName, children }: IInputGroup) => {
  return (
    <>
      <Link href="#" target="_blank">
        {title}
      </Link>
      <div className={style.wrapper_body}>{children}</div>
      <div className={style.wrapper_footer}>
        <Suspense fallback={<GroupFooterSkeleton />}>
          <GroupFooter amount={amount} coinName={coinName} />
        </Suspense>
      </div>
    </>
  );
};

export default InputGroup;

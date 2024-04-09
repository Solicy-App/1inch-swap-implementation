import Link from "next/link";

const GroupFooter = ({
  amount,
  coinName,
}: {
  amount: number | string;
  coinName: string;
}) => {
  return (
    <>
      <Link href="#" target="_blank">
        {coinName}
      </Link>
      <p>~${amount}</p>
    </>
  );
};

export default GroupFooter;

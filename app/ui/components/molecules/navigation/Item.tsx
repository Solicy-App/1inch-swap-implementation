import Link from "next/link";

const Item = ({ href, text }: { href: string; text: string }) => (
  <li>
    <Link href={href}>{text}</Link>
  </li>
);

export default Item;

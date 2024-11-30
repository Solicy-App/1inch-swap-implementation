import React from "react";
import NavLink from "./NavLink";

const LINKS = [
  {
    label: "Trade",
  },
  {
    label: "DAO",
  },
  {
    label: "Portfolio",
    href: "#",
  },
  {
    label: "Buy Crypto",
    href: "#",
  },
];
const Navigation = () => {
  return (
    <nav className="flex text-sm">
      {LINKS.map((link) => (
        <NavLink key={link.label} {...link} />
      ))}
    </nav>
  );
};

export default Navigation;

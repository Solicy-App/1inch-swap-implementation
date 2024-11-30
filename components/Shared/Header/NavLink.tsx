import React from "react";
import { ChevronDown } from "lucide-react";

const NavLink = ({ href, label }: { href?: string; label: string }) => {
  return (
    <div className="flex cursor-pointer items-center space-x-2 rounded-xl px-2.5 py-1.5 hover:bg-slate-200/40">
      <a href={href}>{label}</a>
      {!href && (
        <div className="max-h-4 min-h-4 min-w-4 max-w-4">
          <ChevronDown width={18} height={18} />
        </div>
      )}
    </div>
  );
};

export default NavLink;

"use client";
import { useDebouncedCallback } from "use-debounce";
import style from "@/app/ui/styles/components/input.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames";

const SearchInput = ({
  placeholder,
  type,
}: {
  placeholder: string;
  type: "from" | "to";
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  /**
   * @description search input handler searching existing chains to compare with each other
   * @param {string} search
   */
  const handleSearch = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set(type, search);
    } else {
      params.delete(type);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div>
      <input
        className={classNames([style.input, style.search])}
        type="text"
        id="search"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get(type)?.toString()}
        autoFocus
      />
    </div>
  );
};

export default SearchInput;

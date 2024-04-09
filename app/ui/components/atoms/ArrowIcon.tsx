import { IIcon } from "@/utils/types/icon";

const ArrowIcon = ({ width, height, pathFill, className }: IIcon) => (
  <span className={className}>
    <svg
      width={width || "6"}
      height={height || "11"}
      viewBox="0 0 6 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.33203 1L5.27143 5.5L1.33203 10"
        stroke={pathFill || "#4F4F4F"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export default ArrowIcon;

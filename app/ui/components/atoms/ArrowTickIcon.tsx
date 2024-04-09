import { IIcon } from "@/utils/types/icon";

const ArrowTickIcon = ({ width, height, pathFill }: IIcon) => (
  <svg
    width={width || "16"}
    height={height || "16"}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_630_1662"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="16"
      height="16"
    >
      <rect width="16" height="16" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_630_1662)">
      <path
        d="M7.49996 13.0833V4.83333L3.63329 8.71667L2.91663 8L7.99996 2.91667L13.0833 8L12.3666 8.71667L8.49996 4.83333V13.0833H7.49996Z"
        fill={pathFill || "#2f8af5"}
      />
    </g>
  </svg>
);

export default ArrowTickIcon;

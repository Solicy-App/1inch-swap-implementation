"use client";

import Image from "next/image";
import { ChoiceComponent } from "../ChoiceComponent/ChoiceComponent";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getTokensSelector } from "../../store/selectors/tokens";
import { Token } from "../../utils/types/types";
import styles from "./TokenSelector.module.css";

export const TokenSelector = ({
  token,
  setToken,
}: {
  token: Token | null;
  setToken: (arg: Token) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const tokens = useSelector(getTokensSelector);

  const handleChoiceToken = (selectedOption: Token) => {
    setToken(selectedOption);
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <div
        role="button"
        className={styles["token-button"]}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {token ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Image
              src={token?.logoURI}
              alt={token?.name}
              width={40}
              height={40}
            />
            <p>{token?.symbol}</p>
          </div>
        ) : (
          "Select token"
        )}
        <svg
          className={styles["dropdown-icon"]}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path
            fill="#fff"
            d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z"
          />
        </svg>
      </div>

      {isOpen && (
        <div className={styles["dropdown-menu"]}>
          <ChoiceComponent
            options={tokens}
            onSelect={handleChoiceToken}
            isOpen={setIsOpen}
          />
        </div>
      )}
    </div>
  );
};

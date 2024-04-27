"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./ChoiceComponent.module.css";
import { Token } from "@/src/utils/types/types";

export const ChoiceComponent = ({
  options,
  onSelect,
  isOpen,
}: {
  options: Token[];
  onSelect: (arg: Token) => void;
  isOpen: (arg: boolean) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter((option: Token) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    option: Token
  ) => {
    event.preventDefault();
    if (option) {
      onSelect(option);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => {
            isOpen(false);
          }}
        >
          Back
        </button>
        <p className={styles.title}>Select a token</p>
      </div>
      <input
        placeholder="Search by name or paste address"
        type="text"
        className={styles.inputField}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.optionsContainer}>
        {filteredOptions.map((option: Token) => (
          <div
            key={option.address}
            onClick={(e) => {
              handleSubmit(e, option);
            }}
            className={styles.optionItem}
          >
            <div className={styles.logo}>
              <Image
                src={option?.logoURI}
                alt={option?.name}
                width={40}
                height={40}
              />
            </div>
            <p className={styles.optionName}>{option?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

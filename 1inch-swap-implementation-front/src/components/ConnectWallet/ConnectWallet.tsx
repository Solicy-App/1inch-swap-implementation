import Image from "next/image";
import styles from "./ConnectWallet.module.css";
import { walletOptions } from "@/src/utils/constants";

export const ConnectWallet = ({
  setConnectWallet,
}: {
  setConnectWallet: (arg: boolean) => void;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h3>Connect wallet</h3>
          <button
            className={styles["close-button"]}
            onClick={() => {
              setConnectWallet(false);
            }}
          >
            x
          </button>
        </div>
        {walletOptions.map((option, index) => (
          <div key={index} className={styles["wallet-option"]}>
            <div className={styles["wallet-option-item"]}>
              <Image
                src={option.icon1}
                alt={`${option.name1} icon`}
                width={24}
                height={24}
              />
              <p>{option.name1}</p>
            </div>
            <div className={styles["wallet-option-item"]}>
              <Image
                src={option.icon2}
                alt={`${option.name2} icon`}
                width={24}
                height={24}
              />
              <p>{option.name2}</p>
            </div>
          </div>
        ))}
        <div className={styles["more-wallets"]}>More wallets</div>
        <p className={styles["additional-info"]}>
          By connecting your wallet, you agree to our Terms of Use and Privacy
          Policy.
        </p>
      </div>
    </div>
  );
};

import styles from "../styles/page.module.css";
import HeaderProps from "../interfaces/HeaderProps";
import React from "react";
import Image from "next/image";
import logo from "../../logo.webp";
import settingsicon from "../icons/settingsicon.png";
import menuicon from "../icons/menuicon.png";

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className={styles.header}>
      <Image
        id={styles.logo}
        src={logo}
        alt="Logo"
        height={50}
        width={50}
      />
      <div className={styles.headerelems}>
        <select id={styles.chainselect} value={props.chain} onChange={(e) => props.changeChain(Number(e.target.value))} >
<option value={1}>Ethereum</option>
<option value={42161}>Arbitrum</option>
<option value={10}>Optimism</option>
<option value={324}>zkSync Era</option>
<option value={8453}>Base</option>
<option value={56}>BNB Chain</option>
<option value={137}>Polygon</option>
<option value={100}>Gnosis</option>
<option value={43114}>Avalanche</option>
<option value={250}>Fantom</option>
<option value={8217}>Klaytn</option>
<option value={1313161554}>Aurora</option>
        </select>
        
              {props.isDisconnected ? null : <div id={styles.balance}>{props.balance ? "$" + props.balance : "Loading..."}</div>}
        
        <w3m-button />
        <a href="#" title="Settings">
          <Image
            id={styles.settingsicon}
            src={settingsicon}
            alt="Settings Icon"
            height={18}
            width={18}
          />
        </a>
        <a href="#" title="Menu">
          <Image
            id={styles.menuicon}
            src={menuicon}
            alt="Menu Icon"
            height={18}
            width={18}
          />
        </a>
      </div>
    </div>
  );
}

export default Header;
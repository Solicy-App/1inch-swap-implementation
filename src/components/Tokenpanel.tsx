import TokenpanelProps from "../interfaces/TokenpanelProps";
import Token from "../interfaces/Token";
import React from "react";
import Image from "next/image";
import styles from "../styles/page.module.css";

const Tokenpanel: React.FC<TokenpanelProps> = (props) => {
  
  function selectToken(token: Token) {
    props.changeToken(token);
  }
  
  return (
    <>
      <div className={styles.tokenpanelbody}>
        <div className={styles.tokenpanelheader}>
          <button onClick={() => props.showTokens}>Back</button>
          <h4>Select a token</h4>
        </div>
        <div className={styles.tokenpanelmain}>
          {props.tokensArray.length > 0 && props.tokensArray.map((token: Token) => (
            <div 
              className={styles.tokenblock} 
              key={token.name} 
              onClick={() => selectToken(token)}>
              <Image
                className={styles.tokenlogo}
                src={token.logoURI}
                alt={token.name}
                height={30}
                width={30}
                />
              <p>{token.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Tokenpanel;
import Tokenpanel from "./Tokenpanel";
import MainProps from "../interfaces/MainProps";
import React from "react";
import Image from "next/image";
import styles from "../styles/page.module.css";
import reseticon from "../icons/reseticon.png";
import addtoken from "../icons/plusicon.png";
import swapsettings from "../icons/filtericon.png";

const Main: React.FC<MainProps> = (props) => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.mainheader}>
          <div className={styles.mainbuttons}>
            <button>Swap</button>
            <button>Limit</button>
          </div>
          <div className={styles.maintools}>
            <button>
              <Image
                id={styles.reseticon}
                src={reseticon}
                alt="Reset"
                height={15}
                width={15}
              />
            </button>
            <button>
              <Image
                id={styles.addtoken}
                src={addtoken}
                alt="AddToken"
                height={15}
                width={15}
              />
            </button>
            <button>
              <Image
                id={styles.swapsettings}
                src={swapsettings}
                alt="Swap Settings"
                height={15}
                width={15}
              />
            </button>
          </div>
        </div>

        {props.tokensArray ? (<div className={styles.maintokens}>
          <div key="tokenfrom" className={styles.token}>
            <div className={styles.tokenwindowleft}>
              <p>You pay:</p>
              <div className={styles.tokenselems}>
                {props.fromToken && (
                  <Image
                    className={styles.tokenlogo}
                    src={props.fromToken.logoURI}
                    alt={props.fromToken.name}
                    height={30}
                    width={30}
                  />
                )}
                <button
                  onClick={() => {
                    props.showTokens("fromtoken");
                  }}
                >
                  {props.fromToken ? props.fromToken.symbol : "Select a Token"}
                </button>
              </div>
              <p>{props.fromToken ? props.fromToken.name : ""}</p>
            </div>
            <div className={styles.tokenwindowright}>
            <p>Balance: ${props.balance}</p>
            <input
  type="number"
  value={props.amount}
  onChange={(e) => {
    
    if(!e.target.value) {
      e.target.value = "0";
    } else if (/^0\d/.test(e.target.value)) {
      e.target.value = e.target.value.toString().replace(/^0/, '');
    } else if (Number(e.target.value) > 9999) {
      e.target.value = "9999"; 
    }
    
    props.changeAmount(Number(e.target.value));
  }}
  max={9999}
/>
<p>{props.fromToken ? `$${props.fromDollarPerToken *
            props.amount}` : ""}</p>
</div>

          </div>

          <div key="tokento" className={styles.token}>
            <div className={styles.tokenwindowleft}>
              <p>You receive:</p>
              <div className={styles.tokenselems}>
                {props.toToken && (
                  <Image
                    className={styles.tokenlogo}
                    src={props.toToken.logoURI}
                    alt={props.toToken.name}
                    height={30}
                    width={30}
                  />
                )}
                <button
                  onClick={() => {
                    props.showTokens("totoken");
                  }}
                >
                  {props.toToken ? props.toToken.symbol : "Select a Token"}
                </button>
              </div>
              <p>{props.toToken ? props.toToken.name : ""}</p>
            </div>
            
            <div className={styles.tokenwindowright}>
            <p>Balance: ${props.balance}</p>
            
            <p id={styles.toTokenAmount}>{props.toDollarPerToken !== 0 ?
            props.amount * props.fromDollarPerToken / props.toDollarPerToken :
            props.toDollarPerToken}</p>
            
            <p>{props.toToken ? `$${props.toDollarPerToken *
            props.amount}` : ""}</p>
          </div>
            

          </div>
        </div>) : <div>Loading</div>}

{props.isDisconnected ? (
  <div id={styles.mainconnect}><w3m-button /></div>
) : (
  <button
    onClick={() => {
      const response = props.swap1Inch(
        props.chainId, 
        props.amount,
        props.fromToken!.address, 
        props.toToken!.address
      );
      
    }}
    disabled={!props.toToken || props.amount === 0 || props.insufficientBallance}
    id={props.toToken && props.amount !== 0 && !props.insufficientBallance ? styles.mainswap : styles.mainswapdisabled}
  >
    {props.toToken ? (
      props.amount === 0 ? "Please enter amount" : props.insufficientBallance ?
      "Insufficient Ballance" : "Swap"
    ) : (
      "Please, select a token to swap to"
    )}
  </button>
)}

      </div>
      {props.showTokensPanel && (
        <Tokenpanel
          changeToken={props.changeToken}
          tokensArray={props.tokensArray}
          showTokens={props.showTokens}
        />
      )}
    </>
  );
};

export default Main;
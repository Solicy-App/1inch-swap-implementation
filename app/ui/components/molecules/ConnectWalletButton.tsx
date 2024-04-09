"use client";
import classNames from "classnames";
import { useWeb3React } from "@web3-react/core";
import Button from "@/app/ui/components/atoms/Button";
import alignStyle from "@/app/ui/styles/components/align.module.scss";
import spaceStyle from "@/app/ui/styles/components/spaces.module.scss";
import buttonStyle from "@/app/ui/styles/components/button.module.scss";
import { WalletLinkConnecttor } from "@/utils/connector";

const ConnectWalletButton = ({}) => {
  const { activate, active, account, deactivate } = useWeb3React();

  const connect = () => {
    activate(WalletLinkConnecttor);
  };

  const reject = () => {
    deactivate();
  };

  return (
    <Button
      text={!account ? "Connect Wallet" : account}
      className={classNames([
        alignStyle.text_c,
        spaceStyle.p_5,
        spaceStyle.width_full,
        buttonStyle.btn,
        !account ? buttonStyle.btn_info : buttonStyle.btn_warning,
      ])}
      onClick={active ? reject : connect}
    />
  );
};

export default ConnectWalletButton;

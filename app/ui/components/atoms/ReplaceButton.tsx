import ArrowTickIcon from "@/app/ui/components/atoms/ArrowTickIcon";
import buttonStyle from "@/app/ui/styles/components/button.module.scss";

const ReplaceButton = () => {
  return (
    <button className={buttonStyle.replace_icon}>
      <ArrowTickIcon />
    </button>
  );
};

export default ReplaceButton;

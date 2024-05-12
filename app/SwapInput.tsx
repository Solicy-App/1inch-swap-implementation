// SwapInput.tsx

interface SwapInputProps {
  amount: number;
  onAmountChange: (amount: number) => void;
  token: string;
  onTokenChange: (token: string) => void;
  tokens: string[]; // List of available tokens
}

const SwapInput: React.FC<SwapInputProps> = ({
  amount,
  onAmountChange,
  token,
  onTokenChange,
  tokens,
}) => {
  return (
    <div className="swap-input">
      <input
        type="number"
        value={amount}
        onChange={(e) => onAmountChange(parseFloat(e.target.value))}
        placeholder="Enter amount"
      />
      <select value={token} onChange={(e) => onTokenChange(e.target.value)}>
        {tokens.map((tokenOption) => (
          <option key={tokenOption} value={tokenOption}>
            {tokenOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SwapInput;

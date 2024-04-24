import Token from "../interfaces/Token";

export default interface TokenpanelProps {
    changeToken: (token: Token) => void,
    tokensArray: Token[] | [],
    showTokens: (id?: "fromtoken" | "totoken") => void
}
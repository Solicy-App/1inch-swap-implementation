import React, {useState, useEffect, Dispatch, SetStateAction} from "react";
import styles from "./TokenList.module.scss";
import {MdOutlineArrowBackIos} from "react-icons/md";
import {IoSearchSharp} from "react-icons/io5";
import LoadingIndicator from "../../../loadingIndicator";
import {searchTokens} from "@/utils/1inch/api";
import {Token} from "@/components/swapModal";

interface SwapProps {
    setActiveTab: Dispatch<SetStateAction<string | null>>,
    setFromToken: Dispatch<SetStateAction<null | Token>>,
    setToToken: Dispatch<SetStateAction<null | Token>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    fromToken: Token | null,
    loading: boolean,
    activeTab: string | null,
    toToken: Token | null,
    tokens: Token[] | null,
}
const Swap = ({setActiveTab, setToToken, setFromToken, activeTab, tokens, loading, setLoading, fromToken, toToken}: SwapProps) => {
    const [searchedTokensList, setSearchedTokensList] = useState<Token[] | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const setToken = (token: any) => {
        if (activeTab === "from") {
            setFromToken(token);
        } else if (activeTab === "to") {
            setToToken(token);
        }
        setActiveTab(null);
    };

    // Debounced searching function
    useEffect(() => {
        setLoading(true)
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.trim()) {
                searchTokens(searchQuery)
                    .then((res) => {
                        setSearchedTokensList(res);
                    })
                    .catch(() => setSearchedTokensList([]))
                    .finally(() => setLoading(false))
            } else {
                setSearchedTokensList(tokens);
                setLoading(false)
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, tokens]);

    return (
        <>
            <div className={styles.tokenHeader}>
                <button className={styles.backIcon} onClick={() => setActiveTab(null)}>
                    <MdOutlineArrowBackIos/>
                </button>
            </div>

            <div className={styles.searchBlock}>
                <IoSearchSharp size={24}/>
                <input
                    type="text"
                    placeholder="Search by name or paste address"
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className={styles.tokenList}>
                {loading ? (
                    <LoadingIndicator />
                ) :searchedTokensList && searchedTokensList?.length > 0 ? (
                    searchedTokensList.map((token: any, index) => {
                        if (token.name !== fromToken?.name && token.name !== toToken?.name) {
                          return (
                                <div
                                    key={index}
                                    className={styles.tokenItem}
                                    onClick={() => setToken(token)}
                                >
                                    <div className={styles.tokenIcon}>
                                        <img src={token.logoURI} alt={token.symbol}/>
                                    </div>
                                    <div className={styles.tokenInfo}>
                                        <p className={styles.tokenName}>{token.name}</p>
                                        <p className={styles.tokenSymbol}>0 {token.symbol}</p>
                                    </div>
                                    <div className={styles.tokenBalance}>
                                        <p>$0</p>
                                    </div>
                                </div>
                            )
                        }
                    })
                ) : (
                    <div className={styles.nothingFoundScreen}>
                        <div className={styles.imageArea}>
                            <span className={styles.nothingFoundImage}></span>
                            <span className={styles.nothingFoundText}>Token not found</span>
                            <span className={styles.nothingFoundSubtext}>
                                Try changing your search query
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Swap;

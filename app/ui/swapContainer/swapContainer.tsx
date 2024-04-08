'use client'

import React, {useContext, useState, useEffect, useCallback} from "react";
import {AppContext, TokenDataType} from "@/app/page";
import axios from "axios";
import axios1Inch from "@/utils/1inch/axiosInstance";
import {getTokens} from "@/app/ui/lib/actions";
import { Box, Button, List, ListItem, Paper } from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from 'react-window';

export default function SwapContainer() {
    const { tokenData, setTokenData, selectedToken, setSelectedData } = useContext(AppContext);
    const [first, setFirst] = useState<TokenDataType>();
    const [second, setSecond] = useState<TokenDataType>();
    const handleModalClose = () => {
        setSelectedData(false);
    };

    const [showList, setShowList] = useState(false);

    useEffect(() => {
        setShowList(false);
        setFirst(undefined);
        setSecond(undefined);
    }, [tokenData]);

    useEffect(() => {
        (async () => {
            if(!selectedToken) {
                return;
            }
            const tokens = await getTokens(selectedToken);
            setTokenData(tokens);
        })()

    },[selectedToken]);

    const renderRow = useCallback(({ index, style }: ListChildComponentProps) =>(
        <ListItem style={style} key={index} component="div" disablePadding onClick={() => {
            setShowList(false);
            setFirst(tokenData?.[index]);
        }}>
            {tokenData?.[index].name}
        </ListItem>
    ), [tokenData]);

    return (
        <div className="fixed">
            { tokenData ? showList ? (
                <Box
                    sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <FixedSizeList
                        height={400}
                        width={360}
                        itemSize={46}
                        itemCount={tokenData.length}
                        overscanCount={5}
                    >
                        {renderRow}
                    </FixedSizeList>
                </Box>
            ) : (
                <Button onClick={(() => setShowList(true))}>
                    {tokenData[0].name}
                </Button>
            ) : null}
        </div>
    );
}
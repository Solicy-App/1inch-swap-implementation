import React, { useState } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import {TokenDataType} from "@/app/ui/swapPage";
import Image from "next/image";
import SearchIcon from "@/app/ui/icons/search";
import ArrowBackIcon from "@/app/ui/icons/arrowBack";

export type  VirtualizedListProps ={
    data: TokenDataType[],
    listItemClick: (index) => void,
    onClose: (index) => void
}

const VirtualizedList = ({ data, listItemClick,onClose }:VirtualizedListProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };
    
    const Row = ({ index, style }) => (
        <div style={style} className='h-24 hover:bg-slate-50 flex items-center cursor-pointer p-4'>
            <div className="h-full flex items-center w-full" key={index} onClick={() => listItemClick(filteredData[index])}>
                <Image src={filteredData[index].logoURI}  alt={filteredData[index].name} width={36} height={36} />
                <span className="ml-2 text-base font-medium">{filteredData[index].name}</span>
             </div>
        </div>
    );
    
    return (
        <div className="tokensListInner rounded-3xl">
            <div className="p-3">
                <button className="absolute top-3 left-4 hover:bg-wall cursor-pointer h-9 w-9 flex items-center justify-center rounded-xl" onClick={onClose}>
                    <ArrowBackIcon/>
                </button>
                <h3 className="mb-2">Select token</h3>
                <div className="inputWrapper">
                    <SearchIcon/>
                    <input
                        className="appearance-none outline-none"
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="autosizer" style={{ height: 400 }}>
                <AutoSizer>
                    {({ height , width }) => (
                        <FixedSizeList
                            height={height}
                            width={width}
                            itemCount={filteredData.length}
                            itemSize={70} // Adjust as needed based on your item height
                        >
                            {Row}
                        </FixedSizeList>
                    )}
                </AutoSizer>
            </div>
        </div>
    );
};

export default VirtualizedList;

import React, { ChangeEvent } from 'react';

interface SearchInputProps {
    placeholder: string;
    onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onSearch }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        onSearch(query);
    };
    
    return (
        <input
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
};

export default SearchInput;

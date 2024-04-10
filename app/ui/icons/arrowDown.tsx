import React from 'react';

const ArrowDownIcon = ({width = 18, height = 18, fill = 'rgba(79,92,98,0.53)', ...props}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill={fill}
            viewBox="0 0 24 24"
            {...props}
        >
            <path d="M4 6.5L8 10.5L12 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    );
};

export default ArrowDownIcon;

import React from 'react';

const CloseIcon = ({width = 24, height = 24, ...props}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill='none'
            viewBox="0 0 24 24"
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M5.63615 5.63603C6.02668 5.24551 6.65984 5.24551 7.05037 5.63603L18.3641 16.9497C18.7546 17.3403 18.7546 17.9734 18.3641 18.364C17.9736 18.7545 17.3404 18.7545 16.9499 18.364L5.63615 7.05024C5.24563 6.65972 5.24563 6.02656 5.63615 5.63603Z"
                  fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M18.3637 5.63603C18.7542 6.02656 18.7542 6.65972 18.3637 7.05025L7.04998 18.364C6.65946 18.7545 6.02629 18.7545 5.63577 18.364C5.24525 17.9734 5.24525 17.3403 5.63577 16.9497L16.9495 5.63603C17.34 5.24551 17.9732 5.24551 18.3637 5.63603Z"
                  fill="currentColor"/>
        </svg>
    );
};

export default CloseIcon;

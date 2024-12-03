import React from "react";
import styles from "./LoadingIndicator.module.scss";

const LoadingIndicator = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingBar}></div>
        </div>
    );
};

export default LoadingIndicator;

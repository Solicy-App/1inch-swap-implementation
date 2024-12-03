import styles from './Swap.module.scss';
import SwapModal from "@/components/swapModal";

export const Swap = () => {
    return(
        <div className={styles.pageContent}>
            <SwapModal/>
        </div>
    )
}
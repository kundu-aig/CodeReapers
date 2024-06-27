import styles from '../styles/Loader.module.css';

const Loader = () => {
    return (
        <div className={styles.loaderOverlay}>
            <div className={styles.loader}></div>
        </div>
    );
};

export default Loader;
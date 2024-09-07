import styles from './footer.module.css';
import Logo from '../../shared/assets/logo.png';

const Footer = () => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['top-wrapper']}>
                <div className={styles['logo-wrapper']}>
                    <img
                        src={Logo}
                        alt={'Logo'}
                        style={{ width: '250px', height: '120px', marginTop: '-50px', marginLeft: '-50px' }}  // Adjust the width and height as needed
                    />
                </div>
                <div className={styles['pages-wrapper']}>
                    <div className={styles['pages']}>
                        <div className={styles['page-title']}>Shopping</div>
                        <div className={styles['pages-list']}>
                            <span>Track Order</span>
                            <span>Track Shipping</span>
                            <span>Shopping Cart</span>
                        </div>
                    </div>
                    <div className={styles['pages']}>
                        <div className={styles['page-title']}>Products</div>
                        <div className={styles['pages-list']}>
                            <span>Fruits & Vegetables</span>
                            <span>Beverages</span>
                            <span>All Products</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['credits']}>
                DEVELOPED BY SAI ANIRUDH
            </div>
        </div>
    );
}

export default Footer;

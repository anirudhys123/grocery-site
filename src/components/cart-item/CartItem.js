import styles from './cartItem.module.css';

const CartItem = ({product, updateQuantity, edit = true, id = false}) => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['img-wrapper']}>
                <img src={product.image} alt={product.name}/>
            </div>
            <div className={styles['info']}>
                <div className={styles['title']} style={{ fontSize: '18px' }}>{product.name}</div>
                <div className={styles['weight']} style={{ fontSize: '16px' }}>
                    {(parseFloat(product.weight) * parseFloat(product.quantity || '1')).toFixed(2)}{product.measurement}
                </div>
                <div className={styles['quantity-wrapper']}>
                    {id && <div className={styles['quantity']} style={{ fontSize: '16px' }}>#{product.product_id}</div>}
                    <div className={styles['quantity']} style={{ fontSize: '16px' }}>
                        {product.quantity ? `Quantity: ${product.quantity}` : `Stock:  ${product.stock}`}
                    </div>
                    {edit && <>
                        <div onClick={() => updateQuantity(product, 'ADD')}
                             className={`${styles['btn']} ${styles['add']}`} style={{ fontSize: '18px' }}>+
                        </div>
                        <div onClick={() => updateQuantity(product, 'REMOVE')}
                             className={`${styles['btn']} ${styles['remove']}`} style={{ fontSize: '18px' }}>-
                        </div>
                    </>}
                </div>
            </div>
            <div className={styles['price']} style={{ fontSize: '18px' }}>
                <div className={styles['total-price']} style={{ fontSize: '20px' }}>
                    ₹{(parseFloat(product.price) * parseFloat(product.quantity || '1')).toFixed(2)} Rs
                </div>
                {parseInt(product.quantity) > 1 && (
                    <div className={styles['unit-price']} style={{ fontSize: '16px' }}>
                        ₹{product.price} Rs/{product.weight}{product.measurement}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartItem;

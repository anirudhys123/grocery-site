import styles from './navigation.module.css';
import Logo from '../../shared/assets/logo.png';
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { SEARCH_HIDDEN, SEARCH_VISIBLE } from "./constants/search";
import { useNavigate } from "react-router-dom";

const Navigation = ({ cartCount }) => {

    const [search, setSearch] = useState(SEARCH_HIDDEN);
    const [menuActive, setMenuActive] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const searchElement = useRef();
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false);

    useEffect(() => {
        setDropdown(false);
    }, [navigate])

    const handleSearch = () => {
        const width = window.innerWidth;

        if (width < 980 && search === SEARCH_HIDDEN) {
            setSearch(SEARCH_VISIBLE);
            searchElement.current.focus();
        } else {
            searchElement.current.blur();
            navigate(`/products?search=${searchInput}`);
            setSearch(SEARCH_HIDDEN);
            setSearchInput('');
        }
    }

    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSearch(SEARCH_HIDDEN);
    }

    const closeMenu = () => {
        setMenuActive(false);
    }

    const handleHideMenu = (e) => {
        e.target.style = 'display:none';
        const target = document.elementFromPoint(e.clientX, e.clientY);
        if (target)
            target.click();
        e.target.style = '';
        setDropdown(false);
    }

    return (
        <div className={styles['wrapper']}>
            {search === SEARCH_VISIBLE && <div onClick={(e) => handleClose(e)} className={styles['hide-search']}/>}
            <Link to={'/'} className={styles['logo']}>
                <img
                    src={Logo}
                    alt={'Logo'}
                    style={{ width: '250px', height: '120px', marginTop: '-50px', marginLeft: '-50px' }}  // Adjust the width and height as needed
                />
            </Link>
            <div className={`${styles['nav-wrapper']} ${menuActive && styles['show-menu']}`}>
                <div onClick={closeMenu} className={`${styles['close-menu']}`}><span
                    className={'material-symbols-outlined'}>close</span> Close
                </div>
                <nav className={styles['nav']}>
                    <Link onClick={closeMenu} to={'/'} style={{ fontSize: '18px' }}>Home</Link>
                    <Link onClick={closeMenu} to={'/products'} style={{ fontSize: '18px' }}>Products</Link>
                </nav>
            </div>
            <div className={styles['actions']}>
                <input
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    value={searchInput}
                    placeholder={'Search'}
                    ref={searchElement}
                    className={`${styles['search']} ${search === SEARCH_VISIBLE && styles['search-active']}`}
                    style={{
                        width: '250px', 
                        height: '40px', 
                        borderRadius: '25px', 
                        padding: '0 15px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                        border: '1px solid #ccc',
                        outline: 'none',
                        backgroundColor: '#f8f9fa'
                    }}
                    onFocus={(e) => e.target.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.4)'}
                    onBlur={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'}
                />
                <div onClick={handleSearch} className={`material-symbols-outlined ${styles['icon']}`} style={{ fontSize: '24px' }}>search</div>
                <Link to={'/cart'}
                      className={`material-symbols-outlined ${styles['icon']} ${search === SEARCH_VISIBLE && styles['hide-icon']}`}
                      style={{ fontSize: '24px' }}>shopping_cart
                    {cartCount ?
                        <div className={styles['cart-counter']}>{cartCount < 100 ? cartCount : "+"}</div> : ''}</Link>
                <div
                    onClick={() => setMenuActive(true)}
                    className={`material-symbols-outlined ${styles['icon']} ${styles['menu']} ${search === SEARCH_VISIBLE && styles['hide-icon']}`}
                    style={{ fontSize: '24px' }}>menu
                </div>
            </div>
        </div>
    )
}

export default Navigation;

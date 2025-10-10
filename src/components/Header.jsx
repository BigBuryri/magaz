import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from '../assets/images/logo.png';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="shop-header">
      <div className="container header__container-flex">
        <div className="header__left">
          <div className="header__logo-block" onClick={() => navigate("/")}> 
            <img src={logo} alt="Северяночка" className="header__logo" />
          </div>
          <button className="header__catalog-btn" onClick={()=>navigate("/catalog") }>
            <span className="header__catalog-icon">
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><rect y="3" width="20" height="2" rx="1" fill="white"/><rect y="9" width="20" height="2" rx="1" fill="white"/><rect y="15" width="20" height="2" rx="1" fill="white"/></svg>
            </span>
            Каталог
          </button>
        </div>
        <div className="header__center">
          <div className="header__search">
            <input type="text" placeholder="Найти товар"/>
            <span className="header__search-icon">
              <svg height="20" width="20" fill="none" stroke="#7AC86A" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
          </div>
        </div>
        <div className="header__right">
          <nav className="header__nav-icons">
            <div className="header__icon-block" onClick={()=>navigate("/favorites") }>
              <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 21C11.8 21 11.7 21 11.5 20.9C6 16.4 3 13.4 3 9.5C3 6.4 5.4 4 8.5 4C10.1 4 11.6 4.8 12.5 6C13.4 4.8 14.9 4 16.5 4C19.6 4 22 6.4 22 9.5C22 13.4 19 16.4 13.5 20.9C13.3 21 13.2 21 12 21Z" /></svg>
              <div className="header__icon-text">Избранное</div>
            </div>
            <div className="header__icon-block" onClick={()=>navigate("/orders") }>
              <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3H8V7H16V3Z" /></svg>
              <div className="header__icon-text">Заказы</div>
            </div>
            <div className="header__icon-block header__cart" onClick={()=>navigate("/cart") }>
              <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="8.5" cy="20.5" r="1.5"/><circle cx="17.5" cy="20.5" r="1.5"/><path d="M4 7L6 19H18L20 7H4Z" /><path d="M9 7V4C9 2.9 9.9 2 11 2H13C14.1 2 15 2.9 15 4V7"/></svg>
              <span className="header__cart-count">1</span>
              <div className="header__icon-text">Корзина</div>
            </div>
          </nav>
          <button className="header__login-btn" onClick={()=>navigate("/login")}>
            Войти
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;

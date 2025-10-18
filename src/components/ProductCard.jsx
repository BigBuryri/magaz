import React from 'react';
import './ProductCard.css';
import pancakes from '../assets/images/pancakes.png';
import milk1 from '../assets/images/milk1.png';
import colbasa from '../assets/images/colbasa.png';
import sausages from '../assets/images/sausages.png';
import vetchina from '../assets/images/vetchina.png';
import palka from '../assets/images/palka.png';
import { useCart } from './CartContext';
import { useFavorites } from './FavoritesContext';

const images = {
  'pancakes.png': pancakes,
  'milk1.png': milk1,
  'colbasa.png': colbasa,
  'sausages.png': sausages,
  'vetchina.png': vetchina,
  'palka.png': palka,
};

const ProductCard = ({ id, image, title, price, oldPrice, discount, isNew, boughtBefore, category }) => {
  const { addToCart, cart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const imgName = image.split('/').pop();
  const imgSrc = images[imgName] || image;
  
  // Проверяем — есть ли товар уже в корзине
  const inCart = cart.some(item => item.id === id || item.title === title);
  const favorite = isFavorite(id);

  const handleAdd = () => {
    if (!inCart) addToCart({ id, image, title, price, oldPrice, discount, isNew, boughtBefore, category });
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite({ id, image, title, price, oldPrice, discount, isNew, boughtBefore, category });
  };

  return (
    <div className="product-card">
      {discount && <div className="product-card__discount">{discount}</div>}
      {isNew && <div className="product-card__new">Новинка</div>}
      {boughtBefore && <div className="product-card__bought">Покупали раньше</div>}
      
      <button 
        className={`product-card__favorite ${favorite ? 'active' : ''}`}
        onClick={handleFavoriteClick}
        aria-label="Добавить в избранное"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path 
            d="M12 21C11.8 21 11.7 21 11.5 20.9C6 16.4 3 13.4 3 9.5C3 6.4 5.4 4 8.5 4C10.1 4 11.6 4.8 12.5 6C13.4 4.8 14.9 4 16.5 4C19.6 4 22 6.4 22 9.5C22 13.4 19 16.4 13.5 20.9C13.3 21 13.2 21 12 21Z"
            stroke="currentColor"
            strokeWidth="1.8"
            fill={favorite ? 'currentColor' : 'none'}
          />
        </svg>
      </button>

      <img src={imgSrc} alt={title} className="product-card__img" />
      <div className="product-card__info">
        <div className="product-card__title">{title}</div>
        <div className="product-card__prices">
          <span className="product-card__price">{price} ₽</span>
          {oldPrice && <span className="product-card__old-price">{oldPrice} ₽</span>}
        </div>
        <button
          className={`product-card__btn${inCart ? ' in-cart' : ''}`}
          onClick={handleAdd}
          disabled={inCart}
        >
          {inCart ? 'В корзине' : 'В корзину'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

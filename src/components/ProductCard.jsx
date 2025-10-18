import React from 'react';
import './ProductCard.css';
import pancakes from '../assets/images/pancakes.png';
import milk1 from '../assets/images/milk1.png';
import colbasa from '../assets/images/colbasa.png';
import sausages from '../assets/images/sausages.png';
import vetchina from '../assets/images/vetchina.png';
import palka from '../assets/images/palka.png';
import { useCart } from './CartContext';

const images = {
  'pancakes.png': pancakes,
  'milk1.png': milk1,
  'colbasa.png': colbasa,
  'sausages.png': sausages,
  'vetchina.png': vetchina,
  'palka.png': palka,
};

const ProductCard = ({ id, image, title, price, oldPrice, discount, isNew, boughtBefore }) => {
  const { addToCart, cart } = useCart();
  const imgName = image.split('/').pop();
  const imgSrc = images[imgName] || image;
  
  // Проверяем — есть ли товар уже в корзине
  const inCart = cart.some(item => item.id === id || item.title === title);

  const handleAdd = () => {
    if (!inCart) addToCart({ id, image, title, price, oldPrice, discount, isNew, boughtBefore });
  };

  return (
    <div className="product-card">
      {discount && <div className="product-card__discount">{discount}</div>}
      {isNew && <div className="product-card__new">Новинка</div>}
      {boughtBefore && <div className="product-card__bought">Покупали раньше</div>}
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

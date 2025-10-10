import React from 'react';
import './ProductCard.css';
import pancakes from '../assets/images/pancakes.png';
import milk1 from '../assets/images/milk1.png';
import colbasa from '../assets/images/colbasa.png';
import sausages from '../assets/images/sausages.png';
import vetchina from '../assets/images/vetchina.png';
import palka from '../assets/images/palka.png';

const images = {
  'pancakes.png': pancakes,
  'milk1.png': milk1,
  'colbasa.png': colbasa,
  'sausages.png': sausages,
  'vetchina.png': vetchina,
  'palka.png': palka,
};

const ProductCard = ({ image, title, price, oldPrice, discount, isNew, boughtBefore }) => {
  // image может быть '/assets/images/colbasa.png' или просто 'colbasa.png'
  const imgName = image.split('/').pop();
  const imgSrc = images[imgName] || image;
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
        <button className="product-card__btn">В корзину</button>
      </div>
    </div>
  );
};

export default ProductCard;

import React from 'react';
import { useCart } from './CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cart, addToCart, removeFromCart, decreaseFromCart } = useCart();

  const handleRemove = (title) => {
    removeFromCart(title);
  };

  const handleDecrease = (title) => {
    decreaseFromCart(title);
  };

  const handleAdd = (product) => {
    addToCart(product);
  };

  const total = cart.reduce((sum, p) => sum + Number(p.price.replace(',', '.')) * p.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Корзина</h1>
      {cart.length === 0 ? (
        <div className="cart-empty">Ваша корзина пуста</div>
      ) : (
        <div className="cart-list">
          {cart.map((item, idx) => (
            <div className="cart-item" key={idx}>
              <img src={item.image} alt={item.title} className="cart-item__img" />
              <div className="cart-item__info">
                <div className="cart-item__title">{item.title}</div>
                <div className="cart-item__price">{item.price} ₽ за шт.</div>
              </div>
              <div className="cart-item__controls">
                <button onClick={() => handleDecrease(item.title)} className="cart-item__btn">-</button>
                <span className="cart-item__qty">{item.quantity}</span>
                <button onClick={() => handleAdd(item)} className="cart-item__btn">+</button>
              </div>
              <div className="cart-item__total">{(Number(item.price.replace(',', '.')) * item.quantity).toFixed(2)} ₽</div>
              <button onClick={() => handleRemove(item.title)} className="cart-item__remove">Удалить</button>
            </div>
          ))}
        </div>
      )}
      <div className="cart-summary">
        <div>Товаров: {cart.reduce((acc, item) => acc + item.quantity, 0)}</div>
        <div>Сумма: {total.toFixed(2)} ₽</div>
        <button className="cart-summary__order">Оформить заказ</button>
      </div>
    </div>
  );
};

export default CartPage;

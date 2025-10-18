import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from './FavoritesContext';
import ProductCard from './ProductCard';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  
  const [priceRange, setPriceRange] = useState([1, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Получаем уникальные категории из избранных товаров
  const categories = useMemo(() => {
    const cats = [...new Set(favorites.map(item => item.category))];
    return cats.filter(Boolean);
  }, [favorites]);

  // Фильтрация товаров
  const filteredFavorites = useMemo(() => {
    return favorites.filter(product => {
      const price = parseFloat(product.price.replace(',', '.'));
      
      // Фильтр по цене
      if (price < priceRange[0] || price > priceRange[1]) {
        return false;
      }
      
      // Фильтр по категории
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }
      
      // Фильтр "В наличии" (все товары в наличии по умолчанию)
      if (inStockOnly) {
        return true;
      }
      
      return true;
    });
  }, [favorites, priceRange, selectedCategories, inStockOnly]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleClearFilters = () => {
    setPriceRange([1, 1000]);
    setSelectedCategories([]);
    setInStockOnly(false);
  };

  const hasActiveFilters = selectedCategories.length > 0 || inStockOnly || 
    priceRange[0] !== 1 || priceRange[1] !== 1000;

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="favorites-page__breadcrumbs">
          <span onClick={() => navigate('/')} className="breadcrumb-link">Главная</span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">Избранное</span>
        </div>

        <h1 className="favorites-page__title">Избранное</h1>

        <div className="favorites-page__layout">
          {/* Sidebar с фильтрами */}
          <aside className="favorites-sidebar">
            <div className="filter-block">
              <div className="filter-header">
                <h3>Фильтр</h3>
                {hasActiveFilters && (
                  <button className="filter-clear" onClick={handleClearFilters}>
                    Очистить
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
              </div>

              {/* Фильтр по цене */}
              <div className="filter-section">
                <h4 className="filter-title">Цена</h4>
                <div className="price-inputs">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                    className="price-input"
                    min="1"
                  />
                  <span className="price-separator">—</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    className="price-input"
                    min="1"
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  className="price-slider"
                  style={{ '--slider-value': `${((priceRange[1] - 1) / (1000 - 1)) * 100}%` }}
                />
              </div>

              {/* Фильтр по категориям */}
              {categories.length > 0 && (
                <div className="filter-section">
                  <h4 className="filter-title">Категории</h4>
                  {categories.map(category => (
                    <label key={category} className="filter-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                      />
                      <span className="checkbox-custom"></span>
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* В наличии */}
              <div className="filter-section">
                <label className="filter-checkbox filter-stock">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  <span className="checkbox-custom"></span>
                  <span>В наличии</span>
                </label>
              </div>

              <button className="filter-apply">Применить</button>
            </div>
          </aside>

          {/* Контент */}
          <div className="favorites-content">
            {favorites.length === 0 ? (
              <div className="favorites-empty">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <path d="M60 100C58.5 100 57 99.5 56 98.5C30 75 15 60 15 40C15 25 26 15 40 15C47.5 15 54.5 18.5 60 24C65.5 18.5 72.5 15 80 15C94 15 105 25 105 40C105 60 90 75 64 98.5C63 99.5 61.5 100 60 100Z" stroke="#FFE0E0" strokeWidth="4" fill="#FFF5F5"/>
                  <line x1="30" y1="90" x2="90" y2="30" stroke="#FFB8B8" strokeWidth="6" strokeLinecap="round"/>
                </svg>
                <h2>Список избранного пуст</h2>
                <p>Добавляйте товары в избранное, нажимая на иконку сердечка</p>
                <button className="favorites-empty-btn" onClick={() => navigate('/')}>
                  Перейти к покупкам
                </button>
              </div>
            ) : filteredFavorites.length === 0 ? (
              <div className="favorites-empty">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <circle cx="60" cy="60" r="40" stroke="#E0E0E0" strokeWidth="4"/>
                  <line x1="50" y1="50" x2="50" y2="60" stroke="#CCC" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="70" y1="50" x2="70" y2="60" stroke="#CCC" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M45 75C45 75 52 70 60 70C68 70 75 75 75 75" stroke="#CCC" strokeWidth="4" strokeLinecap="round"/>
                </svg>
                <h2>Ничего не найдено</h2>
                <p>Попробуйте изменить параметры фильтров</p>
                <button className="favorites-empty-btn" onClick={handleClearFilters}>
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <>
                <div className="favorites-header">
                  <p className="favorites-count">
                    {filteredFavorites.length} {filteredFavorites.length === 1 ? 'товар' : 'товаров'}
                  </p>
                </div>
                <div className="favorites-grid">
                  {filteredFavorites.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;


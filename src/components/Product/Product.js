import React, { useMemo, useState } from 'react';
import styles from './Product.module.scss';
import clsx from 'clsx';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

const colorClass = (c, styles) => ({
  black: styles.colorBlack,
  red: styles.colorRed,
  white: styles.colorWhite,
  blue: styles.colorBlue,
  green: styles.colorGreen,
}[c]);

const Product = ({ id, name, title, basePrice, colors, sizes }) => {
  // startowe wartości z danych produktu (nie na sztywno!)
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizes[0].name);

  // dodatkowa cena rozmiaru + finalna cena
  const addPrice = useMemo(
    () => sizes.find(s => s.name === currentSize)?.additionalPrice ?? 0,
    [sizes, currentSize]
  );
  const price = basePrice + addPrice;

  // ścieżka zdjęcia zależna od nazwy produktu i koloru
  const imgSrc = `${process.env.PUBLIC_URL}/images/products/shirt-${name}--${currentColor}.jpg`;

  const handleSubmit = (e) => {
  e.preventDefault();
  // tu możesz zrobić dispatch/do koszyka – na razie pokazujemy podsumowanie
  alert(`Added: ${title} | size: ${currentSize}, color: ${currentColor} | price: ${price}$`);
  // i/lub:
  console.log({ id, title, currentSize, currentColor, price });
};


    return (
    <article className={styles.product}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          alt={title}
          src={imgSrc}
          onError={(e) => {
            // jeśli .jpg nie istnieje, spróbuj .png (jednorazowo)
            e.currentTarget.onerror = null;
            e.currentTarget.src = `${process.env.PUBLIC_URL}/images/products/shirt-${name}--${currentColor}.png`;
          }}
        />
      </div>

      <div>
        <header>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.price}>Price: {price}$</span>
        </header>

{/* SIZES */}
<div className={styles.sizes}>
  <h3 className={styles.optionLabel}>Sizes</h3>
  <ul className={styles.choices}>
    {sizes.map(({ name: sizeName }) => {
      const isActive = currentSize === sizeName;
      return (
        <li key={sizeName}>
          <button
            type="button"
            onClick={() => setCurrentSize(sizeName)}
            aria-pressed={isActive}
            title={`Size ${sizeName}`}
            className={clsx(styles.choice, isActive && styles.active)}
          >
            {sizeName}
          </button>
        </li>
      );
    })}
  </ul>
</div>

{/* COLORS */}
<div className={styles.colors}>
  <h3 className={styles.optionLabel}>Colors</h3>
  <ul className={styles.choices}>
    {colors.map((c) => {
      const isActive = currentColor === c;
      return (
        <li key={c}>
          <button
            type="button"
            onClick={() => setCurrentColor(c)}
            aria-pressed={isActive}
            title={c}
            className={clsx(styles.choice, colorClass(c, styles), isActive && styles.active)}
          />
        </li>
      );
    })}
  </ul>
</div>
<form onSubmit={handleSubmit}>
  <Button type="submit" className={styles.button} aria-label="Add to cart">
    <span className="fa fa-shopping-cart" />
  </Button>
</form>

      </div>
    </article>
  );
};

Product.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,      // 'kodilla' / 'react' – wchodzi do ścieżki obrazka
  title: PropTypes.string.isRequired,
  basePrice: PropTypes.number.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  sizes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      additionalPrice: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Product;

import { useState } from 'react';
import productsData from '../../data/products';
import Product from '../Product/Product';
import styles from './Products.module.scss';

const Products = () => {
  const [products] = useState(productsData);



  return (
    <div className={styles.products}>
      {products.map(p => (
        <Product key={p.id} {...p} />
      ))}
    </div>
  );
};

export default Products;

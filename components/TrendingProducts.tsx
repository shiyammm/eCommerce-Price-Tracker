import React from 'react';

const TrendingProducts = () => {
  const products = ['Samsung S24', 'Space Pen', 'LG Smart TV'];
  return (
    <section>
      {products.map((product) => (
        <ul key={product}>
          <li>{product}</li>
        </ul>
      ))}
    </section>
  );
};

export default TrendingProducts;

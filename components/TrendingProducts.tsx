import { getAllProducts } from '@/lib/actions';
import Link from 'next/link';
import React from 'react';

const TrendingProducts = async () => {
  const allProducts = await getAllProducts();

  return (
    <section>
      {allProducts?.map((product) => (
        <Link href={`/products/${product._id}`} key={product._id}>
          <div>
            {/* Display product information using span and p tags */}
            <h1>
              <span>{product.title}</span>
            </h1>
            <img src={product.image} alt={product.title} />
            <p>
              <span>
                <strong>Price:</strong> {product.currency}
                {product.currentPrice}
              </span>
              <br />
              <span>
                <strong>Original Price:</strong> {product.currency}
                {product.originalPrice}
              </span>
              <br />
            </p>
            <p>
              <span>
                <strong>Category:</strong> {product.category}
              </span>
              <br />
              <span>
                <strong>Reviews Count:</strong> {product.reviewsCount}
              </span>
              <br />
              <span>
                <strong>Out of Stock:</strong>{' '}
                {product.isOutOfStock ? 'Yes' : 'No'}
              </span>
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default TrendingProducts;

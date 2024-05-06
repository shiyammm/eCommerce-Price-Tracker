import { getProductById, getSimilarProduct } from '@/lib/actions';
import TrackButton from '@/components/TrackButton';
import { redirect } from 'next/navigation';

type Props = {
  params: { id: string };
};

const page = async ({ params: { id } }: Props) => {
  const product = await getProductById(id);

  if (!product) redirect('/');

  const similarProduct = await getSimilarProduct(id);

  return (
    <div>
      <div>
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
          <span>
            <strong>Discount Rate:</strong> {product.discountRate}%
          </span>
        </p>
        <p>
          <span>
            <strong>Lowest Price:</strong> {product.currency}
            {product.lowestPrice}
          </span>
          <br />
          <span>
            <strong>Highest Price:</strong> {product.currency}
            {product.highestPrice}
          </span>
          <br />
          <span>
            <strong>Average Price:</strong> {product.currency}
            {product.averagePrice}
          </span>
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
            <strong>Out of Stock:</strong> {product.isOutOfStock ? 'Yes' : 'No'}
          </span>
        </p>
        {/* <p>
          <span>{product.description}</span>
        </p> */}
      </div>{' '}
      <br />
      <br />
      <br />
      <TrackButton />
      <div>
        <h1>Similar Products</h1>
        {similarProduct &&
          similarProduct?.length > 0 &&
          similarProduct.map((product) => (
            <div key={product._id}>{product.name}</div>
          ))}
      </div>
    </div>
  );
};

export default page;

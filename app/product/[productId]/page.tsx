import React from 'react';

const page = ({ params }: { params: { productId: string } }) => {
  return <div> Product no: {params.productId}</div>;
};

export default page;

export default function extractPrice(...elements: any) {
  for (let element of elements) {
    const productPrice = element.text().trim();

    if (productPrice) return productPrice.replace(/[^0-9.,]/g, '');
  }
  return '';
}

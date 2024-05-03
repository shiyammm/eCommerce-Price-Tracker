export function extractPrice(...elements: any) {
  for (let element of elements) {
    const productPrice = element.text().trim();

    if (productPrice) return productPrice.replace(/[^0-9.,]/g, '');
  }
  return '';
}

export function extractCurrencySymbol(element: any) {
  const currency = element.text().trim().slice(0, 1);

  return currency ? currency : '';
}

export function extractDiscountPercentage(element: any) {
  const discount = element.text().trim().replace(/[-%]/g, '');

  return discount ? discount : '';
}

export function extractDescription(...elements: any) {
  let description = [];
  for (let element of elements) {
    description.push(element);
  }
  return description;
}

export function extractCategory(element: string) {
  const category = element.trim();

  return category ? category : '';
}

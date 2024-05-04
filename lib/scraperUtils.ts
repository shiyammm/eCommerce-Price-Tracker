export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) {
      const cleanPrice = priceText.replace(/[^\d.,]/g, '');

      let firstPrice;

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d{1,3}(?:,\d{3})*(?:\.\d{2})?/)?.[0]; // Update the regular expression to handle commas
      }

      return firstPrice || cleanPrice;
    }
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

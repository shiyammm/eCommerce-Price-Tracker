'use client';

import { scrapeProductAmazon } from '../scrapeProduct';

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    const scrapeProduct = await scrapeProductAmazon(productUrl);
  } catch (error: any) {
    throw new Error(
      `Failed to create/update scrape product : ${error.message}`,
    );
  }
}

'use server';
import { connectToDB } from '../mongoose';
import { scrapeProductAmazon } from '../scrapeProduct';

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDB();
    const scrapedProduct = await scrapeProductAmazon(productUrl);

    if (!scrapedProduct) return;
  } catch (error: any) {
    throw new Error(
      `Failed to create/update scrape product : ${error.message}`,
    );
  }
}

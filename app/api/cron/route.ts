import Product from '@/lib/models/product.model';
import { connectToDB } from '@/lib/mongoose';
import { generateEmailBody, sendEmail } from '@/lib/nodemailer';
import { scrapeProductAmazon } from '@/lib/scrapeProduct';
import {
  getAveragePrice,
  getEmailNotifType,
  getHighestPrice,
  getLowestPrice,
} from '@/lib/scraperUtils';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    connectToDB();

    const products = await Product.find({});

    if (!products) throw new Error('Product not found');

    // 1. Scrape latest product and update DB
    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        const scrapedProduct = await scrapeProductAmazon(currentProduct.url);

        if (!scrapedProduct) throw new Error('No product found');

        const updatedPriceHistory: any = [
          ...currentProduct.priceHistory,
          { price: scrapedProduct.currentPrice },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };

        const updatedProduct = await Product.findOneAndUpdate(
          { url: scrapedProduct.url },
          product,
        );

        // 2. Check each product status and send email accordingly

        const emailNotifType = getEmailNotifType(
          scrapedProduct,
          currentProduct,
        );

        if (emailNotifType && updatedProduct.users.length > 0) {
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          };
          // Construct emailContent
          const emailContent = await generateEmailBody(
            productInfo,
            emailNotifType,
          );
          // Get array of user emails
          const userEmails = updatedProduct.users.map(
            (user: any) => user.email,
          );
          // Send email notification
          await sendEmail(emailContent, userEmails);
        }

        return updatedProduct;
      }),
    );

    return NextResponse.json({
      message: 'Ok',
      data: updatedProducts,
    });
  } catch (error) {}
}

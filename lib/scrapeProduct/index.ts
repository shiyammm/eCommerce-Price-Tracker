'use server';

import axios from 'axios';
import * as cheerio from 'cheerio';
import {
  extractPrice,
  extractCurrencySymbol,
  extractDiscountPercentage,
  extractDescription,
  extractCategory,
} from '../scraperUtils';

export async function scrapeProductAmazon(url: string) {
  if (!url) return;

  // Bright Date implementation

  //curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_fe7fbf5a-zone-pricewhiz:sp5da5607lxt -k "http://lumtest.com/myip.json"

  const username = String(process.env.BRIGHT_DATE_USERNAME);
  const password = String(process.env.BRIGHT_DATE_PASSWORD);
  const port = 22225;
  const session_id = (10000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  };

  try {
    // Fetch product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    //Extracting each information
    const title = $('#productTitle').text().trim();
    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
    );

    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price'),
    );

    const outOfStock =
      $('#availability span').text().trim().toLowerCase() ===
      'currently unavailable';

    const images =
      $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}';

    const imageUrls = Object.keys(JSON.parse(images));

    const currencySymbol = extractCurrencySymbol($('.a-price-symbol'));

    const discountPercentage = extractDiscountPercentage(
      $('.savingsPercentage'),
    );

    const description = extractDescription($);

    const categoryAlt = $('span.nav-a-content img.nav-categ-image');

    // Extract the alt attribute from the img element
    const altText = categoryAlt.attr('alt') || '';

    const category = extractCategory(altText);

    const rating =
      $('i.cm-cr-review-stars span.a-icon-alt').text().trim() || '';

    // Will add review count, stars,etc...

    const data = {
      url,
      currency: currencySymbol || '',
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: discountPercentage,
      category: category,
      rating: rating,
      reviewsCount: 100,
      stars: 4.5,
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };

    return data;
  } catch (error: any) {
    throw new Error(`Failed to scrape product : ${error.message}`);
  }
}

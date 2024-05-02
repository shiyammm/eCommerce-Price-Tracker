'use server';

import axios from 'axios';
import * as cheerio from 'cheerio';
import extractPrice from '../scraperUtils';

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
      $('.a-price-whole'),
      $('.priceTopay span.a-price-whole'),
      $('a.size.base.a-color-price'),
      $('.a.button-selected .a-color-base'),
      $('.a-price.a-text-price'),
    );

    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-price a-text-price .a-offscreen'),
      $('.a-size-base.a-color-price'),
    );

    console.log({ title, currentPrice, originalPrice });
  } catch (error: any) {
    throw new Error(`Failed to scrape product : ${error.message}`);
  }
}

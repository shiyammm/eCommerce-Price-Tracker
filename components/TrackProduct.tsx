'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { scrapeAndStoreProduct } from '@/lib/actions';
import { FormEvent, useState } from 'react';

export function TrackProduct() {
  // State to hold the user input for the Amazon URL
  const [searchPrompt, setSearchPrompt] = useState('');

  // State to manage the loading state of the form submission
  const [isLoading, setIsLoading] = useState(false);

  // Function to validate the Amazon URL
  const isValidAmazonLink = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;

      // Check if the hostname contains "amazon" indicating it's an Amazon URL
      if (
        hostname.includes('amazon') ||
        hostname.includes('amazon.com') ||
        hostname.includes('amazon.') ||
        hostname.includes('amazon.in')
      ) {
        return true;
      }
    } catch (error) {
      // Return false if there's an error parsing the URL
      return false;
    }
    return false;
  };

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate the input URL
    const isValidLink = isValidAmazonLink(searchPrompt);
    if (!isValidLink) {
      // Alert the user if the URL is not valid
      return alert('Please enter a valid Amazon URL');
    }

    // Start the loading state
    try {
      setIsLoading(true);

      // scrapeProduct
      const productScraping = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      // Stop the loading state
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex w-full max-w-sm items-center space-x-2"
      onSubmit={handleSubmit}
    >
      <Input
        type="search"
        placeholder="Enter Product Link"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
      />
      <Button type="submit" disabled={searchPrompt === ''}>
        {isLoading ? 'Loading' : 'Search'}
      </Button>
    </form>
  );
}

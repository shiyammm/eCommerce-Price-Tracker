import React from 'react';
import { TrackProduct } from './TrackProduct';

const HeroSection = () => {
  return (
    <section>
      <h1>Welcome to Smart Shopping!</h1>
      <h1>Discover unbeatable deals with PriceWhiz</h1>
      <p>
        Track your favorite products and get notified when prices drop. Shop
        smarter, save more!
      </p>
      <TrackProduct />
    </section>
  );
};

export default HeroSection;

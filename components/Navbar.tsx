import React from 'react';
import { ModeToggle } from '@/components/ui/Theme';

const Navbar = () => {
  const NavLinks = ['Home', 'Search', 'Favorites', 'Cart'];

  return (
    <header>
      <nav>
        <h1>PriceWhiz</h1>
      </nav>
      {NavLinks.map((link) => (
        <ul key={link}>
          <li>{link}</li>
        </ul>
      ))}
      <div>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Navbar;

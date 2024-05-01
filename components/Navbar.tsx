import React from 'react';

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
    </header>
  );
};

export default Navbar;

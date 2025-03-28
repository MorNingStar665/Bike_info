import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './NavBar.css';

const Navbar = ({ onSearch, onLogoClick }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');

  const handleSearch = () => {
    onSearch({ make, model });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogoClick = () => {
    // Reset inputs and trigger logo click handler
    setMake('');
    setModel('');
    onLogoClick();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-branding" onClick={handleLogoClick}>
          <h1 className="brand-title">Motorheads</h1>
          <img 
            className="logo" 
            src="src/assets/vintage-chopper-motorcycle-side-view-template.png" 
            alt="Bike App Logo" 
          />
        </div>

        <div className="search-container">
          <div className="search-wrapper">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Make"
                className="search-input make-input"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <input
                type="text"
                placeholder="Model"
                className="search-input model-input"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <button 
              className="search-button"
              onClick={handleSearch}
            >
              <Search className="search-icon" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
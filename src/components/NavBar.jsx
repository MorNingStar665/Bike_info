import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './NavBar.css';
import '../assets/vintage-chopper-motorcycle-side-view-template.png'

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
            src="https://img.freepik.com/free-vector/vintage-chopper-motorcycle-side-view-template_225004-1242.jpg?t=st=1743143755~exp=1743147355~hmac=ca9ad12e45efb299f3711a5193929a25ade5374c936f97e696af8c54a185726e&w=1380" 
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
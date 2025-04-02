import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/NavBar'; 
import BikePerformanceRadar from "./components/BikeRadar";
import BikePerformanceBarChart from "./components/BikeBarChart";
import BikeSpecsCard from "./components/BikeSpec";
import BikeDetailsTable from "./components/BikeDetails";

function App() {
  const [searchParams, setSearchParams] = useState({
    make: '',
    model: ''
  });
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [bikeData, setBikeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchBikeData = async (make, model) => {
    setLoading(true);
    setError(null);
    setNotFound(false);

    try {
      const normalizedMake = make.toLowerCase().trim();
      const normalizedModel = model.toLowerCase().trim().replace(/\s+/g, '-');

      const response = await fetch(`https://scraper-zfn4.onrender.com/vehicle-specs?make=${normalizedMake}&model=${normalizedModel}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();

      // Check if the data is sufficient
      if (!data || 
          !data.make || 
          !data.model || 
          ((!data.specifications || Object.keys(data.specifications).length === 0) && 
           (!data.comparison_bikes || data.comparison_bikes.length === 0))) {
        setNotFound(true);
        return;
      }

      setBikeData(data);
      setIsSearchPerformed(true);
    } catch (err) {
      console.error('Detailed fetch error:', err);
      setError(`Failed to fetch bike data: ${err.message}`);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (params) => {
    const { make, model } = params;
    setSearchParams(params);
    fetchBikeData(make, model);
  };

  const handleLogoClick = () => {
    setSearchParams({ make: '', model: '' });
    setIsSearchPerformed(false);
    setBikeData(null);
    setError(null);
    setNotFound(false);
  };

  return (
    <div className={`app-container ${isSearchPerformed ? 'search-active' : 'centered-mode'}`}>
      <Navbar 
        onSearch={handleSearch} 
        onLogoClick={handleLogoClick}
      />
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {loading && (
        <div className="loading-container">
          <div className="loading">Loading bike details...</div>
        </div>
      )}
      
      {notFound && (
        <div className="not-found-message">
          <h2>Bike Not Found</h2>
          <p>Sorry, we couldn't find details for the bike you searched.</p>
          <p>Please try another make or model.</p>
        </div>
      )}
      
      {isSearchPerformed && bikeData && !loading && !notFound ? (
        <>
          <div className="bike-image-highlights">
            <BikeSpecsCard bikeData={bikeData} />
          </div>
          <div className="performance-charts">
            <div className="radar-chart">
              <BikePerformanceRadar bikeData={bikeData} />
            </div>
            <div className="bar-chart">
              <BikePerformanceBarChart bikeData={bikeData} />
            </div>
          </div>
          
          <div className="vehicle-details">
            <BikeDetailsTable bikeData={bikeData} />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;
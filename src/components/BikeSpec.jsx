import React from 'react';
import './BikeSpec.css';

const BikeSpecsCard = ({ bikeData }) => {
  // Transform scraped data into the component's expected format
  const transformedData = {
    bike_specifications: {
      model: `${bikeData.make} ${bikeData.model}`,
      image_url: bikeData.image_url,
      specifications: [
        { category: 'Price', details: bikeData.price || 'Not Available' },
        { category: 'Engine Capacity', details: bikeData.specifications['Engine Capacity'] || bikeData.specifications['Displacement'] || 'Not Available' },
        { category: 'Max Power', details: bikeData.specifications['Max Power'] || 'Not Available' },
        { category: 'Max Torque', details: bikeData.specifications['Max Torque'] || 'Not Available' },
        { category: 'Transmission', details: bikeData.specifications['Transmission'] || 'Not Available' },
        { category: 'Fuel Type', details: bikeData.specifications['Fuel Type'] || 'Not Available' },
        { category: 'Cooling System', details: bikeData.specifications['Cooling System'] || 'Not Available' },
        { category: 'Braking System', details: bikeData.specifications['Braking System'] || 'Not Available' },
        { category: 'Seat Height', details: bikeData.specifications['Seat Height'] || 'Not Available' },
        { category: 'Kerb Weight', details: bikeData.specifications['Kerb Weight'] || 'Not Available' },
        { category: 'Fuel Tank Capacity', details: bikeData.specifications['Fuel Tank Capacity'] || 'Not Available' },
        { category: 'Mileage', details: bikeData.specifications['Mileage'] || bikeData.specifications['Mileage - Owner Reported'] || 'Not Available' }
      ]
    }
  };

  return (
    <div className="bike-specs-container">
      <div className="bike-specs-card">
        <div className="bike-image-container">
          <img 
            src={transformedData.bike_specifications.image_url} 
            alt={transformedData.bike_specifications.model} 
            className="bike-image"
          />
        </div>
        <div className="bike-specs-wrapper">
          <h2 className="bike-model">{transformedData.bike_specifications.model}</h2>
          <table className="specs-table">
            <tbody>
              {transformedData.bike_specifications.specifications.map((spec, index) => (
                <tr key={index}>
                  <td className="spec-category">{spec.category}</td>
                  <td className="spec-details">{spec.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BikeSpecsCard;
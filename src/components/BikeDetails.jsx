import React from 'react';
import '../styles/BikeDetails.css';

const BikeDetailsTable = ({ bikeData }) => {
  // Prepare specifications with fallback and error handling
  const specifications = [
    {
      name: "Price",
      value: bikeData.price || 'Not Available'
    },
    {
      name: "Engine Type",
      value: bikeData.specifications['Cooling System'] && bikeData.specifications['Cylinders']
        ? `${bikeData.specifications['Cooling System']}, ${bikeData.specifications['Cylinders']} Cylinders`
        : 'Not Available'
    },
    {
      name: "Displacement",
      value: bikeData.specifications['Engine Capacity'] || bikeData.specifications['Displacement'] || 'Not Available'
    },
    {
      name: "Max Power",
      value: bikeData.specifications['Max Power'] || 'Not Available'
    },
    {
      name: "Max Torque",
      value: bikeData.specifications['Max Torque'] || 'Not Available'
    },
    {
      name: "Transmission",
      value: bikeData.specifications['Transmission'] || 'Not Available'
    },
    {
      name: "Fuel Tank Capacity",
      value: bikeData.specifications['Fuel Tank Capacity'] || 'Not Available'
    },
    {
      name: "Mileage",
      value: bikeData.specifications['Mileage - ARAI'] || bikeData.specifications['Mileage'] || 'Not Available'
    },
    {
      name: "Kerb Weight",
      value: bikeData.specifications['Kerb Weight'] || 'Not Available'
    },
    {
      name: "Seat Height",
      value: bikeData.specifications['Seat Height'] || 'Not Available'
    }
  ];

  // Prepare features with fallback and error handling
  const features = [
    {
      name: "Braking System",
      value: bikeData.specifications['Braking System'] && 
             bikeData.specifications['Front Brake Size'] && 
             bikeData.specifications['Rear Brake Size']
        ? `${bikeData.specifications['Braking System']}, Front: ${bikeData.specifications['Front Brake Size']} mm, Rear: ${bikeData.specifications['Rear Brake Size']} mm`
        : 'Not Available'
    },
    {
      name: "Suspension",
      value: bikeData.specifications['Front Suspension'] && bikeData.specifications['Rear Suspension']
        ? `Front: ${bikeData.specifications['Front Suspension']}, Rear: ${bikeData.specifications['Rear Suspension']}`
        : 'Not Available'
    },
    {
      name: "Tyre Type",
      value: bikeData.specifications['Tyre Type'] && 
             bikeData.specifications['Front Tyre Size'] && 
             bikeData.specifications['Rear Tyre Size']
        ? `${bikeData.specifications['Tyre Type']}, Front: ${bikeData.specifications['Front Tyre Size']}, Rear: ${bikeData.specifications['Rear Tyre Size']}`
        : 'Not Available'
    },
    {
      name: "Instrument Console",
      value: bikeData.specifications['Instrument Console'] || 'Not Available'
    },
    {
      name: "Lighting",
      value: bikeData.specifications['Headlight Type'] && bikeData.specifications['Brake/Tail Light']
        ? `${bikeData.specifications['Headlight Type']} Headlight, ${bikeData.specifications['Brake/Tail Light']} Brake/Tail Light`
        : 'Not Available'
    },
    {
      name: "Riding Modes",
      value: bikeData.specifications['Riding Modes'] || 'Not Available'
    },
    {
      name: "Chassis Type",
      value: bikeData.specifications['Chassis Type'] || 'Not Available'
    },
    {
      name: "Additional Features",
      value: bikeData.specifications['Additional Features'] || 'Not Available'
    },
    {
      name: "USB Charging Port",
      value: bikeData.specifications['USB Charging Port'] || 'Not Available'
    },
    {
      name: "Ground Clearance",
      value: bikeData.specifications['Ground Clearance'] || 'Not Available'
    }
  ];

  return (
    <div className="bike-details-container">
      <div className="details-grid">
        <div className="specifications-section">
          <h2>Specifications</h2>
          <table className="details-table">
            <tbody>
              {specifications.map((spec, index) => (
                <tr key={`spec-${index}`}>
                  <td className="spec-name">{spec.name}</td>
                  <td className="spec-value">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="features-section">
          <h2>Features</h2>
          <table className="details-table">
            <tbody>
              {features.map((feature, index) => (
                <tr key={`feature-${index}`}>
                  <td className="spec-name">{feature.name}</td>
                  <td className="spec-value">{feature.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BikeDetailsTable;
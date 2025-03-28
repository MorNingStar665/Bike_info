import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import '../styles/BikeRadar.css';

const BikePerformanceRadar = ({ bikeData }) => {
  // Helper function to safely parse values
  const safeParseFloat = (str, defaultValue = 0) => {
    try {
      return parseFloat(str.split('@')[0].replace(/[^\d.]/g, '')) || defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const performanceMetrics = {
    "performance_metrics": {
      "bike_model": `${bikeData.make} ${bikeData.model}`,
      "categories": [
        "Power",
        "Torque", 
        "Top Speed",
        "Fuel Efficiency",
        "Ground Clearance",
        "Engine Capacity"
      ],
      "values": [
        safeParseFloat(bikeData.specifications['Max Power'], 0),
        safeParseFloat(bikeData.specifications['Max Torque'], 0),
        safeParseFloat(bikeData.specifications['Top Speed'], 0),
        safeParseFloat(bikeData.specifications['Mileage - ARAI'] || bikeData.specifications['Mileage'], 0),
        safeParseFloat(bikeData.specifications['Ground Clearance'], 0),
        safeParseFloat(bikeData.specifications['Engine Capacity'] || bikeData.specifications['Displacement'], 0)
      ],
      "max_values": [150, 150, 250, 40, 200, 1500],
      "units": ["bhp", "Nm", "kmph", "kmpl", "mm", "cc"]
    }
  };

  // Prepare data for Recharts with safety checks
  const radarData = performanceMetrics.performance_metrics.categories.map((category, index) => {
    const value = performanceMetrics.performance_metrics.values[index];
    const maxValue = performanceMetrics.performance_metrics.max_values[index];
    return {
      subject: category,
      value: Math.min((value / maxValue) * 100, 100),
      fullMark: 100
    };
  });

  return (
    <div className="bike-performance-container">
      <div className="bike-performance-chart">
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart 
            cx="50%" 
            cy="50%" 
            outerRadius="80%" 
            data={radarData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tickFormatter={(value) => `${value}%`}
            />
            <Radar 
              name={performanceMetrics.performance_metrics.bike_model} 
              dataKey="value" 
              stroke="#6a5acd" 
              fill="#6a5acd" 
              fillOpacity={0.6} 
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BikePerformanceRadar;
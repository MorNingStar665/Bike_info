import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './BikeBarChart.css';

const BikePerformanceBarChart = ({ bikeData }) => {
  // Transform the fetched data into the performance data structure
  const performanceData = {
    "bike_performance": {
      "model": `${bikeData.make} ${bikeData.model}`,
      "metrics": [
        {
          "name": "Power Output",
          "value": parseFloat(bikeData.specifications['Max Power'].split('@')[0].replace(' bhp', '')),
          "unit": "bhp",
          "icon": "⚡",
          "description": "Maximum Horsepower"
        },
        {
          "name": "Top Speed",
          "value": parseFloat(bikeData.specifications['Top Speed'].replace(' kmph', '')),
          "unit": "kmph",
          "icon": "🏎️",
          "description": "Maximum Achievable Speed"
        },
        {
          "name": "Torque",
          "value": parseFloat(bikeData.specifications['Max Torque'].split('@')[0].replace(' Nm', '')),
          "unit": "Nm",
          "icon": "💪",
          "description": "Peak Torque Capacity"
        },
        {
          "name": "Fuel Efficiency",
          "value": parseFloat(bikeData.specifications['Mileage - ARAI']),
          "unit": "kmpl",
          "icon": "⛽",
          "description": "ARAI Certified Mileage"
        }
      ],
      "color": "#E31937"
    }
  };

  // Prepare data for the bar chart
  const chartData = performanceData.bike_performance.metrics.map(metric => ({
    name: metric.name,
    value: metric.value,
    unit: metric.unit,
    icon: metric.icon,
    description: metric.description
  }));

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip performance-bar-tooltip">
          <p className="tooltip-title">
            {data.icon} {data.name}
          </p>
          <p className="tooltip-description">{data.description}</p>
          <p className="tooltip-value">
            Value: {data.value} {data.unit}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bike-performance-container bar-chart-container">
      <div className="bike-performance-chart bar-chart-wrapper">
        <h3>{performanceData.bike_performance.model} Performance</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 20, right: 20, bottom: 20, top: 20 }}
          >
            <CartesianGrid 
              horizontal={false} 
              stroke="var(--light-purple)" 
              strokeDasharray="3 3" 
            />
            <XAxis type="number" />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              width={120}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill={performanceData.bike_performance.color} 
              name={performanceData.bike_performance.model}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BikePerformanceBarChart;
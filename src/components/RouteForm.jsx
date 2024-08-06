// src/components/RouteForm.js
import React, { useState } from 'react';
import { mapData } from '../data/mapData';
const RouteForm = ({ setOrigin, setDestination, handleFindRoute }) => {
  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');

  // Aliased display names
  const aliasMap = {
    'Panorama Pantai Boom Banyuwangi': 'Pantai Boom Marina',
    'Kawah Ijen Blue Fire Tour': 'Gunung Ijen',
    'De Djawatan Forest': 'Hujan De Djawatan',
    'Teluk Hijau': 'Pantai Teluk Hijau',
    'Trianggulasi Beach': 'Trianggulasi Beach & Savana Sadengan',
    'Gapura wisata hutan purwo': 'Taman Nasional Alas Purwo',
  };

  // Filter mapData based on "is_show" status
  const filteredLocations = Object.entries(mapData)
    .filter(([_, value]) => value.is_show && value.is_active)
    .map(([key, _]) => key);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrigin(originInput);
    setDestination(destinationInput);
    handleFindRoute();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Origin:</label>
        <select value={originInput} onChange={(e) => setOriginInput(e.target.value)}>
          <option value="" disabled>Select Origin</option>
          {filteredLocations.map((location) => (
            <option key={location} value={location}>{aliasMap[location] || location}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Destination:</label>
        <select value={destinationInput} onChange={(e) => setDestinationInput(e.target.value)}>
          <option value="" disabled>Select Destination</option>
          {filteredLocations.map((location) => (
            <option key={location} value={location}>{aliasMap[location] || location}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn">Find Route</button>
    </form>
  );
};

export default RouteForm;

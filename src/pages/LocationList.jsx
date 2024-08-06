import React, { useState } from 'react';
import { mapData } from '../data/mapData';
import '../location.css';

export const LocationList = () => {
  const [locations, setLocations] = useState({ ...mapData });

  const toggleStatus = async (location) => {
    const newStatus = !locations[location].is_active;

    // Update local state
    setLocations(prevLocations => ({
      ...prevLocations,
      [location]: {
        ...prevLocations[location],
        is_active: newStatus
      }
    }));

    // Call API to save changes
    try {
      const response = await fetch('/api/updateLocationStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location, newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      console.log(`Successfully updated ${location} status to ${newStatus}`);
    } catch (error) {
      console.error('Error saving changes:', error.message);
    }
  };

  return (
    <div className="App">
      <div className="location-table-container">
        <div className="location-table">
          <h1>Primary Locations and Status</h1>
          <table>
            <thead>
              <tr>
                <th>Primary Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(locations).map((primaryLocation) => (
                <tr key={primaryLocation}>
                  <td>{primaryLocation}</td>
                  <td className={locations[primaryLocation].is_active ?  'active' : 'inactive' }>
                    <div className='td'>
                      {locations[primaryLocation].is_active ? 'Enable' :  'Disable'}
                    </div>
                  </td>
                  <td>
                    <button onClick={() => toggleStatus(primaryLocation)}>
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LocationList;

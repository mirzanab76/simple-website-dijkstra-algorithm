// src/App.js
import React, { useState } from 'react';
import RouteForm from './components/RouteForm';
import { findShortestPath } from './utils/dijkstra';
import { mapData } from './data/mapData'; // Import mapData from the correct path
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const App = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState(null);
  const [isRouteFound, setIsRouteFound] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);

  const handleFindRoute = () => {
    if (origin && destination) {
      const shortestPath = findShortestPath(mapData, origin, destination);
      setRoute(shortestPath);
      setIsRouteFound(true);

      let distance = 0;
      for (let i = 0; i < shortestPath.length - 1; i++) {
        const source = shortestPath[i];
        const destination = shortestPath[i + 1];
        const edge = mapData[source][destination];
        distance += edge.distance;
      }
      setTotalDistance(distance.toFixed(2)); // Limiting to three decimal places
    }
  };

  const handleOpenGoogleMaps = () => {
    if (route) {
      const originPoint = route[0];
      const destinationPoint = route[route.length - 1];
      let waypoints = '';
  
      // Jika terdapat lebih dari dua titik (titik awal dan akhir saja dianggap minimal)
      if (route.length > 2) {
        waypoints = route.slice(1, -1).join('/');
      }
  
      const googleMapsUrl = `https://www.google.com/maps/dir/${originPoint}/${waypoints ? waypoints + '/' : ''}${destinationPoint}`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Dijkstra App Banyuwangi</h1>
      </div>
      <RouteForm setOrigin={setOrigin} setDestination={setDestination} handleFindRoute={handleFindRoute} />
      {isRouteFound && route && (
        <div className="route">
          <h2>Shortest Route: </h2>
          <p>
            {route.map((location, index) => (
              <span key={index}>
                {location} {index < route.length - 1 && <span> <FontAwesomeIcon icon={faArrowRight} /> </span>}
              </span>
            ))}
          </p>
          <p>Total Distance: {totalDistance} km</p>
          <button onClick={handleOpenGoogleMaps}>Open in Google Maps</button>
        </div>
      )}
    </div>
  );
};

// export default App;

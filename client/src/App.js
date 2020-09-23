import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { listLogEntries } from './API';
import './App.css';
require('dotenv').config();

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 3
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      console.log(logEntries);
      setLogEntries(logEntries);
    })();
  }, [])

  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {logEntries.map(entry => (
        <Marker
          key={entry._id}
          latitude={entry.latitude}
          longitude={entry.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div>{entry.title}</div>
        </Marker>
      ))
      }
    </ReactMapGL>
  );
}

export default App;
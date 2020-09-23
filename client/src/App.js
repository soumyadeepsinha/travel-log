import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './API';
import './App.css';
require('dotenv').config();

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 3,
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      console.log(logEntries);
      setLogEntries(logEntries);
    })();
  }, []);

  const showAddNewEntry = (e) => {
    console.log(e);
  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDbclick={showAddNewEntry}
    >
      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}
          >
            <div
              onClick={() => setShowPopup({
                [entry._id]: true,
              })}
            >
              <svg
                className="marker-pin"
                style={{
                  width: `${8 * viewport.zoom}px`,
                  height: `${8 * viewport.zoom}px`,
                }}
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          {
            showPopup[entry._id] ? (
              <Popup
                latitude={entry.latitude}
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setShowPopup({})}
                anchor="top" >
                <div className="popup">
                  <h3>{entry.title}</h3>
                  <p>{entry.comments}</p>
                  <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                  {entry.image && <img src={entry.image} alt={entry.title} />}
                </div>
              </Popup>
            ) : null
          }
        </React.Fragment>
      ))}
    </ReactMapGL>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './API';
import './App.css';
import EntryForm from './EntryForm';
require('dotenv').config();

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntry, setAddEntry] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 3,
  });

  const getEntries = async () => {
    (async () => {
      const logEntries = await listLogEntries();
      console.log(logEntries);
      setLogEntries(logEntries);
    })();
  }

  useEffect(() => {
    getEntries();
  }, []);

  const showAddNewEntry = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntry({
      latitude,
      longitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={showAddNewEntry}
    >
      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}
          >
            <div
              onClick={() =>
                setShowPopup({
                  [entry._id]: true,
                })
              }
            >
              <svg
                className="marker yellow"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }}
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path
                      d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
              anchor="top"
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>
                  Visited on: {new Date(entry.visitDate).toLocaleDateString()}
                </small>
                {entry.image && <img src={entry.image} alt={entry.title} />}
              </div>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}
      {addEntry ? (
        <React.Fragment>
          <Marker latitude={addEntry.latitude} longitude={addEntry.longitude}>
            <div>
              <svg
                className="marker red"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }}
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path
                      d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          <Popup
            latitude={addEntry.latitude}
            longitude={addEntry.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddEntry(null)}
            anchor="top"
          >
            <div className="popup">
              <EntryForm
                onClose={() => {
                  setAddEntry(null);
                  getEntries();
                }}
                location={addEntry} />
            </div>
          </Popup>
        </React.Fragment>
      ) : null}
    </ReactMapGL>
  );
};

export default App
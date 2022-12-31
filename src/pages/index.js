import React, { useState, useEffect } from "react";
import '../styles/location.css'
// import '../style.scss';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import taskData from '../data/tasks.json';
import homestayData from '../data/homestays.json';
import Navigation from '../components/Navbar';

// import mapStyles from '../mapStyles';


function Map() {
  const [selectedTask, setselectedTask] = useState(null);


  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setselectedTask(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  

  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: -27.59167956718997, lng: -48.53070394983697 }} 
      // defaultOptions={{ styles: mapStyles }}
    >
      {taskData.features.map((task) => (
        <Marker
          key={task.properties.TYPE}
          position={{
            lat: task.geometry.coordinates[0], 
            lng: task.geometry.coordinates[1]
          }}
          onClick={() => {
            setselectedTask(task);
          }}
          icon={{
            url: `/pin.svg`,
            scaledSize: new window.google.maps.Size(35, 35),
          }}
          />
          ))}

      {homestayData.features.map((homestay) => (
        <Marker
          key={homestay.properties.TYPE}
          position={{
            lat: homestay.geometry.coordinates[0], 
            lng: homestay.geometry.coordinates[1]
          }}
          onClick={() => {
            setselectedTask(homestay);
          }}
          icon={{
            url: `/pin2.svg`,
            scaledSize: new window.google.maps.Size(35, 35),
          }}
          />
          ))}


      {selectedTask && (
        <InfoWindow
        onCloseClick={() => {
          setselectedTask(null);
        }}
        position={{
          lat: selectedTask.geometry.window_coordinates[0],
          lng: selectedTask.geometry.window_coordinates[1]
          }}
          >
          <div className="info-wrapper">
            <a><b>{selectedTask.properties.NAME} {selectedTask.properties.LAST_NAME}</b><br/>
            Type of request: {selectedTask.properties.TYPE}<br/>
            Description: {selectedTask.properties.DESSCRIPTION}<br/>
            Status: {selectedTask.properties.STATUS}<br/>
            <button to={"/chat"}>Message</button>   
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));


export default function Location() {

  const accessKey = process.env.REACT_APP_GOOGLE_KEY; 
  console.log(accessKey)

  return (
    <section>
    <Navigation/>
    <div className="map-position">
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${accessKey}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%`, borderRadius: `10px` }} />}
      />
    </div>
    </section>
  );
}
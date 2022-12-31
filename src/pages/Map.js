import React, { useState, useEffect } from "react";
import '../styles/location.css'
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import { useDispatch, useSelector } from "react-redux";
import { getCommunityFormApiData, allVolunteerData } from "../features/communityFormApiSlice";
import Navigation from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { fetchCurrentVolunteerData } from "../features/chatsApiSlice";
import { loggedInUserData, setLoggedInUser } from "../features/userSlice";
import Footer from "../components/Footer.js"
import Counter from "../components/Counter.js"


function Map() {
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const allVolunteers = useSelector(allVolunteerData)
  // const [allVolunteersData, setAllVolunteersData] = useState(allVolunteers)
  const [defaultCenter, setDefaultCenter] = useState({ lat: -27.59167956718997, lng: -48.53070394983697 })
  const loggedInUser = useSelector(loggedInUserData)

  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCommunityFormApiData())
  }, [])

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedVolunteer(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  useEffect(() => {
    let defaultLat = 0.0;
    let defaultLng = 0.0;
    if (allVolunteers) {
      allVolunteers?.map(item => {
        defaultLat = defaultLat + parseFloat(item.lat)
        defaultLng = defaultLng + parseFloat(item.lng)
      })

      setDefaultCenter({
        lat: parseFloat(defaultLat / allVolunteers?.length),
        lng: parseFloat(defaultLng / allVolunteers?.length)
      })
    }

  }, [allVolunteers])

  const moveToChatArea = async (selectedVolunteer1) => {
    const requesterId = selectedVolunteer1?.user?.id
    const communityRequestId = selectedVolunteer1?.id
    const chatId = await dispatch(fetchCurrentVolunteerData({ requesterId, communityRequestId }))
    const path = `/chatrooms/${chatId.payload.id}`
    navigate(path)
  }
  return (
    <>
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: -27.59167956718997, lng: -48.53070394983697 }}
      // defaultOptions={{ styles: mapStyles }}
      >
        {allVolunteers?.map((currentVolunteer) => (
          <>
            <Marker
              key={currentVolunteer.id}
              position={{
                lat: parseFloat(currentVolunteer?.lat),
                lng: parseFloat(currentVolunteer?.lng)
              }}
              onClick={() => {
                setSelectedVolunteer(currentVolunteer);
              }}
              icon={{
                url: currentVolunteer.request_type == "One-time task" ? `/pin.svg` : `/pin2.svg`,
                scaledSize: new window.google.maps.Size(35, 35),
              }}
            />
          </>
        ))}
        {selectedVolunteer && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedVolunteer(null);
            }}
            position={{
              lat: parseFloat(selectedVolunteer?.lat),
              lng: parseFloat(selectedVolunteer?.lng)
            }}
          >
            <div className="info-wrapper">
              <a>
                Name: {selectedVolunteer?.user?.name} <br />
                Type of request: {selectedVolunteer?.request_type}<br />
                Description: {selectedVolunteer?.description}<br />
                Status: {selectedVolunteer?.status}<br />
                {(loggedInUser.id !== selectedVolunteer?.user_id) ?
                  <button className="messageButton" onClick={() => moveToChatArea(selectedVolunteer)}>Volunteer</button> : null}
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));


export default function Location() {
  const loggedInUser = useSelector(loggedInUserData)

  const accessKey = process.env.REACT_APP_GOOGLE_KEY;
  console.log(accessKey)

  return (
    <>
      <Navigation />
      <div className="map-position">
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${accessKey}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%`, borderRadius: '5px', overflow: 'hidden', boxShadow: '10px 10px 50px grey' }} />}
          mapElement={<div style={{ height: `100%`, }} />}
        />
      </div> 
      <Counter />
      <Footer /> 
    </>
  );
}

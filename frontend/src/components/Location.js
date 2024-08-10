import React, { useEffect, useState, useContext } from "react";
import "../styles/location.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import * as GeoSearch from "leaflet-geosearch";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { LocationContext } from "../context/LocationContext";

const defaultCenter = [38.9072, -77.0369];
const defaultZoom = 13;

function Location({ selecCurrentLocation }) {
  const [position, setPosition] = useState(null);
  const { locationData, setLocationData } = useContext(LocationContext);

  function AddSearchControl() {
    const map = useMap(); // Correctly obtain the map instance

    useEffect(() => {
      const searchControl = new GeoSearch.GeoSearchControl({
        provider: new OpenStreetMapProvider(),
        style: "bar",
      });
      map.addControl(searchControl);

      // Cleanup on component unmount
      return () => map.removeControl(searchControl);
    }, [map]); // Added map to dependency array

    useEffect(() => {
      if (selecCurrentLocation) {
        const center = map.getCenter();
        handleLocationChange(center.lat, center.lng);
      }
    }, [selecCurrentLocation, map]); // Added map to dependency array

    return null;
  }

  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
      moveend() {
        const center = map.getCenter();
        console.log(`Map moved to: Latitude: ${center.lat}, Longitude: ${center.lng}`);
        // getPlaceName(center.lat, center.lng);
        // handleLocationChange(center.lat, center.lng);
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  const getPlaceName = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching place name:", error);
    }
  };

  const handleLocationChange = async (lat, lng) => {
    let data = await getPlaceName(lat, lng);
    console.log("location data", data);
    setLocationData({
      address: data?.address,
      displayName: data?.display_name,
    });
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log("Error getting geolocation", error);
        }
      );
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  return (
    <div className="map-wrapper">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <AddSearchControl />
      </MapContainer>
    </div>
  );
}

export default Location;

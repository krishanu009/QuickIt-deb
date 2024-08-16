import React, { useEffect, useState, useContext, useRef } from "react";
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

const defaultCenter = [12.971599, 77.594566];
const defaultZoom = 13;

function Location({ selecCurrentLocation,setSelectCurrentLocation, setLocationMenu }) {
  const [position, setPosition] = useState(null);
  const { locationData, setLocationData } = useContext(LocationContext);
  const mapRef = useRef(null); // Create a ref for the map

  function AddSearchControl() {
    const map = useMap();

    useEffect(() => {
      const searchControl = new GeoSearch.GeoSearchControl({
        provider: new OpenStreetMapProvider(),
        style: "bar",
      });
      map.addControl(searchControl);

      return () => map.removeControl(searchControl);
    }, [map]);

    return null;
  }

  useEffect(() => {

    console.log("location change useeffect");
    if (selecCurrentLocation === "select" && mapRef.current) {
      const center = mapRef.current.getCenter();
      handleLocationChange(center.lat, center.lng);
      
    } else if (selecCurrentLocation === "clear" && mapRef.current) {
      const specificLat = 12.971599;
      const specificLng = 77.594566;
      mapRef.current.setView([specificLat, specificLng], defaultZoom);

      handleLocationChange(specificLat, specificLng);
      
    }
    
  }, [selecCurrentLocation]);

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

  // function LocationMarker() {
  //   const map = useMapEvents({
  //     click() {
  //       map.locate();
  //     },
  //     locationfound(e) {
  //       // setPosition(e.latlng);
  //       // map.flyTo(e.latlng, map.getZoom());
  //     },
  //     moveend() {
  //       const center = map.getCenter();
  //       console.log(Map moved to: Latitude: ${center.lat}, Longitude: ${center.lng});
  //       // getPlaceName(center.lat, center.lng);
  //       // handleLocationChange(center.lat, center.lng);
  //     },
  //   });

  //   return position === null ? null : (
  //     <Marker position={position}>
  //       <Popup>You are here</Popup>
  //     </Marker>
  //   );
  // }

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition(e.latlng);
        console.log(`Clicked at: Latitude: ${lat}, Longitude: ${lng}`);
        map.flyTo(e.latlng, map.getZoom());

        // handleLocationChange(lat, lng);
      },
    });

    return position === null ? null : (
      <Marker position={position} draggable={true}>
        <Popup>
          Latitude: {position.lat}, Longitude: {position.lng}
        </Popup>
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
      lat: data?.lat,
      lon: data?.lon
    });
    setSelectCurrentLocation("default");
    setLocationMenu(false);

   
  };

 

  return (
    <div className="map-wrapper">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
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

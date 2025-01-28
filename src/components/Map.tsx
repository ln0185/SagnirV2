import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const customIcon = new L.Icon({
  iconUrl: "/marker.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const markers = [
  { id: 1, position: [63.3177774, -20.4972221], title: "Geirfuglasker" },
  { id: 2, position: [65.1841666, -13.759167], title: "Loðmundarfjörður" },
  { id: 3, position: [65.6695917, -22.607964], title: "Melstaðarkirkja" },
];

const Map = () => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );
  const router = useRouter();

  const handleStoryClick = (item: string, category: string) => {
    router.push(`/stories/${category}/${item}`);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserPosition([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[64.9631, -19.0208]}
        zoom={6}
        className="w-full h-full"
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position} icon={customIcon}>
            <Popup>
              <div onClick={() => handleStoryClick(marker.title, "category")}>
                <h2>{marker.title}</h2>
              </div>
            </Popup>
          </Marker>
        ))}
        {userPosition && (
          <Marker position={userPosition} icon={customIcon}>
            <Popup>
              <h3>Your Location</h3>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Map), { ssr: false });

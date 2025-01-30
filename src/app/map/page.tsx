"use client";

import Map from "../../components/Map";

const MapPage = () => {
  return (
    <div className="fixed inset-0">
      <div className="absolute inset-0 bottom-22">
        <Map />
      </div>
    </div>
  );
};

export default MapPage;

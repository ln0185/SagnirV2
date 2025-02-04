"use client";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../../components/Map"), {
  ssr: false,
});

const MapPage = () => {
  return (
    <div className="fixed inset-0">
      <div className="absolute inset-0 bottom-22">
        <DynamicMap />
      </div>
    </div>
  );
};

export default MapPage;

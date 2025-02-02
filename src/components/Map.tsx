import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import L from "leaflet";
import { useRouter } from "next/navigation";

const customIcon = new L.Icon({
  iconUrl: "/marker.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const geolocationIcon = L.icon({
  iconUrl: "/geolocation.svg",
  iconSize: [30, 30],
  iconAnchor: [15, 0],
});

interface MarkerData {
  id: number;
  position: [number, number];
  title: string;
  category: string;
  description: string;
}

const markers: MarkerData[] = [
  {
    id: 1,
    position: [63.3177774, -20.4972221],
    title: "Geirfuglasker",
    category: "Huldufólk",
    description:
      "Í fyrri tíð bjó prestur einn á Melstað er Ásmundur hét; hann var ríkur maður og vel metinn. Hann átti tvær dætur...",
  },
  {
    id: 2,
    position: [65.1841666, -13.759167],
    title: "Loðmundarfjörður",
    category: "Huldufólk",
    description:
      "Rík hjón voru eitt sinn á bæ í Loðmundarfirði; þau héldu tvo vinnumenn og tvær vinnukonur...",
  },
  {
    id: 3,
    position: [65.6695917, -22.607964],
    title: "Melstaðarkirkja",
    category: "Huldufólk",
    description:
      "Í fyrri tíð bjó prestur einn á Melstað er Ásmundur hét; hann var ríkur maður og vel metinn. Hann átti tvær dætur...",
  },
  {
    id: 4,
    position: [64.08799549, -16.98293665],
    title: "Skaftafell",
    category: "Tröll",
    description:
      "Í Skaftafelli er sagt að mjög lengi hafi búið sami ættleggur, en helst er getið eins manns er Einar hét...",
  },
  {
    id: 5,
    position: [64.1540458, -21.2815924],
    title: "Jórukleif",
    category: "Tröll",
    description:
      "Jórunn hét stúlka ein; hún var bóndadóttir einhvers staðar úr Sandvíkurhrepp í Flóanum; ung var hún og efnileg, en heldur þótti hún skapstór...",
  },
  {
    id: 6,
    position: [63.7153782, -19.8436617],
    title: "Eyvindarmúli",
    category: "Tröll",
    description:
      "Það var eitthvort sinn þá hann var ungur að hann var sendur til sauða upp til fjalls, en skelldi yfir níðaþoku...",
  },
  {
    id: 7,
    position: [65.110218, -13.8434718],
    title: "Rafnkelsstaðir",
    category: "Draugar",
    description:
      "Bergþór bjó á Hrakkellsstöðum (=Rafnkelsstöðum) fyri og eftir miðbik 18. aldar...",
  },
  {
    id: 8,
    position: [65.0625528, -15.1571429],
    title: "Snjóholt",
    category: "Draugar",
    description:
      "Í tíð Brynjólfs biskups Sveinssonar kom í Skálholt margt umferðarfólk meðal hvörs að var kerling ein að nafni Sezelja...",
  },
  {
    id: 9,
    position: [64.5194429, -21.9365519],
    title: "Reynisstaðarkirkja",
    category: "Draugar",
    description:
      "Um haustið 1780 sendi Halldór Bjarnason, er þá hélt Reynistaðarklaustur, son sinn tvítugan...",
  },
  {
    id: 10,
    position: [65.6579815, -20.2929826],
    title: "Húnavatnssýsla",
    category: "Helgisögur",
    description:
      "Um lok 18. aldar bjó sá bóndi í Húnavatnssýslu sem Ketill hét. Meðan kona hans var þunguð dreymdi hana að satan kæmi til sín...",
  },
  {
    id: 11,
    position: [64.1384228, -20.2621234],
    title: "Hruni",
    category: "Helgisögur",
    description:
      "Einu sinni til forna var prestur í Hruna í Árnessýslu, sem mjög var gefinn fyrir skemmtanir og gleðskap...",
  },
];

const Map = () => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );
  const router = useRouter();

  function handleStoryClick(item: string, category: string) {
    if (category === "Huldufólk") {
      category = "alfa";
    }
    if (category === "Helgisögur") {
      category = "efra";
    }
    if (category === "Draugar") {
      category = "draug";
    }
    if (category === "Tröll") {
      category = "troll";
    }
    if (item === "Geirfuglasker") {
      item = "geirfugl";
    }
    if (item === "Loðmundarfjörður") {
      item = "a-lodmfj";
    }
    if (item === "Melstaðarkirkja") {
      item = "jonas";
    }
    if (item === "Skaftafell") {
      item = "einar-sk";
    }
    if (item === "Jórukleif") {
      item = "jora";
    }
    if (item === "Eyvindarmúli") {
      item = "gudm-eyv";
    }
    if (item === "Rafnkelsstaðir") {
      item = "flugan";
    }
    if (item === "Snjóholt") {
      item = "setta2";
    }
    if (item === "Reynisstaðarkirkja") {
      item = "reynis";
    }
    if (item === "Húnavatnssýsla") {
      item = "sat-nafn";
    }
    if (item === "Hruni") {
      item = "hruna";
    }
    router.push(`/stories/${category}/${item}`);
  }

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
            <Popup className="custom-popup">
              <div
                onClick={() => handleStoryClick(marker.title, marker.category)}
                className="!bg-sagnir-100 !text-sagnir-200 !rounded-none !w-[18rem] !h-auto !shadow-none m-1 p-2"
              >
                <h2 className="!bg-sagnir-100 !text-xl !font-serifExtra p-1 m-1">
                  {marker.title}
                </h2>
                <h3 className="!bg-sagnir-100 !text-sagnir-200 !text-md !font-glare !inline-block p-1 m-1">
                  {marker.category}
                </h3>
                <p className=" !bg-sagnir-100 !text-sagnir-200 !font-glare !p-1 m-1">
                  {marker.description}
                </p>
                <button
                  className="!text-sagnir-200 !font-glare !text-sm m-1"
                  onClick={() =>
                    handleStoryClick(marker.title, marker.category)
                  }
                >
                  Read More &#8594;
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {userPosition && (
          <Marker position={userPosition} icon={geolocationIcon}>
            <Popup className="custom-popup">
              <div className="!bg-sagnir-100 !text-sagnir-200 !border-sagnir-200 !rounded-none !w-[10rem] !h-auto !p-0.5 !shadow-none">
                <h3 className="!text-sagnir-200 !text-xl text-center !font-glare !inline-block">
                  Þú ert her !
                </h3>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import L from "leaflet";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

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

const markers = [
  {
    id: 1,
    position: [63.3177774, -20.4972221] as [number, number],
    title: "Geirfuglasker",
    category: "Huldufólk",
    description:
      "Í fyrri tíð bjó prestur einn á Melstað er Ásmundur hét; hann var ríkur maður og vel metinn. Hann átti tvær dætur...",
  },
  {
    id: 2,
    position: [65.1841666, -13.759167] as [number, number],
    title: "Loðmundarfjörður",
    category: "Huldufólk",
    description:
      "Rík hjón voru eitt sinn á bæ í Loðmundarfirði; þau héldu tvo vinnumenn og tvær vinnukonur...",
  },
  {
    id: 3,
    position: [65.6695917, -22.607964] as [number, number],
    title: "Melstaðarkirkja",
    category: "Huldufólk",
    description:
      "Í fyrri tíð bjó prestur einn á Melstað er Ásmundur hét; hann var ríkur maður og vel metinn. Hann átti tvær dætur...",
  },
  {
    id: 4,
    position: [64.08799549, -16.98293665] as [number, number],
    title: "Skaftafell",
    category: "Tröll",
    description:
      "Í Skaftafelli er sagt að mjög lengi hafi búið sami ættleggur, en helst er getið eins manns er Einar hét...",
  },
  {
    id: 5,
    position: [64.1540458, -21.2815924] as [number, number],
    title: "Jórukleif",
    category: "Tröll",
    description:
      "Jórunn hét stúlka ein; hún var bóndadóttir einhvers staðar úr Sandvíkurhrepp í Flóanum; ung var hún og efnileg, en heldur þótti hún skapstór. Hún var matselja hjá föður sínum. Einhvern dag bar svo við, að hestaat var haldið skammt frá bæ Jórunnar; átti faðir hennar annan hestinn, er etja skyldi, og hafði Jórunn miklar mætur á honum. Hún var viðstödd hestaatið og fleiri konur; en er atið byrjaði, sá hún, að hestur föður hennar fór heldur halloka fyrir.",
  },
  {
    id: 6,
    position: [63.7153782, -19.8436617] as [number, number],
    title: "Eyvindarmúli",
    category: "Tröll",
    description:
      'Það var eitthvort sinn þá hann var ungur að hann var sendur til sauða upp til fjalls, en skelldi yfir níðaþoku svo hann vissi ekki hvað hann fór. Og þá hann var lengi búinn að gánga heyrði hann að kallað var og sagt: "Tökum við hann. Þá kom rödd úr annari átt sem sagði: Tökum við hann ekki.',
  },
  {
    id: 7,
    position: [65.110218, -13.8434718] as [number, number],
    title: "Rafnkelsstaðir",
    category: "Draugar",
    description:
      "Bergþór bjó á Hrakkellsstöðum (=Rafnkelsstöðum) fyri og eftir miðbik 18. aldar (lifði 1767). Hann var maður fjáður, einkum að sjávarútvegi og átti mörg skip. Það var þá siður að gjalda sjómönnum skiplag sitt í mjöli, hverjum tvo fjórðunga, eða þá annan í mjöli, en hinn í hörðum fiski, og færið skyldu þeir fá að vertíðarlokum; flestir létu þá fá stykki úr gömlu færi. Þar var með sjómönnum Bergþórs unglingspiltur úr Norðurlandi ósjóvanur.",
  },
  {
    id: 8,
    position: [65.0625528, -15.1571429] as [number, number],
    title: "Snjóholt",
    category: "Draugar",
    description:
      "Í tíð Brynjólfs biskups Sveinssonar kom í Skálholt margt umferðarfólk meðal hvörs að var kerling ein að nafni Sezelja sem vandi komur sínar þangað oftlega, og höfðu skólapiltar við hana ýmsar glettingar og var einn hvað mest fyrir þeim í þessu, að nafni Eiríkur, og dugði ei þó biskup aðvaraði hann að erta ekki kerlingu upp.",
  },
  {
    id: 9,
    position: [64.5194429, -21.9365519] as [number, number],
    title: "Reynisstaðarkirkja",
    category: "Draugar",
    description:
      "Um haustið 1780 sendi Halldór Bjarnason, er þá hélt Reynistaðarklaustur, son sinn tvítugan, er Bjarni hét, og mann með, er Jón hét og var kallaður Austmann, suður um land til fjárkaupa því fyrirfarandi ár hafði mjög fallið fé á Norðurlandi. Síðar um haustið sendi og Halldór yngri son sinn suður, er Einar hét, ellefu ára að aldri, og mann með honum, er Sigurður hét, og áttu þeir að hjálpa hinum til að reka féð norður er þeir höfðu keypt. Það er mælt að Einar hafi nauðugur farið þessa för og hafi sagt að hann mundi ekki aftur heim koma.",
  },
  {
    id: 10,
    position: [65.6579815, -20.2929826] as [number, number],
    title: "Húnavatnssýsla",
    category: "Helgisögur",
    description:
      "Um lok 18. aldar bjó sá bóndi í Húnavatnssýslu sem Ketill hét. Meðan kona hans var þunguð dreymdi hana að satan kæmi til sín og beiddi sig að láta barnið sem hún gengi með heita í höfuðið á sér. Af því það er almenn trú að það verði barninu fyrir einhverju góðu ef maður verður við tilmælum þess sem vitjar nafns til konu ætluðu hjónin að láta barnið heita Satan.",
  },
  {
    id: 11,
    position: [64.1384228, -20.2621234] as [number, number],
    title: "Hruni",
    category: "Helgisögur",
    description:
      "Einu sinni til forna var prestur í Hruna í Árnessýslu, sem mjög var gefinn fyrir skemmtanir og gleðskap. Það var ávallt vani þessa prests, þegar fólkið var komið til kirkju á jólanóttina, að hann embættaði ekki fyrri part næturinnar, heldur hafði dansferð mikla í kirkjunni með sóknarfólkinu, drykkju og spil og aðrar ósæmilegar skemmtanir langt fram á nótt. Presturinn átti gamla móður, sem Una hét; henni var mjög á móti skapi þetta athæfi sonar síns og fann oft að því við hann.",
  },
];

const Map = () => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );
  const router = useRouter();

  const handleStoryClick = (title: string, category: string) => {
    router.push(`/stories/${category}/${title}`);
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

export default dynamic(() => Promise.resolve(Map), { ssr: false });

import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

const pulseStyle = `
  @keyframes gas-pulse {
    0% { stroke-width: 4; stroke-opacity: 0.6; }
    50% { stroke-width: 12; stroke-opacity: 0.2; }
    100% { stroke-width: 4; stroke-opacity: 0.6; }
  }
  .gas-marker {
    animation: gas-pulse 2s infinite ease-in-out;
    outline: none;
  }
`;

const FitMarkers = ({ usersData }: { usersData: any[] }) => {
  const map = useMap();
  useEffect(() => {
    if (usersData?.length > 0) {
      const points = usersData
        .map((u) => {
          // Extract numbers from "Lat: 7.123, Long: 3.123"
          const c = u.address?.match(/-?\d+\.\d+/g);
          return c ? [parseFloat(c[0]), parseFloat(c[1])] : null;
        })
        .filter((c) => c !== null) as [number, number][];

      if (points.length > 0) {
        const bounds = L.latLngBounds(points);
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
      }
    }
  }, [usersData, map]);
  return null;
};

const getGasColor = (percentage: number) => {
  if (percentage <= 20) return "#ff3b3b"; // Vivid Red
  if (percentage <= 50) return "#ffcc00"; // Vivid Yellow
  return "#00f2fe";                       // Cyber Blue/Green
};

const DistributorMap = ({ usersData }: { usersData: any[] }) => {
  // Default to Nigeria/Ibadan area so we don't see the whole of Africa
  const defaultCenter: [number, number] = [7.3775, 3.9470];

  return (
    <div className="h-[500px] w-full rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl relative bg-[#0f1115]">
      <style>{pulseStyle}</style>
      <MapContainer 
        center={defaultCenter} 
        zoom={12} 
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; CARTO'
        />

        <FitMarkers usersData={usersData} />

        {usersData.map((user) => {
          // 1. Safety check for coordinates
          const coords = user.address?.match(/-?\d+\.\d+/g);
          if (!coords || coords.length < 2) return null;

          const position: [number, number] = [parseFloat(coords[0]), parseFloat(coords[1])];
          
          // 2. Safety check for gas level field name
          const currentLevel = user.gasLevel ?? user.level ?? 0;
          const color = getGasColor(currentLevel);

          return (
            <CircleMarker
              key={user.id}
              center={position}
              radius={8}
              className="gas-marker"
              pathOptions={{
                fillColor: color,
                color: color,
                fillOpacity: 0.9,
                weight: 4,
              }}
            >
              <Popup>
                <div className="p-1 font-body">
                  <p className="font-bold text-xs text-gray-800">{user.fullName}</p>
                  <p className="text-lg font-black" style={{ color }}>{currentLevel}%</p>
                  <p className="text-[10px] text-gray-400">Status: {currentLevel <= 20 ? 'CRITICAL' : 'OK'}</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default DistributorMap;
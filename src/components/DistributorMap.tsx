import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

const pulseStyle = `
  @keyframes gas-pulse {
    0% { stroke-width: 2; stroke-opacity: 1; stroke: #ff3b3b; fill: #ff3b3b; }
    50% { stroke-width: 30; stroke-opacity: 0; stroke: #ff3b3b; fill: #ff3b3b; }
    100% { stroke-width: 2; stroke-opacity: 1; stroke: #ff3b3b; fill: #ff3b3b; }
  }
  .critical-pulse {
    animation: gas-pulse 1.2s infinite ease-in-out !important;
    stroke: #ff3b3b !important;
    fill: #ff3b3b !important;
  }
`;

const FitMarkers = ({ usersData }: { usersData: any[] }) => {
  const map = useMap();
  useEffect(() => {
    if (usersData?.length > 0) {
      const points = usersData
        .map((u) => {
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

const DistributorMap = ({ usersData }: { usersData: any[] }) => {
  const defaultCenter: [number, number] = [7.3775, 3.9470];

  return (
    <div className="w-full h-full min-h-full relative overflow-hidden">
      <style>{pulseStyle}</style>
      <MapContainer 
        center={defaultCenter} 
        zoom={12} 
        zoomControl={false}
        style={{ height: '100%', width: '100%', position: 'absolute' }}
        className="h-full w-full"
      >
        <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; CARTO'
        />

        <FitMarkers usersData={usersData} />

        {usersData.map((user) => {
          // 1. EXTRACT COORDINATES
          const coords = user.address?.match(/-?\d+\.\d+/g);
          
          // If no coordinates, we can't draw the beep!
          if (!coords || coords.length < 2) return null;

          const position: [number, number] = [parseFloat(coords[0]), parseFloat(coords[1])];
          
          // 2. FORCE LEVEL TO NUMBER
          const level = Number(user.gasLevel ?? 0);
          const isCritical = level <= 20;
          
          // 3. ASSIGN COLOR
          const color = isCritical ? "#ff3b3b" : level <= 50 ? "#ffcc00" : "#00f2fe";

          return (
            <CircleMarker
              key={user.id}
              center={position}
              radius={isCritical ? 12 : 7}
              className={isCritical ? "critical-pulse" : ""}
              pathOptions={{
                fillColor: color,
                color: color,
                fillOpacity: 0.9,
                weight: isCritical ? 6 : 1,
              }}
            >
              <Popup>
                <div className="p-1 text-center font-sans">
                  <p className="font-bold text-xs text-gray-800">{user.fullName}</p>
                  <p className="text-xl font-black" style={{ color }}>{level}%</p>
                  {isCritical && <p className="text-[10px] font-black text-red-600 uppercase">Emergency</p>}
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
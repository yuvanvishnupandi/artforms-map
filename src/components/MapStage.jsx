import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { categories } from '../data';

// Helper to update map view
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function MapStage({ traditions, activeTradition, onPopupClose, openWiki }) {
  return (
    <section className="map-stage" aria-label="Interactive map of traditional Indian art forms">
      <MapContainer 
        center={[22.5, 80]} 
        zoom={5} 
        minZoom={4} 
        zoomControl={false}
        maxBounds={[[5, 65], [38, 99]]}
        maxBoundsViscosity={0.8}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        
        {traditions.map((tradition) => {
          const color = categories[tradition.category].color;

          return (
            <CircleMarker
              key={tradition.name}
              center={tradition.coords}
              radius={9}
              color="#ffffff"
              weight={2}
              fillColor={color}
              fillOpacity={1}
              eventHandlers={{
                click: () => {
                  // Open the centered modal directly! No more clipping popups going up.
                  openWiki(tradition);
                }
              }}
              pathOptions={{ cursor: 'pointer', className: 'elegant-marker' }}
            />
          );
        })}
        
        <MapController 
          center={activeTradition ? activeTradition.coords : null} 
          zoom={activeTradition ? 7 : 5} 
        />
      </MapContainer>
    </section>
  );
}

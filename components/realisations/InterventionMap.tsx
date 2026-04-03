'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface InterventionMapProps {
  latitude: number;
  longitude: number;
  adresse?: string;
  ville: string;
}

export default function InterventionMap({ latitude, longitude, adresse, ville }: InterventionMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      dragging: true,
      zoomControl: true,
    }).setView([latitude, longitude], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const logoIcon = L.icon({
      iconUrl: '/logo-edd.png',
      iconSize: [44, 44],
      iconAnchor: [22, 44],
      popupAnchor: [0, -44],
    });

    const marker = L.marker([latitude, longitude], { icon: logoIcon }).addTo(map);
    marker.bindPopup(
      `<strong>Entreprise de Debouchage</strong><br/>${adresse || ville}`
    );

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [latitude, longitude, adresse, ville]);

  return (
    <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
      <div ref={mapRef} style={{ height: '300px', width: '100%' }} />
      {adresse && (
        <div style={{
          padding: '12px 16px',
          background: 'rgba(22, 27, 34, 0.8)',
          fontSize: '14px',
          color: 'var(--slate)',
        }}>
          Lieu d&apos;intervention : {adresse}
        </div>
      )}
    </div>
  );
}

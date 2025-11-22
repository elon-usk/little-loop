import React from "react";
import maplibregl from "maplibre-gl";
import MapLibreWorker from "maplibre-gl/dist/maplibre-gl-csp-worker.js?worker";

maplibregl.workerClass = MapLibreWorker;

import "maplibre-gl/dist/maplibre-gl.css";

// ---- YOUR MAPTILER API KEY GOES HERE ----
const MAPTILER_KEY = "xwK5OblkSp4XIE9pfl4l";

// ---- OLD SETTINGS YOU ALREADY USED ----
const MAP_CENTER = [26.1025, 44.4268]; // Bucharest
const MAP_ZOOM = 12.2;

export default function InteractiveMap({ className = "" }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: `https://api.maptiler.com/maps/positron/style.json?key=xwK5OblkSp4XIE9pfl4l`,
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      pitch: 0,
      bearing: 0,
    });

    // Navigation controls
    map.addControl(
      new maplibregl.NavigationControl({ visualizePitch: true }),
      "top-right"
    );

    const marker = new maplibregl.Marker({ color: "#E94F37" })
      .setLngLat(MAP_CENTER)
      .addTo(map);

    setTimeout(() => {
      map.resize();
    }, 200);

    return () => {
      marker.remove();
      map.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`map-frame ${className}`}
      style={{ width: "100%", height: "500px" }}
      aria-label="Harta interactivă București"
    />
  );
}

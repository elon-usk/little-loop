import React from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import mapStyle from "../data/bucharest4map.json";

const MAP_CENTER = mapStyle.center ?? [26.1025, 44.4268];
const MAP_ZOOM = mapStyle.zoom ?? 12.2;
const MAP_PITCH = typeof mapStyle.pitch === "number" ? mapStyle.pitch : undefined;
const MAP_BEARING = typeof mapStyle.bearing === "number" ? mapStyle.bearing : undefined;

export default function InteractiveMap({ className = "" }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: mapStyle,
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      pitch: MAP_PITCH,
      bearing: MAP_BEARING,
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");

    const marker = new maplibregl.Marker({ color: "#E94F37" })
      .setLngLat(MAP_CENTER)
      .addTo(map);

    return () => {
      marker.remove();
      map.remove();
    };
  }, []);

  return <div ref={containerRef} className={`map-frame ${className}`} aria-label="Harta interactiva Bucuresti" />;
}

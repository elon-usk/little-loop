import React from "react";
import maplibregl from "maplibre-gl";
import MapLibreWorker from "maplibre-gl/dist/maplibre-gl-csp-worker.js?worker";
import { PMTiles, Protocol } from "pmtiles";

maplibregl.workerClass = MapLibreWorker;
import "maplibre-gl/dist/maplibre-gl.css";
import mapStyle from "../data/bucharest4map.json";

const PMTILES_URL = "/tiles/europe_romania.pmtiles";
const MAP_CENTER = mapStyle.center ?? [26.1025, 44.4268];
const MAP_ZOOM = mapStyle.zoom ?? 12.2;
const MAP_PITCH = typeof mapStyle.pitch === "number" ? mapStyle.pitch : undefined;
const MAP_BEARING = typeof mapStyle.bearing === "number" ? mapStyle.bearing : undefined;

export default function InteractiveMap({ className = "" }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const protocol = new Protocol();
    const pmtiles = new PMTiles(PMTILES_URL);
    protocol.add(pmtiles);
    maplibregl.addProtocol("pmtiles", protocol.tile);

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: mapStyle,
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      pitch: MAP_PITCH,
      bearing: MAP_BEARING,
    });

    map.addControl(
      new maplibregl.NavigationControl({ visualizePitch: true }),
      "top-right"
    );

    const marker = new maplibregl.Marker({ color: "#E94F37" })
      .setLngLat(MAP_CENTER)
      .addTo(map);

    // 🟩 IMPORTANT FIX: Force resize after mount
    setTimeout(() => {
      map.resize();
    }, 200);

    return () => {
      marker.remove();
      map.remove();
      maplibregl.removeProtocol("pmtiles");
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`map-frame ${className}`}
      style={{ width: "100%", height: "500px" }} // 🔥 ensure visible size
      aria-label="Harta interactivă București"
    />
  );
}

import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTelemetry } from "../context/TelemetryContext";

export const MapViewer = () => {
  const { telemetry, setSelectedPoint } = useTelemetry();
  const center = [37.7749, -122.4194];

  return (
    <div style={{ height: "calc(100vh - 80px)", width: "100%", borderRadius: "8px", overflow: "hidden" }}>
      <MapContainer 
        center={center} 
        zoom={8} 
        style={{ height: "100%", width: "100%", background: "#e2e8f0" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {telemetry.map((item) => (
          <CircleMarker
            key={item.id}
            center={[item.latitude, item.longitude]}
            radius={6}
            pathOptions={{
              color: item.pm25 > 50 ? "#ef4444" : item.pm25 > 25 ? "#f59e0b" : "#10b981",
              fillColor: item.pm25 > 50 ? "#ef4444" : item.pm25 > 25 ? "#f59e0b" : "#10b981",
              fillOpacity: 0.7,
              weight: 1
            }}
            eventHandlers={{
              click: () => setSelectedPoint(item)
            }}
          >
            <Tooltip direction="top" offset={[0, -5]} opacity={0.9}>
              <span>{item.stationName} ({item.satelliteSource})</span>
            </Tooltip>
            <Popup>
              <div style={{ fontSize: "12px", lineHeight: "1.5", minWidth: "160px" }}>
                <strong style={{ fontSize: "14px" }}>{item.stationName}</strong>
                <div style={{ color: "#64748b", marginBottom: "4px" }}>ID: {item.id}</div>
                <div><strong>Source:</strong> {item.satelliteSource}</div>
                <div><strong>PM2.5:</strong> {item.pm25} µg/m³</div>
                <div><strong>CO2:</strong> {item.co2_ppm} ppm</div>
                <div><strong>Temp:</strong> {item.temperature_c} °C</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
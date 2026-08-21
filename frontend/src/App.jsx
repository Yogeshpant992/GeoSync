import React from "react";
import { TelemetryProvider, useTelemetry } from "./context/TelemetryContext";
import { MapViewer } from "./components/MapViewer";
import { SpatialSearch } from "./components/SpatialSearch";

const DashboardHeader = () => {
  const { metrics, loading } = useTelemetry();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        background: "#0f172a",
        color: "#f8fafc"
      }}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "700" }}>GeoSync Environmental GIS</h2>
        <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
          Active Nodes: {metrics.count} | Avg PM2.5: {metrics.avgPm25} µg/m³ | Avg CO2: {metrics.avgCo2} ppm
          {loading && " (Syncing...)"}
        </span>
      </div>
      <SpatialSearch />
    </header>
  );
};

export default function App() {
  return (
    <TelemetryProvider>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "sans-serif" }}>
        <DashboardHeader />
        <main style={{ flex: 1, padding: "10px", background: "#f1f5f9" }}>
          <MapViewer />
        </main>
      </div>
    </TelemetryProvider>
  );
}
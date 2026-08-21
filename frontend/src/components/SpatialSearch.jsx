import React, { useState, useEffect } from "react";
import { useTelemetry } from "../context/TelemetryContext";

export const SpatialSearch = () => {
  const { searchQuery, setSearchQuery, triggerExport, loading } = useTelemetry();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Debounce user input by 300ms to reduce unneeded state renders
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 300);
    return () => clearTimeout(handler);
  }, [localSearch, setSearchQuery]);

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <input
        type="text"
        placeholder="Filter by station, ID, or satellite source..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        style={{
          padding: "8px 14px",
          width: "320px",
          borderRadius: "6px",
          border: "1px solid #cbd5e1",
          outline: "none"
        }}
      />
      <button
        onClick={triggerExport}
        disabled={loading}
        style={{
          padding: "8px 16px",
          backgroundColor: "#0284c7",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600"
        }}
      >
        Export CSV
      </button>
    </div>
  );
};
import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from "react";
import axios from "axios";

const TelemetryContext = createContext();

// Dynamic API Base URL: Uses Vite environment variable in production, falls back to local backend
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const TelemetryProvider = ({ children }) => {
  const [telemetry, setTelemetry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Fetch telemetry records with optional search filter
  const fetchTelemetry = useCallback(async (search = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE}/api/v1/telemetry`, {
        params: { search }
      });
      setTelemetry(response.data.data || []);
    } catch (err) {
      console.error("Telemetry fetch error:", err);
      setError(err.response?.data?.message || err.message || "Failed to load telemetry data");
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync telemetry whenever the search query changes
  useEffect(() => {
    fetchTelemetry(searchQuery);
  }, [searchQuery, fetchTelemetry]);

  // Aggregate metrics calculation
  const metrics = useMemo(() => {
    if (!telemetry.length) {
      return { avgPm25: 0, avgCo2: 0, count: 0 };
    }
    const pmSum = telemetry.reduce((acc, curr) => acc + curr.pm25, 0);
    const co2Sum = telemetry.reduce((acc, curr) => acc + curr.co2_ppm, 0);
    return {
      avgPm25: (pmSum / telemetry.length).toFixed(1),
      avgCo2: (co2Sum / telemetry.length).toFixed(1),
      count: telemetry.length
    };
  }, [telemetry]);

  // Trigger server-side stream download for CSV
  const triggerExport = () => {
    const queryParam = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : "";
    window.location.href = `${API_BASE}/api/v1/telemetry/export${queryParam}`;
  };

  return (
    <TelemetryContext.Provider
      value={{
        telemetry,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        selectedPoint,
        setSelectedPoint,
        metrics,
        triggerExport,
        refetch: () => fetchTelemetry(searchQuery)
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = () => {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error("useTelemetry must be used within a TelemetryProvider");
  }
  return context;
};
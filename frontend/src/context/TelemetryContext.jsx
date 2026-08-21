import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from "react";
import axios from "axios";

const TelemetryContext = createContext();

export const TelemetryProvider = ({ children }) => {
  const [telemetry, setTelemetry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPoint, setSelectedPoint] = useState(null);

  const fetchTelemetry = useCallback(async (search = "") => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/v1/telemetry", {
        params: { search }
      });
      setTelemetry(response.data.data || []);
    } catch (err) {
      console.error("Telemetry fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTelemetry(searchQuery);
  }, [searchQuery, fetchTelemetry]);

  const metrics = useMemo(() => {
    if (!telemetry.length) return { avgPm25: 0, avgCo2: 0, count: 0 };
    const pmSum = telemetry.reduce((acc, curr) => acc + curr.pm25, 0);
    const co2Sum = telemetry.reduce((acc, curr) => acc + curr.co2_ppm, 0);
    return {
      avgPm25: (pmSum / telemetry.length).toFixed(1),
      avgCo2: (co2Sum / telemetry.length).toFixed(1),
      count: telemetry.length
    };
  }, [telemetry]);

  const triggerExport = () => {
    window.location.href = `http://localhost:5000/api/v1/telemetry/export?search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <TelemetryContext.Provider
      value={{
        telemetry,
        loading,
        searchQuery,
        setSearchQuery,
        selectedPoint,
        setSelectedPoint,
        metrics,
        triggerExport
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = () => useContext(TelemetryContext);
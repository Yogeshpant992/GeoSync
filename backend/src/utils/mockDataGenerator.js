export const generateTelemetryRecords = (count = 1200) => {
  const records = [];
  const baseLat = 37.7749;
  const baseLng = -122.4194;

  for (let i = 1; i <= count; i++) {
    records.push({
      id: `GEO-${1000 + i}`,
      stationName: `Station-${i}`,
      latitude: Number((baseLat + (Math.random() - 0.5) * 4).toFixed(5)),
      longitude: Number((baseLng + (Math.random() - 0.5) * 4).toFixed(5)),
      pm25: Number((10 + Math.random() * 85).toFixed(2)),
      co2_ppm: Number((380 + Math.random() * 120).toFixed(1)),
      temperature_c: Number((15 + Math.random() * 20).toFixed(1)),
      satelliteSource: i % 2 === 0 ? "Sentinel-5P" : "Landsat-9",
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString()
    });
  }
  return records;
};

export const inMemoryDataStore = generateTelemetryRecords();
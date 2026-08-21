import { inMemoryDataStore } from "../utils/mockDataGenerator.js";
import { streamRecordsToCsv } from "../services/export.service.js";

export const getTelemetryData = (req, res) => {
  try {
    const { minLat, maxLat, minLng, maxLng, search } = req.query;
    let results = inMemoryDataStore;

    // Spatial bounding-box filtering
    if (minLat && maxLat && minLng && maxLng) {
      results = results.filter(
        (item) =>
          item.latitude >= parseFloat(minLat) &&
          item.latitude <= parseFloat(maxLat) &&
          item.longitude >= parseFloat(minLng) &&
          item.longitude <= parseFloat(maxLng)
      );
    }

    // Fast string search
    if (search) {
      const term = search.toLowerCase();
      results = results.filter(
        (item) =>
          item.id.toLowerCase().includes(term) ||
          item.stationName.toLowerCase().includes(term) ||
          item.satelliteSource.toLowerCase().includes(term)
      );
    }

    return res.status(200).json({
      success: true,
      totalRecords: results.length,
      data: results
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const exportTelemetryCsv = (req, res) => {
  try {
    const { search } = req.query;
    let dataset = inMemoryDataStore;

    if (search) {
      const term = search.toLowerCase();
      dataset = dataset.filter(
        (item) =>
          item.id.toLowerCase().includes(term) ||
          item.stationName.toLowerCase().includes(term)
      );
    }

    streamRecordsToCsv(dataset, res);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
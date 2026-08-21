import { AsyncParser } from "json2csv";
import { Readable } from "stream";

export const streamRecordsToCsv = (records, res) => {
  const fields = [
    "id",
    "stationName",
    "latitude",
    "longitude",
    "pm25",
    "co2_ppm",
    "temperature_c",
    "satelliteSource",
    "updatedAt"
  ];

  const opts = { fields };
  const transformOpts = { objectMode: true };
  const asyncParser = new AsyncParser(opts, transformOpts);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="geosync_export.csv"');

  const recordStream = Readable.from(records);
  const parsingProcessor = asyncParser.fromInput(recordStream);

  parsingProcessor.toOutput(res);
};
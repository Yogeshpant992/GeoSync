// src/server.js
import app from "./app.js";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`GeoSync API service running on port ${PORT}`);
});
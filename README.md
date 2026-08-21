# GeoSync — Environmental GIS Dashboard

A full-stack environmental monitoring application rendering 1,000+ real-time satellite telemetry nodes with low latency using Leaflet.js, React, and Node.js stream-parsing services.

## Features
- **Spatial Telemetry Visualization**: Renders coordinate nodes colored dynamically by PM2.5 risk thresholds.
- **Fast Search & Bounding Box**: Spatial and station query filtering with debounced client state.
- **Server-Side Stream Export**: Memory-efficient CSV generation via `json2csv` pipeline directly from Node.js streams.

## Tech Stack
- **Frontend**: React 18, Vite, Leaflet, React-Leaflet
- **Backend**: Node.js, Express, json2csv, CORS

## Quick Start

### 1. Backend
```bash
cd backend
npm install
npm run dev

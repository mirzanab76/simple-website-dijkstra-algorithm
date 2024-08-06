import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to resolve the correct directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Import mapData.js
import { mapData } from '../data/mapData.js'; // Perhatikan penggunaan ekstensi .js

// Endpoint to update location status
router.post('/api/updateLocationStatus', (req, res) => {
  const { location, newStatus } = req.body;

  // Update status in mapData.js
  if (mapData.hasOwnProperty(location)) {
    mapData[location].is_active = newStatus;

    // Save the updated mapData back to the file system
    fs.writeFile(path.join(__dirname, '../data/mapData.js'), `export const mapData = ${JSON.stringify(mapData, null, 2)};`, (err) => {
      if (err) {
        console.error('Error saving changes to mapData.js:', err);
        return res.status(500).json({ success: false, message: 'Failed to save changes' });
      }
      res.json({ success: true, message: `Status for ${location} updated successfully` });
    });
  } else {
    res.status(404).json({ success: false, message: `Location ${location} not found` });
  }
});

export default router;

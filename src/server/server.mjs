import express from 'express';
import routes from './routes.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to resolve the correct directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(routes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../dist')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

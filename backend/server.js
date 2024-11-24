const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Listas predefinidas
let playlists = [
  { id: 1, name: "2000", videos: ["Video1", "Video2", "Video3"] },
  { id: 2, name: "Llista nº 3", videos: ["Video4", "Video5"] },
  { id: 3, name: "Comedia", videos: ["Video6", "Video7", "Video8"] },
];

// Rutas del API
// Obtener todas las listas
app.get('/api/playlists', (req, res) => {
  res.json(playlists);
});

// Crear una nueva lista
app.post('/api/playlists', (req, res) => {
  const newPlaylist = {
    id: playlists.length + 1,
    name: req.body.name,
    videos: req.body.videos || []
  };
  playlists.push(newPlaylist);
  res.status(201).json(newPlaylist);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
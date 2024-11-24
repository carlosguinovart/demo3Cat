const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Listas predefinidas
let playlists = [
  { id: 1, name: 'Rock', videos: ['Video1', 'Video2'] },
  { id: 2, name: 'Pop', videos: ['Video3', 'Video4'] },
  { id: 3, name: 'Jazz', videos: ['Video5', 'Video6'] },
];

// Ruta para obtener todas las playlists
app.get('/api/playlists', (req, res) => {
  res.json(playlists.map(({ id, name }) => ({ id, name }))); // Solo devuelve id y name
});

// Ruta para obtener detalles de una playlist por ID
app.get('/api/playlists/:id', (req, res) => {
  const playlistId = parseInt(req.params.id, 10);
  const playlist = playlists.find((p) => p.id === playlistId);
  if (playlist) {
    res.json(playlist);
  } else {
    res.status(404).json({ message: 'Playlist not found' });
  }
});

// Ruta para crear una nueva playlist
app.post('/api/playlists', (req, res) => {
  const newPlaylist = {
    id: playlists.length + 1, // Generar un nuevo ID
    name: req.body.name,
    videos: req.body.videos || [],
  };
  playlists.push(newPlaylist);
  res.status(201).json(newPlaylist);
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
////////// npm start ///////////////
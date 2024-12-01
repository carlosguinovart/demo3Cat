const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Listas predefinidas
let playlists = [
    {
      "id": 1,
      "name": "lista_32",
      "videos": [
        {
          "id": 1,
          "name": "Natura sàvia",
          "type": "Documental",
          "description": "Peyu, Quimi Portet y Albert Pla exploran la fauna doméstica con humor y rigor científico.",
          "link": "https://www.3cat.cat/natura-savia"
        },
        {
          "id": 2,
          "name": "Col·lapse",
          "type": "Programa de entretenimiento",
          "description": "Entrevistas profundas y divertidas con personajes nacionales e internacionales.",
          "link": "https://www.3cat.cat/collapse"
        },
        {
          "id": 3,
          "name": "Esto no es Suecia",
          "type": "Serie de comedia",
          "description": "Una mirada crítica y humorística sobre la crianza y las parejas jóvenes de hoy en día.",
          "link": "https://www.3cat.cat/esto-no-es-suecia"
        }
      ]
    },
  { id: 2, name: 'Pop', videos: ['Video3', 'Video4'] },
  { id: 3, name: 'Jazz', videos: ['Video5', 'Video6'] },
];



let availableContents = [
  {
    id: 1,
    name: 'Natura sàvia',
    type: 'Documental',
    description: 'Peyu, Quimi Portet y Albert Pla exploran la fauna doméstica con humor y rigor científico.',
    link: 'https://www.3cat.cat/natura-savia'
  },
  {
    id: 2,
    name: 'Col·lapse',
    type: 'Programa de entretenimiento',
    description: 'Entrevistas profundas y divertidas con personajes nacionales e internacionales.',
    link: 'https://www.3cat.cat/collapse'
  },
  {
    id: 3,
    name: 'Esto no es Suecia',
    type: 'Serie de comedia',
    description: 'Una mirada crítica y humorística sobre la crianza y las parejas jóvenes de hoy en día.',
    link: 'https://www.3cat.cat/esto-no-es-suecia'
  },
  {
    id: 4,
    name: 'Joc de Cartes',
    type: 'Entreteniment',
    description: 'Busquem el restaurant més destacat de la zona a partir del seu plat tradicional més emblemàtic.',
    link: 'https://www.3cat.cat/3cat/joc-de-cartes/'
  },
  // Añade más contenidos según sea necesario
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
    videos: [], // El campo videos queda vacío por defecto
  };
  playlists.push(newPlaylist);
  res.status(201).json(newPlaylist);
});

app.get('/api/available-contents', (req, res) => {
  res.json(availableContents);
});

app.post('/api/playlists/:id/add-content', (req, res) => {
  const playlistId = parseInt(req.params.id, 10);
  const content = req.body;

  const playlist = playlists.find((p) => p.id === playlistId);
  if (playlist) {
    playlist.videos.push(content);
    res.status(200).json({ message: 'Contenido añadido correctamente.' });
  } else {
    res.status(404).json({ message: 'Playlist no encontrada.' });
  }
});
app.delete('/api/playlists/:id', (req, res) => {
  const playlistId = parseInt(req.params.id, 10);
  const index = playlists.findIndex((p) => p.id === playlistId);

  if (index !== -1) {
    playlists.splice(index, 1); // Elimina la playlist del array
    res.status(200).json({ message: 'Playlist eliminada correctamente.' });
  } else {
    res.status(404).json({ message: 'Playlist no encontrada.' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



////////// npm start ///////////////
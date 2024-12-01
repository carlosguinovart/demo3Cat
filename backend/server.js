const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static('images'));

const api = 'http://localhost:3000/images/';

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
    {
      "id": 2,
      "name": "REC",
      "videos": [
        {
          id: 5,
          name: 'Rec',
          type: 'Pel.licula',
          description: 'Atrapats en un edifici en quarantena amb una multitud de zombis famolencs, una reportera de televisió i la seva càmera graven els brutals successos que presencien.',
          image: api +'/rec.png',
          link: 'https://www.3cat.cat/3cat/rec/video/6307731/'
        },
        {
          id: 6,
          name: 'Rec 2',
          type: 'Pel.licula',
          description: 'Han passat pocs minuts des que les autoritats han perdut el contacte amb les persones tancades a l`edifici en quarantena. Ningú sap exactament què passa a dins, però a fora hi regna el caos. Una unitat del grup d`intervenció de la policia entra a l`edifici per controlar la situació i determinar què passa. Tot i semblar una operació fàcil, sovint, les aparences enganyen.',
          image: api +'/rec-2.png',
          link: 'https://www.3cat.cat/3cat/rec-2/video/6311517/'
        },
        {
          id: 7,
          name: 'Rec 3',
          type: 'Pel.licula',
          description: 'El Koldo i la Clara estan a punt de casar-se envoltats de familiars i amics. Però sobre ells plana una negra ombra capaç de desencadenar una situació infernal precisament el dia de les seves noces.',
          image: api +'/rec-3.png',
          link: 'https://www.3cat.cat/3cat/rec-3-genesi/video/6307485/'
        },
        {
          id: 8,
          name: 'Rec 4',
          type: 'Pel.licula',
          description: 'Àngela Vidal, la jove reportera que va entrar a l`edifici amb els bombers, aconsegueix sortir convertint-se en l`única supervivent, però el que l`exèrcit no sap és que a dins duu una estranya infecció. Porten l`Àngela a un centre de màxima seguretat a unes quantes milles de la costa, completament aïllat i rodejat d`aigua. Un vell petrolier que ha estat condicionat per a la quarantena.',
          image: api + '/rec-4.png',
          link: 'https://www.3cat.cat/3cat/rec-4-apocalipsi/video/6307496/'
        }
      ]
    },
  { id: 3, name: 'Jazz', videos: ['Video5', 'Video6'] },
];



let availableContents = [
  {
    id: 1,
    name: 'Natura sàvia',
    type: 'Documental',
    description: 'Peyu, Quimi Portet y Albert Pla exploran la fauna doméstica con humor y rigor científico.',
    image: api + '/natura-savia.png',
    link: 'https://www.3cat.cat/natura-savia'
  },
  {
    id: 2,
    name: 'Borgen',
    type: 'Serie',
    description: 'Premiat drama polític que narra l`ascens de Birgitte Nyborg a primera ministra de Dinamarca.',
    image: api + '/borgen.png',
    link: 'https://www.3cat.cat/3cat/borgen/'
  },
  {
    id: 3,
    name: 'El Doctor Martin',
    type: 'Serie',
    description: 'En plena mudança per marxar cap a Londres, un greu accident ho canviarà tot.',
    image: api + '/el-dorcot-martin.png',
    link: 'https://www.3cat.cat/3cat/el-doctor-martin/'
  },
  {
    id: 4,
    name: 'El nou clam',
    type: 'Documental',
    description: 'El músic David Carabén té una missió: compondre el cant del 125è aniversari del Barça.',
    image: api + '/el-nou-clam.png',
    link: 'https://www.3cat.cat/3cat/el-nou-clam/'
  },
  {
    id: 5,
    name: 'Rec',
    type: 'Pel.licula',
    description: 'Atrapats en un edifici en quarantena amb una multitud de zombis famolencs, una reportera de televisió i la seva càmera graven els brutals successos que presencien.',
    image: api + '/rec.png',
    link: 'https://www.3cat.cat/3cat/rec/video/6307731/'
  },
  {
    id: 6,
    name: 'Rec 2',
    type: 'Pel.licula',
    description: 'Han passat pocs minuts des que les autoritats han perdut el contacte amb les persones tancades a l`edifici en quarantena. Ningú sap exactament què passa a dins, però a fora hi regna el caos. Una unitat del grup d`intervenció de la policia entra a l`edifici per controlar la situació i determinar què passa. Tot i semblar una operació fàcil, sovint, les aparences enganyen.',
    image: api + '/rec-2.png',
    link: 'https://www.3cat.cat/3cat/rec-2/video/6311517/'
  },
  {
    id: 7,
    name: 'Rec 3',
    type: 'Pel.licula',
    description: 'El Koldo i la Clara estan a punt de casar-se envoltats de familiars i amics. Però sobre ells plana una negra ombra capaç de desencadenar una situació infernal precisament el dia de les seves noces.',
    image: api + '/rec-3.png',
    link: 'https://www.3cat.cat/3cat/rec-3-genesi/video/6307485/'
  },
  {
    id: 8,
    name: 'Rec 4',
    type: 'Pel.licula',
    description: 'Àngela Vidal, la jove reportera que va entrar a l`edifici amb els bombers, aconsegueix sortir convertint-se en l`única supervivent, però el que l`exèrcit no sap és que a dins duu una estranya infecció. Porten l`Àngela a un centre de màxima seguretat a unes quantes milles de la costa, completament aïllat i rodejat d`aigua. Un vell petrolier que ha estat condicionat per a la quarantena.',
    image: api + '/rec-4.png',
    link: 'https://www.3cat.cat/3cat/rec-4-apocalipsi/video/6307496/'
  },
  {
    id: 9,
    name: 'L`amiga genial',
    type: 'Serie',
    description: 'L`Elena està fent la tesina a la universitat i coneix en Pietro, amb qui comença una relació.',
    image: api + '/la-amiga-genial.png',
    link: 'https://www.3cat.cat/3cat/amiga-genial/'
  },
  {
    id: 10,
    name: 'L`amiga genial',
    type: 'Serie',
    description: 'El Jay és l`ovella negra d`una família rica. En llibertat provisional i amb l`aigua al coll, aprofita el casament del seu germà per recuperar el contacte amb la família, aconseguir diners per eixugar deutes i netejar la seva imatge. Per això, decideix anar-hi amb la Daisy, una pacient de l`hospital psiquiàtric on treballa que ha viscut sempre aïllada del món.',
    image: api + '/testimo-tal-com-ets.png',
    link: 'https://www.3cat.cat/3cat/testimo-tal-com-ets/video/6194114/'
  },
  {
    id: 11,
    name: 'La Travessa',
    type: 'Entreteniment',
    description: 'El reality d`aventures més exigent de Catalunya, presentat per Laura Escanes.',
    image: api + '/la-travessa.png',
    link: 'https://www.3cat.cat/3cat/la-travessa/'
  }
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
import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
})
export class PlaylistComponent implements OnInit {
  playlists: { id: number; name: string }[] = [];
  selectedPlaylist: { id: number; name: string; videos: any[] } | null = null;
  isModalOpen: boolean = false;

  newPlaylistName: string = ''; // Nombre de la nueva lista
  newPlaylistVideos: string = ''; // Videos separados por comas

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.fetchPlaylists();
  }

  // Obtener todas las playlists
  fetchPlaylists(): void {
    this.playlistService.getPlaylists().subscribe((data) => {
      this.playlists = data;
    });
  }

  // Obtener detalles de una playlist por ID y abrir el modal
  fetchPlaylistDetails(id: number): void {
    this.playlistService.getPlaylistById(id).subscribe({
      next: (data) => {
        this.selectedPlaylist = data; // Almacena los detalles de la playlist seleccionada
        this.isModalOpen = true; // Abre el modal
      },
      error: (err) => {
        console.error('Error al obtener detalles de la playlist:', err);
        alert('Ocurrió un error al cargar los detalles de la playlist.');
      },
    });
  }
  

  deletePlaylist(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta playlist?')) {
      this.playlistService.deletePlaylist(id).subscribe({
        next: () => {
          this.playlists = this.playlists.filter((playlist) => playlist.id !== id);
          alert('Playlist eliminada correctamente.');
        },
        error: () => {
          alert('Ocurrió un error al intentar eliminar la playlist.');
        },
      });
    }
  }
  

  // Crear una nueva playlist
  addPlaylist(): void {
    if (!this.newPlaylistName.trim()) {
      alert('Por favor, ingresa un nombre para la lista.');
      return;
    }
    const videos = this.newPlaylistVideos
      .split(',')
      .map((video) => video.trim())
      .filter((video) => video);

    this.playlistService
      .addPlaylist(this.newPlaylistName, videos)
      .subscribe((newPlaylist) => {
        this.playlists.push({ id: newPlaylist.id, name: newPlaylist.name }); // Agregar a la lista visible
        this.newPlaylistName = ''; // Limpiar los campos
        this.newPlaylistVideos = '';
      });
  }

  // Cerrar el modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedPlaylist = null;
  }

  

}

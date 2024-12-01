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

  newPlaylistName: string = ''; // Nombre de la nueva playlist

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

  // Obtener detalles de una playlist por ID
  fetchPlaylistDetails(id: number): void {
    console.log('ID de la playlist solicitada:', id); // Debug para verificar el ID
    this.playlistService.getPlaylistById(id).subscribe({
      next: (data) => {
        console.log('Detalles de la playlist recibidos:', data); // Debug para verificar los datos
        this.selectedPlaylist = data; // Guarda los datos recibidos
        this.isModalOpen = true; // Abre el modal
      },
      error: (err) => {
        console.error('Error al obtener detalles de la playlist:', err);
        alert('Ocurrió un error al cargar los detalles de la playlist.');
      },
    });
  }

  // Crear una nueva playlist
  addPlaylist(): void {
    if (!this.newPlaylistName.trim()) {
      alert('Por favor, ingresa un nombre para la playlist.');
      return;
    }

    this.playlistService.addPlaylist(this.newPlaylistName, []).subscribe((newPlaylist) => {
      this.playlists.push({ id: newPlaylist.id, name: newPlaylist.name });
      this.newPlaylistName = ''; // Limpiar el campo
    });
  }

  // Cerrar el modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedPlaylist = null;
  }

  // Eliminar una playlist
  deletePlaylist(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta playlist?')) {
      this.playlistService.deletePlaylist(id).subscribe({
        next: () => {
          this.playlists = this.playlists.filter((playlist) => playlist.id !== id);
          alert('Playlist eliminada correctamente.');
        },
        error: (err) => {
          console.error('Error al eliminar la playlist:', err);
          alert('Ocurrió un error al intentar eliminar la playlist.');
        },
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
})
export class PlaylistComponent implements OnInit {
  playlists: { id: number; name: string }[] = [];
  availableContents: any[] = [];
  selectedPlaylist: { id: number; name: string; videos: any[] } | null = null;
  isModalOpen: boolean = false;

  newPlaylistName: string = ''; // Nombre de la nueva playlist
  selectedContent: any = null; // Contenido seleccionado para añadir
  selectedPlaylistId: number | null = null; // Playlist seleccionada para añadir contenido
  showPlaylistDropdown: boolean = false; // Muestra el dropdown para seleccionar playlist

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.fetchPlaylists();
    this.fetchAvailableContents();
  }

  // Obtener todas las playlists
  fetchPlaylists(): void {
    this.playlistService.getPlaylists().subscribe((data) => {
      this.playlists = data;
    });
  }

  // Obtener contenidos disponibles
  fetchAvailableContents(): void {
    this.playlistService.getAvailableContents().subscribe((data) => {
      this.availableContents = data;
    });
  }

  // Obtener detalles de una playlist por ID
  fetchPlaylistDetails(id: number): void {
    console.log('Cargando detalles de la playlist:', id); // Debug
    this.playlistService.getPlaylistById(id).subscribe({
      next: (data) => {
        console.log('Detalles recibidos:', data); // Verifica los datos
        this.selectedPlaylist = data; // Actualiza los datos de la playlist
        this.isModalOpen = true; // Abre el modal
        console.log('Estado de isModalOpen:', this.isModalOpen); // Verifica si se establece en true
      },
      error: (err) => {
        console.error('Error al cargar los detalles:', err);
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
      this.newPlaylistName = ''; // Limpia el campo
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

  // Añadir contenido a una playlist
  addToPlaylist(content: any): void {
    this.selectedContent = content; // Contenido seleccionado
    this.showPlaylistDropdown = true; // Muestra el dropdown para elegir playlist
  }

  // Confirmar la adición del contenido a la playlist
  confirmAddToPlaylist(): void {
    if (!this.selectedPlaylistId) {
      alert('Por favor, selecciona una playlist.');
      return;
    }
  
    this.playlistService
      .addContentToPlaylist(this.selectedPlaylistId, this.selectedContent)
      .subscribe({
        next: () => {
          alert('Contenido añadido correctamente a la playlist.');
          this.selectedContent = null;
          this.showPlaylistDropdown = false;
  
          // Validar que selectedPlaylistId no es null antes de llamar a fetchPlaylistDetails
          if (this.selectedPlaylistId !== null) {
            this.fetchPlaylistDetails(this.selectedPlaylistId);
          }
        },
        error: (err) => {
          console.error('Error al añadir contenido a la playlist:', err);
          alert('Ocurrió un error al añadir el contenido.');
        },
      });
  }
  
  
  

  // Cierra el modal al hacer clic fuera del contenido o al pulsar "Cancelar"
closeDropdownModal(event?: MouseEvent): void {
  if (!event || (event.target as HTMLElement).classList.contains('modal')) {
    this.showPlaylistDropdown = false;
    this.selectedPlaylistId = null;
  }
}

}

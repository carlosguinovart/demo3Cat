import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private apiUrl = 'http://localhost:3000/api/playlists';

  constructor(private http: HttpClient) {}

  // Obtener todas las playlists
  getPlaylists(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Obtener detalles de una playlist específica
  getPlaylistById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva playlist
addPlaylist(name: string, videos: string[]): Observable<any> {
  return this.http.post(this.apiUrl, { name, videos });
}

}

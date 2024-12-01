import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getPlaylists(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/playlists`);
  }

  getPlaylistById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/playlists/${id}`);
  }

  addPlaylist(name: string, videos: any[] = []): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/playlists`, { name, videos });
  }

  deletePlaylist(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/playlists/${id}`);
  }
  getAvailableContents(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/available-contents');
  }
  
  addContentToPlaylist(playlistId: number, content: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/playlists/${playlistId}/add-content`, content);
  }

  
}

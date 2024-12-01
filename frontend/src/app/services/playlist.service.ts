import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private apiUrl = 'http://localhost:3000/api/playlists';; // Cambia según tu backend

  constructor(private http: HttpClient) {}

  getPlaylists(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPlaylistById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addPlaylist(name: string, videos: string[]): Observable<any> {
    return this.http.post<any>(this.apiUrl, { name, videos });
  }
  deletePlaylist(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/playlists/${id}`);
  }

  
  
}

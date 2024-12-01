import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PlaylistComponent } from './components/playlists/playlists.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Standalone Component
import { PlaylistDialogComponent } from './components/playlist-dialog/playlist-dialog.component'; // Standalone Component
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
     // Componente raíz
    PlaylistDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
    // Declarar Standalone Component como importación
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ],
})
export class AppModule {}

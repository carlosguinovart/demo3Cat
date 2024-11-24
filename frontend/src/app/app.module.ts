import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PlaylistComponent } from './components/playlists/playlists.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Standalone Component

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
     // Componente raíz
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    // Declarar Standalone Component como importación
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ],
})
export class AppModule {}

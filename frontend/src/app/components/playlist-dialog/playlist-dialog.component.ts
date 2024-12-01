import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-playlist-dialog',
  templateUrl: './playlist-dialog.component.html',
  styleUrls: ['./playlist-dialog.component.css'],
})
export class PlaylistDialogComponent {
  @Input() playlist: { id: number; name: string; videos: any[] } | null = null;
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }
}

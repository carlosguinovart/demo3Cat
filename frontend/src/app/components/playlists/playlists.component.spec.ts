import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistComponent } from './playlists.component';

describe('PlaylistsComponent', () => {
  let component: PlaylistComponent;
  let fixture: ComponentFixture<PlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

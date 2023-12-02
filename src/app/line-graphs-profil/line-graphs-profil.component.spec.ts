import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineGraphsProfilComponent } from './line-graphs-profil.component';

describe('LineGraphsProfilComponent', () => {
  let component: LineGraphsProfilComponent;
  let fixture: ComponentFixture<LineGraphsProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineGraphsProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineGraphsProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

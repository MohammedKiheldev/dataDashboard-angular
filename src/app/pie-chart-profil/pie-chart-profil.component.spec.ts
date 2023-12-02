import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartProfilComponent } from './pie-chart-profil.component';

describe('PieChartProfilComponent', () => {
  let component: PieChartProfilComponent;
  let fixture: ComponentFixture<PieChartProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

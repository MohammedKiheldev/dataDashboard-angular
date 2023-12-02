import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedBarChartProfilComponent } from './stacked-bar-chart-profil.component';

describe('StackedBarChartProfilComponent', () => {
  let component: StackedBarChartProfilComponent;
  let fixture: ComponentFixture<StackedBarChartProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackedBarChartProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedBarChartProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

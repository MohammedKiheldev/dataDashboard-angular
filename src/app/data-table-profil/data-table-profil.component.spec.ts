import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableProfilComponent } from './data-table-profil.component';

describe('DataTableProfilComponent', () => {
  let component: DataTableProfilComponent;
  let fixture: ComponentFixture<DataTableProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

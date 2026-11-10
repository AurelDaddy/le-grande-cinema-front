import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSeanceForm } from './admin-seance-form';

describe('AdminSeanceForm', () => {
  let component: AdminSeanceForm;
  let fixture: ComponentFixture<AdminSeanceForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSeanceForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSeanceForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

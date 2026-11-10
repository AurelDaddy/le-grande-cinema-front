import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminFilmForm } from './admin-film-form';

describe('AdminFilmForm', () => {
  let component: AdminFilmForm;
  let fixture: ComponentFixture<AdminFilmForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFilmForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFilmForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

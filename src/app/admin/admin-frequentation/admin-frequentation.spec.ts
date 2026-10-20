import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminFrequentation } from './admin-frequentation';

describe('AdminFrequentation', () => {
  let component: AdminFrequentation;
  let fixture: ComponentFixture<AdminFrequentation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFrequentation],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFrequentation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

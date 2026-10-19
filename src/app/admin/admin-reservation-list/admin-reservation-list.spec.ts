import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminReservationList } from './admin-reservation-list';

describe('AdminReservationList', () => {
  let component: AdminReservationList;
  let fixture: ComponentFixture<AdminReservationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReservationList],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminReservationList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

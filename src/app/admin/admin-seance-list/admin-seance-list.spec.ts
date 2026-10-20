import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSeanceList } from './admin-seance-list';

describe('AdminSeanceList', () => {
  let component: AdminSeanceList;
  let fixture: ComponentFixture<AdminSeanceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSeanceList],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSeanceList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BilletDetail } from './billet-detail';

describe('BilletDetail', () => {
  let component: BilletDetail;
  let fixture: ComponentFixture<BilletDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilletDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(BilletDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

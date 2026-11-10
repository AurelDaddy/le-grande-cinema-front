import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BilletList } from './billet-list';

describe('BilletList', () => {
  let component: BilletList;
  let fixture: ComponentFixture<BilletList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilletList],
    }).compileComponents();

    fixture = TestBed.createComponent(BilletList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

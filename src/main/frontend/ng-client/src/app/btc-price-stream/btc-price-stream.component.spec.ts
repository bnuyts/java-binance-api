import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtcPriceStreamComponent } from './btc-price-stream.component';

describe('BtcPriceStreamComponent', () => {
  let component: BtcPriceStreamComponent;
  let fixture: ComponentFixture<BtcPriceStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtcPriceStreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtcPriceStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

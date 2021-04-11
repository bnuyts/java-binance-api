import { Component, OnInit, ViewChild } from '@angular/core';
import { BtcPriceStreamComponent } from '../btc-price-stream/btc-price-stream.component';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @ViewChild(BtcPriceStreamComponent)
  public priceStream!: BtcPriceStreamComponent;

  @ViewChild(ChartComponent)
  public chart!: ChartComponent;

  constructor() {}

  ngOnInit(): void {}
}

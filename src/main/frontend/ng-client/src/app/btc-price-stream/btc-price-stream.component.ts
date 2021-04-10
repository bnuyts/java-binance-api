import { Component, OnDestroy, OnInit } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface TickerMessage {
  price: string;
  symbol: string;
}

const asTickerMessage = (message: string): TickerMessage => JSON.parse(message);

@Component({
  templateUrl: './btc-price-stream.component.html',
  styleUrls: ['./btc-price-stream.component.scss'],
})
export class BtcPriceStreamComponent implements OnInit, OnDestroy {
  public price: string = '';
  public symbol: string = 'symbol';

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private rxStompService: RxStompService) {}

  ngOnInit(): void {
    this.rxStompService
      .watch('/topic/price')
      .pipe(takeUntil(this.destroyed$))
      .subscribe((message: Message) => {
        const { price, symbol } = asTickerMessage(message.body);
        this.price = price;
        this.symbol = symbol;
      });

    this.rxStompService.publish({
      destination: '/app/ticker',
      body: JSON.stringify({ symbol: 'btcusdt' }),
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

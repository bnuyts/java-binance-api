import { Component, OnDestroy, OnInit } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { asTickerMessage } from '../util';

@Component({
  selector: 'app-price-stream',
  templateUrl: './btc-price-stream.component.html',
  styleUrls: ['./btc-price-stream.component.scss'],
})
export class BtcPriceStreamComponent implements OnInit, OnDestroy {
  private priceSubject$ = new BehaviorSubject<string>('');
  public price$ = this.priceSubject$.asObservable();

  private symbolSubject$ = new BehaviorSubject<string>('symbol');
  public symbol$ = this.symbolSubject$.asObservable();

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private rxStompService: RxStompService) {}

  ngOnInit(): void {
    this.rxStompService
      .watch('/topic/price')
      .pipe(takeUntil(this.destroyed$))
      .subscribe((message: Message) => {
        const { price, symbol } = asTickerMessage(message.body);
        this.priceSubject$.next(price);
        this.symbolSubject$.next(symbol);
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

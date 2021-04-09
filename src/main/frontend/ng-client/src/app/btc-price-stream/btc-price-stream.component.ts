import { Component, OnInit } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';

interface TickerMessage {
  price: string;
  symbol: string;
}

const asTickerMessage = (message: string): TickerMessage => JSON.parse(message);

@Component({
  templateUrl: './btc-price-stream.component.html',
  styleUrls: ['./btc-price-stream.component.scss']
})
export class BtcPriceStreamComponent implements OnInit {

  public priceFeed: string[] = [];
  public symbol: string = 'symbol';

  constructor(private rxStompService: RxStompService) { }

  ngOnInit(): void {
    this.rxStompService.watch('/topic/price').subscribe((message: Message) => {
      const tickerMessage = asTickerMessage(message.body);
      this.symbol = tickerMessage.symbol;

      const length = this.priceFeed.unshift(tickerMessage.price);
      this.priceFeed = length > 20 ? this.priceFeed.slice(0, 20) : this.priceFeed;
    });

    this.rxStompService.publish({destination: '/app/ticker', body: JSON.stringify({symbol: 'btcusdt'})});
  }

}

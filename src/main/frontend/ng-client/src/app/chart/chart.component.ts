import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import {
  CategoryScale,
  Chart,
  ChartConfiguration,
  ChartTypeRegistry,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
} from 'chart.js';
import { interval, ReplaySubject } from 'rxjs';
import { takeUntil, tap, throttle } from 'rxjs/operators';
import { EMA } from 'trading-signals';

import { asTickerMessage } from '../util';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title
);

const secondsToPlot = 30;
const labels = [...Array(secondsToPlot).keys()].map((k) => k.toString());
const data = {
  labels,
  datasets: [
    {
      label: 'Price',
      backgroundColor: 'rgb(0, 0, 0)',
      borderColor: 'rgb(50, 50, 50)',
      data: [],
    },
    {
      label: 'EMA',
      backgroundColor: 'rgb(100, 0, 0)',
      borderColor: 'rgb(200, 0, 0)',
      data: [],
    },
  ],
};

const config: ChartConfiguration<keyof ChartTypeRegistry, number[], string> = {
  type: 'line',
  data,
  options: {
    animation: false,
    aspectRatio: 4,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: `${secondsToPlot} seconds rolling plotted`,
      },
    },
    scales: {
      y: {
        position: 'left',
      },
    },
  },
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  @ViewChild('chart', { static: true })
  public chart!: ElementRef;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  private ema = new EMA(secondsToPlot);

  constructor(private rxStompService: RxStompService) {}

  ngOnInit(): void {
    const chart = new Chart(this.chart.nativeElement.getContext('2d'), config);

    this.rxStompService
      .watch('/topic/price')
      .pipe(
        takeUntil(this.destroyed$),
        throttle(() => interval(1000)),
        tap((message: Message) => {
          const { price } = asTickerMessage(message.body);
          const priceAsNumber = Number(price.replace(',', ''));
  
          let priceData = chart.data.datasets[0].data;
          priceData = this.updateArray(priceData, priceAsNumber);
  
          this.ema.update(priceAsNumber);
        }),
        tap(() => {
          if (this.ema.isStable) {
            let emaData = chart.data.datasets[1].data;
            emaData = this.updateArray(emaData, this.ema.getResult().toNumber());
          }
        }),
      )
      .subscribe(() => {
        chart.update();
      });
  }

  private updateArray(dataArray: number[], value: number) {
    dataArray.push(value);
    if (dataArray.length > secondsToPlot) {
      dataArray = dataArray.splice(0, dataArray.length - secondsToPlot);
    }
    return dataArray;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

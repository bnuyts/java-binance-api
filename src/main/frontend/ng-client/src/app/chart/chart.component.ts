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
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
} from 'chart.js';
import { interval, ReplaySubject } from 'rxjs';
import { takeUntil, throttle } from 'rxjs/operators';
import { asTickerMessage } from '../util';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title
);

const secondsToPlot = 30;
const labels = [...Array(secondsToPlot).keys()].map((k) => k.toString());
const data = {
  labels,
  datasets: [
    {
      label: 'Seconds',
      backgroundColor: 'rgb(0, 0, 0)',
      borderColor: 'rgb(50, 50, 50)',
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
      title: {
        display: true,
        text: `${secondsToPlot} seconds rolling plotted`,
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

  constructor(private rxStompService: RxStompService) {}

  ngOnInit(): void {
    const chart = new Chart(this.chart.nativeElement.getContext('2d'), config);

    this.rxStompService
      .watch('/topic/price')
      .pipe(
        takeUntil(this.destroyed$),
        throttle(() => interval(1000))
      )
      .subscribe((message: Message) => {
        const { price } = asTickerMessage(message.body);
        let data = chart.data.datasets[0].data;
        data.push(Number(price.replace(',', '')));
        if (data.length > secondsToPlot) {
          data = data.splice(0, data.length - secondsToPlot);
        }
        chart.update();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-grafica',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './grafica.component.html',
  styleUrl: './grafica.component.scss'
})
export class GraficaComponent {
  barChartData: ChartData<'bar', number[]> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        label: 'Series A',
      },
      {
        data: [2, 3, 20, 5, 1, 4],
        label: 'Series B',
      },
    ],
  };

  barChartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  barChartData2: ChartData<'bar', number[]> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        label: 'Series A',
      }
    ],
  };
}

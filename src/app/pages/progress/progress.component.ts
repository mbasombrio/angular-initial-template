import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IncrementadorComponent } from "../../components/incrementador/incrementador.component";

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [ReactiveFormsModule, IncrementadorComponent],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent {
  progress1 = 50;
  progress2 = 25;

  get progressPercent1() {
    return `${this.progress1}%`;
  }

  get progressPercent2() {
    return `${this.progress2}%`;
  }

  changeValue( valor: number ) {
    console.log({valor});

  }
}

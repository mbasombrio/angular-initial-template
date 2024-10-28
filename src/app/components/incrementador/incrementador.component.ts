import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-incrementador',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './incrementador.component.html',
  styleUrl: './incrementador.component.scss'
})
export class IncrementadorComponent {

  @Input() progress: number = 50;
  @Input() btnClass: string = 'btn btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  get progressPercent() {
    return `${this.progress}%`;
  }
  changeValue(valor: number) {    
    this.progress = Math.min(100, Math.max(0, this.progress + valor));
    this.valorSalida.emit(this.progress);
  }

}

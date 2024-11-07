import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CombinationService } from 'src/app/services/combination.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {


  constructor(private combinationService:CombinationService) { }

  ngOnInit(): void {
  }

  // @Input() resetInput: number | undefined;
  @Output() nChange = new EventEmitter<number>();
  @Input() lastCombinationMasage: string | undefined
  numberToCombine!: number; 

  onInput(event: Event) {
    if (this.numberToCombine >= 1 && this.numberToCombine <= 20) {
      this.nChange.emit(this.numberToCombine);
    }
  }

  resetInput() {
    this.numberToCombine = 0;
  }

  updateInput(numberToUpdate:number) {
    this.numberToCombine = numberToUpdate;
  }
}

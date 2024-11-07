import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-combination',
  templateUrl: './combination.component.html',
  styleUrls: ['./combination.component.scss']
})
export class CombinationComponent implements OnInit {

  constructor() { }

  @Input() currentIndex: number = 0;
  @Input() currentCombiation: number[] = [];
  @Input() totalCombination: number = 0;
  @Input() inputNumber: number = 0;



  ngOnInit(): void {
  }

}

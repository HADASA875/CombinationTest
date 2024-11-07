import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() reset = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() allCombinations = new EventEmitter<void>();

}

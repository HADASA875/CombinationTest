import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CombinationService } from 'src/app/services/combination.service';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  constructor(private combinationService: CombinationService, private router: Router, private changeDetectoref: ChangeDetectorRef) {
    this.title = 'combinationTest';
    this.currentCombination = [];
    this.currentIndex = 0
    this.totalCombinations = 0;
    this.inputNumber = 0;
    this.numPaging = 25;
    this.noCombinationMessage = '';
    this.massageWarning = '';
  }

  title: string;
  currentCombination: number[];
  currentIndex: number;
  totalCombinations: number;
  inputNumber: number;
  numPaging: number;
  noCombinationMessage: string;
  massageWarning: string;
  @ViewChild('input') input!: InputComponent


  ngOnInit(): void {
    if (this.combinationService.currentCombination?.length > 0)
      this.currentCombination = this.combinationService.currentCombination;
    if (this.combinationService.currentIndex > 0)
      this.currentIndex = this.combinationService.currentIndex;
    if (this.combinationService.totalCombinations > 0)
      this.totalCombinations = this.combinationService.totalCombinations;
  }

  ngAfterViewInit(): void {
    if (this.combinationService.inputNumber > 0) {
      this.inputNumber = this.combinationService.inputNumber;
      this.input.updateInput(this.combinationService.inputNumber);
      this.changeDetectoref.detectChanges();
    }
  }


  onNChange(n: number) {
    this.resetData();
    this.inputNumber = n;
    this.start();
  }

  onReset() {
    this.resetData();
    this.input.resetInput();
  }

  resetData() {
    this.inputNumber = 0;
    this.currentCombination = [];
    this.currentIndex = 0;
    this.noCombinationMessage = '';
  }

  onNext() {
    this.getNext();
  }

  getNext() {
    this.combinationService.getNextCombination(this.inputNumber, this.currentCombination)
      .subscribe(
        (response: any) => {
          if (response.lastCombination == true) {
            this.noCombinationMessage = response.message;
          }
          else {
            this.currentCombination = response.data;
          }
          this.currentIndex += 1;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
  }

  start() {
    this.combinationService.start(this.inputNumber)
      .subscribe(
        (response: any) => {
          if (response.lastCombination == true) {
            this.noCombinationMessage = response.message;
          }
          else {
            this.totalCombinations = response.data;
          }
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
  }

  getAllCombination() {
    this.combinationService.getAllCombination(this.numPaging, this.currentCombination, this.inputNumber)
      .subscribe(
        (response: any) => {
          if (response.lastCombination == true) {
            this.noCombinationMessage = response.message;
          }
          else {
            var data = response.data;
            this.currentIndex += data.length;
            this.combinationService.combinations = data;
            this.combinationService.currentCombination = data[data.length - 1];
            this.combinationService.inputNumber = this.inputNumber;
            this.combinationService.currentIndex = this.currentIndex;
            this.combinationService.totalCombinations = this.totalCombinations;
            this.router.navigateByUrl("/all-combination");
          }
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
  }


}

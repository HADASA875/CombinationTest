import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CombinationService } from 'src/app/services/combination.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor(private combinationService: CombinationService, private location: Location) { }
  combinations: number[][] = [];
  page: number = 0;
  pageSize: number = 25
  currentIndex: number = 0;
  totalCombination: number = 0;

  ngOnInit(): void {
    this.combinations = this.combinationService.combinations;
    this.page = (this.combinationService.currentIndex / this.pageSize) > 1 ? Math.floor(this.combinationService.currentIndex / this.pageSize) + 1 : Math.floor(this.combinationService.currentIndex / this.pageSize);
    this.currentIndex = this.combinationService.currentIndex;
    this.totalCombination = this.combinationService.totalCombinations;
  }

  goBack() {
    this.location.back();
  }

  nextPage() {
    this.combinationService.getAllCombination(this.pageSize, this.combinations[this.combinations.length - 1])
      .subscribe(
        (response: any) => {
          this.page += 1;
          this.currentIndex += this.combinations.length;
          this.combinations = response.data;
          this.updateCombinationInSErvice();
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
  }

  prevPage() {
    this.combinationService.GetNumPrevCombination(this.pageSize, this.combinations[0]).subscribe(
      response => {
        this.page -= 1;
        this.combinations = response.data;
        this.currentIndex -= this.combinations.length;
        this.updateCombinationInSErvice();
      }, err => {

      })
  }

  updateCombinationInSErvice() {
    this.combinationService.currentCombination = this.combinations[this.combinations.length - 1];
    this.combinationService.currentIndex = this.currentIndex;
  }

  first: number = 0;
  rows: number = 25;

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    this.GetCombinationSpecifiPage(event.page);
  }

  GetCombinationSpecifiPage(pageNumber: number) {
    this.combinationService.GetCombinationSpecifiPage(this.combinations[0].length, pageNumber, this.pageSize).subscribe(
      response => {
        debugger
        console.log(this.currentIndex == this.totalCombination);
        this.combinations = response.data;
        debugger
        const lastCombination =  (this.totalCombination % this.pageSize) == 0 ? (this.pageSize) : this.totalCombination % this.pageSize
        this.currentIndex = ((pageNumber) * (this.pageSize)) +lastCombination;
        this.page = pageNumber + 1;
        this.updateCombinationInSErvice();
      }, err => {

      })
  }
}


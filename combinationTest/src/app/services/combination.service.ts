import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CombinationService {

  constructor(private http: HttpClient) {
    this.combinations = [];
    this.currentCombination = [];
    this.inputNumber = 0;
    this.currentIndex = 0;
    this.totalCombinations = 0;
    this.apiURL = "https://localhost:44309/api/"

  }
  combinations: number[][] = [];
  currentCombination: number[] = [];
  inputNumber: number = 0;
  currentIndex: number = 0;
  totalCombinations: number = 0;
  apiURL = "https://localhost:44309/api/"

  start(n: number) {
    const url = this.apiURL + `Combination/StartAPI?num=${n}`;
    return this.http.get(url);
  }

  getNextCombination(number: number, prevCombination: number[]): Observable<any> {
    const url = this.apiURL + `Combination/GetNextCombination`;
    const obj = { num: number, prevCombination: prevCombination };
    return this.http.post<any>(url, obj);
  }

  getAllCombination(numPaging: number, currentCombination: number[], number: number = 0) {
    const url = this.apiURL + `Combination/GetAllCombination`;
    const obj = {
      numCombinations: numPaging,
      prevCombination: currentCombination,
      num: number
    };
    return this.http.post(url, obj);
  }

  GetNumPrevCombination(numPaging: number, currentCombiation: number[]): Observable<any> {
    const url = this.apiURL + `Combination/GetNumPrevCombination`;
    const obj = {
      numCombinations: numPaging,
      prevCombination: currentCombiation
    }
    return this.http.post<any>(url, obj)
  }

  GetCombinationSpecifiPage(number: number, pageNumber: number, pageSize: number) {
    debugger
    const url = this.apiURL + `Combination/GetCombinationSpecifiPage`;
    const obj = {
      number: number,
      pageNumber: pageNumber,
      pageSize: pageSize
    }
    return this.http.post<any>(url, obj);
  }
}

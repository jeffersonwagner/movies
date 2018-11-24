import {Component, Input} from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  constructor(private http: HttpClient) { }

  configUrl = 'http://www.omdbapi.com/?';
  apiKey = '&apikey=5731dd3c';
  // @Input()
  private _paramSearch: string;
  private _results: object[];
  private _fullResults: object[];
  private _selected: object;

  getData(value: string): Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.configUrl + value + this.apiKey }`);
  }

  filter(value: string) {
    this.getData('s=' + value).subscribe(res => {
      this.fullResults = [];
      // @ts-ignore
      this.results = res.Search;
      for (const movie of this.results) {
        // @ts-ignore
        this.getFullData(movie.imdbID);
      }
    });
  }

  getFullData(value: string) {
    return this.getData('i=' + value).subscribe(res => {
      // @ts-ignore
      if (res.Type === 'movie') {
        this.fullResults.push(res);
      }
    });
  }

  get paramSearch(): string {
    return this._paramSearch;
  }

  set paramSearch(value: string) {
    this._paramSearch = value;
  }

  get results(): object[] {
    return this._results;
  }

  set results(value: object[]) {
    this._results = value;
  }

  get fullResults(): object[] {
    return this._fullResults;
  }

  set fullResults(value: object[]) {
    this._fullResults = value;
  }

  get selected(): object {
    return this._selected;
  }

  set selected(value: object) {
    this._selected = value;
  }
}

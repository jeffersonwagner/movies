import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  constructor(private http: HttpClient) { }

  configUrl = 'http://www.omdbapi.com/?s=' + this.paramSearch + '&apikey=5731dd3c';
  private _paramSearch: string;
  private _results: object[];

  getData(): Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.configUrl}`);
  }

  filter() {
    this.getData().subscribe(res => {
      // @ts-ignore
      this.results = res.Search;
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
}

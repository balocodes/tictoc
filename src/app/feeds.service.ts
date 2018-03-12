import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class FeedsService {

  constructor(public http:Http) {
    this.http = http;
   }
  
  getFeeds(){
    return this.http.get('http://localhost:8000/feeds').map(res=>res.json());
  }
}

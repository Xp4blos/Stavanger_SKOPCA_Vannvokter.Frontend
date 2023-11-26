import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Article {
  title: string;
  imageUrl: string;
  content: string;
  date: string;
}



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  getAllArticles(){
    const url = 'http://130.162.252.108:25569/api/Artiles/GetAllById'
    const urlParams = new HttpParams()
      // .set('','')
      const options = {params: urlParams}
     return this.http.get<Article>(
        url,
        // options
      )
  }
}

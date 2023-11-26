import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Article } from '../../models/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  articles!:any

  constructor(private http: HttpService){}

  ngOnInit(): void {
    this.http.getAllArticles().subscribe(response=>{
      console.log(response);
      this.articles = response
      
    })
  }
}

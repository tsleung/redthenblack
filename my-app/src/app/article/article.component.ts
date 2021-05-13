import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articles: Observable<string[]>;

  constructor(route: ActivatedRoute) {
    this.articles = route
      .data.pipe(map(data => {
        return data.articles;
      }));

  }

  ngOnInit(): void {
  }

  onLoad() {

  }

  onError() {
    
  }

}

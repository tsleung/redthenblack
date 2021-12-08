import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articles: Observable<string[]>;
  showNavigation: Observable<boolean>;

  constructor(
    readonly routingService: RoutingService,
    route: ActivatedRoute) {
      this.showNavigation = route
      .data.pipe(map(data => {
        return data.showNavigation ?? true;
      }));
    
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

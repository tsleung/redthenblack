import { Component } from '@angular/core';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-maya-educational-article',
  templateUrl: './maya-educational-article.component.html',
  styleUrls: ['./maya-educational-article.component.scss']
})
export class MayaEducationalArticleComponent {
  constructor(
    readonly routingService: RoutingService
  ){

  }
}

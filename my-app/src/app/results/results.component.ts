import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';

export interface ResultsRouteData {
  href: string;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  parameters = this.route.data as Observable<ResultsRouteData>;

  constructor(private route: ActivatedRoute) {
  }

}

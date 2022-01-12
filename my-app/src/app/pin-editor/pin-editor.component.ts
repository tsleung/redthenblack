import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FindMyRetirementService } from '../services/find-my-retirement.service';
import { PinsService,Pin } from '../services/pins.service';
import { Article } from '../utils/articles_mapper';



export interface PinEditorRouteData {
  title: string;
  description?: string;
  inputs: Pin[];
  href: string;
  article: Article,
}

@Component({
  selector: 'app-pin-editor',
  templateUrl: './pin-editor.component.html',
  styleUrls: ['./pin-editor.component.scss']
})
export class PinEditorComponent {
  parameters = this.route.data as Observable<PinEditorRouteData>;
  myModel = {};
  constructor(private route: ActivatedRoute,
    private router: Router,
    readonly findMyRetirementService: FindMyRetirementService,
    readonly pinsService: PinsService) {
  }

  dothing(input, another, third) {
    console.log(input, another, third)
  }

}

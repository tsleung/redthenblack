import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FindMyRetirementService } from '../services/find-my-retirement.service';
import { PinsService } from '../services/pins.service';
import { Article } from '../utils/articles_mapper';


interface Pin {
  id?: string;
  time?: string;
  amount?: string;

  name: string;
  label?: string;
  placeholder?: string;
  startHint?: string;
  endHint?: string;
  tooltip?: string;
  max?: number;
  step?: number;
}

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

  paramSubmit(parameters: PinEditorRouteData, $event) {
    $event.preventDefault();
    $event.stopPropagation();
    const data = new FormData($event.target)

    const preferences = Array.from(data.entries()).reduce((accum, val) => {
      accum[val[0]] = accum[val[0]] ?? [];
      accum[val[0]].push(val[1]);
      console.log('accum', val, val[0], val[1])
      return accum;
    }, {});
    console.log('data', data)
    const redirectQueryParams = preferences;
    console.log('pref', redirectQueryParams);
    console.log('param submit', $event, data, data.entries(), Array.from(data.entries()), preferences);
    console.log('preferences', preferences);
    // this.findMyRetirementService.updateRetirementPreferences(preferences);
    // this.router.navigate([parameters.href],{queryParams:redirectQueryParams});


  }

}

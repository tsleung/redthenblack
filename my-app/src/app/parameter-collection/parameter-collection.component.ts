import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { FindMyRetirementService } from '../services/find-my-retirement.service';


interface input {
  value?: string;
  name: string;
  label?: string;
  placeholder?: string;
  startHint?: string;
  endHint?: string;
}

export interface ParameterRouteData {
  title: string;
  inputs: input[];
  href: string;
}

@Component({
  selector: 'parameter-collection',
  templateUrl: './parameter-collection.component.html',
  styleUrls: ['./parameter-collection.component.scss']
})
export class ParameterCollectionComponent {
  parameters = this.route.data as Observable<ParameterRouteData>;
myModel = {};
  constructor(private route: ActivatedRoute, private router: Router,
    readonly findMyRetirementService:FindMyRetirementService) {
  }

  paramSubmit($event) {
    $event.preventDefault();
    $event.stopPropagation();
    const data =  new FormData ($event.target)
    
    const preferences = Array.from(data.entries()).reduce((accum,val) => {
      accum[val[0]] = val[1];
      console.log('accum', val,val[0],val[1])
      return accum;
    },{});
    //console.log('param submit', $event,data, data.entries(), Array.from(data.entries()),preferences);
    //console.log('preferences',preferences);
    this.findMyRetirementService.updateRetirementPreferences(preferences);
    this.router.navigate(['/results']);


  }

}

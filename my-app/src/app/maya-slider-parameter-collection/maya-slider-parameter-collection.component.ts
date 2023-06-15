
import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { MayaParameterRouteData } from '../maya-parameter-collection/maya-parameter-collection.component';
import { FindMyRetirementService } from '../services/find-my-retirement.service';
import { Article } from '../utils/articles_mapper';

@Component({
  selector: 'app-maya-slider-parameter-collection',
  templateUrl: './maya-slider-parameter-collection.component.html',
  styleUrls: ['./maya-slider-parameter-collection.component.scss']
})
export class MayaSliderParameterCollectionComponent {

  parameters = this.route.data as Observable<MayaParameterRouteData>;
  myModel = {};
    constructor(private route: ActivatedRoute, 
      private router: Router,
      readonly findMyRetirementService:FindMyRetirementService) {
    }
  
    formSubmit($event) {
      $event.preventDefault();
      $event.stopPropagation();
      return false;
    }

    onFormInput(parameters: MayaParameterRouteData, form) {
      console.log('form', form)
      
      const data =  new FormData (form)
      
      const preferences = Array.from(data.entries()).reduce((accum,val) => {
        accum[val[0]] = isNaN(Number(val[1])) ? val[1] : Number(val[1]);
        console.log('accum', val,val[0],val[1])
        return accum;
      },{});
      
      console.log('data', data)
      const redirectQueryParams =  preferences;
      console.log('pref',redirectQueryParams);
      
      this.findMyRetirementService.updateRetirementPreferences(preferences);
      
    }  
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';


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

  constructor(private route: ActivatedRoute) {
  }

}

import { Component, OnInit } from '@angular/core';
import { FindMyRetirementService } from '../services/find-my-retirement.service';
import {Observable, of} from 'rxjs'
import {createIncomeParameterCollectionRoute, createWorkingParameterCollectionRoute, createRetirementParameterCollectionRoute} from '../utils/route_mapper';
import { environment } from 'src/environments/environment';
import {WORD_LIST} from './word_list';
import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';

interface Card {
  title: string;
  subtitle: string;
  callToAction: string;
  href: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  parametersRoute = createIncomeParameterCollectionRoute();

  cards: Observable<Card[]> = of([

  ])
  constructor(findMyRetirementService: FindMyRetirementService) { }

  ngOnInit(): void {
  }

}
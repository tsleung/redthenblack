import { Component, OnInit } from '@angular/core';
import { FindMyRetirementService } from '../services/find-my-retirement.service';
import {Observable, of} from 'rxjs'

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

  parametersRoute = '/parameters';

  cards: Observable<Card[]> = of([

  ])
  constructor(findMyRetirementService: FindMyRetirementService) { }

  ngOnInit(): void {
  }

}

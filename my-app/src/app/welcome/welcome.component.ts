import { Component, OnInit } from '@angular/core';
import { FindMyRetirementService } from '../find-my-retirement.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(findMyRetirementService: FindMyRetirementService) { }

  ngOnInit(): void {
  }

}

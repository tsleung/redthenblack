import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retirement-article',
  templateUrl: './retirement-article.component.html',
  styleUrls: ['./retirement-article.component.scss']
})
export class RetirementArticleComponent implements OnInit {

  opened = false;
  constructor() { }

  ngOnInit(): void {
  }

}

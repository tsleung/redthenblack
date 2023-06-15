import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-maya-titled-content',
  templateUrl: './maya-titled-content.component.html',
  styleUrls: ['./maya-titled-content.component.scss']
})
export class MayaTitledContentComponent {
  data = this.route.data;
  constructor(private route: ActivatedRoute) {}

}

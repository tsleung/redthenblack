import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-maya-layout-two-column',
  templateUrl: './maya-layout-two-column.component.html',
  styleUrls: ['./maya-layout-two-column.component.scss']
})
export class MayaLayoutTwoColumnComponent {
  data = this.route.data;
  constructor(private route: ActivatedRoute) {}
}

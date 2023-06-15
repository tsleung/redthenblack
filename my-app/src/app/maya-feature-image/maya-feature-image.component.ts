import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-maya-feature-image',
  templateUrl: './maya-feature-image.component.html',
  styleUrls: ['./maya-feature-image.component.scss']
})
export class MayaFeatureImageComponent {
  data = this.route.data;
  constructor(private route: ActivatedRoute) {}
}

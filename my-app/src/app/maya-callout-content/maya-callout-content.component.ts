import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-maya-callout-content',
  templateUrl: './maya-callout-content.component.html',
  styleUrl: './maya-callout-content.component.scss'
})
export class MayaCalloutContentComponent {
  @Input() title:string;
  @Input() subtitle:string;
  @Input() caption:string;
  @Input() content:string;
  @Input() image:{src:string};
  @Input() action:{primary: boolean, href: string, text: string};
}

import { Component } from '@angular/core';
import { SharedSheetService } from '../services/shared-sheet.service';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '../services/routing.service';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { data } from '../services/database.service';

@Component({
  selector: 'app-shared-sheet',
  templateUrl: './shared-sheet.component.html',
  styleUrl: './shared-sheet.component.scss'
})
export class SharedSheetComponent {
  // render a shared sheet

  // add to shared sheet
  id = this.route.params.pipe(map(params => {
    const id = params.id;
    return id;
  }));

  doc = this.id.pipe(
    filter(id => id), 
    switchMap(id => {
      return this.sharedSheetService.loadSharedSheet(id);
    }),
    tap(doc => {
      this.routingService.setTitle(data(doc).title);
    })
  );
  
  sharedSheet = this.doc.pipe(
    map(doc => {
      return doc.data();
    })
  );

  meta = this.doc.pipe(
    map(doc => {
      const data = doc.data();
      
      return {
        id: doc.id,
        uid: data.uid,
      };
    })
  )

  constructor(
    private route: ActivatedRoute, 
    readonly routingService: RoutingService,
    readonly sharedSheetService: SharedSheetService
  ) {}

}

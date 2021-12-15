import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { DatasetService } from '../services/dataset.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface DatasetRouteData {
  title: string;
  resolver: (datasetService) => Observable<string[][]>;
}

@Component({
  selector: 'app-dataset-viewer',
  templateUrl: './dataset-viewer.component.html',
  styleUrls: ['./dataset-viewer.component.scss']
})
export class DatasetViewerComponent implements OnInit {
  parameters = this.route.data as Observable<DatasetRouteData>;
  dataset: Observable<string[][]> = this.parameters.pipe(
    switchMap((parameters) => {
  return parameters.resolver(this.datasetService);
  }));

  constructor(private route: ActivatedRoute,
    private datasetService: DatasetService,) { }

  ngOnInit(): void {
  }

}

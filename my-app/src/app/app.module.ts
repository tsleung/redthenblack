import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CashFlowPlanComponent } from './cash-flow-plan/cash-flow-plan.component';
import { TimeseriesChartComponent } from './timeseries-chart/timeseries-chart.component';
import { SimpleBetComponent } from './simple-bet/simple-bet.component';
import { PosenetComponent } from './posenet/posenet.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';
import { ArticleComponent } from './article/article.component';
import { DemonComponent } from './demon/demon.component';
import { LineChartComponent } from './line-chart/line-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    CashFlowPlanComponent,
    TimeseriesChartComponent,
    SimpleBetComponent,
    PosenetComponent,
    ArticleComponent,
    DemonComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatRadioModule,
    MatBadgeModule,
    MatCardModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot(),
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

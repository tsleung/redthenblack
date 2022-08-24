import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';

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
import { WelcomeComponent } from './welcome/welcome.component';
import { ParameterCollectionComponent } from './parameter-collection/parameter-collection.component';
import { SummaryComponent } from './summary/summary.component';
import { ResultsComponent } from './results/results.component';
import { TimeboxComponent } from './timebox/timebox.component';
import { ParameterViewerComponent } from './parameter-viewer/parameter-viewer.component';
import { ProfileService } from './services/profile.service';
import { SummaryService } from './services/summary.service';
import { RecommendationService } from './services/recommendation.service';
import { PreferencesService} from './services/preferences.service';
import { FindMyRetirementService} from './services/find-my-retirement.service';
import { LayoutsComponent } from './layouts/layouts.component';
import { SuitabilityService } from './services/suitability.service';
import { RoutingService } from './services/routing.service';
import { RetirementArticleComponent } from './retirement-article/retirement-article.component';
import { DatasetViewerComponent } from './dataset-viewer/dataset-viewer.component';
import { PokerComponent } from './poker/poker.component';
import { PinEditorComponent } from './pin-editor/pin-editor.component';
import { CashFlowDiagramComponent } from './cash-flow-diagram/cash-flow-diagram.component';
import { BeginnerTalkComponent } from './beginner-talk/beginner-talk.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { MultipleLineChartComponent } from './multiple-line-chart/multiple-line-chart.component';

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
    LineChartComponent,
    WelcomeComponent,
    ParameterCollectionComponent,
    SummaryComponent,
    ResultsComponent,
    TimeboxComponent,
    ParameterViewerComponent,
    LayoutsComponent,
    RetirementArticleComponent,
    DatasetViewerComponent,
    PokerComponent,
    PinEditorComponent,
    CashFlowDiagramComponent,
    BeginnerTalkComponent,
    BarChartComponent,
    MultipleLineChartComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    MatRadioModule,
    MatTableModule,
    MatBadgeModule,
    MatCardModule,
    MatTabsModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot(),
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    ProfileService,
    PreferencesService,
    RecommendationService,
    SummaryService,
    FindMyRetirementService,
    SuitabilityService,
    RoutingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

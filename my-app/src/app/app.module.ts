import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

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
import { UpgradeComponent } from './upgrade/upgrade.component';
import { NgChartsModule } from 'ng2-charts';
import { SplashIntroComponent } from './splash-intro/splash-intro.component';
import { PersonalDashboardComponent } from './personal-dashboard/personal-dashboard.component';
import { MayaLayoutComponent } from './maya-layout/maya-layout.component';
import { MayaOnboardComponent } from './maya-onboard/maya-onboard.component';
import { MayaEducationalArticleComponent } from './maya-educational-article/maya-educational-article.component';
import { MayaCalculatorComponent } from './maya-calculator/maya-calculator.component';
import { DeckEditorComponent } from './deck-editor/deck-editor.component';
import { LifestreamViewerComponent } from './lifestream-viewer/lifestream-viewer.component';
import { DecisionEditorComponent } from './decision-editor/decision-editor.component';
import { MayaLayoutTwoRowComponent } from './maya-layout-two-row/maya-layout-two-row.component';
import { MayaLayoutTwoColumnComponent } from './maya-layout-two-column/maya-layout-two-column.component';
import { MayaCardSelectionComponent } from './maya-card-selection/maya-card-selection.component';
import { MayaTitledContentComponent } from './maya-titled-content/maya-titled-content.component';
import { MayaFeatureImageComponent } from './maya-feature-image/maya-feature-image.component';
import { MayaTypedInputComponent } from './maya-typed-input/maya-typed-input.component';
import { MayaParameterCollectionComponent } from './maya-parameter-collection/maya-parameter-collection.component';
import { MayaSliderParameterCollectionComponent } from './maya-slider-parameter-collection/maya-slider-parameter-collection.component';
import { SavingsCalculatorComponent } from './savings-calculator/savings-calculator.component';
import { IndexingCalculatorComponent } from './indexing-calculator/indexing-calculator.component';
import { PayingDebtCalculatorComponent } from './paying-debt-calculator/paying-debt-calculator.component';
import { RentOrBuyCalculatorComponent } from './rent-or-buy-calculator/rent-or-buy-calculator.component';
import { ComparingCashFlowsCalculatorComponent } from './comparing-cash-flows-calculator/comparing-cash-flows-calculator.component';
import { BackToSchoolCalculatorComponent } from './back-to-school-calculator/back-to-school-calculator.component';
import { GasOrElectricCalculatorComponent } from './gas-or-electric-calculator/gas-or-electric-calculator.component';
import { RetirementWithdrawalCalculatorComponent } from './retirement-withdrawal-calculator/retirement-withdrawal-calculator.component';
import { SeniorCareCalculatorComponent } from './senior-care-calculator/senior-care-calculator.component';
import { KidsCollegeFundCalculatorComponent } from './kids-college-fund-calculator/kids-college-fund-calculator.component';
import { CostOfLivingCalculatorComponent } from './cost-of-living-calculator/cost-of-living-calculator.component';

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
    UpgradeComponent,
    SplashIntroComponent,
    PersonalDashboardComponent,
    MayaLayoutComponent,
    MayaOnboardComponent,
    MayaEducationalArticleComponent,
    MayaCalculatorComponent,
    DeckEditorComponent,
    LifestreamViewerComponent,
    DecisionEditorComponent,
    MayaLayoutTwoRowComponent,
    MayaLayoutTwoColumnComponent,
    MayaCardSelectionComponent,
    MayaTitledContentComponent,
    MayaFeatureImageComponent,
    MayaTypedInputComponent,
    MayaParameterCollectionComponent,
    MayaSliderParameterCollectionComponent,
    SavingsCalculatorComponent,
    IndexingCalculatorComponent,
    PayingDebtCalculatorComponent,
    RentOrBuyCalculatorComponent,
    ComparingCashFlowsCalculatorComponent,
    BackToSchoolCalculatorComponent,
    GasOrElectricCalculatorComponent,
    RetirementWithdrawalCalculatorComponent,
    SeniorCareCalculatorComponent,
    KidsCollegeFundCalculatorComponent,
    CostOfLivingCalculatorComponent,
   
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
    NgChartsModule,
    ReactiveFormsModule,
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { SimpleBetComponent } from './simple-bet/simple-bet.component';
import { CashFlowPlanComponent } from './cash-flow-plan/cash-flow-plan.component';
import { PosenetComponent } from './posenet/posenet.component';
import { ArticleComponent } from './article/article.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PokerComponent } from './poker/poker.component';
import { DemonComponent } from './demon/demon.component';
import { ParameterCollectionComponent,ParameterRouteData } from './parameter-collection/parameter-collection.component';
import { SummaryComponent,SummaryRouteData} from './summary/summary.component';
import { ResultsComponent,ResultsRouteData} from './results/results.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { RetirementArticleComponent } from './retirement-article/retirement-article.component';
import { ABOUT_RTB } from './utils/articles_mapper';
import { DatasetRouteData, DatasetViewerComponent } from './dataset-viewer/dataset-viewer.component';
import { sp500DatasetResolver } from './services/dataset.service';
import {of, Observable} from 'rxjs';
import { PinEditorComponent } from './pin-editor/pin-editor.component';
import * as ROUTE_COMPONENTS from './route-components';
import { CashFlowDiagramComponent } from './cash-flow-diagram/cash-flow-diagram.component';
import { BeginnerTalkComponent } from './beginner-talk/beginner-talk.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { SplashIntroComponent } from './splash-intro/splash-intro.component';
import { LEGACY_ROUTES } from './legacy-route';
import { MAYA_ROUTES } from './maya_routes';

const routes: Routes = [
  { path: 'bet', component: SimpleBetComponent },
  { path: 'game', component: GameComponent },
  { path: 'pose', component: PosenetComponent },
  { path: 'editor', component: DemonComponent },
  
  {
    path: 'beta',
    component: CashFlowPlanComponent,
    children: [
      // { path: '', outlet: 'game', component: GameComponent },
      // { path: '', outlet: 'game2', component: GameComponent },
    ],
  },
  ...LEGACY_ROUTES,
  ...MAYA_ROUTES,
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

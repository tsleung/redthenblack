import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { SimpleBetComponent } from './simple-bet/simple-bet.component';
import { CashFlowPlanComponent } from './cash-flow-plan/cash-flow-plan.component';
import { PosenetComponent } from './posenet/posenet.component';
import { ArticleComponent } from './article/article.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { DemonComponent } from './demon/demon.component';
import { ParameterCollectionComponent,ParameterRouteData } from './parameter-collection/parameter-collection.component';
import { SummaryComponent,SummaryRouteData} from './summary/summary.component';
import { ResultsComponent,ResultsRouteData} from './results/results.component';


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
  {
    path: 'articles',
    component: ArticleComponent,
    data: {articles: [
      '/assets/articles/intro.md',
      '/assets/articles/resources.md',
    ]}
  },
  {
    path: 'results',
    component: ResultsComponent,
    data: {
      href: '/summary'
    } as ResultsRouteData
  },

  {
    path: 'summary',
    component: SummaryComponent,
    data: {
    } as SummaryRouteData
  },
  {
    path: 'parameters',
    component: ParameterCollectionComponent,
    data: {
      title:'Parameters',
      href: 'results',
      inputs: [
        {name:'income',value: ''},
        {name:'another', value: ''},
      ]
    } as ParameterRouteData
  },
  {
    path: '',
    component: WelcomeComponent,
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

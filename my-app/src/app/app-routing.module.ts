import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { SimpleBetComponent } from './simple-bet/simple-bet.component';
import { CashFlowPlanComponent } from './cash-flow-plan/cash-flow-plan.component';
import { PosenetComponent } from './posenet/posenet.component';
import { ArticleComponent } from './article/article.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { DemonComponent } from './demon/demon.component';

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

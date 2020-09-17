import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { SimpleBetComponent } from './simple-bet/simple-bet.component';
import { CashFlowPlanComponent } from './cash-flow-plan/cash-flow-plan.component';

const routes: Routes = [
  { path: 'game', component: GameComponent },
  {
    path: 'article',
    component: CashFlowPlanComponent,
    children: [
      { path: '', outlet: 'game', component: GameComponent },
      { path: '', outlet: 'game2', component: GameComponent },
    ],
  },
  {
    path: '**',
    component: SimpleBetComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

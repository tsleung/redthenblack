import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { SimpleBetComponent } from './simple-bet/simple-bet.component';
import { CashFlowPlanComponent } from './cash-flow-plan/cash-flow-plan.component';
import { PosenetComponent } from './posenet/posenet.component';
import { DemonComponent } from './demon/demon.component';
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
  // { path: '**', redirectTo: '/m/0/intro' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

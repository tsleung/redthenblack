import { Routes, RouterModule } from '@angular/router';
import { LifestreamViewerComponent } from './lifestream-viewer/lifestream-viewer.component';
import { MayaCalculatorComponent } from './maya-calculator/maya-calculator.component';
import { MayaEducationalArticleComponent } from './maya-educational-article/maya-educational-article.component';
import { MayaLayoutComponent } from './maya-layout/maya-layout.component';
import { MayaOnboardComponent } from './maya-onboard/maya-onboard.component';
import { PersonalDashboardComponent } from './personal-dashboard/personal-dashboard.component';
import { SplashIntroComponent } from './splash-intro/splash-intro.component';

export const INTRO = {
  path: 'intro',
  component: SplashIntroComponent
};
export const DASHBOARD = {
  path: 'dashboard',
  component: PersonalDashboardComponent,
  children: [
    {
      path: '',
      component: LifestreamViewerComponent,
    }
  ]
};

export const ONBOARDING = {
  path: 'onboarding',
  component: MayaOnboardComponent
};
export const EDUCATION = {
  path: 'education',
  component: MayaEducationalArticleComponent
};
export const CALCULATOR = {
  path: 'calculator',
  component: MayaCalculatorComponent
};


export const MAYA_ROUTES: Routes = [
  {
    path: 'maya',
    component: MayaLayoutComponent,
    children: [
      INTRO,
      DASHBOARD,
      ONBOARDING,
      EDUCATION,
      CALCULATOR,
      { path: '**', redirectTo: 'intro' }

    ]
  }

];
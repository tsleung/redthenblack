import { Routes, RouterModule } from '@angular/router';
import { LifestreamViewerComponent } from './lifestream-viewer/lifestream-viewer.component';


import { MayaEducationalArticleComponent } from './maya-educational-article/maya-educational-article.component';
import { MayaFeatureImageComponent } from './maya-feature-image/maya-feature-image.component';
import { MayaLayoutTwoColumnComponent } from './maya-layout-two-column/maya-layout-two-column.component';
import { MayaLayoutTwoRowComponent } from './maya-layout-two-row/maya-layout-two-row.component';
import { MayaLayoutComponent } from './maya-layout/maya-layout.component';

import { MayaTitledContentComponent } from './maya-titled-content/maya-titled-content.component';
import { PersonalDashboardComponent } from './personal-dashboard/personal-dashboard.component';
import { SplashIntroComponent } from './splash-intro/splash-intro.component';
import * as routes from './utils/route_mapper';
import { CALCULATOR } from './maya-calculator-routes';
import { ONBOARDING } from './maya-onboarding-routes';
import { MayaLifeEventsComponent } from './maya-life-events/maya-life-events.component';
import { MayaLifeEventsAddComponent } from './maya-life-events-add/maya-life-events-add.component';
import { MayaLifeEventsResultsComponent } from './maya-life-events-results/maya-life-events-results.component';
import { MayaLifeEventsListComponent } from './maya-life-events-list/maya-life-events-list.component';

export const INTRO = {
  path: 'intro',
  component: SplashIntroComponent,
  children: [
    {
      path: '',
      outlet: 'tagline',
      component: MayaLayoutTwoColumnComponent,
      children: [
        {
          path: '',
          component: MayaLayoutTwoRowComponent,
          children: [
            {
              path: '',
              component: MayaTitledContentComponent,
              data: {
                title: `Planning for your retirement doesn't have to be scary.`,
                action: {
                  href: routes.createLifeEventsRoute(),
                  text: `Find out how`,
                  primary: true,
                }
              }
            },
            {
              path: '',
              outlet: 'below',
              component: MayaTitledContentComponent,
              data: {
                caption: `Fear of the unknown.`,
                content: `The unknown can be daunting. It's what makes retirement planning feel overwhelming. Where do I start? How do I know if I'm planning properly? What if I don't have enough? These are just a few of the many uncertainties.`,
                // content: `it Is what makes retirement planning Teel overwhelming. Where do start? How do I know if Tr plannina properlv? What if I don't have enough?
                // Those are just a few of many of the uncertainties  `,
              }
            }
          ]
        },
        {
          path: '',
          outlet: 'secondary',
          component: MayaFeatureImageComponent,
          data: {
            src: `/assets/images/no_fear.jpg`
          }
        }
      ]
    },
    {
      path: '',
      outlet: 'unknown',
      component: MayaLayoutTwoColumnComponent,
      children: [

      ]
    },
    {
      path: '',
      outlet: 'cards',
      component: MayaLayoutTwoColumnComponent,
      children: [
        {
          path: '',

          component: MayaFeatureImageComponent,
          data: {
            src: `assets/images/deck.jpg`
          }
        },
        {
          path: '',
          outlet: 'secondary',
          component: MayaTitledContentComponent,
          data: {
            caption: `Your future is like a deck of cards.`,
            content: `The future is like a deck of cards: unknown, full of possibilities, and with the potential for good or bad. Just like you don't know what cards are in a deck of cards before they're dealt, you don't know what the future holds. There are many possible outcomes, and we can't know for sure which one will happen, but we can make educated guesses based on the information we have.`
            // content: `You never know which card you are going to get. R/B excepteur sint occaecat cupidatat non proident, sunt in culpa aui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus
            // errorsit vOluotatem accusantum goioremoue
            // laudantium, totam rem aperiam, eaque ipsa quae al
            // _loinventore vertaus er cuasrarcnilecto oeaTae
            // vitae dicta sunt explicabo  `

            /**
             * "The unknown. Just like you don't know what cards are in a deck of cards before they're dealt, you don't know what the future holds. There are many unknowns in life, and that can be a source of uncertainty.
The possibilities. Just like a deck of cards contains many different possibilities, the future contains many different possibilities. You don't know what will happen, but there are many different things that could happen.
The risks. Just like a deck of cards contains some risky cards, the future contains some risks. There are things that could happen that you don't want to happen, but they're a possibility.
The unknown. Just like the cards in a deck, the future is unknown. We can't know for sure what will happen, but we can make educated guesses based on the information we have.
The possibility of different outcomes. Just like a deck of cards can be shuffled to create different hands, the future can unfold in different ways. There are many possible outcomes, and we can't know for sure which one will happen.
The potential for good or bad. Just like a deck of cards can contain both good and bad cards, the future can contain both positive and negative outcomes. We don't know what we're going to get, but we know that there is both the potential for good and the potential for bad."
             */


          }
        }
      ]
    },
    /*
    {
      path: '',
      outlet: 'calculator',
      component: MayaLayoutTwoColumnComponent,
      children: [
        {
          path: '',
          
          component: MayaTitledContentComponent,
          data: {
            caption: `Here will be some type of generic calculator.`,
            content: `ThIs wIll be a section where we provide a pretty generic salarv. savings, investment example
            Users can adiust numbers in here perhaps a
            slider of sort that adiusts the invidividual areas
            and show now changing each oT the values affects overall goal.`
          }
        },
        {
          path: '',
          outlet: 'secondary',
          component: MayaFeatureImageComponent,
          data: {
            src: `assets/images/placeholder_figure.jpg`
          }
        },
      ]
    }
    */
  ]
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

export const EDUCATION = {
  path: 'education',
  component: MayaEducationalArticleComponent,
};

export const LIFE_EVENTS = [
  {
    path: 'life-events/add/:type',
    component: MayaLifeEventsAddComponent,
  },
  {
    path: 'life-events/edit/:type',
    component: MayaLifeEventsAddComponent,
  },
  {
    path: 'life-events/list',
    component: MayaLifeEventsListComponent,
  },
  {
    path: 'life-events/results',
    component: MayaLifeEventsResultsComponent,
  },
  {
    path: 'life-events',
    component: MayaLifeEventsComponent,
  },
]

export const MAYA_ROUTES: Routes = [
  {
    path: 'm/0',
    component: MayaLayoutComponent,
    children: [
      INTRO,
      DASHBOARD,
      ONBOARDING,
      EDUCATION,
      ...LIFE_EVENTS,
      ...CALCULATOR,
      { path: '**', redirectTo: 'intro' }
    ]
  }
];
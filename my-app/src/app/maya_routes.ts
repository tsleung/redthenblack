import { Routes, RouterModule } from '@angular/router';
import { LifestreamViewerComponent } from './lifestream-viewer/lifestream-viewer.component';

import { MayaCardSelectionComponent } from './maya-card-selection/maya-card-selection.component';
import { MayaEducationalArticleComponent } from './maya-educational-article/maya-educational-article.component';
import { MayaFeatureImageComponent } from './maya-feature-image/maya-feature-image.component';
import { MayaLayoutTwoColumnComponent } from './maya-layout-two-column/maya-layout-two-column.component';
import { MayaLayoutTwoRowComponent } from './maya-layout-two-row/maya-layout-two-row.component';
import { MayaLayoutComponent } from './maya-layout/maya-layout.component';
import { MayaOnboardComponent } from './maya-onboard/maya-onboard.component';
import { MayaParameterCollectionComponent, MayaParameterRouteData } from './maya-parameter-collection/maya-parameter-collection.component';
import { MayaTitledContentComponent } from './maya-titled-content/maya-titled-content.component';
import { MayaTypedInputComponent } from './maya-typed-input/maya-typed-input.component';
import { PersonalDashboardComponent } from './personal-dashboard/personal-dashboard.component';
import { SplashIntroComponent } from './splash-intro/splash-intro.component';
import { createMayaCalculator, createMayaCalculatorList, createMayaOnboarding } from './utils/route_mapper';
import { ABOUT_RTB } from './utils/articles_mapper';
import { CALCULATOR } from './maya-calculator-routes';


function createOnboardingPath(path: string) {
  return {
    path,
    component: MayaLayoutTwoRowComponent,
    children: [
      {
        path: '',

        component: MayaLayoutTwoColumnComponent,
        children: [
          {
            path: '',
            outlet: 'secondary',
            component: MayaFeatureImageComponent,
            data: {
              src: `assets/images/painting_path.jpg`
            }
          },
          {
            path: '',

            component: MayaTitledContentComponent,
            data: {
              title: `Let’s start painting your path!`,
              subtitle: `1. Cash flow and savings`,
              content: `Retirement planning consists of three primary attributes time, value and  confidence. While the first two factors are commonly addressed, the third is seldom considered. With R/B we hope to provide you with resources to tap into the confidence aspect of planning.
  
              A fundamental part of starting any retirement plan is generating income and putting aside a portion of that income into savings. Starting to save earlier will allow more time to accumulate.`,

            }
          }
        ]
      },
      {
        path: '',
        outlet: 'bottom',
        component: MayaParameterCollectionComponent,
        data: {
          // title: 'Your annual contributions',
          article: ABOUT_RTB,
          href: 'maya/dashboard',
          inputs: [
            {
              label: 'Years to work',
              name: 'timeToWorkInYears',
            },
            {
              label: 'After tax income',
              name: 'annualAfterTaxIncome',

            },
            {
              label: 'Savings per year',
              name: 'annualAmountSavedAfterTax',

            },
          ],
          action: 'Next'
        } as MayaParameterRouteData
      }
    ]
  };
}

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
                  href: createMayaCalculatorList(),
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

export const ONBOARDING = {
  path: 'onboarding',
  children: [
    {
      path: '',
      component: MayaCardSelectionComponent
    },
    {
      path: 'newbie',
      component: MayaLayoutTwoRowComponent,
      children: [
        {
          path: '',
          outlet: 'top',
          component: MayaLayoutTwoColumnComponent,
          children: [
            {
              path: '',
              outlet: 'secondary',
              component: MayaFeatureImageComponent,
              data: {
                src: `assets/images/placeholder_chart.jpg`
              }
            },
            {
              path: '',

              component: MayaTitledContentComponent,
              data: {
                title: `Benefits of savings and how to get started.`,
                subtitle: `1. Cash flow and savings`,
                content: `Learning how to save is where most people start. We put a predictable amount into an account and watch the balance grow. Depending on how long you save, the number of periods, and the amount you save per period, you can expect to have a certain amount at the end. A period can be any arbitrary unit of time you'd prefer to use! A common period used is years, but can be as short as days or weeks.
    
                See how much you can save over 10 years by using the slider. It’s pretty satisfying to see the curve!`,
              }
            }
          ]
        },
        {
          path: '',
          outlet: 'below',
          component: MayaParameterCollectionComponent,
          data: {
            title: 'Your annual contributions',
            article: ABOUT_RTB,
            href: 'maya/onboarding/path',
            inputs: [
              {
                label: 'Savings per year',
                name: 'annualAmountSavedAfterTax',

              },
            ],
            action: 'Next'
          } as MayaParameterRouteData
        }
      ]
    },
    createOnboardingPath('path'),
    createOnboardingPath('dipper'),
    createOnboardingPath('financier'),
    {
      path: 'original',
      component: MayaOnboardComponent
    },
  ]
};

export const EDUCATION = {
  path: 'education',
  component: MayaEducationalArticleComponent,

};

export const MAYA_ROUTES: Routes = [
  {
    path: 'm/0',
    component: MayaLayoutComponent,
    children: [
      INTRO,
      DASHBOARD,
      ONBOARDING,
      EDUCATION,
      ...CALCULATOR,
      { path: '**', redirectTo: 'intro' }

    ]
  }
];
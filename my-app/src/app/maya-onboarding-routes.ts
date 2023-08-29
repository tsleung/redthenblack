import { MayaCardSelectionComponent } from './maya-card-selection/maya-card-selection.component';
import { MayaFeatureImageComponent } from './maya-feature-image/maya-feature-image.component';
import { MayaLayoutTwoColumnComponent } from './maya-layout-two-column/maya-layout-two-column.component';
import { MayaLayoutTwoRowComponent } from './maya-layout-two-row/maya-layout-two-row.component';
import { MayaOnboardComponent } from './maya-onboard/maya-onboard.component';
import { MayaParameterCollectionComponent, MayaParameterRouteData } from './maya-parameter-collection/maya-parameter-collection.component';

import { MayaTitledContentComponent } from './maya-titled-content/maya-titled-content.component';
import { ABOUT_RTB } from './utils/articles_mapper';
import * as routes from './utils/route_mapper';


function createOnboardingPath(path: string) {
  return {
    path,
    component: MayaLayoutTwoRowComponent,
    children: [
      // default
      {
        path: '',
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
                  subtitle: `2. Cash flow and savings`,
                  content: `Retirement planning consists of three primary attributes time, value and  confidence. While the first two factors are commonly addressed, the third is seldom considered. With R/B we hope to provide you with resources to tap into the confidence aspect of planning.
                  A fundamental part of starting any retirement plan is generating income and putting aside a portion of that income into savings. Starting to save earlier will allow more time to accumulate.`,
                }
              }
            ]
          },
          {
            path: '',
            outlet: 'below',
            component: MayaParameterCollectionComponent,
            data: {
              // title: 'Your annual contributions',
              article: ABOUT_RTB,
              action: 'Next',
              href: routes.createMayaNestEgg(),
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
            } as MayaParameterRouteData
          },
        ]
      },
      
    ]
  };
}


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
            href: routes.createMayaNestEgg(),
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
    {
      path: routes.NEST_EGG_FRAGMENT,
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
                title: `How do I know what is enough for (future) me?`,
                subtitle: `3. Nest Egg`,
                content: `The most uncertain part about retirement is the fact you don’t know how much you may need. While R/B cannot predict the future, we can provide resources to help you understand what to expect. 

                Since we'll be withdrawing money during retirement, we can see a series of cash flows out of our balance. Since we use a fixed withdrawal rate, the individual cash flows themselves decrease over each period.
                
                The duration of retirement drastically affects the size of nest egg that needs to be accumulated while working. As a rule of thumb annual withdrawal over a 30 year retirement could use a 4% withdrawal rate while annual withdrawal over a 60 year retirement would use a 2% withdrawal rate.`,
              }
            }
          ]
        },
        {
          path: '',
          outlet: 'below',
          component: MayaParameterCollectionComponent,
          data: {
            // title: 'Your annual contributions',
            article: ABOUT_RTB,
            action: 'Next',
            href: routes.createMayaInvesting(),
            inputs: [
              {
                label: 'Years in retirement',
                name: 'retirementTimeHorizonInYears',
              },
              {
                label: 'Desired annual retirement income',
                name: 'annualRetirementIncome',
  
              },
            ],
          } as MayaParameterRouteData
        },
      ]
    },
    {
      path: routes.INVESTING_FRAGMENT,
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
                title: `Investments and your retirement.`,
                subtitle: `3. Investments`,
                content: `If you haven’t started investing yet, it is possible that your thought about retirement is this: 

                Investing in stocks is like a gamble. Why risk it? 
                
                Truth is, yes. Investing in the stock market is uncertain. But cash is guaranteed to depreciate in value over time, while your investments could grow. In this section you will deep dive into how investments can benefit you in your retirement.
                
                Here you can compare and contrast cash vs. invetments in the stockmarket.`,
              }
            }
          ]
        },
        {
          path: '',
          outlet: 'below',
          component: MayaParameterCollectionComponent,
          data: {
            // title: 'Your annual contributions',
            article: ABOUT_RTB,
            action: 'Next',
            href: routes.createGameOfLife(),
            inputs: [
              {
                label: 'Cash Savings',
                name: 'initialSavings',
              },
              {
                label: 'Asset allocation',
                name: 'investingLeverage',
  
              },
            ],
          } as MayaParameterRouteData
        },
      ]
    },
    {
      path: routes.INVESTING_ADDITIONAL_FRAGMENT,
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
                title: `Your existing assets and investments.`,
                subtitle: `3. Investments`,
                content: `Before we start calculating more details about your future, let’s weave in your existing investments into the picture to better predict your ideal retirement plan.`,
              }
            }
          ]
        },
        {
          path: '',
          outlet: 'below',
          component: MayaParameterCollectionComponent,
          data: {
            // title: 'Your annual contributions',
            article: ABOUT_RTB,
            action: 'Next',
            href: routes.createGameOfLife(),
            inputs: [
              {
                label: 'Stock Allocation',
                name: 'investingLeverage',
              },
              {
                label: 'Property',
                name: 'initialSavings',
  
              },
            ],
          } as MayaParameterRouteData
        },
      ]
    },
    // game of life
    {
      path: routes.GAME_OF_LIFE_FRAGMENT,
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
                title: `Your game of life.`,
                subtitle: `4. Life Events`,
                content: `You can’t pick from a deck of cards and let that define your future, but you can dream of all the cards that could appear in the life ahead. A fancy car, a nice big house, college tuition for children... By spending a little time thinking (fascinating) about your future, you can start painting a clearer picture of what you’ll need to get there

                Start from the existing cards or create your own!`,
              }
            }
          ]
        },
        {
          path: '',
          outlet: 'below',
          component: MayaCardSelectionComponent,
          data: {
            article: ABOUT_RTB,
            action: 'Next',
            skip: 'Skip to Thresholds',
            href: routes.createMayaDashboard(),
            skipHref: '',
            cards: [
              {
                label: 'Stock Allocation',
                name: 'investingLeverage',
              },
              {
                label: 'Property',
                name: 'initialSavings',

              },
            ],
          } 
        },
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
import { Component, OnInit } from '@angular/core';
import { gasOrElectric } from '../utils/gas-vs-electric-car';
import { balanceToCashFlow, calculateOptimalBetSizing, createBondCashFlow, createNaiveStocksCashFlow, createRandomDataSeries, createSavingsSeries, firstValueOf, lastValueOf, randomWalk } from '../utils/learn_utils';
import { rentVsBuy } from '../utils/rent-vs-buy';

@Component({
  selector: 'app-beginner-talk',
  templateUrl: './beginner-talk.component.html',
  styleUrls: ['./beginner-talk.component.scss']
})
export class BeginnerTalkComponent implements OnInit {

  firstValueOf<T>(val: T[]):T {
    return firstValueOf(val);
  }
  lastValueOf<T>(val: T[]):T {
    return lastValueOf(val);
  }
  prettyRoundNumber(val: number) {
    const rounded = Math.round(val);
    return rounded.toLocaleString();

  }

steps = {
  growthRate: .01,
  startingBalance: 10000,
  savingsPerPeriod: 100,
  cardBetSize: .05,
}

/* inputs */
private cardBetSize(reds, blacks) {
  return Math.round( 
    100 * Math.max(0, (reds / (reds+blacks)) - (blacks / (reds+blacks)))
  ) / 100;
}

preferences = {
  numPeriods: 30,
  startingBalance: 100000,
  savingsPerPeriod: 1000,
  bondDuration: 10,
  bondPrice: 1000,
  bondCoupon: 100,
  bondFaceValue: 1000,
  naiveStockGrowthRate: 1.1,
  numRedCards: 18,
  numBlackCards: 12,
  cardBetSize: this.cardBetSize(18,12),
  /** Total deck size */
  numTotalDiamondCards: 13,
  numTotalCloverCards: 13,
  numTotalSpadeCards: 13,
  numTotalHeartCards: 13,
  /** Number of cards remaining */
  numDiamondCards: 13,
  numCloverCards: 13,
  numSpadeCards: 13,
  numHeartCards: 13,
  /** Betting conditions */
  betOnRedCard: 0,
  winOnBlackCard: 0, 
  winOnDiamondCard: 0,
  winOnCloverCard: 0,
  winOnSpadeCard: 0,
  winOnHeartCard: 0,

  /** Changing payoffs for cards */
  goodEvenReturn: 1.25,
  badEvenReturn: .8,

  /** Rebalancing amount */
  randomWalkReturnLeverage: 1,

  desiredReturn: 1,
  desiredReturnleverage: 1,
  

  /** 50/50 probability, good vs bad return */
  goodPositiveReturn: 1.25,
  badPositiveReturn: .88,

  /** Time diversification */
  linearDecayFactor: 1,
  quadraticDecayFactor: 1,
  
  
}

/** Four suits deck */
drawCard() {

}
rebalancingCards() {

}

diversificationAndCorrelationWithCards() {

}

updatePreferences(difference) {
  console.log('updating difference',difference)
  const updated = {...this.preferences, ...difference};
  this.preferences = updated;
  
  this.refreshOutputs();
}

// move this to observables?
refreshTimeout;
refreshOutputs() {
  console.log('refreshing')
  clearTimeout(this.refreshTimeout);
  this.refreshTimeout = setTimeout(() => {
    this.refreshSavings();
    this.refreshBonds();
    this.refreshNaiveStocks();
    this.refreshOptimalBetSizing();
  },200)
  
}

finalBalanceOf(series: number[]) {
  return series[series.length - 1];
}

/** Savings */
savingsCashFlow = createSavingsSeries(this.preferences.numPeriods,this.preferences.savingsPerPeriod);
refreshSavings() {
  this.savingsCashFlow = createSavingsSeries(
    this.preferences.numPeriods, this.preferences.savingsPerPeriod
  );
}

/** Bond */
bondCashFlow = createBondCashFlow(
  this.preferences.bondDuration, 
  this.preferences.bondCoupon, 
  this.preferences.bondFaceValue,
  this.preferences.bondPrice
);
refreshBonds() {
  this.bondCashFlow = createBondCashFlow(
    this.preferences.bondDuration, 
    this.preferences.bondCoupon, 
    this.preferences.bondFaceValue,
    this.preferences.bondPrice

  );
}

/** Naive stocks */
naiveStocksBalance = createNaiveStocksCashFlow(
  this.preferences.numPeriods, 
  this.preferences.naiveStockGrowthRate, 
  this.preferences.startingBalance
);
naiveStocksCashFlow = balanceToCashFlow(this.naiveStocksBalance);
refreshNaiveStocks() {
  this.naiveStocksBalance = createNaiveStocksCashFlow(
    this.preferences.numPeriods, 
    this.preferences.naiveStockGrowthRate, 
    this.preferences.startingBalance
  );
  this.naiveStocksCashFlow = balanceToCashFlow(this.naiveStocksBalance);
}

/** Optimal bet sizing + Cards */
private firstOptimalBetSizing = calculateOptimalBetSizing(
  this.preferences.numRedCards,
  this.preferences.numBlackCards,
  this.preferences.cardBetSize,
  this.preferences.startingBalance
);
geometric = {
  columns: [
    ['0',...this.firstOptimalBetSizing.account]
  ],
};

optimalBetSizingCashFlow = this.firstOptimalBetSizing.cashFlow;
finalAccountValue = Math.round(this.firstOptimalBetSizing.account.slice(-1)[0]);
resetGeometric() {
  this.geometric = {columns:[]};
}
refreshOptimalBetSizing(timesToRun = 1) {
  const optimalBetSizing = calculateOptimalBetSizing(
    this.preferences.numRedCards,
    this.preferences.numBlackCards,
    this.preferences.cardBetSize,
    this.preferences.startingBalance,
    );
  this.optimalBetSizingCashFlow = optimalBetSizing.cashFlow;
  this.finalAccountValue = Math.round(optimalBetSizing.account.slice(-1)[0]);

  this.geometric = {
    columns: [
      ...this.geometric.columns, 
      [
        `${this.geometric.columns.length}`,...optimalBetSizing.account
      ],
    ].slice(0,100)
  };

  if(timesToRun>0) {
    this.refreshOptimalBetSizing(timesToRun -1);
  }
}

/** Random walk */
randomWalkBalance = randomWalk(
  this.preferences.numPeriods,
  this.preferences.goodEvenReturn,
  this.preferences.badEvenReturn,
  this.preferences.startingBalance,
);
randomWalkCashFlow = balanceToCashFlow(this.randomWalkBalance);
refreshRandomWalk() {
  const balance = randomWalk(
    this.preferences.numPeriods,
    this.preferences.goodEvenReturn,
    this.preferences.badEvenReturn,
    this.preferences.startingBalance,
  );

  this.randomWalkBalance = balance;
  this.randomWalkCashFlow = balanceToCashFlow(this.randomWalkBalance);
}

/** Rebalancing */
rebalancingCashFlow = [];
rebalancingBalance = [];
refreshRebalancing() {
  // 50/50 chance, you will get either a good or bad event
  
  // random walk

}

/** Diversification */


/** Calculate nest egg for retirement */


/** Time diversification */
timeDiversificationCashFlow = [];
timeDiversificationBalance = [];
refreshTimeDiversification() {
  // assumption, 1.1 every year, (1.25*.88)


  // nominal value of money, aside compounding, does matter. losing 50% today on 100k is a 50k lost, which is not trivial. however if you're looking to retire with 5M, a 50% lost is 2.5M. This is an almost unacceptable loss, and can completely eliminate a chance at a carefree retirement.

  // therefore leverage should become a function as to the proportion of your current balance vs a confident value of retirement. we'll assume 95% confidence in retirement and the idea of 60 years between the start of investment and end of required retirement benefits. 


  // exponential vs linear, chaos early in life and lower risk later
  // ax^2 + bx + c
  // balance decay factor
  // except the balance need you need to retire is constantly changing based on how much retirement you have

  // depending how much time you have left, changes the amount you need in retirement because the withdrawal rate and volatility

  // rather than think about retirement alone, think about a midpoint between when you feel comfortable to retire, and how long you should maintain working

  function calculateQuadraticDecay (
    progressToRetirement: number,
    a: number, 
    b: number, 
    c: number, 
    ) {

      const leverage = 
        a * Math.pow(progressToRetirement, 2) +
        b * progressToRetirement + 
        c;

      return leverage;
  }

  function calculateLinearDecay(
    progressToRetirement: number,
    a: number, 
    b: number,
  ) {
      const leverage = 
        a * progressToRetirement + 
        b;
        
      return leverage;
  }
}

/** confidence in retirement */

/** utility of money */

/** Construct component */
chartData = createRandomDataSeries();
constructor() {

    rentVsBuy();
    gasOrElectric();

   }

  ngOnInit(): void {
  }
  shuffle() {
console.log('shuffling');
    this.chartData = createRandomDataSeries();
  }



}

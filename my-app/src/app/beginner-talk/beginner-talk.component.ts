import { Component, OnInit } from '@angular/core';
import { gasOrElectric } from '../utils/gas-vs-electric-car';
import { balanceToCashFlow, calculateOptimalBetSizing, createBondCashFlow, createNaiveStocksCashFlow, createRandomDataSeries, createRetirementNestEggBalance, createSavingsSeries, firstValueOf, lastValueOf, prettyRoundNumber, randomWalk, rebalanceRandomWalk, timeDiversification } from '../utils/learn_utils';
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
    return prettyRoundNumber(val);
  }

steps = {
  growthRate: .01,
  startingBalance: 10000,
  savingsPerPeriod: 100,
  withdrawalRate: .01,
  cardBetSize: .05,
  leverageStepSize: .05,
  decayFactorStepSize: .01,
  
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
  savingsPerPeriod: 50000,
  
  bondDuration: 10,
  bondPrice: 1000,
  bondCoupon: 100,
  bondFaceValue: 1000,
  naiveStockGrowthRate: 1.1,
  // retirement
  nestEgg: 2500000,
  periodsInRetirement: 45,
  withdrawalRate: .03,
  // optimal bet sizing
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

  /** 50/50 probability, good vs bad return */
  goodPositiveReturn: 1.25,
  badPositiveReturn: .88,

  /** Time diversification */
  linearDecayFactor: .1,
  quadraticDecayFactor: .1,
  timeDiversificationLeverage: .4,
  
  
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
    this.refreshRetirementNestEgg();
    this.refreshOptimalBetSizing();
    this.refreshRandomWalk();
    this.refreshRebalanceRandomWalk();
    this.refreshTimeDiversification();
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

/** retirementNestEgg */
retirementNestEggBalance = createRetirementNestEggBalance(
  this.preferences.nestEgg, 
  this.preferences.periodsInRetirement, 
  this.preferences.withdrawalRate
);
retirementNestEggCashFlow = balanceToCashFlow(this.retirementNestEggBalance);
refreshRetirementNestEgg() {
  this.retirementNestEggBalance = createRetirementNestEggBalance(
    this.preferences.nestEgg, 
    this.preferences.periodsInRetirement, 
    this.preferences.withdrawalRate
  );
  this.retirementNestEggCashFlow = balanceToCashFlow(this.retirementNestEggBalance);
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
  this.randomWalkCashFlow = balanceToCashFlow(balance);
}

/** Rebalancing random walk */

rebalanceRandomWalkBalance = rebalanceRandomWalk(
  this.preferences.numPeriods,
  this.preferences.goodEvenReturn,
  this.preferences.badEvenReturn,
  this.preferences.startingBalance,
  this.preferences.randomWalkReturnLeverage,
);
rebalanceRandomWalkCashFlow = balanceToCashFlow(this.rebalanceRandomWalkBalance);
refreshRebalanceRandomWalk() {
  // 50/50 chance, you will get either a good or bad event
  
  // random walk
  const balance = rebalanceRandomWalk(
    this.preferences.numPeriods,
    this.preferences.goodEvenReturn,
    this.preferences.badEvenReturn,
    this.preferences.startingBalance,
    this.preferences.randomWalkReturnLeverage,
  );

  this.rebalanceRandomWalkBalance = balance;
  this.rebalanceRandomWalkCashFlow = balanceToCashFlow(balance);
}

/** Diversification */


/** Calculate nest egg for retirement */


/** Time diversification */
timeDiversificationBalance = timeDiversification(
  this.preferences.numPeriods,
  this.preferences.goodEvenReturn,
  this.preferences.badEvenReturn,
  this.preferences.startingBalance,
  this.preferences.savingsPerPeriod,
  this.preferences.timeDiversificationLeverage,
  this.preferences.nestEgg,
  this.preferences.quadraticDecayFactor,
  this.preferences.linearDecayFactor
);
timeDiversitimeDiversificationCashFlow = balanceToCashFlow(this.timeDiversificationBalance);
refreshTimeDiversification() {
  this.timeDiversificationBalance =  timeDiversification(
    this.preferences.numPeriods,
    this.preferences.goodEvenReturn,
    this.preferences.badEvenReturn,
    this.preferences.startingBalance,
    this.preferences.savingsPerPeriod,
    this.preferences.timeDiversificationLeverage,
    this.preferences.nestEgg,
    this.preferences.quadraticDecayFactor,
    this.preferences.linearDecayFactor
  );
  this.timeDiversitimeDiversificationCashFlow = balanceToCashFlow(this.timeDiversificationBalance);
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

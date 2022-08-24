import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';
import { gasOrElectric } from '../utils/gas-vs-electric-car';
import { rentVsBuy } from '../utils/rent-vs-buy';



@Component({
  selector: 'app-beginner-talk',
  templateUrl: './beginner-talk.component.html',
  styleUrls: ['./beginner-talk.component.scss']
})
export class BeginnerTalkComponent implements OnInit {

  lastValueOf<T>(val: T[]):T {
    return val[val.length - 1];
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

/** Utility Functions below */

function createRandomDataSeries(): c3.Primitive[] {
  return new Array(50).fill(0).map(() => Math.random()*200-100);
}

function createSavingsSeries(numPeriods: number, amount: number):number[] {
  return [0,...new Array(numPeriods).fill(amount)];
}

function createBondCashFlow(numPeriods: number, coupon:number,faceValue: number, price: number) {

const cashFlow = new Array(numPeriods+1).fill(coupon);
cashFlow[0] = -1*price;
cashFlow[cashFlow.length - 1] = cashFlow[cashFlow.length - 1] + faceValue;

return cashFlow;

}

interface CashFlowAccount {
  cashFlow: number[];
  account: number[];
}
function calculateOptimalBetSizing(numRedCards: number, numBlackCards: number, betSize: number, startingBalance = 1):CashFlowAccount {

  const redCards = new Array(numRedCards).fill('red');
  const blackCards = new Array(numBlackCards).fill('black');
  const unshuffledDeck = ([...blackCards,...redCards]);
  const shuffledDeck = shuffleDeck(unshuffledDeck);
  
  return shuffledDeck.reduce((accum, card) => {
    const previousBalance = accum.account[accum.account.length - 1];

    const absoluteCashFlow = previousBalance * betSize;
    const cashFlow = card === 'red' ?  absoluteCashFlow : -1 * absoluteCashFlow;
    
    accum.account.push(cashFlow + previousBalance);
    accum.cashFlow.push(cashFlow);

    return accum;

  }, {cashFlow:[startingBalance], account:[startingBalance]});

  function shuffleDeck(deck) {
    const shuffledDeck = [];
    while(deck.length > 0) {
      const index = Math.floor(Math.random() * deck.length);
      const card = deck.splice(index,1);
      shuffledDeck.push(card[0]);
    }
    return shuffledDeck;
  }

}
// create functions which convert:
// (1) balances to cash flow
// (2) cash flows to balances

function  createNaiveStocksCashFlow(numPeriods: number, growthRate, startingBalance:number) {
  return new Array(numPeriods).fill(0).reduce((accum) => {
    accum.push(accum[accum.length - 1] * growthRate);
    return accum;
  },[startingBalance]);
}

function balanceToCashFlow(balances:number[]) {
  const initialBalance = balances[0] ?? 0;
  return balances.reduce((accum, val, i) => {
    const cashFlow = i === 0 ? 
      initialBalance : // first cash flow is initial investment
      val - balances[i-1] // normal cash flow determination
      
    accum.push(cashFlow);
    return accum;
  },[]);
}

// sort by cash flow - back to original
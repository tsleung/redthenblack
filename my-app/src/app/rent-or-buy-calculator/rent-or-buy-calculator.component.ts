import { Component } from '@angular/core';

@Component({
  selector: 'app-rent-or-buy-calculator',
  templateUrl: './rent-or-buy-calculator.component.html',
  styleUrls: ['./rent-or-buy-calculator.component.scss']
})
export class RentOrBuyCalculatorComponent {
  controls = {
    // mortgage
    propertyPrincipal: new FormControl(1e6),
    downPayment: new FormControl(.2),
    mortgageRate: new FormControl(.05),
    mortgageDuration: new FormControl(30),
    realEstateAppreciation: new FormControl(1.04),
    closingCosts: new FormControl(.02),
    delayUntilPurchase: new FormControl(0),

    // buy
    miscAnnualCosts: new FormControl(2200 * 12),
    costInflation: new FormControl(1.02),
    mortgageInterestDeductionSaving: new FormControl(15e3),
    
    // rent
    numPeriods: new FormControl(30),
    rentAnnually: new FormControl(4400 * 12),
    rentInflation: new FormControl(1.09),
    // calculate opportunity cost in investments
    alternativeOpportunityRateOfReturn: new FormControl(1.08),

  }
  form = new FormGroup(this.controls);

  rent = this.form.valueChanges.pipe(
    map(() => {
      return this.calculateRent();
    }),
    startWith(this.calculateRent()),
    map(results => {
      return {
        totalPaidToRent: results.rent.at(-1),
        opportunityCost: results.opportunityCost.at(-1),
        charts: this.createChart([
          {name: 'rent', values: results.rent},
          {name: 'Alternative Opportunity w/ Down Payment', values: results.opportunityCost},
        ])
      };
    })
  );

  calculateRent() {
    const rent = calculateRent(
      this.controls.numPeriods.value,
      this.controls.rentAnnually.value,
      this.controls.rentInflation.value,
    );
    const opportunityCost = calculateOpportunityCost(
      this.controls.numPeriods.value,
      this.controls.alternativeOpportunityRateOfReturn.value,
      this.controls.propertyPrincipal.value,
      this.controls.downPayment.value,
    );

    return {
      rent,
      opportunityCost,
    }
  }
  mortgage = this.form.valueChanges.pipe(
    map(() => {
      return this.calculateMortgage();  
    }),
    startWith(this.calculateMortgage()),
    map(results => {
      return {
        totalInterestPaidToBank: results.map(v => v.interestPaidToBank).at(-1),
        finalHomeEquity: results.map(v => v.homeEquity).at(-1),
        finalLoanBalance: results.map(v => v.loanBalance).at(-1),
        closingCosts: this.controls.closingCosts.value * this.controls.propertyPrincipal.value,
        downPayment: this.controls.downPayment.value * this.controls.propertyPrincipal.value,
        charts: this.createChart([
          {name: 'homeEquity', values: results.map(v => v.homeEquity)},
          {name: 'interestPaidToBank', values: results.map(v => v.interestPaidToBank)},
          {name: 'loanBalance', values: results.map(v => v.loanBalance)},
        ])
      };
    })
  );

  calculateMortgage() {
    return calculateMortgage(
      this.controls.propertyPrincipal.value,
      this.controls.downPayment.value,
      this.controls.mortgageRate.value,
      this.controls.mortgageDuration.value,
      this.controls.realEstateAppreciation.value
    );
  }
  createChart(
    chartSeries: ChartSeries[]
  ) {
    const chartData = {
      x: 'x',
      columns: [
        ['x', ...new Array(chartSeries[0].values.length).fill(0).map((v, i) => i)],
        ...chartSeries.map((chartSeries) => {
          return [chartSeries.name, ...chartSeries.values];
        })
      ],
    };

    return chartData;
  }

  
  constructor() { }
}

interface ChartSeries {
  name: string;
  values: number[];
}

import { FormControl, FormGroup } from '@angular/forms';
import { map, publishReplay, refCount, startWith } from 'rxjs/operators';

// need to demonstrate an updated balance sheet for rent vs buy

function calculateRent(
  numPeriods: number,
  rentAnnually: number,
  rentInflation: number,
) {

  // checkbox to show opportunity cost of downpayment offset
  return new Array(numPeriods).fill(0).reduce((accum, v, i) => {
    const pastRent = accum.at(-1);
    const updatedRent = pastRent * rentInflation;

    return [...accum, updatedRent];
  }, [rentAnnually]);
}

function calculateOpportunityCost(
  numPeriods: number,
  alternativeOpportunityRateOfReturn: number,
  principal: number,
  downPayment:  number,

) {
  return new Array(numPeriods).fill(0).reduce((accum) => {
    const last = accum.at(-1);
    const appreciated = last * alternativeOpportunityRateOfReturn;
    
    return [...accum, appreciated];
  }, [principal * downPayment]);

}


function calculateMortgage(
  propertyPrincipal: number,
  downPayment:  number,
  mortgageRate:  number,
  mortgageDuration:  number,
  realEstateAppreciation: number,
) {
  const loanBalance = propertyPrincipal - downPayment;
  
  // should this be monthly?
  const annualAmortizationPayment = calculateAmortizationPayment(
    mortgageRate,
    mortgageDuration,
    loanBalance
  );
  // calculate how much is going to home equity vs interest
  // this should likely be a set of checkboxes that stack which show net worth impact
  // mortgage interest deduction 


  // including closing costs?
  // figure out costs paid to the bank
  return new Array(mortgageDuration).fill(0).reduce((accum, v, i) => {
    const last = accum.at(-1);
    const interestToPay = last.loanBalance * mortgageRate;
    const principalToPay = annualAmortizationPayment - interestToPay;
    const loanBalance = last.loanBalance - principalToPay;
    const propertyAppreciated = last.propertyValue * realEstateAppreciation;

    return [...accum, {
      propertyValue: propertyAppreciated,
      homeEquity: propertyAppreciated - loanBalance,
      interestPaidToBank: last.interestPaidToBank + interestToPay,
      loanBalance,
    }];

  }, [{
    propertyValue: propertyPrincipal,
    homeEquity: downPayment,
    interestPaidToBank: 0,
    loanBalance,
  }]);  

}

/**
 * 
 * @param i interest rate, annual / 12 if monthly payments
 * @param n number of payments, annual * 12 if monthly
 * @param loan balance of loan
 */
function calculateAmortizationPayment (i, n, loan) {
  const top = i * Math.pow((1+i), n);
  const bottom = Math.pow((1+i), n) - 1;

  return loan * top / bottom;
}

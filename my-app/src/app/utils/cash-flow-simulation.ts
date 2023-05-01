import * as R from 'ramda';

interface Period{
  salaryHours: number;
  salaryDollars: number;
  stockReturns: number;
  livingExpenses: number;
  stockAllocation: number;
  priceOfHouse: number;
  feeOfHouse: number;
  buyHome: boolean;
}

interface Portfolio {
  freeHours: number;
  cash: number;
  stock: number;
  isHomeowner: boolean;
  isRenter: boolean;
  homeEquity: number;
}

// reset hours per year
const resetHoursPerYear = (portfolio: Portfolio, period: Period) => {
  const hoursPerYear = 52*7*16
  portfolio.freeHours = hoursPerYear
};

const workJob = (portfolio: Portfolio, period: Period) => {
  portfolio.freeHours = portfolio.freeHours - period.salaryHours
  portfolio.cash = portfolio.cash + period.salaryDollars 
}

const stockReturns = (portfolio: Portfolio, period: Period) => {
  portfolio.stock = portfolio.stock * period.stockReturns
}

const deductLivingExpenses = (portfolio: Portfolio, period: Period) => {
  portfolio.cash = portfolio.cash - period.livingExpenses
}

const rebalanceStocks = (portfolio: Portfolio, period: Period) => {
  const investableAssets = portfolio.cash + portfolio.stock

  portfolio.stock = investableAssets * period.stockAllocation
  portfolio.cash = investableAssets * (1-period.stockAllocation)
}

const buyPrimaryResidenceAllCash = (portfolio: Portfolio, period: Period) => {
  if(!period.buyHome) {
    return;
  }
  portfolio.isHomeowner = true
  portfolio.isRenter = false
  portfolio.cash = portfolio.cash - period.priceOfHouse - period.feeOfHouse
  portfolio.homeEquity = period.priceOfHouse
}

function runPeriod(portfolio, state) {
  // make observations, state.visible should be a subset

  // apply actions

  // receive rewards
  

}

function createDecks() {
  // sample from 
  return {};
}

// get to a specific node, then simulate to next period. do this many times per period for a breadth first search

// we can get what will happen at each period (either single or the full distribution)

// environmental factors are external to our own decisions
// decisions are made at the beginning

// OODA loop, observe, orient, decide, act -> environment acts next and feedback leads to next period.
// each period is player acts first, then opponent (which is the environment )

// RL Observation of environment
function observe(environment) {

}

// RL Value of given observable states
function orient(observations) {

}

// RL Policy upon Value, determinig which actions to take given policy and value model
function decide(orientation) {

}

// RL Actions taken given Policy
function act(decision) {

}

// this interface should be, for a specific number of periods (which can be 1 period), run a number of simulation and return the results of those simulations

// A Period is Derived from a set of Decks, drawing as per the draw rules

// A Portfolio may trade through a single Period
// Trades are dependent on the Policy provided for the period(?)

// Because this is an MDP, we can start a Simulation from any period, at any portfolio, at any state

// A Simulation is a number of Portfolio Traded Periods and a number of individual Simulation runs for those periods



interface SimulationInput {
  numberOfPeriods: number;
  numberOfSimulations: number;
}

interface SimulationRun {
  periods: Period[];
  portfolioHistory: Portfolio[]
}


interface SimulationResults {
  runs: SimulationRun[];
}

/**
 * Creates the environment which is reflected by independent periods over a time horizon
 */
function createPeriods(simulationInput: SimulationInput):Period[] {
  const decks = {
    stockReturns: [],
    interestRates: [],
    inflationRates: [],
  };

  // Years for periods
  const periods: Period[] = new Array(simulationInput.numberOfPeriods).fill(0).map((v,i) => {
    const period: Period = {
      salaryHours: 50*40,
      salaryDollars: 1e5,
      stockReturns: 1.1,
      livingExpenses: 2e4,
      stockAllocation: .6,
      priceOfHouse: 2e5,
      feeOfHouse: .06,
      buyHome: i === 10,
    };

    return period;
  }, []);

  return periods;
}

/**
 * A single run through simulation
 */
function runSimulation(simulationInput: SimulationInput):SimulationRun {
  const startingPortfolio = {
    freeHours: 0,
    cash: 0,
    stock: 0,
    isHomeowner: false,
    isRenter: true,
    homeEquity: 0,
  };

  const periods = createPeriods(simulationInput);

  const trades = [
    resetHoursPerYear,
    workJob,
    stockReturns,
    deductLivingExpenses,
    rebalanceStocks,
    buyPrimaryResidenceAllCash
  ];

  const portfolioHistory = periods.reduce((portfolios, period) => {
    // create new portfolio copy for mutation
    const copiedPortfolio = {...portfolios.at(-1)};
    // execute each trade over the entire portfolio
    const updatedPortfolio = trades.reduce((portfolio, trade) => {
      // cause mutation
      trade(copiedPortfolio, period);

      // add to portfolios
      return portfolio;
    }, copiedPortfolio);

    return [...portfolios, updatedPortfolio];
  }, [startingPortfolio]);
  
  console.log('portfolioHistory', portfolioHistory)

  return {
    periods,
    portfolioHistory,
  }
}

/**
 * Test stub being used to validate code works
 */
export function runTestSimulation() {
  console.log('running test sim');
  const simulationInputs = {
    numberOfPeriods: 30,
    numberOfSimulations: 10,
  };

  const runs = new Array(simulationInputs.numberOfSimulations).fill(0).map(() => {
    const run = runSimulation(simulationInputs);

    return run;
  });

  const simulationResults = {
    runs,
  }
  

  console.log('simulationResults', simulationResults);
  // start arbitrarily halfway through and run more
}
export enum Factor {
  Cash,
  Inflation,
  Equity,
  House,
  Car,
}

function createRebalancePolicy(portfolio: Portfolio) {
  // creates an allocation for equitities
  // let's check the timestep 

  return portfolio;
}

function updateProgress(timestep: Timestep, progress: number): Timestep {
  timestep.progress = betweenZeroAndOne(progress);
  return timestep;
}
function betweenZeroAndOne(val: number) {
  // maybe throw an error here?
  return Math.min(1, Math.max(0, val));
}
interface Timestep {
  portfolio: Portfolio;
  // maybe not the right place to put this, but environment data?
  timestep: number;
  progress: number; // 0-1 
}
export interface Portfolio {
  assets: Asset[];
}

export interface TradePolicy {
  // each policy is a system / decision to make
  // these should be stacked in order of execution
  policies: ((portfolio: Portfolio) => Portfolio)[];
  // this can have a model embedded in it when created, or taking more
  // observations than the asset itself
}

export interface Change {
  multiplier: number;
  factor: Factor
}

export interface Asset {
  value: number;
  factors: Factor[];
}

export interface Trade {
  from: Asset;
  to: Asset;
  value: number;
}

// don't implement yet, but a trade will execute and can add a cost to it
export interface TradeCost { }

// create an asset that is exposed to several different systems
// allow many systems to change an asset

export function hasFactor(asset: Asset, factor: Factor): boolean {
  // does this work? 
  return asset.factors.includes(factor);
}

export function tradeValueForAssets(trade:Trade, portfolio: Portfolio): void{
  // should guard against not enough value to make the trade
  const from = portfolio.assets.find(suspect => suspect.factors.includes(trade.from.factors[0]));

  const to = portfolio.assets.find(suspect => suspect.factors.includes(trade.to.factors[0]));

  addAssetTo(from,{...from, value: trade.value*-1});
  addAssetTo(to,{...to, value: trade.value});
}

// mutation so void
export function applyChangeTo(asset: Asset, change: Change): void {
  // should probably guard against assets which aren't in change
  asset.value = asset.value * change.multiplier;
}

export function addAssetTo(asset: Asset, contribution: Asset): void {
  // should guard assets are same type maybe?..
  asset.value = asset.value + contribution.value;
}

export function makeTrades(tradePolicy: TradePolicy, portfolio: Portfolio): Portfolio {
  return tradePolicy.policies.reduce((portfolio, policy) => {
    return policy(portfolio);
  }, portfolio);
}
// safe update of portfolio
export function clonePortfolio(portfolio: Portfolio): Portfolio {
  return JSON.parse(JSON.stringify(portfolio)) as Portfolio;
}
export function applyEnvironmentToPortfolioAssets(changes: Change[], assets: Asset[]): Asset[] {
  return assets.map(asset => {
    return changes
      .filter(change => hasFactor(asset, change.factor))
      .reduce((asset, change) => {
        applyChangeTo(asset, change);
        return asset;
      }, asset);
  });
}
// mutation
export function runTimestep(
  tradePolicy: TradePolicy,
  portfolio: Portfolio,
  changes: Change[]
): Portfolio {

  portfolio.assets = applyEnvironmentToPortfolioAssets(changes, portfolio.assets);
  return makeTrades(tradePolicy, portfolio);
  // read the market, do trades e.g. read policy to make changes

  // for each asset
  // use policy for time series, can use any context required. 
  // can use a model so long as it is understandable
  // - will need to figure out how to serialze the model
  // create policy, trigger for action to take place

}

export function toBalance(assets: Asset[]): number {
  return assets.reduce((accum, asset) => {
    return asset.value + accum;
  }, 0);
}

export function onlyCash(portfolio: Portfolio): Asset[] {
  return portfolio.assets.filter(suspect => suspect.factors.includes(Factor.Cash));
}
// Checks if asset is in portfolio, if not adds a new one with value
function addUniqueAssetToPortfolio() {

}

// maybe only create assets, mark as sold and hide but don't delete

// create documentation and marketing for each (a) asset (b) factor supported for changes

// move into first equity portfolio
// trade cash for first house, for second house.
// invest in first house, modify change of that house

// sample historically or randomly
// correlated, bind historically inflation + equities. if can, housing prices, so sampling occurs together.
// in either case, get the change per index

// assets across the columns
// change in time going down the rows
// between each row is a 'change' in the asset


// every system of change gets a sheet. a merge of all systems get applied as the net change for the asset which is exposed to the factor that the system of change affects

// can have an alternate spreadsheet that just shows change per asset for each row

// asset metadata sheet list the factors which the asset is exposed to, this sheet columns are factors and rows are assets. this is a matrix








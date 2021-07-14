
interface ValueResult {
    value: number;
    runSamples: [],
    allRuns: []
}
// solve for value, given time and confidence
function solveValue(numPeriods, threshold) {

    return {
        value: 0,
        runSamples: [],
        allRuns: []
    }
}

function solveConfidence(value, numPeriods) {
    // given 

}

// may not be able to solve!
function solveTime(value, threshold) {
    // 

}


function createTimebox() {

}
// 250 per year, 75 years
// runs in sets of 20

// determines when you can retire, aka 0 savings rate contribution solver
function retirementSolver() {

}

interface StockMarketParameters {
    timeDiversification: number; // between 0 and 1 decay rate
}
// time delay
// proportion to retirement delay
function createStockMarketRun() {
    // create n random between 0-1
    // sample over the distribution with samples
    // roll forward each instance
}

interface IncomeModelParameters {
    savingsRate: number; // between 0-1, describes how much to invest of savings
    // should determine when to stop saving, when is it not worth it or impactful
}
function createIncomeRun(params: IncomeModelParameters) {

}

interface Account {

}
// create a simulation box
// 45 years
// value, confidence, time


// create a bunch of indices
// Apply policy to each 'state'
// agent is better with pins at identifying 'short term blockers'
// e.g. how much time do we REALLY have before retirement, if kids have to go to college

// target, safety, reach
// 40, 5, 60



// agent environment 
// observation, reward, action

// RtB develops optimal agents given reward characteristics
// Agents have observations which are suitable to the client
// Agents take actions and deliver the insights of those actions to the client
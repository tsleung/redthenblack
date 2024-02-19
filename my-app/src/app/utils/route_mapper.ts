
export function createHomeRoute() {
  return '/';
}

export function createMayaRoute() {
  return '/m/0/';
}
export function createMayaIntro() {
  return createMayaRoute() + 'intro';
}

export function createMayaDashboard() {
  return createMayaRoute() + '/dashboard';
}

export function createMayaOnboarding() {
  return createMayaRoute() + '/onboarding';
}

export function createMayaOnboardingSavings() {
  return createMayaOnboarding() + '/savings/';
}
export function createMayaOnboardingNewbie() {
  return createMayaOnboarding() + '/newbie/';
}
export function createMayaOnboardingDipper() {
  return createMayaOnboarding() + '/dipper/';
}
export function createMayaOnboardingFinancier() {
  return createMayaOnboarding() + '/financier/';
}
export const NEST_EGG_FRAGMENT = 'nest-egg';
export function createMayaNestEgg() {
  return createMayaOnboarding() + `/${NEST_EGG_FRAGMENT}`;
}
export function createMayaPath() {
  return createMayaOnboarding() + '/path';
}
export const INVESTING_FRAGMENT = 'investing';
export function createMayaInvesting() {
  return createMayaOnboarding() + `/${INVESTING_FRAGMENT}`;
}
export const INVESTING_ADDITIONAL_FRAGMENT = 'investing/additional';
export function createMayaInvestingAdditional() {
  return createMayaOnboarding() + `/${INVESTING_ADDITIONAL_FRAGMENT}`;
}

export const GAME_OF_LIFE_FRAGMENT = 'life-events';
export function createGameOfLife() {
  return createMayaOnboarding() + `/${GAME_OF_LIFE_FRAGMENT}`;
}

export function createMayaEducation() {
  return createMayaRoute() + '/education';
}
export function createMayaCalculator() {
  return createMayaRoute() + '/calculators/';
}
export function createMayaCalculatorList() {
  return createMayaCalculator() + '/list';
}
export function createSavingsCalculator() {
  return createMayaCalculator() + '/savings';
}
export function createIndexingCalculator() {
  return createMayaCalculator() + '/indexing';
}
export function createRentOrBuyCalculator() {
  return createMayaCalculator() + '/rent-or-buy';
}
export function createComparingCashFlowsCalculator() {
  return createMayaCalculator() + '/comparing-cash-flows';
}
export function createBackToSchoolCalculator() {
  return createMayaCalculator() + '/back-to-school';
}
export function createGasOrElectricCalculator() {
  return createMayaCalculator() + '/gas-or-electric';
}
export function createRetirementWithdrawalCalculator() {
  return createMayaCalculator() + '/retirement-withdrawal';
}
export function createMortgageYourRetirement() {
  return createMayaCalculator() + '/mortgage-your-retirement';
}
export function createOptimalBetSizingCalculator() {
  return createMayaCalculator() + '/optimal-bet-sizing';
}
export function createSeniorCareCalculator() {
  return createMayaCalculator() + '/senior-care';
}
export function createMathToAMillionaireCalculator() {
  return createMayaCalculator() + '/math-to-millionaire';
}
export function createKidsCollegeFundCalculator() {
  return createMayaCalculator() + '/kids-college-fund';
}
export function createCouplesFinancesCalculator() {
  return createMayaCalculator() + '/couples-finances';
}
export function createWeddingHoneymoonDownPaymentCalculator() {
  return createMayaCalculator() + '/wedding-honeymoon-down-payment';
}
export function createDebtHedgeInflationCalculator() {
  return createMayaCalculator() + '/debt-hedge-inflation';
}
export function createAmortizationCalculator() {
  return createMayaCalculator() + '/amortization';
}
export function createPerpetuityCalculator() {
  return createMayaCalculator() + '/perpetuity';
}
export function createFrontloadDca401kCalculator() {
  return createMayaCalculator() + '/frontload-dca-401k';
}

export function createMillionaireArticleRoute() {
  return createArticlesRoute() + '/millionaire';
}

export function createProfileRoute() {
  return createMayaRoute() + '/profile';
}
export function createAlternativeScenariosRoute() {
  return createProfileRoute() + '/alternative-scenarios';
}
export function createShareRoute() {
  return createMayaRoute() + '/share';
}
export function createShareScenarioRoute(id:string) {
  return createShareRoute() + `/scenario/${id}`;
}
export function createEcsRoute() {
  return createMayaRoute() + '/ecs';
}

export function createEcsGalleryRoute() {
  return createEcsRoute() + '/gallery';
}

export function createLifeEventsRoute() {
  return createMayaRoute() + '/life-events';
}

export function createLifeEventsListRoute() {
  return createLifeEventsRoute() + '/list';
}

export function createLifeEventsAddTypeRoute(type: string) {
  return createLifeEventsRoute() + `/add/${type}`;
}

export function createLoanTypeRoute(type: string) {
  return createLifeEventsAddTypeRoute(type) + `/loan`;
}
export function createPolynomialTypeRoute(type: string) {
  return createLifeEventsAddTypeRoute(type) + `/polynomial`;
}

export function createLifeEventsEditTypeRoute(type: string) {
  return createLifeEventsRoute() + `/edit/${type}`;
}

export function createLifeEventsResultsRoute() {
  return createLifeEventsRoute() + '/results';
}

function createLegacyRoute() {
  return '/l/0';
}

export function createLearnRoute() {
  return createLegacyRoute() + '/learn';
}

export function createRetirementRoute() {
  return createLegacyRoute() + '/retirement';
}

export function createUpgradeRoute() {
  return createLegacyRoute() + '/upgrade';
}

export function createArticlesRoute() {
  return '/articles';
}

export function createAboutRoute() {
  return '/about';
}

export function createDatasetRoute() {
  return '/datasets';
}

export function createPitchRoute() {
  return '/pitch';
}

export function createGameRoute() {
  return '/game';
}

export function createEditorRoute() {
  return '/editor';
}

export function createContactMeRoute() {
  return "https://www.linkedin.com/in/terranleung/";
}
export function createSP500DatasetRoute() {
  return createDatasetRoute() + 'sp500';
}

export function createResourcesRoute() {
  return createArticlesRoute() + '/resources';
}
export function createLeverageParameterCollectionRoute() {
  return createParameterCollectionRoute() + '/leverage';
}

export function createWorkingParameterCollectionRoute() {
  return createParameterCollectionRoute() + '/working';
}

export function createRetirementParameterCollectionRoute() {
  return createParameterCollectionRoute() + '/retirement';
}

export function createIncomeParameterCollectionRoute() {
  return createParameterCollectionRoute() + '/income';
}
export function createSimulationParameterCollectionRoute() {
  return createParameterCollectionRoute() + '/simulation';
}

export function createMillionaireParameterCollectionRoute() {
  return createParameterCollectionRoute() + '/millionaire';
}

export function createNestEggParameterCollectionRoute() {
  return createParameterCollectionRoute() + '/egg';
}

export function createParameterCollectionRoute() {
  return createLegacyRoute() + '/params';
}

export function createMayaRoute() {
    return '/m/0/';
}
export function createMayaIntro() {
    return createMayaRoute() + 'intro';
}

export function createMayaDashboard() {
    return createMayaRoute() + 'dashboard';
}
export function createMayaOnboarding() {
    return createMayaRoute() + 'onboarding';
}

export function createMayaEducation() {
    return createMayaRoute() + 'education';
}
export function createMayaCalculator() {
    return createMayaRoute() + 'calculators/';
}
export function createMayaCalculatorList() {
    return createMayaCalculator() + 'list';
}
export function createSavingsCalculator() {
    return createMayaCalculator() + 'savings';
}
export function createIndexingCalculator() {
    return createMayaCalculator() + 'indexing';
}
export function createRentOrBuyCalculator() {
    return createMayaCalculator() + 'rent-or-buy';
}
export function createComparingCashFlowsCalculator() {
    return createMayaCalculator() + 'comparing-cash-flows';
}
export function createBackToSchoolCalculator() {
    return createMayaCalculator() + 'back-to-school';
}

export function createMillionaireArticleRoute() {
    return createArticlesRoute() + '/millionaire';
}

export function createArticlesRoute () {
    return '/articles';
}

export function createAboutRoute () {
    return '/about';
}

export function createDatasetRoute () {
    return '/datasets';
}

export function createPitchRoute () {
    return '/pitch';
}

export function createContactMeRoute() {
    return "https://www.linkedin.com/in/terranleung/";
}
export function createSP500DatasetRoute () {
    return createDatasetRoute() + 'sp500';
}

export function createResourcesRoute() {
    return createArticlesRoute() + '/resources';
}
export function createLeverageParameterCollectionRoute () {
    return createParameterCollectionRoute() + '/leverage';
}

export function createWorkingParameterCollectionRoute () {
    return createParameterCollectionRoute() + '/working';
}

export function createRetirementParameterCollectionRoute () {
    return createParameterCollectionRoute() + '/retirement';
}

export function createIncomeParameterCollectionRoute () {
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

export function createParameterCollectionRoute () {
    return '/params';
}
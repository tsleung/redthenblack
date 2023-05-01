import * as MAYA_ROUTES from "../maya_routes";


export function createMayaRoute() {
    return '/maya/';
}
export function createMayaIntro() {
    return createMayaRoute() + MAYA_ROUTES.INTRO.path;
}

export function createMayaDashboard() {
    return createMayaRoute() + MAYA_ROUTES.DASHBOARD.path;
}
export function createMayaOnboarding() {
    return createMayaRoute() + MAYA_ROUTES.ONBOARDING.path;
}
export function createMayaEducation() {
    return createMayaRoute() + MAYA_ROUTES.EDUCATION.path;
}
export function createMayaCalculator() {
    return createMayaRoute() + MAYA_ROUTES.CALCULATOR.path;
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
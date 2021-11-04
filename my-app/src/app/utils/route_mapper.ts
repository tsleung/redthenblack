export function createMillionaireArticleRoute() {
    return createArticlesRoute() + '/millionaire';
}

export function createArticlesRoute () {
    return '/articles';
}

export function createAboutRoute () {
    return '/about';
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
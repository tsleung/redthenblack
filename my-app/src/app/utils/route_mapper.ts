

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

export function createParameterCollectionRoute () {
    return '/params';
}
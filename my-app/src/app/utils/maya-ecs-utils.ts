import { Entity, getMandatoryComponentOrError } from "./maya-ecs-entities";
import { Cash, Component, ComponentKey, ComponentType, VolatileAsset } from "./maya-ecs-components";


export function fetchAllByType<T>(
  collection: Map<ComponentKey,Component>, 
  componentType: ComponentType
):T[] {
  return Array.from(collection.values())
  .filter(suspect => suspect.type === componentType)
  .map(component => component as T);
}

export function totalCashValue(entity: Entity) {
  const cash = getMandatoryComponentOrError<Cash>(entity, ComponentKey.Cash);
  return cash.value;
}

export function totalVolatileAssetValue(entity: Entity):number {

  const volatileAssets = fetchAllByType<VolatileAsset>(
    entity.components, 
    ComponentType.VolatileAsset
  );

  const volatileAssetsValue = volatileAssets.reduce((total, asset) => asset.value + total,0);
  
  return volatileAssetsValue;
}

// TODO: This definitely needs a unit test and third party module
export function executeReallocation(
  cash: Cash, 
  volatileAsset: VolatileAsset,
  desiredPosition: number,
  ):void {
    const currentPosition = volatileAsset.value;
    
    const contribution = desiredPosition - currentPosition;

    volatileAsset.value = volatileAsset.value + contribution;
    cash.value = cash.value - contribution;

}

export function calculateDesiredPosition(percentage: number, totalPortfolioValue: number) {
  return percentage * totalPortfolioValue;
}


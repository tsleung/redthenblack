import { Component, ComponentKey} from "./maya-ecs-components";

// Entities
export class Entity {
  constructor(
    public readonly id: number,
    public components: Map<ComponentKey, Component> = new Map()
  ) {}
}

export function setComponent(entity: Entity, component: Component) {
  entity.components.set(component.key, component);
}

export function getComponent<T>(entity: Entity, key: ComponentKey): T | undefined {
  const value = entity.components.get(key);

  return value as T | undefined;
}

export function getMandatoryComponentOrError<T>(entity:Entity, componentKey: ComponentKey) {
  const component = getComponent<T>(entity, componentKey);
  if (!component) {
    throw new Error(`Missing '${componentKey}'. Have you tried adding it to your plan? Please contact for help!`);
  }
  return component;
}

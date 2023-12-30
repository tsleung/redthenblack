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
import { Component, ComponentKey, ComponentType } from "./maya-ecs-components";

export interface Field {
  name: string;
  value: string|number;
  readFrom: (component: Component, field: Field) => void;
  updateTo: (component: Component, field: Field) => void;
}

export interface Calculator {
  title: string;
  href: string;
  description: string;
}

/**
 * Life event is expressed semantically. 
 * Before use in simulation, should be expanded deterministically
 */
export interface LifeEvent {
  name: string;
  icon: string;
  addHref: string;
  editHref: string;
  fields: Field[];
  componentKey: ComponentKey;
  componentType: ComponentType;
  createComponent: () => Component;
  createFriendlyFieldDescription: () => string;
  calculators: Calculator[];
  optional: boolean;
}
import { createHighlightNumber } from "../config/life-event-config";
import { LifeEventsService } from "../services/life-events.service";
import { SimulationManager, Snapshot } from "./maya-ecs";
import { Cash, Component, ComponentKey, ComponentType, Stocks, Traditional401k } from "./maya-ecs-components";
import { Entity, setComponent } from "./maya-ecs-entities";

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
  createSupplementary: () => string;
  calculators: Calculator[];
  optional: boolean;
}

// create a life event service builder, where the service contains state
export class EntityBuilder {
  _components: Component[] = [];
  private _accounts = {
    cash: new Cash(0),
    traditional401k: new Traditional401k(0,[1]),
    stocks: new Stocks(0,[1]),
  }
  
  constructor(readonly _entity: Entity) {}

  build(): SimulationManager {
    return createSimulationManagerFrom(
      [
        this._accounts.cash,
        this._accounts.traditional401k,
        this._accounts.stocks,
        ...(this._components)
      ],
      this._entity,
    )
  }
  components(components: Component[]) {
    this._components = components;
    return this;
  }
  cash(cash: Cash) {
    this._accounts.cash = cash;
    return this;
  }
  stocks(val: Stocks) {
    this._accounts.stocks = val;
    return this;
  }
  traditional401k(val: Traditional401k) {
    this._accounts.traditional401k = val;
    return this;
  }
  

}



function createSimulationManagerFrom(
  components: Component[],
  entity: Entity,
):SimulationManager {
  // Create an entity within the simulation manager and set component
  const simulationManager = new SimulationManager();
  
  // set bespoke components
  components.forEach(component => {
    setComponent(entity, component);
  });

  return simulationManager;

}

export function convertComponentsToLifeEvents(
  components: Component[],
  availableLifeEvents: LifeEvent[],
) {
  return components.map(component => {
    const lifeEvent = availableLifeEvents.find(suspect => suspect.componentKey === component.key);
    if(!lifeEvent){
      console.error('no life event for ' + component.key, component)
    }
    
    lifeEvent.fields.forEach(field => {
      field.readFrom(component, field);
    });


    const createFriendlyFieldDescription = () => {
      const highlight = createHighlightNumber(
        lifeEvent.componentType,
        lifeEvent.componentKey,
        component,
      );
  
      return highlight ?? lifeEvent.fields.map(field => `${field.name}: ${field.value}`).join(', ');
    };
    lifeEvent.createFriendlyFieldDescription = createFriendlyFieldDescription;

    return lifeEvent;
  }).filter(Boolean)
  .sort((a,b) => {
    return a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase());
  });
}
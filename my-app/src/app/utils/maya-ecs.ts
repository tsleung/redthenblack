import { Entity } from "./maya-ecs-entities";
import { IncomeSystem, MarketSystem } from "./maya-ecs-systems";


// RiskLevel component
enum RiskLevel { Low, Medium, High }

// ... (other components as needed)


class EntityManager {
  public readonly entities: Entity[] = [];

  createEntity(): Entity {
    const entity: Entity = new Entity( 
      this.entities.length,
      new Map()
    );
    this.entities.push(entity);
    return entity;
  }

  // ... (methods for adding/removing/getting components)
}

export class Snapshot {
  entityManager = new EntityManager();
  
  constructor() {}
}


export class SimulationManager {
  private readonly systems = [new MarketSystem(), new IncomeSystem(), /* ... */];

  
  constructor() {}

  createNextSnapshot(current: Snapshot) {
    // create a copy
    const next = structuredClone(current);
    // run all systems to update to next period
    for (const system of this.systems) {
      
      system.update(next.entityManager.entities);
      // console.log('update', next.entityManager.entities)
    }
    // return the copy
    return next;
  }

  createSimulation(rootSnapshot: Snapshot, numberOfPeriods: number) {
    return new Array(numberOfPeriods).fill(0).reduce((accum) => {
      const current = accum.at(-1);
      return [...accum, this.createNextSnapshot(current)];
    },[rootSnapshot]);
  }

  createSimulations(rootSnapshot: Snapshot, numberOfSimulations: number, numberOfPeriods: number):Snapshot[][] {
    return new Array(numberOfSimulations).fill(0).map(() => {
      return this.createSimulation(rootSnapshot, numberOfPeriods);
    });
  }
}

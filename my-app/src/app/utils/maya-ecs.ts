import { Entity } from "./maya-ecs-entities";
import { CashFlowSystem, LoanSystem, VolatileAssetSystem, System, ContributionSystem } from "./maya-ecs-systems";

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

  constructor() { }
}

export class SimulationManager {
  private readonly systems: System[] = [new ContributionSystem(), new LoanSystem(), new VolatileAssetSystem(), /* ... */];

  constructor() { }

  private createNextSnapshot(current: Snapshot, pastPeriod: number) {
    // create a copy
    const next = structuredClone(current);
    // run all systems to update to next period
    for (const system of this.systems) {

      system.update(next.entityManager.entities, pastPeriod);
      // console.log('update', next.entityManager.entities)
    }
    // return the copy
    return next;
  }

  private createSimulation(rootSnapshot: Snapshot, numberOfPeriods: number) {
    return new Array(numberOfPeriods).fill(0).reduce((accum) => {
      const current = accum.at(-1) ?? rootSnapshot;
      return [...accum, this.createNextSnapshot(current, accum.length)];
    }, []);
  }

  createSimulations(rootSnapshot: Snapshot, numberOfSimulations: number, numberOfPeriods: number): Snapshot[][] {
    return new Array(numberOfSimulations).fill(0).map((v, simIndex) => {
      return this.createSimulation(rootSnapshot, numberOfPeriods);
    });
  }
}

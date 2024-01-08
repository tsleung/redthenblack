import { Injectable } from '@angular/core';
import { SimulationManager, Snapshot } from '../utils/maya-ecs';
import { Cash, Component, ComponentKey, Job, SavingsAccount, Stocks, ValueComponent } from '../utils/maya-ecs-components';
import { getComponent, setComponent } from '../utils/maya-ecs-entities';
import { BehaviorSubject, Observable, Subject, asyncScheduler, merge } from 'rxjs';
import { map, publishReplay, refCount, scan, shareReplay, startWith, tap, throttleTime } from 'rxjs/operators';


export enum ComponentActionType {
  Add,
  Remove,
}

interface ComponentAction {
  action: ComponentActionType;
  component: Component;
}

/**
 * A bundle of simulations with is sourced from a single entity
 * - Components are added to the entity
 * 
 * A snapshot is created for each period within each simulation. A snapshot is a copy, so that prior snapshots are not modified.
 */
@Injectable({
  providedIn: 'root'
})
export class MayaUserExperienceService {
  simulationManager = new SimulationManager();
  addComponent: Subject<Component> = new Subject<Component>(); 
  removeComponent: Subject<Component> = new Subject<Component>(); 
  

  private addComponentAction:Observable<ComponentAction> = this.addComponent.pipe(map(component => {
    return {component, action: ComponentActionType.Add} as ComponentAction;
  }));
  private removeComponentAction:Observable<ComponentAction> = this.removeComponent.pipe(map(component => {
    return {component, action: ComponentActionType.Remove} as ComponentAction;
  }));

  components: Observable<Map<ComponentKey,Component>> = merge(
    this.addComponentAction, this.removeComponentAction
    ).pipe(
    scan((accum, val:ComponentAction) => {
      if(val.action === ComponentActionType.Add) {
        console.log('ADDING', val)
        accum.set(val.component.key, val.component);
      }

      if(val.action === ComponentActionType.Remove) {
        console.log('removing', val)
        accum.delete(val.component.key)
      }

      console.log('accum components', accum);
      return accum;
    }, new Map<ComponentKey,Component>()),
    shareReplay(),
    throttleTime(200, asyncScheduler, {trailing: true}),
    startWith(new Map<ComponentKey,Component>()),
  );
  constructor() {}

  numberOfPeriods = 60;
  numberOfSimulations = 200;
  simulations =  this.components.pipe(map(components => {
      const rootSnapshot = new Snapshot();
      const entity = rootSnapshot.entityManager.createEntity();
      
      components.forEach(component => {
        setComponent(entity, component);
      });
  
      
      const simulations = this.simulationManager.createSimulations(rootSnapshot, this.numberOfSimulations, this.numberOfPeriods);
      return simulations;
    }),
    publishReplay(),
    refCount(),
  );
    

  simulationsBalances = this.simulations.pipe(map(simulations => {
      const simulationsCashValue = simulations.map(simulation => {
        return simulation.map(period => {
          return period.entityManager.entities.reduce((accum, entity) => {
            
            // should this be explicit? maybe even a toggle of which to include in the 'value' summation? maybe list all components included, have an include/exclude list
            const cash = getComponent<Cash>(entity, ComponentKey.Cash);
            const stocks = getComponent<Stocks>(entity, ComponentKey.Stocks);
            const savingsAccount = getComponent<SavingsAccount>(entity, ComponentKey.SavingsAccount);
  
            return value(cash) + value(stocks) + value(savingsAccount);
  
          },0);
        });
      });

      return simulationsCashValue;
    }));
 
    /**
     * Finds the highest value of the simulation, the nest egg or 'peak' wealth required
     */
    nestEgg = this.simulationsBalances.pipe(map(simulations => {
      const maxOfAllSimulations = simulations.map(simulation => {
        const maximumValue = Math.max(...simulation);
        return maximumValue;
      });

      // replace when we have target threshold, for now find the median
      maxOfAllSimulations.sort();
      const midIndex = Math.floor(maxOfAllSimulations.length / 2);
      
      return friendlyMoney(maxOfAllSimulations[midIndex],1);
    }));
  

    /**
     * finds when the highest value was, when the nest egg is hit, which is when retirement allegedly started
     */
  retirementAge = this.simulationsBalances.pipe(map(simulations => {
    const maxOfAllSimulations = simulations.map(simulation => {
      const maximumValue = Math.max(...simulation);
      return simulation.lastIndexOf(maximumValue);
    });

    // replace when we have target threshold, for now find the median
    maxOfAllSimulations.sort();
    const midIndex = Math.floor(maxOfAllSimulations.length / 2);
    return `${maxOfAllSimulations[midIndex]}`;
  }));

  /**
   * Find any simulations that have hit below 0, meaning ran out of money
   */
  retirementConfidence = this.simulationsBalances.pipe(map(simulations => {
    const minimumValue = simulations.map(simulation => {
      const minimumValue = Math.min(...simulation);
      return minimumValue;
    });

    // replace when we have target threshold, for now find the median
    const failedRetirements = minimumValue.filter(suspect => suspect < 0);
    
    // rate of failure / all simulations
    const decimal = 1 - (failedRetirements.length / minimumValue.length);
    return `${Math.round(decimal * 100) ?? '0'}`;
  }));
  
}

function value(component: ValueComponent|undefined, fallback: number = 0):number { 
  return component ? component.value : fallback;
}
// https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
function friendlyMoney(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function (item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

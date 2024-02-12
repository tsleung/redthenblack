import { Injectable } from '@angular/core';
import { SimulationManager, Snapshot } from '../utils/maya-ecs';
import { AmortizedLoan, Cash, Component, ComponentKey, ComponentType, Job, SavingsAccount, Stocks, Traditional401k, ValueComponent, VolatileAsset } from '../utils/maya-ecs-components';
import { getComponent, setComponent } from '../utils/maya-ecs-entities';
import { Observable, Subject, merge, of } from 'rxjs';
import { catchError, debounceTime, filter, map, publishReplay, refCount, scan, shareReplay, startWith, tap, throttleTime } from 'rxjs/operators';
import { FirebaseService } from './firebase.service';
import { MatSnackBar } from '@angular/material/snack-bar';



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
        // console.log('ADDING', val)
        accum.set(val.component.key, val.component);
      }

      if(val.action === ComponentActionType.Remove) {
        // console.log('removing', val)
        accum.delete(val.component.key)
      }

      // console.log('accum components', accum);
      return accum;
    }, new Map<ComponentKey,Component>()),
    shareReplay(),
    // throttleTime(200, asyncScheduler, {trailing: true}),
    debounceTime(200),
    tap(components => {
      console.log('components', components);
    }),
    startWith(new Map<ComponentKey,Component>()),
  );
  
  alwaysOn = this.components.subscribe();
  constructor(
    private firebaseService: FirebaseService,
    readonly snackbar: MatSnackBar

  ) {
    this.initializeComponents();
  }
  

  async initializeComponents() {
    const initializeAnonymousUser = () => {
      this.addComponent.next(new Cash(0));
      console.log('loaded anon component, cash only')
    };
    
    const initializeLoggedInUser = async () => {
      const components = (await this.firebaseService.loadActiveScenario()).components;
      components.forEach(component => {
        this.addComponent.next(component);
      });
      console.log('loaded from server', components)
    }
    
    this.firebaseService.getUser().then(user => {
      return user && user.email ? 
        initializeLoggedInUser() : 
        initializeAnonymousUser();
    });
  }

  periodsUntilRetirement = 30;
  periodsOfRetirement = 30;

  calculateTotalNumberOfPeriods() {
    return this.periodsOfRetirement + this.periodsUntilRetirement;
  }

  numberOfSimulations = 500;
  // numberOfSimulations = 1;
  simulations:Observable<Snapshot[][]> = this.components.pipe(
    filter(components => components.size > 0),
    map(components => {
      const rootSnapshot = new Snapshot();
      const entity = rootSnapshot.entityManager.createEntity();

      components.forEach(component => {
        setComponent(entity, component);
      });
      
      const simulations = this.simulationManager.createSimulations(
        rootSnapshot, 
        this.numberOfSimulations, 
        this.periodsUntilRetirement + this.periodsOfRetirement);
      return simulations;
    }),
    catchError(error => {
      console.log('error', error);
      this.snackbar.open(error, 'Done', {duration: 30e3});
      return of([]);
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
            
            // cash + volatile assets - loans
            const volatileAssets = Array.from(entity.components.values())
              .filter(suspect => suspect.type === ComponentType.VolatileAsset)
              .map(component => component as VolatileAsset)
              .reduce((total, asset) => asset.value + total,0)

            const amorizedLoans = Array.from(entity.components.values())
              .filter(suspect => suspect.type === ComponentType.AmortizedLoan)
              .map(component => component as AmortizedLoan)
              .reduce((total, loan) => loan.principal + total,0)


            return Math.round(value(cash) + volatileAssets - amorizedLoans);
  
          },0);
        });
      });

      return simulationsCashValue;
    }));

    percentileSortedSimulations:Observable<number[][]> = this.simulationsBalances.pipe(map(simulations => {
      const thresholds = new Array(this.calculateTotalNumberOfPeriods())
        .fill(0).map((v, thresholdArrayIndex) => {
          // go through all simulations and grab the index 
          const simResultsAtIndex = simulations.map(simulation => {
            return simulation[thresholdArrayIndex];
          });
          
          simResultsAtIndex.sort((a,b) => a-b);
          
          return simResultsAtIndex;
        });

      const percentileSortedSimulations = new Array(simulations.length)
        .fill(0)
        .map((v,i) => {
          return thresholds.map(threshold => {
            return threshold[i];
          });
        });
      return percentileSortedSimulations;
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
    // Optional: Will lock the simulation at zero if it dips to avoid confusion

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

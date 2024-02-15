import { Component } from '@angular/core';
import { LifeEventsService } from '../services/life-events.service';
import { SimulationManager, Snapshot } from '../utils/maya-ecs';
import { setComponent } from '../utils/maya-ecs-entities';
import { Cash, Stocks, Traditional401k, ValueComponent } from '../utils/maya-ecs-components';

interface Exhibit {
  name: string;
  chartData: c3.Data;
}

@Component({
  selector: 'app-ecs-gallery',
  templateUrl: './ecs-gallery.component.html',
  styleUrls: ['./ecs-gallery.component.scss']
})
export class EcsGalleryComponent {

  // Create a set of exhibits based on each available life event
  exhibits:Exhibit[];

  ngAfterViewInit() {

    this.exhibits = this.lifeEventsService.availableLifeEvents
    .map(lifeEvent => {
      // generate a default component
      const component = lifeEvent.createComponent();
      
      // Create an entity within the simulation manager and set component
      const simulationManager = new SimulationManager();
      const snapshot = new Snapshot();
      const entity = snapshot.entityManager.createEntity();

      // initialize dependencies
      setComponent(entity, new Cash(0));
      setComponent(entity, new Traditional401k(0,[1]));
      setComponent(entity, new Stocks(0,[1]));
      setComponent(entity, component);

    
      // run simulator
      const simulations = simulationManager.createSimulations(
        snapshot, 5, 15,
      );
    
      // convert simulation to value
      const simulationBalances = simulations.map(simulation => {
        return simulation.map(period => {
          return period.entityManager.entities.reduce((accum, entity) => {
            
            return Array.from(entity.components.values())
              // hack to convert and check if there is value on component, change all components to implement 'toValue'
              .map(component => component as ValueComponent)
              .filter(component => component.value || 0)
              .reduce((sum, component) => sum + component.value, 0);
          },0);
        });
      });
    
      
      // create chart data
      const chartData: c3.Data = {
        columns: [],
        type: 'line'
      };  
      
    
      const exhibit = {
        name: lifeEvent.name,
        component,
        chartData,
      };

      setTimeout(() => {
        const chartData: c3.Data = {
          columns: [],
          type: 'line'
        };  
        simulationBalances.forEach((simulation, i) => {
          chartData.columns.push([`series ${i}`, ...simulation])
        });
    
        exhibit.chartData = chartData;
    
      }, Math.random() * 2000)
    

      // console.log('adding chart data',chartData)
      return exhibit;
    }).sort((a,b) => a.component.type.toLocaleString().localeCompare(b.component.type.toLocaleString()));
  }
  constructor(
    readonly lifeEventsService: LifeEventsService,
  ) {

  }
}

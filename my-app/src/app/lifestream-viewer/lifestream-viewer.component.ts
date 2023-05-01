import { Component } from '@angular/core';
import { LifestreamService } from '../services/lifestream.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Deck } from '../services/deck.service';
import { filter, map, Observable, startWith } from 'rxjs';
import { runTestSimulation } from '../utils/cash-flow-simulation';



const DEFAULT_POSITION = `
awake time, 16 * 7 * 365
work time, 8 * 5 * 250
savings, 100
`;
const DEFAULT_TRADES = `

`;
/**
 * Streams are a merge of cash flows and draws
 * A stream can be a fixed cash flow or draw from deck
 * A stream can be maintained every period (trade in or out)
 * 
 */
const DEFAULT_STREAMS = `
available_time, 0,60,absolute,front,2000
income,0,30,absolute,random, 500000
equities, 0,60,relative,random, 1.25, .8
child,5,10,absolute,random,.2,.2,.2,.2,1
`;

const DEFAULT_POLICY = `
working full time job, 0, 30, awake_time - work_time 
equities,0,30,time diversification,
`;

@Component({
  selector: 'app-lifestream-viewer',
  templateUrl: './lifestream-viewer.component.html',
  styleUrls: ['./lifestream-viewer.component.scss']
})
export class LifestreamViewerComponent {

  controls = {
    startingPositions: new FormControl(DEFAULT_POSITION),
    streams: new FormControl(DEFAULT_STREAMS),
    policy : new FormControl(DEFAULT_POLICY),
    duration: new FormControl(30),
  }

  form = new FormGroup(this.controls);

  streams = [];
  policies = [];

  updateInputs(){
    this.streams = convertCsvStringToArray(this.controls.streams.value)
      .map(convertToStream);

    this.policies = convertCsvStringToArray(this.controls.streams.value)
    
  }
  
  steps = [];
  

  runStep() {
    setTimeout(() => {
      const output = [];
      const period = this.steps.length;
      const streamOutput = this.streams.map(stream => {
        if(stream.start < period && period < stream.end) {
          console.log('stream' ,stream)
          return [
            stream.name, 
            stream.deck[
              Math.floor(Math.random() * stream.deck.length)]
            ];
        }
        
      });
      output.push(streamOutput.filter(Boolean));
      this.steps.push(output)
      if(this.steps.length < this.controls.duration.value) {
        this.runStep();
      }
    }, 100);
    
    
  }

  runSimulation() {
    this.steps = [];
    console.log('simulation started');
    this.runStep();
    console.log('simulation finished');
  }
  constructor(readonly lifestreamService: LifestreamService) { 
    this.updateInputs();
    // this.runSimulation(); 
    runTestSimulation();
  }
}

/**
 * You currently have savings / income
 * Well assume you have a 8*5*250 work week
 * 
 * Back out hourly rate and spend
 * Focus on financial conversion and utility conversion
 * - Time into money, money back into time
 * - Money/time into experiences, experiences into utility
 * - Utlity is an event calendar
 * 
 * (Cannot forget the value/time/confidence, where value should include utility)
 * 
 * Every year you'll get 16*7*365 hours (or set this however)
 * Describe how you want to spend it
 * 
 * ECS model works best, everything can have a time/dollar/utility value
 * e.g. House
 * hours: 4 hours a year for property taxes, fixing things
 * dollar: property principal value
 * - Not subject to inflation
 * dollar: maintenance cost (deck risk, 10% chance of 100k)
 * - is subject to inflation
 * utilty: you own a home, neither good nor bad, it just is
 * 
 * Entity - named asset
 * Component - properties which identify which systems should affect it
 * System - Not on the position, systems run over the entities availble
 */


enum ASSET_TYPE {
  HOUR,
  DOLLAR,
  FIXED_DOLLAR,
  INFLATION_DOLLAR,
  UTILITY,
}

enum CASH_FLOW_TYPE {

}

/**
 * Based on policy and value
 */
function changeHours(
  position
) {
  // everyone has the same number of hours per year
}

function purchaseStock() {

}
function purchaseProperty() {
  // cost of financing
}

function sellProperty() {

}

function purchaseOnCreditCard() {


}

function haveKid() {

}

const TRANSACTION = [
  [
    ['set normal hours per year', 'hours available','set to', 16*7*365], 
  ],
  [
    ['hours worked', 'take from', 'hours available', 2000],
    ['income','set to', 5e5]
  ],
  [

  ],
];

function executeTansaction(
  transactions: ((position)=>void)[],
  position
) {
  // probably return succcess or failure, assume all success
  transactions.forEach(transaction => transaction(position));
}


const tradesOrder = [
  // convert work to work hours
  (position) => {
    const workHours = 
    position.workHours = position.avalableHours - 2000;
  }
]

function trade(position) {

}

function convertCsvStringToArray(val:string):string[][] {
  return val.trim().split('\n').filter(suspect => suspect.trim().length)
  .map(val => {
    return val.split(',')
      .map(val => val.trim());
  });
}

function convertToStream([
  name = 'no name set', 
  start=0, 
  end=60, 
  draw='random' ?? 'first', 
  position='absolute' ?? 'relative',
  ...deck]) {
  return {
    name,
    start,
    end,
    draw,
    position,
    deck: deck.map(Number),
  };
}

function drawCardPerStream() {

}
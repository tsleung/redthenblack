import { Injectable } from '@angular/core';
import { DecisionsService } from './decisions.service';
import { DeckService } from './deck.service';

/**
 * Take a decision policy and execute for N number of timesteps
 * 
 * At each timestep, cards are drawn from decks and decisions are made
 * 
 * Each timestep has the following steps
 * - Position is set and frozen
 * - Cards are drawn which affect the position. This may be many sequences of draws, this represents the environment
 * - Positions are updated on an involuntary basis
 * - Decisions are made on a voluntary basis
 * - Position is frozen for next timestep
 */
function lifestream_simulator() {

}

function simulate_timestep() {

}
interface Snapshot {
  decks: [];

}
function snapshot() {

}

export interface LifeEvent {

}

export interface Duration{
  i: number;
}

export interface Timespan {
  start: number;
  end: number;
  duration: number;
}

/**
 * A stream is a sequence of draws, per period, from a deck
 */
export interface Stream {
  timespan: Timespan;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class LifestreamService {
  streams: Stream[] = [];
  maxStreamLength: number = 0;
  addStream(stream: Stream) {
    this.streams.push(stream);
    this.maxStreamLength = this.calculateMaxStreamLength();
  }
  calculateMaxStreamLength() {
    return this.streams.reduce((prev, v) => {
      const length = v.timespan.end - v.timespan.start;
      return Math.max(length, prev);
    },0)
  }

  constructor(readonly deckService: DeckService,
    readonly decisionService: DecisionsService,) {
      
  }
}


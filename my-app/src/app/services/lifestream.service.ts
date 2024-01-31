import { Injectable } from '@angular/core';
import { DecisionsService } from './decisions.service';
import { DeckService } from './deck.service';

/**
 * integrated calculator component, combine parameters of two independent models
 * make those config parameters transparent, may need to be merged.
 * - merge happens in decks? single card can be converted to many
 * - per turn, draw cards in a row, last one wins. card can trigger draw on another card
 * - game of life for decision making personal finance
 * 
 */



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

 interface LifeEvent {

}

 interface Duration{
  i: number;
}

 interface Timespan {
  start: number;
  end: number;
  duration: number;
}

/**
 * A stream is a sequence of draws, per period, from a deck
 */
 interface Stream {
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


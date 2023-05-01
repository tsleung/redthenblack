import { Injectable } from '@angular/core';

// discrete or continuous? 

export enum FeatureType {
  Hours,
  AnnualStockChange,
  InflationRate,
  SavingsInterestRate,
}

export interface Feature {
  type: FeatureType;
  
}

/**
 * Following ECS from game design, we're effectively creating a deck builder
 * 
 * This is helpful because cards may have multiple features and are thus correlated 
 * 
 * Multiple decks can be provided to uncorrelate. Decks can interact to provide joint correlations. Cards as a metaphor are physical and a simpler way of explaining chaotic situations while keeping determinism
 * 
 * Decks have a draw policy
 * - Are they shuffled
 * -- Once or per draw
 * - Are drawn cards replaced
 * -- If drawn cards are replaced are they
 * --- Anywhere in the deck
 * --- Bottom of the deck
 */
export interface Card {
  features: Feature;
}
export interface Deck {
  cards: Card[];
}

// Should start with a single historical deck, 30 years, do it twice for 60 years.
export const HISTORICAL_DECK = [

]

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor() { }
}

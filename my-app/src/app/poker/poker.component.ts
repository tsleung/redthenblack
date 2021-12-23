import { Component, OnInit } from '@angular/core';
import { CashFlowPlanComponent } from '../cash-flow-plan/cash-flow-plan.component';

@Component({
  selector: 'app-poker',
  templateUrl: './poker.component.html',
  styleUrls: ['./poker.component.scss']
})
export class PokerComponent implements OnInit {

  constructor() { 

    game();
  }

  ngOnInit(): void {
  }

}

function game() {
  const rules = {
    startingBalance: 100,
    smallBlind: 1,
    bigBlind: 2,
  };

  const players:Player[] = new Array(6).fill(0).map(() => {
    return {
      balance: rules.startingBalance,
    }
  });

  const deck = shuffle(createDeck());
  
  const round = createRound(rules, players, deck);

  applyBlinds(round);
  openingBids(round);
  flop(round);
  turn(round);
  river(round);
}

function flop(round: Round) {
}
function turn(round: Round) {
}
function river(round: Round) {
}

function openingBids(round: Round) {

}
function applyBlinds(round: Round) {
  // deal cards 
  round.seats.forEach(seat => {
    seat.hand = [round.deck.pop(), round.deck.pop()];
  });

  // blind bids 
  [...round.seats.slice(2), ...round.seats.slice(0,2)].forEach(seat => {
    
  });
}
interface Round {
  seats: Seat[];
  deck: Card[];
  communityCards: Card[];
}

function createRound(rules: Rules, players:Player[], deck: Card[], dealer=0) {
  // const create seats, deal, and blinds 
  // (probably should do this as is actual, start with the dealer position and modulo wrap)

  // initialie and reorder seats so dealer is first

  // initialize seats, dealer first
  const reorderedPlayers = [...players.slice(dealer),...players.slice(0,dealer)] 
  const seats:Seat[] = reorderedPlayers.map((player, position) => {
    const hand = [];
    const bid = dealer + 1 % players.length === position ?
      placeBet(player, rules.smallBlind) :
      dealer + 1 % players.length === position ? 
        placeBet(player, rules.bigBlind) :
        0;

    return {player, bid, hand};
  });

  const communityCards = [];

  return {seats, deck, communityCards};
 
}

function createValuation(model) {
  return (environment, player) => {
    // return a list of actions,ranked by expected value
    return Math.random();

  };
}

function policy(environment, player) {
  // function that can take
  return Math.random() < .2 ? 
    // explore
    (value) => {
      // bid action
      return Math.floor(Math.random()*100); // bid 0 to all in
    } :
    // exploit
    (value) => {
      return value(environment, player)
    };
}

function placeBet(player, bet) {
  return Math.min(player.balance, bet);
}

interface Rules{
  startingBalance:number;
  smallBlind: number;
  bigBlind: number;
}

interface Seat {
  player: Player;
  bid: number;
  hand: Card[];
}
interface Player {
  balance: number;
}

enum SUIT {
  DIAMONDS,
  HEARTS,
  CLUBS,
  SPADES
}
interface Card {
  suit: SUIT;
  number: number;
}

function createDeck() {
  const deck = Object.keys(SUIT)
  .filter((item) => {
    return isNaN(Number(item));
  })
  .map(suit => new Array(13).fill(0).map((v,number) =>{
    return {suit, number};
  }));

  return deck.flat();
}

function shuffle<T>(list: T[]) {
  list = [...list];
  const shuffled = [];
  while(list.length > 0){
    const index = Math.floor(Math.random() * list.length);
    shuffled.push(...list.splice(index,1));
  }

  return shuffled;
}
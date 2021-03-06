import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-bet',
  templateUrl: './simple-bet.component.html',
  styleUrls: ['./simple-bet.component.scss']
})
export class SimpleBetComponent {

  lastBetResult = 0;
  numCustomBets = 0;
  history:number[] = [];
  numNonZeroBets = 0;
  account = 100;
  favorableCards = 28;
  numCorrect = 0;
  totalCards = 54;

  constructor() { }

  customBet(numberCard: boolean) {
    const idealBet = Math.floor((2 * (this.favorableCards / this.totalCards) - 1)*100);
    const size = Number(prompt("What size to bet? (0-100)",`${idealBet}`)) ?? 0;
    const numTimes = Number(prompt("How many times",'108')) ?? 0;
    new Array(numTimes).fill(0).forEach(() => {
      this.numCustomBets++;
      this.bet(size / 100, numberCard);
    });
  }

  bet(size: number, numberCard: boolean) {
    size = Math.max(0,Math.min(size,1));
    const correctBet = Math.random() < this.favorableCards/this.totalCards;
    const betChange = Math.floor(size * this.account);

    
    this.numCorrect = correctBet ? this.numCorrect+1: this.numCorrect;
    
    this.lastBetResult = correctBet ? betChange : -betChange;
    this.history = [this.lastBetResult, ...this.history];
    this.account = this.account + this.lastBetResult;
    this.numNonZeroBets = this.history.filter(v => v != 0).length;
  }

  accuracy() {
    return Math.round(this.numCorrect / this.history.length * 100) ?? 0;
  }

  updateCards() {
    this.favorableCards = Number(window.prompt('Number of favorable cards', `${this.favorableCards}`)) ?? 0;
    this.totalCards = Number(window.prompt('Number of cards', `${this.totalCards}`)) ?? 0;
  }
}
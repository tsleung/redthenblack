import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-bet',
  templateUrl: './simple-bet.component.html',
  styleUrls: ['./simple-bet.component.scss']
})
export class SimpleBetComponent {

  lastBetResult = 0;
  numCustomBets = 0;
  numBets = 0;
  account = 50;

  constructor() { }

  customBet(numberCard: boolean) {
    let size = Number(prompt("What size to bet? (0-100)",'5'));
    this.numCustomBets++;
    size = isNaN(size) ? 0 : size;
    this.bet(size, numberCard);
  }
  bet(size: number, numberCard: boolean) {
    // 54 cards, 34/54 number, 18/54 non number
    size = Math.max(0,Math.min(size,1));
    const isNumberCard = Math.random() > 34/54;
    const correctBet = (numberCard && isNumberCard) || (!numberCard && !isNumberCard);
    const betChange = Math.floor(size * this.account);

    this.lastBetResult = correctBet ? betChange : -betChange;
    this.account = this.account + this.lastBetResult;
    this.numBets++;

  }
}
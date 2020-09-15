import { Component } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as c3 from 'c3';

const STARTING_ACCOUNT_SIZE = 100;
const DECK_SIZE = 12;
const DEFAULT_CHART_CONFIG = {
  bindto: '#chart',
  data: {
    columns: [],
    labels: false
  },
  axis: {
    x: { show: true, min: 0, max: DECK_SIZE, label: '', padding: { bottom: 0 } },
    y: { show: true, min: 0, padding: { bottom: 0 }, tick: { count: null } }
  },
  legend: {
    show: false,
    hide: true,
  }
};

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  deckSize = DECK_SIZE;
  game: Observable<GameApi>;
  bet = 0;
  accountChart: c3.ChartAPI;
  consoleShow = false;
  chartId = 'chartId';

  ngAfterViewInit() {
    this.accountChart = c3.generate({ ...DEFAULT_CHART_CONFIG, bindto: `#${this.chartId}` });
    this.accountChart.load({
      columns: [
        ['Account', STARTING_ACCOUNT_SIZE],
      ],
    });
  }

  constructor() {
    this.chartId = `chart-injected-${Date.now()}`;
    const game = createGameApi().pipe(tap(game => {
      console.log(game);

      const accountHistory = game.history.reduce((accountHistory, pastBet) => {
        const accountChange = pastBet.card === pastBet.bet.card ?
          -1 * pastBet.bet.value :
          1 * pastBet.bet.value;
        accountHistory.unshift(accountChange + accountHistory[0]);

        return accountHistory;
      }, [game.account])

      this.accountChart = this.accountChart || c3.generate({ ...DEFAULT_CHART_CONFIG, bindto: `#${this.chartId}` });

      this.accountChart.load({
        columns: [
          ['Account', ...accountHistory],
        ],
      });
      console.log('account history', accountHistory)

    }));
    window['game'] = game;
    this.game = game;
  }

  prettyNumber(num) {
    return prettyNumber(num);

  }

  accountStrainedBet(account) {
    return Math.max(0, Math.min(this.bet, account))
  }

  findEdge(hist) {
    return Math.floor(100 * Math.abs(this.redPercentage(hist) - this.blackPercentage(hist))) / 100;
  }

  currentBetSize(account) {
    return `${Math.round(this.bet / account * 100)}%`;
  }

  log(val) {
    console.log('logged val', val);
  }

  formatBetLabel(val: number) {
    return `${Math.round(val)}%`;
  }

  updateBet(bet) {
    console.log('bet', bet)
    this.bet = Math.floor(Number(bet) || 0);
  }
  numRed(hist) {
    return this.redCards(hist).length;
  }

  numBlack(hist) {
    return this.blackCards(hist).length;
  }

  redPercentage(hist) {
    return Math.round((DECK_SIZE / 2 - this.numRed(hist)) / (DECK_SIZE - hist.length) * 100) / 100;
  }

  blackPercentage(hist) {
    return Math.round((DECK_SIZE / 2 - this.numBlack(hist)) / (DECK_SIZE - hist.length) * 100) / 100;
  }

  redCards(hist) {
    return hist.filter(c => c.card === 'red');
  }

  blackCards(hist) {
    return hist.filter(c => c.card === 'black');
  }
}

function createGameApi(): Observable<GameApi> {
  return new Observable((observer) => {
    const deck: string[] = createRandomDeck();
    const starterDeck = [...deck];
    const history = [];
    console.log('deck', deck);

    const api: GameApi = {
      account: STARTING_ACCOUNT_SIZE,
      restarts: 0,
      decksPlayed: 0,
      cardsLeft: deck.length,
      history,
      restart: () => {
        api.restarts++;
        api.account = STARTING_ACCOUNT_SIZE;
        api.newDeck();
      },
      newDeck: () => {
        deck.splice(0, deck.length, ...createRandomDeck());
        history.splice(0, history.length);
        api.cardsLeft = deck.length;
        api.decksPlayed++;
        observer.next(api);
      },
      shuffle: () => {
        deck.splice(0, deck.length, ...starterDeck);
        history.splice(0, history.length);
        api.cardsLeft = deck.length;
        api.decksPlayed++;
        observer.next(api);
      },
      red: (bet: number) => {
        bet = Math.max(0, Math.min(bet, api.account));
        const card = deck.pop();
        history.unshift({
          card: card,
          bet: {
            value: bet,
            card: 'red',
          }
        });
        api.cardsLeft = deck.length;
        api.account = api.account + findChange('red', card, bet);
        observer.next(api);
      },
      black: (bet: number) => {
        bet = Math.max(0, Math.min(bet, api.account));
        const card = deck.pop();
        history.unshift({
          card: card,
          bet: {
            value: bet,
            card: 'black',
          }
        });
        api.account = api.account + findChange('black', card, bet);
        api.cardsLeft = deck.length;
        observer.next(api);
      },
      percentRedRemaining: () => {
        return prettyNumber(deck.filter(c => c === 'red').length / deck.length);
      },
      percentBlackRemaining: () => {
        return prettyNumber(deck.filter(c => c === 'black').length / deck.length);
      },
    };

    observer.next(api);
  });
}

interface GameApi {
  account: number;
  restarts: number;
  history: PastBet[];
  cardsLeft: number;
  decksPlayed: number;
  newDeck: () => void;
  shuffle: () => void;
  red: (bet: number) => void;
  black: (bet: number) => void;
  percentRedRemaining: () => number;
  percentBlackRemaining: () => number;
  restart: () => void;
}

interface PastBet {
  card: string;
  bet: {
    value: number;
    card: string;
  };
}

function findChange(match, card, bet) {
  return Boolean(card) ?
    card === match ? 1 * bet : -1 * bet :
    0;
}
function createRandomDeck() {
  return new Array(DECK_SIZE).fill(0).map((v, i) => {
    return Math.random() >= .5 ? 'red' : 'black';
  });
}

function createPerfectDeck() {
  return new Array(DECK_SIZE).fill(0).map((v, i) => {
    return i % 2 == 0 ? 'red' : 'black';
  });
}

function shuffleDeck(deck) {
  return deck.reduce((deck, v) => {
    return Math.random() > .5 ? [...deck, v] : [v, ...deck];
  }, []);
}

function prettyNumber(num: number) {
  return Math.round(num * 100) / 100;
}
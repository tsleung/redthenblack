import { TestBed } from '@angular/core/testing';

import {historicalCompressedSeries} from './demon-utils';

describe('DemonUtils', () => {
  it('should compress a series', () => {
    const sampleSeries = new Array(1000).fill(0).map((v,i) => {
      return 1.1;
    });

    // const compressed = historicalCompressedSeries(sampleSeries);


    // expect(compressed).toBeTruthy();
  });
});

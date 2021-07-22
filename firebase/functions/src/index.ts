
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();
const nodeFetch = require('node-fetch');


// Take the text parameter passed to this HTTP endpoint and insert it into 
exports.getSymbol = functions.https.onRequest(async (req:any, res:any) => {
  const symbol = req.query.symbol;
  const start = new Date(req.query.start).getTime() / 1000;
  const end = new Date(req.query.end).getTime() / 1000;

  const options = {
    hostname: 'query1.finance.yahoo.com',
    // port: 80, // 443
    path: `/v7/finance/download/${symbol}?period1=${start}&period2=${end}&interval=1d&events=history&includeAdjustedClose=true`,
    method: 'GET'
  };
  console.log('options',options);
  nodeFetch(`http://query1.finance.yahoo.com${options.path}`)
      .then((res:any) => res.text())
      .then((resp:string) => {
        res.send(resp);
      });
});
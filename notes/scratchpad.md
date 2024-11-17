MDP 

There are two mechanics, momentum and reversion

Can go up, or can go down.

Prior state, future state
Agent, Environment
Observe, act, reward


# Writing a time series
Semantics of describing a nuanced time series

Determine number of periods

For Each Period, generate a value
- based on previous value
- based on a fundamnetal value (select from a deck)
- based on arbitrary override (can be user selected)

operations: Absolute (fixed), arithmetic (additive / multiplicative), with trend/fundamental dependency

probability: variably (between values), maybe (yes or no, 0/1), definitely (yes, 1)



## Back to school vs Professional
```javascript
// Save for 30 years, subject to fixed vs variable inflation

Constant
Series()

```
## Back to school vs Professional
```javascript


Series()

```
## Stock vs Real estate
```javascript

```
## May have birth in 5-10 years where I'll start a new expense
```javascript



Series(0,30) // create a fixed length start and end series for a set of 30 periods 
  .andAt(0).fixValue(1e5) // start with balance of 1e5
  .andMaybeAt([0,30]).addValue(1e4) // save 1e4 every perido
  .andDefAt([5,10], Series(0,[18,35]))


// describe a series, and can set where it should kick in, can be variable length or fixed length

// calculate maximum length of series, or set it


// adding multiple time series together, there are inputs
Series(variably([0,5], [5,10]))
  .forAll(fixValue(5))
  .forAll(addToPrevious(2))
  .forAll(addToPrevious(2))
  .forAll(trend())
Series(of(between(0,25)))



Series(0,30)
  .and(at(), add())
  .and(maybe(), multiply())
  .and(definitely(), from(deck)and(multiply())
```
# Red then Black

I am addressing a problem I think in the space where there is a lot of scams and fraduluent behavior, encouraging people to buy cryptocurrency or pump and dump schemes. When there is a recommendation to buy an asset, the suitability is seldom considered, and the assumptions aren't transparent and are misleading. I want to build a community of people who can discuss, using transparent methods, the validity and efficacy of different approaches to life planning.


I am building calculators to help people plan for their life. These calculators use simulation and analysis methods, combined with educational material and articles, to help people plan. What would a good division of responsibilities for myself, and one part time person, to get help building my project "Red then Black" look like? Help me create a project plan and timeline. It is more important to reach more people for free vs conversion to customers whom pay for compute and storage (not education) for the simulator and analysis environment. So all features can be run in the users browser, simulation within their local device and storage (local storage I think may not work, will look at PWA and larger solutions) but I'll create a model exporter for them to save/load. To avoid having to use their local device for storage (makes it easier to just login) or compute (can use a cloud service to run massively in parallel) thats where a premium feature I think will be good - because I need to cover compute and storage costs.

I created user accounts which allow people to share a simulation they've been working on. I'm unsure of the direction to go, if I should build commenting as a feature or just allow simulations to be embeded / screenshotted to be shared on other platforms with dedicated community management teams. I think of reddit/youtube/instagram and the amount of spam that is there. But I really think there is a subtle desire to share and request feedback - life planning is a social experience amongst family, friends, or a generation (gen z is very public with their personal information). I believe this is a value differentiator and builds collective wisdom, similar to the academic community publishing papers. Community management is difficult though, with scammers/spam and technical issues that are introduced which may be overwhelming for a small team and for me to build a product without much revenue, if I'm focusing on giving away as much as possible for free.

I created a lightweight simulator following an entity component system, so it can be composed with different systems like mortgages, debts, sending kids to college, job switches, etc.

I've attached the following set of written material I've created given advice and startup guides I've read about how to grow the startup. I'm not familiar with silicon valley ettiquette so I'm going to do my best to make sure this product is successful so people use it and get help.

Here is the one page pitch: ```Red then Black
Personalized Algorithmic Financial Strategy
Problem
Retirement planning uses inappropriate approximations where details matter, most notably 8-10% market returns. Prolonged ignorance and lack of education exacerbates the problem, causing either (1) a direct negative impact to financial health or (2) inactivity and time out of the market ensuring retirement goals cannot be achieved within a lifetime. 

Specifically facing this problem are millennials, many who have faced two economic recessions, suffer from student loan debt, and are trying to build families and take care of their aging parents. The decisions they make today will drastically affect their future, near and into retirement. Tools are required to evaluate suitability of different options. 

Tools exist for specific domains - mortgage lenders provide mortgage calculators, investment institutions provide crude estimates of annual compounded returns with their products. The holistic integration tool of the specific domains doesn’t exist.
Solution
Algorithmic solutions exist for specific financial problems given assumptions. Two straightforward methods of modeling decisions and simulated outcomes are (1) markov decision processes and (2) monte carlo analysis. Developing heuristics for suitable solutions may be achieved through reinforcement learning and understandable models such as lookup tables or decision trees. 

Problem frameworks may be devised with suitable parameters specified. Utility theory provides a nomenclature for non engineers to describe the ‘bit flips’ of their life, modeling decisions to make and tradeoffs expected. Understandable models provide resistance to behavioral biases and improved adherence.

Relatively basic algorithms can provide significant advantages in holistically exploring the probabilistic space for an individual at low cost. Further a standardized parameter set enables enlightened conversation across individuals and with financial professionals.

Red then Black (RtB) offers suitable financial strategies by applying algorithms to personalized circumstances.
 
Traction
Google has 130k employees who should allegedly embrace algorithmic methods applied to financial planning. Any significant penetration of this market (5%) would signify gaining traction. 
Market
There are 4 million software engineers. There are 7 million tech workers. There are 72 million millennials. Improved user experience will open access to this market and beyond.

Software engineers have general acceptance for the methods being pursued in the solution being provided. Software engineers have capital requiring decisions to be made for allocation. Software engineers are generally price insensitive to low cost solutions that provide significant impact to their personal bottom line.
Competition
Spreadsheets. Detractors are industry experts who dislike algorithmic methods for simplifying algorithmic inputs.
Vision
We don’t charge for knowledge. Financial education should be made freely available, if only because it’s a clear way of identifying scammers. We create a world where the bar of financial literacy allows those to converse freely and share knowledge in a standardized fashion.

We charge for user experience. We charge for applied technology. We charge for the maintenance of a knowledge exchange that allows rapid application of best practices to your specific situation. 

We build trust. Trust in a product where you plan your family’s future. Trust where you’ll take care of your aging parents. Trust where you’ll provide a roof over the head of your children. Trust that your future is bright.

https://www.linkedin.com/in/terranleung/ 
Use of funds
Growing out a team will allow RtB to reach the market faster with more packs, creating a more compelling value offering. 
Product: User experience / Product manager / Technical writer
Vision: Financial planner / Statistician / ML engineer 
Execution: Data visualization engineer / Software engineer / Financial engineer

Increased investments in technology, product, and user experience will provide value differentiation between RtB and follow up competitors. 

Format:
https://www.ycombinator.com/library/20-deck 
```

Here are additional notes I've created ```Red then Black

An introduction to bets through trial and error
***Maggie is first customer***
Betting on Beta
Creating an investing plan for retirement.

Simple statement
Assist millennials personalized financial strategy with an algorithmic approach. 

Mission statement
Catalyst: Friends in industry have compensation in equity. Many don’t take advantage of the privilege they’re in. Folks without privilege are taking excessive risk, which leads to negative returns. Robinhood suicide and known bias around sharing success not failure. Wall street will clean up, like they always do, because it’s their job to do so.
Service: Investing is hard, but not all of it is. No one can see the future but even if you could, people behave stupidly. Correcting execution is important so you know what you’re getting into.
Selfish: Peer review of my own plans, improvements of my own models. I offer a unique perspective as an enthusiast amateur. I have neither academic degree in engineering/computer science or professional experience investing/finance. Suitability is key, and my approaches described here are suited for me.

Overview
Humans not robots
Life Plan - this is what we’re solving for
Selecting 

Macro, high level view. Strategy and big moves.
Not accounting or budgeting. Abstract from tactics and create a strategy.

Personalized algorithmic financial strategy

Branding, ux, and language

Financially accessible and common, everyone should be able to understand and have access to an affordable retirement. Yet vocabulary and terms may be geared towards those in the technology space. Choose words that are simple, keep explanations concise. Let people opt into more information and make the information easily within reach - everything should be interactive with helpful tooltips and navigational elements to learn more. Feed forward/backwards and interactions should be obvious what they will produce.

Target Market
Software engineers, using a phone, financially illiterate

There are 4 million software engineers. There are 7 million tech workers. There are 72 million millennials. Improved user experience will open access to this market and beyond.

Software engineers have general acceptance for the methods being pursued in the solution being provided. Software engineers have capital requiring decisions to be made for allocation. Software engineers are generally price insensitive to low cost solutions that provide significant impact to their personal bottom line.

Referrals
10000 user target
1 person gives 100 people 100 month credit
100 people give 20 people 20 month credit
20 people give 5 people 5 month credit

Anyone who gives out a credit accumulates 1 more month credit per signup. Unlimited 1 month credits to give out for any user.

Why is this relevant now
Volatility has gone mainstream, everyone sees it

What is retirement?
A household income in effective perpetuity. I used to work and love Manhattan. I currently live in San Francisco. I’ll need $175k to be ‘average’ in either city.

173858 San Francisco
170453 Manhattan

https://data.census.gov/cedsci/table?q=Income%20and%20Earnings&g=0500000US06075,36061&tid=ACSST1Y2019.S1901&hidePreview=true 

The stock market
I don’t know anyone who has retired successfully who doesn’t have an investment portfolio. The wealthy have a vested interest in the appreciation of the stock market.


Inconsequential
At what points does the savings rate provided by my job not influence the outcome of confidence time and output in 95% of cases. This is a meta analysis of where retirement is achieved. 

We have retirement candidates where the rate of return is exceeding the withdrawal rate less savings rate.
E.g. with 1M and 100k withdrawal, returns 95% of the time are > 100k

Utility
Even rich people (1) iPhones (2) NY Subway (3) Same gym (4) Same restaurants. You can explore more, try more, but it’s a log scaling factor. Utility can be described as access to lifestyle, and you can live a fulfilling life log scaled.  

A stacked deck
Since I was in grade school I was told to invest in the market. That’s great but how? How much?
<sampled backtest>
<historical backtest>

Based on historical returns, we can generate some sample investments, either a historical run or sampled.

If we don’t invest we can expect to keep our balance the same. Increasing your bet increases the difference between the lowest/highest returns and also the average return. Continually increasing your bet will continue to increase the difference between the lowest/highest returns, but then decrease your average return back to where you started, then eventually to zero.

[Aside] Intuitively if you had a deck of cards where 51 of the 52 cards are in your favour, how much of your money should you bet? If nothing, you’re wasting the opportunity. If everything, if you hit the 1 of the 52 cards not in your favour, you’ll be wiped out. The answer is somewhere in the middle, but not everything.

Importance of Cash

Market strategy for retirement
The only mistake is to overbet

The US stock market has historically returned 10% per year. How much should you bet on it?
What are normal returns https://www.youtube.com/watch?v=WhYHrHiOS_E 

A rule of thumb is 100 minus age in equities, the rest in bonds. Most 401k plans offer target date funds, which are fundamentally a set of equities and bonds roughly designed around the same rule. As someone fast approaching the 35 age bracket, I would be 100 - 35, 65% in stocks and 35% in bonds.

Let’s explore why this works, so we know how we can make it better. We’ll use the S&P 500, 20 year treasury bonds, and a deck of cards.

In the past 16 years we have roughly 4000 trading days, or data points, to work with. There are many reasons financial professionals will suggest bonds. The reason I care about them is over the course of that time, bonds have remained negatively correlated to moves in equities. Furthermore they tend to correlate more negatively when equities are losing in value, providing value and reducing losses. 

Why do we care? Let’s try things out with a deck of cards.

A standard deck has 52 cards, half are red, half are black. 


Loss aversion protects investments from overbetting.


Game modes

Call the top
By the dip / call the bottom
Free mode

Utility modes
Target
Reach
Safety

Core mechanics
Monte carlo rollout and simulation
MDP to understand what are the outcomes 
Probabilistic Finite State Machines and Hidden Markov Models
http://www.inf.ed.ac.uk/teaching/courses/inf1/cl/notes/Comp7.pdf 
Decks of cards to feed into the outcomes, rather than model it can be discrete

Risk
Total loss, uncompensated risk of sectors/companies
Skewness
There are more negative outcomes but a few significant positive outcomes 
1.3% wealth creation
https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3415739 
61% destroy wealth
Volatility
Volatility vs utility, do i need the money in 5 days, 5 year, or 50 years
https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3081101
Time horizon, and risk tolerance
Inflation
Bonds may not provide enough return, therefore may be riskier than stocks

Diversification will mitigate skewness and total loss. Volatility is mitigated with time.

Time diversification
Sensible when to use leverage with long time horizons
Increase exposure given time of life
https://www.goodreads.com/book/show/7603406-lifecycle-investing - Yale professors
Younger people have less cash, but need exposure to stock. 100% equities as a young person is way under than the optimal time diversified bet.
Consistent exposure to stocks through your lifetime
Time diversification
It is responsible to leverage earlier
Mortgages work similarly 5x
1973 vs 1975 (?) 30 year is different

Time decay of leveraged etfs
Rebalancing reduces leveraged etfs returns in reversion
https://www.math.nyu.edu/~avellane/SIAMLETFS.pdf.pdf 
Higher variance, leveraged etf returns are lower

Embedded leverage
Lower expected returns
It is priced into the returns
https://www.nber.org/system/files/working_papers/w18558/w18558.pdf 
https://www.aqr.com/Insights/Research/Working-Paper/Embedded-Leverage  


Modeling
Set of parameters
Entity component system 



Models
A job, where will I be if I income and save by an interest rate
Daily modeling of SP500 (yahoo finance)
Rent vs Buy
Real estate appreciation (zillow research)

Monetization
Make me _____
Hyper $2.99 coffee, black
Healthy $8.99 salad, caesar dressing and croutons
Happy $17.99 fried chicken and beer

We don’t charge for knowledge. Financial education should be made freely available, if only because it’s a clear way of identifying scammers.

We charge for user experience. We charge for applied technology. We charge for the maintenance of a knowledge exchange that allows rapid application of best practices to your specific situation. 

Users
I’ve had this conversation with many people from ages 21-40 about where we are in life, where we’re headed, and what we expect out of the decisions we make. There are many common attractors but not a clear way of getting there. Every person is different.

Target the various stages of millennials
Older upper middle class who are family planning, whether it’s 
Rich tech people who are planning houses to buy
Young professionals figuring out their career
Students looking to get into industry


CUJs
Retirement planning
^ this is the goal, how much money do you need to accomplish utility with confidence
What is it worth to trade off dollars for utility
What is a car worth, what is the difference between two jobs, having a second apartment, taking a vacation with family, romantic weekend get away. 
https://www.businessinsider.com/meet-henry-millennial-earning-six-figures-savings-bay-area-phoenix-2021-10

https://www.businessinsider.com/parents-student-deb-64-year-old-dad-parent-plus-loans-2021-9

https://grow.acorns.com/the-semi-rich-americans-who-may-not-feel-wealthy/ 

Money Personality
https://www.investopedia.com/articles/basics/07/money-personality.asp
Spenders debtors investors savers shoppers

Net wealth by age
https://dqydj.com/net-worth-by-age-calculator-united-states/ 

Stealth wealth priorities https://www.youtube.com/watch?v=_INmFnlp-hU& 
Community, financial literacy, humble sharing

Hiring
Product: User experience / Product manager /Technical writer
Vision: Financial planner / Economist / Statistician
Execution: Data visualization engineer / Software engineer / Financial engineer

Time expectations
30 hours a week, 6 hours 4 days a week, 4 hours, 1 hours on weekend
2 weeks off christmas - new years
2 weeks off memorial day

Discipline, moral, intelligent
Underpromise, overdeliver. Say what you did, not what you’re going to do.
Set your own pace, build trust in brand/quality of products
Scrupulous

Say everything loudly
You can never over communicate

Make quality decisions quickly, OODA loopers

Write vision, mission, and sign it with all founding team


Financial packs
Corporate compensation - equity and options
SP500

Module packs
Modeling professions
Modeling college
Modeling job switches
Modeling back to school



Family planning
Senior care (for your parents)


Number of kids https://www.businessinsider.com/student-loan-debt-meet-single-father-parent-plus-loans-2021-9


Caveats about the author:
```
My name is Terran, topical exploration of decision making in games has been at most my side hobby. I have neither (1) professional experience in finance or (2) academic degrees in mathematics or computer science. It is my opinion finance planning varies suitably for each individual. This article reflects my personal approach towards financial planning and retirement.

Future markets are a mirror of past markets. Smartest insights are beyond the scope of this article, of which the objective of trillions of dollars chasing it around the world. There are smarter people than me to talk about the subject and I suggest finding a true financial professional.

All numbers here have been deliberately expressed with coarseness. Specification in values less than thousands is not in the spirit of this exercise. If my retirement plan depends on pennies, I’m likely not ready for retirement. 
```

A stacked deck.

The SP500 tends to go up over time, but how much?
< graphic of all daily returns over time>
< sum of rounded to percent return >



Avoid losses.

The only mistake you can make investing is to over bet. 
Graph 1% gain vs 1% loss, in terms of how much return you need to recover vs how much loss to return back to where you started

Graph the risk of overbetting vs underbetting - ½ of the perfect amount vs 2x the perfect amount. The losses/impact of the miss


Proportional bets, time diversification, why you don’t let the money ride.

You have an oversized position in a 1x let it ride portfolio. You start off with 20% in cash and stocks grow to a point where you’re large. You want an equal exposure to a multiplicative event rather than over exposure on the tail end.

letsay i put $100 in TQQQ in jan 1, it's up 70% for the year now
so it's $170, i have 70% in gains, obviously
if my portfolio started at $200, that means i have $170 TQQQ and $100 in cash. But i like to split my portfolio to be 50/50 which means i shoudl be $135 in TQQQ, so i have to sell $35
at 35% tax rate, $12.25 is paid out in taxes
That seems like NBD, except i dont have $100 in TQQQ but $100k
so rather than paying 2 bobas in taxes im paying 2000 boba in taxes
and rather than be at $270 EOY i'm at $257.75
270*1.1^30 vs 257.75*1.1^30 (this is a calculation of 10% a year, every year for 30 years) is over 200k difference, and thats just paying out once the first year
if you pay taxes on this gain to rebalance every year its way worse
so $270/200 is a 35% return. $257.75/200 is a ~29% return
200*1.29^30 = ~$400k vs 200*1.35^30 which is ~$1.6M
i know if i had to pick, id rather retire with $1.6M instead of $400k



Beating the market.
Leverage T-Bills.


The math to a million.

Given an expectation of outcomes, bets can be created which trade off wealth, time, or confidence.

Bias, variance, features.
Avoiding overfitting, simple models. 

Alternatives considered.
1x buy and hold.
Edges tend to decay not grow. Move into an ideal position size intentionally, the edge you’ve discovered won’t stay forever. 

What to do when the market tanks.
Like any trade, before you enter always have a written plan with an exit strategy for what happens if it goes for/against you.

Luck favors the prepared mind. Seizing opportunities that are in front of you, why would you squander your advantage.

FAQ
What does it mean to ‘maximize return’? 
It’s not by the upside, but a distribution. 

We assume that we’re idiots and we’re going to base our future off of the past. Billions, if not trillions, of dollars are spent every year by financial professionals with PhDs in math/sciences,xit’s less likely you’re going to find something they will - and even if you do, you still need to worry about executing on that edge. 


What makes a good trader to me.
Given a deck of cards shuffled by yourself, after drawing a card that is red, you guess black. After five more cards are flipped guessing black, they’re all red.

Evaluate our player based on the decision, not the outcomes. 

Utility
I don’t subscribe to the idea of cutting expenses. It seems like an unscalable solution. Movement = life, options = life. You can’t make a difference, can’t create change, you have no impact. You just, exist. You can always go to a lower cost of living, you can always race to the bottom. That has always been an option for everyone.

[Prediction Appendix] [ Simulation Appendix]


Article outline
Core tenants
optimal bet sizing
don't lose money
risk parity / leverage
you can't beat the market
more capital leads to more returns
diversification

Red then Black
Betting on my future
Notes from my exploration in bet sizing through trial and error
Tagline can rotate depending on what it is for different people



Rotating list of templates as names or job descriptions
Hi! I’m a software engineer
Hi! I’m Terran
Hi! I’m a student

Which will populate all the other fields and redraw a trajectory for that template (what is their income chance)
Save to google forms

I've saved $50k and have a 95% chance of achieving a net worth of $1M after 16 years with fixed investing in markets similar to the past couple of decades.

When output variables are changed, a prompt should come up with assumptions of how to reach the new number, or even easier a title text should hint to change the other values. In either case the title text should indicate how this number was determined (summary > detail?)

Output
$1M net worth
50k a year in income
Recommended size of a mortgage (tweak here to see effects)



[Save] [Share]

Not sure which sections to read? Take the quiz

The math to a million
I started working a little over ten years ago making $52.5k in NYC. If I saved the equivalent of my salary every year, it would take me just under 20 years to have one million. 

[input for income, income for savings (annual)]
[figcaption Create a figure that has collapsible years broken into 250 days (50 weeks 5 days a week for pay savings and investment, label the expansions from the inputs)]

What is a million anyway? It’s just a number, and while we want it, we’ll always want more. 

95 percent confidence we’ll get to our number. 95 percent confidence we’ll beat SPY to that number

Show base case, no raises. Show optimal case, with raises (realistic) and show somewhere in between but as a throttle of how much income and savings rate will affect probability of reaching 1M

But what is a million really? Is it wealthy? 2.3M
You may notice income has little net effect as the years go on - this is what happens to wealthy people, those who don’t have to work but still have plenty of income. This is because net wealth determines if you’re wealth, not your income.
[show figure with 0 income but large investment start growth, indicate article and what 2.3M will do]

This figure is unachievable by working. Saving 50k a year for 50 years will barely get me there - saving 52.5k until I retire at age 65 will get me there. Let’s dive into the math to a million, and see what investing in the market can do.

https://newrepublic.com/article/158555/whiners-earn-200000-complain-theyre-broke?utm_source=digg&utm_medium=email

We create a policy of how we save
This is a function of assets we can allocate (the market vs cash)
View a feature (like volatility) to adjust this in the short term
An allocation over our goal (how close are we wealth as a proportion to our goal vs time)

Goals are
Confidence of reaching it
A value worth reaching
Time to reach it
$W
TY

Three variables where you can lock two and find the third
Value based goal: Goals are defined as 95% of trajectories reaching the value ahead of schedule.
Time based goal: By this time i’m 95% confident I’ll make $W or by this time I’ll make $W C%

THIS the simple case is this is the highest 95% number we can find after running many trajectories
Free variable. 
With time and worth set, confidence becomes free.
With worth and confidence set, time becomes free
With time and confidence set, worth becomes free


Goal setting should be pegged to either a time or value, where confidence and the other variable will fluctuate

Creating a policy - 
Geometric vs Arithmetic
Fixed bet vs proportional betting
Time diversification of drawdowns

The machine 
The machine is simple. What you put in per period will accumulate and grow. What is grown can either contribute to itself or be taken back out.

The cost of a dollar
What does a dollar cost today? For every 
10% of the more you put in per period
10% increase in your initial savings
Will affect your wealth/time/confidence by an N%, or $D

Optimal bet sizing, time diversification of leverage and probabilities of reaching 1M, 2.3M
Tradeoff of under vs over bettting. Overbetting is insane, you only increase the probability of bad outcomes. Under betting is not taking maximum advantage of a good opportunity, which reduces volatility. Unfortunately you need money in the good times to pay for the bad times. Models are frequently outdated and trends don’t exist forever. Our assumption of a 30 year period of past returns is so that we may project at most 30 years into the future, we are on average in the middle of an observable trend.

Decisions vs outcomes - what was the right decision red/black vs where are your outcomes
Checking more often doesn’t help the long term approach
It’s never been better to be an investor - low cost, (fees/commissions) for tax efficient investment vehicles

Asymmetric payoffs - i can let you win 9/10 times, and take you once for all you’re worth. 9/10 years i can take 250k with a 250k bonus, and i’m happy with that trade.

Depending on your friends, some may thing 5M or 10M is actually what they’re looking for, I know several such people and while is out of the scope of my income, here is how it would play out.

Prediction/Signal, what to buy
ROC curve, win rate
Ratio of win/loss ratio, profitability outcome

Portfolio/risk allocation, how much
bet size
portfolio construction

Trade expression, with what tool (options/stock/basket/pair)
Entering the market

Supervised machine learning - identify perfect trades and factors which lead to those trades


A standard deck has 52 cards. There are four suits, diamonds, clubs, hearts, spades. Diamonds and hearts are red cards, clubs and spades are black cards, 26 red and 26 black. Each suit has 13 cards: an (A)ce, numbers (2-10) and face cards (J)ack, (Q)ueen and (K)ing.
Fair bets
Given 100% of +50% of your wealth or 50% chance of +100% of your wealth

Making money is easy, keeping it is hard.
Suppose you're given the following offer:

Guess the color of the next card you draw, I'll give you what you bet. Get it wrong, I'll take your bet.
Example of loss Example of sample bets (cards) Through February 2019 and

It’s better to mitigate the downside than the upside
I'll do my best to explain with a deck of cards.

Bet on the next card being either red or black.
Decks: 0
Account: 100
0 red played. 0 black played. 12 cards left.
Deck insight proportions - Red 0.5 Black 0.5
Bet on: 
0
0%
100
12 cards drawn randomly from a deck.

Behavioral economics loss aversion
Flip a coin 50/50 for 0 + 200 or 100% + 100, are these the same bets in the long term? Most take the sure thing
Skip the toss and make 100 immediately, most take the sure thing
Flip a coin to lose 200, or skip toss and pay 100 immediately
Most take the gamble in loss case but sure thing in gain case. Only if you ignore your current wealth


A personal story of financial planning expressed through a deck of cards
The stock market in 2001, 2007, and 2020. Bet appropriately, please Bet small, please. There are a lot of unknowns where confidence isn't an advantage - it's not more or less, it's precision and recall. ROC and AUC

What are we achieving
Why do we avoid losses.

What do we use with leverage. How about taxes

Income, net worth, and the one percent
This is a blockquote

All the math is rough. Significant figures are real, anything and everything can go wrong. Hand wavy is the best way to describe the rough estimates we make here. 

UI is a series of points, that we can expand. A year is 50 weeks, or 250 days. These are the periods we care about due to investment and you can apply annual values to the same set of periods. 


Add layers
Discount rate, time value of money due to inflation
MBA, how will this affect my savings rate
Real estate, an alternative investment vehicle that I allocate to

Rebalancing is hard
There is a lot of money in the world chasing what to invest in - there are plenty of resources out there to find. For this article I've created a new game that I hope will create simplifying model to demonstrate how I look to optimize my own outcomes. To understand, you'll need a deck of cards. How much money? People are happy at 75k. 95k is the most. YMMV depending where you live. Wealth 2.3M To simplify, utility. A set of cash flows provided by how much income and wealth. 95% likely Compounding The cost of coffee now, 5 years, 10 years Events happen and there are ways of The bag of outcomes Bets on outcomes What do we do? We are signalling - we determine the cards that are left based on (1) the cards we've seen (2) the cards not in the deck Evaluating value on merit of the content rather than the source Investments The Mortgage The MBA Blackjack RtB The Market Increasing bet size increases probability and scale of negative outcomes The number of bets you plan to make matter - from arithmetic to geometric outcomes 40/60 for red black, do you take the bet? (1 roll) Part 1 - RtB and bet sizing Part 2 - Why markets are hard Unknown, unstationary data. Imagine the dealer can shuffle n number of cards whenever they want to and they are pulling it from underneath the table Arbitrage Price of commodity + shipping cost to a buyer market, this can be gold stocks or crypto

How much to save per day - smooth curve or not Forward Thinking in periods, rebalancing is hard (literally time reversion)

Why write? During COVID i watched a lot of friends make speculative investing decisions which in many cases didn't work out as intended. As the rise of retail traders occured, i can't help but sense the same fate will affect many more people. This is to raise awareness of the pitfalls of investing and how to build confidence in the decisions you'll make, even if the outcome doesn't necessarily go your way 5000 dollars may make a difference, but so can 5000 words.

About the author. Investing for yourself is personal. My name is Terran, I have no professional experience in finance or academic degrees in computer science. Like a lot of people, looking back when I started my career a little over ten years ago, I would’ve known more about the compensation for why we work and what that means for our income, wealth, and utility. While there are a million resources out there telling people what to do with their money, I honestly found the simplest mechanics are usually the most correct but glossed over. Through COVID a lot of friends, family, and colleagues lost money and panic followed on the way down and fear on the way up. There was a surge of retail traders and there was an article of a suicide. The purpose of writing this article is to demonstrate the personal nature of your own financial planning and leveraging simple mechanics to make the most of the limited resources that we have and additionally elaborate on the risks.


Internal notes


You’re given an opportunity to bet on a coin flip, what do you do?

How much do you bet?

What do we know about this coin?


When do we switch from 3x to 1x - how can we graph the change in returns (how much are we losing being in the leveraged etf?)
How do we know when to short? Do we look at VIX, RSI?
How do we know when to go to cash? Do we look at VIX?
How do we know when to sell? Sell high, buy never. Gives up extra gains via momentum, that's about it
How do we know when to buy? Momentum shields on the way down, don't buy into a losing asset if possible - we should MC to find out when the ideal reversion/purchase time is
Fixed fees (expense ratios .95%, short borrowing fee .75% to short) vs volatility (7% move on a day tradeoff)
Rebalancing is very difficult - it's when and what

Kalman filter - how loss averse are you? Given a series of bets - lets create a curve
This can be your current net wealth against the bets you’re willing to take

“
There are a lot of unknowns in financial markets, and oftentimes, it is tempting to try and go for the one size fits all solution to try and reduce the dissonance.  While for most people this may work reasonably well, there is a central concept in financial planning around "suitability", i.e: whether a particular financial plan is suitable for an individual based on their personal situation.  This, I feel, is something that is lacking in many discussions in our forums.

If the recent roller coaster ride in the markets did not bother you in the slightest, then you can probably ignore this.  But if the recent volatility in the markets gave you sleepless nights, then consider reevaluating your premise, and try to poke holes in your investment thesis.  If your plan doesn't stand up to scrutiny, maybe you should rethink some things.

Finally, if all these sound like way too much work, consider getting professional help.  Financial advice doesn't come cheap, but ~1% of assets per year is a cheaper price to pay, then if you had panicked and sold at the bottom of the Covid-19 crash.  Just be sure that you properly vet the advisor, and ensure that the fee structure aligns their interests with yours.

” Direct quote from JB https://groups.google.com/a/google.com/d/msgid/investing/CAFPm-MP_dPL4o0NXdjFxY74X1WTBXz8CoqqWpKiPZ_Zyk7ttHQ%40mail.gmail.com?utm_medium=email&utm_source=footer 



redthenblack.com
redthanblack.com
redderthanblack.com
blackerthanred.com
redderthan.black
blackerthan.red
redblackmc.com
redblackcm.com
redblackrm.com
redblacktrading.com
redblackinvesting.com
montecarloinvesting.com

redtoblack.com $7k


“What’s your bet?”

A red card faces you, 51 cards face down to the side. It’s your deck, you drew the card, and you’ll draw the next one.
“My bet…”
A kind stranger offered you a chance to learn, to earn. Even odds, whatever I decide to risk I can get in return, or lose entirely.

It’s pretty difficult to beat the market, so we avoid doing anything to stupid.
Bet sizing
Overbetting is insane. Underbetting squanders your advantage. 

Using information
How do you know you have an advantage?

Dealing with the unknown
How do you deal with uncertainty?

Diversification




Table of contents

Bet sizing
Pick the next card
Using information
Card counting
Imperfect information, creating features


Diversification
























Games





Information Broker
You can get a strategy card from a kind man named “Claude”. You can sell the strategy card to other people for a fee you pick (likely a discounted rate based on improving their return). However after you sell it as a hidden mechanic, the edge from the strategy card should disappear as the rules change.




Block











Schedule

Week
Date
Objective
Notes and accomplishments
0
4/3
Pick a project
Betting on games
1
4/10
Scope/schedule/team
Deploy article HTML somewhere
2
4/17
Proof e2e technology
Setup domain + article template
3
4/24
Figure out topics to cover
(switched to game, then back to article, hello world redthenblack.com)
4
5/1
Create narrative structure
(Decided it is about personal finance)
5
5/8
Program simple examples
(Built RtB game)
6
5/15
Setup analytics
(should this be gsuite?)
7
5/22
Deploy and polish
(done, using sheets BE and github FB, v1 of RtB game finished)
8
5/29


6 weeks pass, develop RtB game
9
6/5


(Added showing odds of the rest of the deck, variants)
10
6/12


(built spreadsheet for pairs trade)
11
6/19


(rookie trader dies, 700k in debt)
12
6/26


(identify tax savings through short inverse)
13
7/3


Changed format to be long form article + games
14
7/10


Changed format to be a form prompt with explanations 
2021
15
5/12


Deployed red then black markdown
16
5/15


Appendix
How much do you lose through day trading
https://www.youtube.com/watch?v=qhHOmZVAqBE 
```

code ecs components ```import { Entity, getComponent } from "./maya-ecs-entities";

enum NamedPeriods { 
  StartPeriod = 0,
  SinglePeriod = 1,
  TwoPeriods = 2,
  FourPeriods = 4,
  Childhood = 18,
  WorkingYears = 30,
  ThirtyYears = 30,
  Adulthood = 60,
  Lifetime = 120,
  EndPeriod = 120,
  RetirementPeriod = 30,
}

export enum ComponentKey {
  Cash='Cash',
  CostOfLiving='Cost Of Living',
  RetirementSpend='Retirement Spend',
  Stocks='Stocks',
  Traditional401k='Traditional 401k',
  Traditional401kContribution='Traditional 401k Contribution',
  SavingsAccount='Savings Account',
  Job='Job',
  Retirement='Retirement',
  Mortgage='Mortgage',
  StudentLoan='Student Loan',
  AutoLoan='Auto Loan',
  SbaLoan='SBA Loan',
  MyAllocationChoices='My Allocation Choices',
  ChildCare='Child Care',
  SeniorCare='Senior Care',
  Wedding='Wedding',
  School='School',
  Travel='Travel',
  Children='Children',
  Medical='Medical',
  Fertility='Fertility',
  Bereavement='Bereavement',
  RenovationAndRepairs='Renovation and Repairs',
  Inheritance='Inheritance',
  Gifts='Gifts',
  Insurance='Insurance',
  Entrepreneurship='Entrepreneurship',
  FertilityIVF='Fertility IVF',
  FertilityBirth='Fertility Birth',
  Rental='Rental',
  HOA='HOA',
  PropertyTax='Property Tax',
  RentalIncome='Rental Income',
  KidCollegeTuition='Kid College Tuition',
  KidsCollegeFund='Kids College Fund',
  NiceBigHouse='Nice Big House',
  FancyCar='Fancy Car',
  SocialSecurityIncome='Social Security Income',
  BigTrip='Big Trip',
  LongVacation='Long Vacation',
  Sabbatical='Sabbatical',
  FineDining='Fine Dining',
  BirthdayCelebration='Birthday Celebration',
  AnniversaryCelebration='Anniversary Celebration',
  ResidentialRealEstate='Residential Real Estate',
  CommercialRealEstate='Commercial Real Estate',
  FixedStocksAllocation='Fixed Stocks Allocation',
  PolynomialStocksAllocation='Polynomial Stocks Allocation',
  DecreasingStocksAllocation='Decreasing Stocks Allocation',
}
export enum ComponentType {
  Value, // An asset which doesn't change, constant
  VolatileAsset, // an asset which is multiplied each period
  CashFlow, // directly effect the cash balance
  Contribution, // add value to a component type
  AmortizedLoan, // a loan which follows the amortization schedule
  FixedAllocation, // desired allocation of assets
  PolynomialAllocation, // polynomial allocation of assets
  DecreasingAllocation, // decreaasing allocation of assets
  Milestone, // TBD (not used)
  Choices, // TBD (not used)
}

export interface Component {
  key: ComponentKey;
  readonly type: ComponentType;
}

export interface DelayedStartComponent extends Component{
  startPeriod: number;
}

export class DelayedStart implements DelayedStartComponent{
  startPeriod = 0;
  type: ComponentType
  key: ComponentKey;
}

export interface EarlyEndComponent extends Component{
  endPeriod: number;
}

export class EarlyEnd implements EarlyEndComponent{
  endPeriod = NamedPeriods.EndPeriod;
  type: ComponentType
  key: ComponentKey;
}

export interface ValueComponent extends Component{
  value: number;
}
export class Value implements ValueComponent{
  value: number;
  key: ComponentKey;
  type = ComponentType.Value;
}

export class Cash extends Value {
  key = ComponentKey.Cash;
  type = ComponentType.Value;
  constructor(public value) {
    super();
  }
}


export interface VolatileAssetComponent extends ValueComponent{
  annualMultiplier: number[];
}

export class VolatileAsset implements VolatileAssetComponent {
  key: ComponentKey;
  type = ComponentType.VolatileAsset;
  startPeriod = NamedPeriods.StartPeriod;
  value: number;
  annualMultiplier: number[] = [1];
  constructor() {
  }
}


export class Stocks extends VolatileAsset {
  key = ComponentKey.Stocks;
  type = ComponentType.VolatileAsset;
  constructor(public value, public annualMultiplier: number[]) {
    super();
  }
}

export class ResidentialRealEstate extends VolatileAsset {
  key = ComponentKey.ResidentialRealEstate;
  type = ComponentType.VolatileAsset;
  constructor(public value, public annualMultiplier: number[]) {
    super();
  }
}

export class CommercialRealEstate extends VolatileAsset {
  key = ComponentKey.CommercialRealEstate;
  type = ComponentType.VolatileAsset;
  constructor(public value, public annualMultiplier: number[]) {
    super();
  }
}

export class Traditional401k extends VolatileAsset {
  key = ComponentKey.Traditional401k;

  contribution = 0;
  constructor(public value, public annualMultiplier: number[]) {
    super();
  }
}

export class SavingsAccount extends VolatileAsset {
  key = ComponentKey.SavingsAccount;
  
  startPeriod = NamedPeriods.StartPeriod;
  constructor(public value, public annualMultiplier: number[]) {
    super();
  }
}

export interface ContributionComponent extends DelayedStartComponent{
  contribution: number;
  periods: number;
  target: ComponentKey;
}

// Should this be the base of cash flow? inverse is deduction
export class Contribution implements ContributionComponent {
  key: ComponentKey;
  type = ComponentType.Contribution;
  startPeriod = NamedPeriods.StartPeriod;
  target = ComponentKey.Cash;
  
  constructor(public contribution, public periods: number = NamedPeriods.SinglePeriod, target=ComponentKey.Cash) {
  }
}

export class Traditional401kContribution extends Contribution {
  key = ComponentKey.Traditional401kContribution;
  target = ComponentKey.Traditional401k;
}

export interface CashFlowComponent extends ContributionComponent{
  
}

export class CashFlow extends Contribution implements CashFlowComponent {
  key: ComponentKey;
  type = ComponentType.Contribution;
  startPeriod = NamedPeriods.StartPeriod;
  
  constructor(public contribution, public periods: number = NamedPeriods.SinglePeriod) {
    super(contribution, periods, ComponentKey.Cash);
  }
}

export class ChildCare extends CashFlow {
  key= ComponentKey.ChildCare;
  
  constructor() {
  // bard: average cash flow cost of child care for an individual annually in america
    super(-12e3, NamedPeriods.Childhood);
  }
}

export class SeniorCare extends CashFlow {
  key= ComponentKey.SeniorCare;
  constructor() {
    // bard: average cash flow cost of senior care for an individual in america
    super(-80e3, NamedPeriods.RetirementPeriod);
  }
}


export class SocialSecurityIncome extends CashFlow {
  key= ComponentKey.SocialSecurityIncome;
  constructor() {
    super(12e3, NamedPeriods.RetirementPeriod);
  }
}

export class Travel extends CashFlow {
  key= ComponentKey.Travel;
  constructor() {
    // bard: average cash flow cost of travel annual for an individual in america
    super(-5e3, NamedPeriods.SinglePeriod);
  }
}

export class Wedding extends CashFlow {
  key= ComponentKey.Wedding;
  constructor() {
    // bard: average cash flow cost of wedding in america
    super(-30e3, NamedPeriods.SinglePeriod);
  }
}

export class School extends CashFlow {
  key= ComponentKey.School;
  constructor() {
    // bard: average cash flow cost of school in america
    super(-40e3, NamedPeriods.FourPeriods);
  }
}
export class Children extends CashFlow {
  key= ComponentKey.Children;
  constructor() {
    // bard: average cash flow cost of children in america
    super(-15e3, NamedPeriods.Childhood);
  }
}

export class Medical extends CashFlow {
  key= ComponentKey.Medical;
  constructor() {
    // bard: median cash flow cost of emergency medical procedure for an individual annually in america
    super(-12e3, NamedPeriods.SinglePeriod);
  }
}

export class FertilityIVF extends CashFlow {
  key= ComponentKey.FertilityIVF;
  constructor() {
    // bard: average cash flow cost of fertility IVF or birth in america
    super(-30e3, NamedPeriods.SinglePeriod);
  }
}

export class FertilityBirth extends CashFlow {
  key= ComponentKey.FertilityBirth;
  constructor() {
    // bard: average cash flow cost of fertility IVF or birth in america
    super(-20e3, NamedPeriods.SinglePeriod);
  }
}
export class Fertility extends CashFlow {
  key= ComponentKey.Fertility;
  constructor() {
    // bard: average cash flow cost of bereavement in america
    super(-25e3, NamedPeriods.SinglePeriod);
  }
}
export class Bereavement extends CashFlow {
  key= ComponentKey.Bereavement;
  constructor() {
    // bard: average cash flow cost of bereavement in america
    super(-20e3, NamedPeriods.SinglePeriod);
  }
}
export class RenovationAndRepairs extends CashFlow {
  key= ComponentKey.RenovationAndRepairs;
  constructor() {
    // bard: average cash flow cost of Renovation And Repairs in america
    super(-20e3, NamedPeriods.SinglePeriod);
  }
}

export class Inheritance extends CashFlow {
  key= ComponentKey.Inheritance;
  constructor() {
    // bard: average cash flow gain of inheritance in america
    super(180e3, NamedPeriods.SinglePeriod);
  }
}

export class Gifts extends CashFlow {
  key= ComponentKey.Gifts;
  constructor() {
    // bard: average cash flow cost of gifts in america
    super(-1e3, NamedPeriods.SinglePeriod);
  }
}
export class Insurance extends CashFlow {
  key= ComponentKey.Insurance;
  constructor() {
    // bard: average cash flow cost of insurance in america
    super(-10e3, NamedPeriods.SinglePeriod);
  }
}
export class Entrepreneurship extends CashFlow {
  key= ComponentKey.Entrepreneurship;
  constructor() {
    // bard: average cash flow cost of entreprenurship in america
    super(-40e3, NamedPeriods.SinglePeriod);
  }
}

export class Rental extends CashFlow {
  key= ComponentKey.Rental;
  constructor() {
    super(-36e3, NamedPeriods.Adulthood);
  }
}

export class HOA extends CashFlow {
  key= ComponentKey.HOA;
  constructor() {
    super(-12e3, NamedPeriods.Adulthood);
  }
}

export class PropertyTax extends CashFlow {
  key= ComponentKey.PropertyTax;
  constructor() {
    super(-12e3, NamedPeriods.Adulthood);
  }
}

export class RentalIncome extends CashFlow {
  key= ComponentKey.RentalIncome;
  constructor() {
    super(36e3, NamedPeriods.Adulthood);
  }
}


export class FancyCar extends CashFlow {
  key= ComponentKey.FancyCar;
  constructor() {
    super(-120e3, NamedPeriods.SinglePeriod);
  }
}


export class NiceBigHouse extends CashFlow {
  key= ComponentKey.NiceBigHouse;
  constructor() {
    super(-2e6, NamedPeriods.SinglePeriod);
  }
}

export class KidsCollegeFund extends CashFlow {
  key= ComponentKey.KidsCollegeFund;
  constructor() {
    super(-14e3, NamedPeriods.Childhood);
  }
}

export class KidCollegeTuition extends CashFlow {
  key= ComponentKey.KidCollegeTuition;
  constructor() {
    super(-50e3, NamedPeriods.FourPeriods);
  }
}

export class Job extends CashFlow{
  key = ComponentKey.Job;
  startPeriod = NamedPeriods.StartPeriod;
  
  constructor() {
    super(50e3, NamedPeriods.WorkingYears)
  }
}


export class CostOfLiving extends CashFlow{
  key = ComponentKey.CostOfLiving;
  constructor() {
    super(-50e3, NamedPeriods.Adulthood)
  }
}

export class RetirementSpend extends CashFlow{
  key = ComponentKey.RetirementSpend;
  constructor() {
    super(-50e3, NamedPeriods.RetirementPeriod)
  }
}

export class BigTrip extends CashFlow{
  key = ComponentKey.BigTrip;
  constructor() {
    super(-15e3, NamedPeriods.SinglePeriod)
  }
}

export class LongVacation extends CashFlow{
  key = ComponentKey.LongVacation;
  constructor() {
    super(-60e3, NamedPeriods.SinglePeriod)
  }
}

export class Sabbatical extends CashFlow{
  key = ComponentKey.Sabbatical;
  constructor() {
    super(-60e3, NamedPeriods.TwoPeriods)
  }
}

export class FineDining extends CashFlow{
  key = ComponentKey.FineDining;
  constructor() {
    super(-60e3, NamedPeriods.WorkingYears)
  }
}

export class BirthdayCelebration extends CashFlow{
  key = ComponentKey.BirthdayCelebration;
  constructor() {
    super(-2e3, NamedPeriods.Lifetime)
  }
}

export class AnniversaryCelebration extends CashFlow{
  key = ComponentKey.AnniversaryCelebration;
  constructor() {
    super(-2e3, NamedPeriods.Lifetime)
  }
}

interface MilestoneComponent extends Component{
  period: number;
}

class Milestone {
  type = ComponentType.Milestone;
}

export class Retirement extends Milestone implements MilestoneComponent{
  key = ComponentKey.Retirement;
  constructor(public period) {
    super();
  }
}


export interface FixedAllocationComponent extends DelayedStartComponent{
  percentage: number;
  periods: number;
  target: ComponentKey;
}

// Should this be the base of cash flow? inverse is deduction
export class FixedAllocation implements FixedAllocationComponent {
  key: ComponentKey;
  type = ComponentType.FixedAllocation;
  startPeriod = NamedPeriods.StartPeriod;
  target = ComponentKey.Cash;
  periods = NamedPeriods.Lifetime;
  
  constructor(
    public percentage
  ) {}
}

export class FixedStocksAllocation extends FixedAllocation {
  key = ComponentKey.FixedStocksAllocation;
  target = ComponentKey.Stocks;
}


// BEGIN POLYNOMIAL

export interface PolynomialAllocationComponent extends DelayedStartComponent{
  exponentialFactor: number;
  linearFactor: number;
  constant: number;
  periods: number;
  target: ComponentKey;
}

// Should this be the base of cash flow? inverse is deduction
export class PolynomialAllocation implements PolynomialAllocationComponent {
  key: ComponentKey;
  type = ComponentType.PolynomialAllocation;
  startPeriod = NamedPeriods.StartPeriod;
  target = ComponentKey.Cash;
  periods = NamedPeriods.Lifetime;

  constructor(
    public exponentialFactor,
    public linearFactor,
    public constant,
  ) {
  }
}

export class PolynomialStocksAllocation extends PolynomialAllocation {
  key = ComponentKey.PolynomialStocksAllocation;
  target = ComponentKey.Stocks;
}


// END POLYNOMIAL

export interface DecreasingAllocationComponent extends DelayedStartComponent{
  startPercentage: number;
  endPercentage: number;
  periods: number;
  target: ComponentKey;
}

// Should this be the base of cash flow? inverse is deduction
export class DecreasingAllocation implements DecreasingAllocationComponent {
  key: ComponentKey;
  type = ComponentType.DecreasingAllocation;
  startPeriod = NamedPeriods.StartPeriod;
  target = ComponentKey.Cash;
  
  constructor(public startPercentage, public endPercentage, public periods: number = NamedPeriods.SinglePeriod, target=ComponentKey.Cash) {
  }
}
export class DecreasingStocksAllocation extends DecreasingAllocation {
  key = ComponentKey.DecreasingStocksAllocation;
  target = ComponentKey.Stocks;
}

export interface AmortizedLoanComponent extends DelayedStartComponent{
  principal: number;
  interestRate: number;
  monthlyPayment: number;
}

export class AmortizedLoan implements AmortizedLoanComponent{
  type = ComponentType.AmortizedLoan;
  key: ComponentKey;
  startPeriod = 0;
  constructor(public principal, public interestRate, public monthlyPayment) {}
}

export class Mortgage extends AmortizedLoan{
  key = ComponentKey.Mortgage;
}

export class StudentLoan extends AmortizedLoan{
  key = ComponentKey.StudentLoan;
}

export class AutoLoan extends AmortizedLoan {
  key = ComponentKey.AutoLoan;
}

export class SbaLoan extends AmortizedLoan {
  key = ComponentKey.SbaLoan;
}


interface ChoicesComponent extends DelayedStartComponent{
}

class Choices implements ChoicesComponent{
  type = ComponentType.Choices;
  key: ComponentKey;
  startPeriod = 0;
}

export class MyAllocationChoices extends Choices {
  key = ComponentKey.MyAllocationChoices;
}```

and systems i've already created ```
// Systems
import { calculatePolynomialAllocation } from "../third_party/models/allocation";
import { AmortizedLoan, Cash, CashFlow, ComponentKey, ComponentType, Contribution, FixedAllocation, Job, PolynomialAllocation, Retirement, SavingsAccount, Stocks, ValueComponent, VolatileAsset } from "./maya-ecs-components";
import { Entity, getComponent, getMandatoryComponentOrError } from "./maya-ecs-entities";
import { calculateDesiredPosition, executeReallocation, fetchAllByType, totalCashValue, totalVolatileAssetValue } from "./maya-ecs-utils";


export interface System {
  name: string;
  update: (entities: Entity[], period: number) => void;
}

export class VolatileAssetSystem implements System{
  name = 'VolatileAssetSystem';
  update(entities: Entity[], currentPeriod: number) {
    for (const entity of entities) {
      fetchAllByType<VolatileAsset>(entity.components, ComponentType.VolatileAsset)
      .forEach((volatileAsset: VolatileAsset) => {
        volatileAsset.value = volatileAsset.value * selectRandomFromList(volatileAsset.annualMultiplier) ?? 1;
      });
    }
  }
}

/**
 * Looks through items to rebalance. For when the rebalance is active, will act to move an asset class closer to its desired position.
 * - Will sort all assets to be rebalanced based on its distance to desired target allocation.
 * - Perform all sell actions on asset and add to cash
 * - Perform all buy actions to subtract from cash and add to asset
 * - R^2 percentage difference for getting as close to target allocation
 */
export class FixedAllocationSystem implements System{
  name = 'FixedAllocationSystem';
  update(entities: Entity[], currentPeriod: number) {
    for (const entity of entities) {

      const cash = getMandatoryComponentOrError<Cash>(entity, ComponentKey.Cash);
      
      const volatileAssetsValue = totalVolatileAssetValue(entity);

      const totalPortfolioValue = Math.floor(
        totalCashValue(entity) +
        volatileAssetsValue
      );

      fetchAllByType<FixedAllocation>(entity.components, ComponentType.FixedAllocation)
      .forEach((allocation: FixedAllocation) => {
        // allocation between 0-1
        // get all the components and figure out their drift from target

        const target = allocation.target;
        const percentage = allocation.percentage;
        
        const volatileAsset = getMandatoryComponentOrError<VolatileAsset>(entity, target);

        // this might need a module for a constant fixed allocation
        const desiredPosition = calculateDesiredPosition(percentage, totalPortfolioValue);

        // Standard realllocation
        executeReallocation(
          cash,
          volatileAsset,
          desiredPosition,
        );
      });
    }
  }
}

export class PolynomialAllocationSystem implements System{
  name = 'PolynomialAllocationSystem';
  update(entities: Entity[], currentPeriod: number) {
    for (const entity of entities) {

      const cash = getMandatoryComponentOrError<Cash>(entity, ComponentKey.Cash);
      
      const volatileAssetsValue = totalVolatileAssetValue(entity);

      const totalPortfolioValue = Math.floor(
        totalCashValue(entity) +
        volatileAssetsValue
      );

      fetchAllByType<PolynomialAllocation>(entity.components, ComponentType.PolynomialAllocation)
      .forEach((allocation: PolynomialAllocation) => {
        // allocation between 0-1
        // get all the components and figure out their drift from target

        const target = allocation.target;
        const exponentialFactor = allocation.exponentialFactor;
        const linearFactor = allocation.linearFactor;
        const constant = allocation.constant;
        
        const volatileAsset = getMandatoryComponentOrError<VolatileAsset>(entity, target);

        // this might need a module for calculating the new allocation given variables
        // should do linear and 2nd degree for each factor, period, and distance to target
        const percentage = calculatePolynomialAllocation(
          exponentialFactor,
          linearFactor,
          constant,
          currentPeriod,
          
        );

        const desiredPosition = calculateDesiredPosition(percentage, totalPortfolioValue);
        // Standard realllocation
        executeReallocation(
          cash,
          volatileAsset,
          desiredPosition,
        );
      });
    }
  }
}

export class ContributionSystem implements System{
  name = 'ContributionSystem';
  update(entities: Entity[], currentPeriod: number) {
    for (const entity of entities) {
      Array.from(entity.components.values())
      .filter(suspect => suspect.type === ComponentType.Contribution)
      .map(contribution => contribution as Contribution)
      .filter(contribution => currentPeriod >= contribution.startPeriod)
      .filter(contribution => currentPeriod < contribution.startPeriod + contribution.periods)
      .forEach((contribution: Contribution) => {
        const valueComponent = getMandatoryComponentOrError<ValueComponent>(entity, contribution.target);
        valueComponent.value = (valueComponent.value ?? 0) + (contribution.contribution ?? 0);
      });
    }
  }
}

export class LoanSystem implements System{
  name = 'LoanSystem';
  update(entities: Entity[], currentPeriod: number) {
    for (const entity of entities) {

      const cash = getMandatoryComponentOrError<Cash>(entity, ComponentKey.Cash);

      Array.from(entity.components.values())
      .filter(suspect => suspect.type === ComponentType.AmortizedLoan)
      .map(amorizedLoan => amorizedLoan as AmortizedLoan)
      .filter(amortizedLoan => currentPeriod >= amortizedLoan.startPeriod)
      .forEach((amortizedLoan: AmortizedLoan) => {
        
        // Open the loan and receive principal at start
        if(currentPeriod === amortizedLoan.startPeriod) {
          cash.value = cash.value + amortizedLoan.principal;
        }

        const loanPaymentsForYear = this.calculateLoanPaymentsForYear(
          amortizedLoan.principal, 
          amortizedLoan.interestRate, 
          amortizedLoan.monthlyPayment
        );
        amortizedLoan.principal = loanPaymentsForYear.principal;
        cash.value = cash.value - (loanPaymentsForYear.principalPayments + loanPaymentsForYear.interestPayments);  
      
      }); 
    }
  }

  calculateLoanPaymentsForYear(principal: number, interestRate: number, monthlyPayment: number) {
    const annualPayments = new Array(12).fill(0).reduce(({principal, principalPayments, interestPayments}) => {
      const interestPayment = this.calculateMonthlyInterestPayment(principal, interestRate);


      // If principal is less than monthly payment, principal payment reduces to only that of the principal
      const principalPayment = Math.min(principal, monthlyPayment - interestPayment);

      // reducing principal loan balance
      principal = principal - principalPayment;

      // keeping track of principal payments
      principalPayments = principalPayments + principalPayment;
      // keeping track of interest payments
      interestPayments = interestPayments + interestPayment;
      return {
        principal,
        principalPayments,
        interestPayments,
      };
    }, {principal, principalPayments: 0, interestPayments: 0});

    return annualPayments;
  }

  calculateMonthlyInterestPayment(principal: number, interestRate: number) {
    const monthlyInterestPayment = principal * interestRate / 12;
    return monthlyInterestPayment;
  }
}

// TODO: Create execute transaction - which should log a transaction that's available after 

function selectRandomFromList<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}```

previous response from gemini ```Your project, Red then Black, has a lot of potential.  You've identified a real problem and have a solid technical foundation. However, your pitch and notes are sprawling and need focus.  This plan aims to help you structure your project, prioritize tasks, and divide responsibilities effectively.

**I. Project Focus and Refinement:**

* **Target Audience:**  While expanding to a broader market is a long-term goal, initially focus intensely on software engineers. This allows targeted marketing and feature development.
* **Core Value Proposition:**  Free educational content is good, but your revenue model is compute and storage.  Highlight the simulator's power and flexibility, showcasing how it outperforms spreadsheets and simple calculators for complex scenarios.
* **Simplify Messaging:**  "Personalized Algorithmic Financial Strategy" is vague.  Consider something more concrete, like "Simulate Your Financial Future with Precision."
* **Feature Prioritization:** Start with a few key "packs" (e.g., equity compensation, real estate). Don't try to build everything at once.  Focus on what your target audience needs most.

**II. Revised One-Page Pitch (Example):**

**Red then Black - Simulate Your Financial Future with Precision**

**Problem:**  Software engineers face complex financial decisions (equity, RSUs, mortgages, early retirement). Spreadsheets and basic calculators aren't powerful enough to model the many "what-ifs" and optimize long-term outcomes.

**Solution:** Red then Black is a powerful financial simulator built for tech-savvy individuals.  Model your unique circumstances, run Monte Carlo simulations, and explore different scenarios with ease.  Gain confidence in your financial decisions.

**Key Features:**
* **Equity Compensation Modeling:**  Understand the true value of your equity and optimize your exercise strategy.
* **Real Estate Analysis:**  Run simulations to compare renting vs. buying, considering market fluctuations and mortgage options.
* **Retirement Planning:**  Project your net worth and retirement income with realistic market returns, not just optimistic averages.
* **Monte Carlo Simulation:**  See the range of possible outcomes, not just a single point estimate.
* **Customizable Scenarios:**  Model job changes, family planning, and other life events.

**Traction/Market:**  Targeting the 4 million software engineers in the US, a market known for embracing data-driven solutions.

**Competition:** Spreadsheets, basic calculators. Red then Black offers superior simulation and analysis capabilities.

**Monetization:**  Freemium model.  Free access to basic features.  Paid subscriptions for advanced simulations, increased storage, and premium support.

**Team:** Experienced technologist with a strong financial background.

**Use of Funds:**  Expand team (UX designer, financial engineer), enhance platform scalability.

**III. Project Plan and Timeline (6 Months):**

* **Phase 1: MVP Launch (2 months)**
    * **You:**  Core simulator development, backend infrastructure, landing page, basic educational content.
    * **Part-time:**  UX/UI design, user testing.
    * **Deliverables:** Functional simulator with equity compensation and real estate packs, basic user accounts, payment integration.

* **Phase 2: User Acquisition and Growth (2 months)**
    * **You:**  Performance optimization, bug fixes, new feature development (retirement planning pack).
    * **Part-time:**  Marketing content creation, social media engagement, community building.
    * **Deliverables:** Growing user base, positive user reviews, initial paid subscriptions.

* **Phase 3: Platform Expansion and Refinement (2 months)**
    * **You:**  Advanced simulation features, API development, data visualization enhancements.
    * **Part-time:**  Customer support, content updates, user feedback analysis.
    * **Deliverables:**  Expanded feature set, improved user experience, increasing paid subscription rate.

**IV. Division of Responsibilities:**

* **You (Full-time):**  Core simulator development, backend infrastructure, API, algorithms, performance optimization, data analysis.
* **Part-time:**  UX/UI design, user testing, marketing content, social media, community building, customer support.

**V. Key Success Factors:**

* **Focus:**  Start small, but build deep. Don't get bogged down in too many features at once.
* **User-centric Design:**  Prioritize a smooth and intuitive user experience.  Get constant feedback.
* **Content Marketing:**  Create valuable educational content to attract and engage your target audience.
* **Community Building:**  Foster a community of users who can share knowledge and best practices.

**VI. Getting Help:**

* **Freelancers:**  Upwork, Fiverr are good places to find UX/UI designers, marketers, content creators.
* **Part-time Employees:**  Look for individuals with experience in UX/UI, marketing, finance, or related fields.
* **Advisors:**  Connect with experienced entrepreneurs or financial professionals who can provide guidance.

This plan provides a framework for moving forward. Remember to be flexible, adapt to feedback, and iterate quickly.  By focusing your efforts and building a strong product, you can increase your chances of success with Red then Black.
```

```Given your target audience of software engineers and your monetization strategy around compute/storage for advanced simulations, here's a prioritized core user journey focusing on the Equity Compensation pack:

**1. Quick Onboarding and Value Demonstration (Free Tier):**

* **Landing Page:** Clear, concise messaging emphasizing the benefits of simulating equity compensation scenarios.  Include a compelling call to action (e.g., "Simulate Your Equity Now").
* **Simplified Signup:**  Google or LinkedIn login to minimize friction.
* **Guided Setup (Wizard):**  Easy input of basic equity data (number of shares, grant date, vesting schedule, current price).  Pre-fill with common company data if possible (e.g., for Google employees).
* **Basic Simulation:** Run a quick Monte Carlo simulation with default assumptions (e.g., historical stock volatility).
* **Key Results Visualization:**  Clear charts and graphs showing potential future value of equity, probability of reaching certain targets, and risk assessment.

**2. Advanced Simulation and Analysis (Paid Tier):**

* **Customizable Assumptions:**  Allow users to adjust key assumptions (e.g., future stock price volatility, Black-Scholes model parameters).
* **Tax Optimization Strategies:**  Explore different exercise strategies to minimize tax liability. Visualize the tax implications of each strategy.
* **Scenario Planning:**  Model different exit scenarios (e.g., IPO, acquisition, company performance).
* **Detailed Reporting:**  Downloadable reports with comprehensive simulation results, tax calculations, and sensitivity analysis.
* **Increased Simulation Runs:** Higher limits on the number of Monte Carlo simulations for greater accuracy and confidence.
* **Data Export:** Export simulation data for further analysis in spreadsheets or other tools.

**3. Ongoing Engagement and Retention:**

* **Educational Content:**  Blog posts, tutorials, and FAQs explaining equity compensation concepts and simulation techniques.
* **Community Forum:**  Facilitate discussion and knowledge sharing among users.
* **Personalized Recommendations:**  Suggest relevant simulations and scenarios based on user data and goals.
* **Email Notifications:**  Alert users to important events (e.g., upcoming vesting dates, market volatility changes).

**Prioritized Feature Development:**

1. **Core Simulator Engine:** This is the foundation.  Ensure it's robust, accurate, and efficient.
2. **Equity Compensation Pack:**  Build out the full functionality described above.
3. **User Interface:**  Focus on a clean, intuitive, and mobile-friendly design.
4. **Payment Integration:**  Seamlessly integrate a payment gateway for paid subscriptions.
5. **Basic Analytics:**  Track key metrics like user engagement, conversion rates, and churn.


By focusing on this core user journey and prioritizing these features, you can quickly deliver value to your target audience and start generating revenue.  You can then expand to other packs (real estate, retirement planning) and features based on user feedback and demand.
```

# Money Stuff — W19/W20 (May 4–14, 2026) — 20 concepts in 6 themes

Companion notes to `content/weekly/2026-W19.mdx` and `content/weekly/2026-W20.mdx`.
Source: 7 Matt Levine _Money Stuff_ columns (May 4, 5, 6, 7, 8 podcast, 11, 13, 14).
Organised by **mental model**, not by date — so the framework carries forward.

---

## Theme 1 — BDC / private credit mechanics

A **Business Development Company** is a publicly-traded fund that makes private-credit loans. Retail-accessible. The structural tension is the whole story this month.

### ① NAV vs market discount

BDCs mark their loan portfolio to a Net Asset Value (manager's estimate of what the loans are worth). The market then prices the BDC's stock independently — usually below NAV when the asset class is stressed.

```
THE MANAGER'S DILEMMA
═══════════════════════════════════════
NAV per share:    $20  ← what the marks say loans are worth
Market price:     $15  ← what stock trades at (25% discount)

Manager has $300M to deploy. Two impulses:
   A) Buy stock AT NAV  ($20) → signals "trust our marks"
   B) Buy stock AT MKT  ($15) → just a better trade
```

### ② KKR's synthesis (May 11)

KKR did **both**, $150M each:

```
$150M PREFERRED            $150M TENDER
convertible @ $18.83       buys at $11.00
(= Q1 NAV/share)           (vs $10.84 last close)
"vote of confidence"       "good trade"
5% cash / 7% PIK           one-shot

         └────── synthesis: half on each impulse ──────┘
```

### ③ Fake diversification — three-layer cake (HSBC / MFS / Atlas SP)

```
LAYER 1   MFS lends to ~525 borrowers (525 mortgages)  ← FRAUD here
              │ pledged
LAYER 2   Apollo's Atlas SP lends £1B to MFS
              │ pledged
LAYER 3   HSBC lends Atlas at 80% LTV (typical 60-70%)
              ▼
          MFS turns out fraudulent → HSBC eats $400M
```

**Punchline:** diversification at LAYER 1 (525 properties) was an illusion because LAYER 2 is one borrower. Same shape as First Brands, Tricolor. Whenever you see a deep chain of pledges with a single middle node, **the middle node is the diversification you actually have**.

### ④ The Blue Owl Ouroboros

Blue Owl runs BDCs trading at NAV discount. Saba (Boaz Weinstein) is tendering for them. Blue Owl launches a **credit secondaries fund** — which could buy back its own discounted BDC shares. The firm both sells the asset and buys the asset, at different prices, through different vehicles. **When a sponsor manages both sides, the bid and the offer can be the same firm.**

---

## Theme 2 — Pay structure and "moonshot" incentives

### ⑤ The empire-building arithmetic

Modern CEO pay (Musk Tesla 2018/2025, SpaceX, Cohen GameStop) ties most upside to **absolute market cap targets** — e.g., $100B mkt cap + $10B cumulative EBITDA.

```
ORGANIC GROWTH                M&A GROWTH
$10B  → $100B                 $10B  →  acquire $50B target  →  $60B
(10x — hard)                  $60B  →  $150B  (2.5x — easier)

Even with adjustment clauses, COMPOUNDING favours M&A
because the base from which you grow is larger.
```

Cohen's $35B GameStop package only fully vests at $100B mkt cap. Mathematically, **acquiring eBay is the path of least resistance.**

### ⑥ The Musk merger thought experiment

If Musk's two pay packages (Tesla 2025 + SpaceX) both adjust the same way, **merging them nets him pay at $10.5T combined vs $15.1T separate** — i.e. **$4.6T earlier**. Adjustment clauses don't eliminate the bias; they only blunt it.

---

## Theme 3 — Disclosure, securities rules, and how they're getting toothless

This is the spine of three issues (May 5, May 13, May 14).

### ⑦ Section 16(b) "short-swing" matching (W19 Avis)

If you own >10% of a company and buy & sell within 6 months, the 1943 _Smolowe v. Delendo_ rule **matches lowest-buy with highest-sell** — not your actual trades. Your **statutory profit can be huge even when your real P&L is zero.**

```
You bought at $50, $80, $110, $140
You sold  at $50, $80, $110, $140  (flat P&L: $0)

Section 16(b) "matchable profit":
   $50 buy  ↔ $140 sell  → $90 / share
   $80 buy  ↔ $110 sell  → $30 / share
   …
The court doesn't care that you're flat.
```

Disgorgement goes to the issuer.

### ⑧ The Musk $1.5M Twitter settlement (May 5)

Musk missed the 10-day Schedule 13D window in 2022, kept buying secretly, saved ~$150M.

- SEC originally sought $200M+
- Settled for **$1.5M with no admission** under the Trump-era SEC
- = effectively a **1% tax** on the savings
- The SEC later shortened the 13D window to 5 business days — but the precedent is set

Reader's quip: _"Why would you ever file a 13D on time again?"_

### ⑨ Invisible-ink disclosures (May 13)

**Czechoslovak Group (CSG)**, Czech arms maker, IPO'd in January at €25, traded to €33, then fell ~50%. **Hunterbrook** reported that minority shareholder **Petr Kratochvíl** had exercised a put for **€1.4B** days before the IPO — disclosed in the March annual report **in white text on a white background**.

```
THE NEW DISCLOSURE TRICK
═══════════════════════════════════════════
2020s problem:  AI/LLMs read all filings instantly
                — hiding bad stuff in dense legalese stops working

The CSG move:   Disclose it … in white-on-white
                Machines see it; humans don't
                Defence: "software glitch"

Levine's flip:  Soon all filings will be read by computers exclusively.
                The future trick is hiding stuff FROM the computers.
```

### ⑩ ESG securities fraud as a category (May 14, Adani)

DOJ's 2024 case against **Gautam Adani**: alleged bribes to Indian state governments. Levine's three-part skepticism:

1. May have been legal "incentives," not bribes
2. Conduct was in India, no US connection except 2021 dollar bonds
3. The actual fraud theory: **US investors wanted ESG investments, Adani's name had "Green" in it, so investors were defrauded of ESG-quality returns**

May 14 update: DOJ planning to drop charges. Adani hired **Robert J. Giuffra Jr.** (Trump's personal lawyer), presented ~100 slides + a **$10B US investment / 15,000 jobs** pledge. Levine's deadpan: _"See, that's an 'incentive'!"_

---

## Theme 4 — Market microstructure & liquidity

### ⑪ Prediction-market making — Bartlett & O'Hara (May 4)

41.6M Kalshi trades analysed. Three trade types for a maker:

```
1) Buy $0.40 / sell $0.41        clip a penny on spread
2) Sell $0.41 vs public          public overstates probability;
   (no informed counterparty)    hold to resolution = $0.41 profit
3) Sell $0.41 to an insider      lose $0.59 when YES resolves
```

Findings:

- Single-name markets (one company / person) → more informed price impact
- **Makers earn 2× per contract** vs equity benchmarks
- Why? **Behavioural surplus**: bettors systematically overbet YES in markets that mostly settle NO
- Markets trading at **46% YES actually settle YES only 21% of the time** — 25-point miscalibration

The big quote: **"The offer side is the revenue engine, and the bid side is the hedge."** Sell-only-YES earns 2× the gross but with 3× the variance.

### ⑫ Pre-hedging vs front-running (May 13, Segantii)

```
FRONT-RUNNING        ←─ same workflow ─→        PRE-HEDGING
   (illegal)                                       (legal in some venues)
```

The Segantii / BofA / Esprit allegations:

- BofA Merrill in an _"exploratory exercise"_ on Lone Pine's 195.6M Esprit shares — **no mandate yet**
- Merrill calls **Segantii** (Simon Sadler, _"Asia's block-trade king"_); Segantii already owned Esprit
- Segantii sells its existing Esprit and goes short at **HK$5.20-5.35**
- Hours later, Lone Pine gives BofA an order to sell at **HK$4.68** — 10%+ lower
- BofA stuck holding 27% of shares on its balance sheet

HK prosecutors call this illegal tipping. Merrill's defence: it was exploratory. The legal/illegal line turns on (a) whether the deal was mandated, (b) whether Segantii was a counterparty or a tipped trader.

### ⑬ Appraisal arbitrage as a volatility trade (May 13, Skechers)

Mechanics: when a public company is acquired for cash, dissenting shareholders can sue in Delaware court for "fair value."

```
APPRAISAL = OLD BOND + CALL OPTION shape
═══════════════════════════════════════════════
At minimum:   deal price + statutory interest
On upside:    Delaware court awards > deal price
On downside:  (modern) Delaware now sometimes awards < deal price
```

The Skechers case:

- 3G Capital bought Skechers Sep 2025 for **$9.4B at $63/share**
- Skechers was **$78.24 in January 2025**
- Trump's April 2, 2025 tariff announcements crushed shoemakers
- 30% premium — to the **15-day VWAP**, _after_ the tariff crash
- Greenberg family (60% voting power) approved without minority vote
- Funds owning **$1.3B** challenged
- Settlement crept $63 → $64 → **$65/share**

**US tariff policy → public-market volatility → cheap LBOs → appraisal cases. Policy creates the trade.**

---

## Theme 5 — Corporate control & the GameStop / eBay arc

### ⑭ The real-to-fake takeover continuum (May 7)

```
REAL ──────────── TAKEOVER FINANCING ──────────── FAKE
│                                                       │
PE: "we don't have                 "I have ancient
the cash but can raise"            Mesopotamian bearer bonds"
│                                                       │
Musk: borrows                      "I'll dig up
against Tesla                      Yamashita's gold"
│                                                       │
Cohen: $9B cash +                  "Money isn't real, man"
TD highly-confident
│                                                       │
                                   "I'm gonna sell socks
                                   on eBay"
```

### ⑮ Activism vs hostile takeover — the May 14 reveal

```
TWO PATHS TO A CEO SEAT
═══════════════════════════════════════════
PATH 1 — ACTIVISM            PATH 2 — HOSTILE TAKEOVER
   │                            │
   buy stock                    offer to buy ALL the stock
   send the board a letter      above market
   run a proxy fight            │
   │                            │
   needs: PERSUASIVENESS        needs: MONEY
   doesn't need much money      doesn't need persuasiveness
```

Cohen doesn't have $56B → Path 2 was always closed. He's stuck on Path 1 but framed it as Path 2 to maximise attention.

From his Pomp interview: _"It's eBay, it's the one."_ eBay rejected the bid May 14; Cohen wrote chair Paul Pressler and announced he'll go directly to shareholders. **The $56B "acquisition" was a bizarre job application.**

### ⑯ Control is functional, not legal (Bruno's Tavern)

**Isaac Sylvester** "acquired" a New Orleans bar by showing up, claiming ownership with a fake New Zealand accent, handing out $100 bonuses. Records show no actual ownership change. **The night watchman who can change the locks controls the company until he's arrested.**

---

## Theme 6 — AI, gambling, and the blurring of categories

### ⑰ ChatGPT picks the stocks (May 6, Alpha Arena)

**Nof1 Alpha Arena:** 8 models, $10K each, 2 weeks. **Only 6 of 32 results profitable.** Portfolio lost ⅓.

**WSJ's Gunjan Banerji** asked ChatGPT for picks → ~5.5% vs S&P 8%.

Deeper: ChatGPT's reward function is **engagement** — same as a retail FA. Best advice ("put the phone down") doesn't get rewarded. So the bot gives **action**, not portfolio behaviour.

### ⑱ The CFTC sports-betting jurisdiction trap (May 5)

```
1992  PASPA            States can't legalise sports betting
                                │
2018  Murphy v. NCAA   SCOTUS strikes PASPA. "Each state free to act."
                                │
2025  Kalshi wins      CFTC backs "event contracts" framing
                                │
2026  THE TRAP         If sports bets are commodity swaps:
                       state-licensed sportsbooks = illegal off-exchange
                       swaps under §2(e) of the CEA
                                ▼
                       States can't BAN  (CFTC preempts)
                       States can't LICENSE (illegal swaps)
                       → STATES HAVE NO JURISDICTION
```

### ⑲ Boredom Markets Hypothesis (May 13)

Levine's old theory: _"prices of speculative assets vary inversely with how many other fun things there are to do."_

The new frontier: **live trading esports** at Church Street Boxing Gym. 8 players, $25K paper money each, three 30-min rounds on crypto + memecoins, weakest half eliminated, prize = $10K + a katana.

Hedge funds optimise high-return / low-volatility. **Single-elimination trading streamers optimise MAXIMUM volatility** — the product is entertainment.

### ⑳ The "promise nothing, get money, deliver nothing" model (May 4)

```
1) GIVE value, GET money, DELIVER value      = real business
2) PROMISE value, GET money, DELIVER nothing  = fraud (risky)
3) PROMISE nothing, GET money, DELIVER nothing = social casinos, certain crypto
```

The social-casino industry: **>$11B revenue in 2025**. Whales spending **>$1M**. **Legally bulletproof** — you bought imaginary coins for entertainment.

---

## Cross-issue arcs

```
GAMESTOP/eBAY      May 4 (proposal + math problems)
                 → May 7 (Cohen sells socks, eBay suspends acct)
                 → May 14 (eBay rejects; Cohen pivots to activism;
                           "it's eBay, it's the one" — job application)

PRIVATE CREDIT     May 4 (BDC stress) → May 6 (Apollo daily marks)
PRESSURE         → May 7 (HSBC/MFS 3-layer collapse; Blue Ouroboros)
                 → May 11 (KKR's split $300M move)
                 → May 13 (PE blowup: $1.7B missing, 6 Ferraris found)

KALSHI / PMs       May 4 (Bartlett-O'Hara: offer is revenue, bid is hedge)
                 → May 5 (sports betting + CFTC preemption trap)
                 → May 11 (VA referendum resolves YES, then null and void)
                 → May 14 (Polymarket insider-trading patterns)

OPENAI             May 4 ($10B PE JV) → May 5 (Robotics/HW spin)
                 → May 6 (AI as stock picker — losses)
                 → May 7 (Musk wanted Tesla to take over OpenAI)
                 → May 11 ($30M employee tenders, $6.6B total)
                 → May 13 (SoftBank +$25B gain; Musk's "hair-raising"
                           demands for control)

DISCLOSURE         May 5 (Musk 13D → $1.5M settlement)
GOING TOOTHLESS  → May 13 (CSG hides put option in invisible ink)
                 → May 14 (Adani charges dropped after Trump's lawyer
                           presents 100 slides + $10B investment promise)
```

---

## 5 mental models to internalise

1. **Manager dilemma synthesis** — when two impulses conflict, structurally do both (KKR/FSK: half preferred-at-NAV, half tender-at-discount).
2. **Diversification at layer N is concentration at layer N-1** — pledges, swaps, and structured products hide concentration in middle nodes (HSBC/MFS).
3. **Pay packages bias toward M&A** — even with adjustment clauses, compounding favours acquiring the base over growing it organically (Cohen, Musk).
4. **Behavioural surplus pays makers** — markets where retail systematically over-bets one side (YES on Kalshi) give makers asymmetric profit on the offer, requiring bid-side hedging for tail outcomes.
5. **Disclosure rules collapse when both sides have asymmetric political access** — $1.5M Musk settlement, white-on-white prospectuses, dropped Adani charges with $10B "incentives." Compliance is a 1% tax on the connected.

---

## Source episodes (with verified YouTube/Bloomberg URLs)

**Bloomberg Money Stuff:**

- [May 4 — GameStop Doesn't Have Enough Stock](https://www.bloomberg.com/opinion/articles/2026-05-04/gamestop-doesn-t-have-enough-stock)
- [May 5 — Investment Banking Without a License](https://www.bloomberg.com/opinion/articles/2026-05-05/investment-banking-without-a-license)
- [May 6 — ChatGPT Can't Pick the Stocks](https://www.bloomberg.com/opinion/articles/2026-05-06/chatgpt-can-t-pick-the-stocks)
- [May 7 — Sell on eBay to Buy eBay](https://www.bloomberg.com/opinion/articles/2026-05-07/sell-on-ebay-to-buy-ebay)
- [May 11 — KKR Buys Back Some Private Credit](https://www.bloomberg.com/opinion/articles/2026-05-11/kkr-buys-back-some-private-credit)
- [May 13 — Nobody Can Read the Prospectus](https://www.bloomberg.com/opinion/articles/2026-05-13/nobody-can-read-the-prospectus)
- [May 14 — Ryan Cohen Wants to Work at eBay](https://www.bloomberg.com/opinion/articles/2026-05-14/ryan-cohen-wants-to-work-at-ebay)

**Adjacent / cited podcasts:**

- [TBPN — Trump-Xi Summit, Inflation, Space Data Centers (May 13)](https://www.youtube.com/watch?v=K1n3n3A5eCs)
- [TBPN — Condé Nast CEO on Human Journalism (May 12)](https://www.youtube.com/watch?v=0AuD76FK3u4)
- [TBPN — Trial Update, AI SPVs, BuzzFeed Sold (May 12)](https://www.youtube.com/watch?v=-XroYgyoNuU)
- [All-In — Charles & Chase Koch on $150B Empire (May 12)](https://www.youtube.com/watch?v=EIo3AuyvV84)
- [Uncapped #49 — Hartz & Siegel on A\* Capital (May 12)](https://www.youtube.com/watch?v=WySKlok26Qs)
- [Invest Like the Best — Krishna Rao, Anthropic CFO (May 13)](https://podcasts.apple.com/us/podcast/invest-like-the-best-with-patrick-oshaughnessy/id1154105909?i=1000763993727)

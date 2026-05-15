## Links

- Money stuff newsletter: AVIS short Squeeze
  https://www.bloomberg.com/opinion/newsletters/2026-04-29/short-swing-short-squeeze?srnd=undefined&embedded-checkout=true
- Semianalysis: https://newsletter.semianalysis.com/p/ai-value-capture-the-shift-to-model?_gl=1*1qdzc5k*_ga*MTQwMDc2MzU1Ny4xNzc4MDA0NzM5*_ga_FKWNM9FBZ3*czE3NzgwMDQ3MzkkbzEkZzAkdDE3NzgwMDQ3MzkkajYwJGwwJGgxMDE0MDAzMDY1
- TBPN, TLDR:https://tbpn.substack.com/p/the-tech-earnings-quad-kill-recap
- Stratechery: https://stratechery.com/2026/amazons-durability/
- https://stratechery.com/2026/google-earnings-meta-earnings/

- interesting twitter posts: https://x.com/ReutersTech/status/2049340467649667361?s=20
- LATAM payments: https://x.com/0x_claudia/status/2050888986030375117?s=20
- Stripe and crypto: https://x.com/Snapcrackle/status/2050910293597856077?s=20

---

- Ben talk about amazon's moat, graviton and annapurna labs, competing more with NVIDIA, OpenAI is best at squeezing value out of clusters, NVIDIA said they didnt know
  anthropic didnt have an option but to go to google and amazon for compute
- Intel and MU hit highs (MU up 2x since March), government up 460% on intel
- Anthropic and OAI working with PE firms for releases
- Anthropic launches 10 tools for finance
- Deepseek v4 is almost frontier and fraction of the cost
- xAI lack of compute storage an interesting case study
- Fights between Elon and OpenAI getting deeper, Elon's email about the last straw, Greg trying to oust him but in dec 2016 Elon worried about OAI being a non-profit
- 5.5 is 2x pricier than 5.4, Claude still 10x pricier, devs shifting to OAI
- Mythos with government has an issue in expansion, Trump admin thinking of EO to see models before public release
- Omni model by google under testing
- Gamestop wants to buy ebay, computers based on llms generating data via diffusion on demand not an idea anymore

Essays (material for Wednesday)

- LATAM payments are skyrocketing, most people arent crypto bros, they are people in 40s-50s sending money to mom (1/3), main use
  is groceries, 300 bucks average, mexico is not it - most documented and diverse diaspora. Spanish and portuguese language necessary
  regulatory headwinds in Colombia, Brazil. Most people use it as a reserve in Argentina and others for payment
  nice ui is needed
- Stripe using bridge and privy

AVIS short Squeeze
TLDR

- brutal short squeeze went from 99 bucks on March 20 to 713 on April 21 and crashed back to 182
- Pentwanter and SRS owned 69% of stock but 108% with derivatives
- Avis was in earnings blackout, SRS had a board seat -> insider info cant sell, Pentwater got
- Pentwater has multiple funds, even though they got Section 16 b'd (any one with >10% stake trading within 6 months needs to let go of profit), pentwater sold 4.3M shares in a different fund for 1.75B in proceeds

Quick note on shorting:

- short seller buys from prime brokers -> sells shares for cash -> shares are marked to market -> if they rise seller puts up collateral on margin call -> to close position buys shares in the market and returns to the lender

Short Squeezes self-reinforce

- Margin requirements go up, so need to put up more collateral,
- the original lender can recall anytime and short cant borrow replacement, if shares recalled and short cant borrow replacements they're forced to buy in
- Borrow costs spike and go from 0.5-2% to 200%

Interesting instrument: Cash settled total return swaps

- one party gets all economic upside and downside
- lending party gets capital for LIBOR/SOFR
- No shares change hands, banks buy shares for hedging but balance sheet of banks not hedge funds
- Bill Hwang in Archegos did the same and no shares showed up on balance sheet until Margin call in 2021
- Disclosure arb: dont need to show balance sheet, get leverage, no voting rights,
- in 2023 SEC came up with rules for disclosing swaps

Pentware with 108% of ownership positions:

- SRS 49%, pentwater 10% but 41% via swaps
- lowest in, highest out in 1943 smolowe and delendo
- If you bought 100 shares at $50, $60, $70, $80, $90, $100, $110, $120, $130, $140 and sold 100 shares at the same prices, you might think your net P&L is zero. But Section 16(b) matches the lowest buy ($50) against the highest sell ($140) for a "profit" of $90/share, then $60 against $130, etc. Your "matchable profit" can be enormous even when your real P&L is zero or negative.
- Pentwater had multiple accounts, avis got a wildfall

Interesting idea:

- Short Squeeze as a service, Avis got a windfall, no dilluton to existing shareholders
- What if someone made a strategy to find companies with short interest > 30%, reach >50% shareholder ownership, approach section 16 disclosure threshold
- Structural mispricing cause insiders cant sell

---

```

╔══════════════════════════════════════════════════════════════════════╗
║ SEMIANALYSIS: AI VALUE CAPTURE — THE SHIFT TO MODEL LABS ║
║ May 1, 2026 ║
╚══════════════════════════════════════════════════════════════════════╝

┌──────────────────────────────────────────────────────────────────────┐
│ FLOW 1: THE GREAT VALUE MIGRATION (2023 → 2026) │
└──────────────────────────────────────────────────────────────────────┘

         2023-2025                          2026 (NOW)
    ┌────────────────┐                ┌────────────────┐
    │ INFRASTRUCTURE │                │   MODEL LABS   │
    │  CAPTURES ALL  │     ═══>       │  CAPTURE ALL   │
    │   THE VALUE    │                │   THE VALUE    │
    └────────────────┘                └────────────────┘
            │                                  │
            ▼                                  ▼
    • Nvidia (May'23: +25% AH)        • Anthropic ARR:
    • Vistra +265% (2024)               $9B → $44B+
    • GE Vernova +146% (2024)         • Inference margins:
    • SanDisk/WDC/Seagate/              38% → 70%+
      Micron all +200% (2025)         • Labs were "famously
    • Power = bottleneck                bad" on margins before

ANALOGY: Think of AI as a gold rush.
┌─────────────────────────────────────────────────────────────┐
│ 2023-25: The pickaxe sellers (Nvidia) and shovel makers │
│ (memory, power) got rich. Miners (labs) starved. │
│ 2026: Miners struck a vein so rich the pickaxe sellers │
│ haven't raised prices fast enough to match. │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│ FLOW 2: WHY EACH TOKEN IS NOW WORTH MORE │
└──────────────────────────────────────────────────────────────────────┘

AGENTIC AI INFLECTION (Dec 2025)
│
▼
┌─────────────────────────┐
│ Tasks that took │
│ 10s of person-hours │ ──> Now done in MINUTES
│ costing $1000s │ for a few $ in tokens
└─────────────────────────┘
│
▼
SemiAnalysis's own usage:
┌─────────────────────────────────────────────┐
│ • $10.95M annual run-rate on Claude tokens │
│ • Token spend = ~30% of employee comp │
│ • ~5B tokens/month/employee (5x Meta!) │
│ • Power-law: top users >100B tokens/month │
└─────────────────────────────────────────────┘

ANALOGY: Tokens used to be like vending-machine snacks
(cheap, low value). Now they're like contractor hours —
you'll pay $200/hr because the work delivered is worth $2000.

┌──────────────────────────────────────────────────────────────────────┐
│ FLOW 3: THE OPUS PRICING PARADOX │
└──────────────────────────────────────────────────────────────────────┘

STICKER PRICE TRUE BLENDED PRICE
$5 / $25 per MTok $0.99 per MTok
(input/output) on agentic tasks
▲
│
┌───────────────────────────────┴──────────────┐
│ │
│ WHY? Agentic workloads have: │
│ • Input:Output ratio of 300:1 (Claude Code) │
│ • Cache hit rates of 90%+ │
│ • Cached tokens cost only $0.50/MTok │
│ • Most tokens land in cheapest tier │
│ │
└──────────────────────────────────────────────┘

ANALOGY: It's like a hotel listing rooms at $500/night
but 90% of guests get the corporate cached rate of $50.
The headline price scares no one who actually books.

┌──────────────────────────────────────────────────────────────────────┐
│ FLOW 4: THE THROUGHPUT EXPLOSION │
└──────────────────────────────────────────────────────────────────────┘

B300 RUNNING DEEPSEEK R1 (8K input → 1K output)

No optimizations: ████ ~1K tok/sec/GPU

- wideEP + disagg: ████████████████████ ~8K tok/sec/GPU
- wideEP + disagg + MTP: ████████████████████████████████ ~14K
                          ↑ 14x just from SOFTWARE

ADD HARDWARE GAINS:
GB300 NVL72 vs H100 (FP8): 17x throughput
GB300 NVL72 vs H100 (FP4): 32x throughput

Yet GB300 TCO is only ~70% higher than H100.

ANALOGY: Imagine your car's engine got 14x more efficient
through a software update, then you bought a new car that's
another 2x faster — and it only costs 70% more.

┌──────────────────────────────────────────────────────────────────────┐
│ FLOW 5: WHY LAB MARGINS WON'T GET COMPETED AWAY │
└──────────────────────────────────────────────────────────────────────┘

         ┌─────────────────────────────────┐
         │  TWO PROTECTIVE MOATS           │
         └─────────────────────────────────┘
                    │
       ┌────────────┴────────────┐
       ▼                         ▼

┌──────────────────┐ ┌──────────────────┐
│ MOAT 1: │ │ MOAT 2: │
│ Frontier quality │ │ Compute scarcity │
│ gap is real │ │ caps any single │
│ │ │ lab's reach │
├──────────────────┤ ├──────────────────┤
│ • Open source │ │ • Demand >> │
│ (Kimi K2.6 │ │ Supply for │
│ $0.95/$4) │ │ foreseeable │
│ barely dents │ │ future │
│ Opus pricing │ │ • Anthropic │
│ • Benchmarks lie │ │ already gating │
│ • Real knowledge │ │ Claude Code │
│ work needs │ │ behind $100+/mo│
│ closed models │ │ • Blocking 3rd │
│ │ │ party harnesses│
└──────────────────┘ └──────────────────┘

ANALOGY: Like Hermès Birkin bags. Quality + artificial
scarcity = they don't compete on price with handbag knockoffs.

┌──────────────────────────────────────────────────────────────────────┐
│ FLOW 6: THE PRICING POWER PARADOX │
└──────────────────────────────────────────────────────────────────────┘

WHO RAISED PRICES? WHO DIDN'T?
┌─────────────────────┐ ┌─────────────────────┐
│ ✓ Memory: 6x in 1yr │ │ ✗ Nvidia │
│ ✓ Neocloud H100 │ │ ✗ TSMC │
│ rentals: +40% │ │ │
│ from Oct 2025 low │ │ Both have MASSIVE │
│ ✓ Inference │ │ pricing power but │
│ providers │ │ haven't used it │
│ (Fireworks, │ │ │
│ Baseten, Fal) │ │ │
└─────────────────────┘ └─────────────────────┘

         WHY NVIDIA HASN'T MOVED
                  │
     ┌────────────┴───────────┐
     ▼                        ▼

Operating on old Antitrust scrutiny
framework: assumed already heavy across
willingness-to-pay GPUs/interconnect/SW.
per compute DECLINES Aggressive repricing
over time. = regulatory bait.

But demand is now COMPOUNDING, not declining.

ANALOGY: Nvidia is a landlord with a building everyone
needs to rent. The neighborhood just became Manhattan, but
they're still charging Cleveland prices because they're
worried about the housing commissioner.

┌──────────────────────────────────────────────────────────────────────┐
│ FLOW 7: SOCAMM — NVIDIA'S HIDDEN PRICING LEVER │
└──────────────────────────────────────────────────────────────────────┘

GB300 (OLD WAY) VR NVL72 / RUBIN (NEW WAY)
┌──────────────────┐ ┌──────────────────┐
│ LPDDR5X SOLDERED │ │ SOCAMM2 SOCKETED│
│ onto board │ ──> │ (System-On-Chip │
│ Bundled at ~75% │ │ Attached Memory │
│ system GM │ │ Module) │
└──────────────────┘ └──────────────────┘
│
▼
┌───────────────────────┐
│ Memory now PRICED AS │
│ A SEPARATE LINE ITEM │
│ • Modular │
│ • Continuously │
│ repriceable │
│ • Higher capacity │
│ • Power efficient │
└───────────────────────┘

SOCAMM PRICING TRAJECTORY (Nvidia's cost):
1Q26: ~$8/GB ──┐
│ Step-up driven by LPDDR5X surge
Exit 2026: $13/GB │ Mobile LPDDR5X = $6-7/GB in 1Q26
Reasonable est: │ SOCAMM = premium to mobile due to
~$10/GB │ complexity + longer cycle times
──┘

AT 60% MARGIN, why customers will accept it:
┌────────────────────────────────────────────┐
│ 1. Memory supply constrained EVERYWHERE. │
│ Nvidia secured most volume via LTAs. │
│ 2. VR NVL72 = best perf/TCO platform. │
│ Customers have no real alternative. │
│ 3. Nvidia itself is eating a price hike on │
│ SOCAMM2 procurement — pass-through is │
│ "fair." │
└────────────────────────────────────────────┘

ANALOGY: Memory used to be welded to the dashboard of
your car. Now it's a removable cartridge — Nvidia can
charge cartridge-by-cartridge, like printer ink.

┌──────────────────────────────────────────────────────────────────────┐
│ FLOW 8: THE CAPEX/WATT PUZZLE │
└──────────────────────────────────────────────────────────────────────┘

                  GB300              VR NVL72
                  ─────              ────────

Capex/Watt: $37.4/W ────> $38.1/W (basically flat!)
TDP per chip: 1400W 2300W (+64%)
FLOPs: baseline MUCH higher
Perf/Watt: baseline >2x improvement

EXPECTED: Capex/W rises generation over generation as
perf/W improvements let vendors capture more value.

REALITY: Almost flat. Money left on the table.

                  ╔═══════════════════════════════╗
                  ║   This is the smoking gun.    ║
                  ║   Nvidia is under-pricing     ║
                  ║   relative to value delivered.║
                  ╚═══════════════════════════════╝

┌──────────────────────────────────────────────────────────────────────┐
│ FLOW 9: NETWORKING PRICE DISCRIMINATION (PARTIALLY TAPPED) │
└──────────────────────────────────────────────────────────────────────┘

GPU PRICING NETWORKING PRICING
(uniform) (discriminated)
────────── ──────────────────

Hyperscaler ─┐ Hyperscaler ────────► $X (e.g., SN5610)
│ │
Neocloud ───┼────► Neocloud ──────────► $2X │
│ │ │
Sovereign ───┘ (94% premium) │ │
Enterprise ▼ ▼
But at full-cluster
level, only +10%
all-in capex difference

                               (excludes power, ops, utilities
                                which would erode it further)

WHY? Hyperscalers have: Neoclouds DON'T:
• Direct OEM/ODM relationships • Need turnkey solutions
• Networking engineering benches • Lack scale + expertise
• Can deploy non-turnkey solutions • Take Nvidia's package

Already pulled hard — limited room to push further here.

ANALOGY: Like business class vs economy. Different prices,
same plane. But Nvidia already maxed this lever.

┌──────────────────────────────────────────────────────────────────────┐
│ FLOW 10: NVIDIA AS "CENTRAL BANK OF AI" │
└──────────────────────────────────────────────────────────────────────┘

         WHY NVIDIA HOLDS BACK ON PRICING
                       │
    ┌──────────────────┼──────────────────┐
    ▼                  ▼                  ▼

Antitrust Ecosystem Long-term
scrutiny stability dominance
is mounting matters more beats short-
than maximum term margin
margin grab extraction

TSMC PLAYBOOK (Nvidia is copying):
┌────────────────────────────────────┐
│ • Runs at full utilization │
│ • Acts as advanced-node bottleneck │
│ • DOESN'T price to scarcity │
│ • Prioritizes long-term │
│ relationships │
│ • Avoids regulatory backlash │
└────────────────────────────────────┘

"Taking the oxygen out of the room" —
Nvidia stays the protagonist of AI by NOT
suffocating the downstream ecosystem.

ANALOGY: Like a central bank that could print money
to enrich itself but doesn't, because long-term
currency stability matters more than short-term gains.

┌──────────────────────────────────────────────────────────────────────┐
│ FLOW 11: TSMC — "THE FAIREST AND MOST JUST COMPANY" │
└──────────────────────────────────────────────────────────────────────┘

EVERYONE WANTS N3 (this year + next)
─────────────────────────────────────
┌──> Nvidia
├──> Broadcom
N3 ─┼──> Annapurna
├──> MediaTek
└──> AMD

N3 utilization expected >100% in H2 2026.
TSMC's pricing? RELATIVELY STABLE.

TSMC strategy: Nvidia would WELCOME
• Protect margins through a TSMC price hike —
downcycles it would shut out
• Blunt upside in upcycles competitors with less
• Long-term commitments ability to pay. + prepayments preferred
over price hikes Jensen literally said
in 2024: "TSMC should
charge more."

ANALOGY: TSMC is the only bakery in town during a famine
but charges normal bread prices because they're playing
a 50-year game, not a 1-year one.

┌──────────────────────────────────────────────────────────────────────┐
│ FLOW 12: THE TWO PRICING FRAMEWORKS │
└──────────────────────────────────────────────────────────────────────┘

┌─────────────────────────┐ ┌─────────────────────────┐
│ COST-BASED PRICING │ │ VALUE-BASED PRICING │
│ (FLOOR) │ │ (CEILING) │
├─────────────────────────┤ ├─────────────────────────┤
│ Q: What rental price is │ │ Q: What's the max a │
│ needed for Neoclouds to │ │ buyer would pay before │
│ hit IRR hurdle? │ │ switching to GB300? │
├─────────────────────────┤ ├─────────────────────────┤
│ GB300 today: │ │ Anchor: GB300 5-yr │
│ • 15.6% IRR over 5yr │ │ rental ~$0.70/PFLOP │
│ • 15% prepay │ │ (FP8 dense basis) │
│ │ │ │
│ VR NVL72 needs: │ │ Implies VR NVL72 │
│ ≥ $4.92/GPU/hr │ │ ceiling at parity: │
│ to hit same IRR │ │ ~$12.25/GPU/hr │
└─────────────────────────┘ └─────────────────────────┘
│ │
└──────────────┬───────────────┘
▼
HUGE GAP between floor and ceiling
(unprecedented vs prior generations)

┌──────────────────────────────────────────────────────────────────────┐
│ FLOW 13: "ONE CHART TO RULE THEM ALL" │
└──────────────────────────────────────────────────────────────────────┘

IRR%
▲
│ ╔═══════════════╗
│ CEILING ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ║ THEORETICAL ║
│ (Value-based: ║ MAXIMUM ║
│ $12.25/hr, ╚═══════════════╝
│ $0.70/PFLOP) ▲
│ │
│ 38% IRR ● │ ROOM
│ $8.00/hr │ TO
│ $0.46/PFLOP │ RUN
│ │ │
│ │ │
│ 15% IRR ●─────┘ │
│ $4.90/hr │
│ $0.28/PFLOP ◄── TODAY │
│ FLOOR ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ▼
│ (15.6% IRR hurdle)
│
└────────────────────────────────────────────►
Rental Price/GPU/hr

KEY INSIGHTS:
┌──────────────────────────────────────────────────────────┐
│ • Slide UP-RIGHT on curve = stronger Neocloud power │
│ • Curve shifts UP-LEFT if Nvidia raises system pricing │
│ • Top-left corner = maximum theoretical pricing │
│ • Today: $0.28/PFLOP = 60% drop vs GB300 NVL72 │
│ (BELOW trend improvement!) │
│ • A ~40% Nvidia price hike still gives below-trend │
│ cost improvements to customers │
└──────────────────────────────────────────────────────────┘

ANALOGY: It's like discovering the ocean floor has 5 miles
of empty water above it before hitting the surface. Nvidia
is sitting on the floor, customers are at the surface, and
nobody is using the space in between.

┌──────────────────────────────────────────────────────────────────────┐
│ FLOW 14: WHERE THE VALUE FLOWS (CURRENT STATE) │
└──────────────────────────────────────────────────────────────────────┘

END USERS
($1000s of human work for $ in tokens)
│
│ pays for tokens
▼
AI LABS ◄══════════════ CAPTURING MOST VALUE NOW
(Anthropic 70%+ margins) (the new winners)
│
│ rents compute
▼
NEOCLOUDS / HYPERSCALERS ◄══ Some value capture
(Inference providers like (rental prices rising
Fireworks, Baseten, Fal +40% from Oct '25 lows)
have widening margins)
│
│ buys hardware
▼
┌─────────────────────────────────────┐
│ HARDWARE STACK │
│ ┌─────────────┐ ┌────────────────┐ │
│ │ NVIDIA │ │ MEMORY (6x) │ │
│ │ (UNDER- │ │ ── value │ │
│ │ PRICED!) │ │ captured │ │
│ └─────────────┘ └────────────────┘ │
│ ┌─────────────┐ │
│ │ TSMC │ (UNDER-PRICED!) │
│ └─────────────┘ │
└─────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│ FLOW 15: THE INEVITABLE TRANSITION │
└──────────────────────────────────────────────────────────────────────┘

TODAY: COST-BASED PRICING FUTURE: VALUE-BASED PRICING
┌───────────────────────┐ ┌───────────────────────┐
│ Nvidia anchored to │ │ Pricing reflects │
│ historical frameworks │ ────► │ economic value │
│ • Margins predictable │ │ delivered to end user │
│ • Customers comfortable│ │ • Higher margins │
│ • Antitrust quiet │ │ • Pie growing for all │
└───────────────────────┘ └───────────────────────┘

THE TRIGGER:
┌────────────────────────────────────────────┐
│ As ROI for inference providers becomes │
│ MORE WIDELY ACCEPTED + clearer: │
│ │
│ • Scrutiny on pricing decreases │
│ • GPU infra providers shift cost→value │
│ • Nvidia gets cover to follow │
│ • System-level pricing climbs │
└────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│ THE ARTICLE'S THESIS — DISTILLED │
├──────────────────────────────────────────────────────────────────────┤
│ │
│ Demand for AI compute is COMPOUNDING. │
│ Supply is STRUCTURALLY CONSTRAINED. │
│ Yet the bottleneck holders (Nvidia, TSMC) are pricing │
│ like it's still 2024. │
│ │
│ Result: AI labs are vacuuming up all the value — for now. │
│ Eventually, Nvidia will reprice (especially via SOCAMM2), │
│ and value will redistribute back upstream. │
│ │
│ The pie isn't being fought over — it's still growing, │
│ and everyone has room to win at higher absolute levels. │
│ │
└──────────────────────────────────────────────────────────────────────┘

```

---

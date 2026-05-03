# arkashj.com

> Personal website, canonical knowledge hub, and O-1 visa evidence portfolio for **[Arkash Jain](https://www.arkashj.com)** — first-author of [SpatialDINO](https://www.biorxiv.org/content/10.1101/2025.02.04.636474), Harvard ML researcher (Kirchhausen Lab), Head of Forward Deployed Engineering at [Benmore Technologies](https://benmore.tech), four-time published author across cell biology, chemical physics, and self-supervised learning.
>
> This README is intentionally long. It consolidates the website's contents — biography, credentials, publications, experience, knowledge, projects, internal tools, life changelog, stack, and external links — into a single navigable Markdown reference. Treat it as the canonical text-only mirror of [arkashj.com](https://www.arkashj.com).

[![License](https://img.shields.io/badge/license-Apache_2.0-5EEAD4.svg?style=flat-square&labelColor=0A1628)](./LICENSE)
[![Version](https://img.shields.io/badge/version-2.4.0-F4A66A.svg?style=flat-square&labelColor=0A1628)](./CHANGELOG.md)
[![Status](https://img.shields.io/badge/status-live-34D399.svg?style=flat-square&labelColor=0A1628)](https://www.arkashj.com)
[![CI](https://img.shields.io/github/actions/workflow/status/ArkashJ/Personal-Website/ci.yml?branch=main&style=flat-square&labelColor=0A1628&label=CI)](https://github.com/ArkashJ/Personal-Website/actions/workflows/ci.yml)

[![Next.js](https://img.shields.io/badge/Next.js-15.5-000?style=flat-square&logo=next.js&logoColor=white&labelColor=0A1628)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white&labelColor=0A1628)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white&labelColor=0A1628)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white&labelColor=0A1628)](https://tailwindcss.com)
[![MDX](https://img.shields.io/badge/MDX-RSC-1B1F24?style=flat-square&logo=mdx&logoColor=white&labelColor=0A1628)](https://mdxjs.com)
[![Vercel](https://img.shields.io/badge/Vercel-deployed-000?style=flat-square&logo=vercel&logoColor=white&labelColor=0A1628)](https://vercel.com)

[![ESLint](https://img.shields.io/badge/ESLint-passing-4B32C3?style=flat-square&logo=eslint&logoColor=white&labelColor=0A1628)](https://eslint.org)
[![Prettier](https://img.shields.io/badge/Prettier-formatted-F7B93E?style=flat-square&logo=prettier&logoColor=black&labelColor=0A1628)](https://prettier.io)
[![Husky](https://img.shields.io/badge/Husky-pre--commit-242938?style=flat-square&labelColor=0A1628)](https://typicode.github.io/husky/)
[![Geist](https://img.shields.io/badge/font-Geist-000?style=flat-square&logo=vercel&logoColor=white&labelColor=0A1628)](https://vercel.com/font)

[![BioRxiv](https://img.shields.io/badge/BioRxiv-SpatialDINO-CC2127?style=flat-square&labelColor=0A1628)](https://www.biorxiv.org/content/10.1101/2025.02.04.636474)
[![DOI JCB](https://img.shields.io/badge/DOI-10.1083%2Fjcb.202504178-1A66B0?style=flat-square&labelColor=0A1628)](https://doi.org/10.1083/jcb.202504178)
[![DOI JCP](https://img.shields.io/badge/DOI-10.1063%2F5.0118395-1A66B0?style=flat-square&labelColor=0A1628)](https://doi.org/10.1063/5.0118395)
[![PyTorch issue](https://img.shields.io/badge/PyTorch-%23144779-EE4C2C?style=flat-square&logo=pytorch&logoColor=white&labelColor=0A1628)](https://github.com/pytorch/pytorch/issues/144779)
[![ORCID](https://img.shields.io/badge/ORCID-0000--0003--2692--7472-A6CE39?style=flat-square&logo=orcid&logoColor=white&labelColor=0A1628)](https://orcid.org/0000-0003-2692-7472)

---

## Table of contents

- [Who is Arkash](#who-is-arkash) · [How to reach me](#how-to-reach-me)
- [Identity at a glance](#identity-at-a-glance)
- [Life changelog](#life-changelog) — 2018 → present
- [Education](#education)
- [Awards & honors](#awards--honors)
- [Publications](#publications)
- [Open-source contributions](#open-source-contributions)
- [Experience](#experience)
- [Internal tooling I author and maintain](#internal-tooling-i-author-and-maintain)
- [Projects](#projects)
- [Knowledge — the six domains](#knowledge--the-six-domains)
- [Writing](#writing)
- [Media — podcasts, press, talks](#media--podcasts-press-talks)
- [Verifiable credentials](#verifiable-credentials)
- [About this repository](#about-this-repository)
- [Quickstart](#quickstart) · [Stack](#stack) · [Repository tree](#repository-tree) · [Routes](#routes)
- [Adding content](#adding-content)
- [SEO infrastructure](#seo-infrastructure)
- [Image conventions](#image-conventions)
- [License](#license)

---

## Who is Arkash

Arkash Jain is a researcher and engineer working at the intersection of self-supervised computer vision, distributed systems, and forward-deployed AI consulting. He is currently **Head of Forward Deployed Engineering at [Benmore Technologies](https://benmore.tech)** in Chicago, where he was the second technical hire and helped scale revenue **887% across 2025–2026** while serving as the lead engineer on engagements across SaaS, healthcare, NIL athletics, compliance (Vanta / SOC 2 / NIST / FedRAMP), and consumer verticals.

Before Benmore, he spent fifteen months as an **ML researcher in the [Kirchhausen Lab](https://kirchhausen.hms.harvard.edu/people/arkash-jain-ms-bs) at Harvard Medical School / Boston Children's Hospital**, where he designed **SpatialDINO** — the first 3D self-supervised vision transformer for cryo-electron tomography. SpatialDINO beat a prior approach led by a Nobel laureate on downstream subcellular structure prediction, was first-authored, and is currently a [BioRxiv preprint](https://www.biorxiv.org/content/10.1101/2025.02.04.636474). Two follow-on papers from the same lab were published in the [Journal of Cell Biology](https://rupress.org/jcb/article-abstract/225/1/e202504178/278432/Close-up-of-vesicular-ER-exit-sites-by-volume) in 2025 and 2026.

He started college at **Boston University** in 2020 as a physics student. By the end of his freshman year he was a [UROP Scholar](https://www.bu.edu/urop/achievements/award-recipients/2020-2021-awarded-students/) (1 of 5 freshmen selected university-wide), working on ultrafast 2D infrared spectroscopy of supercritical fluids in [Larry Ziegler's lab](https://www.bu.edu/chemistry/faculty/ziegler/). That work culminated in a co-authored 2022 paper in the [Journal of Chemical Physics](https://pubs.aip.org/aip/jcp/article-abstract/157/17/174305/2842177). He then pivoted into computer science, completed an accelerated **BA/MS dual-degree in Math + CS / CS** in four years, graduated **Magna Cum Laude**, was named the **Marvin Freedman Scholar** (1 of 6 in the entire BU mathematics department), TA'd four classes (CS411, CS131, EK301, MA581), and authored a Master's thesis on **dynamic checkpointing in Apache Flink** under the BU distributed-systems group.

In parallel he interned twice at [**Battery Ventures**](https://www.battery.com) (sourcing + diligence), once at [**Boston Children's Hospital**](https://www.childrenshospital.org/) (an ALS resource discovery web app built to Section 508 / WCAG 2.1 AA), and once at **ZeroSync** (production Rust on `tokio` + NATS JetStream + a Merkle-tree POC for tamper-evident sync). He also turned down VC offers from MassMutual Ventures and State Street to stay at Battery, and was admitted to UCL, NTU Singapore, NYU, and Dartmouth before choosing BU.

He writes weekly at **[arkash.substack.com](https://arkash.substack.com)** on AI hardware, finance, distributed systems, geopolitics, and venture strategy. He is the co-host of the **[STU STREET](https://podcasts.apple.com/us/podcast/stu-street/id1635472305)** podcast (long-form interviews with founders, athletes, and professors, originally on WTBU). He has 7 distributed-systems articles on [Medium](https://medium.com/@arkjain) and active accounts on [X / Twitter](https://x.com/_arkash) and [LinkedIn](https://www.linkedin.com/in/arkashj/).

He arrived in the United States from **Chandigarh, India** in September 2020. This website is the central evidence hub for his **O-1 visa application** — every page is structured to be Google-indexed, link-rich, and built around verifiable external citations.

---

## How to reach me

- **Email** — [arkash@benmore.tech](mailto:arkash@benmore.tech)
- **GitHub** — [@ArkashJ](https://github.com/ArkashJ)
- **LinkedIn** — [/in/arkashj](https://www.linkedin.com/in/arkashj/)
- **X / Twitter** — [@\_arkash](https://x.com/_arkash)
- **Substack** — [arkash.substack.com](https://arkash.substack.com)
- **Medium** — [@arkjain](https://medium.com/@arkjain)
- **ORCID** — [0000-0003-2692-7472](https://orcid.org/0000-0003-2692-7472)
- **PubMed** — [arkash jain](https://pubmed.ncbi.nlm.nih.gov/?term=arkash+jain)
- **Google Scholar** — [profile](https://scholar.google.com/scholar?q=arkash+jain)
- **BU CS profile** — [bu.edu/cs/profiles/arkash-jain](https://www.bu.edu/cs/profiles/arkash-jain/)
- **Harvard / Kirchhausen Lab profile** — [kirchhausen.hms.harvard.edu](https://kirchhausen.hms.harvard.edu/people/arkash-jain-ms-bs)
- **STU STREET podcast** — [Apple](https://podcasts.apple.com/us/podcast/stu-street/id1635472305) · [Spotify](https://open.spotify.com/show/4xZ8WtTM7VbEW9P6FTAvkF) · YouTube (multi-episode)

---

## Identity at a glance

|                          |                                                                                                                                                                      |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                 | Arkash Jain                                                                                                                                                          |
| **Title**                | Head of Forward Deployed Engineering, Benmore Technologies                                                                                                           |
| **Prior**                | ML Researcher, Kirchhausen Lab — Harvard Medical School / Boston Children's Hospital                                                                                 |
| **Education**            | Harvard University (Postgraduate Research, Computer Vision & AI, 2024–2025) · Boston University (BA Math + CS, MS CS — 4-yr accelerated, 2020–2024, Magna Cum Laude) |
| **Citizenship**          | Indian national (in the US since Sep 2020); O-1 visa applicant                                                                                                       |
| **Hometown**             | Chandigarh, India                                                                                                                                                    |
| **Currently in**         | Boston / Chicago (remote-first)                                                                                                                                      |
| **Languages spoken**     | English, Hindi, Punjabi                                                                                                                                              |
| **Languages programmed** | Python, TypeScript, Rust, Go, Java, OCaml, C, R, MATLAB, JavaScript, Bash                                                                                            |
| **First paper**          | Nov 2022 — _J. Chem. Phys._ (chemical physics)                                                                                                                       |
| **First-author paper**   | 2025 — _SpatialDINO_ on BioRxiv (3D self-supervised ViT)                                                                                                             |
| **Open-source**          | [PyTorch issue #144779](https://github.com/pytorch/pytorch/issues/144779) — RDZV Infiniband backend                                                                  |
| **Currently writing**    | Weekly long-form essays at [arkash.substack.com](https://arkash.substack.com)                                                                                        |

---

## Life changelog

A reverse-chronological-friendly retelling of the path so far, in five named phases. Headings link to the on-site deep-dive timeline entries where one exists; otherwise the supporting source is linked inline.

### Phase 0 — Wanting to be a physicist (2018–2020, Chandigarh, India)

Two years of E&M, particle physics, organic and physical chemistry, and optics — the standard JEE Advanced curriculum for kids who wanted to do physics in India. Sat **JEE Advanced** (≈1M candidates), placed roughly **All-India rank 8,000** (top percentile). Sat **AP Calculus**, **AP Physics C: Mechanics**, and **AP Physics C: E&M**. Was admitted to **University College London**, **Nanyang Technological University Singapore**, **Boston University**, **NYU**, and **Dartmouth**. Picked Boston University — the physics department and proximity to MIT and Harvard labs were the deciding factors.

### Phase 1 — Physicist at BU (Sep 2020 – 2022)

Arrived in the United States in **September 2020**. Joined **Larry Ziegler's ultrafast spectroscopy lab** as a freshman under PhD student **Matt Rotondaro**. Aligned femtosecond ultrafast laser systems for 2D infrared spectroscopy. Prepared supercritical Xe and SF₆ fluid samples for near-critical-density studies. Wrote the auto-correlation analysis code for rotational and vibrational energy relaxation traces.

Selected as **NSF UROP Scholar** (1 of 5 freshmen across the entire university) for the project _"Ultrafast Two Dimensional Infrared Spectroscopy of Supercritical Fluids: Energy Relaxation and Local Critical Slowing Effects."_ Co-authored the Nov 2022 _Journal of Chemical Physics_ paper on N₂O dynamics in supercritical solvents — IBC breakdown and critical slowing near the critical point — and a companion paper in the _Journal of Physical Chemistry Letters_ (ACS).

The lab also taught me that I liked the math and the code more than the optics bench. By the end of sophomore year I had pivoted to computer science.

### Phase 2 — Venture capital (Dec 2021 – Aug 2022)

Sourcing intern at **[Battery Ventures](https://www.battery.com)** under Dallin Bills, working alongside GP Michael Brown. Got fluent in the early-stage B2B SaaS investment vocabulary: Rule of 40, ARR growth vs. burn multiples, gross retention vs. logo churn vs. net dollar retention, the magic number, CAC payback. Sourced three deals to partner-meeting stage (including [CarNow](https://www.battery.com/company/carnow/)). Got VC offers from **MassMutual Ventures** (Feb 2022) and **State Street** (Summer 2022); turned both down to return to Battery for a diligence summer.

Diligence intern at Battery the following summer — embedded with a portfolio company on its EU expansion strategy: pricing, GTM motion, regulatory fit, competitive landscape across the European market.

### Phase 3 — Engineer + researcher at BU (2022 – May 2024)

Admitted to BU's accelerated **BA/MS in Computer Science** (BA Math + CS / MS CS, four years instead of six). TA'd four classes for ~300 students each: CS411 (Software Engineering), CS131 (Discrete Mathematics), EK301 (Mechanics), MA581 (Probability). Co-instructed a 300-level Mechanics course as a sophomore while carrying an 18-credit load and a 20-hour work week.

Six classes that year, [each documented as a coursework deep-dive](https://www.arkashj.com/coursework):

- **CS 350 — Distributed Systems**: from-scratch **Raft consensus** in Go — leader election, log replication, snapshot install RPC. Plus a MapReduce coordinator + worker with plugin-loaded map/reduce functions.
- **CS 320 — Concepts of Programming Languages**: hand-written lexer, parser, and stack-machine evaluator for a BNF language in **OCaml**.
- **DS 522 — Optimization**: Adam / AMSGrad / RMSProp comparison; article evaluations of Reddi 2018 and Toulis 2016 (implicit SGD).
- **CS 561 — Data Mechanics / Cloud**: built a generated-HTML mini-internet and ran PageRank locally vs. on **GCP**.
- **CS 630 — Advanced Algorithms**: 331,776-instance enumeration of **Gale-Shapley** to study average-case behavior; reservoir sampling.
- **CS 611 — OOP & Design Patterns**: Monsters & Heroes turn-based RPG + a Java Swing trading platform with singleton persistence.
- **MA 582 — Mathematical Statistics (graduate)**: rigorous inference — MLE, sufficient statistics, MGFs, asymptotics.

**Distributed Systems Research / BU Master's thesis: dynamic checkpointing in Apache Flink.** Static checkpoint intervals are a tax in idle periods and a stall during bursts — built a controller that adapted cadence from live backpressure signals. Instrumented the Flink JobManager to surface per-operator backpressure ratios as a control signal. Benchmarked **RocksDB** state backend against in-memory; quantified write-amplification tradeoffs. Validated on the **NEXMARK** streaming benchmark; measured tail-latency wins on bursty workloads.

**Internships during this phase:**

- **[Boston Children's Hospital](https://www.childrenshospital.org/)** (Spring 2023) — Built an internal ALS resource-discovery web app for clinicians and patient families. React frontend wired to a Strapi headless CMS so non-technical staff could update content without a deploy. Swagger-documented REST API. **Section 508 / WCAG 2.1 AA** compliance — keyboard-only nav, ARIA landmarks, focus-visible rings, sufficient contrast, skip links, screen-reader tested. Validated search/filter UX with real ALS clinicians.
- **ZeroSync** (Summer 2023) — First production-grade Rust. Built an Excel-side marketplace and a server-side ingestion pipeline that converted unstructured data (CSVs, JSON dumps, free-form Excel) into structured records flowing through **NATS JetStream**. Spent the first two weeks deep in [The Rust Book](https://doc.rust-lang.org/book/) — the borrow checker forces you to internalize ownership, lifetimes, and Send/Sync before you can ship anything async. `tokio` + `async-trait` for concurrent I/O across hundreds of NATS subjects. **Merkle-tree POC** ([repo](https://github.com/ArkashJ/merkle_tree)) — SHA-256 + canonical JSON hashing + sorted pairwise concat — for tamper-evident sync of records across the pipeline. Excel side: JavaScript Office Add-in scaffolded with Yeoman (`yo generator-office`); generated TLS dev certificates with `office-addin-dev-certs`, trusted them in macOS Keychain, wired their paths into `nats.conf` so the add-in published over TLS.

Graduated **Magna Cum Laude** from Boston University in **May 2024** — BA in Math & CS, MS in CS — and was named the **Marvin Freedman Scholar** (1 of 6 mathematics undergraduates department-wide).

### Phase 4 — Harvard Medical School / Kirchhausen Lab (May 2024 – Aug 2025)

Joined the **[Kirchhausen Lab](https://kirchhausen.hms.harvard.edu/people/arkash-jain-ms-bs)** at Harvard Medical School / Boston Children's Hospital, under **Tom Kirchhausen** (member, National Academy of Arts and Sciences). The lab images subcellular structures at near-atomic resolution via cryo-electron tomography; my job was to make the resulting volumes interpretable at scale.

Trained on multi-node DGX clusters: **A100 / H100** GPUs, **NVLink** intra-node, **Infiniband** inter-node, RAID + custom NVMe storage tier. Used **PyTorch FSDP** with **bf16** mixed precision and activation checkpointing to fit large 3D vision transformers. **Diagnosed and reported a Rendezvous (RDZV) backend issue** affecting Infiniband multi-node training — filed [PyTorch issue #144779](https://github.com/pytorch/pytorch/issues/144779).

**[SpatialDINO](https://www.biorxiv.org/content/10.1101/2025.02.04.636474)** — designed and trained the first 3D self-supervised vision transformer for subcellular structure prediction from cryo-electron tomograms. Adapted DINO-style self-supervised contrastive learning into 3D — student/teacher ViTs over volumetric tomograms. Pretrained on unannotated tomograms; fine-tuned on a tiny labeled set for vesicle / organelle classification. **Beat the prior SOTA, including a Nobel-laureate-led approach**, on downstream evaluation. Released as a BioRxiv preprint, first-author. The lessons are written up at [/knowledge/ai/spatialdino-lessons](https://www.arkashj.com/knowledge/ai/spatialdino-lessons).

Two co-authored follow-on papers appeared in the **Journal of Cell Biology** (Aug 2025): a volumetric reconstruction of mammalian ER exit sites at unprecedented resolution via FIB-SEM and learned segmentation; and a UNET architecture for semi-supervised segmentation. ([JCB 225, e202504178](https://rupress.org/jcb/article-abstract/225/1/e202504178/278432/Close-up-of-vesicular-ER-exit-sites-by-volume))

### Phase 5 — Benmore Technologies (Aug 2025 – present)

Joined **[Benmore Technologies](https://benmore.tech)** as Employee #2 — Forward Deployed Strategist & Engineer. Embedded into client engineering teams, scoped systems end-to-end, and shipped production code from day one. Onboarded the first ten clients across SaaS, healthcare, NIL athletics, compliance (Vanta / SOC 2 / NIST / FedRAMP), and consumer verticals — including Patriot Safety Services (compliance for Chevron / NextTier, $5–10M / yr), Nobel Gas, and Sun Theory.

Cross-stack: **Stripe**, **Django**, **Next.js**, **FastAPI**, **React Native**, plus authoring **Claude Code skill systems** at scale (one of the first companies to use Claude Code commercially in production engagements). Authored the **Benmore Foundry CLI** — internal orchestration layer for SMB AI consulting engagements.

Promoted to **Head of FDE in April 2026**, leading the forward-deployed engineering practice across all client engagements. Revenue acceleration during this period: **$150k total → $150k every 15 days — 887% growth in six months.** Headcount 8 → 40. The full mechanism is written up at [/writing/the-fde-feedback-loop](https://www.arkashj.com/writing/the-fde-feedback-loop).

---

## Education

| Institution            | Degree                                                                                     | Dates     | Notes                                                                                                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Harvard University** | Postgraduate Research, Computer Vision & AI                                                | 2024–2025 | Kirchhausen Lab. SpatialDINO + 2 _Journal of Cell Biology_ papers. PyTorch upstream contribution.                                                                                                                     |
| **Boston University**  | BA — Mathematics + Computer Science · MS — Computer Science (4-yr accelerated dual-degree) | 2020–2024 | **Magna Cum Laude.** **Marvin Freedman Scholar** (1 of 6 in math dept). **NSF UROP Scholar** (1 of 5 freshmen university-wide). Dean's List every semester. Master's thesis: _Dynamic Checkpointing in Apache Flink._ |

Verifiable credentials (PDF) are linked under [Verifiable credentials](#verifiable-credentials) below.

---

## Awards & honors

- **NSF UROP Scholar** (2021) — 1 of 5 freshmen selected university-wide at BU. Project: _Ultrafast Two-Dimensional Infrared Spectroscopy of Supercritical Fluids: Energy Relaxation and Local Critical Slowing Effects._ — [UROP Symposium 2021 brochure (PDF)](https://www.bu.edu/urop/files/2021/10/UROP-Symposium-2021-Brochure-v5.pdf) · [UROP 2020-2021 awarded students](https://www.bu.edu/urop/achievements/award-recipients/2020-2021-awarded-students/)
- **Marvin Freedman Scholar** (2024) — 1 of 6 mathematics undergraduates honored department-wide at BU.
- **Magna Cum Laude** (2024) — Boston University.
- **Dean's List** — every semester at BU.
- **JEE Advanced** (2019) — ≈8,000 / ≈1M All-India rank.
- **Battery Ventures** — admitted to two consecutive internships (sourcing 2021–22, diligence 2022); chosen over MassMutual Ventures and State Street offers.
- **University admissions** (2020) — UCL, NTU Singapore, BU, NYU, Dartmouth (chose BU).
- **PyTorch open-source contribution** — issue [#144779](https://github.com/pytorch/pytorch/issues/144779) accepted into the upstream tracker for the RDZV / Infiniband backend.

---

## Publications

Four formal publications, in reverse-chronological order. All have permanent DOI / preprint server URLs.

### 1. SpatialDINO: Self-Supervised Learning for 3D Vision Transformers — _BioRxiv_, 2025

**First-author**, Kirchhausen Lab, Harvard Medical School. The first 3D self-supervised vision transformer for subcellular structure prediction from cryo-electron tomograms. Beat a prior approach led by a Nobel laureate on downstream evaluation.

- DOI: [10.1101/2025.02.04.636474](https://doi.org/10.1101/2025.02.04.636474)
- Preprint: [biorxiv.org/content/10.1101/2025.02.04.636474](https://www.biorxiv.org/content/10.1101/2025.02.04.636474)

### 2. Close-up of Vesicular ER Exit Sites by Volume Electron Imaging using FIB-SEM — _Journal of Cell Biology_, 2026

Volumetric reconstruction of mammalian ER exit sites at unprecedented resolution via FIB-SEM and learned segmentation. Co-author, Kirchhausen Lab.

- DOI: [10.1083/jcb.202504178](https://doi.org/10.1083/jcb.202504178)
- Article: [rupress.org/jcb/article-abstract/225/1/e202504178](https://rupress.org/jcb/article-abstract/225/1/e202504178/278432/Close-up-of-vesicular-ER-exit-sites-by-volume)

### 3. UNET for Semi-Supervised Segmentation — _Journal of Cell Biology_, 2025

Co-author. Semi-supervised UNET segmentation as part of the broader Kirchhausen Lab program.

### 4. Ultrafast 2DIR comparison of rotational energy transfer, isolated binary collision breakdown, and near-critical fluctuations in Xe and SF₆ solutions — _Journal of Chemical Physics_, Nov 2022

First publication. Femtosecond two-dimensional infrared spectroscopy of N₂O dynamics in supercritical xenon and SF₆ — IBC breakdown and critical slowing near the critical point. Companion paper in _Journal of Physical Chemistry Letters_ (ACS).

- DOI: [10.1063/5.0118395](https://doi.org/10.1063/5.0118395)
- AIP: [pubs.aip.org/aip/jcp/article-abstract/157/17/174305](https://pubs.aip.org/aip/jcp/article-abstract/157/17/174305/2842177)
- PubMed: [36347695](https://pubmed.ncbi.nlm.nih.gov/36347695/)
- ACS companion: [J. Phys. Chem. Lett.](https://pubs.acs.org/doi/10.1021/acs.jpclett.2c03331)

---

## Open-source contributions

- **[pytorch/pytorch#144779](https://github.com/pytorch/pytorch/issues/144779)** — Diagnosed and reported a Rendezvous (RDZV) backend issue affecting Infiniband-backed multi-node distributed training during SpatialDINO scale-out on Harvard's DGX cluster.
- **[ArkashJ/merkle_tree](https://github.com/ArkashJ/merkle_tree)** — Rust Merkle-tree POC (SHA-256 + canonical JSON hashing + sorted pairwise concat) for tamper-evident sync of NATS-streamed records. Built during ZeroSync internship; full write-up at [/knowledge/distributed-systems/merkle-tree-rust-poc](https://www.arkashj.com/knowledge/distributed-systems/merkle-tree-rust-poc).
- **[ArkashJ/Raft](https://github.com/ArkashJ/Raft)** — From-scratch Raft consensus implementation in Go: leader election, log replication, snapshot install RPC.
- **[ArkashJ/CloudComputing](https://github.com/ArkashJ/CloudComputing)** — BU CS591 coursework: MapReduce, Spark, distributed kv-store experiments.
- **[ArkashJ/NEXMARK-Benchmark](https://github.com/ArkashJ/NEXMARK-Benchmark)** — Streaming-systems benchmark suite implementation against Apache Flink.
- **[ArkashJ/implict-SGD-implementation](https://github.com/ArkashJ/implict-SGD-implementation)** — Implicit stochastic gradient descent — convergence improvements for ill-conditioned problems.
- **[ArkashJ/CS411_labs](https://github.com/ArkashJ/CS411_labs)** — TA materials and reference solutions for the BU undergraduate software-engineering course.
- **[ArkashJ/excel_connector](https://github.com/ArkashJ/excel_connector)** — Yeoman-scaffolded JavaScript Office Add-in talking to a Rust + NATS pipeline.

Profile: **[github.com/ArkashJ](https://github.com/ArkashJ)**.

---

## Experience

| Role                                                 | Org                                          | Dates               | Location            |
| ---------------------------------------------------- | -------------------------------------------- | ------------------- | ------------------- |
| Head of FDE — Forward Deployed Strategist & Engineer | **Benmore Technologies**                     | Aug 2025 – present  | Remote (Chicago HQ) |
| ML Researcher                                        | **Harvard Medical School / Kirchhausen Lab** | May 2024 – Aug 2025 | Boston, MA          |
| SWE Intern (Rust)                                    | **ZeroSync**                                 | May – Aug 2023      | Remote              |
| SWE Intern (ALS resource tool)                       | **Boston Children's Hospital**               | Jan – May 2023      | Boston, MA          |
| TA + Distributed Systems Researcher                  | **Boston University**                        | 2021 – 2024         | Boston, MA          |
| Analyst — Diligence Extern                           | **Battery Ventures**                         | May – Aug 2022      | Boston, MA          |
| Analyst — Sourcing Extern                            | **Battery Ventures**                         | Dec 2021 – Apr 2022 | Boston, MA          |
| Undergraduate Researcher (NSF UROP)                  | **BU Chemistry / Ziegler Lab**               | Jan – Aug 2021      | Boston, MA          |

Detailed bullets per role live at [arkashj.com/experience](https://www.arkashj.com/experience).

---

## Internal tooling I author and maintain

| Tool                            | Purpose                                                                                                                 | Stack                         |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **Benmore Foundry CLI**         | Internal orchestration layer for SMB AI consulting engagements — kicks off scoped agents, books work, manages handoffs  | Python · Typer · Claude Code  |
| **RTK — Rust Token Killer**     | Token-optimized CLI proxy for Claude Code; **60–90% token savings** on dev operations through transparent rewrite hooks | Rust · Claude Code Hooks      |
| **Compound Engineering Skills** | Authored Claude Code skills for code review, debugging, planning, brainstorming, frontend design — used by team daily   | Markdown · Claude Code Skills |
| **Excalidraw Discovery Flows**  | Reusable client-discovery diagram set used during scoping engagements at Benmore                                        | Excalidraw · Process          |

Internal tools page: [arkashj.com/work](https://www.arkashj.com/work).

---

## Projects

A representative slice — full list with GitHub links lives at [arkashj.com/projects](https://www.arkashj.com/projects).

- **[SpatialDINO](https://www.biorxiv.org/content/10.1101/2025.02.04.636474)** (2025) — First 3D SSL ViT for cryo-ET subcellular structures. PyTorch · FSDP · DGX · cryo-ET.
- **[Raft (Go)](https://github.com/ArkashJ/Raft)** (2023) — From-scratch consensus impl: leader election, log replication, snapshotting.
- **[CloudComputing](https://github.com/ArkashJ/CloudComputing)** (2023) — BU CS591 — MapReduce, Spark, distributed kv-store.
- **[NEXMARK Benchmark](https://github.com/ArkashJ/NEXMARK-Benchmark)** (2023) — Streaming-systems benchmark against Apache Flink.
- **[Implicit SGD](https://github.com/ArkashJ/implict-SGD-implementation)** (2024) — Convergence on ill-conditioned problems.
- **[CS411 Labs](https://github.com/ArkashJ/CS411_labs)** (2023) — TA materials for BU software-engineering course.
- **Benmore Foundry CLI** (2025) — Python · Typer · Claude Code orchestration.
- **Dynamic Checkpointing in Apache Flink** (2024) — BU thesis; adaptive cadence on backpressure.
- **OCaml Interpreter** (2022) — Tree-walking interpreter for a typed functional language.
- **[Spotify ↔ YouTube transfer](https://github.com/ArkashJ)** (2022) — Migrate playlists between music platforms via API matching.
- **[STU STREET podcast](https://podcasts.apple.com/us/podcast/stu-street/id1635472305)** (2022 –) — Co-hosted long-form interviews on WTBU.
- **ALS Resource Tool** (2023) — Resource-discovery tool for ALS patients — Django + Postgres at Boston Children's.
- **[merkle_tree (Rust)](https://github.com/ArkashJ/merkle_tree)** (2023) — Tamper-evident sync POC at ZeroSync.

---

## Knowledge — the six domains

The site organizes durable, citable knowledge into six domains. Each page is an MDX deep-dive with external sources.

| Domain                                                                           | What's in it                                                                                                                      |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **[AI](https://www.arkashj.com/knowledge/ai)**                                   | Self-supervised learning, vision transformers, distributed training infrastructure (FSDP, NCCL, Infiniband), SpatialDINO lessons. |
| **[Finance](https://www.arkashj.com/knowledge/finance)**                         | Aggregation theory, AI infrastructure as a structural trade, public thesis tracker.                                               |
| **[Distributed Systems](https://www.arkashj.com/knowledge/distributed-systems)** | Flink, RocksDB, Raft, MapReduce, compression, checkpointing, Merkle trees.                                                        |
| **[Math](https://www.arkashj.com/knowledge/math)**                               | Optimizers, convergence, intuition behind the proofs.                                                                             |
| **[Physics](https://www.arkashj.com/knowledge/physics)**                         | Supercritical fluids, nuclear reactor efficiency, why I left physics.                                                             |
| **[Software](https://www.arkashj.com/knowledge/software)**                       | Stack evolution, Claude Code, the tools that make me 10× — TypeScript strict, ergonomics, agentic engineering.                    |

---

## Writing

**[arkash.substack.com](https://arkash.substack.com)** — weekly long-form essays. Topics: AI hardware, economics, finance, geopolitics, venture strategy.

Site-hosted essays (MDX, render at `/writing/[slug]`):

- [why-fde](https://www.arkashj.com/writing/why-fde) — why forward-deployed engineering is the right model right now.
- [the-fde-feedback-loop](https://www.arkashj.com/writing/the-fde-feedback-loop) — the engagement mechanism behind 887% growth.
- [o1-visa-evidence-hub](https://www.arkashj.com/writing/o1-visa-evidence-hub) — building a website as O-1 evidence.
- [distributed-checkpointing](https://www.arkashj.com/writing/distributed-checkpointing) — adaptive cadence under backpressure (Flink thesis).
- [sample-ai-hardware](https://www.arkashj.com/writing/sample-ai-hardware) — the AI hardware stack from training to deploy.

Also active on **[Medium @arkjain](https://medium.com/@arkjain)** — 7 distributed-systems articles.

---

## Media — podcasts, press, talks

- **[STU STREET](https://podcasts.apple.com/us/podcast/stu-street/id1635472305)** — co-hosted long-form interview podcast. Originally on WTBU. 25 episodes, including conversations with Benmore leadership and BU faculty. Available on [Apple Podcasts](https://podcasts.apple.com/us/podcast/stu-street/id1635472305) and Spotify; episode embeds live at [arkashj.com/media](https://www.arkashj.com/media).
- **Benmore talks** — internal talks, embedded on [/media](https://www.arkashj.com/media).
- **Trustpilot reviews** — 5★ social proof, surfaced on [/media](https://www.arkashj.com/media).

---

## Verifiable credentials

PDF originals are committed to the repository under `public/images/files/` and served from the website at `/credentials`:

- **[BA — Mathematics & CS, Boston University](https://www.arkashj.com/images/files/arkash-jain-bachelor-of-arts-mathematics-cs.pdf)**
- **[MS — Computer Science, Boston University](https://www.arkashj.com/images/files/arkash-jain-master-of-science-computer-science.pdf)**
- **[Harvard University ID](https://www.arkashj.com/images/files/arkash-jain-harvard-university-id.pdf)**

The full credentials page including external profile cross-references (BU CS, Kirchhausen Lab, ORCID, PubMed) lives at [arkashj.com/credentials](https://www.arkashj.com/credentials).

---

## About this repository

The remainder of this README is for engineers reading the source. Skip if you only came for the bio.

### Quickstart

```bash
git clone https://github.com/ArkashJ/Personal-Website.git
cd Personal-Website
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build && npm run start
```

### Stack

| Layer      | Technology                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------- |
| Framework  | Next.js 15.5 (App Router) + React 19                                                           |
| Language   | TypeScript strict                                                                              |
| Styling    | Tailwind CSS 3 + CSS variables for dark/light theme                                            |
| Fonts      | Geist Sans + Geist Mono via `next/font` (`geist` package)                                      |
| Content    | MDX rendered via `next-mdx-remote/rsc` (server components, zero client JS)                     |
| Embeds     | Tweet · YouTube · LinkedIn · Substack · Gist (in MDX) via `react-tweet` and bespoke components |
| Theme      | `next-themes` with `data-theme` attribute, sun/moon toggle                                     |
| Icons      | `lucide-react`                                                                                 |
| Search     | `cmdk` — Cmd+K command palette                                                                 |
| Markdown   | `react-markdown` + `remark-gfm` + `rehype-slug` for `/docs`                                    |
| SEO        | Native `app/sitemap.ts` + `app/robots.ts` + per-page OG via `next/og`                          |
| JSON-LD    | Person · Article · ScholarlyArticle schemas via `lib/structured-data.ts`                       |
| Deployment | Vercel (auto-deploy from `main` via GitHub integration)                                        |
| CI         | GitHub Actions — lint + format check + build on every PR / push                                |
| Pre-commit | Husky + lint-staged (Prettier + ESLint on staged files)                                        |

### Repository tree

```
Personal-Website/
├── app/                         # Next.js App Router
│   ├── about/                   # Life Changelog
│   │   ├── archive/             # Pre-revamp legacy bio (snapshot)
│   │   └── timeline/[slug]/     # Per-milestone deep dives
│   ├── architecture/            # 6 React/SVG diagrams of the stack
│   ├── coursework/              # BU + Harvard coursework hub
│   │   └── [slug]/
│   ├── credentials/             # Verifiable PDF credentials
│   ├── docs/                    # In-site rendering of docs/*.md
│   │   └── [slug]/
│   ├── experience/              # 8 reverse-chrono work entries
│   ├── knowledge/               # 6 domain hub
│   │   └── [domain]/[slug]/     # MDX deep dives
│   ├── learnings/               # 12+ hard-won lessons
│   ├── media/                   # Podcasts · press · Substack · Medium
│   ├── projects/                # Real GitHub projects
│   ├── research/                # 4 papers + ML stack + PyTorch contribution
│   ├── stack/                   # uses.tech-style — 36 entries × 7 categories
│   ├── VC/                      # Server redirect (legacy)
│   ├── Volunteering/            # Server redirect (legacy)
│   ├── work/                    # Internal CLIs (Foundry, RTK, Skills, Excalidraw)
│   ├── writing/                 # Tagged essay index
│   │   └── [slug]/              # MDX articles
│   ├── apple-icon.tsx           # Apple touch icon
│   ├── globals.css              # Tailwind + CSS-variable theme
│   ├── layout.tsx               # Root layout (Person JSON-LD, Nav, Footer, fonts)
│   ├── manifest.ts              # PWA manifest
│   ├── not-found.tsx            # 404
│   ├── opengraph-image.tsx      # Static OG for /
│   ├── page.tsx                 # Homepage (Hero, Arc, Now, Research, Work, Projects)
│   ├── robots.ts                # robots.txt MetadataRoute
│   └── sitemap.ts               # sitemap.xml MetadataRoute
├── components/
│   ├── architecture/            # SVG diagrams
│   ├── docs/                    # Doc-rendering helpers
│   ├── embeds/                  # <Tweet> <YouTube> <LinkedInPost> <Substack> <Gist>
│   ├── layout/                  # <Nav> <Footer> <Container> <SectionHeader> <Pill> <HeroDemo>
│   ├── sections/                # <PaperCard> <ProjectCard> <TimelineItem> ...
│   ├── seo/                     # <JsonLd>
│   ├── ui/                      # <BackLink> <CommandPalette> <InstitutionLogo> ...
│   ├── MdxContent.tsx           # next-mdx-remote/rsc renderer
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
├── content/
│   ├── coursework/              # Course MDX
│   │   ├── fall-2023/
│   │   └── spring-2023/
│   ├── knowledge/               # 6 domain MDX directories
│   │   ├── ai/
│   │   ├── distributed-systems/
│   │   ├── finance/
│   │   ├── math/
│   │   ├── physics/
│   │   └── software/
│   ├── skills/                  # 71 Claude Code skills (flat .md files)
│   ├── weekly/                  # ISO-week running logs (.mdx)
│   └── writing/                 # Long-form MDX essays
├── lib/                         # Typed data + helpers (single source of truth)
│   ├── content.ts               # MDX frontmatter loaders
│   ├── coursework.ts            # Course data
│   ├── data.ts                  # Papers, experience, projects, timeline, ...
│   ├── docs.ts                  # docs/*.md loader for /docs
│   ├── finance.ts               # Theses + trade log
│   ├── highlights.ts            # Highlights data bank (Recent Wins + /weekly)
│   ├── learnings.ts             # Learnings cards (folded into /writing)
│   ├── media.ts                 # Podcast, Medium, Substack, press
│   ├── metadata.ts              # buildMetadata() factory
│   ├── og.tsx                   # Shared 1200×630 OG renderer
│   ├── site.ts                  # SITE constants + NAV_LINKS
│   ├── skills.ts                # /skills loader + category rules
│   ├── stack.ts                 # uses.tech entries
│   ├── structured-data.ts       # Person · Article · ScholarlyArticle JSON-LD
│   └── weekly.ts                # ISO-week log loader for /weekly
├── public/
│   ├── favicon.svg              # Next.js favicon convention
│   ├── images/                  # SINGLE consolidated location for all site images
│   │   ├── profile.jpeg         # Author photo (Timeline, JSON-LD, OG fallback)
│   │   ├── logos/               # Institution logos (BU, Harvard, BCH, NSF)
│   │   ├── files/               # Verifiable PDF credentials
│   │   └── legacy/              # Pre-revamp assets (archival; do not add new content)
│   ├── timeline/                # Reserved for per-milestone hero images
│   ├── llms.txt · llms-full.txt # AI crawler guidance
│   ├── humans.txt · robots.txt
│   └── *.html · *.txt           # Google + IndexNow verification keys
├── docs/
│   ├── architecture/            # ASCII flow archive
│   ├── screenshots/             # Dev screenshots (gitignored except this dir)
│   └── superpowers/             # Specs, plans, notes from build sessions
├── scripts/                     # Vercel + IndexNow + build utilities
├── types/                       # Type augmentation (CSS imports, etc.)
├── .github/workflows/ci.yml     # GitHub Actions — lint + format + build
├── .husky/                      # Pre-commit hooks
├── CHANGELOG.md                 # Every release
├── CLAUDE.md                    # Agent / Claude Code orientation
├── LICENSE                      # Apache 2.0
├── README.md                    # ← you are here
├── next.config.js               # Security headers + image remotePatterns
├── package.json                 # Dependencies + scripts
├── tailwind.config.js           # Theme + sharp edges
├── tsconfig.json                # Strict mode, @/* aliases
└── vercel.json                  # Headers + caching
```

### Skills Library

The site hosts a **public, browsable index of 71 Claude Code skills** authored across Benmore engagements at [`/skills`](https://www.arkashj.com/skills). Source-of-truth lives in `content/skills/*.md` (flat directory of markdown files); the loader and category rules live in `lib/skills.ts`.

| Surface                                               | What it is                                                                                                          |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `/skills`                                             | Server-rendered list of all 71 skills, grouped by category, with client-side filter UI (`SkillsClient`).            |
| `/skills/[slug]`                                      | Per-skill detail — rendered markdown body, line count, category, and a **Copy for LLM** button.                     |
| `/skills/[slug]/raw`                                  | Plain-text endpoint (`text/plain; charset=utf-8`) returning the raw markdown — `curl`-able, pasteable into any LLM. |
| [`/skills.json`](https://www.arkashj.com/skills.json) | JSON index of every skill (`slug`, `name`, `description`, `category`, `lineCount`) for programmatic discovery.      |

To install a skill into your own Claude Code setup, follow the bootstrap script referenced on each skill page (`skills.sh`).

The site also exposes a weekly running log at [`/weekly`](https://www.arkashj.com/weekly) — ISO-week-keyed entries sourced from `content/weekly/` and a typed highlights data bank (`lib/highlights.ts`) shared with the homepage Recent Wins rail. Each rail entry (`read`/`watched`/`built`/`shipped`/`learned`/`met`) accepts either a plain string or a rich `{text, href, image?, source?, kind?}` object — YouTube URLs auto-derive thumbnails, common sources (GitHub, Substack, Medium, X, arXiv, Spotify, Apple Podcasts, Latent Space) auto-fetch SimpleIcons logos via `lib/weekly-render.ts`. The latest weekly log surfaces on the home page as a "This week" card directly under the hero.

### Routes

```
/                                — Hero · Arc · Now · Research · Work · Projects · Skills · Writing · Recent wins
/about                           — Life Changelog
/about/timeline/[slug]           — Per-milestone deep dive
/about/archive                   — Pre-revamp legacy bio
/research                        — 4 papers + ML stack + PyTorch contribution
/experience                      — 8 reverse-chrono entries
/projects                        — Real projects + internal tools, search + tag filter + pagination
/work                            — Foundry · RTK · Skills · Excalidraw
/skills                          — 71-skill public library (categorized, copy-for-LLM)
/skills/[slug]                   — Per-skill detail (rendered MD + Copy for LLM button)
/skills/[slug]/raw               — Plain-text endpoint (text/plain) for LLM ingestion
/skills.json                     — JSON index of all skills
/writing                         — Essay index + unified search across essays + knowledge + tag filter
/writing/[slug]                  — MDX article
/weekly                          — ISO-week running logs (highlights data bank)
/knowledge                       — 6 domains (secondary nav)
/knowledge/[domain]              — domain index
/knowledge/[domain]/[slug]       — MDX deep dive
/coursework                      — BU + Harvard coursework
/coursework/[slug]               — Course detail
/credentials                     — Verifiable PDFs
/media                           — Podcasts, Medium, Substack, press
/stack                           — uses.tech-style page (36 × 7)
/architecture                    — React/SVG diagrams
/docs · /docs/[slug]             — In-site rendering of docs/*.md
/sitemap.xml                     — All static + dynamic MDX routes
/robots.txt                      — Allow-all + sitemap pointer
/manifest.webmanifest            — PWA manifest
```

### Common commands

```bash
npm run dev                # Dev server
npm run build              # Production build (must pass before push)
npm run start              # Serve the built output
npm run lint               # ESLint
npm run lint:fix           # ESLint --fix
npm run format             # Prettier write
npm run format:check       # Prettier check (CI uses this)

vercel deploy --prod --yes # Manual production deploy

# Branch flow
git checkout -b feat/short-name
git add -A && git commit -m "feat(scope): one-line"
git push -u origin feat/short-name
gh pr create --base main --head feat/short-name --title "..." --body "..."
gh pr merge --squash --delete-branch
```

### Adding content

| Surface                                          | How                                                                                                                    |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| New writing post                                 | Add MDX to `content/writing/*.mdx` with frontmatter (`title`, `date`, `tags`, `description`). Picked up automatically. |
| New knowledge article                            | `content/knowledge/[domain]/*.mdx`. New domain = new folder + entry in `KNOWLEDGE_DOMAINS` in `lib/data.ts`.           |
| New paper / experience / project / internal tool | Edit the relevant array in `lib/data.ts`.                                                                              |
| New podcast / Medium / Substack / press          | `lib/media.ts`.                                                                                                        |
| New thesis / trade                               | `lib/finance.ts`.                                                                                                      |
| New stack entry                                  | `lib/stack.ts`.                                                                                                        |
| New learning                                     | `lib/learnings.ts`.                                                                                                    |
| New nav link                                     | `NAV_LINKS` in `lib/site.ts`.                                                                                          |
| New course                                       | `lib/coursework.ts` + optional MDX in `content/coursework/`.                                                           |
| New verifiable credential                        | Drop PDF in `public/images/files/` + entry in `app/credentials/page.tsx`.                                              |

### Embedding social posts in MDX

```mdx
<Tweet id="1234567890" />
<YouTube id="dQw4w9WgXcQ" />
<LinkedInPost urn="7165432109876543210" />
<Substack publication="arkash" slug="some-post" />
<Gist user="ArkashJ" id="abc123def456" />
```

Components live in `components/embeds/`, wired via `components/MdxContent.tsx`.

### SEO infrastructure

Because this site is the central evidence hub for an O-1 visa application, SEO is load-bearing.

- `app/sitemap.ts` enumerates every static and dynamic MDX route.
- `app/robots.ts` allow-all + sitemap pointer.
- Per-page `generateMetadata()` via `buildMetadata()` (`lib/metadata.ts`).
- Per-page JSON-LD via `lib/structured-data.ts` — Person on every page; `ScholarlyArticle` on research; `Article` on writing.
- Static OG images for top-level routes via `opengraph-image.tsx`.
- Dynamic per-post OG for MDX routes (`opengraph-image.tsx` colocated in dynamic route folders) using `next/og` + the shared template in `lib/og.tsx`.
- IndexNow keyfile committed at the repo root (`.indexnow-key`); submission script in `scripts/`.
- Google + Bing verification keys in `public/`.
- LLM crawler guidance: `public/llms.txt` and `public/llms-full.txt`.

### Image conventions

All site images live under **`public/images/`** as of v2.3.0. References:

- Static assets in MDX or JSX: `/images/<subpath>/<file>`.
- TypeScript imports for static optimization: `import x from '@/public/images/...'`.
- Dev / exploratory captures go in `docs/screenshots/` (gitignored except docs/).

### ffmpeg demo recipes

```bash
# Screen recording → WebM (primary)
ffmpeg -i recording.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -an -vf "scale=1200:-2" public/demos/[name]/demo.webm

# MP4 fallback (Safari)
ffmpeg -i recording.mov -c:v libx264 -crf 23 -an -vf "scale=1200:-2" public/demos/[name]/demo.mp4

# GIF (GitHub READMEs only)
ffmpeg -i recording.mov -vf "fps=12,scale=900:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" output.gif
```

### Custom domain

This repo claims `https://www.arkashj.com` everywhere (sitemap, JSON-LD, OG images). To make that real:

```bash
vercel domains add arkashj.com
# Vercel prints DNS records — add at your registrar:
#   arkashj.com         A     76.76.21.21
#   www.arkashj.com     CNAME cname.vercel-dns.com
# SSL provisions automatically.
```

Until that's done the site lives at the latest `vercel.app` deploy URL (run `vercel ls` to see).

### Documentation

- 📘 **[CLAUDE.md](./CLAUDE.md)** — agent / Claude Code orientation (current architecture, data layer, image conventions)
- 📋 **[CHANGELOG.md](./CHANGELOG.md)** — every release, every change
- 📂 **`docs/HANDOFF.md`** — extended project orientation
- 📂 **`docs/TODO.md`** — open work, prioritized
- 🎨 **`docs/superpowers/specs/2026-04-26-personal-website-revamp-design.md`** — original v2 design intent
- 🏗️ **[arkashj.com/architecture](https://www.arkashj.com/architecture)** — 6 live React/SVG diagrams of the running stack
- 🌐 **`/docs`** route — same docs rendered as a polished in-site reading experience

---

## License

[Apache 2.0](./LICENSE) © 2026 Arkash Jain — see LICENSE for full text.

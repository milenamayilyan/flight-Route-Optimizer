# ✈️ Aeropath — Flight Route Optimizer

> A comprehensive flight network optimizer running 10 graph algorithms on a 300+ route global dataset, visualized on an interactive world map.

🌐 **[Open Aeropath → milenamayilyan.github.io/flight-Route-Optimizer](https://milenamayilyan.github.io/flight-Route-Optimizer/)**

![DS Project](https://img.shields.io/badge/Data_Structures-Project-c8a84b?style=flat-square)
![Algorithms](https://img.shields.io/badge/Algorithms-10-4fa8a8?style=flat-square)
![Routes](https://img.shields.io/badge/Routes-308-c4613a?style=flat-square)
![Airports](https://img.shields.io/badge/Airports-90%2B-4fa8a8?style=flat-square)
![No Dependencies](https://img.shields.io/badge/Frontend-Zero_Dependencies-c8a84b?style=flat-square)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Algorithms](#algorithms)
- [Project Structure](#project-structure)
- [Dataset](#dataset)
- [Getting Started](#getting-started)
- [Frontend Architecture](#frontend-architecture)
- [Python Backend](#python-backend)
- [UI & Design](#ui--design)
- [Known Limitations](#known-limitations)

---

## Overview

**Aeropath** is a Data Structures course project that models a global flight network as a weighted directed graph and exposes 10 classical graph algorithms through an interactive browser UI. Every algorithm runs entirely client-side in vanilla JavaScript against a dataset of 308 real-world flight routes connecting 90+ airports across 6 continents. A parallel Python implementation (`ds.py`) provides the same algorithms as a standalone backend.

The core focus of the project is demonstrating how algorithm choice affects route selection, and making time-complexity analysis tangible — each algorithm's complexity formula is interactive, with a hover tooltip explaining every variable (V, E, K, b, d) in the context of the flight network.

---

## Features

| Category | Details |
|---|---|
| **Routing** | Cheapest route, Fastest route, A\* geographic routing, Bidirectional Dijkstra |
| **Multi-path** | Yen's K-Shortest Paths with configurable K up to (airports − 1) |
| **Network analysis** | BFS reachability, Budget-constrained Dijkstra, Articulation points, Strongly connected components, Minimum spanning tree |
| **Map** | Interactive canvas world map — scroll to zoom, drag to pan, hover airports and edges for details |
| **Currencies** | 11 currencies (USD, EUR, GBP, RUB, AMD, AED, JPY, CNY, INR, BRL, TRY) with live conversion |
| **Discounts** | Rule-based discount system applied during edge relaxation (long-haul, ultra-long-haul tiers) |
| **Autocomplete** | Full airport search by IATA code or name, sorted alphabetically, filtered by relevance score |
| **Validation** | Same-airport guard, invalid airport detection, negative-weight checks in Python backend |
| **Complexity tooltips** | Hover the complexity badge to see a plain-English explanation of every term in the formula |

---

## Algorithms

Each algorithm is available in both the browser (JavaScript) and the standalone backend (Python).

### Shortest Path

| Algorithm | Complexity | Weight | Notes |
|---|---|---|---|
| **Dijkstra — Cheapest** | `O((V+E) log V)` | Cost (USD) | Discounts applied during relaxation |
| **Dijkstra — Fastest** | `O((V+E) log V)` | Duration (hrs) | Min-heap ordered by cumulative flight hours |
| **A\* Geo-Route** | `O(E log V)` | Cost | Haversine straight-line heuristic to prune search |
| **Bidirectional Dijkstra** | `O(b^(d/2))` | Cost or Duration | Meets-in-the-middle; exponential speedup on long routes |

### Multi-Path

| Algorithm | Complexity | Notes |
|---|---|---|
| **Yen's K-Shortest** | `O(K·V·(V+E) log V)` | Returns K ranked route alternatives; K max = airports − 1 |

### Network Analysis

| Algorithm | Complexity | Notes |
|---|---|---|
| **BFS Reachability** | `O(V + E)` | All airports reachable within K connections |
| **Budget Mode** | `O((V+E) log V)` | Dijkstra pruned at a cost ceiling; results excluded from map |
| **Articulation Points** | `O(V + E)` | Tarjan's — airports whose removal disconnects the graph |
| **Strongly Connected Components** | `O(V + E)` | Tarjan's SCC — identifies isolated sub-networks |
| **Minimum Spanning Tree** | `O(E log E)` | Kruskal's with Union-Find; produces spanning forest for disconnected graphs |

> **Complexity legend:** V = airports · E = routes · K = paths requested · b = branching factor · d = path length in hops

---

## Project Structure

```
aeropath/
├── index.html       # Single-page application shell, nav, hero, algorithm cards, optimizer UI
├── style.css        # All styles — CSS custom properties, layout, map, tooltips, animations
├── script.js        # All frontend logic — graph, algorithms, map canvas, UI interactions
├── ds.py            # Python backend — same 10 algorithms, standalone CLI
└── flights.csv      # Dataset — 308 directed flight routes with coordinates
```

---

## Dataset

**File:** `flights.csv`
**Rows:** 308 directed routes
**Airports:** 90+ across North America, South America, Europe, Africa, Middle East, Asia-Pacific

### Schema

| Column | Type | Description |
|---|---|---|
| `source` | string | IATA code of origin airport |
| `destination` | string | IATA code of destination airport |
| `cost` | float | Base cost in USD |
| `duration` | float | Flight duration in hours |
| `src_lat` | float | Origin airport latitude |
| `src_lon` | float | Origin airport longitude |
| `dest_lat` | float | Destination airport latitude |
| `dest_lon` | float | Destination airport longitude |

### Discount System

Discounts are applied automatically during edge relaxation based on flight duration:

| Tier | Threshold | Discount |
|---|---|---|
| Long-haul | ≥ 8 hrs | 12% |
| Ultra-long-haul | ≥ 13 hrs | 22% |

Discount labels are displayed in results. They add no extra asymptotic cost — relaxation remains O(1) per edge.

### Interesting Routes to Try

| Route | Algorithm | Why it's interesting |
|---|---|---|
| JFK → SYD | Dijkstra Fastest vs Cheapest | Fastest picks the 19 h direct; Cheapest routes via SIN, saves money but adds 6 hours |
| JFK → PER | A\* vs Dijkstra Cheapest | A\* routes via DXB (geographically east); Dijkstra routes via SIN (cheapest regardless of direction) |
| Any → Any | Bidirectional | Observe the halved search frontier on dense hub-to-hub routes |
| PTY | Articulation Points | Panama City is the sole gateway between the Caribbean and South America |

---

## Getting Started

### Browser (zero setup)

```bash
git clone https://github.com/milenamayilyan/flight-Route-Optimizer.git
cd flight-Route-Optimizer
# Open index.html in any modern browser
open index.html
```

No build step. No npm. No bundler. Everything runs natively in the browser.

The world map outline loads from `cdn.jsdelivr.net` (Natural Earth 110m TopoJSON). An internet connection is needed for that layer; all algorithms work offline without it.

### Python Backend

Requires Python 3.8+ with no external libraries — only the standard library (`csv`, `heapq`, `math`, `collections`).

```bash
python ds.py
```

The `main()` function runs a demo of all 10 algorithms against `flights.csv` and prints results to stdout.

To use in your own code:

```python
from ds import FlightGraph, dijkstra, astar, yen_k_shortest

g = FlightGraph()
g.load_from_csv("flights.csv")

path, cost = dijkstra(g, "JFK", "SYD", mode="cost")
print(path, cost)
```

---

## Frontend Architecture

The entire frontend is a single HTML page with no framework and no build toolchain.

### Graph Representation

```
graph[src] = [{ dest, cost, dur, baseCost, discountPct }, ...]
```

Stored as a plain JavaScript object acting as an adjacency list. Built once at page load by parsing `FLIGHTS_RAW` — an inline array literal compiled from `flights.csv`.

### Map Rendering

The map is a `<canvas>` element rendered with the 2D Canvas API:

- **Background layer:** `worldmap.jpg` as a CSS background (semi-transparent)
- **Country outlines:** Natural Earth 110m TopoJSON fetched from jsDelivr CDN, decoded inline without the topojson-client library, drawn as canvas path fills and strokes
- **Airport nodes:** Gold dots scaled by zoom level; glow on hover
- **Route edges:** Teal lines at 0.18 opacity; gold glow on hover
- **Highlighted path:** Rust-red edges and labelled nodes

**Projection:** Equirectangular — longitude maps linearly to X, latitude to Y. Zoom state is stored as `{ minLon, maxLon, minLat, maxLat }` and updated by scroll and drag events. `geoXY(lat, lon, W, H)` converts any coordinate to canvas pixels in the current viewport.

### Algorithm Implementations (JavaScript)

All 10 algorithms are re-implemented in vanilla JS directly in `script.js`. They operate on the same adjacency list as the Python backend and produce identical results.

Key data structures used:

| Structure | Used by |
|---|---|
| Min-heap (binary, array-based) | Dijkstra, A\*, Bidirectional, Yen's, Budget |
| DFS stack + low-link array | Articulation Points, Tarjan SCC |
| Union-Find (union by rank) | Kruskal MST |
| BFS queue (`Array` as deque) | Reachability |

### Currency Conversion

Exchange rates are stored as a constant multiplier relative to USD. Switching currency rerenders the current result in-place without re-running the algorithm.

---

## Python Backend

`ds.py` is a self-contained implementation of all algorithms designed for the DS course submission. It mirrors the JavaScript frontend exactly.

### Classes and Functions

| Symbol | Description |
|---|---|
| `FlightGraph` | Adjacency list graph. `add_edge()`, `add_coords()`, `load_from_csv()`, `get_nodes()` |
| `haversine(coords, a, b)` | Great-circle distance in km — used as A\* heuristic |
| `dijkstra(g, start, end, mode)` | Standard Dijkstra; mode = `"cost"` or `"duration"` |
| `astar(g, start, end)` | A\* with Haversine h(n); cost-optimised |
| `bidirectional_dijkstra(g, start, end, mode)` | Meets-in-middle; terminates when frontiers overlap |
| `bellman_ford(g, start, end, mode)` | Detects negative-weight cycles; runs in O(V·E) |
| `floyd_warshall(g, mode)` | All-pairs shortest paths; O(V³) |
| `yen_k_shortest(g, start, end, K, mode)` | K ranked paths via spur-node technique |
| `bfs_k_connections(g, start, k)` | All airports within k hops |
| `find_articulation_points(g)` | Tarjan's bridge/articulation DFS |
| `tarjan_scc(g)` | Kosaraju-style SCC on directed graph |
| `budget_routes(g, start, budget)` | Dijkstra pruned at cost ceiling |
| `kruskal_mst(g)` | Greedy MST with DisjointSet union-by-rank |
| `DisjointSet` | Union-Find with path compression |

### Input Validation

`load_from_csv()` skips rows with:
- Non-numeric `cost` or `duration` values
- Negative cost or duration
- Missing required columns

Bellman-Ford additionally aborts and reports if a negative-weight cycle is detected.

---

## UI & Design

| Element | Choice |
|---|---|
| **Fonts** | DM Serif Display (headings), Syne (UI), JetBrains Mono (codes, formulas) |
| **Color palette** | Warm beige `#f5f2eb` background · Ink `#1a1a2e` · Teal `#2a7a7a` · Gold `#c8a84b` · Rust `#c4613a` |
| **Map canvas** | Dark `#0a0a0f` with white country outlines at 7% opacity — routes and airports remain primary visual focus |
| **Algorithm grid** | 2 columns · 10 cards · consistent spacing across screen sizes |
| **Complexity badge** | Hover → tooltip panel appears above the badge (falls below if viewport space is insufficient) |
| **Interactions** | Scroll-to-zoom on map · drag-to-pan · hover tooltips on airports and edges · "See on Map" scroll anchor on path algorithms |

---

## Known Limitations

- **No backend server.** `ds.py` and `script.js` implement the same algorithms independently. There is no HTTP API connecting them — the browser runs its own JS graph engine.
- **Equirectangular projection.** The map canvas uses a simple linear projection. High-latitude areas (Greenland, Russia) appear compressed compared to a Mercator or Robinson projection.
- **Static dataset.** `flights.csv` is hand-curated. Costs and durations are representative but not live airline pricing.
- **Bellman-Ford and Floyd-Warshall** are implemented in `ds.py` only — they are not exposed in the browser UI because their O(V·E) and O(V³) complexity make them impractical to run client-side on the full dataset.

---

## Acknowledgements

- Route coordinates sourced from public airport geographic databases.
- Country outline data: [Natural Earth](https://www.naturalearthdata.com/) 110m via [world-atlas](https://github.com/topojson/world-atlas) on jsDelivr.
- Icons: [Font Awesome 6](https://fontawesome.com/).
- Fonts: [Google Fonts](https://fonts.google.com/).

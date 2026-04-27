# ✈️ Aeropath — Flight Route Optimizer

> A Data Structures course project modeling a global flight network as a weighted directed graph, with 10 graph algorithms running live in the browser.

🌐 **[Open Aeropath → milenamayilyan.github.io/flight-Route-Optimizer](https://milenamayilyan.github.io/flight-Route-Optimizer/)**

![DS Project](https://img.shields.io/badge/Data_Structures-Project-c8a84b?style=flat-square)
![Algorithms](https://img.shields.io/badge/Algorithms-10-4fa8a8?style=flat-square)
![Routes](https://img.shields.io/badge/Routes-308-c4613a?style=flat-square)
![Airports](https://img.shields.io/badge/Airports-64-4fa8a8?style=flat-square)
![No Dependencies](https://img.shields.io/badge/Frontend-Zero_Dependencies-c8a84b?style=flat-square)

---

## 📋 Table of Contents

- [Project Summary](#project-summary)
- [Team Contributions](#team-contributions)
- [Requirements Checklist](#requirements-checklist)
- [Algorithms](#algorithms)
- [Edge Cases](#edge-cases)
- [Project Structure](#project-structure)
- [Dataset](#dataset)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Known Limitations](#known-limitations)
- [Acknowledgements](#acknowledgements)

---

## Project Summary

**Aeropath** models a real-world flight network as a **weighted directed graph** and exposes 10 classical graph algorithms through an interactive browser interface. The dataset covers 64 airports and 308 directed routes across 6 continents. Every algorithm runs client-side in vanilla JavaScript, with a parallel Python implementation (`ds.py`) for the course submission.

The secondary focus is making **time-complexity analysis tangible** — every algorithm card shows its Big-O formula as a hoverable badge that explains each variable (V, E, K, b, d) in plain English, in the context of the flight network.

The visual interface was built with AI assistance. All graph algorithm logic, data structure decisions, complexity analysis, and dataset construction were written and reasoned through by the team.

---

## 👥 Team Contributions

Work was divided by algorithm group so both members implemented algorithms in both Python and JavaScript.

### Milena Mayilyan
**Python (`ds.py`):** `FlightGraph` class · `load_from_csv()` · `dijkstra()` · `astar()` · `bidirectional_dijkstra()` · `bellman_ford()` · input validation

**JavaScript (`script.js`):** Dijkstra (cheapest & fastest) · A\* · Bidirectional Dijkstra · map canvas rendering · zoom/pan · currency conversion · "See on Map" behavior

### Nare Manukyan
**Python (`ds.py`):** `yen_k_shortest()` · `bfs_k_connections()` · `budget_routes()` · `find_articulation_points()` · `tarjan_scc()` · `kruskal_mst()` · `DisjointSet` · `floyd_warshall()`

**JavaScript (`script.js`):** Yen's K-Shortest · BFS · Budget Mode · Articulation Points · SCC · Kruskal MST · airport autocomplete · same-airport validation · complexity tooltip system

---

## ✅ Requirements Checklist

### Required

#### 1. Flight dataset — at least 30 airports and 80 routes with cost and duration as edge weights
**✔ Completed.** `flights.csv` contains **64 airports** and **308 directed routes**. Each route stores `cost` (USD) and `duration` (hours) as separate edge weights, covering North America, South America, Europe, Africa, the Middle East, and Asia-Pacific.

---

#### 2. Weighted directed graph using adjacency lists
**✔ Completed.** Both implementations represent the network as an adjacency list — each airport maps to a list of outgoing edges:

```python
# Python — ds.py
class FlightGraph:
    def __init__(self):
        self.graph = defaultdict(list)   # src → [(dst, cost, duration), ...]
        self.coords = {}
```

```js
// JavaScript — script.js
const graph = {};  // src → [{ dest, cost, dur }, ...]
```

The graph is built once at load time and shared by all 10 algorithms. Space complexity: **O(V + E)**.

---

#### 3. Dijkstra — cheapest route and fastest route as two separate queries
**✔ Completed.** Both variants use a binary min-heap. The only difference is the edge weight selected during relaxation:

| Query | Weight | Complexity |
|---|---|---|
| Cheapest route | `cost` in USD | `O((V+E) log V)` |
| Fastest route | `duration` in hours | `O((V+E) log V)` |

The heap extracts the airport with the lowest accumulated weight, relaxes all outgoing edges, and re-queues neighbours if a shorter path is found.

**Try:** JFK → SYD. Cheapest routes via SIN (saving ~$80, adding ~6 hours). Fastest takes the 19-hour direct flight.

---

#### 4. BFS — all airports reachable within at most K connections
**✔ Completed.** Level-by-level BFS that stops expanding once the hop count exceeds K.

```python
def bfs_k_connections(graph_obj, start, k):
    # Each BFS level = one additional connection
    # Returns all visited nodes after at most k levels
```

Complexity: **O(V + E)**.

**Try:** Set origin to **ABV (Abuja, Nigeria)** with K = 1. ABV has exactly one outbound route (to LOS), so only Lagos is reachable. Increase to K = 2 to reach JNB, ACC, and further hubs connected through LOS.

---

#### 5. Articulation points — airports whose removal would disconnect the graph
**✔ Completed.** Tarjan's single-DFS algorithm tracks `disc[]` (discovery time) and `low[]` (lowest-reachable ancestor) for every node. A node `u` is an articulation point when any of its children `v` satisfies `low[v] >= disc[u]`.

```python
def find_articulation_points(graph_obj):
    # Single DFS — O(V + E)
    # Uses disc[], low[], parent[], and visited[] arrays
```

Complexity: **O(V + E)**.

**Try:** Run the **Articulation Points** algorithm. **PTY (Panama City)** will appear as a critical airport — it is the only bridge between the Caribbean cluster and South America. Removing it would isolate those regions from the rest of the network.

---

#### 6. Edge cases — no route, source equals destination, airport not in dataset
**✔ Completed.** All three are handled. Details and how to reproduce each are in the [Edge Cases](#edge-cases) section below.

---

#### 7. Complexity analysis for all graph operations
**✔ Completed.** Every algorithm card shows its Big-O formula as an interactive badge. Hovering it opens a tooltip that defines every variable (V, E, K, b, d) specifically in the context of this flight network. Full complexity table in the [Algorithms](#algorithms) section.

---

### Bonus

#### B1. Kruskal's MST — minimum cost spanning tree
**✔ Completed.** Routes are sorted by cost in `O(E log E)`, then greedily added if they do not form a cycle, using a **Union-Find** structure with union-by-rank and path compression for near-O(1) cycle detection per edge. Because the graph is not fully symmetric, the result is a spanning **forest**.

Complexity: **O(E log E)**

---

#### B2. Budget Mode — all destinations reachable within a cost ceiling
**✔ Completed.** A modified Dijkstra that runs to completion from the origin, then filters all settled airports whose accumulated cost is within the budget. This guarantees optimality — no cheaper path to any destination is missed.

Complexity: **O((V+E) log V)**

Budget Mode results are excluded from map highlighting because the output is a set of destinations, not a single path.

---

## 🔢 Algorithms

### Shortest Path

| Algorithm | Complexity | Weight | Notes |
|---|---|---|---|
| **Dijkstra — Cheapest** | `O((V+E) log V)` | Cost (USD) | Priority-queue shortest path on cost weights |
| **Dijkstra — Fastest** | `O((V+E) log V)` | Duration (hrs) | Min-heap ordered by cumulative flight hours |
| **A\* Geo-Route** | `O(E log V)` | Cost | Haversine heuristic prunes geographically unpromising airports |
| **Bidirectional Dijkstra** | `O(b^(d/2))` | Cost or Duration | Meets-in-the-middle; exponential speedup on long routes |

### Multi-Path

| Algorithm | Complexity | Notes |
|---|---|---|
| **Yen's K-Shortest** | `O(K·V·(V+E) log V)` | K ranked route alternatives; K max = 63 (airports − 1) |

### Network Analysis

| Algorithm | Complexity | Notes |
|---|---|---|
| **BFS Reachability** | `O(V + E)` | All airports within K connections |
| **Budget Mode** | `O((V+E) log V)` | Dijkstra filtered at cost ceiling; no map highlight |
| **Articulation Points** | `O(V + E)` | Tarjan's single-DFS — critical infrastructure detection |
| **Strongly Connected Components** | `O(V + E)` | Tarjan's SCC — identifies isolated sub-networks |
| **Minimum Spanning Tree** | `O(E log E)` | Kruskal's with Union-Find |

> **Complexity legend:** V = airports (64) · E = routes (308) · K = paths requested · b = avg branching factor · d = path length in hops

---

## ⚠️ Edge Cases

### 1. Source equals destination
Caught before the algorithm runs. Selecting the same airport in both fields shows a warning banner:

> ⚠ *Origin and destination must be different airports.*

The Run button is disabled until different airports are chosen. In `ds.py`, returning cost 0 and a single-node path is also handled explicitly.

**How to reproduce:** Open the optimizer, select **JFK** in both the origin and destination fields.

---

### 2. Airport not in dataset
The airport input only allows selection through an autocomplete dropdown built from `flights.csv`. It is not possible to submit an unknown airport through the UI.

In `ds.py`, if a start or end node is not present in the graph, the function returns `(None, inf)` immediately without running the algorithm.

**How to reproduce in the UI:** Type `ZZZ` (a non-existent code) into the origin field — no dropdown result appears and the form cannot be submitted.

**How to reproduce in Python:**
```python
path, cost = dijkstra(g, "JFK", "ZZZ", mode="cost")
# Returns: (None, inf)
```

---

### 3. No route exists between two airports
This dataset is strongly connected — every airport can reach every other airport through some sequence of flights, so a "no path" result cannot be triggered through the normal UI.

However, the code path is real and exercised:

- **Yen's algorithm** internally removes edges to force detours when computing alternative spur paths. If no spur path exists for a deviation point, the algorithm correctly terminates early and returns fewer than K results rather than crashing.
- **`ds.py`** returns `(None, inf)` from all shortest-path functions whenever Dijkstra exhausts the heap without reaching the destination. This is testable on a custom partial graph:

```python
g = FlightGraph()
g.add_edge("A", "B", 100, 2.0)
# No edge from B to anywhere
path, cost = dijkstra(g, "B", "A", mode="cost")
# Returns: (None, inf)
```

---

### 4. K = 0 in BFS
BFS with K = 0 returns only the origin airport itself — no neighbours are explored. This is correct behaviour and is handled by the loop bound checking depth before expanding.

---

## 🗂 Project Structure

```
flight-Route-Optimizer/
├── index.html       # Application shell — nav, hero, algorithm cards, optimizer panel
├── style.css        # All styles — design tokens, layout, map, tooltips, animations
├── script.js        # All logic — graph, 10 algorithms, canvas map, UI interactions
├── ds.py            # Python backend — same algorithms, standalone CLI
└── flights.csv      # Dataset — 308 directed routes, 64 airports
```

---

## 📊 Dataset

**`flights.csv`** — 308 directed routes across 64 airports on 6 continents.

| Column | Type | Description |
|---|---|---|
| `source` | string | IATA code of origin airport |
| `destination` | string | IATA code of destination airport |
| `cost` | float | Base cost in USD |
| `duration` | float | Flight duration in hours |
| `src_lat` / `src_lon` | float | Origin coordinates |
| `dest_lat` / `dest_lon` | float | Destination coordinates |

### Interesting Routes to Try

| Route | Algorithm | Why it's interesting |
|---|---|---|
| JFK → SYD | Cheapest vs Fastest | Fastest: 19 h direct. Cheapest: via SIN, saves ~$80, adds ~6 hours |
| JFK → PER | A\* vs Cheapest | A\* routes via DXB (geographically east). Cheapest routes via SIN regardless of direction |
| ABV, K = 1 | BFS | ABV has one outbound route — only LOS reachable at K=1 |
| — | Articulation Points | PTY (Panama City) — sole bridge between Caribbean and South America |

---

## 🚀 Getting Started

### Browser (zero setup)

```bash
git clone https://github.com/milenamayilyan/flight-Route-Optimizer.git
cd flight-Route-Optimizer
open index.html   # or double-click in file explorer
```

No build step. No npm. No bundler. Runs natively in any modern browser.

Country outlines on the map load from `cdn.jsdelivr.net` — an internet connection is needed for that layer only. All algorithms work fully offline.

### Python Backend

Standard library only (`csv`, `heapq`, `math`, `collections`) — no pip installs required.

```bash
python ds.py
```

Runs a demo of all algorithms against `flights.csv` and prints results to stdout.

```python
# Use as a module
from ds import FlightGraph, dijkstra, astar, yen_k_shortest

g = FlightGraph()
g.load_from_csv("flights.csv")

path, cost = dijkstra(g, "JFK", "SYD", mode="cost")
print(path, cost)
```

---

## 🏗 Architecture

### Graph Representation

Adjacency list as a plain object/dict. Built once, shared by all algorithms. Space: **O(V + E)**.

```
graph[src] = [{ dest, cost, dur }, ...]   // JavaScript
graph[src] = [(dest, cost, duration), ...]                        // Python
```

### Map Rendering

The map is a `<canvas>` element drawn with the 2D Canvas API:

- **Country outlines** — Natural Earth 110m TopoJSON from jsDelivr CDN, decoded inline without an external library
- **Airport nodes** — gold dots, glow on hover
- **Route edges** — teal at 18% opacity, gold on hover
- **Highlighted path** — rust-red edges with labelled airport codes
- **Projection** — equirectangular; zoom viewport stored as `{ minLon, maxLon, minLat, maxLat }`

### Key Data Structures

| Structure | Used by |
|---|---|
| Binary min-heap | Dijkstra, A\*, Bidirectional, Yen's, Budget |
| DFS stack + low-link arrays | Articulation Points, Tarjan SCC |
| Union-Find (rank + path compression) | Kruskal MST |
| BFS queue | Reachability |

---

## ⚡ Known Limitations

- **No live backend.** `ds.py` and `script.js` are independent implementations with no HTTP API between them.
- **Equirectangular projection.** High-latitude regions (Greenland, Russia) appear compressed.
- **Static dataset.** Costs and durations are representative, not live airline pricing.
- **Bellman-Ford and Floyd-Warshall** exist in `ds.py` only — their O(V·E) and O(V³) complexity make client-side execution impractical on the full dataset.

---

## Acknowledgements

- Country outline data: [Natural Earth](https://www.naturalearthdata.com/) 110m via [world-atlas](https://github.com/topojson/world-atlas) on jsDelivr
- Icons: [Font Awesome 6](https://fontawesome.com/)
- Fonts: [Google Fonts](https://fonts.google.com/) — DM Serif Display, Syne, JetBrains Mono

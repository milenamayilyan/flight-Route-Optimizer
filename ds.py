import csv
import heapq
import math
from collections import deque, defaultdict

# =========================
# GRAPH CLASS
# =========================
class FlightGraph:
    def __init__(self):
        self.graph = defaultdict(list)
        self.coords = {}  # airport -> (lat, lon) for A* heuristic

    def add_edge(self, src, dest, cost, duration):
        self.graph[src].append((dest, cost, duration))

    def add_coords(self, airport, lat, lon):
        self.coords[airport] = (lat, lon)

    def load_from_csv(self, filename):
        try:
            with open(filename, "r") as file:
                reader = csv.DictReader(file)
                for row in reader:
                    src  = row["source"].strip()
                    dest = row["destination"].strip()
                    try:
                        cost     = float(row["cost"])
                        duration = float(row["duration"])
                    except ValueError:
                        print(f"Skipping invalid row: {row}")
                        continue
                    if cost < 0 or duration < 0:
                        print(f"Warning: negative value in row {row}, skipping.")
                        continue
                    self.add_edge(src, dest, cost, duration)

                    # store coords if present
                    for airport, lat_key, lon_key in [
                        (src,  "src_lat",  "src_lon"),
                        (dest, "dest_lat", "dest_lon"),
                    ]:
                        if lat_key in row and lon_key in row:
                            try:
                                self.coords[airport] = (
                                    float(row[lat_key]),
                                    float(row[lon_key]),
                                )
                            except ValueError:
                                pass

        except FileNotFoundError:
            print("Error: CSV file not found.")

    def get_nodes(self):
        nodes = set(self.graph.keys())
        for neighbors in self.graph.values():
            for dest, _, _ in neighbors:
                nodes.add(dest)
        return nodes


# =========================
# HAVERSINE HEURISTIC (for A*)
# =========================
def haversine(coords, a, b):
    if a not in coords or b not in coords:
        return 0
    lat1, lon1 = coords[a]
    lat2, lon2 = coords[b]
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    s = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
    return 2 * R * math.asin(math.sqrt(s))


# =========================
# DIJKSTRA (CHEAPEST / FASTEST) — path stored via prev dict
# =========================
def dijkstra(graph_obj, start, end, mode="cost"):
    graph = graph_obj.graph
    nodes = graph_obj.get_nodes()

    if start not in nodes or end not in nodes:
        return None, float("inf")
    if start == end:
        return [start], 0

    dist = {node: float("inf") for node in nodes}
    dist[start] = 0
    prev = {}
    pq = [(0, start)]

    while pq:
        current_dist, node = heapq.heappop(pq)
        if current_dist > dist[node]:
            continue
        if node == end:
            break
        for neighbor, cost, duration in graph.get(node, []):
            weight = cost if mode == "cost" else duration
            new_dist = current_dist + weight
            if new_dist < dist[neighbor]:
                dist[neighbor] = new_dist
                prev[neighbor] = node
                heapq.heappush(pq, (new_dist, neighbor))

    if dist[end] == float("inf"):
        return None, float("inf")

    path = []
    cur = end
    while cur != start:
        path.append(cur)
        cur = prev.get(cur)
        if cur is None:
            return None, float("inf")
    path.append(start)
    path.reverse()
    return path, dist[end]


# =========================
# A* SEARCH (cost mode, uses geographic heuristic)
# =========================
def astar(graph_obj, start, end):
    graph  = graph_obj.graph
    coords = graph_obj.coords
    nodes  = graph_obj.get_nodes()

    if start not in nodes or end not in nodes:
        return None, float("inf")
    if start == end:
        return [start], 0

    def h(node):
        return haversine(coords, node, end)

    g = {node: float("inf") for node in nodes}
    g[start] = 0
    prev = {}
    pq = [(h(start), 0, start)]

    while pq:
        f, current_g, node = heapq.heappop(pq)
        if current_g > g[node]:
            continue
        if node == end:
            break
        for neighbor, cost, _ in graph.get(node, []):
            new_g = g[node] + cost
            if new_g < g[neighbor]:
                g[neighbor] = new_g
                prev[neighbor] = node
                heapq.heappush(pq, (new_g + h(neighbor), new_g, neighbor))

    if g[end] == float("inf"):
        return None, float("inf")

    path = []
    cur = end
    while cur != start:
        path.append(cur)
        cur = prev.get(cur)
        if cur is None:
            return None, float("inf")
    path.append(start)
    path.reverse()
    return path, g[end]


# =========================
# BELLMAN-FORD (handles discount/negative edges)
# =========================
def bellman_ford(graph_obj, start, end, mode="cost"):
    nodes = list(graph_obj.get_nodes())
    if start not in nodes or end not in nodes:
        return None, float("inf")

    dist = {n: float("inf") for n in nodes}
    dist[start] = 0
    prev = {}

    edges = []
    for src in graph_obj.graph:
        for dest, cost, duration in graph_obj.graph[src]:
            w = cost if mode == "cost" else duration
            edges.append((src, dest, w))

    for _ in range(len(nodes) - 1):
        updated = False
        for src, dest, w in edges:
            if dist[src] != float("inf") and dist[src] + w < dist[dest]:
                dist[dest] = dist[src] + w
                prev[dest] = src
                updated = True
        if not updated:
            break

    # Negative cycle detection
    for src, dest, w in edges:
        if dist[src] != float("inf") and dist[src] + w < dist[dest]:
            return None, -float("inf")  # negative cycle detected

    if dist[end] == float("inf"):
        return None, float("inf")

    path = []
    cur = end
    visited_back = set()
    while cur != start:
        if cur in visited_back:
            return None, float("inf")
        visited_back.add(cur)
        path.append(cur)
        cur = prev.get(cur)
        if cur is None:
            return None, float("inf")
    path.append(start)
    path.reverse()
    return path, dist[end]


# =========================
# FLOYD-WARSHALL (all-pairs shortest paths)
# =========================
def floyd_warshall(graph_obj, mode="cost"):
    nodes = sorted(graph_obj.get_nodes())
    idx   = {n: i for i, n in enumerate(nodes)}
    n     = len(nodes)
    INF   = float("inf")

    dist = [[INF] * n for _ in range(n)]
    nxt  = [[None] * n for _ in range(n)]

    for i in range(n):
        dist[i][i] = 0

    for src in graph_obj.graph:
        for dest, cost, duration in graph_obj.graph[src]:
            w = cost if mode == "cost" else duration
            i, j = idx[src], idx[dest]
            if w < dist[i][j]:
                dist[i][j] = w
                nxt[i][j]  = j

    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
                    nxt[i][j]  = nxt[i][k]

    def get_path(a, b):
        if nxt[idx[a]][idx[b]] is None:
            return None
        path = [a]
        i = idx[a]
        while i != idx[b]:
            i = nxt[i][idx[b]]
            path.append(nodes[i])
        return path

    return dist, nodes, idx, get_path


# =========================
# YEN'S K-SHORTEST PATHS
# =========================
def yen_k_shortest(graph_obj, start, end, K, mode="cost"):
    def sp(graph_override, s, e):
        return dijkstra(graph_override, s, e, mode)

    A = []  # confirmed shortest paths
    B = []  # candidate paths

    path, cost = dijkstra(graph_obj, start, end, mode)
    if path is None:
        return []
    A.append((cost, path))

    for k in range(1, K):
        prev_path = A[k-1][1]

        for i in range(len(prev_path) - 1):
            spur_node = prev_path[i]
            root_path = prev_path[:i+1]
            root_cost = sum(
                next(
                    (c if mode == "cost" else d)
                    for nb, c, d in graph_obj.graph.get(root_path[j], [])
                    if nb == root_path[j+1]
                )
                for j in range(len(root_path) - 1)
            )

            # Build temp graph removing used edges and root nodes
            temp = FlightGraph()
            temp.coords = graph_obj.coords
            for src in graph_obj.graph:
                for dest, c, dur in graph_obj.graph[src]:
                    # Remove edges shared by existing root paths
                    skip = False
                    for a_cost, a_path in A:
                        if len(a_path) > i and a_path[:i+1] == root_path:
                            if src == a_path[i] and dest == a_path[i+1]:
                                skip = True
                                break
                    if skip:
                        continue
                    if src in root_path[:-1]:
                        continue
                    temp.add_edge(src, dest, c, dur)

            spur_path, spur_cost = dijkstra(temp, spur_node, end, mode)
            if spur_path:
                total_path = root_path[:-1] + spur_path
                total_cost = root_cost + spur_cost
                candidate   = (total_cost, total_path)
                if candidate not in B:
                    B.append(candidate)

        if not B:
            break

        B.sort(key=lambda x: x[0])
        A.append(B.pop(0))

    return A


# =========================
# BFS (K CONNECTIONS)
# =========================
def bfs_k_connections(graph_obj, start, k):
    if start not in graph_obj.get_nodes():
        return []

    visited = {start}
    queue   = deque([(start, 0)])
    result  = []

    while queue:
        node, depth = queue.popleft()
        if depth > k:
            continue
        result.append(node)
        for neighbor, _, _ in graph_obj.graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, depth + 1))

    return result


# =========================
# TARJAN'S ARTICULATION POINTS — O(V+E)
# =========================
def find_articulation_points(graph_obj):
    nodes     = list(graph_obj.get_nodes())
    adj       = defaultdict(set)
    for src in graph_obj.graph:
        for dest, _, _ in graph_obj.graph[src]:
            adj[src].add(dest)
            adj[dest].add(src)

    visited    = {}
    low        = {}
    parent     = {}
    ap         = set()
    timer      = [0]

    def dfs(u):
        visited[u] = low[u] = timer[0]
        timer[0]  += 1
        children   = 0
        for v in adj[u]:
            if v not in visited:
                children += 1
                parent[v] = u
                dfs(v)
                low[u] = min(low[u], low[v])
                if parent.get(u) is None and children > 1:
                    ap.add(u)
                if parent.get(u) is not None and low[v] >= visited[u]:
                    ap.add(u)
            elif v != parent.get(u):
                low[u] = min(low[u], visited[v])

    for n in nodes:
        if n not in visited:
            parent[n] = None
            dfs(n)

    return list(ap)


# =========================
# TARJAN'S STRONGLY CONNECTED COMPONENTS
# =========================
def tarjan_scc(graph_obj):
    nodes   = list(graph_obj.get_nodes())
    idx_map = {}
    low     = {}
    on_stack = {}
    stack   = []
    sccs    = []
    index   = [0]

    def strongconnect(v):
        idx_map[v] = low[v] = index[0]
        index[0]  += 1
        stack.append(v)
        on_stack[v] = True

        for w, _, _ in graph_obj.graph.get(v, []):
            if w not in idx_map:
                strongconnect(w)
                low[v] = min(low[v], low[w])
            elif on_stack.get(w):
                low[v] = min(low[v], idx_map[w])

        if low[v] == idx_map[v]:
            scc = []
            while True:
                w = stack.pop()
                on_stack[w] = False
                scc.append(w)
                if w == v:
                    break
            sccs.append(scc)

    import sys
    sys.setrecursionlimit(10000)
    for n in nodes:
        if n not in idx_map:
            strongconnect(n)

    return sccs


# =========================
# BUDGET MODE
# =========================
def budget_routes(graph_obj, start, budget):
    pq        = [(0, start)]
    reachable = {}

    while pq:
        current_cost, node = heapq.heappop(pq)
        if current_cost > budget or node in reachable:
            continue
        reachable[node] = current_cost
        for neighbor, cost, _ in graph_obj.graph.get(node, []):
            heapq.heappush(pq, (current_cost + cost, neighbor))

    return reachable


# =========================
# KRUSKAL MST (with union-by-rank)
# =========================
class DisjointSet:
    def __init__(self, nodes):
        self.parent = {n: n for n in nodes}
        self.rank   = {n: 0  for n in nodes}

    def find(self, node):
        if self.parent[node] != node:
            self.parent[node] = self.find(self.parent[node])
        return self.parent[node]

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra == rb:
            return False
        if self.rank[ra] < self.rank[rb]:
            ra, rb = rb, ra
        self.parent[rb] = ra
        if self.rank[ra] == self.rank[rb]:
            self.rank[ra] += 1
        return True


def kruskal_mst(graph_obj):
    edges = []
    for src in graph_obj.graph:
        for dest, cost, _ in graph_obj.graph[src]:
            edges.append((cost, src, dest))

    edges.sort()
    ds  = DisjointSet(graph_obj.get_nodes())
    mst = []

    for cost, src, dest in edges:
        if ds.union(src, dest):
            mst.append((src, dest, cost))

    return mst


# =========================
# BIDIRECTIONAL DIJKSTRA
# =========================
def bidirectional_dijkstra(graph_obj, start, end, mode="cost"):
    if start == end:
        return [start], 0

    nodes = graph_obj.get_nodes()
    if start not in nodes or end not in nodes:
        return None, float("inf")

    # build reverse graph
    rev = defaultdict(list)
    for src in graph_obj.graph:
        for dest, cost, dur in graph_obj.graph[src]:
            rev[dest].append((src, cost, dur))

    dist_f = defaultdict(lambda: float("inf")); dist_f[start] = 0
    dist_b = defaultdict(lambda: float("inf")); dist_b[end]   = 0
    prev_f = {}; prev_b = {}
    pq_f   = [(0, start)]; pq_b = [(0, end)]
    done_f = set(); done_b = set()
    best   = float("inf"); meeting = None

    def relax(pq, dist, prev, graph, done):
        nonlocal best, meeting
        cost_u, u = heapq.heappop(pq)
        if u in done:
            return
        done.add(u)
        for v, c, d in graph.get(u, []):
            w = c if mode == "cost" else d
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                prev[v] = u
                heapq.heappush(pq, (dist[v], v))
        # check meeting point
        for v in done_b if graph is graph_obj.graph else done_f:
            total = dist_f[v] + dist_b[v]
            if total < best:
                best    = total
                meeting = v

    while pq_f or pq_b:
        if pq_f:
            relax(pq_f, dist_f, prev_f, graph_obj.graph, done_f)
        if pq_b:
            relax(pq_b, dist_b, prev_b, rev, done_b)
        if done_f & done_b:
            break

    if meeting is None or best == float("inf"):
        return None, float("inf")

    # reconstruct
    path = []
    cur  = meeting
    while cur != start:
        path.append(cur)
        cur = prev_f.get(cur)
        if cur is None:
            return None, float("inf")
    path.append(start)
    path.reverse()
    cur = meeting
    while cur != end:
        cur = prev_b.get(cur)
        if cur is None:
            return None, float("inf")
        path.append(cur)

    return path, best


# =========================
# CLI MENU
# =========================
def main():
    graph = FlightGraph()
    graph.load_from_csv("flights.csv")

    while True:
        print("\n Flight Connection Optimizer")
        print("1.  Cheapest Route (Dijkstra)")
        print("2.  Fastest Route (Dijkstra)")
        print("3.  Cheapest Route with Negative Discounts (Bellman-Ford)")
        print("4.  Geo-Optimised Route (A*)")
        print("5.  Bidirectional Dijkstra")
        print("6.  All-Pairs Shortest Paths (Floyd-Warshall)")
        print("7.  Top K Cheapest Routes (Yen's)")
        print("8.  Reachable Airports within K Connections (BFS)")
        print("9.  Critical Airports (Tarjan Articulation Points)")
        print("10. Strongly Connected Components (Tarjan SCC)")
        print("11. Budget Mode")
        print("12. Minimum Spanning Tree (Kruskal)")
        print("0.  Exit")

        choice = input("Choose option: ").strip()

        if choice == "1":
            s, d = input("Start: "), input("Destination: ")
            path, cost = dijkstra(graph, s, d, "cost")
            print("Path:", path, "| Cost: $", round(cost, 2))

        elif choice == "2":
            s, d = input("Start: "), input("Destination: ")
            path, t = dijkstra(graph, s, d, "duration")
            print("Path:", path, "| Time:", round(t, 2), "hrs")

        elif choice == "3":
            s, d = input("Start: "), input("Destination: ")
            m = input("Mode (cost/duration): ") or "cost"
            path, val = bellman_ford(graph, s, d, m)
            print("Path:", path, "| Value:", round(val, 2))

        elif choice == "4":
            s, d = input("Start: "), input("Destination: ")
            path, cost = astar(graph, s, d)
            print("Path:", path, "| Cost: $", round(cost, 2))

        elif choice == "5":
            s, d = input("Start: "), input("Destination: ")
            m = input("Mode (cost/duration): ") or "cost"
            path, val = bidirectional_dijkstra(graph, s, d, m)
            print("Path:", path, "| Value:", round(val, 2))

        elif choice == "6":
            m    = input("Mode (cost/duration): ") or "cost"
            dist, nodes, idx, get_path = floyd_warshall(graph, m)
            s, d = input("From: "), input("To: ")
            if s in idx and d in idx:
                print("Distance:", round(dist[idx[s]][idx[d]], 2))
                print("Path:", get_path(s, d))
            else:
                print("Node not found.")

        elif choice == "7":
            s, d = input("Start: "), input("Destination: ")
            k    = int(input("K: ") or "3")
            m    = input("Mode (cost/duration): ") or "cost"
            results = yen_k_shortest(graph, s, d, k, m)
            for i, (c, p) in enumerate(results, 1):
                print(f"  {i}. {p}  |  {round(c,2)}")

        elif choice == "8":
            s = input("Start: ")
            k = int(input("Max connections: "))
            print("Reachable:", bfs_k_connections(graph, s, k))

        elif choice == "9":
            print("Critical Airports:", find_articulation_points(graph))

        elif choice == "10":
            sccs = tarjan_scc(graph)
            print(f"Found {len(sccs)} strongly connected component(s):")
            for i, scc in enumerate(sccs, 1):
                print(f"  SCC {i}: {scc}")

        elif choice == "11":
            s      = input("Start: ")
            budget = float(input("Budget ($): "))
            result = budget_routes(graph, s, budget)
            print("Reachable within budget:")
            for airport, cost in sorted(result.items(), key=lambda x: x[1]):
                print(f"  {airport}: ${round(cost,2)}")

        elif choice == "12":
            mst = kruskal_mst(graph)
            total = sum(c for _, _, c in mst)
            print(f"MST ({len(mst)} edges, total cost ${round(total,2)}):")
            for src, dest, cost in mst:
                print(f"  {src} -> {dest}: ${cost}")

        elif choice == "0":
            break

        else:
            print("Invalid choice.")


if __name__ == "__main__":
    main()

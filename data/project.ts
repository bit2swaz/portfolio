interface ProjectData {
  name: string;
  url: string;
  description: string;
  isFeatured: boolean;
  tags?: string[];
  highlight?: string;
}

export const projectData: ProjectData[] = [
    {
        name: "Lithos",
        url: "https://github.com/bit2swaz/lithos",
        description: "A production-grade LSM-tree storage engine written from scratch in C. Features Write-Ahead Logging (WAL) for durability, Leveled Compaction, and Snapshot Isolation (MVCC).",
        isFeatured: true,
        tags: ["C", "LSM-Tree", "Make", "Pthreads"],
        highlight: "72k+ writes/sec & 97k+ reads/sec",
    },
    {
        name: "cold-cli",
        url: "https://github.com/bit2swaz/cold-cli",
        description: "A security-focused HD Wallet generator in Rust. Implements 'Scorched Earth' memory hygiene (zeroize) to prevent cold-boot attacks and SLIP-0010 for full Phantom/Solflare interoperability.",
        isFeatured: true,
        tags: ["Rust", "Zeroize", "Ed25519", "BIP-39"],
        highlight: "Zeroizes RAM on drop",
    },
    {
        name: "Aether",
        url: "https://github.com/bit2swaz/aether",
        description: "A distributed SQL database providing Strong Consistency (CP) via Raft consensus. Decouples storage (SQLite WAL) from interface (Postgres Wire Protocol).",
        isFeatured: false,
        tags: ["Go", "Raft", "SQLite", "Postgres Protocol"],
        highlight: "Zero-downtime snapshots via VACUUM INTO",
    },
    {
        name: "CrisisMesh",
        url: "https://github.com/bit2swaz/crisismesh",
        description: "A decentralized, offline-first mesh network using Delay Tolerant Networking (DTN). Uses custom UDP Multicast Gossip and Curve25519 encryption for partition-resilient comms.",
        isFeatured: false,
        tags: ["Go", "UDP/TCP", "NaCl Crypto", "Bubble Tea"],
        highlight: "Guaranteed delivery during partitions",
    },
    {
        name: "Orion",
        url: "https://github.com/bit2swaz/orion",
        description: "A distributed container orchestrator built from scratch. Collapses the control plane into a single binary using Raft for consensus and Lifeguard-enhanced gossip for failure detection.",
        isFeatured: false,
        tags: ["Go", "Raft Consensus", "SWIM Gossip", "Docker SDK"],
        highlight: "Self-healing cluster in <2s",
    },
    {
      name: "Prism",
      url: "https://github.com/bit2swaz/prism",
      description: "An ephemeral database proxy that intercepts PostgreSQL wire protocol to instantly fork databases for every feature branch using filesystem-level Copy-on-Write.",
      isFeatured: false,
      tags: ["Go", "Postgres Wire Protocol", "Docker SDK", "Btrfs/ZFS"],
      highlight: "Database branching in <300ms",
    },
    {
      name: "VelocityCache",
      url: "https://github.com/bit2swaz/velocity-cache",
      description: "A stateless, self-hosted remote build cache for monorepos. Decouples caching logic from storage to ensure data sovereignty.",
      isFeatured: false,
      tags: ["Go", "S3", "MinIO", "Prometheus"],
      highlight: "231x faster than TurboRepo",
    },
];

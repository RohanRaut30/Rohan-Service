"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wrench, 
  Layers, 
  Smartphone, 
  ShoppingBag, 
  Globe, 
  Clock, 
  TrendingUp, 
  Cpu, 
  LayoutTemplate, 
  Server, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Info,
  Layers3,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

type ProjectType = "saas" | "mobile" | "ecommerce" | "marketing";
type Priority = "speed" | "scale" | "ai" | "ui";
type Hosting = "serverless" | "vps" | "cloud";

interface StackLayer {
  stack: string;
  details: string;
  pros: string[];
  cons: string[];
}

interface Recommendation {
  whyItFits: string;
  frontend: StackLayer;
  backend: StackLayer;
  database: StackLayer;
  metrics: {
    devSpeed: number; // out of 5
    scalability: number; // out of 5
    maintenance: number; // out of 5
  };
  alternatives: {
    stack: string;
    details: string;
    whyConsider: string;
  }[];
}

const projectTypes = [
  { id: "saas", label: "Custom SaaS / Web App", description: "B2B platforms, dashboards, user portals", icon: Layers },
  { id: "mobile", label: "Mobile App (iOS/Android)", description: "Cross-platform mobile interfaces & logic", icon: Smartphone },
  { id: "ecommerce", label: "E-Commerce System", description: "Shopping engines, checkout flows, inventories", icon: ShoppingBag },
  { id: "marketing", label: "Marketing / Content Site", description: "Fast, conversion-focused, rich marketing pages", icon: Globe },
];

const priorities = [
  { id: "speed", label: "Rapid Launch", description: "Speed up development cycles & MVP launch", icon: Clock },
  { id: "scale", label: "High Scale / Low Latency", description: "Optimize for concurrency and fast database loops", icon: TrendingUp },
  { id: "ai", label: "AI & Data Workloads", description: "Integrate vector search, LLMs, and prompt routing", icon: Cpu },
  { id: "ui", label: "Interactive UI & Motion", description: "Rich graphics, animations, and complex state management", icon: LayoutTemplate },
];

const hostings = [
  { id: "serverless", label: "Serverless (Vercel/Netlify)", description: "Global CDN edge, autoscaling, zero devops overhead" },
  { id: "vps", label: "VPS / Docker Containers", description: "Predictable budget, root access, full deployment flexibility" },
  { id: "cloud", label: "Enterprise Cloud (AWS/Azure/GCP)", description: "Advanced VPC, compliance, load balancers, enterprise grade" },
];

const recommendations: Record<ProjectType, Record<Priority, Recommendation>> = {
  saas: {
    speed: {
      whyItFits: "This stack delivers maximum velocity by keeping client and server logic in a single type-safe language. It is optimized for launching MVPs and starting validation loops.",
      frontend: {
        stack: "Next.js (App Router) + React",
        details: "Server-side rendering (SSR) and React Server Components for instant initial paint. Next.js handles route handling natively.",
        pros: ["Shared types between client and backend", "Fast setup with standard boilerplates"],
        cons: ["Requires learning Next.js caching rules", "Vercel serverless cold starts can occur"]
      },
      backend: {
        stack: "Next.js API Routes / Node.js",
        details: "Unified backend running in Serverless Functions, responding instantly to frontend fetch calls without maintaining dedicated servers.",
        pros: ["No dedicated server administration needed", "Massive npm library support for rapid development"],
        cons: ["Single-threaded nature of Node", "Heavier memory consumption compared to compiled code"]
      },
      database: {
        stack: "PostgreSQL (via Supabase or Neon)",
        details: "Fully managed SQL database with instant schema migrations and connection pool management.",
        pros: ["Complete relational power with ACID compliance", "Excellent JSONB support for unstructured parameters"],
        cons: ["Can require scaling tuning under large heavy loads", "Connection pooling overhead"]
      },
      metrics: { devSpeed: 5, scalability: 3.5, maintenance: 1.5 },
      alternatives: [
        { stack: "Remix + Prisma", details: "Excellent for form mutations and standard loader patterns.", whyConsider: "If your app is heavily read/write form-driven rather than content-driven." },
        { stack: "Ruby on Rails Monolith", details: "Proven model-view-controller speed with pre-built user authentication.", whyConsider: "If you want a stable, battle-tested monolith without separate API configurations." }
      ]
    },
    scale: {
      whyItFits: "For high-concurrency SaaS platforms, separating the static frontend assets from a high-throughput compiled backend allows the system to easily scale horizontally.",
      frontend: {
        stack: "React (Vite SPA) + Tailwind CSS",
        details: "Frontend compiles to pure static HTML/JS/CSS assets that can be cached on a global CDN edge, shielding your application servers.",
        pros: ["Zero-cost static hosting", "Decoupled pipeline prevents frontend changes from crashing backend"],
        cons: ["Slower initial load than SSR on first visit", "Needs static pre-rendering solutions for SEO"]
      },
      backend: {
        stack: "Go (Fiber / Gin) or Node (Fastify)",
        details: "Statically typed Go compiled binaries run with less than 20MB of memory and can scale to handle millions of connections.",
        pros: ["Extreme execution speed", "Efficient multi-core CPU scheduling"],
        cons: ["More verbose code than TypeScript/Node", "Smaller package library ecosystem"]
      },
      database: {
        stack: "Managed PostgreSQL (RDS) + Redis Cache",
        details: "Primary robust ACID relational database, backed by Redis in-memory cache to handle repeated read operations.",
        pros: ["Protects primary database from high read stress", "Sub-millisecond cache responses"],
        cons: ["Risk of cache invalidation bugs", "Requires managing two database components"]
      },
      metrics: { devSpeed: 3, scalability: 5, maintenance: 3.5 },
      alternatives: [
        { stack: "Rust (Axum)", details: "Statically typed compiled backend with zero-cost abstractions.", whyConsider: "If you need absolute memory-safety and the lowest compute overhead possible." },
        { stack: "NestJS (TypeScript)", details: "Structured backend using fast decorators.", whyConsider: "If your team needs structure and prefers staying in Node.js instead of Go." }
      ]
    },
    ai: {
      whyItFits: "This combination connects a highly interactive frontend layout with a backend structured for heavy model processing, semantic search, and streaming responses.",
      frontend: {
        stack: "Next.js + Tailwind CSS",
        details: "Includes support for streaming AI text responses via Server-Sent Events (SSE) and Vercel AI SDK integration.",
        pros: ["Built-in edge route capabilities", "Supports streaming layouts"],
        cons: ["Markdown conversion complexity on UI", "Needs edge-safe libraries"]
      },
      backend: {
        stack: "Python (FastAPI)",
        details: "FastAPI is the developer standard for deploying machine learning pipelines, OpenAI orchestrations, and PyTorch models.",
        pros: ["Native compatibility with all major AI packages", "Asynchronous endpoints with auto-documented API schemas"],
        cons: ["Slower raw compute than Go/Rust", "Python's global interpreter lock (GIL)"]
      },
      database: {
        stack: "PostgreSQL with pgvector extension",
        details: "Saves embeddings directly inside a relational schema to enable hybrid SQL querying and similarity lookups.",
        pros: ["No need to sync external vector databases", "Standard relational joins on vector records"],
        cons: ["Vector indexes (HNSW) require substantial RAM", "High database scaling complexity"]
      },
      metrics: { devSpeed: 4, scalability: 4, maintenance: 3 },
      alternatives: [
        { stack: "Pinecone / Qdrant", details: "Dedicated SaaS vector search databases.", whyConsider: "If you are processing multi-million vector libraries that exceed server memory." },
        { stack: "Node.js + LangChainJS", details: "An AI orchestration backend written in TypeScript.", whyConsider: "If your AI features are simple API calls to third-party endpoints without custom models." }
      ]
    },
    ui: {
      whyItFits: "Optimized for highly immersive SaaS applications that require fluid transitions, hardware-accelerated animations, and real-time interface sync.",
      frontend: {
        stack: "Next.js + Framer Motion",
        details: "Uses Next.js routing combined with Framer Motion layout animations for fluid page transitions and interactive widgets.",
        pros: ["Hardware-accelerated layouts", "Easy scroll animations and exit states"],
        cons: ["Larger client JavaScript bundle sizes", "Heavy animations can drain mobile batteries"]
      },
      backend: {
        stack: "Node.js (Express + Socket.io)",
        details: "Event-driven asynchronous backend that maintains persistent WebSocket channels for instant UI updates.",
        pros: ["High WebSocket concurrency", "Extremely fast JSON processing"],
        cons: ["Single CPU thread blocks under complex math", "Can lead to unstructured code blocks"]
      },
      database: {
        stack: "MongoDB",
        details: "Document-oriented database that stores interface states, customizable widgets, and settings as pure JSON.",
        pros: ["Flexible schema matches frontend state objects", "Fast reads without complex SQL table joins"],
        cons: ["No built-in strict relations", "Aggregation queries can consume high CPU"]
      },
      metrics: { devSpeed: 4.5, scalability: 3.5, maintenance: 2 },
      alternatives: [
        { stack: "SvelteKit", details: "Compile-time framework with built-in styling and animations.", whyConsider: "If you want incredibly small bundle sizes and reactive state out-of-the-box." },
        { stack: "React Three Fiber", details: "Three.js React wrapper for canvas 3D rendering.", whyConsider: "If your app needs immersive 3D graphics or data visualizations." }
      ]
    }
  },
  mobile: {
    speed: {
      whyItFits: "Expo lets you build a single cross-platform application codebase using React Native, reducing time-to-market by half compared to separate native builds.",
      frontend: {
        stack: "React Native + Expo",
        details: "Stretched cross-platform UI with access to native APIs via Expo SDK. Compiles to native iOS and Android components.",
        pros: ["90%+ shared code between iOS and Android", "Over-the-air updates bypass app store waits for bug fixes"],
        cons: ["Limited native module customization", "Larger compiled binary footprint"]
      },
      backend: {
        stack: "Node.js (Express / Fastify)",
        details: "Lightweight JSON API backend responding to network queries from the mobile application.",
        pros: ["Fast to spin up and iterate", "Shares type definitions with React Native"],
        cons: ["No automatic persistence sync out-of-the-box", "Relies heavily on client connection strength"]
      },
      database: {
        stack: "PostgreSQL (Supabase)",
        details: "Managed database with instant REST APIs automatically generated from tables, ideal for fast mobile integration.",
        pros: ["Instant API endpoints", "Robust user authentication integration"],
        cons: ["Requires database connection logic", "Vulnerable to poorly optimized queries"]
      },
      metrics: { devSpeed: 4.5, scalability: 3.5, maintenance: 2 },
      alternatives: [
        { stack: "Flutter + Firebase", details: "Dart-based mobile framework with Google's managed serverless backend.", whyConsider: "If you need customized, canvas-rendered layouts with zero backend setup." },
        { stack: "Kotlin Multiplatform (KMP)", details: "Shares core logic while writing native swift/kotlin interfaces.", whyConsider: "If native performance is critical but you still want shared core structures." }
      ]
    },
    scale: {
      whyItFits: "Designed for high-traffic mobile apps where database reads must remain sub-millisecond and backend infrastructure is built to scale horizontally.",
      frontend: {
        stack: "React Native / Expo (Optimized)",
        details: "React Native optimized with native performance loops, virtualized lists, and locally cached layouts.",
        pros: ["Great performance on mid-tier hardware", "Fast render loops using native thread bridges"],
        cons: ["Requires complex asset lazy loading", "Harder to optimize than pure native code"]
      },
      backend: {
        stack: "Go (Fiber) + Redis",
        details: "Backend services compiled to binary, managing incoming API requests and session tokens in high-speed caching layers.",
        pros: ["Extremely low API latency", "Handles high traffic spikes without scaling servers"],
        cons: ["Longer development cycles", "Manual database serialization setup"]
      },
      database: {
        stack: "PostgreSQL (RDS Cluster) + Redis",
        details: "Managed relational database with read replicas to separate write load from read query traffic.",
        pros: ["Easily handles millions of active sessions", "High availability with automatic failover"],
        cons: ["High operational overhead", "Requires strict database migration scripts"]
      },
      metrics: { devSpeed: 2.5, scalability: 5, maintenance: 4 },
      alternatives: [
        { stack: "Native Swift & Kotlin", details: "Building two separate applications for iOS and Android.", whyConsider: "If you need maximum device frame rates, complex background syncs, or custom watch integrations." },
        { stack: "Java Spring Boot / PostgreSQL", details: "Enterprise-grade robust backend.", whyConsider: "If you need complex multi-service transactional processes." }
      ]
    },
    ai: {
      whyItFits: "Ideal for mobile apps that process AI requests, use vector databases, or run local vector operations to conserve battery and server costs.",
      frontend: {
        stack: "React Native + Local SQLite Cache",
        details: "Local SQLite database to cache AI outputs, user history, and vectors for seamless offline-capable reading.",
        pros: ["Offline availability of app features", "Fast local responsiveness"],
        cons: ["Requires background sync protocols", "Local database encryption is required"]
      },
      backend: {
        stack: "Python (FastAPI)",
        details: "High-performance API layer serving as a wrapper around vector databases and LLM providers.",
        pros: ["Unified AI toolchains", "Fast integration with AI model libraries"],
        cons: ["Slower API throughput than Go backend", "Heavy memory usage on server functions"]
      },
      database: {
        stack: "PostgreSQL (pgvector) + Pinecone",
        details: "A hybrid approach using relational tables for user info and external vector indices for semantic recommendation loops.",
        pros: ["Scales to millions of embedding documents", "Keeps mobile database light by running searches in cloud"],
        cons: ["Depends heavily on network connectivity", "Double database synchronization complexity"]
      },
      metrics: { devSpeed: 3.5, scalability: 4, maintenance: 3 },
      alternatives: [
        { stack: "TensorFlow Lite (On-device)", details: "Run neural networks locally on the user's mobile device GPU/NPU.", whyConsider: "If you need offline-first AI tasks like camera filter calculations or local audio translation." },
        { stack: "Node.js (LangChain Express)", details: "AI routing backend in Node.", whyConsider: "If your app only acts as a simple prompt client to OpenAI." }
      ]
    },
    ui: {
      whyItFits: "This combination ensures fluid 60fps animations and micro-interactions, vital for premium consumer-facing mobile applications.",
      frontend: {
        stack: "React Native + Reanimated & Skia",
        details: "Framer-like native thread execution with Reanimated. Hardware-accelerated vector drawing using React Native Skia.",
        pros: ["Runs complex animations at 60fps on UI thread", "Rich gesture tracking and physical animations"],
        cons: ["Debugging animations across iOS and Android is challenging", "Requires deep layout rendering knowledge"]
      },
      backend: {
        stack: "Node.js (Socket.io WebSocket Server)",
        details: "Asynchronous backend that pushes real-time notifications, chat messages, or UI states directly to active mobile devices.",
        pros: ["Instant data pushes", "Lower network overhead than REST polling"],
        cons: ["Needs fallback protocols for poor mobile network signals", "Increases battery consumption of client device"]
      },
      database: {
        stack: "MongoDB or PostgreSQL",
        details: "Stores dynamic content feeds, media URLs, and layout templates with fast retrieval schemas.",
        pros: ["Flexible feed architectures", "Fast JSON serialization"],
        cons: ["Requires asset compression optimizations", "No relational mapping for MongoDB configurations"]
      },
      metrics: { devSpeed: 3.5, scalability: 4, maintenance: 2.5 },
      alternatives: [
        { stack: "Flutter", details: "Dart UI framework utilizing its own high-performance rendering engine.", whyConsider: "If you need pixel-perfect designs that look identical on all devices with high-performance animations." },
        { stack: "SwiftUI & Jetpack Compose", details: "Native declarative UI frameworks.", whyConsider: "If you want pure native layout performance and OS integration." }
      ]
    }
  },
  ecommerce: {
    speed: {
      whyItFits: "For e-commerce, speed-to-market is achieved by utilizing pre-built storefront tools connected to a robust, globally edge-routed serverless frontend.",
      frontend: {
        stack: "Next.js Commerce + Tailwind CSS",
        details: "Next.js template configured out-of-the-box for carts, product grids, search filters, and static generation.",
        pros: ["Saves weeks of frontend setup", "Optimized Core Web Vitals for better Google SEO rankings"],
        cons: ["Strict template structure takes effort to customize", "Vercel edge functions have memory limits"]
      },
      backend: {
        stack: "MedusaJS or Shopify API",
        details: "Headless commerce backend providing fully functional order management, discount engines, and checkout systems.",
        pros: ["Fully integrated payment gateway configurations", "Dramatically reduces custom checkout coding errors"],
        cons: ["Subject to Shopify platform costs / Medusa architecture overhead", "Requires sync plugins"]
      },
      database: {
        stack: "Managed PostgreSQL (via Supabase)",
        details: "Relational database used for custom user accounts, catalog details, and session data.",
        pros: ["Highly structured transaction history", "Reliable relational data models"],
        cons: ["Requires database maintenance", "Can lock tables under high traffic write spikes"]
      },
      metrics: { devSpeed: 5, scalability: 4, maintenance: 1.5 },
      alternatives: [
        { stack: "WooCommerce / WordPress", details: "CMS-first commerce setup.", whyConsider: "If you are launching a simple content blog that needs basic transactional plugins." },
        { stack: "Payload CMS + Next.js", details: "Highly customizable headless CMS with local shopping modules.", whyConsider: "If you need bespoke editorial marketing content combined with custom shopping structures." }
      ]
    },
    scale: {
      whyItFits: "For high-volume commerce, separating catalog browsing (highly cacheable) from inventory mutations and checkout protects the main database from crash risks.",
      frontend: {
        stack: "Next.js (Static Pages with ISR)",
        details: "Pages are pre-rendered at build time. Incremental Static Regeneration (ISR) updates product details in the background as prices change.",
        pros: ["Handles millions of concurrent shoppers without database load", "Static page load speed increases checkout conversion rates"],
        cons: ["Short cache delay for product availability updates", "ISR builds require reliable build webhooks"]
      },
      backend: {
        stack: "Go Microservices",
        details: "Go microservices isolate complex functions (e.g. search, inventory check, payment processing, tax calculation) into scalable containers.",
        pros: ["Isolates single points of failure", "Low container resources keeps hosting bills cheap"],
        cons: ["High API communication complexity", "Requires strict distributed tracing setup"]
      },
      database: {
        stack: "PostgreSQL (Orders) + MongoDB (Catalog)",
        details: "SQL database for secure transactional order ledgers, and document-oriented MongoDB for flexible product variants and attribute descriptions.",
        pros: ["Variant schemas match MongoDB easily", "ACID compliance for order tracking"],
        cons: ["Requires writing data synchronization layers", "Twice the database backups to manage"]
      },
      metrics: { devSpeed: 2.5, scalability: 5, maintenance: 4.5 },
      alternatives: [
        { stack: "Java Spring Boot Microservices", details: "Enterprise-standard OOP architecture.", whyConsider: "If you are integrating with complex legacy ERP (SAP, Oracle) backend software." },
        { stack: "Node.js (NestJS microservices)", details: "A structured TS alternative.", whyConsider: "If you want isolated microservices but want to write JavaScript exclusively." }
      ]
    },
    ai: {
      whyItFits: "Integrates AI features like visual image search, conversational shopping assistants, and personalized recommended product feeds.",
      frontend: {
        stack: "Next.js + React",
        details: "Client interface configured to render conversational shopping widgets and visual recommendation blocks.",
        pros: ["Supports fast layout updates", "Smooth rendering of complex grids"],
        cons: ["Requires styling complex AI modal interfaces", "JavaScript load overhead"]
      },
      backend: {
        stack: "Python (FastAPI) + Node.js (Orchestration)",
        details: "Python API analyzes catalog metrics to run collaborative recommendation filtering, while Node handles payments and user orders.",
        pros: ["Combines Python AI strength with Node business logic", "Robust and fast async endpoints"],
        cons: ["Requires managing two separate server runtimes", "Slightly complex deployment pipeline"]
      },
      database: {
        stack: "PostgreSQL + Pinecone (Vector Catalog)",
        details: "Primary order database paired with a vector search database containing product images and text embeddings.",
        pros: ["Accurate visual similarity searches (e.g. 'find similar items')", "Highly personalized search results"],
        cons: ["Complex synchronization logic to update vector db when stock changes", "Pinecone pricing is high"]
      },
      metrics: { devSpeed: 3.5, scalability: 4.5, maintenance: 3.5 },
      alternatives: [
        { stack: "Algolia Search AI", details: "SaaS AI search engine integration.", whyConsider: "If you want instant setup of AI search and recommendations without writing custom Python logic." },
        { stack: "ElasticSearch / OpenSearch", details: "Self-hosted rich search cluster.", whyConsider: "If you have a massive budget and need deep custom text analysis logic." }
      ]
    },
    ui: {
      whyItFits: "Aesthetically outstanding storefront designed to engage consumers with immersive interactive product viewers, fluid shopping bag transitions, and animated checkouts.",
      frontend: {
        stack: "Next.js / Vite + Framer Motion & Spline",
        details: "Vite for fast updates, Framer Motion for interactive cart sweeps, and Spline for embedding 3D models of retail products.",
        pros: ["Stunning interactive experience increases buyer duration", "Smooth layout changes feel like a premium application"],
        cons: ["3D rendering drops mobile frame rates on old devices", "Longer loading times for media files"]
      },
      backend: {
        stack: "Node.js (Express)",
        details: "Single API gateway orchestrating checkout states, product listings, and cart syncing.",
        pros: ["Minimal boilerplate", "Extremely fast JSON transfers"],
        cons: ["Single-threaded backend blocks under heavy calculations", "Prone to spaghetti structures if unmonitored"]
      },
      database: {
        stack: "PostgreSQL",
        details: "Reliable database structure to track order flows and cart items dynamically.",
        pros: ["Relational constraints prevent invalid carts", "Easy transactions"],
        cons: ["Requires schema updates for custom variables", "Needs caching layers for catalog pages"]
      },
      metrics: { devSpeed: 4, scalability: 4, maintenance: 2.5 },
      alternatives: [
        { stack: "Astro + Framer Motion", details: "Islands architecture framework.", whyConsider: "If your store has mostly static content and you want to load animations only when visible." },
        { stack: "Web3/Solana Payment checkout integrations", details: "Decentralized transactional layers.", whyConsider: "If building custom blockchain-based visual assets or digital items store." }
      ]
    }
  },
  marketing: {
    speed: {
      whyItFits: "Marketing sites require excellent page speed, high SEO indexability, and fast content updates. An Astro/Next.js static site generator is the ideal choice.",
      frontend: {
        stack: "Astro or Next.js (Static Export)",
        details: "Builds site pages into static HTML files that load instantly from CDNs, scoring 100/100 on Google PageSpeed Insights.",
        pros: ["Blazing fast load speed", "Exceptional SEO crawlers parsing pure HTML"],
        cons: ["Static generation requires rebuilding when content changes", "Dynamic forms require external serverless API handlers"]
      },
      backend: {
        stack: "Headless CMS (Sanity / Decap)",
        details: "Content Management System providing marketing teams with a visual editor, firing webhooks to trigger site rebuilds on content changes.",
        pros: ["Zero server code to maintain", "Non-technical users can update copy and images directly"],
        cons: ["Small CMS learning curve for editor setup", "Delay between pressing 'Publish' and static site build"]
      },
      database: {
        stack: "Static JSON Files / Cloudflare KV",
        details: "Data is saved locally as markdown/JSON or cached in Cloudflare key-value storages.",
        pros: ["Zero database maintenance", "Zero SQL injection security risks"],
        cons: ["Not designed for complex relation searches", "Requires redeploy for data modifications"]
      },
      metrics: { devSpeed: 5, scalability: 5, maintenance: 1 },
      alternatives: [
        { stack: "Webflow", details: "No-code visual page builder.", whyConsider: "If your client requires complete design control of styles without writing CSS code." },
        { stack: "WordPress + Tailwind", details: "CMS powerhouse.", whyConsider: "If your marketing team refuses to use headless CMS systems." }
      ]
    },
    scale: {
      whyItFits: "Designed for massive viral campaigns and product launches where traffic spikes from zero to millions of visitors in seconds.",
      frontend: {
        stack: "Astro + Tailwind CSS",
        details: "Static pages with zero client-side JavaScript by default (Islands Architecture), ensuring immediate hydration.",
        pros: ["Lowest possible bandwidth consumption", "Ultra-stable during massive server traffic spikes"],
        cons: ["Completely static; dynamic sections require custom JS blocks", "Complex build phases under massive page numbers"]
      },
      backend: {
        stack: "Cloudflare Workers (Serverless)",
        details: "Ultra-fast microservices running at Cloudflare's network edge with zero cold start delays.",
        pros: ["Lowest response latency in the industry", "Costs pennies to run millions of operations"],
        cons: ["Limited runtime execution duration limit (50ms CPU time)", "Restricted package support compared to Node"]
      },
      database: {
        stack: "Cloudflare D1 / KV Cache",
        details: "Distributed global databases containing site states, cached articles, and form submissions.",
        pros: ["Globally distributed data mirrors client locations", "Incredible performance scale"],
        cons: ["No complex relational features in KV storage", "Eventual consistency model limits sync timing"]
      },
      metrics: { devSpeed: 4, scalability: 5, maintenance: 1.5 },
      alternatives: [
        { stack: "Next.js Static + AWS CloudFront", details: "Next.js builds hosted on Amazon Web Services CDN.", whyConsider: "If your company is already locked into the AWS cloud ecosystem." },
        { stack: "Node.js (Go backend) API", details: "Dedicated API server.", whyConsider: "If you need deep database queries on marketing data." }
      ]
    },
    ai: {
      whyItFits: "Enables marketing pages to personalize their copy, headings, and images based on visitor demographics or search context using AI models.",
      frontend: {
        stack: "Next.js (Edge Middleware)",
        details: "Vercel edge functions inspect incoming requests (country, device, search campaign) and serve personalized layouts in milliseconds.",
        pros: ["Server-side personalization without page flickers", "A/B testing running directly on network edge"],
        cons: ["Increases page response time slightly", "Complex cache configurations"]
      },
      backend: {
        stack: "Python (FastAPI) / Node.js",
        details: "A routing API that connects to OpenAI's GPT models to dynamically generate customized marketing pitches.",
        pros: ["Dynamic content variations", "Fast integrations with AI prompt tools"],
        cons: ["High API latency requires loading spinners", "Unpredictable AI copy outputs"]
      },
      database: {
        stack: "PostgreSQL + Redis (Personalization Cache)",
        details: "Relational database mapping user variations and caching them to avoid repeating AI queries.",
        pros: ["Saves OpenAI credit usage by caching responses", "Tracks user conversion metrics dynamically"],
        cons: ["Database caching sync maintenance", "High relational complexity"]
      },
      metrics: { devSpeed: 3.5, scalability: 4, maintenance: 3 },
      alternatives: [
        { stack: "Mutiny AI / Optimizely", details: "No-code managed personalization platforms.", whyConsider: "If you want premium A/B testing and AI variations without coding edge scripts." },
        { stack: "Static Site + Local Storage AI", details: "Client-side personalization.", whyConsider: "If you want to keep the site static and personalize only via client JS." }
      ]
    },
    ui: {
      whyItFits: "Designed for award-winning marketing campaigns requiring complex scroll-triggered storytelling animations, WebGL layouts, and premium graphics.",
      frontend: {
        stack: "Astro / Next.js + GSAP (GreenSock) & Canvas",
        details: "Industry standard animation libraries for pixel-perfect scroll-linked effects, SVG drawing, and interactive elements.",
        pros: ["Superb cross-browser performance", "Highly customizable timeline animations"],
        cons: ["Requires high styling effort", "Can cause mobile layout performance issues if unoptimized"]
      },
      backend: {
        stack: "Static Files (Zero Backend)",
        details: "Since layouts are purely visual, all content compiles to static hosting nodes.",
        pros: ["No server bills or maintenance", "100% hacker-proof website"],
        cons: ["No dynamic databases", "Content updates require code changes"]
      },
      database: {
        stack: "Markdown / Git-based CMS",
        details: "Content is saved directly inside the code repository as markdown files, compiled during deploy phases.",
        pros: ["Perfect history tracking with Git", "No database to configure"],
        cons: ["Non-technical writers must learn basic Markdown", "Build delays for content changes"]
      },
      metrics: { devSpeed: 3.5, scalability: 5, maintenance: 1.2 },
      alternatives: [
        { stack: "Spline 3D + React", details: "Spline 3D tools directly embedded.", whyConsider: "If you need heavy interactive 3D objects with hover animations." },
        { stack: "Lottie Files + Tailwind CSS", details: "Vector animations rendered via JSON files.", whyConsider: "If you have an animator providing pre-built vector animations." }
      ]
    }
  }
};

export function TechStackMatcher({ onContact }: { onContact: (prefillText?: string) => void }) {
  const [projectType, setProjectType] = useState<ProjectType>("saas");
  const [priority, setPriority] = useState<Priority>("speed");
  const [hosting, setHosting] = useState<Hosting>("serverless");
  const [activeTab, setActiveTab] = useState<"layers" | "tradeoffs" | "metrics">("layers");

  const recommendation = recommendations[projectType][priority];

  const getHostingDetails = () => {
    switch (hosting) {
      case "serverless":
        return {
          title: "Serverless (Vercel/Netlify) + Managed DB",
          desc: "Your frontend renders at the global edge. Database is managed, handling connection scaling automatically. Perfect for zero operational overhead.",
          pros: ["Zero server management", "Automatic scaling to millions of reads", "Global CDN performance"],
          cons: ["Cold starts on low-traffic endpoints", "Database connection limits (requires pooling proxies)"]
        };
      case "vps":
        return {
          title: "Hetzner / DigitalOcean + Docker Containers",
          desc: "Application components are packaged into Docker containers and run on independent virtual private servers. Highly cost-effective and flexible.",
          pros: ["Predictable flat monthly pricing", "Full root OS access", "Run database & backend on the same node"],
          cons: ["Manual firewall and SSL renewals", "No automated multi-region replication"]
        };
      case "cloud":
        return {
          title: "Enterprise Cloud (AWS ECS / Azure Fargate)",
          desc: "Microservices deployed into isolated VPC environments behind an Application Load Balancer (ALB). Fully compliant and secure.",
          pros: ["Complete network security isolating databases", "PCI-DSS / HIPAA compliance configurations possible", "Automated container failovers"],
          cons: ["High AWS configuration complexity", "Highest pricing structures"]
        };
    }
  };

  const hostingDetails = getHostingDetails();

  const handleConsultClick = () => {
    const selectedType = projectTypes.find(t => t.id === projectType)?.label || "Custom App";
    const selectedPriority = priorities.find(p => p.id === priority)?.label || "Performance";
    const selectedHosting = hostings.find(h => h.id === hosting)?.label || "Managed Cloud";

    const prefillText = `I am interested in discussing an architecture setup for my project.
- Project Type: ${selectedType}
- Focus Priority: ${selectedPriority}
- Hosting Preference: ${selectedHosting}

Let's review the trade-offs of this stack and outline custom alternatives for my requirements.\n`;
    
    onContact(prefillText);
  };

  return (
    <div className="bg-surface border border-foreground/10 rounded-3xl p-6 md:p-8 w-full shadow-2xl relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-electricPurple/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-electricPurple/10 transition-colors duration-700" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-neonCyan/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-neonCyan/10 transition-colors duration-700" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="p-3 bg-foreground/5 rounded-xl border border-foreground/10">
          <Wrench className="w-6 h-6 text-blue-600 dark:text-neonCyan" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">Interactive Tech Stack Matcher</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Configure your application parameters to generate a realistic, unbiased architecture analysis.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Column: Interactive Wizard Selector */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Step 1: Project Type */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-mono">1. Choose Platform</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projectTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = projectType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setProjectType(type.id as ProjectType)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                      isSelected
                        ? "bg-neonCyan/10 border-neonCyan/50 shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                        : "bg-foreground/5 border-foreground/10 hover:border-foreground/20 hover:bg-foreground/[0.07]"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-neonCyan" : "text-zinc-500"}`} />
                      <span className={`text-sm font-bold ${isSelected ? "text-foreground" : "text-zinc-700 dark:text-zinc-300"}`}>{type.label}</span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">{type.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Priorities */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-mono">2. Core Priority</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {priorities.map((p) => {
                const Icon = p.icon;
                const isSelected = priority === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPriority(p.id as Priority)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                      isSelected
                        ? "bg-electricPurple/10 border-electricPurple/50 shadow-[0_0_15px_rgba(138,43,226,0.1)]"
                        : "bg-foreground/5 border-foreground/10 hover:border-foreground/20 hover:bg-foreground/[0.07]"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-electricPurple" : "text-zinc-500"}`} />
                      <span className={`text-sm font-bold ${isSelected ? "text-foreground" : "text-zinc-700 dark:text-zinc-300"}`}>{p.label}</span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">{p.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Hosting Preference */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-mono">3. Infrastructure Preference</span>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {hostings.map((h) => {
                const isSelected = hosting === h.id;
                return (
                  <button
                    key={h.id}
                    onClick={() => setHosting(h.id as Hosting)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-blue-600/10 border-blue-600/50"
                        : "bg-foreground/5 border-foreground/10 hover:border-foreground/25 hover:bg-foreground/[0.07]"
                    }`}
                  >
                    <div>
                      <span className={`text-sm font-bold block ${isSelected ? "text-foreground" : "text-zinc-700 dark:text-zinc-300"}`}>{h.label}</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 block leading-normal">{h.description}</span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                      isSelected ? "border-blue-600 dark:border-neonCyan bg-blue-600 dark:bg-neonCyan" : "border-zinc-500"
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white dark:bg-zinc-950" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Dynamics Analysis Output */}
        <div className="lg:col-span-6 w-full lg:sticky lg:top-24">
          <div className="bg-surfaceBorder/30 border border-foreground/5 rounded-3xl p-6 sm:p-7 flex flex-col h-full text-left">
            
            {/* Header section of recommendation */}
            <div className="mb-5 pb-5 border-b border-foreground/10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-neonCyan uppercase tracking-wider mb-2 font-mono">
                Consulting Analysis Output
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed italic">
                "{recommendation.whyItFits}"
              </p>
            </div>

            {/* Tabs Controller */}
            <div className="flex border-b border-foreground/10 mb-6 gap-2">
              <button
                onClick={() => setActiveTab("layers")}
                className={`pb-3 text-sm font-bold relative transition-colors cursor-pointer ${
                  activeTab === "layers" ? "text-foreground font-semibold" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                Architecture Layers
                {activeTab === "layers" && (
                  <motion.div layoutId="matcherTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-neonCyan" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("tradeoffs")}
                className={`pb-3 text-sm font-bold relative transition-colors cursor-pointer ${
                  activeTab === "tradeoffs" ? "text-foreground font-semibold" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                Trade-offs & Alts
                {activeTab === "tradeoffs" && (
                  <motion.div layoutId="matcherTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-electricPurple" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("metrics")}
                className={`pb-3 text-sm font-bold relative transition-colors cursor-pointer ${
                  activeTab === "metrics" ? "text-foreground font-semibold" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                Engineering Metrics
                {activeTab === "metrics" && (
                  <motion.div layoutId="matcherTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
                )}
              </button>
            </div>

            {/* Tab contents */}
            <div className="flex-1 min-h-[300px]">
              <AnimatePresence mode="wait">
                {activeTab === "layers" && (
                  <motion.div
                    key="layers"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-4"
                  >
                    {/* Layer: Frontend */}
                    <div className="bg-foreground/[0.02] dark:bg-zinc-950/20 border border-foreground/5 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <LayoutTemplate className="w-4 h-4 text-zinc-500" />
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Frontend Library</span>
                      </div>
                      <h4 className="text-base font-bold text-blue-600 dark:text-neonCyan">{recommendation.frontend.stack}</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-normal">{recommendation.frontend.details}</p>
                    </div>

                    {/* Layer: Backend */}
                    <div className="bg-foreground/[0.02] dark:bg-zinc-950/20 border border-foreground/5 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Server className="w-4 h-4 text-zinc-500" />
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Backend Engine</span>
                      </div>
                      <h4 className="text-base font-bold text-purple-600 dark:text-electricPurple">{recommendation.backend.stack}</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-normal">{recommendation.backend.details}</p>
                    </div>

                    {/* Layer: Database */}
                    <div className="bg-foreground/[0.02] dark:bg-zinc-950/20 border border-foreground/5 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Layers3 className="w-4 h-4 text-zinc-500" />
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Database Layer</span>
                      </div>
                      <h4 className="text-base font-bold text-foreground font-semibold">{recommendation.database.stack}</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-normal">{recommendation.database.details}</p>
                    </div>

                    {/* Layer: Infrastructure */}
                    <div className="bg-blue-500/[0.03] dark:bg-blue-950/5 border border-blue-500/10 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <ShieldCheck className="w-4 h-4 text-blue-500" />
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Host & Deployment Integration</span>
                      </div>
                      <h4 className="text-sm font-bold text-foreground">{hostingDetails.title}</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-normal">{hostingDetails.desc}</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "tradeoffs" && (
                  <motion.div
                    key="tradeoffs"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-5"
                  >
                    {/* Unbiased Pros and Cons analysis */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-green-500/[0.03] border border-green-500/10 rounded-2xl p-4">
                        <h4 className="text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-1.5 uppercase tracking-wide mb-2 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Core Advantages
                        </h4>
                        <ul className="space-y-1.5">
                          {[
                            ...recommendation.frontend.pros,
                            ...recommendation.backend.pros,
                            ...hostingDetails.pros.slice(0, 1)
                          ].map((pro, index) => (
                            <li key={index} className="text-xs text-zinc-600 dark:text-zinc-300 flex items-start gap-1.5 leading-normal">
                              <span className="text-green-500 shrink-0 mt-0.5">•</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-red-500/[0.03] border border-red-500/10 rounded-2xl p-4">
                        <h4 className="text-xs font-bold text-red-500 flex items-center gap-1.5 uppercase tracking-wide mb-2 font-mono">
                          <XCircle className="w-3.5 h-3.5" /> Honest Trade-offs
                        </h4>
                        <ul className="space-y-1.5">
                          {[
                            ...recommendation.frontend.cons,
                            ...recommendation.backend.cons,
                            ...hostingDetails.cons.slice(0, 1)
                          ].map((con, index) => (
                            <li key={index} className="text-xs text-zinc-600 dark:text-zinc-300 flex items-start gap-1.5 leading-normal">
                              <span className="text-red-400 shrink-0 mt-0.5">•</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Unbiased alternatives */}
                    <div className="bg-foreground/[0.02] dark:bg-zinc-950/20 border border-foreground/5 rounded-2xl p-4">
                      <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5 uppercase tracking-wide mb-3 font-mono">
                        <Info className="w-3.5 h-3.5 text-zinc-400" /> Unbiased Alternative Paths
                      </h4>
                      <div className="space-y-3.5">
                        {recommendation.alternatives.map((alt, index) => (
                          <div key={index} className="border-l-2 border-foreground/10 pl-3">
                            <span className="text-xs font-bold text-foreground block">{alt.stack}</span>
                            <span className="text-[11px] text-zinc-400 block leading-tight mt-0.5">{alt.details}</span>
                            <span className="text-[11px] text-blue-600 dark:text-neonCyan font-medium block mt-1">
                              👉 Choose instead: {alt.whyConsider}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "metrics" && (
                  <motion.div
                    key="metrics"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-6"
                  >
                    {/* Metric 1: Dev Speed */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-foreground">Speed of Development</span>
                        <span className="font-mono text-zinc-500">{recommendation.metrics.devSpeed} / 5</span>
                      </div>
                      <div className="w-full bg-foreground/10 rounded-full h-2">
                        <motion.div 
                          className="bg-blue-600 dark:bg-neonCyan h-full rounded-full" 
                          initial={{ width: 0 }}
                          animate={{ width: `${(recommendation.metrics.devSpeed / 5) * 100}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1 leading-normal">
                        Higher scores indicate rapid iterations, rich package frameworks, and shorter time-to-market.
                      </p>
                    </div>

                    {/* Metric 2: Scalability */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-foreground">Scalability Potential</span>
                        <span className="font-mono text-zinc-500">{recommendation.metrics.scalability} / 5</span>
                      </div>
                      <div className="w-full bg-foreground/10 rounded-full h-2">
                        <motion.div 
                          className="bg-purple-600 dark:bg-electricPurple h-full rounded-full" 
                          initial={{ width: 0 }}
                          animate={{ width: `${(recommendation.metrics.scalability / 5) * 100}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1 leading-normal">
                        Measures concurrency support, efficient CPU management, and dynamic caching configurations under load.
                      </p>
                    </div>

                    {/* Metric 3: Maintenance */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-foreground">Ops & Maintenance Overhead</span>
                        <span className="font-mono text-zinc-500">{recommendation.metrics.maintenance} / 5</span>
                      </div>
                      <div className="w-full bg-foreground/10 rounded-full h-2">
                        <motion.div 
                          className="bg-emerald-500 h-full rounded-full" 
                          initial={{ width: 0 }}
                          animate={{ width: `${(recommendation.metrics.maintenance / 5) * 100}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1 leading-normal">
                        Represents DevOps demands. A lower score means less server administration and lower hosting cost structures.
                      </p>
                    </div>

                    {/* Summary Callout */}
                    <div className="bg-foreground/[0.02] dark:bg-zinc-950/20 border border-foreground/5 rounded-2xl p-4 flex gap-3 items-start">
                      <Info className="w-4 h-4 text-blue-600 dark:text-neonCyan shrink-0 mt-0.5" />
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
                        <strong>Architecture Advice:</strong> Stacks are chosen based on industry standards, optimizing for trade-offs. No single stack fits all businesses; choosing Go over Node scales better but increases initial budget requirements.
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action CTA */}
            <div className="mt-8 pt-5 border-t border-foreground/10 flex flex-col gap-3">
              <button
                onClick={handleConsultClick}
                className="w-full py-4 px-6 bg-foreground text-background font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shadow-lg group/btn cursor-pointer text-sm"
              >
                Schedule Architecture Review
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
              <p className="text-[10px] text-center text-zinc-500">
                Generate a custom document analyzing this exact configuration for your business requirements.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

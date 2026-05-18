# 🛡️ Testers Forge

> An elite, universal, state-driven custom ROM testing checklist engine engineered for the Android development community.

![License: MIT](https://img.shields.io/badge/License-MIT-00E5FF.svg)
![Architecture: Decoupled 3-File](https://img.shields.io/badge/Architecture-3--File-10B981.svg)
![Platform: Cross-Platform Mobile](https://img.shields.io/badge/Platform-Mobile%20|%20Web-EF4444.svg)

**Testers Forge** bridges the communication gap between Android Custom ROM QA testers and device maintainers. It eliminates disorganized plaintext notes, replaced by a centralized, eye-pleasing, ultra-low-fatigue workspace optimized for both desktop pipelines and mobile environments.

---

## ⚡ Key Engineering Features

* **Decoupled 3-File Architecture:** Clean separation of concerns. Core UI (`index.html`), structural logic engine (`engine.js`), and baseline testing parameters (`checklist.js`) exist independently.
* **Dynamic Viewport Optimization (`100dvh`):** Engineered natively using Dynamic Viewport Heights and `safe-area-inset` styling to prevent mobile browser address bars (Chrome/Brave) from clipping critical layout controls.
* **Ergonomic Right-Aligned Touch Targets:** Designed for efficient field execution. Test parameters map to binary passing/failing circular states positioned on the right margin—optimized perfectly for rapid thumb inputs on phones and tablets.
* **Live DOM Schema Engine:** Full programmatic control over testing structures. Testers can dynamically append, delete, rename, and dynamically reorder categories using real-time array sorting workflows.
* **Local Caching Lifecycle:** Built-in state serialization. The application silently caches form metadata, testing state, and structural mutations to the browser's `localStorage` to safeguard testing progression across crashes or unexpected refreshes.
* **Compile-to-Markdown Pipeline:** Spits out highly structured, GitHub-native Markdown (`.md`) reports including prominence-sorted critical failure headers, tabular system summaries, and expandable debugging logs.

---

## 📂 Repository Layout

```text
testers-forge/
├── LICENSE             # Open-source MIT terms of distribution
├── README.md           # Documentation matrix (You are here)
├── index.html          # Core Viewport layer, layout grids, & Obsidian-Dark theme
├── engine.js           # State-machine, event-bus, dynamic DOM builder & export pipelines
└── checklist.js        # Factory default testing matrix array configuration

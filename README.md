# 🟦 Vanta SDK

**x402-native payments for APIs, agents, and apps**

---

![Status](https://img.shields.io/badge/status-public_beta-2563eb)
![HTTP](https://img.shields.io/badge/HTTP-402-black)
![Language](https://img.shields.io/badge/TypeScript-first-3178c6)
![License](https://img.shields.io/badge/license-MIT-22c55e)
![Builder](https://img.shields.io/badge/AI_Builder-free-16a34a)

---

> 🔵 **Vanta SDK** is a protocol-level monetization framework that enables developers to charge for APIs, agents, and services using **HTTP 402 (Payment Required)**.
>
> ❌ No payment processors  
> ❌ No subscriptions  
> ❌ No billing dashboards  
>
> ✅ **Native, machine-readable payments at the HTTP layer**

---

## 🧠 Overview

Vanta allows developers to enforce payments **exactly where access is enforced** — at the request boundary.

Instead of managing users, plans, invoices, or external billing infrastructure, Vanta embeds monetization directly into standard HTTP flows.

🧩 Designed for:
- APIs and developer platforms
- AI agents and autonomous tools
- Serverless and edge runtimes
- Internal service billing
- Headless infrastructure

---

## 🔑 Core Principle — HTTP 402

🟪 Vanta treats `402 Payment Required` as **infrastructure**, not an error.

Client → Request
Server → 402 Payment Challenge
Client → Resolve Payment
Server → Verify Receipt
Server → Grant Access

All payment state is exchanged programmatically via headers and signed receipts.

No redirects.  
No checkout pages.  
No UI flows.

---

## 💸 Programmatic Payments

🟢 Payments in Vanta are:

- Headless
- Deterministic
- Machine-verifiable
- UI-agnostic

Perfect for:
- APIs
- AI agents
- CLIs
- Automation pipelines
- Background jobs
- Internal platforms

---

## 🧾 Access Control & Metering

After payment, Vanta can issue:

- 🔐 Scoped access tokens
- 📊 Quota-based usage keys
- ⏱️ Time-bound credentials

Enables:
- Pay-per-request APIs
- Metered agent actions
- Usage-based pricing
- Dynamic rate limiting
- Revocable access

---

## ✨ Feature Overview

| Category        | Description |
|-----------------|-------------|
| 🧠 Protocol     | x402-native architecture |
| 🧑‍💻 DX        | TypeScript-first APIs |
| 🌐 Runtime     | Edge & serverless ready |
| 🧩 Middleware  | Express, Next.js, Workers |
| 💳 Payments    | Automatic 402 handling |
| 🔐 Security    | Receipt verification |
| 📊 Control     | Quotas & rate limits |
| ⚙️ Design      | Stateless by default |

---

## 🚀 Minimal Example

```ts
import { VantaMiddleware } from "@vanta/sdk";

app.use(
  "/api/premium",
  VantaMiddleware({
    price: "0.001",
    recipient: "0xYourWallet",
    network: "base",
  })
);
🔁 Clients automatically resolve 402 responses and retry once payment is completed.

📦 Common Use Cases
Use Case	Description
Paid APIs	Charge per request
AI Agents	Bill per tool or action
Paywalled Routes	Gate premium endpoints
Metered Services	Usage-based pricing
Internal Platforms	Cost attribution
Developer Tools	Headless monetization
🛠️ Vanta Builder (AI)

🟩 Vanta Builder is a free, browser-based AI workspace for real projects.

Capabilities:

Upload repositories or ZIPs

Create new projects from scratch

Generate, refactor, and patch code with AI

Apply changes directly to files

VS-Code-style editor layout

No vendor lock-in

The builder is optional and does not affect SDK usage.

🧪 Project Status

🟢 Public Beta

APIs and features may evolve as the protocol matures.

🛣️ Roadmap

Expanded framework adapters

Streaming & metered payments

Advanced receipt verification

Organization-level quotas

Builder enhancements

Extended documentation & recipes

🔐 Security Model

No client-side secrets

Signed payment receipts

Server-side verification

Stateless by default

Audit-friendly design

📘 Full details available in the whitepaper.

🧭 Philosophy

Payments should live at the protocol layer.

Vanta aligns monetization with HTTP semantics so developers can focus on building products, not billing systems.

📄 License

MIT License.

🔗 Links

Documentation
Builder
Whitepaper
Changelog
X (Twitter): https://x.com/Vantasdk

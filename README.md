<p align="center">
  <img src="https://raw.githubusercontent.com/YOUR_ORG/YOUR_REPO/main/public/brand/logo.png" width="72" />
</p>

<h1 align="center">Vanta SDK</h1>

<p align="center">
  <b>x402-native payments for APIs, agents, and apps</b>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/status-public%20beta-blue" /></a>
  <a href="#"><img src="https://img.shields.io/badge/license-MIT-green" /></a>
  <a href="#"><img src="https://img.shields.io/badge/typescript-first-3178c6" /></a>
  <a href="#"><img src="https://img.shields.io/badge/http-402-black" /></a>
</p>

---

> **Vanta SDK** enables developers to monetize APIs, agents, and services directly at the HTTP protocol layer using **HTTP 402 (Payment Required)**.
>
> No payment processors.  
> No subscriptions.  
> No billing dashboards.  
>
> Just **pure protocol-level payments**.

---

## ✨ What is Vanta?

Vanta is a developer-first SDK that turns **HTTP 402** into a first-class payment primitive.

Instead of building complex billing infrastructure, Vanta lets you:
- Enforce payments at the request level
- Charge per API call or agent action
- Issue access tokens and quotas programmatically
- Operate entirely headless (no UI required)

Vanta is built for **modern infrastructure**:
- APIs
- AI agents
- Serverless platforms
- Edge runtimes
- Developer tools

---

## 🧠 Core Concepts

### 🔑 HTTP 402 as Infrastructure

Vanta treats `402 Payment Required` as part of the protocol — not an error.

**Request flow:**

1. Client requests a protected resource  
2. Server responds with a **402 payment challenge**  
3. Client resolves payment  
4. Server verifies receipt  
5. Access is granted via token or quota  

All of this happens **inline via HTTP headers**.

---

### 💸 Programmatic Payments

Payments are:
- Machine-readable
- Header-based
- Fully automated

There are **no redirects**, **no checkout pages**, and **no accounts required**.

Perfect for:
- APIs
- CLIs
- Agents
- Automation pipelines
- Background jobs

---

### 🧾 Access Tokens & Metering

After payment, Vanta can issue:
- Scoped access tokens
- Quota-based usage keys
- Time-limited credentials

This enables:
- Per-request billing
- Metered usage
- Rate limits
- Access revocation

---

## 🚀 Features

- ⚡ x402-native architecture  
- 🧩 Middleware-first design  
- 🟦 TypeScript-first SDK  
- 🌐 Edge-ready  
- 🔁 Automatic 402 handling  
- 🔐 Receipt verification  
- 📊 Quotas & rate limits  
- 🔌 Framework adapters  
- 🧱 Clean, composable APIs  

---

## 🧪 Example

### Protect an API route with x402 payments

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
Clients automatically handle 402 responses and retry once payment is resolved.

🧰 Use Cases
Use Case	Description
Paid APIs	Charge per request
AI Agents	Bill per action or tool use
Paywalled Endpoints	Gate premium routes
Metered Services	Usage-based pricing
Internal Platforms	Cost attribution
Serverless Tools	No billing backend

🛠️ Vanta Builder (Preview)
Vanta includes a browser-based AI Builder:

🧠 Generate, refactor, and patch code using AI
📁 Upload or create projects
🧩 Apply changes directly to files
🖥️ VS-Code-style interface
⚙️ No vendor lock-in

The builder is designed to work with real projects, not demos.

📦 Status
🟢 Public Beta

APIs, naming, and features may evolve as the protocol matures.

🛣️ Roadmap
Expanded framework adapters

Advanced receipt verification

Streaming & metered payments

Organization-level quotas

Builder enhancements

Extended docs & recipes

🔐 Security
No client-side secrets

Signed payment receipts

Server-side verification

Stateless by default

Audit-friendly design

📄 See the Whitepaper for the full security model.

🧭 Philosophy
Payments should be part of the protocol — not an afterthought.

Vanta aligns monetization with HTTP semantics so developers can focus on building products, not billing systems.

📄 License
MIT License.

🔗 Links
📘 Documentation

📄 Whitepaper

🧾 Changelog

🧠 Builder

🐦 X (Twitter): https://x.com/Vantasdk

<p align="center"> <b>Vanta SDK</b><br/> Protocol-native payments for modern software </p> 

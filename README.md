# Vanta SDK

**x402-native payments for APIs, agents, and apps**

---

> **Vanta SDK** is a protocol-level monetization framework that enables developers to charge for APIs, agents, and services using **HTTP 402 (Payment Required)**.
>
> No payment processors  
> No subscriptions  
> No billing dashboards  
>
> Just **native, machine-readable payments enforced at the HTTP layer**.

---

## Overview

Vanta allows developers to enforce payments **exactly where access is enforced** — at the request boundary.

Instead of managing users, plans, invoices, or external billing infrastructure, Vanta embeds monetization directly into standard HTTP flows.

Vanta is designed for:
- APIs and developer platforms
- AI agents and autonomous tools
- Serverless and edge runtimes
- Internal service billing
- Headless infrastructure

---

## Core Principle

### HTTP 402 as Infrastructure

Vanta treats `402 Payment Required` as a **first-class protocol primitive**, not an error state.


All payment data is exchanged programmatically via headers and signed receipts.

There are:
- no redirects
- no checkout pages
- no UI dependencies

---

## Programmatic Payments

Payments in Vanta are:

- Headless
- Deterministic
- Machine-verifiable
- UI-agnostic

This makes Vanta suitable for:
- APIs
- AI agents
- CLIs
- Automation pipelines
- Background jobs
- Internal platforms

---

## Access Control & Metering

After payment, Vanta can issue:

- Scoped access tokens
- Quota-based usage keys
- Time-bound credentials

This enables:
- Pay-per-request APIs
- Metered agent actions
- Usage-based pricing
- Dynamic rate limiting
- Revocable access

---

## Feature Overview

| Category        | Description                          |
|-----------------|--------------------------------------|
| Protocol        | x402-native architecture              |
| Developer UX    | TypeScript-first APIs                 |
| Runtime         | Edge and serverless ready             |
| Middleware      | Express, Next.js, Workers             |
| Payments        | Automatic 402 handling                |
| Security        | Receipt verification                  |
| Control         | Quotas and rate limits                |
| Design          | Stateless by default                  |

---

## Minimal Example

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
Common Use Cases
Use Case	Description
Paid APIs	Charge per request
AI Agents	Bill per tool or action
Paywalled Routes	Gate premium endpoints
Metered Services	Usage-based pricing
Internal Platforms	Cost attribution
Developer Tools	Headless monetization
Vanta Builder (AI)

Vanta Builder is a free, browser-based AI workspace for real projects.

Capabilities:

Upload repositories or ZIPs

Create new projects from scratch

Generate, refactor, and patch code with AI

Apply changes directly to files

VS-Code-style editor layout

No vendor lock-in

The builder is optional and does not affect SDK usage.

Project Status

Public Beta

APIs and features may evolve as the protocol matures.

Roadmap

Expanded framework adapters

Streaming and metered payments

Advanced receipt verification

Organization-level quotas

Builder enhancements

Extended documentation and recipes

Security Model

No client-side secrets

Signed payment receipts

Server-side verification

Stateless by default

Audit-friendly design

Full security details are covered in the whitepaper.

Philosophy

Payments should live at the protocol layer.

Vanta aligns monetization with HTTP semantics so developers can focus on building products, not billing systems.

License

MIT License.

Links

Documentation
Builder
Whitepaper
Changelog
X (Twitter): https://x.com/Vantasdk

'use client'

import { DocsPage } from '@/components/docs/docs-page'
import { CodeBlock } from '@/components/mdx/code-tabs'

export default function FastAPIRecipePage() {
  return (
    <DocsPage title="FastAPI" description="Python FastAPI dependency injection for x402 payments.">
      <h2 id="basic">Basic Setup</h2>
      <CodeBlock filename="main.py">{`from fastapi import FastAPI, Depends, HTTPException
from vanta import VantaMiddleware, verify_payment

app = FastAPI()

async def require_payment(request: Request):
    auth = request.headers.get("Authorization")
    if not auth:
        raise HTTPException(
            status_code=402,
            headers={"WWW-Authenticate": f'x402 price="0.001" recipient="{WALLET}" network="base"'}
        )
    
    result = await verify_payment(auth, WALLET, "base")
    if not result.valid:
        raise HTTPException(status_code=403, detail=result.error)
    return result.payment

@app.get("/api/premium/data")
async def premium_data(payment = Depends(require_payment)):
    return {"data": "Premium content", "tx": payment.tx_hash}`}</CodeBlock>

      <h2 id="with-quotas">With Quota Management</h2>
      <CodeBlock filename="quotas.py">{`from vanta import QuotaManager

quotas = QuotaManager(redis_client)

async def require_quota(api_key: str = Header(...)):
    if not await quotas.check(api_key, 1):
        raise HTTPException(status_code=402, detail="Quota exceeded")
    return api_key

@app.post("/api/ai/complete")
async def complete(
    body: CompletionRequest,
    api_key: str = Depends(require_quota)
):
    result = await process(body)
    await quotas.deduct(api_key, result.tokens)
    return result`}</CodeBlock>
    </DocsPage>
  )
}

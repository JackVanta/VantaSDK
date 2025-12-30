'use client'
import { DocsPage } from '@/components/docs/docs-page'
import { CodeBlock } from '@/components/mdx/code-tabs'

export default function NginxRecipePage() {
  return (
    <DocsPage title="Nginx Reverse Proxy" description="Nginx configuration for payment gating.">
      <CodeBlock filename="nginx.conf">{`upstream vanta_verifier {
    server 127.0.0.1:8080;
}

server {
    listen 443 ssl;
    server_name api.example.com;
    
    location /api/premium/ {
        # Verify payment with Vanta service
        auth_request /auth/verify;
        auth_request_set $vanta_token $upstream_http_x_vanta_token;
        proxy_set_header X-Vanta-Token $vanta_token;
        
        proxy_pass http://backend;
    }
    
    location = /auth/verify {
        internal;
        proxy_pass http://vanta_verifier/verify;
        proxy_pass_request_body off;
        proxy_set_header Content-Length "";
        proxy_set_header X-Original-URI $request_uri;
        proxy_set_header Authorization $http_authorization;
    }
}`}</CodeBlock>
      <p>Run a Vanta verification service on port 8080 to handle auth_request callbacks.</p>
    </DocsPage>
  )
}

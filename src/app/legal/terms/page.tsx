import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms of Service', description: 'Vanta SDK Terms of Service.' }

export default function TermsPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto prose-docs">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: December 2024</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>By using Vanta SDK (&quot;the Software&quot;), you agree to these terms. If you do not agree, do not use the Software.</p>
        
        <h2>2. License</h2>
        <p>Vanta SDK is licensed under the MIT License. You may use, copy, modify, and distribute the Software subject to the license terms.</p>
        
        <h2>3. Disclaimer of Warranties</h2>
        <p>THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. We do not guarantee the Software will be error-free or uninterrupted.</p>
        
        <h2>4. Limitation of Liability</h2>
        <p>In no event shall the authors or copyright holders be liable for any claim, damages, or other liability arising from the use of the Software.</p>
        
        <h2>5. Blockchain Transactions</h2>
        <p>You acknowledge that blockchain transactions are irreversible. Vanta SDK does not custody funds or have the ability to reverse transactions.</p>
        
        <h2>6. Your Responsibilities</h2>
        <p>You are responsible for securing your private keys, complying with applicable laws, and properly testing integrations before production use.</p>
        
        <h2>7. Changes to Terms</h2>
        <p>We may update these terms. Continued use of the Software constitutes acceptance of updated terms.</p>
        
        <h2>8. Contact</h2>
        <p>Questions about these terms? Contact legal@vantasdk.dev</p>
      </div>
    </div>
  )
}

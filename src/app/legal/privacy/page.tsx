import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy', description: 'Vanta SDK Privacy Policy.' }

export default function PrivacyPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto prose-docs">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: December 2024</p>
        
        <h2>1. Introduction</h2>
        <p>This policy describes how Vanta SDK and this documentation website handle information.</p>
        
        <h2>2. What We Don&apos;t Collect</h2>
        <p>Vanta SDK itself collects no data. It runs entirely on your infrastructure. We have no access to your payments, users, or API traffic.</p>
        
        <h2>3. Documentation Website</h2>
        <p>This website may use basic analytics to understand usage patterns. We do not sell or share personal data.</p>
        
        <h2>4. Cookies</h2>
        <p>We use essential cookies for theme preferences. No tracking cookies are used.</p>
        
        <h2>5. Third-Party Services</h2>
        <p>Links to GitHub, Discord, and other services are governed by their respective privacy policies.</p>
        
        <h2>6. Blockchain Data</h2>
        <p>Payment transactions occur on public blockchains. Transaction data is publicly visible and permanent.</p>
        
        <h2>7. Your Rights</h2>
        <p>Contact privacy@vantasdk.dev with questions about your data or to request deletion of any information we may have.</p>
        
        <h2>8. Changes</h2>
        <p>We may update this policy. Check this page for the latest version.</p>
      </div>
    </div>
  )
}

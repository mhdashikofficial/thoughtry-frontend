export default function TermsPage() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
      <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '24px' }}>Terms of Service</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Last updated: June 2026</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: '1.6' }}>
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>1. Acceptance of Terms</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            By accessing or using Thoughtry, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
          </p>
        </section>
        
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>2. User Content & Subdomains</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Users are granted a subdomain (e.g., yourname.thoughtry.blog). You retain all rights to the content you publish on your subdomain. You agree not to post illegal, copyrighted, or highly offensive material. We reserve the right to suspend subdomains that violate these rules.
          </p>
        </section>
        
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>3. Revenue Sharing</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Thoughtry shares 70% of ad revenue generated on your subdomain with you. The platform retains a 30% fee for hosting, API services, and maintenance. Revenue is calculated monthly.
          </p>
        </section>
        
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>4. Termination</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
        </section>
      </div>
    </main>
  );
}

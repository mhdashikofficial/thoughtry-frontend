export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
      <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '24px' }}>Privacy Policy</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Last updated: June 2026</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: '1.6' }}>
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>1. Information We Collect</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            We collect information you provide directly to us, such as when you create an account, publish content on your subdomain, or communicate with us. This includes your email address, username, and published articles.
          </p>
        </section>
        
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>2. How We Use Your Information</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            We use the information we collect to provide, maintain, and improve our services, including calculating revenue share, authenticating you, and maintaining your subdomain.
          </p>
        </section>
        
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>3. Information Sharing</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            We do not share your personal information with third parties except as necessary to provide our services (e.g., ad networks for revenue calculation) or as required by law.
          </p>
        </section>
        
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>4. Security</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access. Your passwords are encrypted.
          </p>
        </section>
      </div>
    </main>
  );
}

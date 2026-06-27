'use client';
import Link from 'next/link';

export default function DMCAComplaint() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Complaint submitted successfully. Our DMCA agent will review this shortly.");
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '40px 5%', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>DMCA Complaint Form</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Report a copyright infringement on Thoughtry.</p>
      </header>

      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', width: '100%', flex: 1 }}>
        <div className="glass-panel" style={{ padding: '40px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Your Full Name</label>
              <input type="text" className="input-field" required placeholder="John Doe" />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Your Email Address</label>
              <input type="email" className="input-field" required placeholder="john@example.com" />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>URL of the Infringing Material on Thoughtry</label>
              <input type="url" className="input-field" required placeholder="https://username.thoughtry.blog/read/..." />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Description of the Original Copyrighted Work</label>
              <textarea className="input-field" rows={4} required placeholder="Please provide details or a link to the original copyrighted work..."></textarea>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <input type="checkbox" required id="goodFaith" style={{ marginTop: '4px', cursor: 'pointer', width: '20px', height: '20px', accentColor: 'var(--primary)' }} />
              <label htmlFor="goodFaith" style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>
                I have a good faith belief that the use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
              </label>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <input type="checkbox" required id="perjury" style={{ marginTop: '4px', cursor: 'pointer', width: '20px', height: '20px', accentColor: 'var(--primary)' }} />
              <label htmlFor="perjury" style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>
                I state under penalty of perjury that the information in this notification is accurate and that I am the copyright owner or am authorized to act on behalf of the owner.
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Electronic Signature (Type your full name)</label>
              <input type="text" className="input-field" required placeholder="John Doe" />
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '16px', fontSize: '1.1rem', marginTop: '16px' }}>Submit Complaint</button>
          </form>
        </div>
      </section>

      <footer style={{ padding: '40px 5%', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
        <Link href="/" style={{ color: 'var(--primary)' }}>&larr; Back to Home</Link>
      </footer>
    </main>
  );
}

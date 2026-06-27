import Link from 'next/link';
import { Mail, MapPin, UserCheck } from 'lucide-react';

export default function DMCAContact() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '40px 5%', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>DMCA Contact Agent</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Information on how to contact our designated DMCA Agent.</p>
      </header>

      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', width: '100%', flex: 1 }}>
        <div className="glass-panel" style={{ padding: '40px', lineHeight: '1.8' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Designated DMCA Agent</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
            Pursuant to the Digital Millennium Copyright Act (17 U.S.C. § 512(c)), Thoughtry has implemented procedures for receiving written notification of claimed infringements. Thoughtry has also designated an agent to receive notices of claimed copyright infringement.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', background: 'rgba(255,255,255,0.05)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <UserCheck size={24} color="var(--primary)" />
              <div>
                <strong style={{ display: 'block', fontSize: '1.1rem' }}>Agent Name</strong>
                <span style={{ color: 'var(--text-muted)' }}>Thoughtry Copyright Agent</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <MapPin size={24} color="var(--primary)" />
              <div>
                <strong style={{ display: 'block', fontSize: '1.1rem' }}>Mailing Address</strong>
                <span style={{ color: 'var(--text-muted)' }}>Thoughtry Legal Dept.<br/>123 Internet Ave, Suite 400<br/>San Francisco, CA 94105<br/>United States</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Mail size={24} color="var(--primary)" />
              <div>
                <strong style={{ display: 'block', fontSize: '1.1rem' }}>Email Address</strong>
                <a href="mailto:dmca@thoughtry.blog" style={{ color: 'var(--primary)' }}>dmca@thoughtry.blog</a>
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '40px' }}>
            <p style={{ color: 'var(--text-muted)' }}>
              To submit a claim electronically, please use our <Link href="/dmca-complaint" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>DMCA Complaint Form</Link>.
            </p>
          </div>
        </div>
      </section>

      <footer style={{ padding: '40px 5%', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
        <Link href="/" style={{ color: 'var(--primary)' }}>&larr; Back to Home</Link>
      </footer>
    </main>
  );
}

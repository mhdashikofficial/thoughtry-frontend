import Link from 'next/link';
import { ArrowRight, PenTool, TrendingUp, ShieldCheck, Globe, Star } from 'lucide-react';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url(/hero_bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.6 }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,1))' }}></div>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(237,145,214,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(185,56,229,0.1) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(80px)' }}></div>
      </div>

      <nav style={{ padding: '24px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, var(--primary), var(--accent))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PenTool color="#fff" size={24} />
          </div>
          <h2 className="gradient-text" style={{ fontSize: '2rem', margin: 0, letterSpacing: '-0.5px' }}>Thoughtry</h2>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link href="/login" style={{ color: 'var(--text-color)', fontWeight: 500, padding: '8px 16px', transition: 'color 0.2s' }} className="hover-primary">Login</Link>
          <Link href="/register"><button className="btn-primary" style={{ padding: '12px 24px', fontSize: '1rem', boxShadow: '0 4px 20px rgba(237,145,214,0.3)' }}>Start Writing</button></Link>
        </div>
      </nav>

      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 5%', zIndex: 10 }}>
        <div style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '24px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ color: 'var(--primary)', fontWeight: 'bold', marginRight: '8px' }}>NEW</span> 
          <span style={{ color: 'var(--text-muted)' }}>Customize your subdomain homepage</span>
        </div>
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', maxWidth: '900px', marginBottom: '24px', lineHeight: 1.1, letterSpacing: '-1px' }}>
          Your Voice. Your Domain. <br/>
          <span className="gradient-text">Your Revenue.</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '650px', marginBottom: '48px', lineHeight: 1.6 }}>
          Join Thoughtry to get your own personalized <b>.thoughtry.blog</b> subdomain. Publish your articles with a beautiful rich-text editor and earn money from day one through our integrated revenue split.
        </p>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/register">
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', padding: '16px 36px', borderRadius: '32px', boxShadow: '0 8px 30px rgba(185,56,229,0.4)' }}>
              Claim Your Subdomain <ArrowRight size={20} />
            </button>
          </Link>
          <Link href="#features">
            <button className="btn-secondary" style={{ fontSize: '1.1rem', padding: '16px 36px', borderRadius: '32px' }}>
              Learn More
            </button>
          </Link>
        </div>
      </section>

      <section id="features" style={{ padding: '100px 5%', background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.05)', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Everything you need to succeed</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Built for writers who want to focus on creating, not configuring.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="glass-panel" style={{ padding: '40px', transition: 'transform 0.3s', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
            <div style={{ width: '60px', height: '60px', background: 'rgba(237,145,214,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <PenTool size={32} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Rich Editor</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Write beautiful articles using our advanced editor with custom fonts, image uploads, and clean formatting.</p>
          </div>
          <div className="glass-panel" style={{ padding: '40px', transition: 'transform 0.3s', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
            <div style={{ width: '60px', height: '60px', background: 'rgba(185,56,229,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <TrendingUp size={32} color="var(--accent)" />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>70% Revenue Share</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>You keep 70% of the ad revenue generated by your blog. Withdrawals are processed monthly with a low $10 minimum.</p>
          </div>
          <div className="glass-panel" style={{ padding: '40px', transition: 'transform 0.3s', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
            <div style={{ width: '60px', height: '60px', background: 'rgba(196,223,112,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Globe size={32} color="var(--secondary)" />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Custom Subdomains</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Get your own highly personalized corner of the internet. Customize your homepage, bio, and add your own FAQ/Legal pages.</p>
          </div>
        </div>
      </section>

      <footer style={{ padding: '40px 5%', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', zIndex: 10, background: '#0a0a0a' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          &copy; 2026 Thoughtry. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '24px', fontSize: '0.9rem' }}>
          <Link href="/terms" style={{ color: 'var(--text-muted)' }} className="hover-primary">Terms of Service</Link>
          <Link href="/privacy" style={{ color: 'var(--text-muted)' }} className="hover-primary">Privacy Policy</Link>
          <Link href="/faq" style={{ color: 'var(--text-muted)' }} className="hover-primary">FAQ</Link>
        </div>
      </footer>
    </main>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    subdomain: '',
    captchaText: '',
  });

  // Captcha token would typically come from an API call
  // For the UI placeholder, we'll just mock it.
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation for hitting backend /api/auth/register goes here
    alert("Registration logic is ready to be connected to the backend.");
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Join Thoughtry</h1>
          <p style={{ color: 'var(--text-muted)' }}>Create your account and claim your subdomain.</p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Username</label>
            <input 
              type="text" 
              className="input-field" 
              required
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Password</label>
            <input 
              type="password" 
              className="input-field" 
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Subdomain (.thoughtry.blog)</label>
            <input 
              type="text" 
              className="input-field" 
              required
              placeholder="e.g. ash"
              value={formData.subdomain}
              onChange={(e) => setFormData({...formData, subdomain: e.target.value})}
            />
          </div>
          
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Captcha (Security Check)</label>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ background: '#fff', padding: '8px', borderRadius: '4px', flex: 1, minHeight: '40px', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* SVG Captcha loads here */}
                Loading...
              </div>
              <input 
                type="text" 
                className="input-field" 
                style={{ flex: 1 }}
                placeholder="Enter text"
                required
                value={formData.captchaText}
                onChange={(e) => setFormData({...formData, captchaText: e.target.value})}
              />
            </div>
          </div>
          
          <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Create Account</button>
        </form>
        
        <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Login here</Link>
        </div>
      </div>
    </main>
  );
}

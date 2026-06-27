'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation for hitting backend /api/auth/login goes here
    alert("Login logic is ready to be connected to the backend.");
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-muted)' }}>Sign in to your Thoughtry dashboard.</p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
          
          <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Login</button>
        </form>
        
        <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Don't have an account? <Link href="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Register</Link>
        </div>
      </div>
    </main>
  );
}

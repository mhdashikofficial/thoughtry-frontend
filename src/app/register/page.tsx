'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    subdomain: '',
    captchaText: '',
  });

  const [captchaSvg, setCaptchaSvg] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [loadingCaptcha, setLoadingCaptcha] = useState(true);
  
  // State for the verification step
  const [isRegistered, setIsRegistered] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const fetchCaptcha = async () => {
    setLoadingCaptcha(true);
    try {
      const res = await axios.get('/api/auth/captcha');
      setCaptchaSvg(res.data.svg);
      setCaptchaToken(res.data.captchaToken);
    } catch (err) {
      console.error('Failed to load captcha', err);
      setCaptchaSvg('<span style="color:red;font-size:12px;">Error loading captcha</span>');
    } finally {
      setLoadingCaptcha(false);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', {
        ...formData,
        captchaToken
      });
      setIsRegistered(true);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Registration failed.');
      fetchCaptcha();
      setFormData({ ...formData, captchaText: '' });
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/verify', {
        email: formData.email,
        code: verificationCode
      });
      // Verification successful, save token
      localStorage.setItem('thoughtry_token', res.data.token);
      localStorage.setItem('thoughtry_user', JSON.stringify(res.data));
      
      alert('Email verified successfully! Welcome to Thoughtry.');
      router.push('/dashboard');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Verification failed. Please check the code.');
    }
  };

  if (isRegistered) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Check Your Email</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
            We've sent a 6-digit verification code to <strong>{formData.email}</strong>.
          </p>
          
          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Enter 6-digit code"
                required
                style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '1.2rem', padding: '12px' }}
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary">Verify Account</button>
          </form>
        </div>
      </main>
    );
  }

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
              <div 
                style={{ background: '#fff', padding: '8px', borderRadius: '4px', flex: 1, minHeight: '40px', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                onClick={fetchCaptcha}
                title="Click to refresh captcha"
              >
                {loadingCaptcha ? 'Loading...' : <div dangerouslySetInnerHTML={{ __html: captchaSvg }} />}
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
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginTop: '8px' }}>
            <input 
              type="checkbox" 
              required 
              id="terms"
              style={{ marginTop: '4px', cursor: 'pointer', width: '16px', height: '16px', accentColor: 'var(--primary)' }} 
            />
            <label htmlFor="terms" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.4' }}>
              I agree to the <Link href="/terms" target="_blank" style={{ color: 'var(--primary)' }}>Terms of Service</Link> and <Link href="/privacy" target="_blank" style={{ color: 'var(--primary)' }}>Privacy Policy</Link>.
            </label>
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

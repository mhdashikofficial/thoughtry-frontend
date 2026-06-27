'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Editor from '@/components/Editor';

export default function Dashboard() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('<p>Start writing your amazing article here...</p>');
  
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('thoughtry_user');
    if (userStr) {
      try {
        const parsedUser = JSON.parse(userStr);
        setUser(parsedUser);
        setBalance(parsedUser.balance || 0);
      } catch(e) {
        console.error(e);
      }
    } else {
      // Redirect to login if not authenticated
      router.push('/login');
    }
  }, [router]);
  
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: '280px', borderRight: '1px solid var(--border-color)', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
        <h2 className="gradient-text" style={{ fontSize: '1.5rem', marginBottom: '40px' }}>Thoughtry Dashboard</h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          <a href="#" style={{ color: 'var(--primary)', fontWeight: '600' }}>Write Article</a>
          <a href="#" style={{ color: 'var(--text-muted)' }}>My Posts</a>
          <a href="#" style={{ color: 'var(--text-muted)' }}>Settings</a>
        </nav>
        
        <div className="glass-panel" style={{ padding: '20px', marginTop: 'auto' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>Available Earnings</p>
          <h3 style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '16px' }}>${balance.toFixed(2)}</h3>
          <button className="btn-secondary" style={{ width: '100%', padding: '8px' }}>Withdraw Funds</button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px 60px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2rem' }}>Create New Post</h1>
          <button className="btn-primary">Publish Article</button>
        </header>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '500' }}>Article Title</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. 10 Tips for Better Writing"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ fontSize: '1.2rem', padding: '16px' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '500' }}>Article Content</label>
            <Editor content={content} onChange={setContent} />
          </div>
        </div>
      </main>
    </div>
  );
}

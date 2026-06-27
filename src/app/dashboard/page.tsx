'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Editor from '@/components/Editor';

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('write'); // 'write' or 'posts'
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('<p>Start writing your amazing article here...</p>');
  
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState('');
  
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('thoughtry_user');
    const tokenStr = localStorage.getItem('thoughtry_token');
    
    if (userStr && tokenStr) {
      try {
        const parsedUser = JSON.parse(userStr);
        setUser(parsedUser);
        setBalance(parsedUser.balance || 0);
        setToken(tokenStr);
        fetchBlogs(tokenStr);
      } catch(e) {
        console.error(e);
      }
    } else {
      router.push('/login');
    }
  }, [router]);
  
  const fetchBlogs = async (authToken: string) => {
    try {
      const res = await fetch('http://infoqio.sbs:5000/api/blog', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (err) {
      console.error('Failed to fetch blogs', err);
    }
  };

  const publishArticle = async () => {
    if (!title) return alert('Title is required');
    setLoading(true);
    try {
      const res = await fetch('http://infoqio.sbs:5000/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      });
      
      if (res.ok) {
        alert('Article published successfully!');
        setTitle('');
        setContent('<p>Start writing your amazing article here...</p>');
        fetchBlogs(token);
        setActiveTab('posts');
      } else {
        const data = await res.json();
        alert(data.message || 'Error publishing article');
      }
    } catch (err) {
      alert('Error publishing article');
    }
    setLoading(false);
  };
  
  const deleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`http://infoqio.sbs:5000/api/blog/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchBlogs(token);
      }
    } catch (err) {
      alert('Error deleting article');
    }
  };

  if (!user) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: '280px', borderRight: '1px solid var(--border-color)', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
        <h2 className="gradient-text" style={{ fontSize: '1.5rem', marginBottom: '40px' }}>Thoughtry</h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          <button onClick={() => setActiveTab('write')} style={{ textAlign: 'left', background: 'none', border: 'none', color: activeTab === 'write' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: activeTab === 'write' ? '600' : '400', fontSize: '1rem', cursor: 'pointer' }}>Write Article</button>
          <button onClick={() => setActiveTab('posts')} style={{ textAlign: 'left', background: 'none', border: 'none', color: activeTab === 'posts' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: activeTab === 'posts' ? '600' : '400', fontSize: '1rem', cursor: 'pointer' }}>My Posts</button>
          <Link href={`http://${user.subdomain}.thoughtry.blog`} target="_blank" style={{ color: 'var(--text-muted)' }}>View My Blog</Link>
          <button onClick={() => { localStorage.clear(); router.push('/login'); }} style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--danger)', marginTop: '20px', fontSize: '1rem', cursor: 'pointer' }}>Logout</button>
        </nav>
        
        <div className="glass-panel" style={{ padding: '20px', marginTop: 'auto' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>Available Earnings</p>
          <h3 style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '16px' }}>${balance.toFixed(2)}</h3>
          <button className="btn-secondary" style={{ width: '100%', padding: '8px' }}>Withdraw Funds</button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px 60px', overflowY: 'auto' }}>
        {activeTab === 'write' && (
          <>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <h1 style={{ fontSize: '2rem' }}>Create New Post</h1>
              <button onClick={publishArticle} disabled={loading} className="btn-primary">
                {loading ? 'Publishing...' : 'Publish Article'}
              </button>
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
          </>
        )}

        {activeTab === 'posts' && (
          <>
            <header style={{ marginBottom: '40px' }}>
              <h1 style={{ fontSize: '2rem' }}>My Posts</h1>
            </header>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px' }}>
              {blogs.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>You haven't written any posts yet.</p>
              ) : (
                blogs.map((blog: any) => (
                  <div key={blog._id} className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{blog.title}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Published on {new Date(blog.createdAt).toLocaleDateString()} • {blog.views} views</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <Link href={`http://${user.subdomain}.thoughtry.blog/read/${blog.slug}`} target="_blank">
                        <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>View</button>
                      </Link>
                      <button onClick={() => deleteArticle(blog._id)} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem', color: 'var(--danger)', borderColor: 'var(--danger)' }}>Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

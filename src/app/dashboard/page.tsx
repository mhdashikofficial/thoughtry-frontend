'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Editor from '@/components/Editor';
import { LayoutDashboard, PenTool, FileText, Palette, Settings, DollarSign, LogOut, Plus, Trash2, ExternalLink, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview'); // overview, write, posts, theme, settings, earnings
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('<p>Start writing your amazing article here...</p>');
  
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Theme state
  const [theme, setTheme] = useState({
    primaryColor: '#b938e5',
    backgroundColor: '#0a0a0a',
    fontFamily: 'Inter',
    bio: '',
    navbarLinks: [{ label: '', url: '' }]
  });

  useEffect(() => {
    const userStr = localStorage.getItem('thoughtry_user');
    const tokenStr = localStorage.getItem('thoughtry_token');
    
    if (userStr && tokenStr) {
      try {
        const parsedUser = JSON.parse(userStr);
        setUser(parsedUser);
        setToken(tokenStr);
        if (parsedUser.theme) {
          setTheme({
            ...parsedUser.theme,
            navbarLinks: parsedUser.theme.navbarLinks?.length ? parsedUser.theme.navbarLinks : [{ label: '', url: '' }]
          });
        }
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
      const res = await fetch('/api/blog', {
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
      const res = await fetch('/api/blog', {
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
      const res = await fetch(`/api/blog/${id}`, {
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

  const saveTheme = async () => {
    setLoading(true);
    try {
      // Filter out empty navbar links
      const cleanedTheme = {
        ...theme,
        navbarLinks: theme.navbarLinks.filter(l => l.label && l.url)
      };

      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ theme: cleanedTheme })
      });
      
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        localStorage.setItem('thoughtry_user', JSON.stringify(data));
        alert('Theme updated successfully! Visit your blog to see changes.');
      } else {
        alert('Error updating theme');
      }
    } catch (err) {
      alert('Error saving theme');
    }
    setLoading(false);
  };

  const addNavbarLink = () => {
    setTheme({ ...theme, navbarLinks: [...theme.navbarLinks, { label: '', url: '' }] });
  };

  const updateNavbarLink = (index: number, field: string, value: string) => {
    const newLinks = [...theme.navbarLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setTheme({ ...theme, navbarLinks: newLinks });
  };

  const removeNavbarLink = (index: number) => {
    const newLinks = theme.navbarLinks.filter((_, i) => i !== index);
    setTheme({ ...theme, navbarLinks: newLinks });
  };

  if (!user) return null;

  const totalViews = blogs.reduce((acc, blog: any) => acc + (blog.views || 0), 0);

  const navItemStyle = (isActive: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '12px',
    background: isActive ? 'rgba(185,56,229,0.1)' : 'transparent',
    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
    fontWeight: isActive ? '600' : '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none',
    width: '100%',
    textAlign: 'left' as const
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050505' }}>
      {/* Sidebar */}
      <aside style={{ width: '280px', borderRight: '1px solid var(--border-color)', padding: '32px 24px', display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.02)' }}>
        <h2 className="gradient-text" style={{ fontSize: '1.8rem', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--primary), var(--accent))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PenTool color="#fff" size={16} />
          </div>
          Thoughtry
        </h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <button onClick={() => setActiveTab('overview')} style={navItemStyle(activeTab === 'overview')}><LayoutDashboard size={20} /> Overview</button>
          <button onClick={() => setActiveTab('write')} style={navItemStyle(activeTab === 'write')}><PenTool size={20} /> Write Article</button>
          <button onClick={() => setActiveTab('posts')} style={navItemStyle(activeTab === 'posts')}><FileText size={20} /> My Posts</button>
          <button onClick={() => setActiveTab('theme')} style={navItemStyle(activeTab === 'theme')}><Palette size={20} /> Theme & Layout</button>
          <button onClick={() => setActiveTab('earnings')} style={navItemStyle(activeTab === 'earnings')}><DollarSign size={20} /> Earnings</button>
          <button onClick={() => setActiveTab('settings')} style={navItemStyle(activeTab === 'settings')}><Settings size={20} /> Settings</button>
          
          <div style={{ margin: '24px 0', height: '1px', background: 'var(--border-color)' }}></div>
          
          <Link href={`http://${user.subdomain}.thoughtry.blog`} target="_blank" style={{ textDecoration: 'none' }}>
            <button style={navItemStyle(false)}><ExternalLink size={20} /> View Blog</button>
          </Link>
          <button onClick={() => { localStorage.clear(); router.push('/login'); }} style={{ ...navItemStyle(false), color: 'var(--danger)', marginTop: 'auto' }}><LogOut size={20} /> Logout</button>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px 60px', overflowY: 'auto' }}>
        
        {activeTab === 'overview' && (
          <div className="fade-in">
            <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Welcome back, {user.username}!</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '1.1rem' }}>Here's what's happening with your blog today.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '48px' }}>
              <div className="glass-panel" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <FileText color="var(--primary)" size={24} />
                  <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Total Posts</span>
                </div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{blogs.length}</div>
              </div>
              
              <div className="glass-panel" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <TrendingUp color="var(--accent)" size={24} />
                  <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Total Views</span>
                </div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{totalViews}</div>
              </div>
              
              <div className="glass-panel" style={{ padding: '32px', background: 'linear-gradient(135deg, rgba(185,56,229,0.1), rgba(0,0,0,0.5))' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <DollarSign color="#fff" size={24} />
                  <span style={{ color: '#ccc', fontSize: '1.1rem' }}>Available Earnings</span>
                </div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff' }}>${(user.balance || 0).toFixed(2)}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'write' && (
          <div className="fade-in" style={{ maxWidth: '900px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Create New Post</h1>
                <p style={{ color: 'var(--text-muted)' }}>Draft and publish your next great article.</p>
              </div>
              <button onClick={publishArticle} disabled={loading} className="btn-primary" style={{ padding: '12px 32px', fontSize: '1.1rem' }}>
                {loading ? 'Publishing...' : 'Publish Article'}
              </button>
            </header>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Article Title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ fontSize: '2rem', padding: '20px', background: 'rgba(255,255,255,0.02)', border: 'none', borderBottom: '2px solid var(--border-color)', borderRadius: '0' }}
                />
              </div>
              
              <div className="glass-panel" style={{ padding: '24px' }}>
                <Editor content={content} onChange={setContent} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="fade-in">
            <header style={{ marginBottom: '40px' }}>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>My Posts</h1>
              <p style={{ color: 'var(--text-muted)' }}>Manage your published articles.</p>
            </header>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px' }}>
              {blogs.length === 0 ? (
                <div className="glass-panel" style={{ padding: '60px', textAlign: 'center' }}>
                  <FileText size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>No posts yet</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>You haven't written any articles. Click Write Article to get started.</p>
                  <button onClick={() => setActiveTab('write')} className="btn-primary">Write your first post</button>
                </div>
              ) : (
                blogs.map((blog: any) => (
                  <div key={blog._id} className="glass-panel hover-lift" style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{blog.title}</h3>
                      <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span style={{ color: 'var(--primary)' }}>{blog.views} views</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <Link href={`http://${user.subdomain}.thoughtry.blog/read/${blog.slug}`} target="_blank">
                        <button className="btn-secondary" style={{ padding: '8px 16px' }}><ExternalLink size={16} /> View</button>
                      </Link>
                      <button onClick={() => deleteArticle(blog._id)} className="btn-secondary" style={{ padding: '8px 16px', color: 'var(--danger)', borderColor: 'rgba(255,0,0,0.2)' }}><Trash2 size={16} /> Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="fade-in" style={{ maxWidth: '800px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Theme & Layout</h1>
                <p style={{ color: 'var(--text-muted)' }}>Customize how your blog looks and feels to visitors.</p>
              </div>
              <button onClick={saveTheme} disabled={loading} className="btn-primary" style={{ padding: '12px 32px' }}>
                {loading ? 'Saving...' : 'Save Theme'}
              </button>
            </header>

            <div className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <h3 style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>Colors & Typography</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text-muted)' }}>Primary Accent Color</label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input type="color" value={theme.primaryColor} onChange={(e) => setTheme({...theme, primaryColor: e.target.value})} style={{ width: '50px', height: '50px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }} />
                    <input type="text" className="input-field" value={theme.primaryColor} onChange={(e) => setTheme({...theme, primaryColor: e.target.value})} style={{ flex: 1 }} />
                  </div>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text-muted)' }}>Background Color</label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input type="color" value={theme.backgroundColor} onChange={(e) => setTheme({...theme, backgroundColor: e.target.value})} style={{ width: '50px', height: '50px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }} />
                    <input type="text" className="input-field" value={theme.backgroundColor} onChange={(e) => setTheme({...theme, backgroundColor: e.target.value})} style={{ flex: 1 }} />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text-muted)' }}>Font Family</label>
                <select className="input-field" value={theme.fontFamily} onChange={(e) => setTheme({...theme, fontFamily: e.target.value})}>
                  <option value="Inter">Inter (Modern, Clean)</option>
                  <option value="Merriweather">Merriweather (Classic Serif)</option>
                  <option value="Roboto Mono">Roboto Mono (Developer/Code)</option>
                  <option value="Outfit">Outfit (Geometric)</option>
                </select>
              </div>

              <h3 style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginTop: '16px' }}>About Author (Bio)</h3>
              <div>
                <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text-muted)' }}>Author Bio</label>
                <textarea 
                  className="input-field" 
                  rows={4}
                  value={theme.bio}
                  onChange={(e) => setTheme({...theme, bio: e.target.value})}
                  placeholder="Tell your readers a bit about yourself..."
                ></textarea>
              </div>

              <h3 style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginTop: '16px' }}>Custom Navbar Links</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '-24px' }}>Add links to your portfolio, social media, or custom pages.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {theme.navbarLinks.map((link, index) => (
                  <div key={index} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <input type="text" className="input-field" placeholder="Link Label (e.g. My Portfolio)" value={link.label} onChange={(e) => updateNavbarLink(index, 'label', e.target.value)} style={{ flex: 1 }} />
                    <input type="url" className="input-field" placeholder="https://..." value={link.url} onChange={(e) => updateNavbarLink(index, 'url', e.target.value)} style={{ flex: 2 }} />
                    <button onClick={() => removeNavbarLink(index)} className="btn-secondary" style={{ padding: '12px', color: 'var(--danger)', borderColor: 'rgba(255,0,0,0.2)' }}><Trash2 size={20} /></button>
                  </div>
                ))}
                <button onClick={addNavbarLink} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', justifyContent: 'center' }}><Plus size={20} /> Add New Link</button>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="fade-in">
            <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Earnings & Payouts</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Track your daily revenue generated via PopAds integration.</p>

            <div className="glass-panel" style={{ padding: '40px', maxWidth: '600px' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '8px' }}>Current Balance</p>
                <h2 style={{ fontSize: '4rem', color: 'var(--accent)' }}>${(user.balance || 0).toFixed(2)}</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '16px' }}>Minimum withdrawal amount: $10.00</p>
              </div>

              <button className="btn-primary" disabled={(user.balance || 0) < 10} style={{ width: '100%', padding: '16px', fontSize: '1.2rem', opacity: (user.balance || 0) < 10 ? 0.5 : 1 }}>
                Withdraw Funds
              </button>
              
              <div style={{ marginTop: '40px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ marginBottom: '16px' }}>How earnings work</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Your blog displays popunder ads provided by PopAds. We automatically track the traffic and views your articles receive each day. 
                  Every night, we fetch the total revenue generated from PopAds and distribute exactly 70% of it to our writers proportionally based on their traffic!
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="fade-in">
            <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Account Settings</h1>
            
            <div className="glass-panel" style={{ padding: '40px', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Email Address</label>
                <input type="email" className="input-field" value={user.email} disabled />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Subdomain</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input type="text" className="input-field" value={user.subdomain} disabled style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
                  <div style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderLeft: 'none', borderTopRightRadius: '12px', borderBottomRightRadius: '12px', color: 'var(--text-muted)' }}>.thoughtry.blog</div>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Note: Email and subdomain changes are currently disabled. Please contact support to change these details.</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

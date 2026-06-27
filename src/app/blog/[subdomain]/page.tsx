import Link from 'next/link';
import { Globe, BookOpen, User, Hash } from 'lucide-react';

export default async function BloggerIndex({ params }: { params: { subdomain: string } }) {
  const { subdomain } = params;

  // Fetch user profile and blogs from the backend API
  const res = await fetch(`http://infoqio.sbs:5000/api/blog/user/${subdomain}`, { next: { revalidate: 60 } });
  
  if (!res.ok) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>404 Not Found</h1>
        <p style={{ color: 'var(--text-muted)' }}>The blog for <b>{subdomain}</b> does not exist.</p>
        <Link href="/" style={{ color: 'var(--primary)', marginTop: '24px' }}>&larr; Back to Thoughtry</Link>
      </main>
    );
  }

  const data = await res.json();
  const { user, blogs } = data;

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '40px 5%', textAlign: 'center', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(185,56,229,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(40px)', zIndex: 0 }}></div>
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ width: '80px', height: '80px', margin: '0 auto 24px auto', background: 'linear-gradient(135deg, var(--primary), var(--accent))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 30px rgba(185,56,229,0.3)' }}>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>{subdomain.charAt(0).toUpperCase()}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '12px', letterSpacing: '-1px' }}>{user.username}'s Thoughtry</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 24px auto' }}>
            Welcome to my personal corner of the internet. Here you'll find my thoughts, articles, and updates.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-color)', background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem' }}><Globe size={16} /> My Website</a>
          </div>
        </div>
      </header>
      
      <div style={{ display: 'flex', flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '40px 5%', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* Main Content Area: Articles Feed */}
        <section style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
            <BookOpen size={24} color="var(--primary)" /> Latest Articles
          </h2>
          {blogs.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No articles published yet.</p>
          ) : (
            blogs.map((blog: any) => (
              <article key={blog._id} className="glass-panel hover-lift" style={{ padding: '32px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{blog.views} views</span>
                </div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>{blog.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }} dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 150) + '...' }}>
                </p>
                <Link href={`/read/${blog.slug}`} style={{ color: 'var(--primary)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Read Full Article &rarr;
                </Link>
              </article>
            ))
          )}
        </section>

        {/* Sidebar */}
        <aside style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '400px' }}>
          
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><User size={20} color="var(--accent)" /> About Me</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              I'm an avid writer and developer sharing my journey. I love exploring new technologies and writing about my experiences. 
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Hash size={20} color="var(--secondary)" /> Tags</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Technology', 'Writing', 'Life', 'Tutorial'].map(tag => (
                <span key={tag} style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{tag}</span>
              ))}
            </div>
          </div>

        </aside>
      </div>

      <footer style={{ padding: '40px 5%', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>Powered by <Link href="https://thoughtry.blog" style={{ color: 'var(--text-color)', fontWeight: 'bold' }}>Thoughtry</Link></p>
      </footer>
    </main>
  );
}

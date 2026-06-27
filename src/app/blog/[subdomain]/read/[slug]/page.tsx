import Link from 'next/link';

export default async function BlogPost({ params }: { params: { subdomain: string, slug: string } }) {
  const { subdomain, slug } = params;

  // Fetch the blog post
  const res = await fetch(`http://infoqio.sbs:5000/api/blog/${slug}`, { next: { revalidate: 10 } });
  
  if (!res.ok) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>404 Not Found</h1>
        <p style={{ color: 'var(--text-muted)' }}>The article you are looking for does not exist.</p>
        <Link href={`/`} style={{ color: 'var(--primary)', marginTop: '24px' }}>&larr; Back to {subdomain}'s Blog</Link>
      </main>
    );
  }

  const blog = await res.json();

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Blog Header */}
      <header style={{ padding: '40px 20px', borderBottom: '1px solid var(--border-color)', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '16px', letterSpacing: '-0.5px' }}>{blog.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                {blog.author.username.charAt(0).toUpperCase()}
              </div>
              {blog.author.username}
            </span>
            <span>•</span>
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>{blog.views} views</span>
          </div>
        </div>
      </header>

      {/* Blog Content */}
      <article style={{ flex: 1, padding: '40px 20px' }}>
        <div 
          className="ProseMirror"
          style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8', border: 'none', background: 'transparent', padding: '0' }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
      
      {/* Footer */}
      <footer style={{ padding: '40px 20px', borderTop: '1px solid var(--border-color)', textAlign: 'center', marginTop: '40px' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Thanks for reading!</p>
        <Link href={`/`} style={{ color: 'var(--primary)', fontWeight: 'bold' }}>&larr; Back to {subdomain}'s Blog</Link>
      </footer>
    </main>
  );
}

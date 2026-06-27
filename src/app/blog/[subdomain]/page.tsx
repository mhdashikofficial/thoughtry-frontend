export default async function BloggerIndex({ params }: { params: { subdomain: string } }) {
  const { subdomain } = params;

  // In a real implementation, we would fetch the user's blogs using the subdomain
  // const res = await fetch(`http://localhost:5000/api/public/blogs/${subdomain}`);
  // const data = await res.json();

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 5%' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '8px' }}>{subdomain}'s Blog</h1>
        <p style={{ color: 'var(--text-muted)' }}>Welcome to my personal corner on Thoughtry.</p>
      </header>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Placeholder for blog list */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>My First Post</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>This is a preview of how articles will look on the blog feed...</p>
          <a href={`/my-first-post`} style={{ color: 'var(--primary)', fontWeight: '600' }}>Read more &rarr;</a>
        </div>
      </div>
    </main>
  );
}

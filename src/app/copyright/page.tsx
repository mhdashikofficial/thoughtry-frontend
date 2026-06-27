import Link from 'next/link';

export default function CopyrightPolicy() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '40px 5%', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Copyright Policy</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Learn about how Thoughtry handles copyright and intellectual property.</p>
      </header>

      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', lineHeight: '1.8', color: 'var(--text-main)', flex: 1 }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>1. Introduction</h2>
        <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
          Thoughtry respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 ("DMCA"), we will respond expeditiously to claims of copyright infringement committed using the Thoughtry platform.
        </p>

        <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>2. User Responsibilities</h2>
        <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
          By publishing content on Thoughtry, you represent and warrant that you own or have the necessary rights and permissions to use and authorize Thoughtry to use all intellectual property rights in and to your content. You agree not to publish any content that infringes on the copyrights of any third party.
        </p>

        <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>3. Reporting Infringement</h2>
        <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
          If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible via Thoughtry, please notify our designated DMCA Agent. You can submit a complaint via our <Link href="/dmca-complaint" style={{ color: 'var(--primary)' }}>DMCA Complaint Form</Link>.
        </p>

        <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>4. Repeat Infringers</h2>
        <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
          Thoughtry's policy is to disable and/or terminate the accounts of users who repeatedly infringe or are repeatedly charged with infringing the copyrights or other intellectual property rights of others.
        </p>
      </section>

      <footer style={{ padding: '40px 5%', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
        <Link href="/" style={{ color: 'var(--primary)' }}>&larr; Back to Home</Link>
      </footer>
    </main>
  );
}

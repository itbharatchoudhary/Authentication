import React, { useState } from 'react';
import Navbar from '../../../components/layout/Navbar.jsx';
import Footer from '../../../components/layout/Footer.jsx';
import ProfileCard from '../components/ProfileCard.jsx';
import Input from '../../../components/ui/Input.jsx';
import Button from '../../../components/ui/Button.jsx';
import Modal from '../../../components/ui/Modal.jsx';
import { useUser } from '../hooks/useUser.js';
import { useAuth } from '../../auth/hooks/useAuth.js';

export default function Profile() {
  const { user }  = useUser();
  const { logout } = useAuth();
  const [modal, setModal] = useState(false);

  if (!user) return null;

  const isGoogle = user.authProvider === 'google';

  const Row = ({ label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0.9rem 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', width: 140, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: '0.875rem', color: 'var(--paper)' }}>{value || '—'}</span>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--ink)' }}>
      <Navbar />
      <main style={{ flex: 1, maxWidth: 680, margin: '0 auto', padding: '3.5rem 2rem', width: '100%' }}>
        {/* Header */}
        <div className="fu" style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '0.5rem' }}>Account</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--paper)' }}>Your Profile</h1>
        </div>

        {/* Profile card */}
        <div className="fu d1" style={{ marginBottom: '1.5rem' }}>
          <ProfileCard user={user} />
        </div>

        {/* Account Details */}
        <div className="fu d2" style={{ background: 'var(--ink-2)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.25rem' }}>Details</p>
          <Row label="Full Name"   value={user.name} />
          <Row label="Email"       value={user.email} />
          <Row label="Auth Method" value={isGoogle ? 'Google OAuth' : 'Email & Password'} />
          <Row label="Role"        value={user.role} />
          {!isGoogle && (
            <div style={{ paddingTop: '1rem' }}>
              <Button variant="outline" size="sm">Change Password</Button>
            </div>
          )}
        </div>

        {/* Danger zone */}
        <div className="fu d3" style={{ background: 'rgba(255,79,79,0.04)', border: '1px solid rgba(255,79,79,0.14)', borderRadius: 'var(--r-lg)', padding: '1.5rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '0.75rem' }}>Danger Zone</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--paper)' }}>Sign out of account</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.2rem' }}>You'll be redirected to the home page.</p>
            </div>
            <Button variant="danger" size="sm" onClick={() => setModal(true)}>Sign Out</Button>
          </div>
        </div>
      </main>
      <Footer />

      <Modal open={modal} onClose={() => setModal(false)} title="Sign out?" footer={
        <>
          <Button variant="ghost" size="sm" onClick={() => setModal(false)}>Cancel</Button>
          <Button variant="danger" size="sm" onClick={() => { setModal(false); logout(); }}>Sign Out</Button>
        </>
      }>
        You'll need to sign in again to access your account.
      </Modal>
    </div>
  );
}
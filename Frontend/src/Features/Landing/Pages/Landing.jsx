import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/layout/Navbar.jsx';
import Footer from '../../../components/layout/Footer.jsx';
import HeroSection from '../components/HeroSection.jsx';
import CTAButtons from '../components/CTAButtons.jsx';
import { useAuthStore } from '../../../app/store.js';

const CATEGORIES = ['All Stories', 'Features', 'Analysis', 'Oral History', 'Profiles', 'Investigation', 'Memoir'];

const STORIES = [
  { tag: 'Feature',      title: 'The Night the Draft Never Came',        excerpt: 'A story of potential, heartbreak, and what might have been for one player who nearly changed history.',       author: 'Priya Mehta',  time: '8 min' },
  { tag: 'Analysis',     title: 'How One Pass Changed Everything',        excerpt: 'Dissecting the play that shifted the momentum of an entire season — frame by frame.',                          author: 'Rohan Das',    time: '5 min' },
  { tag: 'Oral History', title: 'The Locker Room at Half Time',           excerpt: 'In their own words — what happens when the cameras are off and the score is wrong.',                            author: 'Anjali Sinha', time: '12 min' },
  { tag: 'Memoir',       title: 'Letters from the Bench',                 excerpt: 'A veteran reflects on 14 seasons of watching others play the game from ten yards away.',                       author: 'Vikram Nair',  time: '10 min' },
  { tag: 'Investigation','title': 'The Referee's Untold Story',           excerpt: 'An unprecedented interview series reveals the view from the center of the field.',                             author: 'Kavya Iyer',  time: '6 min' },
  { tag: 'Profile',      title: 'She Built the Stadium Alone',            excerpt: 'The engineer whose name appears on no plaque — but whose vision shaped everything.',                            author: 'Ritu Sharma',  time: '9 min' },
];

const TAG_COLORS = {
  'Feature':      'var(--cyan)',
  'Analysis':     '#7eb8e8',
  'Oral History': '#c57ae0',
  'Memoir':       'var(--green)',
  'Investigation':'var(--amber)',
  'Profile':      '#e07070',
};

export default function Landing() {
  const { isAuth } = useAuthStore();
  const navigate   = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--ink)' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {/* Hero */}
        <HeroSection />

        {/* CTA strip */}
        <section style={{ padding: '2rem 2.5rem 4rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <CTAButtons guestMode={isAuth} />
          </div>
        </section>

        {/* Stories */}
        <section style={{ padding: '5rem 2.5rem', maxWidth: 1200, margin: '0 auto' }}>
          {/* Category filter */}
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map((c, i) => (
              <button key={c} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.4rem 0.9rem', borderRadius: 20, background: i === 0 ? 'var(--cyan-dim)' : 'transparent', color: i === 0 ? 'var(--cyan)' : 'var(--muted)', border: `1px solid ${i === 0 ? 'var(--border-cyan)' : 'var(--border)'}`, cursor: 'pointer', transition: 'all var(--t)' }}
                onMouseEnter={(e) => { if (i !== 0) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'var(--paper)'; }}}
                onMouseLeave={(e) => { if (i !== 0) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}}>
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1px', background: 'var(--border)' }}>
            {STORIES.map((s, i) => (
              <article key={i} className="fu" style={{ animationDelay: `${i * 0.06}s`, background: 'var(--ink)', padding: '1.75rem', cursor: 'pointer', transition: 'background var(--t)', position: 'relative' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--ink-2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--ink)'; }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: TAG_COLORS[s.tag] || 'var(--cyan)', display: 'block', marginBottom: '0.65rem' }}>
                  {s.tag}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.25, color: 'var(--paper)', marginBottom: '0.65rem' }}>{s.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '1.25rem' }}>{s.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted-2)', letterSpacing: '0.05em' }}>{s.author}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted-2)', letterSpacing: '0.05em' }}>{s.time} read</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
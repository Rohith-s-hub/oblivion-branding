import { useEffect, useState } from 'react';

const GH = 'https://github.com/Rohith-s-hub/Oblivion-agent';
const DOCS = 'https://rohithblog.vercel.app/blog/oblivion-local-ai-coding-agent';
const PYPI = 'https://pypi.org/project/oblivion-agent/';

interface Spark {
  id: number;
  left: number;
  top: number;
  size: number;
  color: string;
  delay: number;
  dur: number;
}

export default function Outro() {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const list: Spark[] = [];
    const colors = ['#8b5cf6', '#6366f1', '#22d3ee', '#a78bfa', '#818cf8'];
    for (let i = 0; i < 60; i++) {
      list.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        color: colors[i % colors.length],
        delay: Math.random() * 4,
        dur: 3 + Math.random() * 4,
      });
    }
    setSparks(list);
  }, []);

  const linkStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-sans), system-ui, sans-serif',
    fontSize: '15px',
    fontWeight: 400,
    color: 'rgba(232, 234, 237, 0.68)',
    textDecoration: 'none',
    padding: '6px 0',
    letterSpacing: '-0.01em',
    transition: 'color 0.15s ease',
  };

  const colTitle: React.CSSProperties = {
    fontFamily: 'var(--font-sans), system-ui, sans-serif',
    fontSize: '12px',
    fontWeight: 600,
    color: 'rgba(34, 211, 238, 0.9)',
    marginBottom: '14px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  };

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        background: 'var(--bg-base, #0c0e12)',
        color: 'var(--text-primary, #f8fafc)',
        paddingTop: '80px',
        paddingBottom: '24px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {sparks.map((s) => (
          <span
            key={s.id}
            style={{
              position: 'absolute',
              left: s.left + '%',
              top: s.top + '%',
              width: s.size + 'px',
              height: s.size + 'px',
              borderRadius: '50%',
              backgroundColor: s.color,
              boxShadow: '0 0 ' + s.size * 3 + 'px ' + s.color,
              opacity: 0.5,
              animation: 'outro-twinkle ' + s.dur + 's ease-in-out ' + s.delay + 's infinite',
            }}
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="outro-grid"
          style={{
            width: 'min(1440px, 100%)',
            margin: '0 auto',
            padding: '0 var(--page-pad, 48px) 60px',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 0.8fr)',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: '"Plus Jakarta Sans", "Outfit", var(--font-sans), sans-serif',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 500,
              letterSpacing: '-0.04em',
              lineHeight: 1.15,
              color: 'rgba(248, 250, 252, 0.95)',
            }}
          >
            Experience the
            <br />
            <span
              style={{
                background: 'linear-gradient(115deg, #e0f2fe 0%, #22d3ee 32%, #3b82f6 68%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 24px rgba(34, 211, 238, 0.35))',
              }}
            >
              vibe of coding.
            </span>
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px 48px',
            }}
          >
            <div>
              <div style={colTitle}>Product</div>
              <a href="#install" style={linkStyle} onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232, 234, 237, 0.68)')}>Download</a>
              <a href="#models" style={linkStyle} onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232, 234, 237, 0.68)')}>Models</a>
              <a href="#features" style={linkStyle} onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232, 234, 237, 0.68)')}>Product</a>
              <a href="#docs" style={linkStyle} onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232, 234, 237, 0.68)')}>Docs</a>
              <a href={GH} target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232, 234, 237, 0.68)')}>Changelog</a>
              <a href={PYPI} target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232, 234, 237, 0.68)')}>Releases</a>
            </div>
            <div>
              <div style={colTitle}>Resources</div>
              <a href={DOCS} target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232, 234, 237, 0.68)')}>Blog</a>
              <a href="#install" style={linkStyle} onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232, 234, 237, 0.68)')}>Install</a>
              <a href="#how-it-works" style={linkStyle} onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232, 234, 237, 0.68)')}>Use Cases</a>
              <a href={GH} target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232, 234, 237, 0.68)')}>GitHub</a>
              <a href={PYPI} target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232, 234, 237, 0.68)')}>PyPI</a>
            </div>
          </div>
        </div>

        <div
          style={{
            width: '100%',
            padding: '0 4px',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'visible',
            userSelect: 'none',
            margin: '20px 0 10px',
          }}
        >
          <h1
            aria-label="Oblivion"
            style={{
              margin: 0,
              fontFamily: '"Plus Jakarta Sans", "Outfit", "Space Grotesk", var(--font-sans), sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(5.5rem, 23.5vw, 29rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.030em',
              color: '#ffffff',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              width: '100%',
              display: 'block',
              filter: 'drop-shadow(0 0 60px rgba(34, 211, 238, 0.25)) drop-shadow(0 0 100px rgba(139, 92, 246, 0.15))',
            }}
          >
            Oblivion
          </h1>
        </div>

        <div
          style={{
            width: 'min(1440px, 100%)',
            margin: '20px auto 0',
            padding: '24px var(--page-pad, 48px) 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-sans), system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: 'rgba(248, 250, 252, 0.9)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden>
              <rect x="1" y="4" width="20" height="14" rx="2" stroke="#22d3ee" strokeWidth="1.5" />
              <path d="M5 9l3 3-3 3" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="11" y="13" width="6" height="1.5" rx="0.75" fill="#22d3ee" opacity="0.5" />
            </svg>
            OBLIVION
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px 24px',
              fontFamily: 'var(--font-sans), system-ui, sans-serif',
              fontSize: '13px',
            }}
          >
            <a href={GH} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(148, 163, 184, 0.8)', textDecoration: 'none' }}>GitHub</a>
            <a href={PYPI} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(148, 163, 184, 0.8)', textDecoration: 'none' }}>PyPI</a>
            <a href="#docs" style={{ color: 'rgba(148, 163, 184, 0.8)', textDecoration: 'none' }}>Docs</a>
            <a href={GH + '/blob/main/LICENSE'} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(148, 163, 184, 0.8)', textDecoration: 'none' }}>MIT License</a>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&family=Outfit:wght@500;600&display=swap');

        @keyframes outro-twinkle {
          0%, 100% { opacity: 0.2; transform: translateY(0); }
          50% { opacity: 0.8; transform: translateY(-3px); }
        }

        @media (max-width: 800px) {
          .outro-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </section>
  );
}

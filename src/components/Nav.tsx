import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const displayName =
    user?.displayName || (user?.email ? user.email.split('@')[0] : 'Account');
  const avatarLetter = displayName.charAt(0).toUpperCase();

  async function handleLogout() {
    setMenuOpen(false);
    await logout();
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 var(--page-pad, 48px)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(12, 14, 18, 0.90)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(255, 255, 255, 0.08)'
          : '1px solid transparent',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <a
        href="#"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect
            x="1"
            y="4"
            width="20"
            height="14"
            rx="2"
            stroke="var(--accent, #22d3ee)"
            strokeWidth="1.5"
          />
          <path
            d="M5 9l3 3-3 3"
            stroke="var(--accent, #22d3ee)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="11"
            y="13"
            width="6"
            height="1.5"
            rx="0.75"
            fill="var(--accent, #22d3ee)"
            opacity="0.5"
          />
        </svg>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '0.06em',
          }}
        >
          OBLIVION <span style={{ color: '#22d3ee', fontSize: '11px' }}>AI</span>
        </span>
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <a
          href="#how-it-works"
          style={{
            fontSize: '13px',
            textDecoration: 'none',
            color: 'var(--text-secondary)',
          }}
        >
          How it works
        </a>
        <a
          href="#architecture"
          style={{
            fontSize: '13px',
            textDecoration: 'none',
            color: 'var(--text-secondary)',
          }}
        >
          Architecture
        </a>
        <a
          href="#features"
          style={{
            fontSize: '13px',
            textDecoration: 'none',
            color: 'var(--text-secondary)',
          }}
        >
          Features
        </a>
        <a
          href="#models"
          style={{
            fontSize: '13px',
            textDecoration: 'none',
            color: 'var(--text-secondary)',
          }}
        >
          Models
        </a>
        <a
          href="https://github.com/Rohith-s-hub/Oblivion-agent"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            textDecoration: 'none',
            color: 'var(--text-secondary)',
          }}
        >
          GitHub
        </a>

        {loading ? null : user ? (
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-sans), system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: '#f8fafc',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '20px',
                padding: '5px 14px 5px 5px',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#0a0c10',
                }}
              >
                {avatarLetter}
              </span>
              {displayName}
            </button>

            {menuOpen ? (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  minWidth: 160,
                  background: 'rgba(15,17,22,0.98)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  padding: 6,
                  boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                }}
              >
                <div
                  style={{
                    padding: '8px 10px',
                    fontSize: 11.5,
                    color: 'rgba(148,163,184,0.85)',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    marginBottom: 4,
                    wordBreak: 'break-all',
                  }}
                >
                  {user.email}
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 10px',
                    fontSize: 13,
                    color: '#fca5a5',
                    background: 'none',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(248,113,113,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                  }}
                >
                  Sign out
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <a
            href="#auth"
            style={{
              fontFamily: 'var(--font-sans), system-ui, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              color: '#f8fafc',
              textDecoration: 'none',
              padding: '7px 16px',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(34,211,238,0.12)';
              e.currentTarget.style.borderColor = 'rgba(34,211,238,0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
            }}
          >
            Sign In
          </a>
        )}

        <a
          href="https://pypi.org/project/oblivion-agent/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.06em',
            color: 'var(--accent, #22d3ee)',
            textDecoration: 'none',
            border: '1px solid var(--accent-border, rgba(34,211,238,0.35))',
            borderRadius: '20px',
            padding: '6px 14px',
            background: 'rgba(34, 211, 238, 0.05)',
          }}
        >
          pip install
        </a>
      </div>
    </nav>
  );
}

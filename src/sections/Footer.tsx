export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: '48px var(--page-pad, 48px)',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
      }}
    >
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '24px',
      }}>
        {/* Left: Logo + description */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
              <rect x="1" y="4" width="20" height="14" rx="2" stroke="var(--accent)" strokeWidth="1.5"/>
              <path d="M5 9l3 3-3 3" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="11" y="13" width="6" height="1.5" rx="0.75" fill="var(--accent)" opacity="0.5"/>
            </svg>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '0.04em',
            }}>
              OBLIVION
            </span>
          </div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-tertiary)',
            lineHeight: 1.5,
          }}>
            Terminal-native AI coding agent.<br />
            Powered by M.E.E.R.A.
          </p>
        </div>

        {/* Center: links */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[
              { label: 'PyPI', href: 'https://pypi.org/project/oblivion-agent/' },
              { label: 'GitHub', href: 'https://github.com/Rohith-s-hub/Oblivion-agent' },
              { label: 'README', href: 'https://github.com/Rohith-s-hub/Oblivion-agent' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-tertiary)',
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Easter egg link */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-tertiary)',
            opacity: 0.5,
            letterSpacing: '0.06em',
          }}>
            try <code style={{ color: 'var(--accent)', opacity: 0.7 }}>/switch</code> inside the agent ↗
          </div>
        </div>

        {/* Right: copyright + badges */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', marginBottom: '8px' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-tertiary)',
              background: 'var(--bg-raised)',
              border: '1px solid var(--border-subtle)',
              padding: '2px 7px',
              borderRadius: '3px',
            }}>MIT</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-tertiary)',
              background: 'var(--bg-raised)',
              border: '1px solid var(--border-subtle)',
              padding: '2px 7px',
              borderRadius: '3px',
            }}>Python 3.10+</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--accent)',
              background: 'var(--accent-muted)',
              border: '1px solid var(--accent-border)',
              padding: '2px 7px',
              borderRadius: '3px',
            }}>5k+ downloads</span>
          </div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-tertiary)',
          }}>
            © {year} Oblivion. No rights reserved — MIT licensed.
          </p>
        </div>
      </div>
    </footer>
  );
}

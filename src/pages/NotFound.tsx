import TerminalWindow from '../components/TerminalWindow';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      position: 'relative',
    }}>
      {/* Dot grid */}
      <div className="dot-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '560px' }}>
        {/* 404 */}
        <div className="not-found-code" style={{ marginBottom: '0' }}>
          4<span style={{ color: 'var(--accent)', opacity: 0.4 }}>0</span>4
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          color: 'var(--text-tertiary)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '32px',
          marginTop: '-8px',
        }}>
          Page not found
        </div>

        {/* Terminal */}
        <TerminalWindow title="oblivion — error" minHeight="140px">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.7 }}>
            <div style={{ color: 'var(--accent)' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>❯ </span>
              navigate({'"'}the page you were looking for{'"'})
            </div>
            <div style={{ color: '#ff7b75', paddingLeft: '16px', marginTop: '4px' }}>
              PathError: Route not found in manifest
            </div>
            <div style={{ color: 'var(--text-tertiary)', paddingLeft: '16px', marginTop: '4px' }}>
              # M.E.E.R.A. searched all layers. Nothing matched.
            </div>
            <div style={{ color: 'var(--text-secondary)', paddingLeft: '16px', marginTop: '4px' }}>
              → Suggested action: return to /
            </div>
            <div style={{ marginTop: '8px', color: 'var(--accent)' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>❯ </span>
              <span className="cursor-blink" />
            </div>
          </div>
        </TerminalWindow>

        {/* CTA */}
        <div style={{ marginTop: '32px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <a href="/" className="btn-primary" style={{ textDecoration: 'none' }}>
            ← Back to home
          </a>
          <a
            href="https://github.com/Rohith-s-hub/Oblivion-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

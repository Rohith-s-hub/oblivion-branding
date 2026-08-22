import InstallBlock from '../components/InstallBlock';
import HeroTerminal from '../components/HeroTerminal';

export default function Hero() {
  return (
    <section id="terminal-hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '110px var(--page-pad, 48px) 88px',
        overflow: 'hidden',
      }}
    >
      {/* Background orb */}
      <div
        className="hero-orb"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
        }}
      />

      {/* Dot grid */}
      <div
        className="dot-grid-bg"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          zIndex: 0,
        }}
      />

      <div
        className="hero-two-col"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1440px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(320px, 1fr)',
          gap: 'clamp(40px, 5vw, 80px)',
          alignItems: 'center',
        }}
      >
        {/* Left: Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="accent-rule" />
            <span className="section-label">Terminal-native AI coding agent</span>
          </div>

          {/* Headline */}
          <div>
            <h1
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                marginBottom: '4px',
              }}
            >
              Code that ships.
            </h1>
            <h1
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: 'var(--text-secondary)',
              }}
            >
              Zero overhead.
            </h1>
          </div>

          {/* Body */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '17px',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              maxWidth: 'min(520px, 100%)',
            }}
          >
            Oblivion is a terminal-first autonomous coding agent powered by M.E.E.R.A. —
            built on modest hardware, designed for real work. 38 tools. 6-model fallback chain.
            Runs where you run.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '24px',
            }}
          >
            {[
              { value: '5,000+', label: 'PyPI downloads' },
              { value: '38', label: 'built-in tools' },
              { value: '~12k', label: 'lines of Python' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="stat-value">
                  {value.includes('+') || value.includes('k') || value.includes('~') ? (
                    <>
                      <span>{value.replace(/[+~]/g, '')}</span>
                      <span className="stat-accent" style={{ fontSize: '0.6em' }}>
                        {value.match(/[+~k]/)?.[0]}
                      </span>
                    </>
                  ) : (
                    <span>{value}</span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    letterSpacing: '0.05em',
                    marginTop: '4px',
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Install */}
          <InstallBlock />

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/Rohith-s-hub/Oblivion-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" opacity="0.7">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              View Source
            </a>
            <a
              href="https://pypi.org/project/oblivion-agent/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" opacity="0.6">
                <rect x="2" y="2" width="5" height="5" rx="1"/>
                <rect x="9" y="2" width="5" height="5" rx="1"/>
                <rect x="2" y="9" width="5" height="5" rx="1"/>
                <rect x="9" y="9" width="5" height="5" rx="1"/>
              </svg>
              PyPI page
            </a>
          </div>

          {/* MIT badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.1em',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              padding: '2px 8px',
              borderRadius: '3px',
            }}>MIT LICENSE</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-tertiary)',
            }}>·</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.06em',
            }}>no GPU required</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-tertiary)',
            }}>·</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.06em',
            }}>Python 3.10+</span>
          </div>
        </div>

        {/* Right: Terminal */}
        <div className="hero-terminal-col" style={{ position: 'relative' }}>
          <HeroTerminal />
          {/* Ambient glow under terminal */}
          <div
            style={{
              position: 'absolute',
              bottom: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              height: '60px',
              background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.08), transparent 70%)',
              filter: 'blur(20px)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          opacity: 0.3,
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.15em', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>scroll</span>
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
          <rect x="6" y="0" width="4" height="10" rx="2" stroke="var(--text-tertiary)" strokeWidth="1.2"/>
          <rect x="7.5" y="3" width="1" height="3" rx="0.5" fill="var(--text-tertiary)">
            <animateTransform attributeName="transform" type="translate" values="0,0;0,2;0,0" dur="1.5s" repeatCount="indefinite"/>
          </rect>
          <path d="M4 14l4 5 4-5" stroke="var(--text-tertiary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}

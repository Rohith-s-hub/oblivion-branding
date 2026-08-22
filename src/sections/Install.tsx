import { useScrollReveal } from '../hooks/useScrollReveal';
import InstallBlock from '../components/InstallBlock';
import CopyButton from '../components/CopyButton';

const QUICKSTART_STEPS = [
  {
    step: '01',
    title: 'Install',
    commands: [
      { label: 'pip (any OS)', cmd: 'pip install oblivion-agent' },
      { label: 'pipx (recommended)', cmd: 'pipx install oblivion-agent' },
    ],
  },
  {
    step: '02',
    title: 'Configure',
    commands: [
      { label: 'set your primary model API key', cmd: 'export GROQ_API_KEY=your_key_here' },
      { label: 'or run the interactive setup', cmd: 'oblivion --setup' },
    ],
  },
  {
    step: '03',
    title: 'Run',
    commands: [
      { label: 'start in your project root', cmd: 'cd your-project && oblivion' },
      { label: 'or one-shot mode', cmd: 'oblivion -p "refactor auth to use JWT"' },
    ],
  },
];

export default function Install() {
  const ref = useScrollReveal(0.1);

  return (
    <section
      id="install"
      style={{
        padding: '120px var(--page-pad, 48px)',
        position: 'relative',
      }}
    >
      <div className="gradient-divider" style={{ marginBottom: '80px' }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div ref={ref}>
          {/* Header */}
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '20px',
            }}>
              <div className="accent-rule" />
              <span className="section-label">Get started</span>
              <div className="accent-rule" />
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', marginBottom: '16px' }}>
              Up in three commands.
            </h2>
            <p style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              maxWidth: '420px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}>
              No configuration file required for basic use. No accounts, no telemetry, no mandatory cloud signup.
            </p>
          </div>

          {/* OS-aware install */}
          <div className="reveal" style={{ marginBottom: '56px' }}>
            <InstallBlock />
          </div>

          {/* Quickstart steps */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            {QUICKSTART_STEPS.map((s, i) => (
              <div
                key={s.step}
                className="reveal"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '0',
                  borderBottom: i < QUICKSTART_STEPS.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}
              >
                {/* Step number */}
                <div style={{
                  padding: '24px var(--page-pad, 48px)',
                  borderRight: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  background: 'var(--bg-surface)',
                  minWidth: '80px',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--accent)',
                    opacity: 0.7,
                    letterSpacing: '0.1em',
                  }}>
                    {s.step}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '24px 28px', background: 'var(--bg-base)' }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}>
                    {s.title}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {s.commands.map((cmd) => (
                      <div key={cmd.cmd}>
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          color: 'var(--text-tertiary)',
                          marginBottom: '4px',
                          letterSpacing: '0.04em',
                        }}>
                          {cmd.label}
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          background: '#0d1017',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          padding: '10px 14px',
                        }}>
                          <code style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '13px',
                            color: 'var(--text-primary)',
                          }}>
                            <span style={{ color: 'var(--accent)', marginRight: '8px' }}>$</span>
                            {cmd.cmd}
                          </code>
                          <CopyButton text={cmd.cmd} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Links */}
          <div className="reveal" style={{
            marginTop: '48px',
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}>
            <a
              href="https://pypi.org/project/oblivion-agent/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1l3 3H9v5H7V4H5l3-3zM2 10v4h12v-4H2z" opacity="0.9"/>
              </svg>
              PyPI page
            </a>
            <a
              href="https://github.com/Rohith-s-hub/Oblivion-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" opacity="0.7">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              View on GitHub
            </a>
            <a
              href="#docs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Read the docs →
            </a>
          </div>

          {/* Note */}
          <p className="reveal" style={{
            marginTop: '32px',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-tertiary)',
            lineHeight: 1.6,
          }}>
            MIT licensed. No telemetry. Your code stays on your machine.
          </p>
        </div>
      </div>
    </section>
  );
}

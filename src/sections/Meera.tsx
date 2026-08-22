import { useScrollReveal } from '../hooks/useScrollReveal';
import TerminalWindow from '../components/TerminalWindow';

const MEERA_DIALOG = [
  { speaker: 'user',  text: 'What is the time complexity of the search function in utils.py?' },
  { speaker: 'meera', text: 'Reading utils.py now.' },
  { speaker: 'sys',   text: '→ fts5_search("search function") · read_file("utils/search.py")' },
  { speaker: 'meera', text: 'The current implementation is O(n) — linear scan over the index. If the corpus grows past ~50k entries, you\'ll feel it. Want me to draft a B-tree indexed version using SQLite\'s FTS5 rank function?' },
  { speaker: 'user',  text: 'Yeah — but don\'t touch the tests yet.' },
  { speaker: 'meera', text: 'Understood. I\'ll write the new implementation in a separate file and verify it matches the existing interface. Tests stay untouched.' },
  { speaker: 'sys',   text: '→ write_file("utils/search_v2.py") · tier-2 approval granted' },
  { speaker: 'meera', text: 'Done. search_v2.py is ready. The rank-weighted FTS5 query drops worst-case lookup from O(n) to O(log n) for ranked retrieval. Run /diff to compare.' },
];

export default function Meera() {
  const ref = useScrollReveal(0.1);

  return (
    <section
      style={{
        padding: '120px var(--page-pad, 48px)',
        background: 'var(--bg-surface)',
        position: 'relative',
      }}
    >
      <div className="gradient-divider" style={{ marginBottom: '80px' }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
            gap: '72px',
            alignItems: 'start',
          }}
        >
          {/* Left: Copy */}
          <div>
            <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div className="accent-rule" />
              <span className="section-label">M.E.E.R.A.</span>
            </div>

            <h2 className="reveal" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', marginBottom: '20px' }}>
              An agent with a voice,<br />
              <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>not a chatbot.</span>
            </h2>

            <div className="reveal" style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                M.E.E.R.A. — <span style={{ color: 'var(--text-primary)' }}>Multi-model Execution and Enhanced Reasoning Architecture</span> — is
                the AI persona you interact with inside Oblivion. Not a thin wrapper around a chat API.
              </p>
            </div>

            <div className="reveal" style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                She reasons out loud, states her plan before acting, and flags uncertainty
                rather than guessing. The transparency is deliberate — you should know what the
                agent is about to do before it does it.
              </p>
            </div>

            <div className="reveal">
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                The voice is direct and unhurried. Competence without performance. No
                "Great question!" preambles, no hallucinated enthusiasm about your project.
              </p>
            </div>

            {/* Traits */}
            <div
              className="reveal"
              style={{
                marginTop: '36px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {[
                ['Explicitly plans before acting', 'no silent reasoning'],
                ['Surfaces uncertainty', 'never invents answers'],
                ['Remembers your patterns', 'session-persistent memory'],
                ['Speaks on request', 'optional voice I/O'],
              ].map(([trait, detail]) => (
                <div
                  key={trait}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    background: 'var(--bg-raised)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                  }}
                >
                  <div style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-primary)' }}>
                    {trait}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--text-tertiary)',
                    marginLeft: 'auto',
                  }}>
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dialog terminal */}
          <div className="reveal">
            <TerminalWindow title="oblivion — conversation log" minHeight="480px">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {MEERA_DIALOG.map((line, i) => {
                  if (line.speaker === 'sys') {
                    return (
                      <div key={i} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11.5px',
                        color: 'var(--text-tertiary)',
                        paddingLeft: '12px',
                        borderLeft: '2px solid var(--border-subtle)',
                        fontStyle: 'italic',
                      }}>
                        {line.text}
                      </div>
                    );
                  }

                  const isUser = line.speaker === 'user';
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start',
                      }}
                    >
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: isUser ? 'var(--accent)' : '#c084fc',
                        letterSpacing: '0.06em',
                        flexShrink: 0,
                        paddingTop: '2px',
                        width: '50px',
                        textAlign: 'right',
                      }}>
                        {isUser ? 'you' : 'meera'}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        color: isUser ? 'var(--text-primary)' : '#e2d4f5',
                        lineHeight: 1.65,
                        flex: 1,
                      }}>
                        {line.text}
                      </span>
                    </div>
                  );
                })}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  marginTop: '4px',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--accent)',
                    width: '50px',
                    textAlign: 'right',
                  }}>you</span>
                  <span className="cursor-blink" />
                </div>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </div>
    </section>
  );
}

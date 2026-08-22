import { useScrollReveal } from '../hooks/useScrollReveal';
import TerminalWindow from '../components/TerminalWindow';

const REACT_STEPS = [
  {
    phase: 'REASON',
    label: '01 — Observe & Reason',
    color: '#60a5fa',
    terminal: [
      { t: 'step', c: '[REASON] User task: "Add rate limiting to the API"' },
      { t: 'dim',  c: '         Decomposing task into subtasks…' },
      { t: 'dim',  c: '         fts5_search("rate limit middleware") → 3 matches' },
      { t: 'dim',  c: '         semantic_search("throttle express fastapi") → 6 hits' },
      { t: 'step', c: '[PLAN]   1. Identify framework  2. Find entry point  3. Write middleware' },
    ],
    description:
      'M.E.E.R.A. reads the task, searches your codebase across three layers simultaneously — full-text search, semantic embeddings via ChromaDB, and exact symbol matching — before forming an explicit plan.',
  },
  {
    phase: 'ACT',
    label: '02 — Act with Permission',
    color: 'var(--accent)',
    terminal: [
      { t: 'step', c: '[ACT]    read_file("src/app.py") — tier-1 (auto-approved)' },
      { t: 'success', c: '         → 210 lines, FastAPI detected' },
      { t: 'step', c: '[ACT]    write_file("src/middleware/rate_limit.py") — tier-2' },
      { t: 'warning', c: '         → Requesting approval for write operation…' },
      { t: 'success', c: '         → Approved. Writing 68 lines.' },
      { t: 'step', c: '[ACT]    run_shell("pytest src/middleware/") — tier-3 (sandboxed)' },
    ],
    description:
      'Every tool call passes through a 3-tier permission system. Read operations run freely. Writes require confirmation or a standing allowance. Shell execution is sandboxed. You stay in control.',
  },
  {
    phase: 'OBSERVE',
    label: '03 — Observe & Adapt',
    color: '#c084fc',
    terminal: [
      { t: 'dim',  c: '         Observing test output…' },
      { t: 'error', c: '         FAIL: test_rate_limit — ImportError: slowapi not installed' },
      { t: 'step', c: '[REASON] Dependency missing. Re-planning.' },
      { t: 'step', c: '[ACT]    update_requirements("slowapi>=0.1.9")' },
      { t: 'step', c: '[ACT]    run_shell("pip install -r requirements.txt && pytest src/middleware/")' },
      { t: 'success', c: '         ✓ 4/4 tests passed. Task complete.' },
    ],
    description:
      'After each action, M.E.E.R.A. observes the output — errors, test results, file diffs — and loops back into reasoning. Failed tests, missing deps, wrong assumptions: all caught and corrected in-loop.',
  },
];

export default function HowItWorks() {
  const ref = useScrollReveal(0.1);

  return (
    <section
      id="how-it-works"
      style={{
        padding: '120px var(--page-pad, 48px)',
        position: 'relative',
      }}
    >
      {/* Top rule */}
      <div className="gradient-divider" style={{ marginBottom: '80px' }} />

      <div
        ref={ref}
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div className="reveal" style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div className="accent-rule" />
            <span className="section-label">ReAct loop</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', marginBottom: '16px' }}>
            Reason. Act. Observe.<br />
            <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>Repeat until done.</span>
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            maxWidth: '500px',
            lineHeight: 1.65,
          }}>
            Oblivion runs a tight ReAct loop — not a one-shot prompt. Each cycle reasons explicitly
            about tool outputs before choosing the next action. There's no guessing.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 5vw, 80px)' }}>
          {REACT_STEPS.map((step, i) => (
            <div
              key={step.phase}
              className="reveal"
              style={{
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr',
                gap: 'clamp(32px, 4vw, 64px)',
                alignItems: 'start',
              }}
            >
              {/* Text side */}
              <div
                style={{
                  order: i % 2 === 0 ? 0 : 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  paddingTop: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    color: step.color,
                    background: `${step.color}15`,
                    border: `1px solid ${step.color}30`,
                    padding: '2px 8px',
                    borderRadius: '3px',
                  }}>
                    {step.phase}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                }}>
                  {step.label}
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                }}>
                  {step.description}
                </p>

                {/* Step connector */}
                {i < REACT_STEPS.length - 1 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '8px',
                  }}>
                    <div style={{
                      width: '1px',
                      height: '24px',
                      background: 'var(--border-subtle)',
                      marginLeft: '4px',
                    }} />
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--text-tertiary)',
                      letterSpacing: '0.1em',
                    }}>
                      {i === 0 ? '→ triggers action' : '→ loops back to reason'}
                    </span>
                  </div>
                )}
              </div>

              {/* Terminal side */}
              <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                <TerminalWindow title={`step ${i + 1}: ${step.phase.toLowerCase()}`}>
                  {step.terminal.map((line, li) => {
                    const colorMap: Record<string, string> = {
                      step: '#60a5fa',
                      success: 'var(--accent)',
                      error: '#ff7b75',
                      warning: '#febc2e',
                      dim: 'var(--text-tertiary)',
                    };
                    return (
                      <div
                        key={li}
                        style={{
                          color: colorMap[line.t] || '#c0c8d4',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '13px',
                          lineHeight: '1.65',
                          whiteSpace: 'pre',
                        }}
                      >
                        {line.c}
                      </div>
                    );
                  })}
                </TerminalWindow>
              </div>
            </div>
          ))}
        </div>

        {/* Model chain callout */}
        <div
          className="reveal"
          style={{
            marginTop: '80px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '32px 36px',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div className="accent-rule" style={{ width: '24px' }} />
              <span className="section-label">6-model fallback chain</span>
            </div>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              If one model is rate-limited, times out, or returns garbage — the agent silently promotes
              to the next in chain. The loop never stalls waiting on a single provider.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '180px' }}>
            {['groq/llama', 'google/gemini', 'mistral', 'anthropic/claude', 'openai/gpt-4o', 'local/ollama'].map((model, i) => (
              <div key={model} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: i === 0 ? 'var(--accent)' : 'var(--text-tertiary)',
                  opacity: 1 - i * 0.12,
                }}>
                  {String(i + 1).padStart(2, '0')} {model}
                </span>
                {i === 0 && (
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    color: 'var(--accent)',
                    border: '1px solid var(--accent-border)',
                    padding: '0 4px',
                    borderRadius: '2px',
                  }}>primary</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

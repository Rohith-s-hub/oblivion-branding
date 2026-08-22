import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

const GH = 'https://github.com/Rohith-s-hub/Oblivion-agent';
const PYPI = 'https://pypi.org/project/oblivion-agent/';

const SECTIONS = [
  { id: 'sec-what-is-oblivion', title: '1. What Is Oblivion?' },
  { id: 'sec-installation', title: '2. Installation' },
  { id: 'sec-first-time-setup', title: '3. First-Time Setup' },
  { id: 'sec-launching-oblivion', title: '4. Launching Oblivion' },
  { id: 'sec-the-interface', title: '5. The Interface' },
  { id: 'sec-talking-to-oblivion', title: '6. Talking to Oblivion' },
  { id: 'sec-slash-commands', title: '7. Slash Commands' },
  { id: 'sec-keyboard-shortcuts', title: '8. Keyboard Shortcuts' },
  { id: 'sec-tools-reference', title: '9. Tools (38 Total)' },
  { id: 'sec-permission-system', title: '10. Permission System' },
  { id: 'sec-models-fallback-chain', title: '11. Models & Fallback Chain' },
  { id: 'sec-voice-mode-meera', title: '12. Voice Mode (M.E.E.R.A.)' },
  { id: 'sec-wake-word', title: '13. Wake Word' },
  { id: 'sec-workspaces-projects', title: '14. Workspaces & Projects' },
  { id: 'sec-code-intelligence', title: '15. Code Intelligence' },
  { id: 'sec-memory-file', title: '16. Memory (MEMORY.md)' },
  { id: 'sec-sessions', title: '17. Sessions' },
  { id: 'sec-knowledge-packs', title: '18. Knowledge Packs' },
  { id: 'sec-automation', title: '19. Automation (/auto)' },
  { id: 'sec-mcp-server-mode', title: '20. MCP Server Mode' },
  { id: 'sec-file-watcher', title: '21. File Watcher' },
  { id: 'sec-microprocessor-simulator', title: '22. 8085 Simulator' },
  { id: 'sec-configuration-reference', title: '23. Configuration' },
  { id: 'sec-updating-oblivion', title: '24. Updating' },
  { id: 'sec-troubleshooting', title: '25. Troubleshooting' },
];

function TerminalBlock({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      style={{
        margin: '16px 0 24px',
        borderRadius: 12,
        border: '1px solid rgba(34,211,238,0.28)',
        background: '#090b10',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.03)',
        }}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
          <span style={{ marginLeft: 8, fontFamily: 'monospace', fontSize: 12, color: '#64748b' }}>
            {title}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          style={{
            fontSize: 11,
            fontFamily: 'monospace',
            padding: '4px 10px',
            borderRadius: 6,
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.05)',
            color: copied ? '#34d399' : '#94a3b8',
            cursor: 'pointer',
          }}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre
        style={{
          margin: 0,
          padding: '16px 20px',
          fontFamily: 'ui-monospace, monospace',
          fontSize: 13,
          lineHeight: 1.65,
          color: '#e2e8f0',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {code}
      </pre>
    </div>
  );
}

function H2({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      style={{
        fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
        fontWeight: 600,
        letterSpacing: '-0.02em',
        margin: '0 0 14px',
        paddingBottom: 8,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        color: '#f8fafc',
        scrollMarginTop: 90,
      }}
    >
      {children}
    </h2>
  );
}

function Para({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontSize: 15, lineHeight: 1.65, color: '#94a3b8', margin: '0 0 16px' }}>
      {children}
    </p>
  );
}

export default function Docs({ onBack }: { onBack: () => void }) {
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState('sec-what-is-oblivion');

  const filtered = useMemo(() => {
    const s = query.trim().toLowerCase();
    if (!s) return SECTIONS;
    return SECTIONS.filter((x) => x.title.toLowerCase().includes(s));
  }, [query]);

  const scrollToSection = useCallback((id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 120) current = s.id;
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ background: '#0c0e12', color: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          background: 'rgba(12,14,18,0.92)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button
            type="button"
            onClick={onBack}
            style={{
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.06)',
              color: '#fff',
              padding: '6px 16px',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            ← Back to Landing
          </button>
          <strong style={{ fontFamily: 'monospace', fontSize: 14 }}>
            OBLIVION <span style={{ color: '#22d3ee' }}>USER MANUAL</span>
          </strong>
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 13 }}>
          <a href={GH} target="_blank" rel="noreferrer" style={{ color: '#94a3b8', textDecoration: 'none' }}>
            GitHub
          </a>
          <a href={PYPI} target="_blank" rel="noreferrer" style={{ color: '#22d3ee', textDecoration: 'none', fontWeight: 600 }}>
            PyPI v3.1.0
          </a>
        </div>
      </header>

      {/* FIXED SIDEBAR - stays locked on left while main panel scrolls */}
      <aside
        className="docs-sidebar"
        style={{
          position: 'fixed',
          top: 64,
          left: 0,
          bottom: 0,
          width: 300,
          padding: '24px 20px 32px',
          overflowY: 'auto',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          background: '#0c0e12',
          zIndex: 50,
          boxSizing: 'border-box',
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search manual..."
          style={{
            width: '100%',
            boxSizing: 'border-box',
            marginBottom: 16,
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)',
            color: '#fff',
            fontSize: 13,
            outline: 'none',
          }}
        />
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.12em',
            color: '#22d3ee',
            marginBottom: 12,
            fontFamily: 'monospace',
          }}
        >
          TABLE OF CONTENTS
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {filtered.map((s) => {
            const active = activeId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToSection(s.id)}
                style={{
                  textAlign: 'left',
                  border: active ? '1px solid rgba(34,211,238,0.45)' : '1px solid transparent',
                  background: active ? 'rgba(34,211,238,0.14)' : 'transparent',
                  color: active ? '#a5f3fc' : '#94a3b8',
                  borderRadius: 8,
                  padding: '8px 12px',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                }}
              >
                {s.title}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main
        className="docs-main"
        style={{
          marginLeft: 300,
          paddingTop: 64,
          minHeight: '100vh',
          width: 'calc(100% - 300px)',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ padding: '32px 40px 80px' }}>
          <div
            style={{
              padding: 32,
              borderRadius: 16,
              border: '1px solid rgba(34,211,238,0.3)',
              background:
                'radial-gradient(ellipse at top left, rgba(34,211,238,0.16), rgba(12,14,18,0.95) 70%)',
              marginBottom: 40,
            }}
          >
            <h1
              style={{
                margin: '0 0 12px',
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Oblivion Complete User Manual
            </h1>
            <Para>
              Step-by-step documentation for installing, configuring, and running M.E.E.R.A. and the
              ReAct autonomous coding agent.
            </Para>
          </div>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-what-is-oblivion">1. What Is Oblivion?</H2>
            <Para>
              Oblivion is a terminal-native AI coding assistant that lives inside your codebase,
              understands it semantically, and helps you build software through natural conversation.
              Free open-source MIT alternative to Copilot/Cursor-style tools. No GPU required.
            </Para>
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-installation">2. Installation</H2>
            <Para>Four install variants:</Para>
            <TerminalBlock
              title="bash"
              code={
                'pip install oblivion-agent\n' +
                'pip install "oblivion-agent[voice]"\n' +
                'pip install "oblivion-agent[premium-voice]"\n' +
                'pip install "oblivion-agent[all]"'
              }
            />
            <Para>Requires Python 3.11+. No GPU needed.</Para>
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-first-time-setup">3. First-Time Setup</H2>
            <Para>Run the setup wizard to save API keys to ~/.oblivion/config.env:</Para>
            <TerminalBlock title="bash" code="oblivion init" />
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-launching-oblivion">4. Launching Oblivion</H2>
            <TerminalBlock
              title="cli"
              code={
                'oblivion\n' +
                'oblivion mcp\n' +
                'oblivion inspect\n' +
                'oblivion init\n' +
                'oblivion --version'
              }
            />
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-the-interface">5. The Interface</H2>
            <Para>
              3-panel cyberpunk TUI: Chat (left), Agent Log + files (right), status bar with
              model/tokens/steps.
            </Para>
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-talking-to-oblivion">6. Talking to Oblivion</H2>
            <TerminalBlock
              title="prompt"
              code={'"Refactor parse_llm_output to handle malformed JSON gracefully."'}
            />
            <Para>
              Async ReAct loop up to 15 iterations with safety guards.
            </Para>
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-slash-commands">7. Slash Commands</H2>
            <TerminalBlock
              title="commands"
              code={
                '/help /clear /quit /stats\n' +
                '/model /model <name> /rates\n' +
                '/workspace <path> /newproject <name>\n' +
                '/index /index force\n' +
                '/memory /meera on|off /wake on|off\n' +
                '/save <name> /load <name>\n' +
                '/auto test|build|serve\n' +
                '/trust edit /switch'
              }
            />
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-keyboard-shortcuts">8. Keyboard Shortcuts</H2>
            <TerminalBlock
              title="keys"
              code={
                'Ctrl+T voice   Ctrl+G sessions\n' +
                'Ctrl+P palette Ctrl+L clear\n' +
                'Ctrl+N new     Ctrl+R reset\n' +
                'Ctrl+H help    Ctrl+Q quit'
              }
            />
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-tools-reference">9. Tools (38 Total)</H2>
            <Para>
              Read (22 auto), Mutate (13 approval), Destructive (run_bash dangerous patterns always
              prompt).
            </Para>
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-permission-system">10. Permission System</H2>
            <Para>
              /trust edit pre-approves writes. /auto session auto-approve. Destructive actions are never
              auto-approved.
            </Para>
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-models-fallback-chain">11. Models and Fallback Chain</H2>
            <TerminalBlock
              title="fallback"
              code={
                '1. ollama/gemma4:31b-cloud   (Unlimited)\n' +
                '2. gemini/gemini-2.5-flash    (250/day)\n' +
                '3. groq/llama-3.3-70b         (30/min)\n' +
                '4. openrouter/gemma-4-31b     (50/day)\n' +
                '5. openrouter/gpt-oss-20b     (50/day)\n' +
                '6. ollama/qwen3.5:4b          (Local, offline)'
              }
            />
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-voice-mode-meera">12. Voice Mode (M.E.E.R.A.)</H2>
            <TerminalBlock
              title="voice"
              code={'/meera on\n/meera persona aria\n/voice model small\n/voice devices'}
            />
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-wake-word">13. Wake Word</H2>
            <TerminalBlock title="wake" code={'/wake on\n/wake sensitivity 0.7\n/wake status'} />
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-workspaces-projects">14. Workspaces and Projects</H2>
            <TerminalBlock
              title="workspace"
              code={'/workspace /path/to/repo\n/newproject app\n/projects'}
            />
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-code-intelligence">15. Code Intelligence</H2>
            <Para>Hybrid search: FTS5 symbols + full-text + ChromaDB embeddings.</Para>
            <TerminalBlock title="index" code={'/index\n/index force\n/watch on'} />
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-memory-file">16. Memory (MEMORY.md)</H2>
            <TerminalBlock title="memory" code={'/memory\n/memory stats\n/memory clear'} />
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-sessions">17. Sessions</H2>
            <TerminalBlock
              title="sessions"
              code={'/save auth-refactor\n/load auth-refactor\n/sessions'}
            />
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-knowledge-packs">18. Knowledge Packs</H2>
            <Para>
              14 packs (React, Next.js, Django, FastAPI, Docker, Security, Testing, Database)
              auto-loaded.
            </Para>
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-automation">19. Automation (/auto)</H2>
            <TerminalBlock
              title="auto"
              code={'/auto build\n/auto test\n/auto serve\n/auto check\n/auto --persist'}
            />
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-mcp-server-mode">20. MCP Server Mode</H2>
            <TerminalBlock title="mcp" code={'oblivion mcp\noblivion inspect'} />
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-file-watcher">21. File Watcher</H2>
            <TerminalBlock title="watch" code={'/watch on\n/watch off\n/watch status'} />
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-microprocessor-simulator">22. 8085 Microprocessor Simulator</H2>
            <Para>
              Type /switch for Intel 8085 simulator with registers, flags, assembler, and step
              explanations.
            </Para>
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-configuration-reference">23. Configuration Reference</H2>
            <TerminalBlock
              title="~/.oblivion/config.env"
              code={
                'DEFAULT_MODEL=ollama/gemma4:31b-cloud\n' +
                'GEMINI_API_KEY=...\n' +
                'GROQ_API_KEY=...\n' +
                'MAX_TOKENS=8192\n' +
                'TEMPERATURE=0.1\n' +
                'MAX_ITERATIONS=15'
              }
            />
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-updating-oblivion">24. Updating Oblivion</H2>
            <TerminalBlock title="update" code={'/update\n/update install\n/update changelog'} />
          </section>

          <section style={{ marginBottom: 48 }}>
            <H2 id="sec-troubleshooting">25. Troubleshooting</H2>
            <Para>
              Rate limits: /rates. Stale search: /index force. Voice: /voice devices. Fewer prompts:
              /trust edit or /auto.
            </Para>
          </section>
        </div>
      </main>
    </div>
  );
}

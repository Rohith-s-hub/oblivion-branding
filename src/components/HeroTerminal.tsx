import { useEffect, useRef, useState } from 'react';
import TerminalWindow from './TerminalWindow';

interface Line {
  content: string;
  type: 'prompt' | 'output' | 'blank' | 'meera' | 'step' | 'success' | 'info' | 'warning' | 'dim' | 'comment';
  delay: number;
}

const SCRIPT: Line[] = [
  { type: 'comment', content: '# Initialize Oblivion agent in your project', delay: 0 },
  { type: 'prompt', content: '❯ oblivion', delay: 300 },
  { type: 'blank', content: '', delay: 100 },
  { type: 'meera', content: '  ╔═══════════════════════════════════════════╗', delay: 200 },
  { type: 'meera', content: '  ║  M.E.E.R.A. — Oblivion Agent v2.4.1      ║', delay: 80 },
  { type: 'meera', content: '  ║  Multi-model Execution & Reasoning Arch.  ║', delay: 80 },
  { type: 'meera', content: '  ╚═══════════════════════════════════════════╝', delay: 80 },
  { type: 'blank', content: '', delay: 120 },
  { type: 'info', content: '  models    6-chain fallback · groq / gemini / mistral', delay: 80 },
  { type: 'info', content: '  tools     38 tools · 3-tier permission system', delay: 60 },
  { type: 'info', content: '  memory    FTS5 + ChromaDB + semantic search', delay: 60 },
  { type: 'info', content: '  session   ./projects/api-refactor', delay: 60 },
  { type: 'blank', content: '', delay: 150 },
  { type: 'dim', content: '  Type a task or /help for commands', delay: 60 },
  { type: 'blank', content: '', delay: 80 },
  { type: 'prompt', content: '❯ Refactor the auth module to use JWT — remove session cookies', delay: 600 },
  { type: 'blank', content: '', delay: 100 },
  { type: 'step', content: '  [REASON]  Scanning codebase for auth-related files…', delay: 200 },
  { type: 'dim', content: '  ⟳ fts5_search("session auth cookie") → 14 matches', delay: 300 },
  { type: 'step', content: '  [ACT]     Reading src/auth/middleware.py, routes/login.py', delay: 200 },
  { type: 'dim', content: '  ⟳ read_file · read_file · semantic_search("JWT implementation")', delay: 250 },
  { type: 'step', content: '  [REASON]  Planning: 3 files to modify, 1 to create', delay: 200 },
  { type: 'step', content: '  [ACT]     Creating src/auth/jwt_handler.py', delay: 300 },
  { type: 'success', content: '  ✓ jwt_handler.py created (87 lines)', delay: 200 },
  { type: 'step', content: '  [ACT]     Patching middleware.py — replacing SessionMiddleware', delay: 150 },
  { type: 'success', content: '  ✓ middleware.py updated (tier-2 write approved)', delay: 200 },
  { type: 'step', content: '  [ACT]     Running tests: pytest src/auth/', delay: 300 },
  { type: 'success', content: '  ✓ 12/12 tests passed · 0 failures', delay: 400 },
  { type: 'blank', content: '', delay: 100 },
  { type: 'meera', content: '  Done. JWT auth is live. Session cookie references removed.', delay: 200 },
  { type: 'meera', content: '  Modified 3 files · created 1 · all tests green.', delay: 80 },
];

export default function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [runId, setRunId] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => {
    clearTimers();
    setVisibleLines(0);

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const startDelay = prefersReduced ? 0 : 600;

    const startTimer = setTimeout(() => {
      if (prefersReduced) {
        setVisibleLines(SCRIPT.length);
        return;
      }

      let total = 0;
      SCRIPT.forEach((line, i) => {
        total += line.delay;
        const t = setTimeout(() => setVisibleLines(i + 1), total);
        timersRef.current.push(t);
      });

      // loop
      const loopTimer = setTimeout(() => {
        setRunId((n) => n + 1);
      }, total + 2800);
      timersRef.current.push(loopTimer);
    }, startDelay);

    timersRef.current.push(startTimer);

    return clearTimers;
  }, [runId]);

  const colorMap: Record<string, string> = {
    prompt: '#a78bfa',
    meera: '#c084fc',
    step: '#60a5fa',
    success: '#34d399',
    info: '#7dd3fc',
    warning: '#fbbf24',
    dim: '#6b7280',
    comment: '#6b7280',
    output: '#c0c8d4',
  };

  return (
    <TerminalWindow title="oblivion-agent — ~/projects/api-refactor" minHeight="420px">
      <div
        style={{
          fontFamily: 'var(--font-mono), ui-monospace, monospace',
          fontSize: '12.5px',
          lineHeight: 1.65,
          minHeight: '360px',
          color: '#c0c8d4',
        }}
      >
        {SCRIPT.map((line, i) => {
          if (i >= visibleLines) return null;

          if (line.type === 'blank') {
            return <div key={i} style={{ height: 8 }} />;
          }

          const isPrompt = line.type === 'prompt';
          const isLatest = i === visibleLines - 1;

          return (
            <div
              key={`${runId}-${i}`}
              style={{
                color: colorMap[line.type] || '#c0c8d4',
                fontStyle: line.type === 'comment' ? 'italic' : 'normal',
                whiteSpace: 'pre',
              }}
            >
              {isPrompt ? (
                <>
                  <span style={{ color: '#a78bfa' }}>❯ </span>
                  <span style={{ color: '#e8eaed' }}>
                    {line.content.replace(/^❯\s?/, '')}
                  </span>
                  {isLatest && (
                    <span
                      className="cursor-blink"
                      style={{
                        display: 'inline-block',
                        width: 7,
                        height: '1em',
                        marginLeft: 2,
                        background: '#a78bfa',
                        verticalAlign: 'text-bottom',
                      }}
                    />
                  )}
                </>
              ) : (
                <>
                  {line.content}
                  {isLatest && i === SCRIPT.length - 1 && (
                    <span
                      className="cursor-blink"
                      style={{
                        display: 'inline-block',
                        width: 7,
                        height: '1em',
                        marginLeft: 2,
                        background: '#a78bfa',
                        verticalAlign: 'text-bottom',
                      }}
                    />
                  )}
                </>
              )}
            </div>
          );
        })}

        {/* Fallback if animation hasn't painted yet */}
        {visibleLines === 0 && (
          <div style={{ color: '#6b7280', fontStyle: 'italic' }}>
            # Initialize Oblivion agent in your project
            <span
              className="cursor-blink"
              style={{
                display: 'inline-block',
                width: 7,
                height: '1em',
                marginLeft: 4,
                background: '#a78bfa',
                verticalAlign: 'text-bottom',
              }}
            />
          </div>
        )}
      </div>
    </TerminalWindow>
  );
}

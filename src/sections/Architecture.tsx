import { useCardMouseGlow } from '../hooks/useMouseGlow';

const TIERS = [
  {
    tier: 1,
    name: 'Auto-Approved Read Tier',
    description: 'Read-only, non-mutating inspection actions run automatically with zero confirmation delays.',
    tools: ['read_file', 'list_dir', 'grep_files', 'search_code', 'find_symbol', 'list_symbols', 'project_map'],
    badgeColor: '#22d3ee',
  },
  {
    tier: 2,
    name: 'Gated Mutate Tier',
    description: 'Code modification and creation actions require explicit prompt confirmation unless pre-approved.',
    tools: ['write_file', 'edit_file', 'insert_after', 'create_dir', 'git_commit', 'batch_apply'],
    badgeColor: '#8b5cf6',
  },
  {
    tier: 3,
    name: 'Sandboxed Destructive Tier',
    description: 'Arbitrary shell execution and system commands are isolated and always require manual approval.',
    tools: ['run_bash'],
    badgeColor: '#ef4444',
  },
];

export default function Architecture() {
  const cardRef1 = useCardMouseGlow();
  const cardRef2 = useCardMouseGlow();
  const cardRef3 = useCardMouseGlow();

  return (
    <section
      id="architecture"
      style={{
        position: 'relative',
        width: '100%',
        padding: '100px var(--page-pad, 48px)',
        background: 'var(--bg-base, #0c0e12)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div
              style={{
                width: '28px',
                height: '2px',
                background: 'linear-gradient(90deg, #8b5cf6, #22d3ee)',
                borderRadius: '2px',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent, #8b5cf6)',
              }}
            >
              Architecture
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              color: 'var(--text-primary, #f8fafc)',
              margin: '0 0 12px 0',
            }}
          >
            38 tools. One deliberate hierarchy.
          </h2>
          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.65,
              color: 'var(--text-secondary, #94a3b8)',
              maxWidth: '640px',
              margin: 0,
            }}
          >
            Every capability in Oblivion is a named, typed tool call — inspectable, traceable, and gated by a 3-tier permission system. Nothing runs in the dark.
          </p>
        </div>

        {/* 3-Layer Hybrid Search Banner */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '40px',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '12px', color: '#8b5cf6', marginBottom: '20px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            — 3-Layer Hybrid Search
          </div>

          <div
            className="arch-search-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Layer 01</div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#22d3ee', margin: '0 0 8px 0' }}>FTS5</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#94a3b8', margin: 0 }}>
                SQLite Full-Text Search. Fast, exact, sub-millisecond keyword matching across symbols, paths, and docstrings.
              </p>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Layer 02</div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#c084fc', margin: '0 0 8px 0' }}>ChromaDB</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#94a3b8', margin: 0 }}>
                Vector Semantic Search. Embedding-based similarity search using all-MiniLM embeddings to find conceptually related code.
              </p>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Layer 03</div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#818cf8', margin: '0 0 8px 0' }}>Symbolic</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#94a3b8', margin: 0 }}>
                AST Symbol Index. Language-aware symbol resolution for class definitions, functions, and import call-graphs.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {TIERS.map((t, idx) => {
            const cardRef = idx === 0 ? cardRef1 : idx === 1 ? cardRef2 : cardRef3;
            return (
              <div
                key={t.tier}
                ref={cardRef}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 10px',
                      borderRadius: '20px',
                      background: `${t.badgeColor}22`,
                      color: t.badgeColor,
                      border: `1px solid ${t.badgeColor}55`,
                    }}
                  >
                    TIER {t.tier}
                  </span>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: '#f8fafc' }}>
                    {t.name}
                  </span>
                </div>

                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#94a3b8', margin: 0 }}>
                  {t.description}
                </p>

                <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {t.tools.map((tool) => (
                    <code
                      key={tool}
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '12px',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: '#cbd5e1',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      {tool}
                    </code>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

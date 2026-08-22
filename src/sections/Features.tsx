import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCardMouseGlow } from '../hooks/useMouseGlow';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  meta: string;
  index: number;
}

function FeatureCard({ icon, title, description, meta, index }: FeatureCardProps) {
  const cardRef = useCardMouseGlow<HTMLDivElement>();

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
      style={{ height: '100%' }}
    >
      <div
        ref={cardRef}
        className="feature-card"
        style={{
          position: 'relative',
          height: '100%',
          minHeight: 280,
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 16,
          padding: '32px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          overflow: 'hidden',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
          willChange: 'transform',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
          e.currentTarget.style.background = 'rgba(139, 92, 246, 0.05)';
          e.currentTarget.style.boxShadow =
            '0 20px 50px rgba(0,0,0,0.35), 0 0 0 1px rgba(139,92,246,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Cursor-follow glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139,92,246,0.16), transparent 42%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            height: '100%',
          }}
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.32)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#a78bfa',
              boxShadow: '0 0 24px rgba(139,92,246,0.15)',
            }}
          >
            {icon}
          </motion.div>

          <h3
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: '#f8fafc',
              margin: 0,
              letterSpacing: '-0.015em',
            }}
          >
            {title}
          </h3>

          <p
            style={{
              fontSize: 14,
              lineHeight: 1.65,
              color: '#94a3b8',
              margin: 0,
            }}
          >
            {description}
          </p>

          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 11,
              color: '#64748b',
              marginTop: 'auto',
              letterSpacing: '0.02em',
            }}
          >
            {meta}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

const FEATURES = [
  {
    title: 'Persistent session memory',
    description:
      "M.E.E.R.A. indexes your codebase on first run and persists semantic memory across sessions — so context doesn't reset every time you open a new terminal.",
    meta: 'memory backend: SQLite + ChromaDB · zero cloud dependency',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Voice I/O — speak, don't type",
    description:
      'Optional voice input and text-to-speech output. Give a task while your hands are on the whiteboard. Hear the agent report back.',
    meta: 'whisper-based STT · OS-native TTS fallback · toggleable per session',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="14" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
      </svg>
    ),
  },
  {
    title: 'MCP server support',
    description:
      'Exposes a Model Context Protocol server — plug Oblivion into editors, CI runners, or your own orchestration layers as a programmable context provider.',
    meta: 'MCP 1.x compliant · stdio and HTTP transport',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    title: 'No GPU. No cloud. No excuses.',
    description:
      'Built and tested on 13GB RAM, no discrete GPU. The search, indexing, and reasoning stack runs comfortably on commodity hardware — on a flight, in a coffee shop.',
    meta: 'tested on: MacBook Air M1 · ThinkPad X1 · VPS (2 vCPU, 4GB)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: '6-model fallback chain',
    description:
      'Configure a priority list of models and providers. If one fails, rate-limits, or times out, the next in chain takes over — transparently, without breaking the ReAct loop.',
    meta: 'groq · gemini · mistral · claude · gpt-4o · ollama (local)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="7 13 12 18 17 13" />
        <polyline points="7 6 12 11 17 6" />
      </svg>
    ),
  },
  {
    title: 'Hidden 8085 CPU simulator',
    description:
      'Type /switch inside the agent to drop into a fully interactive Intel 8085 simulator — registers, flags, memory, the works. A nod to the hardware it runs on.',
    meta: '↳ not a gimmick. it actually runs 8085 assembly.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
];

export default function Features() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });

  return (
    <section
      id="features"
      style={{
        position: 'relative',
        width: '100%',
        padding: '110px var(--page-pad, 48px) 100px',
        background: 'var(--bg-base, #0c0e12)',
        overflow: 'hidden',
      }}
    >
      {/* Soft ambient backdrop */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(900px, 90vw)',
          height: 420,
          background:
            'radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(34,211,238,0.04) 45%, transparent 70%)',
          filter: 'blur(8px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1440, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: 56, maxWidth: 820 }}>
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}
          >
            <div
              style={{
                width: 28,
                height: 2,
                borderRadius: 2,
                background: 'linear-gradient(90deg, #8b5cf6, #22d3ee)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#8b5cf6',
              }}
            >
              Capabilities
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              color: '#f8fafc',
              margin: '0 0 6px 0',
            }}
          >
            Everything you need.
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              color: '#64748b',
              margin: 0,
            }}
          >
            Nothing you don&apos;t.
          </motion.h2>
        </div>

        {/* 3 × 2 grid */}
        <div
          className="features-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 20,
            marginBottom: 36,
          }}
        >
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>

        {/* Easter egg strip — no docs button here */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(255, 255, 255, 0.015)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 12,
            padding: '16px 24px',
            marginBottom: 28,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 12,
              color: '#8b5cf6',
            }}
          >
            // easter egg: run <span style={{ color: '#f8fafc' }}>oblivion</span>, then type{' '}
            <span style={{ color: '#f8fafc' }}>/switch</span> and hold on to something.
          </span>
        </motion.div>

        {/* FULL-WIDTH docs CTA — separate button below */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 18,
            padding: '36px 24px 8px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#64748b',
            }}
          >
            Documentation
          </div>
          <p
            style={{
              margin: 0,
              maxWidth: 480,
              fontSize: 15,
              lineHeight: 1.6,
              color: '#94a3b8',
            }}
          >
            Full install guide, slash commands, permissions, voice, MCP, and troubleshooting —
            written for real terminal work.
          </p>

          <motion.a
            href="#docs"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              marginTop: 6,
              padding: '16px 36px',
              minWidth: 260,
              borderRadius: 999,
              textDecoration: 'none',
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: '#0c0e12',
              background: 'linear-gradient(135deg, #e9d5ff 0%, #c4b5fd 40%, #a78bfa 100%)',
              boxShadow:
                '0 10px 40px rgba(139, 92, 246, 0.35), 0 0 0 1px rgba(255,255,255,0.12) inset',
              cursor: 'pointer',
            }}
          >
            Explore docs &amp; manual
            <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .features-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 600px) {
          .features-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

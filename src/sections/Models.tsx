import { useEffect, useRef, useState, useCallback } from 'react';

type Tier = 'Free tier' | 'Paid' | 'Local';

interface ModelCard {
  id: string;
  name: string;
  provider: string;
  tier: Tier;
  blurb: string;
  accent: string;
  accent2: string;
  logo: string;
  fallback: string;
  apiKeyUrl: string;
}

const MODELS: ModelCard[] = [
  {
    id: 'gemini-2-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    tier: 'Free tier',
    blurb: 'Fast multimodal workhorse for planning, search, and everyday refactors in the fallback chain.',
    accent: '#1a73e8',
    accent2: '#8ab4f8',
    logo: '/models/gemini-flash.png',
    fallback: 'G',
    apiKeyUrl: 'https://aistudio.google.com/app/apikey',
  },
  {
    id: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    tier: 'Paid',
    blurb: 'Long-context reasoning for large codebases, multi-file edits, and deep architectural plans.',
    accent: '#4285f4',
    accent2: '#f9ab00',
    logo: '/models/gemini-pro.png',
    fallback: 'G+',
    apiKeyUrl: 'https://aistudio.google.com/app/apikey',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    tier: 'Paid',
    blurb: 'Strong general coding and tool-use model for complex patches when upstream providers throttle.',
    accent: '#10a37f',
    accent2: '#1a7f64',
    logo: '/models/gpt-4o.png',
    fallback: 'OAI',
    apiKeyUrl: 'https://platform.openai.com/api-keys',
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini',
    provider: 'OpenAI',
    tier: 'Paid',
    blurb: 'Cheap, snappy assistant tier for summaries, commit messages, and lightweight edits.',
    accent: '#0d8c6d',
    accent2: '#74e0c2',
    logo: '/models/gpt-4o-mini.png',
    fallback: 'o',
    apiKeyUrl: 'https://platform.openai.com/api-keys',
  },
  {
    id: 'claude-sonnet',
    name: 'Claude Sonnet',
    provider: 'Anthropic',
    tier: 'Paid',
    blurb: 'Excellent structured coding and careful diffs — preferred for high-stakes refactors.',
    accent: '#d4a27f',
    accent2: '#c96442',
    logo: '/models/claude-sonnet.png',
    fallback: 'A',
    apiKeyUrl: 'https://console.anthropic.com/settings/keys',
  },
  {
    id: 'claude-haiku',
    name: 'Claude Haiku',
    provider: 'Anthropic',
    tier: 'Paid',
    blurb: 'Low-latency tier for quick classifications, routing, and short tool loops.',
    accent: '#c96442',
    accent2: '#f0d3b8',
    logo: '/models/claude-haiku.png',
    fallback: 'h',
    apiKeyUrl: 'https://console.anthropic.com/settings/keys',
  },
  {
    id: 'llama-3-3-70b',
    name: 'Llama 3.3 70B',
    provider: 'Groq / Meta',
    tier: 'Free tier',
    blurb: 'Groq-hosted speed demon — primary free-path model for ReAct steps and tool calls.',
    accent: '#0668E1',
    accent2: '#f55036',
    logo: '/models/llama-70b.png',
    fallback: 'L70',
    apiKeyUrl: 'https://console.groq.com/keys',
  },
  {
    id: 'llama-3-1-8b',
    name: 'Llama 3.1 8B',
    provider: 'Groq / Meta',
    tier: 'Free tier',
    blurb: 'Ultra-fast small model for classification, routing, and cheap intermediate reasoning.',
    accent: '#e85d3b',
    accent2: '#ffb4a2',
    logo: '/models/llama-8b.png',
    fallback: 'L8',
    apiKeyUrl: 'https://console.groq.com/keys',
  },
  {
    id: 'qwen-2-5-72b',
    name: 'Qwen 2.5 72B',
    provider: 'Alibaba / Open',
    tier: 'Free tier',
    blurb: 'Top-tier open weights model with exceptional coding and mathematical reasoning capabilities.',
    accent: '#615ced',
    accent2: '#a5a2f8',
    logo: '/models/qwen.png',
    fallback: 'Qw',
    apiKeyUrl: 'https://openrouter.ai/keys',
  },
  {
    id: 'cohere-command-r',
    name: 'Cohere Command R+',
    provider: 'Cohere',
    tier: 'Paid',
    blurb: 'Enterprise-grade model engineered specifically for complex tool-use and retrieval augmented generation.',
    accent: '#39594d',
    accent2: '#688f80',
    logo: '/models/cohere.png',
    fallback: 'Co',
    apiKeyUrl: 'https://dashboard.cohere.com/api-keys',
  },
  {
    id: 'xai-grok-2',
    name: 'Grok 2',
    provider: 'xAI',
    tier: 'Paid',
    blurb: 'High-speed reasoning model capable of processing complex codebase context and fast diff generation.',
    accent: '#f4f4f5',
    accent2: '#8b5cf6',
    logo: '/models/grok.png',
    fallback: 'X',
    apiKeyUrl: 'https://console.x.ai/',
  },
  {
    id: 'deepseek-coder',
    name: 'DeepSeek Coder',
    provider: 'DeepSeek',
    tier: 'Paid',
    blurb: 'Code-specialized model for implementation-heavy tasks and tight algorithmic work.',
    accent: '#4d6bfe',
    accent2: '#7b93ff',
    logo: '/models/deepseek.png',
    fallback: 'DS',
    apiKeyUrl: 'https://platform.deepseek.com/api_keys',
  },
  {
    id: 'ollama-local',
    name: 'Ollama (Local)',
    provider: 'Local / BYO',
    tier: 'Local',
    blurb: 'Run fully offline with your own weights — zero API cost, full privacy, modest hardware.',
    accent: '#8b5cf6',
    accent2: '#22d3ee',
    logo: '/models/ollama.png',
    fallback: 'Ol',
    apiKeyUrl: 'https://ollama.com/',
  },
];

function tierStyle(tier: Tier): { bg: string; fg: string; border: string } {
  if (tier === 'Free tier') {
    return { bg: 'rgba(52, 211, 153, 0.12)', fg: '#6ee7b7', border: 'rgba(52, 211, 153, 0.35)' };
  }
  if (tier === 'Local') {
    return { bg: 'rgba(139, 92, 246, 0.14)', fg: '#c4b5fd', border: 'rgba(139, 92, 246, 0.4)' };
  }
  return { bg: 'rgba(251, 191, 36, 0.1)', fg: '#fbbf24', border: 'rgba(251, 191, 36, 0.35)' };
}

function ModelLogo({ model }: { model: ModelCard }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div
      className="model-card"
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        borderRadius: 18,
        overflow: 'hidden',
        background: '#0a0c10',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 32px rgba(0,0,0,0.45)',
        transform: 'translateZ(0)',
      }}
    >
      {imgOk ? (
        <img
          src={model.logo}
          alt={model.name + ' cover'}
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={() => setImgOk(false)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      ) : (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            background:
              'radial-gradient(120% 80% at 20% 20%, ' +
              model.accent2 +
              '33 0%, transparent 50%), radial-gradient(100% 100% at 80% 80%, ' +
              model.accent +
              '44 0%, #0a0c10 64%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: 16,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-sans), system-ui, sans-serif',
              fontWeight: 700,
              fontSize: model.fallback.length > 2 ? 13 : 20,
              color: '#fff',
              background: 'linear-gradient(145deg, ' + model.accent + ', ' + model.accent2 + ')',
              boxShadow: '0 0 32px ' + model.accent + '66',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {model.fallback}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans), system-ui, sans-serif',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#f8fafc',
            }}
          >
            {model.name}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Models() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const rafRef = useRef(0);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateArrows);
    };

    updateArrows();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateArrows]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-model-card]');
    const amount = card ? card.offsetWidth + 20 : 280;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <section
      id="models"
      style={{
        position: 'relative',
        width: '100%',
        padding: '90px 0 80px',
        background: 'var(--bg-base, #0c0e12)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(900px, 90vw)',
          height: 420,
          background:
            'radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(34,211,238,0.04) 45%, transparent 70%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      {/* Header Container */}
      <div
        style={{
          width: 'min(1380px, 100%)',
          margin: '0 auto',
          padding: '0 var(--page-pad, 48px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
            marginBottom: 32,
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
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
                  color: 'var(--accent, #8b5cf6)',
                }}
              >
                Model roster · 13 in chain
              </span>
            </div>
            <h2
              style={{
                margin: '0 0 12px',
                fontSize: 'clamp(2rem, 4.2vw, 3.2rem)',
                fontWeight: 550,
                letterSpacing: '-0.035em',
                lineHeight: 1.08,
                color: 'var(--text-primary, #f8fafc)',
              }}
            >
              13 models. One fallback chain.
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.6,
                color: 'var(--text-secondary, #94a3b8)',
                maxWidth: 540,
              }}
            >
              Oblivion routes across free, paid, and local models — so a rate limit never stops the
              ReAct loop. Click any model to get your API key.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              aria-label="Scroll models left"
              disabled={!canLeft}
              onClick={() => scrollByCard(-1)}
              style={{
                width: 42,
                height: 42,
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.12)',
                background: canLeft ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                color: canLeft ? '#f8fafc' : 'rgba(248,250,252,0.3)',
                cursor: canLeft ? 'pointer' : 'default',
                fontSize: 16,
              }}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Scroll models right"
              disabled={!canRight}
              onClick={() => scrollByCard(1)}
              style={{
                width: 42,
                height: 42,
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.12)',
                background: canRight ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                color: canRight ? '#f8fafc' : 'rgba(248,250,252,0.3)',
                cursor: canRight ? 'pointer' : 'default',
                fontSize: 16,
              }}
            >
              →
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
          {(['Free tier', 'Paid', 'Local'] as Tier[]).map((tier) => {
            const c = tierStyle(tier);
            return (
              <span
                key={tier}
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 11,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '4px 12px',
                  borderRadius: 999,
                  background: c.bg,
                  color: c.fg,
                  border: '1px solid ' + c.border,
                }}
              >
                {tier}
              </span>
            );
          })}
        </div>
      </div>

      {/* Centered Rail Wrapper with Left & Right Dark Fade Masks */}
      <div
        style={{
          position: 'relative',
          width: 'min(1380px, 100%)',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 'clamp(36px, 7vw, 80px)',
            background: 'linear-gradient(to right, var(--bg-base, #0c0e12) 15%, transparent 100%)',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 'clamp(36px, 7vw, 80px)',
            background: 'linear-gradient(to left, var(--bg-base, #0c0e12) 15%, transparent 100%)',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />

        {/* Scrollable Cards Rail */}
        <div
          ref={scrollerRef}
          className="models-rail"
          style={{
            display: 'flex',
            gap: 20,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            padding: '8px var(--page-pad, 48px) 16px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            transform: 'translateZ(0)',
          }}
        >
          {MODELS.map((m) => {
            const t = tierStyle(m.tier);
            return (
              <a
                key={m.id}
                href={m.apiKeyUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-model-card
                style={{
                  flex: '0 0 min(270px, 70vw)',
                  scrollSnapAlign: 'start',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                }}
              >
                <ModelLogo model={m} />
                <div style={{ padding: '0 2px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '1.08rem',
                        fontWeight: 600,
                        letterSpacing: '-0.025em',
                        lineHeight: 1.25,
                        color: 'var(--text-primary, #f8fafc)',
                      }}
                    >
                      {m.name}
                    </h3>
                    <span
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono), monospace',
                        color: '#22d3ee',
                        opacity: 0.85,
                      }}
                    >
                      Get API Key ↗
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 8,
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 11,
                        color: 'var(--text-tertiary, #64748b)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {m.provider}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 10,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: t.bg,
                        color: t.fg,
                        border: '1px solid ' + t.border,
                      }}
                    >
                      {m.tier}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13.5,
                      lineHeight: 1.5,
                      color: 'var(--text-secondary, #94a3b8)',
                    }}
                  >
                    {m.blurb}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        .models-rail::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

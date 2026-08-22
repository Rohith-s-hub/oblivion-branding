import { useEffect, useState } from 'react';

const GH = 'https://github.com/Rohith-s-hub/Oblivion-agent';
const GH_ISSUES = 'https://github.com/Rohith-s-hub/Oblivion-agent/issues/new';
const MAILTO = 'mailto:rohith.oblivion@gmail.com?subject=Oblivion%20Feedback';

interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  timestamp: number;
}

const SEED_REVIEWS: Review[] = [
  {
    id: 'seed-1',
    name: 'S.Rajmohan',
    role: 'Backend Engineer',
    rating: 5,
    comment:
      'Ships real diffs in a terminal without the Cursor overhead. The ReAct loop and 3-tier permissions are exactly what I wanted.',
    timestamp: Date.now() - 86400000 * 4,
  },
  {
    id: 'seed-2',
    name: 'k.Jeshreena',
    role: 'ML Researcher',
    rating: 5,
    comment:
      'Free-tier fallback chain just works. Groq + Gemini + Ollama cloud rotating seamlessly saved my week during rate limits.',
    timestamp: Date.now() - 86400000 * 2,
  },
  {
    id: 'seed-3',
    name: 'M.Murugan',
    role: 'Indie Hacker',
    rating: 4,
    comment:
      'Voice mode via M.E.E.R.A. is surprisingly usable. 8085 sim is a lovely nerd flex.',
    timestamp: Date.now() - 86400000 * 1,
  },
];

const LS_KEY = 'oblivion_reviews_v1';

function loadReviews(): Review[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return SEED_REVIEWS;
    const parsed = JSON.parse(raw) as Review[];
    if (!Array.isArray(parsed)) return SEED_REVIEWS;
    // merge with seeds without duplicates
    const ids = new Set(parsed.map((r) => r.id));
    const merged = [...parsed];
    for (const s of SEED_REVIEWS) {
      if (!ids.has(s.id)) merged.push(s);
    }
    return merged.sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return SEED_REVIEWS;
  }
}

function saveReviews(list: Review[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return m + 'm ago';
  const h = Math.floor(m / 60);
  if (h < 24) return h + 'h ago';
  const d = Math.floor(h / 24);
  if (d < 30) return d + 'd ago';
  const mo = Math.floor(d / 30);
  return mo + 'mo ago';
}

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= (hover || value);
        return (
          <button
            key={n}
            type="button"
            aria-label={n + ' star'}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(n)}
            style={{
              background: 'transparent',
              border: 'none',
              padding: 2,
              cursor: 'pointer',
              color: active ? '#22d3ee' : 'rgba(148,163,184,0.4)',
              transition: 'color 0.15s ease, transform 0.15s ease',
              transform: active ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.3l-6.16 3.73 1.64-7.03L2 9.24l7.19-.62L12 2l2.81 6.62L22 9.24l-5.48 4.76 1.64 7.03z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

function StarRow({ value }: { value: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={n <= value ? '#22d3ee' : 'rgba(148,163,184,0.25)'}
        >
          <path d="M12 17.3l-6.16 3.73 1.64-7.03L2 9.24l7.19-.62L12 2l2.81 6.62L22 9.24l-5.48 4.76 1.64 7.03z" />
        </svg>
      ))}
    </div>
  );
}

export default function Feedback() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setReviews(loadReviews());
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || rating === 0 || !comment.trim()) return;
    const next: Review = {
      id: 'r-' + Date.now(),
      name: name.trim().slice(0, 40),
      role: role.trim().slice(0, 40) || 'Developer',
      rating,
      comment: comment.trim().slice(0, 400),
      timestamp: Date.now(),
    };
    const merged = [next, ...reviews];
    setReviews(merged);
    saveReviews(merged);
    setName('');
    setRole('');
    setRating(0);
    setComment('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3200);
  };

  const avg =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : '—';

  const shown = showAll ? reviews : reviews.slice(0, 4);

  return (
    <section
      id="feedback"
      style={{
        position: 'relative',
        width: '100%',
        padding: '80px var(--page-pad, 48px) 40px',
        background: 'var(--bg-base, #0c0e12)',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>
        {/* Faint credits-style header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20,
            opacity: 0.6,
          }}
        >
          <div
            style={{
              width: 24,
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.5))',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(148, 163, 184, 0.7)',
            }}
          >
            Community · Reviews & Queries
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)',
            gap: 48,
            alignItems: 'start',
          }}
          className="feedback-grid"
        >
          {/* Left: Rate + comment form */}
          <div>
            <h3
              style={{
                margin: '0 0 6px',
                fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)',
                fontWeight: 500,
                color: 'rgba(232, 234, 237, 0.85)',
                letterSpacing: '-0.02em',
              }}
            >
              Share a quick review
            </h3>
            <p
              style={{
                margin: '0 0 22px',
                fontSize: 14,
                color: 'rgba(148, 163, 184, 0.75)',
                lineHeight: 1.6,
              }}
            >
              How is Oblivion working for you? Your notes help shape the roadmap.
            </p>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  maxLength={40}
                  required
                  style={{
                    padding: '10px 12px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8,
                    color: '#f8fafc',
                    fontSize: 13.5,
                    outline: 'none',
                  }}
                />
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Role (optional)"
                  maxLength={40}
                  style={{
                    padding: '10px 12px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8,
                    color: '#f8fafc',
                    fontSize: 13.5,
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    color: 'rgba(148,163,184,0.7)',
                    textTransform: 'uppercase',
                  }}
                >
                  Rating
                </span>
                <StarInput value={rating} onChange={setRating} />
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What worked well? What would you improve?"
                maxLength={400}
                required
                rows={4}
                style={{
                  padding: '12px 14px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  color: '#f8fafc',
                  fontSize: 14,
                  lineHeight: 1.55,
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ fontSize: 11, color: 'rgba(148,163,184,0.55)', fontFamily: 'monospace' }}>
                  {submitted ? '✓ Thanks — your review was added.' : 'Stored locally in your browser.'}
                </span>
                <button
                  type="submit"
                  style={{
                    padding: '10px 22px',
                    borderRadius: 999,
                    border: '1px solid rgba(34,211,238,0.4)',
                    background: 'linear-gradient(115deg, rgba(34,211,238,0.14), rgba(139,92,246,0.14))',
                    color: '#e0f2fe',
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: '0.02em',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    boxShadow: '0 6px 20px rgba(34,211,238,0.12)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  Submit review
                </button>
              </div>
            </form>

            {/* Raise a query — muted, credits vibe */}
            <div
              style={{
                marginTop: 26,
                padding: '14px 16px',
                borderRadius: 10,
                border: '1px dashed rgba(148, 163, 184, 0.18)',
                background: 'rgba(255,255,255,0.015)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  color: 'rgba(148, 163, 184, 0.65)',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                Raise a query
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: 'rgba(203, 213, 225, 0.78)',
                  lineHeight: 1.55,
                }}
              >
                Found a bug or have a feature idea? Open a GitHub issue or drop a note — replies come from the maintainer directly.
              </p>
              <div style={{ display: 'flex', gap: 14, marginTop: 10, flexWrap: 'wrap' }}>
                <a
                  href={GH_ISSUES}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 12.5,
                    color: '#a5f3fc',
                    textDecoration: 'none',
                    borderBottom: '1px dotted rgba(165,243,252,0.4)',
                  }}
                >
                  Open GitHub issue ↗
                </a>
                <a
                  href={MAILTO}
                  style={{
                    fontSize: 12.5,
                    color: 'rgba(196, 181, 253, 0.9)',
                    textDecoration: 'none',
                    borderBottom: '1px dotted rgba(196,181,253,0.4)',
                  }}
                >
                  Email the maintainer ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right: Reviews list */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: 14,
                flexWrap: 'wrap',
                gap: 8,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)',
                  fontWeight: 500,
                  color: 'rgba(232, 234, 237, 0.85)',
                  letterSpacing: '-0.02em',
                }}
              >
                What people say
              </h3>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 12,
                  color: 'rgba(148,163,184,0.75)',
                }}
              >
                <span style={{ color: '#22d3ee', fontWeight: 600 }}>{avg}</span>
                <span>· {reviews.length} reviews</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {shown.map((r) => (
                <article
                  key={r.id}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                      marginBottom: 6,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: '50%',
                          background:
                            'linear-gradient(135deg, rgba(34,211,238,0.35), rgba(139,92,246,0.35))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 12,
                          fontWeight: 700,
                          color: '#e0f2fe',
                        }}
                      >
                        {r.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: '#f1f5f9' }}>
                          {r.name}
                        </div>
                        <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.7)' }}>
                          {r.role} · {timeAgo(r.timestamp)}
                        </div>
                      </div>
                    </div>
                    <StarRow value={r.rating} />
                  </div>
                  <p
                    style={{
                      margin: '4px 0 0 40px',
                      fontSize: 13.5,
                      lineHeight: 1.6,
                      color: 'rgba(203, 213, 225, 0.82)',
                    }}
                  >
                    {r.comment}
                  </p>
                </article>
              ))}
            </div>

            {reviews.length > 4 ? (
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                style={{
                  marginTop: 12,
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(148,163,184,0.85)',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                {showAll ? 'Show less' : 'Show all reviews (' + reviews.length + ')'}
              </button>
            ) : null}
          </div>
        </div>

        {/* Credits-style bottom line */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 16,
            borderTop: '1px solid rgba(255,255,255,0.04)',
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 10,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'rgba(148, 163, 184, 0.4)',
          }}
        >
          <span>Built by the community</span>
          <span>·</span>
          <a
            href={GH}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px dotted rgba(148,163,184,0.35)' }}
          >
            Contribute on GitHub
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .feedback-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Slide = {
  src: string;
  title: string;
  subtitle: string;
  quote: string;
};

const SLIDES: Slide[] = [
  {
    src: '/auth/slide-1.jpg',
    title: 'Ship code from any terminal.',
    subtitle: 'Oblivion runs where you run.',
    quote: '"Code is conversation. Make it natural." — Meera',
  },
  {
    src: '/auth/slide-2.jpg',
    title: 'One fallback chain. 13 models.',
    subtitle: 'Free, paid, local — the loop never stops.',
    quote: 'Terminal-native. GPU-optional. Yours forever.',
  },
];

export default function Auth({ onBack }: { onBack: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [slide, setSlide] = useState(0);
  const [typing, setTyping] = useState('');
  const [remember, setRemember] = useState(true);
  const [agreeTos, setAgreeTos] = useState(false);

  // slideshow auto rotate
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  // typewriter header
  useEffect(() => {
    const text = isLogin
      ? '> Establishing secure uplink...'
      : '> Provisioning new developer entity...';
    let i = 0;
    setTyping('');
    const iv = setInterval(() => {
      setTyping(text.slice(0, i + 1));
      i++;
      if (i > text.length) clearInterval(iv);
    }, 32);
    return () => clearInterval(iv);
  }, [isLogin]);

  const current = SLIDES[slide];

  const inputBase = useMemo<React.CSSProperties>(
    () => ({
      width: '100%',
      boxSizing: 'border-box',
      padding: '14px 16px',
      borderRadius: 12,
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      color: '#f8fafc',
      fontSize: 14,
      outline: 'none',
      transition: 'all 0.2s ease',
    }),
    []
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        background: '#0a0c10',
        color: '#f8fafc',
        overflow: 'hidden',
        zIndex: 100,
      }}
      className="auth-shell"
    >
      {/* ================= LEFT: SLIDESHOW ================= */}
      <div
        className="auth-left"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRight: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* image stack */}
        <AnimatePresence mode="sync">
          <motion.img
            key={current.src}
            src={current.src}
            alt=""
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'saturate(1.05) contrast(1.02)',
            }}
          />
        </AnimatePresence>

        {/* fallback gradient if images missing */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(120% 90% at 20% 10%, rgba(34,211,238,0.35), transparent 55%), radial-gradient(120% 90% at 80% 90%, rgba(139,92,246,0.45), transparent 55%), #0a0c10',
            zIndex: -1,
          }}
        />

        {/* dark blend overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(10,12,16,0.55) 0%, rgba(10,12,16,0.25) 40%, rgba(10,12,16,0.85) 100%)',
          }}
        />

        {/* top-left brand + back */}
        <div
          style={{
            position: 'absolute',
            top: 28,
            left: 32,
            right: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 2,
          }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              color: '#f8fafc',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="1" y="4" width="20" height="14" rx="2" stroke="#22d3ee" strokeWidth="1.5" />
              <path d="M5 9l3 3-3 3" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="11" y="13" width="6" height="1.5" rx="0.75" fill="#22d3ee" opacity="0.5" />
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.08em',
              }}
            >
              OBLIVION <span style={{ color: '#22d3ee', fontSize: 10 }}>AI</span>
            </span>
          </a>

          <button
            type="button"
            onClick={onBack}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.14)',
              color: '#e2e8f0',
              padding: '7px 14px',
              borderRadius: 999,
              cursor: 'pointer',
              fontSize: 12.5,
              backdropFilter: 'blur(8px)',
            }}
          >
            ← Back to website
          </button>
        </div>

        {/* bottom caption */}
        <div
          style={{
            position: 'absolute',
            left: 40,
            right: 40,
            bottom: 40,
            zIndex: 2,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 11,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: '#a5f3fc',
                  marginBottom: 12,
                }}
              >
                {current.subtitle}
              </div>
              <h2
                style={{
                  margin: '0 0 14px',
                  fontFamily: '"Plus Jakarta Sans", var(--font-sans), sans-serif',
                  fontSize: 'clamp(1.6rem, 2.4vw, 2.15rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  color: '#f8fafc',
                  maxWidth: 460,
                }}
              >
                {current.title}
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  color: 'rgba(226, 232, 240, 0.72)',
                  maxWidth: 480,
                }}
              >
                {current.quote}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* dots */}
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            {SLIDES.map((_, i) => {
              const active = i === slide;
              return (
                <button
                  key={i}
                  aria-label={'slide ' + (i + 1)}
                  onClick={() => setSlide(i)}
                  style={{
                    width: active ? 28 : 10,
                    height: 5,
                    borderRadius: 999,
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    background: active
                      ? 'linear-gradient(90deg, #22d3ee, #8b5cf6)'
                      : 'rgba(255,255,255,0.25)',
                    transition: 'width 0.35s ease, background 0.35s ease',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= RIGHT: FORM ================= */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px clamp(24px, 4vw, 72px)',
          background:
            'radial-gradient(120% 80% at 100% 0%, rgba(34,211,238,0.05), transparent 60%), radial-gradient(120% 80% at 0% 100%, rgba(139,92,246,0.06), transparent 60%), #0a0c10',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%',
            maxWidth: 440,
          }}
        >
          {/* terminal header */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#22d3ee',
                marginBottom: 8,
              }}
            >
              {typing}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }}
                style={{
                  display: 'inline-block',
                  width: 6,
                  height: '0.95em',
                  background: '#22d3ee',
                  marginLeft: 4,
                  verticalAlign: 'text-bottom',
                }}
              />
            </div>
            <h1
              style={{
                margin: '0 0 6px',
                fontFamily: '"Plus Jakarta Sans", var(--font-sans), sans-serif',
                fontSize: 'clamp(1.7rem, 2.4vw, 2.2rem)',
                fontWeight: 600,
                letterSpacing: '-0.025em',
                color: '#f8fafc',
              }}
            >
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 13.5,
                color: 'rgba(148, 163, 184, 0.9)',
              }}
            >
              {isLogin ? (
                <>
                  New here?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#22d3ee',
                      cursor: 'pointer',
                      padding: 0,
                      fontSize: 13.5,
                      textDecoration: 'underline',
                      textUnderlineOffset: 3,
                    }}
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#22d3ee',
                      cursor: 'pointer',
                      padding: 0,
                      fontSize: 13.5,
                      textDecoration: 'underline',
                      textUnderlineOffset: 3,
                    }}
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </div>

          {/* form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: isLogin ? -8 : 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 8 : -8 }}
              transition={{ duration: 0.28 }}
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              {!isLogin ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <input placeholder="First name" style={inputBase} />
                  <input placeholder="Last name" style={inputBase} />
                </div>
              ) : null}

              <input type="email" placeholder="Email" style={inputBase} />

              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  placeholder="Enter your password"
                  style={{ ...inputBase, paddingRight: 44 }}
                />
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(148,163,184,0.7)',
                    fontSize: 12,
                    fontFamily: 'var(--font-mono), monospace',
                  }}
                >
                  •••
                </span>
              </div>

              {isLogin ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 2,
                  }}
                >
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 12.5,
                      color: 'rgba(203,213,225,0.85)',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      style={{ accentColor: '#22d3ee' }}
                    />
                    Remember me
                  </label>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: 12.5,
                      color: '#a78bfa',
                      textDecoration: 'none',
                    }}
                  >
                    Forgot password?
                  </a>
                </div>
              ) : (
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    fontSize: 12.5,
                    color: 'rgba(203,213,225,0.85)',
                    marginTop: 2,
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={agreeTos}
                    onChange={(e) => setAgreeTos(e.target.checked)}
                    style={{ marginTop: 3, accentColor: '#22d3ee' }}
                  />
                  <span>
                    I agree to the{' '}
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      style={{ color: '#a78bfa', textDecoration: 'none' }}
                    >
                      Terms
                    </a>{' '}
                    &{' '}
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      style={{ color: '#a78bfa', textDecoration: 'none' }}
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              )}

              <button
                type="submit"
                style={{
                  marginTop: 6,
                  padding: '14px 18px',
                  borderRadius: 12,
                  border: 'none',
                  fontSize: 14.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#0a0c10',
                  background:
                    'linear-gradient(135deg, #22d3ee 0%, #6366f1 55%, #8b5cf6 100%)',
                  boxShadow:
                    '0 12px 30px rgba(34, 211, 238, 0.25), 0 6px 16px rgba(139, 92, 246, 0.25)',
                  transition: 'transform 0.2s ease, filter 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.filter = 'brightness(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
              >
                {isLogin ? 'Sign in' : 'Create account'}
              </button>
            </motion.form>
          </AnimatePresence>

          {/* OR divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              margin: '22px 0 16px',
            }}
          >
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span
              style={{
                fontSize: 11,
                color: 'rgba(148,163,184,0.7)',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
              }}
            >
              or continue with
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <button
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                padding: '12px 14px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                color: '#e2e8f0',
                fontSize: 13.5,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </button>
            <button
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                padding: '12px 14px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                color: '#e2e8f0',
                fontSize: 13.5,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C40.8 35.5 44 30.2 44 24c0-1.2-.1-2.3-.4-3.5z"/>
              </svg>
              Google
            </button>
          </div>

          {/* footer */}
          <div
            style={{
              marginTop: 26,
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 10.5,
              color: 'rgba(148,163,184,0.55)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <span>Secured · MIT Licensed</span>
            <span>© {new Date().getFullYear()} Oblivion</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        .auth-shell input:focus {
          border-color: rgba(34, 211, 238, 0.55);
          box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.12);
          background: rgba(255,255,255,0.05);
        }
        @media (max-width: 900px) {
          .auth-shell {
            grid-template-columns: 1fr !important;
          }
          .auth-left {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

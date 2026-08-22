import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Spark = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  drift: number;
};

type RingDust = {
  id: number;
  angle: number;
  radius: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  reverse: boolean;
};

function useTypewriter(
  fullText: string,
  active: boolean,
  speed = 36,
  startDelay = 0
) {
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setText('');
      setDone(false);
      return;
    }

    let i = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    setText('');
    setDone(false);

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1;
        setText(fullText.slice(0, i));
        if (i >= fullText.length) {
          if (intervalId) clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [active, fullText, speed, startDelay]);

  return { text, done };
}

function TypeCursor({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <motion.span
      aria-hidden
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.75, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        display: 'inline-block',
        width: '0.55em',
        height: '0.14em',
        marginLeft: '0.1em',
        verticalAlign: 'baseline',
        borderRadius: 1,
        background: 'linear-gradient(90deg, #22d3ee, #a78bfa)',
        boxShadow: '0 0 14px rgba(34, 211, 238, 0.95)',
      }}
    />
  );
}

export default function IntroHero() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [dust, setDust] = useState<RingDust[]>([]);
  const [phase, setPhase] = useState(0);
  // Black hole fades in only after OBLIVION AGENT finishes typing
  const [showHole, setShowHole] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 400);
    return () => clearTimeout(t);
  }, []);

  const titleTw = useTypewriter('OBLIVION AGENT', phase >= 1, 52, 0);
  const tagTw = useTypewriter('< TERMINAL AI CODING AGENT />', phase >= 2, 26, 80);
  const quoteTw = useTypewriter(
    '"Code is conversation. Make it natural." — M.E.E.R.A',
    phase >= 3,
    26,
    100
  );

  // After title done: start black hole slow fade, then tagline
  useEffect(() => {
    if (phase === 1 && titleTw.done) {
      setShowHole(true);
      const t = setTimeout(() => setPhase(2), 450);
      return () => clearTimeout(t);
    }
  }, [phase, titleTw.done]);

  useEffect(() => {
    if (phase === 2 && tagTw.done) {
      const t = setTimeout(() => setPhase(3), 280);
      return () => clearTimeout(t);
    }
  }, [phase, tagTw.done]);

  useEffect(() => {
    if (phase === 3 && quoteTw.done) {
      const t = setTimeout(() => setPhase(4), 300);
      return () => clearTimeout(t);
    }
  }, [phase, quoteTw.done]);

  useEffect(() => {
    setSparks(
      Array.from({ length: 80 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 90 + Math.random() * 750;
        return {
          id: i,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius * 0.72,
          size: Math.random() * 2.5 + 0.8,
          color: ['#22d3ee', '#67e8f9', '#3b82f6', '#a78bfa', '#e0f2fe', '#c4b5fd'][
            Math.floor(Math.random() * 6)
          ],
          duration: 8 + Math.random() * 12,
          delay: Math.random() * 5,
          drift: (Math.random() - 0.5) * 35,
        };
      })
    );

    setDust(
      Array.from({ length: 32 }).map((_, i) => ({
        id: i,
        angle: (i / 32) * 360 + Math.random() * 10,
        radius: 40 + (i % 6) * 5,
        size: Math.random() * 2.2 + 0.8,
        color: ['#22d3ee', '#38bdf8', '#6366f1', '#a78bfa', '#67e8f9'][i % 5],
        duration: 13 + (i % 8) * 2,
        delay: (i % 10) * 0.15,
        reverse: i % 3 === 0,
      }))
    );
  }, []);

  const stageWidth = 'clamp(480px, 78vw, 850px)';
  const stageHeight = 'clamp(340px, 48vw, 520px)';

  const haloGradient = useMemo(
    () =>
      'conic-gradient(from 0deg, transparent 0deg, rgba(34,211,238,0.0) 40deg, rgba(34,211,238,0.55) 95deg, rgba(59,130,246,0.5) 150deg, rgba(139,92,246,0.4) 210deg, rgba(34,211,238,0.25) 260deg, transparent 320deg)',
    []
  );

  const renderCenterTitle = () => {
    const typed = titleTw.text;
    if (!typed) {
      return (
        <span style={{ opacity: 0.15 }}>
          OBLIVION AGENT
          <TypeCursor show={phase === 1} />
        </span>
      );
    }

    const head = 'OBLIVION';
    const shownHead = typed.slice(0, Math.min(typed.length, head.length));
    const hasSpace = typed.length > head.length;
    const agentPart =
      typed.length > head.length + 1 ? typed.slice(head.length + 1) : '';

    return (
      <>
        <span>{shownHead}</span>
        {hasSpace ? <span> </span> : null}
        {agentPart ? (
          <span
            style={{
              background:
                'linear-gradient(115deg, #e0f2fe 0%, #22d3ee 32%, #3b82f6 68%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 28px rgba(34, 211, 238, 0.55))',
            }}
          >
            {agentPart}
          </span>
        ) : null}
        <TypeCursor show={phase >= 1} />
      </>
    );
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px 36px',
        overflow: 'hidden',
      }}
    >
      {/* Background glitter — also fades in with the hole */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showHole ? 1 : 0 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 0,
          height: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {sparks.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={
              showHole
                ? {
                    opacity: [0, 0.85, 0],
                    x: [0, p.x + p.drift, p.x],
                    y: [0, p.y, p.y - p.drift * 0.4],
                  }
                : { opacity: 0 }
            }
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: p.color,
              boxShadow: '0 0 ' + p.size * 3 + 'px ' + p.color,
            }}
          />
        ))}
      </motion.div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 980,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(14px, 2.2vh, 22px)',
        }}
      >
        {/* Stage: black hole + centered title + tagline tight under title */}
        <div
          style={{
            position: 'relative',
            width: stageWidth,
            height: stageHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* BLACK HOLE LAYER — slow steady reveal AFTER title types */}
          <motion.div
            initial={{ opacity: 0, scale: 0.86 }}
            animate={
              showHole
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.86 }
            }
            transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '-15%',
                background:
                  'radial-gradient(ellipse at center, rgba(34,211,238,0.22) 0%, rgba(59,130,246,0.15) 35%, rgba(139,92,246,0.06) 58%, transparent 72%)',
                filter: 'blur(24px)',
              }}
            />

            <motion.div
              animate={showHole ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '80%',
                height: '80%',
                left: '10%',
                top: '10%',
                borderRadius: '50%',
                background: haloGradient,
                filter: 'blur(16px)',
                opacity: 0.78,
                mixBlendMode: 'screen',
              }}
            />

            <motion.div
              animate={showHole ? { rotate: -360 } : { rotate: 0 }}
              transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '75%',
                height: '75%',
                left: '12.5%',
                top: '12.5%',
                borderRadius: '50%',
                background:
                  'conic-gradient(from 180deg, transparent 0deg, rgba(103,232,249,0.0) 60deg, rgba(125,211,252,0.45) 120deg, transparent 180deg, rgba(192,132,252,0.4) 240deg, transparent 300deg)',
                maskImage:
                  'radial-gradient(circle, transparent 63%, black 66%, black 71%, transparent 74%)',
                WebkitMaskImage:
                  'radial-gradient(circle, transparent 63%, black 66%, black 71%, transparent 74%)',
                filter: 'blur(0.8px)',
                opacity: 0.85,
              }}
            />

            <motion.div
              animate={
                showHole
                  ? { scale: [1, 1.04, 1], opacity: [0.4, 0.7, 0.4] }
                  : { scale: 1, opacity: 0 }
              }
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                width: '68%',
                height: '68%',
                left: '16%',
                top: '16%',
                borderRadius: '50%',
                border: '1px solid rgba(186, 198, 255, 0.25)',
                boxShadow:
                  '0 0 32px 3px rgba(34,211,238,0.35), 0 0 70px 10px rgba(59,130,246,0.2), inset 0 0 30px rgba(139,92,246,0.18)',
              }}
            />

            {dust.map((d) => (
              <motion.div
                key={d.id}
                animate={showHole ? { rotate: d.reverse ? -360 : 360 } : { rotate: 0 }}
                transition={{
                  duration: d.duration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: d.delay,
                }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <motion.span
                  animate={
                    showHole
                      ? { opacity: [0.2, 0.95, 0.2], scale: [0.7, 1.15, 0.7] }
                      : { opacity: 0 }
                  }
                  transition={{
                    duration: 2.4 + (d.id % 5) * 0.35,
                    repeat: Infinity,
                    delay: d.delay,
                    ease: 'easeInOut',
                  }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: d.size,
                    height: d.size,
                    marginTop: -d.size / 2,
                    marginLeft: -d.size / 2,
                    borderRadius: '50%',
                    background: d.color,
                    boxShadow: '0 0 ' + d.size * 3.2 + 'px ' + d.color,
                    transform: 'rotate(' + d.angle + 'deg) translateX(' + d.radius + '%)',
                  }}
                />
              </motion.div>
            ))}

            <motion.div
              animate={showHole ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', inset: '16%', pointerEvents: 'none' }}
            >
              {Array.from({ length: 16 }).map((_, i) => {
                const a = (i / 16) * Math.PI * 2;
                const r = 45;
                return (
                  <span
                    key={'micro-' + i}
                    style={{
                      position: 'absolute',
                      left: 50 + Math.cos(a) * r + '%',
                      top: 50 + Math.sin(a) * r + '%',
                      width: i % 3 === 0 ? 2.2 : 1.4,
                      height: i % 3 === 0 ? 2.2 : 1.4,
                      borderRadius: '50%',
                      background: i % 2 ? '#ddd6fe' : '#a5f3fc',
                      boxShadow: '0 0 6px ' + (i % 2 ? '#c4b5fd' : '#67e8f9'),
                      opacity: 0.7,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                );
              })}
            </motion.div>
          </motion.div>

          {/* TEXT STACK — always on top, title first then tagline tight under it */}
          <div
            style={{
              position: 'relative',
              zIndex: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 12px',
              maxWidth: '96%',
              gap: 10,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-sans), system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(2.8rem, 7.2vw, 5.5rem)',
                fontWeight: 700,
                letterSpacing: '0.16em',
                lineHeight: 1.1,
                textTransform: 'uppercase',
                color: '#f8fafc',
                textShadow:
                  '0 0 40px rgba(34, 211, 238, 0.45), 0 2px 28px rgba(0, 0, 0, 0.85)',
                whiteSpace: 'nowrap',
              }}
            >
              {phase >= 1 ? (
                renderCenterTitle()
              ) : (
                <span style={{ opacity: 0 }}>OBLIVION AGENT</span>
              )}
            </div>

            {/* Tagline directly under OBLIVION AGENT */}
            <div
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 'clamp(0.7rem, 1.35vw, 0.92rem)',
                fontWeight: 500,
                letterSpacing: '0.28em',
                color: 'rgba(165, 243, 252, 0.92)',
                textTransform: 'uppercase',
                textShadow: '0 0 16px rgba(34, 211, 238, 0.3)',
                minHeight: '1.35em',
                marginTop: 2,
              }}
            >
              {phase >= 2 ? (
                <>
                  {tagTw.text}
                  <TypeCursor show={phase === 2 && !tagTw.done} />
                </>
              ) : null}
            </div>
          </div>
        </div>

        {/* Quote */}
        <h2
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary, #f8fafc)',
            textAlign: 'center',
            maxWidth: 880,
            margin: 0,
            minHeight: '2.1em',
          }}
        >
          {phase >= 3 ? (
            <>
              {quoteTw.text}
              <TypeCursor show={phase === 3 && !quoteTw.done} />
            </>
          ) : (
            <span style={{ opacity: 0 }} aria-hidden>
              Code is conversation. Make it natural. — Meera
            </span>
          )}
        </h2>

        <AnimatePresence>
          {phase >= 4 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                gap: 14,
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: 4,
              }}
            >
              <a
                href="#install"
                style={{
                  background: 'var(--text-primary, #f8fafc)',
                  color: 'var(--bg-base, #0c0e12)',
                  padding: '14px 30px',
                  borderRadius: 40,
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: 15,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  boxShadow: '0 4px 20px rgba(255,255,255,0.12)',
                  transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                  <polyline points="7 11 12 16 17 11" />
                  <line x1="12" y1="4" x2="12" y2="16" />
                </svg>
                Download
              </a>

              <a
                href="#docs"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  color: 'var(--text-primary, #f8fafc)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  padding: '14px 30px',
                  borderRadius: 40,
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: 15,
                  backdropFilter: 'blur(12px)',
                  transition: 'background 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
              >
                Explore docs & manual
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}

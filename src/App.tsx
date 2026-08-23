import { useEffect, useState } from 'react';
import { useMouseGlow } from './hooks/useMouseGlow';
import { AuthProvider, useAuth } from './context/AuthContext';
import Nav from './components/Nav';
import IntroHero from './sections/IntroHero';
import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import Architecture from './sections/Architecture';
import Features from './sections/Features';
import Models from './sections/Models';
import Meera from './sections/Meera';
import Install from './sections/Install';
import Feedback from './sections/Feedback';
import Outro from './sections/Outro';
import Docs from './pages/Docs';
import Auth from './pages/Auth';

type View = 'home' | 'docs' | 'auth';

function resolveView(): View {
  const hash = window.location.hash || '';
  const path = window.location.pathname || '';
  if (hash === '#auth' || hash === '#login' || hash === '#signup' || path === '/auth') {
    return 'auth';
  }
  if (hash === '#docs' || hash.startsWith('#sec-') || path === '/docs') {
    return 'docs';
  }
  return 'home';
}

function AppInner() {
  useMouseGlow();
  const { user, loading } = useAuth();
  const [view, setView] = useState<View>(() =>
    typeof window !== 'undefined' ? resolveView() : 'home'
  );

  useEffect(() => {
    const sync = () => setView(resolveView());
    sync();
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';

      if (href === '#auth' || href === '#login' || href === '#signup') {
        e.preventDefault();
        window.location.hash = 'auth';
        setView('auth');
        window.scrollTo(0, 0);
        return;
      }

      if (href === '#docs' || href.startsWith('#sec-')) {
        e.preventDefault();
        window.location.hash = href === '#docs' ? 'docs' : href;
        setView('docs');
        window.scrollTo(0, 0);
      }
    };

    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const openHome = () => {
    window.location.hash = '';
    setView('home');
    window.scrollTo(0, 0);
  };

  // If already logged in and somehow on the auth view, bounce back home
  useEffect(() => {
    if (!loading && user && view === 'auth') {
      openHome();
    }
  }, [loading, user, view]);

  if (view === 'auth') {
    if (loading) return null;
    if (user) return null;
    return <Auth onBack={openHome} />;
  }

  if (view === 'docs') {
    return <Docs onBack={openHome} />;
  }

  return (
    <div style={{ background: 'var(--bg-base, #0c0e12)', minHeight: '100vh' }}>
      <div className="cursor-glow-container" aria-hidden="true" />
      <Nav />
      <main>
        <IntroHero />
        <Hero />
        <HowItWorks />
        <Architecture />
        <Features />
        <Models />
        <Meera />
        <Install />
      </main>
      <Feedback />
      <Outro />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

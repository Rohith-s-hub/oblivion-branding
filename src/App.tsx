import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Redesign from './Redesign';
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

  return <Redesign />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

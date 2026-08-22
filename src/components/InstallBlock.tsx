import { useState } from 'react';
import { useOS, type OS } from '../hooks/useOS';
import CopyButton from './CopyButton';

interface InstallConfig {
  command: string;
  comment: string;
  extra?: string;
}

const INSTALL: Record<OS, InstallConfig> = {
  macos: {
    command: 'pip install oblivion-agent',
    comment: '# Recommended: pipx install oblivion-agent',
    extra: 'Requires Python 3.10+ · pipx provides isolated install (brew install pipx)',
  },
  linux: {
    command: 'pip install oblivion-agent',
    comment: '# Recommended: pipx install oblivion-agent',
    extra: 'Requires Python 3.10+ · pipx install oblivion-agent for isolated environment',
  },
  windows: {
    command: 'pip install oblivion-agent',
    comment: '# Run in PowerShell or Windows Terminal',
    extra: 'Requires Python 3.10+ · Consider WSL2 for best compatibility · Enable long path support if install fails',
  },
};

const OS_LABELS: Record<OS, string> = {
  macos: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
};

export default function InstallBlock() {
  const { os: detectedOS, setOS, mounted } = useOS();
  const [activeOS, setActiveOS] = useState<OS | null>(null);

  const currentOS: OS = activeOS ?? (mounted ? detectedOS : 'linux');
  const config = INSTALL[currentOS];

  const handleOSChange = (os: OS) => {
    setActiveOS(os);
    setOS(os);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* OS Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: 'var(--text-tertiary)',
          textTransform: 'uppercase',
        }}>
          OS
        </span>
        <div className="os-tabs">
          {(Object.keys(OS_LABELS) as OS[]).map((osKey) => (
            <button
              key={osKey}
              className={`os-tab ${currentOS === osKey ? 'active' : ''}`}
              onClick={() => handleOSChange(osKey)}
              aria-pressed={currentOS === osKey}
            >
              {OS_LABELS[osKey]}
            </button>
          ))}
        </div>
        {mounted && !activeOS && (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--accent)',
            opacity: 0.6,
            letterSpacing: '0.06em',
          }}>
            ↳ auto-detected
          </span>
        )}
      </div>

      {/* Command Block */}
      <div className="install-block">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '13px', flexShrink: 0 }}>$</span>
            <code style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{config.command}</code>
          </div>
          <div style={{ paddingLeft: '20px' }}>
            <code style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{config.comment}</code>
          </div>
        </div>
        <CopyButton text={config.command} />
      </div>

      {/* Caveat */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--text-tertiary)',
        lineHeight: '1.5',
        paddingLeft: '2px',
      }}>
        {currentOS === 'windows' && (
          <span style={{ color: '#febc2e', marginRight: '6px' }}>⚠</span>
        )}
        {config.extra}
      </p>
    </div>
  );
}

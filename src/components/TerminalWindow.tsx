import React from 'react';

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
}

export default function TerminalWindow({
  title = 'oblivion — zsh',
  children,
  className = '',
  minHeight,
}: TerminalWindowProps) {
  return (
    <div className={`terminal-window scanlines ${className}`} style={{ width: '100%', minHeight }}>
      <div className="terminal-titlebar">
        <div className="terminal-dot terminal-dot--close" />
        <div className="terminal-dot terminal-dot--min" />
        <div className="terminal-dot terminal-dot--max" />
        <span className="terminal-title">{title}</span>
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </div>
  );
}

export function TermLine({ children, indent = 0 }: { children: React.ReactNode; indent?: number }) {
  return (
    <div style={{ paddingLeft: indent * 20, lineHeight: '1.65' }}>
      {children}
    </div>
  );
}

export function Prompt({ cmd }: { cmd: string }) {
  return (
    <TermLine>
      <span className="terminal-prompt">❯ </span>
      <span className="terminal-cmd">{cmd}</span>
    </TermLine>
  );
}

export function Output({ children, type = '' }: { children: React.ReactNode; type?: string }) {
  return (
    <TermLine indent={1}>
      <span className={`terminal-${type || 'dim'}`}>{children}</span>
    </TermLine>
  );
}

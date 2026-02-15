
import React from 'react';
import { Info as InfoIcon, Lightbulb, AlertTriangle, Flame, FileText, CheckCircle } from 'lucide-react';

export type CalloutType = 'info' | 'tip' | 'warning' | 'danger' | 'note' | 'success';

export interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Callout: React.FC<CalloutProps> = ({ type, title, children, style }) => {
  const config = {
    info: { 
        icon: InfoIcon, 
        color: 'var(--nexus-info)', 
        bg: 'rgba(59, 130, 246, 0.08)', 
        border: 'rgba(59, 130, 246, 0.2)' 
    },
    tip: { 
        icon: Lightbulb, 
        color: 'var(--nexus-success)', 
        bg: 'rgba(16, 185, 129, 0.08)', 
        border: 'rgba(16, 185, 129, 0.2)' 
    },
    success: { 
        icon: CheckCircle, 
        color: 'var(--nexus-success)', 
        bg: 'rgba(16, 185, 129, 0.08)', 
        border: 'rgba(16, 185, 129, 0.2)' 
    },
    warning: { 
        icon: AlertTriangle, 
        color: 'var(--nexus-warning)', 
        bg: 'rgba(245, 158, 11, 0.08)', 
        border: 'rgba(245, 158, 11, 0.2)' 
    },
    danger: { 
        icon: Flame, 
        color: 'var(--nexus-danger)', 
        bg: 'rgba(239, 68, 68, 0.08)', 
        border: 'rgba(239, 68, 68, 0.2)' 
    },
    note: { 
        icon: FileText, 
        color: 'var(--nexus-primary)', 
        bg: 'rgba(67, 97, 238, 0.08)', 
        border: 'rgba(67, 97, 238, 0.2)' 
    },
  }[type];

  const Icon = config.icon;

  return (
    <div style={{
      padding: '1rem 1.25rem',
      backgroundColor: config.bg,
      border: `1px solid ${config.border}`,
      borderRadius: '8px',
      marginBottom: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      ...style
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: config.color, fontWeight: 600 }}>
        <Icon size={18} />
        {title && <span>{title}</span>}
      </div>
      <div style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--nexus-text-primary)' }}>
        {children}
      </div>
    </div>
  );
};

// Convenience Components
export const Info: React.FC<{title?: string; children: React.ReactNode}> = (props) => <Callout type="info" {...props} />;
export const Tip: React.FC<{title?: string; children: React.ReactNode}> = (props) => <Callout type="tip" {...props} />;
export const Warning: React.FC<{title?: string; children: React.ReactNode}> = (props) => <Callout type="warning" {...props} />;
export const Note: React.FC<{title?: string; children: React.ReactNode}> = (props) => <Callout type="note" {...props} />;
export const Danger: React.FC<{title?: string; children: React.ReactNode}> = (props) => <Callout type="danger" {...props} />;

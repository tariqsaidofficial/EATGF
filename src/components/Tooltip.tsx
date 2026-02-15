
import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
        position: 'absolute',
        zIndex: 50,
        padding: '0.5rem 0.75rem',
        background: 'var(--nexus-text-primary)',
        color: 'var(--nexus-bg-surface)',
        borderRadius: '6px',
        fontSize: '0.75rem',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        boxShadow: 'var(--shadow-md)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : 'translate(0, 5px)',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        visibility: isVisible ? 'visible' : 'hidden'
    };

    switch(position) {
      case 'bottom': 
        return { ...base, top: '100%', left: '50%', transform: isVisible ? 'translate(-50%, 8px)' : 'translate(-50%, 0px)' };
      case 'left': 
        return { ...base, top: '50%', right: '100%', transform: isVisible ? 'translate(-8px, -50%)' : 'translate(0px, -50%)' };
      case 'right': 
        return { ...base, top: '50%', left: '100%', transform: isVisible ? 'translate(8px, -50%)' : 'translate(0px, -50%)' };
      default: // top
        return { ...base, bottom: '100%', left: '50%', transform: isVisible ? 'translate(-50%, -8px)' : 'translate(-50%, 0px)' };
    }
  };

  return (
    <div 
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div style={getPositionStyles()}>
        {content}
        {/* Arrow */}
        <div style={{
            position: 'absolute',
            width: 0, 
            height: 0, 
            border: '5px solid transparent',
            ...(position === 'top' && { borderTopColor: 'var(--nexus-text-primary)', top: '100%', left: '50%', marginLeft: '-5px' }),
            ...(position === 'bottom' && { borderBottomColor: 'var(--nexus-text-primary)', bottom: '100%', left: '50%', marginLeft: '-5px' }),
            ...(position === 'left' && { borderLeftColor: 'var(--nexus-text-primary)', left: '100%', top: '50%', marginTop: '-5px' }),
            ...(position === 'right' && { borderRightColor: 'var(--nexus-text-primary)', right: '100%', top: '50%', marginTop: '-5px' }),
        }} />
      </div>
    </div>
  );
};

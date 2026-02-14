
import React from 'react';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  const handleNav = (page: string) => {
    onNavigate(page);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', 
      inset: 0, 
      zIndex: 100, 
      pointerEvents: isOpen ? 'auto' : 'none',
      visibility: isOpen ? 'visible' : 'hidden',
    }}>
      {/* Backdrop */}
      <div 
        style={{
          position: 'absolute', 
          inset: 0, 
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(2px)',
          opacity: isOpen ? 1 : 0, 
          transition: 'opacity 0.3s'
        }} 
        onClick={onClose} 
      />
      
      {/* Drawer */}
      <div style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        bottom: 0, 
        width: '280px',
        background: 'var(--nexus-bg-root)', 
        borderRight: '1px solid var(--nexus-border)',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex', 
        flexDirection: 'column',
        boxShadow: 'var(--shadow-xl)'
      }}>
        <div style={{ 
          padding: '1.5rem', 
          borderBottom: '1px solid var(--nexus-border)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          height: 'var(--navbar-height)'
        }}>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--nexus-text-primary)' }}>Menu</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--nexus-text-secondary)' }}>
             <X size={24} />
          </button>
        </div>
        
        <nav style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button onClick={() => handleNav('home')} style={{
            textAlign: 'left', fontSize: '1.1rem', fontWeight: 600,
            background: 'none', border: 'none', color: 'var(--nexus-text-primary)', cursor: 'pointer'
          }}>
            Home
          </button>
          <button onClick={() => handleNav('docs')} style={{
            textAlign: 'left', fontSize: '1.1rem', fontWeight: 600,
            background: 'none', border: 'none', color: 'var(--nexus-text-primary)', cursor: 'pointer'
          }}>
            Documentation
          </button>
          
          <div style={{ height: '1px', background: 'var(--nexus-border)', margin: '0.5rem 0' }}></div>
          
          <button onClick={() => handleNav('api')} style={{
             textAlign: 'left', fontSize: '1rem', background: 'none', border: 'none', 
             color: 'var(--nexus-text-secondary)', cursor: 'pointer', padding: 0 
          }}>
            API Reference
          </button>
          <button onClick={() => handleNav('changelog')} style={{
             textAlign: 'left', fontSize: '1rem', background: 'none', border: 'none', 
             color: 'var(--nexus-text-secondary)', cursor: 'pointer', padding: 0 
          }}>
            Changelog
          </button>
          <button onClick={() => handleNav('community')} style={{
             textAlign: 'left', fontSize: '1rem', background: 'none', border: 'none', 
             color: 'var(--nexus-text-secondary)', cursor: 'pointer', padding: 0 
          }}>
            Community
          </button>
        </nav>
      </div>
    </div>
  );
};

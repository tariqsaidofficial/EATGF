
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, FileText, Hash } from 'lucide-react';
import { SIDEBAR_ITEMS } from './Sidebar';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string, params?: any) => void;
  initialQuery?: string;
}

// Dynamically generate search index from sidebar items
const SEARCH_INDEX = SIDEBAR_ITEMS.flatMap(section => 
  section.items.flatMap(item => {
    const mainItem = { 
      id: item.id, 
      title: item.label, 
      category: section.category, 
      path: 'docs', 
      docId: item.id 
    };
    
    if (item.items && item.items.length > 0) {
       return [
         mainItem,
         ...item.items.map(sub => ({ 
           id: sub.id, 
           title: sub.label, 
           category: `${section.category} > ${item.label}`, 
           path: 'docs', 
           docId: sub.id 
         }))
       ];
    }
    return [mainItem];
  })
);

export const SearchModal: React.FC<SearchModalProps> = ({ 
  isOpen, 
  onClose, 
  onNavigate,
  initialQuery = '' 
}) => {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync internal state with prop when modal opens or prop changes
  useEffect(() => {
    if (isOpen) {
        setQuery(initialQuery);
        // Slightly longer delay to ensure focus after animation/render
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
            // Move cursor to end of text
            const len = inputRef.current.value.length;
            inputRef.current.setSelectionRange(len, len);
          }
        }, 50);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    // Handle Esc key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const filtered = SEARCH_INDEX.filter(r => 
    r.title.toLowerCase().includes(query.toLowerCase()) || 
    r.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 110, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '12vh'
    }} onClick={onClose}>
      <div style={{
        width: '100%', maxWidth: '640px', background: 'var(--nexus-bg-surface)',
        borderRadius: '12px', boxShadow: 'var(--shadow-2xl)', border: '1px solid var(--nexus-border)',
        overflow: 'hidden', margin: '0 1rem', display: 'flex', flexDirection: 'column'
      }} onClick={e => e.stopPropagation()}>
        
        <div style={{ 
          display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--nexus-border)', 
          padding: '1.25rem', background: 'var(--nexus-bg-root)'
        }}>
          <Search size={22} color="var(--nexus-primary)" style={{ marginRight: '1rem' }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1, border: 'none', background: 'transparent', outline: 'none',
              fontSize: '1.25rem', color: 'var(--nexus-text-primary)'
            }}
          />
          <button onClick={onClose} style={{ 
            background: 'var(--nexus-bg-surface-hover)', border: '1px solid var(--nexus-border)', 
            cursor: 'pointer', color: 'var(--nexus-text-secondary)', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem' 
          }}>
            ESC
          </button>
        </div>
        
        <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '0.5rem' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '3rem 2rem', textAlign: 'center', color: 'var(--nexus-text-secondary)' }}>
              No results found for "<span style={{ color: 'var(--nexus-text-primary)' }}>{query}</span>"
            </div>
          ) : (
            <>
              {query === '' && (
                <div style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--nexus-text-secondary)', textTransform: 'uppercase' }}>
                  Suggested
                </div>
              )}
              {filtered.map((item) => (
                <button key={item.id} onClick={() => { onNavigate(item.path, item.docId); onClose(); }} style={{
                  display: 'flex', alignItems: 'center', width: '100%', padding: '0.75rem 1rem',
                  border: 'none', background: 'transparent', borderRadius: '8px', cursor: 'pointer',
                  textAlign: 'left', gap: '1rem', transition: 'background 0.1s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--nexus-bg-surface-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ 
                    padding: '8px', borderRadius: '6px', background: 'rgba(79, 70, 229, 0.1)', 
                    color: 'var(--nexus-primary)' 
                  }}>
                    <FileText size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'var(--nexus-text-primary)', fontWeight: 500, fontSize: '1rem' }}>{item.title}</div>
                    <div style={{ color: 'var(--nexus-text-secondary)', fontSize: '0.85rem' }}>{item.category}</div>
                  </div>
                  <ChevronRight size={16} color="var(--nexus-text-secondary)" />
                </button>
              ))}
            </>
          )}
        </div>
        
        <div style={{ 
          borderTop: '1px solid var(--nexus-border)', padding: '0.75rem 1.25rem', 
          fontSize: '0.8rem', color: 'var(--nexus-text-secondary)', background: 'var(--nexus-bg-root)',
          display: 'flex', justifyContent: 'space-between'
        }}>
          <span>Search powered by EATGF Index</span>
          <span><span style={{ fontWeight: 700 }}>↑↓</span> to navigate</span>
        </div>
      </div>
    </div>
  );
};

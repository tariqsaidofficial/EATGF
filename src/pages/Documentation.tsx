
import React, { useState, useEffect, useRef } from 'react';
import { Sidebar, SIDEBAR_ITEMS, SidebarItemDef } from '../components/Sidebar';
import { ChevronRight, Info, Check, Copy, Sparkles, Loader2, Star } from 'lucide-react';
import { summarizeContent } from '../services/GeminiService';
import { FavoriteItem } from './Profile';

interface DocumentationProps {
  activeDoc: string;
  onDocChange: (docId: string) => void;
  favorites: FavoriteItem[];
  onToggleFavorite: (item: FavoriteItem) => void;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

// Helper to recursively find sidebar item
const findSidebarItem = (items: any[], id: string): SidebarItemDef | null => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.items) {
      const found = findSidebarItem(item.items, id);
      if (found) return found;
    }
  }
  return null;
};

// Helper to get category
const findCategory = (items: any[], id: string): string => {
  for (const section of items) {
     if (section.items.some((i: any) => i.id === id || (i.items && findSidebarItem(i.items, id)))) {
         return section.category;
     }
  }
  return 'Docs';
};

const CodeBlock = ({ code, language }: { code: string, language: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: '#1E293B',
      color: '#E2E8F0',
      borderRadius: '8px',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.9rem',
      overflow: 'hidden',
      border: '1px solid #334155',
      marginBottom: '1.5rem',
      boxShadow: 'var(--shadow-md)'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '0.5rem 1rem', 
        background: 'rgba(0,0,0,0.2)',
        borderBottom: '1px solid #334155',
        color: '#94A3B8', 
        fontSize: '0.75rem', 
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        <span style={{ fontWeight: 600 }}>{language}</span>
        <button
          onClick={handleCopy}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: copied ? 'var(--nexus-success)' : 'inherit', 
            cursor: 'pointer', 
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.75rem'
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div style={{ padding: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, lineHeight: 1.6 }}><code>{code}</code></pre>
      </div>
    </div>
  );
};

export const Documentation: React.FC<DocumentationProps> = ({ 
  activeDoc, 
  onDocChange, 
  favorites, 
  onToggleFavorite 
}) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  
  const pageContentRef = useRef<HTMLDivElement>(null);
  
  // Resolve current item details
  const currentItem = findSidebarItem(SIDEBAR_ITEMS.flatMap(s => s.items), activeDoc);
  const currentCategory = findCategory(SIDEBAR_ITEMS, activeDoc);
  const isFavorite = favorites.some(f => f.id === activeDoc);

  useEffect(() => {
    // Scroll to top on doc change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSummary(null); // clear summary
  }, [activeDoc]);

  useEffect(() => {
    if (pageContentRef.current) {
      // 1. Extract Headings
      const elements = pageContentRef.current.querySelectorAll('h2, h3');
      const extractedHeadings: Heading[] = [];
      
      elements.forEach((el) => {
        if (!el.id) {
          const text = el.textContent || '';
          el.id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }
        extractedHeadings.push({
          id: el.id,
          text: el.textContent || '',
          level: parseInt(el.tagName.substring(1))
        });
      });
      setHeadings(extractedHeadings);

      // 2. Setup Scroll Spy
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHeadingId(entry.target.id);
            }
          });
        },
        { rootMargin: '-80px 0px -80% 0px' } 
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }
  }, [activeDoc]);

  const handleSummarize = async () => {
    if (pageContentRef.current) {
      setIsSummarizing(true);
      const text = pageContentRef.current.innerText;
      const result = await summarizeContent(text);
      setSummary(result);
      setIsSummarizing(false);
    }
  };

  const scrollToHeading = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveHeadingId(id);
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const handleStarClick = () => {
      onToggleFavorite({
          id: activeDoc,
          title: currentItem?.label || 'Documentation',
          path: 'docs',
          description: `${currentCategory} > ${currentItem?.label}`
      });
  };

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: 'calc(100vh - var(--navbar-height))' }}>
      {/* Sidebar - Fixed Left */}
      <div className="sidebar-container" style={{ flexShrink: 0 }}>
        <Sidebar activeDoc={activeDoc} onSelectDoc={onDocChange} />
      </div>
      
      {/* Main Content - Fluid Center */}
      <main style={{ 
        flex: 1, 
        padding: '3rem 4rem', 
        minWidth: 0, 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
          
          {/* Breadcrumbs */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--nexus-text-secondary)', fontSize: '0.875rem', marginBottom: '2rem' }}>
            <span>Docs</span>
            <ChevronRight size={14} />
            <span>{currentCategory}</span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--nexus-text-primary)', fontWeight: 600 }}>{currentItem?.label || 'Introduction'}</span>
          </nav>

          {/* AI Summary Section */}
          {summary && (
            <div style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
              border: '1px solid var(--nexus-primary-light)',
              borderRadius: '8px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--nexus-primary)', fontWeight: 700 }}>
                <Sparkles size={18} />
                AI Summary
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--nexus-text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {summary}
              </div>
              <button 
                onClick={() => setSummary(null)}
                style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--nexus-text-secondary)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Content */}
          <article ref={pageContentRef}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h1 style={{ fontSize: '2.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {currentItem?.label || 'Introduction to EATGF'}
                <button 
                  onClick={handleStarClick}
                  title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem',
                    color: isFavorite ? 'var(--nexus-warning)' : 'var(--nexus-border)',
                    transition: 'transform 0.2s',
                  }}
                  onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
                  onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                   <Star size={28} fill={isFavorite ? "currentColor" : "none"} />
                </button>
              </h1>
              
              <button 
                onClick={handleSummarize}
                disabled={isSummarizing}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid var(--nexus-border)',
                  background: 'var(--nexus-bg-surface)',
                  color: isSummarizing ? 'var(--nexus-text-secondary)' : 'var(--nexus-primary)',
                  cursor: isSummarizing ? 'wait' : 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                {isSummarizing ? (
                   <><Loader2 size={16} className="spin" /> Analyzing...</>
                ) : (
                   <><Sparkles size={16} /> Summarize</>
                )}
              </button>
            </div>
            
            <p style={{ fontSize: '1.125rem', color: 'var(--nexus-text-secondary)', marginBottom: '2rem' }}>
              The <strong>Enterprise AI-Aligned Technical Governance Framework (EATGF)</strong> is a unified knowledge and cloud orchestration platform designed for high-scale enterprise environments. This guide covers the architectural principles and basic setup.
            </p>

            <div className="admonition admonition-note">
              <div className="admonition-title" style={{ color: 'var(--nexus-info)' }}>
                <Info size={16} /> Enterprise Note
              </div>
              <p style={{ fontSize: '0.95rem' }}>
                This documentation applies to EATGF v2.4+. If you are on a legacy version (v1.x), please switch the version dropdown in the navbar.
              </p>
            </div>

            <h2 id="why-nexus" style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--nexus-border)', paddingBottom: '0.5rem' }}>
              Overview
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Modern engineering teams require robust security, compliance controls, and scalable infrastructure. EATGF provides these out of the box with a developer-first API.
            </p>

            <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Zero-Trust Security:</strong> Built-in mTLS and identity propagation.</li>
              <li><strong>Global Scale:</strong> Deployed across 35 regions with active-active replication.</li>
              <li><strong>Developer Experience:</strong> TypeScript SDKs, CLI tools, and Terraform providers.</li>
            </ul>

            <h2 id="installation" style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--nexus-border)', paddingBottom: '0.5rem' }}>
              Quick Example
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              Install the EATGF CLI to get started with your first deployment.
            </p>

            <CodeBlock 
              language="bash" 
              code={`npm install -g @eatgf/cli\neatgf init --enterprise`} 
            />

            <h2 id="next-steps" style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--nexus-border)', paddingBottom: '0.5rem' }}>
              Next Steps
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
               <button onClick={() => onDocChange('authentication')} style={{ 
                 display: 'block', padding: '1.5rem', border: '1px solid var(--nexus-border)', background: 'transparent',
                 borderRadius: '8px', color: 'inherit', textDecoration: 'none', textAlign: 'left', cursor: 'pointer' 
               }}>
                 <div style={{ fontWeight: 600, color: 'var(--nexus-primary)', marginBottom: '0.5rem' }}>Authentication →</div>
                 <div style={{ fontSize: '0.9rem', color: 'var(--nexus-text-secondary)' }}>Configure SSO and API Keys.</div>
               </button>
               <button onClick={() => onDocChange('architecture')} style={{ 
                 display: 'block', padding: '1.5rem', border: '1px solid var(--nexus-border)', background: 'transparent',
                 borderRadius: '8px', color: 'inherit', textDecoration: 'none', textAlign: 'left', cursor: 'pointer' 
               }}>
                 <div style={{ fontWeight: 600, color: 'var(--nexus-primary)', marginBottom: '0.5rem' }}>Architecture →</div>
                 <div style={{ fontSize: '0.9rem', color: 'var(--nexus-text-secondary)' }}>Understand the control plane.</div>
               </button>
            </div>

          </article>
      </main>

      {/* TOC - Fixed Right */}
      <aside className="toc-sidebar" style={{ 
        width: '240px', 
        position: 'sticky', 
        top: '6rem', 
        height: 'fit-content', 
        paddingRight: '2rem',
        paddingTop: '3rem',
        fontSize: '0.85rem',
        borderLeft: '1px solid var(--nexus-border)',
        paddingLeft: '1.5rem',
        flexShrink: 0
      }}>
        {headings.length > 0 && (
          <>
            <div style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--nexus-text-primary)' }}>On this page</div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {headings.map((heading) => (
                <li key={heading.id} style={{
                    paddingLeft: heading.level === 3 ? '1rem' : '0'
                }}>
                  <a 
                    href={`#${heading.id}`} 
                    onClick={(e) => scrollToHeading(heading.id, e)}
                    style={{ 
                      color: activeHeadingId === heading.id ? 'var(--nexus-primary)' : 'var(--nexus-text-secondary)',
                      fontWeight: activeHeadingId === heading.id ? 600 : 400,
                      borderLeft: activeHeadingId === heading.id ? '2px solid var(--nexus-primary)' : '2px solid transparent',
                      paddingLeft: '0.75rem',
                      marginLeft: '-0.75rem',
                      display: 'block',
                      transition: 'all 0.2s'
                    }}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>
      
      <style>{`
        @media (max-width: 1200px) {
          .toc-sidebar { display: none !important; }
          main { padding-right: 2rem !important; }
        }
        @media (max-width: 768px) {
          .sidebar-container { display: none !important; }
          main { padding: 2rem 1.5rem !important; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};


import React, { useState, useEffect, useRef } from 'react';
import { Sidebar, SIDEBAR_ITEMS, SidebarItemDef } from '../components/Sidebar';
import { ChevronRight, Info, Check, Copy, Sparkles, Loader2, Star, Search, Server, Globe, Puzzle, Zap, Activity, Shield, AlertTriangle, Lightbulb, Flame, FileText } from 'lucide-react';
import { summarizeContent } from '../services/GeminiService';
import { FavoriteItem } from './Profile';
import { useTranslation } from '../i18n/I18nContext';

interface DocumentationProps {
  activeDoc: string;
  onDocChange: (docId: string) => void;
  favorites: FavoriteItem[];
  onToggleFavorite: (item: FavoriteItem) => void;
  onSearch: (query: string) => void;
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

interface CalloutProps {
  type: 'info' | 'tip' | 'warning' | 'danger' | 'note';
  title?: string;
  children: React.ReactNode;
}

const Callout: React.FC<CalloutProps> = ({ type, title, children }) => {
  const config = {
    info: { icon: Info, color: 'var(--nexus-info)', bg: 'rgba(59, 130, 246, 0.08)', border: 'rgba(59, 130, 246, 0.2)' },
    tip: { icon: Lightbulb, color: 'var(--nexus-success)', bg: 'rgba(16, 185, 129, 0.08)', border: 'rgba(16, 185, 129, 0.2)' },
    warning: { icon: AlertTriangle, color: 'var(--nexus-warning)', bg: 'rgba(245, 158, 11, 0.08)', border: 'rgba(245, 158, 11, 0.2)' },
    danger: { icon: Flame, color: 'var(--nexus-danger)', bg: 'rgba(239, 68, 68, 0.08)', border: 'rgba(239, 68, 68, 0.2)' },
    note: { icon: FileText, color: 'var(--nexus-primary)', bg: 'rgba(67, 97, 238, 0.08)', border: 'rgba(67, 97, 238, 0.2)' },
  }[type];

  const Icon = config.icon;

  return (
    <div style={{
      padding: '1rem 1.25rem',
      backgroundColor: config.bg,
      border: `1px solid ${config.border}`,
      borderRadius: '8px',
      marginBottom: '1.5rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: config.color, fontWeight: 600 }}>
        <Icon size={18} />
        {title && <span>{title}</span>}
      </div>
      <div style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--nexus-text-primary)' }}>
        {children}
      </div>
    </div>
  );
};

export const Documentation: React.FC<DocumentationProps> = ({ 
  activeDoc, 
  onDocChange, 
  favorites, 
  onToggleFavorite,
  onSearch 
}) => {
  const { t } = useTranslation();
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  
  const pageContentRef = useRef<HTMLDivElement>(null);
  
  // Resolve current item details
  const currentItem = findSidebarItem(SIDEBAR_ITEMS.flatMap(s => s.items), activeDoc);
  const currentCategory = findCategory(SIDEBAR_ITEMS, activeDoc);
  const isFavorite = favorites.some(f => f.id === activeDoc);
  
  // Translate labels
  const translatedCategory = t(`sidebar.${currentCategory}`) === `sidebar.${currentCategory}` ? currentCategory : t(`sidebar.${currentCategory}`);
  const translatedLabel = currentItem ? (t(`sidebar.${currentItem.id}`) === `sidebar.${currentItem.id}` ? currentItem.label : t(`sidebar.${currentItem.id}`)) : t('sidebar.intro');

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
          title: translatedLabel,
          path: 'docs',
          description: `${translatedCategory} > ${translatedLabel}`
      });
  };

  // Render content based on active doc
  const renderContent = () => {
    switch(activeDoc) {
      case 'seo-performance':
        return (
          <>
            <p style={{ fontSize: '1.125rem', color: 'var(--nexus-text-secondary)', marginBottom: '2rem' }}>
              Optimizing your EATGF deployment for search engines and high-throughput performance is critical for public-facing portals.
            </p>
            
            <h2 id="seo-config" style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--nexus-border)', paddingBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Search size={28} color="var(--nexus-primary)" /> SEO Configuration</div>
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              EATGF automatically generates sitemaps and meta tags. You can override these in your `eatgf.config.js` file.
            </p>
            <CodeBlock 
              language="javascript" 
              code={`// eatgf.config.js
module.exports = {
  seo: {
    titleTemplate: '%s | Enterprise Portal',
    description: 'Official documentation for our platform.',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://docs.acme.com',
      site_name: 'Acme Docs',
    },
    twitter: {
      handle: '@acme_corp',
      site: '@acme_corp',
      cardType: 'summary_large_image',
    },
  }
}`} 
            />

            <h2 id="performance" style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--nexus-border)', paddingBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Activity size={28} color="var(--nexus-primary)" /> Performance Tuning</div>
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              To achieve sub-100ms latency, we recommend the following caching strategies.
            </p>

            <Callout type="tip" title="Pro Tip">
              Use the `Nexus-CDN-Cache-Control` header to granularly control edge caching behavior per API route.
            </Callout>
            
            <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1.5rem' }}>
               <div style={{ padding: '1.5rem', background: 'var(--nexus-bg-surface)', border: '1px solid var(--nexus-border)', borderRadius: '12px' }}>
                 <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Edge Caching (CDN)</h3>
                 <p style={{ color: 'var(--nexus-text-secondary)', fontSize: '0.9rem' }}>
                    Configure your CDN to cache static assets (`/_next/static/*`) for 1 year (immutable). API responses should have a `s-maxage` of 60 seconds.
                 </p>
               </div>
               <div style={{ padding: '1.5rem', background: 'var(--nexus-bg-surface)', border: '1px solid var(--nexus-border)', borderRadius: '12px' }}>
                 <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Image Optimization</h3>
                 <p style={{ color: 'var(--nexus-text-secondary)', fontSize: '0.9rem' }}>
                    Use the built-in image optimizer or a third-party service like Cloudinary. Always serve AVIF or WebP formats.
                 </p>
               </div>
            </div>
          </>
        );

      case 'i18n-config':
        return (
          <>
            <p style={{ fontSize: '1.125rem', color: 'var(--nexus-text-secondary)', marginBottom: '2rem' }}>
              Reach a global audience by localizing your documentation. EATGF supports JSON-based translation files and route routing.
            </p>

            <h2 id="locale-setup" style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--nexus-border)', paddingBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Globe size={28} color="var(--nexus-primary)" /> Setup Locales</div>
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              Define your supported languages in the configuration file.
            </p>
            <CodeBlock 
              language="json" 
              code={`// locales.json
{
  "defaultLocale": "en",
  "locales": ["en", "fr", "de", "es", "ja"],
  "routing": {
    "prefixDefaultLocale": false
  }
}`} 
            />

            <h2 id="translations" style={{ fontSize: '1.75rem', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--nexus-border)', paddingBottom: '0.5rem' }}>
              Translation Files
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              Place your translation strings in the `/locales` directory.
            </p>
            <CodeBlock 
              language="json" 
              code={`// locales/fr/common.json
{
  "nav": {
    "home": "Accueil",
    "docs": "Documentation",
    "api": "Référence API"
  },
  "buttons": {
    "submit": "Soumettre",
    "cancel": "Annuler"
  }
}`} 
            />
            
            <Callout type="info" title="RTL Support">
              Right-to-Left (RTL) support for languages like Arabic and Hebrew is automatically enabled when the locale is detected.
            </Callout>
          </>
        );

      case 'enterprise-plugins':
        return (
          <>
             <p style={{ fontSize: '1.125rem', color: 'var(--nexus-text-secondary)', marginBottom: '2rem' }}>
              Extend the functionality of your governance platform with certified enterprise plugins.
            </p>
            
            <Callout type="danger" title="Deprecation Warning">
               The legacy plugin API (v1) will be sunset in Q4 2024. Please migrate to the new `PluginProvider` interface.
            </Callout>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
              {[
                { title: 'Audit Logs Pro', desc: 'Retain immutable logs for 7 years for compliance.', icon: <Activity size={24} />, cmd: 'eatgf plugin add audit-logs' },
                { title: 'SAML SSO', desc: 'Connect Okta, Azure AD, or OneLogin.', icon: <Shield size={24} />, cmd: 'eatgf plugin add sso-saml' },
                { title: 'Advanced Analytics', desc: 'User journey tracking and heatmap analysis.', icon: <Zap size={24} />, cmd: 'eatgf plugin add analytics' },
                { title: 'PDF Generator', desc: 'Export documentation as branded PDFs.', icon: <Server size={24} />, cmd: 'eatgf plugin add pdf-export' },
                { title: 'Jira Sync', desc: 'Bi-directional sync for issue tracking.', icon: <Puzzle size={24} />, cmd: 'eatgf plugin add jira-sync' },
              ].map((plugin, i) => (
                <div key={i} style={{ 
                  padding: '1.5rem', background: 'var(--nexus-bg-surface)', 
                  border: '1px solid var(--nexus-border)', borderRadius: '12px',
                  display: 'flex', flexDirection: 'column', gap: '1rem',
                  transition: 'transform 0.2s', cursor: 'default'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--nexus-primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--nexus-border)'}
                >
                   <div style={{ 
                     width: 48, height: 48, borderRadius: '10px', 
                     background: 'rgba(67, 97, 238, 0.1)', color: 'var(--nexus-primary)',
                     display: 'flex', alignItems: 'center', justifyContent: 'center'
                   }}>
                     {plugin.icon}
                   </div>
                   <div>
                     <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{plugin.title}</h3>
                     <p style={{ color: 'var(--nexus-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>{plugin.desc}</p>
                   </div>
                   <div style={{ marginTop: 'auto', background: 'var(--nexus-bg-root)', padding: '0.5rem', borderRadius: '6px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', border: '1px solid var(--nexus-border)' }}>
                     $ {plugin.cmd}
                   </div>
                </div>
              ))}
            </div>

            <h2 id="custom-plugins" style={{ fontSize: '1.75rem', marginTop: '3rem', marginBottom: '1rem', borderBottom: '1px solid var(--nexus-border)', paddingBottom: '0.5rem' }}>
              Building Custom Plugins
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              Use our Plugin SDK to build internal integrations.
            </p>
            <CodeBlock 
              language="bash" 
              code={`npx @eatgf/create-plugin my-custom-plugin`} 
            />
          </>
        );

      default:
        // Default / Generic Content for Intro, Installation, etc.
        return (
          <>
            <p style={{ fontSize: '1.125rem', color: 'var(--nexus-text-secondary)', marginBottom: '2rem' }}>
              The <strong>Enterprise AI-Aligned Technical Governance Framework (EATGF)</strong> is a unified knowledge and cloud orchestration platform designed for high-scale enterprise environments. This guide covers the architectural principles and basic setup.
            </p>

            <Callout type="note" title="Enterprise Note">
              This documentation applies to EATGF v2.4+. If you are on a legacy version (v1.x), please switch the version dropdown in the navbar.
            </Callout>

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
          </>
        );
    }
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
          
          {/* Functional Search Bar */}
          <div style={{
             position: 'relative',
             width: '100%',
             maxWidth: '600px',
             marginBottom: '2rem'
          }}>
             <Search size={18} style={{ 
               position: 'absolute', 
               left: '1rem', 
               top: '50%', 
               transform: 'translateY(-50%)', 
               color: 'var(--nexus-text-secondary)',
               pointerEvents: 'none' 
             }} />
             <input 
                type="text" 
                placeholder={t('common.searchPlaceholder')}
                onChange={(e) => onSearch(e.target.value)}
                style={{
                   width: '100%',
                   padding: '0.75rem 1rem 0.75rem 2.75rem',
                   background: 'var(--nexus-bg-surface)',
                   border: '1px solid var(--nexus-border)',
                   borderRadius: '8px',
                   color: 'var(--nexus-text-primary)',
                   fontSize: '0.9rem',
                   boxShadow: 'var(--shadow-sm)',
                   outline: 'none',
                   transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--nexus-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(67, 97, 238, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--nexus-border)';
                  e.target.style.boxShadow = 'var(--shadow-sm)';
                }}
             />
             <div style={{
               position: 'absolute',
               right: '1rem',
               top: '50%',
               transform: 'translateY(-50%)',
               fontSize: '0.75rem',
               border: '1px solid var(--nexus-border)',
               padding: '2px 6px',
               borderRadius: '4px',
               color: 'var(--nexus-text-secondary)',
               pointerEvents: 'none'
             }}>
               {t('common.cmdK')}
             </div>
          </div>

          {/* Breadcrumbs */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--nexus-text-secondary)', fontSize: '0.875rem', marginBottom: '2rem' }}>
            <span>Docs</span>
            <ChevronRight size={14} />
            <span>{translatedCategory}</span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--nexus-text-primary)', fontWeight: 600 }}>{translatedLabel}</span>
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
                {translatedLabel}
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
            
            {/* Dynamic Content Body */}
            {renderContent()}

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

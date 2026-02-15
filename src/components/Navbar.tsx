
import React, { useState, useRef, useEffect } from 'react';
import { Search, Moon, Sun, Menu, Github, ChevronDown, MessageSquare, LogOut, User as UserIcon, Settings, Globe } from 'lucide-react';
import { UserProfile } from './AuthModals';
import { useTranslation } from '../i18n/I18nContext';
import { Tooltip } from './Tooltip';

interface NavbarProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  onFeedbackClick: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  onNavigate: (page: string) => void;
  currentVersion: string;
  onVersionChange: (version: string) => void;
  user: UserProfile | null;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogoutClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onMenuClick, 
  onSearchClick, 
  onFeedbackClick, 
  isDark, 
  toggleTheme, 
  onNavigate,
  currentVersion,
  onVersionChange,
  user,
  onLoginClick,
  onSignupClick,
  onLogoutClick
}) => {
  const [isVersionMenuOpen, setIsVersionMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const versionDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const { t, language, setLanguage } = useTranslation();

  const versions = [
    { label: 'v2.4', tag: 'Latest' },
    { label: 'v2.3', tag: 'Stable' },
    { label: 'v1.5', tag: 'Legacy' },
    { label: 'Next', tag: 'Beta' },
  ];

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (versionDropdownRef.current && !versionDropdownRef.current.contains(event.target as Node)) {
        setIsVersionMenuOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav style={{
      height: 'var(--navbar-height)',
      borderBottom: '1px solid var(--nexus-border)',
      position: 'sticky',
      top: 0,
      backgroundColor: 'rgba(var(--nexus-bg-root), 0.8)', 
      backdropFilter: 'blur(12px)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      padding: '0 1.5rem',
      background: 'var(--nexus-bg-root)',
      width: '100%'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        
        {/* Left: Logo & Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <button onClick={onMenuClick} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: 'var(--nexus-text-primary)' }} className="lg-hidden">
            <Menu size={24} />
          </button>
          
          <div 
            onClick={() => onNavigate('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          >
            <div style={{ 
              width: 32, 
              height: 32, 
              background: 'linear-gradient(135deg, var(--nexus-primary) 0%, var(--nexus-primary-light) 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              E
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--nexus-text-primary)' }}>EATGF</span>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }} className="desktop-links">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('docs'); }} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--nexus-text-primary)' }}>{t('nav.docs')}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('api'); }} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--nexus-text-secondary)' }}>{t('nav.api')}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--nexus-text-secondary)' }}>{t('nav.community')}</a>
          </div>
        </div>

        {/* Right: Search & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Version Switcher */}
          <div style={{ position: 'relative' }} ref={versionDropdownRef} className="desktop-links">
            <button 
              onClick={() => setIsVersionMenuOpen(!isVersionMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                background: 'transparent',
                border: '1px solid transparent',
                borderRadius: '6px',
                padding: '0.4rem 0.5rem',
                cursor: 'pointer',
                color: 'var(--nexus-text-secondary)',
                fontSize: '0.875rem',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--nexus-bg-surface-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span style={{ color: 'var(--nexus-primary)' }}>{currentVersion}</span>
              <ChevronDown size={14} />
            </button>

            {isVersionMenuOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                right: 0,
                width: '180px',
                background: 'var(--nexus-bg-surface)',
                border: '1px solid var(--nexus-border)',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-lg)',
                padding: '0.5rem',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
              }}>
                <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--nexus-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t('common.selectVersion')}
                </div>
                {versions.map((v) => {
                  const isActive = v.label === currentVersion;
                  return (
                    <button
                      key={v.label}
                      onClick={() => {
                        onVersionChange(v.label);
                        setIsVersionMenuOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        background: isActive ? 'var(--nexus-bg-root)' : 'transparent',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        color: isActive ? 'var(--nexus-primary)' : 'var(--nexus-text-primary)',
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 600 : 400,
                      }}
                      onMouseEnter={(e) => !isActive && (e.currentTarget.style.background = 'var(--nexus-bg-surface-hover)')}
                      onMouseLeave={(e) => !isActive && (e.currentTarget.style.background = 'transparent')}
                    >
                      {v.label}
                      <span style={{ 
                        fontSize: '0.7rem', 
                        padding: '2px 6px', 
                        borderRadius: '10px', 
                        background: isActive ? 'rgba(79, 70, 229, 0.1)' : 'var(--nexus-border)',
                        color: isActive ? 'var(--nexus-primary)' : 'var(--nexus-text-secondary)',
                        fontWeight: 500
                      }}>
                        {v.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Search Trigger */}
          <Tooltip content="Search" position="bottom">
            <button 
              onClick={onSearchClick}
              style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.75rem',
              borderRadius: '6px',
              border: '1px solid var(--nexus-border)',
              background: 'var(--nexus-bg-surface)',
              color: 'var(--nexus-text-secondary)',
              fontSize: '0.875rem',
              cursor: 'pointer',
              minWidth: '200px'
            }} className="desktop-links">
              <Search size={16} />
              <span>{t('common.search')}</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', border: '1px solid var(--nexus-border)', padding: '0 4px', borderRadius: '4px' }}>{t('common.cmdK')}</span>
            </button>
          </Tooltip>
          
          {/* Mobile Search Icon */}
          <Tooltip content="Search" position="bottom">
            <button onClick={onSearchClick} className="lg-hidden" style={{ background: 'none', border: 'none', color: 'var(--nexus-text-secondary)', padding: '0.5rem' }}>
              <Search size={20} />
            </button>
          </Tooltip>

          <div style={{ width: 1, height: 24, background: 'var(--nexus-border)' }} className="desktop-links"></div>

          {/* Utilities */}
          <div style={{ display: 'flex', alignItems: 'center' }} className="desktop-links">
             {/* Language Switcher */}
            <div style={{ position: 'relative' }} ref={langDropdownRef}>
              <Tooltip content="Switch Language" position="bottom">
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--nexus-text-secondary)', display: 'flex', padding: '0.5rem' }}
                >
                  <Globe size={20} />
                </button>
              </Tooltip>
              {isLangMenuOpen && (
                <div style={{
                    position: 'absolute', top: '100%', right: 0,
                    width: '160px', background: 'var(--nexus-bg-surface)',
                    border: '1px solid var(--nexus-border)', borderRadius: '8px',
                    boxShadow: 'var(--shadow-md)', zIndex: 100, overflow: 'hidden'
                }}>
                  {languages.map(lang => (
                    <button 
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code as any); setIsLangMenuOpen(false); }}
                        style={{ 
                            width: '100%', padding: '0.5rem 1rem', textAlign: 'left', border: 'none', background: 'transparent',
                            color: language === lang.code ? 'var(--nexus-primary)' : 'var(--nexus-text-primary)',
                            fontWeight: language === lang.code ? 600 : 400, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '0.75rem'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--nexus-bg-surface-hover)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        <span style={{ fontSize: '1.2em' }}>{lang.flag}</span>
                        {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Tooltip content="Provide Feedback" position="bottom">
              <button 
                  onClick={onFeedbackClick}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--nexus-text-secondary)', display: 'flex', alignItems: 'center', padding: '0.5rem' }}
              >
                  <MessageSquare size={20} />
              </button>
            </Tooltip>

            <Tooltip content={isDark ? "Light Mode" : "Dark Mode"} position="bottom">
              <button 
                  onClick={toggleTheme}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--nexus-text-secondary)', display: 'flex', padding: '0.5rem' }}
              >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </Tooltip>
          </div>

          {/* Auth Section */}
          <div style={{ marginLeft: '0.5rem' }}>
            {user ? (
               <div style={{ position: 'relative' }} ref={userDropdownRef}>
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    style={{
                      border: 'none', background: 'none', cursor: 'pointer', padding: 0,
                      display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid var(--nexus-bg-surface)', boxShadow: '0 0 0 1px var(--nexus-border)' }} 
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div style={{
                      position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                      width: '220px', background: 'var(--nexus-bg-surface)',
                      border: '1px solid var(--nexus-border)', borderRadius: '12px',
                      boxShadow: 'var(--shadow-xl)', overflow: 'hidden', zIndex: 100,
                      animation: 'float 0.2s ease-out'
                    }}>
                       <div style={{ padding: '1rem', borderBottom: '1px solid var(--nexus-border)', background: 'var(--nexus-bg-root)' }}>
                          <div style={{ fontWeight: 600, color: 'var(--nexus-text-primary)' }}>{user.name}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--nexus-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
                       </div>
                       <div style={{ padding: '0.5rem' }}>
                          <button 
                            onClick={() => { setIsUserMenuOpen(false); onNavigate('profile'); }}
                            style={{ 
                              width: '100%', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
                              border: 'none', background: 'transparent', textAlign: 'left',
                              color: 'var(--nexus-text-primary)', fontSize: '0.9rem', cursor: 'pointer',
                              borderRadius: '6px'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--nexus-bg-surface-hover)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                             <UserIcon size={16} /> {t('common.profile')}
                          </button>
                          <button style={{ 
                            width: '100%', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
                            border: 'none', background: 'transparent', textAlign: 'left',
                            color: 'var(--nexus-text-primary)', fontSize: '0.9rem', cursor: 'pointer',
                            borderRadius: '6px'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'var(--nexus-bg-surface-hover)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                             <Settings size={16} /> {t('common.settings')}
                          </button>
                          <div style={{ height: 1, background: 'var(--nexus-border)', margin: '0.5rem 0' }}></div>
                          <button 
                            onClick={() => { onLogoutClick(); setIsUserMenuOpen(false); }}
                            style={{ 
                              width: '100%', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
                              border: 'none', background: 'transparent', textAlign: 'left',
                              color: 'var(--nexus-danger)', fontSize: '0.9rem', cursor: 'pointer',
                              borderRadius: '6px'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                             <LogOut size={16} /> {t('common.logout')}
                          </button>
                       </div>
                    </div>
                  )}
               </div>
            ) : (
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button 
                    onClick={onLoginClick}
                    style={{
                      background: 'none', border: 'none', 
                      color: 'var(--nexus-text-primary)', fontWeight: 600, 
                      fontSize: '0.9rem', cursor: 'pointer',
                      padding: '0.5rem'
                    }}
                  >
                    {t('common.login')}
                  </button>
                  <button 
                    onClick={onSignupClick}
                    style={{
                      background: 'var(--nexus-primary)', color: 'white',
                      border: 'none', borderRadius: '6px',
                      padding: '0.5rem 1rem', fontWeight: 600,
                      fontSize: '0.9rem', cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(67, 97, 238, 0.3)'
                    }}
                  >
                    {t('common.signup')}
                  </button>
               </div>
            )}
          </div>

        </div>
      </div>
      
      <style>{`
        .lg-hidden { display: none; }
        @media (max-width: 768px) {
          .desktop-links { display: none !important; }
          .lg-hidden { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

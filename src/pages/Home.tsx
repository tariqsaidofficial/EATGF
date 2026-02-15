
import React from 'react';
import { ArrowRight, Search, Book, Code, Shield, Layers, Zap, Database } from 'lucide-react';
import { useTranslation } from '../i18n/I18nContext';

interface HomeProps {
  onNavigate: (page: string) => void;
  onSearch?: (query: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onSearch }) => {
  const { t } = useTranslation();

  return (
    <main style={{ width: '100%' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '8rem 0 10rem',
        background: 'var(--nexus-gradient-bg)',
        color: 'white',
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Floating Background Elements (Abstract) */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', opacity: 0.1, pointerEvents: 'none' }} className="lg-hidden">
            <Layers size={120} />
        </div>
        <div style={{ position: 'absolute', bottom: '20%', right: '5%', opacity: 0.1, pointerEvents: 'none' }} className="lg-hidden">
            <Code size={120} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%' }}>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 800, 
            lineHeight: 1.1, 
            marginBottom: '1.5rem',
            color: 'white' 
          }}>
            {t('hero.title')}
          </h1>
          
          <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: 1.5 }}>
             {t('hero.subtitle')}
          </p>

          {/* Central Search Bar */}
          <div className="hero-search-container">
            <input 
              type="text" 
              className="hero-search-input"
              placeholder={t('common.searchKbPlaceholder')} 
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
            <button className="hero-search-btn" onClick={() => onNavigate('docs')} aria-label="Search Docs">
              <Search size={20} />
            </button>
          </div>
          
          <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', opacity: 0.8, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
            <span>{t('common.popular')}:</span>
            <span onClick={() => onNavigate('docs')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Framework Setup</span>, 
            <span onClick={() => onNavigate('security')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>{t('modules.governance')}</span>, 
            <span onClick={() => onNavigate('billing')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Compliance</span>
          </div>

        </div>

        {/* Wave Separator */}
        <div className="custom-shape-divider-bottom">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
        </div>
      </section>

      {/* Topics Grid */}
      <section style={{ padding: '4rem 0 6rem', marginTop: '-4rem', position: 'relative', zIndex: 20, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div className="container">
           <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
             <span style={{ color: 'var(--nexus-primary)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.8rem' }}>{t('home.knowledgeBase')}</span>
             <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{t('home.exploreTopics')}</h2>
           </div>
           
           <div className="grid-3-col">
             <DocCard 
               icon={<Book size={28} />} 
               color="blue"
               title={t('nav.docs')} 
               desc={t('cards.docsDesc')}
               onClick={() => onNavigate('docs')}
               btnText={t('common.viewDetails')}
             />
             <DocCard 
               icon={<Code size={28} />} 
               color="purple"
               title={t('nav.api')} 
               desc={t('cards.apiDesc')}
               onClick={() => onNavigate('api')}
               btnText={t('common.viewDetails')}
             />
             <DocCard 
               icon={<Shield size={28} />} 
               color="pink"
               title={t('modules.governance')}
               desc={t('cards.govDesc')}
               onClick={() => onNavigate('security')}
               btnText={t('common.viewDetails')}
             />
             <DocCard 
               icon={<Layers size={28} />} 
               color="teal"
               title={t('modules.architecture')}
               desc={t('cards.archDesc')}
               onClick={() => onNavigate('architecture')}
               btnText={t('common.viewDetails')}
             />
             <DocCard 
               icon={<Database size={28} />} 
               color="orange"
               title={t('modules.dataModel')}
               desc={t('cards.dataDesc')}
               onClick={() => onNavigate('datamodel')}
               btnText={t('common.viewDetails')}
             />
             <DocCard 
               icon={<Zap size={28} />} 
               color="blue"
               title={t('modules.integrations')} 
               desc={t('cards.intDesc')}
               onClick={() => onNavigate('integrations')}
               btnText={t('common.viewDetails')}
             />
           </div>
        </div>
      </section>

      {/* Trust/Support Section */}
      <section style={{ padding: '6rem 0', background: 'white', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div className="container grid-2-col">
          <div>
             <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>
               {t('home.customerRel')}
             </h2>
             <p style={{ color: 'var(--nexus-text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
               {t('home.customerRelDesc')}
             </p>
             <button onClick={() => onNavigate('community')} style={{
               padding: '1rem 2rem',
               background: 'var(--nexus-primary)',
               color: 'white',
               border: 'none',
               borderRadius: '50px',
               fontSize: '1rem',
               fontWeight: 600,
               cursor: 'pointer',
               boxShadow: '0 10px 20px rgba(67, 97, 238, 0.3)'
             }}>
               {t('home.joinCommunity')}
             </button>
          </div>
          
          {/* Simulated Illustration area */}
          <div style={{ 
            height: '400px', 
            background: 'var(--nexus-bg-root)', 
            borderRadius: '24px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative',
            width: '100%'
          }}>
             <div style={{ position: 'absolute', top: -20, right: -20, background: 'white', padding: '1rem', borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }}></div>
                    <span style={{ fontWeight: 600 }}>{t('home.systemOp')}</span>
                </div>
             </div>
             <Layers size={100} color="var(--nexus-primary-light)" opacity={0.5} />
          </div>
        </div>
      </section>
    </main>
  );
};

const DocCard: React.FC<{ icon: React.ReactNode, title: string, desc: string, color: string, onClick: () => void, btnText: string }> = ({ icon, title, desc, color, onClick, btnText }) => {
  return (
    <div 
      className="card-modern"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className={`icon-wrapper bg-${color}-light`}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{title}</h3>
      <p style={{ color: 'var(--nexus-text-secondary)', flex: 1, marginBottom: '1.5rem', lineHeight: 1.6 }}>{desc}</p>
      <div style={{ color: 'var(--nexus-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
        {btnText} <ArrowRight size={16} />
      </div>
    </div>
  )
}

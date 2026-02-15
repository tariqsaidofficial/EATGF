
import React from 'react';
import { ArrowRight, Search, Book, Code, Shield, Layers, Zap, Database, Terminal, Cpu, Layout, Server, Box, Cloud, GitBranch } from 'lucide-react';
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
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--nexus-gradient-bg)',
        color: 'white',
        overflow: 'hidden',
        padding: '0 0 8rem',
        marginTop: '-1px' // Fix gap with navbar if any
      }}>
        
        {/* Animated Background Mesh (CSS-only approximation via radial gradients) */}
        <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 20% 30%, rgba(76, 201, 240, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(114, 9, 183, 0.15) 0%, transparent 50%)',
            pointerEvents: 'none'
        }} />

        {/* Floating Abstract Elements */}
        <div style={{ position: 'absolute', top: '15%', left: '10%', opacity: 0.1, animation: 'float 6s ease-in-out infinite' }} className="lg-hidden">
            <Layers size={140} />
        </div>
        <div style={{ position: 'absolute', bottom: '25%', right: '8%', opacity: 0.1, animation: 'float 8s ease-in-out infinite reverse' }} className="lg-hidden">
            <Code size={140} />
        </div>
        <div style={{ position: 'absolute', top: '20%', right: '20%', opacity: 0.05, animation: 'float 10s ease-in-out infinite' }} className="lg-hidden">
            <Cpu size={100} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{ 
            marginBottom: '1.5rem', 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '0.9rem',
            fontWeight: 500,
            animation: 'fadeInDown 0.8s ease-out'
          }}>
             <span style={{ width: 8, height: 8, background: '#4ade80', borderRadius: '50%' }}></span>
             v1.0 Stable Release is here
          </div>

          <h1 style={{ 
            fontSize: 'clamp(3rem, 6vw, 5rem)', 
            fontWeight: 800, 
            lineHeight: 1.1, 
            marginBottom: '1.5rem',
            color: 'white',
            letterSpacing: '-0.02em',
            textShadow: '0 20px 40px rgba(0,0,0,0.1)',
            animation: 'fadeInUp 0.8s ease-out 0.2s backwards'
          }}>
            {t('hero.title')}
          </h1>
          
          <p style={{ 
            fontSize: '1.35rem', 
            opacity: 0.9, 
            marginBottom: '3.5rem', 
            maxWidth: '750px', 
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.9)',
            animation: 'fadeInUp 0.8s ease-out 0.4s backwards'
          }}>
             {t('hero.subtitle')}
          </p>

          {/* Enhanced Search Bar */}
          <div 
            className="hero-search-container" 
            style={{ 
              animation: 'fadeInUp 0.8s ease-out 0.6s backwards',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '0.75rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxWidth: '650px'
            }}
          >
            <Search size={24} color="var(--nexus-text-secondary)" style={{ marginLeft: '1rem' }} />
            <input 
              type="text" 
              className="hero-search-input"
              placeholder={t('common.searchKbPlaceholder')} 
              onChange={(e) => onSearch && onSearch(e.target.value)}
              style={{ fontSize: '1.1rem', padding: '1rem' }}
            />
            <button 
              className="hero-search-btn" 
              onClick={() => onNavigate('docs')} 
              aria-label="Search Docs"
              style={{ width: '56px', height: '56px', borderRadius: '14px' }}
            >
              <ArrowRight size={24} />
            </button>
          </div>
          
          <div style={{ 
            marginTop: '2rem', 
            fontSize: '0.95rem', 
            opacity: 0.8, 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '1.5rem',
            animation: 'fadeIn 1s ease-out 1s backwards'
          }}>
            <span style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.8rem', alignSelf: 'center' }}>{t('common.popular')}:</span>
            {['Framework Setup', 'Governance', 'Compliance', 'API Keys'].map((tag, i) => (
                <button 
                    key={i}
                    onClick={() => onNavigate(tag === 'Governance' ? 'security' : 'docs')}
                    style={{ 
                        background: 'rgba(255,255,255,0.1)', 
                        border: '1px solid rgba(255,255,255,0.2)', 
                        padding: '0.4rem 1rem', 
                        borderRadius: '20px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'background 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                    {tag}
                </button>
            ))}
          </div>

        </div>

        {/* Wave Separator */}
        <div className="custom-shape-divider-bottom" style={{ height: '80px' }}>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
        </div>
      </section>

      {/* Topics Grid */}
      <section style={{ padding: '2rem 0 8rem', position: 'relative', zIndex: 20 }}>
        <div className="container">
           <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
             <span style={{ 
                 color: 'var(--nexus-primary)', 
                 fontWeight: 700, 
                 letterSpacing: '1.5px', 
                 textTransform: 'uppercase', 
                 fontSize: '0.85rem',
                 background: 'rgba(67, 97, 238, 0.1)',
                 padding: '0.5rem 1rem',
                 borderRadius: '20px'
             }}>
                 {t('home.knowledgeBase')}
             </span>
             <h2 style={{ fontSize: '2.5rem', marginTop: '1.5rem', fontWeight: 800 }}>{t('home.exploreTopics')}</h2>
             <p style={{ color: 'var(--nexus-text-secondary)', maxWidth: '600px', margin: '1rem auto 0', fontSize: '1.1rem' }}>
                Everything you need to configure, secure, and scale your technical governance infrastructure.
             </p>
           </div>
           
           <div className="grid-3-col" style={{ gap: '2.5rem' }}>
             <DocCard 
               icon={<Book size={32} />} 
               color="blue"
               title={t('nav.docs')} 
               desc={t('cards.docsDesc')}
               onClick={() => onNavigate('docs')}
               btnText={t('common.viewDetails')}
             />
             <DocCard 
               icon={<Terminal size={32} />} 
               color="purple"
               title={t('nav.api')} 
               desc={t('cards.apiDesc')}
               onClick={() => onNavigate('api')}
               btnText={t('common.viewDetails')}
             />
             <DocCard 
               icon={<Shield size={32} />} 
               color="pink"
               title={t('modules.governance')}
               desc={t('cards.govDesc')}
               onClick={() => onNavigate('security')}
               btnText={t('common.viewDetails')}
             />
             <DocCard 
               icon={<Layers size={32} />} 
               color="teal"
               title={t('modules.architecture')}
               desc={t('cards.archDesc')}
               onClick={() => onNavigate('architecture')}
               btnText={t('common.viewDetails')}
             />
             <DocCard 
               icon={<Database size={32} />} 
               color="orange"
               title={t('modules.dataModel')}
               desc={t('cards.dataDesc')}
               onClick={() => onNavigate('datamodel')}
               btnText={t('common.viewDetails')}
             />
             <DocCard 
               icon={<Zap size={32} />} 
               color="blue"
               title={t('modules.integrations')} 
               desc={t('cards.intDesc')}
               onClick={() => onNavigate('integrations')}
               btnText={t('common.viewDetails')}
             />
           </div>
        </div>
      </section>

      {/* Tech Stack / Framework Profiles Section (Supported Ecosystem) */}
      <section style={{ padding: '6rem 0', background: 'var(--nexus-bg-root)', borderTop: '1px solid var(--nexus-border)', borderBottom: '1px solid var(--nexus-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ 
                 color: 'var(--nexus-accent)', 
                 fontWeight: 700, 
                 letterSpacing: '1.5px', 
                 textTransform: 'uppercase', 
                 fontSize: '0.85rem',
                 background: 'rgba(114, 9, 183, 0.1)',
                 padding: '0.5rem 1rem',
                 borderRadius: '20px'
             }}>
                 Universal Compatibility
             </span>
            <h2 style={{ fontSize: '2.5rem', marginTop: '1.5rem', fontWeight: 800 }}>Supported Frameworks</h2>
            <p style={{ color: 'var(--nexus-text-secondary)', maxWidth: '700px', margin: '1rem auto 0', fontSize: '1.1rem' }}>
              EATGF provides out-of-the-box governance profiles, security baselines, and architectural patterns for your entire technology stack.
            </p>
          </div>

          <div className="grid-2-col" style={{ gap: '2rem' }}>
             {/* Frontend Profile */}
             <FrameworkCard 
                title="Frontend & Mobile" 
                icon={<Layout size={24} />} 
                color="blue"
                items={['React', 'Vue.js', 'Angular', 'Next.js', 'React Native', 'Flutter', 'Svelte', 'Web Components', 'Tailwind CSS']}
             />

             {/* Backend Profile */}
             <FrameworkCard 
                title="Backend & API" 
                icon={<Server size={24} />} 
                color="purple"
                items={['Node.js', 'Python (FastAPI/Django)', 'Go (Gin/Echo)', 'Java Spring Boot', '.NET Core', 'GraphQL', 'gRPC', 'PostgreSQL']}
             />

             {/* Infrastructure Profile */}
             <FrameworkCard 
                title="Infrastructure & Cloud" 
                icon={<Cloud size={24} />} 
                color="teal"
                items={['AWS', 'Google Cloud', 'Azure', 'Kubernetes', 'Terraform', 'Pulumi', 'Helm', 'Istio', 'Prometheus']}
             />

             {/* DevOps Profile */}
             <FrameworkCard 
                title="DevOps & Security" 
                icon={<GitBranch size={24} />} 
                color="orange"
                items={['Docker', 'GitHub Actions', 'GitLab CI', 'Jenkins', 'ArgoCD', 'SonarQube', 'Snyk', 'HashiCorp Vault']}
             />
          </div>
        </div>
      </section>

      {/* Trust/Support Section */}
      <section style={{ padding: '6rem 0', background: 'var(--nexus-bg-surface)' }}>
        <div className="container grid-2-col" style={{ gap: '5rem', alignItems: 'center' }}>
          <div>
             <h2 style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
               {t('home.customerRel')}
             </h2>
             <p style={{ color: 'var(--nexus-text-secondary)', fontSize: '1.2rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
               {t('home.customerRelDesc')}
             </p>
             <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => onNavigate('community')} style={{
                    padding: '1rem 2.5rem',
                    background: 'var(--nexus-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 10px 25px rgba(67, 97, 238, 0.4)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(67, 97, 238, 0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(67, 97, 238, 0.4)'; }}
                >
                    {t('home.joinCommunity')}
                </button>
                <button onClick={() => onNavigate('contact')} style={{
                    padding: '1rem 2.5rem',
                    background: 'transparent',
                    color: 'var(--nexus-text-primary)',
                    border: '1px solid var(--nexus-border)',
                    borderRadius: '50px',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--nexus-bg-root)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                    Contact Sales
                </button>
             </div>
             
             <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                 <div style={{ display: 'flex', flexDirection: 'column' }}>
                     <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--nexus-text-primary)' }}>99%</span>
                     <span style={{ color: 'var(--nexus-text-secondary)', fontSize: '0.9rem' }}>CSAT Score</span>
                 </div>
                 <div style={{ width: 1, height: 40, background: 'var(--nexus-border)' }}></div>
                 <div style={{ display: 'flex', flexDirection: 'column' }}>
                     <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--nexus-text-primary)' }}>&lt; 1hr</span>
                     <span style={{ color: 'var(--nexus-text-secondary)', fontSize: '0.9rem' }}>Response Time</span>
                 </div>
             </div>
          </div>
          
          {/* Abstract Illustration */}
          <div style={{ 
            height: '450px', 
            background: 'linear-gradient(135deg, var(--nexus-bg-root) 0%, var(--nexus-bg-surface) 100%)', 
            borderRadius: '30px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative',
            width: '100%',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--nexus-border)',
            overflow: 'hidden'
          }}>
             {/* Decorative Circles */}
             <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'var(--nexus-primary)', opacity: 0.05, top: '-50px', right: '-50px' }}></div>
             <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'var(--nexus-accent)', opacity: 0.05, bottom: '20px', left: '20px' }}></div>

             <div style={{ position: 'absolute', top: 30, right: 30, background: 'var(--nexus-bg-surface)', padding: '0.75rem 1.25rem', borderRadius: '12px', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 2 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)' }}></div>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t('home.systemOp')}</span>
             </div>

             <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                 <div style={{ width: 80, height: 80, background: 'white', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                    <Shield size={40} color="var(--nexus-primary)" />
                 </div>
                 <div style={{ width: 80, height: 80, background: 'white', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginLeft: '6rem' }}>
                    <Database size={40} color="var(--nexus-accent)" />
                 </div>
                 <div style={{ width: 80, height: 80, background: 'white', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginRight: '6rem' }}>
                    <Code size={40} color="#10B981" />
                 </div>
             </div>
          </div>
        </div>
      </section>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 
            0% { transform: translateY(0px) rotate(0deg); } 
            50% { transform: translateY(-20px) rotate(5deg); } 
            100% { transform: translateY(0px) rotate(0deg); } 
        }
      `}</style>
    </main>
  );
};

// Helper Component for Framework Cards
const FrameworkCard = ({ title, icon, color, items }: { title: string, icon: any, color: string, items: string[] }) => (
  <div className="card-modern" style={{ borderTop: `4px solid var(--nexus-${color === 'teal' ? 'primary' : color === 'orange' ? 'warning' : color === 'purple' ? 'accent' : 'primary'})` }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className={`icon-wrapper bg-${color}-light`} style={{ marginBottom: 0, width: 50, height: 50 }}>
            {icon}
        </div>
        <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{title}</h3>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {items.map((item, i) => (
            <span key={i} style={{ 
                padding: '0.35rem 0.85rem', 
                background: 'var(--nexus-bg-root)', 
                borderRadius: '6px', 
                fontSize: '0.9rem', 
                color: 'var(--nexus-text-secondary)',
                border: '1px solid var(--nexus-border)',
                fontWeight: 500,
                transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
                e.currentTarget.style.background = `var(--nexus-${color === 'teal' ? 'primary' : color === 'orange' ? 'warning' : color === 'purple' ? 'accent' : 'primary'})`;
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = 'transparent';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--nexus-bg-root)';
                e.currentTarget.style.color = 'var(--nexus-text-secondary)';
                e.currentTarget.style.borderColor = 'var(--nexus-border)';
            }}
            >
                {item}
            </span>
        ))}
    </div>
  </div>
);

const DocCard: React.FC<{ icon: React.ReactNode, title: string, desc: string, color: string, onClick: () => void, btnText: string }> = ({ icon, title, desc, color, onClick, btnText }) => {
  return (
    <div 
      className="card-modern"
      onClick={onClick}
      style={{ 
        cursor: 'pointer',
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        border: '1px solid var(--nexus-border)',
        borderRadius: '20px',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
      }}
      onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
          e.currentTarget.style.borderColor = 'var(--nexus-primary)';
      }}
      onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          e.currentTarget.style.borderColor = 'var(--nexus-border)';
      }}
    >
      <div className={`icon-wrapper bg-${color}-light`} style={{ width: '70px', height: '70px', borderRadius: '18px', marginBottom: '1.5rem' }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 700 }}>{title}</h3>
      <p style={{ color: 'var(--nexus-text-secondary)', flex: 1, marginBottom: '2rem', lineHeight: 1.6, fontSize: '1rem' }}>{desc}</p>
      <div style={{ color: 'var(--nexus-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto', fontSize: '0.95rem' }}>
        {btnText} <ArrowRight size={18} style={{ transition: 'transform 0.2s' }} />
      </div>
    </div>
  )
}

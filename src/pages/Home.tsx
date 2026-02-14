
import React from 'react';
import { ArrowRight, Search, Book, Code, Shield, Layers, Zap, Database } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <main style={{ width: '100%' }}>
      {/* Hero Section with Docfi Vibes - Full Width */}
      <section style={{
        position: 'relative',
        padding: '8rem 0 10rem',
        background: 'var(--nexus-gradient-bg)',
        color: 'white',
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        {/* Floating Background Elements (Abstract) */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', opacity: 0.1 }}>
            <Layers size={120} />
        </div>
        <div style={{ position: 'absolute', bottom: '20%', right: '5%', opacity: 0.1 }}>
            <Code size={120} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 800, 
            lineHeight: 1.1, 
            marginBottom: '1.5rem',
            color: 'white' 
          }}>
            How Can We Help You?
          </h1>
          
          <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
             Search here to get answers to your questions about the <br/><strong>Enterprise AI-Aligned Technical Governance Framework</strong>.
          </p>

          {/* Central Search Bar */}
          <div className="hero-search-container">
            <input 
              type="text" 
              className="hero-search-input"
              placeholder="Search the EATGF knowledge base..." 
            />
            <button className="hero-search-btn" onClick={() => onNavigate('docs')}>
              <Search size={20} />
            </button>
          </div>
          
          <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
            Popular: <span onClick={() => onNavigate('docs')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Framework Setup</span>, <span onClick={() => onNavigate('security')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Governance</span>, <span onClick={() => onNavigate('billing')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Compliance</span>
          </div>

        </div>

        {/* Wave Separator */}
        <div className="custom-shape-divider-bottom">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
        </div>
      </section>

      {/* Topics Grid - Full Width Wrapper */}
      <section style={{ padding: '4rem 0 6rem', marginTop: '-4rem', position: 'relative', zIndex: 20, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div className="container">
           <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
             <span style={{ color: 'var(--nexus-primary)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Knowledge Base</span>
             <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>Explore Our Topics</h2>
           </div>
           
           <div style={{ 
             display: 'grid', 
             gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
             gap: '2rem' 
           }}>
             <DocCard 
               icon={<Book size={28} />} 
               color="blue"
               title="Documentation" 
               desc="Core guides for the EATGF Platform."
               onClick={() => onNavigate('docs')}
             />
             <DocCard 
               icon={<Code size={28} />} 
               color="purple"
               title="API Reference" 
               desc="Complete REST API documentation."
               onClick={() => onNavigate('api')}
             />
             <DocCard 
               icon={<Shield size={28} />} 
               color="pink"
               title="Governance" 
               desc="SOC2, GDPR, and AI compliance info."
               onClick={() => onNavigate('security')}
             />
             <DocCard 
               icon={<Layers size={28} />} 
               color="teal"
               title="Architecture" 
               desc="Deep dive into system design."
               onClick={() => onNavigate('architecture')}
             />
             <DocCard 
               icon={<Database size={28} />} 
               color="orange"
               title="Data Model" 
               desc="Understanding schemas and storage."
               onClick={() => onNavigate('datamodel')}
             />
             <DocCard 
               icon={<Zap size={28} />} 
               color="blue"
               title="Integrations" 
               desc="Connect with Slack, Jira, and Github."
               onClick={() => onNavigate('integrations')}
             />
           </div>
        </div>
      </section>

      {/* Trust/Support Section - Full Width */}
      <section style={{ padding: '6rem 0', background: 'white', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
             <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>
               Great Customer <br /> <span style={{ color: 'var(--nexus-primary)' }}>Relationships</span> Start Here
             </h2>
             <p style={{ color: 'var(--nexus-text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
               We provide 24/7 dedicated support for all enterprise customers. Join the community or chat with our AI assistant.
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
               Join Community Forum
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
            position: 'relative' 
          }}>
             <div style={{ position: 'absolute', top: -20, right: -20, background: 'white', padding: '1rem', borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }}></div>
                    <span style={{ fontWeight: 600 }}>System Operational</span>
                </div>
             </div>
             <Layers size={100} color="var(--nexus-primary-light)" opacity={0.5} />
          </div>
        </div>
      </section>
    </main>
  );
};

const DocCard: React.FC<{ icon: React.ReactNode, title: string, desc: string, color: string, onClick: () => void }> = ({ icon, title, desc, color, onClick }) => {
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
        View Details <ArrowRight size={16} />
      </div>
    </div>
  )
}

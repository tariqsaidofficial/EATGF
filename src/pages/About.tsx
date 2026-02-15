
import React from 'react';
import { Target, Heart, Globe, Users, Award, TrendingUp, Linkedin, Twitter } from 'lucide-react';
import { Note } from '../components/Callout';
import { Tooltip } from '../components/Tooltip';

export const About: React.FC = () => {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section style={{ 
        background: 'var(--nexus-bg-surface)', 
        padding: '8rem 0 6rem', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="pill-tag" style={{ background: 'rgba(67, 97, 238, 0.1)', color: 'var(--nexus-primary)', marginBottom: '1.5rem' }}>Our Mission</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Building the Operating System <br/> for <span style={{ 
              background: 'linear-gradient(135deg, var(--nexus-primary) 0%, var(--nexus-accent) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Modern Governance</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--nexus-text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
            EATGF empowers engineering teams to move fast without breaking things. We provide the guardrails, compliance automation, and architectural standards that enable innovation at scale.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '3rem 0', borderBottom: '1px solid var(--nexus-border)', background: 'var(--nexus-bg-root)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {[
              { label: 'Developers', value: '100k+' },
              { label: 'Countries', value: '35+' },
              { label: 'Uptime', value: '99.99%' },
              { label: 'Compliance Frameworks', value: '12+' },
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--nexus-text-primary)', marginBottom: '0.5rem' }}>{stat.value}</div>
                <div style={{ color: 'var(--nexus-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container grid-2-col" style={{ alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Our Story</h2>
            <p style={{ marginBottom: '1rem', color: 'var(--nexus-text-secondary)', fontSize: '1.1rem' }}>
              It started in 2024 with a simple observation: engineering teams were spending more time writing boilerplate compliance docs than shipping features.
            </p>
            <p style={{ marginBottom: '1rem', color: 'var(--nexus-text-secondary)', fontSize: '1.1rem' }}>
              We set out to build a framework that treats governance as code. What began as an internal tool at a major fintech company has now evolved into the industry standard for technical governance.
            </p>
            <div style={{ marginTop: '2rem' }}>
               <Note title="Open Source DNA">
                  EATGF remains committed to its open-source roots. The core framework will always be free for developers.
               </Note>
            </div>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, var(--nexus-bg-surface) 0%, var(--nexus-bg-root) 100%)', 
            padding: '2rem', 
            borderRadius: '24px',
            border: '1px solid var(--nexus-border)',
            boxShadow: 'var(--shadow-lg)'
          }}>
             {/* Abstract Timeline Visualization */}
             <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '24px', top: '20px', bottom: '20px', width: '2px', background: 'var(--nexus-border)' }}></div>
                {[
                  { year: '2024', event: 'Founded in San Francisco' },
                  { year: '2025', event: 'Released EATGF v1.0' },
                  { year: '2026', event: 'Global Enterprise Launch' },
                ].map((item, i) => (
                   <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                      <div style={{ 
                        width: '50px', height: '50px', borderRadius: '50%', background: 'var(--nexus-primary)', 
                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
                        flexShrink: 0, boxShadow: '0 0 0 4px var(--nexus-bg-surface)'
                      }}>
                        {item.year.slice(2)}
                      </div>
                      <div>
                        <h4 style={{ margin: 0 }}>{item.year}</h4>
                        <p style={{ color: 'var(--nexus-text-secondary)', fontSize: '0.9rem' }}>{item.event}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section style={{ padding: '6rem 0', background: 'var(--nexus-bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Core Values</h2>
            <p style={{ color: 'var(--nexus-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              These principles guide every decision we make, from product roadmap to hiring.
            </p>
          </div>

          <div className="grid-3-col">
            <div className="card-modern">
              <div className="icon-wrapper bg-blue-light">
                <Tooltip content="Users > Everything" position="top">
                  <Target size={32} />
                </Tooltip>
              </div>
              <h3>Customer Obsession</h3>
              <p style={{ color: 'var(--nexus-text-secondary)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                We start with the customer and work backwards. We earn and keep trust by delivering reliable, high-quality tools that solve real problems.
              </p>
            </div>
            <div className="card-modern">
              <div className="icon-wrapper bg-pink-light">
                 <Tooltip content="No secrets." position="top">
                    <Heart size={32} />
                 </Tooltip>
              </div>
              <h3>Radical Transparency</h3>
              <p style={{ color: 'var(--nexus-text-secondary)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                We default to open. Whether it's our public roadmap, post-mortems, or salary bands, we believe sunlight is the best disinfectant.
              </p>
            </div>
            <div className="card-modern">
              <div className="icon-wrapper bg-teal-light">
                 <Tooltip content="Think big." position="top">
                    <Globe size={32} />
                 </Tooltip>
              </div>
              <h3>Global Impact</h3>
              <p style={{ color: 'var(--nexus-text-secondary)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                We build for the world. Our infrastructure powers critical financial, health, and government systems across 35+ countries.
              </p>
            </div>
            <div className="card-modern">
              <div className="icon-wrapper bg-purple-light">
                  <TrendingUp size={32} />
              </div>
              <h3>Continuous Improvement</h3>
              <p style={{ color: 'var(--nexus-text-secondary)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                We are never done. We iterate rapidly, learning from failures and constantly raising the bar for operational excellence.
              </p>
            </div>
             <div className="card-modern">
              <div className="icon-wrapper bg-orange-light">
                  <Users size={32} />
              </div>
              <h3>Team First</h3>
              <p style={{ color: 'var(--nexus-text-secondary)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                We check our egos at the door. We support each other, celebrate wins together, and treat everyone with respect and kindness.
              </p>
            </div>
             <div className="card-modern">
              <div className="icon-wrapper bg-blue-light">
                  <Award size={32} />
              </div>
              <h3>Ownership</h3>
              <p style={{ color: 'var(--nexus-text-secondary)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                Leaders act like owners. We don't say "that's not my job". We take initiative and deliver results despite setbacks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section style={{ padding: '6rem 0 6rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
             <div>
               <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Meet the Leadership</h2>
               <p style={{ color: 'var(--nexus-text-secondary)' }}>The team guiding the ship.</p>
             </div>
             <button style={{ 
               display: 'flex', alignItems: 'center', gap: '0.5rem', 
               color: 'var(--nexus-primary)', background: 'none', border: '1px solid var(--nexus-border)', 
               padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' 
              }}>
               See All Team <Users size={18} />
             </button>
          </div>
          
          <div className="grid-3-col">
            {[
              { name: 'Sarah Connor', role: 'CEO & Founder', bio: 'Former VP of Engineering at TechCorp. 15+ years in distributed systems.', img: 'https://ui-avatars.com/api/?name=Sarah+Connor&background=4361EE&color=fff' },
              { name: 'John Doe', role: 'CTO', bio: 'Creator of the popular open-source tool "DeployNow". Loves Rust and Kubernetes.', img: 'https://ui-avatars.com/api/?name=John+Doe&background=3A0CA3&color=fff' },
              { name: 'Emily Chen', role: 'VP of Product', bio: 'Product leader focused on developer experience. Previously at DevTools Inc.', img: 'https://ui-avatars.com/api/?name=Emily+Chen&background=7209B7&color=fff' }
            ].map((leader, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--nexus-bg-surface)', borderRadius: '16px', border: '1px solid var(--nexus-border)' }}>
                <div style={{ 
                  width: '120px', height: '120px', margin: '0 auto 1.5rem',
                  borderRadius: '50%', overflow: 'hidden',
                  border: '4px solid var(--nexus-bg-root)',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <img src={leader.img} alt={leader.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{leader.name}</h3>
                <p style={{ color: 'var(--nexus-primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem' }}>{leader.role}</p>
                <p style={{ color: 'var(--nexus-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>{leader.bio}</p>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  <a href="#" style={{ color: 'var(--nexus-text-secondary)', transition: 'color 0.2s' }}><Linkedin size={20} /></a>
                  <a href="#" style={{ color: 'var(--nexus-text-secondary)', transition: 'color 0.2s' }}><Twitter size={20} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
       <section style={{ padding: '4rem 0', background: 'var(--nexus-gradient-bg)', color: 'white', textAlign: 'center' }}>
        <div className="container">
           <h2 style={{ color: 'white', marginBottom: '1rem' }}>Want to help us build the future?</h2>
           <p style={{ opacity: 0.9, marginBottom: '2rem', fontSize: '1.1rem' }}>We are always looking for talented individuals to join our team.</p>
           <button style={{
             padding: '0.75rem 2rem', background: 'white', color: 'var(--nexus-primary)',
             border: 'none', borderRadius: '50px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem'
           }}>
             View Open Positions
           </button>
        </div>
      </section>
    </main>
  );
};

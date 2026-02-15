
import React from 'react';
import { Target, Heart, Globe, Users, Info } from 'lucide-react';
import { Note, Tip } from '../components/Callout';
import { Tooltip } from '../components/Tooltip';

export const About: React.FC = () => {
  return (
    <main className="w-full">
      {/* Hero */}
      <section style={{ 
        background: 'var(--nexus-bg-surface)', 
        padding: '6rem 0', 
        textAlign: 'center' 
      }}>
        <div className="container">
          <span className="pill-tag" style={{ background: 'rgba(67, 97, 238, 0.1)', color: 'var(--nexus-primary)' }}>Our Mission</span>
          <h1 style={{ marginTop: '1rem', marginBottom: '1.5rem', fontSize: '3.5rem', lineHeight: 1.1 }}>
            Empowering the World's <br/> <span style={{ color: 'var(--nexus-primary)' }}>Engineering Teams</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--nexus-text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
            The Technical Governance Framework (EATGF) is building the cloud operating system for the next generation of software. We believe in simplicity, security, and scalability for everyone.
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
             <Note title="Culture Note">
                We are a distributed-first company. We value asynchronous communication and deep work.
             </Note>
          </div>

          <div className="grid-3-col">
            <div className="card-modern">
              <div className="icon-wrapper bg-blue-light">
                <Tooltip content="We put customers first!" position="top">
                  <Target size={32} />
                </Tooltip>
              </div>
              <h3>Customer Obsession</h3>
              <p style={{ color: 'var(--nexus-text-secondary)', marginTop: '0.5rem' }}>
                We start with the customer and work backwards. Every line of code serves a user need.
              </p>
            </div>
            <div className="card-modern">
              <div className="icon-wrapper bg-pink-light">
                 <Tooltip content="Open by default." position="top">
                    <Heart size={32} />
                 </Tooltip>
              </div>
              <h3>Radical Transparency</h3>
              <p style={{ color: 'var(--nexus-text-secondary)', marginTop: '0.5rem' }}>
                We believe in open source, open roadmaps, and honest communication with our community.
              </p>
            </div>
            <div className="card-modern">
              <div className="icon-wrapper bg-teal-light">
                 <Tooltip content="35+ Countries" position="top">
                    <Globe size={32} />
                 </Tooltip>
              </div>
              <h3>Global Impact</h3>
              <p style={{ color: 'var(--nexus-text-secondary)', marginTop: '0.5rem' }}>
                Our infrastructure powers critical systems in over 35 countries around the world.
              </p>
            </div>
          </div>
          
          <div style={{ marginTop: '3rem' }}>
             <Tip title="Join the Movement">
                We are actively hiring for engineering and design roles. Check out our Careers page to apply!
             </Tip>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: '4rem 0 6rem', background: 'var(--nexus-bg-surface)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
             <h2>Meet Leadership</h2>
             <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--nexus-primary)', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
               See All <Users size={18} />
             </button>
          </div>
          
          <div className="grid-3-col">
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '100%', height: '280px', background: 'var(--nexus-bg-root)', 
                  borderRadius: '16px', marginBottom: '1.5rem', overflow: 'hidden',
                  position: 'relative'
                }}>
                  {/* Placeholder for Image */}
                  <div style={{ 
                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', 
                    justifyContent: 'center', opacity: 0.3 
                  }}>
                    <Users size={64} />
                  </div>
                </div>
                <h3 style={{ fontSize: '1.25rem' }}>{['Sarah Connor', 'John Doe', 'Emily Chen'][i-1]}</h3>
                <p style={{ color: 'var(--nexus-primary)', fontWeight: 500 }}>{['CEO & Founder', 'CTO', 'VP of Product'][i-1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

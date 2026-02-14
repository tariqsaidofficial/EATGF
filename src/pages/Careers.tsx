
import React from 'react';
import { Briefcase, Zap, Coffee, Globe, ArrowRight } from 'lucide-react';

export const Careers: React.FC = () => {
  return (
    <main className="w-full">
      {/* Hero */}
      <section style={{ 
        background: 'var(--nexus-gradient-bg)', 
        color: 'white',
        padding: '6rem 0', 
        textAlign: 'center' 
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'white' }}>Build the Future with Us</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2rem' }}>
            We're solving the hardest problems in distributed systems. Join a team of curious, driven, and kind humans.
          </p>
          <button style={{ 
            padding: '1rem 2.5rem', borderRadius: '50px', background: 'white', color: 'var(--nexus-primary)',
            border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            View Open Roles
          </button>
        </div>
      </section>

      {/* Perks */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>Why Join EATGF?</h2>
          </div>
          <div className="grid-3-col">
            <div className="card-modern" style={{ textAlign: 'center', alignItems: 'center' }}>
              <div className="icon-wrapper bg-orange-light"><Zap size={28} /></div>
              <h3>Top Tier Equity</h3>
              <p style={{ color: 'var(--nexus-text-secondary)' }}>We offer competitive salary and early-stage equity packages.</p>
            </div>
            <div className="card-modern" style={{ textAlign: 'center', alignItems: 'center' }}>
              <div className="icon-wrapper bg-blue-light"><Globe size={28} /></div>
              <h3>Remote First</h3>
              <p style={{ color: 'var(--nexus-text-secondary)' }}>Work from anywhere. We have team members in 12 timezones.</p>
            </div>
            <div className="card-modern" style={{ textAlign: 'center', alignItems: 'center' }}>
              <div className="icon-wrapper bg-purple-light"><Coffee size={28} /></div>
              <h3>Unlimited PTO</h3>
              <p style={{ color: 'var(--nexus-text-secondary)' }}>We focus on output, not hours. Rest when you need to.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section style={{ padding: '4rem 0 6rem', background: 'var(--nexus-bg-surface)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2 style={{ marginBottom: '2rem' }}>Open Positions</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { title: 'Senior Frontend Engineer', dept: 'Engineering', loc: 'Remote' },
              { title: 'Principal Backend Engineer', dept: 'Engineering', loc: 'Remote / NYC' },
              { title: 'Product Designer', dept: 'Design', loc: 'Remote' },
              { title: 'Developer Advocate', dept: 'Marketing', loc: 'San Francisco' },
            ].map((job, i) => (
              <div key={i} style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1.5rem', background: 'var(--nexus-bg-root)', borderRadius: '12px',
                border: '1px solid var(--nexus-border)', transition: 'transform 0.2s', cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{job.title}</h4>
                  <div style={{ fontSize: '0.9rem', color: 'var(--nexus-text-secondary)', display: 'flex', gap: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Briefcase size={14}/> {job.dept}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Globe size={14}/> {job.loc}</span>
                  </div>
                </div>
                <ArrowRight size={20} color="var(--nexus-primary)" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

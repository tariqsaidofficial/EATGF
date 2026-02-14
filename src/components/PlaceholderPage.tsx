
import React from 'react';
import { Construction, ArrowLeft, Bell } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  onGoHome: () => void;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description, onGoHome }) => {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      background: 'radial-gradient(circle at center, var(--nexus-bg-surface-hover) 0%, var(--nexus-bg-root) 100%)'
    }}>
      <div className="float-anim" style={{
        marginBottom: '2rem',
        padding: '2rem',
        background: 'var(--nexus-bg-surface)',
        borderRadius: '50%',
        boxShadow: 'var(--shadow-xl)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Construction size={64} color="var(--nexus-primary)" />
      </div>

      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'var(--nexus-gradient-bg)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {title}
      </h1>
      
      <p style={{ fontSize: '1.25rem', color: 'var(--nexus-text-secondary)', maxWidth: '600px', marginBottom: '3rem' }}>
        {description} <br/> Our engineering team is currently building this module.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button 
          onClick={onGoHome}
          style={{
            padding: '1rem 2rem',
            borderRadius: '50px',
            border: '1px solid var(--nexus-border)',
            background: 'var(--nexus-bg-surface)',
            color: 'var(--nexus-text-primary)',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--nexus-bg-surface-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--nexus-bg-surface)'}
        >
          <ArrowLeft size={20} /> Go Back Home
        </button>

        <button style={{
          padding: '1rem 2rem',
          borderRadius: '50px',
          border: 'none',
          background: 'var(--nexus-primary)',
          color: 'white',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <Bell size={20} /> Notify Me When Ready
        </button>
      </div>

      <div style={{ marginTop: '4rem', padding: '1rem', border: '1px dashed var(--nexus-border)', borderRadius: '8px', color: 'var(--nexus-text-secondary)', fontSize: '0.9rem' }}>
        Status: <span style={{ color: 'var(--nexus-warning)', fontWeight: 600 }}>In Development</span> • ETA: Q3 2024
      </div>
    </div>
  );
};

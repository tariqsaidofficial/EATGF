
import React, { useState } from 'react';
import { Shield, FileText } from 'lucide-react';

interface LegalProps {
  defaultTab?: 'privacy' | 'terms';
}

export const Legal: React.FC<LegalProps> = ({ defaultTab = 'terms' }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(defaultTab);

  return (
    <main className="w-full" style={{ background: 'var(--nexus-bg-root)', padding: '4rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Legal Center</h1>
          <p style={{ color: 'var(--nexus-text-secondary)', fontSize: '1.1rem' }}>
            Transparency is key to our relationship with you.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ 
          display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem',
          borderBottom: '1px solid var(--nexus-border)', paddingBottom: '1px'
        }}>
          <button 
            onClick={() => setActiveTab('terms')}
            style={{
              padding: '1rem 2rem', background: 'none', border: 'none',
              borderBottom: activeTab === 'terms' ? '2px solid var(--nexus-primary)' : '2px solid transparent',
              color: activeTab === 'terms' ? 'var(--nexus-primary)' : 'var(--nexus-text-secondary)',
              fontWeight: activeTab === 'terms' ? 700 : 500, cursor: 'pointer', fontSize: '1.1rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}
          >
            <FileText size={18} /> Terms of Service
          </button>
          <button 
            onClick={() => setActiveTab('privacy')}
            style={{
              padding: '1rem 2rem', background: 'none', border: 'none',
              borderBottom: activeTab === 'privacy' ? '2px solid var(--nexus-primary)' : '2px solid transparent',
              color: activeTab === 'privacy' ? 'var(--nexus-primary)' : 'var(--nexus-text-secondary)',
              fontWeight: activeTab === 'privacy' ? 700 : 500, cursor: 'pointer', fontSize: '1.1rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}
          >
            <Shield size={18} /> Privacy Policy
          </button>
        </div>

        {/* Content Box */}
        <div style={{ 
          background: 'var(--nexus-bg-surface)', padding: '3rem', 
          borderRadius: '16px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--nexus-border)' 
        }}>
          {activeTab === 'terms' ? (
            <div style={{ lineHeight: 1.8 }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Terms of Service</h2>
              <p style={{ marginBottom: '1rem', color: 'var(--nexus-text-secondary)' }}>Last updated: October 24, 2024</p>
              
              <h3 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>1. Acceptance of Terms</h3>
              <p style={{ marginBottom: '1rem' }}>By accessing and using the Enterprise AI-Aligned Technical Governance Framework (EATGF) services, you accept and agree to be bound by the terms and provision of this agreement.</p>
              
              <h3 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>2. Enterprise Service Level Agreement</h3>
              <p style={{ marginBottom: '1rem' }}>For Enterprise customers, we guarantee a 99.99% monthly uptime availability. Service credits will be issued for downtime exceeding this threshold as detailed in your specific Order Form.</p>
              
              <h3 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>3. Limitation of Liability</h3>
              <p style={{ marginBottom: '1rem' }}>In no event shall EATGF Inc. be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits.</p>
            </div>
          ) : (
             <div style={{ lineHeight: 1.8 }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Privacy Policy</h2>
              <p style={{ marginBottom: '1rem', color: 'var(--nexus-text-secondary)' }}>Last updated: October 24, 2024</p>
              
              <h3 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>1. Data Collection</h3>
              <p style={{ marginBottom: '1rem' }}>We collect information you provide directly to us, such as when you create an account, update your profile, or request customer support. This typically includes your name, email address, and company information.</p>
              
              <h3 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>2. Data Usage</h3>
              <p style={{ marginBottom: '1rem' }}>We use the information we collect to operate, maintain, and improve our services, including debugging, data analysis, and developing new features.</p>
              
              <h3 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>3. Data Security</h3>
              <p style={{ marginBottom: '1rem' }}>We implement appropriate technical and organizational measures to protect your personal data against unauthorized modification, loss, or disclosure.</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
};

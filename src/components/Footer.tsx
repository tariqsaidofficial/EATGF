
import React from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (page: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <footer style={{
      backgroundColor: '#0F172A', // Always dark
      color: '#CBD5E1',
      padding: '4rem 0 2rem',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'white' }}>
              <div style={{ width: 24, height: 24, background: '#4F46E5', borderRadius: '6px' }}></div>
              <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>EATGF</span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '280px' }}>
              The Enterprise AI-Aligned Technical Governance Framework for modern engineering teams.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Framework</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#" onClick={(e) => handleLinkClick('features', e)} style={{ color: 'inherit' }}>Features</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('integrations', e)} style={{ color: 'inherit' }}>Integrations</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('enterprise', e)} style={{ color: 'inherit' }}>Enterprise</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('security', e)} style={{ color: 'inherit' }}>Security</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Resources</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#" onClick={(e) => handleLinkClick('docs', e)} style={{ color: 'inherit' }}>Documentation</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('api', e)} style={{ color: 'inherit' }}>API Reference</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('community', e)} style={{ color: 'inherit' }}>Community</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('help', e)} style={{ color: 'inherit' }}>Help Center</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Organization</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#" onClick={(e) => handleLinkClick('about', e)} style={{ color: 'inherit' }}>About</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('careers', e)} style={{ color: 'inherit' }}>Careers</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('legal', e)} style={{ color: 'inherit' }}>Legal</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('contact', e)} style={{ color: 'inherit' }}>Contact</a></li>
            </ul>
          </div>

        </div>

        <div style={{ 
          borderTop: '1px solid #334155', 
          paddingTop: '2rem', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.875rem'
        }}>
          <div>© {new Date().getFullYear()} EATGF Inc. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
             <a href="#" onClick={(e) => handleLinkClick('privacy', e)} style={{ color: 'inherit' }}>Privacy Policy</a>
             <a href="#" onClick={(e) => handleLinkClick('terms', e)} style={{ color: 'inherit' }}>Terms of Service</a>
             <a href="#" onClick={(e) => handleLinkClick('privacy', e)} style={{ color: 'inherit' }}>Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

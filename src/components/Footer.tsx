
import React from 'react';
import { useTranslation } from '../i18n/I18nContext';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

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
              {t('footer.description')}
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Framework</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#" onClick={(e) => handleLinkClick('features', e)} style={{ color: 'inherit' }}>{t('nav.features')}</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('integrations', e)} style={{ color: 'inherit' }}>{t('nav.integrations')}</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('enterprise', e)} style={{ color: 'inherit' }}>{t('nav.enterprise')}</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('security', e)} style={{ color: 'inherit' }}>{t('nav.security')}</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Resources</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#" onClick={(e) => handleLinkClick('docs', e)} style={{ color: 'inherit' }}>{t('nav.docs')}</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('api', e)} style={{ color: 'inherit' }}>{t('nav.api')}</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('community', e)} style={{ color: 'inherit' }}>{t('nav.community')}</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('help', e)} style={{ color: 'inherit' }}>{t('nav.help')}</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Organization</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#" onClick={(e) => handleLinkClick('about', e)} style={{ color: 'inherit' }}>{t('nav.about')}</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('careers', e)} style={{ color: 'inherit' }}>{t('nav.careers')}</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('legal', e)} style={{ color: 'inherit' }}>{t('nav.legal')}</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('contact', e)} style={{ color: 'inherit' }}>{t('nav.contact')}</a></li>
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
             <a href="#" onClick={(e) => handleLinkClick('privacy', e)} style={{ color: 'inherit' }}>{t('nav.privacy')}</a>
             <a href="#" onClick={(e) => handleLinkClick('terms', e)} style={{ color: 'inherit' }}>{t('nav.terms')}</a>
             <a href="#" onClick={(e) => handleLinkClick('privacy', e)} style={{ color: 'inherit' }}>{t('nav.cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

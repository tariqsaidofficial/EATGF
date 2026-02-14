
import React, { useState, useEffect, Suspense, lazy } from 'react';
import './css/custom.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PlaceholderPage } from './components/PlaceholderPage';
import { MobileMenu } from './components/MobileMenu';
import { SearchModal } from './components/SearchModal';
import { FeedbackModal } from './components/FeedbackModal';
import { ChatWidget } from './components/ChatWidget';
import { AuthModals, UserProfile } from './components/AuthModals';
import { I18nProvider } from './i18n/I18nContext';
import { SEO } from './components/SEO';
import { Loader2 } from 'lucide-react';

// Types
import type { FavoriteItem } from './pages/Profile';

// Lazy Load Pages for Performance
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Documentation = lazy(() => import('./pages/Documentation').then(module => ({ default: module.Documentation })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Careers = lazy(() => import('./pages/Careers').then(module => ({ default: module.Careers })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Legal = lazy(() => import('./pages/Legal').then(module => ({ default: module.Legal })));
const Profile = lazy(() => import('./pages/Profile').then(module => ({ default: module.Profile })));

type PageRoute = 
  | 'home' | 'docs' | 'api' | 'changelog' | 'community' 
  | 'security' | 'architecture' | 'datamodel' | 'integrations' | 'billing'
  | 'features' | 'enterprise' | 'help' | 'about' | 'careers' | 'legal' | 'contact' | 'privacy' | 'terms'
  | 'profile';

// Page Loader Component
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', width: '100%' }}>
    <Loader2 size={40} className="spin" color="var(--nexus-primary)" />
  </div>
);

function AppContent() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [currentVersion, setCurrentVersion] = useState('v2.4');
  
  // Doc State
  const [activeDoc, setActiveDoc] = useState('intro');

  // Modal States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Lifted search state
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  
  // Auth State
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Favorites State
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    { id: 'install', title: 'Installation', path: 'docs', description: 'Getting Started > Installation' }
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  // Check for persisted user session
  useEffect(() => {
    const savedUser = localStorage.getItem('nexus_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user session");
      }
    }
  }, []);

  // Handle Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleNavigate = (page: string, params?: any) => {
    setCurrentPage(page as PageRoute);
    
    // Handle deep link to specific doc
    if (page === 'docs' && params) {
        setActiveDoc(params);
    }
    
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Unified Search Handler
  const handleSearch = (query: string = '') => {
    setSearchQuery(query);
    setIsSearchOpen(true);
  };

  const handleToggleFavorite = (item: FavoriteItem) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === item.id);
      if (exists) {
        return prev.filter(f => f.id !== item.id);
      }
      return [...prev, item];
    });
  };

  // Auth Handlers
  const handleLoginClick = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleSignupClick = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem('nexus_user', JSON.stringify(userData));
    // Redirect to profile page after signup/login
    handleNavigate('profile');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('nexus_user');
    handleNavigate('home');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <SEO title="Home" description="The unified governance platform for modern engineering teams." />
            <Home onNavigate={handleNavigate} onSearch={handleSearch} />
          </>
        );
      case 'docs':
        return (
          <>
            <SEO title="Documentation" description="Comprehensive guides and references for EATGF." />
            <Documentation 
              activeDoc={activeDoc} 
              onDocChange={setActiveDoc} 
              favorites={favorites} 
              onToggleFavorite={handleToggleFavorite}
              onSearch={handleSearch}
            />
          </>
        );
      
      // Explore Our Topics & Main Nav Placeholders
      case 'api':
        return <PlaceholderPage title="API Reference" description="We are currently compiling the comprehensive REST and GraphQL API documentation." onGoHome={() => handleNavigate('home')} />;
      case 'changelog':
        return <PlaceholderPage title="Product Changelog" description="The timeline of our latest features and security patches is being updated." onGoHome={() => handleNavigate('home')} />;
      case 'community':
        return <PlaceholderPage title="Community Forum" description="The developer hub for discussions and support is launching soon." onGoHome={() => handleNavigate('home')} />;
      case 'security':
        return <PlaceholderPage title="Security & Compliance" description="Detailed SOC2, HIPAA, and GDPR compliance reports are being prepared." onGoHome={() => handleNavigate('home')} />;
      case 'architecture':
        return <PlaceholderPage title="System Architecture" description="Deep dive technical diagrams and whitepapers are coming soon." onGoHome={() => handleNavigate('home')} />;
      case 'datamodel':
        return <PlaceholderPage title="Data Models" description="Schema definitions and ERD diagrams for the core platform." onGoHome={() => handleNavigate('home')} />;
      case 'integrations':
        return <PlaceholderPage title="Integrations" description="Documentation for connecting Slack, Jira, and GitHub is in progress." onGoHome={() => handleNavigate('home')} />;
      case 'billing':
        return <PlaceholderPage title="Billing & Plans" description="Manage your enterprise subscription and usage quotas." onGoHome={() => handleNavigate('home')} />;
      
      // Footer Link Placeholders -> Now Activated
      case 'features':
        return <PlaceholderPage title="Platform Features" description="A complete breakdown of our enterprise capabilities is on the way." onGoHome={() => handleNavigate('home')} />;
      case 'enterprise':
        return <PlaceholderPage title="Enterprise Solutions" description="Learn about our dedicated support, SLA, and private cloud options." onGoHome={() => handleNavigate('home')} />;
      case 'help':
        return <PlaceholderPage title="Help Center" description="Browse tutorials, FAQs, and troubleshooting guides." onGoHome={() => handleNavigate('home')} />;
      
      // Activated Pages
      case 'about':
        return (
          <>
            <SEO title="About Us" description="Our mission to empower engineering teams worldwide." />
            <About />
          </>
        );
      case 'careers':
        return (
          <>
            <SEO title="Careers" description="Join our team and build the future of governance." />
            <Careers />
          </>
        );
      case 'contact':
        return (
          <>
            <SEO title="Contact" description="Get in touch with our support and sales teams." />
            <Contact />
          </>
        );
      case 'legal':
        return (
          <>
             <SEO title="Legal" description="Terms of Service and Privacy Policy." />
             <Legal defaultTab="terms" />
          </>
        );
      case 'privacy':
        return (
          <>
             <SEO title="Privacy Policy" description="How we handle your data." />
             <Legal defaultTab="privacy" />
          </>
        );
      case 'terms':
        return (
          <>
             <SEO title="Terms of Service" description="The fine print." />
             <Legal defaultTab="terms" />
          </>
        );
      
      // User Pages
      case 'profile':
        return (
          <>
            <SEO title="Profile" description="Manage your account settings." />
            <Profile 
                user={user} 
                onLogout={handleLogout} 
                onNavigate={handleNavigate} 
                favorites={favorites} 
                onToggleFavorite={handleToggleFavorite}
            />
          </>
        );
        
      default:
        return (
          <>
             <SEO title="Home" />
             <Home onNavigate={handleNavigate} onSearch={handleSearch} />
          </>
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Navbar 
        isDark={theme === 'dark'} 
        toggleTheme={toggleTheme} 
        onMenuClick={() => setIsMobileMenuOpen(true)}
        onSearchClick={() => handleSearch('')}
        onFeedbackClick={() => setIsFeedbackOpen(true)}
        onNavigate={handleNavigate}
        currentVersion={currentVersion}
        onVersionChange={setCurrentVersion}
        user={user}
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
        onLogoutClick={handleLogout}
      />
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={handleNavigate}
      />
      
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => { setIsSearchOpen(false); setSearchQuery(''); }}
        onNavigate={handleNavigate}
        initialQuery={searchQuery}
      />

      <FeedbackModal 
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />

      <AuthModals 
        isOpen={isAuthModalOpen}
        mode={authMode}
        onClose={() => setIsAuthModalOpen(false)}
        onSwitchMode={setAuthMode}
        onAuthSuccess={handleAuthSuccess}
      />

      <ChatWidget />
      
      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Suspense fallback={<PageLoader />}>
          {renderContent()}
        </Suspense>
      </div>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}


import React, { useState, useEffect } from 'react';
import './css/custom.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Documentation } from './pages/Documentation';
import { PlaceholderPage } from './components/PlaceholderPage';
import { MobileMenu } from './components/MobileMenu';
import { SearchModal } from './components/SearchModal';
import { FeedbackModal } from './components/FeedbackModal';
import { ChatWidget } from './components/ChatWidget';
import { AuthModals, UserProfile } from './components/AuthModals';

// Import New Pages
import { About } from './pages/About';
import { Careers } from './pages/Careers';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';
import { Profile, FavoriteItem } from './pages/Profile';

type PageRoute = 
  | 'home' | 'docs' | 'api' | 'changelog' | 'community' 
  | 'security' | 'architecture' | 'datamodel' | 'integrations' | 'billing'
  | 'features' | 'enterprise' | 'help' | 'about' | 'careers' | 'legal' | 'contact' | 'privacy' | 'terms'
  | 'profile';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [currentVersion, setCurrentVersion] = useState('v2.4');
  
  // Doc State
  const [activeDoc, setActiveDoc] = useState('intro');

  // Modal States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
        return <Home onNavigate={handleNavigate} />;
      case 'docs':
        return <Documentation activeDoc={activeDoc} onDocChange={setActiveDoc} favorites={favorites} onToggleFavorite={handleToggleFavorite} />;
      
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
        return <About />;
      case 'careers':
        return <Careers />;
      case 'contact':
        return <Contact />;
      case 'legal':
        return <Legal defaultTab="terms" />;
      case 'privacy':
        return <Legal defaultTab="privacy" />;
      case 'terms':
        return <Legal defaultTab="terms" />;
      
      // User Pages
      case 'profile':
        return (
            <Profile 
                user={user} 
                onLogout={handleLogout} 
                onNavigate={handleNavigate} 
                favorites={favorites} 
                onToggleFavorite={handleToggleFavorite}
            />
        );
        
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Navbar 
        isDark={theme === 'dark'} 
        toggleTheme={toggleTheme} 
        onMenuClick={() => setIsMobileMenuOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
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
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
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
        {renderContent()}
      </div>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

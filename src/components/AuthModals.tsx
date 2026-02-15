
import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, ArrowRight, Loader2, Github, ArrowLeft, CheckCircle } from 'lucide-react';
import { authService, UserProfile } from '../services/AuthService';

// Re-export UserProfile for backward compatibility with other components if needed, 
// though best practice is to import from service.
export type { UserProfile };

interface AuthModalsProps {
  isOpen: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'signup') => void;
  onAuthSuccess: (user: UserProfile) => void;
}

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export const AuthModals: React.FC<AuthModalsProps> = ({ 
  isOpen, 
  mode, 
  onClose, 
  onSwitchMode,
  onAuthSuccess 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Forgot Password Flow
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setError('');
      // Keep previous inputs if switching modes, but clear sensitive ones if needed.
      // Resetting flow states
      setIsForgotPassword(false);
      setResetSent(false);
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    setIsLoading(true);
    try {
      const user = await authService.loginWithSocial(provider);
      onAuthSuccess(user);
      onClose();
    } catch (err) {
      setError('Social login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setIsLoading(true);
    setError('');
    // Simulate API (Keep this mock in UI for now as it doesn't usually return a session)
    setTimeout(() => {
      setIsLoading(false);
      setResetSent(true);
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let user: UserProfile;
      if (mode === 'login') {
        user = await authService.login(email, password);
      } else {
        user = await authService.signup(name, email, password);
      }
      onAuthSuccess(user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 150, 
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem'
    }} onClick={onClose}>
      <div style={{
        width: '100%', maxWidth: '420px', 
        background: 'var(--nexus-bg-surface)',
        borderRadius: '16px', 
        boxShadow: 'var(--shadow-2xl)', 
        border: '1px solid var(--nexus-border)',
        overflow: 'hidden', 
        animation: 'float 0.4s ease-out'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ 
          padding: '1.5rem', 
          borderBottom: '1px solid var(--nexus-border)', 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'var(--nexus-bg-root)'
        }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isForgotPassword ? (
              <>
                 <button 
                   onClick={() => setIsForgotPassword(false)}
                   style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: 'var(--nexus-text-primary)' }}
                 >
                   <ArrowLeft size={20} />
                 </button>
                 Reset Password
              </>
            ) : (
              mode === 'login' ? 'Welcome Back' : 'Create Account'
            )}
          </h2>
          <button onClick={onClose} style={{ 
            background: 'none', border: 'none', cursor: 'pointer', 
            color: 'var(--nexus-text-secondary)' 
          }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '2rem 1.5rem' }}>
          
          {isForgotPassword ? (
            // Forgot Password Flow
            resetSent ? (
               <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                 <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                   <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', color: 'var(--nexus-success)' }}>
                     <CheckCircle size={32} />
                   </div>
                 </div>
                 <h3 style={{ marginBottom: '0.5rem' }}>Check your email</h3>
                 <p style={{ color: 'var(--nexus-text-secondary)', marginBottom: '2rem' }}>
                   We've sent password reset instructions to <strong>{email}</strong>
                 </p>
                 <button 
                   onClick={() => { setIsForgotPassword(false); setResetSent(false); }}
                   style={{
                     width: '100%', padding: '0.875rem', borderRadius: '8px', border: 'none',
                     background: 'var(--nexus-primary)', color: 'white', fontWeight: 600, cursor: 'pointer'
                   }}
                 >
                   Back to Login
                 </button>
               </div>
            ) : (
               <form onSubmit={handleForgotPasswordSubmit}>
                 <p style={{ color: 'var(--nexus-text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                   Enter your email address and we'll send you a link to reset your password.
                 </p>
                 
                 {error && (
                    <div style={{ 
                      padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem',
                      background: 'rgba(239, 68, 68, 0.1)', color: 'var(--nexus-danger)',
                      fontSize: '0.9rem', textAlign: 'center'
                    }}>
                      {error}
                    </div>
                  )}

                 <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--nexus-text-secondary)' }} />
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{
                        width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem',
                        borderRadius: '8px', border: '1px solid var(--nexus-border)',
                        background: 'var(--nexus-bg-root)', color: 'var(--nexus-text-primary)',
                        outline: 'none'
                      }}
                      required
                    />
                 </div>

                 <button 
                    type="submit" 
                    disabled={isLoading}
                    style={{
                      width: '100%', padding: '0.875rem',
                      borderRadius: '8px', border: 'none',
                      background: 'var(--nexus-primary)', color: 'white',
                      fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      opacity: isLoading ? 0.7 : 1
                    }}
                  >
                    {isLoading ? <Loader2 size={20} className="spin" /> : 'Send Reset Link'}
                  </button>
               </form>
            )
          ) : (
            // Standard Auth Flow
            <>
              {/* Social Auth */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <button 
                  onClick={() => handleSocialLogin('github')}
                  style={{
                    width: '100%', padding: '0.75rem',
                    background: 'var(--nexus-bg-surface)', border: '1px solid var(--nexus-border)',
                    borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '0.75rem', cursor: 'pointer', color: 'var(--nexus-text-primary)', fontWeight: 500,
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--nexus-bg-surface-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--nexus-bg-surface)'}
                >
                  <Github size={20} />
                  Continue with GitHub
                </button>
                <button 
                  onClick={() => handleSocialLogin('google')}
                  style={{
                    width: '100%', padding: '0.75rem',
                    background: 'var(--nexus-bg-surface)', border: '1px solid var(--nexus-border)',
                    borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '0.75rem', cursor: 'pointer', color: 'var(--nexus-text-primary)', fontWeight: 500,
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--nexus-bg-surface-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--nexus-bg-surface)'}
                >
                  <GoogleIcon />
                  Continue with Google
                </button>
              </div>

              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem',
                color: 'var(--nexus-text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase'
              }}>
                <div style={{ flex: 1, height: 1, background: 'var(--nexus-border)' }}></div>
                OR
                <div style={{ flex: 1, height: 1, background: 'var(--nexus-border)' }}></div>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {error && (
                  <div style={{ 
                    padding: '0.75rem', borderRadius: '8px', 
                    background: 'rgba(239, 68, 68, 0.1)', color: 'var(--nexus-danger)',
                    fontSize: '0.9rem', textAlign: 'center'
                  }}>
                    {error}
                  </div>
                )}

                {mode === 'signup' && (
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--nexus-text-secondary)' }} />
                    <input 
                      type="text" 
                      placeholder="Full Name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      style={{
                        width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem',
                        borderRadius: '8px', border: '1px solid var(--nexus-border)',
                        background: 'var(--nexus-bg-root)', color: 'var(--nexus-text-primary)',
                        outline: 'none'
                      }}
                      required
                    />
                  </div>
                )}

                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--nexus-text-secondary)' }} />
                  <input 
                    type="email" 
                    placeholder="work@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                      width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem',
                      borderRadius: '8px', border: '1px solid var(--nexus-border)',
                      background: 'var(--nexus-bg-root)', color: 'var(--nexus-text-primary)',
                      outline: 'none'
                    }}
                    required
                  />
                </div>

                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--nexus-text-secondary)' }} />
                  <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{
                      width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem',
                      borderRadius: '8px', border: '1px solid var(--nexus-border)',
                      background: 'var(--nexus-bg-root)', color: 'var(--nexus-text-primary)',
                      outline: 'none'
                    }}
                    required
                  />
                </div>

                {mode === 'login' && (
                   <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                     <button
                       type="button"
                       onClick={() => setIsForgotPassword(true)}
                       style={{
                         background: 'none', border: 'none', padding: 0,
                         color: 'var(--nexus-primary)', fontSize: '0.85rem', fontWeight: 500,
                         cursor: 'pointer'
                       }}
                     >
                       Forgot Password?
                     </button>
                   </div>
                )}

                <button 
                  type="submit" 
                  disabled={isLoading}
                  style={{
                    marginTop: '0.5rem', padding: '0.875rem',
                    borderRadius: '8px', border: 'none',
                    background: 'var(--nexus-primary)', color: 'white',
                    fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    opacity: isLoading ? 0.7 : 1
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="spin" />
                      {mode === 'login' ? 'Logging in...' : 'Creating account...'}
                    </>
                  ) : (
                    <>
                      {mode === 'login' ? 'Log In' : 'Create Account'} <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

        </div>

        {/* Footer */}
        {!isForgotPassword && (
          <div style={{ 
            padding: '1.25rem', background: 'var(--nexus-bg-root)', 
            borderTop: '1px solid var(--nexus-border)', textAlign: 'center',
            fontSize: '0.9rem', color: 'var(--nexus-text-secondary)'
          }}>
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
              style={{ 
                background: 'none', border: 'none', padding: 0, 
                color: 'var(--nexus-primary)', fontWeight: 600, cursor: 'pointer' 
              }}
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </div>
        )}

      </div>
      <style>{`
        @keyframes float {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};


import React, { useState } from 'react';
import { User, Mail, Shield, Lock, LogOut, Save, Star, Trash2, FileText, ArrowRight } from 'lucide-react';
import { UserProfile, authService } from '../services/AuthService';

export interface FavoriteItem {
  id: string; // The doc ID (e.g., 'intro', 'install')
  title: string;
  path: string; // The route (e.g., 'docs')
  description?: string;
}

interface ProfileProps {
  user: UserProfile | null;
  onLogout: () => void;
  onNavigate: (page: string, params?: any) => void;
  favorites: FavoriteItem[];
  onToggleFavorite: (item: FavoriteItem) => void;
}

export const Profile: React.FC<ProfileProps> = ({ 
  user, 
  onLogout, 
  onNavigate, 
  favorites, 
  onToggleFavorite 
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'favorites'>('general');
  
  // Form States
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  
  // Password States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ marginBottom: '1rem' }}>Please log in to view your profile.</h2>
        <p style={{ color: 'var(--nexus-text-secondary)' }}>Your session may have expired.</p>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
        await authService.updateProfile({ name, email });
        // In a real app, you might trigger a global user refresh here
        setIsLoading(false);
        // alert("Profile updated"); 
    } catch (e) {
        console.error("Failed to update profile", e);
        setIsLoading(false);
    }
  };

  return (
    <main className="w-full" style={{ padding: '4rem 0', background: 'var(--nexus-bg-root)', minHeight: '90vh' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Account Settings</h1>

        <div className="profile-grid" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem' }}>
          
          {/* Sidebar */}
          <aside>
            <div style={{ background: 'var(--nexus-bg-surface)', borderRadius: '12px', padding: '1rem', border: '1px solid var(--nexus-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem 0', borderBottom: '1px solid var(--nexus-border)', marginBottom: '1rem' }}>
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: '1rem', border: '2px solid var(--nexus-primary)' }} 
                />
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', textAlign: 'center' }}>{user.name}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--nexus-text-secondary)' }}>Developer</p>
                <span style={{ fontSize: '0.7rem', color: 'var(--nexus-text-secondary)', marginTop: '0.25rem' }}>ID: {user.id}</span>
              </div>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button 
                  onClick={() => setActiveTab('general')}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', 
                    borderRadius: '8px', border: 'none', background: activeTab === 'general' ? 'var(--nexus-bg-root)' : 'transparent',
                    color: activeTab === 'general' ? 'var(--nexus-primary)' : 'var(--nexus-text-secondary)', fontWeight: 500, cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  <User size={18} /> General
                </button>
                <button 
                  onClick={() => setActiveTab('favorites')}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', 
                    borderRadius: '8px', border: 'none', background: activeTab === 'favorites' ? 'var(--nexus-bg-root)' : 'transparent',
                    color: activeTab === 'favorites' ? 'var(--nexus-primary)' : 'var(--nexus-text-secondary)', fontWeight: 500, cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  <Star size={18} /> Favorites
                </button>
                <button 
                  onClick={() => setActiveTab('security')}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', 
                    borderRadius: '8px', border: 'none', background: activeTab === 'security' ? 'var(--nexus-bg-root)' : 'transparent',
                    color: activeTab === 'security' ? 'var(--nexus-primary)' : 'var(--nexus-text-secondary)', fontWeight: 500, cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  <Lock size={18} /> Security
                </button>
                
                <div style={{ height: 1, background: 'var(--nexus-border)', margin: '0.5rem 0' }}></div>
                
                <button 
                  onClick={onLogout}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', 
                    borderRadius: '8px', border: 'none', background: 'transparent',
                    color: 'var(--nexus-danger)', fontWeight: 500, cursor: 'pointer', textAlign: 'left',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <LogOut size={18} /> Log Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div style={{ background: 'var(--nexus-bg-surface)', borderRadius: '16px', border: '1px solid var(--nexus-border)', padding: '2.5rem', minHeight: '500px', boxShadow: 'var(--shadow-sm)' }}>
            
            {activeTab === 'general' && (
              <form onSubmit={handleSave}>
                <h2 style={{ marginBottom: '0.5rem' }}>General Information</h2>
                <p style={{ color: 'var(--nexus-text-secondary)', marginBottom: '2rem' }}>Update your profile details and public info.</p>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                    <div style={{ position: 'relative' }}>
                      <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--nexus-text-secondary)' }} />
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="contact-form-input" 
                        style={{ paddingLeft: '2.75rem' }} 
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--nexus-text-secondary)' }} />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="contact-form-input" 
                        style={{ paddingLeft: '2.75rem' }} 
                      />
                    </div>
                  </div>

                  <div style={{ paddingTop: '1rem' }}>
                    <button 
                      type="submit"
                      disabled={isLoading}
                      style={{ 
                        padding: '0.75rem 1.5rem', background: 'var(--nexus-primary)', color: 'white',
                        border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: isLoading ? 0.7 : 1
                      }}
                    >
                      <Save size={18} /> {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {activeTab === 'favorites' && (
              <div>
                <h2 style={{ marginBottom: '0.5rem' }}>Favorites</h2>
                <p style={{ color: 'var(--nexus-text-secondary)', marginBottom: '2rem' }}>Quick access to your saved documentation and guides.</p>

                {favorites.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--nexus-border)', borderRadius: '12px' }}>
                    <Star size={48} color="var(--nexus-border)" style={{ marginBottom: '1rem' }} />
                    <p style={{ color: 'var(--nexus-text-secondary)' }}>You haven't bookmarked any pages yet.</p>
                    <button onClick={() => onNavigate('docs')} style={{ marginTop: '1rem', color: 'var(--nexus-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Browse Documentation</button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {favorites.map(fav => (
                      <div key={fav.id} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '1.25rem', background: 'var(--nexus-bg-root)',
                        borderRadius: '12px', border: '1px solid var(--nexus-border)',
                        transition: 'all 0.2s'
                      }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                          <div style={{ 
                            padding: '0.75rem', background: 'var(--nexus-bg-surface)', 
                            borderRadius: '8px', color: 'var(--nexus-primary)', border: '1px solid var(--nexus-border)'
                          }}>
                            <FileText size={20} />
                          </div>
                          <div>
                            <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{fav.title}</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--nexus-text-secondary)' }}>
                               {fav.description || 'Nexus Documentation'}
                            </p>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <button 
                            onClick={() => onNavigate(fav.path, fav.id)}
                            style={{ 
                              padding: '0.5rem 1rem', background: 'var(--nexus-primary)', color: 'white',
                              border: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 500,
                              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem'
                            }}
                          >
                            Read <ArrowRight size={14} />
                          </button>
                          <button 
                            onClick={() => onToggleFavorite(fav)}
                            style={{ 
                              padding: '0.5rem', background: 'transparent', color: 'var(--nexus-danger)',
                              border: '1px solid var(--nexus-border)', borderRadius: '6px', cursor: 'pointer'
                            }}
                            title="Remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'security' && (
              <form onSubmit={handleSave}>
                <h2 style={{ marginBottom: '0.5rem' }}>Change Password</h2>
                <p style={{ color: 'var(--nexus-text-secondary)', marginBottom: '2rem' }}>Ensure your account stays secure by updating your password periodically.</p>

                <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '600px' }}>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Current Password</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--nexus-text-secondary)' }} />
                      <input 
                        type="password" 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="contact-form-input" 
                        style={{ paddingLeft: '2.75rem' }} 
                      />
                    </div>
                  </div>

                  <div style={{ height: '1px', background: 'var(--nexus-border)', margin: '0.5rem 0' }}></div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>New Password</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--nexus-text-secondary)' }} />
                      <input 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="contact-form-input" 
                        style={{ paddingLeft: '2.75rem' }} 
                      />
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--nexus-text-secondary)', marginTop: '0.5rem' }}>
                      Minimum 8 characters, at least one uppercase letter and one symbol.
                    </p>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Confirm New Password</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--nexus-text-secondary)' }} />
                      <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="contact-form-input" 
                        style={{ paddingLeft: '2.75rem' }} 
                      />
                    </div>
                  </div>

                  <div style={{ paddingTop: '1rem' }}>
                    <button 
                      type="submit"
                      disabled={isLoading}
                      style={{ 
                        padding: '0.75rem 1.5rem', background: 'var(--nexus-primary)', color: 'white',
                        border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: isLoading ? 0.7 : 1
                      }}
                    >
                      <Save size={18} /> {isLoading ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .profile-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
};

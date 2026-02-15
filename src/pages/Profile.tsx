
import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Lock, LogOut, Save, Star, Trash2, FileText, ArrowRight, Key, Plus, Copy, Check, AlertTriangle } from 'lucide-react';
import { UserProfile, authService, ApiKey } from '../services/AuthService';

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
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'favorites' | 'api-keys'>('general');
  
  // General Form States
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  
  // Password States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // API Key States
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isKeysLoading, setIsKeysLoading] = useState(false);
  const [showCreateKey, setShowCreateKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'api-keys') {
      loadApiKeys();
    }
  }, [activeTab]);

  const loadApiKeys = async () => {
    setIsKeysLoading(true);
    try {
      const keys = await authService.getApiKeys();
      setApiKeys(keys);
    } catch (e) {
      console.error(e);
    } finally {
      setIsKeysLoading(false);
    }
  };

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

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;
    setIsLoading(true);
    try {
      const key = await authService.createApiKey(newKeyName);
      setNewlyCreatedKey(key.key || null);
      setNewKeyName('');
      setShowCreateKey(false);
      loadApiKeys();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevokeKey = async (id: string) => {
    if (confirm("Are you sure you want to revoke this API key? This action cannot be undone and may break applications using this key.")) {
      try {
        await authService.revokeApiKey(id);
        loadApiKeys();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ marginBottom: '1rem' }}>Please log in to view your profile.</h2>
        <p style={{ color: 'var(--nexus-text-secondary)' }}>Your session may have expired.</p>
      </div>
    );
  }

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
                <button 
                  onClick={() => setActiveTab('api-keys')}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', 
                    borderRadius: '8px', border: 'none', background: activeTab === 'api-keys' ? 'var(--nexus-bg-root)' : 'transparent',
                    color: activeTab === 'api-keys' ? 'var(--nexus-primary)' : 'var(--nexus-text-secondary)', fontWeight: 500, cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  <Key size={18} /> API Keys
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

            {activeTab === 'api-keys' && (
              <div>
                <h2 style={{ marginBottom: '0.5rem' }}>API Keys</h2>
                <p style={{ color: 'var(--nexus-text-secondary)', marginBottom: '2rem' }}>
                  Manage access tokens for your applications. Treat these like passwords.
                </p>

                {newlyCreatedKey && (
                  <div style={{ 
                    marginBottom: '2rem', padding: '1.5rem', 
                    background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', 
                    borderRadius: '12px'
                  }}>
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                      <div style={{ 
                        padding: '0.5rem', borderRadius: '50%', background: 'var(--nexus-success)', 
                        color: 'white', height: 'fit-content' 
                      }}>
                        <Check size={20} />
                      </div>
                      <div>
                        <h4 style={{ color: 'var(--nexus-success)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>API Key Generated</h4>
                        <p style={{ color: 'var(--nexus-text-secondary)', fontSize: '0.9rem' }}>
                          Copy this key now. You won't be able to see it again!
                        </p>
                      </div>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', gap: '0.5rem', background: 'var(--nexus-bg-surface)', 
                      padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--nexus-border)',
                      marginBottom: '1rem'
                    }}>
                      <code style={{ 
                        flex: 1, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', 
                        overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--nexus-text-primary)'
                      }}>
                        {newlyCreatedKey}
                      </code>
                      <button 
                        onClick={() => copyToClipboard(newlyCreatedKey)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied ? 'var(--nexus-success)' : 'var(--nexus-text-secondary)' }}
                        title="Copy to clipboard"
                      >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                    </div>

                    <button 
                      onClick={() => setNewlyCreatedKey(null)}
                      style={{ 
                        padding: '0.5rem 1rem', background: 'var(--nexus-success)', color: 'white',
                        border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer'
                      }}
                    >
                      I have saved it
                    </button>
                  </div>
                )}

                {/* Create Key Button / Form */}
                {!showCreateKey ? (
                  <button 
                    onClick={() => setShowCreateKey(true)}
                    disabled={!!newlyCreatedKey}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.75rem 1.25rem', background: 'var(--nexus-primary)', color: 'white',
                      border: 'none', borderRadius: '8px', fontWeight: 600, cursor: !!newlyCreatedKey ? 'not-allowed' : 'pointer',
                      marginBottom: '2rem', opacity: !!newlyCreatedKey ? 0.5 : 1
                    }}
                  >
                    <Plus size={18} /> Generate New Key
                  </button>
                ) : (
                  <form onSubmit={handleCreateKey} style={{ 
                    marginBottom: '2rem', padding: '1.5rem', background: 'var(--nexus-bg-root)',
                    borderRadius: '12px', border: '1px solid var(--nexus-border)'
                  }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Key Name</label>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <input 
                        type="text" 
                        value={newKeyName}
                        onChange={e => setNewKeyName(e.target.value)}
                        placeholder="e.g. Production Server, CI/CD Pipeline"
                        style={{ 
                          flex: 1, padding: '0.75rem', borderRadius: '8px', 
                          border: '1px solid var(--nexus-border)', outline: 'none',
                          minWidth: '250px'
                        }}
                        autoFocus
                      />
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          type="button"
                          onClick={() => { setShowCreateKey(false); setNewKeyName(''); }}
                          style={{ 
                            padding: '0.75rem 1rem', background: 'transparent', color: 'var(--nexus-text-primary)',
                            border: '1px solid var(--nexus-border)', borderRadius: '8px', fontWeight: 600, cursor: 'pointer'
                          }}
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          disabled={!newKeyName || isLoading}
                          style={{ 
                            padding: '0.75rem 1rem', background: 'var(--nexus-primary)', color: 'white',
                            border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: !newKeyName ? 0.7 : 1
                          }}
                        >
                          {isLoading ? 'Creating...' : 'Create Key'}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Keys List */}
                <div style={{ 
                  border: '1px solid var(--nexus-border)', borderRadius: '12px', 
                  overflow: 'hidden', background: 'var(--nexus-bg-surface)' 
                }}>
                  <div style={{ 
                    display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 0.5fr', 
                    padding: '1rem', background: 'var(--nexus-bg-root)', 
                    borderBottom: '1px solid var(--nexus-border)',
                    fontSize: '0.85rem', fontWeight: 600, color: 'var(--nexus-text-secondary)', textTransform: 'uppercase'
                  }}>
                    <div>Name</div>
                    <div>Key Prefix</div>
                    <div>Created</div>
                    <div style={{ textAlign: 'right' }}>Action</div>
                  </div>

                  {isKeysLoading ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--nexus-text-secondary)' }}>Loading keys...</div>
                  ) : apiKeys.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>
                      <Key size={32} style={{ color: 'var(--nexus-border)', marginBottom: '0.5rem' }} />
                      <p style={{ color: 'var(--nexus-text-secondary)' }}>You don't have any API keys yet.</p>
                    </div>
                  ) : (
                    apiKeys.map(key => (
                      <div key={key.id} style={{ 
                        display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 0.5fr', 
                        padding: '1rem', borderBottom: '1px solid var(--nexus-border)',
                        alignItems: 'center', fontSize: '0.95rem'
                      }}>
                        <div style={{ fontWeight: 500 }}>{key.name}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--nexus-text-secondary)' }}>{key.prefix}</div>
                        <div style={{ color: 'var(--nexus-text-secondary)', fontSize: '0.9rem' }}>
                          {new Date(key.createdAt).toLocaleDateString()}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <button 
                            onClick={() => handleRevokeKey(key.id)}
                            style={{ 
                              background: 'none', border: 'none', cursor: 'pointer', 
                              color: 'var(--nexus-text-secondary)', padding: '0.5rem'
                            }}
                            title="Revoke Key"
                          >
                            <Trash2 size={16} className="hover-danger" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <style>{`
                  .hover-danger:hover { color: var(--nexus-danger) !important; }
                `}</style>
              </div>
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

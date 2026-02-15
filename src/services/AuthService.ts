
// This service abstracts the data source.
// Currently: Uses localStorage (Mock).
// Future: Replace implementation inside these functions with Supabase/PostgreSQL calls.

export interface UserProfile {
  id: string; // Added ID to simulate Database Primary Key
  name: string;
  email: string;
  avatar?: string;
  role?: 'user' | 'admin';
  createdAt?: string;
}

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  key?: string; // Only returned once upon creation
  createdAt: string;
  lastUsed: string;
}

const STORAGE_KEY = 'nexus_user';
const API_KEYS_STORAGE_KEY = 'nexus_api_keys';

export const authService = {
  /**
   * Check if a user is currently logged in (Session check)
   */
  getCurrentUser: async (): Promise<UserProfile | null> => {
    // FUTURE: await supabase.auth.getUser()
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  /**
   * Login Logic
   */
  login: async (email: string, password: string): Promise<UserProfile> => {
    // FUTURE: await supabase.auth.signInWithPassword({ email, password })
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock Validation
        if (email && password) {
          const user: UserProfile = {
            id: 'user_' + Math.random().toString(36).substr(2, 9),
            name: 'Demo User',
            email: email,
            avatar: `https://ui-avatars.com/api/?name=Demo+User&background=4361EE&color=fff`,
            role: 'user',
            createdAt: new Date().toISOString()
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1500); // Simulate Network Delay
    });
  },

  /**
   * Signup Logic
   */
  signup: async (name: string, email: string, password: string): Promise<UserProfile> => {
    // FUTURE: await supabase.auth.signUp({ email, password, options: { data: { name } } })
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          const user: UserProfile = {
            id: 'user_' + Math.random().toString(36).substr(2, 9),
            name: name,
            email: email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4361EE&color=fff`,
            role: 'user',
            createdAt: new Date().toISOString()
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Please fill in all fields'));
        }
      }, 1500);
    });
  },

  /**
   * Social Login Mock
   */
  loginWithSocial: async (provider: 'github' | 'google'): Promise<UserProfile> => {
     // FUTURE: await supabase.auth.signInWithOAuth({ provider })
     return new Promise((resolve) => {
        setTimeout(() => {
           const user: UserProfile = {
            id: 'user_' + Math.random().toString(36).substr(2, 9),
            name: provider === 'github' ? 'GitHub User' : 'Google User',
            email: `user@${provider}.com`,
            avatar: `https://ui-avatars.com/api/?name=${provider}+User&background=${provider === 'github' ? '333' : 'DB4437'}&color=fff`,
            role: 'user',
            createdAt: new Date().toISOString()
           };
           localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
           resolve(user);
        }, 1500);
     });
  },

  /**
   * Update Profile Logic
   */
  updateProfile: async (updates: Partial<UserProfile>): Promise<UserProfile> => {
    // FUTURE: await supabase.from('profiles').update(updates).eq('id', user.id)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUserStr = localStorage.getItem(STORAGE_KEY);
        if (currentUserStr) {
           const currentUser = JSON.parse(currentUserStr);
           const updatedUser = { ...currentUser, ...updates };
           localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
           resolve(updatedUser);
        } else {
           reject(new Error("No session found"));
        }
      }, 1000);
    });
  },

  /**
   * Logout Logic
   */
  logout: async (): Promise<void> => {
    // FUTURE: await supabase.auth.signOut()
    localStorage.removeItem(STORAGE_KEY);
    return Promise.resolve();
  },

  /**
   * Get API Keys
   */
  getApiKeys: async (): Promise<ApiKey[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(API_KEYS_STORAGE_KEY);
        resolve(stored ? JSON.parse(stored) : []);
      }, 600);
    });
  },

  /**
   * Create API Key
   */
  createApiKey: async (name: string): Promise<ApiKey> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const keyString = 'eatgf_live_' + Array.from({length: 32}, () => Math.floor(Math.random() * 36).toString(36)).join('');
        const newKey: ApiKey = {
          id: 'key_' + Date.now(),
          name,
          prefix: keyString.substring(0, 10) + '...',
          key: keyString, // Only returned here, not stored fully in db usually
          createdAt: new Date().toISOString(),
          lastUsed: 'Never'
        };

        const stored = localStorage.getItem(API_KEYS_STORAGE_KEY);
        const keys = stored ? JSON.parse(stored) : [];
        // In a real app, we wouldn't store 'key' in the DB, only a hash.
        // For this mock, we store the object minus the full key to simulate that behavior
        const keyToStore = { ...newKey, key: undefined }; 
        
        localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify([...keys, keyToStore]));
        
        resolve(newKey); // Return full key object to UI
      }, 1000);
    });
  },

  /**
   * Revoke API Key
   */
  revokeApiKey: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(API_KEYS_STORAGE_KEY);
        if (stored) {
          const keys = JSON.parse(stored);
          const filtered = keys.filter((k: ApiKey) => k.id !== id);
          localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(filtered));
        }
        resolve();
      }, 600);
    });
  }
};

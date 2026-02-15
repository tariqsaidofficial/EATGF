
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

const STORAGE_KEY = 'nexus_user';

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
  }
};

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { UserOperative } from '../types';

interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  college: string;
  year: string;
  branch: string;
  teamName?: string;
  roleSpecialization?: string;
}

interface SignInData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface AuthContextType {
  user: UserOperative | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoMode: boolean;
  signIn: (data: SignInData) => Promise<{ success: boolean; error?: string }>;
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string; operativeId?: string }>;
  signOut: () => void;
  updateTeam: (teamName: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const sanitizeInput = (val: string): string => {
  return val
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 150);
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserOperative | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isDemoMode = true;

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('heroes_operative_session');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch {
      sessionStorage.removeItem('heroes_operative_session');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateOperativeId = (name: string, email: string): string => {
    const seed = (name + email).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const num = 1000 + (seed % 9000);
    return `GFG-BU-${num}`;
  };

  const signIn = async ({ email, password, rememberMe }: SignInData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const cleanEmail = sanitizeInput(email).toLowerCase();

    if (!cleanEmail || !password) {
      setIsLoading(false);
      return { success: false, error: 'Email and access key are mandatory.' };
    }

    if (password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Access key does not match security parameters.' };
    }

    const operative: UserOperative = {
      id: `usr_${Date.now()}`,
      fullName: cleanEmail.split('@')[0].toUpperCase() || 'OPERATIVE ZERO',
      email: cleanEmail,
      college: 'Bennett University',
      year: '3rd Year',
      branch: 'Computer Science & Engineering',
      teamName: 'Team Vanguard',
      roleSpecialization: 'Distributed Architecture',
      operativeId: generateOperativeId(cleanEmail, cleanEmail),
      registeredAt: new Date().toISOString(),
      clearanceLevel: 'LEVEL 2 — COMMAND CLEARANCE',
      status: 'CONFIRMED',
    };

    setUser(operative);
    try {
      sessionStorage.setItem('heroes_operative_session', JSON.stringify(operative));
      if (rememberMe) {
        localStorage.setItem('heroes_last_operative_email', cleanEmail);
      }
    } catch {
      // storage unavailable
    }

    setIsLoading(false);
    return { success: true };
  };

  const signUp = async (data: SignUpData): Promise<{ success: boolean; error?: string; operativeId?: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const cleanName = sanitizeInput(data.fullName);
    const cleanEmail = sanitizeInput(data.email).toLowerCase();
    const cleanCollege = sanitizeInput(data.college);
    const cleanYear = sanitizeInput(data.year);
    const cleanBranch = sanitizeInput(data.branch);
    const cleanTeam = data.teamName ? sanitizeInput(data.teamName) : undefined;
    const cleanRole = data.roleSpecialization ? sanitizeInput(data.roleSpecialization) : 'General Builder';

    const opId = generateOperativeId(cleanName, cleanEmail);

    const newOperative: UserOperative = {
      id: `usr_${Date.now()}`,
      fullName: cleanName,
      email: cleanEmail,
      college: cleanCollege,
      year: cleanYear,
      branch: cleanBranch,
      teamName: cleanTeam,
      roleSpecialization: cleanRole,
      operativeId: opId,
      registeredAt: new Date().toISOString(),
      clearanceLevel: 'LEVEL 1 — OPERATIVE ASSEMBLED',
      status: 'CONFIRMED',
    };

    setUser(newOperative);
    try {
      sessionStorage.setItem('heroes_operative_session', JSON.stringify(newOperative));
    } catch {
      // storage quota
    }

    setIsLoading(false);
    return { success: true, operativeId: opId };
  };

  const signOut = () => {
    setUser(null);
    try {
      sessionStorage.removeItem('heroes_operative_session');
    } catch {
      // silent
    }
  };

  const updateTeam = (teamName: string) => {
    if (!user) return;
    const updated = { ...user, teamName: sanitizeInput(teamName) };
    setUser(updated);
    try {
      sessionStorage.setItem('heroes_operative_session', JSON.stringify(updated));
    } catch {
      // silent
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isDemoMode,
        signIn,
        signUp,
        signOut,
        updateTeam,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

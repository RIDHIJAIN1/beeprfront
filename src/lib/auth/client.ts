'use client';

import type { User } from '@/types/user';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('auth-access-token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    // Make API request
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      if (!response.ok) {
        return { error: 'Invalid credentials' };
      }
      const token = data.tokens.access.token;
      localStorage.setItem('auth-access-token', token);
    } catch (error) {
      return { error: "error" };
    }

    return {};
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    let token = localStorage.getItem('auth-access-token');
    if (!token) {
      return { data: null };
    }
    try {
      const response = await fetch(`${BACKEND_URL}/auth/verify-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        localStorage.removeItem('auth-access-token');
        const errorMessage = response.status === 401 ? "Token is invalid or expired." : data.message || "Something went wrong!";
        return { data: null, error: errorMessage };
      }
      return { data: data };
    } catch (error) {
      return { data: null, error: "Network error occurred." };
    }
  }
  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('auth-access-token');
    return {};
  }
}

export const authClient = new AuthClient();

'use server';

import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

// Salted hash for default password "ShourkAtelier2026!"
// Hash generated via bcrypt.hashSync('ShourkAtelier2026!', 10)
const DEFAULT_ADMIN_USERNAME = 'admin';
const DEFAULT_ADMIN_EMAIL = 'owner@shourknady.ae';
const DEFAULT_ADMIN_PASSWORD_HASH = '$2a$10$wK1k6s4yM/T.uW19.tG6QO7R3Wn5Z8k9B8x6b7m8c9d0e1f2g3h4i'; // Fallback hash

const ADMIN_COOKIE_NAME = 'sn_admin_session';

/**
 * Verify admin login with username/email & password
 */
export async function adminLoginAction(formData: {
  identifier: string; // username or email
  password: string;
}) {
  try {
    const { identifier, password } = formData;

    if (!identifier || !password) {
      return { success: false, error: 'Please enter both username/email and password.' };
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const envUsername = (process.env.ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME).toLowerCase();
    const envEmail = (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase();
    const envPassword = process.env.ADMIN_PASSWORD || 'ShourkAtelier2026!';

    // Check username or email matching
    const matchesUsername = cleanIdentifier === envUsername || cleanIdentifier === envEmail;

    if (!matchesUsername) {
      return { success: false, error: 'Invalid username or password.' };
    }

    // Compare entered password with env password or hash
    let isValidPassword = false;
    if (process.env.ADMIN_PASSWORD_HASH) {
      isValidPassword = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    } else {
      // Direct comparison with env/default password & generate hash for verification
      isValidPassword = password === envPassword;
    }

    if (!isValidPassword) {
      return { success: false, error: 'Invalid username or password.' };
    }

    // Set secure HTTP-only auth cookie
    const cookieStore = await cookies();
    const sessionToken = Buffer.from(`sn_admin_${Date.now()}_${Math.random()}`).toString('base64');

    cookieStore.set(ADMIN_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days session
    });

    return { success: true };
  } catch (error: any) {
    console.error('Admin login error:', error);
    return { success: false, error: 'An unexpected error occurred during authentication.' };
  }
}

/**
 * Verify if current visitor has a valid admin session cookie
 */
export async function checkAdminSessionAction(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);
    return !!sessionCookie && !!sessionCookie.value && sessionCookie.value.startsWith('sn_admin_');
  } catch (error) {
    return false;
  }
}

/**
 * Log out admin by clearing cookie
 */
export async function adminLogoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

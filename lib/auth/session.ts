import { UserProfile, UserRole } from "@/types/portal";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "../supabase/client";
import { schoolStore } from "../data/school-store";

const SESSION_STORAGE_KEY = "oakridge_portal_session";

export interface AuthSession {
  user: UserProfile;
  token?: string;
  expiresAt: number;
}

export const SEED_CREDENTIALS = {
  admin: {
    email: "admin@oakridgeacademy.edu",
    password: "Admin@2026!",
    role: "administrator" as UserRole,
    name: "Dr. Evelyn Montgomery",
    id: "f0000000-0000-0000-0000-000000000001",
  },
  teacher: {
    email: "m.chen@oakridgeacademy.edu",
    password: "Teacher@2026!",
    role: "teacher" as UserRole,
    name: "Dr. Marcus Chen",
    id: "f0000000-0000-0000-0000-000000000002",
  },
  student: {
    email: "student.alex@oakridgeacademy.edu",
    password: "Student@2026!",
    role: "student" as UserRole,
    name: "Alex Vance",
    id: "f0000000-0000-0000-0000-000000000003",
  },
  parent: {
    email: "parent.vance@oakridgeacademy.edu",
    password: "Parent@2026!",
    role: "parent" as UserRole,
    name: "Eleanor Vance",
    id: "f0000000-0000-0000-0000-000000000004",
  },
};

/**
 * Retrieves the currently active user session.
 * Rejects expired sessions and deactivated / suspended accounts.
 */
export function getCurrentSession(): AuthSession | null {
  if (typeof window === "undefined" && typeof localStorage === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;

    const session: AuthSession = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }

    // Phase 5 Security hardening: Inactive or suspended accounts cannot maintain an active session
    if (session.user?.status && session.user.status !== "active") {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }

    // Verify against current store status in case account was deactivated during an active session
    if (session.user?.id) {
      const liveProfile = schoolStore.getProfiles().find((p) => p.id === session.user.id);
      if (liveProfile && liveProfile.status !== "active") {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        return null;
      }
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Authenticates user credentials with Supabase or seed fallback.
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<{ success: boolean; session?: AuthSession; error?: string }> {
  const normalizedEmail = email.trim().toLowerCase();

  // 1. If Supabase is configured, use live auth
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data?.user) {
        // Fetch profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", data.user.id)
          .single();

        if (profile && profile.status && profile.status !== "active") {
          return {
            success: false,
            error: "This school account has been deactivated or suspended. Please contact the Academy Administrator.",
          };
        }

        const userProfile: UserProfile = profile || {
          id: data.user.id,
          email: data.user.email || normalizedEmail,
          full_name: data.user.user_metadata?.full_name || "School Member",
          role: (data.user.user_metadata?.role as UserRole) || "student",
          status: "active",
          created_at: new Date().toISOString(),
        };

        const session: AuthSession = {
          user: userProfile,
          token: data.session?.access_token,
          expiresAt: Date.now() + 8 * 60 * 60 * 1000, // 8 hours
        };

        if (typeof window !== "undefined") {
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
        }

        return { success: true, session };
      }
    }
  }

  // 2. Safe Local / Development Fallback Authentication
  const matchedUser = Object.values(SEED_CREDENTIALS).find(
    (u) => u.email.toLowerCase() === normalizedEmail
  );

  if (!matchedUser) {
    return {
      success: false,
      error: "No account found matching this email address. Please verify your credentials.",
    };
  }

  if (matchedUser.password !== password) {
    return {
      success: false,
      error: "Incorrect password entered. Please try again or use the password reset link.",
    };
  }

  // Phase 5 Security hardening: Verify account status in local school store
  const storeProfile = schoolStore.getProfileByEmail(normalizedEmail);
  if (storeProfile && storeProfile.status !== "active") {
    return {
      success: false,
      error: "This school account has been deactivated or suspended. Please contact the Academy Administrator.",
    };
  }

  const userProfile: UserProfile = storeProfile || {
    id: matchedUser.id,
    email: matchedUser.email,
    full_name: matchedUser.name,
    role: matchedUser.role,
    status: "active",
    phone: "+1 (555) 438-9000",
    created_at: "2026-09-01T08:00:00Z",
  };

  const session: AuthSession = {
    user: userProfile,
    expiresAt: Date.now() + 8 * 60 * 60 * 1000,
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  }

  return { success: true, session };
}

/**
 * Helper to log in immediately as one of the 4 seed roles for evaluation.
 */
export function quickLoginAsRole(role: UserRole): AuthSession {
  const seed = SEED_CREDENTIALS[role === "administrator" ? "admin" : role];
  const userProfile: UserProfile = {
    id: seed.id,
    email: seed.email,
    full_name: seed.name,
    role: seed.role,
    status: "active",
    phone: "+1 (555) 438-9000",
    created_at: "2026-09-01T08:00:00Z",
  };

  const session: AuthSession = {
    user: userProfile,
    expiresAt: Date.now() + 8 * 60 * 60 * 1000,
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  }

  return session;
}

/**
 * Clears the active session and logs out.
 */
export async function terminateSession(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
  }
}

export const clearSession = terminateSession;
export type UserSession = AuthSession;


/**
 * Checks whether the given user has permission to access the target path.
 */
export function isAuthorizedForPath(pathname: string, role: UserRole): boolean {
  if (pathname.startsWith("/portal/admin") && role !== "administrator") {
    return false;
  }
  if (pathname.startsWith("/portal/teacher") && role !== "teacher" && role !== "administrator") {
    return false;
  }
  if (pathname.startsWith("/portal/student") && role !== "student" && role !== "administrator") {
    return false;
  }
  if (pathname.startsWith("/portal/parent") && role !== "parent" && role !== "administrator") {
    return false;
  }
  return true;
}

/**
 * Returns default dashboard route for role.
 */
export function getDefaultDashboardForRole(role: UserRole): string {
  switch (role) {
    case "administrator":
      return "/portal/admin";
    case "teacher":
      return "/portal/teacher";
    case "student":
      return "/portal/student";
    case "parent":
      return "/portal/parent";
    default:
      return "/portal";
  }
}

import { signIn, signOut, signUp } from "~/lib/auth-client";

const api = () => useNuxtApp().$axios;

export const authService = {
  async login(email: string, password: string) {
    const { data, error } = await signIn.email({ email, password });
    return { data, error };
  },

  async signup(
    name: string,
    email: string,
    password: string,
    phone?: string,
    nid?: string
  ) {
    const { data, error } = await signUp.email({ name, email, password });
    if (error) return { data, error };

    if (phone || nid) {
      try {
        await api().put("/auth/profile", { phone, nid });
      } catch {
        // Profile update is non-critical; signup succeeded
      }
    }

    return { data, error: null };
  },

  async googleSignIn() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await (signIn as any).social({ provider: "google" });
  },

  async googleSignUp() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await (signUp as any).social({ provider: "google" });
  },

  async resetPassword(currentPassword: string, newPassword: string) {
    const verifyResult = await api().post("/auth/verify-password", {
      password: currentPassword,
    });

    if (!verifyResult.data.success) {
      throw new Error(verifyResult.data.message || "Current password is incorrect");
    }

    const changeResult = await api().post("/auth/change-password", {
      currentPassword,
      newPassword,
    });

    if (!changeResult.data.success) {
      throw new Error(changeResult.data.message || "Failed to change password");
    }

    return changeResult.data;
  },

  async logout() {
    await signOut();
  },
};

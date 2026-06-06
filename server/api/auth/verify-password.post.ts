import { auth } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  try {
    const session = await auth.api.getSession({ headers: event.headers });
    if (!session?.user) {
      return { success: false, message: "Unauthorized" };
    }

    const { password } = await readBody(event);
    if (!password) {
      return { success: false, message: "Password is required" };
    }

    const result = await auth.api.verifyPassword({
      body: { password },
      headers: event.headers,
    });

    if (result?.error) {
      return { success: false, message: result.message || "Current password is incorrect" };
    }

    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Current password is incorrect",
    };
  }
});

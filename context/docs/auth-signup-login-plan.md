# Auth Pages — Login & Signup Implementation Plan

## Context

Better Auth is fully wired up on both server (`server/utils/auth.ts`) and client (`app/lib/auth-client.ts`), with a catch-all API route at `server/api/auth/[...all].ts` and Prisma schema already migrated (User, Session, Account, Verification models). However, **no auth pages, auth layout, or route guards exist yet**. The default layout currently shows a hardcoded user. Users cannot sign up or log in through the UI.

This plan builds the missing pieces: auth pages, auth layout, and middleware to gate protected routes.

---

## Files to Create

### 1. `app/layouts/auth.vue` — Minimal centered auth layout

Referenced in `architecture.md` but doesn't exist yet. A clean centered layout with:
- Full-viewport gradient background (light green/teal matching the project's gradient utilities)
- Centered card (max-w-md) containing the `<slot />`
- Ghoroa branding/logo at top of card
- No sidebar, no header — distinct from the `default.vue` authenticated shell

### 2. `app/pages/auth/login.vue` — Login page

- Uses `definePageMeta({ layout: 'auth' })`
- Imports and renders `<AuthLogin />` component
- If user is already authenticated, redirect to `/dashboard`

### 3. `app/pages/auth/signup.vue` — Signup page

- Uses `definePageMeta({ layout: 'auth' })`
- Imports and renders `<AuthSignup />` component
- If user is already authenticated, redirect to `/dashboard`

### 4. `app/components/auth/AuthLogin.vue` — Login form component

- Email input, password input (Ant Design Vue `a-input`)
- "Sign in" button with `custom-gradient-btn` class
- Link: "Don't have an account? Sign up" → `/auth/signup`
- Calls `signIn.email({ email, password })` from `better-auth/vue`
- On success: `navigateTo('/dashboard')`
- Error handling: display error message with `a-message` toast, loading state on button

### 5. `app/components/auth/AuthSignup.vue` — Signup form component

- Name, email, password, confirm password inputs (Ant Design Vue)
- "Create account" button with `custom-gradient-btn` class
- Link: "Already have an account? Sign in" → `/auth/login`
- Calls `signUp.email({ email, password, name })` from `better-auth/vue`
- New users default to `TENANT` role (set in Prisma schema); role changes handled by admin later
- Client-side validation: email format, password min 6 chars, confirm match
- On success: `navigateTo('/dashboard')`
- Error handling: `a-message` toast, loading state

### 6. `middleware/auth.ts` — Auth route guard middleware

- Fetch session via `$fetch('/api/auth/get-session')` (Better Auth session endpoint)
- If no session, redirect to `/auth/login?redirect=${to.fullPath}`
- If session exists, allow access
- Apply to protected pages via `definePageMeta({ middleware: 'auth' })`

### 7. Update `app/pages/dashboard/index.vue`

- Add `definePageMeta({ middleware: 'auth' })` to protect the dashboard

---

## Key Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| **User type on signup** | Always `TENANT` (schema default) | Role assignment should be admin-only; signup is self-service |
| **Store/Service layer** | Skipped for auth | Better Auth client SDK handles everything; wrapper adds no value |
| **Session in middleware** | Direct `$fetch` to `/api/auth/get-session` | `useSession()` from `better-auth/vue` needs component context; middleware can't use composables |
| **Error display** | `a-message` toast from Ant Design | Consistent with project's error handling convention |
| **Form validation** | Client-side in component | Simple validation; no need for Zod on login/signup forms |
| **Post-login redirect** | Always `/dashboard` | Project only has one authenticated entry point currently |

---

## Edge Cases Handled

1. **Already authenticated user visits `/auth/login`** → redirect to `/dashboard`
2. **Wrong password / email not found** → Better Auth returns error, displayed as `a-message.error()`
3. **Email already registered on signup** → Better Auth returns conflict error, displayed in toast
4. **Loading state** → Button shows `:loading="loading"` during API call, inputs disabled
5. **Form validation** → Email format regex, password min length, confirm password match — all with inline Ant Design validation
6. **Redirect back after login** → `?redirect=` param preserved (future use when accessing protected pages while unauthenticated)

---

## Verification

1. Start dev server: `npm run dev`
2. Visit `http://localhost:3000/auth/signup` — create an account
3. Verify redirect to `/dashboard` after successful signup
4. Sign out (will need a logout button — future task or add basic one)
5. Visit `http://localhost:3000/auth/login` — log in with created credentials
6. Verify redirect to `/dashboard`
7. Visit `/dashboard` directly while logged out — verify redirect to `/auth/login`
8. Try submitting with invalid data — verify error messages appear
9. Try registering with same email twice — verify error message
10. Run `npm run build` — verify no build errors

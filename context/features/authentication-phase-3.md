# Authentication Phase 2 (Change Password & Send Email)

## Overview

In this authentication phase 3 we want to create the feature where a logged in user can change it's password. Upon successful password change we'll send an email to the user.

## Requirements for phase 3

- Create a reset password page using the default layout. This page will have the password reset form with the inputs: current password, new password & confirm password.
- In the topbar's user dropdown add another link 'Reset Password' before 'Logout'. The link will reroute the user to the password reset page. This page should be under auth directory.
- Create two new api calls at @server/auth. One to verify the current user's password and match and the other is to update the password
- Use useAuth.ts (composable), userAuthStore.ts (store) and authService.ts (service). Use the authService to call the required api calls and business logic
- Business logic to complete: 1.Verify current password 2.Update user password
- Only if the password is reset succesfully then it will send the user email saying the success message. Resend documentation refered.
- Follow the coding workflow as mentioned in the Architecture.

## Notes

- Resend installed
- Resend API Key is set in the environmental variable file
- Resend EMAIL_FROM is set in the environmental variable file
- Server api post method for sending Email already created @server/email/send.post.ts
- Util method for sending email logic is already created @server/utils/email.ts

## References

- Authentication phase 1 - `@context/features/authentication-phase-1.md`
- Authentication phase 2 - `@context/features/authentication-phase-2.md`
- Resend documentation for sending email - `https://resend.com/docs/send-with-nuxt`
- Better Auth documentation for updating and verifiying user password - `https://better-auth.com/docs/concepts/users-accounts`
- Database Configuration - `@prisma/schema.prisma`
- Coding Standards - `@context/coding-standards.md`
- Architecture & Coding Workflow - `@context/architecture.md`

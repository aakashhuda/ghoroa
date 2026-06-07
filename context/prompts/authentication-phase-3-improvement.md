# Improvements

- Some validation method is being written in the AuthResetPassword.vue. It should have been written in the useAuth.ts composable
- Fix the Reset Button's text and icon alignment
- For user password verification there is a dedicated method in Better Auth. docl link: `https://better-auth.com/docs/concepts/users-accounts#verify-password`. Please use this method to verify the password before updating it. Also show message if necessary. Update the verify-password.post.ts with the new code.
- Change the reset password icon in the dropdown of the topbar. Use a more relavent one please.

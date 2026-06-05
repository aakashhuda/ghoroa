# Authentication Phase 2

## Overview

We want to set the initial workflow of our application. This includes the user login/signup functionality and UI improvements. The Authentication phase 1 covered the login and signup considering basic workflow just to start the development. Now we'll dive a little more deep.

## Requirements for phase 2

- Install Pinia for state management. Use simple structure where I can create and use separate store specific to a module.
- Currently the signup process creates a Tenant user type User. Change it to Super Admin. So from the Signup page we'll only create Super Admin type user for now.
- The signup form doesn't cover all the fields of the User model. Choose relavent input fields for each model field in the form.
- Upon API request success/failure we want to show toasts to the user. Along with the error message in the form also add toast notifications
- Coding standards has not been maintained completely in the phase 1. Requests are directly made from the component. We need to follow the coding workflow as mentioned in the Architecture. Follow the workflow diagram and update the existing code as we will be using Pinia for state management, backend logics and query in with Prisma.
- We are not using the composable directory. Create a composable for authentication. Use that composable for calling the pinia actions and component functionality. So Component -> composables to the pinia action and other workflow set in the architecture.
- Login page's forgot password link is placed wrongly. Fix it
- The logo used in the auth pages as `<svg></svg>` should be used in the sidebar's logo position. And need to generate a different color for that as the background matches the current text color.
- Instead of writing css as scoped inside a component write it on the main.css file. So we can reuse it all over the project. Move the the auth button css in the login and signup components
- Use Ant Vue for all the html components. Don't use any plain html component. We have already update the theme colors for Ant Vue

## References

- Authentication phase 1 - `@context/features/authentication-phase-1.md`
- Database Configuration - `@prisma/schema.prisma`
- Coding Standards - `@context/coding-standards.md`
- Architecture & Coding Workflow - `@context/architecture.md`

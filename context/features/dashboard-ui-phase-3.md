# Dashboard UI Phase 3 Spec

## Overview

This is phase 3 of 3 for the dashboard UI layout. We want to create some dashboard analytics for UI build purpose. So we'll use mock data for now before creating an actual database. The dashboard has metrics cards, tables, lists potraying the analytics of the complete home management and business.

## Requirements for phase 3

- Create metric cards, table cards, list cards for our dashboard link's main content taking reference from @context/docs/dashboard-vue-html-reference.md board.
- Metrics Cards of Total Rent Collected, Farm Revenue, Total Expenses, Net Balance, Active Tenants, Pending Orders, Employees, Open Requests
- Graph cards of Income vs Expenses, Rent Collection Trend
- Other listing cards of Expense Breakdown, Popular Products, Recent Orders(Table), Tenant Requests, Order Metrics, Account Balances, Recent Activity
- For designing the UI please create the UI from the reference screenshot, use the vue reference from vue html reference and the css required from css referenced. References are given in its own section.
- For creating css class globally please use `@apply` of `tailwind` so that tailwind utility classes are used to create classes.
- For building the UI use the mock data, if any missing as referenced in the vue html reference add that to mock data
- Use Ant Vue for all the components. Use the classes to make the UI look like the reference
- For graph use vue-chart-js
- UI classes should be written in the global css file
- Border radius should be reduced to reference card UI alike. And also have the card hover effect.
- Fix the "Rooftop Farm" sidebar icon to a more relatable one

## References

- @context/screenshots/screenshot-dashboard-main-content.png
- @context/docs/dashboard-css-reference.md
- @context/docs/dashboard-vue-html-reference.md
- @context/docs/dashboard-css-reference.md
- @context/project-overview.md
- @app/lib/mock-data.ts
- @context/features/dashboard-phase-1-spec.md
- @context/features/dashboard-phase-2-spec.md
- @context/docs/dashboard-ui-data.md

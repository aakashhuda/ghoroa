# Dashboard UI Phase 3 Spec

## Overview

This is phase 3 of 3 for the dashboard UI layout. Use the screenshot referenced below for how it should look. Use the data from the mock data file referenced below. Just import it directly for now until we implement a database.

## Requirements for phase 3

- In main.css import tailwind utilities and use @ to create classes using tailwind classes.
- Make changes in the Ant Vue theme colors to match the screenshots color pallete or design sense referenced in the screenshots of dashboard main content. If neccessary create custom classes to match the color pallet.
- Update the new color pallet in the @context/project-overview.md
- Selected background colors on the sidebar should also reflect the new color theme. The whole project will be considered for change
- Decrease the border radius globally. Make it as reusable through out the project. New Border radius reference is given in @context/screenshots/dashboard-ui-main.png.
- Fix the icons for Rooftop Farm in the sidebar. Select a more relatable icon
- In the @app/components/dashboard/DashboardView.vue component create Analytics (Metrices, Tables, Lists) referenced in the screenshots referenced @context/screenshots/dashboard-ui-main.png. Use the mock data in @app/lib/mock-data.ts
- Cards in will follow the same UI pattern in of shadow, border, hover effect radius from the @context/screenshots/dashboard-ui-main.png screenshot
- For complete color pallet reference for tailwind as well as Ant Vue theme check @context/docs/dashboard-css-reference.md & @context/docs/dashboard-tailwind-color-config.md
- Can update/create our tailwind config accordingly
- Priority is to match the dasboard content color pallent and use it in everywhere. eg. Sidebar/Whole project

## References

- @context/docs/dashboard-css-reference.md
- @context/docs/dashboard-tailwind-color-config.md
- @context/screenshots/screenshot-dasboard-main-content.png
- @context/screenshots/screenshot-dashboard-sidebar.png
- @context/project-overview.md
- @app/lib/mock-data.ts
- @context/features/dashboard-phase-1-spec.md
- @context/features/dashboard-phase-2-spec.md
- @context/docs/dashboard-ui-data.md
- @app/lib/mock-data.ts

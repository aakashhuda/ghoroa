# Dashboard UI Improvement Spec

## Overview

Here we'll try to polish the UI that we have already created. There are going to be some UI changes, theme color configuration, mobile responsive issues and layout structural changes

## Requirements for phase 1

- Light theme with new colors is configured in @app/app.vue. But configured theme is not loaded in the home URL. But in the dashboard it is loaded properly. Theme should be applied for the whole layout.
- Instead of having seperate classes for cards like chart-card, metric-card we can have one card class that will define the card ui and use it.
- In mobile device below 500px the top bar breaks. The + New button goes out of viewwidth.
- Logo/Project name position should be on the left of the topbar instead of having it in the sidebar.
- Search input position should be moved to the left with the + New button
- For mobile device shorten the search input width and position it beside the + New button. This + New button should only have the icon for the mobile device.
- Collapse icon in the sidebar should be changed to something more modern looking hamburger icon available here
- For mobile device the drawer background color should have the same color of the sidebar. And the sidebar should cover the whole drawer rather than having any padding which is uneccessary.

## References

- @context/screenshots/screenshot-dashboard-sidebar
- @context/screenshots/screenshot-dashboard-content
- @context/project-overview.md
- @context/architecture.md
- @app/lib/mock-data.ts

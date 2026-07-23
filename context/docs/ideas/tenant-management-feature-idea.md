# Tenant Management

## Overview

This is where users manage tenants. With tenants come gas meter, electric meter, flat with relationship. We want to create Add Tenant, Edit Tenant page which shares one form component. Form behaviour varies derived from a prop isEdit: Boolean. This form component sharing will be their for the other CRUDS as well.

In this development we will also build the CRUD operations for Flat, Gas Meter, Electric Meter and rest referenced later as schema. We'll have separate pages of Add/Edit actions for each. And a List view page with a table with pagination. That table will have an action column on the end for each row with detail page link, update page and delete button. Detail page reroutes the user to the instances detail page. So we'll have a detail page of the instances as well. All the actions will have an coressponding icon for the action.

On the sidebar we have the tenant's link. But we need to add the links of the other CRUDS that we are building.

Having Pages for each, on the tenant's page we want to manage the flats, electric meter, gas meter etc also in a very compact design. Suggested UI: Tabbed form/small modals/dialog form.

For components we'll use our @ant-design-vue/nuxt components definitely. The project colors will be consistent through out the pages.

As references for the fields and forms design go through the database structure `@prisma/schema.prisma`. Also go through the db migrations `@prisma/migrations/`

Our listing page will have a filter, search input on the top of the table card. And on the top of the page on the right there will be a Add button (Add Tenant/Add Flat) for each page.
We have to build this search and filter functionalities as well maintaining our development architecture.

As these are the first admin panel pages other than dashboard page, a ui structure should be mentain across the pages so user can get used to it easily. Each listing page will have search, filter, table with action and pagination with funtionality. As usual ant vue components will be used.

CRUD="Listing page with actions, Add Page, Edit Page, Detail Page"

### Need to build Pages

- Flat CRUD
- Gas Meter CRUD
- Electric Meter CRUD
- Tenant CRUD
- Rent Transaction

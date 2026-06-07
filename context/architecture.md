## Architecture

The app follows the Nuxt 4 conventions with modular domains under `pages/`, `server/api/`, and `stores/`.

### Domain Modules

Each domain has its own directory under `pages/`, `server/api/`, and `components/`:

- **Rent Management** — tenants, monthly rent collection, advances, notices, invoices, requests
- **Employees** — profiles, salary transactions, work distribution
- **Building Maintenance** — expenses, categories, inventory
- **Rooftop Farm** — products, orders, investments, e-commerce, production
- **Accounts** — double-entry account transactions with draft/authorised/complete workflow
- **Reports** — monthly finance, rent patterns, income vs expense

### Layout System (3 layouts)

- `layouts/default.vue` — authenticated app shell (sidebar + header + footer + main slot)
- `layouts/auth.vue` — minimal centered layout for login/register
- `layouts/guest.vue` — public-facing layout for client view

### Shared Components

- `components/shared/FileUpload.vue` — R2 file upload wrapper
- `components/shared/DefaultFooter.vue` — Footer for default layout
- `components/shared/GuestFooter.vue` — Footer for guest layout
- `components/share/AuthFooter.vue` — Footer for auth layout

### Key Patterns

- Quick-create/edit flows open in a **side drawer** (not new pages) / **Modal**, managed globally via Pinia
- API routes in `server/api/` — each domain gets its own route group
- Route middleware guards controls different module's access to `SUPER_ADMIN/` or checks permission for different actions
- All file uploads go through `/api/upload` → Cloudflare R2
- WhatsApp credentials stay server-side (never exposed to client)

### User Roles

`SUPER_ADMIN` (full access), `ADMIN` (create records), `TENANT` (view own rent, submit requests), `CUSTOMER` (browse/order farm products), `EMPLOYEE` (view salary, assigned work).

### Theme

Ant Design Vue theme tokens (light + dark) are configured in `app.vue` via `<a-config-provider>`. DM Sans font. Two prebuilt CSS classes in `assets/css/main.css`:

- `.custom-gradient-btn` — gradient button style
- `.gradient-text` — gradient text style

### Coding Workflow / Architecture

- `page` — Will contain the page title, holds components with functionality, Back button, Javascript event management.
- `components`— holds functionality, calls store actions, presents & hold client actions
- `store` — store actions with mutations, getters & state variables. Call services under @services/[ServiceFile].js
- `service` — Service file has the business logic. Calls server api calls and return responses
- `server` — Server processes the request and returns a response to the Service

- #### Workflow Diagram

  ```mermaid
      flowchart LR
          A[🖥️ Page] -->|User Action| B[🧩 Component/Composable ]
          B -->|Dispatch Action| C[🗄️ Store]
          C -->|API Call| D[⚙️ Service]
          D -->|HTTP Request| E[🌐 Server]

          E -->|Response| D
          D -->|Data| C
          C -->|State Update| B
          B -->|Re-render| A

          style A fill:#4f46e5,color:#fff,stroke:#3730a3
          style B fill:#0891b2,color:#fff,stroke:#0e7490
          style C fill:#059669,color:#fff,stroke:#047857
          style D fill:#d97706,color:#fff,stroke:#b45309
          style E fill:#dc2626,color:#fff,stroke:#b91c1c
  ```

### Key Rules

- User passwords are hashed (not plaintext)
- Account transactions use balance snapshots (`senderBalanceSnap`, `receiverBalanceSnap`) for audit trail
- System item types (rent accounts, monthly rent, etc.) are locked — cannot be renamed/deleted
- Drawers open via a global Pinia store so any component can trigger them

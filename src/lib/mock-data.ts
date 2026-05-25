export interface DashboardStats {
  totalRentCollected: number
  farmRevenue: number
  totalExpenses: number
  netBalance: number
  activeTenants: number
  pendingOrders: number
  employees: number
  openRequests: number
}

export interface AdminUser {
  id: string
  name: string
  email: string
  phone: string
  role: 'SUPER_ADMIN' | 'ADMIN'
  image: string
}

/** Current logged-in admin user */
export const currentUser: AdminUser = {
  id: 'usr-admin-001',
  name: 'আব্দুর রহিম',
  email: 'rahim@ghoroa.com',
  phone: '+8801712345678',
  role: 'SUPER_ADMIN',
  image: '',
}

/** Dashboard overview stats */
export const dashboardStats: DashboardStats = {
  totalRentCollected: 285000,
  farmRevenue: 45600,
  totalExpenses: 98700,
  netBalance: 231900,
  activeTenants: 24,
  pendingOrders: 7,
  employees: 12,
  openRequests: 4,
}

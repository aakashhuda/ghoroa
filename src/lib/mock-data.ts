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
  totalRentCollected: 124500,
  farmRevenue: 38750,
  totalExpenses: 22300,
  netBalance: 140950,
  activeTenants: 24,
  pendingOrders: 7,
  employees: 12,
  openRequests: 3,
}

export interface ExpenseBreakdownItem {
  category: string
  amount: number
}

export const expenseBreakdown: ExpenseBreakdownItem[] = [
  { category: 'Maintenance', amount: 8400 },
  { category: 'Salaries', amount: 9200 },
  { category: 'Utilities', amount: 2800 },
  { category: 'Miscellaneous', amount: 1900 },
]

export interface PopularProduct {
  name: string
  category: string
  orders: number | null
}

export const popularProducts: PopularProduct[] = [
  { name: 'Chicken Eggs', category: 'Egg · Chicken', orders: 124 },
  { name: 'Fresh Tomatoes', category: 'Vegetable', orders: null },
]

export interface MonthlyChartDataPoint {
  month: string
  income: number
  expenses: number
}

export const incomeVsExpenses: MonthlyChartDataPoint[] = [
  { month: 'Jan', income: 85000, expenses: 32000 },
  { month: 'Feb', income: 92000, expenses: 28000 },
  { month: 'Mar', income: 78000, expenses: 35000 },
  { month: 'Apr', income: 105000, expenses: 30000 },
  { month: 'May', income: 112000, expenses: 27000 },
  { month: 'Jun', income: 124500, expenses: 22300 },
]

export interface RentCollectionDataPoint {
  month: string
  collected: number
  target: number
}

export const rentCollectionTrend: RentCollectionDataPoint[] = [
  { month: 'Jan', collected: 80000, target: 85000 },
  { month: 'Feb', collected: 88000, target: 85000 },
  { month: 'Mar', collected: 75000, target: 85000 },
  { month: 'Apr', collected: 95000, target: 90000 },
  { month: 'May', collected: 100000, target: 90000 },
  { month: 'Jun', collected: 124500, target: 110000 },
]

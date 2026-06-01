export interface DashboardStats {
  totalRentCollected: number;
  farmRevenue: number;
  totalExpenses: number;
  netBalance: number;
  activeTenants: number;
  pendingOrders: number;
  employees: number;
  openRequests: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "SUPER_ADMIN" | "ADMIN";
  image: string;
}

/** Current logged-in admin user */
export const currentUser: AdminUser = {
  id: "usr-admin-001",
  name: "আব্দুর রহিম",
  email: "rahim@ghoroa.com",
  phone: "+8801712345678",
  role: "SUPER_ADMIN",
  image: "",
};

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
};

export interface ExpenseBreakdownItem {
  category: string;
  amount: number;
}

export const expenseBreakdown: ExpenseBreakdownItem[] = [
  { category: "Maintenance", amount: 8400 },
  { category: "Salaries", amount: 9200 },
  { category: "Utilities", amount: 2800 },
  { category: "Miscellaneous", amount: 1900 },
];

export interface PopularProduct {
  name: string;
  category: string;
  orders: number | null;
  emoji: string;
  bg: string;
}

export const popularProducts: PopularProduct[] = [
  { name: "Chicken Eggs", category: "Egg · Chicken", orders: 124, emoji: "🥚", bg: "#fff7ed" },
  { name: "Fresh Tomatoes", category: "Vegetable", orders: 98, emoji: "🍅", bg: "#fef2f2" },
  { name: "Koyel Eggs", category: "Egg · Koyel", orders: 76, emoji: "🐣", bg: "#f0fdf4" },
  { name: "Country Chicken", category: "Meat · Chicken", orders: 54, emoji: "🍗", bg: "#fff7ed" },
  { name: "Green Spinach", category: "Vegetable", orders: 42, emoji: "🥬", bg: "#f0fdf4" },
];

export interface MonthlyChartDataPoint {
  month: string;
  income: number;
  expenses: number;
}

export const incomeVsExpenses: MonthlyChartDataPoint[] = [
  { month: "Dec", income: 142000, expenses: 18500 },
  { month: "Jan", income: 138500, expenses: 22100 },
  { month: "Feb", income: 151200, expenses: 19800 },
  { month: "Mar", income: 146800, expenses: 25400 },
  { month: "Apr", income: 158300, expenses: 21700 },
  { month: "May", income: 163250, expenses: 22300 },
];

export interface RentCollectionDataPoint {
  month: string;
  collected: number;
  target: number;
}

export const rentCollectionTrend: RentCollectionDataPoint[] = [
  { month: "Dec", collected: 115000, target: 120000 },
  { month: "Jan", collected: 118500, target: 120000 },
  { month: "Feb", collected: 121200, target: 124000 },
  { month: "Mar", collected: 119800, target: 124000 },
  { month: "Apr", collected: 122300, target: 124000 },
  { month: "May", collected: 124500, target: 126000 },
];

export interface RecentOrder {
  key: number;
  customer: string;
  items: number;
  total: string;
  status: "Delivered" | "Processing" | "Pending";
}

export const recentOrders: RecentOrder[] = [
  { key: 1, customer: "Rina Begum", items: 3, total: "480", status: "Delivered" },
  { key: 2, customer: "Kamal Hossain", items: 1, total: "220", status: "Processing" },
  { key: 3, customer: "Sumaiya Islam", items: 5, total: "975", status: "Delivered" },
  { key: 4, customer: "Ariful Bari", items: 2, total: "360", status: "Pending" },
  { key: 5, customer: "Fatema Akter", items: 4, total: "680", status: "Delivered" },
];

export interface TenantRequest {
  id: number;
  title: string;
  tenant: string;
  flat: string;
  type: "Complaint" | "Review" | "Suggestion";
  resolved: boolean;
  date: string;
}

export const tenantRequests: TenantRequest[] = [
  { id: 1, title: "Water supply issue on floor 3", tenant: "Mahbub Rahman", flat: "A-301", type: "Complaint", resolved: false, date: "Today, 9:12 AM" },
  { id: 2, title: "Great service this month!", tenant: "Nasrin Jahan", flat: "B-201", type: "Review", resolved: true, date: "Yesterday" },
  { id: 3, title: "Request for intercom repair", tenant: "Sabbir Ahmed", flat: "A-402", type: "Complaint", resolved: false, date: "2 days ago" },
  { id: 4, title: "Suggestion: add rooftop seating", tenant: "Farzana Akter", flat: "C-101", type: "Suggestion", resolved: false, date: "3 days ago" },
];

export interface OrderMetric {
  label: string;
  value: string;
  percent: number;
  color: string;
}

export const orderMetrics: OrderMetric[] = [
  { label: "Delivery Rate", value: "94%", percent: 94, color: "#16a34a" },
  { label: "Customer Satisfaction", value: "4.7/5", percent: 94, color: "#0891b2" },
  { label: "Return Rate", value: "2.1%", percent: 2, color: "#ea580c" },
  { label: "Repeat Buyers", value: "68%", percent: 68, color: "#2563eb" },
];

export interface AccountBalance {
  name: string;
  code: string;
  balance: string;
  change: string;
  changeColor: string;
  bg: string;
  iconBg: string;
  iconColor: string;
}

export const accountBalances: AccountBalance[] = [
  { name: "Rent Account", code: "RENT-001", balance: "85,200", change: "+৳4,500 this month", changeColor: "#16a34a", bg: "#f0fdf4", iconBg: "#dcfce7", iconColor: "#16a34a" },
  { name: "Farm Account", code: "FARM-001", balance: "32,450", change: "+৳3,200 this month", changeColor: "#0891b2", bg: "#ecfeff", iconBg: "#cffafe", iconColor: "#0891b2" },
  { name: "Maintenance Fund", code: "MAINT-001", balance: "14,800", change: "-৳2,300 this month", changeColor: "#ea580c", bg: "#fff7ed", iconBg: "#fed7aa", iconColor: "#ea580c" },
];

export interface ActivityItem {
  id: number;
  icon: string;
  bg: string;
  text: string;
  time: string;
}

export const recentActivity: ActivityItem[] = [
  { id: 1, icon: "💰", bg: "#f0fdf4", text: "Rent collected from Flat A-302 — ৳8,500", time: "10 min ago" },
  { id: 2, icon: "📦", bg: "#ecfeff", text: "New farm order #ORD-0087 placed by Rina Begum", time: "32 min ago" },
  { id: 3, icon: "🔧", bg: "#fff7ed", text: "Maintenance expense logged — Plumbing repair ৳1,200", time: "1 hr ago" },
  { id: 4, icon: "👤", bg: "#eff6ff", text: "Salary issued to Jamal Uddin (Guard)", time: "3 hrs ago" },
  { id: 5, icon: "📋", bg: "#fef2f2", text: "New complaint submitted from Flat A-301", time: "5 hrs ago" },
  { id: 6, icon: "📊", bg: "#f5f3ff", text: "Monthly report generated for April 2026", time: "Yesterday" },
];

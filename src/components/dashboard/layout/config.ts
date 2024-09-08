import { paths } from '@/paths';
import type { NavItemConfig } from '@/types/nav';

export const navItems = [
  { approvalRequired: false, role: 'common', key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { approvalRequired: true, role: 'admin', key: 'customers', title: 'Users', href: paths.dashboard.customers, icon: 'users' },
  { approvalRequired: true, role: 'admin', key: 'sellers', title: 'Sellers', href: paths.dashboard.sellers, icon: 'users' },
  { approvalRequired: true, role: 'admin', key: 'categories', title: 'Categories', href: paths.dashboard.categories, icon: 'users' },
  { approvalRequired: true, role: 'common', key: 'products', title: 'Products', href: paths.dashboard.products, icon: 'users' },
  { approvalRequired: true, role: 'admin', key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { approvalRequired: false, role: 'seller', key: 'account', title: 'Profile', href: paths.dashboard.account, icon: 'user' },
  // { role: '', key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];

import { paths } from '@/paths';
import type { NavItemConfig } from '@/types/nav';

export const navItems = [
  { role: 'common', key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { role: 'admin', key: 'customers', title: 'Users', href: paths.dashboard.customers, icon: 'users' },
  { role: 'admin', key: 'sellers', title: 'Sellers', href: paths.dashboard.sellers, icon: 'users' },
  { role: 'admin', key: 'categories', title: 'Categories', href: paths.dashboard.categories, icon: 'users' },
  { role: 'common', key: 'products', title: 'Products', href: paths.dashboard.products, icon: 'users' },
  { role: 'admin', key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { role: 'seller', key: 'account', title: 'Profile', href: paths.dashboard.account, icon: 'user' },
  // { role: '', key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];

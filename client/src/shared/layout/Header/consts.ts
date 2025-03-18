import { MenuItems } from './Header.types';

export const adminPanel: Array<MenuItems> = [
  { name: 'Мониторинг', link: '/admin-panel/monitoring' },
  { name: 'Пользователи', link: '/admin-panel/user-list' },
  { name: 'Роли', link: '/admin-panel/roles-list' },
  { name: 'Настройки', link: '/admin-panel/settings' },
];

export const usersAudit: Array<MenuItems> = [
  { name: 'Отчет по пользователям', link: '/audit/report-by-user' },
  { name: 'Отчет по системе', link: '/audit/report-by-system' },
  { name: 'Аудит администратора', link: '/audit/admin-audit' },
  { name: 'Аудит входа/выхода пользователей', link: '/audit/user-auth-audit' },
  { name: 'Мониторинг транзакций пользователей', link: '/audit/user-transactions-monitoring' },
];

export const userMenu: Array<MenuItems> = [
  { name: 'Профиль', link: '/profile' },
  { name: 'Выйти', link: '/logout' },
];

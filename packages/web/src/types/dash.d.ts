export type DashboardSidebarMenuItem = {
  name: string;
  icon: string;
  route: string;
  children?: DashboardSidebarMenuItem[];
};

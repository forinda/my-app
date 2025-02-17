export const organizationSetupTabs = [
  // {
  //   name: 'General Info',
  //   content: "Set up your organization's general information here.",
  //   icon: 'lucide-info',
  // },
  {
    name: 'Designations',
    content: 'Create and manage designations for your organization.',
    icon: 'lucide-tag',
  },  {
    name: 'Departments',
    content: 'Create and manage designations for your organization.',
    icon: 'lucide-tag',
  },
  {
    name: 'Members',
    content: "Manage your organization's members and roles.",
    icon: 'lucide-user',
  },
  {
    name: 'Billing',
    content: 'Configure billing settings and payment methods.',
    icon: 'lucide-credit-card',
  },
  {
    name: 'Integrations',
    content: 'Connect and manage third-party integrations.',
    icon: 'lucide-link',
  },
] as const

export type OrganizationSetupTab = (typeof organizationSetupTabs)[number]

import { useMemo, useState } from 'react';
import { Button } from '../ui/button';
import {
  ChevronDown,
  ChevronRight,
  CogIcon,
  LayoutDashboard,
  Lock,
  LucideIcon,
  UserCircle,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type WithDepthAndID<T> = T & { depth: number; id: string };
type SidebarItem = {
  title: string;
  Icon: LucideIcon;
  href: string;
  isActive?: boolean;
  id?: string;
  depth?: number;
  children?: SidebarItem[];
};


const links: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    Icon: LayoutDashboard,
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    Icon: Users,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    Icon: CogIcon,
    children: [
      {
        title: 'Profile',
        href: '/dashboard/settings/profile',
        Icon: UserCircle,
        children: [
          {
            title: 'Edit Profile',
            href: '/dashboard/settings/profile/edit',
            Icon: UserCircle,
          },
          {
            title: 'Delete Profile',
            href: '/dashboard/settings/profile/delete',
            Icon: UserCircle,
          },
        ],
      },
      {
        title: 'Password',
        href: '/dashboard/settings/password',
        Icon: Lock,
        children: [
          {
            title: 'Change Password',
            href: '/dashboard/settings/password/change',
            Icon: Lock,
          },
          {
            title: 'Reset Password',
            href: '/dashboard/settings/password/reset',
            Icon: Lock,
          },
        ],
      },
    ],
  },
];

// Depth and ID assignment function

function assignObjectDepth<T extends { children?: T[] }>(
  obj: T,
  depth = 0,
): WithDepthAndID<T> {
  const id = crypto.randomUUID();
  return {
    ...obj,
    id,
    depth,
    children:
      obj.children?.map((child) => assignObjectDepth(child, depth + 1)) ?? [],
  };
}

export default function DashboardSidebar() {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const depthLinks = useMemo(() => {
    return links.map((link) => assignObjectDepth(link));
  }, []);
  console.log(depthLinks);

  return (
    <div className="h-screen w-64 fixed border-r shadow-sm bg-white z-10">
      {/* Top */}
      <section>
        <Button variant="link">Dashboard</Button>
      </section>
      {/* Main menu */}
      <aside className="overflow-y-auto h-full flex flex-col gap-2">
        {depthLinks.map((item) => (
          <SidebarLink
            item={item}
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            key={item.id}
          />
        ))}
      </aside>
    </div>
  );
}
const SidebarLink = ({
  item,
  setActiveLink,
  activeLink,
}: {
  item: SidebarItem;
  activeLink: string | null;
  setActiveLink: (link: string | null) => void;
}) => {
  function checkIsActive(
    item: SidebarItem,
    activeHref: string | null,
  ): boolean {
    if (item.href === activeHref) {
      return true;
    }
    if (item.children) {
      return item.children.some((child) => checkIsActive(child, activeHref));
    }
    return false;
  }

  const isLinkActive = checkIsActive(item, activeLink);

  return (
    <div>
      {item.children?.length ? (
        <div className={`relative`}>
          <Link
            to="#"
            className="flex items-center gap-2 p-2 justify-between"
            onClick={() =>
              setActiveLink(item.href)
            }
          >
            <div className="flex items-center gap-2">
              <item.Icon size={24} />
              {item.title}
            </div>
            {isLinkActive ? (
              <ChevronDown size={12} />
            ) : (
              <ChevronRight size={12} />
            )}
          </Link>
          {isLinkActive && (
            <div className="ml-4 flex flex-col gap-2">
              {item.children.map((child) => (
                <SidebarLink
                  item={child}
                  key={child.id}
                  activeLink={activeLink}
                  setActiveLink={setActiveLink}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className={cn('p-1', isLinkActive && 'bg-gray-100')}>
          <Link
            to={item.href}
            onClick={() => setActiveLink(item.href)}
            className="flex items-center gap-2"
          >
            <item.Icon size={24} />
            {item.title}
          </Link>
        </div>
      )}
    </div>
  );
};

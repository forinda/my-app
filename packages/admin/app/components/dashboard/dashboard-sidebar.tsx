import { useEffect } from 'react';
import { css } from 'styled-system/css';
import { Icon } from '@iconify/react';
import { useSidebar } from '~/providers/sidebar-context';
import { Accordion } from '../ui/accordion';
import { Button } from '../ui/button';
import { Link } from 'react-router';

export function DashboardSidebar() {
  const {
    isCollapsed,
    toggleSidebar,
    isMobile,
    setIsMobile,
    isMobileOpen,
    toggleMobileSidebar,
  } = useSidebar();

  // Check if screen is mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [setIsMobile]);

  const sidebarItems = [
    {
      title: 'Dashboard',
      icon: 'lucide-home',
      href: '/dashboard',
    },
    {
      title: 'Analytics',
      icon: 'lucide-bar-chart-3',
      href: '/analytics',
    },
    {
      title: 'Departments',
      icon: 'lucide-users',
      href: '#',
      subItems: [
        { title: 'Engineering', href: '/departments/engineering' },
        { title: 'Marketing', href: '/departments/marketing' },
        { title: 'Sales', href: '/departments/sales' },
        { title: 'Human Resources', href: '/departments/hr' },
      ],
    },
    {
      title: 'Workspaces',
      icon: 'lucide-briefcase',
      href: '#',
      subItems: [
        { title: 'Project Alpha', href: '/workspaces/alpha' },
        { title: 'Project Beta', href: '/workspaces/beta' },
        { title: 'Project Gamma', href: '/workspaces/gamma' },
      ],
    },
    {
      title: 'Categories',
      icon: 'lucide-folder-tree',
      href: '#',
      subItems: [
        { title: 'Products', href: '/categories/products' },
        { title: 'Services', href: '/categories/services' },
        { title: 'Resources', href: '/categories/resources' },
      ],
    },
    {
      title: 'Settings',
      icon: 'lucide-settings',
      href: '/settings',
    },
  ];

  // const sidebarStyles =;

  const logoStyles = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'flex-start',
    p: 4,
    borderBottom: '1px solid',
    borderColor: 'gray.8',
    height: '64px',
  });

  const logoTextStyles = css({
    fontWeight: 'bold',
    fontSize: 'xl',
    ml: 2,
    display: isCollapsed ? 'none' : 'block',
  });

  const menuItemStyles = {
    display: 'flex',
    alignItems: 'center',
    p: 3,
    color: 'gray.3',
    textDecoration: 'none',
    _hover: {
      bg: 'gray.8',
      color: 'white',
    },
  };

  const menuItemActiveStyles = css({
    bg: 'gray.8',
    color: 'white',
  });

  const menuItemTextStyles = css({
    ml: 3,
    display: isCollapsed ? 'none' : 'block',
  });

  const subMenuItemStyles = css({
    display: 'flex',
    alignItems: 'center',
    p: 2,
    pl: 10,
    color: 'gray.4',
    textDecoration: 'none',
    fontSize: 'sm',
    _hover: {
      bg: 'gray.8',
      color: 'white',
    },
  });

  const logoutStyles = css({
    mt: 'auto',
    p: 4,
    borderTop: '1px solid',
    borderColor: 'gray.8',
  });

  const mobileOverlayStyles = css({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    bg: 'blackAlpha.6',
    zIndex: 40,
    display: isMobile && isMobileOpen ? 'block' : 'none',
  });

  return (
    <>
      <div
        className={css({
          position: isMobile ? 'fixed' : 'relative',
          height: '100vh',
          width: isCollapsed ? '64px' : '240px',
          bg: 'black.a7',
          color: 'white',
          transition: 'width 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          zIndex: Number.MAX_SAFE_INTEGER,
          transform:
            isMobile && !isMobileOpen ? 'translateX(-100%)' : 'translateX(0)',
          boxShadow: isMobile ? 'lg' : 'none',
        })}
      >
        <div className={logoStyles}>
          {isCollapsed ? (
            // <Menu size={24} />
            <Icon icon="lucide-menu" width="24" height="24" />
          ) : (
            <>
              {/* <Menu size={24} /> */}
              <Icon icon="lucide-menu" width="24" height="24" />
              <span className={logoTextStyles}>Dashboard</span>
            </>
          )}
        </div>

        <div className={css({ overflowY: 'auto', flex: 1 })}>
          <Accordion.Root defaultValue={[]}>
            {sidebarItems.map((item, index) =>
              item.subItems ? (
                <Accordion.Item key={index} value={`item-${index}`}>
                  <Accordion.ItemTrigger
                    className={css({
                      width: '100%',
                      textAlign: 'left',
                      bg: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      // ...menuItemStyles,
                    })}
                  >
                    {/* <item.icon size={20} /> */}
                    <Icon icon={item.icon} width="20" height="20" />
                    <span className={menuItemTextStyles}>{item.title}</span>
                    {!isCollapsed && (
                      <Icon
                        icon="lucide-chevron-right"
                        className={css({
                          ml: 'auto',
                          transition: 'transform 0.2s',
                          '[data-state=open] &': {
                            transform: 'rotate(180deg)',
                          },
                        })}
                      />
                    )}
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    {!isCollapsed &&
                      item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.href}
                          className={subMenuItemStyles}
                        >
                          <Icon icon="lucide-chevron-right" />
                          <span className={css({ ml: 2 })}>
                            {subItem.title}
                          </span>
                        </Link>
                      ))}
                  </Accordion.ItemContent>
                </Accordion.Item>
              ) : (
                <a key={index} href={item.href} className={css(menuItemStyles)}>
                  {/* <item.icon size={20} /> */}
                  <Icon icon={item.icon} width="20" height="20" />
                  <span className={menuItemTextStyles}>{item.title}</span>
                </a>
              )
            )}
          </Accordion.Root>
        </div>

        <div className={logoutStyles}>
          <Button
            variant="ghost"
            className={css({
              width: '100%',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              color: 'gray.3',
              _hover: { bg: 'gray.8', color: 'white' },
            })}
          >
            {/* <LogOut size={20} /> */}
            <Icon icon="lucide-log-out" width="20" height="20" />
            {!isCollapsed && <span className={css({ ml: 3 })}>Logout</span>}
          </Button>
        </div>

        {!isMobile && (
          <Button
            variant="ghost"
            onClick={toggleSidebar}
            className={css({
              position: 'absolute',
              top: '50%',
              right: '-12px',
              transform: 'translateY(-50%)',
              width: '24px',
              height: '24px',
              borderRadius: 'full',
              bg: 'gray.7',
              color: 'white',
              p: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              _hover: { bg: 'gray.6' },
            })}
          >
            <Icon
              icon="lucide-chevron-right"
              className={css({
                transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'transform 0.3s ease',
              })}
            />
          </Button>
        )}
      </div>

      {/* Mobile overlay */}
      <div className={mobileOverlayStyles} onClick={toggleMobileSidebar} />
    </>
  );
}

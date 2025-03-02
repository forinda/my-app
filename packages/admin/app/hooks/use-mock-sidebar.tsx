import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
  // setIsMobile: (value: boolean) => void;
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
  screenWidth: number;
}

const MockSidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

export function MockSidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const toggleMobileSidebar = () => setIsMobileOpen((prev) => !prev);
  const isMobile = useMemo(() => screenWidth < 768, [screenWidth]);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <MockSidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebar,
        isMobile,
        // setIsMobile,
        isMobileOpen,
        toggleMobileSidebar,
        screenWidth,
      }}
    >
      {children}
    </MockSidebarContext.Provider>
  );
}

export function useMockSidebar() {
  const context = useContext(MockSidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

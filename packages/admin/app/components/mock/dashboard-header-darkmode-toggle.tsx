import { Icon } from '@iconify/react';
import { css } from 'styled-system/css';
import { ToggleGroup } from '../ui/toggle-group';
import { Stack } from 'styled-system/jsx';
import useDarkMode from '~/hooks/use-dark-mode';

const toggleItemStyles = css({
  border: 'none',
  color: 'var(--light-color)',
  outline: 'none',
  // _focus: { boxShadow: 'none' },
  // _hover: { color: 'fg.default' },
});
export default function DashboardHeaderDarkmodeToggle() {
  const { theme, toggleTheme, themeIcon } = useDarkMode();
  return (
    <Stack
      className={css({
        color: 'fg.subtle',
        border: 'none',
      })}
    >
      <ToggleGroup.Root
        value={[theme]}
        onChange={toggleTheme}
        className={toggleItemStyles}
      >
        {theme == 'dark' ? (
          <ToggleGroup.Item
            value="light"
            aria-label="Toggle light mode"
            className={toggleItemStyles}
            onClick={toggleTheme}
          >
            <Icon icon={themeIcon} />
          </ToggleGroup.Item>
        ) : (
          <ToggleGroup.Item
            value="dark"
            aria-label="Toggle dark mode"
            className={toggleItemStyles}
            onClick={toggleTheme}
          >
            <Icon icon={themeIcon} />
          </ToggleGroup.Item>
        )}
      </ToggleGroup.Root>
    </Stack>
  );
}

import { MantineThemeOverride } from '@mantine/core';

export const customTheme: MantineThemeOverride = {
  colorScheme: 'dark',
  fontFamily: 'Roboto',
  components: {
    Tooltip: {
      defaultProps: {
        transition: 'pop',
      },
    },
  },
};

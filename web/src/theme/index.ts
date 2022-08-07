import { MantineThemeOverride } from '@mantine/core';

export const customTheme: MantineThemeOverride = {
  colorScheme: 'dark',
  fontFamily: 'Nunito',
  components: {
    Tooltip: {
      defaultProps: {
        transition: 'pop',
      },
    },
  },
};

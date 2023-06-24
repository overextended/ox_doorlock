import { Box, Button, Stack, Tooltip } from '@mantine/core';
import { TbPlus } from 'react-icons/tb';
import { useLocales } from '../../providers/LocaleProvider';

interface Props {
  children: React.ReactNode;
  setter: () => void;
}

const Layout: React.FC<Props> = ({ children, setter }) => {
  const { locale } = useLocales();
  return (
    <Stack justify="space-between" align="center" sx={{ height: '100%' }}>
      <Box sx={{ width: '100%', overflowY: 'auto', height: 410 }}>
        {children}
        <Tooltip label={locale.ui.create_a_new_row} withArrow arrowSize={10}>
          <Button mt={16} fullWidth variant="light" onClick={setter}>
            <TbPlus size={24} />
          </Button>
        </Tooltip>
      </Box>
    </Stack>
  );
};

export default Layout;

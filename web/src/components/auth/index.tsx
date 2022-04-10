import { Box, Typography, Grow } from '@mui/material';
import Buttons from './Buttons';
import ItemFields from './ItemFields';
import GroupFields from './GroupFields';
import { useVisibility } from '../../providers/VisibilityProvider';

const Auth: React.FC<{ type: string }> = ({ type }) => {
  const visibility = useVisibility();

  return (
    <Grow in={visibility.visible} unmountOnExit>
      <Box
        height="fit-content"
        bgcolor="rgba(0, 0, 0, 0.8)"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color="white"
        p={3}
        pt={2}
        width={250}
        borderRadius={1}
        textAlign="center"
      >
        <Typography style={{ marginBottom: '0.7rem' }}>
          {type === 'item' ? 'Item' : 'Group'} authorisation
        </Typography>
        <Box maxHeight={300} sx={{ overflowY: 'auto' }} padding={1} width="100%">
          {type === 'item' ? (
            <Box>
              <ItemFields />
            </Box>
          ) : (
            <Box>
              <GroupFields />
            </Box>
          )}
        </Box>
        <Buttons type={type} />
      </Box>
    </Grow>
  );
};

export default Auth;

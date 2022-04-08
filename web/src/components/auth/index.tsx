import { Box, Typography } from '@mui/material';
import Buttons from './Buttons';
import ItemFields from './ItemFields';
import GroupFields from './GroupFields';

const Auth: React.FC<{ type: string }> = ({ type }) => {
  return (
    <>
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
    </>
  );
};

export default Auth;

import { Box, Button, TextField, Typography } from '@mui/material';
import { Add, ArrowBack } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC<{ type: string }> = ({ type }) => {
  const [itemFields, setItemFields] = useState<string[]>([]);
  const [jobFields, setJobFields] = useState<{ name: string; group: number }[]>([]);
  const navigate = useNavigate();

  const createFields = () => {
    type === 'item'
      ? setItemFields([...itemFields, ''])
      : setJobFields([...jobFields, { name: '', group: 0 }]);
  };

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
          {type === 'item' ? 'Item' : 'Job'} authorisation
        </Typography>
        {type === 'item' ? (
          <>
            {itemFields.map((item, idx) => (
              <>
                <TextField label="Item name" style={{ marginBottom: '0.7rem' }} fullWidth />
              </>
            ))}
          </>
        ) : (
          jobFields.map((job) => (
            <>
              <TextField style={{ marginBottom: '0.7rem' }} fullWidth />
            </>
          ))
        )}
        <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
          <Button variant="outlined" onClick={() => navigate('/')}>
            <ArrowBack />
          </Button>
          <Button onClick={createFields} variant="outlined">
            <Add />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Auth;

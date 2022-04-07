import { Box, Button, TextField, Typography } from '@mui/material';
import { Add, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { groupFieldsState, itemFieldsState } from '../../recoil/atoms';
import { useRecoilState } from 'recoil';

const Auth: React.FC<{ type: string }> = ({ type }) => {
  const navigate = useNavigate();
  const [itemFields, setItemFields] = useRecoilState(itemFieldsState);
  const [groupFields, setGroupFields] = useRecoilState(groupFieldsState);

  const createField = () => {
    type === 'item'
      ? setItemFields([...itemFields, ''])
      : setGroupFields([...groupFields, { name: '', grade: '' }]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number
  ) => {
    if (type === 'item') {
      const items = [...itemFields];
      items[index] = e.target.value;
      setItemFields(items);
    } else {
      // Handle group field state, somehow
    }
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
        <Box maxHeight={300} sx={{ overflowY: 'auto' }} padding={1} width="100%">
          {type === 'item' ? (
            <Box>
              {itemFields.map((item, index) => (
                <Box key={`item-${index}`} style={{ marginBottom: '0.7rem' }}>
                  <TextField
                    label="Item name"
                    fullWidth
                    value={item}
                    onChange={(e) => handleChange(e, index)}
                  />
                </Box>
              ))}
            </Box>
          ) : (
            groupFields.map((group, index) => (
              <Box key={`job-${index}`} style={{ marginBottom: '0.7rem' }} display="flex">
                <TextField label="Job name" fullWidth sx={{ marginRight: 0.5 }} />
                <TextField label="Min. grade" fullWidth sx={{ marginLeft: 0.5 }} />
              </Box>
            ))
          )}
        </Box>
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          marginTop={2}
        >
          <Box width="100%" marginRight={1}>
            <Button variant="outlined" onClick={() => navigate('/')} fullWidth>
              <ArrowBack />
            </Button>
          </Box>
          <Box width="100%" marginLeft={1}>
            <Button onClick={createField} variant="outlined" fullWidth>
              <Add />
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Auth;

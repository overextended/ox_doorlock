import { Add, ArrowBack } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { groupFieldsState, itemFieldsState } from '../../recoil/atoms';

const Buttons: React.FC<{ type: string }> = ({ type }) => {
  const navigate = useNavigate();
  const setItemFields = useSetRecoilState(itemFieldsState);
  const setGroupFields = useSetRecoilState(groupFieldsState);

  const createField = () => {
    type === 'item'
      ? setItemFields((prevState) => [...prevState, ''])
      : setGroupFields((prevState) => [...prevState, { name: '', grade: '' }]);
  };

  // Why keep empty fields when going back? So filter them
  const filterFields = () => {
    if (type === 'item')
      setItemFields((prevState) => prevState.filter((item, index) => index === 0 || item !== ''));
    else
      setGroupFields((prevState) =>
        prevState.filter((item, index) => item.name !== '' || item.grade !== '' || index === 0)
      );

    navigate('/');
  };

  return (
    <>
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        marginTop={2}
      >
        <Box width="100%" marginRight={1}>
          <Button variant="outlined" onClick={() => filterFields()} fullWidth>
            <ArrowBack />
          </Button>
        </Box>
        <Box width="100%" marginLeft={1}>
          <Button onClick={createField} variant="outlined" fullWidth>
            <Add />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Buttons;

import { Box, TextField } from '@mui/material';
import { itemFieldsState } from '../../recoil/atoms';
import { useRecoilState } from 'recoil';

const ItemFields: React.FC = () => {
  const [itemFields, setItemFields] = useRecoilState(itemFieldsState);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number
  ) => {
    const items = [...itemFields];
    items[index] = e.target.value;
    setItemFields(items);
  };

  return (
    <>
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
    </>
  );
};

export default ItemFields;

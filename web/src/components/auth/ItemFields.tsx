import { Box, TextField } from "@mui/material";
import { useStore, useSetters } from "../../store";

const ItemFields: React.FC = () => {
  const itemFields = useStore((state) => state.itemFields);
  const setItemFields = useSetters((setter) => setter.setItemFields);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number
  ) => {
    const items = [...itemFields];
    items[index] = e.target.value;
    setItemFields(() => items);
  };

  return (
    <>
      {itemFields.map((item, index) => (
        <Box key={`item-${index}`} style={{ marginBottom: "0.7rem" }}>
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

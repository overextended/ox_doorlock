import {
  TextField,
  IconButton,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Button,
  Switch,
} from '@mui/material';
import { useStore, useSetters } from '../../store';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';

const ItemFields: React.FC = () => {
  const itemFields = useStore((state) => state.itemFields);
  const setItemFields = useSetters((setter) => setter.setItemFields);
  const [dialog, setDialog] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
  ) => {
    const items = [...itemFields];
    switch (e.target.id) {
      case 'name':
        if (index !== undefined) items[index].name = e.target.value;
        break;
      case 'metadata':
        items[dialog.index].metadata = e.target.value;
        break;
    }
    setItemFields(() => items);
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const items = [...itemFields];
    items[dialog.index].remove = e.target.checked;
    setItemFields(() => items);
  };

  return (
    <>
      {itemFields.map((item, index) => (
        <Stack
          key={`item-${index}`}
          style={{ marginBottom: '0.7rem' }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <TextField
            label="Item name"
            id="name"
            fullWidth
            value={item.name}
            onChange={(e) => handleChange(e, index)}
          />
          <IconButton
            onClick={() => {
              setDialog({ open: true, index: index });
            }}
          >
            <SettingsIcon />
          </IconButton>
        </Stack>
      ))}

      <Dialog
        open={dialog.open}
        onClose={() => setDialog((prevState) => ({ ...prevState, open: false }))}
      >
        <DialogTitle>Item options</DialogTitle>
        <DialogContent>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <TextField
              label="Metadata type"
              variant="standard"
              fullWidth
              id="metadata"
              value={itemFields[dialog.index].metadata || ''}
              onChange={(e) => handleChange(e)}
            />
            <FormControlLabel
              control={
                <Switch
                  id="remove"
                  checked={itemFields[dialog.index].remove || false}
                  onChange={(e) => handleSwitchChange(e)}
                />
              }
              label="Remove on use"
              labelPlacement="start"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog((prevState) => ({ ...prevState, open: false }))}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ItemFields;

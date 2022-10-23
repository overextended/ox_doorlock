import { Group, TextInput, NumberInput, ActionIcon, Tooltip } from '@mantine/core';
import { TbTrash } from 'react-icons/tb';
import { useStore, useSetters } from '../../../../../store';

const CharacterFields: React.FC = () => {
  const characters = useStore((state) => state.characters);
  const setCharacters = useSetters((setter) => setter.setCharacters);

  const handleChange = (value: string | undefined, index: number) => {
    setCharacters((prevState) => {
      return prevState.map((item, indx) => (index === indx ? value : item));
    });
  };

  const handleRowDelete = (index: number) => {
    setCharacters((prevState) => prevState.filter((_obj, indx) => indx !== index));
  };

  return (
    <>
      {characters.map((field, index) => (
        <Group
          position="center"
          key={`group-${index}`}
          mt={index === 0 ? 0 : 16}
          noWrap
          spacing={16}
          sx={{ fontSize: 16 }}
        >
          <TextInput
            sx={{ width: '100%' }}
            placeholder="Character Id"
            value={field as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, index)}
          />
          <Tooltip label="Delete row">
            <ActionIcon color="red.4" variant="transparent" onClick={() => handleRowDelete(index)}>
              <TbTrash size={24} />
            </ActionIcon>
          </Tooltip>
        </Group>
      ))}
    </>
  );
};

export default CharacterFields;

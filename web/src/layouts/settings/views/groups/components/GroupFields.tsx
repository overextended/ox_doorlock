import { Group, TextInput, NumberInput, ActionIcon, Tooltip } from '@mantine/core';
import { TbTrash } from 'react-icons/tb';
import { useStore, useSetters } from '../../../../../store';
import { t } from '../../../../../utils/t';

const GroupFields: React.FC = () => {
  const groups = useStore((state) => state.groups);
  const setGroups = useSetters((setter) => setter.setGroups);

  const handleChange = (value: string | number | undefined, index: number, property: 'name' | 'grade') => {
    setGroups((prevState) => {
      return prevState.map((item, indx) => (index === indx ? { ...item, [property]: value } : item));
    });
  };

  const handleRowDelete = (index: number) => {
    setGroups((prevState) => prevState.filter((obj, indx) => indx !== index));
  };

  return (
    <>
      {groups.map((field, index) => (
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
            placeholder={t('ui_group')}
            value={field.name as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, index, 'name')}
          />
          <NumberInput
            sx={{ width: '100%' }}
            placeholder={t('ui_grade')}
            value={field.grade as number}
            onChange={(e) => handleChange(e, index, 'grade')}
          />
          <Tooltip label={t('ui_delete_row')}>
            <ActionIcon color="red.4" variant="transparent" onClick={() => handleRowDelete(index)}>
              <TbTrash size={24} />
            </ActionIcon>
          </Tooltip>
        </Group>
      ))}
    </>
  );
};

export default GroupFields;

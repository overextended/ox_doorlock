import { Group, Input, NumberInput } from '@mantine/core';
import { useStore, useSetters } from '../../../../../store';

const GroupFields: React.FC = () => {
  const groups = useStore((state) => state.groups);
  const setGroups = useSetters((setter) => setter.setGroups);

  const handleChange = (value: string | number | undefined, index: number, property: 'name' | 'grade') => {
    setGroups((prevState) => {
      return prevState.map((item, indx) => (index === indx ? { ...item, [property]: value } : item));
    });
  };

  return (
    <>
      {groups.map((field, index) => (
        <Group p={8} position="center" key={`group-${index}`} noWrap>
          <Input
            sx={{ width: '100%' }}
            placeholder="Group"
            value={field.name as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, index, 'name')}
          />
          <NumberInput
            sx={{ width: '100%' }}
            placeholder="Grade"
            value={field.grade as number}
            onChange={(e) => handleChange(e, index, 'grade')}
          />
        </Group>
      ))}
    </>
  );
};

export default GroupFields;
